from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import logging
from PIL import Image
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
from dotenv import load_dotenv
from io import BytesIO

# === Load environment variables (optional) ===
load_dotenv()

app = Flask(__name__)
CORS(app)

# === Configuration ===
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# === Paths from environment or fallback ===
MODEL_PATH = os.getenv("MODEL_PATH", r"C:\DermAi\best_model_b4_final1.keras")
SCALER_PATH = os.getenv("SCALER_PATH", r"C:\DermAi\age_scaler.save")

# === Metadata Features ===
metadata_features = [
    'age_normalized', 'sex', 'binary_abdomen', 'binary_acral', 'binary_back',
    'binary_chest', 'binary_ear', 'binary_face', 'binary_foot', 'binary_genital',
    'binary_hand', 'binary_lower_extremity', 'binary_neck', 'binary_scalp',
    'binary_trunk', 'binary_unknown', 'binary_upper_extremity'
]

# === Logging Setup ===
logging.basicConfig(
    filename='diagnosis.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# === Load Model and Scaler ===
model = load_model(MODEL_PATH)
age_scaler = joblib.load(SCALER_PATH)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_file):
    """Accepts a file-like object or path"""
    with Image.open(image_file) as image:
        image = image.convert("RGB").resize((380, 380))
        img_array = np.array(image).astype(np.float32) / 255.0
        return tf.expand_dims(img_array, axis=0)

def preprocess_metadata(age, sex, location):
    try:
        age_normalized = age_scaler.transform(pd.DataFrame({'age': [age]}))[0][0]
    except Exception as e:
        raise ValueError(f"Age normalization failed: {e}")

    meta_array = np.zeros((1, len(metadata_features)), dtype=np.float32)
    meta_array[0, 0] = age_normalized
    meta_array[0, 1] = 1 if sex.lower() == 'male' else 0

    location_key = f'binary_{location.lower()}'
    if location_key not in metadata_features:
        raise ValueError(f"Invalid location: {location}. Must be one of {[f.replace('binary_', '') for f in metadata_features if f.startswith('binary_')]}")

    meta_array[0, metadata_features.index(location_key)] = 1
    return meta_array

@app.route('/api/diagnosis', methods=['POST'])
def diagnosis():
    try:
        name = request.form.get('name')
        age = request.form.get('age')
        sex = request.form.get('sex')
        location = request.form.get('location')
        image = request.files.get('image')

        if not all([name, age, sex, location, image]):
            return jsonify({'error': 'Missing required fields'}), 400

        if not allowed_file(image.filename):
            return jsonify({'error': 'Unsupported file type'}), 400

        try:
            age = float(age)
        except ValueError:
            return jsonify({'error': 'Invalid age value'}), 400

        logging.info(f"Processing: name={name}, age={age}, sex={sex}, location={location}, file={image.filename}")

        # Process image in memory
        image_input = preprocess_image(BytesIO(image.read()))
        metadata_input = preprocess_metadata(age, sex, location)

        prediction = model.predict([image_input, metadata_input])[0][0]

        if prediction >= 0.5:
            predicted_class = "Melanoma"
            confidence = prediction * 100
        else:
            predicted_class = "Benign"
            confidence = (1 - prediction) * 100

        return jsonify({
            'message': 'Prediction successful',
            'data': {
                'name': name,
                'age': age,
                'sex': sex,
                'location': location,
                'prediction': {
                    'label': predicted_class,
                    'confidence': round(confidence, 2)
                }
            }
        }), 200

    except Exception as e:
        logging.exception("Prediction failed:")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'}), 200

if __name__ == '__main__':
    app.run(port=510, debug=True)
