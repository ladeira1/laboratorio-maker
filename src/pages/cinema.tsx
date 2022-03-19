import { AspectRatio, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import YouTube from "react-youtube";
import { YouTubePlayer } from 'youtube-player/dist/types';

const Home: NextPage = () => {
  const onReady = ({ target }: { target : YouTubePlayer}) => {
    target.pauseVideo();
  }

  return (
    <Flex
      flexDir="column" 
      align="flex-start"
      px="10rem"
      py="2rem"
    >
      <Heading as="h1" textAlign="left" mb="2rem">Cinema</Heading>
      <Flex align="center" justify="center">
        <YouTube 
          videoId="B530tFZNGI0" 
          opts={{
            height: '720',
            width: '1280',
            playerVars: {
              autoplay: 0,
            }
          }} 
          onReady={onReady}
        />
      </Flex>
    </Flex>
  )
}

export default Home;