import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import MenuHamburguer from '../MenuHamburguer'
export default function Navbar(props) {
    const [userName, setUserName] = useState('Fulano')
    const [isOpenned, setIsOpenned]=useState(false)
    useEffect(() => {
        if (props.currentUser) {
            let name = props.currentUser.displayName.split(' ')
            setUserName(name[0])
        }
    })
    return (
        <div className={styles.cabecalho}>

            <GiHamburgerMenu onClick={()=>{setIsOpenned(true)}}/>
            <MenuHamburguer isOpenned={isOpenned} setIsOpenned={setIsOpenned} currentUser={props.currentUser} setCurrentUser={props.setCurrentUser}/>
            <h1 className={styles.titulo} > AGENDAMENTO </h1>

        </div>
    )
}