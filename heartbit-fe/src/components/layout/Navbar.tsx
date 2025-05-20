"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ConnectWallet, { ConnectWalletButton } from "../ConnectWallet";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-[999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Image
                    src={"/heartbit-logo.png"}
                    alt="icon"
                    height={36}
                    width={36}
                  />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    HeartBit
                  </span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-orange-500 hover:text-orange-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/wallet"
                className="border-transparent text-gray-500 hover:border-orange-500 hover:text-orange-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                My Wallet
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ConnectWalletButton />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/wallet"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500"
            >
              My Wallet
            </Link>
            <Link
              href="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500"
            >
              About
            </Link>
            <div className="pl-3 pr-4 py-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium w-full">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
