export interface Book {
  id?: number;
  name: string;
  title: string;
  description: string;
  rating: number;
  is_sold: boolean;
  owner_id: number;
  reviews: string;
  createdAt?: Date | null;
  author: string;
  category: string;
  price: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  id: number;
  address?: string;
}

export interface Order {
  transaction_id: string;
  user_id: number;
  book_id: number | undefined;
  address: string;
}
