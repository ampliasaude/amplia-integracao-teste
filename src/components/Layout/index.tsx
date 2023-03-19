import { useTranslation } from "next-i18next";
import React, { FC, ReactElement } from "react";
import { ColorMode } from "src/types/global";
import styled from "styled-components";
import { Footer } from "../Footer";
import { Header } from "../Header";

type Props = {
  children: ReactElement;
  mode?: ColorMode;
  tool?: boolean;
  title?: string;
};

const Main = styled.main`
  min-height: 100vh;
  padding-top: 65px;
`;

const Layout: FC<Props> = ({
  children,
  mode = "light",
  tool = false,
  title,
}) => {
  const { t } = useTranslation("common");
  const headerTitle: string = title || t("siteTitle");
  return (
    <>
      <Header title={headerTitle} tool={tool} mode={mode} />
      <Main>{children}</Main>
      <Footer mode={mode} />
    </>
  );
};

export default Layout;
