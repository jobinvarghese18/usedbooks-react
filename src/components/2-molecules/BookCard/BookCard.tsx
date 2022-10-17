import React from 'react';
import tw from 'twin.macro';
import { Book } from '../../../types';

interface Props {
  data: Book;
}
export const BookCard: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Container>
      <ImageContainer>
        <img
          className="h-full w-full"
          src={require('../../../asset/bookImage.png')}
          alt=""
        />
      </ImageContainer>
      <Text className="text-xl font-semibold">{data.title}</Text>
      <Text className="text-sm">{data.author}</Text>
      <InfoContainer>
        <RatingContainer>
          <Text className="font-semibold">Rating : </Text> ⭐ {data.rating}.0
        </RatingContainer>
        <CategoryContainer>
          <Text className="font-semibold pr-1"> {`Category : `}</Text>
          {data.category}
        </CategoryContainer>
      </InfoContainer>
      <Text className="w-full pt-3 flex flex-col items-start">
        <Text className="font-semibold">Description : </Text>{' '}
        {data.description.length >= 130
          ? `${data.description.slice(0, 130)}...`
          : data.description}
      </Text>
    </Container>
  );
};

const Container = tw.div`h-[fit-content] w-[300px] max-h-[450px] min-h-[450px] flex flex-col items-center justify-start p-5  rounded cursor-pointer shadow-md`;
const ImageContainer = tw.div`h-40 w-40 object-contain mb-4`;
const Text = tw.div``;
const InfoContainer = tw.div`h-[fit-content] w-full pt-3`;
const RatingContainer = tw.div`flex flex-row`;
const CategoryContainer = tw.div`flex flex-row`;
