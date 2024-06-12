import Link from "next/link";
import { BiLogoInstagram } from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  links: Links[];
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Footer = (props: FooterProps) => {
  const { logo, footerText, columnLinks, footerLinks, socialMediaLinks } = {
    ...FooterDefaults,
    ...props,
  } as Props;
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <Link
            href={logo.url as string}
            className="text-lg font-bold tracking-tighter lg:justify-self-start"
          >
            ViewFinder
          </Link>

          {columnLinks.map((column, index) => (
            <ul
              key={index}
              className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
            >
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex} className="font-semibold">
                  <a href={link.url} className="focus-visible:outline-none">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="focus-visible:outline-none"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pb-4 pt-6 text-sm md:flex-row md:gap-x-6 md:pb-0 md:pt-8">
          <p className="mt-8 text-center md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-x-0 gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li
                key={index}
                className="underline decoration-black underline-offset-1"
              >
                <a href={link.url} className="focus-visible:outline-none">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefaults: FooterProps = {
  logo: {
    url: "/",
    src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
    alt: "Logo image",
  },
  columnLinks: [
    {
      links: [
        { title: "Explore", url: "/explore" },
        // { title: "Link Two", url: "#" },
        // { title: "Link Three", url: "#" },
        // { title: "Link Four", url: "#" },
        // { title: "Link Five", url: "#" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "/", icon: <BiLogoInstagram className="size-6" /> },
  ],
  footerText: "© 2024 View Finder | RCB Software LLC.",
  footerLinks: [
    { title: "Privacy Policy", url: "/" },
    { title: "Terms of Service", url: "/" },
  ],
};

Footer.displayName = "Footer";
