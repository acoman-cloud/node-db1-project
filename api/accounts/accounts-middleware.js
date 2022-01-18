const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if (!name || !name.trim() || !budget) {
    res.status(400).json({ message: 'name and budget are required' })
  } else if (name.trim().length > 100 || name.trim().length < 3) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof parseInt(budget) !== 'number') {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    console.log('middleware passthrough')
    //name = name.trim();
    req.name = name.trim()
    req.budget = parseInt(budget)
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  let { name } = req.body
  name = name.trim()
  const dbname = await Account.getAll()
  dbname.map(els=>{
    if (els.name === name) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
    }
  })
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Account.getById(req.params.id)
  if (!account) {
    res.status(404).json({
      message: 'account not found'
    })
  } else {
    req.account = account
    next()
  }
}