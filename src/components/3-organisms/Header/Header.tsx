import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import { createBookApi } from '../../../lib/api/API';
import { Label } from '../../1-atoms/Label';
import { Modal } from '../../2-molecules/Modal/Modal';
import { TradeBookForm } from '../TradeBookForm';
import { message } from 'antd';
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
}
export const Header: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const [state, setState] = useState<BookState>({
    name: '',
    title: '',
    description: '',
    category: '',
    is_sold: false,
    owner_id: 1,
    author: '',
    rating: 2.0,
    reviews: '',
  });

  const handleOpenTrade: () => void = () => {
    setOpenTradeModal((prev) => !prev);
  };

  const onOkHandle: () => Promise<void> = async () => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let response;
    try {
      const token = sessionStorage.getItem('token');
      response = await createBookApi(state, String(token));
      if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
        message.success({
          content: 'Created successfully.',
          key,
          duration: 2,
        });
        router(0);
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
  };

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
        onOkHandle={onOkHandle}
      >
        <TradeBookForm setState={setState} />
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
