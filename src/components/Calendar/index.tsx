import API from 'API/api';
import { addDays } from 'date-fns';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const Calendar = ({miningStats}:any) => {
  const { address }: TParams = useParams();

  const [dataRange, setDataRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -4),
      color: '#05060F',
      key: 'selection',
    },
  ]);

  const changeData = (item: any) => {
    setDataRange([item.selection]);
  }
  function padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date:any) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const exportData = () => {
    if (miningStats !== undefined){
      const str = `${formatDate(dataRange[0].startDate)}-${formatDate(dataRange[0].endDate)}`

      miningStats(str)
    }else {
      if (dataRange) {
        API.followTheLinkRange(
          dataRange[0].startDate,
          dataRange[0].endDate,
          address,
        );
      } else {
        API.followTheLinkRange(0, 0, address);
      }
    }

  };

  return (
    <div className="calendar">
      <DateRange
        editableDateInputs={true}
        onChange={changeData}
        moveRangeOnFirstSelection={false}
        ranges={dataRange}
      />
      <button className="calendar_export_csv" onClick={exportData}>
        Export CSV
      </button>
    </div>
  );
};

export default Calendar;
