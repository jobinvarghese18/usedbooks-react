import React, { useEffect, useContext } from 'react';
import { Button } from 'antd';
import { Book } from '../../../types';
import { AppContext } from '../../../context/appContext';

interface Props {
  data: Book;
}
export const PaymentGateway: React.FC<Props> = (props) => {
  const { data } = props;
  const { state } = useContext(AppContext);
  console.log(data);
  const options = {
    key: 'rzp_test_9FsOUvZmQdCh6Y',
    amount: data.price * 100, //  = INR 1
    name: 'Book store',
    description: 'Buy book now',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: function (response: { razorpay_payment_id: any }) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: state.name,
      contact: state.phone,
      email: state.email,
    },
    notes: {
      address: 'some address',
    },
    theme: {
      color: '#F37254',
      hide_topbar: false,
    },
  };

  const openPayModal = (options: any): void => {
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Button type="primary" onClick={() => openPayModal(options)}>
        Buy now
      </Button>
    </>
  );
};
