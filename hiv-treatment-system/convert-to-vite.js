/**
 * This script helps migrate a project from React Scripts (Create React App) to Vite.
 * Run with: node convert-to-vite.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Get all files in a directory recursively
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

// Main function to update React imports in files
async function updateImports() {
  try {
    console.log('Starting migration to Vite...');
    
    // Process JavaScript/JSX files
    const srcDir = path.join(__dirname, 'src');
    const files = await getFiles(srcDir);
    const jsFiles = files.filter(file => 
      file.endsWith('.js') || file.endsWith('.jsx')
    );
    
    console.log(`Found ${jsFiles.length} JavaScript/JSX files to process`);
    
    for (const file of jsFiles) {
      let content = await readFile(file, 'utf8');
      
      // Replace React import
      content = content.replace(
        "import React from 'react';", 
        "import React from 'react';"
      );
      
      // Replace React import with useState, etc.
      content = content.replace(
        /import React, { (.+) } from 'react';/g, 
        "import React, { $1 } from 'react';"
      );
      
      // Update all other imports to use proper extensions
      content = content.replace(
        /from ['"](.+)\/index['"]/g, 
        "from '$1/index.js'"
      );
      
      // Write the file back
      await writeFile(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
    
    console.log('Migration completed successfully!');
    console.log('Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run dev');
    console.log('3. Check for any remaining issues and fix them manually');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
updateImports(); 