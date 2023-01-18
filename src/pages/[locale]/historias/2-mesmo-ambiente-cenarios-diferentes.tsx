import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import StoryPage from "src/components/Stories/StoryPage";

const Story2: React.FC = () => <StoryPage storyIndex={1} />;

export default Story2;

const getStaticProps = makeStaticProps(["common", "stories"]);
export { getStaticPaths, getStaticProps };
