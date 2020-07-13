const spending = require('../models/spending')

const saveUserData = async (res) => {

    try {
      await spending.saveSpendData()
      console.log("here")
    } catch(error) {
      return res.status(400).json({ error: error.message })
    }

}

module.exports = {
    saveUserData,
}