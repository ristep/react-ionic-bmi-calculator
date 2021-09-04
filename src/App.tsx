import { IonApp, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactHashRouter as IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

import Menu from './components/Menu';

import './pages/styles.css';

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

/* Theme variables */
import './theme/variables.css';

const Location = () => {
  const location = useLocation();
  return (
    <div>{location.pathname}</div>
  );
}

const App: React.FC = () => {
  return (
    <IonApp>
      <IonSplitPane contentId="main-cont">
        <IonReactRouter>

          <Menu />

          <IonRouterOutlet  id="main-cont">
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

              <IonContent fullscreen>

                <div className="container" id="main-cont">
                  <Switch>
                    <Route exact path="/">
                      <Redirect to="/Home" />
                    </Route>
                    <Route path="/Home" exact={true}>
                      <Home />
                    </Route>
                    <Route path="/About" exact={true}>
                      <About />
                    </Route>
                    <Route path="/Login" exact={true}>
                      <Login />
                    </Route>
                    <Route path="/Favorites" exact={true}>
                      <Favorites />
                    </Route>
                  </Switch>
                </div>

              </IonContent>

            </IonPage>
          </IonRouterOutlet>

        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
