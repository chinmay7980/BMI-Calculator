import React, { useState, useEffect } from "react";

const categories = [
  { max: 18.5, label: "Underweight", quote: "Dream big, work hard – even underweight champions rise!" },
  { max: 24.9, label: "Normal", quote: "Peak fitness achieved. You have the discipline of CR7! SIUUU!" },
  { max: 29.9, label: "Overweight", quote: "Push forward, refine your game – greatness awaits!" },
  { max: Infinity, label: "Obese", quote: "Every champion starts somewhere – keep grinding!" },
];

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState(""); // metric height
  const [heightFt, setHeightFt] = useState(""); // imperial height ft
  const [heightIn, setHeightIn] = useState(""); // imperial height in
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [quote, setQuote] = useState("");

  // Validate inputs – disallow negative numbers
  const isValidNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0;
  };

  // Compute BMI whenever relevant inputs change
  useEffect(() => {
    let computedBmi = null;
    if (unit === "metric") {
      if (isValidNumber(weight) && isValidNumber(heightCm) && parseFloat(heightCm) > 0) {
        const heightM = parseFloat(heightCm) / 100;
        computedBmi = parseFloat(weight) / (heightM * heightM);
      }
    } else {
      if (
        isValidNumber(weight) &&
        isValidNumber(heightFt) &&
        isValidNumber(heightIn)
      ) {
        const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn);
        if (totalInches > 0) {
          computedBmi = (parseFloat(weight) * 703) / (totalInches * totalInches);
        }
      }
    }
    if (computedBmi) {
      const rounded = Math.round(computedBmi * 10) / 10; // one decimal place
      setBmi(rounded);
      const cat = categories.find((c) => rounded <= c.max);
      setCategory(cat.label);
      setQuote(cat.quote);
    } else {
      setBmi(null);
      setCategory("");
      setQuote("");
    }
  }, [unit, weight, heightCm, heightFt, heightIn]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
    // clear fields on switch
    setWeight("");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full mx-4 text-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300">
          BMI Calculator
        </h2>
        {/* Unit toggle */}
        <div className="flex items-center justify-center mb-4">
          <span className={`mr-2 ${unit === "metric" ? "text-yellow-300" : ""}`}>Metric</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={unit === "imperial"}
              onChange={toggleUnit}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-yellow-500 relative">
              <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-full" />
            </div>
          </label>
          <span className={`ml-2 ${unit === "imperial" ? "text-yellow-300" : ""}`}>Imperial</span>
        </div>

        {/* Input fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input
              type="number"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-white/20 rounded px-2 py-1 text-white placeholder-gray-300 focus:outline-none"
              placeholder="Enter weight"
            />
          </div>
          {unit === "metric" ? (
            <div>
              <label className="block text-sm mb-1">Height (cm)</label>
              <input
                type="number"
                min="0"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-white/20 rounded px-2 py-1 text-white placeholder-gray-300 focus:outline-none"
                placeholder="Enter height"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm mb-1">Height (ft)</label>
                <input
                  type="number"
                  min="0"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full bg-white/20 rounded px-2 py-1 text-white placeholder-gray-300 focus:outline-none"
                  placeholder="ft"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Height (in)</label>
                <input
                  type="number"
                  min="0"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-full bg-white/20 rounded px-2 py-1 text-white placeholder-gray-300 focus:outline-none"
                  placeholder="in"
                />
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {bmi !== null && (
          <div className="mt-4 text-center">
            <p className="text-xl font-semibold">Your BMI: <span className="text-yellow-400">{bmi}</span></p>
            <p className="mt-1">Category: <span className="text-yellow-300">{category}</span></p>
          </div>
        )}

        {/* Motivation box */}
        {quote && (
          <div className="mt-4 p-3 bg-black/30 rounded text-center italic text-sm">
            {quote}
          </div>
        )}
      </div>
    </div>
  );
}
