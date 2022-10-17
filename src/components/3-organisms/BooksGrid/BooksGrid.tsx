import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { getBooksApi } from '../../../lib/api/API';
import { Book } from '../../../types';
import { BookCard } from '../../2-molecules/BookCard/BookCard';

export const BooksGrid: React.FC = () => {
  const [books, setBooks] = useState<Book[]>();
  useEffect(() => {
    (async () => {
      try {
        const response = await getBooksApi();
        console.log(response);

        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
          setBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Container>
      {books?.map((item) => {
        return <BookCard key={item.id} data={item} />;
      })}
    </Container>
  );
};

const Container = tw.div`flex flex-row flex-wrap px-20 gap-12`;
