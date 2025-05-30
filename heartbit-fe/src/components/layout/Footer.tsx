"use client";

import Link from "next/link";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Image
                src={"/heartbit-logo.png"}
                alt="icon"
                height={36}
                width={36}
              />
              <span className="ml-2 text-xl font-bold">HeartBit</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Ensuring your Bitcoin lives on even when you can&apos;t access it.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-base text-gray-300 hover:text-white"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className="text-base text-gray-300 hover:text-white"
                >
                  My Wallet
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Developed by: Azzam
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="https://www.linkedin.com/in/m-azzam-azis/"
                  target="_blank"
                  className="text-base text-gray-300 hover:text-white flex items-center"
                >
                  <LinkedinIcon className="h-4 w-4 inline-block mr-2" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/m-azzam-azis"
                  target="_blank"
                  className="text-base text-gray-300 hover:text-white flex items-center"
                >
                  <GithubIcon className="h-4 w-4 inline-block mr-2" />
                  Github
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="https://github.com/m-azzam-azis/heartbit.git"
              target="_blank"
              className="text-gray-400 hover:text-gray-300 flex gap-3"
            >
              <span className="">GitHub Repo</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} HeartBit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
