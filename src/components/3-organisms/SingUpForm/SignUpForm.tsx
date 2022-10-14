import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Form, Button, Input, message } from 'antd';
import { registerApi } from '../../../lib/api/API';
export const SignUPForm: React.FC = () => {
  const router = useNavigate();
  const [state, setState] = useState({
    name: null,
    email: null,
    phone: null,
    password: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick: () => Promise<null> = async () => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let response;
    try {
      response = await registerApi(state);
      if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
        message.success({
          content: 'Registered successfully.',
          key,
          duration: 2,
        });
        router('/sign-in');
      } else {
        message.error({
          content: 'Error',
          key,
          duration: 2,
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(response, 'response');
    return null;
  };
  return (
    <Container>
      <Form layout="vertical" className="w-80">
        <Form.Item label="Name" className="font-sans font-semibold">
          <Input
            placeholder="Enter full name"
            name="name"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="E-mail" className="font-sans font-semibold">
          <Input
            placeholder="Enter e-mail"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Phone" className="font-sans font-semibold">
          <Input
            placeholder="Enter phone no."
            name="phone"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Password" className="font-sans font-semibold">
          <Input
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-[#5C60F5] w-full"
            type="primary"
            onClick={() => {
              handleClick()
                .then((res) => {
                  return res;
                })
                .catch((err) => console.log(err));
            }}
          >
            Sign up
          </Button>
        </Form.Item>

        <Text>
          {`Aleady have an account? `}
          <Text
            className="text-[#FF8C00] cursor-pointer"
            onClick={() => {
              router('/sign-in');
            }}
          >
            Sign in
          </Text>
        </Text>
      </Form>
    </Container>
  );
};

const Container = tw.div`w-3/5 flex justify-center items-center`;
const Text = tw.span`select-none`;
