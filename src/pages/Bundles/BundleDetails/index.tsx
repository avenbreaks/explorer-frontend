import BundleDetailsBlocks from './components/BundleDetailsBlocks';
import BundleDetailsMainTabs from './components/BundlesDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import { getBundleData } from 'services/bundle.service';

const BundleDetails = () => {
  return (
    <Content>
      <Content.Header>
        <BundleDetailsMain />
        <NodeHeader getNodeData={getBundleData}>
          {({ node }: any) => <BundleDetailsMainTabs data={node} />}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <BundleDetailsBlocks />
      </Content.Body>
    </Content>
  );
};

export default BundleDetails;
