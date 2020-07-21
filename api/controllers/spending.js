const spending = require('../models/spending')

const saveSpendingData = async (req, res, next) => {

    try {
      await spending.saveSpendData(req.body)
    } catch(error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ message: 'Amount Recorded' })

}

const getData = async (req, res, next) => {

  try {
    res.send(await spending.getData(req.query))
  } catch(error) {
    return res.status(400).json({ error: error.message })
  }

}

module.exports = {
  saveSpendingData,
  getData,
}