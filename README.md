# Ionic 2 Ratwara Sahib app for Android/IOS

## android & ios Apps
- https://play.google.com/store/apps/details?id=io.ionic.ratwara.sahib&hl=en
- https://itunes.apple.com/us/app/ratwara-sahib-ji/id1176144539?ls=1&mt=8

## npm
- npm uninstall -g ionic
- npm install -g cordova
- npm install -g ionic
- npm install @ionic/app-scripts@latest --save-dev
- cordova plugin add cordova-sqlite-storage --save
- ionic info
- npm info cordova

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
- ionic plugin add cordova-plugin-google-analytics@1.0.0

### icon android bug
- cordova platform update android@https://github.com/apache/cordova-android

## default IOS
- ionic emulate ios

## particular IOS device
- ios-sim showdevicetypes
- xcrun simctl list devicetypes
- ionic emulate ios -l -c -s
- ionic build ios
- ionic emulate ios --target="iPhone-7-Plus"
- cordova emulate ios --target="iPad-Air"
- cordova emulate ios --target="iPhone-7" --provisioningProfile="AppStore.Ratwara" --codeSignIdentity="iPhone Distribution: Edwin Biemond (4VKB92ESAR)"
- ionic run ios
- rvm use system
- cordova run ios --provisioningProfile="AppStore.Ratwara" --codeSignIdentity="iPhone Distribution: Edwin Biemond (4VKB92ESAR)" --device

ionic run ios --device
See http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/

##Publish android
- ionic build android --prod --release
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\24.0.1\zipalign -v 4 c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/android-release-unsigned.apk c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/ratwara_sahib_app-release.apk

##Publish IOS
- open terminal, not vs
- rvm use system
- ionic build ios --prod --release
- open xcode 
- open workspace , not project
- select generic IOS device
- deselect automatically auto signing
- Product -> Scheme -> Edit Scheme to open the scheme editor. Next, select the Archive from the list on the left hand side. Make sure that the Build configuration is set to Release
- Product -> Archive
- Validate
- Upload
- goto https://itunesconnect.apple.com/

##Ionic.io
- ionic package build ios/android --profile dev
- ionic package build ios/android --profile prod --release
- ionic package list
- ionic package info x

## maps
- ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="" --variable API_KEY_FOR_IOS=""

## Push
- npm install @ionic/cloud-angular --save
- ionic io init

###IOS phonegap-plugin-push latest
- gem install cocoapods
- pod setup
- cd platforms/ios
- pod install
- npm install -g cocoapods-cli
- cordova plugin add phonegap-plugin-push --variable SENDER_ID=xxx --save

## audio
- ionic plugin add nl.kingsquare.cordova.background-audio

## pdf android
-  ionic plugin add cordova-plugin-android-native-pdfviewer

i18n
- cordova plugin add cordova-plugin-globalization