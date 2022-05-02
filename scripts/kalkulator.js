/*  FILE  : kalkulator.js
 *  AUTH  : Muhammad Rizky Ismail Faizal
 *  DESC  : terima masukan beberapa ekspresi matematis, lalu cetak hasilnya
 */

function main(expressions) {
  // untuk tiap ekspresi matematis, hitung hasilnya, lalu cetak ke layar
  for (const expression of expressions) {
    console.log(`${expression} = ${solve(expression)}`)
  }
} 

function solve(expression) {
  // bersihkan spasi dalam ekspresi
  expression = expression.replace(/ /g, '');
  
  // cek posisi operator
  const match = /[\+\-\*\/]/.exec(expression);
  
  if (match) {
    // jika operator ditemukan, baca angka pada kedua sisi
    let a = parseFloat(expression.slice(0, match.index))
    let b = parseFloat(expression.slice(match.index+1))

    // lalu hitung hasil ekspresi berdasarkan operator
    switch (expression[match.index]) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
      default:
        return null
    }
  } else {
    // jika tidak ada operator, langsung baca ekspresi sebagai satu angka
    return parseFloat(expression)
  }

}

main(process.argv.slice(2));