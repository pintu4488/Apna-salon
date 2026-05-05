import React,{useEffect,useState} from "react";
function Tests(){
   const[name,setname]=useState();
   useEffect(()=>{
   
        const flaski = async()=>{
            try{
                 const respons = await fetch("http://127.0.0.1:5000/api/data");
            const result = await respons.json();
            setname(result.message);
        }
        catch(err){
        console.error("conection is faill",err);
        setname({message: "serverr ofline"});
        
    }
     
    }
    flaski();
    
   },[]);

   /*post conection*/
    const[data,setData]=useState('');
    const flask_con = async()=>{
        try{const conectio_data = await fetch("http://127.0.0.1:5000/send/data",
            {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fk:inputValue})});
            const respon_data = await conectio_data.json()
            if(respon_data.received){
                setData(respon_data.received);
            }
            alert("data flask se paas ho gya hai");
            
        }
            catch(err){
                console.error("notcnection",err)
                alert("conection is fail");
            }
    }   
    const[inputValue,setInputValue]=useState('')

    
    return(
        <div>
            <input type="text" placeholder="yha kuchh likhe" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
            <button onClick={flask_con}>send data</button>
            <h3>server response{data}</h3>
            <h1> flask se data hai:{name}</h1>
            <h1>ok</h1>
            <input type="text" />
        </div>
    )
}
export default Tests;