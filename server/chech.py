import os
SCALER_PATH = r"C:\DermAi\age_scaler.save"

# Check file existence and size
print("Exists:", os.path.exists(SCALER_PATH))
print("Size:", os.path.getsize(SCALER_PATH) if os.path.exists(SCALER_PATH) else "N/A")

# Try reading first few bytes
with open(SCALER_PATH, 'rb') as f:
    print("First 10 bytes:", f.read(10))
