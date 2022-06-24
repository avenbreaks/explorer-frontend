import GreenCircle from '../../../../assets/icons/StatusAction/GreenCircle';
import OrangeCircle from '../../../../assets/icons/StatusAction/OrangeCircle';
import moment from 'moment';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

const BlocksBody = ({ index, lastCardRef, item }: any) => {
  const { number, miner, hash, totalTransactions, timestamp, size } = item;

  function redirectHandler() {
    navigate(`${item.number}`);
  }

  const navigate = useNavigate();
  const online = index > 0 ? <GreenCircle /> : <OrangeCircle />;

  return (
    <div className="blocks_blocks_body" ref={lastCardRef}>
      <div
        className="blocks_blocks_body_cell color-gray universall_link_underline validator-cell"
        style={{
          cursor: 'pointer',
        }}
        onClick={redirectHandler}
      >
        <span style={{ marginRight: 8 }}>{online}</span> {number}
      </div>
      <NavLink to={`/apollo/${miner}/`} className="universall_light2">
        <div className="blocks_blocks_body_cell color-gray validator-cell">
          {miner}
        </div>
      </NavLink>
      <div className="blocks_blocks_body_cell color-gray">
        {sliceData5(hash)}
      </div>
      <div className="blocks_blocks_body_cell">{totalTransactions}</div>
      <div className="blocks_blocks_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="blocks_blocks_body_cell">{size} bytes</div>
    </div>
  );
};

export default BlocksBody;
