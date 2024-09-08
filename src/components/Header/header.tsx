import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import DropdownMenu from "../DropDownMenu/dropDownMenu";

import "../../css/components/header.css";

import logo from "../../assets/images/water_full.png";
import userIcon from "../../assets/images/user.png";
import { IHeader } from "../../interfaces/interfaces";

/**
 * Header Component.
 *
 */

const Header: React.FC<IHeader> = ({ handleBackRoute }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userName, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="headerContainer">
      <div></div>
      <div className="logoContainer">
        <img src={logo} alt="header_logo" />

        <p className="headerTitle" onClick={handleBackRoute}>
          peça açaí
        </p>
      </div>

      <div className="userContainer">
        {isLoggedIn && (
          <>
            <img src={userIcon} alt="user" onClick={handleLogoClick} />
            <p>{userName}</p>
            <DropdownMenu isOpen={isDropdownOpen} onClose={closeDropdown} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
