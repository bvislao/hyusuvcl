/* eslint-disable jsx-a11y/alt-text */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthProviders from "./AuthProviders";
import { NavLinks } from "../constants";
export default function Navbar() {
  const session = {};
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
        {/* /logo.png */}
          <Image
            src="https://uploads-ssl.webflow.com/6285218f51463c091e9ede5c/639a28277d59452a9db240f1_vivela%20pomotor%20verde.svg"
            width={150}
            height={60}
            alt="Club Hyundai SUVs"
          />
         
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.text}>
                {link.text}
              </Link>
            ))}
          </ul>
      </div>
      {/* <div className="flex-1 flexCenter gap-2">
            <span>Club Hyundai SUVs🇵🇪</span>
        </div> */}
      <div className="flexCenter gap-4">
        {session ? (
          <>
            User
            <Link href="/create-project">
              <button>xxx</button>
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}
