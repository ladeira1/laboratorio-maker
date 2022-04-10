import { Flex } from "@chakra-ui/react";
import { Item } from "components/Item";
import { Wrapper } from "components/Wrapper";
import { NextPage } from "next";
import { LegacyRef, MutableRefObject, useRef } from "react";
import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";

const Home: NextPage = () => {
  const onReady = ({ target }: { target: YouTubePlayer }) => {
    target.pauseVideo();
  };

  return (
    <Wrapper title="Cinema">
      <Flex align="flex-start" justify="flex-start">
        <Item>
          {typeof window !== "undefined" && (
            <YouTube
              videoId="B530tFZNGI0"
              opts={{
                height: String(window?.innerHeight * 0.78),
                width: String(window?.innerWidth * 0.7),
                playerVars: {
                  autoplay: 0,
                },
              }}
              onReady={onReady}
            />
          )}
        </Item>
      </Flex>
    </Wrapper>
  );
};

export default Home;
