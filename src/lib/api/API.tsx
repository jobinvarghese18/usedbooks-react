import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
  return await axios({
    method: 'POST',
    url: `${String(baseUrl)}/user/login`,
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
  return await axios({
    method: 'POST',
    url: `${String(baseUrl)}/user`,
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
