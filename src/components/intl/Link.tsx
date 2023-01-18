import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { default as NextLink } from "next/link";

interface Props {
  children: ReactNode;
  skipLocaleHandling?: boolean;
  locale?: string;
  href?: string;
}

const Link: React.FC<Props> = ({ children, skipLocaleHandling, ...rest }) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || "";

  let href = rest.href || router.asPath;
  if (href.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace("[locale]", String(locale));
  }

  return (
    <NextLink href={href}>
      <a {...rest}>{children}</a>
    </NextLink>
  );
};

export default Link;
