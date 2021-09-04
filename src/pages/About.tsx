import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';

const About: React.FC  = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <h1>About app page</h1>
  );
};

export default About;