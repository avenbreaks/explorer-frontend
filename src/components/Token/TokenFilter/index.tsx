import TokenModal from '../TokenModal';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import { useActions } from 'hooks/useActions';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TParams } from 'types';

const TokenFilter = ({ loading, addressData, onClick, selectedToken }: any) => {
  const { addFilter } = useActions();
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { address }: TParams = useParams();
  const refTokensModal = useRef<HTMLDivElement>(null);
  useOnClickOutside(refTokensModal, () => setIsShow(false));
  const toggleMenu = () => (!loading ? setIsShow(!isShow) : null);

  const handleSelect = (token: any) => {
    onClick(token);
    addFilter(token);
    setIsShow(false);
    navigate(
      `/addresses/${address}/ERC-20_Tx/${
        token.contract ? token.contract : token.address
      }/`,
    );
  };
  return (
    <>
      <div
        ref={refTokensModal}
        tabIndex={0}
        className={`token_filter ${
          loading && !addressData?.tokens?.length
            ? 'toggle'
            : loading
            ? 'toggle'
            : ''
        }`}
      >
        <div className="token_filter_input">
          <span
            className={`token_filter_input_rectangle ${
              loading && !addressData?.tokens?.length
                ? 'toggle'
                : loading
                ? 'toggle'
                : !addressData?.tokens?.length
                ? ''
                : 'toggle'
            }`}
          >
            {loading && !addressData?.tokens?.length
              ? ''
              : loading
              ? !addressData?.tokens?.length
              : !addressData?.tokens?.length
              ? 0
              : addressData.tokens.length}
          </span>
          <button
            className="token_filter_input_btn"
            type="button"
            onClick={toggleMenu}
          >
            <span className="token_filter_input_text">{''}</span>
            {isShow ? <ArrowUpBig /> : <ArrowDownBig />}
          </button>
        </div>
        {isShow && (
          <TokenModal
            addressData={addressData}
            selectedToken={selectedToken}
            setToken={handleSelect}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(TokenFilter);