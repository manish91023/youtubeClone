import React from 'react'
import './Navbar.css'
import searchIcon from "../../assets/youtube_clone_assets/assets/search.png"
import logo from "../../assets/youtube_clone_assets/assets/logo.png"
import menuIcon from "../../assets/youtube_clone_assets/assets/menu.png"
import uploadIcon from "../../assets/youtube_clone_assets/assets/upload.png"
import moreIcon from "../../assets/youtube_clone_assets/assets/more.png"
import notificationIcon from "../../assets/youtube_clone_assets/assets/notification.png"
import profileIcon from "../../assets/youtube_clone_assets/assets/jack.png"
import { Link } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  return (
    
    <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img className='menu-icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menuIcon} alt="" />
               <Link to={'/'}> <img className=' logo' src={logo} alt="" /></Link>
            </div>
            <div className="nav-middle flex-div">
              <div className="search-box flex-div">
              <input type="text" placeholder="Search"/>
              <img src={searchIcon} alt="" />
              </div>
            </div>
            <div className="nav-right flex-div">
                  <img src={uploadIcon} alt="" />
                  <img src={moreIcon} alt="" />
                  <img src={notificationIcon} alt="" />
                  <img src={profileIcon} className=' user-icon' alt="" />
            </div>
    </nav>
  )
}

export default Navbar