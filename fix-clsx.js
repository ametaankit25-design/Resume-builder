const fs = require('fs');
const file = 'src/components/navbar.jsx';
let content = fs.readFileSync(file, 'utf8');

// Simple replacement: clsx('a', 'b', ...) -> "a b ..."
content = content.replace(/clsx\(([^)]+)\)/g, (match, p1) => {
  // Remove quotes and commas, join with spaces
  return '"' + p1.replace(/['"]/g, '').replace(/,\s*/g, ' ').trim() + '"';
});

fs.writeFileSync(file, content);
console.log('Fixed all clsx calls!');
