"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [verse, setVerse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fade, setFade] = useState<boolean>(false);

  // Fetch a random Bible verse from labs.bible.org
  const fetchBibleVerse = async () => {
    try {
      setLoading(true);
      setFade(false);
      setError("");

      const res = await fetch(
        "https://labs.bible.org/api/?passage=random&type=json",
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No verse data returned.");
      }

      const { bookname, chapter, verse: verseNumber, text } = data[0];
      const formattedVerse = `${text.trim()} — ${bookname} ${chapter}:${verseNumber}`;
      setVerse(formattedVerse);
      setFade(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch one random verse on page load
  useEffect(() => {
    fetchBibleVerse();
  }, []);

  return (
    <div className="w-full max-w-xl rounded-lg bg-white bg-opacity-80 p-8 shadow-lg backdrop-blur-sm">
      {/* Title & Icon */}
      <div className="mb-6 flex flex-col items-center">
        {/* A simple cross icon in SVG (feel free to swap or remove) */}
        <svg
          className="mb-2 h-8 w-8 text-yellow-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c-0.552 0-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1v4c0 0.552 0.448 1 1 1h6v6c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1v-4c0-0.552-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1h-4z"></path>
        </svg>

        <h1 className="text-center text-3xl font-bold text-yellow-800">
          Random Bible Verse
        </h1>
      </div>

      {/* Verse Container */}
      <div className="mb-6 min-h-[80px] flex items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="h-6 w-6 animate-spin text-yellow-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="text-yellow-700">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <p
            className={`text-center text-lg italic leading-relaxed text-neutral-800 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            “{verse}”
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="mx-auto block w-full rounded-full bg-yellow-700 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-colors duration-300 hover:bg-yellow-800 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={fetchBibleVerse}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get New Verse"}
      </button>
    </div>
  );
}
