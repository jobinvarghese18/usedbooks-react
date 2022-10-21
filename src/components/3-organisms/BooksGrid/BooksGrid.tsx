import React, { useEffect, useContext } from 'react';
import tw from 'twin.macro';
import { BookContext } from '../../../context/bookContext';
import { getBooksApi } from '../../../lib/api/API';
import { BookCard } from '../../2-molecules/BookCard/BookCard';

export const BooksGrid: React.FC = () => {
  const { state, dispatch } = useContext(BookContext);
  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await getBooksApi(String(token));
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({ type: 'ADD_BOOKS', payload: response.data });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(state);
  return (
    <Container>
      {state
        ?.filter((book) => !book.is_sold)
        ?.map((item) => {
          return <BookCard key={item.id} data={item} />;
        })}
    </Container>
  );
};

const Container = tw.div`flex flex-row flex-wrap px-20 gap-7`;
