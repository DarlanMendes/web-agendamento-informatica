import styles from './styles.module.scss';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../db/firebaseConf';
import { useNavigate } from 'react-router-dom';
export default function MenuHamburguer(props) {
    const navigate = useNavigate()
    function LogOut() {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            props.setIsOpenned(false)
            alert('usuário deslogado com sucesso')
            props.setCurrentUser(null)
        }).catch((error) => {
            alert('erro ao deslogar  ',error )
        });

    }

    return (
        <div className={styles.mainContainer} style={props.isOpenned ? { left: '0' } : { left: '-100vw' }}>
            <div className={styles.leftContainer}>
                <div className={styles.currentUser}>
                    <img src={props.currentUser.photoURL} alt='imagem usuário' />
                    <h3>{props.currentUser.displayName}</h3>
                </div>

                <ul>
                    <li onClick={()=>{navigate('/home');props.setIsOpenned(false)}}>Home</li>
                    <li onClick={()=>LogOut()}>Sair</li>
                </ul>
            </div>
            <div className={styles.rightContainer} onClick={() => props.setIsOpenned(false)}>

            </div>
        </div>
    )
}