import { IAddons, IFruit, ISize } from "../interfaces/interfaces";

import morangoImg from '../assets/images/morango.png';
import bananaImg from '../assets/images/banana.png';
import kiwiImg from '../assets/images/kiwi.png';
import granolaImg from '../assets/images/granola.png';
import pacocaImg from '../assets/images/pacoca.png';
import leiteNinhoImg from '../assets/images/leite_ninho.png';

export const fruits: IFruit[] = [
  { id: 1, name: "Morango", price: 4, img: morangoImg },
  { id: 2, name: "Banana", price: 0, img: bananaImg },
  { id: 3, name: "Kiwi", price: 2, img: kiwiImg },
];

export const sizes: ISize[] = [
  { id: 1, name: "Pequeno", volume_ml: 300, price: 18, delivery_time: 5 },
  { id: 2, name: "Médio", volume_ml: 500, price: 20, delivery_time: 7 },
  { id: 3, name: "Grande", volume_ml: 700, price: 22, delivery_time: 9 },
];

export const addons: IAddons[] = [
  { id: 1, name: "Granola", price: 3, img: granolaImg },
  { id: 2, name: "Paçoca", price: 5, img: pacocaImg },
  { id: 3, name: "Leite Ninho", price: 4, img: leiteNinhoImg },
];
