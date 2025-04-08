import React from "react";
import { SelectAddress } from "../components";

const Address = () => {
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <SelectAddress label="Tỉnh/Thành Phố" />
          <SelectAddress label="Quận/Huyện" />
        </div>
        <input
          type="text"
          readOnly
          className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
        />
      </div>
    </div>
  );
};

export default Address;
