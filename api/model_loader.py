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
import warnings
warnings.filterwarnings('ignore')

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
                try:
                    ext = os.path.splitext(path)[1]
                    if ext == '.joblib':
                        models[name] = joblib.load(path)
                    elif ext == '.pkl':
                        with open(path, 'rb') as f:
                            models[name] = pickle.load(f)
                    print(f"✓ Loaded real model: {name}")
                except Exception as e:
                    print(f"⚠ Failed to load {name}: {e}")
        
        # If we got all models, return them
        if len(models) == 5:
            return models
        else:
            print(f"⚠ Only {len(models)}/5 models loaded, using fallback")
            
    except Exception as e:
        print(f"Error loading models: {e}")
    
    # Create fallback mock models for any missing ones
    print("Creating mock models for deployment testing...")
    
    # Simple classifiers/regressors for demo
    np.random.seed(42)
    X_dummy = np.random.rand(100, 19)  # Generic features
    y_class = np.random.randint(0, 2, 100)
    y_crop = np.random.randint(0, 22, 100)
    y_reg = np.random.rand(100) * 100
    
    if 'irrigation' not in models:
        models['irrigation'] = RandomForestClassifier(n_estimators=5, random_state=42).fit(X_dummy, y_class)
    if 'sustainability' not in models:
        models['sustainability'] = RandomForestRegressor(n_estimators=5, random_state=42).fit(X_dummy, y_reg)
    if 'market' not in models:
        models['market'] = RandomForestRegressor(n_estimators=5, random_state=42).fit(X_dummy, y_reg)
    if 'yield' not in models:
        models['yield'] = RandomForestRegressor(n_estimators=5, random_state=42).fit(X_dummy, y_reg)
    if 'crop' not in models:
        models['crop'] = RandomForestClassifier(n_estimators=5, random_state=42).fit(X_dummy, y_crop)
    
    print(f"✓ Available models: {list(models.keys())}")
    return models

if __name__ == '__main__':
    mods = create_mock_models()
    print(f"Models loaded: {list(mods.keys())}")

