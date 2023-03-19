import { useTranslation } from "next-i18next";
import React, { FC, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Story } from "src/types/global";
import styled, { css } from "styled-components";
import slugify from "../../utils/slugify";
import Column from "../commons/Column";
import Section from "../commons/Section";
import Spacer from "../commons/Spacer";
import Link from "../intl/Link";
import CaretLeft from "../commons/CaretLeft";
import CareRight from "../commons/CaretRight";

type Props = {
  title: string;
  stories: Story[];
  home?: boolean;
};

const swiperProps = {
  spaceBetween: 20,
  slidesPerView: 1.5,
  centeredSlides: true,
  breakpoints: {
    600: {
      centeredSlides: true,
      slidesPerView: 2.5,
    },
    992: {
      centeredSlides: false,
      spaceBetween: 50,
      slidesPerView: 3,
    },
  },
};

const Title = styled.h2`
  color: var(--cyan);
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
`;

const Slide = styled.figure`
  border-radius: 12px;
  display: inline-block;
  margin: 0;
  overflow: hidden;

  @media (min-width: 992px) {
    width: auto;
  }
`;

const SwiperContainer = styled.div`
  margin: 0 calc(var(--padding-page) * -1);
  position: relative;

  @media (min-width: 992px) {
    margin: 0;
    padding: 0 50px;
  }
`;

const ArrowButton = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  margin: 0;
  opacity: 0.5;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  ${({ active }) =>
    active &&
    css`
      cursor: pointer;
      opacity: 1;
    `}

  @media (min-width: 992px) {
    display: block;
  }
`;

const Stories: FC<Props> = ({ home = false, title, stories }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [swiperIndex, setSwiperIndex] = useState(0);

  const handleLeftClick = useCallback(() => {
    if (!swiperRef || !(swiperIndex > 0)) return;
    setSwiperIndex(swiperRef.activeIndex - 1);
    swiperRef.slidePrev();
  }, [swiperIndex, swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef || !(swiperIndex < stories.length - 3)) return;
    setSwiperIndex(swiperRef.activeIndex + 1);
    swiperRef.slideNext();
  }, [stories.length, swiperIndex, swiperRef]);

  return (
    <Section
      backgroundColor="var(--gray-dark)"
      id="historias"
      padding={home ? 150 : 0}
      style={{
        minHeight: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Column>
        <>
          {/* Title */}
          <Title color="var(--cyan)">{title}</Title>
          <Spacer height={50} />

          {/* Gallery */}
          <SwiperContainer>
            {/* Slides */}
            <Swiper onSwiper={setSwiperRef} {...swiperProps}>
              {stories?.length > 0 &&
                stories.map((story) => {
                  const slug = slugify(story.title);
                  return (
                    <SwiperSlide key={story.title}>
                      <Link href={story.slug}>
                        <Slide>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={story.title}
                            src={`/assets/stories/${story.image}`}
                          />
                        </Slide>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            {/* Navigation */}
            <ArrowButton
              active={swiperIndex > 0}
              onClick={handleLeftClick}
              style={{ left: 0 }}
            >
              <CaretLeft />
            </ArrowButton>
            <ArrowButton
              active={swiperIndex < stories.length - 3}
              onClick={handleRightClick}
              style={{ right: 0 }}
            >
              <CareRight />
            </ArrowButton>
          </SwiperContainer>
        </>
      </Column>
    </Section>
  );
};

export default Stories;
