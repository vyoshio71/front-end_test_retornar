import React from "react";

import acaiIcon from "../../assets/images/acai_order_icon.jpg";

import { IOrderCard } from "../../interfaces/interfaces";

import '../../css/components/orderCard.css'

const OrderCard: React.FC<IOrderCard> = ({ acai, isDelivered }) => {
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const createdAtDate = new Date(acai.created_at);
  createdAtDate.setMinutes(createdAtDate.getMinutes() + acai.estimate);

  const formattedCreatedAt = formatTime(new Date(acai.created_at));
  const formattedUpdatedTime = isDelivered
    ? "entregue"
    : formatTime(createdAtDate);

  return (
    <div className="orderInfoContainer" key={acai.id}>
      <div className="orderInfo">
        <div className="infoImage">
          <img src={acaiIcon} alt="banner_1" />
        </div>
        <div className="info">
          <span className="infoCode">
            <p>{`${acai.amount} Item`} </p> <p>{`#${acai.id}`}</p>
          </span>
          <p className="infoTitle">Açai Natural</p>
          <p className="infoDescription">{`-${acai.size}ml`}</p>
          <p className="infoDescription">{`-${acai.fruit}`}</p>
          <p className="infoDescription">{`-${acai.side_dishes.map(
            (dishes) => dishes
          )}`}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="orderDeviveryAndPrice">
        <div>
          <p className="infoDescription">Previsão de entrega</p>
          <p className="infoTitle">
            {isDelivered
              ? "entregue"
              : `${formattedCreatedAt} - ${formattedUpdatedTime}`}
          </p>
        </div>
        <div>
          <p className="infoDescription">Valor Total</p>
          <p className="infoTitle">{`R$${acai.total_price},00`}</p>
        </div>
      </div>
      <div className="orderActionsContainer">
        <button
          className="actionHelp"
          style={{ width: isDelivered ? "100%" : "" }}
        >
          AJUDA
        </button>
        {!isDelivered && (
          <button className="actionOrderTrack">RASTREAR PEDIDO</button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
