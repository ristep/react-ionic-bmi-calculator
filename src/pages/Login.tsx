import { useParams } from 'react-router';

export const Login: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <h1>Login page</h1>
  );
};

export default Login;