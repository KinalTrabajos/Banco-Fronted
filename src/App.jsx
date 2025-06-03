import { IonApp } from '@ionic/react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();

export const App = () => {
  const element = useRoutes(routes);

  return (
        <IonApp>
          {element}
        </IonApp>
  );
};
