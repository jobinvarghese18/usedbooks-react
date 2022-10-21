/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { HeroBanner } from '../../3-organisms/HeroBanner';
import tw from 'twin.macro';
import { BooksGrid } from '../../3-organisms/BooksGrid';
import { AppContext } from '../../../context/appContext';
import { getUserByIdApi } from '../../../lib/api/API';
// import { BooksValueProvider } from '../../../context/bookContext';
export const HomePage: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (
      userToken != null &&
      userToken !== undefined &&
      userId != null &&
      userId !== undefined &&
      state.id === 0
    ) {
      (async () => {
        const response = await getUserByIdApi(userId, String(userToken));

        const { token, ...userData } = response;
        dispatch({ type: 'ADD_USER', payload: userData });
      })();
    }
  }, [state]);

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
