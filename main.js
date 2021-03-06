require('dotenv').config()
const debug = require('debug')('waterrower-game:main')
const express = require('express')
const path = require('path')
const S4 = require('./s4')
const memoryMap = require('./s4/memory-map')
const UsbPeripheral = require('./usb-peripheral')

const app = express()

const mainUsb = async function (testMode) {
  const rower = new S4(memoryMap)
  if (testMode) {
    return rower.fakeRower()
  }
  const rowerPort = await rower.findPort()
  if (rowerPort !== false) {
    return rower.startRower()
  }
  // wait till we get the right serial
  debug('[Init] Awaiting WaterRower S4.2 to be connected to USB port')

  // monitor USB attach and detach events
  const usbPeripheral = new UsbPeripheral()
  usbPeripheral.monitorWr(function () {
    rower.startRower()
  }, rower.stopRower(rower))
}

const main = function () {
  mainUsb(process.env.TEST_MODE)

  app.get('/memory.json', function (req, res) {
    if (process.env.DEV) {
      memoryMap.forEach(response => {
        if (typeof response.value === 'undefined') response.value = 1
        else response.value++
      })
    }
    res.send(memoryMap)
  })
  app.get('/reset', function (req, res) {
    memoryMap.forEach(response => {
      response.value = 0
    })
    res.redirect('/')
  })

  app.use('/chart', express.static(path.join(__dirname, 'node_modules', 'chart.js', 'dist')))
  app.use(express.static(path.join(__dirname, 'public')))
  app.listen(process.env.PORT || 8000)
}

main()
