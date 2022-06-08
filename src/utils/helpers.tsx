import { TransactionProps } from '../pages/Addresses/AddressDetails/address-details.interface';
import { ENABLE_LOGS } from './constants';
import Amb from 'assets/icons/Cryptos/Amb';
import Eth from 'assets/icons/Cryptos/Eth';
import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle';
import _ from 'lodash';
import moment from 'moment';

export const sliceData5 = (item: string | any) => {
  if (!item) {
    return '';
  }
  return item.length > 5
    ? `${item.slice(0, 5)}...${item.slice(item.length - 5)}`
    : item;
};
export const sliceData10 = (item: string | any) => {
  if (!item) {
    return '';
  }
  return item.length > 10
    ? `${item.slice(0, 10)}...${item.slice(item.length - 10)}`
    : item;
};
export const calcTime = (time: any) => {
  /*
   * @param {string} time
   * @returns {string}
   */
  return moment(time).isValid() ? moment(time * 1000).fromNow() : '';
};

export const setupStyle = (item: string | undefined) => {
  switch (item) {
    case 'ERC-20_Tx':
      return 'address_blocks_erc20';

    default:
      return 'address_blocks_cells';
  }
};

/*
 * @param {Array} data
 * @param {String} key
 *
 * @returns {Array}
 */
export const toUniqueValueByBlock = (arr: any) => {
  try {
    const compare: any = new Map(
      _.map([...arr], (item) => [item.txHash, item]),
    ).values();
    const newTx: TransactionProps[] = [...compare].sort(
      (a: any, b: any) => b.block - a.block,
    );
    return newTx;
  } catch {
    return arr;
  }
};

export const getTokenIcon = (symbol: string) => {
  /*
   * @param {string} symbol
   * @returns {Component}
   */
  switch (symbol) {
    case 'SAMB':
      return Amb;
    case 'WETH':
      return Eth;
    case 'AMB':
      return Amb;
    default:
      return Amb;
  }
};

export default function removeArrayDuplicates(array: any, key = '_id') {
  /*
   * @param {array} array - Array of elements to filter
   * @param {string} key - Element's key to filter by
   * @returns {array}
   */
  const ids: any = [];
  return _.filter(array, (item: any) => {
    if (ids.indexOf(item[key]) < 0) {
      ids.push(item[key]);
      return item;
    } else {
      return false;
    }
  });
}

export const numWithCommas = (val: number) => {
  /*
   * @param {number} x - Number to format
   * @returns {string}
   */
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
};

export const isFloat = (n: number | string) => {
  /* jsDoc
   * @param {number | string} n - Number to check
   * @returns {boolean}
   */
  return Number(n) === n && n % 1 !== 0;
};

export const displayAmount = (n: number | string) => {
  /* jsDoc
   * @param {number | string} n - Number to check
   * @returns {string}
   */
  return isFloat(n) ? Number(n).toFixed(8) : Number(n).toFixed(2);
};

export const calckBlocks = (blockReward: any) =>
  blockReward
    .reduce(
      (acc: any, item: { reward: { ether: any } }) => acc + item.reward.ether,
      0,
    )
    .toFixed(5);

export const isOnline = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return <GreenCircle />;

    case 'PENDING':
      return <OrangeCircle />;

    default:
      return <GreenCircle />;
  }
};

export const getAmbTokenSymbol = (tokenName: string) => {
  switch (tokenName.trim()) {
    case 'Hera pool token':
      return 'HPT';
    case 'Plutus pool token':
      return 'PPT';
    case 'Ganymede pool token':
      return 'GPT';
    default:
      return tokenName;
  }
};

export const log = (...args: any) => {
  /*
   * @param {any} args
   * @returns {void}
   */
  return ENABLE_LOGS && console.log(...args);
};

export const numberWithCommas = (number: string | number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const currenCurrency = (
  value: string | number,
  nameCurrency: string | number,
) => {
  switch (nameCurrency) {
    case 'TOTAL SUPPLY':
      return `${Number(value).toFixed()} AMB`;

    case 'MARKET CAP':
      return `${Number(value).toFixed()} USD`;

    default:
      return value;
  }
};

export const wrapString = (string: string) => {
  return _.split(string, '::').map((item, index) => (
    <span key={index + 1} style={{ fontSize: 'inherit' }}>
      {item}
    </span>
  ));
};

export const formatDate = (date: any, datetime = false) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0 ${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}${
    datetime ? ` ${strTime}` : ''
  }`;
};

export  function timeSince(date: any) {
  let seconds = Math.floor((+new Date() - date * 1000) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ' year' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' month' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' day' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hour' + (interval > 1 ? 's' : '');
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minute' + (interval > 1 ? 's' : '');
  }

  seconds = seconds < 1 ? 1 : seconds;

  return Math.floor(seconds) + ' second' + (seconds !== 1 ? 's' : '');
}

export const statusMessage = (node: any, nodeName: string) => {
  if (node.state === 'RETIRED') {
    return 'Retired';
  }

  if (nodeName === 'Apollo') {
    switch (node.status) {
      case 'ONLINE':
        return (
          <>
            <div className="apollo_blocks_body_cell_online">Uptime</div>{' '}
            {timeSince(
              node && node.statusHistory && node.statusHistory[0]
                ? node.statusHistory[0].timestamp
                : '',
            )}
          </>
        );
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return <div className="apollo_blocks_body_cell_offline">Offline</div>;
    }
  } else {
    switch (node.state) {
      case 'ONBOARDED':
        return `Onboarded`;
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return 'Offline';
    }
  }
};
