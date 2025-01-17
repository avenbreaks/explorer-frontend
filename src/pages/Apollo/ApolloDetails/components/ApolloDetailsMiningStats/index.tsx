import API from 'API/api';
import ExportCsv from 'components/ExportCsv';
import HeadInfo from 'components/HeadInfo';
import { Number } from 'components/Number';
import { Currency } from 'components/UI/Currency';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { ambToUSD, formatDate } from 'utils/helpers';

const ApolloDetailsMiningStats = ({ apollo }: any) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const [rewards, setRewards] = useState<any>({
    blocksRewards: 0,
    transactionsRewards: 0,
    totalBlocks: 0,
  });
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [filterDate, setFilterDate] = useState<any>(() => {
    return formatDate(
      apollo?.lastBlock?.timestamp
        ? (new Date(apollo.lastBlock.timestamp * 1000) as any) / 1000
        : (new Date() as any) / 1000,
      true,
      false,
    );
  });

  const { price_usd } = appData?.tokenInfo || 0;

  useEffect(() => {
    if (apollo?.lastBlock) {
      setFilterDate(() => {
        return formatDate(
          apollo?.lastBlock?.timestamp
            ? (new Date(apollo.lastBlock.timestamp * 1000) as any) / 1000
            : (new Date() as any) / 1000,
          true,
          false,
        );
      });
    }
  }, [apollo]);

  const onSelect = (value: any) => {
    setFilterDate(value);
  };

  const fetchRewards = async () => {
    const date = filterDate.split('-');
    const fromDate = date[0];
    const toDate = date[1];
    const { data } = await API.getApolloRewards(apollo?.address, {
      from: fromDate,
      to: toDate !== undefined ? toDate : null,
    });
    setRewards(data);
  };

  useEffect(() => {
    // need rewrite to useQuery
    if (filterDate) {
      fetchRewards();
      const timer = setTimeout(() => {
        setIsLoad(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [filterDate, isLoad]);

  const sameDates =
    filterDate.split('-')?.[0] === filterDate.split('-')?.[1]
      ? filterDate.split('-')?.[0]
      : null;

  const itemSecond: any = [
    {
      name: 'MINING STATS',
      value: (
        <>
          {sameDates ? sameDates : filterDate}
          <div
            style={{
              alignItems: 'center',
              position: 'absolute',
              marginLeft: '100px',
              marginTop: '-36px',
            }}
          >
            <ExportCsv miningStats={onSelect} showText={false} />
          </div>
        </>
      ),
    },

    {
      name: 'BLOCK REWARDS',
      value: `${(rewards?.blocksRewards || 0).toFixed(2)} AMB / $ ${ambToUSD(
        rewards?.blocksRewards,
        price_usd,
      )}`,
    },
    {
      name: 'TRANSACTIONS REWARDS',
      value: `${(rewards.transactionsRewards || 0).toFixed(
        2,
      )} AMB / $ ${ambToUSD(rewards.transactionsRewards, price_usd)}`,
    },
    {
      name: 'TOTAL BLOCKS MINED',
      value: rewards.totalBlocks,
    },
  ];

  return (
    // <>
    //   <HeadInfo data={itemSecond} className="head_info" />;
    // </>
    <div className="apollo_details_mining_stats">
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_cell">
          <span className="" style={{ fontWeight: 600, fontSize: 14 }}>
            MINING STATS
          </span>
          <span className="universall_light1" style={{ fontSize: 14 }}>
            {sameDates ? sameDates : filterDate}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <ExportCsv miningStats={onSelect} showText={false} />
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          BLOCK REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
            <Currency
              value={rewards.blocksRewards || 0}
              fixed={3}
              symbol="AMB"
            />
          </span>
          <span className="">
            {' '}
            /{' '}
            <Currency
              value={ambToUSD(rewards?.blocksRewards || 0, price_usd)}
              fixed={2}
              side="left"
            />
          </span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TRANSACTIONS REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
            <Currency
              value={rewards.transactionsRewards || 0}
              fixed={3}
              symbol="AMB"
            />
          </span>
          <span className="">
            {' '}
            /{' '}
            <Currency
              value={ambToUSD(rewards.transactionsRewards || 0, price_usd)}
              fixed={2}
              side="left"
            />
          </span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TOTAL BLOCKS MINED
        </div>
        <div className="apollo_details_mining_stats_fonts_bold">
          <Number value={rewards.totalBlocks || 0} />
        </div>
      </div>
    </div>
  );
};

export default ApolloDetailsMiningStats;
