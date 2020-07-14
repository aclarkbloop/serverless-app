const spending = require('../models/spending')

const saveSpendingData = async (req, res, next) => {

    // return res.status(200).json({ message: "BLOOP" })

    try {
      await spending.saveSpendData()
      console.log("here")
    } catch(error) {
      return res.status(400).json({ error: error.message })
    }

}

module.exports = {
  saveSpendingData,
}