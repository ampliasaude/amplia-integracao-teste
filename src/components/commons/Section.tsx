import React, { FC, ReactElement } from "react";
import styled from "styled-components";

type Props = {
  backgroundColor?: string;
  children: ReactElement | ReactElement[];
  id?: string;
  padding?: number;
  style?: React.CSSProperties;
};

type WrapperProps = {
  bg?: string;
  padding: number;
};

const Wrapper = styled.section<WrapperProps>`
  background-color: ${({ bg }) => bg};
  min-height: 100vh;
  padding: ${({ padding }) => `${padding}px 0`};
`;

const Section: FC<Props> = ({
  backgroundColor = "transparent",
  children,
  id,
  padding = 1,
  style = {},
}) => {
  return (
    <Wrapper bg={backgroundColor} id={id} padding={padding} style={style}>
      {children}
    </Wrapper>
  );
};

export default Section;
