import React, { useEffect, useState } from "react";

import "../css/pages/orderCheckout.css";

import arrowBack from "../assets/images/arrowBack.png";

import { IAcai, IOrderCheckout } from "../interfaces/interfaces";

import { getAllAcai } from "../services/acaiServices";
import OrderCard from "../components/OrderCard/orderCard";

const OrderCheckout: React.FC<IOrderCheckout> = ({ handleBack }) => {
  const [acaiList, setAcaiList] = useState<IAcai[]>([]);
  const [deliveredAcaiList, setDeliveredAcaiList] = useState<IAcai[]>([]);

  useEffect(() => {
    const fetchAcai = async () => {
      try {
        const data = await getAllAcai();
        const currentTime = new Date();

        const activeOrders = data.filter((acai) => {
          const estimatedDeliveryTime = new Date(acai.created_at);
          estimatedDeliveryTime.setMinutes(
            estimatedDeliveryTime.getMinutes() + acai.estimate
          );
          return estimatedDeliveryTime > currentTime;
        });

        const deliveredOrders = data.filter((acai) => {
          const estimatedDeliveryTime = new Date(acai.created_at);
          estimatedDeliveryTime.setMinutes(
            estimatedDeliveryTime.getMinutes() + acai.estimate
          );
          return estimatedDeliveryTime <= currentTime;
        });

        setAcaiList(activeOrders);
        setDeliveredAcaiList(deliveredOrders);
      } catch (error) {
        console.error("Erro ao buscar a lista de açaí:", error);
      }
    };

    fetchAcai();
  }, []);

  return (
    <div className="orderCheckoutBox">
      <div className="orderCheckoutContainer">
        <div className="routeBackContainer" onClick={handleBack}>
          <img src={arrowBack} alt="back" />
          <h1 className="orderCheckoutTitle">Meus Pedidos</h1>
          <div></div>
        </div>

        <p className="orderCheckoutSubTitle">Pedidos Ativos</p>

        {acaiList.map((acai) => (
          <OrderCard key={acai.id} acai={acai} isDelivered={false} />
        ))}

        {deliveredAcaiList.map((acai) => (
          <OrderCard key={acai.id} acai={acai} isDelivered={true} />
        ))}
      </div>
    </div>
  );
};

export default OrderCheckout;
