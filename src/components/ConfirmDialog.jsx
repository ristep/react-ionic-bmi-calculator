import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react";

export const ConfirmDialog = (props) => {
  const { show, hide, title, body, buttons, callback} = props;
  
  const clickHandler = (val) => {
    hide();
    if( val ) {
      callback();
      console.log(val);
    }
  };

  return (
    <IonModal
      isOpen={show}
      onDidDismiss={() => hide()}
      align="center"
      animated={true}
      cssClass="delete-confitm-modal"
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{body}</h2>
      </IonContent>
      <IonFooter>
        <IonRow>
          {buttons.map((button) => (
            <IonCol>
              <IonButton expand="block" key={button.text} color={button.color} onClick={()=>clickHandler(button.value)}>
                {button.text}
              </IonButton>
            </IonCol>
          ))}
        </IonRow>
      </IonFooter>
    </IonModal>
  )
};
