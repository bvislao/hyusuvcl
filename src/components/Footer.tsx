"use client";

import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type Links = { 
  href:string;
  key:string;
  text:string;
}
type ColumnProps = {
  title: string;
  links: Array<Links>;
};

const FooterColumn = ({ title, links }: ColumnProps) => {
  return (
  <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
          {links.map((link) => <Link target="_bla" href={link?.href} key={link.key}>{link.text}</Link>)} 
      </ul>
  </div>);
};

const Footer = () => {
  //console.log(footerLinks);
  return (
    <section className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src={"https://hyusuvcl.vercel.app/logo.png"}
            width={116}
            height={38}
            alt="logo"
          />

          <p className="text-start text-sm font-normal mt-5">
            🥇 Comunidad Oficial Hyundai en Perú 🇵🇪. Autos, aventuras, viajes y
            más. 🚙
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
              <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} /> 
              <div className="flex-1 flex flex-col gap-4">
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
              </div>
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>
          @ 2023 Club Hyundai SUVs by{" "}
          <strong>
            <Link
              className="text-red-700"
              href={"https://www.linkedin.com/in/bvislaochavez/"}
            >
              {" "}
              Bryan Vislao Chavez
            </Link>
          </strong>
          . All rights reserved
        </p>
        <p className="text-gray">
          <strong>
            Hecho con amor{" "}
            <span className="text-black font-semibold">&#128153;</span>{" "}
          </strong>
        </p>
      </div>
    </section>
  );
};

export default Footer;
