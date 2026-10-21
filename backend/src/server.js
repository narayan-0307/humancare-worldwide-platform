import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';

import app from './app.js';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(backendRoot, '.env'), quiet: true });

function parsePort(value) {
  if (value === undefined || value === '') {
    return 5000;
  }
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid PORT: must be an integer between 1 and 65535.');
  }
  return port;
}

let port;
try {
  port = parsePort(process.env.PORT);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

app.listen(port, () => {
  console.log(`HumanCare backend listening on port ${port}`);
});
