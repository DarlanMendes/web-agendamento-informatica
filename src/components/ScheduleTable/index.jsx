import styles from './styles.module.scss';
import Modal from '../Modal'
import { useContext, useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { collection, getDocs,getFirestore, deleteDoc,doc} from "firebase/firestore";
import {app} from '../../db/firebaseConf'
import { LoadingContext } from '../../App';

export default function ScheduleTable(props) {
    let manha = ['07h00 - 07h50', '07h50 - 08h40', '08h40 - 09h50', '9h50 - 10h40', '10h40 - 11h30', '11h30 - 12h20']
    let tarde = ['13h00 - 13h50', '13h50 - 14h40', '14h40 - 15h50', '15h50 - 16h40', '16h40 - 17h30', '17h30 - 18h20']
    let noite = ['18h30 - 19h15', '19h15 - 20h00', '20h00 - 20h45', '20h45 - 21h30']
    const [data, setData] = useState(new Date());
    const [schedules, setSchedules] = useState(manha)
    const [modal, setModal] = useState(false)
    const[reserves, setReserves]=useState()
    const[timeReserved,setTimeReserved]=useState()
   const {setIsLoading} = useContext(LoadingContext)
   
    const db = getFirestore(app);
    async function receberLista() {
        setIsLoading(true)
        const querySnapshot = await getDocs(collection(db, "reserva"));
        setIsLoading(false)
        let teste = []
        querySnapshot.forEach((doc)=>{
            
            if(doc.data().data===formatarData()){
               let union = Object.assign({},{id:doc.id},doc.data())
               console.log(union)
                teste.push(union)  
            }
        })
        setReserves(teste)
        console.log(teste)
    }
    const mudarDia = (dias) => {
        const novaData = new Date(data);
        novaData.setDate(novaData.getDate() + dias);
        setData(novaData);
    };
    function formatarData(){
        return `${(data.getDate() < 10 ? '0' + (data.getDate()) : data.getDate() )+'/'+ (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1)+'/'+data.getFullYear()}`
    }
    useEffect(() => {
        
        receberLista()
        
       
    },[data])

    function filtrarLista(schedule){
        let reserva
        reserves?.forEach((reserve)=>{
            if(reserve.schedule===schedule){
                reserva = reserve
            }
        })
        return reserva
    }
   
    const handleSchedule = (e) => {
        if (e.target.value === 'manha') {
            setSchedules(manha)
        }
        if (e.target.value === 'tarde') {
            setSchedules(tarde)
        }
        if (e.target.value === 'noite') {
            setSchedules(noite)
        }
    }
    
    async function deletarReserva(id){
        setIsLoading(true)
       await deleteDoc(doc(db, "reserva", id));
       alert('Reserva deletada com sucesso')
       setIsLoading(false)
       mudarDia(0)
     
    }
    return (
        <div className={styles.scheduleTable}>
            <div className={styles.data}>
                <BsArrowLeftCircleFill onClick={() => mudarDia(-1)} />
                {data.getDate() < 10 ? '0' + (data.getDate()) : data.getDate()}/{data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1}/{data.getFullYear()}
                <BsArrowRightCircleFill onClick={() => mudarDia(1)} />
            </div>

            <select className={styles.selecaoTurno} onChange={handleSchedule}>
                <option value='manha'>manhã</option>
                <option value='tarde'>tarde</option>
                <option value='noite'>noite</option>
            </select>
            {schedules ? schedules.map((schedule, index) => (
                <>
                    <div key={index} className={styles.tabelaHorario}>
                        <div className={styles.horario}>
                            <h3>
                                {schedule}
                            </h3>
                        </div>
                        <div className={styles.dadosAgendamento}>
                            <div> Material a ser utilizado : {filtrarLista(schedule)?.material}</div>
                            <div> Professor:  {filtrarLista(schedule)?.user}</div>
                            <div className={styles.botaoSelecao}>
                                {((props.currentUser?.uid===filtrarLista(schedule)?.uid)||(!filtrarLista(schedule)))&&<div>
                                <button style={{ backgroundColor: '#338f33' }} onClick={() => { setModal(!modal); setTimeReserved(schedule) }}> editar </button>
                               {filtrarLista(schedule)?.id&&<button style={{ backgroundColor: '#e22424' }} onClick={()=>{deletarReserva(filtrarLista(schedule)?.id)}}> deletar</button> } 
                                </div>}
                            </div>
                        </div>

                    </div>
                    {modal && <Modal data={data} schedule={timeReserved} currentUser={props.currentUser} setModal={setModal} modal={modal} mudarDia={mudarDia} />}


                </>

            )) : <h3>Carregando os horários</h3>}
        </div>
    )
}