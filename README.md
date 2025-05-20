# HeartBit

HeartBit is a decentralized application that enables automatic Bitcoin allocation after an account has been inactive for a specified period. Built with Next.js and Stacks.js, HeartBit leverages smart contracts written in Clarity on the Stacks blockchain to provide a secure and transparent way to manage digital inheritance.

## Features

- **Dead Man's Switch**: Automatically triggers Bitcoin transfers after a period of inactivity
- **Customizable Time Parameters**: Set your own timeframes for inactivity detection
- **Multiple Beneficiaries**: Allocate your Bitcoin to multiple addresses with custom percentages
- **Secure Authentication**: Uses Stacks authentication for secure wallet connectivity
- **Transparent Operations**: All logic runs on open smart contracts on Stacks blockchain

## Technology Stack

- **Frontend**: Next.js, tailwindcss, Stacks.js
- **Smart Contract**: Clarinet smart contract on Stacks blockchain
- **Development Tools**: Docker

## Getting Started

### I. Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/m-azzam-azis/heartbit.git
cd heartbit
```

2. go to frontend folder

```bash
cd heartbit-fe
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### II. Smart Contract Setup

1. Make sure you have Docker installed on your machine.

2. Install Clarinet (Stacks development environment):

```bash
brew install clarinet
```

3. Navigate to the smart contract directory:

```bash
cd heartbit-contracts
```

4. Run the Clarinet development environment:

```bash
clarinet devnet start
```

### III. Test app

Finally Open the app and Login using leather wallet, use one of the mneumonic provided in `/heartbit-contracts/settings/Devnet.toml`, don't forget to change wallet to devnet.

## How It Works

1. Users connect their BTC wallet to HeartBit
2. They set up beneficiary addresses and allocation percentages
3. Users configure inactivity timeframes
4. HeartBit monitors account activity
5. If inactivity threshold is reached, the smart contract automatically executes the predefined addresses

## Contributing

We welcome contributions to HeartBit! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
