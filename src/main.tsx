import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { WordpressService } from './services/wordpress';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';

import { SiteSettingsContext } from './contexts/SiteSettings';

const queryClient = new QueryClient();

(async () => {
  const response = await WordpressService.getSettings();

  if (response.data.name !== 'undefined') {
    document.title = `${response.data.name} - ${response.data.description}`;
    document.head.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" type="image/png" href="${response.data.site_icon_url}">`);
  }
  else {
    document.title = 'Техническое обслуживание';
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SiteSettingsContext.Provider
          value={{ title: response.data.name, description: response.data.description, icon: response.data.site_icon_url }}>
          <App />
        </SiteSettingsContext.Provider>
      </QueryClientProvider>
    </StrictMode>,
  )

})();