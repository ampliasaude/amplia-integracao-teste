import { useTranslation } from "next-i18next";
import { getStaticPaths } from "src/lib/getStatic";
import { makeStaticProps } from "src/lib/getStaticBlog";

import Layout from "src/components/Layout";
import { Post } from "src/types/global";
import Section from "src/components/commons/Section";
import Column from "src/components/commons/Column";
import Spacer from "src/components/commons/Spacer";
import PostCard from "src/components/News/PostCard";
import { useEffect, useState } from "react";
import PostFilter from "src/components/News/PostFilter";
import styled from "styled-components";

type Props = {
  posts: Post[];
};

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  a {
    text-decoration: none;
  }
`;

const ToolPage: React.FC<Props> = ({ posts }) => {
  const { t } = useTranslation(["news"]);

  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const tags = t("tags", { returnObjects: true });
  const showOthers = t("showOthers");
  const others = t("othersLabel");
  const tagsWithOthers = showOthers
    ? [...(tags as unknown as string[]), others]
    : [...(tags as unknown as string[])];

  useEffect(() => {
    // Reset
    if (filter === "") {
      setFilteredPosts(posts);
      return;
    }

    // Others
    if (filter === others) {
      const tempPosts = posts.filter((post) => !tags.includes(post.tag));
      setFilteredPosts(tempPosts);
      return;
    }

    const tempPosts = posts.filter((post) => post.tag === filter);
    setFilteredPosts(tempPosts);
  }, [filter, others, posts, tags]);

  return (
    <Layout title={t("title")}>
      <Section backgroundColor="var(--cyan-faded)" padding={150}>
        <Column maxWidth={800}>
          {/* INTRO */}
          <h1>{t("title")}</h1>
          <Spacer height={35} />

          {/* Filter */}
          <PostFilter
            filter={filter}
            setFilter={setFilter}
            tags={tagsWithOthers}
            title={t("filterBy")}
          />

          {/* Posts */}
          <PostsContainer>
            {filteredPosts.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </PostsContainer>
        </Column>
      </Section>
    </Layout>
  );
};

export default ToolPage;

const getStaticProps = makeStaticProps(["common", "news"]);
export { getStaticPaths, getStaticProps };
