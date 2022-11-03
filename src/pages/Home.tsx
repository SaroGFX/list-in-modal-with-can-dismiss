import { useState, useRef, useEffect } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Home.css";
import { Virtuoso } from "react-virtuoso";

const Home: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonPage ref={page} id="home-page">
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonButton id="open-modal" expand="block">
            Open
          </IonButton>
        </IonContent>
        <IonModal
          ref={modal}
          trigger="open-modal"
          canDismiss={true}
          presentingElement={presentingElement}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <Virtuoso
              totalCount={200}
              itemContent={(index) => (
                <IonItem style={{ height: "65px" }} detail={false} lines="full">
                  <IonLabel>
                    <h2>Title</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </IonLabel>
                </IonItem>
              )}
            />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
