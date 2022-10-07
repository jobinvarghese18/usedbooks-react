import React from 'react';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
}

export const Label: React.FC<Props> = (props) => {
  const { children } = props;
  return <Text>{children}</Text>;
};

const Text = tw.span`text-black  text-xl  cursor-pointer hover:text-gray-500`;
