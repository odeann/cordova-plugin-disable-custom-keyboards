#import "DisableCustomKeyboards.h"
#import <objc/runtime.h>
#import <UIKit/UIKit.h>

@implementation DisableCustomKeyboards

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = NSClassFromString(@"AppDelegate");

        SEL originalSelector = @selector(application:shouldAllowExtensionPointIdentifier:);
        SEL swizzledSelector = @selector(xxx_application:shouldAllowExtensionPointIdentifier:);

        Method originalMethod = class_getInstanceMethod(class, originalSelector);
        Method swizzledMethod = class_getInstanceMethod(self, swizzledSelector);

        BOOL didAddMethod = class_addMethod(class,
                                            originalSelector,
                                            method_getImplementation(swizzledMethod),
                                            method_getTypeEncoding(swizzledMethod));

        if (didAddMethod) {
            class_replaceMethod(class,
                                swizzledSelector,
                                method_getImplementation(originalMethod),
                                method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
        NSLog(@"DisableCustomKeyboards loaded and methods swizzled");
    });
}

- (BOOL)xxx_application:(UIApplication *)application shouldAllowExtensionPointIdentifier:(NSString *)extensionPointIdentifier {
    NSLog(@"DisableCustomKeyboards xxx_application called with identifier: %@", extensionPointIdentifier);
    if ([extensionPointIdentifier isEqualToString:UIApplicationKeyboardExtensionPointIdentifier]) {
        return NO;
    }
    return YES;
}

@end
