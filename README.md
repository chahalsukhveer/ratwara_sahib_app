# Ionic 2 Ratwara Sahib app for Android/IOS

## Make it work
- git clone https://github.com/chahalsukhveer/ratwara_sahib_app
- cd ratwara_sahib_app
- npm install
- ionic serve

## Manual install plugin
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
npm install -g ios-sim
npm install -g ios-deploy

## Add platforms
ionic platform add android
ionic platform add ios

## default IOS
ionic emulate ios

## particular IOS device
ios-sim showdevicetypes
cordova emulate ios --target="iPad-Air"