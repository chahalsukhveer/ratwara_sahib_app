#!/usr/bin/env node

var filestocopy = [{
    "resources/android/icon/drawable-hdpi-icon.png":
        "platforms/android/res/drawable-hdpi/icon_notification.png"
}, {
    "resources/android/icon/drawable-mdpi-icon.png":
        "platforms/android/res/drawable-mdpi/icon_notification.png"
}, {
    "resources/android/icon/drawable-xhdpi-icon.png":
        "platforms/android/res/drawable-xhdpi/icon_notification.png"
}, {
    "resources/android/icon/drawable-xxhdpi-icon.png":
        "platforms/android/res/drawable-xxhdpi/icon_notification.png"
}, {
    "resources/android/icon/drawable-xxxhdpi-icon.png":
        "platforms/android/res/drawable-xxxhdpi/icon_notification.png"
} ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
                fs.createWriteStream(destfile));
        }
    });
});