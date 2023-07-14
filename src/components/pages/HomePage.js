// import Img from '../../images/1A.png'
import '../../styles/home.scss'
import { Link } from "react-router-dom";
function HomePage() {
    return ( 
    <div className='home__mainn'>
<div className='home__wlcmTxt'>
    <h1>Hi BenAnsong</h1>
    <span>10 tasks pending</span>
</div>
<div className="card__reg">
    <div className="card__text">
        <p>Mobile App Design</p>
        <span>Mike and Mina</span>
    </div>
</div>
<div className="middle_text">
<h2>Monthly Review</h2>
<div>icon</div>
</div>
<div className='card'>
<div className="card__btn">
    <div className="card__text">
        <p>20</p>
        <span>ongoing</span>
    </div>
</div>
<div className="card__btn">
<Link to={'/tasks'}>
    <div className="card__text">
        <p>View Tasks</p>
        {/* <span>ongoing</span> */}
    </div>
</Link>
</div>
<div className="card__btn">
    <div className="card__text">
        <p>30</p>
        <span>ongoing</span>
    </div>
</div>
<div className="card__btn">
<Link to={'/completed'}>
    <div className="card__text">
        <p>Completed</p>
        <span>all done</span>
    </div>
</Link>
    </div>
</div>
    </div>
     );
}

export default HomePage;