import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateSelector() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div>
      <DatePicker
        wrapperClassName="customDatePicker"
        showTimeSelect
        minTime={new Date(0, 0, 0, 0, 0)}
        maxTime={new Date(0, 0, 0, 23, 59)}
        selected={date}
        onChange={(date: Date) => setDate(date)}
        dateFormat="d-M-yyyy h:mmaa"
      />
    </div>
  );
}
