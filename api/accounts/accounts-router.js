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
  Account.getById(req.params.id)
    .then(esp => {
      res.json(esp)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.account)
    .then(esp => {
      res.status(201).json(esp)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Account.getById(req.params.id)
  Account.deleteById(req.params.id)
    .then(()=>{
      res.json(account)
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
