import {ambToUSD, statusMessage} from "../../../../../utils/helpers";
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import {Currency} from "../../../../../components/UI/Currency";
import useCopyContent from "../../../../../hooks/useCopyContent";
import {TParams} from "../../../../../types";
import {useParams} from "react-router-dom";
import ContentCopyed from "../../../../../assets/icons/CopyIcons/ContentCopyed";
import ContentCopy from "../../../../../assets/icons/CopyIcons/ContentCopy";
import CopyPopUp from "../../../../../assets/icons/CopyIcons/CopyPopUp";
import React from "react";

const ApolloDetailsBalance = ({apollo}: any) => {
  const {balance, stake, version} = apollo
  const ambBalance = balance.ether || 0;
  const ambStake = stake.ether || 0;
  const {data: appData} = useTypedSelector((state: any) => state.app);
  const {price_usd} = appData && appData?.tokenInfo || 0
  const usdBalance = ambToUSD(ambBalance, price_usd);
  const usdStake = ambToUSD(ambStake, price_usd);

  return (
    <div className="apollo_details_balance">
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
          <Currency value={ambBalance || 0} symbol='AMB' fixed={2}/>
          </span>
          <span className=""> /
            <Currency value={usdBalance} symbol='$' side='left' fixed={2}/>
          </span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          UPTIME
        </div>
        <div className="apollo_details_balance_online">
          {statusMessage(apollo, 'ApolloDetails')}
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
             {' '}
            <Currency
              value={ambStake}
              symbol='AMB'
              fixed={2}
            />{' '}
          </span>
          <span className=""> /
           <Currency value={usdStake} symbol='$' side='left' fixed={2}/>
          </span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          SOFTWARE
        </div>
        <div className="apollo_details_balance_fonts_bold">{version}</div>
      </div>
    </div>
  );
};

export default ApolloDetailsBalance;
