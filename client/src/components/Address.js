import React, { useState, useEffect } from "react";
import LocationSelect from "./LocationSelect";

const Address = () => {
  const [location, setLocation] = useState({
    province: "",
    district: "",
    ward: "",
    provinceName: "",
    districtName: "",
    wardName: ""
  });
  const [streetNumber, setStreetNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  // Hàm callback để nhận dữ liệu từ LocationSelect
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Mỗi khi location hoặc streetNumber thay đổi => cập nhật fullAddress
  useEffect(() => {
    const parts = [];

    // Thêm số nhà, tên đường nếu có
    if (streetNumber?.trim()) {
      parts.push(streetNumber.trim());
    }

    // Thêm tên tỉnh/thành, quận/huyện, phường/xã (đã chuyển sang dạng name)
    if (location.provinceName?.trim()) {
      parts.push(location.provinceName.trim());
    }
    if (location.districtName?.trim()) {
      parts.push(location.districtName.trim());
    }
    if (location.wardName?.trim()) {
      parts.push(location.wardName.trim());
    }

    // Kết hợp các phần thông tin thành địa chỉ đầy đủ
    setFullAddress(parts.join(', ') || 'Vui lòng chọn địa chỉ');
  }, [streetNumber, location]);

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <LocationSelect onLocationChange={handleLocationChange} />
        <div className="flex flex-col gap-2">
          <label htmlFor="street-number" className="font-medium text-sm">Số nhà, tên đường:</label>
          <input
            type="text"
            id="street-number"
            className="border border-gray-200 rounded-md p-2 w-full outline-none focus:border-blue-500"
            placeholder="Nhập số nhà, tên đường..."
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="full-address" className="font-medium text-sm">Địa chỉ đầy đủ:</label>
          <input
            type="text"
            id="full-address"
            readOnly
            className="border border-gray-200 rounded-md p-2 w-full outline-none bg-gray-50"
            value={fullAddress}
            placeholder="Vui lòng chọn địa chỉ"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
