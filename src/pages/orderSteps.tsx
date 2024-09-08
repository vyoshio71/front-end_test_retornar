import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { decrementCount, incrementCount } from "../redux/orderSlice";

import { RootState } from "../store/store";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "../css/pages/orderSteps.css";

import { IOrderFormValues } from "../interfaces/interfaces";

import { postAcai } from "../services/acaiServices";

import { AcaiSchema, OrderStepsSchema } from "../schemas/schema";

import { fruits, sizes, addons } from "../mocks/acaiData";

import banner1 from "../assets/images/mobile_banner_1.png";
import banner2 from "../assets/images/mobile_banner_2.png";
import banner3 from "../assets/images/mobile_banner_3.png";
import dek_banner_1 from "../assets/images/desktop_banner_1.png";

import SnackBar from "../components/SnackBar/snackBar";
import Order from "../components/Order/order";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import OrderCheckout from "./orderCheckout";

const OrderSteps = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { count, selectedSize, selectedAddons, selectedFruit, totalPrice } =
    useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IOrderFormValues>({
    resolver: zodResolver(OrderStepsSchema),
    defaultValues: {
      size: 0,
      fruit: 0,
      addons: [],
    },
  });

  const buildAcaiData = (
    selectedSize: number,
    selectedFruit: number,
    selectedAddons: number[],
    totalPrice: number,
    count: number,
    created_at: string
  ) => {
    const sizeAndMl = sizes.find((size) => size.id === selectedSize);
    const size = sizeAndMl ? `${sizeAndMl.name} - ${sizeAndMl.volume_ml}` : "";

    const fruit =
      fruits.find((fruit) => fruit.id === selectedFruit)?.name || "";
    const sideDishes = selectedAddons.map(
      (id) => addons.find((addon) => addon.id === id)?.name || ""
    );
    const deliveryTime =
      sizes.find((size) => size.id === selectedSize)?.delivery_time || 0;

    return {
      size,
      fruit,
      side_dishes: sideDishes,
      total_price: totalPrice,
      estimate: deliveryTime,
      amount: count,
      created_at: new Date().toISOString(),
    };
  };

  const handleIncrement = () => {
    dispatch(incrementCount());
  };

  const handleDecrement = () => {
    dispatch(decrementCount());
  };

  const handleBackRoute = () => {
    if (
      location.pathname === "/order/checkout" ||
      location.pathname === "/order/step-1"
    ) {
      reset();
      navigate("/order/step-1");
    } else {
      navigate(-1);
    }
  };

  const handleNextRoute = async () => {
    if (location.pathname === "/order/step-1") {
      const isValid = await trigger("size");
      if (isValid) {
        navigate("/order/step-2");
      }
    } else if (location.pathname === "/order/step-2") {
      const isValid = await trigger("fruit");
      if (isValid) {
        navigate("/order/step-3");
      }
    } else if (location.pathname === "/order/step-3") {
      const created_at = new Date().toISOString();
      const acaiData = buildAcaiData(
        selectedSize,
        selectedFruit,
        selectedAddons,
        totalPrice,
        count,
        created_at
      );

      try {
        AcaiSchema.parse(acaiData);

        const response = await postAcai(acaiData);

        if (response?.ok) {
          setSnackbarMessage("Pedido criado com sucesso!");
          setShowSnackbar(true);
          navigate("/order/checkout");
        } else {
          setSnackbarMessage("Erro ao criar pedido.");
          setShowSnackbar(true);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setSnackbarMessage("Selecione os itens para realizar o pedido");
          setShowSnackbar(true);
        } else {
          setSnackbarMessage("Erro ao enviar o pedido");
          setShowSnackbar(true);
        }
      } finally {
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="orderContainer">
      <Header handleBackRoute={handleBackRoute} />
      <Routes>
        <Route path="/" element={<Navigate to="step-1" />} />
        <Route
          path="step-1"
          element={
            <Order
              menuTitle="Escolha o Tamanho"
              menuSubTitle="Escolha pelo menos 1 opção"
              stepInfo="1/3"
              hasIcon={false}
              items={sizes}
              inputType="radio"
              handleBack={handleBackRoute}
              controllerName={"size"}
              control={control}
              errors={errors}
              bannerSrc={banner1}
              bannerDesktopSrc={dek_banner_1}
              count={count}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleNextStep={handleNextRoute}
              totalPrice={totalPrice}
              required={true}
              img_alt="img"
            />
          }
        />
        <Route
          path="step-2"
          element={
            <Order
              menuTitle="Escolha uma Fruta"
              menuSubTitle="Escolha pelo menos 1 opção"
              stepInfo="2/3"
              hasIcon={true}
              items={fruits}
              inputType="radio"
              handleBack={handleBackRoute}
              controllerName={"fruit"}
              control={control}
              errors={errors}
              img_alt="img_2"
              bannerSrc={banner2}
              bannerDesktopSrc={dek_banner_1}
              count={count}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleNextStep={handleNextRoute}
              required={true}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path="step-3"
          element={
            <Order
              menuTitle="Escolha complementos"
              menuSubTitle="Escolha até 3 opções."
              stepInfo="3/3"
              hasIcon={true}
              items={addons}
              inputType="checkbox"
              handleBack={handleBackRoute}
              controllerName={"addons"}
              control={control}
              errors={{}}
              img_alt="img_3"
              bannerSrc={banner3}
              bannerDesktopSrc={dek_banner_1}
              count={count}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleNextStep={handleNextRoute}
              required={false}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path="checkout"
          element={<OrderCheckout handleBack={handleBackRoute} />}
        />
      </Routes>

      <SnackBar show={showSnackbar} message={snackbarMessage} />
      {location.pathname !== "/order/checkout" && (
        <div className="actionOrderMobile">
          <Footer
            totalPrice={totalPrice}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleNextStep={handleNextRoute}
            count={count}
          />
        </div>
      )}
    </div>
  );
};

export default OrderSteps;
