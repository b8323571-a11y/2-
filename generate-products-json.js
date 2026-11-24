import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts } from '../src/data/products.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.join(__dirname, 'server', 'data', 'products.json');

fs.writeFileSync(outPath, JSON.stringify(initialProducts, null, 2), 'utf-8');
console.log('Generated products.json successfully');
