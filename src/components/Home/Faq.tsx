import { useTranslation } from "next-i18next";
import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { FAQ, Question } from "../../types/global";
import ArrowDown from "../commons/ArrowDown";
import Button from "../commons/Button";
import Column from "../commons/Column";
import Section from "../commons/Section";

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0%;
`;

const Answer = styled.div<{ open: boolean }>`
  line-height: 1.5;
  margin-left: 40px;
  max-height: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 300ms ease, padding 300ms ease;

  ${({ open }) =>
    open &&
    css`
      max-height: 1000px;
      padding: 40px 0 60px;
    `};

  @media (min-width: 768px) {
    max-width: 90%;
  }
`;

const Faq = () => {
  const { t } = useTranslation("home");
  const data: FAQ = t("faq", { returnObjects: true });

  // QUESTION BLOCK
  const Question: FC<{ index: number; question: Question }> = ({
    question,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <li>
        <Button onClick={() => toggleOpen()} style={{ fontSize: "1.125rem" }}>
          <div style={{ lineHeight: 1.5 }}>
            {question.q} <ArrowDown />
          </div>
        </Button>
        <Answer open={isOpen}>{question.a}</Answer>
      </li>
    );
  };

  return (
    <Section backgroundColor="var(--cyan)" id="perguntas" padding={100}>
      <Column maxWidth={800}>
        <>
          <h2 style={{ marginBottom: 0 }}>{data.title}</h2>
          <p
            style={{ marginBottom: "2em" }}
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />

          <QuestionList>
            {data.docs.length > 0 &&
              data.docs.map((question, i) => (
                <Question index={i} key={question.q} question={question} />
              ))}
          </QuestionList>
        </>
      </Column>
    </Section>
  );
};

export default Faq;
