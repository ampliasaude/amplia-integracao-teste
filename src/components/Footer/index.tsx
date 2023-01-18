import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import nextI18nextConfig from "../../../next-i18next.config";
import { MenuItem } from "../../types/global";
import { Wrapper as ColumnWrapper } from "../commons/Column";
import Logo from "../commons/Logo";
import Nav from "../commons/Nav";
import SocialMediaBar from "./SocialMediaBar";

type Props = {
  mode?: "light" | "dark";
};

const Wrapper = styled.footer<Props>`
  background: var(--blue-dark);
  color: var(--white);
  padding: 30px 0;

  // Dark mode
  ${({ mode }) =>
    mode === "dark" &&
    css`
      background: var(--gray);
    `}
`;

const FlexColumn = styled(ColumnWrapper)`
  @media (min-width: 768px) {
    align-items: top;
    display: flex;
    justify-content: space-between;
  }
`;

const BlockRight = styled.div`
  flex: 250px 0 0;
  order: 2;

  & > * {
    margin-bottom: 2em !important;
  }
`;

const BlockLeft = styled.div`
  flex: auto;
  order: 1;

  img {
    max-width: 350px;
    width: 100%;
  }
`;

export const Footer: React.FC<Props> = ({ mode = "light" }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const email = t("email");

  let currentLocale =
    router.query.locale || nextI18nextConfig.i18n.defaultLocale;

  const menuItems: MenuItem[] = t("menuItems", { returnObjects: true });

  return (
    <Wrapper mode={mode}>
      <FlexColumn>
        <BlockRight>
          <Logo isFooter mode="dark" />
          <Nav isFooter menuItems={menuItems} mode="dark" />
          <a href={`mailTo:${email}`} style={{ display: "block" }}>
            {email}
          </a>
          <SocialMediaBar />
        </BlockRight>

        <BlockLeft>
          <picture>
            <img alt="" src="/assets/credits.png" />
          </picture>
        </BlockLeft>
      </FlexColumn>
    </Wrapper>
  );
};
