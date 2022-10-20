import React, { createContext, useReducer } from 'react';
import { User } from '../types';

const initialState: User = {
  id: 0,
  email: '',
  phone: '',
  name: '',
  address: '',
};

interface ActionType {
  type: 'ADD_USER' | 'UPDATE_USER';
  payload: User;
}

interface appProvidersProps {
  children: React.ReactNode;
}

const reducer = (state: User = initialState, action: ActionType): User => {
  switch (action.type) {
    case 'ADD_USER': {
      return { ...action.payload };
    }
    case 'UPDATE_USER': {
      return { ...state, ...action.payload };
    }
    default: {
      return initialState;
    }
  }
};

const AppContext = createContext<{
  state: User;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

const AppValueProvider = ({ children }: appProvidersProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppValueProvider };
