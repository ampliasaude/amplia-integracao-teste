import React, { CSSProperties, FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  backgroundColor?: string;
  color?: string;
  children: ReactNode;
  href: string;
  style?: {
    [param: string]: string;
  };
  [param: string]: unknown;
};

const Wrapper = styled.a<Props>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 999px;
  color: ${({ color }) => color};
  display: inline-block;
  font-weight: 700;
  padding: 0.25em 1em;
`;
const ButtonLink: FC<Props> = ({
  backgroundColor = "var(--white)",
  color = "var(--black)",
  children,
  href,
  style,
  ...rest
}) => {
  return (
    <Wrapper
      backgroundColor={backgroundColor}
      color={color}
      href={href}
      style={style}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export default ButtonLink;
