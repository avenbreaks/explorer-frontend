import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMain from 'pages/Bundles/components/BundleMain';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData, getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { ref, renderData, loading } = useSortData(getBundlesData, ' ');

  const { data: appData } = useTypedSelector((state: any) => state.app);

  return (
    <Content>
      <Content.Header>
        <h1 style={{ margin: '32px 0' }}>Bundles</h1>
        <BundleMainTabs data={appData?.netInfo} />
        {/* <BundleMain mainColumns="2fr 2fr 1.2fr" />
        <BundleMain mainColumns="2fr 1.8fr 1.5fr" /> */}
      </Content.Header>
      <Content.Body>
        <div className="bundles_blocks">
          <div className="bundles_blocks_heading">Recent Bundles</div>
          <div className="bundles_blocks_table">
            <BundleBlocksHeader />
            {renderData?.data?.length ? (
              renderData.data.map((item: any, index: number) => (
                <BundleBlocksBody
                  lastCardRef={renderData?.pagination?.hasNext ? ref : null}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {renderData?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
};
