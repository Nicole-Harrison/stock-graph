let fs = require('fs');
let faker = require('faker');

// stock info table
// let header = ['stockId', 'ticker', 'company', 'relatedTags', 'ownerCount', 'recPercent', 'averageStock', 'changePercent', 'price']

let letters = 'ABCDEFGFIJKLMNOPQRSTUVWXYZ'
let seenTickers = new Set();

let generateTicker = () => {
  let randomIndex;
  let ticker = '';

  for (let i = 0; i < 5; i++) {
    randomIndex = faker.random.number({min: 0, max: 25});
    ticker += letters[randomIndex];
  }
  if (seenTickers.has(ticker)) {
    return generateTicker();
  } else {
    seenTickers.add(ticker);
    return ticker;
  }
}

let count = 0;
let generateRow = () => {
  count++
  return `${count}, ${generateTicker()}, ${faker.company.companyName()}, ${faker.lorem.word()}, ` +
    `${faker.random.number({min: 100, max: 10000})}, ${faker.random.number({min: 0, max: 100})}, ` +
    `${faker.random.number({min: 1, max: 5000})}, ${faker.random.number({min: 0, max: 100})}, ` +
    `${faker.random.number({min: 1, max: 5000})} \n`
}

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function generateData(writer, chunk, encoding, callback) {
  let i = 10e6;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        chunk = generateRow();
        writer.write(chunk, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if ((i % 10e4) === 0) {
          console.log(i);
        }
        chunk += generateRow();
        ok = writer.write(chunk, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

let writer = fs.createWriteStream('./data.csv')

generateData(writer, generateRow(), null , () => console.log('finished!'))