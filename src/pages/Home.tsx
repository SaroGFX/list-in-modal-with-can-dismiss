import MessageListItem from "../components/MessageListItem";
import { useState, useRef, useEffect } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonModal,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import "./Home.css";
import { Virtuoso } from "react-virtuoso";

const Home: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [messages, setMessages] = useState<Message[]>([]);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

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
