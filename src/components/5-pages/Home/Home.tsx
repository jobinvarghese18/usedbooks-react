import React from 'react';
import { HeroBanner } from '../../3-organisms/HeroBanner';
import tw from 'twin.macro';
import { BooksGrid } from '../../3-organisms/BooksGrid';
// import { BooksValueProvider } from '../../../context/bookContext';
export const HomePage: React.FC = () => {
  return (
    <Container>
      <HeroBanner />
      <BookContainer>
        <Text className="text-2xl pb-2 uppercase">Get your new book</Text>
        <Text className="text-[20px] text-gray-600 pb-8">
          Explore the collection and shop for books online. You can find your
          favourite literature, novels, storybooks, and more on offer.
        </Text>
        {/* <BooksValueProvider> */}
        <BooksGrid />
        {/* </BooksValueProvider> */}
      </BookContainer>
    </Container>
  );
};

const Container = tw.div`pb-10 h-full`;
const BookContainer = tw.div``;
const Text = tw.div`pl-10`;
