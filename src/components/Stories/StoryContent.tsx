// @ts-nocheck
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import {
  default as BaseSwiper,
  EffectFade,
  Pagination,
  SwiperOptions,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Story } from "../../types/global";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import CaretLeft from "../commons/CaretLeft";
import CaretRight from "../commons/CaretRight";
import Spacer from "../commons/Spacer";

interface IWrappedComponent {
  forwardedRef: LegacyRef<ReactPlayer>;
}

const ReactPlayerNoSSRWrapper = dynamic(
  async () => {
    const { default: RP } = await import("react-player");

    const ReactPlayer = ({ forwardedRef, ...props }: IWrappedComponent) => (
      <RP ref={forwardedRef} {...props} />
    );
    return ReactPlayer;
  },
  { ssr: false }
);

type Props = {
  story: Story;
};

const swiperProps: SwiperOptions = {
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: true,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

const Wrapper = styled.div`
  position: relative;
`;

const VideoContainer = styled.div`
  aspect-ratio: 9/10;
  width: 100%;

  video {
    height: 100%;
    width: 100%;
  }
`;

const SwiperContainer = styled.div`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
`;

const ArrowButton = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  margin: 0;
  opacity: 0.3;
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

const SliderContent = styled.div`
  aspect-ratio: 9/10;
  color: var(--white);
  opacity: 0.8;
  font-size: 1.3rem;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }

  a {
    text-decoration: underline;
  }

  div {
    background-color: rgba(26, 26, 26, 0.8);
    padding-bottom: 0.5em;
    backdrop-filter: blur(10px);
  }
`;

const Obs = styled.p`
  color: #aaaaaa;
  font-size: 0.75rem;
  line-height: 1em;
`;

const StoryContent: React.FC<Props> = ({ story }) => {
  const steps = story.steps;
  const [videoPauseAt, setVideoPauseAt] = useState(5);
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [swiper, setSwiper] = useState<typeof Swiper | null>(null);

  const playStep = (stepIndex: number) => {
    if (!playerRef || !playerRef.current) return;

    playerRef.current.seekTo(stepIndex * 5);
    setVideoPauseAt(stepIndex * 5 + 5);
    setIsPlaying(true);
  };

  const slideTo = useCallback(
    (index: number) => {
      if (!swiper) return;
      swiper.slideTo(index);
    },
    [swiper]
  );

  const nextStep = useCallback(() => {
    if (stepIndex >= steps.length - 1) return;
    slideTo(stepIndex + 1);
  }, [slideTo, stepIndex, steps.length]);

  const previousStep = useCallback(() => {
    if (stepIndex < 1) return;
    slideTo(stepIndex - 1);
  }, [slideTo, stepIndex]);

  // Add events to keypress
  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 37:
          previousStep();
          break;
        case 39:
          nextStep();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nextStep, previousStep]);

  return (
    <>
      <div className="swiper-pagination"></div>
      <Spacer height={20} />
      <Wrapper>
        {/* Video */}
        <VideoContainer>
          <ReactPlayerNoSSRWrapper
            height="100%"
            forwardedRef={playerRef}
            url={story.file}
            width="100%"
            muted
            playsinline
            playing={isPlaying}
            onProgress={({ playedSeconds }: { playedSeconds: number }) => {
              if (playedSeconds >= videoPauseAt - 1) {
                setIsPlaying(false);
              }
            }}
          />
        </VideoContainer>

        {/* Text content */}
        <SwiperContainer>
          {/* Slides */}
          <Swiper
            className="swiper--stories"
            effect="fade"
            modules={[EffectFade, Pagination]}
            {...swiperProps}
            onSlideChange={(swiper) => {
              setStepIndex(swiper.snapIndex);
              playStep(swiper.snapIndex);
            }}
            onSwiper={setSwiper}
            onClick={nextStep}
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <SliderContent>
                  <div dangerouslySetInnerHTML={{ __html: step.content }} />
                </SliderContent>
                <Obs dangerouslySetInnerHTML={{ __html: step.obs }} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          {/* Navigation */}
          <ArrowButton
            active={stepIndex > 0}
            onClick={previousStep}
            style={{ left: -30 }}
          >
            <CaretLeft />
          </ArrowButton>
          <ArrowButton
            active={stepIndex < steps.length - 1}
            onClick={nextStep}
            style={{ right: -30 }}
          >
            <CaretRight />
          </ArrowButton>
        </SwiperContainer>
      </Wrapper>
    </>
  );
};

export default StoryContent;
