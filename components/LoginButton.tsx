"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <li>
      <button
        onClick={() => signIn()}
        className="text-sm text-white bg-slate-700 py-3 md:px-5 px-3 rounded-md uppercase font-[300]"
      >
        sign in
      </button>
    </li>
  );
}
