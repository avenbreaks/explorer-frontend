import {
  CodeContract,
  ReadContract,
  WriteContract,
  VerifyContract,
} from '../index';
import ContractHeader from './components/ContractHeader';
import React from 'react';
import { useParams } from 'react-router-dom';

const ContractDetails = () => {
  const { filtered } = useParams();

  function getTab() {
    switch (filtered) {
      case 'code':
        return (
          <div className="code_contract">
            <CodeContract />
          </div>
        );
      case 'read':
        return (
          <div className="read_contract">
            <ReadContract />
          </div>
        );
      case 'write':
        return (
          <div className="write_contract">
            <WriteContract />
          </div>
        );
      case 'verify':
        return (
          <div className="verify_contract">
            <VerifyContract />
          </div>
        );
      default:
        return (
          <div className="code_contract">
            <CodeContract />
          </div>
        );
    }
  }

  return (
    <div className="contract-body">
      {filtered !== 'verify' && <ContractHeader />}
      <div className="contract-body-content">{getTab()}</div>
    </div>
  );
};

export default ContractDetails;