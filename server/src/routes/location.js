import express from 'express';
import { getProvinces, getDistricts, getWards, searchProvinces, searchDistricts, searchWards } from '../services/locationService';
import cors from 'cors';

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.get('/provinces', async (req, res) => {
  try {
    const provinces = await getProvinces();
    res.json(provinces);
  } catch (error) {
    console.error('Error fetching provinces:', error);
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
});

router.get('/districts/:  provinceCode', async (req, res) => {
  try {
    const districts = await getDistricts(req.params.provinceCode);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

router.get('/wards/:districtCode', async (req, res) => {
  try {
    const wards = await getWards(req.params.districtCode);
    res.json(wards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wards' });
  }
});

router.get('/search/provinces', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }
    const results = await searchProvinces(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search provinces' });
  }
});

router.get('/search/districts', async (req, res) => {
  try {
    const { q, p } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }
    const results = await searchDistricts(q, p);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search districts' });
  }
});

router.get('/search/wards', async (req, res) => {
  try {
    const { q, d } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }
    const results = await searchWards(q, d);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search wards' });
  }
});

export default router; 