import React from 'react';

const phrasesArray = [
  'Você sabia que leite normal é a mistura de leite em pó com água?',
  'O melhor tempero da comida é a fome.',
  'Panela velha faz comida boa, panela nova é que faz temaki.',
  'Só não como pedra porque quebra o dente.',
  'É pavê ou pacumê?',
  'Você sabia que a torta tem esse nome porque não é reta?',
  'Adicionando açúcar, tempero, e tudo o que há de bom!',
  'O amor é tão importante como a comida. Mas não alimenta.',
];

const phrasesAleatory = () => phrasesArray[Math.floor(Math.random() * phrasesArray.length)];

const Phrases = () => {
  return <h2>{phrasesAleatory()}</h2>;
};

export default Phrases;
