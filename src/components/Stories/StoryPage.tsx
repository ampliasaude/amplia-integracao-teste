import React from "react";
import { useTranslation } from "next-i18next";
import Layout from "src/components/Layout";
import { Story } from "src/types/global";
import Section from "src/components/commons/Section";
import Column from "src/components/commons/Column";
import StoryContent from "src/components/Stories/StoryContent";
import Stories from "src/components/Home/Stories";
import Spacer from "src/components/commons/Spacer";

type Props = {
  storyIndex: number;
};

const StoryPage: React.FC<Props> = ({ storyIndex }) => {
  const { t } = useTranslation("stories");
  const stories: Story[] = t("stories", { returnObjects: true });
  const story = stories[storyIndex];
  const otherStories = [...stories];
  otherStories.splice(storyIndex, 1);

  return (
    <Layout title={story.title} mode="dark">
      <>
        <Section backgroundColor="var(--gray-dark)" padding={150}>
          <Column maxWidth={700}>
            <StoryContent story={story} />
          </Column>
          <Spacer height={100} />
          <Stories title={t("otherStories")} stories={otherStories} />
        </Section>
      </>
    </Layout>
  );
};

export default StoryPage;
