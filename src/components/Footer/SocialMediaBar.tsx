import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { FC } from "react";
import styled from "styled-components";

type Link = {
  alt: string;
  icon: string;
  path: string;
};

const Wrapper = styled.ul`
  display: flex;
  height: 30px;
  list-style: none;
  padding: 0;

  li {
    align-items: center;
    display: flex;

    &:not(:last-of-type) {
      margin-right: 1em;
    }

    img {
      object-fit: contain;
    }
  }
`;

const SocialMediaBar: FC = () => {
  const { t } = useTranslation(["common"]);
  const links: Link[] = t("socialMedia", { returnObjects: true });

  return (
    <Wrapper>
      {links.length &&
        links.map((link) => (
          <li key={link.path}>
            <a href={link.path} target="_blank" rel="noreferrer noopener">
              <picture>
                <img
                  alt={link.alt}
                  height={30}
                  src={`/assets/${link.icon}.svg`}
                  width={30}
                />
              </picture>
            </a>
          </li>
        ))}
    </Wrapper>
  );
};

export default SocialMediaBar;
