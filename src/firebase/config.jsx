import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCeJcgmrRiUsbRzktY17QjKw5kD5RsJUJ8",
    authDomain: "tripsproject-de869.firebaseapp.com",
    projectId: "tripsproject-de869",
    storageBucket: "tripsproject-de869.appspot.com",
    messagingSenderId: "1086083105827",
    appId: "1:1086083105827:web:c97c6cc04eb869e48d9d96"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
