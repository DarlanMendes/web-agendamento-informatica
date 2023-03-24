
import ScheduleTable from "../../components/ScheduleTable"
import styles from './styles.module.scss'
export default function Home(props){
    
    return(
        <div className={styles.home}>
           
           <ScheduleTable currentUser={props.currentUser}/>
        </div>
    )
}
