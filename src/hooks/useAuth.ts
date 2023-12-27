import { useAppSelector } from './redux-hook';
import { selectUser } from '../store/user/selectors';

export const useAuth = () => {
  const { email, id } = useAppSelector(selectUser);

  return {
    isAuth: !!email,
    email,
    id,
  };
};
