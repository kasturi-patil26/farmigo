import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { MarketPriceProvider } from './context/MarketPriceContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MarketPriceProvider>
        <App />
      </MarketPriceProvider>
    </LanguageProvider>
  </StrictMode>,
);
