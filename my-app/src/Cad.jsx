import { useState } from "react";
import styles from "./cad.module.css";
function Cad(){
    const[color,setColor]=useState("green");
    const[text,setText]=useState("open");
    const handleToggle = () => {
        setColor(prev => (prev === "green" ? "red":"green"));
   
    
     setText((prev) => (prev === "open" ? "close":"open"));
      };
    
    return(
    <div className={styles["cad-con"]}>
        <div >
        <h1>SHOP STATUS </h1>
        <div className={styles["status"]} style={{backgroundColor:color}}></div>
        <div >{text}</div>
        <button onClick={handleToggle}  style={{backgroundColor:color}}>click state</button>
        
    </div>
    </div>

)
}
export default Cad;