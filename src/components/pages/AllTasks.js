import { MdCheckBox, MdDelete, MdDescription, MdHomeFilled, MdReadMore} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../../styles/task.scss'
import Header from "../Header";


const getLocalStorage = ()=>{
    let list = localStorage.getItem("events")
    if (list) {
      return (list = JSON.parse(localStorage.getItem("events")));
   }else{
    return [];
   }
  }
function AllTasks() { 
  //STATE VARIABLES
    const [tasks, setTasks] = useState(getLocalStorage());
    const [mode, setMode] = useState('');
    const [check, setCheck] = useState(false);
    const [search, setSearch] = useState('');
    const [readOpen, setReadOpen] = useState(false);
    const [editableTask, setEditableTask] = useState({})
    // const readRef = useRef();

    
    useEffect(()=>{
      localStorage.setItem('theme', mode);
      document.body.className = mode;
    
    })
   

    //SETTING LOCAL STORAGE
  useEffect(()=>{
    localStorage.setItem("events", JSON.stringify(tasks));
  }, [tasks])
    // const list = Object.values(tasks)
    // console.log(list);

    //READING AND EDITTING TASKS
  function readHandler(id){
  //find the Id of the editable task
  const taskIndex = tasks.findIndex(item => item.id === id);
  let updatableTask = [...tasks];
  let taskevent = updatableTask[taskIndex];

  let editEvent = taskevent.event
  let editDesc = taskevent.desc

  setEditableTask({event: editEvent, desc: editDesc})
  }
  //-------------------create a new task as the edited task------------------
      
    //DELETE TASK
    const deleteTask = (id)=> {
        const newTasks = tasks.filter(item=> item.id !== id)       
          setTasks([...newTasks])
          }
    //CLEAR ALL TODOS
    const clearAllTodo =()=>{
      setTasks([])
    }
  //SETTING CHECK COMPLETE
 const  handleCheck =(id)=>{
  setCheck(!check)
  //FIND THE INDEX
  const taskIndex = tasks.findIndex(item => item.id === id);
  let updatableTask = [...tasks];

 if(!updatableTask[taskIndex].isComplete){
  updatableTask[taskIndex].isComplete = true
 }else{
  updatableTask[taskIndex].isComplete = false
 }
  
  setTasks(updatableTask)
 
 }

//GET THE SEARCH VALUE
const getSearchInputs = (val) =>{
    setSearch(val)
}
const getModeInputs = (mode)=>{
  setMode(mode)
}
          //SAVE REFERENCE OF DRAG ITEMS
          const dragItemm = useRef()
          const dragOverItemm = useRef()
       
       
          //HANDLE DRAGABLE SORT
          const handleSort = () =>{
            let _item = [...tasks]
            const dragItemContent = _item.splice(dragItemm.current, 1)[0];

            //switch 
            _item.splice(dragOverItemm.current, 0, dragItemContent)

            //RESET THE DRAG
            dragItemm.current =null
            dragItemm.current = null

            //updata actual array
            setTasks(_item)
          }

          //SWITCH THE POSITION
          

       
    return (
        <div className={`main_page ${mode? mode : 'light'}`}>
          <div className="mainheader">
          <Header getModeInputs={getModeInputs} getSearchInputs={getSearchInputs}/>
          </div>
        {tasks !== [] ? tasks
        .filter((item)=> {
          return  item.event.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
       .map((item, index) => 
       
        <div className="task" key={index} draggable 
        onDragStart={(e)=> (dragItemm.current=index)}
        onDragEnter={(e)=> (dragOverItemm.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e)=> e.preventDefault()}
        >
        <div className=  {`${item.isComplete ? 'checked' : ''} task__event`}>
            <p>{item.event}</p>
            <small>{item.createdAt}</small>
        </div>

       <div className="icons_wrapper">
        <div className="icons">
            <button className={`${check ? 'check' : ''} icon icon__complete`}  
            onClick={()=>{handleCheck(item.id)}}>
              <MdCheckBox className={`${item.isComplete ? 'check' : ''} icon__complete`} ></MdCheckBox>
              </button>
            <button className='icon icon__delete'  onClick={()=>{ deleteTask(item.id)}}>< MdDelete className="btn_del"/></button>
        </div>
      
        {/* DISPLAY READ PANNEL */}
        <div>
        <button className="icon__readTask" onClick={()=>{setReadOpen(!readOpen); readHandler(item.id)}}> <MdDescription className="btn_del"/>Read </button>
        </div>
          <div  className={`readPannel ${readOpen ? 'active' : 'inactive'}`}>
          <div className='form'>
            <div className='form__text'>
                <input type='text' name='item' value={editableTask.event}
                 placeholder='Task' onChange={(e)=>setEditableTask({editEvent: e.target.vaue})}>
                    </input>  
                    <input className='txt_desc' type='text' name='item_desc' value={editableTask.desc}
                    placeholder='You can add a little description' 
                    onChange={(e)=>setEditableTask({editDesc: e.target.value})}
                    />              
            </div>
           
           <div className='form_btns'>
            <button className='form_btn' type ='submit' onClick={()=>{setReadOpen(false); }}><Link to={'/tasks'}>Save Changes</Link></button>
                   
            <button className='form_btn' type='submit'onClick={()=>{setReadOpen(false)}}><Link to={'/tasks'}>OK</Link></button>
            </div>
            </div> 
          </div>
        
        </div>
   
        
    </div>

        ) :
        
          <p>Create some tasks for yourself</p>
        }  
    
          
      <div className="buttonNavigation"> 
    <button className="btn_clearAll" onClick={clearAllTodo}>Clear All</button>
    <div>
    <Link to={'/home'}><MdHomeFilled className="btn_h"></MdHomeFilled></Link>
    <small>home</small>
    </div>
    
    </div> 
        </div>
    );    
  }
  
  export default AllTasks;

 