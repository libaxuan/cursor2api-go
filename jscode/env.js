let new_toggle = true;
let my_env_temp = {};

function setAccessorNamePropertyDescriptor(type, prototype, name, configurable, enumerable, writable, value) {
    if (type === 'get') {
        Object.defineProperty(Object.getOwnPropertyDescriptor(prototype, name).get, 'name', {
            configurable: configurable,
            enumerable: enumerable,
            writable: writable,
            value: value
        })
    }
    if (type === 'set') {
        Object.defineProperty(Object.getOwnPropertyDescriptor(prototype, name).get, 'name', {
            configurable: configurable,
            enumerable: enumerable,
            writable: writable,
            value: value
        })
    }
}


!function () {

    const MyGetOwnPropertySymbols = Object.getOwnPropertySymbols;

    Object.getOwnPropertySymbols = function getOwnPropertySymbols() {
        const result = MyGetOwnPropertySymbols.apply(this, arguments);
        return result.filter(symbol => symbol.toString().indexOf("myToString") === -1);
    };


    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('myToString('.concat('', ')_', (Math.random()) + '').toString(36))
    const myToString = function () {
        return typeof this === 'function' && this[myFunction_toString_symbol] || $toString.call(this)
    }

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
        })
    }

    //先删除所有函数的toString方法
    delete Function.prototype.toString
    //在重定义一个所有函数公用的toString方法
    set_native(Function.prototype, "toString", myToString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }")
    set_native(Object.getOwnPropertySymbols, myFunction_toString_symbol, `function getOwnPropertySymbols() { [native code] }`)
    global.func_set_native = (func) => {
        set_native(func, myFunction_toString_symbol, `function ${func.name || ''}() { [native code] }`)
    }
    global.func_set_native_Div = (func, name) => {
        set_native(func, myFunction_toString_symbol, `function ${name || ''}() { [native code] }`)
    }
    global.antiToString = (func) => {
        set_native(func, myFunction_toString_symbol, `function ${func.name || ''}() { [native code] }`)
        return func
    }
}()

window = global;

// ====== 原型链 ======

Object.defineProperty(window, "EventTarget", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function EventTarget() {
    })
});

Object.defineProperties(EventTarget.prototype, {
    addEventListener: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function addEventListener() {
        }),
    },
    dispatchEvent: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function dispatchEvent() {
            debugger;
        }),
    },
    removeEventListener: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function removeEventListener() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function EventTarget() {
            debugger;
        }),
    },
    when: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function when() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "EventTarget",},

})

let WindowProperties = {};
Object.defineProperties(WindowProperties, {
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "WindowProperties",},

})

Object.setPrototypeOf(WindowProperties, EventTarget.prototype);

Object.defineProperty(window, "Window", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function Window() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(Window.prototype, {
    TEMPORARY: {configurable: false, enumerable: true, writable: false, value: 0,},
    PERSISTENT: {configurable: false, enumerable: true, writable: false, value: 1,},
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function Window() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "Window",},

})

Object.setPrototypeOf(Window.prototype, WindowProperties);

window = new Window();


Object.defineProperty(window, "EventTarget", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: global.EventTarget
});

Object.defineProperty(window, "Window", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: global.Window
});

Object.defineProperty(window, "Navigator", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function Navigator() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.Navigator.prototype, {
    vendorSub: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }),
    },
    productSub: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "20030107";
        }),
    },
    vendor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "Google Inc.";
        }),
    },
    maxTouchPoints: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 0;
        }),
    },
    scheduling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    userActivation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    doNotTrack: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }),
    },
    geolocation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    plugins: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    mimeTypes: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    pdfViewerEnabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return true;
        }),
    },
    webkitTemporaryStorage: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitPersistentStorage: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    brave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    globalPrivacyControl: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return true;
        }),
    },
    windowControlsOverlay: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    hardwareConcurrency: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 32;
        }),
    },
    cookieEnabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return true;
        }),
    },
    appCodeName: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "Mozilla";
        }),
    },
    appName: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "Netscape";
        }),
    },
    appVersion: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";
        }),
    },
    platform: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "Win32";
        }),
    },
    product: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "Gecko";
        }),
    },
    userAgent: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return global.cursor_config.fp.userAgent;
        }),
    },
    language: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "zh-CN";
        }),
    },
    languages: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onLine: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return true;
        }),
    },
    webdriver: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }),
    },
    getGamepads: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getGamepads() {
            debugger;
        }),
    },
    javaEnabled: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function javaEnabled() {
            debugger;
        }),
    },
    sendBeacon: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function sendBeacon() {
            debugger;
        }),
    },
    vibrate: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function vibrate() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function Navigator() {
            debugger;
        }),
    },
    bluetooth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    storageBuckets: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    clipboard: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    credentials: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    keyboard: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    managed: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    mediaDevices: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    storage: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    serviceWorker: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    virtualKeyboard: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    wakeLock: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    deviceMemory: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 8;
        }),
    },
    userAgentData: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    ink: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    mediaCapabilities: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    devicePosture: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    hid: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    locks: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    gpu: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    mediaSession: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    permissions: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    presentation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    serial: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    usb: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    xr: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    canShare: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function canShare() {
            debugger;
        }),
    },
    share: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function share() {
            debugger;
        }),
    },
    clearAppBadge: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clearAppBadge() {
            debugger;
        }),
    },
    getBattery: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getBattery() {
            debugger;
        }),
    },
    getUserMedia: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getUserMedia() {
            debugger;
        }),
    },
    requestMIDIAccess: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestMIDIAccess() {
            debugger;
        }),
    },
    requestMediaKeySystemAccess: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestMediaKeySystemAccess() {
            debugger;
        }),
    },
    setAppBadge: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function setAppBadge() {
            debugger;
        }),
    },
    webkitGetUserMedia: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitGetUserMedia() {
            debugger;
        }),
    },
    getInstalledRelatedApps: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getInstalledRelatedApps() {
            debugger;
        }),
    },
    registerProtocolHandler: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function registerProtocolHandler() {
            debugger;
        }),
    },
    unregisterProtocolHandler: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function unregisterProtocolHandler() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "Navigator",},

})
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "vendorSub", true, false, false, "get vendorSub");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "productSub", true, false, false, "get productSub");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "vendor", true, false, false, "get vendor");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "maxTouchPoints", true, false, false, "get maxTouchPoints");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "scheduling", true, false, false, "get scheduling");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "userActivation", true, false, false, "get userActivation");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "doNotTrack", true, false, false, "get doNotTrack");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "geolocation", true, false, false, "get geolocation");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "plugins", true, false, false, "get plugins");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "mimeTypes", true, false, false, "get mimeTypes");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "pdfViewerEnabled", true, false, false, "get pdfViewerEnabled");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "webkitTemporaryStorage", true, false, false, "get webkitTemporaryStorage");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "webkitPersistentStorage", true, false, false, "get webkitPersistentStorage");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "brave", true, false, false, "get brave");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "globalPrivacyControl", true, false, false, "get globalPrivacyControl");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "windowControlsOverlay", true, false, false, "get windowControlsOverlay");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "hardwareConcurrency", true, false, false, "get hardwareConcurrency");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "cookieEnabled", true, false, false, "get cookieEnabled");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "appCodeName", true, false, false, "get appCodeName");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "appName", true, false, false, "get appName");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "appVersion", true, false, false, "get appVersion");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "platform", true, false, false, "get platform");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "product", true, false, false, "get product");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "userAgent", true, false, false, "get userAgent");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "language", true, false, false, "get language");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "languages", true, false, false, "get languages");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "onLine", true, false, false, "get onLine");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "webdriver", true, false, false, "get webdriver");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "bluetooth", true, false, false, "get bluetooth");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "storageBuckets", true, false, false, "get storageBuckets");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "clipboard", true, false, false, "get clipboard");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "credentials", true, false, false, "get credentials");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "keyboard", true, false, false, "get keyboard");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "managed", true, false, false, "get managed");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "mediaDevices", true, false, false, "get mediaDevices");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "storage", true, false, false, "get storage");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "serviceWorker", true, false, false, "get serviceWorker");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "virtualKeyboard", true, false, false, "get virtualKeyboard");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "wakeLock", true, false, false, "get wakeLock");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "deviceMemory", true, false, false, "get deviceMemory");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "userAgentData", true, false, false, "get userAgentData");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "ink", true, false, false, "get ink");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "mediaCapabilities", true, false, false, "get mediaCapabilities");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "devicePosture", true, false, false, "get devicePosture");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "hid", true, false, false, "get hid");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "locks", true, false, false, "get locks");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "gpu", true, false, false, "get gpu");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "mediaSession", true, false, false, "get mediaSession");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "permissions", true, false, false, "get permissions");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "presentation", true, false, false, "get presentation");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "serial", true, false, false, "get serial");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "usb", true, false, false, "get usb");
setAccessorNamePropertyDescriptor('get', window.Navigator.prototype, "xr", true, false, false, "get xr");


Object.defineProperty(window, "Node", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function Node() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.Node.prototype, {
    nodeType: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    nodeName: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    baseURI: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    isConnected: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    ownerDocument: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    parentNode: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    parentElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    childNodes: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    firstChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    lastChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    previousSibling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    nextSibling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    nodeValue: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    textContent: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ELEMENT_NODE: {configurable: false, enumerable: true, writable: false, value: 1,},
    ATTRIBUTE_NODE: {configurable: false, enumerable: true, writable: false, value: 2,},
    TEXT_NODE: {configurable: false, enumerable: true, writable: false, value: 3,},
    CDATA_SECTION_NODE: {configurable: false, enumerable: true, writable: false, value: 4,},
    ENTITY_REFERENCE_NODE: {configurable: false, enumerable: true, writable: false, value: 5,},
    ENTITY_NODE: {configurable: false, enumerable: true, writable: false, value: 6,},
    PROCESSING_INSTRUCTION_NODE: {configurable: false, enumerable: true, writable: false, value: 7,},
    COMMENT_NODE: {configurable: false, enumerable: true, writable: false, value: 8,},
    DOCUMENT_NODE: {configurable: false, enumerable: true, writable: false, value: 9,},
    DOCUMENT_TYPE_NODE: {configurable: false, enumerable: true, writable: false, value: 10,},
    DOCUMENT_FRAGMENT_NODE: {configurable: false, enumerable: true, writable: false, value: 11,},
    NOTATION_NODE: {configurable: false, enumerable: true, writable: false, value: 12,},
    DOCUMENT_POSITION_DISCONNECTED: {configurable: false, enumerable: true, writable: false, value: 1,},
    DOCUMENT_POSITION_PRECEDING: {configurable: false, enumerable: true, writable: false, value: 2,},
    DOCUMENT_POSITION_FOLLOWING: {configurable: false, enumerable: true, writable: false, value: 4,},
    DOCUMENT_POSITION_CONTAINS: {configurable: false, enumerable: true, writable: false, value: 8,},
    DOCUMENT_POSITION_CONTAINED_BY: {configurable: false, enumerable: true, writable: false, value: 16,},
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {configurable: false, enumerable: true, writable: false, value: 32,},
    appendChild: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function appendChild(aChild) {
            console.log(`${this} -> appendChild -> ${appendChild}`)
            return aChild;
        }),
    },
    cloneNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function cloneNode() {
            debugger;
        }),
    },
    compareDocumentPosition: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function compareDocumentPosition() {
            debugger;
        }),
    },
    contains: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function contains() {
            debugger;
        }),
    },
    getRootNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getRootNode() {
            debugger;
        }),
    },
    hasChildNodes: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hasChildNodes() {
            debugger;
        }),
    },
    insertBefore: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function insertBefore() {
            debugger;
        }),
    },
    isDefaultNamespace: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function isDefaultNamespace() {
            debugger;
        }),
    },
    isEqualNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isEqualNode() {
            debugger;
        }),
    },
    isSameNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isSameNode() {
            debugger;
        }),
    },
    lookupNamespaceURI: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function lookupNamespaceURI() {
            debugger;
        }),
    },
    lookupPrefix: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function lookupPrefix() {
            debugger;
        }),
    },
    normalize: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function normalize() {
            debugger;
        }),
    },
    removeChild: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function removeChild() {
            debugger;
        }),
    },
    replaceChild: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function replaceChild() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function Node() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "Node",},

})
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "nodeType", true, false, false, "get nodeType");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "nodeName", true, false, false, "get nodeName");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "baseURI", true, false, false, "get baseURI");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "isConnected", true, false, false, "get isConnected");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "ownerDocument", true, false, false, "get ownerDocument");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "parentNode", true, false, false, "get parentNode");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "parentElement", true, false, false, "get parentElement");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "childNodes", true, false, false, "get childNodes");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "firstChild", true, false, false, "get firstChild");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "lastChild", true, false, false, "get lastChild");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "previousSibling", true, false, false, "get previousSibling");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "nextSibling", true, false, false, "get nextSibling");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "nodeValue", true, false, false, "get nodeValue");
setAccessorNamePropertyDescriptor('set', window.Node.prototype, "nodeValue", true, false, false, "set nodeValue");
setAccessorNamePropertyDescriptor('get', window.Node.prototype, "textContent", true, false, false, "get textContent");
setAccessorNamePropertyDescriptor('set', window.Node.prototype, "textContent", true, false, false, "set textContent");

Object.setPrototypeOf(window.Node.prototype, EventTarget.prototype);

Object.defineProperty(window, "Document", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function Document() {
    })
});

Object.defineProperties(window.Document.prototype, {
    implementation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    URL: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    documentURI: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    compatMode: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    characterSet: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    charset: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    inputEncoding: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    contentType: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    doctype: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    documentElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return my_env_temp.documentElement;
        }),
    },
    xmlEncoding: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    xmlVersion: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    xmlStandalone: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    domain: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    referrer: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    cookie: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    lastModified: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    readyState: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    title: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    dir: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    body: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return my_env_temp.body;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    head: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    images: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    embeds: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    plugins: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    links: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    forms: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    scripts: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    currentScript: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return my_env_temp.currentScript;
        }),
    },
    defaultView: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    designMode: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onreadystatechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    anchors: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    applets: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    fgColor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    linkColor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    vlinkColor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    alinkColor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    bgColor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    all: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    scrollingElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onpointerlockchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerlockerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    hidden: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    visibilityState: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    wasDiscarded: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    prerendering: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    featurePolicy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitVisibilityState: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitHidden: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onbeforecopy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforecut: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforepaste: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfreeze: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onprerenderingchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onresume: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsearch: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onvisibilitychange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    timeline: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    fullscreenEnabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    fullscreen: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfullscreenchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfullscreenerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    webkitIsFullScreen: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitCurrentFullScreenElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitFullscreenEnabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    webkitFullscreenElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onwebkitfullscreenchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitfullscreenerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    rootElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    pictureInPictureEnabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onbeforexrselect: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onabort: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforeinput: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforematch: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforetoggle: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onblur: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncanplay: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncanplaythrough: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onclose: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontentvisibilityautostatechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextlost: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextmenu: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextrestored: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncuechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondblclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondrag: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondrop: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondurationchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onemptied: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onended: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfocus: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onformdata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oninput: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oninvalid: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeydown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeypress: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeyup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onload: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadeddata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadedmetadata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousedown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousemove: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousewheel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpause: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onplay: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onplaying: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onprogress: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onratechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onreset: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onresize: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscroll: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsecuritypolicyviolation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onseeked: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onseeking: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselect: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onslotchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onstalled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsubmit: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsuspend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontimeupdate: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontoggle: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onvolumechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwaiting: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationiteration: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkittransitionend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwheel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onauxclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ongotpointercapture: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onlostpointercapture: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerdown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointermove: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerrawupdate: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointercancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselectstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselectionchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationiteration: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionrun: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitioncancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncopy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncut: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpaste: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    children: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    firstElementChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    lastElementChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    childElementCount: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    activeElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    styleSheets: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    pointerLockElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    fullscreenElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    adoptedStyleSheets: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    pictureInPictureElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    fonts: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    adoptNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function adoptNode() {
            debugger;
        }),
    },
    append: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function append() {
            debugger;
        }),
    },
    captureEvents: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function captureEvents() {
            debugger;
        }),
    },
    caretRangeFromPoint: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function caretRangeFromPoint() {
            debugger;
        }),
    },
    clear: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clear() {
            debugger;
        }),
    },
    close: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function close() {
            debugger;
        }),
    },
    createAttribute: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createAttribute() {
            debugger;
        }),
    },
    createAttributeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createAttributeNS() {
            debugger;
        }),
    },
    createCDATASection: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createCDATASection() {
            debugger;
        }),
    },
    createComment: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createComment() {
            debugger;
        }),
    },
    createDocumentFragment: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createDocumentFragment() {
            debugger;
        }),
    },
    createElement: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createElement(tagName, options) {
            switch (tagName) {
                case 'canvas':
                    return my_env_temp.canvas;
                case 'iframe':
                    return my_env_temp.iframe;
            }
        }),
    },
    createElementNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createElementNS() {
            debugger;
        }),
    },
    createEvent: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createEvent() {
            debugger;
        }),
    },
    createExpression: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createExpression() {
            debugger;
        }),
    },
    createNSResolver: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createNSResolver() {
            debugger;
        }),
    },
    createNodeIterator: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createNodeIterator() {
            debugger;
        }),
    },
    createProcessingInstruction: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createProcessingInstruction() {
            debugger;
        }),
    },
    createRange: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createRange() {
            debugger;
        }),
    },
    createTextNode: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createTextNode() {
            debugger;
        }),
    },
    createTreeWalker: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createTreeWalker() {
            debugger;
        }),
    },
    elementFromPoint: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function elementFromPoint() {
            debugger;
        }),
    },
    elementsFromPoint: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function elementsFromPoint() {
            debugger;
        }),
    },
    evaluate: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function evaluate() {
            debugger;
        }),
    },
    execCommand: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function execCommand() {
            debugger;
        }),
    },
    exitFullscreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function exitFullscreen() {
            debugger;
        }),
    },
    exitPictureInPicture: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function exitPictureInPicture() {
            debugger;
        }),
    },
    exitPointerLock: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function exitPointerLock() {
            debugger;
        }),
    },
    getAnimations: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getAnimations() {
            debugger;
        }),
    },
    getElementById: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementById() {
            debugger;
        }),
    },
    getElementsByClassName: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByClassName() {
            debugger;
        }),
    },
    getElementsByName: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByName() {
            debugger;
        }),
    },
    getElementsByTagName: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByTagName() {
            debugger;
        }),
    },
    getElementsByTagNameNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByTagNameNS() {
            debugger;
        }),
    },
    getSelection: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getSelection() {
            debugger;
        }),
    },
    hasFocus: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hasFocus() {
            debugger;
        }),
    },
    hasStorageAccess: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function hasStorageAccess() {
            debugger;
        }),
    },
    hasUnpartitionedCookieAccess: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function hasUnpartitionedCookieAccess() {
            debugger;
        }),
    },
    importNode: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function importNode() {
            debugger;
        }),
    },
    moveBefore: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function moveBefore() {
            debugger;
        }),
    },
    open: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function open() {
            debugger;
        }),
    },
    prepend: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function prepend() {
            debugger;
        }),
    },
    queryCommandEnabled: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function queryCommandEnabled() {
            debugger;
        }),
    },
    queryCommandIndeterm: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function queryCommandIndeterm() {
            debugger;
        }),
    },
    queryCommandState: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function queryCommandState() {
            debugger;
        }),
    },
    queryCommandSupported: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function queryCommandSupported() {
            debugger;
        }),
    },
    queryCommandValue: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function queryCommandValue() {
            debugger;
        }),
    },
    querySelector: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function querySelector() {
            debugger;
        }),
    },
    querySelectorAll: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function querySelectorAll() {
            debugger;
        }),
    },
    releaseEvents: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function releaseEvents() {
            debugger;
        }),
    },
    replaceChildren: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function replaceChildren() {
            debugger;
        }),
    },
    requestStorageAccess: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestStorageAccess() {
            debugger;
        }),
    },
    requestStorageAccessFor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestStorageAccessFor() {
            debugger;
        }),
    },
    startViewTransition: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function startViewTransition() {
            debugger;
        }),
    },
    webkitCancelFullScreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitCancelFullScreen() {
            debugger;
        }),
    },
    webkitExitFullscreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitExitFullscreen() {
            debugger;
        }),
    },
    write: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function write() {
            debugger;
        }),
    },
    writeln: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function writeln() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function Document() {
            debugger;
        }),
    },
    fragmentDirective: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    oncommand: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollsnapchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollsnapchanging: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    caretPositionFromPoint: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function caretPositionFromPoint() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "Document",},
    [Symbol.unscopables]: {
        configurable: true, enumerable: false, writable: false, value: {
            "append": true,
            "fullscreen": true,
            "prepend": true,
            "replaceChildren": true
        },
    },

})
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "implementation", true, false, false, "get implementation");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "URL", true, false, false, "get URL");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "documentURI", true, false, false, "get documentURI");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "compatMode", true, false, false, "get compatMode");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "characterSet", true, false, false, "get characterSet");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "charset", true, false, false, "get charset");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "inputEncoding", true, false, false, "get inputEncoding");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "contentType", true, false, false, "get contentType");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "doctype", true, false, false, "get doctype");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "documentElement", true, false, false, "get documentElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "xmlEncoding", true, false, false, "get xmlEncoding");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "xmlVersion", true, false, false, "get xmlVersion");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "xmlVersion", true, false, false, "set xmlVersion");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "xmlStandalone", true, false, false, "get xmlStandalone");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "xmlStandalone", true, false, false, "set xmlStandalone");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "domain", true, false, false, "get domain");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "domain", true, false, false, "set domain");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "referrer", true, false, false, "get referrer");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "cookie", true, false, false, "get cookie");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "cookie", true, false, false, "set cookie");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "lastModified", true, false, false, "get lastModified");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "readyState", true, false, false, "get readyState");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "title", true, false, false, "get title");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "title", true, false, false, "set title");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "dir", true, false, false, "get dir");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "dir", true, false, false, "set dir");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "body", true, false, false, "get body");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "body", true, false, false, "set body");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "head", true, false, false, "get head");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "images", true, false, false, "get images");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "embeds", true, false, false, "get embeds");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "plugins", true, false, false, "get plugins");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "links", true, false, false, "get links");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "forms", true, false, false, "get forms");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "scripts", true, false, false, "get scripts");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "currentScript", true, false, false, "get currentScript");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "defaultView", true, false, false, "get defaultView");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "designMode", true, false, false, "get designMode");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "designMode", true, false, false, "set designMode");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onreadystatechange", true, false, false, "get onreadystatechange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onreadystatechange", true, false, false, "set onreadystatechange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "anchors", true, false, false, "get anchors");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "applets", true, false, false, "get applets");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fgColor", true, false, false, "get fgColor");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "fgColor", true, false, false, "set fgColor");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "linkColor", true, false, false, "get linkColor");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "linkColor", true, false, false, "set linkColor");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "vlinkColor", true, false, false, "get vlinkColor");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "vlinkColor", true, false, false, "set vlinkColor");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "alinkColor", true, false, false, "get alinkColor");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "alinkColor", true, false, false, "set alinkColor");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "bgColor", true, false, false, "get bgColor");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "bgColor", true, false, false, "set bgColor");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "all", true, false, false, "get all");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "scrollingElement", true, false, false, "get scrollingElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerlockchange", true, false, false, "get onpointerlockchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerlockchange", true, false, false, "set onpointerlockchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerlockerror", true, false, false, "get onpointerlockerror");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerlockerror", true, false, false, "set onpointerlockerror");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "hidden", true, false, false, "get hidden");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "visibilityState", true, false, false, "get visibilityState");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "wasDiscarded", true, false, false, "get wasDiscarded");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "prerendering", true, false, false, "get prerendering");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "featurePolicy", true, false, false, "get featurePolicy");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitVisibilityState", true, false, false, "get webkitVisibilityState");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitHidden", true, false, false, "get webkitHidden");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforecopy", true, false, false, "get onbeforecopy");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforecopy", true, false, false, "set onbeforecopy");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforecut", true, false, false, "get onbeforecut");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforecut", true, false, false, "set onbeforecut");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforepaste", true, false, false, "get onbeforepaste");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforepaste", true, false, false, "set onbeforepaste");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onfreeze", true, false, false, "get onfreeze");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onfreeze", true, false, false, "set onfreeze");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onprerenderingchange", true, false, false, "get onprerenderingchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onprerenderingchange", true, false, false, "set onprerenderingchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onresume", true, false, false, "get onresume");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onresume", true, false, false, "set onresume");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onsearch", true, false, false, "get onsearch");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onsearch", true, false, false, "set onsearch");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onvisibilitychange", true, false, false, "get onvisibilitychange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onvisibilitychange", true, false, false, "set onvisibilitychange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "timeline", true, false, false, "get timeline");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fullscreenEnabled", true, false, false, "get fullscreenEnabled");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "fullscreenEnabled", true, false, false, "set fullscreenEnabled");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fullscreen", true, false, false, "get fullscreen");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "fullscreen", true, false, false, "set fullscreen");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onfullscreenchange", true, false, false, "get onfullscreenchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onfullscreenchange", true, false, false, "set onfullscreenchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onfullscreenerror", true, false, false, "get onfullscreenerror");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onfullscreenerror", true, false, false, "set onfullscreenerror");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitIsFullScreen", true, false, false, "get webkitIsFullScreen");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitCurrentFullScreenElement", true, false, false, "get webkitCurrentFullScreenElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitFullscreenEnabled", true, false, false, "get webkitFullscreenEnabled");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "webkitFullscreenElement", true, false, false, "get webkitFullscreenElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkitfullscreenchange", true, false, false, "get onwebkitfullscreenchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkitfullscreenchange", true, false, false, "set onwebkitfullscreenchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkitfullscreenerror", true, false, false, "get onwebkitfullscreenerror");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkitfullscreenerror", true, false, false, "set onwebkitfullscreenerror");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "rootElement", true, false, false, "get rootElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "pictureInPictureEnabled", true, false, false, "get pictureInPictureEnabled");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforexrselect", true, false, false, "get onbeforexrselect");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforexrselect", true, false, false, "set onbeforexrselect");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onabort", true, false, false, "get onabort");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onabort", true, false, false, "set onabort");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforeinput", true, false, false, "get onbeforeinput");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforeinput", true, false, false, "set onbeforeinput");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforematch", true, false, false, "get onbeforematch");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforematch", true, false, false, "set onbeforematch");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onbeforetoggle", true, false, false, "get onbeforetoggle");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onbeforetoggle", true, false, false, "set onbeforetoggle");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onblur", true, false, false, "get onblur");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onblur", true, false, false, "set onblur");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncancel", true, false, false, "get oncancel");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncancel", true, false, false, "set oncancel");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncanplay", true, false, false, "get oncanplay");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncanplay", true, false, false, "set oncanplay");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncanplaythrough", true, false, false, "get oncanplaythrough");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncanplaythrough", true, false, false, "set oncanplaythrough");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onchange", true, false, false, "get onchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onchange", true, false, false, "set onchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onclick", true, false, false, "get onclick");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onclick", true, false, false, "set onclick");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onclose", true, false, false, "get onclose");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onclose", true, false, false, "set onclose");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncontentvisibilityautostatechange", true, false, false, "get oncontentvisibilityautostatechange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncontentvisibilityautostatechange", true, false, false, "set oncontentvisibilityautostatechange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncontextlost", true, false, false, "get oncontextlost");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncontextlost", true, false, false, "set oncontextlost");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncontextmenu", true, false, false, "get oncontextmenu");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncontextmenu", true, false, false, "set oncontextmenu");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncontextrestored", true, false, false, "get oncontextrestored");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncontextrestored", true, false, false, "set oncontextrestored");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncuechange", true, false, false, "get oncuechange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncuechange", true, false, false, "set oncuechange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondblclick", true, false, false, "get ondblclick");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondblclick", true, false, false, "set ondblclick");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondrag", true, false, false, "get ondrag");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondrag", true, false, false, "set ondrag");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondragend", true, false, false, "get ondragend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondragend", true, false, false, "set ondragend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondragenter", true, false, false, "get ondragenter");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondragenter", true, false, false, "set ondragenter");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondragleave", true, false, false, "get ondragleave");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondragleave", true, false, false, "set ondragleave");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondragover", true, false, false, "get ondragover");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondragover", true, false, false, "set ondragover");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondragstart", true, false, false, "get ondragstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondragstart", true, false, false, "set ondragstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondrop", true, false, false, "get ondrop");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondrop", true, false, false, "set ondrop");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ondurationchange", true, false, false, "get ondurationchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ondurationchange", true, false, false, "set ondurationchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onemptied", true, false, false, "get onemptied");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onemptied", true, false, false, "set onemptied");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onended", true, false, false, "get onended");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onended", true, false, false, "set onended");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onerror", true, false, false, "get onerror");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onerror", true, false, false, "set onerror");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onfocus", true, false, false, "get onfocus");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onfocus", true, false, false, "set onfocus");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onformdata", true, false, false, "get onformdata");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onformdata", true, false, false, "set onformdata");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oninput", true, false, false, "get oninput");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oninput", true, false, false, "set oninput");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oninvalid", true, false, false, "get oninvalid");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oninvalid", true, false, false, "set oninvalid");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onkeydown", true, false, false, "get onkeydown");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onkeydown", true, false, false, "set onkeydown");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onkeypress", true, false, false, "get onkeypress");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onkeypress", true, false, false, "set onkeypress");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onkeyup", true, false, false, "get onkeyup");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onkeyup", true, false, false, "set onkeyup");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onload", true, false, false, "get onload");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onload", true, false, false, "set onload");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onloadeddata", true, false, false, "get onloadeddata");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onloadeddata", true, false, false, "set onloadeddata");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onloadedmetadata", true, false, false, "get onloadedmetadata");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onloadedmetadata", true, false, false, "set onloadedmetadata");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onloadstart", true, false, false, "get onloadstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onloadstart", true, false, false, "set onloadstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmousedown", true, false, false, "get onmousedown");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmousedown", true, false, false, "set onmousedown");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmouseenter", true, false, false, "get onmouseenter");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmouseenter", true, false, false, "set onmouseenter");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmouseleave", true, false, false, "get onmouseleave");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmouseleave", true, false, false, "set onmouseleave");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmousemove", true, false, false, "get onmousemove");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmousemove", true, false, false, "set onmousemove");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmouseout", true, false, false, "get onmouseout");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmouseout", true, false, false, "set onmouseout");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmouseover", true, false, false, "get onmouseover");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmouseover", true, false, false, "set onmouseover");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmouseup", true, false, false, "get onmouseup");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmouseup", true, false, false, "set onmouseup");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onmousewheel", true, false, false, "get onmousewheel");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onmousewheel", true, false, false, "set onmousewheel");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpause", true, false, false, "get onpause");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpause", true, false, false, "set onpause");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onplay", true, false, false, "get onplay");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onplay", true, false, false, "set onplay");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onplaying", true, false, false, "get onplaying");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onplaying", true, false, false, "set onplaying");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onprogress", true, false, false, "get onprogress");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onprogress", true, false, false, "set onprogress");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onratechange", true, false, false, "get onratechange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onratechange", true, false, false, "set onratechange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onreset", true, false, false, "get onreset");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onreset", true, false, false, "set onreset");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onresize", true, false, false, "get onresize");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onresize", true, false, false, "set onresize");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onscroll", true, false, false, "get onscroll");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onscroll", true, false, false, "set onscroll");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onsecuritypolicyviolation", true, false, false, "get onsecuritypolicyviolation");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onsecuritypolicyviolation", true, false, false, "set onsecuritypolicyviolation");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onseeked", true, false, false, "get onseeked");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onseeked", true, false, false, "set onseeked");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onseeking", true, false, false, "get onseeking");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onseeking", true, false, false, "set onseeking");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onselect", true, false, false, "get onselect");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onselect", true, false, false, "set onselect");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onslotchange", true, false, false, "get onslotchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onslotchange", true, false, false, "set onslotchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onstalled", true, false, false, "get onstalled");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onstalled", true, false, false, "set onstalled");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onsubmit", true, false, false, "get onsubmit");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onsubmit", true, false, false, "set onsubmit");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onsuspend", true, false, false, "get onsuspend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onsuspend", true, false, false, "set onsuspend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontimeupdate", true, false, false, "get ontimeupdate");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontimeupdate", true, false, false, "set ontimeupdate");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontoggle", true, false, false, "get ontoggle");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontoggle", true, false, false, "set ontoggle");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onvolumechange", true, false, false, "get onvolumechange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onvolumechange", true, false, false, "set onvolumechange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwaiting", true, false, false, "get onwaiting");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwaiting", true, false, false, "set onwaiting");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkitanimationend", true, false, false, "get onwebkitanimationend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkitanimationend", true, false, false, "set onwebkitanimationend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkitanimationiteration", true, false, false, "get onwebkitanimationiteration");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkitanimationiteration", true, false, false, "set onwebkitanimationiteration");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkitanimationstart", true, false, false, "get onwebkitanimationstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkitanimationstart", true, false, false, "set onwebkitanimationstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwebkittransitionend", true, false, false, "get onwebkittransitionend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwebkittransitionend", true, false, false, "set onwebkittransitionend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onwheel", true, false, false, "get onwheel");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onwheel", true, false, false, "set onwheel");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onauxclick", true, false, false, "get onauxclick");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onauxclick", true, false, false, "set onauxclick");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ongotpointercapture", true, false, false, "get ongotpointercapture");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ongotpointercapture", true, false, false, "set ongotpointercapture");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onlostpointercapture", true, false, false, "get onlostpointercapture");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onlostpointercapture", true, false, false, "set onlostpointercapture");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerdown", true, false, false, "get onpointerdown");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerdown", true, false, false, "set onpointerdown");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointermove", true, false, false, "get onpointermove");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointermove", true, false, false, "set onpointermove");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerrawupdate", true, false, false, "get onpointerrawupdate");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerrawupdate", true, false, false, "set onpointerrawupdate");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerup", true, false, false, "get onpointerup");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerup", true, false, false, "set onpointerup");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointercancel", true, false, false, "get onpointercancel");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointercancel", true, false, false, "set onpointercancel");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerover", true, false, false, "get onpointerover");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerover", true, false, false, "set onpointerover");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerout", true, false, false, "get onpointerout");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerout", true, false, false, "set onpointerout");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerenter", true, false, false, "get onpointerenter");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerenter", true, false, false, "set onpointerenter");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpointerleave", true, false, false, "get onpointerleave");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpointerleave", true, false, false, "set onpointerleave");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onselectstart", true, false, false, "get onselectstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onselectstart", true, false, false, "set onselectstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onselectionchange", true, false, false, "get onselectionchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onselectionchange", true, false, false, "set onselectionchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onanimationend", true, false, false, "get onanimationend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onanimationend", true, false, false, "set onanimationend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onanimationiteration", true, false, false, "get onanimationiteration");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onanimationiteration", true, false, false, "set onanimationiteration");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onanimationstart", true, false, false, "get onanimationstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onanimationstart", true, false, false, "set onanimationstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontransitionrun", true, false, false, "get ontransitionrun");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontransitionrun", true, false, false, "set ontransitionrun");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontransitionstart", true, false, false, "get ontransitionstart");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontransitionstart", true, false, false, "set ontransitionstart");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontransitionend", true, false, false, "get ontransitionend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontransitionend", true, false, false, "set ontransitionend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "ontransitioncancel", true, false, false, "get ontransitioncancel");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "ontransitioncancel", true, false, false, "set ontransitioncancel");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncopy", true, false, false, "get oncopy");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncopy", true, false, false, "set oncopy");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncut", true, false, false, "get oncut");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncut", true, false, false, "set oncut");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onpaste", true, false, false, "get onpaste");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onpaste", true, false, false, "set onpaste");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "children", true, false, false, "get children");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "firstElementChild", true, false, false, "get firstElementChild");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "lastElementChild", true, false, false, "get lastElementChild");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "childElementCount", true, false, false, "get childElementCount");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "activeElement", true, false, false, "get activeElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "styleSheets", true, false, false, "get styleSheets");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "pointerLockElement", true, false, false, "get pointerLockElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fullscreenElement", true, false, false, "get fullscreenElement");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "fullscreenElement", true, false, false, "set fullscreenElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "adoptedStyleSheets", true, false, false, "get adoptedStyleSheets");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "adoptedStyleSheets", true, false, false, "set adoptedStyleSheets");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "pictureInPictureElement", true, false, false, "get pictureInPictureElement");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fonts", true, false, false, "get fonts");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "fragmentDirective", true, false, false, "get fragmentDirective");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "oncommand", true, false, false, "get oncommand");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "oncommand", true, false, false, "set oncommand");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onscrollend", true, false, false, "get onscrollend");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onscrollend", true, false, false, "set onscrollend");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onscrollsnapchange", true, false, false, "get onscrollsnapchange");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onscrollsnapchange", true, false, false, "set onscrollsnapchange");
setAccessorNamePropertyDescriptor('get', window.Document.prototype, "onscrollsnapchanging", true, false, false, "get onscrollsnapchanging");
setAccessorNamePropertyDescriptor('set', window.Document.prototype, "onscrollsnapchanging", true, false, false, "set onscrollsnapchanging");

Object.setPrototypeOf(window.Document.prototype, window.Node.prototype);


Object.defineProperty(window, "HTMLDocument", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLDocument() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLDocument.prototype, {
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function HTMLDocument() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLDocument",},

})

Object.setPrototypeOf(window.HTMLDocument.prototype, window.Document.prototype);


Object.defineProperty(window, "Element", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function Element() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.Element.prototype, {
    namespaceURI: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    prefix: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    localName: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    tagName: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    id: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    className: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    classList: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    slot: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    attributes: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    shadowRoot: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    part: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    assignedSlot: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    innerHTML: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    outerHTML: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    scrollTop: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    scrollLeft: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    scrollWidth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    scrollHeight: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    clientTop: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    clientLeft: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    clientWidth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    clientHeight: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    onbeforecopy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforecut: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforepaste: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsearch: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    elementTiming: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfullscreenchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfullscreenerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitfullscreenchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitfullscreenerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    role: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaAtomic: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaAutoComplete: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaBusy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaBrailleLabel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaBrailleRoleDescription: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaChecked: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaColCount: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaColIndex: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaColSpan: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaCurrent: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaDescription: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaDisabled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaExpanded: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaHasPopup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaHidden: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaInvalid: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaKeyShortcuts: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaLabel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaLevel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaLive: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaModal: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaMultiLine: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaMultiSelectable: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaOrientation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaPlaceholder: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaPosInSet: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaPressed: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaReadOnly: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRelevant: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRequired: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRoleDescription: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRowCount: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRowIndex: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRowSpan: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaSelected: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaSetSize: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaSort: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaValueMax: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaValueMin: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaValueNow: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaValueText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    children: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    firstElementChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    lastElementChild: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    childElementCount: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    previousElementSibling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    nextElementSibling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    after: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function after() {
            debugger;
        }),
    },
    animate: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function animate() {
            debugger;
        }),
    },
    append: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function append() {
            debugger;
        }),
    },
    attachShadow: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function attachShadow() {
            debugger;
        }),
    },
    before: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function before() {
            debugger;
        }),
    },
    checkVisibility: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function checkVisibility() {
            debugger;
        }),
    },
    closest: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function closest() {
            debugger;
        }),
    },
    computedStyleMap: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function computedStyleMap() {
            debugger;
        }),
    },
    getAnimations: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getAnimations() {
            debugger;
        }),
    },
    getAttribute: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getAttribute(attributeName) {
            // console.log(this,'getAttribute被调用',attributeName);
            return null;
        }),
    },
    getAttributeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttributeNS() {
            debugger;
        }),
    },
    getAttributeNames: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttributeNames() {
            debugger;
        }),
    },
    getAttributeNode: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttributeNode() {
            debugger;
        }),
    },
    getAttributeNodeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttributeNodeNS() {
            debugger;
        }),
    },
    getBoundingClientRect: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getBoundingClientRect() {
            debugger;
        }),
    },
    getClientRects: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getClientRects() {
            debugger;
        }),
    },
    getElementsByClassName: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByClassName() {
            debugger;
        }),
    },
    getElementsByTagName: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByTagName() {
            debugger;
        }),
    },
    getElementsByTagNameNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getElementsByTagNameNS() {
            debugger;
        }),
    },
    getHTML: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getHTML() {
            debugger;
        }),
    },
    hasAttribute: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hasAttribute() {
            debugger;
        }),
    },
    hasAttributeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function hasAttributeNS() {
            debugger;
        }),
    },
    hasAttributes: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hasAttributes() {
            debugger;
        }),
    },
    hasPointerCapture: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function hasPointerCapture() {
            debugger;
        }),
    },
    insertAdjacentElement: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function insertAdjacentElement() {
            debugger;
        }),
    },
    insertAdjacentHTML: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function insertAdjacentHTML() {
            debugger;
        }),
    },
    insertAdjacentText: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function insertAdjacentText() {
            debugger;
        }),
    },
    matches: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function matches() {
            debugger;
        }),
    },
    moveBefore: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function moveBefore() {
            debugger;
        }),
    },
    prepend: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function prepend() {
            debugger;
        }),
    },
    querySelector: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function querySelector() {
            debugger;
        }),
    },
    querySelectorAll: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function querySelectorAll() {
            debugger;
        }),
    },
    releasePointerCapture: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function releasePointerCapture() {
            debugger;
        }),
    },
    remove: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function remove() {
        }),
    },
    removeAttribute: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function removeAttribute() {
            debugger;
        }),
    },
    removeAttributeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function removeAttributeNS() {
            debugger;
        }),
    },
    removeAttributeNode: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function removeAttributeNode() {
            debugger;
        }),
    },
    replaceChildren: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function replaceChildren() {
            debugger;
        }),
    },
    replaceWith: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function replaceWith() {
            debugger;
        }),
    },
    requestFullscreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestFullscreen() {
            debugger;
        }),
    },
    requestPointerLock: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function requestPointerLock() {
            debugger;
        }),
    },
    scroll: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function scroll() {
            debugger;
        }),
    },
    scrollBy: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function scrollBy() {
            debugger;
        }),
    },
    scrollIntoView: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function scrollIntoView() {
            debugger;
        }),
    },
    scrollIntoViewIfNeeded: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function scrollIntoViewIfNeeded() {
            debugger;
        }),
    },
    scrollTo: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function scrollTo() {
            debugger;
        }),
    },
    setAttribute: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function setAttribute() {
            debugger;
        }),
    },
    setAttributeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function setAttributeNS() {
            debugger;
        }),
    },
    setAttributeNode: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function setAttributeNode() {
            debugger;
        }),
    },
    setAttributeNodeNS: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function setAttributeNodeNS() {
            debugger;
        }),
    },
    setHTMLUnsafe: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function setHTMLUnsafe() {
            debugger;
        }),
    },
    setPointerCapture: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function setPointerCapture() {
            debugger;
        }),
    },
    toggleAttribute: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function toggleAttribute() {
            debugger;
        }),
    },
    webkitMatchesSelector: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitMatchesSelector() {
            debugger;
        }),
    },
    webkitRequestFullScreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitRequestFullScreen() {
            debugger;
        }),
    },
    webkitRequestFullscreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function webkitRequestFullscreen() {
            debugger;
        }),
    },
    currentCSSZoom: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    ariaColIndexText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaRowIndexText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaActiveDescendantElement: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaControlsElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaDescribedByElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaDetailsElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaErrorMessageElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaFlowToElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ariaLabelledByElements: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function Element() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "Element",},
    [Symbol.unscopables]: {
        configurable: true, enumerable: false, writable: false, value: {
            "after": true,
            "append": true,
            "before": true,
            "prepend": true,
            "remove": true,
            "replaceChildren": true,
            "replaceWith": true,
            "slot": true
        },
    },

})
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "namespaceURI", true, false, false, "get namespaceURI");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "prefix", true, false, false, "get prefix");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "localName", true, false, false, "get localName");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "tagName", true, false, false, "get tagName");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "id", true, false, false, "get id");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "id", true, false, false, "set id");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "className", true, false, false, "get className");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "className", true, false, false, "set className");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "classList", true, false, false, "get classList");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "classList", true, false, false, "set classList");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "slot", true, false, false, "get slot");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "slot", true, false, false, "set slot");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "attributes", true, false, false, "get attributes");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "shadowRoot", true, false, false, "get shadowRoot");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "part", true, false, false, "get part");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "part", true, false, false, "set part");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "assignedSlot", true, false, false, "get assignedSlot");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "innerHTML", true, false, false, "get innerHTML");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "innerHTML", true, false, false, "set innerHTML");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "outerHTML", true, false, false, "get outerHTML");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "outerHTML", true, false, false, "set outerHTML");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "scrollTop", true, false, false, "get scrollTop");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "scrollTop", true, false, false, "set scrollTop");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "scrollLeft", true, false, false, "get scrollLeft");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "scrollLeft", true, false, false, "set scrollLeft");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "scrollWidth", true, false, false, "get scrollWidth");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "scrollHeight", true, false, false, "get scrollHeight");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "clientTop", true, false, false, "get clientTop");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "clientLeft", true, false, false, "get clientLeft");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "clientWidth", true, false, false, "get clientWidth");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "clientHeight", true, false, false, "get clientHeight");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onbeforecopy", true, false, false, "get onbeforecopy");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onbeforecopy", true, false, false, "set onbeforecopy");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onbeforecut", true, false, false, "get onbeforecut");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onbeforecut", true, false, false, "set onbeforecut");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onbeforepaste", true, false, false, "get onbeforepaste");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onbeforepaste", true, false, false, "set onbeforepaste");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onsearch", true, false, false, "get onsearch");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onsearch", true, false, false, "set onsearch");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "elementTiming", true, false, false, "get elementTiming");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "elementTiming", true, false, false, "set elementTiming");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onfullscreenchange", true, false, false, "get onfullscreenchange");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onfullscreenchange", true, false, false, "set onfullscreenchange");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onfullscreenerror", true, false, false, "get onfullscreenerror");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onfullscreenerror", true, false, false, "set onfullscreenerror");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onwebkitfullscreenchange", true, false, false, "get onwebkitfullscreenchange");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onwebkitfullscreenchange", true, false, false, "set onwebkitfullscreenchange");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "onwebkitfullscreenerror", true, false, false, "get onwebkitfullscreenerror");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "onwebkitfullscreenerror", true, false, false, "set onwebkitfullscreenerror");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "role", true, false, false, "get role");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "role", true, false, false, "set role");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaAtomic", true, false, false, "get ariaAtomic");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaAtomic", true, false, false, "set ariaAtomic");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaAutoComplete", true, false, false, "get ariaAutoComplete");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaAutoComplete", true, false, false, "set ariaAutoComplete");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaBusy", true, false, false, "get ariaBusy");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaBusy", true, false, false, "set ariaBusy");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaBrailleLabel", true, false, false, "get ariaBrailleLabel");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaBrailleLabel", true, false, false, "set ariaBrailleLabel");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaBrailleRoleDescription", true, false, false, "get ariaBrailleRoleDescription");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaBrailleRoleDescription", true, false, false, "set ariaBrailleRoleDescription");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaChecked", true, false, false, "get ariaChecked");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaChecked", true, false, false, "set ariaChecked");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaColCount", true, false, false, "get ariaColCount");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaColCount", true, false, false, "set ariaColCount");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaColIndex", true, false, false, "get ariaColIndex");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaColIndex", true, false, false, "set ariaColIndex");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaColSpan", true, false, false, "get ariaColSpan");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaColSpan", true, false, false, "set ariaColSpan");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaCurrent", true, false, false, "get ariaCurrent");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaCurrent", true, false, false, "set ariaCurrent");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaDescription", true, false, false, "get ariaDescription");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaDescription", true, false, false, "set ariaDescription");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaDisabled", true, false, false, "get ariaDisabled");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaDisabled", true, false, false, "set ariaDisabled");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaExpanded", true, false, false, "get ariaExpanded");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaExpanded", true, false, false, "set ariaExpanded");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaHasPopup", true, false, false, "get ariaHasPopup");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaHasPopup", true, false, false, "set ariaHasPopup");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaHidden", true, false, false, "get ariaHidden");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaHidden", true, false, false, "set ariaHidden");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaInvalid", true, false, false, "get ariaInvalid");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaInvalid", true, false, false, "set ariaInvalid");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaKeyShortcuts", true, false, false, "get ariaKeyShortcuts");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaKeyShortcuts", true, false, false, "set ariaKeyShortcuts");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaLabel", true, false, false, "get ariaLabel");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaLabel", true, false, false, "set ariaLabel");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaLevel", true, false, false, "get ariaLevel");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaLevel", true, false, false, "set ariaLevel");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaLive", true, false, false, "get ariaLive");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaLive", true, false, false, "set ariaLive");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaModal", true, false, false, "get ariaModal");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaModal", true, false, false, "set ariaModal");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaMultiLine", true, false, false, "get ariaMultiLine");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaMultiLine", true, false, false, "set ariaMultiLine");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaMultiSelectable", true, false, false, "get ariaMultiSelectable");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaMultiSelectable", true, false, false, "set ariaMultiSelectable");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaOrientation", true, false, false, "get ariaOrientation");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaOrientation", true, false, false, "set ariaOrientation");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaPlaceholder", true, false, false, "get ariaPlaceholder");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaPlaceholder", true, false, false, "set ariaPlaceholder");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaPosInSet", true, false, false, "get ariaPosInSet");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaPosInSet", true, false, false, "set ariaPosInSet");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaPressed", true, false, false, "get ariaPressed");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaPressed", true, false, false, "set ariaPressed");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaReadOnly", true, false, false, "get ariaReadOnly");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaReadOnly", true, false, false, "set ariaReadOnly");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRelevant", true, false, false, "get ariaRelevant");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRelevant", true, false, false, "set ariaRelevant");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRequired", true, false, false, "get ariaRequired");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRequired", true, false, false, "set ariaRequired");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRoleDescription", true, false, false, "get ariaRoleDescription");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRoleDescription", true, false, false, "set ariaRoleDescription");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRowCount", true, false, false, "get ariaRowCount");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRowCount", true, false, false, "set ariaRowCount");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRowIndex", true, false, false, "get ariaRowIndex");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRowIndex", true, false, false, "set ariaRowIndex");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRowSpan", true, false, false, "get ariaRowSpan");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRowSpan", true, false, false, "set ariaRowSpan");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaSelected", true, false, false, "get ariaSelected");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaSelected", true, false, false, "set ariaSelected");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaSetSize", true, false, false, "get ariaSetSize");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaSetSize", true, false, false, "set ariaSetSize");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaSort", true, false, false, "get ariaSort");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaSort", true, false, false, "set ariaSort");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaValueMax", true, false, false, "get ariaValueMax");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaValueMax", true, false, false, "set ariaValueMax");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaValueMin", true, false, false, "get ariaValueMin");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaValueMin", true, false, false, "set ariaValueMin");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaValueNow", true, false, false, "get ariaValueNow");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaValueNow", true, false, false, "set ariaValueNow");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaValueText", true, false, false, "get ariaValueText");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaValueText", true, false, false, "set ariaValueText");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "children", true, false, false, "get children");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "firstElementChild", true, false, false, "get firstElementChild");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "lastElementChild", true, false, false, "get lastElementChild");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "childElementCount", true, false, false, "get childElementCount");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "previousElementSibling", true, false, false, "get previousElementSibling");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "nextElementSibling", true, false, false, "get nextElementSibling");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "currentCSSZoom", true, false, false, "get currentCSSZoom");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaColIndexText", true, false, false, "get ariaColIndexText");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaColIndexText", true, false, false, "set ariaColIndexText");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaRowIndexText", true, false, false, "get ariaRowIndexText");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaRowIndexText", true, false, false, "set ariaRowIndexText");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaActiveDescendantElement", true, false, false, "get ariaActiveDescendantElement");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaActiveDescendantElement", true, false, false, "set ariaActiveDescendantElement");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaControlsElements", true, false, false, "get ariaControlsElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaControlsElements", true, false, false, "set ariaControlsElements");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaDescribedByElements", true, false, false, "get ariaDescribedByElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaDescribedByElements", true, false, false, "set ariaDescribedByElements");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaDetailsElements", true, false, false, "get ariaDetailsElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaDetailsElements", true, false, false, "set ariaDetailsElements");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaErrorMessageElements", true, false, false, "get ariaErrorMessageElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaErrorMessageElements", true, false, false, "set ariaErrorMessageElements");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaFlowToElements", true, false, false, "get ariaFlowToElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaFlowToElements", true, false, false, "set ariaFlowToElements");
setAccessorNamePropertyDescriptor('get', window.Element.prototype, "ariaLabelledByElements", true, false, false, "get ariaLabelledByElements");
setAccessorNamePropertyDescriptor('set', window.Element.prototype, "ariaLabelledByElements", true, false, false, "set ariaLabelledByElements");

Object.setPrototypeOf(window.Element.prototype, window.Node.prototype);

Object.defineProperty(window, "HTMLElement", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLElement() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLElement.prototype, {
    title: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    lang: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    translate: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    dir: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    hidden: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    inert: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    accessKey: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    draggable: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    spellcheck: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    autocapitalize: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    editContext: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    contentEditable: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    enterKeyHint: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    isContentEditable: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    inputMode: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    virtualKeyboardPolicy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    offsetParent: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    offsetTop: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    offsetLeft: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    offsetWidth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    offsetHeight: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    popover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    innerText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    outerText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    writingSuggestions: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforexrselect: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onabort: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforeinput: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforematch: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onbeforetoggle: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onblur: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncanplay: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncanplaythrough: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onclose: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontentvisibilityautostatechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextlost: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextmenu: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncontextrestored: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncuechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondblclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondrag: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondragstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondrop: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ondurationchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onemptied: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onended: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onfocus: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onformdata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oninput: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oninvalid: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeydown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeypress: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onkeyup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onload: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadeddata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadedmetadata: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousedown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousemove: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmouseup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onmousewheel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpause: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onplay: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onplaying: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onprogress: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onratechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onreset: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onresize: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscroll: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsecuritypolicyviolation: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onseeked: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onseeking: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselect: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onslotchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onstalled: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsubmit: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onsuspend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontimeupdate: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontoggle: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onvolumechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwaiting: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationiteration: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkitanimationstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwebkittransitionend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onwheel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onauxclick: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ongotpointercapture: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onlostpointercapture: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerdown: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointermove: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerrawupdate: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerup: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointercancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerover: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerenter: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpointerleave: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselectstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onselectionchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationiteration: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onanimationstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionrun: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitionend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontransitioncancel: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncopy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    oncut: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onpaste: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    dataset: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    nonce: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    autofocus: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    tabIndex: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    style: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    attributeStyleMap: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    attachInternals: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function attachInternals() {
            debugger;
        }),
    },
    blur: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function blur() {
            debugger;
        }),
    },
    click: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function click() {
            debugger;
        }),
    },
    focus: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function focus() {
            debugger;
        }),
    },
    hidePopover: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hidePopover() {
            debugger;
        }),
    },
    showPopover: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function showPopover() {
            debugger;
        }),
    },
    togglePopover: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function togglePopover() {
            debugger;
        }),
    },
    oncommand: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollsnapchange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onscrollsnapchanging: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function HTMLElement() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLElement",},

})
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "title", true, false, false, "get title");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "title", true, false, false, "set title");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "lang", true, false, false, "get lang");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "lang", true, false, false, "set lang");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "translate", true, false, false, "get translate");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "translate", true, false, false, "set translate");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "dir", true, false, false, "get dir");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "dir", true, false, false, "set dir");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "hidden", true, false, false, "get hidden");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "hidden", true, false, false, "set hidden");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "inert", true, false, false, "get inert");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "inert", true, false, false, "set inert");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "accessKey", true, false, false, "get accessKey");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "accessKey", true, false, false, "set accessKey");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "draggable", true, false, false, "get draggable");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "draggable", true, false, false, "set draggable");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "spellcheck", true, false, false, "get spellcheck");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "spellcheck", true, false, false, "set spellcheck");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "autocapitalize", true, false, false, "get autocapitalize");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "autocapitalize", true, false, false, "set autocapitalize");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "editContext", true, false, false, "get editContext");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "editContext", true, false, false, "set editContext");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "contentEditable", true, false, false, "get contentEditable");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "contentEditable", true, false, false, "set contentEditable");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "enterKeyHint", true, false, false, "get enterKeyHint");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "enterKeyHint", true, false, false, "set enterKeyHint");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "isContentEditable", true, false, false, "get isContentEditable");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "inputMode", true, false, false, "get inputMode");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "inputMode", true, false, false, "set inputMode");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "virtualKeyboardPolicy", true, false, false, "get virtualKeyboardPolicy");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "virtualKeyboardPolicy", true, false, false, "set virtualKeyboardPolicy");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "offsetParent", true, false, false, "get offsetParent");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "offsetTop", true, false, false, "get offsetTop");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "offsetLeft", true, false, false, "get offsetLeft");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "offsetWidth", true, false, false, "get offsetWidth");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "offsetHeight", true, false, false, "get offsetHeight");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "popover", true, false, false, "get popover");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "popover", true, false, false, "set popover");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "innerText", true, false, false, "get innerText");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "innerText", true, false, false, "set innerText");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "outerText", true, false, false, "get outerText");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "outerText", true, false, false, "set outerText");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "writingSuggestions", true, false, false, "get writingSuggestions");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "writingSuggestions", true, false, false, "set writingSuggestions");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onbeforexrselect", true, false, false, "get onbeforexrselect");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onbeforexrselect", true, false, false, "set onbeforexrselect");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onabort", true, false, false, "get onabort");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onabort", true, false, false, "set onabort");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onbeforeinput", true, false, false, "get onbeforeinput");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onbeforeinput", true, false, false, "set onbeforeinput");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onbeforematch", true, false, false, "get onbeforematch");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onbeforematch", true, false, false, "set onbeforematch");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onbeforetoggle", true, false, false, "get onbeforetoggle");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onbeforetoggle", true, false, false, "set onbeforetoggle");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onblur", true, false, false, "get onblur");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onblur", true, false, false, "set onblur");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncancel", true, false, false, "get oncancel");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncancel", true, false, false, "set oncancel");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncanplay", true, false, false, "get oncanplay");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncanplay", true, false, false, "set oncanplay");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncanplaythrough", true, false, false, "get oncanplaythrough");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncanplaythrough", true, false, false, "set oncanplaythrough");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onchange", true, false, false, "get onchange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onchange", true, false, false, "set onchange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onclick", true, false, false, "get onclick");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onclick", true, false, false, "set onclick");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onclose", true, false, false, "get onclose");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onclose", true, false, false, "set onclose");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncontentvisibilityautostatechange", true, false, false, "get oncontentvisibilityautostatechange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncontentvisibilityautostatechange", true, false, false, "set oncontentvisibilityautostatechange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncontextlost", true, false, false, "get oncontextlost");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncontextlost", true, false, false, "set oncontextlost");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncontextmenu", true, false, false, "get oncontextmenu");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncontextmenu", true, false, false, "set oncontextmenu");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncontextrestored", true, false, false, "get oncontextrestored");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncontextrestored", true, false, false, "set oncontextrestored");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncuechange", true, false, false, "get oncuechange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncuechange", true, false, false, "set oncuechange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondblclick", true, false, false, "get ondblclick");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondblclick", true, false, false, "set ondblclick");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondrag", true, false, false, "get ondrag");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondrag", true, false, false, "set ondrag");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondragend", true, false, false, "get ondragend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondragend", true, false, false, "set ondragend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondragenter", true, false, false, "get ondragenter");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondragenter", true, false, false, "set ondragenter");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondragleave", true, false, false, "get ondragleave");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondragleave", true, false, false, "set ondragleave");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondragover", true, false, false, "get ondragover");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondragover", true, false, false, "set ondragover");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondragstart", true, false, false, "get ondragstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondragstart", true, false, false, "set ondragstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondrop", true, false, false, "get ondrop");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondrop", true, false, false, "set ondrop");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ondurationchange", true, false, false, "get ondurationchange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ondurationchange", true, false, false, "set ondurationchange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onemptied", true, false, false, "get onemptied");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onemptied", true, false, false, "set onemptied");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onended", true, false, false, "get onended");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onended", true, false, false, "set onended");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onerror", true, false, false, "get onerror");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onerror", true, false, false, "set onerror");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onfocus", true, false, false, "get onfocus");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onfocus", true, false, false, "set onfocus");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onformdata", true, false, false, "get onformdata");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onformdata", true, false, false, "set onformdata");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oninput", true, false, false, "get oninput");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oninput", true, false, false, "set oninput");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oninvalid", true, false, false, "get oninvalid");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oninvalid", true, false, false, "set oninvalid");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onkeydown", true, false, false, "get onkeydown");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onkeydown", true, false, false, "set onkeydown");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onkeypress", true, false, false, "get onkeypress");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onkeypress", true, false, false, "set onkeypress");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onkeyup", true, false, false, "get onkeyup");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onkeyup", true, false, false, "set onkeyup");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onload", true, false, false, "get onload");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onload", true, false, false, "set onload");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onloadeddata", true, false, false, "get onloadeddata");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onloadeddata", true, false, false, "set onloadeddata");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onloadedmetadata", true, false, false, "get onloadedmetadata");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onloadedmetadata", true, false, false, "set onloadedmetadata");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onloadstart", true, false, false, "get onloadstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onloadstart", true, false, false, "set onloadstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmousedown", true, false, false, "get onmousedown");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmousedown", true, false, false, "set onmousedown");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmouseenter", true, false, false, "get onmouseenter");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmouseenter", true, false, false, "set onmouseenter");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmouseleave", true, false, false, "get onmouseleave");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmouseleave", true, false, false, "set onmouseleave");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmousemove", true, false, false, "get onmousemove");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmousemove", true, false, false, "set onmousemove");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmouseout", true, false, false, "get onmouseout");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmouseout", true, false, false, "set onmouseout");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmouseover", true, false, false, "get onmouseover");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmouseover", true, false, false, "set onmouseover");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmouseup", true, false, false, "get onmouseup");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmouseup", true, false, false, "set onmouseup");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onmousewheel", true, false, false, "get onmousewheel");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onmousewheel", true, false, false, "set onmousewheel");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpause", true, false, false, "get onpause");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpause", true, false, false, "set onpause");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onplay", true, false, false, "get onplay");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onplay", true, false, false, "set onplay");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onplaying", true, false, false, "get onplaying");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onplaying", true, false, false, "set onplaying");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onprogress", true, false, false, "get onprogress");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onprogress", true, false, false, "set onprogress");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onratechange", true, false, false, "get onratechange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onratechange", true, false, false, "set onratechange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onreset", true, false, false, "get onreset");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onreset", true, false, false, "set onreset");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onresize", true, false, false, "get onresize");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onresize", true, false, false, "set onresize");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onscroll", true, false, false, "get onscroll");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onscroll", true, false, false, "set onscroll");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onsecuritypolicyviolation", true, false, false, "get onsecuritypolicyviolation");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onsecuritypolicyviolation", true, false, false, "set onsecuritypolicyviolation");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onseeked", true, false, false, "get onseeked");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onseeked", true, false, false, "set onseeked");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onseeking", true, false, false, "get onseeking");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onseeking", true, false, false, "set onseeking");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onselect", true, false, false, "get onselect");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onselect", true, false, false, "set onselect");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onslotchange", true, false, false, "get onslotchange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onslotchange", true, false, false, "set onslotchange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onstalled", true, false, false, "get onstalled");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onstalled", true, false, false, "set onstalled");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onsubmit", true, false, false, "get onsubmit");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onsubmit", true, false, false, "set onsubmit");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onsuspend", true, false, false, "get onsuspend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onsuspend", true, false, false, "set onsuspend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontimeupdate", true, false, false, "get ontimeupdate");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontimeupdate", true, false, false, "set ontimeupdate");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontoggle", true, false, false, "get ontoggle");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontoggle", true, false, false, "set ontoggle");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onvolumechange", true, false, false, "get onvolumechange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onvolumechange", true, false, false, "set onvolumechange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwaiting", true, false, false, "get onwaiting");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwaiting", true, false, false, "set onwaiting");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwebkitanimationend", true, false, false, "get onwebkitanimationend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwebkitanimationend", true, false, false, "set onwebkitanimationend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwebkitanimationiteration", true, false, false, "get onwebkitanimationiteration");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwebkitanimationiteration", true, false, false, "set onwebkitanimationiteration");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwebkitanimationstart", true, false, false, "get onwebkitanimationstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwebkitanimationstart", true, false, false, "set onwebkitanimationstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwebkittransitionend", true, false, false, "get onwebkittransitionend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwebkittransitionend", true, false, false, "set onwebkittransitionend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onwheel", true, false, false, "get onwheel");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onwheel", true, false, false, "set onwheel");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onauxclick", true, false, false, "get onauxclick");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onauxclick", true, false, false, "set onauxclick");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ongotpointercapture", true, false, false, "get ongotpointercapture");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ongotpointercapture", true, false, false, "set ongotpointercapture");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onlostpointercapture", true, false, false, "get onlostpointercapture");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onlostpointercapture", true, false, false, "set onlostpointercapture");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerdown", true, false, false, "get onpointerdown");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerdown", true, false, false, "set onpointerdown");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointermove", true, false, false, "get onpointermove");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointermove", true, false, false, "set onpointermove");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerrawupdate", true, false, false, "get onpointerrawupdate");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerrawupdate", true, false, false, "set onpointerrawupdate");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerup", true, false, false, "get onpointerup");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerup", true, false, false, "set onpointerup");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointercancel", true, false, false, "get onpointercancel");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointercancel", true, false, false, "set onpointercancel");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerover", true, false, false, "get onpointerover");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerover", true, false, false, "set onpointerover");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerout", true, false, false, "get onpointerout");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerout", true, false, false, "set onpointerout");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerenter", true, false, false, "get onpointerenter");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerenter", true, false, false, "set onpointerenter");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpointerleave", true, false, false, "get onpointerleave");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpointerleave", true, false, false, "set onpointerleave");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onselectstart", true, false, false, "get onselectstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onselectstart", true, false, false, "set onselectstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onselectionchange", true, false, false, "get onselectionchange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onselectionchange", true, false, false, "set onselectionchange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onanimationend", true, false, false, "get onanimationend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onanimationend", true, false, false, "set onanimationend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onanimationiteration", true, false, false, "get onanimationiteration");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onanimationiteration", true, false, false, "set onanimationiteration");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onanimationstart", true, false, false, "get onanimationstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onanimationstart", true, false, false, "set onanimationstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontransitionrun", true, false, false, "get ontransitionrun");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontransitionrun", true, false, false, "set ontransitionrun");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontransitionstart", true, false, false, "get ontransitionstart");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontransitionstart", true, false, false, "set ontransitionstart");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontransitionend", true, false, false, "get ontransitionend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontransitionend", true, false, false, "set ontransitionend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "ontransitioncancel", true, false, false, "get ontransitioncancel");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "ontransitioncancel", true, false, false, "set ontransitioncancel");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncopy", true, false, false, "get oncopy");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncopy", true, false, false, "set oncopy");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncut", true, false, false, "get oncut");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncut", true, false, false, "set oncut");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onpaste", true, false, false, "get onpaste");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onpaste", true, false, false, "set onpaste");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "dataset", true, false, false, "get dataset");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "nonce", true, false, false, "get nonce");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "nonce", true, false, false, "set nonce");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "autofocus", true, false, false, "get autofocus");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "autofocus", true, false, false, "set autofocus");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "tabIndex", true, false, false, "get tabIndex");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "tabIndex", true, false, false, "set tabIndex");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "style", true, false, false, "get style");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "style", true, false, false, "set style");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "attributeStyleMap", true, false, false, "get attributeStyleMap");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "oncommand", true, false, false, "get oncommand");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "oncommand", true, false, false, "set oncommand");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onscrollend", true, false, false, "get onscrollend");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onscrollend", true, false, false, "set onscrollend");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onscrollsnapchange", true, false, false, "get onscrollsnapchange");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onscrollsnapchange", true, false, false, "set onscrollsnapchange");
setAccessorNamePropertyDescriptor('get', window.HTMLElement.prototype, "onscrollsnapchanging", true, false, false, "get onscrollsnapchanging");
setAccessorNamePropertyDescriptor('set', window.HTMLElement.prototype, "onscrollsnapchanging", true, false, false, "set onscrollsnapchanging");

Object.setPrototypeOf(window.HTMLElement.prototype, window.Element.prototype);

Object.defineProperty(window, "HTMLHtmlElement", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLHtmlElement() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLHtmlElement.prototype, {
    version: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function HTMLHtmlElement() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLHtmlElement",},

})
setAccessorNamePropertyDescriptor('get', window.HTMLHtmlElement.prototype, "version", true, false, false, "get version");
setAccessorNamePropertyDescriptor('set', window.HTMLHtmlElement.prototype, "version", true, false, false, "set version");

Object.setPrototypeOf(window.HTMLHtmlElement.prototype, window.HTMLElement.prototype);


Object.defineProperty(window, "BigInt", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function BigInt() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.BigInt.prototype, {
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function BigInt() {
            debugger;
        }),
    },
    toLocaleString: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function toLocaleString() {
            debugger;
        }),
    },
    toString: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function toString() {
            debugger;
        }),
    },
    valueOf: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function valueOf() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "BigInt",},

})


Object.defineProperty(window, "External", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function External() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.External.prototype, {
    AddSearchProvider: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function AddSearchProvider() {
            debugger;
        }),
    },
    IsSearchProviderInstalled: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function IsSearchProviderInstalled() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function External() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "External",},

})


Object.defineProperty(window, "XMLHttpRequestEventTarget", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function XMLHttpRequestEventTarget() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.XMLHttpRequestEventTarget.prototype, {
    onloadstart: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onprogress: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onabort: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onerror: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onload: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    ontimeout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    onloadend: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function XMLHttpRequestEventTarget() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "XMLHttpRequestEventTarget",},

})
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onloadstart", true, false, false, "get onloadstart");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onloadstart", true, false, false, "set onloadstart");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onprogress", true, false, false, "get onprogress");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onprogress", true, false, false, "set onprogress");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onabort", true, false, false, "get onabort");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onabort", true, false, false, "set onabort");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onerror", true, false, false, "get onerror");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onerror", true, false, false, "set onerror");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onload", true, false, false, "get onload");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onload", true, false, false, "set onload");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "ontimeout", true, false, false, "get ontimeout");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "ontimeout", true, false, false, "set ontimeout");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequestEventTarget.prototype, "onloadend", true, false, false, "get onloadend");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequestEventTarget.prototype, "onloadend", true, false, false, "set onloadend");

Object.setPrototypeOf(window.XMLHttpRequestEventTarget.prototype, window.EventTarget.prototype);

Object.defineProperty(window, "XMLHttpRequest", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function XMLHttpRequest() {
    })
});

Object.defineProperties(window.XMLHttpRequest.prototype, {
    onreadystatechange: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    readyState: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 0;
        }),
    },
    timeout: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 0;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    withCredentials: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    upload: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    responseURL: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }),
    },
    status: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 0;
        }),
    },
    statusText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }),
    },
    responseType: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    response: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }),
    },
    responseText: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }),
    },
    UNSENT: {configurable: false, enumerable: true, writable: false, value: 0,},
    OPENED: {configurable: false, enumerable: true, writable: false, value: 1,},
    HEADERS_RECEIVED: {configurable: false, enumerable: true, writable: false, value: 2,},
    LOADING: {configurable: false, enumerable: true, writable: false, value: 3,},
    DONE: {configurable: false, enumerable: true, writable: false, value: 4,},
    abort: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function abort() {
            debugger;
        }),
    },
    getAllResponseHeaders: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAllResponseHeaders() {
            debugger;
        }),
    },
    getResponseHeader: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getResponseHeader() {
            debugger;
        }),
    },
    open: {
        configurable: true, enumerable: true, writable: true, value: function y__() {
            debugger;
        },
    },
    overrideMimeType: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function overrideMimeType() {
            debugger;
        }),
    },
    send: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function send() {
            debugger;
        }),
    },
    setRequestHeader: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function setRequestHeader() {
            debugger;
        }),
    },
    constructor: {
        configurable: true, enumerable: false, writable: true, value: antiToString(function XMLHttpRequest() {
            debugger;
        }),
    },
    responseXML: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "XMLHttpRequest",},

})
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "onreadystatechange", true, false, false, "get onreadystatechange");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequest.prototype, "onreadystatechange", true, false, false, "set onreadystatechange");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "readyState", true, false, false, "get readyState");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "timeout", true, false, false, "get timeout");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequest.prototype, "timeout", true, false, false, "set timeout");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "withCredentials", true, false, false, "get withCredentials");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequest.prototype, "withCredentials", true, false, false, "set withCredentials");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "upload", true, false, false, "get upload");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "responseURL", true, false, false, "get responseURL");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "status", true, false, false, "get status");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "statusText", true, false, false, "get statusText");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "responseType", true, false, false, "get responseType");
setAccessorNamePropertyDescriptor('set', window.XMLHttpRequest.prototype, "responseType", true, false, false, "set responseType");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "response", true, false, false, "get response");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "responseText", true, false, false, "get responseText");
setAccessorNamePropertyDescriptor('get', window.XMLHttpRequest.prototype, "responseXML", true, false, false, "get responseXML");

Object.setPrototypeOf(window.XMLHttpRequest.prototype, window.XMLHttpRequestEventTarget.prototype);

Object.defineProperty(window, "HTMLScriptElement", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLScriptElement() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLScriptElement.prototype, {
    src: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return global.cursor_config.currentScriptSrc;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    type: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    noModule: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    charset: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    async: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return true;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    defer: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    crossOrigin: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    text: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    referrerPolicy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    fetchPriority: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "auto";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    event: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    htmlFor: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    integrity: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    blocking: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function HTMLScriptElement() {
            debugger;
        }),
    },
    attributionSrc: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLScriptElement",},

})
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "src", true, false, false, "get src");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "src", true, false, false, "set src");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "type", true, false, false, "get type");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "type", true, false, false, "set type");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "noModule", true, false, false, "get noModule");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "noModule", true, false, false, "set noModule");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "charset", true, false, false, "get charset");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "charset", true, false, false, "set charset");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "async", true, false, false, "get async");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "async", true, false, false, "set async");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "defer", true, false, false, "get defer");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "defer", true, false, false, "set defer");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "crossOrigin", true, false, false, "get crossOrigin");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "crossOrigin", true, false, false, "set crossOrigin");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "text", true, false, false, "get text");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "text", true, false, false, "set text");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "referrerPolicy", true, false, false, "get referrerPolicy");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "referrerPolicy", true, false, false, "set referrerPolicy");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "fetchPriority", true, false, false, "get fetchPriority");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "fetchPriority", true, false, false, "set fetchPriority");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "event", true, false, false, "get event");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "event", true, false, false, "set event");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "htmlFor", true, false, false, "get htmlFor");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "htmlFor", true, false, false, "set htmlFor");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "integrity", true, false, false, "get integrity");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "integrity", true, false, false, "set integrity");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "blocking", true, false, false, "get blocking");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "blocking", true, false, false, "set blocking");
setAccessorNamePropertyDescriptor('get', window.HTMLScriptElement.prototype, "attributionSrc", true, false, false, "get attributionSrc");
setAccessorNamePropertyDescriptor('set', window.HTMLScriptElement.prototype, "attributionSrc", true, false, false, "set attributionSrc");

Object.setPrototypeOf(window.HTMLScriptElement.prototype, window.HTMLElement.prototype);


Object.defineProperty(window, "HTMLCanvasElement", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLCanvasElement() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLCanvasElement.prototype, {
    width: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 300;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    height: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 150;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    captureStream: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function captureStream() {
            debugger;
        }),
    },
    getContext: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getContext(contextType, contextAttributes) {
            switch (contextType) {
                case "webgl":
                    return my_env_temp.webgl_ctx;
                default:
                    debugger;
            }
        }),
    },
    toBlob: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function toBlob() {
            debugger;
        }),
    },
    toDataURL: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function toDataURL() {
            debugger;
        }),
    },
    transferControlToOffscreen: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function transferControlToOffscreen() {
            debugger;
        }),
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function HTMLCanvasElement() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLCanvasElement",},

})
setAccessorNamePropertyDescriptor('get', window.HTMLCanvasElement.prototype, "width", true, false, false, "get width");
setAccessorNamePropertyDescriptor('set', window.HTMLCanvasElement.prototype, "width", true, false, false, "set width");
setAccessorNamePropertyDescriptor('get', window.HTMLCanvasElement.prototype, "height", true, false, false, "get height");
setAccessorNamePropertyDescriptor('set', window.HTMLCanvasElement.prototype, "height", true, false, false, "set height");

Object.setPrototypeOf(window.HTMLCanvasElement.prototype, window.HTMLElement.prototype);


Object.defineProperty(window, "WebGLRenderingContext", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function WebGLRenderingContext() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.WebGLRenderingContext.prototype, {
    canvas: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    drawingBufferWidth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 300;
        }),
    },
    drawingBufferHeight: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 150;
        }),
    },
    drawingBufferColorSpace: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "srgb";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    unpackColorSpace: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "srgb";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    DEPTH_BUFFER_BIT: {configurable: false, enumerable: true, writable: false, value: 256,},
    STENCIL_BUFFER_BIT: {configurable: false, enumerable: true, writable: false, value: 1024,},
    COLOR_BUFFER_BIT: {configurable: false, enumerable: true, writable: false, value: 16384,},
    POINTS: {configurable: false, enumerable: true, writable: false, value: 0,},
    LINES: {configurable: false, enumerable: true, writable: false, value: 1,},
    LINE_LOOP: {configurable: false, enumerable: true, writable: false, value: 2,},
    LINE_STRIP: {configurable: false, enumerable: true, writable: false, value: 3,},
    TRIANGLES: {configurable: false, enumerable: true, writable: false, value: 4,},
    TRIANGLE_STRIP: {configurable: false, enumerable: true, writable: false, value: 5,},
    TRIANGLE_FAN: {configurable: false, enumerable: true, writable: false, value: 6,},
    ZERO: {configurable: false, enumerable: true, writable: false, value: 0,},
    ONE: {configurable: false, enumerable: true, writable: false, value: 1,},
    SRC_COLOR: {configurable: false, enumerable: true, writable: false, value: 768,},
    ONE_MINUS_SRC_COLOR: {configurable: false, enumerable: true, writable: false, value: 769,},
    SRC_ALPHA: {configurable: false, enumerable: true, writable: false, value: 770,},
    ONE_MINUS_SRC_ALPHA: {configurable: false, enumerable: true, writable: false, value: 771,},
    DST_ALPHA: {configurable: false, enumerable: true, writable: false, value: 772,},
    ONE_MINUS_DST_ALPHA: {configurable: false, enumerable: true, writable: false, value: 773,},
    DST_COLOR: {configurable: false, enumerable: true, writable: false, value: 774,},
    ONE_MINUS_DST_COLOR: {configurable: false, enumerable: true, writable: false, value: 775,},
    SRC_ALPHA_SATURATE: {configurable: false, enumerable: true, writable: false, value: 776,},
    FUNC_ADD: {configurable: false, enumerable: true, writable: false, value: 32774,},
    BLEND_EQUATION: {configurable: false, enumerable: true, writable: false, value: 32777,},
    BLEND_EQUATION_RGB: {configurable: false, enumerable: true, writable: false, value: 32777,},
    BLEND_EQUATION_ALPHA: {configurable: false, enumerable: true, writable: false, value: 34877,},
    FUNC_SUBTRACT: {configurable: false, enumerable: true, writable: false, value: 32778,},
    FUNC_REVERSE_SUBTRACT: {configurable: false, enumerable: true, writable: false, value: 32779,},
    BLEND_DST_RGB: {configurable: false, enumerable: true, writable: false, value: 32968,},
    BLEND_SRC_RGB: {configurable: false, enumerable: true, writable: false, value: 32969,},
    BLEND_DST_ALPHA: {configurable: false, enumerable: true, writable: false, value: 32970,},
    BLEND_SRC_ALPHA: {configurable: false, enumerable: true, writable: false, value: 32971,},
    CONSTANT_COLOR: {configurable: false, enumerable: true, writable: false, value: 32769,},
    ONE_MINUS_CONSTANT_COLOR: {configurable: false, enumerable: true, writable: false, value: 32770,},
    CONSTANT_ALPHA: {configurable: false, enumerable: true, writable: false, value: 32771,},
    ONE_MINUS_CONSTANT_ALPHA: {configurable: false, enumerable: true, writable: false, value: 32772,},
    BLEND_COLOR: {configurable: false, enumerable: true, writable: false, value: 32773,},
    ARRAY_BUFFER: {configurable: false, enumerable: true, writable: false, value: 34962,},
    ELEMENT_ARRAY_BUFFER: {configurable: false, enumerable: true, writable: false, value: 34963,},
    ARRAY_BUFFER_BINDING: {configurable: false, enumerable: true, writable: false, value: 34964,},
    ELEMENT_ARRAY_BUFFER_BINDING: {configurable: false, enumerable: true, writable: false, value: 34965,},
    STREAM_DRAW: {configurable: false, enumerable: true, writable: false, value: 35040,},
    STATIC_DRAW: {configurable: false, enumerable: true, writable: false, value: 35044,},
    DYNAMIC_DRAW: {configurable: false, enumerable: true, writable: false, value: 35048,},
    BUFFER_SIZE: {configurable: false, enumerable: true, writable: false, value: 34660,},
    BUFFER_USAGE: {configurable: false, enumerable: true, writable: false, value: 34661,},
    CURRENT_VERTEX_ATTRIB: {configurable: false, enumerable: true, writable: false, value: 34342,},
    FRONT: {configurable: false, enumerable: true, writable: false, value: 1028,},
    BACK: {configurable: false, enumerable: true, writable: false, value: 1029,},
    FRONT_AND_BACK: {configurable: false, enumerable: true, writable: false, value: 1032,},
    TEXTURE_2D: {configurable: false, enumerable: true, writable: false, value: 3553,},
    CULL_FACE: {configurable: false, enumerable: true, writable: false, value: 2884,},
    BLEND: {configurable: false, enumerable: true, writable: false, value: 3042,},
    DITHER: {configurable: false, enumerable: true, writable: false, value: 3024,},
    STENCIL_TEST: {configurable: false, enumerable: true, writable: false, value: 2960,},
    DEPTH_TEST: {configurable: false, enumerable: true, writable: false, value: 2929,},
    SCISSOR_TEST: {configurable: false, enumerable: true, writable: false, value: 3089,},
    POLYGON_OFFSET_FILL: {configurable: false, enumerable: true, writable: false, value: 32823,},
    SAMPLE_ALPHA_TO_COVERAGE: {configurable: false, enumerable: true, writable: false, value: 32926,},
    SAMPLE_COVERAGE: {configurable: false, enumerable: true, writable: false, value: 32928,},
    NO_ERROR: {configurable: false, enumerable: true, writable: false, value: 0,},
    INVALID_ENUM: {configurable: false, enumerable: true, writable: false, value: 1280,},
    INVALID_VALUE: {configurable: false, enumerable: true, writable: false, value: 1281,},
    INVALID_OPERATION: {configurable: false, enumerable: true, writable: false, value: 1282,},
    OUT_OF_MEMORY: {configurable: false, enumerable: true, writable: false, value: 1285,},
    CW: {configurable: false, enumerable: true, writable: false, value: 2304,},
    CCW: {configurable: false, enumerable: true, writable: false, value: 2305,},
    LINE_WIDTH: {configurable: false, enumerable: true, writable: false, value: 2849,},
    ALIASED_POINT_SIZE_RANGE: {configurable: false, enumerable: true, writable: false, value: 33901,},
    ALIASED_LINE_WIDTH_RANGE: {configurable: false, enumerable: true, writable: false, value: 33902,},
    CULL_FACE_MODE: {configurable: false, enumerable: true, writable: false, value: 2885,},
    FRONT_FACE: {configurable: false, enumerable: true, writable: false, value: 2886,},
    DEPTH_RANGE: {configurable: false, enumerable: true, writable: false, value: 2928,},
    DEPTH_WRITEMASK: {configurable: false, enumerable: true, writable: false, value: 2930,},
    DEPTH_CLEAR_VALUE: {configurable: false, enumerable: true, writable: false, value: 2931,},
    DEPTH_FUNC: {configurable: false, enumerable: true, writable: false, value: 2932,},
    STENCIL_CLEAR_VALUE: {configurable: false, enumerable: true, writable: false, value: 2961,},
    STENCIL_FUNC: {configurable: false, enumerable: true, writable: false, value: 2962,},
    STENCIL_FAIL: {configurable: false, enumerable: true, writable: false, value: 2964,},
    STENCIL_PASS_DEPTH_FAIL: {configurable: false, enumerable: true, writable: false, value: 2965,},
    STENCIL_PASS_DEPTH_PASS: {configurable: false, enumerable: true, writable: false, value: 2966,},
    STENCIL_REF: {configurable: false, enumerable: true, writable: false, value: 2967,},
    STENCIL_VALUE_MASK: {configurable: false, enumerable: true, writable: false, value: 2963,},
    STENCIL_WRITEMASK: {configurable: false, enumerable: true, writable: false, value: 2968,},
    STENCIL_BACK_FUNC: {configurable: false, enumerable: true, writable: false, value: 34816,},
    STENCIL_BACK_FAIL: {configurable: false, enumerable: true, writable: false, value: 34817,},
    STENCIL_BACK_PASS_DEPTH_FAIL: {configurable: false, enumerable: true, writable: false, value: 34818,},
    STENCIL_BACK_PASS_DEPTH_PASS: {configurable: false, enumerable: true, writable: false, value: 34819,},
    STENCIL_BACK_REF: {configurable: false, enumerable: true, writable: false, value: 36003,},
    STENCIL_BACK_VALUE_MASK: {configurable: false, enumerable: true, writable: false, value: 36004,},
    STENCIL_BACK_WRITEMASK: {configurable: false, enumerable: true, writable: false, value: 36005,},
    VIEWPORT: {configurable: false, enumerable: true, writable: false, value: 2978,},
    SCISSOR_BOX: {configurable: false, enumerable: true, writable: false, value: 3088,},
    COLOR_CLEAR_VALUE: {configurable: false, enumerable: true, writable: false, value: 3106,},
    COLOR_WRITEMASK: {configurable: false, enumerable: true, writable: false, value: 3107,},
    UNPACK_ALIGNMENT: {configurable: false, enumerable: true, writable: false, value: 3317,},
    PACK_ALIGNMENT: {configurable: false, enumerable: true, writable: false, value: 3333,},
    MAX_TEXTURE_SIZE: {configurable: false, enumerable: true, writable: false, value: 3379,},
    MAX_VIEWPORT_DIMS: {configurable: false, enumerable: true, writable: false, value: 3386,},
    SUBPIXEL_BITS: {configurable: false, enumerable: true, writable: false, value: 3408,},
    RED_BITS: {configurable: false, enumerable: true, writable: false, value: 3410,},
    GREEN_BITS: {configurable: false, enumerable: true, writable: false, value: 3411,},
    BLUE_BITS: {configurable: false, enumerable: true, writable: false, value: 3412,},
    ALPHA_BITS: {configurable: false, enumerable: true, writable: false, value: 3413,},
    DEPTH_BITS: {configurable: false, enumerable: true, writable: false, value: 3414,},
    STENCIL_BITS: {configurable: false, enumerable: true, writable: false, value: 3415,},
    POLYGON_OFFSET_UNITS: {configurable: false, enumerable: true, writable: false, value: 10752,},
    POLYGON_OFFSET_FACTOR: {configurable: false, enumerable: true, writable: false, value: 32824,},
    TEXTURE_BINDING_2D: {configurable: false, enumerable: true, writable: false, value: 32873,},
    SAMPLE_BUFFERS: {configurable: false, enumerable: true, writable: false, value: 32936,},
    SAMPLES: {configurable: false, enumerable: true, writable: false, value: 32937,},
    SAMPLE_COVERAGE_VALUE: {configurable: false, enumerable: true, writable: false, value: 32938,},
    SAMPLE_COVERAGE_INVERT: {configurable: false, enumerable: true, writable: false, value: 32939,},
    COMPRESSED_TEXTURE_FORMATS: {configurable: false, enumerable: true, writable: false, value: 34467,},
    DONT_CARE: {configurable: false, enumerable: true, writable: false, value: 4352,},
    FASTEST: {configurable: false, enumerable: true, writable: false, value: 4353,},
    NICEST: {configurable: false, enumerable: true, writable: false, value: 4354,},
    GENERATE_MIPMAP_HINT: {configurable: false, enumerable: true, writable: false, value: 33170,},
    BYTE: {configurable: false, enumerable: true, writable: false, value: 5120,},
    UNSIGNED_BYTE: {configurable: false, enumerable: true, writable: false, value: 5121,},
    SHORT: {configurable: false, enumerable: true, writable: false, value: 5122,},
    UNSIGNED_SHORT: {configurable: false, enumerable: true, writable: false, value: 5123,},
    INT: {configurable: false, enumerable: true, writable: false, value: 5124,},
    UNSIGNED_INT: {configurable: false, enumerable: true, writable: false, value: 5125,},
    FLOAT: {configurable: false, enumerable: true, writable: false, value: 5126,},
    DEPTH_COMPONENT: {configurable: false, enumerable: true, writable: false, value: 6402,},
    ALPHA: {configurable: false, enumerable: true, writable: false, value: 6406,},
    RGB: {configurable: false, enumerable: true, writable: false, value: 6407,},
    RGBA: {configurable: false, enumerable: true, writable: false, value: 6408,},
    LUMINANCE: {configurable: false, enumerable: true, writable: false, value: 6409,},
    LUMINANCE_ALPHA: {configurable: false, enumerable: true, writable: false, value: 6410,},
    UNSIGNED_SHORT_4_4_4_4: {configurable: false, enumerable: true, writable: false, value: 32819,},
    UNSIGNED_SHORT_5_5_5_1: {configurable: false, enumerable: true, writable: false, value: 32820,},
    UNSIGNED_SHORT_5_6_5: {configurable: false, enumerable: true, writable: false, value: 33635,},
    FRAGMENT_SHADER: {configurable: false, enumerable: true, writable: false, value: 35632,},
    VERTEX_SHADER: {configurable: false, enumerable: true, writable: false, value: 35633,},
    MAX_VERTEX_ATTRIBS: {configurable: false, enumerable: true, writable: false, value: 34921,},
    MAX_VERTEX_UNIFORM_VECTORS: {configurable: false, enumerable: true, writable: false, value: 36347,},
    MAX_VARYING_VECTORS: {configurable: false, enumerable: true, writable: false, value: 36348,},
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: {configurable: false, enumerable: true, writable: false, value: 35661,},
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: {configurable: false, enumerable: true, writable: false, value: 35660,},
    MAX_TEXTURE_IMAGE_UNITS: {configurable: false, enumerable: true, writable: false, value: 34930,},
    MAX_FRAGMENT_UNIFORM_VECTORS: {configurable: false, enumerable: true, writable: false, value: 36349,},
    SHADER_TYPE: {configurable: false, enumerable: true, writable: false, value: 35663,},
    DELETE_STATUS: {configurable: false, enumerable: true, writable: false, value: 35712,},
    LINK_STATUS: {configurable: false, enumerable: true, writable: false, value: 35714,},
    VALIDATE_STATUS: {configurable: false, enumerable: true, writable: false, value: 35715,},
    ATTACHED_SHADERS: {configurable: false, enumerable: true, writable: false, value: 35717,},
    ACTIVE_UNIFORMS: {configurable: false, enumerable: true, writable: false, value: 35718,},
    ACTIVE_ATTRIBUTES: {configurable: false, enumerable: true, writable: false, value: 35721,},
    SHADING_LANGUAGE_VERSION: {configurable: false, enumerable: true, writable: false, value: 35724,},
    CURRENT_PROGRAM: {configurable: false, enumerable: true, writable: false, value: 35725,},
    NEVER: {configurable: false, enumerable: true, writable: false, value: 512,},
    LESS: {configurable: false, enumerable: true, writable: false, value: 513,},
    EQUAL: {configurable: false, enumerable: true, writable: false, value: 514,},
    LEQUAL: {configurable: false, enumerable: true, writable: false, value: 515,},
    GREATER: {configurable: false, enumerable: true, writable: false, value: 516,},
    NOTEQUAL: {configurable: false, enumerable: true, writable: false, value: 517,},
    GEQUAL: {configurable: false, enumerable: true, writable: false, value: 518,},
    ALWAYS: {configurable: false, enumerable: true, writable: false, value: 519,},
    KEEP: {configurable: false, enumerable: true, writable: false, value: 7680,},
    REPLACE: {configurable: false, enumerable: true, writable: false, value: 7681,},
    INCR: {configurable: false, enumerable: true, writable: false, value: 7682,},
    DECR: {configurable: false, enumerable: true, writable: false, value: 7683,},
    INVERT: {configurable: false, enumerable: true, writable: false, value: 5386,},
    INCR_WRAP: {configurable: false, enumerable: true, writable: false, value: 34055,},
    DECR_WRAP: {configurable: false, enumerable: true, writable: false, value: 34056,},
    VENDOR: {configurable: false, enumerable: true, writable: false, value: 7936,},
    RENDERER: {configurable: false, enumerable: true, writable: false, value: 7937,},
    VERSION: {configurable: false, enumerable: true, writable: false, value: 7938,},
    NEAREST: {configurable: false, enumerable: true, writable: false, value: 9728,},
    LINEAR: {configurable: false, enumerable: true, writable: false, value: 9729,},
    NEAREST_MIPMAP_NEAREST: {configurable: false, enumerable: true, writable: false, value: 9984,},
    LINEAR_MIPMAP_NEAREST: {configurable: false, enumerable: true, writable: false, value: 9985,},
    NEAREST_MIPMAP_LINEAR: {configurable: false, enumerable: true, writable: false, value: 9986,},
    LINEAR_MIPMAP_LINEAR: {configurable: false, enumerable: true, writable: false, value: 9987,},
    TEXTURE_MAG_FILTER: {configurable: false, enumerable: true, writable: false, value: 10240,},
    TEXTURE_MIN_FILTER: {configurable: false, enumerable: true, writable: false, value: 10241,},
    TEXTURE_WRAP_S: {configurable: false, enumerable: true, writable: false, value: 10242,},
    TEXTURE_WRAP_T: {configurable: false, enumerable: true, writable: false, value: 10243,},
    TEXTURE: {configurable: false, enumerable: true, writable: false, value: 5890,},
    TEXTURE_CUBE_MAP: {configurable: false, enumerable: true, writable: false, value: 34067,},
    TEXTURE_BINDING_CUBE_MAP: {configurable: false, enumerable: true, writable: false, value: 34068,},
    TEXTURE_CUBE_MAP_POSITIVE_X: {configurable: false, enumerable: true, writable: false, value: 34069,},
    TEXTURE_CUBE_MAP_NEGATIVE_X: {configurable: false, enumerable: true, writable: false, value: 34070,},
    TEXTURE_CUBE_MAP_POSITIVE_Y: {configurable: false, enumerable: true, writable: false, value: 34071,},
    TEXTURE_CUBE_MAP_NEGATIVE_Y: {configurable: false, enumerable: true, writable: false, value: 34072,},
    TEXTURE_CUBE_MAP_POSITIVE_Z: {configurable: false, enumerable: true, writable: false, value: 34073,},
    TEXTURE_CUBE_MAP_NEGATIVE_Z: {configurable: false, enumerable: true, writable: false, value: 34074,},
    MAX_CUBE_MAP_TEXTURE_SIZE: {configurable: false, enumerable: true, writable: false, value: 34076,},
    TEXTURE0: {configurable: false, enumerable: true, writable: false, value: 33984,},
    TEXTURE1: {configurable: false, enumerable: true, writable: false, value: 33985,},
    TEXTURE2: {configurable: false, enumerable: true, writable: false, value: 33986,},
    TEXTURE3: {configurable: false, enumerable: true, writable: false, value: 33987,},
    TEXTURE4: {configurable: false, enumerable: true, writable: false, value: 33988,},
    TEXTURE5: {configurable: false, enumerable: true, writable: false, value: 33989,},
    TEXTURE6: {configurable: false, enumerable: true, writable: false, value: 33990,},
    TEXTURE7: {configurable: false, enumerable: true, writable: false, value: 33991,},
    TEXTURE8: {configurable: false, enumerable: true, writable: false, value: 33992,},
    TEXTURE9: {configurable: false, enumerable: true, writable: false, value: 33993,},
    TEXTURE10: {configurable: false, enumerable: true, writable: false, value: 33994,},
    TEXTURE11: {configurable: false, enumerable: true, writable: false, value: 33995,},
    TEXTURE12: {configurable: false, enumerable: true, writable: false, value: 33996,},
    TEXTURE13: {configurable: false, enumerable: true, writable: false, value: 33997,},
    TEXTURE14: {configurable: false, enumerable: true, writable: false, value: 33998,},
    TEXTURE15: {configurable: false, enumerable: true, writable: false, value: 33999,},
    TEXTURE16: {configurable: false, enumerable: true, writable: false, value: 34000,},
    TEXTURE17: {configurable: false, enumerable: true, writable: false, value: 34001,},
    TEXTURE18: {configurable: false, enumerable: true, writable: false, value: 34002,},
    TEXTURE19: {configurable: false, enumerable: true, writable: false, value: 34003,},
    TEXTURE20: {configurable: false, enumerable: true, writable: false, value: 34004,},
    TEXTURE21: {configurable: false, enumerable: true, writable: false, value: 34005,},
    TEXTURE22: {configurable: false, enumerable: true, writable: false, value: 34006,},
    TEXTURE23: {configurable: false, enumerable: true, writable: false, value: 34007,},
    TEXTURE24: {configurable: false, enumerable: true, writable: false, value: 34008,},
    TEXTURE25: {configurable: false, enumerable: true, writable: false, value: 34009,},
    TEXTURE26: {configurable: false, enumerable: true, writable: false, value: 34010,},
    TEXTURE27: {configurable: false, enumerable: true, writable: false, value: 34011,},
    TEXTURE28: {configurable: false, enumerable: true, writable: false, value: 34012,},
    TEXTURE29: {configurable: false, enumerable: true, writable: false, value: 34013,},
    TEXTURE30: {configurable: false, enumerable: true, writable: false, value: 34014,},
    TEXTURE31: {configurable: false, enumerable: true, writable: false, value: 34015,},
    ACTIVE_TEXTURE: {configurable: false, enumerable: true, writable: false, value: 34016,},
    REPEAT: {configurable: false, enumerable: true, writable: false, value: 10497,},
    CLAMP_TO_EDGE: {configurable: false, enumerable: true, writable: false, value: 33071,},
    MIRRORED_REPEAT: {configurable: false, enumerable: true, writable: false, value: 33648,},
    FLOAT_VEC2: {configurable: false, enumerable: true, writable: false, value: 35664,},
    FLOAT_VEC3: {configurable: false, enumerable: true, writable: false, value: 35665,},
    FLOAT_VEC4: {configurable: false, enumerable: true, writable: false, value: 35666,},
    INT_VEC2: {configurable: false, enumerable: true, writable: false, value: 35667,},
    INT_VEC3: {configurable: false, enumerable: true, writable: false, value: 35668,},
    INT_VEC4: {configurable: false, enumerable: true, writable: false, value: 35669,},
    BOOL: {configurable: false, enumerable: true, writable: false, value: 35670,},
    BOOL_VEC2: {configurable: false, enumerable: true, writable: false, value: 35671,},
    BOOL_VEC3: {configurable: false, enumerable: true, writable: false, value: 35672,},
    BOOL_VEC4: {configurable: false, enumerable: true, writable: false, value: 35673,},
    FLOAT_MAT2: {configurable: false, enumerable: true, writable: false, value: 35674,},
    FLOAT_MAT3: {configurable: false, enumerable: true, writable: false, value: 35675,},
    FLOAT_MAT4: {configurable: false, enumerable: true, writable: false, value: 35676,},
    SAMPLER_2D: {configurable: false, enumerable: true, writable: false, value: 35678,},
    SAMPLER_CUBE: {configurable: false, enumerable: true, writable: false, value: 35680,},
    VERTEX_ATTRIB_ARRAY_ENABLED: {configurable: false, enumerable: true, writable: false, value: 34338,},
    VERTEX_ATTRIB_ARRAY_SIZE: {configurable: false, enumerable: true, writable: false, value: 34339,},
    VERTEX_ATTRIB_ARRAY_STRIDE: {configurable: false, enumerable: true, writable: false, value: 34340,},
    VERTEX_ATTRIB_ARRAY_TYPE: {configurable: false, enumerable: true, writable: false, value: 34341,},
    VERTEX_ATTRIB_ARRAY_NORMALIZED: {configurable: false, enumerable: true, writable: false, value: 34922,},
    VERTEX_ATTRIB_ARRAY_POINTER: {configurable: false, enumerable: true, writable: false, value: 34373,},
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: {configurable: false, enumerable: true, writable: false, value: 34975,},
    IMPLEMENTATION_COLOR_READ_TYPE: {configurable: false, enumerable: true, writable: false, value: 35738,},
    IMPLEMENTATION_COLOR_READ_FORMAT: {configurable: false, enumerable: true, writable: false, value: 35739,},
    COMPILE_STATUS: {configurable: false, enumerable: true, writable: false, value: 35713,},
    LOW_FLOAT: {configurable: false, enumerable: true, writable: false, value: 36336,},
    MEDIUM_FLOAT: {configurable: false, enumerable: true, writable: false, value: 36337,},
    HIGH_FLOAT: {configurable: false, enumerable: true, writable: false, value: 36338,},
    LOW_INT: {configurable: false, enumerable: true, writable: false, value: 36339,},
    MEDIUM_INT: {configurable: false, enumerable: true, writable: false, value: 36340,},
    HIGH_INT: {configurable: false, enumerable: true, writable: false, value: 36341,},
    FRAMEBUFFER: {configurable: false, enumerable: true, writable: false, value: 36160,},
    RENDERBUFFER: {configurable: false, enumerable: true, writable: false, value: 36161,},
    RGBA4: {configurable: false, enumerable: true, writable: false, value: 32854,},
    RGB5_A1: {configurable: false, enumerable: true, writable: false, value: 32855,},
    RGB565: {configurable: false, enumerable: true, writable: false, value: 36194,},
    DEPTH_COMPONENT16: {configurable: false, enumerable: true, writable: false, value: 33189,},
    STENCIL_INDEX8: {configurable: false, enumerable: true, writable: false, value: 36168,},
    DEPTH_STENCIL: {configurable: false, enumerable: true, writable: false, value: 34041,},
    RENDERBUFFER_WIDTH: {configurable: false, enumerable: true, writable: false, value: 36162,},
    RENDERBUFFER_HEIGHT: {configurable: false, enumerable: true, writable: false, value: 36163,},
    RENDERBUFFER_INTERNAL_FORMAT: {configurable: false, enumerable: true, writable: false, value: 36164,},
    RENDERBUFFER_RED_SIZE: {configurable: false, enumerable: true, writable: false, value: 36176,},
    RENDERBUFFER_GREEN_SIZE: {configurable: false, enumerable: true, writable: false, value: 36177,},
    RENDERBUFFER_BLUE_SIZE: {configurable: false, enumerable: true, writable: false, value: 36178,},
    RENDERBUFFER_ALPHA_SIZE: {configurable: false, enumerable: true, writable: false, value: 36179,},
    RENDERBUFFER_DEPTH_SIZE: {configurable: false, enumerable: true, writable: false, value: 36180,},
    RENDERBUFFER_STENCIL_SIZE: {configurable: false, enumerable: true, writable: false, value: 36181,},
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: {configurable: false, enumerable: true, writable: false, value: 36048,},
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: {configurable: false, enumerable: true, writable: false, value: 36049,},
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: {configurable: false, enumerable: true, writable: false, value: 36050,},
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: 36051,
    },
    COLOR_ATTACHMENT0: {configurable: false, enumerable: true, writable: false, value: 36064,},
    DEPTH_ATTACHMENT: {configurable: false, enumerable: true, writable: false, value: 36096,},
    STENCIL_ATTACHMENT: {configurable: false, enumerable: true, writable: false, value: 36128,},
    DEPTH_STENCIL_ATTACHMENT: {configurable: false, enumerable: true, writable: false, value: 33306,},
    NONE: {configurable: false, enumerable: true, writable: false, value: 0,},
    FRAMEBUFFER_COMPLETE: {configurable: false, enumerable: true, writable: false, value: 36053,},
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: {configurable: false, enumerable: true, writable: false, value: 36054,},
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: {configurable: false, enumerable: true, writable: false, value: 36055,},
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: {configurable: false, enumerable: true, writable: false, value: 36057,},
    FRAMEBUFFER_UNSUPPORTED: {configurable: false, enumerable: true, writable: false, value: 36061,},
    FRAMEBUFFER_BINDING: {configurable: false, enumerable: true, writable: false, value: 36006,},
    RENDERBUFFER_BINDING: {configurable: false, enumerable: true, writable: false, value: 36007,},
    MAX_RENDERBUFFER_SIZE: {configurable: false, enumerable: true, writable: false, value: 34024,},
    INVALID_FRAMEBUFFER_OPERATION: {configurable: false, enumerable: true, writable: false, value: 1286,},
    UNPACK_FLIP_Y_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37440,},
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37441,},
    CONTEXT_LOST_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37442,},
    UNPACK_COLORSPACE_CONVERSION_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37443,},
    BROWSER_DEFAULT_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37444,},
    activeTexture: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function activeTexture() {
            debugger;
        }),
    },
    attachShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function attachShader() {
            debugger;
        }),
    },
    bindAttribLocation: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function bindAttribLocation() {
            debugger;
        }),
    },
    bindRenderbuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function bindRenderbuffer() {
            debugger;
        }),
    },
    blendColor: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function blendColor() {
            debugger;
        }),
    },
    blendEquation: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function blendEquation() {
            debugger;
        }),
    },
    blendEquationSeparate: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function blendEquationSeparate() {
            debugger;
        }),
    },
    blendFunc: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function blendFunc() {
            debugger;
        }),
    },
    blendFuncSeparate: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function blendFuncSeparate() {
            debugger;
        }),
    },
    bufferData: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function bufferData() {
            debugger;
        }),
    },
    bufferSubData: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function bufferSubData() {
            debugger;
        }),
    },
    checkFramebufferStatus: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function checkFramebufferStatus() {
            debugger;
        }),
    },
    compileShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function compileShader() {
            debugger;
        }),
    },
    compressedTexImage2D: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function compressedTexImage2D() {
            debugger;
        }),
    },
    compressedTexSubImage2D: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function compressedTexSubImage2D() {
            debugger;
        }),
    },
    copyTexImage2D: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function copyTexImage2D() {
            debugger;
        }),
    },
    copyTexSubImage2D: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function copyTexSubImage2D() {
            debugger;
        }),
    },
    createBuffer: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createBuffer() {
            debugger;
        }),
    },
    createFramebuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createFramebuffer() {
            debugger;
        }),
    },
    createProgram: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createProgram() {
            debugger;
        }),
    },
    createRenderbuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function createRenderbuffer() {
            debugger;
        }),
    },
    createShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createShader() {
            debugger;
        }),
    },
    createTexture: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function createTexture() {
            debugger;
        }),
    },
    cullFace: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function cullFace() {
            debugger;
        }),
    },
    deleteBuffer: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function deleteBuffer() {
            debugger;
        }),
    },
    deleteFramebuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function deleteFramebuffer() {
            debugger;
        }),
    },
    deleteProgram: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function deleteProgram() {
            debugger;
        }),
    },
    deleteRenderbuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function deleteRenderbuffer() {
            debugger;
        }),
    },
    deleteShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function deleteShader() {
            debugger;
        }),
    },
    deleteTexture: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function deleteTexture() {
            debugger;
        }),
    },
    depthFunc: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function depthFunc() {
            debugger;
        }),
    },
    depthMask: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function depthMask() {
            debugger;
        }),
    },
    depthRange: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function depthRange() {
            debugger;
        }),
    },
    detachShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function detachShader() {
            debugger;
        }),
    },
    disable: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function disable() {
            debugger;
        }),
    },
    enable: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function enable() {
            debugger;
        }),
    },
    finish: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function finish() {
            debugger;
        }),
    },
    flush: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function flush() {
            debugger;
        }),
    },
    framebufferRenderbuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function framebufferRenderbuffer() {
            debugger;
        }),
    },
    framebufferTexture2D: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function framebufferTexture2D() {
            debugger;
        }),
    },
    frontFace: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function frontFace() {
            debugger;
        }),
    },
    generateMipmap: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function generateMipmap() {
            debugger;
        }),
    },
    getActiveAttrib: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getActiveAttrib() {
            debugger;
        }),
    },
    getActiveUniform: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getActiveUniform() {
            debugger;
        }),
    },
    getAttachedShaders: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttachedShaders() {
            debugger;
        }),
    },
    getAttribLocation: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getAttribLocation() {
            debugger;
        }),
    },
    getBufferParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getBufferParameter() {
            debugger;
        }),
    },
    getContextAttributes: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getContextAttributes() {
            debugger;
        }),
    },
    getError: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getError() {
            debugger;
        }),
    },
    getExtension: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getExtension(name) {
            console.log(`getExtension ${name}`);
            let result = my_env_temp.webgl_extension[name];
            if (!result) {
                debugger;
                result = null;
            }
            return result;
        }),
    },
    getFramebufferAttachmentParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getFramebufferAttachmentParameter() {
            debugger;
        }),
    },
    getParameter: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getParameter(pname) {
            switch (pname) {
                case 37445:
                    return global.cursor_config.fp.UNMASKED_VENDOR_WEBGL;
                case 37446:
                    return global.cursor_config.fp.UNMASKED_RENDERER_WEBGL
                default:
                    debugger
            }
        }),
    },
    getProgramInfoLog: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getProgramInfoLog() {
            debugger;
        }),
    },
    getProgramParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getProgramParameter() {
            debugger;
        }),
    },
    getRenderbufferParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getRenderbufferParameter() {
            debugger;
        }),
    },
    getShaderInfoLog: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getShaderInfoLog() {
            debugger;
        }),
    },
    getShaderParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getShaderParameter() {
            debugger;
        }),
    },
    getShaderPrecisionFormat: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getShaderPrecisionFormat() {
            debugger;
        }),
    },
    getShaderSource: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getShaderSource() {
            debugger;
        }),
    },
    getSupportedExtensions: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getSupportedExtensions() {
            debugger;
        }),
    },
    getTexParameter: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getTexParameter() {
            debugger;
        }),
    },
    getUniform: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function getUniform() {
            debugger;
        }),
    },
    getUniformLocation: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getUniformLocation() {
            debugger;
        }),
    },
    getVertexAttrib: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getVertexAttrib() {
            debugger;
        }),
    },
    getVertexAttribOffset: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getVertexAttribOffset() {
            debugger;
        }),
    },
    hint: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function hint() {
            debugger;
        }),
    },
    isBuffer: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isBuffer() {
            debugger;
        }),
    },
    isContextLost: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isContextLost() {
            debugger;
        }),
    },
    isEnabled: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isEnabled() {
            debugger;
        }),
    },
    isFramebuffer: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isFramebuffer() {
            debugger;
        }),
    },
    isProgram: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isProgram() {
            debugger;
        }),
    },
    isRenderbuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function isRenderbuffer() {
            debugger;
        }),
    },
    isShader: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isShader() {
            debugger;
        }),
    },
    isTexture: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function isTexture() {
            debugger;
        }),
    },
    lineWidth: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function lineWidth() {
            debugger;
        }),
    },
    linkProgram: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function linkProgram() {
            debugger;
        }),
    },
    pixelStorei: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function pixelStorei() {
            debugger;
        }),
    },
    polygonOffset: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function polygonOffset() {
            debugger;
        }),
    },
    readPixels: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function readPixels() {
            debugger;
        }),
    },
    renderbufferStorage: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function renderbufferStorage() {
            debugger;
        }),
    },
    sampleCoverage: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function sampleCoverage() {
            debugger;
        }),
    },
    shaderSource: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function shaderSource() {
            debugger;
        }),
    },
    stencilFunc: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function stencilFunc() {
            debugger;
        }),
    },
    stencilFuncSeparate: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function stencilFuncSeparate() {
            debugger;
        }),
    },
    stencilMask: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function stencilMask() {
            debugger;
        }),
    },
    stencilMaskSeparate: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function stencilMaskSeparate() {
            debugger;
        }),
    },
    stencilOp: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function stencilOp() {
            debugger;
        }),
    },
    stencilOpSeparate: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function stencilOpSeparate() {
            debugger;
        }),
    },
    texImage2D: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function texImage2D() {
            debugger;
        }),
    },
    texParameterf: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function texParameterf() {
            debugger;
        }),
    },
    texParameteri: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function texParameteri() {
            debugger;
        }),
    },
    texSubImage2D: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function texSubImage2D() {
            debugger;
        }),
    },
    useProgram: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function useProgram() {
            debugger;
        }),
    },
    validateProgram: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function validateProgram() {
            debugger;
        }),
    },
    bindBuffer: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function bindBuffer() {
            debugger;
        }),
    },
    bindFramebuffer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function bindFramebuffer() {
            debugger;
        }),
    },
    bindTexture: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function bindTexture() {
            debugger;
        }),
    },
    clear: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clear() {
            debugger;
        }),
    },
    clearColor: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clearColor() {
            debugger;
        }),
    },
    clearDepth: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clearDepth() {
            debugger;
        }),
    },
    clearStencil: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function clearStencil() {
            debugger;
        }),
    },
    colorMask: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function colorMask() {
            debugger;
        }),
    },
    disableVertexAttribArray: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function disableVertexAttribArray() {
            debugger;
        }),
    },
    drawArrays: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function drawArrays() {
            debugger;
        }),
    },
    drawElements: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function drawElements() {
            debugger;
        }),
    },
    enableVertexAttribArray: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function enableVertexAttribArray() {
            debugger;
        }),
    },
    scissor: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function scissor() {
            debugger;
        }),
    },
    uniform1f: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform1f() {
            debugger;
        }),
    },
    uniform1fv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform1fv() {
            debugger;
        }),
    },
    uniform1i: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform1i() {
            debugger;
        }),
    },
    uniform1iv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform1iv() {
            debugger;
        }),
    },
    uniform2f: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform2f() {
            debugger;
        }),
    },
    uniform2fv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform2fv() {
            debugger;
        }),
    },
    uniform2i: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform2i() {
            debugger;
        }),
    },
    uniform2iv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform2iv() {
            debugger;
        }),
    },
    uniform3f: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform3f() {
            debugger;
        }),
    },
    uniform3fv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform3fv() {
            debugger;
        }),
    },
    uniform3i: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform3i() {
            debugger;
        }),
    },
    uniform3iv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform3iv() {
            debugger;
        }),
    },
    uniform4f: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform4f() {
            debugger;
        }),
    },
    uniform4fv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform4fv() {
            debugger;
        }),
    },
    uniform4i: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform4i() {
            debugger;
        }),
    },
    uniform4iv: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function uniform4iv() {
            debugger;
        }),
    },
    uniformMatrix2fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function uniformMatrix2fv() {
            debugger;
        }),
    },
    uniformMatrix3fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function uniformMatrix3fv() {
            debugger;
        }),
    },
    uniformMatrix4fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function uniformMatrix4fv() {
            debugger;
        }),
    },
    vertexAttrib1f: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib1f() {
            debugger;
        }),
    },
    vertexAttrib1fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib1fv() {
            debugger;
        }),
    },
    vertexAttrib2f: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib2f() {
            debugger;
        }),
    },
    vertexAttrib2fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib2fv() {
            debugger;
        }),
    },
    vertexAttrib3f: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib3f() {
            debugger;
        }),
    },
    vertexAttrib3fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib3fv() {
            debugger;
        }),
    },
    vertexAttrib4f: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib4f() {
            debugger;
        }),
    },
    vertexAttrib4fv: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttrib4fv() {
            debugger;
        }),
    },
    vertexAttribPointer: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function vertexAttribPointer() {
            debugger;
        }),
    },
    viewport: {
        configurable: true, enumerable: true, writable: true, value: antiToString(function viewport() {
            debugger;
        }),
    },
    drawingBufferFormat: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return 32856;
        }),
    },
    RGB8: {configurable: false, enumerable: true, writable: false, value: 32849,},
    RGBA8: {configurable: false, enumerable: true, writable: false, value: 32856,},
    drawingBufferStorage: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function drawingBufferStorage() {
            debugger;
        }),
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function WebGLRenderingContext() {
            debugger;
        }),
    },
    makeXRCompatible: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function makeXRCompatible() {
            debugger;
        }),
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "WebGLRenderingContext",},

})
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "canvas", true, false, false, "get canvas");
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "drawingBufferWidth", true, false, false, "get drawingBufferWidth");
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "drawingBufferHeight", true, false, false, "get drawingBufferHeight");
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "drawingBufferColorSpace", true, false, false, "get drawingBufferColorSpace");
setAccessorNamePropertyDescriptor('set', window.WebGLRenderingContext.prototype, "drawingBufferColorSpace", true, false, false, "set drawingBufferColorSpace");
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "unpackColorSpace", true, false, false, "get unpackColorSpace");
setAccessorNamePropertyDescriptor('set', window.WebGLRenderingContext.prototype, "unpackColorSpace", true, false, false, "set unpackColorSpace");
setAccessorNamePropertyDescriptor('get', window.WebGLRenderingContext.prototype, "drawingBufferFormat", true, false, false, "get drawingBufferFormat");


let WebGLDebugRendererInfo = {};
Object.defineProperties(WebGLDebugRendererInfo, {
    UNMASKED_VENDOR_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37445,},
    UNMASKED_RENDERER_WEBGL: {configurable: false, enumerable: true, writable: false, value: 37446,},
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "WebGLDebugRendererInfo",},

})

Object.defineProperty(window, "HTMLIFrameElement", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: antiToString(function HTMLIFrameElement() {
        if (!new_toggle) {
            throw TypeError("Illegal constructor}")
        }
    })
});

Object.defineProperties(window.HTMLIFrameElement.prototype, {
    src: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    srcdoc: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return this.myObj.srcdoc;
        }), set: antiToString(function set(value) {
            this.myObj.srcdoc = value;
        })
    },
    name: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    sandbox: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    allowFullscreen: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    width: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    height: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    contentDocument: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return null;
        }),
    },
    contentWindow: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return this.myObj.contentWindow;
        }),
    },
    referrerPolicy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    csp: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    allow: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    featurePolicy: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            debugger;
        }),
    },
    loading: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "auto";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    align: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    scrolling: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    frameBorder: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    longDesc: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    marginHeight: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    marginWidth: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    getSVGDocument: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: antiToString(function getSVGDocument() {
            debugger;
        }),
    },
    credentialless: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    allowPaymentRequest: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: antiToString(function HTMLIFrameElement() {
            debugger;
        }),
    },
    privateToken: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return "";
        }), set: antiToString(function set() {
            debugger;
        })
    },
    browsingTopics: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    adAuctionHeaders: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    sharedStorageWritable: {
        configurable: true, enumerable: true, get: antiToString(function get() {
            return false;
        }), set: antiToString(function set() {
            debugger;
        })
    },
    [Symbol.toStringTag]: {configurable: true, enumerable: false, writable: false, value: "HTMLIFrameElement",},

})
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "src", true, false, false, "get src");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "src", true, false, false, "set src");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "srcdoc", true, false, false, "get srcdoc");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "srcdoc", true, false, false, "set srcdoc");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "name", true, false, false, "get name");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "name", true, false, false, "set name");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "sandbox", true, false, false, "get sandbox");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "sandbox", true, false, false, "set sandbox");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "allowFullscreen", true, false, false, "get allowFullscreen");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "allowFullscreen", true, false, false, "set allowFullscreen");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "width", true, false, false, "get width");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "width", true, false, false, "set width");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "height", true, false, false, "get height");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "height", true, false, false, "set height");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "contentDocument", true, false, false, "get contentDocument");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "contentWindow", true, false, false, "get contentWindow");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "referrerPolicy", true, false, false, "get referrerPolicy");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "referrerPolicy", true, false, false, "set referrerPolicy");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "csp", true, false, false, "get csp");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "csp", true, false, false, "set csp");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "allow", true, false, false, "get allow");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "allow", true, false, false, "set allow");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "featurePolicy", true, false, false, "get featurePolicy");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "loading", true, false, false, "get loading");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "loading", true, false, false, "set loading");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "align", true, false, false, "get align");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "align", true, false, false, "set align");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "scrolling", true, false, false, "get scrolling");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "scrolling", true, false, false, "set scrolling");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "frameBorder", true, false, false, "get frameBorder");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "frameBorder", true, false, false, "set frameBorder");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "longDesc", true, false, false, "get longDesc");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "longDesc", true, false, false, "set longDesc");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "marginHeight", true, false, false, "get marginHeight");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "marginHeight", true, false, false, "set marginHeight");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "marginWidth", true, false, false, "get marginWidth");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "marginWidth", true, false, false, "set marginWidth");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "credentialless", true, false, false, "get credentialless");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "credentialless", true, false, false, "set credentialless");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "allowPaymentRequest", true, false, false, "get allowPaymentRequest");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "allowPaymentRequest", true, false, false, "set allowPaymentRequest");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "privateToken", true, false, false, "get privateToken");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "privateToken", true, false, false, "set privateToken");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "browsingTopics", true, false, false, "get browsingTopics");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "browsingTopics", true, false, false, "set browsingTopics");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "adAuctionHeaders", true, false, false, "get adAuctionHeaders");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "adAuctionHeaders", true, false, false, "set adAuctionHeaders");
setAccessorNamePropertyDescriptor('get', window.HTMLIFrameElement.prototype, "sharedStorageWritable", true, false, false, "get sharedStorageWritable");
setAccessorNamePropertyDescriptor('set', window.HTMLIFrameElement.prototype, "sharedStorageWritable", true, false, false, "set sharedStorageWritable");

Object.setPrototypeOf(window.HTMLIFrameElement.prototype, window.HTMLElement.prototype);



Object.defineProperty(window,"HTMLBodyElement",{
configurable: true,
enumerable: false,
writable: true,
value: antiToString(function HTMLBodyElement(){ if (!new_toggle) {throw TypeError("Illegal constructor}")} })
});

Object.defineProperties(window.HTMLBodyElement.prototype,{
text: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
link: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
vLink: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
aLink: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
bgColor: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
background: {configurable: true,enumerable: true,get: antiToString(function get() { return ""; }),set: antiToString(function set() { debugger; })    },
onblur: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onerror: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onfocus: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onload: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onresize: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onscroll: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onafterprint: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onbeforeprint: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onbeforeunload: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onhashchange: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onlanguagechange: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onmessage: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onmessageerror: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onoffline: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
ononline: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onpagehide: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onpageshow: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onpopstate: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onrejectionhandled: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onstorage: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onunhandledrejection: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
onunload: {configurable: true,enumerable: true,get: antiToString(function get() { return null; }),set: antiToString(function set() { debugger; })    },
constructor: {configurable: true,enumerable: false,writable: true,value: antiToString(function HTMLBodyElement() { debugger; }),    },
[Symbol.toStringTag]: {configurable: true,enumerable: false,writable: false,value: "HTMLBodyElement",    },

})
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"text",true,false,false,"get text");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"text",true,false,false,"set text");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"link",true,false,false,"get link");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"link",true,false,false,"set link");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"vLink",true,false,false,"get vLink");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"vLink",true,false,false,"set vLink");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"aLink",true,false,false,"get aLink");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"aLink",true,false,false,"set aLink");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"bgColor",true,false,false,"get bgColor");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"bgColor",true,false,false,"set bgColor");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"background",true,false,false,"get background");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"background",true,false,false,"set background");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onblur",true,false,false,"get onblur");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onblur",true,false,false,"set onblur");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onerror",true,false,false,"get onerror");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onerror",true,false,false,"set onerror");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onfocus",true,false,false,"get onfocus");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onfocus",true,false,false,"set onfocus");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onload",true,false,false,"get onload");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onload",true,false,false,"set onload");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onresize",true,false,false,"get onresize");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onresize",true,false,false,"set onresize");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onscroll",true,false,false,"get onscroll");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onscroll",true,false,false,"set onscroll");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onafterprint",true,false,false,"get onafterprint");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onafterprint",true,false,false,"set onafterprint");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onbeforeprint",true,false,false,"get onbeforeprint");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onbeforeprint",true,false,false,"set onbeforeprint");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onbeforeunload",true,false,false,"get onbeforeunload");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onbeforeunload",true,false,false,"set onbeforeunload");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onhashchange",true,false,false,"get onhashchange");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onhashchange",true,false,false,"set onhashchange");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onlanguagechange",true,false,false,"get onlanguagechange");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onlanguagechange",true,false,false,"set onlanguagechange");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onmessage",true,false,false,"get onmessage");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onmessage",true,false,false,"set onmessage");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onmessageerror",true,false,false,"get onmessageerror");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onmessageerror",true,false,false,"set onmessageerror");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onoffline",true,false,false,"get onoffline");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onoffline",true,false,false,"set onoffline");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"ononline",true,false,false,"get ononline");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"ononline",true,false,false,"set ononline");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onpagehide",true,false,false,"get onpagehide");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onpagehide",true,false,false,"set onpagehide");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onpageshow",true,false,false,"get onpageshow");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onpageshow",true,false,false,"set onpageshow");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onpopstate",true,false,false,"get onpopstate");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onpopstate",true,false,false,"set onpopstate");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onrejectionhandled",true,false,false,"get onrejectionhandled");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onrejectionhandled",true,false,false,"set onrejectionhandled");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onstorage",true,false,false,"get onstorage");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onstorage",true,false,false,"set onstorage");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onunhandledrejection",true,false,false,"get onunhandledrejection");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onunhandledrejection",true,false,false,"set onunhandledrejection");
setAccessorNamePropertyDescriptor('get',window.HTMLBodyElement.prototype,"onunload",true,false,false,"get onunload");
setAccessorNamePropertyDescriptor('set',window.HTMLBodyElement.prototype,"onunload",true,false,false,"set onunload");

Object.setPrototypeOf(window.HTMLBodyElement.prototype, window.HTMLElement.prototype);


// ========= 环境初始化 =======
window.navigator = new window.Navigator();
window.window = window;

window.document = new window.HTMLDocument();
my_env_temp.documentElement = new window.HTMLHtmlElement();
my_env_temp.currentScript = new window.HTMLScriptElement();
window.external = new window.External();
window.Math = global.Math;
window.Object = global.Object;
window.encodeURIComponent = global.encodeURIComponent;
window.unescape = global.unescape;
global.XMLHttpRequest = window.XMLHttpRequest;

my_env_temp.canvas = new window.HTMLCanvasElement();
my_env_temp.webgl_ctx = new window.WebGLRenderingContext();
my_env_temp.webgl_extension = {
    WEBGL_debug_renderer_info: WebGLDebugRendererInfo
}

my_env_temp.body = new window.HTMLBodyElement();

// ========= iframe 初始化 =======

my_env_temp.iframe = new window.HTMLIFrameElement();
let contentWindow = new Window();

my_env_temp.iframe.myObj = {
    contentWindow: contentWindow
};

Object.defineProperty(contentWindow,"Error",{
configurable: true,
enumerable: false,
writable: true,
value: antiToString(function Error(){  })
});


contentWindow.Object = {
    defineProperty(o,p,attr) {
        return Object.defineProperty(o,p,attr);
    }
};
contentWindow.console = {
    log(){

    }
}

// ========= iframe 初始化 END =======



new_toggle = false;


