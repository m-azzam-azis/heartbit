"use client";
import { useState } from "react";
import Head from "next/head";
import {
  ArrowRight,
  Clock,
  Users,
  AlertCircle,
  Trash2,
  PlusCircle,
  RefreshCw,
} from "lucide-react";

// Demo data - would be replaced with actual wallet data
const DEMO_DATA = {
  address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  balance: 0.05847382,
  heartbits: [
    {
      id: 1,
      name: "Family inheritance",
      timeThreshold: 180, // days
      lastCheckin: "2025-03-15T10:30:00Z",
      status: "active",
      beneficiaries: [
        { address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", percentage: 70 },
        { address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", percentage: 30 },
      ],
    },
  ],
};

export default function Wallet() {
  const [connected, setConnected] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [showNewHeartbitForm, setShowNewHeartbitForm] = useState(false);
  const [newHeartbit, setNewHeartbit] = useState({
    name: "",
    timeThreshold: 180,
    beneficiaries: [{ address: "", percentage: 100 }],
  });

  // Connect wallet function (demo)
  const connectWallet = () => {
    setTimeout(() => {
      setConnected(true);
      setWalletData(DEMO_DATA);
    }, 1000);
  };

  // Add beneficiary to form
  const addBeneficiary = () => {
    const currentTotal = newHeartbit.beneficiaries.reduce(
      (sum, b) => sum + b.percentage,
      0
    );
    if (currentTotal < 100) {
      setNewHeartbit({
        ...newHeartbit,
        beneficiaries: [
          ...newHeartbit.beneficiaries,
          { address: "", percentage: 100 - currentTotal },
        ],
      });
    }
  };

  // Remove beneficiary from form
  const removeBeneficiary = (index) => {
    if (newHeartbit.beneficiaries.length <= 1) {
      return; // Keep at least one beneficiary
    }

    const updatedBeneficiaries = [...newHeartbit.beneficiaries];
    const removedPercentage = updatedBeneficiaries[index].percentage;
    updatedBeneficiaries.splice(index, 1);

    // Redistribute the removed percentage to the first beneficiary
    if (updatedBeneficiaries.length > 0 && removedPercentage > 0) {
      updatedBeneficiaries[0].percentage += removedPercentage;
    }

    setNewHeartbit({
      ...newHeartbit,
      beneficiaries: updatedBeneficiaries,
    });
  };

  // Update beneficiary data
  const updateBeneficiary = (index, field, value) => {
    const updatedBeneficiaries = [...newHeartbit.beneficiaries];

    if (field === "percentage") {
      // Convert to number
      value = parseInt(value) || 0;

      // Ensure value is between 0 and 100
      value = Math.min(100, Math.max(0, value));

      const oldValue = updatedBeneficiaries[index].percentage;
      const difference = value - oldValue;

      // Only adjust if the total will still be <= 100
      const currentTotal = updatedBeneficiaries.reduce(
        (sum, b, i) => (i === index ? sum : sum + b.percentage),
        0
      );

      if (currentTotal + value <= 100) {
        updatedBeneficiaries[index][field] = value;
      }
    } else {
      updatedBeneficiaries[index][field] = value;
    }

    setNewHeartbit({
      ...newHeartbit,
      beneficiaries: updatedBeneficiaries,
    });
  };

  // Create new heartbit (demo)
  const createHeartbit = (e) => {
    e.preventDefault();

    // Check if percentages add up to 100
    const totalPercentage = newHeartbit.beneficiaries.reduce(
      (sum, b) => sum + b.percentage,
      0
    );
    if (totalPercentage !== 100) {
      alert("Beneficiary percentages must add up to 100%");
      return;
    }

    // Add new heartbit to wallet data
    const newHeartbitData = {
      id: walletData.heartbits.length + 1,
      name: newHeartbit.name,
      timeThreshold: newHeartbit.timeThreshold,
      lastCheckin: new Date().toISOString(),
      status: "active",
      beneficiaries: newHeartbit.beneficiaries,
    };

    setWalletData({
      ...walletData,
      heartbits: [...walletData.heartbits, newHeartbitData],
    });

    // Reset form
    setNewHeartbit({
      name: "",
      timeThreshold: 180,
      beneficiaries: [{ address: "", percentage: 100 }],
    });

    setShowNewHeartbitForm(false);
  };

  // Send heartbeat to reset timer (demo)
  const sendHeartbeat = (id) => {
    const updatedHeartbits = walletData.heartbits.map((hb) => {
      if (hb.id === id) {
        return {
          ...hb,
          lastCheckin: new Date().toISOString(),
        };
      }
      return hb;
    });

    setWalletData({
      ...walletData,
      heartbits: updatedHeartbits,
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Calculate days remaining before heartbeat expires
  const daysRemaining = (lastCheckin, threshold) => {
    const lastCheckinDate = new Date(lastCheckin);
    const expiryDate = new Date(lastCheckinDate);
    expiryDate.setDate(expiryDate.getDate() + threshold);

    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>HeartBit - Wallet</title>
        <meta
          name="description"
          content="Manage your Bitcoin inheritance with HeartBit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!connected ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg
                className="h-20 w-20 text-orange-500 mb-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
                <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" fill="white" />
                <path
                  d="M8 8h8M8 12h8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Connect your wallet to use HeartBit
              </h1>
              <p className="text-gray-600 max-w-lg text-center mb-8">
                HeartBit works with Stacks wallets to create smart contracts
                that ensure your Bitcoin is never lost. Connect your wallet to
                get started.
              </p>
              <button
                onClick={connectWallet}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium flex items-center"
              >
                Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ) : (
            <div>
              {/* Wallet Overview */}
              <div className="bg-white shadow rounded-lg mb-8">
                <div className="px-6 py-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Wallet Overview
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-mono">{walletData.address}</span>
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="text-lg text-gray-900">
                        Balance:{" "}
                        <span className="font-bold">
                          {walletData.balance} BTC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HeartBit List */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your HeartBits
                  </h2>
                  {!showNewHeartbitForm && (
                    <button
                      onClick={() => setShowNewHeartbitForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium flex items-center"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" /> Add HeartBit
                    </button>
                  )}
                </div>

                {walletData.heartbits.length === 0 ? (
                  <div className="bg-white shadow rounded-lg p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No HeartBits configured
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first HeartBit to ensure your Bitcoin is never
                      lost.
                    </p>
                    <button
                      onClick={() => setShowNewHeartbitForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" /> Add HeartBit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {walletData.heartbits.map((heartbit) => (
                      <div
                        key={heartbit.id}
                        className="bg-white shadow rounded-lg overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {heartbit.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                heartbit.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {heartbit.status}
                            </span>
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500">
                                Last Check-in
                              </div>
                              <div className="mt-1 text-gray-900">
                                {formatDate(heartbit.lastCheckin)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">
                                Inactivity Threshold
                              </div>
                              <div className="mt-1 text-gray-900">
                                {heartbit.timeThreshold} days
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">
                                Status
                              </div>
                              <div className="mt-1 text-gray-900">
                                {daysRemaining(
                                  heartbit.lastCheckin,
                                  heartbit.timeThreshold
                                )}{" "}
                                days remaining
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm font-medium text-gray-500">
                              Beneficiaries
                            </div>
                            <div className="mt-1">
                              <ul className="divide-y divide-gray-200">
                                {heartbit.beneficiaries.map(
                                  (beneficiary, index) => (
                                    <li key={index} className="py-2">
                                      <div className="flex justify-between items-center">
                                        <div className="font-mono text-sm truncate max-w-xs">
                                          {beneficiary.address}
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                          {beneficiary.percentage}%
                                        </div>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <button
                            onClick={() => sendHeartbeat(heartbit.id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium flex items-center"
                          >
                            <RefreshCw className="mr-2 h-5 w-5" /> Send
                            Heartbeat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New HeartBit Form */}
              {showNewHeartbitForm && (
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Create New HeartBit
                    </h3>
                  </div>
                  <div className="px-6 py-4">
                    <form onSubmit={createHeartbit}>
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            HeartBit Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={newHeartbit.name}
                            onChange={(e) =>
                              setNewHeartbit({
                                ...newHeartbit,
                                name: e.target.value,
                              })
                            }
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="e.g., Family Inheritance"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="timeThreshold"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Inactivity Threshold (days)
                          </label>
                          <input
                            type="number"
                            id="timeThreshold"
                            value={newHeartbit.timeThreshold}
                            onChange={(e) =>
                              setNewHeartbit({
                                ...newHeartbit,
                                timeThreshold: parseInt(e.target.value) || 0,
                              })
                            }
                            min="1"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Your HeartBit will activate if you don't send a
                            heartbeat within this many days.
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Beneficiaries
                            </label>
                            <button
                              type="button"
                              onClick={addBeneficiary}
                              className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center"
                            >
                              <PlusCircle className="mr-1 h-4 w-4" /> Add
                              Beneficiary
                            </button>
                          </div>
                          {newHeartbit.beneficiaries.map(
                            (beneficiary, index) => (
                              <div
                                key={index}
                                className="flex space-x-4 items-center mt-3"
                              >
                                <div className="flex-grow">
                                  <input
                                    type="text"
                                    value={beneficiary.address}
                                    onChange={(e) =>
                                      updateBeneficiary(
                                        index,
                                        "address",
                                        e.target.value
                                      )
                                    }
                                    required
                                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Bitcoin address"
                                  />
                                </div>
                                <div className="w-24">
                                  <div className="flex items-center">
                                    <input
                                      type="number"
                                      value={beneficiary.percentage}
                                      onChange={(e) =>
                                        updateBeneficiary(
                                          index,
                                          "percentage",
                                          e.target.value
                                        )
                                      }
                                      min="1"
                                      max="100"
                                      required
                                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <span className="ml-2 text-gray-500">
                                      %
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeBeneficiary(index)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            )
                          )}
                          <p className="mt-2 text-sm text-gray-500">
                            Percentages must add up to 100%.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewHeartbitForm(false);
                            setNewHeartbit({
                              name: "",
                              timeThreshold: 180,
                              beneficiaries: [{ address: "", percentage: 100 }],
                            });
                          }}
                          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium"
                        >
                          Create HeartBit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
