import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";

import Layout from "src/components/Layout";
import Hero from "src/components/Home/Hero";
import Stories from "../../components/Home/Stories";
import Faq from "../../components/Home/Faq";
import { Story } from "../../types/global";

const Homepage = () => {
  const { t } = useTranslation(["common", "home", "stories"]);
  const stories = t("stories:stories", {
    returnObjects: true,
  }) as unknown as Story[];

  return (
    <Layout title={t("common:siteTitle")}>
      <>
        <Hero />
        <Stories title={t("home:storiesTitle")} stories={stories} home />
        <Faq />
      </>
    </Layout>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(["common", "home", "stories"]);
export { getStaticPaths, getStaticProps };
