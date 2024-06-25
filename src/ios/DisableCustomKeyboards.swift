import UIKit

@objc(DisableCustomKeyboards) class DisableCustomKeyboards: NSObject {
    @objc static func swizzleAppDelegate() {
        let originalSelector = #selector(UIApplicationDelegate.application(_:shouldAllowExtensionPointIdentifier:))
        let swizzledSelector = #selector(swizzled_application(_:shouldAllowExtensionPointIdentifier:))
        
        if let originalMethod = class_getInstanceMethod(AppDelegate.self, originalSelector),
           let swizzledMethod = class_getInstanceMethod(AppDelegate.self, swizzledSelector) {
            method_exchangeImplementations(originalMethod, swizzledMethod)
        }
    }
    
    @objc func swizzled_application(_ application: UIApplication, shouldAllowExtensionPointIdentifier extensionPointIdentifier: UIApplication.ExtensionPointIdentifier) -> Bool {
        if extensionPointIdentifier == .keyboard {
            return false
        }
        return true
    }
}
