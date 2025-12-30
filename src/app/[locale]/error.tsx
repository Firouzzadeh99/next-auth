"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="max-w-md text-center space-y-6 p-6 rounded-lg bg-gray-800/80 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-red-500">
          Oops! Something Went Wrong
        </h1>
        <p className="text-lg text-gray-300">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
