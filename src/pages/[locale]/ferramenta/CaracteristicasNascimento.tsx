import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import {CaracteristicasNascimento} from "../../../components/ferramenta";
import Layout from "src/components/Layout";

const ToolPage = () => {
  const { t } = useTranslation(["common"]);

  return (
    <Layout tool>
      <CaracteristicasNascimento />    
    </Layout>
  );
};

export default ToolPage;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };