"use client";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  PostConditionMode,
  uintCV,
  listCV,
  tupleCV,
  principalCV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { RefreshCw } from "lucide-react";

const HeartbitSetup = () => {
  const { doContractCall } = useConnect();
  const [inactivityDays, setInactivityDays] = useState(30);
  const [recipients, setRecipients] = useState([
    { address: "", percentage: 50 },
    { address: "", percentage: 50 },
  ]);
  const [loading, setLoading] = useState(false);

  const addRecipient = () => {
    setRecipients([...recipients, { address: "", percentage: 0 }]);
  };

  const removeRecipient = (index: number) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const updateRecipient = (index: number, field: string, value: any) => {
    const newRecipients = [...recipients];
    newRecipients[index] = { ...newRecipients[index], [field]: value };
    setRecipients(newRecipients);
  };

  const initializeContract = async () => {
    setLoading(true);
    try {
      // Convert days to blocks (assuming 10 min/block)
      const blocks = inactivityDays * 144;

      // Prepare recipient list
      const recipientList = listCV(
        recipients.map((recipient) =>
          tupleCV({
            recipient: principalCV(recipient.address),
            percentage: uintCV(recipient.percentage),
          })
        )
      );

      await doContractCall({
        network: new StacksTestnet(),
        contractAddress: "ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK",
        contractName: "heartbit",
        functionName: "initialize",
        functionArgs: [uintCV(blocks), recipientList],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          console.log("Contract initialized:", data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const totalPercentage = recipients.reduce(
    (sum, r) => sum + (Number(r.percentage) || 0),
    0
  );
  const isValid =
    totalPercentage === 100 &&
    recipients.every(
      (r) => r.address.startsWith("SP") || r.address.startsWith("ST")
    ) &&
    inactivityDays > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Setup Your Heartbit</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inactivity Period (days)
          </label>
          <input
            type="number"
            min="1"
            value={inactivityDays}
            onChange={(e) => setInactivityDays(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recipients
            </label>
            <button
              onClick={addRecipient}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Recipient
            </button>
          </div>

          <div className="space-y-3">
            {recipients.map((recipient, index) => (
              <div key={index} className="flex space-x-3 items-center">
                <input
                  type="text"
                  placeholder="ST or SP address"
                  value={recipient.address}
                  onChange={(e) =>
                    updateRecipient(index, "address", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={recipient.percentage}
                  onChange={(e) =>
                    updateRecipient(index, "percentage", Number(e.target.value))
                  }
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                <span>%</span>
                <button
                  onClick={() => removeRecipient(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Total: {totalPercentage}%{" "}
            {totalPercentage !== 100 && "(Must equal 100%)"}
          </div>
        </div>

        <button
          onClick={initializeContract}
          disabled={!isValid || loading}
          className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
            isValid
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            "Initialize Heartbit Contract"
          )}
        </button>
      </div>
    </div>
  );
};

export default HeartbitSetup;
