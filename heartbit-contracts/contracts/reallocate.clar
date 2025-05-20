;; heartbit-smart-contract.clar

(define-constant ERR_NOT_OWNER (err u100))
(define-constant ERR_NOT_EXPIRED (err u101))
(define-constant ERR_NO_FUNDS (err u102))
(define-constant ERR_INVALID_DISTRIBUTION (err u103))
(define-constant ERR_INVALID_DURATION (err u104))

(define-data-var owner principal tx-sender)
(define-data-var lastActiveBlock uint u0)
(define-data-var inactivityDuration uint u0)
(define-data-var recipients (list { recipient: principal, percentage: uint }) (list))
(define-data-var totalPercentage uint u0)

;; Initialize contract
(define-public (initialize (duration uint) (recipientList (list { recipient: principal, percentage: uint })))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) ERR_NOT_OWNER)
    (asserts! (> duration u0) ERR_INVALID_DURATION)
    
    (let ((total (fold (lambda (item total) (+ total (get percentage item))) recipientList u0)))
      (asserts! (is-eq total u100) ERR_INVALID_DISTRIBUTION)
      (var-set totalPercentage total)
    )
    
    (var-set recipients recipientList)
    (var-set inactivityDuration duration)
    (var-set lastActiveBlock block-height)
    (ok true)
  )
)

(define-read-only (is-initialized)
  (and 
    (> (var-get inactivityDuration) u0)
    (> (var-get totalPercentage) u0)
  )
)

;; Update recipients
(define-public (update-recipients (recipientList (list { recipient: principal, percentage: uint })))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) ERR_NOT_OWNER)
    
    (let ((total (fold (lambda (item total) (+ total (get percentage item))) recipientList u0)))
      (asserts! (is-eq total u100) ERR_INVALID_DISTRIBUTION)
      (var-set totalPercentage total)
    )
    
    (var-set recipients recipientList)
    (ok true)
  )
)

;; Deposit funds into contract
(define-public (deposit (amount uint))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) ERR_NOT_OWNER)
    (stx-transfer? amount tx-sender (as-contract tx-sender))
  )
)


;; Send heartbeat to reset timer
(define-public (heartbeat)
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) ERR_NOT_OWNER)
    (var-set lastActiveBlock block-height)
    (ok true)
  )
)

;; Check if contract is expired
(define-read-only (is-expired)
  (>= (- block-height (var-get lastActiveBlock)) (var-get inactivityDuration))
)

;; Redistribute funds to recipients
(define-public (redistribute)
  (let (
      (contract-balance (stx-get-balance (as-contract tx-sender)))
      (owner (var-get owner))
      (recipientList (var-get recipients))
    )
    (begin
      (asserts! (is-expired) ERR_NOT_EXPIRED)
      (asserts! (> contract-balance u0) ERR_NO_FUNDS)
      
      (as-contract
        (let ((result 
          (fold
            (lambda (item prior-result)
              (match prior-result
                success (let (
                    (amount (/ (* contract-balance (get percentage item)) u100))
                    (recipient (get recipient item))
                  )
                  (stx-transfer? amount tx-sender recipient)
                )
                error prior-result
              )
            )
            recipientList
            (ok true)
          )))
          ;; Send remaining balance to last recipient
          (match result
            success (let ((remaining (stx-get-balance tx-sender)))
              (if (> remaining u0)
                (stx-transfer? remaining tx-sender (get recipient (element-at recipientList (- (length recipientList) u1))))
                result
              )
            )
            error result
          )
        )
      )
    )
  )
)


;; Get contract details
(define-read-only (get-details)
  (ok {
    owner: (var-get owner),
    lastActiveBlock: (var-get lastActiveBlock),
    inactivityDuration: (var-get inactivityDuration),
    recipients: (var-get recipients),
    totalPercentage: (var-get totalPercentage),
    isExpired: (is-expired),
    balance: (stx-get-balance (as-contract tx-sender))
  })
)