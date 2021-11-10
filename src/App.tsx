import React from 'react';
import { IonApp, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactHashRouter as IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './App.scss';

import { pagesArray } from './pages/pagesArray';
import { ProvideAuthData } from "./hooks/authData";

const Location = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>{location.pathname}</div>
  );
}

const ReactApp: React.FC = () => {
  return (
    <IonApp>
     <ProvideAuthData>
      <IonSplitPane contentId="main-cont">
        <IonReactRouter>

          <Menu />

          <IonRouterOutlet id="main-cont">
            <IonPage>

              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton />
                  </IonButtons>
                  <IonTitle>
                    <Location />
                  </IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent 
                scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}}
              >

                  <Switch>
                    <Route exact path="/">
                      <Redirect to="/Home" />
                    </Route>
                    {pagesArray.map((page, index) => (
                      <Route key={index} path={page.url}>
                        {page.component}
                      </Route>
                    ))}
                  </Switch>

              </IonContent>

            </IonPage>
          </IonRouterOutlet>

        </IonReactRouter>

      </IonSplitPane>
      </ProvideAuthData>
    </IonApp>
  );
};

export default ReactApp;
