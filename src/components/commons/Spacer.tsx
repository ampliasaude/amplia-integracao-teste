import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  height: number;
};

const Wrapper = styled.div<Props>`
  height: ${({ height }) => height}px;
`;

const Spacer: FC<Props> = ({ height }) => {
  return <Wrapper height={height}></Wrapper>;
};

export default Spacer;
