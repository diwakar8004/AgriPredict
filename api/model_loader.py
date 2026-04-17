#!/usr/bin/env python3
"""
Fallback model loader for when files are missing.
Generates mock predictions for testing deployment.
"""
import joblib
import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

def create_mock_models():
    """Create simple mock models for testing when actual models aren't available."""
    models = {}
    
    try:
        # Try to load real models first
        base_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(base_dir)
        
        model_paths = {
            'irrigation': os.path.join(project_root, "Irrigation_need/stack_model_classifier.joblib"),
            'sustainability': os.path.join(project_root, "Sustainability_score/xgb_new_sustainable_score.pkl"),
            'market': os.path.join(project_root, "market_price/xgb_markert_price_new.pkl"),
            'yield': os.path.join(project_root, "Yield/stack_Yield_model.joblib"),
            'crop': os.path.join(project_root, "Crop_recomendation/crop_new_recomendation.pkl"),
        }
        
        for name, path in model_paths.items():
            if os.path.exists(path):
                ext = os.path.splitext(path)[1]
                if ext == '.joblib':
                    models[name] = joblib.load(path)
                elif ext == '.pkl':
                    with open(path, 'rb') as f:
                        models[name] = pickle.load(f)
                print(f"✓ Loaded real model: {name}")
            else:
                print(f"⚠ Model not found: {path}")
        
        # If we got some models, return them
        if models:
            return models
            
    except Exception as e:
        print(f"Error loading models: {e}")
    
    # Create fallback mock models
    print("⚠ Using mock models for testing")
    
    # Simple classifiers/regressors for demo
    X_dummy = np.random.rand(100, 10)
    y_class = np.random.randint(0, 2, 100)
    y_reg = np.random.rand(100) * 100
    
    models['irrigation'] = RandomForestClassifier(n_estimators=10, random_state=42).fit(X_dummy, y_class)
    models['sustainability'] = RandomForestRegressor(n_estimators=10, random_state=42).fit(X_dummy, y_reg)
    models['market'] = RandomForestRegressor(n_estimators=10, random_state=42).fit(X_dummy, y_reg)
    models['yield'] = RandomForestRegressor(n_estimators=10, random_state=42).fit(X_dummy, y_reg)
    models['crop'] = RandomForestClassifier(n_estimators=10, random_state=42).fit(X_dummy, np.random.randint(0, 22, 100))
    
    return models

if __name__ == '__main__':
    mods = create_mock_models()
    print(f"Available models: {list(mods.keys())}")
