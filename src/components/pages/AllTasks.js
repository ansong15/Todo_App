
import { FaEdit, FaRegGrinSquintTears } from "react-icons/fa";
import { MdCheckBox, MdDelete, MdHomeFilled, MdHomeMax, MdHouseSiding, MdPanoramaFishEye } from "react-icons/md";
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
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [mode, setMode] = useState('');
    const [check, setCheck] = useState(false);
    const [search, setSearch] = useState('');

    
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
    
    //DELETE TASK
    const deleteTask = (id)=> {
        const newTasks = tasks.filter(item=> item.id !== id)       
          setTasks([...newTasks])
          }
    //CLEAR ALL TODOS
    const clearAllTodo =()=>{
      setTasks([])
    }
  //CHECK COMPLETE
 const  handleCheck =(id)=>{
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

        <div className="icons">
            <button className={`${check ? 'checked' : ''} icon icon__completen`}  
            onClick={()=>{handleCheck(item.id)}}>< MdCheckBox/></button>
            <button className='icon icon__delete'  onClick={()=>{ deleteTask(item.id)}}>< MdDelete/></button>
        </div>
        
    </div>

        ) :
        
          <p>Create some tasks for yourself</p>
        }  
    
          
      <div className="buttonNavigation"> 
    <button className="btn_clearAll" onClick={clearAllTodo}>Clear All</button>
    <div>
    <Link to={'/home'}><MdHomeFilled/></Link>
    </div>
    
    </div> 
        </div>
    );    
  }
  
  export default AllTasks;

 