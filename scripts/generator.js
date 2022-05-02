/*  FILE  : generator.js
 *  AUTH  : Muhammad Rizky Ismail Faizal
 *  DESC  : buat data uji untuk file sorter.js
 */

const { writeFileSync } = require('fs');

const COUNT = 1000
const NAMA_1 = ['Smart', 'WIFI-Powered', 'Genius', 'Generation 2', 'Gorilla Glass', 'Super', 'Very Smart', 'Quick', 'Mega']
const NAMA_2 = ['Apel', 'Jeruk', 'TV', 'Smartphone', 'Router', 'Mouse', 'Monitor', 'Oven', 'Hair Dryer', 'Tirai', 'Headphone', 'Microphone']

function main(filename) {
  // mulai file .csv data acak dengan nama kolom
  let csv = 'nama,harga,rating,likes'

  // buat data acak
  for (let i = 0; i < COUNT; i++) {
    csv += '\n'
    csv += NAMA_1[Math.floor(Math.random()*NAMA_1.length)] + ' '
    csv += NAMA_2[Math.floor(Math.random()*NAMA_2.length)] + ','
    csv += (Math.floor(Math.random()*99+1)).toString() + ','
    csv += (Math.floor(Math.random()*10)*0.5).toString() + ','
    csv += (Math.floor(Math.random()*500)).toString()
  }

  // simpan data pada filename
  writeFileSync(filename, csv)
} 

main(process.argv[2]);