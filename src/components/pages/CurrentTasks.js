// import '../styles/task.scss'
//import { FaEdit } from "react-icons/fa";
//import { MdDelete } from "react-icons/md";

import { useEffect } from "react";
import Task from "../Task";

function CurrentTasks( tasks, handleDeleteTasks, handleEditTask ) {
    useEffect(()=>{
   },[])
   let taskEvents = Array.from(JSON.parse(localStorage.getItem("tasks") ))

    return (
        <>
        {taskEvents.filter((item)=> item.isCompleted === false)
       .map(item => <Task id={item.id} event={item.event} 
                          isCompleted={item.isCompleted} 
        handleDeleteTasks = {handleDeleteTasks} handleEditTask={handleEditTask}
        />
        )}
        
       
    
        </>
    );
      
        
    
    
  }
  
  export default CurrentTasks;