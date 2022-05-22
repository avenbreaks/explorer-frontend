import BurgerMenuClose from 'assets/icons/MobileMenu/BurgerMenuClose';
import BurgerMenuOpen from 'assets/icons/MobileMenu/BurgerMenuOpen';
import FindWideMobile from 'components/Find/FindWideMobile';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef } from 'react';

interface MobileMenuProps {
  menu: any;
  setIsShow: any;
  isShow: any;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ menu, setIsShow, isShow }) => {
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsShow(false));

  return (
    <>
      <div ref={menuRef} className="mobile">
        <button onClick={() => setIsShow(!isShow)} className="menu__btn">
          {isShow ? <BurgerMenuClose /> : <BurgerMenuOpen />}
        </button>
        {isShow && (
          <div className="menu_mobile">
            <span style={{ backgroundColor: '#212121' }}>
              <FindWideMobile setIsShow={setIsShow} />
            </span>
            {menu}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
