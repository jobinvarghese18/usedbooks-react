import React from 'react';
import tw from 'twin.macro';
import { Form, Input } from 'antd';
import { FormikHandlers, FormikErrors } from 'formik';

interface Props {
  handleChange: FormikHandlers['handleChange'];
  errors: FormikErrors<{
    name: string;
    title: string;
    description: string;
    category: string;
    is_sold: boolean;
    owner_id: number;
    author: string;
    rating: number;
    reviews: string;
    price: number;
  }>;
}
export const TradeBookForm: React.FC<Props> = (props) => {
  const { handleChange, errors } = props;

  return (
    <Container>
      <Form layout="vertical" className="w-full">
        <Form.Item label="Name" className="font-sans font-semibold">
          <Input
            placeholder="Enter name"
            name="name"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'name')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Title" className="font-sans font-semibold">
          <Input
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'title')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Author" className="font-sans font-semibold">
          <Input
            placeholder="Enter author name"
            name="author"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'author')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Price" className="font-sans font-semibold">
          <Input
            placeholder="Enter price"
            name="price"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'price')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Description" className="font-sans font-semibold">
          <Input
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'description')
                ? 'error'
                : ''
            }
          />
        </Form.Item>

        <Form.Item label="Category" className="font-sans font-semibold">
          <Input
            placeholder="Enter category"
            name="category"
            onChange={handleChange}
            status={
              Object.prototype.hasOwnProperty.call(errors, 'category')
                ? 'error'
                : ''
            }
          />
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = tw.div``;
