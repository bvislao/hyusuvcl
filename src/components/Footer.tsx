'use client'

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="flexStart footer">
        <div className="flexBetween footer_copyright">
            <p>@ 2023 Club Hyundai SUVs by <strong><Link href={"https://www.linkedin.com/in/bvislaochavez/"}>  Bryan Vislao Chavez</Link></strong>. All rights reserved</p>
            {/* <p className="text-gray">xx
             Hecho con amor <span className="text-black font-semibold">❤️</span>  
            </p> */}
        </div>
    </section>
  )
}

export default Footer