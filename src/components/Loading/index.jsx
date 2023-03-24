
import { useContext } from 'react'
import { LoadingContext } from '../../App'
import styles from './styles.module.scss'
export default function Loading(){
    const {isLoading} = useContext(LoadingContext)
   
    return(
        <div className={styles.mainContainer} style={isLoading?{display:'flex'}:{display:'none'}}>
        <span>Carregando...</span>
        </div>
    )
}