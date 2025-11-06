import React, { createContext, useEffect } from 'react';
import Home from '../../components/home/Home';
import { productData } from '../products/mockData';
export const productItemHome = createContext(); 
function HomePage({setShow}) {
 
  return (
    <>
    <productItemHome.Provider value={productData}>
      <Home />
    </productItemHome.Provider>
      
    </>
  )
}

export default HomePage