const router = require('express').Router()
const {notifController} = require('../controller')

router.post('/Order', notifController.sendNotifOrder)
router.post('/Proccess', notifController.sendNotifProccess)
router.post('/Jalur', notifController.sendNotifJalur)
router.post('/Invoice', notifController.sendNotifInvoice)
router.post('/Import', notifController.sendNotifImport)
router.post('/Address', notifController.sendAddressForm)
router.post('/Bill', notifController.sendNotifBill)
router.post('/OnDelivery', notifController.sendNotifOnDelivery)

module.exports = router