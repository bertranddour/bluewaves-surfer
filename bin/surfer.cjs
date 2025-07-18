#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Determine if we should use ESM or CJS builds
const distPath = path.join(__dirname, '..', 'dist');
const useESM = fs.existsSync(path.join(distPath, 'cli', 'index.js'));

if (useESM) {
  // Use dynamic import for ESM
  import('../dist/cli/index.js').catch(error => {
    console.error('Failed to load CLI:', error);
    process.exit(1);
  });
} else {
  // Fallback to CJS
  try {
    require('../dist/cli/index.cjs');
  } catch (error) {
    console.error('Failed to load CLI:', error);
    process.exit(1);
  }
}