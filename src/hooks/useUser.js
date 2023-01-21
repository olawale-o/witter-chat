import { useContext } from 'react';
import { UserContext, UserDispatchContext } from '../context/userContext';

export const useUser = () => useContext(UserContext);

export const useUserDispatch = () => useContext(UserDispatchContext);
