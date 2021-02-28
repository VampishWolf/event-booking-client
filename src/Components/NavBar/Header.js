import React from 'react'
// import { Link } from 'react-router-dom'
import './Header.scss'

function Header() {
    return (
        <div className="header">
            <div className="header__logo">Go to Homepage</div>
            {/* <div className="header_logo">EventBuy</div> */}
            <div className="header__nav">
                <div className="header__option" onClick={() => {window.location = '/'}}>Home</div>
                <div className="header__option">Events</div>
                <div className="header__option">Contact</div>
            </div>
        </div>
    )
}

export default Header
