import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const AuthService = {
  async register(email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  async login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  async logout() {
    await signOut(auth);
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },
};

export default AuthService;