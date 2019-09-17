import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
export const firebaseConfig = {
    apiKey: "AIzaSyBPtGnPi4RFkbkKCMB3xo-EqkMA-ZME3w8",
    authDomain: "night45-f7e4b.firebaseapp.com",
    databaseURL: "https://night45-f7e4b.firebaseio.com",
    storageBucket: "night45-f7e4b.appspot.com",
    messagingSenderId: "1025280891451"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}