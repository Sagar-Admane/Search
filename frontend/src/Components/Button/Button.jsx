import React, { useContext } from 'react'
import style from "./button.module.scss"
import { questContext } from '../../Context/context'
import axios from 'axios'

function Button() {

    const val = useContext(questContext)
    const title = val.title;
    const page = val.page;
    const type = val.type;

    async function fetchData(){
        try {
            const res = await axios.post("http://localhost:5000/search",{
                title,
                page,
                type
            })

            console.log(res)
            val.setQuest(res.data.result.question);
        } catch (error) {
            console.log(error)
        }
    }

    function handlePrev(){
        val.setPage(val.page - 1);
        console.log(val.page);
        fetchData();

    }

    function handleNext(){
        val.setPage(val.page + 1);
        console.log(val.page);
        fetchData();
    }

  return (
    <div className={style.container} >
        <button className={val.page<=1 ? style.prevB : null} onClick={handlePrev} >Previous</button>
        <button className={val.page>=((val.total)/10) ? style.prevN : null} onClick={handleNext} >Next</button>
    </div>
  )
}

export default Button
