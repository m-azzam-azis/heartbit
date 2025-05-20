"use client";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet, StacksTestnet } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Users, AlertCircle } from "lucide-react";
import { RefreshCw } from "lucide-react";

const HeartbitDashboard = () => {
  const { doContractCall } = useConnect();
  const [contractData, setContractData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      fetchContractData();
    }
  }, []);

  const fetchContractData = async () => {
    // In a real app, you would call a read-only function here
    // For demo purposes, we'll use mock data
    setContractData({
      owner: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      lastActiveBlock: 123456,
      inactivityDuration: 4320, // ~30 days in blocks (assuming 10 min/block)
      recipients: [
        {
          recipient: "ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND",
          percentage: 50,
        },
        {
          recipient: "ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB",
          percentage: 50,
        },
      ],
      balance: 100000000, // 1.0 STX (in micro-STX)
    });
  };

  const sendHeartbeat = async () => {
    setLoading(true);
    try {
      await doContractCall({
        network: new StacksMocknet(),
        contractAddress: "ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK",
        contractName: "heartbit",
        functionName: "heartbeat",
        functionArgs: [],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          console.log("Heartbeat sent:", data);
          fetchContractData();
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

  if (!userSession.isUserSignedIn()) {
    return (
      <div className="text-center py-8">
        Please connect your wallet to view your Heartbit
      </div>
    );
  }

  if (!contractData) {
    return <div className="text-center py-8">Loading contract data...</div>;
  }

  // Calculate blocks remaining (mock calculation)
  const blocksRemaining = Math.max(
    0,
    contractData.lastActiveBlock + contractData.inactivityDuration - 123500 // current mock block height
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Heartbit Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 ring-1 ring-orange-500 p-4 rounded-lg">
            <div className="flex items-center space-x-2 ">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Inactivity Period</span>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {Math.round(contractData.inactivityDuration / 144)} days
            </p>
          </div>

          <div className="bg-gray-50 ring-1 ring-orange-500 p-4 rounded-lg">
            <div className="flex items-center space-x-2 ">
              <Users className="h-5 w-5" />
              <span className="font-medium">Recipients</span>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {contractData.recipients.length}
            </p>
          </div>

          <div className="bg-gray-50 ring-1 ring-orange-500 p-4 rounded-lg">
            <div className="flex items-center space-x-2 ">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Blocks Remaining</span>
            </div>
            <p className="mt-2 text-2xl font-bold">{blocksRemaining}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Send a heartbeat transaction before the timer runs out to keep
                your funds active.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={sendHeartbeat}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
        >
          {loading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Send Heartbeat
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Contract Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Contract Balance:</span>
            <span className="font-medium">
              {(contractData.balance / 1000000).toFixed(6)} STX
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Active Block:</span>
            <span className="font-medium">{contractData.lastActiveBlock}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Owner Address:</span>
            <span className="font-medium truncate max-w-xs">
              {contractData.owner}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartbitDashboard;
