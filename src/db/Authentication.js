import { getAuth, setPersistence, signInWithPopup, GoogleAuthProvider, inMemoryPersistence } from "firebase/auth";
import { app } from "./firebaseConf";
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
export default {
    Login: async () => {
        try {
            setPersistence(auth)
            return signInWithPopup(auth, provider)
        }
        catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        };


    }
}

