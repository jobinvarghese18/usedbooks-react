import React, { useState } from 'react';
import tw from 'twin.macro';
import { Book } from '../../../types';
import { Modal } from '../../2-molecules/Modal/Modal';

interface Props {
  isOpen: boolean;
  data: Book;
}
export const BuyNowModal: React.FC<Props> = (props) => {
  const { isOpen, data } = props;
  const [,] = useState({});

  //   const handleChange = () => {
  //     setState((prev) => ({ ...prev }));
  //   };
  return (
    <Container>
      <Modal
        title={'Buy now'}
        isOpen={isOpen}
        setOpen={() => {}}
        onOkHandle={async () => {}}
      >
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
          {data.price !== 0 && data.price !== null && (
            <Text className="flex font-semibold">
              {`Price : `} <Text> {data.price}$</Text>
            </Text>
          )}
        </InfoContainer>
        <Text className="w-full pt-3 flex flex-col items-start">
          <Text className="font-semibold">Description : </Text>{' '}
          {data.description.length >= 130
            ? `${data.description.slice(0, 130)}...`
            : data.description}
        </Text>
      </Modal>
    </Container>
  );
};

const Container = tw.div``;
const Text = tw.div`text-base`;
const InfoContainer = tw.div`h-[fit-content] w-full pt-3`;
const RatingContainer = tw.div`flex flex-row`;
const CategoryContainer = tw.div`flex flex-row`;
