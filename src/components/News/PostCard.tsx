import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Post } from "../../types/global";

type Props = { post: Post };

const Wrapper = styled.article`
  background: var(--white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 20px;

  * {
    margin: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.figure`
  flex: 40% 0 0;
  margin: 0;
  position: relative;

  img {
    border-radius: 10px;
    overflow: hidden;
  }
`;

const Date = styled.p`
  font-size: 0.75rem;
`;

const Tag = styled.span`
  background-color: var(--blue);
  border-radius: 99px;
  color: var(--white);
  padding: 0.25em 0.75em;
`;

const Title = styled.h1`
  color: var(--blue);
  font-size: 1.25rem;
`;

const Excerpt = styled.p`
  color: var(--cyan-dark);
  font-size: 0.875rem;
`;

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <a href={`${post.slug}`}>
      <Wrapper>
        <ImageContainer>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={post.coverImage} />
        </ImageContainer>
        <TextContainer>
          <Date>
            {post.date} • <Tag>{post.tag}</Tag>
          </Date>
          <Title>{post.title}</Title>
          <Excerpt>{post.excerpt}</Excerpt>
        </TextContainer>
      </Wrapper>
    </a>
  );
};

export default PostCard;
