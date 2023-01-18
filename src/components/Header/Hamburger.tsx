import React, { FC } from "react";
import { ColorMode } from "src/types/global";
import styled from "styled-components";

interface Props {
  mode: ColorMode;
  toggleMenu: () => void;
}

const Wrapper = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  padding: 10px;
  transform: translateX(10px);

  @media (min-width: 1200px) {
    display: none;
    visibility: hidden;
  }
`;

const Hamburger: FC<Props> = ({ mode, toggleMenu }) => {
  const fill = mode === "dark" ? "var(--white)" : "var(--blue)";

  return (
    <Wrapper onClick={toggleMenu}>
      <svg
        width="36"
        height="25"
        viewBox="0 0 36 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.25 20H1.75C1.41848 20 1.10054 20.1317 0.866117 20.3661C0.631696 20.6005 0.5 20.9185 0.5 21.25V23.75C0.5 24.0815 0.631696 24.3995 0.866117 24.6339C1.10054 24.8683 1.41848 25 1.75 25H34.25C34.5815 25 34.8995 24.8683 35.1339 24.6339C35.3683 24.3995 35.5 24.0815 35.5 23.75V21.25C35.5 20.9185 35.3683 20.6005 35.1339 20.3661C34.8995 20.1317 34.5815 20 34.25 20ZM34.25 10H1.75C1.41848 10 1.10054 10.1317 0.866117 10.3661C0.631696 10.6005 0.5 10.9185 0.5 11.25V13.75C0.5 14.0815 0.631696 14.3995 0.866117 14.6339C1.10054 14.8683 1.41848 15 1.75 15H34.25C34.5815 15 34.8995 14.8683 35.1339 14.6339C35.3683 14.3995 35.5 14.0815 35.5 13.75V11.25C35.5 10.9185 35.3683 10.6005 35.1339 10.3661C34.8995 10.1317 34.5815 10 34.25 10ZM34.25 0H1.75C1.41848 0 1.10054 0.131697 0.866117 0.366117C0.631696 0.600538 0.5 0.918479 0.5 1.25V3.75C0.5 4.08152 0.631696 4.39946 0.866117 4.63388C1.10054 4.8683 1.41848 5 1.75 5H34.25C34.5815 5 34.8995 4.8683 35.1339 4.63388C35.3683 4.39946 35.5 4.08152 35.5 3.75V1.25C35.5 0.918479 35.3683 0.600538 35.1339 0.366117C34.8995 0.131697 34.5815 0 34.25 0Z"
          fill={fill}
        />
      </svg>
    </Wrapper>
  );
};

export default Hamburger;
