import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { app } from '../../db/firebaseConf'
import { collection,addDoc,getFirestore } from "firebase/firestore";


export default function Modal(props) {
    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)
    const [material, setMaterial] = useState('Televisão e som')
    const db = getFirestore(app);
    useEffect(() => {
        if (props.currentUser) {
            let userName = props.currentUser.displayName.split(' ')
            setUser(userName[0])
        }
        if (props.data) {
            setData((props.data.getDate() < 10 ? '0' + (props.data.getDate()) : props.data.getDate()) + '/' + (props.data.getMonth() + 1 < 10 ? '0' + (props.data.getMonth() + 1) : props.data.getMonth() + 1) + '/' + (props.data.getFullYear()))
        }

    })
    const reservarHorario = async (schedule) => {
        if(!material){
            alert("Escolha um material")
        }
        else{
            const docRef = await addDoc(collection(db, "reserva"), {
                user,
                data,
                material,
                schedule,
                uid:props.currentUser.uid
                
             });
             console.log("Document written with ID: ", docRef.id);
             props.setModal(false)
             props.mudarDia(0)

        }
        


    }


    return (
        <div className={styles.areaExterna} >

            <div className={styles.caixaModal}>
                <h3 onClick={() => { props.setModal(false) }}> X </h3>
                <div className={styles.materialUtilizado}>
                    <label> Material utilizado:</label>
                    <select valor={material} onChange={(e) => { setMaterial(e.target.value) }}>
                        <option value='Televisão e som'>Televisão e som</option>
                        <option value='Computadores'>Computadores</option>
                        <option value='Tudo'>Tudo</option>
                    </select>

                </div>
                <div className={styles.materialUtilizado}>
                    Professor(a):
                    {user && user}
                </div>
                <div className={styles.materialUtilizado}>
                    Horario:
                    {props.schedule}
                </div>
                <div className={styles.materialUtilizado}>
                    Data:
                    {data && data}
                </div>
                <button onClick={() => {
                    reservarHorario(props.schedule)
                }}> Reservar </button>
            </div>

        </div>

    )
}