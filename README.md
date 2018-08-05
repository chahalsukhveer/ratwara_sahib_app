# Ionic 3 Ratwara Sahib app for Android/IOS

## features
- for IOS & Android
- lazy loading
- i18n internalization
- native google maps
- playing audio
- displaying youtube and live videos
- news based on wordpress
- push notifications and integration with ionic cloud & google firebase
- display pdf's
- page google analytics

## android & ios Apps
- https://play.google.com/store/apps/details?id=io.ionic.ratwara.sahib&hl=en
- https://itunes.apple.com/us/app/ratwara-sahib-ji/id1176144539?ls=1&mt=8

## npm
- npm uninstall -g ionic
- npm install -g cordova@latest
- npm install -g ionic@latest
- npm install @ionic/app-scripts@2.1.4 --save-dev
- npm install ionic-angular@3.7.1 --save
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
- ionic cordova platform add android@6.4.0
- ionic cordova platform add ios
- ionic plugin add cordova-plugin-inappbrowser
- ionic plugin add cordova-plugin-google-analytics


## default IOS
- ionic cordova emulate ios

## particular IOS device
- ios-sim showdevicetypes
- xcrun simctl list devicetypes
- ionic cordova emulate ios -l -c -s
- ionic cordova build ios
- ionic cordova emulate ios --target="iPhone-7-Plus"
- ionic cordova emulate ios --target="iPhone-7"
- cordova emulate ios --target="iPad-Air"
- cordova emulate ios --target="iPhone-7" --provisioningProfile="AppStore.Ratwara" --codeSignIdentity="iPhone Distribution: Edwin Biemond (4VKB92ESAR)"
- ionic cordova run ios
- rvm use system
- cordova run ios --provisioningProfile="AppStore.Ratwara" --codeSignIdentity="iPhone Distribution: Edwin Biemond (4VKB92ESAR)" --device

ionic run ios --device
See http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/

##Publish android
- ionic cordova build android --prod --release
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/release/android-release-unsigned.apk suk_keye
- C:\Users\chaha\AppData\Local\Android\sdk\build-tools\27.0.1\zipalign -v 4 c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/release/android-release-unsigned.apk c:/projects/ratwara_sahib_app/platforms/android/build/outputs/apk/release/ratwara_sahib_app-release.apk

##Publish IOS
- rvm use system
- ionic cordova build ios --prod --release
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


###IOS phonegap-plugin-push latest
```
gem install cocoapods
pod setup
cd platforms/ios
pod install
npm install -g cocoapods-cli
```

##one-sginal
- ionic cordova plugin add onesignal-cordova-plugin --save
- npm install --save @ionic-native/onesignal


## audio
- ionic plugin add nl.kingsquare.cordova.background-audio

## pdf android
-  ionic plugin add cordova-plugin-android-native-pdfviewer

## google analytics
http://masteringionic.com/blog/2017-03-20-resolving-the-itunes-connect-idfa-warning-when-using-the-cordova-google-analytics-plugin/

## auth0
- ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=io.ionic.ratwara.sahib --variable ANDROID_SCHEME=io.ionic.ratwara.sahib --variable ANDROID_HOST=biemond.eu.auth0.com --variable ANDROID_PATHPREFIX=/cordova/io.ionic.ratwara.sahib/callback
- ionic cordova plugin add cordova-plugin-safariviewcontroller

## version
- ionic cordova plugin add cordova-plugin-app-version
- npm install @ionic-native/app-version


## instagram
http://www.ucodice.com/articles/how-to-display-instagram-uploaded-images-on-website/