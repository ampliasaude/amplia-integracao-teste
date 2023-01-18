import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import Layout from "src/components/Layout";
import Column from "src/components/commons/Column";
import Section from "src/components/commons/Section";
import styled from "styled-components";
import Spacer from "src/components/commons/Spacer";
import ButtonLink from "../../components/commons/ButtonLink";

const PdfPreview = styled.embed`
  height: 550px;
  width: 100%;
`;

const Methodology = () => {
  const { t } = useTranslation(["methodology"]);
  const pdfFilePath = `/files/${t("fileName")}`;

  return (
    <Layout title={t("title")}>
      <Section backgroundColor="var(--cyan-faded)" padding={150}>
        <Column maxWidth={600}>
          {/* INTRO */}
          <h1>{t("title")}</h1>
          <p>{t("content")}</p>
          <Spacer height={35} />

          {/* DOWNLOAD BUTTON */}
          <ButtonLink href={pdfFilePath} download>
            {t("fileLabel")}
          </ButtonLink>
          <Spacer height={35} />

          {/* FILE PREVIEW */}
          <PdfPreview type="application/pdf" src={pdfFilePath} />
        </Column>
      </Section>
    </Layout>
  );
};

export default Methodology;

const getStaticProps = makeStaticProps(["common", "methodology"]);
export { getStaticPaths, getStaticProps };
