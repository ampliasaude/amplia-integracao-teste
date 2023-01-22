import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import React, {useEffect} from "react";
import { useRouter } from "next/router";

const ToolPage = () => {

  const router = useRouter();

  useEffect(() => {
    let locale = router.query.locale;
    router.push(`ferramenta/Mapa.html?locale=${locale}`);
  }, []);

  return (
    <></>
  );
};

export default ToolPage;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
