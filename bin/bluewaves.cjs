#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Run the TypeScript CLI
const child = spawn('node', [path.join(__dirname, '..', 'dist', 'cli', 'index.js'), ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (error) => {
  console.error('Failed to start CLI:', error);
  process.exit(1);
});