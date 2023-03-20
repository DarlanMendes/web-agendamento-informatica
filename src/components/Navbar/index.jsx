import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
export default function Navbar(props) {
    const [userName, setUserName] = useState('Fulano')
    useEffect(() => {
        if (props.currentUser) {
            let name = props.currentUser.displayName.split(' ')
            setUserName(name[0])
        }
    })
    return (
        <div className={styles.cabecalho}>

            <GiHamburgerMenu/>
            <h1 className={styles.titulo} > AGENDAMENTO </h1>

        </div>
    )
}