import React, { ReactNode } from 'react';
import { Modal as Mdl } from 'antd';
interface Props {
  isOpen: boolean;
  setOpen: (flag: boolean) => void;
  title: string;
  onOkHandle: () => Promise<void>;
  children: ReactNode;
}
export const Modal: React.FC<Props> = (props) => {
  const { isOpen, setOpen, onOkHandle, title, children } = props;

  return (
    <>
      <Mdl
        title={title}
        centered
        open={isOpen}
        onOk={(e) => {
          onOkHandle();
        }}
        onCancel={() => setOpen(false)}
        width={800}
      >
        {children}
      </Mdl>
    </>
  );
};
