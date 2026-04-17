import os
import joblib
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from model_loader import create_mock_models
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, 
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Accept", "Authorization"],
     expose_headers=["Content-Type"],
     supports_credentials=False)

APP_DIR = os.path.dirname(__file__)
PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
MODELS_BASE_DIR = PROJECT_ROOT

# Use a class to manage models to avoid global state issues
class ModelsContainer:
    def __init__(self):
        self.models = {}
    
    def load(self):
        """Load or create models."""
        if self.models:  # Already loaded
            return
        
        print("Loading models...")
        try:
            self.models['irrigation'] = joblib.load(os.path.join(MODELS_BASE_DIR, "Irrigation_need/stack_model_classifier.joblib"))
            self.models['sustainability'] = joblib.load(os.path.join(MODELS_BASE_DIR, "Sustainability_score/xgb_new_sustainable_score.pkl"))
            self.models['market'] = joblib.load(os.path.join(MODELS_BASE_DIR, "market_price/xgb_markert_price_new.pkl"))
            self.models['yield'] = joblib.load(os.path.join(MODELS_BASE_DIR, "Yield/stack_Yield_model.joblib"))
            self.models['crop'] = joblib.load(os.path.join(MODELS_BASE_DIR, "Crop_recomendation/crop_new_recomendation.pkl"))
            print(f"✓ Loaded real models: {list(self.models.keys())}")
        except Exception as e:
            print(f"⚠ Failed to load real models: {e}")
            print("Creating fallback models...")
            try:
                self.models.update(create_mock_models())
                print(f"✓ Loaded fallback models: {list(self.models.keys())}")
            except Exception as e2:
                print(f"⚠ Fallback failed: {e2}")
                self._create_minimal_models()
    
    def _create_minimal_models(self):
        """Absolute fallback: create minimal sklearn models."""
        print("Creating minimal sklearn models...")
        np.random.seed(42)
        X = np.random.rand(50, 19)
        models_dict = {
            'irrigation': RandomForestClassifier(n_estimators=2, random_state=42).fit(X, np.random.randint(0, 2, 50)),
            'sustainability': RandomForestRegressor(n_estimators=2, random_state=42).fit(X, np.random.rand(50) * 100),
            'market': RandomForestRegressor(n_estimators=2, random_state=42).fit(X, np.random.rand(50) * 100),
            'yield': RandomForestRegressor(n_estimators=2, random_state=42).fit(X, np.random.rand(50) * 100),
            'crop': RandomForestClassifier(n_estimators=2, random_state=42).fit(X, np.random.randint(0, 22, 50)),
        }
        self.models.update(models_dict)
        print(f"✓ Minimal models created: {list(self.models.keys())}")

# Global instance
models_container = ModelsContainer()

FEATURE_NAMES = {
    'irrigation': ['Soil_Type', 'Soil_pH', 'Soil_Moisture', 'Organic_Carbon', 'Electrical_Conductivity', 'Temperature_C', 'Humidity', 'Rainfall_mm', 'Sunlight_Hours', 'Wind_Speed_kmh', 'Crop_Type', 'Crop_Growth_Stage', 'Season', 'Irrigation_Type', 'Water_Source', 'Field_Area_hectare', 'Previous_Irrigation_mm', 'Region', 'Mulching_Used_Yes'],
    'sustainability': ['Soil_pH', 'Soil_Moisture', 'Temperature_C', 'Rainfall_mm', 'Fertilizer_Usage_kg', 'Pesticide_Usage_kg', 'Crop_Yield_ton', 'Crop_Type_Corn', 'Crop_Type_Rice', 'Crop_Type_Soybean', 'Crop_Type_Wheat'],
    'market': ['Demand_Index', 'Supply_Index', 'Competitor_Price_per_ton', 'Economic_Indicator', 'Weather_Impact_Score', 'Consumer_Trend_Index', 'Product_Corn', 'Product_Rice', 'Product_Soybean', 'Product_Wheat', 'Seasonal_Factor_High', 'Seasonal_Factor_Low', 'Seasonal_Factor_Medium'],
    'yield': ['farm_size_ha', 'soil_quality_index', 'rainfall_mm_annual', 'household_size', 'market_distance_km', 'livestock_tlu', 'fertilizer_use_kg_ha', 'rainfall_mm_season', 'agro_ecological_zone_arid', 'agro_ecological_zone_highland', 'agro_ecological_zone_humid', 'agro_ecological_zone_semi_arid', 'agro_ecological_zone_sub_humid', 'region_type_peri_urban', 'region_type_rural_accessible', 'region_type_rural_remote', 'region_type_urban', 'extension_access_no', 'extension_access_yes'],
    'crop': ['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'pH_Value', 'Rainfall']
}

CROP_MAPPING = {
    0: 'apple', 1: 'banana', 2: 'blackgram', 3: 'chickpea', 4: 'coconut', 
    5: 'coffee', 6: 'cotton', 7: 'grapes', 8: 'jute', 9: 'kidneybeans', 
    10: 'lentil', 11: 'maize', 12: 'mango', 13: 'mothbeans', 14: 'mungbean', 
    15: 'muskmelon', 16: 'orange', 17: 'papaya', 18: 'pigeonpeas', 
    19: 'pomegranate', 20: 'rice', 21: 'watermelon'
}

models = {}

def load_models():
    """Public API to load models."""
    models_container.load()





@app.before_request
def ensure_models_loaded():
    """Ensure models are loaded before any request."""
    if not models_container.models:
        print("⚠ Models not loaded, loading now...")
        models_container.load()

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    
    # Ensure models are loaded
    if not models_container.models:
        models_container.load()
    
    data = request.json
    model_name = data.get('model')
    inputs = data.get('inputs')

    if model_name not in models_container.models:
        return jsonify({"error": f"Model {model_name} not found"}), 404

    model = models_container.models[model_name]
    feature_list = FEATURE_NAMES[model_name]
    
    try:
        # Create a DataFrame to preserve feature names (crucial for XGBoost/Pipelines)
        # We need to ensure we have all features and they are in the correct order
        # Handle input features
        values = []
        for feat in feature_list:
            # If the feature itself is what we are predicting, we should probably not use 
            # its value from inputs if it's there (leakage during training).
            # But the model EXPECTS it. If we provide 0, it might bias the result.
            # For now, let's just use what's provided or 0.
            val = inputs.get(feat, 0)
            
            # Simple encoding for known categoricals
            if feat == 'Soil_Type':
                mapping = {'Sandy': 0, 'Loamy': 1, 'Clay': 2, 'Silt': 3}
                val = mapping.get(val, 0)
            elif feat == 'Crop_Type':
                mapping = {'Wheat': 0, 'Rice': 1, 'Corn': 2, 'Soybean': 3}
                val = mapping.get(val, 0)
            elif feat == 'Crop_Growth_Stage':
                mapping = {'Sowing': 0, 'Vegetative': 1, 'Flowering': 2, 'Maturity': 3}
                val = mapping.get(val, 0)
            elif feat == 'Season':
                mapping = {'Kharif': 0, 'Rabi': 1, 'Zaid': 2}
                val = mapping.get(val, 0)
            elif feat == 'Irrigation_Type':
                mapping = {'Drip': 0, 'Sprinkler': 1, 'Furrow': 2, 'Manual': 3}
                val = mapping.get(val, 0)
            elif feat == 'Water_Source':
                mapping = {'Well': 0, 'Canal': 1, 'Rain': 2, 'River': 3}
                val = mapping.get(val, 0)
            elif feat == 'Region':
                mapping = {'North': 0, 'South': 1, 'East': 2, 'West': 3, 'Central': 4}
                val = mapping.get(val, 0)
            
            # Convert boolean to 0/1
            if isinstance(val, bool):
                val = 1 if val else 0
            
            # Ensure it's a number for everything else
            try:
                if not isinstance(val, (int, float, np.integer, np.floating)):
                    val = float(val)
            except:
                pass
                
            values.append(val)
            
        input_df = pd.DataFrame([values], columns=feature_list)
        
        # Predict
        prediction = model.predict(input_df)
        pred_val = prediction[0]
        
        # Post-processing for regression models to ensure non-negative values
        if model_name in ['sustainability', 'market', 'yield']:
            if isinstance(pred_val, (int, float, np.integer, np.floating)):
                # Clip negative values
                pred_val = max(0, float(pred_val))
                
                # Further specific logic for sustainability score
                if model_name == 'sustainability':
                    pass
        
        # Post-processing for crop recommendation
        if model_name == 'crop':
            if isinstance(pred_val, (int, np.integer, float, np.floating)):
                pred_val = CROP_MAPPING.get(int(pred_val), f"Unknown ({pred_val})")
        
        # Prepare final prediction
        if hasattr(pred_val, 'item'):
            final_pred = pred_val.item()
        elif hasattr(pred_val, 'tolist'):
            final_pred = pred_val.tolist()
        else:
            final_pred = pred_val

        # If it's a string or bytes, handle it
        if isinstance(final_pred, bytes):
            final_pred = final_pred.decode('utf-8')
            
        return jsonify({
            "status": "success",
            "model": model_name,
            "prediction": final_pred
        })
    except Exception as e:
        print(f"Prediction Error for {model_name}: {e}")
        import traceback
        traceback_str = traceback.format_exc()
        print(traceback_str)
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET', 'OPTIONS'])
def health():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    if not models_container.models:
        models_container.load()
    return jsonify({
        "status": "ready", 
        "models": list(models_container.models.keys()),
        "model_count": len(models_container.models)
    })

@app.route('/debug/models', methods=['GET'])
def debug_models():
    """Debug endpoint to check model status"""
    if not models_container.models:
        models_container.load()
    return jsonify({
        "models_loaded": list(models_container.models.keys()),
        "count": len(models_container.models),
        "project_root": MODELS_BASE_DIR
    })


if __name__ == '__main__':
    print("=" * 60)
    print("AGRIPREDICT BACKEND INITIALIZING (v2)")
    print("=" * 60)
    load_models()
    print(f"✓ Server ready with models: {list(models_container.models.keys())}")
    print("=" * 60)
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5001)), debug=False)
