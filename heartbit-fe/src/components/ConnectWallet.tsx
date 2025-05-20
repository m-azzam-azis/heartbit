"use client";

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks Next.js Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Image
        src="/heartbit-logo.png"
        alt="HeartBit Logo"
        width={150}
        height={150}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Connect your wallet to use HeartBit
      </h1>
      <p className="text-gray-600 max-w-lg text-center mb-8">
        HeartBit works with Stacks wallets to create smart contracts that ensure
        your Bitcoin is never lost. Connect your wallet to get started.
      </p>
      <ConnectWalletButton />
    </div>
  );
};

export const ConnectWalletButton = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium flex items-center"
        onClick={disconnect}
      >
        Disconnect Wallet
      </button>
    );
  }

  return (
    <button
      onClick={authenticate}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium flex items-center"
    >
      Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  );
};

export default ConnectWallet;
