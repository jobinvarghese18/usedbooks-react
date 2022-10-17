export interface Book {
  id?: number;
  name: string;
  title: string;
  description: string;
  rating: number;
  is_sold: boolean;
  owner_id: number;
  reviews: string;
  createdAt?: Date;
  author: string;
  category: string;
}
