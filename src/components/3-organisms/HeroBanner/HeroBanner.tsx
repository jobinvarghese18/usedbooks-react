import React from 'react';
import tw from 'twin.macro';
export const HeroBanner: React.FC = () => {
  return (
    <Container>
      <TextContainer>
        <Text>LIBRARY</Text>
        <SubText>NEW BOOKS</SubText>
      </TextContainer>
      <GifContainer>
        <img
          className="w-full h-full"
          title="Pablo_Dribble_shot.gif"
          src="https://cdn.dribbble.com/users/1003944/screenshots/13980982/media/f26daf7ddceaeb9df3f5427e577139f9.gif"
        />
      </GifContainer>
    </Container>
  );
};

const Container = tw.div`h-[700px] w-full flex justify-between p-0`;
const TextContainer = tw.div`w-1/2 flex flex-col justify-center items-center`;
const Text = tw.div`text-8xl`;
const SubText = tw.div`text-6xl font-bold`;
const GifContainer = tw.div`h-[700px] object-contain`;
