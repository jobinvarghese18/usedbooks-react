import React, { createContext, useReducer } from 'react';
import { Book } from '../types';

const initialState: Book[] = [
  {
    author: '',
    category: '',
    description: '',
    is_sold: false,
    name: '',
    owner_id: 0,
    price: 0,
    rating: 0,
    reviews: '',
    title: '',
    createdAt: null,
    id: 0,
  },
];

interface ActionType {
  type: 'ADD_BOOKS' | 'UPDATE_BOOK' | 'ADD_BOOK';
  payload: Book[];
}

interface bookProvidersProps {
  children: React.ReactNode;
}

const reducer = (state: Book[] = initialState, action: ActionType): Book[] => {
  switch (action.type) {
    case 'ADD_BOOKS': {
      return [...action.payload];
    }
    case 'ADD_BOOK': {
      console.log(
        action.payload,
        'payload',
        [...state, ...action.payload],
        'state'
      );
      return [...state, ...action.payload];
    }
    case 'UPDATE_BOOK': {
      console.log(action.payload, 'payload');
      const newState = state.map((item) => {
        if (item.id === action.payload[0].id) {
          return action.payload[0];
        }
        return item;
      });
      return [...newState];
    }
    default: {
      return initialState;
    }
  }
};

const BookContext = createContext<{
  state: Book[];
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

const BooksValueProvider = ({ children }: bookProvidersProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BooksValueProvider };
