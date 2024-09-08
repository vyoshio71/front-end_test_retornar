import React, { useEffect, useState } from "react";

import "../css/pages/orderCheckout.css";

import arrowBack from "../assets/images/arrowBack.png";
import acaiIcon from "../assets/images/acai_order_icon.jpg";

import { IAcai, IOrderCheckout } from "../interfaces/interfaces";

import { getAllAcai } from "../services/acaiServices";

const OrderCheckout: React.FC<IOrderCheckout> = ({ handleBack }) => {
  const [acaiList, setAcaiList] = useState<IAcai[]>([]);

  useEffect(() => {
    const fetchAcai = async () => {
      try {
        const data = await getAllAcai();
        setAcaiList(data);
      } catch (error) {
        console.error("Erro ao buscar a lista de açaí:", error);
      }
    };

    fetchAcai();
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="orderCheckoutBox">
      <div className="orderCheckoutContainer">
        <div className="routeBackContainer" onClick={handleBack}>
          <img src={arrowBack} alt="back" />
          <h1 className="orderCheckoutTitle">Meus Pedidos</h1>
          <div></div>
        </div>

        <p className="orderCheckoutSubTitle">Pedidos Ativos</p>

        {acaiList &&
          acaiList.map((acai: IAcai) => {
            const createdAtDate = new Date(acai.created_at);
            createdAtDate.setMinutes(
              createdAtDate.getMinutes() + acai.estimate
            );

            const formattedCreatedAt = formatTime(new Date(acai.created_at));
            const formattedUpdatedTime = formatTime(createdAtDate);

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
                      {formattedCreatedAt} - {formattedUpdatedTime}
                    </p>
                  </div>
                  <div>
                    <p className="infoDescription">Valor Total</p>
                    <p className="infoTitle">{`R$${acai.total_price},00`}</p>
                  </div>
                </div>
                <div className="orderActionsContainer">
                  <button className="actionHelp">AJUDA</button>
                  <button className="actionOrderTrack">RASTREAR PEDIDO</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderCheckout;
