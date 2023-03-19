import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import nextI18nextConfig from "../../../next-i18next.config";
import LanguageSwitchLink from "../intl/LanguageSwitchLink";

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  text-align: right;
  text-transform: uppercase;

  li {
    display: inline;

    &:not(:last-of-type):after {
      content: " | ";
    }

    span {
      opacity: 0.5;
    }
  }

  @media (min-width: 768px) {
    display: inline-block;
    font-size: 0.75rem;
  }
`;

const LanguageSwitcher: FC = () => {
  const router = useRouter();
  let currentLocale =
    router.query.locale || nextI18nextConfig.i18n.defaultLocale;

  return (
    <Wrapper>
      {nextI18nextConfig.i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <LanguageSwitchLink
              isCurrent={locale === currentLocale}
              key={locale}
              locale={locale}
            />
          </li>
        );
      })}
    </Wrapper>
  );
};

export default LanguageSwitcher;
