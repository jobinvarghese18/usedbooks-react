/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import tw from 'twin.macro';
import { Form, Input, message } from 'antd';
import { Book } from '../../../types';
import { Modal } from '../../2-molecules/Modal/Modal';
import { AppContext } from '../../../context/appContext';
import { updateUserApi } from '../../../lib/api/API';

interface Props {
  isOpen: boolean;
  data: Book;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const { TextArea } = Input;

export const BuyNowModal: React.FC<Props> = (props) => {
  const { isOpen, data, setIsOpen } = props;
  const { state: user, dispatch } = useContext(AppContext);
  const [state, setState] = useState(user);

  const handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (
    e
  ) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm: () => Promise<null> = async () => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let response;
    try {
      const token = sessionStorage.getItem('token');
      response = await updateUserApi(user.id, state, String(token));
      if (response.code !== 'ERR_BAD_REQUEST') {
        dispatch({ type: 'ADD_USER', payload: response.data });
        message.success({ content: 'Successfully updated', key, duration: 2 });
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
  return (
    <Container>
      <Modal
        title={'Buy now'}
        isOpen={isOpen}
        setOpen={setIsOpen}
        onOkHandle={async () => {
          handleConfirm();
        }}
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
        <Form layout="vertical" className="pt-5">
          <Form.Item label="Address" className="font-semibold">
            <TextArea
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              value={state.address}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

const Container = tw.div``;
const Text = tw.div`text-base`;
const InfoContainer = tw.div`h-[fit-content] w-full pt-3`;
const RatingContainer = tw.div`flex flex-row`;
const CategoryContainer = tw.div`flex flex-row`;
