import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
const Home = () => {
  const location = useLocation();
  const router = useNavigate();
  if (location.pathname === '/') {
    router('/sign-in');
  }
  return <Container className="bg-red-300">Home</Container>;
};

const Container = tw.div`bg-red-100`;
export default Home;
