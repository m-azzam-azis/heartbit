"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Lock, Clock, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section - Made taller and more appealing */}
        <section className="pt-32 pb-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                  <span className="">Never lose your</span>
                  <span className="block text-orange-500 transform transition-all hover:scale-105 hover:text-orange-400 duration-300 hover:translate-x-4">
                    Bitcoin
                  </span>
                  <span className="">again</span>
                </h1>
                <p className="mt-8 text-xl text-gray-300 max-w-2xl leading-relaxed">
                  HeartBit is a smart contract solution that automatically
                  redistributes your Bitcoin to designated beneficiaries after a
                  period of inactivity, ensuring your assets are never lost.
                </p>
                <div className="mt-12 flex space-x-6">
                  <Link
                    href="/wallet"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg flex items-center transform transition-transform hover:translate-y-[-4px] hover:shadow-lg duration-300"
                  >
                    Get Started{" "}
                    <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-lg transform transition-all hover:translate-y-[-4px] hover:shadow-lg duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex relative lg:col-span-5 lg:items-center lg:justify-center mt-12 lg:mt-0">
                <div className="absolute w-80 h-80 bg-white rounded-full animate-pulse "></div>
                <div className="absolute w-80 h-80 bg-white/70 rounded-full "></div>
                <div className="absolute size-fit p-8 flex items-center justify-center ">
                  <Image
                    src="/heartbit-logo.png"
                    alt="logo"
                    height={180}
                    width={180}
                    className="hover:-rotate-45 transition-all duration-300 transform hover:scale-110 translate-x-2 -translate-y-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section - Made taller */}
        <section className="py-24 bg-white" id="why">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
                The Problem
              </h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Millions in Bitcoin Lost Forever
              </p>
              <p className="mt-6 max-w-3xl text-xl text-gray-500 lg:mx-auto">
                An estimated 20% of all Bitcoin is lost forever due to forgotten
                passwords, lost keys, or death without proper succession
                planning.
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="border-t-4 border-orange-500 pt-6 px-8 pb-10 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-12 w-12 text-orange-500 transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Lost Access
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 text-base text-gray-500">
                    Keys are lost, hardware fails, passwords are forgotten,
                    resulting in permanently inaccessible Bitcoin.
                  </p>
                </div>

                <div className="border-t-4 border-orange-500 pt-6 px-8 pb-10 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-12 w-12 text-orange-500 transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        No Continuity Plan
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 text-base text-gray-500">
                    Unexpected events like death or disability often leave
                    Bitcoin inaccessible to family members.
                  </p>
                </div>

                <div className="border-t-4 border-orange-500 pt-6 px-8 pb-10 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Lock className="h-12 w-12 text-orange-500 transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Security Complexity
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 text-base text-gray-500">
                    Bitcoin security best practices often make practical
                    inheritance planning difficult or impossible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Made taller */}
        <section className="py-28 bg-gray-50" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
                Our Solution
              </h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Smart Contract Inheritance for Bitcoin
              </p>
              <p className="mt-6 max-w-3xl text-xl text-gray-500 lg:mx-auto">
                HeartBit uses Stacks blockchain technology to create automatic
                Bitcoin inheritance with no custody or trust required.
              </p>
            </div>

            <div className="mt-20">
              <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                <div className="relative p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-md">
                  <dt>
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-md bg-orange-500 text-white transform transition-transform hover:scale-110 duration-300">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="ml-20 text-lg leading-6 font-medium text-gray-900">
                      Non-custodial Smart Contract
                    </p>
                  </dt>
                  <dd className="mt-3 ml-20 text-base text-gray-500">
                    Our solution is a smart contract on the Stacks blockchain.
                    You maintain full control of your Bitcoin at all times.
                  </dd>
                </div>

                <div className="relative p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-md">
                  <dt>
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-md bg-orange-500 text-white transform transition-transform hover:scale-110 duration-300">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="ml-20 text-lg leading-6 font-medium text-gray-900">
                      Simple Setup Process
                    </p>
                  </dt>
                  <dd className="mt-3 ml-20 text-base text-gray-500">
                    Specify beneficiary addresses, allocation percentages, and
                    an inactivity threshold. That&apos;s it!
                  </dd>
                </div>

                <div className="relative p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-md">
                  <dt>
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-md bg-orange-500 text-white transform transition-transform hover:scale-110 duration-300">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="ml-20 text-lg leading-6 font-medium text-gray-900">
                      Automatic Heartbeat Verification
                    </p>
                  </dt>
                  <dd className="mt-3 ml-20 text-base text-gray-500">
                    Periodically verify you still have access by sending a
                    simple &quot;heartbeat&quot; transaction to reset the timer.
                  </dd>
                </div>

                <div className="relative p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-md">
                  <dt>
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-md bg-orange-500 text-white transform transition-transform hover:scale-110 duration-300">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="ml-20 text-lg leading-6 font-medium text-gray-900">
                      Failsafe Distribution
                    </p>
                  </dt>
                  <dd className="mt-3 ml-20 text-base text-gray-500">
                    If the heartbeat timer expires, your Bitcoin is
                    automatically distributed to your chosen beneficiaries.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with animation */}
        <section className="bg-orange-500">
          <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:py-32 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block transform transition-transform hover:translate-x-1 duration-300">
                Ready to ensure your Bitcoin lives on?
              </span>
              <span className="block text-gray-900 transform transition-transform hover:translate-x-1 duration-300">
                Set up your HeartBit today.
              </span>
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/wallet"
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-gray-100 transform transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
                >
                  Get started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transform transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
