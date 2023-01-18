import languageDetector from "src/lib/languageDetector";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const SwitchWrapper = styled.a`
  display: inline;
`;

const LanguageSwitchLink = ({ isCurrent, locale, ...rest }) => {
  const router = useRouter();

  let href = rest.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === "locale") {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k]);
  });
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;
  }

  return (
    <Link href={href}>
      <SwitchWrapper
        as={isCurrent ? "span" : "a"}
        href={href}
        onClick={() =>
          !isCurrent &&
          languageDetector?.cache &&
          languageDetector.cache(locale)
        }
      >
        {locale}
      </SwitchWrapper>
    </Link>
  );
};

export default LanguageSwitchLink;
