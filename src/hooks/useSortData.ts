import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import removeArrayDuplicates from 'utils/helpers';
import _ from 'lodash';

const useSortData = (getData: any) => {
  const [renderData, setRenderData] = React.useState<AccountsData>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const { ref, inView } = useInView();

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setRenderData(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getData(sortTerm, next).then((res: AccountsData) => {
      setRenderData(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next: string = renderData?.pagination.next;
      if (next) {
        setLoading(true);
        getData(sortTerm, next).then((res: AccountsData) => {
          setRenderData((prev: AccountsData) => {
            setLoading(false);
            return {
              ...prev,
              data: removeArrayDuplicates(_.uniq(_.concat(prev.data, res?.data))),
              pagination: res.pagination,
            };
          });
        });
      }
    }
  }, [inView]);

  return { ref, sortTerm, setSortTerm, renderData, loading };
};

export default useSortData;
