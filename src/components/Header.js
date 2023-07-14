import { MdAddBox, MdHelp, MdHomeFilled } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import '../styles/header.scss'
import { Link } from "react-router-dom";


function Header({  getModeInputs, getSearchInputs}) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef();
  const headerRef = useRef();

 //Menu toggling
  useEffect(()=>{
    let handler = (e)=>{
      if (menuRef.current.contains(e.target)) {
        setOpen(true)
      }else{
        setOpen(false)
      }
    } 

    document.addEventListener('mousedown', handler);

    return()=> document.removeEventListener('mousedown', handler)
  }) 

//SETTING MODE
  function setMode() {
    getModeInputs(dark ? 'dark' : 'light')
    setDark(!dark);
  
  }
  
  //SEARCH CHANGE
  const handleSearchChange=(e)=>{
    setSearch(e.target.value)
    getSearchInputs(search)
  }

  return (
    <header  ref={headerRef}>
        <div className={`header__main ${!dark ? 'light' : 'dark'}`}>
          <div className="home_btn" ><Link to={'/tasks'}><MdArrowBackIos/></Link></div>
          <div className="center">
            <h1>TASKS</h1></div>
        
        <div ref={menuRef} className="menu">
            <div className="menu__trigger" >
            <MdAddBox />
            </div>

              <div className={`menu__dropdown ${open ? 'active' : 'inactive'}`}>
             <ul> 
                <Link to={'/create'} onClick={()=>{setOpen(!open)}}><MenuItem icon={<MdCreate />} text={'create task'}/></Link>
               <Link  onClick={()=>{setOpen(!open); setMode() }}> 
               <MenuItem  
               icon={!dark ? <MdDarkMode /> : <MdLightMode />} 
               text={`${dark ? 'Dark mode' : 'Light'}`} />
               </Link>
                
                <Link to={'/home'}  onClick={()=>{setOpen(!open)}}><MenuItem icon={<MdHomeFilled />} text={'Home'}/></Link>
                <Link to={'/help'}  onClick={()=>{setOpen(!open)}}><MenuItem icon={<MdHelp />} text={'Help'}/></Link>
              </ul>
            </div>
            </div>
         
        </div>
        
  <div className='search'>
    
    <input className='search__input'
      type='text'
      placeholder='search'
      value={search}
      onChange={handleSearchChange}/>
      {search.length > 0 ? "" : <div className='search__icon'><CiSearch /></div> }
      
   </div>
    </header>
  );
}

export default Header;


function MenuItem({ icon, text}) {
  return ( 
 <li className="menu__item">
<div className="menu__list">
 
  <div>{icon}</div>

  <span>{text}</span>
</div>
 </li>
  );
}

