import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './providers';
import { App } from './app/app';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
