import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
};

const Wrapper = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const PlayButton: FC<Props> = ({ onClick }) => (
  <Wrapper onClick={onClick}>
    <svg
      width="146"
      height="147"
      viewBox="0 0 146 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.83374" width="146" height="146" rx="73" fill="white" />
      <path
        d="M109.228 68.5047L60.7921 41.6804C56.8566 39.5019 50.8296 41.6159 50.8296 47.004V100.64C50.8296 105.473 56.4301 108.387 60.7921 105.963L109.228 79.1519C113.549 76.7672 113.563 70.8893 109.228 68.5047Z"
        fill="black"
      />
    </svg>
  </Wrapper>
);

export default PlayButton;
