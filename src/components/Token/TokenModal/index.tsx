import TokenItem from '../TokenItem';
import { FC, useEffect, useState } from 'react';

interface TokenModalProps {
  selectedToken: string;
  setToken: (token: string) => void;
  addressData: any;
}

const TokenModal: FC<TokenModalProps> = ({
  addressData,
  selectedToken,
  setToken,
}) => {
  const [name] = useState('');
  const [filteredTokensList, setFilteredTokensList] = useState([]);

  useEffect(() => {
    if (name) {
      const newTokensList =
        addressData &&
        addressData?.tokens.filter((token: any) =>
          token.name.toLowerCase().includes(name.toLowerCase()),
        );
      setFilteredTokensList(newTokensList || []);
      if (!newTokensList.length) {
        setFilteredTokensList(addressData?.tokens || []);
      }
    }
  }, [name, addressData?.tokens, selectedToken]);

  return (
    <div className="token_modal" tabIndex={0}>
      {addressData?.tokens?.length ? (
        <>
          <div>
            <div className="token_modal_tokens">
              ERC-20 Tokens
              <span className="universall_light2" style={{ marginLeft: 4 }} />
            </div>
            <div className="token_modal_arrows" />
          </div>
          {!filteredTokensList.length
            ? addressData?.tokens.map(
                (token: { name: string; idx: number }) => (
                  <TokenItem
                    key={token.name + token.idx}
                    selectedToken={selectedToken}
                    token={token}
                    setToken={setToken}
                  />
                ),
              )
            : filteredTokensList.map((token: { name: string; idx: number }) => (
                <TokenItem
                  key={token.name + token.idx}
                  selectedToken={selectedToken}
                  token={token}
                  setToken={setToken}
                />
              ))}
        </>
      ) : (
        <div>
          <div className="token_modal_tokens">
            <div>You don't have tokens yet</div>
            <span className="universall_light2" style={{ marginLeft: 4 }} />
          </div>
          <div className="token_modal_arrows" />
        </div>
      )}
    </div>
  );
};

export default TokenModal;