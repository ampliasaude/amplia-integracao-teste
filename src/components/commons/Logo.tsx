import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { FC } from "react";
import { ColorMode } from "../../types/global";

type Props = {
  isFooter?: boolean;
  mode?: ColorMode;
};

const Logo: FC<Props> = ({ isFooter, mode = "light" }) => {
  const { t } = useTranslation("header");

  const logoSrc =
    mode === "light" ? "/assets/logo.png" : "/assets/logo-dark.png";

  if (isFooter)
    return (
      <picture>
        <img alt={t("logoAlt")} height={65} src={logoSrc} width={210} />
      </picture>
    );

  return (
    <picture>
      <img alt={t("logoAlt")} height={45} src={logoSrc} width={146} />
    </picture>
  );
};

export default Logo;
