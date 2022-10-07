import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const AppLayer: React.FC<Props> = (props) => {
  const { children } = props;
  return <div className="bg-red-900">{children}</div>;
};
