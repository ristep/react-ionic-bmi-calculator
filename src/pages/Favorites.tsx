import { useParams } from 'react-router';

export const Favorites: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <h1>Favo page {name} </h1>
  );
};

export default Favorites;