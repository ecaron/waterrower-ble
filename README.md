# A Bluetooth LE Cycling Power Service for the WaterRower S4

This adapter exposes the WaterRower S4 as a Bluetooth LE Cycling Power Service peripheral, offering notifications for power data and stroke rate (cadence). In addition, the heart rate will be also exposed through BLE if a heart monitor is connected to the S4 via ANT+ (you can purchase directly from WaterRower an internal or external ANT+ antenna for the S4).

Once setup the rower erg appears in all applications that accept BLE peripherals for power, cadence and heart rate, e.g. Zwift!

**Now, be warned ... this code is just a quick Friday afternoon hack!! Use at your own risk!**

In order for this BLE adapter to work:

* The WaterRower needs to be connected to a computer via USB from the S4 monitor.
* The computer needs to have installed the Prolific PL2303 USB to serial adapter driver. This is OS specific.
* The computer needs a BLE adapter. All modern Apple Mac have this.

As a cool weekend project to the reader, you could put this code in a Raspberry Pi and have the S4 always on BLE.