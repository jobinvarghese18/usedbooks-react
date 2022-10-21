import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createBookApi } from '../../../lib/api/API';
import { Label } from '../../1-atoms/Label';
import { Modal } from '../../2-molecules/Modal/Modal';
import { TradeBookForm } from '../TradeBookForm';
import { message } from 'antd';
import { BookContext } from '../../../context/bookContext';
import { AppContext } from '../../../context/appContext';

export interface BookState {
  name: string;
  title: string;
  description: string;
  category: string;
  is_sold: boolean;
  owner_id: number;
  author: string;
  rating: number;
  reviews: string;
  price: number;
}

const tradeBookSchema = Yup.object().shape({
  name: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  category: Yup.string().required(),
  is_sold: Yup.boolean().required(),
  owner_id: Yup.number().required(),
  author: Yup.string().required(),
  rating: Yup.number().required(),
  reviews: Yup.string().nullable(),
  price: Yup.number().required().min(1),
});

export const Header: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const { dispatch } = useContext(BookContext);
  const { state: user } = useContext(AppContext);

  const [, setState] = useState<BookState>({
    name: '',
    title: '',
    description: '',
    category: '',
    is_sold: false,
    owner_id: 1,
    author: '',
    rating: 2.0,
    reviews: '',
    price: 0,
  });

  const handleOpenTrade: () => void = () => {
    setOpenTradeModal((prev) => !prev);
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      title: '',
      description: '',
      category: '',
      is_sold: false,
      owner_id: 1,
      author: '',
      rating: 2.0,
      reviews: '',
      price: 0,
    },
    validationSchema: tradeBookSchema,
    onSubmit: async (values) => {
      const key = 'updatable';
      message.loading({ content: 'Loading...', key });

      let response;
      try {
        const token = sessionStorage.getItem('token');
        response = await createBookApi(
          { ...values, owner_id: user.id },
          String(token)
        );
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
          dispatch({ type: 'ADD_BOOK', payload: [response.data] });
          message.success({
            content: 'Created successfully.',
            key,
            duration: 2,
          });
          console.log(response, 'res');
          // router(0);
        } else {
          message.error({
            content: 'Error',
            key,
            duration: 2,
          });
        }
      } catch (error) {
        console.log(error);
      }
      setOpenTradeModal(false);
    },
  });

  if (
    location.pathname === '/sign-in' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/'
  ) {
    return null;
  }

  return (
    <Container
      onClick={() => {
        router('/home');
      }}
    >
      <Modal
        isOpen={openTradeModal}
        setOpen={setOpenTradeModal}
        title="Trade your book"
        onOkHandle={async () => {
          handleSubmit();
        }}
      >
        <TradeBookForm
          setState={setState}
          handleChange={handleChange}
          errors={errors}
        />
      </Modal>
      <LogoContainer>
        <Logo src={require('../../../asset/SVG.png')} />
      </LogoContainer>

      <NavItems>
        <Label>Books</Label>
        <Label onClickHandle={handleOpenTrade}>Trade</Label>
        <Label>Features</Label>
        <Label>Support</Label>
      </NavItems>
    </Container>
  );
};

const Container = tw.div`h-16 flex items-center border-b-2 border-gray-400`;
const LogoContainer = tw.div`w-12 h-12 object-contain flex items-center mx-10`;
const Logo = tw.img`w-full h-full`;
const NavItems = tw.div`flex gap-x-20 pl-32`;
