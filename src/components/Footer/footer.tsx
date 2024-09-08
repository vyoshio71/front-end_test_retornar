import React from "react";

import "../../css/components/footer.css";

import { IFooter } from "../../interfaces/interfaces";

/**
 * Footer Component.
 * @param {Number} count - The current count state.
 * @param {Number} totalPrice - The total price value.
 * @param {Function} handleNextStep - Function to handle the next navigation step.
 * @param {Function} handleIncrement - Function to increment the count.
 * @param {Function} handleDecrement - Function to decrement the count.
 */

const Footer: React.FC<IFooter> = ({
  count,
  totalPrice,
  handleNextStep,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <footer className="footerContent">
      <div className="countContainer">
        <div onClick={handleDecrement}>-</div>
        <div>{count}</div>
        <div onClick={handleIncrement}>+</div>
      </div>

      <div className="buttonContainer" onClick={handleNextStep}>
        <p>AVANÇAR</p>
        <p>{`R$${totalPrice}`}</p>
      </div>
    </footer>
  );
};

export default Footer;
