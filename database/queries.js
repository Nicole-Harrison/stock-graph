const pool = require('./index.js');

const getStocks = (req, res) => {
  pool.query('SELECT * FROM stocks', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getStockByTicker = (req, res) => {
  const ticker = req.params.stockId;

  pool.query('SELECT * FROM stocks WHERE ticker = $1', [ticker], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createStock = (req, res) => {
  const { ticker, etc } = req.body

  pool.query('INSERT INTO users (ticker, etc) VALUES ($1, $2)', [ticker, etc], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateStock = (req, res) => {
  const ticker = req.params.stockId;
  const { ticker, relatedtag, ownercount, recpercent, prices } = req.body

  pool.query(
    'UPDATE stocks SET relatedtag = $1, ownercount = $2 recpercent = $3 prices = $4 WHERE ticker = $5',
    [relatedtag, ownercount, recpercent, prices, ticker],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteStock = (req, res) => {
  const ticker = req.params.stockId;

  pool.query('DELETE FROM users WHERE id = $1', [ticker], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${ticker}`)
  })
}

module.exports = {
  getStocks,
  getStockByTicker,
  createStock,
  updateStock,
  deleteStock
}