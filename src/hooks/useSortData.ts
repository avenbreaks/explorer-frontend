import {TParams} from '../types';
import {AccountsData} from 'pages/Addresses/addresses.interface';
import React, {useCallback, useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import removeArrayDuplicates, {log} from 'utils/helpers';

const useSortData = (
  getData: any,
  address?: string | null,
  firstSortTerm: string = '',
) => {
  const {address: adr, type = ''}: TParams = useParams();
  const {pathname} = useLocation();

  const [renderData, setRenderData] = React.useState<AccountsData>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sortTerm, setSortTerm] = React.useState<string>(firstSortTerm);
  const {ref, inView} = useInView();
  const navigate = useNavigate();
  let interval: any;

  const infiniteLoad = async () => {
    if (inView === false && renderData?.data?.length !== undefined) return
    setLoading(true);
    const next: string = renderData?.pagination?.next;
    if (next) {
      getData(sortTerm === 'contracts' ? 'address' : sortTerm, next, address).then((res: AccountsData) => {
        if (res?.meta?.message?.includes('No results')) {
          setLoading(false);
          setRenderData(null);
          return;
        }
        setRenderData((prev: AccountsData) => {
          setLoading(false);
          return {
            ...prev,
            data: removeArrayDuplicates([...prev.data, ...res?.data]).filter((d: any) => d.isContract),
            pagination: res.pagination,
          };
        });
      });
    } else {
      getData(sortTerm === 'contracts' ? 'address' : sortTerm, null, address).then((res: AccountsData) => {
        if (res?.meta?.message?.includes('No results')) {
          setLoading(false);
          setRenderData(null);
          return;
        }
        setRenderData(res);
        setLoading(false);
      });
    }
  }
  useEffect(() => {
    if (sortTerm === 'contracts') {
      interval = setInterval(() => {
        infiniteLoad();
      }, 1000);
    } else {
      return;
    }
    return () => clearInterval(interval);

  }, [sortTerm, renderData, inView]);

  const firstRender = () => {
    if (sortTerm === 'contracts') return
    setLoading(true);

    getData(sortTerm === 'contracts' ? 'address' : sortTerm, null, address).then((res: AccountsData) => {
      if (res?.meta?.message?.includes('No results')) {
        setLoading(false);
        setRenderData(null);
        return;
      }
      setRenderData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (
      type?.length &&
      !(
        type === 'block_rewards' ||
        type === 'transfers' ||
        type === 'sheltering'
      )
    ) {
      log('not found term "', type, '"');
      navigate(`/notfound`, {replace: true});
    }
    firstRender();
  }, [pathname]);

  const updateData = useCallback(() => {
    if (sortTerm === 'contracts') return

    if (sortTerm) {
      setLoading(true);
      getData(sortTerm === 'contracts' ? 'address' : sortTerm, null, address).then((res: AccountsData) => {
        if (res?.meta?.message?.includes('No results')) {
          setLoading(false);
          setRenderData(null);
          return;
        }
        setRenderData(res);
        setLoading(false);
      });
    }
  }, [sortTerm, pathname]);

  useEffect(updateData, [sortTerm]);

  const concatData = useCallback(() => {
    if (sortTerm === 'contracts') return

    if (inView) {
      setLoading(true);
      const next: string = renderData?.pagination?.next;
      if (next) {
        getData(sortTerm === 'contracts' ? '' : sortTerm, next, address).then((res: AccountsData) => {
          if (res?.meta?.message?.includes('No results')) {
            setLoading(false);
            setRenderData(null);
            return;
          }
          setRenderData((prev: AccountsData) => {
            setLoading(false);
            return {
              ...prev,
              data: removeArrayDuplicates([...prev.data, ...res?.data]),
              pagination: res.pagination,
            };
          });
        });
      }
    }
  }, [inView]);

  useEffect(concatData, [inView]);

  return {ref, sortTerm, setSortTerm, renderData, loading};
};

export default useSortData;
