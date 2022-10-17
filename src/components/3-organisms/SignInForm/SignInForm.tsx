import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Form, Button, Input, Checkbox, message } from 'antd';
import { loginApi } from '../../../lib/api/API';

export const SignInForm: React.FC = () => {
  const router = useNavigate();
  const [state, setState] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandle: () => Promise<null> = async () => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let response;
    try {
      response = await loginApi(state);
      if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
        message.success({ content: 'Login successful', key, duration: 2 });
        router('/home');
      } else {
        message.error({ content: response?.error, key, duration: 2 });
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
        <Form.Item label="E-mail" className="font-sans font-semibold">
          <Input
            placeholder="Enter e-mail"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Password" className="font-sans font-semibold">
          <Input
            placeholder="Enter password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox> Keep me logged in</Checkbox>
          <Button
            className="bg-[#5C60F5] w-full"
            type="primary"
            onClick={() => {
              loginHandle()
                .then((res) => {
                  return res;
                })
                .catch((err) => console.log(err));
            }}
          >
            Sign in
          </Button>
        </Form.Item>

        <Text>
          {`Don't have an account? `}
          <Text
            className="text-[#FF8C00] cursor-pointer"
            onClick={() => {
              router('/sign-up');
            }}
          >
            Sign up
          </Text>
        </Text>
      </Form>
    </Container>
  );
};

const Container = tw.div`w-3/5 flex justify-center items-center`;
const Text = tw.span`select-none`;
