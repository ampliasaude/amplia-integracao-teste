import React, { CSSProperties, FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  backgroundColor?: string;
  color?: string;
  children: ReactNode;
  onClick: () => void;
  style?: {
    [param: string]: string;
  };
  [param: string]: unknown;
};

const Wrapper = styled.button<Props>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 25px;
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5em 1em;
  text-align: left;
  width: 100%;
`;
const Button: FC<Props> = ({
  backgroundColor = "var(--white)",
  color = "var(--black)",
  children,
  onClick,
  style,
  ...rest
}) => {
  return (
    <Wrapper
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
