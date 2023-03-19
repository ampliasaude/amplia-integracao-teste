import { getStaticPaths, makeStaticProps } from "src/lib/getStatic";
import StoryPage from "src/components/Stories/StoryPage";

const Story4: React.FC = () => <StoryPage storyIndex={3} />;

export default Story4;

const getStaticProps = makeStaticProps(["common", "stories"]);
export { getStaticPaths, getStaticProps };
