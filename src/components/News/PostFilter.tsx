import React from "react";
import styled from "styled-components";
import Button from "../commons/Button";

type Props = {
  filter: string;
  setFilter: (str: string) => void;
  tags: string[];
  title: string;
};

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.p`
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  margin-right: 0.8rem;

  @media (min-width: 768px) {
    display: inline-block;
  }
`;

const FilterButton = styled(Button)`
  font-size: 0.875rem;
  font-weight: 500;
  margin-right: 0.8rem;
  margin-top: 0.8rem;
  width: auto;
`;

const PostFilter: React.FC<Props> = ({ filter, setFilter, tags, title }) => {
  const updateTag = (tag: string) => {
    if (tag === filter) {
      setFilter("");
      return;
    }
    setFilter(tag);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      {tags.map((tag) => (
        <FilterButton
          key={tag}
          backgroundColor={tag === filter ? "var(--blue)" : "var(--cyan-dark)"}
          color="var(--white)"
          onClick={() => updateTag(tag)}
        >
          <span>{tag}</span>
        </FilterButton>
      ))}
    </Wrapper>
  );
};

export default PostFilter;
