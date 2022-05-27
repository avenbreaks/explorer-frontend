import { toUniqueValueByBlock } from '../../../utils/helpers';
import { TokenType, TransactionProps } from './address-details.interface';
import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import { Content } from 'components/Content';
import FilteredToken from 'components/FilteredToken';
import OverallBalance from 'components/OveralBalance';
import Tabs from 'components/Tabs';
import Token from 'components/Token';
import { formatEther } from 'ethers/lib/utils';
import { useActions } from 'hooks/useActions';
import useCopyContent from 'hooks/useCopyContent';
import { useTypedSelector } from 'hooks/useTypedSelector';
import useWindowSize from 'hooks/useWindowSize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDataForAddress } from 'services/address.service';
import { TParams } from 'types';
import _ from 'lodash';

export const AddressDetails = () => {
  const { filters } = useTypedSelector(
    (state) => state.tokenFilters,
    shallowEqual
  );
  const {
    loading,
    data: addressData,
    error: errorData
  } = useTypedSelector((state: any) => state.position);
  const { address, type, filtered, tokenToSorted }: TParams = useParams();
  const { setPosition, addFilter } = useActions();
  const [transactionType, setTransactionType] = useState(type);
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [tx, setTx] = useState<TransactionProps[] | []>([]);
  const [pageNum, setPageNum] = useState(1);
  const [limitNum] = useState(30);
  const observer = useRef<IntersectionObserver>();

  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);

  const lastCardRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          addressData &&
          pageNum < addressData?.meta?.totalPages
        ) {
          setPageNum((prevNum) => prevNum + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    return () => {
      setPosition(() => null);
    };
  }, [address]);

  useEffect(() => {
    if (address || type || filtered || tokenToSorted) {
      setTx([]);
      setPageNum(1);
    }
  }, [address, type, filtered, tokenToSorted]);

  useEffect(() => {
    if (filtered && addressData?.tokens?.length) {
      addFilter(
        _.find(addressData.tokens, (token: TokenType) => token.contract === filtered)
      );
    }
    if (!loading || errorData) {
      if (addressData && addressData?.meta?.totalPages > pageNum) {
        setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract
              ? selectedToken.contract
              : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum
        });
      } else {
        setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract
              ? selectedToken.contract
              : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum
        });
      }
    }
  }, [
    filters,
    transactionType,
    selectedToken,
    filtered,
    tokenToSorted,
    address,
    pageNum,
    type
  ]);
  useEffect(() => {
    if (addressData && addressData?.transactions) {
      setTx((prevState) => {
        const compareState = _.uniq(
          _.concat(prevState, addressData.transactions)
        );
        const addressDataState = _.clone(addressData.transactions);
        if (type === 'ERC-20_Tx' && !filtered) {
          const newTx: any = addressDataState.sort(
            (a: any, b: any) => b.block - a.block,
          );
          return newTx;
        } else if (type === 'ERC-20_Tx' && filtered) {
          const newTx: any = addressDataState.sort(
            (a: any, b: any) => b.block - a.block,
          );
          return newTx;
        } else {
          const newTx: TransactionProps[] = toUniqueValueByBlock(compareState);
          const transfersDataTx: TransactionProps[] = _.filter(newTx, (item: TransactionProps) => item.method === 'Transfer'
          );

          return type === 'transfers' ? transfersDataTx : newTx;
        }
      });
    }
  }, [addressData, type]);

  useEffect(() => {
    if (addressData && addressData?.tokens && !selectedToken) {
      setSelectedToken(
        _.find(addressData.tokens, (token: TokenType) => token.contract === filtered)
      );
    }
  }, [addressData]);

  const { width } = useWindowSize();

  return (
    <Content>
      <section className='address_details'>
        <Content.Header>
          <h1 className='address_details_h1'>
            Address Details
            <div className='address_details_copy'>
              {address}
              <button
                className={'address_details_copy_btn'}
                onClick={copyContent}
              >
                {isCopy ? (
                  <>
                    <ContentCopyed />
                  </>
                ) : (
                  <ContentCopy />
                )}
                {width > 786 && isCopyPopup && isCopy && (
                  <div className='address_details_copyed'>
                    <CopyPopUp x={3} y={20} values='Copyed' />
                  </div>
                )}
              </button>
            </div>
          </h1>
          <div className='address_details_section'>
            <div className='address_details_info'>
              <OverallBalance
                addressBalance={
                  addressData &&
                  addressData.balance &&
                  Number(formatEther(addressData.balance)).toFixed(2)
                }
              />

              <Token
                loading={loading}
                addressData={addressData}
                selectedToken={selectedToken}
                onClick={setSelectedToken}
              />
            </div>
            {selectedToken && (
              <FilteredToken setSelectedToken={setSelectedToken} />
            )}
          </div>
        </Content.Header>
        <Content.Body isLoading={filtered ? !loading : true}>
          <Tabs
            lastCardRef={lastCardRef}
            onClick={setSelectedToken}
            selectedToken={selectedToken}
            transactionType={transactionType}
            data={tx || []}
            setTransactionType={setTransactionType}
          />
        </Content.Body>
      </section>
    </Content>
  );
};
