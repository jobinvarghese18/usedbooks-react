import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { HomePage } from '../../components/5-pages/Home/Home';
const Home = () => {
  const location = useLocation();
  const router = useNavigate();
  if (location.pathname === '/') {
    router('/sign-in');
  }
  return (
    <Container>
      <HomePage />
    </Container>
  );
};

const Container = tw.div``;
export default Home;
