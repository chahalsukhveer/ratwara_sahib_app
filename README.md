# Ionic 2 Ratwara Sahib app for Android/IOS

## android & ios Apps
- https://play.google.com/store/apps/details?id=io.ionic.ratwara.sahib&hl=en
- https://itunes.apple.com/us/app/ratwara-sahib-ji/id1176144539?ls=1&mt=8

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
- ionic plugin add cordova-plugin-inappbrowser

### icon android bug
- cordova platform update android@https://github.com/apache/cordova-android

## default IOS
- ionic emulate ios

## particular IOS device
- ios-sim showdevicetypes
- ionic emulate ios -l -c -s
- cordova emulate ios --target="iPad-Air"
- cordova emulate ios --target="iPhone-7"

ionic run ios --device
See http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/

##Publish android
- cordova build --release android
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\24.0.1\zipalign -v 4 c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/ratwara_sahib_app-release.apk

##Publish IOS
- ionic build ios --release
- open xcode
- open project
- select generic IOS device
- deselect automatically auto signing
- Product -> Scheme -> Edit Scheme to open the scheme editor. Next, select the Archive from the list on the left hand side. Make sure that the Build configuration is set to Release
- Product -> Archive
- Validate
- Upload
- goto https://itunesconnect.apple.com/