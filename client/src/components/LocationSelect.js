import React, { useState, useEffect } from 'react';
import { getProvinces, getDistricts, getWards } from '../services/locationService';

const LocationSelect = ({ onLocationChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Lưu lại lựa chọn hiện tại
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // Quản lý trạng thái loading cho từng cấp
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false
  });

  // Lấy danh sách tỉnh/thành khi component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(prev => ({ ...prev, provinces: true }));
        const data = await getProvinces(); // Ví dụ: trả về [{ name, code, ... }, ...]
        setProvinces(data);
      } catch (error) {
        console.error('Error loading provinces:', error);
      } finally {
        setLoading(prev => ({ ...prev, provinces: false }));
      }
    };

    fetchProvinces();
  }, []);

  // Lấy danh sách quận/huyện mỗi khi selectedProvince thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          setLoading(prev => ({ ...prev, districts: true }));
          const data = await getDistricts(selectedProvince);
          setDistricts(data);
          // Reset lại quận/huyện và phường/xã khi đổi tỉnh
          setSelectedDistrict('');
          setSelectedWard('');
          setWards([]);
        } catch (error) {
          console.error('Error loading districts:', error);
        } finally {
          setLoading(prev => ({ ...prev, districts: false }));
        }
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  // Lấy danh sách phường/xã mỗi khi selectedDistrict thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          setLoading(prev => ({ ...prev, wards: true }));
          const data = await getWards(selectedDistrict);
          setWards(data);
          // Reset lại phường/xã khi đổi quận/huyện
          setSelectedWard('');
        } catch (error) {
          console.error('Error loading wards:', error);
        } finally {
          setLoading(prev => ({ ...prev, wards: false }));
        }
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  // Xử lý khi chọn Tỉnh/Thành
  const handleProvinceChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const provinceValue = selectedOption.value; // Thường là mã code (VD: 20)
    const provinceName = selectedOption.text;   // Thường là "Tỉnh Lạng Sơn"
    setSelectedProvince(provinceValue);

    // Gửi dữ liệu lên cha nếu có onLocationChange
    if (onLocationChange) {
      onLocationChange({
        province: provinceValue,
        district: '',
        ward: '',
        // Ở đây gán trực tiếp name; 
        // nếu bạn muốn cắt bớt chữ "Tỉnh " thì có thể sửa provinceName.replace("Tỉnh ","") ...
        provinceName,
        districtName: '',
        wardName: ''
      });
    }
  };

  // Xử lý khi chọn Quận/Huyện
  const handleDistrictChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const districtValue = selectedOption.value;
    const districtName = selectedOption.text;
    setSelectedDistrict(districtValue);

    // Lấy lại tên tỉnh đang chọn
    const currentProvince = provinces.find(p => p.code == selectedProvince);

    if (onLocationChange) {
      onLocationChange({
        province: selectedProvince,
        district: districtValue,
        ward: '',
        provinceName: currentProvince?.name || '',
        districtName,
        wardName: ''
      });
    }
  };

  // Xử lý khi chọn Phường/Xã
  const handleWardChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const wardValue = selectedOption.value;
    const wardName = selectedOption.text;
    setSelectedWard(wardValue);

    // Lấy lại tên tỉnh và quận/huyện đang chọn
    const currentProvince = provinces.find(p => p.code == selectedProvince);
    const currentDistrict = districts.find(d => d.code == selectedDistrict);

    if (onLocationChange) {
      onLocationChange({
        province: selectedProvince,
        district: selectedDistrict,
        ward: wardValue,
        provinceName: currentProvince?.name || '',
        districtName: currentDistrict?.name || '',
        wardName
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Chọn tỉnh/thành */}
      <div>
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
          Tỉnh/Thành phố
        </label>
        <div className="relative">
          <select
            id="province"
            value={selectedProvince}
            onChange={handleProvinceChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            disabled={loading.provinces}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
          {loading.provinces && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
            </div>
          )}
        </div>
      </div>

      {/* Chọn quận/huyện */}
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
          Quận/Huyện
        </label>
        <div className="relative">
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            disabled={!selectedProvince || loading.districts}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          {loading.districts && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
            </div>
          )}
        </div>
      </div>

      {/* Chọn phường/xã */}
      <div>
        <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
          Phường/Xã
        </label>
        <div className="relative">
          <select
            id="ward"
            value={selectedWard}
            onChange={handleWardChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            disabled={!selectedDistrict || loading.wards}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>
          {loading.wards && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
