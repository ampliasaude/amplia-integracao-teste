// @ts-nocheck
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { FC, LegacyRef, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";
import ButtonLink from "../commons/ButtonLink";
import Section from "../commons/Section";
import PlayButton from "./PlayButton";

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

const VideoContainer = styled.div`
  aspect-ratio: 2/3;
  margin-bottom: -2px;
  position: relative;

  @media (min-width: 768px) {
    aspect-ratio: 1;
  }

  @media (min-width: 992px) {
    aspect-ratio: 16/9;
  }
`;

const CTAContainer = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  gap: 0;
  justify-content: center;
  left: 50%;
  max-width: 600px;
  position: absolute;
  text-align: center;
  top: 80%;
  transform: translate(-50%, -50%);
  transition: opacity 350ms ease, visibility 350ms ease;
  width: 80%;

  a {
    text-decoration: none;
  }

  ${({ visible }) =>
    !visible &&
    css`
      opacity: 0;
      visibility: hidden;
    `}

  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1600px) {
    top: 70%;
  }
`;

const Hero: FC = () => {
  const [isCTAVisible, setIsCTAVisible] = useState(true);
  const { t } = useTranslation("home");

  const onClickPlayButton = () => {
    setIsCTAVisible(false);
  };

  return (
    <Section style={{ minHeight: 0 }}>
      <VideoContainer>
        {/* Video */}
        <ReactPlayerNoSSRWrapper
          height="100%"
          url={t("video")}
          width="100%"
          playsinline
          playing={!isCTAVisible}
          playIcon={<PlayButton onClick={onClickPlayButton} />}
          light="/assets/cover.jpg"
          controls
          onReady={() => setIsCTAVisible(false)}
        />

        {/* CTA */}
        <CTAContainer visible={isCTAVisible}>
          <p>{t("intro")}</p>

          <p>
            <ButtonLink
              backgroundColor="var(--blue)"
              color="var(--white)"
              href="/ferramenta"
              style={{ fontSize: "1.5rem" }}
            >
              {t("cta")}
            </ButtonLink>
          </p>
        </CTAContainer>
      </VideoContainer>
    </Section>
  );
};

export default Hero;
