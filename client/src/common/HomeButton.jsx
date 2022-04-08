import { Link } from "react-router-dom"

export default function HomeButton() {

    return (

        <Link to='/home'>
            <button className="titleButton">
                <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="img err" height="100px" />
            </button>
        </Link>


       
    )
}
