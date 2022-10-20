import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import tw from 'twin.macro';
import { Book } from '../../../types';
import { StarFilled } from '@ant-design/icons';
import { updateBookApi } from '../../../lib/api/API';
import { BuyNowModal } from '../../3-organisms/BuyNowModal/BuyNowModal';

interface Props {
  data: Book;
}
export const BookCard: React.FC<Props> = (props) => {
  const { data } = props;
  const [state, setState] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const route = useNavigate();

  const handleOnClickRating: () => Promise<null> = async () => {
    setState((prev) => ({ ...prev, rating: prev.rating++ }));
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let response;
    try {
      const token = sessionStorage.getItem('token');
      const { id, ...rest } = state;
      response = await updateBookApi(
        { ...rest, rating: state.rating++ },
        String(id),
        String(token)
      );
      if (response.code !== 'ERR_BAD_REQUEST') {
        message.success({ content: 'Login successful', key, duration: 2 });
        route(0);
      }
    } catch (error) {
      console.log(error);
    }
    if (response.code === 'ERR_BAD_REQUEST') {
      message.error({
        content: response?.response.statusText,
        key,
        duration: 2,
      });
    }
    return null;
  };

  const handleModal: () => void = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container onClick={handleModal}>
      <Button
        type="default"
        icon={<StarFilled className="text-yellow-300" />}
        className="absolute  right-4 top-4"
        onClick={() => {
          handleOnClickRating();
        }}
      />
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

      <BuyNowModal isOpen={isOpen} data={data} />
    </Container>
  );
};

const Container = tw.div`h-[fit-content] w-[300px] max-h-[450px] min-h-[450px] relative flex flex-col items-center justify-start p-5  rounded cursor-pointer shadow-md`;
const ImageContainer = tw.div`h-40 w-40 object-contain mb-4`;
const Text = tw.div``;
const InfoContainer = tw.div`h-[fit-content] w-full pt-3`;
const RatingContainer = tw.div`flex flex-row`;
const CategoryContainer = tw.div`flex flex-row`;
