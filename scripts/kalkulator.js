/*  FILE  : kalkulator.js
 *  AUTH  : Muhammad Rizky Ismail Faizal
 *  DESC  : terima masukan beberapa ekspresi matematis, lalu cetak hasilnya
 */

function main(expressions) {
  // untuk tiap ekspresi matematis, hitung hasilnya, lalu cetak ke layar
  for (const expression of expressions) {
    console.log(`${expression} = ${kalkulator(expression)}`)
  }
} 

function kalkulator(input) {
  // bersihkan spasi dalam ekspresi
  input = input.replace(/ /g, '');
  
  // cek posisi operator
  const match = /[\+\-\*\/]/.exec(input);
  
  if (match) {
    // jika operator ditemukan, baca angka pada kedua sisi
    let a = parseFloat(input.slice(0, match.index))
    let b = parseFloat(input.slice(match.index+1))

    // lalu hitung hasil ekspresi berdasarkan operator
    switch (input[match.index]) {
      case '+':
        return Math.round(a + b)
      case '-':
        return Math.round(a - b)
      case '*':
        return Math.round(a * b)
      case '/':
        return Math.round(a / b)
      default:
        return null
    }
  } else {
    // jika tidak ada operator, langsung baca ekspresi sebagai satu angka
    return Math.round(parseFloat(input))
  }

}

main(process.argv.slice(2));