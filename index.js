const express = require('express');
const path = require('path');
const tailwind = require('tailwindcss');
const postcss = require('postcss');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'views')));

// Menjalankan Tailwind CSS pada file input.css dan menghasilkan file output.css
postcss([tailwind])
  .process('@import "./src/input.css";', { from: './src/input.css', to: './dist/output.css' })
  .then(result => {
    const outputFilePath = path.join(__dirname, 'dist', 'output.css');
    result.warnings().forEach(warn => {
      console.warn(warn.toString());
    });
    fs.writeFileSync(outputFilePath, result.css);
    console.log(`File output.css berhasil dihasilkan`);
  })
  .catch(error => {
    console.error(`Terjadi kesalahan dalam memproses Tailwind CSS: ${error}`);
  });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
