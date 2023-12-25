import { selectUserEmail } from '../../store/user/user.slice';
import { useAppSelector } from '../../hooks/redux-hook';

export const Welcome = () => {
  const email = useAppSelector(selectUserEmail);
  console.log(email);
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
};
