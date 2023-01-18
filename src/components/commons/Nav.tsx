import React, { FC } from "react";
import styled, { css } from "styled-components";
import { ColorMode, MenuItem } from "src/types/global";
import Link from "../intl/Link";

interface Props {
  closeMenu?: () => void;
  isFooter?: boolean;
  menuItems: MenuItem[];
  mode?: ColorMode;
}

interface WrapperProps {
  mode?: ColorMode;
  isFooter?: boolean;
}

const Wrapper = styled.nav<WrapperProps>`
  color: ${({ mode }) => (mode === "dark" ? "var(--white)" : "var(--blue)")};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: ${({ isFooter }) => (isFooter ? "left" : "right")};
    text-transform: uppercase;

    li {
      margin-bottom: 1em;
    }
  }

  /* Responsiveness applies only to header */
  @media (min-width: 768px) {
    ${({ isFooter }) =>
      !isFooter &&
      css`
        font-size: 0.75rem;

        ul {
          margin: 0 3.5em 0 0;

          li {
            display: inline;

            &:not(:last-of-type) {
              margin-right: 1.5em;
            }
          }
        }
      `}
  }
`;

const Nav: FC<Props> = ({ closeMenu, menuItems, isFooter, mode }) => {
  return (
    <Wrapper mode={mode} isFooter={isFooter}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} onClick={() => closeMenu && closeMenu()}>
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Nav;
