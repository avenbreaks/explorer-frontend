import Chart from '../Chart';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { numWithCommas } from 'utils/helpers';

const MainInfoApollo = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  return (
    <div className="main_info_apollo">
      <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
      <div className="main_info_apollo_table">
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">TOTAL NODES</span>
          <span className="main_info_apollo_cell_secondary">
            {appData?.netInfo?.apollos?.total || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">Online</span>
          <span
            className="main_info_apollo_cell_secondary"
            style={{
              color: '#1acd8c',
            }}
          >
            {appData?.netInfo?.apollos?.online || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">offline</span>
          <span className="main_info_apollo_cell_secondary">
            {appData?.netInfo?.apollos?.offline || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">CONNECTING</span>
          <span className="main_info_apollo_cell_secondary">
            {appData?.netInfo?.apollos?.connecting || 0}
          </span>
        </div>
        <div className="main_info_apollo_cell">
          <span className="main_info_apollo_cell_primary">
            Avg block / prop. time
          </span>
          <span className="main_info_apollo_cell_secondary">{appData?.netInfo?.avgBlockTime ?? 0} sec</span>
        </div>
        {/*<div className="main_info_apollo_cell" style={{ padding: 5 }}>*/}
        {/*  <Chart chartData={chartData} />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default MainInfoApollo;
