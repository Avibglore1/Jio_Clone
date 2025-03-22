"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Subscription() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 py-12">
        {/* Header */}
        <button
          className="text-5xl mb-4 -ml-28  hover:text-gray-300 transition"
          onClick={() => router.back()}
          aria-label="Go Back"
        >
          ←
        </button>
        <h1 className="text-4xl font-bold">JioCinema Premium</h1>
        <p className="mt-2 text-lg text-gray-300">
          Entertainment Redefined - The best of Hollywood, Before TV premieres,
          Blockbuster movies, Exclusive series, India&apos;s biggest Kids & Family hub +
          365 days of reality!
        </p>

        {/* Plans Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Premium Monthly Plan */}
          <div
            className={`p-6 rounded-lg flex-1 shadow-lg cursor-pointer transition ${
              selectedPlan === "monthly" ? "border-4 border-pink-500" : "bg-purple-700"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded">
              SPECIAL OFFER
            </span>
            <h2 className="text-2xl font-bold mt-3">Premium Monthly</h2>
            <ul className="mt-3 text-sm space-y-2">
              <li> Ad-Free (except sports & live)</li>
              <li> Includes all Premium content</li>
              <li> Any 1 device at a time (up to Asli 4K quality)</li>
              <li> Download and watch anytime</li>
            </ul>
            <div className="mt-4 flex items-center">
              <span className="bg-yellow-500 px-3 py-1 text-black text-sm font-semibold rounded">
                1 Month
              </span>
              <div className="ml-auto text-right">
                <p className="text-3xl font-bold">₹29</p>
                <p className="text-xs text-gray-300 line-through">₹59</p>
                <p className="text-xs text-yellow-300">51% OFF</p>
              </div>
            </div>
          </div>

          {/* Family Plan */}
          <div
            className={`p-6 rounded-lg flex-1 shadow-lg cursor-pointer transition ${
              selectedPlan === "family" ? "border-4 border-pink-500" : "bg-purple-700"
            }`}
            onClick={() => setSelectedPlan("family")}
          >
            <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded">
              SPECIAL OFFER
            </span>
            <h2 className="text-2xl font-bold mt-3">Family</h2>
            <p className="mt-3 text-sm"> Enjoy all Premium plan benefits on up to 4 devices</p>
            <div className="mt-6 flex items-center">
              <span className="bg-yellow-500 px-3 py-1 text-black text-sm font-semibold rounded">
                1 Month
              </span>
              <div className="ml-auto text-right">
                <p className="text-3xl font-bold">₹89</p>
                <p className="text-xs text-gray-300 line-through">₹149</p>
                <p className="text-xs text-yellow-300">40% OFF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue & Pay Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg transition disabled:opacity-50"
            disabled={!selectedPlan} // Disable if no plan selected
          >
            Continue & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
