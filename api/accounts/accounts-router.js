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
  // DO YOUR MAGIC
  Account.create(req.body)
    .then(esp => {
      res.status(201).json(esp)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.body)
    .then(esp=>{
      res.status(200).json(esp)
    })
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
