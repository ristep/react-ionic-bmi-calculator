import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';

import Home from './Home';
import About from './About';
import Login from './Login';
import Favorites from './Favorites';

import './styles.css';

export const PageDisp: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container">
          {name === 'Home' && <Home />}
          {name === 'About' && <About />}
          {name === 'Login' && <Login />}
          {name === 'Favorites' && <Favorites />}
        </div>
      </IonContent>
    </IonPage>
  );

};
