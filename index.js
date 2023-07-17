const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'views')));

// Mengirim file index.html sebagai respons ketika mengakses route root ("/")
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'warung-kuy'
});

connection.connect((error) => {
  if (error) {
    console.error('Gagal terhubung ke database:', error);
    // Tambahkan notifikasi kesalahan ke pengguna di sini, misalnya menggunakan alert()
  } else {
    console.log('Berhasil terhubung ke database');
    // Tambahkan notifikasi koneksi berhasil ke pengguna di sini, misalnya menggunakan alert()
  }

  // Melakukan SELECT pada tabel "product"
  connection.query('SELECT * FROM product', (error, results) => {
    if (error) {
      console.error('Gagal melakukan SELECT:', error);
      return;
    }

    console.log('Hasil SELECT:');
    console.log(results);

    // Setelah selesai, tutup koneksi database
    connection.end();
  });
});
