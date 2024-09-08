import React from "react";

import "../../css/components/banner.css";

import { IBanner } from "../../interfaces/interfaces";

import backIcon from "../../assets/images/arrowBack.png";

/**
 * Banner Component.
 * @param {String} bannerSrc - The source URL of the banner image.
 * @param {Function} handleBack - Function to handle the back navigation.
 * @param {Boolean} hasBackButton - Validation for back button.
 *
 */

const Banner: React.FC<IBanner> = ({
  bannerSrc,
  handleBack,
  hasBackButton,
}) => {
  return (
    <div className="bannerContainer">
      <img src={bannerSrc} alt="banner" />

      <div
        className="arrowBackContainer"
        onClick={handleBack}
        style={{ display: hasBackButton ? "" : "none" }}
      >
        <img src={backIcon} alt="arrowBack" />
      </div>
    </div>
  );
};

export default Banner;
