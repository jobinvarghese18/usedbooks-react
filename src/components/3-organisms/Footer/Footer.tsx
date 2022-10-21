import React from 'react';
import { useLocation } from 'react-router-dom';
import tw from 'twin.macro';

export const Footer: React.FC = () => {
  const location = useLocation();
  if (
    location.pathname === '/sign-in' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/'
  ) {
    return null;
  }

  return (
    <Container>
      <BrandNameContainer>
        Book Store
        <Text>A reader lives a thousand lives before he dies</Text>
      </BrandNameContainer>
      <CopyRighContainer>
        Copyright © 2022 all rights reserved
      </CopyRighContainer>
    </Container>
  );
};

const Container = tw.div`h-80 w-full flex flex-col justify-between bg-gray-800 text-white mt-10 pt-10 pl-10`;
const BrandNameContainer = tw.div`text-4xl font-semibold`;
const CopyRighContainer = tw.div`h-10 w-full text-center text-base`;
const Text = tw.div`pt-3 text-base font-thin`;
