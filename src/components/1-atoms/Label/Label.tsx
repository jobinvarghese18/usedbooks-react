import React from 'react';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
  onClickHandle?: () => void;
}

export const Label: React.FC<Props> = (props) => {
  const { children, onClickHandle } = props;
  return <Text onClick={onClickHandle}>{children}</Text>;
};

const Text = tw.span`text-black  text-xl  cursor-pointer hover:text-gray-500`;
