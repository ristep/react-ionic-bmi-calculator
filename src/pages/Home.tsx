import { useParams } from 'react-router';

export const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (    
      <h1>Home page</h1>
  );
};

export default Home;