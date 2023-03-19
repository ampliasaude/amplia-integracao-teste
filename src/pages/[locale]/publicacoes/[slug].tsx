import { getStaticPaths, makeStaticProps } from "src/lib/getStaticBlog";

import Layout from "src/components/Layout";
import { Post } from "src/types/global";
import Section from "src/components/commons/Section";
import Column from "src/components/commons/Column";
import PostContent from "src/components/News/PostContent";

type Props = {
  post: Post;
};

const ToolPage: React.FC<Props> = ({ post }) => {
  return (
    <Layout title={post.title}>
      <Section backgroundColor="var(--cyan-faded)" padding={150}>
        <Column maxWidth={1000}>
          <PostContent post={post} />
        </Column>
      </Section>
    </Layout>
  );
};

export default ToolPage;

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
