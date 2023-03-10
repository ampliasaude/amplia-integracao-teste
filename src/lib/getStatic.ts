import { GetServerSidePropsContext, NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export async function getI18nProps(
  ctx: GetServerSidePropsContext,
  ns = ["common"]
) {
  let locale = ctx?.params?.locale;
  locale = typeof locale === "object" ? locale[0] : locale;
  let props = {
    ...(await serverSideTranslations(locale || "", ns)),
  };
  return props;
}

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: GetServerSidePropsContext) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
