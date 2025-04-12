import axios from 'axios';

const API_URL = 'https://provinces.open-api.vn/api';

// Create axios instance with default config
const api = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const getProvinces = async () => {
  try {
    const response = await api.get(`${API_URL}/p/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const getDistricts = async (provinceCode) => {
  try {
    const response = await api.get(`${API_URL}/p/${provinceCode}?depth=2`);
    return response.data.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getWards = async (districtCode) => {
  try {
    const response = await api.get(`${API_URL}/d/${districtCode}?depth=2`);
    return response.data.wards || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};

export const searchProvinces = async (query) => {
  try {
    const response = await api.get(`${API_URL}/p/search/?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching provinces:', error);
    throw error;
  }
};

export const searchDistricts = async (query, provinceCode) => {
  try {
    const response = await api.get(`${API_URL}/d/search/?q=${query}&p=${provinceCode}`);
    return response.data;
  } catch (error) {
    console.error('Error searching districts:', error);
    throw error;
  }
};

export const searchWards = async (query, districtCode) => {
  try {
    const response = await api.get(`${API_URL}/w/search/?q=${query}&d=${districtCode}`);
    return response.data;
  } catch (error) {
    console.error('Error searching wards:', error);
    throw error;
  }
}; 