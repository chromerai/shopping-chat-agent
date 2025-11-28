-- Populate phones table with 60 phones (25 budget, 20 mid-range, 15 flagship)

-- BUDGET SEGMENT: Under INR 20k (25 phones)
INSERT INTO phones (model, brand, price, specs, features, image_url, reviews) VALUES

-- Redmi (7 phones)
('Redmi 13', 'Redmi', 10999.00, 
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "MediaTek Helio G85", "ram": 4, "storage": 128, "battery_capacity": 5000, "charging_speed": 18, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": ["Night Mode", "Portrait Mode"], "os": "Android 13", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Dual Camera', 'RAM 4GB'],
  'https://example.com/redmi13.jpg',
  '[{"rating": 4.1, "date": "2025-11-20", "comment": "Great value for money", "author": "User123"}]'::jsonb),

('Redmi 12', 'Redmi', 9999.00,
  '{"display_size": 6.79, "display_type": "IPS LCD", "display_resolution": "1080x2460", "refresh_rate": 90, "processor": "MediaTek Helio G88", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 18, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 13", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/redmi12.jpg',
  '[{"rating": 3.9, "date": "2025-11-15", "comment": "Good budget phone", "author": "BudgetHunter"}]'::jsonb),

('Redmi Note 12', 'Redmi', 11999.00,
  '{"display_size": 6.67, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 120, "processor": "Snapdragon 685", "ram": 6, "storage": 128, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 13, "camera_features": ["Ultra Wide", "Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '120Hz AMOLED', 'Triple Camera', 'Fast Charging'],
  'https://example.com/redminote12.jpg',
  '[{"rating": 4.2, "date": "2025-11-18", "comment": "AMOLED display is great", "author": "DisplayLover"}]'::jsonb),

('Redmi A2', 'Redmi', 8499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G37", "ram": 3, "storage": 64, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": [], "os": "Android 13", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Dual Camera', 'Entry Level'],
  'https://example.com/redmia2.jpg',
  '[{"rating": 3.7, "date": "2025-11-10", "comment": "Perfect for basics", "author": "BasicUser"}]'::jsonb),

('Redmi Note 11', 'Redmi', 12499.00,
  '{"display_size": 6.43, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 680", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 13, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz AMOLED', 'Triple Camera'],
  'https://example.com/redminote11.jpg',
  '[{"rating": 4.0, "date": "2025-11-12", "comment": "Good all rounder", "author": "TechReview"}]'::jsonb),

('Redmi 11 Prime', 'Redmi', 10499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "MediaTek Helio G99", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 18, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/redmi11prime.jpg',
  '[{"rating": 3.8, "date": "2025-11-08", "comment": "Solid performer", "author": "ValueSeeker"}]'::jsonb),

('Redmi 10A', 'Redmi', 7999.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G25", "ram": 3, "storage": 32, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 13, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": [], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Budget Friendly', 'Dual Camera'],
  'https://example.com/redmi10a.jpg',
  '[{"rating": 3.5, "date": "2025-11-05", "comment": "Entry level option", "author": "FirstTimer"}]'::jsonb),

-- Realme (6 phones)
('Realme C33', 'Realme', 9499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "Unisoc T612", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Dual Camera'],
  'https://example.com/realme_c33.jpg',
  '[{"rating": 3.9, "date": "2025-11-14", "comment": "Good battery life", "author": "BatteryFan"}]'::jsonb),

('Realme C35', 'Realme', 10499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "MediaTek Helio G88", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 18, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/realme_c35.jpg',
  '[{"rating": 4.0, "date": "2025-11-16", "comment": "Reliable phone", "author": "DailyUser"}]'::jsonb),

('Realme Narzo 50', 'Realme', 11999.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "Snapdragon 680", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging', 'Gaming'],
  'https://example.com/realme_narzo50.jpg',
  '[{"rating": 4.1, "date": "2025-11-13", "comment": "Great for gaming", "author": "Gamer"}]'::jsonb),

('Realme Narzo 50A', 'Realme', 9999.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "MediaTek Helio G85", "ram": 3, "storage": 32, "battery_capacity": 6000, "charging_speed": 10, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": [], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['6000mAh Battery', '90Hz Display', 'Large Battery'],
  'https://example.com/realme_narzo50a.jpg',
  '[{"rating": 3.8, "date": "2025-11-09", "comment": "Battery is excellent", "author": "LongUser"}]'::jsonb),

('Realme 9i', 'Realme', 10999.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "Snapdragon 680", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/realme_9i.jpg',
  '[{"rating": 4.0, "date": "2025-11-11", "comment": "Good overall", "author": "AllRounder"}]'::jsonb),

('Realme C31', 'Realme', 8999.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G85", "ram": 3, "storage": 32, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": [], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Budget Option', 'Dual Camera'],
  'https://example.com/realme_c31.jpg',
  '[{"rating": 3.6, "date": "2025-11-06", "comment": "Basic but good", "author": "BudgetBuyer"}]'::jsonb),

-- Samsung M/F Series (6 phones)
('Samsung Galaxy M13', 'Samsung', 9999.00,
  '{"display_size": 6.6, "display_type": "IPS LCD", "display_resolution": "1080x2408", "refresh_rate": 90, "processor": "MediaTek Helio G88", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 25, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/samsung_m13.jpg',
  '[{"rating": 4.0, "date": "2025-11-17", "comment": "Samsung reliability", "author": "SamsungFan"}]'::jsonb),

('Samsung Galaxy M14', 'Samsung', 10999.00,
  '{"display_size": 6.6, "display_type": "IPS LCD", "display_resolution": "1080x2408", "refresh_rate": 90, "processor": "MediaTek Helio G99", "ram": 4, "storage": 128, "battery_capacity": 5000, "charging_speed": 25, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 13", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Fast Charging'],
  'https://example.com/samsung_m14.jpg',
  '[{"rating": 4.1, "date": "2025-11-19", "comment": "Smooth performance", "author": "SmoothUser"}]'::jsonb),

('Samsung Galaxy F13', 'Samsung', 11499.00,
  '{"display_size": 6.6, "display_type": "IPS LCD", "display_resolution": "1080x2408", "refresh_rate": 90, "processor": "MediaTek Helio G88", "ram": 4, "storage": 64, "battery_capacity": 6000, "charging_speed": 25, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 8, "camera_features": ["Ultra Wide", "Night Mode"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['6000mAh Battery', '90Hz Display', 'Triple Camera', 'Fast Charging'],
  'https://example.com/samsung_f13.jpg',
  '[{"rating": 4.0, "date": "2025-11-21", "comment": "Great value", "author": "ValueChecker"}]'::jsonb),

('Samsung Galaxy F12', 'Samsung', 10499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G35", "ram": 4, "storage": 64, "battery_capacity": 6000, "charging_speed": 15, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": ["Night Mode"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['6000mAh Battery', 'Dual Camera', 'Large Battery'],
  'https://example.com/samsung_f12.jpg',
  '[{"rating": 3.9, "date": "2025-11-07", "comment": "Good battery backup", "author": "LongShifter"}]'::jsonb),

('Samsung Galaxy M12', 'Samsung', 9499.00,
  '{"display_size": 6.5, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G35", "ram": 3, "storage": 32, "battery_capacity": 5000, "charging_speed": 15, "main_camera_resolution": 48, "number_of_cameras": 2, "front_camera_resolution": 8, "camera_features": [], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Dual Camera', 'Budget'],
  'https://example.com/samsung_m12.jpg',
  '[{"rating": 3.8, "date": "2025-11-03", "comment": "Basic phone", "author": "BasicNeeds"}]'::jsonb),

('Samsung Galaxy M11', 'Samsung', 8999.00,
  '{"display_size": 6.4, "display_type": "IPS LCD", "display_resolution": "720x1560", "refresh_rate": 60, "processor": "MediaTek Helio G35", "ram": 3, "storage": 32, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 13, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": [], "os": "Android 10", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Entry Level', 'Dual Camera'],
  'https://example.com/samsung_m11.jpg',
  '[{"rating": 3.6, "date": "2025-11-01", "comment": "Entry option", "author": "FirstPhone"}]'::jsonb),

-- Poco (6 phones)
('Poco X3', 'Poco', 12999.00,
  '{"display_size": 6.67, "display_type": "IPS LCD", "display_resolution": "1080x2400", "refresh_rate": 120, "processor": "Snapdragon 732G", "ram": 6, "storage": 128, "battery_capacity": 6000, "charging_speed": 33, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 20, "camera_features": ["Ultra Wide", "Macro", "Night Mode"], "os": "Android 10", "network_type": "4G"}'::jsonb,
  ARRAY['6000mAh Battery', '120Hz Display', 'Quad Camera', 'Gaming Beast'],
  'https://example.com/poco_x3.jpg',
  '[{"rating": 4.3, "date": "2025-11-22", "comment": "Gaming powerhouse", "author": "GamerzUnite"}]'::jsonb),

('Poco M3', 'Poco', 9999.00,
  '{"display_size": 6.53, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "Snapdragon 662", "ram": 4, "storage": 64, "battery_capacity": 6000, "charging_speed": 18, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 13, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['6000mAh Battery', '90Hz Display', 'Triple Camera'],
  'https://example.com/poco_m3.jpg',
  '[{"rating": 4.0, "date": "2025-11-02", "comment": "Great value", "author": "ValueHunter1"}]'::jsonb),

('Poco M4', 'Poco', 10999.00,
  '{"display_size": 6.43, "display_type": "IPS LCD", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "MediaTek Helio G99", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Triple Camera', 'Fast Charging'],
  'https://example.com/poco_m4.jpg',
  '[{"rating": 4.1, "date": "2025-11-04", "comment": "Solid performance", "author": "SolidBuyer"}]'::jsonb),

('Poco C3', 'Poco', 7999.00,
  '{"display_size": 6.53, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 60, "processor": "MediaTek Helio G35", "ram": 3, "storage": 32, "battery_capacity": 5000, "charging_speed": 10, "main_camera_resolution": 13, "number_of_cameras": 2, "front_camera_resolution": 5, "camera_features": [], "os": "Android 10", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', 'Entry Level', 'Dual Camera'],
  'https://example.com/poco_c3.jpg',
  '[{"rating": 3.5, "date": "2025-10-28", "comment": "Budget option", "author": "BudgetFirst"}]'::jsonb),

('Poco X4 Pro', 'Poco', 13999.00,
  '{"display_size": 6.67, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 120, "processor": "Snapdragon 695", "ram": 8, "storage": 256, "battery_capacity": 5000, "charging_speed": 67, "main_camera_resolution": 108, "number_of_cameras": 4, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro", "Night Mode"], "os": "Android 11", "network_type": "5G"}'::jsonb,
  ARRAY['5000mAh Battery', '120Hz AMOLED', 'Quad Camera', 'Fast Charging', '5G'],
  'https://example.com/poco_x4pro.jpg',
  '[{"rating": 4.4, "date": "2025-11-23", "comment": "Excellent display", "author": "DisplayMaster"}]'::jsonb),

('Poco F2', 'Poco', 11999.00,
  '{"display_size": 6.67, "display_type": "IPS LCD", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 662", "ram": 6, "storage": 128, "battery_capacity": 5000, "charging_speed": 33, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 20, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Quad Camera', 'Fast Charging'],
  'https://example.com/poco_f2.jpg',
  '[{"rating": 4.1, "date": "2025-10-25", "comment": "Great all-rounder", "author": "AllRounderLove"}]'::jsonb);

-- MID-RANGE SEGMENT: INR 21k ~ 45k (20 phones)
INSERT INTO phones (model, brand, price, specs, features, image_url, reviews) VALUES

-- OnePlus Nord Series (5 phones)
('OnePlus Nord CE 3', 'OnePlus', 24999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1080x2412", "refresh_rate": 120, "processor": "Snapdragon 695", "ram": 8, "storage": 128, "battery_capacity": 5000, "charging_speed": 67, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['5000mAh Battery', '120Hz AMOLED', 'Fast Charging', 'OxygenOS', '5G'],
  'https://example.com/oneplus_nord_ce3.jpg',
  '[{"rating": 4.3, "date": "2025-11-24", "comment": "Great AMOLED screen", "author": "OnePlusFan"}]'::jsonb),

('OnePlus Nord 2', 'OnePlus', 27999.00,
  '{"display_size": 6.43, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "MediaTek Dimensity 1200", "ram": 8, "storage": 128, "battery_capacity": 4500, "charging_speed": 65, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '90Hz AMOLED', 'Fast Charging', '5G', 'Performance'],
  'https://example.com/oneplus_nord2.jpg',
  '[{"rating": 4.4, "date": "2025-11-25", "comment": "Fast processor", "author": "PerfLover"}]'::jsonb),

('OnePlus Nord N20', 'OnePlus', 21999.00,
  '{"display_size": 6.43, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 695", "ram": 6, "storage": 128, "battery_capacity": 4500, "charging_speed": 33, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '90Hz AMOLED', '5G', 'Value for Money'],
  'https://example.com/oneplus_nord_n20.jpg',
  '[{"rating": 4.2, "date": "2025-11-26", "comment": "Budget friendly 5G", "author": "5GVibe"}]'::jsonb),

('OnePlus Nord N10', 'OnePlus', 22999.00,
  '{"display_size": 6.49, "display_type": "IPS LCD", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "Snapdragon 690", "ram": 6, "storage": 128, "battery_capacity": 4300, "charging_speed": 30, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro", "Depth"], "os": "Android 11", "network_type": "5G"}'::jsonb,
  ARRAY['4300mAh Battery', '90Hz Display', 'Quad Camera', '5G'],
  'https://example.com/oneplus_nord_n10.jpg',
  '[{"rating": 4.1, "date": "2025-11-27", "comment": "Good for 5G", "author": "5GUpgrader"}]'::jsonb),

('OnePlus 9R', 'OnePlus', 39999.00,
  '{"display_size": 6.55, "display_type": "Fluid AMOLED", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Snapdragon 888", "ram": 12, "storage": 256, "battery_capacity": 4500, "charging_speed": 65, "main_camera_resolution": 48, "number_of_cameras": 4, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Telephoto", "Macro"], "os": "OxygenOS 11", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '120Hz AMOLED', 'Fast Charging', 'Gaming', '5G'],
  'https://example.com/oneplus_9r.jpg',
  '[{"rating": 4.5, "date": "2025-11-28", "comment": "Gaming monster", "author": "GamerKing"}]'::jsonb),

-- Samsung A Series (5 phones)
('Samsung Galaxy A53', 'Samsung', 38999.00,
  '{"display_size": 6.5, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 120, "processor": "Snapdragon 778G", "ram": 8, "storage": 256, "battery_capacity": 5000, "charging_speed": 25, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Macro", "Depth"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['5000mAh Battery', '120Hz AMOLED', 'Quad Camera', '5G', 'Knox Security'],
  'https://example.com/samsung_a53.jpg',
  '[{"rating": 4.3, "date": "2025-11-29", "comment": "Samsung quality", "author": "SamsungPro"}]'::jsonb),

('Samsung Galaxy A52', 'Samsung', 34999.00,
  '{"display_size": 6.5, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 720G", "ram": 6, "storage": 128, "battery_capacity": 4500, "charging_speed": 25, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['4500mAh Battery', '90Hz AMOLED', 'Quad Camera', 'Water Resistant'],
  'https://example.com/samsung_a52.jpg',
  '[{"rating": 4.2, "date": "2025-11-30", "comment": "Reliable phone", "author": "ReliableUser"}]'::jsonb),

('Samsung Galaxy A72', 'Samsung', 41999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 720G", "ram": 8, "storage": 256, "battery_capacity": 5000, "charging_speed": 25, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Telephoto", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz AMOLED', 'Quad Camera', 'Telephoto', 'Premium'],
  'https://example.com/samsung_a72.jpg',
  '[{"rating": 4.4, "date": "2025-12-01", "comment": "Excellent cameras", "author": "PhotoPro"}]'::jsonb),

('Samsung Galaxy A32', 'Samsung', 24999.00,
  '{"display_size": 6.4, "display_type": "AMOLED", "display_resolution": "1080x2340", "refresh_rate": 90, "processor": "MediaTek Helio G80", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 15, "main_camera_resolution": 64, "number_of_cameras": 4, "front_camera_resolution": 20, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 11", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz AMOLED', 'Quad Camera', 'Water Resistant'],
  'https://example.com/samsung_a32.jpg',
  '[{"rating": 4.0, "date": "2025-12-02", "comment": "Good value", "author": "ValueChamp"}]'::jsonb),

('Samsung Galaxy A23', 'Samsung', 21999.00,
  '{"display_size": 6.6, "display_type": "IPS LCD", "display_resolution": "1080x2408", "refresh_rate": 90, "processor": "MediaTek Helio G99", "ram": 4, "storage": 64, "battery_capacity": 5000, "charging_speed": 18, "main_camera_resolution": 50, "number_of_cameras": 4, "front_camera_resolution": 8, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 12", "network_type": "4G"}'::jsonb,
  ARRAY['5000mAh Battery', '90Hz Display', 'Quad Camera', 'Fast Charging'],
  'https://example.com/samsung_a23.jpg',
  '[{"rating": 4.0, "date": "2025-12-03", "comment": "Budget A series", "author": "BudgetA"}]'::jsonb),

-- Motorola Edge Series (4 phones)
('Motorola Edge 40', 'Motorola', 27999.00,
  '{"display_size": 6.55, "display_type": "AMOLED", "display_resolution": "1080x2412", "refresh_rate": 144, "processor": "Snapdragon 778G+", "ram": 8, "storage": 256, "battery_capacity": 4500, "charging_speed": 68, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 32, "camera_features": ["Ultra Wide"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '144Hz AMOLED', 'Fast Charging', '5G', 'Thin Design'],
  'https://example.com/moto_edge40.jpg',
  '[{"rating": 4.3, "date": "2025-12-04", "comment": "Best display", "author": "DisplayKing"}]'::jsonb),

('Motorola Edge 30 Pro', 'Motorola', 39999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 1", "ram": 12, "storage": 256, "battery_capacity": 5000, "charging_speed": 125, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 60, "camera_features": ["Ultra Wide", "Ultra Telephoto"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['5000mAh Battery', '120Hz AMOLED', 'Super Fast Charging', '5G', 'Flagship'],
  'https://example.com/moto_edge30pro.jpg',
  '[{"rating": 4.5, "date": "2025-12-05", "comment": "Flagship killer", "author": "FlagshipLover"}]'::jsonb),

('Motorola Edge 20', 'Motorola', 25999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 778", "ram": 8, "storage": 128, "battery_capacity": 4000, "charging_speed": 30, "main_camera_resolution": 108, "number_of_cameras": 3, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Telephoto"], "os": "Android 11", "network_type": "5G"}'::jsonb,
  ARRAY['4000mAh Battery', '90Hz AMOLED', 'Quad Camera', '5G'],
  'https://example.com/moto_edge20.jpg',
  '[{"rating": 4.2, "date": "2025-12-06", "comment": "Great phone", "author": "MotoLover"}]'::jsonb),

('Motorola Edge 20 Fusion', 'Motorola', 21999.00,
  '{"display_size": 6.55, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 778", "ram": 8, "storage": 128, "battery_capacity": 4410, "charging_speed": 30, "main_camera_resolution": 108, "number_of_cameras": 2, "front_camera_resolution": 32, "camera_features": ["Ultra Wide"], "os": "Android 11", "network_type": "5G"}'::jsonb,
  ARRAY['4410mAh Battery', '90Hz AMOLED', 'Dual Camera', '5G'],
  'https://example.com/moto_edge20fusion.jpg',
  '[{"rating": 4.1, "date": "2025-12-07", "comment": "Budget flagship", "author": "BudgetFlagship"}]'::jsonb),

-- iQOO Series (3 phones)
('iQOO 11', 'iQOO', 43999.00,
  '{"display_size": 6.78, "display_type": "AMOLED", "display_resolution": "1440x3200", "refresh_rate": 144, "processor": "Snapdragon 8 Gen 2", "ram": 12, "storage": 512, "battery_capacity": 5000, "charging_speed": 120, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Telephoto"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['5000mAh Battery', '144Hz AMOLED', 'Ultra Fast Charging', '5G', 'Gaming'],
  'https://example.com/iqoo_11.jpg',
  '[{"rating": 4.5, "date": "2025-12-08", "comment": "Gaming beast", "author": "GamezKing"}]'::jsonb),

('iQOO 9', 'iQOO', 39999.00,
  '{"display_size": 6.56, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 1", "ram": 8, "storage": 256, "battery_capacity": 4500, "charging_speed": 120, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '120Hz AMOLED', 'Super Fast Charging', '5G'],
  'https://example.com/iqoo_9.jpg',
  '[{"rating": 4.4, "date": "2025-12-09", "comment": "Excellent phone", "author": "iQOOFan"}]'::jsonb),

('iQOO Z6', 'iQOO', 23999.00,
  '{"display_size": 6.44, "display_type": "AMOLED", "display_resolution": "1080x2400", "refresh_rate": 90, "processor": "Snapdragon 778+", "ram": 8, "storage": 128, "battery_capacity": 4500, "charging_speed": 44, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 16, "camera_features": ["Ultra Wide"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['4500mAh Battery', '90Hz AMOLED', 'Fast Charging', '5G'],
  'https://example.com/iqoo_z6.jpg',
  '[{"rating": 4.2, "date": "2025-12-10", "comment": "Good value", "author": "ValueSeeker2"}]'::jsonb),

('iQOO 10', 'iQOO', 41999.00,
  '{"display_size": 6.78, "display_type": "AMOLED", "display_resolution": "1440x3200", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 1 Plus", "ram": 12, "storage": 512, "battery_capacity": 4700, "charging_speed": 120, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 16, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 12", "network_type": "5G"}'::jsonb,
  ARRAY['4700mAh Battery', '120Hz AMOLED', 'Super Fast Charging', '5G'],
  'https://example.com/iqoo_10.jpg',
  '[{"rating": 4.4, "date": "2025-12-11", "comment": "Fantastic phone", "author": "iQOOPro"}]'::jsonb);

-- FLAGSHIP SEGMENT: INR 45k + (15 phones)
INSERT INTO phones (model, brand, price, specs, features, image_url, reviews) VALUES

-- iPhone Series (3 phones)
('iPhone 15 Pro Max', 'Apple', 149999.00,
  '{"display_size": 6.7, "display_type": "Super Retina XDR", "display_resolution": "1290x2796", "refresh_rate": 120, "processor": "A17 Pro", "ram": 8, "storage": 256, "battery_capacity": 4685, "charging_speed": 30, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 12, "camera_features": ["Ultra Wide", "5x Telephoto", "ProRaw"], "os": "iOS 17", "network_type": "5G"}'::jsonb,
  ARRAY['5G', 'Titanium Design', 'Always-On Display', 'Action Button', 'Premium'],
  'https://example.com/iphone_15_pro_max.jpg',
  '[{"rating": 4.8, "date": "2025-12-12", "comment": "Best iPhone ever", "author": "AppleLover"}]'::jsonb),

('iPhone 15 Pro', 'Apple', 129999.00,
  '{"display_size": 6.1, "display_type": "Super Retina XDR", "display_resolution": "1179x2556", "refresh_rate": 120, "processor": "A17 Pro", "ram": 8, "storage": 256, "battery_capacity": 3280, "charging_speed": 30, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 12, "camera_features": ["Ultra Wide", "3x Telephoto", "ProRaw"], "os": "iOS 17", "network_type": "5G"}'::jsonb,
  ARRAY['5G', 'Titanium Design', 'ProMotion', 'Action Button', 'Premium'],
  'https://example.com/iphone_15_pro.jpg',
  '[{"rating": 4.8, "date": "2025-12-13", "comment": "Perfect size", "author": "IphonePro"}]'::jsonb),

('iPhone 15', 'Apple', 99999.00,
  '{"display_size": 6.1, "display_type": "Retina", "display_resolution": "1179x2556", "refresh_rate": 60, "processor": "A16 Bionic", "ram": 6, "storage": 128, "battery_capacity": 3349, "charging_speed": 20, "main_camera_resolution": 48, "number_of_cameras": 2, "front_camera_resolution": 12, "camera_features": ["Ultra Wide"], "os": "iOS 17", "network_type": "5G"}'::jsonb,
  ARRAY['5G', 'Premium Build', 'Dynamic Island', 'All-Day Battery', 'Flagship'],
  'https://example.com/iphone_15.jpg',
  '[{"rating": 4.7, "date": "2025-12-14", "comment": "Great flagship", "author": "IphoneStandard"}]'::jsonb),

-- Samsung S Series (4 phones)
('Samsung Galaxy S24 Ultra', 'Samsung', 139999.00,
  '{"display_size": 6.8, "display_type": "Dynamic AMOLED 2X", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 3", "ram": 12, "storage": 512, "battery_capacity": 5000, "charging_speed": 45, "main_camera_resolution": 200, "number_of_cameras": 4, "front_camera_resolution": 40, "camera_features": ["Ultra Wide", "2x Telephoto", "10x Periscope"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz Display', 'S Pen', 'Titanium Build', 'Premium Camera', 'AI Features'],
  'https://example.com/samsung_s24_ultra.jpg',
  '[{"rating": 4.8, "date": "2025-12-15", "comment": "Best Android phone", "author": "AndroidMaster"}]'::jsonb),

('Samsung Galaxy S24+', 'Samsung', 99999.00,
  '{"display_size": 6.7, "display_type": "Dynamic AMOLED 2X", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 3", "ram": 12, "storage": 256, "battery_capacity": 4900, "charging_speed": 45, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 40, "camera_features": ["Ultra Wide", "3x Telephoto"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz Display', 'Premium Design', 'Great Cameras', 'All-Day Battery'],
  'https://example.com/samsung_s24_plus.jpg',
  '[{"rating": 4.7, "date": "2025-12-16", "comment": "Great choice", "author": "SamsungChampion"}]'::jsonb),

('Samsung Galaxy S24', 'Samsung', 79999.00,
  '{"display_size": 6.2, "display_type": "Dynamic AMOLED 2X", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 3", "ram": 8, "storage": 256, "battery_capacity": 4000, "charging_speed": 45, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 40, "camera_features": ["Ultra Wide", "3x Telephoto"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz Display', 'Compact Design', 'AI Features', 'Great Value'],
  'https://example.com/samsung_s24.jpg',
  '[{"rating": 4.7, "date": "2025-12-17", "comment": "Best size", "author": "CompactLover"}]'::jsonb),

('Samsung Galaxy S23 Ultra', 'Samsung', 124999.00,
  '{"display_size": 6.8, "display_type": "Dynamic AMOLED 2X", "display_resolution": "1440x3088", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 2", "ram": 12, "storage": 256, "battery_capacity": 5000, "charging_speed": 45, "main_camera_resolution": 200, "number_of_cameras": 4, "front_camera_resolution": 40, "camera_features": ["Ultra Wide", "2x Telephoto", "10x Periscope"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz Display', 'S Pen', 'Premium Camera', 'Zoom Beast'],
  'https://example.com/samsung_s23_ultra.jpg',
  '[{"rating": 4.7, "date": "2025-12-18", "comment": "Zoom king", "author": "ZoomMaster"}]'::jsonb),

-- OnePlus Flagship (2 phones)
('OnePlus 12', 'OnePlus', 64999.00,
  '{"display_size": 6.82, "display_type": "AMOLED", "display_resolution": "1440x3168", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 3", "ram": 12, "storage": 512, "battery_capacity": 5400, "charging_speed": 100, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "3x Telephoto"], "os": "OxygenOS 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz AMOLED', 'Super Fast Charging', 'OxygenOS', 'Performance Beast'],
  'https://example.com/oneplus_12.jpg',
  '[{"rating": 4.7, "date": "2025-12-19", "comment": "Performance king", "author": "OnePlusChamp"}]'::jsonb),

('OnePlus 11 Pro', 'OnePlus', 79999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1440x3216", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 2", "ram": 12, "storage": 256, "battery_capacity": 5000, "charging_speed": 100, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Telephoto"], "os": "OxygenOS 13", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz AMOLED', 'Hasselblad Camera', 'Super Fast Charging', 'Flagship'],
  'https://example.com/oneplus_11_pro.jpg',
  '[{"rating": 4.7, "date": "2025-12-20", "comment": "Great flagship", "author": "OnePlusLover"}]'::jsonb),

-- Google Pixel (3 phones)
('Google Pixel 8 Pro', 'Google', 119999.00,
  '{"display_size": 6.7, "display_type": "OLED", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Tensor G3", "ram": 12, "storage": 512, "battery_capacity": 5050, "charging_speed": 37, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 42, "camera_features": ["Ultra Wide", "5x Telephoto", "Macro"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz OLED', 'Pixel Magic Eraser', 'Best-in-Class AI', 'Photography'],
  'https://example.com/pixel_8_pro.jpg',
  '[{"rating": 4.8, "date": "2025-12-21", "comment": "Photography flagship", "author": "PixelPhotoPro"}]'::jsonb),

('Google Pixel 8', 'Google', 79999.00,
  '{"display_size": 6.3, "display_type": "OLED", "display_resolution": "1440x2992", "refresh_rate": 120, "processor": "Tensor G3", "ram": 8, "storage": 256, "battery_capacity": 4700, "charging_speed": 37, "main_camera_resolution": 50, "number_of_cameras": 2, "front_camera_resolution": 10, "camera_features": ["Ultra Wide", "Macro"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz OLED', 'Pixel Features', 'Great AI', 'Compact'],
  'https://example.com/pixel_8.jpg',
  '[{"rating": 4.7, "date": "2025-12-22", "comment": "Great phone", "author": "PixelUser"}]'::jsonb),

('Google Pixel 7 Pro', 'Google', 84999.00,
  '{"display_size": 6.7, "display_type": "AMOLED", "display_resolution": "1440x3120", "refresh_rate": 120, "processor": "Tensor", "ram": 12, "storage": 256, "battery_capacity": 5003, "charging_speed": 30, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 11.1, "camera_features": ["Ultra Wide", "4x Telephoto"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz AMOLED', 'Computational Photography', 'Tensor AI', 'Great Value'],
  'https://example.com/pixel_7_pro.jpg',
  '[{"rating": 4.6, "date": "2025-12-23", "comment": "Best value flagship", "author": "PixelFan"}]'::jsonb),

-- Additional Flagship Phones (3 phones)
('Samsung Galaxy Z Fold 5', 'Samsung', 159999.00,
  '{"display_size": 7.6, "display_type": "Dynamic AMOLED 2X", "display_resolution": "2176x1812", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 2", "ram": 12, "storage": 512, "battery_capacity": 4400, "charging_speed": 25, "main_camera_resolution": 50, "number_of_cameras": 3, "front_camera_resolution": 10, "camera_features": ["Ultra Wide", "3x Telephoto"], "os": "Android 13", "network_type": "5G"}'::jsonb,
  ARRAY['5G', 'Foldable', '120Hz Display', 'Innovative Design', 'Premium'],
  'https://example.com/samsung_z_fold5.jpg',
  '[{"rating": 4.6, "date": "2025-12-24", "comment": "Future tech", "author": "FutureTech"}]'::jsonb),

('OnePlus Open', 'OnePlus', 149999.00,
  '{"display_size": 7.82, "display_type": "AMOLED", "display_resolution": "2268x2036", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 2", "ram": 12, "storage": 512, "battery_capacity": 4805, "charging_speed": 100, "main_camera_resolution": 48, "number_of_cameras": 3, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "Telephoto"], "os": "OxygenOS", "network_type": "5G"}'::jsonb,
  ARRAY['5G', 'Foldable', 'Super Fast Charging', 'Innovative', 'Premium'],
  'https://example.com/oneplus_open.jpg',
  '[{"rating": 4.7, "date": "2025-12-25", "comment": "Best foldable", "author": "FoldableFan"}]'::jsonb),

('Xiaomi 14 Ultra', 'Xiaomi', 89999.00,
  '{"display_size": 6.73, "display_type": "AMOLED", "display_resolution": "1440x3200", "refresh_rate": 120, "processor": "Snapdragon 8 Gen 3", "ram": 16, "storage": 512, "battery_capacity": 5300, "charging_speed": 90, "main_camera_resolution": 50, "number_of_cameras": 4, "front_camera_resolution": 32, "camera_features": ["Ultra Wide", "2x Telephoto", "5x Periscope"], "os": "Android 14", "network_type": "5G"}'::jsonb,
  ARRAY['5G', '120Hz AMOLED', 'Leica Cameras', 'Premium Build', 'Powerful Processor'],
  'https://example.com/xiaomi_14_ultra.jpg',
  '[{"rating": 4.7, "date": "2025-12-26", "comment": "Camera beast", "author": "CameraKing"}]'::jsonb);

-- Verify the population
SELECT COUNT(*) as total_phones,
       SUM(CASE WHEN price < 20000 THEN 1 ELSE 0 END) as budget_phones,
       SUM(CASE WHEN price BETWEEN 21000 AND 45000 THEN 1 ELSE 0 END) as midrange_phones,
       SUM(CASE WHEN price > 45000 THEN 1 ELSE 0 END) as flagship_phones
FROM phones;
