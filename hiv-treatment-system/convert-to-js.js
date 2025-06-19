const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

// Function to recursively get all files in a directory
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat();
}

// Function to convert TypeScript to JavaScript
function convertTStoJS(content) {
  // Remove interfaces, types, and type annotations
  let result = content
    // Remove import type statements
    .replace(/import\s+type\s+.*?from\s+.*?;/g, '')
    // Remove interface declarations
    .replace(/interface\s+\w+\s*{[\s\S]*?}/g, '')
    // Remove type declarations
    .replace(/type\s+\w+\s*=[\s\S]*?;/g, '')
    // Remove React.FC and component type annotations
    .replace(/:\s*React\.FC(\<.*?\>)?/g, '')
    // Remove function parameter type annotations
    .replace(/\(([^)]*)\):\s*\w+/g, '($1)')
    // Remove generic type annotations
    .replace(/<([^<>]*)>/g, '')
    // Remove return type annotations
    .replace(/:\s*\w+(\[\])?(\s*\|\s*\w+(\[\])?)*\s*=>/g, '=>')
    // Remove variable type annotations
    .replace(/:\s*\w+(\[\])?(\s*\|\s*\w+(\[\])?)*(\s*=)/g, '$4')
    // Remove enum and replace with object
    .replace(/enum\s+(\w+)\s*{([^}]*)}/g, 'const $1 = {$2}')
    // Convert any remaining type annotations
    .replace(/:\s*[A-Za-z0-9_<>|&,'"\s\[\]]+(?=(\s*[,=)]|$))/g, '');

  // Convert "as Type" assertions to JavaScript
  result = result.replace(/\s+as\s+[A-Za-z0-9_<>|&,'"\s\[\]]+/g, '');

  return result;
}

// Main function to convert all TypeScript files to JavaScript
async function convertProject() {
  try {
    const files = await getFiles('./src');
    
    // Process TS files
    const tsFiles = files.filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'));
    const tsxFiles = files.filter(file => file.endsWith('.tsx'));
    
    console.log(`Found ${tsFiles.length} .ts files and ${tsxFiles.length} .tsx files to convert`);
    
    // Convert .ts to .js
    for (const file of tsFiles) {
      const content = await readFile(file, 'utf8');
      const jsContent = convertTStoJS(content);
      const jsFile = file.replace(/\.ts$/, '.js');
      
      await writeFile(jsFile, jsContent, 'utf8');
      console.log(`Converted ${file} to ${jsFile}`);
      
      // Delete original TS file
      //await unlink(file);
      //console.log(`Deleted ${file}`);
    }
    
    // Convert .tsx to .jsx
    for (const file of tsxFiles) {
      const content = await readFile(file, 'utf8');
      const jsxContent = convertTStoJS(content);
      const jsxFile = file.replace(/\.tsx$/, '.jsx');
      
      await writeFile(jsxFile, jsxContent, 'utf8');
      console.log(`Converted ${file} to ${jsxFile}`);
      
      // Delete original TSX file
      //await unlink(file);
      //console.log(`Deleted ${file}`);
    }
    
    console.log('Conversion completed successfully.');
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

// Run the conversion
convertProject(); 