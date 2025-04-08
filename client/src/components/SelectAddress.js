import React, { memo } from "react";

const SelectAddress = ({ label }) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <label className="font-medium" htmlFor="select-address">
        {label}
      </label>
      <select id="select-address" className="outline-none border border-gray-300 p-2 w-full rounded-md">
        <option value="" className="font-semibold ">
          {`--Chọn ${label}--`}
        </option>
      </select>
    </div>
  );
};

export default memo(SelectAddress);
