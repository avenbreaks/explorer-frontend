import Method from './Method';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReadContract = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);

  useEffect(() => {
    const testUrl =
      'https://sourcify.dev/server/files/any/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

    axios({
      method: 'get',
      url: testUrl,
    })
      .then((res) => JSON.parse(res.data.files[0].content))
      .then((res) => setContractAbi(res.output.abi));
  }, []);
  console.log(contractAbi);

  return (
    <div>
      <h2 className="contract-tab-title">Contract Source Code</h2>
      <div className="methods">
        {contractAbi
          // .filter(
          //   (method: any) => method.constant && method.type === 'function',
          // )
          .filter(
            (method: any) =>
              (method.stateMutability === 'view' ||
                method.stateMutability === 'pure') &&
              method.type === 'function',
          )
          .map((method: any, index: number) => {
            return <Method key={index} index={index} method={method} />;
          })}
      </div>
    </div>
  );
};

export default ReadContract;

// const contractAbi: any = [
//   {
//     constant: true,
//     inputs: [],
//     name: 'active',
//     outputs: [
//       {
//         name: '',
//         type: 'bool',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'name',
//     outputs: [
//       {
//         name: '',
//         type: 'string',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     name: 'nodes',
//     outputs: [
//       {
//         name: '',
//         type: 'address',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'nodeType',
//     outputs: [
//       {
//         name: '',
//         type: 'uint8',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'nodeStake',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'renounceOwnership',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'totalStake',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'owner',
//     outputs: [
//       {
//         name: '',
//         type: 'address',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'minStakeValue',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'id',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'fee',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [
//       {
//         name: '_newOwner',
//         type: 'address',
//       },
//     ],
//     name: 'transferOwnership',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'token',
//     outputs: [
//       {
//         name: '',
//         type: 'address',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         name: 'poolName',
//         type: 'string',
//       },
//       {
//         name: 'poolNodeType',
//         type: 'uint8',
//       },
//       {
//         name: 'poolNodeStake',
//         type: 'uint256',
//       },
//       {
//         name: 'poolMinStakeValue',
//         type: 'uint256',
//       },
//       {
//         name: 'poolFee',
//         type: 'uint256',
//       },
//       {
//         name: 'service',
//         type: 'address',
//       },
//       {
//         name: 'head',
//         type: 'address',
//       },
//     ],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     payable: true,
//     stateMutability: 'payable',
//     type: 'fallback',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         name: 'previousOwner',
//         type: 'address',
//       },
//     ],
//     name: 'OwnershipRenounced',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         name: 'previousOwner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         name: 'newOwner',
//         type: 'address',
//       },
//     ],
//     name: 'OwnershipTransferred',
//     type: 'event',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'getVersion',
//     outputs: [
//       {
//         name: '',
//         type: 'string',
//       },
//     ],
//     payable: false,
//     stateMutability: 'pure',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'activate',
//     outputs: [],
//     payable: true,
//     stateMutability: 'payable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'deactivate',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'ownerUnstake',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [
//       {
//         name: 'service',
//         type: 'address',
//       },
//     ],
//     name: 'setService',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [
//       {
//         name: 'newName',
//         type: 'string',
//       },
//     ],
//     name: 'setName',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'stake',
//     outputs: [],
{
  /*    payable: true,*/
}
{
  /*    stateMutability: 'payable',*/
}
{
  /*    type: 'function',*/
}
{
  /*  },*/
}
//   {
//     constant: false,
//     inputs: [
//       {
{
  /*        name: 'tokens',*/
}
//         type: 'uint256',
//       },
//     ],
//     name: 'unstake',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: true,
{
  /*    inputs: [],*/
}
//     name: 'viewStake',
{
  /*    outputs: [*/
}
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'getTokenPrice',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: 'addReward',
//     outputs: [],
//     payable: true,
//     stateMutability: 'payable',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [
//       {
//         name: 'requestId',
//         type: 'uint256',
//       },
//       {
//         name: 'node',
//         type: 'address',
//       },
//       {
//         name: 'nodeId',
//         type: 'uint256',
//       },
//     ],
//     name: 'addNode',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'getNodesCount',
//     outputs: [
//       {
//         name: '',
//         type: 'uint256',
{
  /*      },*/
}
{
  /*    ],*/
}
{
  /*    payable: false,*/
}
{
  /*    stateMutability: 'view',*/
}
//     type: 'function',
//   },
{
  /*  {*/
}
{
  /*    constant: true,*/
}
{
  /*    inputs: [*/
}
{
  /*      {*/
}
{
  /*        name: 'from',*/
}
{
  /*        type: 'uint256',*/
}
{
  /*      },*/
}
{
  /*      {*/
}
{
  /*        name: 'to',*/
}
{
  /*        type: 'uint256',*/
}
//       },
//     ],
//     name: 'getNodes',
{
  /*    outputs: [*/
}
{
  /*      {*/
}
{
  /*        name: '_nodes',*/
}
//         type: 'address[]',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];
// const contractAbi = [
//   {
//     inputs: [
//       {
//         internalType: 'string',
//         name: 'name_',
//         type: 'string',
//       },
//       {
//         internalType: 'string',
//         name: 'symbol_',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'value',
//         type: 'uint256',
//       },
//     ],
//     name: 'Approval',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'dst',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'Deposit',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'from',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'value',
//         type: 'uint256',
//       },
//     ],
//     name: 'Transfer',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'src',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'Withdrawal',
//     type: 'event',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//     ],
//     name: 'allowance',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'approve',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'account',
//         type: 'address',
//       },
//     ],
//     name: 'balanceOf',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'decimals',
//     outputs: [
//       {
//         internalType: 'uint8',
//         name: '',
//         type: 'uint8',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'subtractedValue',
//         type: 'uint256',
//       },
//     ],
//     name: 'decreaseAllowance',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'deposit',
//     outputs: [],
//     stateMutability: 'payable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'addedValue',
//         type: 'uint256',
//       },
//     ],
//     name: 'increaseAllowance',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'name',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'symbol',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'totalSupply',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'recipient',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'transfer',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'sender',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'recipient',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'transferFrom',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'withdraw',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ];
