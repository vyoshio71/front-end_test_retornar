import React, { useEffect, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";

import {
  resetOrder,
  selectFruit,
  selectSize,
  toggleAddon,
} from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import starIcon from "../../assets/images/star.png";

import { IAddons, IFruit, IOrder, ISize } from "../../interfaces/interfaces";

import "../../css/components/order.css";

import Banner from "../Banner/banner";
import Footer from "../Footer/footer";
import Modal from "../Modal/modal";

/**
 * Order Component.
 * @param {String} menuTitle - The title of the menu.
 * @param {String} menuSubTitle - The subtitle of the menu.
 * @param {Object} control - The control object from react-hook-form.
 * @param {String} stepInfo - Information about the current step.
 * @param {Array} items - List of items to be displayed.
 * @param {String} controllerName - The name of the controller.
 * @param {String} inputType - The type of input.
 * @param {Boolean} hasIcon - Indicates if the component has an icon.
 * @param {String} img_alt - The alt text for the image.
 * @param {Function} handleBack - Function to handle the back navigation.
 * @param {Object} errors - Errors to be displayed.
 * @param {String} bannerSrc - The source URL of the banner image.
 * @param {String} bannerDesktopSrc - The source URL of the banner image for desktop.
 * @param {Number} count - The current count state.
 * @param {Function} handleDecrement - Function to decrement the count.
 * @param {Function} handleIncrement - Function to increment the count.
 * @param {Function} handleNextStep - Function to handle the next navigation step.
 * @param {Number} totalPrice - The total price value.
 * @param {Boolean} required - Prop for required input in react-hook-form.
 */

const Order: React.FC<IOrder> = ({
  menuTitle,
  menuSubTitle,
  control,
  stepInfo,
  items,
  controllerName,
  inputType,
  hasIcon,
  img_alt,
  handleBack,
  errors,
  bannerSrc,
  bannerDesktopSrc,
  count,
  handleDecrement,
  handleIncrement,
  handleNextStep,
  totalPrice,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedValues = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();

  const { reset } = useForm();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
    item: ISize | IFruit | IAddons
  ) => {
    const id = Number(e.target.value);
    const price = item.price || 0;

    if (inputType === "checkbox") {
      const valueArray = Array.isArray(field.value) ? [...field.value] : [];
      if (e.target.checked) {
        valueArray.push(id);
        dispatch(toggleAddon({ id, price }));
      } else {
        const index = valueArray.indexOf(id);
        if (index > -1) {
          valueArray.splice(index, 1);
          dispatch(toggleAddon({ id, price }));
        }
      }
      field.onChange(valueArray);
    } else {
      field.onChange(id);
      switch (controllerName) {
        case "size":
          dispatch(selectSize({ id, price }));
          break;
        case "fruit":
          dispatch(selectFruit({ id, price }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    return () => {
      reset();
      dispatch(resetOrder());
    };
  }, [reset, dispatch]);

  return (
    <div className="productInfoContainer">
      <div className="mobileBanner">
        <Banner
          handleBack={handleBack}
          bannerSrc={bannerSrc}
          hasBackButton={controllerName !== "size"}
        />
      </div>

      <div className="containerDesktop">
        <div className="bannerDesktop">
          <Banner handleBack={handleBack} bannerSrc={bannerDesktopSrc} />
        </div>
        <div className="menuTips">
          <h1>Açaí Natural</h1>
          <div className="ratingContent">
            <img src={starIcon} alt="star" />
            <p>4.5</p>
            <span>(30+)</span>
            <span
              className="modalRating"
              onClick={() => setIsOpen(true)}
              style={{ color: "#FE724C" }}
            >
              Ver avaliações
            </span>
          </div>
          <p className="description">
            Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente
            açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou
            rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse
            copo!
          </p>

          <div className="scrollContent">
            <div className="menuContainer">
              <div className="topMenu">
                <div className="menuTitleAndSubTitle">
                  <p className="title">{menuTitle}</p>
                  <p className="subtitle">{menuSubTitle}</p>
                </div>
                <span>{stepInfo}</span>
              </div>

              <div className="menuItemContent">
                {items &&
                  items.map((item: any) => (
                    <div className="item" key={item.id}>
                      <div className="itemContainer">
                        {hasIcon && item.img && (
                          <img src={`${item.img}`} alt={`${img_alt}`} />
                        )}
                        {`${item.name}${
                          item.volume_ml ? ` - ${item.volume_ml} ml` : ""
                        }`}
                      </div>

                      <div className="priceCombo">
                        <label>{`R$${item.price}`}</label>
                        <Controller
                          key={`${controllerName}-${item.id}`}
                          name={controllerName}
                          control={control}
                          defaultValue={
                            controllerName === "addons"
                              ? selectedValues.selectedAddons.map((id) => id)
                              : controllerName === "size"
                              ? selectedValues.selectedSize
                              : selectedValues.selectedFruit
                          }
                          render={({ field }) => (
                            <input
                              {...field}
                              type={inputType}
                              value={item.id}
                              required={required}
                              checked={
                                Array.isArray(field.value)
                                  ? field.value.includes(item.id)
                                  : field.value === item.id
                              }
                              onChange={(e) => handleChange(e, field, item)}
                            />
                          )}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div
                className={`errorContainer ${
                  errors[controllerName] ? "visible" : ""
                }`}
              >
                {errors[controllerName] && errors[controllerName].message}
              </div>
              <div className="actionOrderDesktop">
                <Footer
                  count={count}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  handleNextStep={handleNextStep}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isModalOpen={isOpen} onClose={handleCloseModal}>
        <div className="feedbackContainer">
          <div className="feedbackStars">
            <p style={{ fontWeight: "bold" }}>Nota:</p>
            <p>
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  <img src={starIcon} alt="star" />
                </span>
              ))}
            </p>
            <span>(5,5)</span>
          </div>

          <div className="feedbackDescription">
            <p>
              <span style={{ fontWeight: "bold" }}>Descrição:</span> Eu
              experimentei o Açaí Natural e fiquei extremamente satisfeito com a
              qualidade e o sabor. O açaí veio bem gelado, com uma textura
              cremosa e um sabor autêntico que realmente destaca a fruta. A
              porção de 500 ml foi generosa e perfeita para matar a vontade.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Order;
