import React from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Form, Button, Input, message } from 'antd';
import { registerApi } from '../../../lib/api/API';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required().nullable(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  password: Yup.string().required(),
});

export const SignUPForm: React.FC = () => {
  const router = useNavigate();

  const { handleSubmit, errors, handleChange } = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone: null,
      password: null,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const key = 'updatable';
      message.loading({ content: 'Loading...', key });

      let response;
      try {
        response = await registerApi(values);
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
      return null;
    },
  });

  return (
    <Container>
      <Form layout="vertical" className="w-80">
        <Form.Item label="Name" className="font-sans font-semibold">
          <Input
            placeholder="Enter full name"
            name="name"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'name')
                ? 'error'
                : ''
            }
          />
        </Form.Item>
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
        <Form.Item label="Phone" className="font-sans font-semibold">
          <Input
            placeholder="Enter phone no."
            name="phone"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'phone')
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
          <Button
            className="bg-[#5C60F5] w-full"
            type="primary"
            onClick={() => {
              // handleClick();
              handleSubmit();
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
