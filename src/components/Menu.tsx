import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, useIonRouter} from '@ionic/react';
import { useLocation } from 'react-router-dom';

import { pagesArray } from 'pages/pagesArray';
// import './Menu.css';

import { App } from '@capacitor/app';

const Menu: React.FC = () => {
  const location = useLocation();

  const ionRouter = useIonRouter();
    document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        if( window.confirm('Are you sure you want to exit?'))
          App.exitApp();   
     }
    });
  });

  return (
    <IonMenu className="main-menu" contentId="main-cont" type="overlay">
      <IonContent>

        <IonList id="menu-list">
          <IonListHeader>BMI - calculator</IonListHeader>
          <IonNote>ristepan@gmail.com</IonNote>
          {pagesArray.map((page, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === page.url ? 'selected' : ''} routerLink={page.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                  <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
