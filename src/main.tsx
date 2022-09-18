import AuthorizationGuard from '@guards/AuthorizationGuard'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import JotaiNexus from '@utils/JotaiNexus'
import {createBrowserHistory} from 'history'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import App from './App'
import {gapi} from 'gapi-script'
import './assets/styles/global.scss'

const history = createBrowserHistory({ window });

const initClient = () => {
  gapi.client.init({
    clientId: import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID,
    scope: ''
  })
}

gapi.load('client:auth2', initClient);

export const rootNavigate = (to: string) => {
  history.push(to);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5
    }
  }
})

let container: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', function() {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <JotaiNexus/>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }
});
