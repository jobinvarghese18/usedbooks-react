import axios from 'axios';
import { Book } from '../../types';
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
      console.log(error);
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

export const getBooksApi: () => Promise<{ data: Book[] }> = async () => {
  return await Axios({
    method: 'GET',
    url: `/book`,
    headers: {},
  });
};

export const createBookApi: (body: Book) => Promise<{ data: any }> = async (
  body
) => {
  return await Axios({
    method: 'POST',
    url: '/book',
    headers: {},
    data: body,
  });
};
