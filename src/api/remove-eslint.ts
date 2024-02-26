import * as fs from 'fs';

const inputFile = './src/api/auth-proxies.ts';
const outputFile = './src/api/auth-proxies.ts';

const removeLine =
  '// eslint-disable-next-line @typescript-eslint/no-redeclare';

// Read the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input file:', err);
    process.exit(1);
  }

  // Split the file content into lines
  const lines = data.split('\n');

  // Filter out lines containing the specified comment
  const filteredLines = lines.filter(line => line.trim() !== removeLine);

  // Join the filtered lines back together
  const updatedContent = filteredLines.join('\n');

  // Write the updated content to the output file
  fs.writeFile(outputFile, updatedContent, err => {
    if (err) {
      console.error('Error writing to the output file:', err);
      process.exit(1);
    }

    console.log('Removed lines containing:', removeLine);
  });
});
