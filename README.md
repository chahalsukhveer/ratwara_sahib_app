# Ionic 2 Ratwara Sahib app for Android/IOS

## npm
- npm install -g cordova
- npm install -g ionic
- npm install @ionic/app-scripts@latest --save-dev
- ionic info

## Make it work
- git clone https://github.com/chahalsukhveer/ratwara_sahib_app
- cd ratwara_sahib_app
- npm install
- ionic serve

## Manual install plugin
- cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
- npm install -g ios-sim
- npm install -g ios-deploy

## Add platforms
- ionic platform add android
- ionic platform add ios

### icon android bug
- cordova platform update android@https://github.com/apache/cordova-android

## default IOS
- ionic emulate ios

## particular IOS device
- ios-sim showdevicetypes
- cordova emulate ios --target="iPad-Air"

ionic run ios --device
See http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/

##Publish
- cordova build --release android
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\24.0.1\zipalign -v 4 c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/ratwara_sahib_app-release.apk
