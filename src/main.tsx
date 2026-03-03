import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  SessionClientProvider,
  Panel,
  PanelAvatar,
  PanelHeader,
  PanelListItems,
  PanelSubscriptionIcon,
  PanelFooter,
} from 'vite-easy-wall';

const config = {
  uri: import.meta.env.VITE_EW_URI,
  urlPortal: import.meta.env.VITE_EW_URL_PORTAL,
  cookieTokenName: import.meta.env.VITE_EW_COOKIE_TOKEN_NAME,
  cookieDomain: import.meta.env.VITE_EW_COOKIE_DOMAIN,
  googleClient: import.meta.env.VITE_EW_GOOGLE_API_KEY,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionClientProvider config={config}>
      <App />
      <Panel anchor="right" footer={<PanelFooter />}>
        <PanelHeader
          containerProps={{
            sx: {
              backgroundColor: 'black',
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          imageProps={{
            src: '/logo.svg',
            width: 78,
            height: 24,
          }}
        />
        <PanelAvatar
          SubscriptionImageComponent={
            <PanelSubscriptionIcon>
              <img src="/corona.svg" alt="corona-icon" width={16} height={16} />
            </PanelSubscriptionIcon>
          }
        />
        <PanelListItems routes={[{ path: '/', name: 'Artículos guardados' }]} title="MI CUENTA" />
      </Panel>
    </SessionClientProvider>
  </StrictMode>,
);
