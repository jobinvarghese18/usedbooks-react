import React from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

export const Header: React.FC = () => {
  const router = useNavigate();
  return (
    <Container
      onClick={() => {
        router('/home');
      }}
    >
      Header
    </Container>
  );
};

const Container = tw.div`h-16 bg-red-50`;
