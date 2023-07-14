import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import '../../styles/helpPage.scss'

function HelpPage() {
    return ( 
    <div className="main">
<div className="home_btn"><Link to={'/current'}><MdArrowBackIos/></Link></div>
<h1>How may we help you</h1>
     <div className="board">
     <h1>the help page</h1>
     <p>This Application helps you to create tasks and become punctual </p>
     </div>

    </div>
    
    
    );
}

export default HelpPage;