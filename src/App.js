import React from 'react';
import Home from './components/home';
import AffineCipher from './components/affineCipher';
import AutokeyVigenereCipher from './components/autokeyVigenereCipher';
import ExtendedVigenereCipher from './components/extendedVigenereCipher';
import PlayCipher from './components/playfairCipher';
import ProductCipher from './components/productCipher';
import VigenereCipher from './components/vigenereCipher';

import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';



const App = () => {
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/affinecipher' element={<AffineCipher/>}/>
          <Route path='/autokeyvigenerecipher' element={<AutokeyVigenereCipher/>}/>  
          <Route path='/extendedvigenerecipher' element={<ExtendedVigenereCipher/>}/>  
          <Route path='/playfaircipher' element={<PlayCipher/>}/>  
          <Route path='/productcipher' element={<ProductCipher/>}/>  
          <Route path='/vigenerecipher' element={<VigenereCipher/>}/>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
