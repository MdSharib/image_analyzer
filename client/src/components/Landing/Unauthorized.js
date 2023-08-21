import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./unauthorized.module.css"



const Unauthorized = () => {
const navigate = useNavigate();
    const btnHandler = () => {
        navigate("/");
    }

  return (
    <div className={styles.div}>
    <div>Unauthorized Acces! Please register and login first.</div>
    <button onClick={btnHandler} className={styles.btn}>Go back to Login page</button>
    </div>
  )
}

export default Unauthorized