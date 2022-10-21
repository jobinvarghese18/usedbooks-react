import axios from 'axios';
import { Book, Order } from '../../types';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Axios = axios.create({
  baseURL: baseUrl,
});
interface Register {
  name: string | null;
  email: string | null;
  phone: number | null;
  password: string | null;
}

export const getUserByIdApi: (id: string, token: string) => any = async (
  id,
  token
) => {
  return await Axios({
    method: 'GET',
    url: `/user/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const loginApi: (body: {
  email: string;
  password: string;
}) => any = async (body) => {
  return await Axios({
    method: 'POST',
    url: `/user/login`,
    headers: {},
    data: body,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const registerApi: (body: Register) => any = async (body) => {
  return await Axios({
    method: 'POST',
    url: `/user`,
    headers: {},
    data: { ...body },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserApi: (
  id: number,
  body: any,
  token: string
) => any = async (id, body, token) => {
  return await Axios({
    method: 'PUT',
    url: `/user/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: body,
  });
};

export const getBooksApi: (token: string) => Promise<{ data: Book[] }> = async (
  token: string
) => {
  return await Axios({
    method: 'GET',
    url: `/book`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const createBookApi: (
  body: Book,
  token: string
) => Promise<{ data: any }> = async (body, token) => {
  return await Axios({
    method: 'POST',
    url: '/book',
    headers: { authorization: `Bearer ${token}` },
    data: body,
  });
};

export const updateBookApi: (
  body: any,
  id: string,
  token: string
) => any = async (body, id, token) => {
  return await Axios({
    method: 'PUT',
    url: `/book/${id}`,
    headers: { authorization: `Bearer ${token}` },
    data: { ...body },
  });
};

export const createOrderApi: (body: Order, token: string) => any = async (
  body,
  token
) => {
  return await Axios({
    method: 'POST',
    url: `/order`,
    headers: { authorization: `Bearer ${token}` },
    data: { ...body },
  });
};
