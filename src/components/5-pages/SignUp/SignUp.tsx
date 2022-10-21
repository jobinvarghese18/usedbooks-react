import React from 'react';
import tw from 'twin.macro';
import { SignUPForm } from '../../3-organisms/SingUpForm';

export const SignUpPage: React.FC = () => {
  return (
    <Container>
      <LeftContainer>
        <TextContainer>
          <Heading>{`Let's Read at Home`}</Heading>
          <Paragraph>{`Explore the collection and shop for books online. You can find your favourite literature, novels, storybooks, and more on offer.`}</Paragraph>
          <Round />
        </TextContainer>
      </LeftContainer>
      <SignUPForm />
    </Container>
  );
};

const Container = tw.div`h-[100vh] w-full flex overflow-hidden`;
const LeftContainer = tw.div`w-2/5 flex flex-col justify-center relative bg-[#5C60F5]`;
const TextContainer = tw.div`px-40`;
const Heading = tw.span`text-white text-4xl p-0 font-sans font-medium block mb-4`;
const Paragraph = tw.span`block text-white text-xl font-sans font-thin`;
const Round = tw.div`w-56 h-56 bg-[#FF8C00] rounded-full absolute bottom-0 right-0 -mb-20 mr-20`;
