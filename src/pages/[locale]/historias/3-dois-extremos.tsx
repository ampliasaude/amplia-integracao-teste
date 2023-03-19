import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import StoryPage from "src/components/Stories/StoryPage";

const Story3: React.FC = () => <StoryPage storyIndex={2} />;

export default Story3;

const getStaticProps = makeStaticProps(["common", "stories"]);
export { getStaticPaths, getStaticProps };
