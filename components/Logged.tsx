"use client";

import { signOut } from "next-auth/react";

export default function Logged() {
  return (
    <li>
      <button
        onClick={() => signOut()}
        className="text-sm text-white bg-slate-700 py-3 md:px-5 px-3 rounded-md uppercase font-[300]"
      >
        sign out
      </button>
    </li>
  );
}
