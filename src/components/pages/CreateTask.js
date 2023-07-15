//import { FaTasks } from 'react-icons/fa';
import {useState } from 'react';
import {v4 as uuidv4 } from "uuid";
import '../../styles/create.scss'
import { Link } from 'react-router-dom';

function CreateTask() {

        const [inputs, setInputs] = useState({
        event: "",
        desc: "",
    });
    

function addTask(e) {
     e.preventDefault();
       
        const newTask = {
          id: uuidv4(),
          event: inputs.event,
          desc: inputs.desc,
          isComplete: false
        }
        
        let list = JSON.parse(localStorage.getItem("events") || "[]");
      console.log(typeof(list));

        const newList = [...list, newTask]
        localStorage.setItem("events", JSON.stringify(newList));
         
      }

     
    
    return (
      <div className='create__main'>
        <form >
            <div className='form'>
            <div className='form__text'>
                <input type='text' name='item' value={inputs.event}
                 placeholder='Task' onChange={(e)=>setInputs({...inputs, event: e.target.value})}>
                    </input>  
                    <input className='txt_desc' type='text' name='item_desc' value={inputs.desc}
                    placeholder='You can add a little description' 
                    onChange={(e)=>setInputs({...inputs, desc: e.target.value})}
                    />              
            </div>
           
           <div className='form_btns'>
            <button className='form_btn' type ='submit' onClick={addTask}><Link to={'/tasks'}>Submit</Link></button>
                   
            <button className='form_btn' type='submit'><Link to={'/tasks'}>Cancel</Link></button>
            </div>
            </div> 
        </form>
        </div>
    
    );
  }
  
  export default CreateTask;