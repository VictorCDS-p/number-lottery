import React from 'react';
import './style.css';
import inc from "../../assets/content-logo.svg";



const MainContent = () => {
  return (
    <div className='main-content'>
      <h2 className='title'>SORTEADOR DE NÚMEROS</h2>
      <p className='subtitle'> <img src={inc} alt="inc" className="inc-icon" /> Como funciona o sorteador de números?</p>
      <p className='text'>O sorteador utiliza um algoritmo de geração aleatória para criar números dentro do intervalo especificado pelo usuário.</p>
      <p className='subtitle'> <img src={inc} alt="inc" className="inc-icon" /> Posso escolher o intervalo dos números?</p>
      <p className='text'>Sim, você pode definir os valores mínimo e máximo para o intervalo dos números sorteados.</p>
    </div>
  );
};

export default MainContent;