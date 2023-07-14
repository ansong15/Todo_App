import '../../styles/completeTask.scss'

//import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineNotificationImportant, MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import Header from '../Header';

const getLocalStorage = ()=>{
    let list = localStorage.getItem("events")
    if (list) {
      return (list = JSON.parse(localStorage.getItem("events")));
   }else{
    return [];
   }
  }

function Completed() {
    const [tasks, setTasks] = useState(getLocalStorage());
    const [modeVal, setModeVal] = useState('');
   

    useEffect(()=>{
        localStorage.setItem("events", JSON.stringify(tasks));
      }, [tasks])

      //GET MODE VAL
      const getModeInputs=(mode)=>{
        setModeVal(mode)
      }
      //DELETE TASK
    const handleDeleteTasks = (id)=> {
        const newTasks = tasks.filter(item=> item.id !== id)       
          setTasks([...newTasks])
          }

    return (
    <div className={` ${modeVal? modeVal : 'light'}`}>
      <Header getModeInputs={getModeInputs}/>

        <div className='complete'>
        {tasks && tasks.filter(item=> item.isComplete === true)

       .map((item, index) => 
       <div key={item.id} className='complete__card'>
        <div>
            {/* {setCounter(pre=> pre + index)} */}
            <h3>{item.event}</h3>
            <small>{item.desc}</small>
        </div>
        <div className='complete__icons'>
            <div className='complete__btn' onClick={()=>{}}><MdOutlineNotificationImportant/><span>Rate</span></div>
            <div className='complete__btn' onClick={()=>{handleDeleteTasks(item.id)}}><MdOutlineDelete/><span>Delete</span></div>
        </div>
        
        
       </div>
       
        )}
        
       
        </div>
        </div>
    );
          
  }
  
  export default Completed;


  