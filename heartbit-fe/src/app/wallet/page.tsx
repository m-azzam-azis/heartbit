"use client";
import { useState } from "react";
import { Connect } from "@stacks/connect-react";
import ConnectWallet from "@/components/ConnectWallet";

import HeartbitSetup from "@/components/HeartbitSetup";
import HeartbitDashboard from "@/components/HeartbitDashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Heartbit",
          icon: "/logo.png",
        },
      }}
    >
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <ConnectWallet />
          <nav className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "dashboard"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "setup"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("setup")}
            >
              Setup
            </button>
            {/* <button
              className={`py-2 px-4 font-medium ${
                activeTab === "recipients"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("recipients")}
            >
              Recipients
            </button> */}
          </nav>

          {activeTab === "dashboard" && <HeartbitDashboard />}
          {activeTab === "setup" && <HeartbitSetup />}
          {/* {activeTab === "recipients" && <HeartbitRecipients />} */}
        </div>
      </main>
    </Connect>
  );
}
