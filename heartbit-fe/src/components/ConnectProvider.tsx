"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Connect } from "@stacks/connect-react";
import ConnectWallet, { userSession } from "@/components/ConnectWallet";

function ConnectProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Heartbit",
          icon: window.location.origin + "/heartbit-logo.png",
        },
        redirectTo: "/wallet",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      {children}
    </Connect>
  );
}
export default ConnectProvider;
