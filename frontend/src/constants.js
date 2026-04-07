export const MODELS = {
  irrigation: {
    id: 'irrigation',
    name: 'Irrigation Need',
    description: 'Optimize water usage based on soil and weather metrics',
    icon: 'Droplets',
    features: [
      { name: 'Soil_Type', label: 'Soil Type', type: 'select', options: ['Sandy', 'Loamy', 'Clay', 'Silt'] },
      { name: 'Soil_pH', label: 'Soil pH', type: 'number', min: 0, max: 14, default: 7 },
      { name: 'Soil_Moisture', label: 'Soil Moisture (%)', type: 'number', min: 0, max: 100, default: 20 },
      { name: 'Organic_Carbon', label: 'Organic Carbon (%)', type: 'number', min: 0, max: 10, default: 1 },
      { name: 'Electrical_Conductivity', label: 'Elec. Conductivity (S/m)', type: 'number', min: 0, max: 5, default: 0.5 },
      { name: 'Temperature_C', label: 'Temperature (°C)', type: 'number', min: -10, max: 50, default: 25 },
      { name: 'Humidity', label: 'Humidity (%)', type: 'number', min: 0, max: 100, default: 50 },
      { name: 'Rainfall_mm', label: 'Rainfall (mm)', type: 'number', min: 0, max: 500, default: 50 },
      { name: 'Sunlight_Hours', label: 'Sunlight Hours', type: 'number', min: 0, max: 24, default: 10 },
      { name: 'Wind_Speed_kmh', label: 'Wind Speed (km/h)', type: 'number', min: 0, max: 100, default: 15 },
      { name: 'Crop_Type', label: 'Crop Type', type: 'select', options: ['Wheat', 'Rice', 'Corn', 'Soybean'] },
      { name: 'Crop_Growth_Stage', label: 'Growth Stage', type: 'select', options: ['Sowing', 'Vegetative', 'Flowering', 'Maturity'] },
      { name: 'Season', label: 'Season', type: 'select', options: ['Kharif', 'Rabi', 'Zaid'] },
      { name: 'Irrigation_Type', label: 'Irrigation Type', type: 'select', options: ['Drip', 'Sprinkler', 'Furrow', 'Manual'] },
      { name: 'Water_Source', label: 'Water Source', type: 'select', options: ['Well', 'Canal', 'Rain', 'River'] },
      { name: 'Field_Area_hectare', label: 'Field Area (ha)', type: 'number', min: 0.1, max: 1000, default: 5 },
      { name: 'Previous_Irrigation_mm', label: 'Prev. Irrigation (mm)', type: 'number', min: 0, max: 100, default: 10 },
      { name: 'Region', label: 'Region', type: 'select', options: ['North', 'South', 'East', 'West', 'Central'] },
      { name: 'Mulching_Used_Yes', label: 'Mulching Used', type: 'boolean', default: false }
    ]
  },
  sustainability: {
    id: 'sustainability',
    name: 'Sustainability Score',
    description: 'Calculate ecological health and sustainability',
    icon: 'Leaf',
    features: [
      { name: 'Soil_pH', label: 'Soil pH', type: 'number', min: 0, max: 14, default: 6.8 },
      { name: 'Soil_Moisture', label: 'Soil Moisture (%)', type: 'number', min: 0, max: 100, default: 35 },
      { name: 'Temperature_C', label: 'Temperature (°C)', type: 'number', min: -10, max: 50, default: 22 },
      { name: 'Rainfall_mm', label: 'Rainfall (mm)', type: 'number', min: 0, max: 500, default: 80 },
      { name: 'Fertilizer_Usage_kg', label: 'Fertilizer Usage (kg)', type: 'number', min: 0, max: 5000, default: 200 },
      { name: 'Pesticide_Usage_kg', label: 'Pesticide Usage (kg)', type: 'number', min: 0, max: 1000, default: 50 },
      { name: 'Crop_Yield_ton', label: 'Crop Yield (ton)', type: 'number', min: 0, max: 500, default: 15 },
      { name: 'Crop_Type_Corn', label: 'Crop: Corn', type: 'boolean', default: true },
      { name: 'Crop_Type_Rice', label: 'Crop: Rice', type: 'boolean', default: false },
      { name: 'Crop_Type_Soybean', label: 'Crop: Soybean', type: 'boolean', default: false },
      { name: 'Crop_Type_Wheat', label: 'Crop: Wheat', type: 'boolean', default: false }
    ]
  },
  market: {
    id: 'market',
    name: 'Market Price',
    description: 'Predict crop values based on economic indicators',
    icon: 'BarChart2',
    features: [
      { name: 'Demand_Index', label: 'Demand Index', type: 'number', min: 0, max: 100, default: 75 },
      { name: 'Supply_Index', label: 'Supply Index', type: 'number', min: 0, max: 100, default: 60 },
      { name: 'Competitor_Price_per_ton', label: 'Comp. Price', type: 'number', default: 2450 },
      { name: 'Economic_Indicator', label: 'Economic Ind.', type: 'number', min: 0, max: 100, default: 85 },
      { name: 'Weather_Impact_Score', label: 'Weather Impact', type: 'number', min: 0, max: 10, default: 3 },
      { name: 'Consumer_Trend_Index', label: 'Consumer T.', type: 'number', min: 0, max: 100, default: 65 },
      { name: 'Product_Corn', label: 'Product: Corn', type: 'boolean', default: true },
      { name: 'Product_Rice', label: 'Product: Rice', type: 'boolean', default: false },
      { name: 'Product_Soybean', label: 'Product: Soybean', type: 'boolean', default: false },
      { name: 'Product_Wheat', label: 'Product: Wheat', type: 'boolean', default: false },
      { name: 'Seasonal_Factor_High', label: 'Season: High', type: 'boolean', default: false },
      { name: 'Seasonal_Factor_Low', label: 'Season: Low', type: 'boolean', default: false },
      { name: 'Seasonal_Factor_Medium', label: 'Season: Medium', type: 'boolean', default: true }
    ]
  },
  yield: {
    id: 'yield',
    name: 'Field Yield',
    description: 'Forecast agricultural production per hectare',
    icon: 'Sprout',
    features: [
      { name: 'farm_size_ha', label: 'Farm Size (ha)', type: 'number', min: 0.1, max: 500, default: 10 },
      { name: 'soil_quality_index', label: 'Soil Qual. Ind.', type: 'number', min: 0, max: 100, default: 75 },
      { name: 'rainfall_mm_annual', label: 'Annual Rainfall', type: 'number', min: 0, max: 5000, default: 1200 },
      { name: 'household_size', label: 'Household Size', type: 'number', min: 1, max: 20, default: 4 },
      { name: 'market_distance_km', label: 'Market Dist. (km)', type: 'number', min: 0.1, max: 200, default: 15 },
      { name: 'livestock_tlu', label: 'Livestock (TLU)', type: 'number', min: 0, max: 100, default: 5 },
      { name: 'fertilizer_use_kg_ha', label: 'Fert. Use (kg/ha)', type: 'number', min: 0, max: 1000, default: 150 },
      { name: 'rainfall_mm_season', label: 'Seasonal Rainfall', type: 'number', min: 0, max: 2000, default: 400 },
      { name: 'agro_ecological_zone_arid', label: 'Arid Zone', type: 'boolean', default: false },
      { name: 'agro_ecological_zone_highland', label: 'Highland Zone', type: 'boolean', default: false },
      { name: 'agro_ecological_zone_humid', label: 'Humid Zone', type: 'boolean', default: false },
      { name: 'agro_ecological_zone_semi_arid', label: 'Semi-Arid Zone', type: 'boolean', default: true },
      { name: 'agro_ecological_zone_sub_humid', label: 'Sub-Humid Zone', type: 'boolean', default: false },
      { name: 'region_type_peri_urban', label: 'Peri-Urban', type: 'boolean', default: false },
      { name: 'region_type_rural_accessible', label: 'Rural Accessible', type: 'boolean', default: true },
      { name: 'region_type_rural_remote', label: 'Rural Remote', type: 'boolean', default: false },
      { name: 'region_type_urban', label: 'Urban', type: 'boolean', default: false },
      { name: 'extension_access_no', label: 'Extension Access: No', type: 'boolean', default: false },
      { name: 'extension_access_yes', label: 'Extension Access: Yes', type: 'boolean', default: true }
    ]
  },
  crop: {
    id: 'crop',
    name: 'Crop Recommendation',
    description: 'Find the best crop to grow base on soil nutrients and climate',
    icon: 'Sprout',
    features: [
      { name: 'Nitrogen', label: 'Nitrogen (N)', type: 'number', min: 0, max: 200, default: 90 },
      { name: 'Phosphorus', label: 'Phosphorus (P)', type: 'number', min: 0, max: 200, default: 42 },
      { name: 'Potassium', label: 'Potassium (K)', type: 'number', min: 0, max: 200, default: 43 },
      { name: 'Temperature', label: 'Temperature (°C)', type: 'number', min: 0, max: 50, default: 20 },
      { name: 'Humidity', label: 'Humidity (%)', type: 'number', min: 0, max: 100, default: 82 },
      { name: 'pH_Value', label: 'Soil pH', type: 'number', min: 0, max: 14, default: 6.5 },
      { name: 'Rainfall', label: 'Rainfall (mm)', type: 'number', min: 0, max: 1000, default: 202 }
    ]
  }
};
