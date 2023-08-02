"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-base transition-colors font-medium text-slate-50 hover:bg-blue-800 outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
    >
      {pending ? "Updating..." : "Update"}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 14l11 -11"></path>
        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
      </svg>
    </button>
  );
};
