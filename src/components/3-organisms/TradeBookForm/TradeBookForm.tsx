import React from 'react';
import tw from 'twin.macro';
import { Form, Input } from 'antd';
import { BookState } from '../Header/Header';

interface Props {
  setState: React.Dispatch<React.SetStateAction<BookState>>;
}
export const TradeBookForm: React.FC<Props> = (props) => {
  const { setState } = props;
  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setState((prev: BookState) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Container>
      <Form layout="vertical" className="w-full">
        <Form.Item label="Name" className="font-sans font-semibold">
          <Input placeholder="Enter name" name="name" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Title" className="font-sans font-semibold">
          <Input
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Price" className="font-sans font-semibold">
          <Input
            placeholder="Enter price"
            name="price"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description" className="font-sans font-semibold">
          <Input
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Category" className="font-sans font-semibold">
          <Input
            placeholder="Enter category"
            name="category"
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = tw.div``;
