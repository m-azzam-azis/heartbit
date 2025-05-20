"use client";
import { useState, useEffect } from "react";
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
import Image from "next/image";
import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "@/components/ConnectWallet";
import ContractCallVote from "@/components/ContractCallVote";

export default function Wallet() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div>
        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <ConnectWallet />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote />
      </div>
    </main>
  );
}
