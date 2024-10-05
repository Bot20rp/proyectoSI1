import React,{useState} from 'react'
import { IoIosSearch } from "react-icons/io";
import './searchbar.css'
/* hay que ver como lo hacemos con la base y el back y el dashboard adm */
import {products} from '../../utils/products'
/* componente hijo */
export const SearchBar = ({setFilterList}) => {
const [searchWord , setSearchWord ] = useState("") /* palabra de busqueda */
const handelChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      products.filter((item) =>
        item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };

  return (
    <>
        <div className='search-container'>
            <input type="text" placeholder='Buscar....' onChange={handelChange} />
            <IoIosSearch className='search-icon' />

        </div>


    </>
  )
}
