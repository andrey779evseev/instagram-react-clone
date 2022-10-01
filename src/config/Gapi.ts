import {gapi} from 'gapi-script'

const initClient = () => {
  gapi.client.init({
    clientId: import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID,
    scope: ''
  })
}

gapi.load('client:auth2', initClient)
