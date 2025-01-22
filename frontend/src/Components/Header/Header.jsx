import React, { useState } from 'react'
import style from "./header.module.scss"
import img from "../../Assets/Logo.svg"
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";


function Header() {

  const [isPhn, setPhn] = useState(false);
  console.log(isPhn)

  return (
    <div className={style.container1} >
    <div className={style.container} >
        <div className={style.logo} >
            <img src={img} alt="" />
        </div>
        <div className={style.links} >
          <GiHamburgerMenu className={style.ham} size={25} onClick={() => setPhn(!isPhn)} />
          <div className={style.pc} >
            
            <a href="">Home</a>
            <a href="">Explore</a>
            <a href="">Accounts</a>
            <a className={style.linksProfile} href="">Profile</a>
          </div>
            <div className={isPhn ? style.respo : style.phn} >
              <a href="">Home</a>
              <a href="">Explore</a>
              <a href="">Accounts</a>
              <a className={style.linksProfile} href="">Profile</a>
            </div>
        </div>
        <div className={style.profile} >
            Account
            <CgProfile size={32} />
        </div>
    </div>
    </div>
  )
}

export default Header
