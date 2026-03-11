-- Specific JSONB path indexes for common spec queries (much faster!)
CREATE INDEX IF NOT EXISTS idx_phones_specs_ram ON phones USING btree ((specs->>'ram'));
CREATE INDEX IF NOT EXISTS idx_phones_specs_storage ON phones USING btree ((specs->>'storage'));
CREATE INDEX IF NOT EXISTS idx_phones_specs_battery ON phones USING btree ((specs->>'battery_capacity'));
CREATE INDEX IF NOT EXISTS idx_phones_specs_camera ON phones USING btree ((specs->>'main_camera_resolution'));
CREATE INDEX IF NOT EXISTS idx_phones_specs_processor ON phones USING btree ((specs->>'processor'));

-- Composite index for price range + brand queries (common pattern)
CREATE INDEX IF NOT EXISTS idx_phones_brand_price ON phones(brand, price);

--Enable RLS on the phones table
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can READ (SELECT) phone data
CREATE POLICY "Allow public read access"
ON phones
FOR SELECT
TO public
USING (true);

-- Policy 2: Only authenticated users can INSERT new phones
CREATE POLICY "Allow authenticated insert"
ON phones
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Only authenticated users can UPDATE phones
CREATE POLICY "Allow authenticated update"
ON phones
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Only authenticated users can DELETE phones
CREATE POLICY "Allow authenticated delete"
ON phones
FOR DELETE
TO authenticated
USING (true);