import { readdirSync } from "fs";
import { GetServerSidePropsContext, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../../next-i18next.config";
import { getAllPosts, getPostBySlug } from "./api";
import markdownToHtml from "./markdownToHtml";

export const getI18nPaths = () => {
  const langs = i18nextConfig.i18n.locales;
  const files = readdirSync("src/_publicacoes/pt");

  const paths = files.flatMap((fileName) => {
    const lngsArr = langs.flatMap((lng) => ({
      params: {
        locale: lng,
        slug: fileName.replace(".md", ""),
      },
    }));

    return lngsArr;
  });
  return paths;
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    fallback: false,
    paths: getI18nPaths(),
  };
};

export async function getI18nProps(
  ctx: GetServerSidePropsContext,
  ns = ["common"]
) {
  let locale = ctx?.params?.locale;
  locale = typeof locale === "object" ? locale[0] : locale || "";

  let slug = ctx?.params?.slug || "";
  slug = typeof slug === "object" ? slug[0] : slug;

  if (slug !== "") {
    const post = getPostBySlug(slug, locale, [
      "content",
      "coverImage",
      "date",
      "excerpt",
      "slug",
      "tag",
      "title",
    ]);

    const props = {
      ...(await serverSideTranslations(locale || "", ns)),
      slug: ctx?.params?.slug,
      post,
    };
    return props;
  } else {
    const posts = getAllPosts(locale, [
      "coverImage",
      "date",
      "excerpt",
      "slug",
      "tag",
      "title",
    ]);

    const props = {
      ...(await serverSideTranslations(locale || "", ns)),
      posts,
    };
    return props;
  }
}

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: GetServerSidePropsContext) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}
