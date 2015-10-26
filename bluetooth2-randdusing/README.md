use this plugin: http://phonegap-plugins.com/plugins/randdusing/bluetoothle

## Supported platforms ##

* Cordova 3.0.0 or higher
* Android 4.3 or higher
* iOS 7 or higher
* Windows Phone 8.1 (Tested on Nokia Lumia 630)
* Device hardware must be certified for Bluetooth LE. i.e. Nexus 7 (2012) doesn't support Bluetooth LE even after upgrading to 4.3 (or higher) without a modification
* List of devices: http://www.bluetooth.com/Pages/Bluetooth-Smart-Devices-List.aspx


## Limitations / Issues ##

* Tested mostly with a heart rate monitor, so some scenarios especially those involving writing characteristics / descriptors may not work or are poorly documented
* Windows Phone 8 support is limited for the time being. I'm not sure when I'll begin working on this...
* No queueing support for read/write operations
* Disconnecting and quickly reconnecting causes issues on Android. The device becomes connected again, but then quickly disconnects. Adding a timeout before reconnecting fixed the issue for me. I'm not sure if this is a problem with the plugin or Android's Bluetooth LE implementation.
* For subscribing, indication hasn't been tested since my heart rate monitor doesn't support it.
* Characteristic and descriptor permissions are not returned during discovery. If anyone requests this, I should be able to add it fairly easily, at least for Android.


# test result

## android
可以检测到BP3L，但是BP5不行，API都可以用

## iOS
可以检测到BP3L，但是BP5不行，API部分不可用：不能开关蓝牙，但是扫描等可以用！
