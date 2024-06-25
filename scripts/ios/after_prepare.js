#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var appDelegateHeader = path.join(context.opts.projectRoot, 'platforms/ios', 'YOUR_PROJECT_NAME', 'Classes', 'AppDelegate.h');

    if (fs.existsSync(appDelegateHeader)) {
        var headerContent = fs.readFileSync(appDelegateHeader, 'utf-8');
        var importStatement = '#import "DisableCustomKeyboards.h"';

        if (!headerContent.includes(importStatement)) {
            var lines = headerContent.split('\n');
            lines.splice(1, 0, importStatement);
            headerContent = lines.join('\n');
            fs.writeFileSync(appDelegateHeader, headerContent, 'utf-8');
        }
    }

    var appDelegateImplementation = path.join(context.opts.projectRoot, 'platforms/ios', 'YOUR_PROJECT_NAME', 'Classes', 'AppDelegate.m');

    if (fs.existsSync(appDelegateImplementation)) {
        var implementationContent = fs.readFileSync(appDelegateImplementation, 'utf-8');
        var importStatement = '#import "DisableCustomKeyboards.h"';

        if (!implementationContent.includes(importStatement)) {
            var lines = implementationContent.split('\n');
            lines.splice(1, 0, importStatement);
            implementationContent = lines.join('\n');
            fs.writeFileSync(appDelegateImplementation, implementationContent, 'utf-8');
        }
    }
};
