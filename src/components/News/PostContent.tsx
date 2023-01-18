import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import styled from "styled-components";
import { Post } from "../../types/global";
import Spacer from "../commons/Spacer";
import Link from "../intl/Link";

type Props = {
  post: Post;
};

const Wrapper = styled.article`
  background: var(--white);
  padding: 20px;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 50px 150px;
  }

  & > * {
    margin: 0 0 20px;
  }

  a {
    text-decoration: none;
  }
`;

const BackButton = styled.div`
  align-items: center;
  color: var(--cyan-dark);
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 50px;
  text-transform: uppercase;

  span {
    line-height: 1;
  }
`;

const Title = styled.h1`
  color: var(--blue);
  font-size: 1.625rem;
`;

const CoverImage = styled.img`
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
`;

const Content = styled.div`
  * {
    line-height: 1.5;
    margin: 0;
  }

  p,
  ol {
    margin: 0 0 1.5em 0;
  }

  p + ol,
  p + ul {
    margin-top: -1.5em;
  }

  h2,
  h3 {
    color: var(--blue);
    font-size: 1.625rem;
    line-height: 1.2;
  }

  a {
    text-decoration: underline;
    text-decoration-color: var(--cyan);
    text-decoration-thickness: 7px;
    text-underline-offset: -3px;
    text-decoration-skip-ink: none;

    &:hover {
      background: var(--cyan);
    }
  }

  img {
    margin-bottom: -1.5em;

    & + em {
      font-size: 0.8rem;
    }
  }

  iframe {
    aspect-ratio: 16/9;
    height: auto;
    max-width: 100%;
  }
`;

const PostContent: React.FC<Props> = ({ post }) => {
  return (
    <Wrapper>
      {/* Back button */}
      <Link href="/publicacoes">
        <BackButton>
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6175 1.63499e-08L13.75 1.86414L5.01496 9.5L13.75 17.1359L11.6175 19L0.75 9.5L11.6175 1.63499e-08Z"
              fill="#4D8274"
            />
          </svg>
          <span>Voltar</span>
        </BackButton>
      </Link>

      {/* Title */}
      <p>
        <strong>{post.tag}</strong>
      </p>
      <Title>{post.title}</Title>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <CoverImage alt="" src={post.coverImage} />
      <Spacer height={40} />
      <p>
        <strong>{post.date}</strong>
      </p>

      {/* Content */}
      <Content>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </Content>
    </Wrapper>
  );
};

export default PostContent;
