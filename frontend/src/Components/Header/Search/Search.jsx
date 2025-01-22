import React, { useContext, useState } from 'react'
import style from "./search.module.scss"
import { IoMdSearch } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { questContext } from '../../../Context/context';

function Search() {

    const val = useContext(questContext);
    const page = val.page;
    const title = val.title;
    const type = val.type

    async function handleSearch(){
        try {
            const res = await axios.post("http://localhost:5000/search",{
                title,
                page,
                type
            })
            
            console.log(val.page);
           val.setTotal(res.data.result.total)
           console.log(res.data.result.question);
           val.setQuest(res.data.result.question);

            // console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(title)
        console.log(type)

        handleSearch();

    }

  return (
    <div className={style.container} >
        <div className={style.container1}>
            
        <p className={style.h1}>Search The Question</p>
        <p>Search and filter questions easily.</p>
        </div>
        <form action="post" onSubmit={handleSubmit}>
            <div className={style.search} >
                <IoMdSearch size={32} />
                <input type="text" name="search" placeholder="Search Your Question" onChange={(e) => val.setTitle(e.target.value)}/>
            </div>
            <select name="type" id="type" onChange={(e) => val.setType(e.target.value)} >
                <option value="MCQ">MCQ</option>
                <option value="ANAGRAM">ANAGRAM</option>
            </select>

            <button type="submit"><div  className={style.logo} ><FaSearch color='white'  /></div><span className={style.searchText} >Search</span></button>
        </form>
    </div>
  )
}

export default Search
