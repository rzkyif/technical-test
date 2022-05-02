/*  FILE  : sorter.js
 *  AUTH  : Muhammad Rizky Ismail Faizal
 *  DESC  : terima masukan alamat file .csv, urutkan data pada file tersebut sesuai spesifikasi tertentu
 */

const { readFileSync } = require('fs');

function main(filename) {
  // baca file .csv, masukkan data yang terbaca ke dalam suatu array
  const data = []
  const lines = readFileSync(filename).toString().split('\n').slice(1);
  for (const line of lines) {
    const parts = line.split(',');
    data.push({
      nama: parts[0],
      harga: parseInt(parts[1].trim()),
      rating: parseFloat(parts[2].trim()),
      likes: parseInt(parts[3].trim())
    })
  }

  // urutkan data sesuai spesifikasi (harga ascending, rating descending, likes descending)
  data.sort((a, b) => {
    if ((a.harga < b.harga) || (a.harga == b.harga && a.rating > b.rating) || (a.harga == b.harga && a.rating == b.rating && a.likes > b.likes)) {
      return -1
    } else {
      return 1
    }
  })

  // cetak 10 data pertama yang sudah diurutkan
  console.log(data.slice(0,10))
} 

main(process.argv[2]);