import { useNavigate } from "react-router-dom";



import Auth from "../../db/Authentication"
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
export default function Login(){
    const navigate = useNavigate()
    const LoginGoogle=()=>{
         Auth.Login().then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(credential, '  token:',token,'  _user:', user)
            navigate('/home')
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode, errorMessage,email, credential)
          });
    }
    

    
    return(
        <div>
            <button 
            onClick={()=>{LoginGoogle()}}
            >clique para logar com sua conta Gmail</button>
        </div>
    )
}
