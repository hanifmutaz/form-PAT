const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware untuk parsing aplikasi/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Menyajikan file HTML dan CSS statis dari folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk menangani pengiriman formulir
app.post('/submit', (req, res) => {
    const { nama, koreksi_dinas, koreksi_diniah, buat_soal, edit_soal, rapor_dinas, rapor_diniah } = req.body;

    const newData = {
        nama,
        koreksi_dinas,
        koreksi_diniah,
        buat_soal,
        edit_soal,
        rapor_dinas,
        rapor_diniah
    };

    // Path ke file data.json
    const filePath = path.join(__dirname, 'data.json');
    let dataArray = [];

    // Jika file ada, baca data yang ada
    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        dataArray = JSON.parse(jsonData);
    }

    // Tambahkan data baru ke array
    dataArray.push(newData);

    // Simpan data kembali ke file JSON
    fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), 'utf8');

    // Tampilkan pesan sukses
    res.send('Data has been submitted successfully!');
});

// Route untuk menampilkan data dalam format JSON
app.get('/result', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    let dataArray = [];

    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        dataArray = JSON.parse(jsonData);
    }

    res.json(dataArray);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
