import React, { FC, ReactElement } from "react";
import styled from "styled-components";

type Props = {
  children: ReactElement | ReactElement[];
  maxWidth?: number;
};

export const Wrapper = styled.div<Props>`
  max-width: ${({ maxWidth }) =>
    maxWidth
      ? `calc(${maxWidth}px + var(--padding-page) * 2)`
      : "calc(var(--max-width) + var(--padding-page) * 2)"};
  margin: 0 auto;
  padding: 0 var(--padding-page);
  width: 100%;
`;

const Column: FC<Props> = ({ children, maxWidth }) => {
  return <Wrapper maxWidth={maxWidth}>{children}</Wrapper>;
};

export default Column;
