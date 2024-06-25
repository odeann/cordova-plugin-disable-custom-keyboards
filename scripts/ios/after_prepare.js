#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var appDelegateFile = path.join(context.opts.projectRoot, 'platforms/ios', 'YOUR_PROJECT_NAME', 'Classes', 'AppDelegate.swift');

    if (fs.existsSync(appDelegateFile)) {
        var appDelegateContent = fs.readFileSync(appDelegateFile, 'utf-8');

        var importStatement = 'import DisableCustomKeyboardsble';
        var swizzleCall = 'DisableCustomKeyboardsble.swizzleAppDelegate()';

        if (!appDelegateContent.includes(importStatement)) {
            var lines = appDelegateContent.split('\n');
            lines.splice(1, 0, importStatement);
            appDelegateContent = lines.join('\n');
        }

        if (!appDelegateContent.includes(swizzleCall)) {
            var lines = appDelegateContent.split('\n');
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].includes('didFinishLaunchingWithOptions')) {
                    lines.splice(i + 1, 0, swizzleCall);
                    break;
                }
            }
            appDelegateContent = lines.join('\n');
        }

        fs.writeFileSync(appDelegateFile, appDelegateContent, 'utf-8');
    }
};
