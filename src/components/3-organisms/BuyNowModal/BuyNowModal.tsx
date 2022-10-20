/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import tw from 'twin.macro';
import { Form, Input, message } from 'antd';
import { Book } from '../../../types';
import { Modal } from '../../2-molecules/Modal/Modal';
import { AppContext } from '../../../context/appContext';
import { createOrderApi, updateUserApi } from '../../../lib/api/API';

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

  useEffect(() => {
    setState(user);
  }, [user]);

  const options = {
    key: 'rzp_test_9FsOUvZmQdCh6Y',
    amount: data.price * 100, //  = INR 1
    name: 'Book store',
    description: 'Buy book now',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: async function (response: { razorpay_payment_id: any }) {
      const key = 'updatable';
      message.loading({ content: 'Loading...', key });

      let res;
      try {
        const token = sessionStorage.getItem('token');
        res = await createOrderApi(
          {
            transaction_id: response.razorpay_payment_id,
            address: String(user.address),
            book_id: data.id,
            user_id: user.id,
          },
          String(token)
        );
        if (res.code !== 'ERR_BAD_REQUEST') {
          dispatch({ type: 'ADD_USER', payload: res.data });
          message.success({
            content: 'Order placed successfully',
            key,
            duration: 2,
          });
        }
      } catch (error) {
        console.log(error);
      }
      if (res.code === 'ERR_BAD_REQUEST') {
        message.error({
          content: res?.response.statusText,
          key,
          duration: 2,
        });
      }
      setIsOpen(false);
    },
    prefill: {
      name: state.name,
      contact: state.phone,
      email: state.email,
    },
    notes: {
      address: 'some address',
    },
    theme: {
      color: '#F37254',
      hide_topbar: false,
    },
  };

  const openPayModal = (options: any): void => {
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
        dispatch({ type: 'UPDATE_USER', payload: response.data });
        setIsOpen(false);
        message.success({ content: 'Successfully updated', key, duration: 2 });
        openPayModal(options);
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
