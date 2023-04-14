import React from 'react';
import { useState, useEffect } from 'react';
import {DatePicker, Space} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'

const { RangePicker } = DatePicker;

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

const DateRangerPicker = (props: any) => {
    const [dates, setDates] = useState<RangeValue>(null);
    const [dateMin, setDateMin] = useState<Dayjs>(dayjs('2015-01-01', "YYYY-MM-DD"));
    const [dateMax, setDateMax] = useState<Dayjs>(dayjs('2015-12-31', "YYYY-MM-DD"));
    const [halfRangeDate, setHalfRangeDate] = useState<Dayjs>(dayjs());
    const [defaultRange, setDefaultRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();

    useEffect(() => {
        setDefaultRange([dayjs('2015-1-1', "YYYY-MM-DD"), dayjs('2015-12-31', "YYYY-MM-DD")]);
    }, []);

    const disabledDate = (current: dayjs.Dayjs) => {
        return current.isBefore(dateMin) || current.isAfter(dateMax);
    }

    // const onOpenChange = (open: boolean) => {
    // if (open) {
    //     setDates([null, null]);
    // } else {
    //     setDates(null);
    // }
    // };

    return ( 
        <div>
        <style>
        {`
          .ant-picker-cell-disabled {
            background-color: lightgray;
          }
        `}
      </style>
        <RangePicker
            //defaultValue={defaultRange}
            defaultPickerValue={[dayjs('2015'), dayjs('2015')]}
            //value={dates || value}
            disabledDate={disabledDate}
            onChange={(val) => {props.setDateRangeInput(val)}}
            //onOpenChange={onOpenChange}
            />
    </div>
    );
}
 
export default DateRangerPicker;