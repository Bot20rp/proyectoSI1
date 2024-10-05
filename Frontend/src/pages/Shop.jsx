import React from 'react'
import './shop.css'
import {Banner} from '../components/Banner/Banner'
import {FilterSelect} from '../components/filter/FilterSelect'
import {SearchBar} from '../components/SeachBAr/SearchBar'
import {ShopList} from '../components/ShopList/ShopList'
import { useState } from 'react'
import {useWindowScroll}  from '../hooks/useWindowScroll'
import {products} from '../utils/products'

export const Shop = () => {
  const [filterList, setFilterList] = useState(
    products.filter((item) => item.category === "Vinos")
  );

  useWindowScroll();

  return (
    <>
      <Banner title="Productooooo" />
      <section className="filter-bar">
        <div className="filter-bar-container">
          <div className="filter-row">
            <div className="filter-col">
              <FilterSelect setFilterList={setFilterList} />
            </div>
            <div className="filter-col">
              <SearchBar setFilterList={setFilterList} />
            </div>
          </div>
        </div>
        <div className="shop-list-container">
          <ShopList productItems={filterList} />
        </div>
      </section>
    </>
  );
};

