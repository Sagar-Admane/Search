import React from 'react'
import style from "./div.module.scss"

function Div(props) {
  return (
    <div className={style.container} >
        <h3>TYPE : {props.typ}</h3>
        <h3>Title : </h3>
        <p>{props.ttl}</p>
    </div>
  )
}

export default Div
