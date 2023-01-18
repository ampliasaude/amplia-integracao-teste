import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";

import Layout from "src/components/Layout";
import styled from "styled-components";

const Iframe = styled.iframe`
  border: none;
  height: 100vh;
  width: 100%;
`;

const ToolPage = () => {
  const { t } = useTranslation(["common"]);

  return (
    <Layout tool>
      <Iframe
        src="https://ampliasaude.github.io/amplia-site/mapa/"
        scrolling="no"
        frameBorder="0"
      />
    </Layout>
  );
};

export default ToolPage;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
