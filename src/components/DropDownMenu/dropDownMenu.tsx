import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

import "../../css/components/dropdownMenu.css";

import OrderCard from "../OrderCard/orderCard";
import Modal from "../Modal/modal";

import { getAllAcai } from "../../services/acaiServices";

import { IAcai, IDropdownMenu } from "../../interfaces/interfaces";
import { persistor } from "../../store/store";

const DropdownMenu: React.FC<IDropdownMenu> = ({ isOpen, onClose }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [acaiList, setAcaiList] = useState<IAcai[]>([]);
  const [deliveredAcaiList, setDeliveredAcaiList] = useState<IAcai[]>([]);
  const dispatch = useDispatch();

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
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dropdown">
      <ul className="dropdown-menu">
        <ul onClick={handleLogout}>Sair</ul>
        <ul onClick={() => setIsOpenModal(true)}>Pedidos</ul>
      </ul>

      <Modal isModalOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div>
          <h2 style={{ color: "#000" }}>Pedidos</h2>
          <div className="acai-list">
            {acaiList &&
              acaiList.map((acai) => (
                <OrderCard key={acai.id} acai={acai} isDelivered={false} />
              ))}

            {deliveredAcaiList &&
              deliveredAcaiList.map((acai) => (
                <OrderCard key={acai.id} acai={acai} isDelivered={true} />
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DropdownMenu;
