import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import Layout from "src/components/Layout";
import Column from "src/components/commons/Column";
import Section from "../../components/commons/Section";
import Spacer from "../../components/commons/Spacer";
import { FC } from "react";
import styled from "styled-components";
import LinkChain from "../../components/commons/LinkChain";
import Link from "next/link";

type Profile = {
  img: string;
  name: string;
  role: string;
  description: string;
  link: string;
};

const TeamTitle = styled.h2`
  margin: auto;
  max-width: 800px;
`;

const TeamWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 30px;
  row-gap: 70px;
  list-style: none;
  padding: 0;
`;

const CardWrapper = styled.li`
  margin: 0;
`;

const Picture = styled.picture`
  background: var(--cyan);
  height: 150px;
  border-radius: 75px;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 150px;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  a {
    text-decoration: none;
  }
`;

const Role = styled.p`
  font-size: 0.8125rem;
  font-weight: 700;
  margin: 0 0 1em;
`;

const Description = styled.p`
  font-size: 0.8125rem;
`;

const ProfileCard: FC<Profile> = (profile) => (
  <CardWrapper key={profile.name}>
    <Picture>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={profile.img} />
    </Picture>
    <Name>
      <Link href={profile.link}>
        <a>
          {profile.name} <LinkChain />
        </a>
      </Link>
    </Name>
    <Role>{profile.role}</Role>
    <Description>{profile.description}</Description>
  </CardWrapper>
);
const About = () => {
  const { t } = useTranslation(["about"]);

  return (
    <Layout title={t("title")}>
      <Section backgroundColor="var(--cyan-faded)" padding={150}>
        <Column maxWidth={800}>
          {/* INTRO */}
          <h1>{t("title")}</h1>
          <p dangerouslySetInnerHTML={{ __html: t("about") }} />
          <Spacer height={50} />
          {/* PERFORMANCE */}
          <h1>{t("subtitle")}</h1>
          <p dangerouslySetInnerHTML={{ __html: t("performance") }} />
          <Spacer height={150} />
        </Column>

        <Column maxWidth={850}>
          {/* TEAM */}
          <TeamTitle>{t("teamTitle")}</TeamTitle>
          <Spacer height={75} />
          <TeamWrapper>
            {(t("team1", { returnObjects: true }) as Profile[]).map(
              (card: Profile) => ProfileCard(card)
            )}
          </TeamWrapper>
          <Spacer height={150} />
          <TeamWrapper>
            {(t("team2", { returnObjects: true }) as Profile[]).map(
              (card: Profile) => ProfileCard(card)
            )}
          </TeamWrapper>
        </Column>
      </Section>
    </Layout>
  );
};

export default About;

const getStaticProps = makeStaticProps(["common", "about"]);
export { getStaticPaths, getStaticProps };
