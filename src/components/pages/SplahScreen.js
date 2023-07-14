import Img from '../../images/1A.png'
import '../../styles/splash.scss'
import { Link } from "react-router-dom";
function SplashScreen() {
    return ( 
    <div className="splash__main">
        <div className="splash__imgView">
            <img src={Img} alt='welcome'/>
        </div>
        <div className="splash__txtView">
            <h1>Manage Your Daily Tasks</h1>
            <span>This is an app designed to make task management easy for you</span>
            <Link to={'/home'}>
            <div className='splash__clickTxt'>
               <span>Get</span> Started
            </div>
            </Link>
            
        </div>
    </div> 
    );
}

export default SplashScreen;