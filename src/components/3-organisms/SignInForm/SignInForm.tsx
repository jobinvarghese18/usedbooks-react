import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Form, Button, Input, Checkbox, message } from 'antd';
import * as Yup from 'yup';
import { loginApi } from '../../../lib/api/API';
import { AppContext } from '../../../context/appContext';

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export const SignInForm: React.FC = () => {
  const router = useNavigate();
  const { dispatch } = useContext(AppContext);

  const { handleSubmit, errors, handleChange } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const key = 'updatable';
      message.loading({ content: 'Loading...', key });

      let response;
      try {
        response = await loginApi(values);
        if (response.code !== 'ERR_BAD_REQUEST') {
          const { token, ...userData } = response;
          dispatch({ type: 'ADD_USER', payload: userData });
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.id);
          message.success({ content: 'Login successful', key, duration: 2 });
          router('/home');
        }
      } catch (error) {
        console.log(error);
      }
      if (response.code === 'ERR_BAD_REQUEST') {
        message.error({
          content: response?.response.statusText,
          key,
          duration: 2,
        });
      }
      return null;
    },
  });

  return (
    <Container>
      <Form layout="vertical" className="w-80">
        <Form.Item label="E-mail" className="font-sans font-semibold">
          <Input
            placeholder="Enter e-mail"
            name="email"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'email')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Password" className="font-sans font-semibold">
          <Input
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'password')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item>
          <Checkbox> Keep me logged in</Checkbox>
          <Button
            className="bg-[#5C60F5] w-full"
            type="primary"
            onClick={() => {
              handleSubmit();
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
