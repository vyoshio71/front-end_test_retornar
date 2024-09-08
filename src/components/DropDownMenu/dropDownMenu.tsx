import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

import "../../css/components/dropdownMenu.css";
import Modal from "../Modal/modal";

import { getAllAcai } from "../../services/acaiServices";

import { IAcai, IDropdownMenu } from "../../interfaces/interfaces";

const DropdownMenu: React.FC<IDropdownMenu> = ({ isOpen, onClose }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [acaiList, setAcaiList] = useState<IAcai[]>([]);
  const dispatch = useDispatch();

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
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
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
                <div key={acai.id} className="acai-item">
                  <p>
                    <strong>Tamanho:</strong> {acai.size}
                  </p>
                  <p>
                    <strong>Fruta:</strong> {acai.fruit}
                  </p>
                  <p>
                    <strong>Acompanhamentos:</strong>{" "}
                    {acai.side_dishes.join(", ")}
                  </p>
                  <p>
                    <strong>Preço Total:</strong> R${acai.total_price},00
                  </p>
                  <p>
                    <strong>Estimativa:</strong> {acai.estimate} minutos
                  </p>
                  <p>
                    <strong>Total de Itens:</strong> R${acai.total_price},00
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {acai.amount}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DropdownMenu;
