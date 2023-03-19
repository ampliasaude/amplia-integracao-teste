import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";

const Historias = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });
};

export default Historias;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
