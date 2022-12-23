import { atom } from 'recoil';
import firebase from 'firebase/compat/app';

type AuthState = firebase.User | null;

const authState = atom<AuthState>({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default authState;