import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import { Label } from '../../1-organisms/Label';

export const Header: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();

  if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
    return null;
  }
  return (
    <Container
      onClick={() => {
        router('/home');
      }}
    >
      <LogoContainer>
        <Logo src={require('./SVG.png')} />
      </LogoContainer>

      <NavItems>
        <Label>Books</Label>
        <Label>Features</Label>
        <Label>Support</Label>
      </NavItems>
    </Container>
  );
};

const Container = tw.div`h-16 flex items-center border-b-2 border-gray-400`;
const LogoContainer = tw.div`w-10 h-full flex items-center mx-10`;
const Logo = tw.img`object-contain`;
const NavItems = tw.div`flex gap-x-20 pl-32`;
