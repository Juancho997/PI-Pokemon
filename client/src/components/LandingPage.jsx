import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage() {
    return (
        <div className="initContainer">
            <div>
                <Link to='/home' className="initButton">
                    <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="img err" height="100px" />
                </Link>
            </div>
        </div>
    )
}