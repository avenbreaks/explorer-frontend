import React, {useEffect, useState} from 'react';
import { Content } from 'components/Content';
import API from "../../API/api";
import TabsNew from "./components/TabsNew";
import {transactionsTabs} from "../../utils/sidePages";
import moment from "moment";
import AddressBlock from "../Addresses/AddressDetails/components/AddressBlocks/AddressBlock";
import AddressBlocksHeader from "../Addresses/AddressDetails/components/AddressBlocksHeader";
import {useInView} from "react-intersection-observer";
import Loader from "../../components/Loader";

export const Transactions = () => {
  const [txsData, setTxsData] = useState({
    data: [],
    pagination: {
      hasNext: false,
      next: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('');
  const { ref, inView } = useInView();

  useEffect(() => {
    getTransactions()
      .then((response: any) => setTxsData(response));
  }, []);

  useEffect(() => {
    if (inView && !loading && txsData.pagination && txsData.pagination.hasNext) {
      getTransactions({ type: tab, page: txsData.pagination.next })
        .then((response: any) => {
          // @ts-ignore
          setTxsData((state: any) => ({
            data: [...state.data, ...response.data],
            pagination: response.pagination,
          }))
        })
    }
  }, [inView]);

  const getTransactions = (params: object = {}) => {
    setLoading(true);

    return API.getTransactions({ ...params, limit: 50 })
      .finally(() => setLoading(false));
  };

  const handleTab = (type: string) => {
    setTxsData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });

    getTransactions({ type })
      .then((response: any) => setTxsData(response));

    setTab(type);
  };

  return (
    <Content>
      <Content.Header>
        <h1>Transactions</h1>
      </Content.Header>
      <Content.Body>
        <TabsNew
          tabs={transactionsTabs}
          onChange={handleTab}
          selectedItem={tab}
        />
        {!!txsData.data.length && (
          <AddressBlocksHeader
            txhash="txHash"
            method="Method"
            from="From"
            to="To"
            date="Date"
            block="Block"
            amount="Amount"
            txfee="txFee"
            token={null}
            methodFilters={null}
            isTableColumn={'address_blocks_cells'}
          />
        )}
        {!!txsData.data.length && txsData.data.map((tx: any, i) => (
          <AddressBlock
            isLatest={true}
            key={i}
            txhash={tx.hash}
            method={tx.type}
            from={tx.from}
            to={tx.to}
            date={moment(tx.timestamp * 1000).fromNow()}
            block={tx.blockNumber}
            amount={tx.value.ether}
            txfee={tx.gasCost.ether}
            token={`${tx?.token ? tx?.token : 'AMB'}`}
            symbol={`${
              tx?.symbol ? tx?.symbol : 'AMB'
            }`}
            isTableColumn="address_blocks_cells"
            isIcon={true}
          />
        ))}
        <div ref={ref} />
        {loading && <Loader />}
      </Content.Body>
    </Content>
  );
}
