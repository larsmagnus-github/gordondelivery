import { startAppInstance } from './app.js';

const isProcessed = process.argv.includes('--isProcessed');

console.log('Starting app instance with isProcessed:', isProcessed);

await startAppInstance({ isProcessed });
