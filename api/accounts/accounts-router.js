const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(acc => {
      res.json(acc)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
    .then(esp => {
      res.status(201).json(esp)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
  } catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(() => {
      res.json(req.account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
