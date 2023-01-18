import { useTranslation } from "next-i18next";
import Head from "next/head";
import styled, { css } from "styled-components";
import Column from "../commons/Column";
import Link from "../intl/Link";
import { ColorMode, MenuItem } from "src/types/global";
import Nav from "../commons/Nav";
import { useState } from "react";
import Hamburger from "./Hamburger";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "../commons/Logo";

type Props = {
  mode?: ColorMode;
  title: string;
  tool?: boolean;
};

type WrapperProps = {
  isMenuOpen: boolean;
  mode: ColorMode;
};

const Wrapper = styled.div<WrapperProps>`
  background: var(--white);
  color: var(--black);
  left: 0;
  max-height: ${({ isMenuOpen }) => (isMenuOpen ? "80vh" : "65px")};
  overflow: hidden;
  padding: var(--padding-header);
  position: fixed;
  top: 0;
  transition: max-height 300ms ease;
  width: 100%;
  z-index: 9;

  // Dark mode
  ${({ mode }) =>
    mode === "dark" &&
    css`
      background: var(--gray);
      color: var(--white);
    `}

  a {
    text-decoration: none;
  }
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LogoWrapper = styled.h1`
  margin: 0;
  a {
    display: block;
  }
`;

const MenuWrapper = styled.div<{ isMenuOpen: boolean }>`
  flex: 100% 0 0;
  margin: 10px 0;
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? "visible" : "hidden")};
  transition: visibility 0s;
  transition-delay: ${({ isMenuOpen }) => (isMenuOpen ? "0s" : "300ms")};

  @media (min-width: 1200px) {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    flex: auto;
    visibility: visible;
  }
`;

const Tagline = styled.p`
  display: none;

  @media (min-width: 500px) {
    display: block;
    color: var(--blue);
    display: inline;
    font: var(--title-font);
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0 0 0 1rem;
  }
`;

export const Header: React.FC<Props> = ({
  mode = "light",
  title,
  tool = false,
}) => {
  const { t } = useTranslation("common");
  const description = t("description");
  const ogImgUrl = t("url") + "/assets/share.png";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems: MenuItem[] = t("menuItems", { returnObjects: true });

  return (
    <Wrapper mode={mode} isMenuOpen={isMenuOpen}>
      {/* Meta */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImgUrl} />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
      </Head>

      {/* Content */}
      <Column>
        <Content>
          {/* Logo */}
          <LogoWrapper>
            <>
              <Link href="/">
                <Logo mode={mode} />
              </Link>
            </>
          </LogoWrapper>
          {tool && (
            <Tagline>
              <strong>Trilhas Exploratórias</strong>
              <br />
              dados de gestações únicas
            </Tagline>
          )}

          {/* Hamburger */}
          {/* {windowWidth < RESPONSIVE.md && ( */}
          <Hamburger mode={mode} toggleMenu={toggleMenu} />
          {/* )} */}

          <MenuWrapper isMenuOpen={isMenuOpen}>
            {/* Nav */}
            <Nav closeMenu={closeMenu} menuItems={menuItems} mode={mode} />
            {/* Language Switcher */}
            <LanguageSwitcher />
          </MenuWrapper>
        </Content>
      </Column>
    </Wrapper>
  );
};
