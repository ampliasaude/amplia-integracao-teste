import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import StoryPage from "src/components/Stories/StoryPage";

const Story1: React.FC = () => <StoryPage storyIndex={0} />;

export default Story1;

const getStaticProps = makeStaticProps(["common", "stories"]);
export { getStaticPaths, getStaticProps };
