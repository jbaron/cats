interface IMap { [key: string]: any; }
declare class ErrorImpl implements Error { name: string; message: string; }
declare module qx {
    class Bootstrap {
        static base(args: any, varargs: any): any;
        static bind(func: Function, self?: any, varargs?: any): Function;
        static debug(object: any, message: any): void;
        static define(name?: string, config?: IMap): qx.Class;
        static error(object: any, message: any): void;
        static extendClass(clazz: Function, construct: Function, superClass: Function, name: Function, basename: Function): void;
        static firstLow(str: string): string;
        static firstUp(str: string): string;
        static getByName(name: string): qx.Class;
        static getClass(value: any): string;
        static getEnvironmentSetting(key: string): any;
        static info(object: any, message: any): void;
        static isArray(value: any): boolean;
        static isFunction(value: any): boolean;
        static isObject(value: any): boolean;
        static isString(value: any): boolean;
        static objectGetLength(map: any): number;
        static objectMergeWith(target: any, source: any, overwrite?: boolean): any;
        static setDisplayName(fcn: Function, classname: string, name: string): void;
        static setDisplayNames(functionMap: any, classname: string): void;
        static setEnvironmentSetting(key: string, value: any): void;
        static trace(object: any): void;
        static warn(object: any, message: any): void;
    }
}
declare module qx {
    class Class {
        static define(name?: string, config?: IMap): qx.Class;
        static getByInterface(clazz: qx.Class, iface: any): any;
        static getByMixin(clazz: qx.Class, mixin: any): any;
        static getByName(name: string): qx.Class;
        static getByProperty(clazz: qx.Class, name: string): any;
        static getEventType(clazz: qx.Class, name: string): any;
        static getInterfaces(clazz: qx.Class): any[];
        static getMixins(clazz: qx.Class): any[];
        static getProperties(clazz: qx.Class): string[];
        static getPropertyDefinition(clazz: qx.Class, name: string): any;
        static getTotalNumber(): number;
        static hasInterface(clazz: qx.Class, iface: any): boolean;
        static hasMixin(clazz: qx.Class, mixin: any): boolean;
        static hasOwnInterface(clazz: qx.Class, iface: any): boolean;
        static hasOwnMixin(clazz: qx.Class, mixin: any): boolean;
        static hasProperty(clazz: qx.Class, name: string): boolean;
        static implementsInterface(obj: any, iface: any): boolean;
        static include(clazz: qx.Class, mixin: any): void;
        static isDefined(name: string): boolean;
        static isSubClassOf(clazz: qx.Class, superClass: qx.Class): boolean;
        static patch(clazz: qx.Class, mixin: any): void;
        static supportsEvent(clazz: qx.Class, name: string): boolean;
        static undefine(name: string): void;
    }
}
declare module qx {
    class Interface {
        static assert(clazz: qx.Class, iface: any, wrap?: boolean): void;
        static assertObject(object: qx.core.Object, iface: any): void;
        static classImplements(clazz: qx.Class, iface: any): boolean;
        static define(name: string, config?: IMap): qx.Interface;
        static flatten(ifaces?: any[]): qx.data.Array;
        static getByName(name: string): qx.Class;
        static getTotalNumber(): number;
        static isDefined(name: string): boolean;
        static objectImplements(object: qx.core.Object, iface: any): boolean;
    }
}
declare module qx {
    class Mixin {
        static checkCompatibility(mixins: any[]): boolean;
        static define(name: string, config?: IMap): qx.Mixin;
        static flatten(mixins?: any[]): qx.data.Array;
        static getByName(name: string): qx.Class;
        static getTotalNumber(): number;
        static isCompatible(mixin: any, clazz: qx.Class): boolean;
        static isDefined(name: string): boolean;
    }
}
declare module qx {
    class Part {
        constructor(loader: any);
        static $$notifyLoad(id: string, closure: Function): void;
        static getInstance(): qx.Part;
        static preload(partNames: string[]): void;
        static require(partNames: string[], callback: Function, self?: any): void;
    }
}
declare module qx {
    class Theme {
        static define(name: string, config: IMap): void;
        static getAll(): IMap;
        static getByName(name: string): any;
        static getTotalNumber(): number;
        static include(theme: any, mixinTheme: any): void;
        static isDefined(name: string): boolean;
        static patch(theme: any, mixinTheme: any): void;
    }
}
declare module qx.application {
    class AbstractGui extends qx.core.Object implements qx.application.IApplication {
        close(): string;
        finalize(): void;
        main(): void;
        terminate(): void;
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        protected _createRootWidget(): qx.ui.core.Widget;
        getRoot(): qx.ui.core.Widget;
        render(): void;
    }
}
declare module qx.application {
    class Basic extends qx.core.Object implements qx.application.IApplication {
        close(): string;
        finalize(): void;
        main(): void;
        terminate(): void;
    }
}
declare module qx.application {
    interface IApplication {
        close(): string;
        finalize(): void;
        main(): void;
        terminate(): void;
    }
}
declare module qx.application {
    class Inline extends qx.application.AbstractGui {
    }
}
declare module qx.application {
    class Mobile extends qx.core.Object implements qx.application.IApplication {
        close(): string;
        finalize(): void;
        main(): void;
        terminate(): void;
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        constructor();
        protected _createRootWidget(): qx.ui.mobile.core.Widget;
        getRoot(): qx.ui.mobile.core.Widget;
        getRouting(): qx.application.Routing;
    }
}
declare module qx.application {
    class Native extends qx.core.Object implements qx.application.IApplication {
        close(): string;
        finalize(): void;
        main(): void;
        terminate(): void;
    }
}
declare module qx.application {
    class Routing {
        constructor();
        protected _executeGet(path: string, customData: any, fromEvent: any): void;
        protected _getPathOrFallback(path: string, defaultPath?: string): string;
        back(customData?: IMap): void;
        dispose(): void;
        execute(path: string, customData: any): void;
        executeDelete(path: string, params: IMap, customData: any): void;
        executeGet(path: string, customData: any): void;
        executePost(path: string, params: IMap, customData: any): void;
        executePut(path: string, params: IMap, customData: any): void;
        getState(): string;
        init(defaultPath?: string): void;
        on(route: RegExp, handler: Function, scope: any): string;
        onAny(route: RegExp, handler: Function, scope: any): string;
        onDelete(route: RegExp, handler: Function, scope: any): string;
        onGet(route: RegExp, handler: Function, scope: any): string;
        onPost(route: RegExp, handler: Function, scope: any): string;
        onPut(route: RegExp, handler: Function, scope: any): string;
        remove(id: string): void;
    }
}
declare module qx.application {
    class Standalone extends qx.application.AbstractGui {
    }
}
declare module qx.bom {
    class AnimationFrame extends qx.event.Emitter {
        cancelSequence(): void;
        startSequence(duration: number): void;
        static calculateTiming(func: string, x: number): number;
        static request(callback: Function, context: any): number;
    }
}
declare module qx.bom {
    class Blocker extends qx.core.Object {
        constructor();
        block(element?: any): void;
        getBlockerColor(): string;
        getBlockerElement(): HTMLElement;
        getBlockerOpacity(): number;
        getBlockerZIndex(): number;
        isBlocked(): boolean;
        setBlockerColor(color: string): void;
        setBlockerOpacity(opacity: string): void;
        setBlockerZIndex(zIndex: number): void;
        unblock(): void;
    }
}
declare module qx.bom {
    class Cookie {
        static del(key: string, path?: string, domain?: string): void;
        static get(key: string): string;
        static set(key: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void;
    }
}
declare module qx.bom {
    class Document {
        static getHeight(win?: Window): number;
        static getWidth(win?: Window): number;
        static isQuirksMode(win?: Window): boolean;
        static isStandardMode(win?: Window): boolean;
    }
}
declare module qx.bom {
    class Element {
        static activate(element: HTMLElement): void;
        static addListener(element: HTMLElement, type: string, listener: Function, self?: any, capture?: boolean): string;
        static blur(element: HTMLElement): void;
        static capture(element: HTMLElement, containerCapture?: boolean): void;
        static clone(element: HTMLElement, events?: boolean): HTMLElement;
        static deactivate(element: HTMLElement): void;
        static focus(element: HTMLElement): void;
        static hasListener(element: HTMLElement, type: string, capture?: boolean): boolean;
        static releaseCapture(element: HTMLElement): void;
        static removeListener(element: HTMLElement, type: string, listener: Function, self?: any, capture?: boolean): boolean;
        static removeListenerById(target: any, id: string): boolean;
    }
}
declare module qx.bom {
    class Event {
        static addNativeListener(target: any, type: string, listener: Function, useCapture?: boolean): void;
        static fire(target: HTMLElement, type: string): boolean;
        static getEventName(target: any, type: string): any;
        static getRelatedTarget(e: qx.event.type.Event): HTMLElement;
        static getTarget(e: qx.event.type.Event): any;
        static preventDefault(e: qx.event.type.Event): void;
        static removeNativeListener(target: any, type: string, listener: Function, useCapture?: boolean): void;
        static stopPropagation(e: qx.event.type.Event): void;
        static supportsEvent(target: any, type: string): boolean;
    }
}
declare module qx.bom {
    class FileReader extends qx.core.Object {
        constructor();
        static getFile(inputElement: HTMLElement, index: number): any;
        static getNumFiles(inputElement: HTMLElement): number;
        protected _handleAbort(e: any): void;
        protected _handleError(e: any): void;
        protected _handleLoad(e: any): void;
        protected _handleLoadEnd(e: any): void;
        protected _handleLoadStart(e: any): void;
        protected _handleProgress(e: any): void;
        readAsBinaryString(fileObj: any): void;
        readAsDataURL(fileObj: any): void;
        readAsText(fileObj: any, encoding?: string): void;
    }
}
declare module qx.bom {
    class Flash {
        static create(element: HTMLElement, attributes: IMap, variables?: IMap, params?: IMap, win?: Window): HTMLElement;
        static destroy(element: HTMLElement, win?: Window): void;
    }
}
declare module qx.bom {
    class Font extends qx.core.Object {
        constructor(size?: string, family?: string[]);
        static fromConfig(config: IMap): qx.bom.Font;
        static fromString(str: string): qx.bom.Font;
        static getDefaultStyles(): IMap;
        protected _applyBold(value: boolean, old: boolean): void;
        protected _applyColor(value: string, old: string): void;
        protected _applyDecoration(value: any, old: any): void;
        protected _applyFamily(value: qx.data.Array, old: qx.data.Array): void;
        protected _applyItalic(value: boolean, old: boolean): void;
        protected _applyLineHeight(value: number, old: number): void;
        protected _applySize(value: number, old: number): void;
        protected _applyTextShadow(value: string, old: string): void;
        getBold(): any;
        getColor(): any;
        getDecoration(): any;
        getFamily(): any;
        getItalic(): any;
        getLineHeight(): any;
        getSize(): any;
        getStyles(): IMap;
        getTextShadow(): any;
        initBold(value: any): any;
        initColor(value: any): any;
        initDecoration(value: any): any;
        initFamily(value: any): any;
        initItalic(value: any): any;
        initLineHeight(value: any): any;
        initSize(value: any): any;
        initTextShadow(value: any): any;
        isBold(): boolean;
        isItalic(): boolean;
        resetBold(): void;
        resetColor(): void;
        resetDecoration(): void;
        resetFamily(): void;
        resetItalic(): void;
        resetLineHeight(): void;
        resetSize(): void;
        resetTextShadow(): void;
        setBold(value: any): any;
        setColor(value: any): any;
        setDecoration(value: any): any;
        setFamily(value: any): any;
        setItalic(value: any): any;
        setLineHeight(value: any): any;
        setSize(value: any): any;
        setTextShadow(value: any): any;
        toggleBold(): boolean;
        toggleItalic(): boolean;
        bold: boolean;
        color: string;
        family: qx.data.Array;
        italic: boolean;
        lineHeight: number;
        size: number;
        textShadow: string;
    }
}
declare module qx.bom {
    class GeoLocation extends qx.core.Object {
        constructor();
        protected _errorHandler(error: Function): void;
        protected _successHandler(position: Function): void;
        getCurrentPosition(enableHighAccuracy: Function, timeout: Function, maximumAge: Function): void;
        startWatchPosition(enableHighAccuracy: Function, timeout: Function, maximumAge: Function): void;
        stopWatchPosition(): void;
        static getInstance(): qx.bom.GeoLocation;
    }
}
declare module qx.bom {
    class HashHistory extends qx.bom.History {
        constructor();
    }
}
declare module qx.bom {
    class History extends qx.core.Object {
        constructor();
        static getInstance(): any;
        protected _applyState(value: string, old: string): void;
        protected _applyTitle(title: string, old: string): void;
        protected _decode(value: string): string;
        protected _encode(value: string): string;
        protected _getHash(): string;
        protected _onHistoryLoad(state: string): void;
        protected _readState(): string;
        protected _setHash(value: string): void;
        protected _setInitialState(): void;
        protected _writeState(): void;
        addToHistory(state: string, newTitle?: string): void;
        getState(): any;
        getTitle(): any;
        initState(value: any): any;
        initTitle(value: any): any;
        navigateBack(): void;
        navigateForward(): void;
        resetState(): void;
        resetTitle(): void;
        setState(value: any): any;
        setTitle(value: any): any;
    }
}
declare module qx.bom {
    class Html {
        static clean(objs: string[], context?: Document, fragment?: HTMLElement): HTMLElement[];
        static extractScripts(elements: HTMLElement[], fragment?: Document): HTMLElement[];
        static fixEmptyTags(html: string): string;
    }
}
declare module qx.bom {
    class Iframe {
        static create(attributes?: IMap, win?: Window): HTMLElement;
        static getBody(iframe: HTMLElement): HTMLElement;
        static getDocument(iframe: HTMLElement): Document;
        static getWindow(iframe: HTMLElement): Window;
        static queryCurrentUrl(iframe: HTMLElement): string;
        static setSource(iframe: HTMLElement, source: string): void;
    }
}
declare module qx.bom {
    class IframeHistory extends qx.bom.History {
        constructor();
        protected _setState(state: string): void;
    }
}
declare module qx.bom {
    class Input {
        static create(type: string, attributes: IMap, win: Window): HTMLElement;
        static getValue(element: HTMLElement): qx.data.Array;
        static setValue(element: HTMLElement, value: qx.data.Array): void;
        static setWrap(element: HTMLElement, wrap: boolean): void;
    }
}
declare module qx.bom {
    class Label {
        static create(content: string, html?: boolean, win?: Window): HTMLElement;
        static getHtmlSize(content: string, styles?: IMap, width?: number): IMap;
        static getTextSize(text: string, styles: IMap): IMap;
        static getValue(element: HTMLElement): string;
        static setValue(element: HTMLElement, value: string): void;
    }
}
declare module qx.bom {
    class Lifecycle {
        static onReady(callback: Function, context?: any): void;
        static onShutdown(callback: Function, context?: any): void;
    }
}
declare module qx.bom {
    class MediaQuery extends qx.event.Emitter {
        constructor(query: string, ctxWindow?: any);
        getQuery(): string;
        isMatching(): boolean;
    }
}
declare module qx.bom {
    class MediaQueryListener extends qx.bom.MediaQuery {
        constructor(query: string, ctxWindow?: any);
    }
}
declare module qx.bom {
    class NativeHistory extends qx.bom.History {
        constructor();
    }
}
declare module qx.bom {
    class PageVisibility extends qx.event.Emitter {
        static getInstance(): qx.bom.PageVisibility;
        constructor(document?: any);
        getVisibilityState(): string;
        isHidden(): boolean;
    }
}
declare module qx.bom {
    class Range {
        static get(node: any): any;
    }
}
declare module qx.bom {
    class Selection {
        static get(node: any): any;
        static getEnd(node: any): number;
        static getLength(node: any): any;
        static getSelectionObject(documentNode: any): any;
        static getStart(node: any): number;
        static set(node: any, start: number, end: number): boolean;
        static setAll(node: any): boolean;
    }
}
declare module qx.bom {
    class Selector {
        static matches(selector: string, set: qx.data.Array): qx.data.Array;
        static query(selector: string, context: HTMLElement): qx.data.Array;
    }
}
declare module qx.bom {
    class Shortcut extends qx.core.Object {
        constructor(shortcut: string);
        protected _applyEnabled(value: boolean, old: boolean): void;
        protected _applyShortcut(value: string, old: string): void;
        execute(target: any): void;
        getAutoRepeat(): any;
        getEnabled(): any;
        getShortcut(): any;
        initAutoRepeat(value: any): any;
        initEnabled(value: any): any;
        initShortcut(value: any): any;
        isAutoRepeat(): boolean;
        isEnabled(): boolean;
        resetAutoRepeat(): void;
        resetEnabled(): void;
        resetShortcut(): void;
        setAutoRepeat(value: any): any;
        setEnabled(value: any): any;
        setShortcut(value: any): any;
        toggleAutoRepeat(): boolean;
        toggleEnabled(): boolean;
        autoRepeat: boolean;
        shortcut: string;
    }
}
declare module qx.bom {
    class Storage {
        static getLocal(): qx.bom.storage.Memory;
        static getSession(): qx.bom.storage.Memory;
    }
}
declare module qx.bom {
    class String {
        static escape(str: string): string;
        static fromText(str: string): string;
        static toText(str: string): string;
        static unescape(str: string): any;
    }
}
declare module qx.bom {
    class Style {
        static getCssName(propertyName: string): string;
        static getPropertyName(propertyName: string): any;
    }
}
declare module qx.bom {
    class Stylesheet {
        static addImport(sheet: any, url: string): void;
        static addRule(sheet: any, selector: string, entry: string): void;
        static createElement(text?: string): any;
        static includeFile(href: string, doc?: Document): void;
        static removeAllImports(sheet: any): void;
        static removeAllRules(sheet: any): void;
        static removeImport(sheet: any, url: string): void;
        static removeRule(sheet: any, selector: string): void;
        static removeSheet(sheet: any): void;
    }
}
declare module qx.bom {
    class Template {
        static _createNodeFromTemplate(template: string): HTMLElement;
        static get(id: string, view: any, partials: any): HTMLElement;
        static render(template: string, view: any, partials: any): string;
        static renderToNode(template: string, view: any, partials: any): HTMLElement;
    }
}
declare module qx.bom {
    class Viewport {
        static getHeight(win?: Window): number;
        static getOrientation(win?: Window): number;
        static getScrollLeft(win?: Window): number;
        static getScrollTop(win?: Window): number;
        static getWidth(win?: Window): number;
        static isLandscape(win?: Window): boolean;
        static isPortrait(win?: Window): boolean;
    }
}
declare module qx.bom {
    class Vml {
        static create(type: string, attributes?: IMap, win?: any): HTMLElement;
        static createImage(source?: string, width?: number, height?: number, xOffset?: number, yOffset?: number, imageWidth?: number, imageHeight?: number): HTMLElement;
        static updateImage(image: HTMLElement, source: string, width: number, height: number, xOffset?: number, yOffset?: number, imageWidth?: number, imageHeight?: number): void;
    }
}
declare module qx.bom {
    class WebWorker extends qx.core.Object {
        constructor(src: string);
        protected _handleError(e: qx.event.type.Event): void;
        protected _handleMessage(e: qx.event.type.Event): void;
        postMessage(msg: string): void;
    }
}
declare module qx.bom {
    class Window {
        static close(win: Window): any;
        static getBlocker(): qx.bom.Blocker;
        static isClosed(win: Window): boolean;
        static moveTo(win: Window, top: number, left: number): void;
        static open(url: string, name: string, options: IMap, modal: boolean, useNativeModalDialog: boolean, listener?: Function, self?: any): Window;
        static resizeTo(win: Window, width: number, height: number): void;
    }
}
declare module qx.bom.client {
    class Browser {
    }
}
declare module qx.bom.client {
    class Css {
        static getAlphaImageLoaderNeeded(): boolean;
    }
}
declare module qx.bom.client {
    class CssAnimation {
    }
}
declare module qx.bom.client {
    class CssTransform {
    }
}
declare module qx.bom.client {
    class CssTransition {
    }
}
declare module qx.bom.client {
    class Device {
        static detectDeviceType(userAgentString: string): string;
        static detectMobileDevice(userAgentString: string): boolean;
        static detectTabletDevice(userAgentString: string): boolean;
        static getDevicePixelRatio(): number;
        static getTouch(): boolean;
        static getType(): string;
    }
}
declare module qx.bom.client {
    class EcmaScript {
    }
}
declare module qx.bom.client {
    class Engine {
    }
}
declare module qx.bom.client {
    class Event {
        static getCustomEvent(): boolean;
        static getDispatchEvent(): boolean;
        static getMouseEvent(): boolean;
        static getMouseWheel(win?: Window): IMap;
    }
}
declare module qx.bom.client {
    class Flash {
    }
}
declare module qx.bom.client {
    class Html {
        static getIsEqualNode(): boolean;
        static getSelection(): any;
    }
}
declare module qx.bom.client {
    class Json {
    }
}
declare module qx.bom.client {
    class Locale {
    }
}
declare module qx.bom.client {
    class OperatingSystem {
    }
}
declare module qx.bom.client {
    class Pdfjs {
    }
}
declare module qx.bom.client {
    class PhoneGap {
    }
}
declare module qx.bom.client {
    class Plugin {
    }
}
declare module qx.bom.client {
    class Runtime {
    }
}
declare module qx.bom.client {
    class Scroll {
    }
}
declare module qx.bom.client {
    class Stylesheet {
    }
}
declare module qx.bom.client {
    class Transport {
    }
}
declare module qx.bom.client {
    class Xml {
    }
}
declare module qx.bom.element {
    class Animation {
        static animate(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
        static animateReverse(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
    }
}
declare module qx.bom.element {
    class AnimationCss {
        static _animate(el: HTMLElement, desc: IMap, duration?: number, reverse?: boolean): qx.bom.element.AnimationHandle;
        static animate(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
        static animateReverse(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
    }
}
declare module qx.bom.element {
    class AnimationHandle extends qx.event.Emitter {
        constructor();
        isEnded(): boolean;
        isPaused(): boolean;
        isPlaying(): boolean;
        pause(): void;
        play(): void;
        stop(): void;
    }
}
declare module qx.bom.element {
    class AnimationJs {
        static _animate(el: HTMLElement, desc: IMap, duration?: number, reverse?: boolean): qx.bom.element.AnimationHandle;
        static animate(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
        static animateReverse(el: HTMLElement, desc: IMap, duration?: number): qx.bom.element.AnimationHandle;
    }
}
declare module qx.bom.element {
    class Attribute {
        static compile(map: IMap): string;
        static get(element: HTMLElement, name: string): any;
        static reset(element: HTMLElement, name: string): void;
        static set(element: HTMLElement, name: string, value: any): void;
    }
}
declare module qx.bom.element {
    class Background {
        static compile(source?: string, repeat?: string, left?: string, top?: string): string;
        static getStyles(source: string, repeat?: string, left?: string, top?: string): IMap;
        static set(element: HTMLElement, source?: string, repeat?: string, left?: number, top?: number): void;
    }
}
declare module qx.bom.element {
    class BoxSizing {
        static compile(value: string): string;
        static get(element: HTMLElement): string;
        static reset(element: HTMLElement): void;
        static set(element: HTMLElement, value: string): void;
    }
}
declare module qx.bom.element {
    class Class {
        static add(element: HTMLElement, name: string): string;
        static addClasses(element: HTMLElement, classes: string[]): string;
        static get(element: HTMLElement): string;
        static has(element: HTMLElement, name: string): boolean;
        static remove(element: HTMLElement, name: string): string;
        static removeClasses(element: HTMLElement, classes: string[]): string;
        static replace(element: HTMLElement, oldName: string, newName: string): string;
        static toggle(element: HTMLElement, name: string, toggle?: boolean): string;
    }
}
declare module qx.bom.element {
    class Clip {
        static compile(map: IMap): string;
        static get(element: HTMLElement, mode: number): IMap;
        static reset(element: HTMLElement): void;
        static set(element: HTMLElement, map: IMap): void;
    }
}
declare module qx.bom.element {
    class Cursor {
        static compile(cursor: string): string;
        static get(element: HTMLElement, mode: number): string;
        static reset(element: HTMLElement): void;
        static set(element: HTMLElement, value: string): void;
    }
}
declare module qx.bom.element {
    class Dataset {
        static get(element: HTMLElement, name: string): any;
        static getAll(element: HTMLElement): IMap;
        static remove(element: HTMLElement, name: string): void;
        static set(element: HTMLElement, name: string, value: any): void;
    }
}
declare module qx.bom.element {
    class Decoration {
        static create(source: string, repeat: string, style: IMap): string;
        static getAttributes(source: string, repeat: string, style: IMap): string;
        static getTagName(repeat: string, source?: string): string;
        static processAlphaFix(style: IMap, repeat: string, source: string): IMap;
        static update(element: HTMLElement, source: string, repeat: string, style: IMap): void;
    }
}
declare module qx.bom.element {
    class Dimension {
        static getContentHeight(element: HTMLElement): number;
        static getContentSize(element: HTMLElement): IMap;
        static getContentWidth(element: HTMLElement): number;
        static getHeight(element: HTMLElement): number;
        static getSize(element: HTMLElement): IMap;
        static getWidth(element: HTMLElement): number;
    }
}
declare module qx.bom.element {
    class Location {
        static get(elem: HTMLElement, mode?: string): IMap;
        static getBottom(elem: HTMLElement, mode: string): number;
        static getLeft(elem: HTMLElement, mode: string): number;
        static getOffsetParent(element: HTMLElement): HTMLElement;
        static getPosition(elem: HTMLElement): IMap;
        static getRelative(elem1: HTMLElement, elem2: HTMLElement, mode1?: string, mode2?: string): IMap;
        static getRight(elem: HTMLElement, mode: string): number;
        static getTop(elem: HTMLElement, mode: string): number;
    }
}
declare module qx.bom.element {
    class Opacity {
        static compile(opacity: number): string;
        static get(element: HTMLElement, mode: number): number;
        static reset(element: HTMLElement): void;
        static set(element: HTMLElement, opacity: number): void;
    }
}
declare module qx.bom.element {
    class Scroll {
        static getScrollbarWidth(): number;
        static intoView(element: HTMLElement, stop?: HTMLElement, alignX?: string, alignY?: string): void;
        static intoViewX(element: HTMLElement, stop?: HTMLElement, align?: string): void;
        static intoViewY(element: HTMLElement, stop?: HTMLElement, align?: string): void;
    }
}
declare module qx.bom.element {
    class Style {
        static compile(map: IMap): string;
        static get(element: HTMLElement, name: string, mode: number, smart?: boolean): any;
        static getCss(element: HTMLElement): string;
        static isPropertySupported(propertyName: string): boolean;
        static reset(element: HTMLElement, name: string, smart?: boolean): void;
        static set(element: HTMLElement, name: string, value: any, smart?: boolean): void;
        static setCss(element: HTMLElement, value: string): void;
        static setStyles(element: HTMLElement, styles: IMap, smart?: boolean): void;
    }
}
declare module qx.bom.element {
    class Transform {
        static getBackfaceVisibility(el: HTMLElement): boolean;
        static getCss(transforms: IMap): string;
        static getOrigin(el: HTMLElement): string;
        static getPerspective(el: HTMLElement): string;
        static getPerspectiveOrigin(el: HTMLElement): string;
        static getStyle(el: HTMLElement): string;
        static rotate(el: HTMLElement, value: qx.data.Array): void;
        static scale(el: HTMLElement, value: qx.data.Array): void;
        static setBackfaceVisibility(el: HTMLElement, value: boolean): void;
        static setOrigin(el: HTMLElement, value: string): void;
        static setPerspective(el: HTMLElement, value: number): void;
        static setPerspectiveOrigin(el: HTMLElement, value: string): void;
        static setStyle(el: HTMLElement, value: string): void;
        static skew(el: HTMLElement, value: qx.data.Array): void;
        static transform(el: HTMLElement, transforms: IMap): void;
        static translate(el: HTMLElement, value: qx.data.Array): void;
    }
}
declare module qx.bom.media {
    class Abstract extends qx.core.Object {
        constructor(media: any);
        protected _handleEndedEvent(): void;
        protected _handleLoadedDataEvent(): void;
        protected _handleLoadedMetaDataEvent(): void;
        protected _handlePauseEvent(): void;
        protected _handlePlayEvent(): void;
        protected _handleTimeUpdateEvent(): void;
        protected _handleVolumeChangeEvent(): void;
        canPlayType(type: string): boolean;
        getAutoplay(): boolean;
        getCurrentTime(): number;
        getDuration(): number;
        getId(): string;
        getMediaObject(): any;
        getPreload(): string;
        getSource(): string;
        getVolume(): number;
        hasControls(): boolean;
        hideControls(): void;
        isEnded(): boolean;
        isLoop(): boolean;
        isMuted(): boolean;
        isPaused(): boolean;
        pause(): void;
        play(): void;
        setAutoplay(autoplay: boolean): void;
        setCurrentTime(value: number): void;
        setId(id: string): void;
        setLoop(value: boolean): void;
        setMuted(muted: boolean): void;
        setPreload(preload: string): void;
        setSource(source: string): void;
        setVolume(volume: number): void;
        showControls(): void;
    }
}
declare module qx.bom.media {
    class Audio extends qx.bom.media.Abstract {
        constructor(source: string);
    }
}
declare module qx.bom.media {
    class Video extends qx.bom.media.Abstract {
        constructor(source: string);
        getHeight(): number;
        getPoster(): string;
        getVideoHeight(): number;
        getVideoWidth(): number;
        getWidth(): number;
        setHeight(value: number): void;
        setPoster(value: string): void;
        setWidth(value: number): void;
    }
}
declare module qx.bom.request {
    interface IRequest {
        abort(): void;
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string;
        onabort(): void;
        onerror(): void;
        onload(): void;
        onloadend(): void;
        onreadystatechange(): void;
        ontimeout(): void;
        open(method: string, url: string, async?: boolean): void;
        send(data?: Document): void;
        setRequestHeader(key: string, value: string): void;
    }
}
declare module qx.bom.request {
    class Jsonp extends qx.bom.request.Script {
        constructor();
        callback(data: any): void;
        setCallbackName(name: string): qx.bom.request.Jsonp;
        setCallbackParam(param: string): qx.bom.request.Jsonp;
    }
}
declare module qx.bom.request {
    class Script {
        constructor();
        protected _emit(event: string): void;
        protected _getScriptElement(): HTMLElement;
        protected _getUrl(): string;
        protected _onNativeError(): void;
        protected _onNativeLoad(): void;
        protected _onTimeout(): void;
        protected _readyStateChange(readyState: number): void;
        protected _success(): void;
        abort(): qx.bom.request.Script;
        dispose(): void;
        getAllResponseHeaders(): any;
        getResponseHeader(key: string): any;
        isDisposed(): boolean;
        on(name: string, listener: Function, ctx?: any): qx.bom.request.Script;
        onabort(): void;
        onerror(): void;
        onload(): void;
        onloadend(): void;
        onreadystatechange(): void;
        ontimeout(): void;
        open(method: string, url: string): void;
        send(): qx.bom.request.Script;
        setDetermineSuccess(check: Function): void;
        setRequestHeader(key: string, value: string): qx.bom.request.Script;
    }
}
declare module qx.bom.request {
    class SimpleXhr {
        constructor(url?: string, method?: string);
        protected _createResponseParser(): qx.util.ResponseParser;
        protected _createTransport(): qx.bom.request.IRequest;
        protected _onAbort(): void;
        protected _onError(): void;
        protected _onLoadEnd(): void;
        protected _onReadyStateChange(): void;
        protected _onTimeout(): void;
        protected _registerTransportListener(transport: qx.bom.request.IRequest): qx.bom.request.IRequest;
        protected _serializeData(data: IMap, contentType?: string): any;
        protected _setResponse(response: string): void;
        abort(): qx.bom.request.SimpleXhr;
        addListenerOnce(name: string, listener: Function, ctx?: any): qx.bom.request.Xhr;
        dispose(): boolean;
        getMethod(): string;
        getRequestData(): string;
        getRequestHeader(key: string): string;
        getResponse(): any;
        getTimeout(): number;
        getTransport(): any;
        getUrl(): string;
        isCaching(): boolean;
        isDisposed(): boolean;
        isDone(): boolean;
        send(): void;
        setMethod(method: string): qx.bom.request.SimpleXhr;
        setParser(parser: Function): Function;
        setRequestData(data: any): qx.bom.request.SimpleXhr;
        setRequestHeader(key: string, value: string): qx.bom.request.SimpleXhr;
        setTimeout(millis: number): qx.bom.request.SimpleXhr;
        setUrl(url: string): qx.bom.request.SimpleXhr;
        toHashCode(): number;
        useCaching(value: boolean): qx.bom.request.SimpleXhr;
    }
}
declare module qx.bom.request {
    class Xhr {
        constructor();
        protected _createNativeXhr(): any;
        protected _emit(event: string): void;
        protected _getProtocol(): string;
        abort(): qx.bom.request.Xhr;
        dispose(): boolean;
        getAllResponseHeaders(): string;
        getRequest(): any;
        getResponseHeader(header: string): string;
        isDisposed(): boolean;
        on(name: string, listener: Function, ctx?: any): qx.bom.request.Xhr;
        onabort(): void;
        onerror(): void;
        onload(): void;
        onloadend(): void;
        onreadystatechange(): void;
        ontimeout(): void;
        open(method?: string, url?: string, async?: boolean, user?: string, password?: string): void;
        overrideMimeType(mimeType: string): qx.bom.request.Xhr;
        send(data?: Document): qx.bom.request.Xhr;
        setRequestHeader(key: string, value: string): qx.bom.request.Xhr;
    }
}
declare module qx.bom.rest {
    class Resource extends qx.event.Emitter {
        constructor(description?: IMap);
        static placeholdersFromUrl(url: string): qx.data.Array;
        protected _getRequest(): qx.io.request.AbstractRequest;
        protected _getRequestConfig(action: string, params: IMap): IMap;
        protected _getRequestHandler(): IMap;
        protected _getThrottleCount(): number;
        protected _getThrottleLimit(): number;
        protected _startPoll(action: string, listener: Function, interval: number): void;
        abort(varargs: number): void;
        configureRequest(callback: Function): void;
        destruct(): void;
        dispose(): void;
        invoke(action: string, params: IMap, data: string): number;
        isDisposed(): boolean;
        longPoll(action: string): string;
        map(action: string, method: string, url: string, check?: IMap): void;
        poll(action: string, interval: number, params?: IMap, immediately?: boolean): void;
        refresh(action: string): void;
        restartPollByAction(action: string): void;
        setBaseUrl(baseUrl: string): void;
        stopPollByAction(action: string): void;
    }
}
declare module qx.bom.storage {
    class Memory {
        static getLocal(): qx.bom.storage.Memory;
        static getSession(): qx.bom.storage.Memory;
        constructor();
        clear(): void;
        forEach(callback: Function, scope: any): void;
        getItem(key: string): any;
        getKey(index: number): string;
        getLength(): number;
        removeItem(key: string): void;
        setItem(key: string, value: any): void;
    }
}
declare module qx.bom.storage {
    class UserData {
        static getLocal(): qx.bom.storage.UserData;
        static getSession(): qx.bom.storage.UserData;
        constructor(storeName: string);
        clear(): void;
        forEach(callback: Function, scope: any): void;
        getItem(key: string): any;
        getKey(index: number): string;
        getLength(): number;
        removeItem(key: string): void;
        setItem(key: string, value: any): void;
    }
}
declare module qx.bom.storage {
    class Web {
        static getLocal(): qx.bom.storage.Web;
        static getSession(): qx.bom.storage.Web;
        constructor(type: string);
        clear(): void;
        forEach(callback: Function, scope: any): void;
        getItem(key: string): any;
        getKey(index: number): string;
        getLength(): number;
        removeItem(key: string): void;
        setItem(key: string, value: any): void;
    }
}
declare module qx.bom.webfonts {
    class Manager extends qx.core.Object {
        constructor();
        getPreferredFormats(): string[];
        remove(familyName: string): void;
        removeStyleSheet(): void;
        require(familyName: string, sourcesList: string[], callback?: Function, context?: any): void;
        static getInstance(): qx.bom.webfonts.Manager;
    }
}
declare module qx.bom.webfonts {
    class Validator extends qx.core.Object {
        constructor(fontFamily: string);
        static removeDefaultHelperElements(): void;
        protected _applyFontFamily(value: any, old: any): void;
        protected _getHelperElement(fontFamily: string): HTMLElement;
        protected _getRequestedHelpers(): IMap;
        protected _isFontValid(): boolean;
        protected _reset(): void;
        getFontFamily(): any;
        getTimeout(): any;
        initFontFamily(value: any): any;
        initTimeout(value: any): any;
        resetFontFamily(): void;
        resetTimeout(): void;
        setFontFamily(value: any): any;
        setTimeout(value: any): any;
        validate(): void;
        timeout: number;
    }
}
declare module qx.bom.webfonts {
    class WebFont extends qx.bom.Font {
        protected _applySources(value: any, old: any): void;
        protected _onWebFontChangeStatus(ev: qx.event.type.Data): void;
        protected _quoteFontFamily(familyName: string): string;
        getSources(): any;
        initSources(value: any): any;
        resetSources(): void;
        setSources(value: any): any;
    }
}
declare module qx.core {
    class Aspect {
        static addAdvice(fcn: Function, position?: string, type?: string, name?: RegExp): void;
        static wrap(fullName: string, fcn: Function, type: string): Function;
    }
}
declare module qx.core {
    class Assert {
        static assert(condition: any, msg: string): void;
        static assertArgumentsCount(args: any, minCount: number, maxCount: number, msg: string): void;
        static assertArray(value: any, msg: string): void;
        static assertArrayEquals(expected: qx.data.Array, found: qx.data.Array, msg: string): void;
        static assertBoolean(value: any, msg: string): void;
        static assertCssColor(expected: string, value: string, msg: string): void;
        static assertElement(value: any, msg: string): void;
        static assertEquals(expected: any, found: any, msg: string): void;
        static assertEventFired(obj: any, event: string, invokeFunc: Function, listenerFunc?: Function, msg?: string): void;
        static assertEventNotFired(obj: any, event: string, invokeFunc: Function, msg: string): void;
        static assertException(callback: Function, exception?: ErrorImpl, re?: RegExp, msg?: string): void;
        static assertFalse(value: boolean, msg: string): void;
        static assertFunction(value: any, msg: string): void;
        static assertIdentical(expected: any, found: any, msg: string): void;
        static assertInArray(value: any, array: qx.data.Array, msg: string): void;
        static assertInRange(value: any, min: number, max: number, msg: string): void;
        static assertInstance(value: any, clazz: qx.Class, msg: string): void;
        static assertInteger(value: any, msg: string): void;
        static assertInterface(value: any, iface: qx.Class, msg: string): void;
        static assertJsonEquals(expected: any, found: any, msg: string): void;
        static assertKeyInMap(value: any, map: IMap, msg: string): void;
        static assertMap(value: any, msg: string): void;
        static assertMatch(str: string, re: RegExp, msg: string): void;
        static assertNotEquals(expected: any, found: any, msg: string): void;
        static assertNotIdentical(expected: any, found: any, msg: string): void;
        static assertNotNull(value: any, msg: string): void;
        static assertNotUndefined(value: any, msg: string): void;
        static assertNull(value: any, msg: string): void;
        static assertNumber(value: any, msg: string): void;
        static assertObject(value: any, msg: string): void;
        static assertPositiveInteger(value: any, msg: string): void;
        static assertPositiveNumber(value: any, msg: string): void;
        static assertQxObject(value: any, msg: string): void;
        static assertQxWidget(value: any, msg: string): void;
        static assertRegExp(value: any, msg: string): void;
        static assertString(value: any, msg: string): void;
        static assertTrue(value: boolean, msg: string): void;
        static assertType(value: any, type: string, msg: string): void;
        static assertUndefined(value: any, msg: string): void;
        static fail(msg: string, compact: boolean): void;
    }
}
declare module qx.core {
    class AssertionError extends qx.type.BaseError {
        constructor(comment: string, failMessage: string);
        getStackTrace(): string[];
    }
}
declare module qx.core {
    class BaseInit {
        static getApplication(): qx.core.Object;
        static ready(): void;
    }
}
declare module qx.core {
    class Environment {
        static _getClassNameFromEnvKey(key: string): qx.data.Array;
        static _initDefaultQxValues(): void;
        static add(key: string, check: any): void;
        static addAsync(key: string, check: Function): void;
        static filter(map: IMap): qx.data.Array;
        static get(key: string): any;
        static getAsync(key: string, callback: Function, self: any): void;
        static invalidateCacheKey(key: string): void;
        static select(key: string, values: IMap): any;
        static selectAsync(key: string, values: IMap, self: any): void;
    }
}
declare module qx.core {
    class GlobalError extends ErrorImpl {
        constructor(exc: ErrorImpl, args: qx.data.Array);
        getArguments(): any;
        getSourceException(): ErrorImpl;
    }
}
declare module qx.core {
    class Init {
    }
}
declare module qx.core {
    class MAssert {
        assert(condition: any, msg: string): void;
        assertArgumentsCount(args: any, minCount: number, maxCount: number, msg: string): void;
        assertArray(value: any, msg: string): void;
        assertArrayEquals(expected: qx.data.Array, found: qx.data.Array, msg: string): void;
        assertBoolean(value: any, msg: string): void;
        assertCssColor(expected: string, value: string, msg: string): void;
        assertElement(value: any, msg: string): void;
        assertEquals(expected: any, found: any, msg: string): void;
        assertEventFired(obj: any, event: string, invokeFunc: Function, listener?: Function, msg?: string): void;
        assertEventNotFired(obj: any, event: string, invokeFunc: Function, msg: string): void;
        assertException(callback: Function, exception?: ErrorImpl, re?: RegExp, msg?: string): void;
        assertFalse(value: boolean, msg: string): void;
        assertFunction(value: any, msg: string): void;
        assertIdentical(expected: any, found: any, msg: string): void;
        assertInArray(value: any, array: qx.data.Array, msg: string): void;
        assertInRange(value: any, min: number, max: number, msg: string): void;
        assertInstance(value: any, clazz: qx.Class, msg: string): void;
        assertInteger(value: any, msg: string): void;
        assertInterface(value: any, iface: qx.Class, msg: string): void;
        assertJsonEquals(expected: any, found: any, msg: string): void;
        assertKeyInMap(value: any, map: IMap, msg: string): void;
        assertMap(value: any, msg: string): void;
        assertMatch(str: string, re: RegExp, msg: string): void;
        assertNotEquals(expected: any, found: any, msg: string): void;
        assertNotIdentical(expected: any, found: any, msg: string): void;
        assertNotNull(value: any, msg: string): void;
        assertNotUndefined(value: any, msg: string): void;
        assertNull(value: any, msg: string): void;
        assertNumber(value: any, msg: string): void;
        assertObject(value: any, msg: string): void;
        assertPositiveInteger(value: any, msg: string): void;
        assertPositiveNumber(value: any, msg: string): void;
        assertQxObject(value: any, msg: string): void;
        assertQxWidget(value: any, msg: string): void;
        assertRegExp(value: any, msg: string): void;
        assertString(value: any, msg: string): void;
        assertTrue(value: boolean, msg: string): void;
        assertType(value: any, type: string, msg: string): void;
        assertUndefined(value: any, msg: string): void;
        fail(msg: string, compact: boolean): void;
    }
}
declare module qx.core {
    class MBindTo {
        bindTo(func: Function, varargs?: any): Function;
    }
}
declare module qx.core {
    class MEvent {
        addListener(type: string, listener: Function, self?: any, capture?: boolean): string;
        addListenerOnce(type: string, listener: Function, self?: any, capture?: boolean): string;
        dispatchEvent(evt: qx.event.type.Event): boolean;
        fireDataEvent(type: string, data: any, oldData?: any, cancelable?: boolean): boolean;
        fireEvent(type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        fireNonBubblingEvent(type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        hasListener(type: string, capture?: boolean): boolean;
        removeListener(type: string, listener: Function, self?: any, capture?: boolean): boolean;
        removeListenerById(id: string): boolean;
    }
}
declare module qx.core {
    class MLogging {
        debug(varargs: any): void;
        error(varargs: any): void;
        info(varargs: any): void;
        trace(): void;
        warn(varargs: any): void;
    }
}
declare module qx.core {
    class MProperty {
        get(prop: string): any;
        reset(prop: string): void;
        set(data: string, value?: any): any;
    }
}
declare module qx.core {
    class Object {
        addListener(type: string, listener: Function, self?: any, capture?: boolean): string;
        addListenerOnce(type: string, listener: Function, self?: any, capture?: boolean): string;
        dispatchEvent(evt: qx.event.type.Event): boolean;
        fireDataEvent(type: string, data: any, oldData?: any, cancelable?: boolean): boolean;
        fireEvent(type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        fireNonBubblingEvent(type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        hasListener(type: string, capture?: boolean): boolean;
        removeListener(type: string, listener: Function, self?: any, capture?: boolean): boolean;
        removeListenerById(id: string): boolean;
        assert(condition: any, msg: string): void;
        assertArgumentsCount(args: any, minCount: number, maxCount: number, msg: string): void;
        assertArray(value: any, msg: string): void;
        assertArrayEquals(expected: qx.data.Array, found: qx.data.Array, msg: string): void;
        assertBoolean(value: any, msg: string): void;
        assertCssColor(expected: string, value: string, msg: string): void;
        assertElement(value: any, msg: string): void;
        assertEquals(expected: any, found: any, msg: string): void;
        assertEventFired(obj: any, event: string, invokeFunc: Function, listener?: Function, msg?: string): void;
        assertEventNotFired(obj: any, event: string, invokeFunc: Function, msg: string): void;
        assertException(callback: Function, exception?: ErrorImpl, re?: RegExp, msg?: string): void;
        assertFalse(value: boolean, msg: string): void;
        assertFunction(value: any, msg: string): void;
        assertIdentical(expected: any, found: any, msg: string): void;
        assertInArray(value: any, array: qx.data.Array, msg: string): void;
        assertInRange(value: any, min: number, max: number, msg: string): void;
        assertInstance(value: any, clazz: qx.Class, msg: string): void;
        assertInteger(value: any, msg: string): void;
        assertInterface(value: any, iface: qx.Class, msg: string): void;
        assertJsonEquals(expected: any, found: any, msg: string): void;
        assertKeyInMap(value: any, map: IMap, msg: string): void;
        assertMap(value: any, msg: string): void;
        assertMatch(str: string, re: RegExp, msg: string): void;
        assertNotEquals(expected: any, found: any, msg: string): void;
        assertNotIdentical(expected: any, found: any, msg: string): void;
        assertNotNull(value: any, msg: string): void;
        assertNotUndefined(value: any, msg: string): void;
        assertNull(value: any, msg: string): void;
        assertNumber(value: any, msg: string): void;
        assertObject(value: any, msg: string): void;
        assertPositiveInteger(value: any, msg: string): void;
        assertPositiveNumber(value: any, msg: string): void;
        assertQxObject(value: any, msg: string): void;
        assertQxWidget(value: any, msg: string): void;
        assertRegExp(value: any, msg: string): void;
        assertString(value: any, msg: string): void;
        assertTrue(value: boolean, msg: string): void;
        assertType(value: any, type: string, msg: string): void;
        assertUndefined(value: any, msg: string): void;
        fail(msg: string, compact: boolean): void;
        get(prop: string): any;
        reset(prop: string): void;
        set(data: any, value?: any): any;
        debug(varargs: any): void;
        error(varargs: any): void;
        info(varargs: any): void;
        trace(): void;
        warn(varargs: any): void;
        bind(sourcePropertyChain: string, targetObject: qx.core.Object, targetProperty: string, options: IMap): any;
        getBindings(): qx.data.Array;
        removeAllBindings(): void;
        removeBinding(id: any): void;
        constructor();
        protected _disposeArray(field: string): void;
        protected _disposeMap(field: string): void;
        protected _disposeObjects(varargs: any): void;
        protected _disposeSingletonObjects(varargs: any): void;
        base(args: any, varargs: any): any;
        clone(): qx.core.Object;
        dispose(): void;
        getUserData(key: string): any;
        isDisposed(): boolean;
        self(args: any): any;
        setUserData(key: string, value: any): void;
        toHashCode(): number;
    }
}
declare module qx.core {
    class ObjectRegistry {
        static clearHashCode(obj: any): void;
        static fromHashCode(hash: string): qx.core.Object;
        static getRegistry(): any;
        static register(obj: any): void;
        static shutdown(): void;
        static toHashCode(obj: any): string;
        static unregister(obj: any): void;
    }
}
declare module qx.core {
    class Property {
        static attachMethods(clazz: qx.Class, name: string, config: IMap): void;
        static attachRefreshInheritables(clazz: qx.Class): void;
        static error(obj: qx.core.Object, id: number, property: string, variant: string, value: any): void;
        static executeOptimizedGetter(instance: any, clazz: qx.Class, name: string, variant: string): any;
        static executeOptimizedSetter(instance: any, clazz: qx.Class, name: string, variant: string, args: any): any;
    }
}
declare module qx.core {
    class ValidationError extends qx.type.BaseError {
    }
}
declare module qx.core {
    class WindowError extends ErrorImpl {
        constructor(failMessage: string, uri: string, lineNumber: number);
        getLineNumber(): number;
        getUri(): string;
    }
}
declare module qx.data {
    class Array extends qx.core.Object implements qx.data.IListData {
        contains(item: any): boolean;
        getItem(index: number): any;
        getLength(): number;
        setItem(index: number, item: any): void;
        splice(startIndex: number, amount: number, varargs: any): qx.data.Array;
        toArray(): qx.data.Array;
        protected _applyEventPropagation(value: any, old: any, name: string): void;
        protected _registerEventChaining(value: any, old: any, name: string): void;
        constructor(param: any);
        append(array: qx.data.IListData): void;
        concat(array: qx.data.Array): qx.data.Array;
        copy(): qx.data.Array;
        equals(array: qx.data.Array): boolean;
        every(callback: Function, self?: any): boolean;
        filter(callback: Function, self?: any): qx.data.Array;
        forEach(callback: Function, context: any): void;
        getAutoDisposeItems(): any;
        indexOf(item: any): number;
        initAutoDisposeItems(value: any): any;
        insertAfter(after: any, item: any): void;
        insertAt(index: number, item: any): void;
        insertBefore(before: any, item: any): void;
        isAutoDisposeItems(): boolean;
        join(connector: string): string;
        lastIndexOf(item: any): number;
        map(callback: Function, self?: any): qx.data.Array;
        max(): any;
        min(): any;
        pop(): any;
        push(varargs: any): number;
        reduce(callback: Function, initValue?: any): any;
        reduceRight(callback: Function, initValue?: any): any;
        remove(item: any): any;
        removeAll(): qx.data.Array;
        removeAt(index: number): any;
        resetAutoDisposeItems(): void;
        reverse(): void;
        setAutoDisposeItems(value: any): any;
        shift(): any;
        slice(from: number, to?: number): qx.data.Array;
        some(callback: Function, self?: any): boolean;
        sort(func: Function): void;
        sum(): number;
        toggleAutoDisposeItems(): boolean;
        unshift(varargs: any): number;
        autoDisposeItems: boolean;
    }
}
declare module qx.data {
    class Conversion {
        static toBoolean(value: any): boolean;
        static toNumber(value: any): number;
    }
}
declare module qx.data {
    interface IListData {
        contains(item: any): boolean;
        getItem(index: number): any;
        getLength(): number;
        setItem(index: number, item: any): void;
        splice(startIndex: number, amount: number, varargs: any): qx.data.Array;
        toArray(): qx.data.Array;
    }
}
declare module qx.data {
    class MBinding {
        bind(sourcePropertyChain: string, targetObject: qx.core.Object, targetProperty: string, options: IMap): any;
        getBindings(): qx.data.Array;
        removeAllBindings(): void;
        removeBinding(id: any): void;
    }
}
declare module qx.data {
    class SingleValueBinding {
        static bind(sourceObject: qx.core.Object, sourcePropertyChain: string, targetObject: qx.core.Object, targetPropertyChain: string, options?: IMap): any;
        static getAllBindings(): IMap;
        static getAllBindingsForObject(object: qx.core.Object): qx.data.Array;
        static removeAllBindings(): void;
        static removeAllBindingsForObject(object: qx.core.Object): void;
        static removeBindingFromObject(sourceObject: qx.core.Object, id: any): void;
        static resolvePropertyChain(o: qx.core.Object, propertyChain: string): any;
        static showAllBindingsInLog(): void;
        static showBindingInLog(object: qx.core.Object, id: any): void;
    }
}
declare module qx.data.controller {
    class Form extends qx.core.Object {
        constructor(model: any, target: any, selfUpdate?: boolean);
        protected _applyModel(value: qx.core.Object, old: qx.core.Object): void;
        protected _applyTarget(value: qx.ui.form.Form, old: qx.ui.form.Form): void;
        addBindingOptions(name: string, model2target: IMap, target2model: IMap): void;
        createModel(includeBubbleEvents?: boolean): qx.core.Object;
        getModel(): any;
        getTarget(): any;
        initModel(value: any): any;
        initTarget(value: any): any;
        resetModel(): void;
        resetTarget(): void;
        setModel(value: any): any;
        setTarget(value: any): any;
        updateModel(): void;
    }
}
declare module qx.data.controller {
    interface IControllerDelegate {
        bindItem(controller: any, item: qx.ui.core.Widget, id: any): void;
        configureItem(item: any): void;
        createItem(): qx.ui.core.Widget;
        filter(data: any): boolean;
    }
}
declare module qx.data.controller {
    interface ISelection {
        getSelection(): qx.data.IListData;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
    }
}
declare module qx.data.controller {
    class List extends qx.core.Object implements qx.data.controller.ISelection {
        getSelection(): qx.data.IListData;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
        protected _addChangeTargetListener(value: any, old: any): void;
        protected _applySelection(value: qx.data.Array, old: any): void;
        protected _changeTargetSelection(): void;
        protected _endSelectionModification(): void;
        protected _inSelectionModification(): boolean;
        protected _startSelectionModification(): void;
        protected _updateSelection(): void;
        initSelection(value: any): any;
        constructor(model?: qx.data.Array, target?: qx.ui.core.Widget, labelPath?: string);
        protected _applyDelegate(value: any, old: any): void;
        protected _applyIconOptions(value: any, old: any): void;
        protected _applyIconPath(value: any, old: any): void;
        protected _applyLabelOptions(value: any, old: any): void;
        protected _applyLabelPath(value: any, old: any): void;
        protected _applyModel(value: any, old: any): void;
        protected _applyTarget(value: any, old: any): void;
        protected _bindListItem(item: qx.ui.form.ListItem, index: number): void;
        protected _createItem(): qx.ui.form.ListItem;
        protected _onBindingSet(index: number, sourceObject: qx.core.Object, targetObject: qx.core.Object): void;
        protected _removeBindingsFrom(item: number): void;
        protected _setBindItem(value: any, old: any): void;
        protected _setConfigureItem(value: any, old: any): void;
        protected _setCreateItem(value: any, old: any): void;
        protected _setFilter(value: any, old: any): void;
        bindDefaultProperties(item: qx.ui.form.ListItem, index: number): void;
        bindProperty(sourcePath: any, targetProperty: string, options: any, targetWidget: qx.ui.core.Widget, index: number): void;
        bindPropertyReverse(targetPath: any, sourcePath: string, options: any, sourceWidget: qx.ui.core.Widget, index: number): void;
        getDelegate(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        getModel(): any;
        getTarget(): any;
        getVisibleModels(): qx.data.Array;
        initDelegate(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        initModel(value: any): any;
        initTarget(value: any): any;
        resetDelegate(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        resetModel(): void;
        resetTarget(): void;
        setDelegate(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        setModel(value: any): any;
        setTarget(value: any): any;
        update(): void;
        iconPath: string;
        labelPath: string;
    }
}
declare module qx.data.controller {
    class MSelection {
        constructor();
        protected _addChangeTargetListener(value: any, old: any): void;
        protected _applySelection(value: qx.data.Array, old: any): void;
        protected _changeTargetSelection(): void;
        protected _endSelectionModification(): void;
        protected _inSelectionModification(): boolean;
        protected _startSelectionModification(): void;
        protected _updateSelection(): void;
        getSelection(): any;
        initSelection(value: any): any;
        resetSelection(): void;
        setSelection(value: any): any;
    }
}
declare module qx.data.controller {
    class Object extends qx.core.Object {
        constructor(model?: qx.core.Object);
        protected _applyModel(value: any, old: any): void;
        addTarget(targetObject: qx.core.Object, targetProperty: string, sourceProperty: string, bidirectional?: boolean, options?: IMap, reverseOptions?: IMap): void;
        getModel(): any;
        initModel(value: any): any;
        removeTarget(targetObject: qx.core.Object, targetProperty: string, sourceProperty: string): void;
        resetModel(): void;
        setModel(value: any): any;
    }
}
declare module qx.data.controller {
    class Tree extends qx.core.Object implements qx.data.controller.ISelection {
        getSelection(): qx.data.IListData;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
        protected _addChangeTargetListener(value: any, old: any): void;
        protected _applySelection(value: qx.data.Array, old: any): void;
        protected _changeTargetSelection(): void;
        protected _endSelectionModification(): void;
        protected _inSelectionModification(): boolean;
        protected _startSelectionModification(): void;
        protected _updateSelection(): void;
        initSelection(value: any): any;
        constructor(model?: qx.core.Object, target?: qx.ui.tree.Tree, childPath?: string, labelPath?: string);
        protected _applyChildPath(value: any, old: any): void;
        protected _applyDelegate(value: any, old: any): void;
        protected _applyIconOptions(value: any, old: any): void;
        protected _applyIconPath(value: any, old: any): void;
        protected _applyLabelOptions(value: any, old: any): void;
        protected _applyLabelPath(value: any, old: any): void;
        protected _applyModel(value: any, old: any): void;
        protected _applyTarget(value: any, old: any): void;
        protected _createItem(): qx.ui.tree.core.AbstractTreeItem;
        protected _setBindItem(value: any, old: any): void;
        protected _setConfigureItem(value: any, old: any): void;
        protected _setCreateItem(value: any, old: any): void;
        bindDefaultProperties(treeNode: qx.ui.tree.core.AbstractTreeItem, modelNode: qx.core.Object): void;
        bindProperty(sourcePath: any, targetPath: string, options: any, targetWidget: qx.ui.tree.core.AbstractTreeItem, modelNode: any): void;
        bindPropertyReverse(targetPath: any, sourcePath: string, options: any, sourceWidget: qx.ui.tree.core.AbstractTreeItem, modelNode: any): void;
        getChildPath(): any;
        getDelegate(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        getModel(): any;
        getTarget(): any;
        initChildPath(value: any): any;
        initDelegate(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        initModel(value: any): any;
        initTarget(value: any): any;
        resetChildPath(): void;
        resetDelegate(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        resetModel(): void;
        resetTarget(): void;
        setChildPath(value: any): any;
        setDelegate(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        setModel(value: any): any;
        setTarget(value: any): any;
        childPath: string;
        iconPath: string;
        labelPath: string;
    }
}
declare module qx.data.marshal {
    interface IMarshaler {
        toClass(data: any, includeBubbleEvents: boolean): void;
        toModel(data: any): qx.core.Object;
    }
}
declare module qx.data.marshal {
    interface IMarshalerDelegate {
        getModelClass(properties: string, object: IMap, parentProperty: any, depth: number): any;
        getModelMixins(properties: string, parentProperty: any, depth: number): any;
        getModelSuperClass(properties: string, parentProperty: any, depth: number): any;
        getPropertyMapping(property: string, properties: string): string;
        getValidationRule(properties: string, propertyName: string): any;
        ignore(properties: string, parentProperty: any, depth: number): boolean;
    }
}
declare module qx.data.marshal {
    class Json extends qx.core.Object implements qx.data.marshal.IMarshaler {
        toClass(data: any, includeBubbleEvents: boolean): void;
        toModel(data: any): qx.core.Object;
        constructor(delegate: any);
        static createModel(data: any, includeBubbleEvents: boolean): qx.core.Object;
    }
}
declare module qx.data.marshal {
    class MEventBubbling {
        protected _applyEventPropagation(value: any, old: any, name: string): void;
        protected _registerEventChaining(value: any, old: any, name: string): void;
    }
}
declare module qx.data.store {
    interface IStoreDelegate {
        configureRequest(request: any): void;
        manipulateData(data: any): any;
    }
}
declare module qx.data.store {
    class Json extends qx.core.Object {
        constructor(url: any, delegate?: any);
        protected _applyUrl(value: string, old: string): void;
        protected _createRequest(url: string): void;
        protected _getRequest(): any;
        protected _onChangePhase(ev: qx.event.type.Data): void;
        protected _onFail(ev: qx.event.type.Event): void;
        protected _onSuccess(ev: qx.event.type.Event): void;
        protected _setRequest(request: any): void;
        getModel(): any;
        getState(): any;
        getUrl(): any;
        initModel(value: any): any;
        initState(value: any): any;
        initUrl(value: any): any;
        reload(): void;
        resetModel(): void;
        resetState(): void;
        resetUrl(): void;
        setModel(value: any): any;
        setState(value: any): any;
        setUrl(value: any): any;
    }
}
declare module qx.data.store {
    class Jsonp extends qx.data.store.Json {
        constructor(url?: string, delegate?: any, callbackParam?: string);
        getCallbackName(): any;
        getCallbackParam(): any;
        initCallbackName(value: any): any;
        initCallbackParam(value: any): any;
        resetCallbackName(): void;
        resetCallbackParam(): void;
        setCallbackName(value: any): any;
        setCallbackParam(value: any): any;
        callbackName: string;
        callbackParam: string;
    }
}
declare module qx.data.store {
    class Offline extends qx.core.Object {
        constructor(key: string, storage?: string, delegate?: any);
        protected _applyModel(value: any, old: any): void;
        protected _initializeModel(): void;
        protected _setModel(data: any): void;
        getKey(): string;
        getModel(): any;
        initModel(value: any): any;
        resetModel(): void;
        setModel(value: any): any;
    }
}
declare module qx.data.store {
    class Rest extends qx.core.Object {
        constructor(resource: qx.io.rest.Resource, actionName: string, delegate?: any);
        getActionName(): any;
        getModel(): any;
        getResource(): any;
        initActionName(value: any): any;
        initModel(value: any): any;
        initResource(value: any): any;
        resetActionName(): void;
        resetModel(): void;
        resetResource(): void;
        setActionName(value: any): any;
        setModel(value: any): any;
        setResource(value: any): any;
        actionName: string;
        resource: qx.io.rest.Resource;
    }
}
declare module qx.data.store {
    class Yql extends qx.data.store.Jsonp {
        constructor(query: string, delegate?: any, https?: boolean);
    }
}
declare module qx.dev {
    class Debug {
        static debugObject(obj: any, initialMessage: any, maxLevel?: number): void;
        static debugObjectToString(obj: any, initialMessage: any, maxLevel?: number, bHtml?: boolean): string;
        static debugProperties(model: qx.core.Object, maxLevel?: number, html?: boolean, indent?: number): string;
        static getFunctionName(func: Function, functionType?: string): any;
        static startDisposeProfiling(): void;
        static stopDisposeProfiling(checkFunction: Function): IMap[];
    }
}
declare module qx.dev {
    class FakeServer {
        constructor();
        protected _getRegExp(pattern: string): RegExp;
        addFilter(filter: Function): void;
        configure(responseData: IMap[]): void;
        getFakeServer(): any;
        removeFilter(filter: Function): void;
        removeResponse(method: string, url: RegExp): void;
        respondWith(method: string, urlRegExp: RegExp, response: string): void;
        restore(): void;
    }
}
declare module qx.dev {
    class ObjectSummary {
        static getInfo(): string;
        static getNewObjects(): string;
    }
}
declare module qx.dev {
    class Profile {
        static getProfileData(): IMap;
        static normalizeProfileData(): void;
        static profileAfter(fullName: string, fcn: Function, type: string, args: any, returnValue: any): void;
        static profileBefore(fullName: string, fcn: Function, type: string, args: any): void;
        static showResults(maxLength?: number): void;
        static start(): void;
        static stop(): void;
    }
}
declare module qx.dev {
    class StackTrace {
        static getStackTrace(): string[];
        static getStackTraceFromCaller(args: any): string[];
        static getStackTraceFromError(error: ErrorImpl): string[];
    }
}
declare module qx.dev {
    class Tokenizer extends qx.core.Object {
        static javaScriptToHtml(javaScriptText: string, forPreTag?: boolean): string;
        static tokenizeJavaScript(javaScriptText: string): IMap[];
    }
}
declare module qx.dev.unit {
    class AbstractTestSuite extends qx.core.Object {
        constructor();
        addFail(functionName: string, message: string): void;
        addTestFunction(name: string, fcn: Function): void;
        addTestMethod(testCase: qx.dev.unit.TestCase, functionName: string): void;
        getTestMethods(): Function[];
        run(testResult: any): void;
    }
}
declare module qx.dev.unit {
    class AsyncWrapper extends qx.core.Object {
        constructor(delay?: number, deferredFunction?: Function, context?: any);
        getContext(): any;
        getDeferredFunction(): any;
        getDelay(): any;
        initContext(value: any): any;
        initDeferredFunction(value: any): any;
        initDelay(value: any): any;
        resetContext(): void;
        resetDeferredFunction(): void;
        resetDelay(): void;
        setContext(value: any): any;
        setDeferredFunction(value: any): any;
        setDelay(value: any): any;
        context: any;
        deferredFunction: Function;
        delay: number;
    }
}
declare module qx.dev.unit {
    class JsUnitTestResult extends qx.dev.unit.TestResult {
        constructor();
        exportToJsUnit(): void;
    }
}
declare module qx.dev.unit {
    class MMeasure {
        log(msg: string, iterations: number, ownTime: number, renderTime: number): void;
        measure(msg: string, callback: Function, finalize: Function, displayIterations?: number, maxTime?: number): void;
        measureIterations(msg: string, prepare: Function, callback: Function, finalize: Function, time: number): void;
        measureRepeated(msg: string, callback: Function, finalize: Function, iterations: number, displayIterations?: number): void;
    }
}
declare module qx.dev.unit {
    class MMock {
        constructor();
        deepStub(object: any): any;
        getRequests(): qx.data.Array;
        getSandbox(): any;
        getServer(): any;
        injectStub(object: any, property: string, customStub?: any): any;
        mock(object: any): Function;
        revealMock(object: any, property: string, customObject?: any): any;
        shallowStub(object: any, targetClazz: any, propsToExclude: qx.data.Array): any;
        spy(function_or_object: any, method?: string): Function;
        stub(object?: any, method?: string): Function;
        useFakeServer(): any;
        useFakeXMLHttpRequest(): any;
    }
}
declare module qx.dev.unit {
    class MRequirements {
        require(featureList: string[]): void;
        hasChrome(): boolean;
        hasFirefox(): boolean;
        hasGecko(): boolean;
        hasGuiApp(): boolean;
        hasHttp(): boolean;
        hasIe(): boolean;
        hasInlineApp(): boolean;
        hasMshtml(): boolean;
        hasNativeApp(): boolean;
        hasNoSelenium(): boolean;
        hasNoWin7(): boolean;
        hasOpera(): boolean;
        hasPhp(): boolean;
        hasWebkit(): boolean;
    }
}
declare module qx.dev.unit {
    class MRequirementsBasic {
        require(featureList: string[]): void;
    }
}
declare module qx.dev.unit {
    class MTestLoader {
        protected _getClassNameFromUrl(): string;
        getSuite(): any;
        getTestDescriptions(): string;
        initSuite(value: any): any;
        resetSuite(): void;
        runJsUnit(): void;
        runStandAlone(): void;
        runTests(testResult: any, className: string, methodName: string): void;
        runTestsFromNamespace(testResult: any, namespaceName: string): void;
        setSuite(value: any): any;
        setTestNamespace(namespace: any): void;
        suite: qx.dev.unit.TestSuite;
    }
}
declare module qx.dev.unit {
    class MeasurementResult {
        constructor(message: string, iterations: number, ownTime: number, renderTime: number);
        getData(): IMap;
    }
}
declare module qx.dev.unit {
    class RequirementError extends ErrorImpl {
        constructor(requirement?: string, message?: string);
        getRequirement(): string;
    }
}
declare module qx.dev.unit {
    class Sinon {
        static getSinon(): any;
    }
}
declare module qx.dev.unit {
    class TestCase extends qx.core.Object {
        assert(condition: any, msg: string): void;
        assertArgumentsCount(args: any, minCount: number, maxCount: number, msg: string): void;
        assertArray(value: any, msg: string): void;
        assertArrayEquals(expected: qx.data.Array, found: qx.data.Array, msg: string): void;
        assertBoolean(value: any, msg: string): void;
        assertCssColor(expected: string, value: string, msg: string): void;
        assertElement(value: any, msg: string): void;
        assertEquals(expected: any, found: any, msg: string): void;
        assertEventFired(obj: any, event: string, invokeFunc: Function, listener?: Function, msg?: string): void;
        assertEventNotFired(obj: any, event: string, invokeFunc: Function, msg: string): void;
        assertException(callback: Function, exception?: ErrorImpl, re?: RegExp, msg?: string): void;
        assertFalse(value: boolean, msg: string): void;
        assertFunction(value: any, msg: string): void;
        assertIdentical(expected: any, found: any, msg: string): void;
        assertInArray(value: any, array: qx.data.Array, msg: string): void;
        assertInRange(value: any, min: number, max: number, msg: string): void;
        assertInstance(value: any, clazz: qx.Class, msg: string): void;
        assertInteger(value: any, msg: string): void;
        assertInterface(value: any, iface: qx.Class, msg: string): void;
        assertJsonEquals(expected: any, found: any, msg: string): void;
        assertKeyInMap(value: any, map: IMap, msg: string): void;
        assertMap(value: any, msg: string): void;
        assertMatch(str: string, re: RegExp, msg: string): void;
        assertNotEquals(expected: any, found: any, msg: string): void;
        assertNotIdentical(expected: any, found: any, msg: string): void;
        assertNotNull(value: any, msg: string): void;
        assertNotUndefined(value: any, msg: string): void;
        assertNull(value: any, msg: string): void;
        assertNumber(value: any, msg: string): void;
        assertObject(value: any, msg: string): void;
        assertPositiveInteger(value: any, msg: string): void;
        assertPositiveNumber(value: any, msg: string): void;
        assertQxObject(value: any, msg: string): void;
        assertQxWidget(value: any, msg: string): void;
        assertRegExp(value: any, msg: string): void;
        assertString(value: any, msg: string): void;
        assertTrue(value: boolean, msg: string): void;
        assertType(value: any, type: string, msg: string): void;
        assertUndefined(value: any, msg: string): void;
        fail(msg: string, compact: boolean): void;
        getTestFunc(): any;
        getTestResult(): any;
        initTestFunc(value: any): any;
        initTestResult(value: any): any;
        isDebugOn(): boolean;
        resetTestFunc(): void;
        resetTestResult(): void;
        resume(deferredFunction?: Function, self?: any): void;
        resumeHandler(deferredFunction: Function, self?: any): Function;
        setTestFunc(value: any): any;
        setTestResult(value: any): any;
        skip(message: any): void;
        wait(delay?: number, deferredFunction?: Function, context?: any): void;
    }
}
declare module qx.dev.unit {
    class TestClass extends qx.dev.unit.AbstractTestSuite {
        constructor(clazz: qx.Class);
        getName(): any;
        initName(value: any): any;
        resetName(): void;
        setName(value: any): any;
        name: string;
    }
}
declare module qx.dev.unit {
    class TestFunction extends qx.core.Object {
        constructor(testCase?: qx.dev.unit.TestCase, methodName?: string, testFunction?: Function);
        getClassName(): any;
        getFullName(): string;
        getName(): any;
        getTestClass(): any;
        getTestFunction(): any;
        initClassName(value: any): any;
        initName(value: any): any;
        initTestClass(value: any): any;
        initTestFunction(value: any): any;
        resetClassName(): void;
        resetName(): void;
        resetTestClass(): void;
        resetTestFunction(): void;
        run(testResult: any): void;
        setClassName(value: any): any;
        setName(value: any): any;
        setTestClass(value: any): any;
        setTestFunction(value: any): any;
        setUp(): void;
        tearDown(): void;
        className: string;
        name: string;
        testClass: qx.dev.unit.TestCase;
        testFunction: Function;
    }
}
declare module qx.dev.unit {
    class TestLoader extends qx.application.Standalone {
        protected _getClassNameFromUrl(): string;
        getSuite(): any;
        getTestDescriptions(): string;
        initSuite(value: any): any;
        resetSuite(): void;
        runJsUnit(): void;
        runStandAlone(): void;
        runTests(testResult: any, className: string, methodName: string): void;
        runTestsFromNamespace(testResult: any, namespaceName: string): void;
        setSuite(value: any): any;
        setTestNamespace(namespace: any): void;
    }
}
declare module qx.dev.unit {
    class TestLoaderBasic extends qx.core.Object {
        protected _getClassNameFromUrl(): string;
        getSuite(): any;
        getTestDescriptions(): string;
        initSuite(value: any): any;
        resetSuite(): void;
        runJsUnit(): void;
        runStandAlone(): void;
        runTests(testResult: any, className: string, methodName: string): void;
        runTestsFromNamespace(testResult: any, namespaceName: string): void;
        setSuite(value: any): any;
        setTestNamespace(namespace: any): void;
        constructor(nameSpace: string);
    }
}
declare module qx.dev.unit {
    class TestLoaderInline extends qx.application.Inline {
        protected _getClassNameFromUrl(): string;
        getSuite(): any;
        getTestDescriptions(): string;
        initSuite(value: any): any;
        resetSuite(): void;
        runJsUnit(): void;
        runStandAlone(): void;
        runTests(testResult: any, className: string, methodName: string): void;
        runTestsFromNamespace(testResult: any, namespaceName: string): void;
        setSuite(value: any): any;
        setTestNamespace(namespace: any): void;
    }
}
declare module qx.dev.unit {
    class TestLoaderMobile extends qx.application.Mobile {
        protected _getClassNameFromUrl(): string;
        getSuite(): any;
        getTestDescriptions(): string;
        initSuite(value: any): any;
        resetSuite(): void;
        runJsUnit(): void;
        runStandAlone(): void;
        runTests(testResult: any, className: string, methodName: string): void;
        runTestsFromNamespace(testResult: any, namespaceName: string): void;
        setSuite(value: any): any;
        setTestNamespace(namespace: any): void;
    }
}
declare module qx.dev.unit {
    class TestLoaderNative extends qx.application.Native {
    }
}
declare module qx.dev.unit {
    class TestResult extends qx.core.Object {
        static run(testResult: any, test: any, testFunction: any): void;
        protected _createError(eventName: string, exceptions: ErrorImpl[], test: any): void;
        tearDown(test: any): void;
    }
}
declare module qx.dev.unit {
    class TestSuite extends qx.dev.unit.AbstractTestSuite {
        constructor(testClassOrNamespace: any);
        add(testClassOrNamespace: any): void;
        addTestClass(clazz: qx.Class): void;
        addTestNamespace(namespace: any): void;
        getTestClasses(): qx.Class[];
    }
}
declare module qx.dom {
    class Element {
        static create(name: string, attributes?: IMap, win?: Window): HTMLElement;
        static empty(element: HTMLElement): string;
        static getHelperElement(win?: Window): HTMLElement;
        static getParentElement(element: HTMLElement): HTMLElement;
        static hasChild(parent: HTMLElement, child: any): boolean;
        static hasChildElements(element: HTMLElement): boolean;
        static hasChildren(element: HTMLElement): boolean;
        static insertAfter(node: any, ref: any): boolean;
        static insertAt(node: any, parent: HTMLElement, index: number): boolean;
        static insertBefore(node: any, ref: any): boolean;
        static insertBegin(node: any, parent: HTMLElement): boolean;
        static insertEnd(node: any, parent: HTMLElement): boolean;
        static isInDom(element: HTMLElement, win: Window): boolean;
        static remove(node: any): boolean;
        static removeChild(node: any, parent: HTMLElement): boolean;
        static removeChildAt(index: number, parent: HTMLElement): boolean;
        static replaceAt(newNode: any, index: number, parent: HTMLElement): boolean;
        static replaceChild(newNode: any, oldNode: any): boolean;
    }
}
declare module qx.dom {
    class Hierarchy {
        static _recursivelyCollect(element: HTMLElement, property: string): qx.data.Array;
        static cleanWhitespace(element: HTMLElement): void;
        static contains(element: HTMLElement, target: any): boolean;
        static getAncestors(element: HTMLElement): qx.data.Array;
        static getChildElements(element: HTMLElement): qx.data.Array;
        static getCommonParent(element1: HTMLElement, element2: HTMLElement): HTMLElement;
        static getDescendants(element: HTMLElement): qx.data.Array;
        static getElementIndex(element: HTMLElement): number;
        static getFirstDescendant(element: HTMLElement): HTMLElement;
        static getLastDescendant(element: HTMLElement): HTMLElement;
        static getNextElementSibling(element: HTMLElement): any;
        static getNextSiblings(element: HTMLElement): qx.data.Array;
        static getNodeIndex(node: any): number;
        static getPreviousElementSibling(element: HTMLElement): any;
        static getPreviousSiblings(element: HTMLElement): qx.data.Array;
        static getSiblings(element: any): qx.data.Array;
        static isDescendantOf(element: HTMLElement, ancestor: HTMLElement): boolean;
        static isEmpty(element: HTMLElement): boolean;
        static isRendered(element: HTMLElement): boolean;
    }
}
declare module qx.dom {
    class Node {
        static getBodyElement(node: Window): HTMLElement;
        static getDocument(node: Window): any;
        static getDocumentElement(node: Window): HTMLElement;
        static getName(node: any): string;
        static getText(node: any): string;
        static getWindow(node: Window): Window;
        static isBlockNode(node: any): boolean;
        static isDocument(node: any): boolean;
        static isDocumentFragment(node: any): boolean;
        static isElement(node: any): boolean;
        static isNode(node: any): boolean;
        static isNodeName(node: any, nodeName: string): boolean;
        static isText(node: any): boolean;
        static isWindow(obj: any): boolean;
    }
}
declare module qx.event {
    class AcceleratingTimer extends qx.core.Object {
        constructor();
        protected _onInterval(): void;
        getDecrease(): any;
        getFirstInterval(): any;
        getInterval(): any;
        getMinimum(): any;
        initDecrease(value: any): any;
        initFirstInterval(value: any): any;
        initInterval(value: any): any;
        initMinimum(value: any): any;
        resetDecrease(): void;
        resetFirstInterval(): void;
        resetInterval(): void;
        resetMinimum(): void;
        setDecrease(value: any): any;
        setFirstInterval(value: any): any;
        setInterval(value: any): any;
        setMinimum(value: any): any;
        start(): void;
        stop(): void;
        decrease: number;
        firstInterval: number;
        interval: number;
        minimum: number;
    }
}
declare module qx.event {
    class Emitter {
        addListener(name: string, listener: Function, ctx?: any): number;
        addListenerOnce(name: string, listener: Function, ctx?: any): number;
        emit(name: string, data?: any): void;
        off(name: string, listener: Function, ctx?: any): any;
        offById(id: number): any;
        on(name: string, listener: Function, ctx?: any): number;
        once(name: string, listener: Function, ctx?: any): number;
        removeListener(name: string, listener: Function, ctx?: any): void;
        removeListenerById(id: number): void;
    }
}
declare module qx.event {
    class GlobalError {
        static handleError(ex: ErrorImpl): void;
        static observeMethod(method: Function): Function;
        static setErrorHandler(callback: Function, context: any): void;
    }
}
declare module qx.event {
    interface IEventDispatcher {
        canDispatchEvent(target: qx.event.type.Event, event: qx.event.type.Event, type: string): boolean;
        dispatchEvent(target: qx.event.type.Event, event: qx.event.type.Event, type: string): void;
    }
}
declare module qx.event {
    interface IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
    }
}
declare module qx.event {
    class Idle extends qx.core.Object {
        constructor();
        protected _applyTimeoutInterval(value: number, old: number): void;
        protected _onInterval(): void;
        getTimeoutInterval(): any;
        initTimeoutInterval(value: any): any;
        resetTimeoutInterval(): void;
        setTimeoutInterval(value: any): any;
        timeoutInterval: number;
        static getInstance(): qx.event.Idle;
    }
}
declare module qx.event {
    class Manager {
        constructor(win: Window, registration: qx.event.Registration);
        static getNextUniqueId(): string;
        addListener(target: any, type: string, listener: Function, self?: any, capture?: boolean): string;
        dispatchEvent(target: any, event: qx.event.type.Event): boolean;
        dispose(): void;
        findHandler(target: any, type: string): any;
        getDispatcher(clazz: qx.Class): any;
        getHandler(clazz: qx.Class): any;
        getListeners(target: any, type: string, capture?: boolean): any;
        getWindow(): Window;
        getWindowId(): string;
        hasListener(target: any, type: string, capture?: boolean): boolean;
        importListeners(target: any, list: IMap): void;
        removeAllListeners(target: any): boolean;
        removeListener(target: any, type: string, listener: Function, self?: any, capture?: boolean): boolean;
        removeListenerById(target: any, id: string): boolean;
        serializeListeners(target: any): IMap[];
    }
}
declare module qx.event {
    class Messaging {
        constructor();
        protected _addListener(channel: string, type: RegExp, handler: Function, scope?: any): string;
        protected _emit(channel: string, path: string, params: IMap, customData: any): void;
        protected _emitListeners(channel: string, path: string, listeners: IMap[], params: IMap, customData: any): boolean;
        protected _emitRoute(channel: string, path: string, listener: IMap, params: IMap, customData: any): boolean;
        emit(channel: string, path: string, params: IMap, customData: any): void;
        has(channel: string, path: string): boolean;
        on(channel: string, type: RegExp, handler: Function, scope?: any): string;
        onAny(type: RegExp, handler: Function, scope?: any): string;
        remove(id: string): void;
    }
}
declare module qx.event {
    class Pool extends qx.util.ObjectPool {
        constructor();
        static getInstance(): qx.event.Pool;
    }
}
declare module qx.event {
    class Registration {
        static addDispatcher(dispatcher: qx.event.IEventDispatcher, priority: number): void;
        static addHandler(handler: qx.event.IEventHandler): void;
        static addListener(target: any, type: string, listener: Function, self?: any, capture?: boolean): any;
        static createEvent(type: string, clazz?: any, args?: qx.data.Array): qx.event.type.Event;
        static dispatchEvent(target: any, event: qx.event.type.Event): boolean;
        static fireEvent(target: any, type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        static fireNonBubblingEvent(target: any, type: string, clazz?: qx.Class, args?: qx.data.Array): boolean;
        static getDispatchers(): qx.event.IEventDispatcher[];
        static getHandlers(): qx.event.IEventHandler[];
        static getManager(target: any): qx.event.Manager;
        static hasListener(target: any, type: string, capture?: boolean): boolean;
        static removeAllListeners(target: any): boolean;
        static removeListener(target: any, type: string, listener: Function, self?: any, capture?: boolean): boolean;
        static removeListenerById(target: any, id: any): boolean;
        static removeManager(mgr: qx.event.Manager): void;
        static serializeListeners(target: any): IMap[];
    }
}
declare module qx.event {
    class Timer extends qx.core.Object {
        constructor(interval: number);
        static once(func: Function, obj: any, timeout: number): qx.event.Timer;
        protected _applyEnabled(value: any, old: any): void;
        protected _applyInterval(value: any, old: any): void;
        protected _oninterval(): void;
        getEnabled(): any;
        getInterval(): any;
        initEnabled(value: any): any;
        initInterval(value: any): any;
        isEnabled(): boolean;
        resetEnabled(): void;
        resetInterval(): void;
        restart(): void;
        restartWith(interval: number): void;
        setEnabled(value: any): any;
        setInterval(value: any): any;
        start(): void;
        startWith(interval: number): void;
        stop(): void;
        toggleEnabled(): boolean;
        enabled: boolean;
        interval: number;
    }
}
declare module qx.event.dispatch {
    class AbstractBubbling extends qx.core.Object implements qx.event.IEventDispatcher {
        canDispatchEvent(target: qx.event.type.Event, event: qx.event.type.Event, type: string): boolean;
        dispatchEvent(target: qx.event.type.Event, event?: qx.event.type.Event, type?: string): any;
        constructor(manager: qx.event.Manager);
        protected _getParent(target: any): any;
    }
}
declare module qx.event.dispatch {
    class Direct extends qx.core.Object implements qx.event.IEventDispatcher {
        canDispatchEvent(target: qx.event.type.Event, event: qx.event.type.Event, type: string): boolean;
        dispatchEvent(target: qx.event.type.Event, event?: qx.event.type.Event, type?: string): any;
        constructor(manager: qx.event.Manager);
    }
}
declare module qx.event.dispatch {
    class DomBubbling extends qx.event.dispatch.AbstractBubbling {
    }
}
declare module qx.event.dispatch {
    class MouseCapture extends qx.event.dispatch.AbstractBubbling {
        constructor(manager: qx.event.Manager, registration: qx.event.Registration);
        activateCapture(element: HTMLElement, containerCapture?: boolean): void;
        getCaptureElement(): any;
        nativeReleaseCapture(element: HTMLElement): void;
        nativeSetCapture(element: HTMLElement, containerCapture?: boolean): void;
        releaseCapture(): void;
    }
}
declare module qx.event.handler {
    class Appear extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        static refresh(): void;
    }
}
declare module qx.event.handler {
    class Application extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _initObserver(): void;
        protected _onNativeLoad(): void;
        protected _onNativeUnload(): void;
        protected _stopObserver(): void;
        isApplicationReady(): boolean;
    }
}
declare module qx.event.handler {
    class Capture extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
    }
}
declare module qx.event.handler {
    class DragDrop extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _onKeyDown(e: qx.event.type.KeySequence): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onKeyUp(e: qx.event.type.KeySequence): void;
        protected _onLongtap(e: qx.event.type.Tap): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _onTrack(e: qx.event.type.Track): void;
        protected _onTrackEnd(e: qx.event.type.Track): void;
        protected _onTrackStart(e: qx.event.type.Track): void;
        protected _onWindowBlur(e: qx.event.type.Event): void;
        protected _start(e: qx.event.type.Pointer): void;
        addAction(action: string): void;
        addData(type: string, data: any): void;
        addType(type: string): void;
        clearSession(): void;
        getCurrentAction(): string;
        getCurrentType(): string;
        getCursor(): any;
        getData(type: string): any;
        getDragTarget(): qx.ui.core.Widget;
        initCursor(value: any): any;
        isSessionActive(): boolean;
        resetCursor(): void;
        setCursor(value: any): any;
        supportsAction(type: string): boolean;
        supportsType(type: string): boolean;
        cursor: qx.ui.core.Widget;
    }
}
declare module qx.event.handler {
    class Element extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _onNative(nativeEvent: qx.event.type.Event, eventId: number): void;
    }
}
declare module qx.event.handler {
    class ElementResize extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _onInterval(e: qx.event.type.Data): void;
    }
}
declare module qx.event.handler {
    class Focus extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _applyActive(value: any, old: any): void;
        protected _applyFocus(value: any, old: any): void;
        protected _initObserver(): void;
        protected _stopObserver(): void;
        activate(element: HTMLElement): void;
        blur(element: HTMLElement): void;
        deactivate(element: HTMLElement): void;
        focus(element: HTMLElement): void;
        getActive(): any;
        getFocus(): any;
        initActive(value: any): any;
        initFocus(value: any): any;
        resetActive(): void;
        resetFocus(): void;
        setActive(value: any): any;
        setFocus(value: any): any;
        tryActivate(element: HTMLElement): void;
    }
}
declare module qx.event.handler {
    class Gesture extends qx.event.handler.GestureCore implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
    }
}
declare module qx.event.handler {
    class GestureCore {
        constructor(target: HTMLElement, emitter?: qx.event.Emitter);
        protected _calcAngle(): number;
        protected _calcDistance(): number;
        protected _fireEvent(domEvent: qx.event.type.Event, type: string, target?: HTMLElement): void;
        protected _fireRoll(domEvent: qx.event.type.Event, type: string, target: HTMLElement): void;
        protected _getDeltaCoordinates(domEvent: qx.event.type.Event): IMap;
        protected _hasIntermediaryHandler(target: HTMLElement): boolean;
        protected _initObserver(): void;
        protected _isBelowTapMaxDistance(domEvent: qx.event.type.Event): any;
        protected _onDblClick(domEvent: qx.event.type.Event): void;
        protected _stopObserver(): void;
        checkAndFireGesture(domEvent: qx.event.type.Event, type?: string, target?: HTMLElement): void;
        dispose(): void;
        gestureBegin(domEvent: qx.event.type.Event, target: HTMLElement): void;
        gestureCancel(id: number): void;
        gestureFinish(domEvent: qx.event.type.Event, target: HTMLElement): void;
        gestureMove(domEvent: qx.event.type.Event, target: HTMLElement): void;
        isBelowTapMaxDistance(event: qx.event.type.Event): boolean;
        stopMomentum(id: number): void;
    }
}
declare module qx.event.handler {
    class Iframe extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
    }
}
declare module qx.event.handler {
    class Input extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor();
        protected _inputFix(e: qx.event.type.Event, target: HTMLElement): void;
        protected _onBlur(e: qx.event.type.Event): void;
        protected _onChangeChecked(e: qx.event.type.Event): void;
        protected _onChangeValue(e: qx.event.type.Event): void;
        protected _onInput(e: qx.event.type.Event): void;
        protected _onKeyDown(e: qx.event.type.Event): void;
        protected _onKeyPress(e: qx.event.type.Event, target: HTMLElement): void;
        protected _onKeyUp(e: qx.event.type.Event): void;
        protected _onProperty(e: qx.event.type.Event): void;
    }
}
declare module qx.event.handler {
    class Keyboard extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _fireInputEvent(domEvent: qx.event.type.Event, charCode: number): void;
        protected _fireSequenceEvent(domEvent: qx.event.type.Event, type: string, keyIdentifier: string): void;
        protected _idealKeyHandler(keyCode: string, charCode: string, eventType: string, domEvent: HTMLElement): void;
        protected _identifierToKeyCode(keyIdentifier: string): number;
        protected _initKeyObserver(): void;
        protected _stopKeyObserver(): void;
    }
}
declare module qx.event.handler {
    class Mouse extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _initButtonObserver(): void;
        protected _initMoveObserver(): void;
        protected _initWheelObserver(): void;
        protected _onButtonEvent(domEvent: qx.event.type.Event): void;
        protected _onMoveEvent(domEvent: qx.event.type.Event): void;
        protected _onWheelEvent(domEvent: qx.event.type.Event): void;
        protected _stopButtonObserver(): void;
        protected _stopMoveObserver(): void;
        protected _stopWheelObserver(): void;
    }
}
declare module qx.event.handler {
    class Object extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
    }
}
declare module qx.event.handler {
    class Offline extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _initObserver(): void;
        protected _onNative(domEvent: qx.event.type.Event): void;
        protected _stopObserver(): void;
        isOnline(): boolean;
    }
}
declare module qx.event.handler {
    class Orientation extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _initObserver(): void;
        protected _onNative(domEvent: qx.event.type.Event): void;
        protected _onOrientationChange(domEvent: qx.event.type.Event): void;
        protected _stopObserver(): void;
    }
}
declare module qx.event.handler {
    class OrientationCore {
        constructor(targetWindow: Window, emitter: qx.event.Emitter);
        protected _initObserver(): void;
        protected _onNative(domEvent: qx.event.type.Event): void;
        protected _stopObserver(): void;
    }
}
declare module qx.event.handler {
    class Pointer extends qx.event.handler.PointerCore implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
    }
}
declare module qx.event.handler {
    class PointerCore {
        constructor(target: HTMLElement, emitter?: qx.event.Emitter);
        protected _fireEvent(domEvent: qx.event.type.Event, type?: string, target?: HTMLElement): void;
        protected _initObserver(callback: Function, useEmitter: boolean): void;
        protected _initPointerObserver(): void;
        protected _isSimulatedMouseEvent(x: number, y: number): boolean;
        protected _onMouseEvent(domEvent: qx.event.type.Event): void;
        protected _onPointerEvent(domEvent: qx.event.type.Event): void;
        protected _onTouchEvent(domEvent: qx.event.type.Event): void;
        protected _stopObserver(): void;
        dispose(): void;
    }
}
declare module qx.event.handler {
    class Touch extends qx.event.handler.TouchCore implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
    }
}
declare module qx.event.handler {
    class TouchCore {
        constructor(target: HTMLElement, emitter: qx.event.Emitter);
        protected _calcSingleTouchDelta(touch: qx.event.type.Event): IMap;
        protected _calcTouchesDelta(touches: qx.data.Array): qx.data.Array;
        protected _commonTouchEventHandler(domEvent: qx.event.type.Event, type?: string): void;
        protected _detectTouchesByPointer(domEvent: qx.event.type.Event, type?: string): qx.data.Array;
        protected _fireEvent(domEvent: qx.event.type.Event, type?: string, target?: HTMLElement): void;
        protected _getRotationAngle(touch0: qx.event.type.Event, touch1: qx.event.type.Event): number;
        protected _getScalingDistance(touch0: qx.event.type.Event, touch1: qx.event.type.Event): number;
        protected _getTarget(domEvent: qx.event.type.Event): HTMLElement;
        protected _initTouchObserver(): void;
        protected _mapPointerEvent(type: string): string;
        protected _onTouchEvent(domEvent: qx.event.type.Event): void;
        protected _stopTouchObserver(): void;
        dispose(): void;
    }
}
declare module qx.event.handler {
    class Transition extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _onNative(domEvent: qx.event.type.Event): void;
    }
}
declare module qx.event.handler {
    class UserAction extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
    }
}
declare module qx.event.handler {
    class Window extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor(manager: qx.event.Manager);
        protected _initWindowObserver(): void;
        protected _onNative(e: qx.event.type.Event): void;
        protected _stopWindowObserver(): void;
    }
}
declare module qx.event.message {
    class Bus extends qx.core.Object {
        static checkSubscription(message: string, subscriber: Function, context: any): boolean;
        static dispatch(msg: qx.event.message.Message): boolean;
        static dispatchByName(name: string, data: any): boolean;
        static getInstance(): qx.event.message.Bus;
        static getSubscriptions(): IMap;
        static subscribe(message: string, subscriber: Function, context: any): boolean;
        static unsubscribe(message: string, subscriber: Function, context: any): boolean;
        constructor();
    }
}
declare module qx.event.message {
    class Message extends qx.core.Object {
        constructor(name: string, data: any);
        getData(): any;
        getName(): any;
        getSender(): any;
        initData(value: any): any;
        initName(value: any): any;
        initSender(value: any): any;
        resetData(): void;
        resetName(): void;
        resetSender(): void;
        setData(value: any): any;
        setName(value: any): any;
        setSender(value: any): any;
        name: string;
        sender: any;
    }
}
declare module qx.event.type {
    class Data extends qx.event.type.Event {
        getData(): any;
        getOldData(): any;
    }
}
declare module qx.event.type {
    class Dom extends qx.event.type.Native {
        getModifiers(): number;
        isAltPressed(): boolean;
        isCtrlOrCommandPressed(): boolean;
        isCtrlPressed(): boolean;
        isMetaPressed(): boolean;
        isShiftPressed(): boolean;
    }
}
declare module qx.event.type {
    class Drag extends qx.event.type.Event {
        addAction(action: string): void;
        addData(type: string, data: any): void;
        addType(type: string): void;
        getCurrentAction(): string;
        getCurrentType(): string;
        getData(type: string): any;
        getDocumentLeft(): number;
        getDocumentTop(): number;
        getDragTarget(): qx.ui.core.Widget;
        getManager(): qx.event.handler.DragDrop;
        stopSession(): void;
        supportsAction(action: string): boolean;
        supportsType(type: string): boolean;
    }
}
declare module qx.event.type {
    class Event extends qx.core.Object {
        getBubbles(): boolean;
        getCurrentTarget(): HTMLElement;
        getDefaultPrevented(): boolean;
        getEventPhase(): number;
        getOriginalTarget(): HTMLElement;
        getPropagationStopped(): boolean;
        getRelatedTarget(): HTMLElement;
        getTarget(): HTMLElement;
        getTimeStamp(): number;
        getType(): string;
        init(canBubble?: boolean, cancelable?: boolean): qx.event.type.Event;
        isCancelable(): boolean;
        preventDefault(): void;
        setBubbles(bubbles: boolean): void;
        setCancelable(cancelable: boolean): void;
        setCurrentTarget(currentTarget: HTMLElement): void;
        setEventPhase(eventPhase: number): void;
        setOriginalTarget(originalTarget: HTMLElement): void;
        setRelatedTarget(relatedTarget: HTMLElement): void;
        setTarget(target: HTMLElement): void;
        setType(type: string): void;
        stop(): void;
        stopPropagation(): void;
    }
}
declare module qx.event.type {
    class Focus extends qx.event.type.Event {
    }
}
declare module qx.event.type {
    class GeoPosition extends qx.event.type.Event {
        constructor();
        getAccuracy(): any;
        getAltitude(): any;
        getAltitudeAccuracy(): any;
        getHeading(): any;
        getLatitude(): any;
        getLongitude(): any;
        getSpeed(): any;
        getTimestamp(): any;
        initAccuracy(value: any): any;
        initAltitude(value: any): any;
        initAltitudeAccuracy(value: any): any;
        initHeading(value: any): any;
        initLatitude(value: any): any;
        initLongitude(value: any): any;
        initSpeed(value: any): any;
        initTimestamp(value: any): any;
        resetAccuracy(): void;
        resetAltitude(): void;
        resetAltitudeAccuracy(): void;
        resetHeading(): void;
        resetLatitude(): void;
        resetLongitude(): void;
        resetSpeed(): void;
        resetTimestamp(): void;
        setAccuracy(value: any): any;
        setAltitude(value: any): any;
        setAltitudeAccuracy(value: any): any;
        setHeading(value: any): any;
        setLatitude(value: any): any;
        setLongitude(value: any): any;
        setSpeed(value: any): any;
        setTimestamp(value: any): any;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        latitude: number;
        longitude: number;
        speed: any;
        timestamp: number;
    }
}
declare module qx.event.type {
    class KeyInput extends qx.event.type.Dom {
        getChar(): string;
        getCharCode(): number;
    }
}
declare module qx.event.type {
    class KeySequence extends qx.event.type.Dom {
        getKeyCode(): number;
        getKeyIdentifier(): string;
        isPrintable(): boolean;
    }
}
declare module qx.event.type {
    class Mouse extends qx.event.type.Dom {
        getButton(): string;
        getDocumentLeft(): number;
        getDocumentTop(): number;
        getScreenLeft(): number;
        getScreenTop(): number;
        getViewportLeft(): number;
        getViewportTop(): number;
        isLeftPressed(): boolean;
        isMiddlePressed(): boolean;
        isRightPressed(): boolean;
    }
}
declare module qx.event.type {
    class MouseWheel extends qx.event.type.Mouse {
        getWheelDelta(axis?: string): number;
    }
}
declare module qx.event.type {
    class Native extends qx.event.type.Event {
        protected _cloneNativeEvent(nativeEvent: qx.event.type.Event, clone: any): any;
        getNativeEvent(): qx.event.type.Event;
        getReturnValue(): string;
        setReturnValue(returnValue?: string): void;
    }
}
declare module qx.event.type {
    class Orientation extends qx.event.type.Event {
        getOrientation(): number;
        isLandscape(): boolean;
        isPortrait(): boolean;
    }
}
declare module qx.event.type {
    class Pinch extends qx.event.type.Pointer {
        getScale(): number;
    }
}
declare module qx.event.type {
    class Pointer extends qx.event.type.Mouse {
        getHeight(): number;
        getPointerId(): number;
        getPointerType(): string;
        getPressure(): number;
        getTiltX(): number;
        getTiltY(): number;
        getWidth(): number;
        isPrimary(): boolean;
    }
}
declare module qx.event.type {
    class Rest extends qx.event.type.Data {
        getAction(): any;
        getId(): any;
        getPhase(): any;
        getRequest(): any;
        initAction(value: any): any;
        initId(value: any): any;
        initPhase(value: any): any;
        initRequest(value: any): any;
        resetAction(): void;
        resetId(): void;
        resetPhase(): void;
        resetRequest(): void;
        setAction(value: any): any;
        setId(value: any): any;
        setPhase(value: any): any;
        setRequest(value: any): any;
        action: string;
        id: number;
        phase: string;
        request: qx.io.request.AbstractRequest;
    }
}
declare module qx.event.type {
    class Roll extends qx.event.type.Pointer {
        getDelta(): IMap;
        getMomentum(): boolean;
        stopMomentum(): void;
    }
}
declare module qx.event.type {
    class Rotate extends qx.event.type.Pointer {
        getAngle(): number;
    }
}
declare module qx.event.type {
    class Swipe extends qx.event.type.Pointer {
        getAxis(): string;
        getDirection(): string;
        getDistance(): number;
        getDuration(): number;
        getStartTime(): number;
        getVelocity(): number;
    }
}
declare module qx.event.type {
    class Tap extends qx.event.type.Pointer {
    }
}
declare module qx.event.type {
    class Touch extends qx.event.type.Dom {
        protected _isTouchEnd(): boolean;
        getAllTouches(): any[];
        getChangedTargetTouches(): any[];
        getDelta(): qx.data.Array;
        getDocumentLeft(touchIndex?: number): number;
        getDocumentTop(touchIndex?: number): number;
        getIdentifier(touchIndex?: number): number;
        getRotation(): number;
        getScale(): number;
        getScreenLeft(touchIndex?: number): number;
        getScreenTop(touchIndex?: number): number;
        getTargetTouches(): any[];
        getViewportLeft(touchIndex?: number): number;
        getViewportTop(touchIndex?: number): number;
        isMultiTouch(): boolean;
    }
}
declare module qx.event.type {
    class Track extends qx.event.type.Pointer {
        getDelta(): IMap;
    }
}
declare module qx.event.type.dom {
    class Custom {
        constructor(type: string, domEvent: qx.event.type.Event, customProps: IMap);
        protected _createEvent(): qx.event.type.Event;
        protected _initEvent(domEvent: qx.event.type.Event, customProps: IMap): void;
    }
}
declare module qx.event.type.dom {
    class Pointer extends qx.event.type.dom.Custom {
        static getDocumentLeft(): number;
        static getDocumentTop(): number;
        static getPointerType(): string;
        static getScreenLeft(): number;
        static getScreenTop(): number;
        static getViewportLeft(): number;
        static getViewportTop(): number;
        static normalize(event: qx.event.type.Event): void;
        constructor(type: any, domEvent: any, customProps: any);
    }
}
declare module qx.event.util {
    class Keyboard {
        static charCodeToIdentifier(charCode: string): string;
        static isIdentifiableKeyCode(keyCode: string): boolean;
        static isNonPrintableKeyCode(keyCode: string): boolean;
        static isPrintableKeyIdentifier(keyIdentifier: string): boolean;
        static isValidKeyIdentifier(keyIdentifier: string): boolean;
        static keyCodeToIdentifier(keyCode: number): string;
    }
}
declare module qx.html {
    class Blocker extends qx.html.Element {
        constructor(backgroundColor?: string, opacity?: number);
        protected _stopPropagation(e: qx.event.type.Mouse): void;
    }
}
declare module qx.html {
    class Canvas extends qx.html.Element {
        constructor(styles?: IMap, attributes?: IMap);
        getCanvas(): HTMLElement;
        getContext2d(): any;
        getHeight(): number;
        getWidth(): number;
        setHeight(height: number): void;
        setWidth(width: number): void;
    }
}
declare module qx.html {
    class Element extends qx.core.Object {
        constructor(tagName?: string, styles?: IMap, attributes?: IMap);
        static _scheduleFlush(job: string): void;
        static flush(): void;
        protected _applyProperty(name: string, value: any): qx.html.Element;
        protected _copyData(fromMarkup: boolean): void;
        protected _createDomElement(): HTMLElement;
        protected _getProperty(key: string): any;
        protected _insertChildren(): void;
        protected _removeProperty(key: string, direct?: boolean): qx.html.Element;
        protected _scheduleChildrenUpdate(): void;
        protected _setProperty(key: string, value: any, direct?: boolean): qx.html.Element;
        protected _syncChildren(): void;
        protected _syncData(): void;
        activate(): void;
        add(varargs: qx.html.Element): qx.html.Element;
        addAt(child: qx.html.Element, index: number): qx.html.Element;
        addClass(name: string): void;
        addListener(type: string, listener: Function, self?: any, capture?: boolean): any;
        blur(): void;
        capture(containerCapture?: boolean): void;
        clearTextSelection(): void;
        deactivate(): void;
        disableScrolling(): void;
        enableScrolling(): void;
        exclude(): qx.html.Element;
        fadeIn(duration: number): qx.bom.element.AnimationHandle;
        fadeOut(duration: number): qx.bom.element.AnimationHandle;
        focus(): void;
        free(): qx.html.Element;
        getAllStyles(): IMap;
        getAttribute(key: string): any;
        getChild(index: number): any;
        getChildren(): qx.data.Array;
        getDomElement(): any;
        getListeners(): IMap[];
        getNodeName(): string;
        getParent(): any;
        getScrollX(): number;
        getScrollY(): number;
        getStyle(key: string): any;
        getTextSelection(): any;
        getTextSelectionEnd(): any;
        getTextSelectionLength(): any;
        getTextSelectionStart(): any;
        hasChild(child: qx.html.Element): boolean;
        hasChildren(): boolean;
        hasListener(type: string, capture?: boolean): boolean;
        hide(): qx.html.Element;
        include(): qx.html.Element;
        indexOf(child: qx.html.Element): number;
        insertAfter(rel: qx.html.Element): qx.html.Element;
        insertBefore(rel: qx.html.Element): qx.html.Element;
        insertInto(parent: qx.html.Element, index?: number): qx.html.Element;
        isFocusable(): boolean;
        isIncluded(): boolean;
        isNativelyFocusable(): boolean;
        isVisible(): boolean;
        moveAfter(rel: qx.html.Element): qx.html.Element;
        moveBefore(rel: qx.html.Element): qx.html.Element;
        moveTo(index: number): qx.html.Element;
        releaseCapture(): void;
        remove(childs: qx.html.Element): qx.html.Element;
        removeAll(): qx.html.Element;
        removeAt(index: number): qx.html.Element;
        removeAttribute(key: string, direct?: boolean): qx.html.Element;
        removeClass(name: string): void;
        removeListener(type: string, listener: Function, self: any, capture?: boolean): any;
        removeListenerById(id: any): any;
        removeStyle(key: string, direct?: boolean): qx.html.Element;
        scrollChildIntoViewX(elem: qx.html.Element, align?: string, direct?: boolean): void;
        scrollChildIntoViewY(elem: qx.html.Element, align?: string, direct?: boolean): void;
        scrollToX(x: number, lazy?: boolean): void;
        scrollToY(y: number, lazy?: boolean): void;
        setAttribute(key: string, value: any, direct?: boolean): qx.html.Element;
        setAttributes(map: IMap, direct?: boolean): qx.html.Element;
        setNodeName(name: string): void;
        setRoot(root: boolean): void;
        setSelectable(value: boolean): void;
        setStyle(key: string, value: any, direct?: boolean): qx.html.Element;
        setStyles(map: IMap, direct?: boolean): qx.html.Element;
        setTextSelection(start: number, end: number): void;
        show(): qx.html.Element;
        useElement(elem: HTMLElement): void;
        useMarkup(html: string): HTMLElement;
    }
}
declare module qx.html {
    class Flash extends qx.html.Element {
        constructor(styles?: IMap, attributes?: IMap);
        createFlash(): void;
        getAttributes(): IMap;
        getFlashElement(): any;
        getParams(): IMap;
        getVariables(): IMap;
        setId(value: string): void;
        setParam(key: string, value: any): void;
        setSource(value: string): void;
        setVariables(value: IMap): void;
    }
}
declare module qx.html {
    class Iframe extends qx.html.Element {
        constructor(url: string, styles?: IMap, attributes?: IMap);
        getBody(): HTMLElement;
        getDocument(): Document;
        getName(): string;
        getSource(): string;
        getWindow(): Window;
        reload(): void;
        setName(name: string): qx.html.Iframe;
        setSource(source: string): qx.html.Iframe;
    }
}
declare module qx.html {
    class Image extends qx.html.Element {
        getScale(): boolean;
        getSource(): string;
        resetSource(): qx.html.Image;
        setPadding(paddingLeft: number, paddingTop: number): void;
        setScale(value: boolean): qx.html.Label;
        setSource(value: boolean): qx.html.Label;
    }
}
declare module qx.html {
    class Input extends qx.html.Element {
        constructor(type: string, styles?: IMap, attributes?: IMap);
        getValue(): string;
        getWrap(): boolean;
        setEnabled(value: boolean): void;
        setValue(value: any): qx.html.Input;
        setWrap(wrap: boolean, direct?: boolean): qx.html.Input;
    }
}
declare module qx.html {
    class Label extends qx.html.Element {
        getValue(): string;
        setRich(value: boolean): qx.html.Label;
        setValue(value: string): qx.html.Label;
    }
}
declare module qx.html {
    class Root extends qx.html.Element {
        constructor(elem?: HTMLElement);
    }
}
declare module qx.io {
    class ImageLoader {
        static abort(source: string): void;
        static dispose(): void;
        static getFormat(source: string): string;
        static getHeight(source: string): number;
        static getSize(source: string): IMap;
        static getWidth(source: string): number;
        static isFailed(source: string): boolean;
        static isLoaded(source: string): boolean;
        static isLoading(source: string): boolean;
        static load(source: string, callback: Function, context: any): void;
    }
}
declare module qx.io {
    class PartLoader extends qx.core.Object {
        constructor();
        static getInstance(): qx.io.PartLoader;
        static require(partNames: string[], callback: Function, self?: any): void;
        getPart(name: string): qx.io.part.Part;
        getParts(): IMap;
        hasPart(name: string): boolean;
    }
}
declare module qx.io.part {
    class ClosurePart extends qx.io.part.Part {
        constructor(name: string, packages: any[], loader: qx.Part);
        protected _onPackageLoad(pkg: qx.io.part.Package): void;
    }
}
declare module qx.io.part {
    class Package {
        constructor(urls: string[], id: any, loaded?: boolean);
        execute(): void;
        getId(): string;
        getReadyState(): string;
        load(notifyPackageResult: Function, self?: any): void;
        loadClosure(notifyPackageResult: Function, self?: any): void;
        saveClosure(closure: Function): void;
    }
}
declare module qx.io.part {
    class Part {
        constructor(name: string, packages: any[], loader: qx.Part);
        protected _appendPartListener(callback: Function, self?: any, part?: qx.io.part.ClosurePart): void;
        protected _checkCompleteLoading(callback: Function, self: any): boolean;
        protected _markAsCompleted(readyState: string): void;
        protected _signalStartup(): void;
        getName(): string;
        getReadyState(): string;
        preload(callback: Function, self?: any): void;
    }
}
declare module qx.io.remote {
    class Exchange extends qx.core.Object {
        constructor(vRequest: qx.io.remote.Request);
        static canHandle(vImpl: any, vNeeds: IMap, vResponseType: string): boolean;
        static initTypes(): void;
        static registerType(vClass: any, vId: string): void;
        static statusCodeToString(vStatusCode: number): string;
        static wasSuccessful(vStatusCode: number, vReadyState: string, vIsLocal: boolean): any;
        protected _applyImplementation(value: any, old: any): void;
        protected _applyState(value: any, old: any): void;
        protected _onabort(e: qx.event.type.Event): void;
        protected _oncompleted(e: qx.event.type.Event): void;
        protected _onfailed(e: qx.event.type.Event): void;
        protected _onreceiving(e: qx.event.type.Event): void;
        protected _onsending(e: qx.event.type.Event): void;
        protected _ontimeout(e: qx.event.type.Event): void;
        abort(): void;
        getImplementation(): any;
        getRequest(): any;
        getState(): any;
        initImplementation(value: any): any;
        initRequest(value: any): any;
        initState(value: any): any;
        resetImplementation(): void;
        resetRequest(): void;
        resetState(): void;
        send(): boolean;
        setImplementation(value: any): any;
        setRequest(value: any): any;
        setState(value: any): any;
        timeout(): void;
        implementation: qx.io.remote.transport.Abstract;
        request: qx.io.remote.Request;
    }
}
declare module qx.io.remote {
    class Request extends qx.core.Object {
        constructor(vUrl: string, vMethod: string, vResponseType: string);
        static methodAllowsRequestBody(httpMethod: string): boolean;
        protected _applyMethod(value: any, old: any): void;
        protected _applyProhibitCaching(value: any, old: any): void;
        protected _applyResponseType(value: any, old: any): void;
        protected _applyState(value: any, old: any): void;
        protected _onaborted(e: qx.event.type.Event): void;
        protected _oncompleted(e: qx.event.type.Event): void;
        protected _onfailed(e: qx.event.type.Event): void;
        protected _onqueued(e: qx.event.type.Event): void;
        protected _onreceiving(e: qx.event.type.Event): void;
        protected _onsending(e: qx.event.type.Event): void;
        protected _ontimeout(e: qx.event.type.Event): void;
        abort(): void;
        getAsynchronous(): any;
        getCrossDomain(): any;
        getData(): any;
        getFileUpload(): any;
        getFormField(vId: string): any;
        getFormFields(): any;
        getMethod(): any;
        getParameter(vId: string, bFromData: boolean): any;
        getParameters(bFromData: boolean): any;
        getParseJson(): any;
        getPassword(): any;
        getProhibitCaching(): any;
        getRequestHeader(vId: string): string;
        getRequestHeaders(): any;
        getResponseType(): any;
        getSequenceNumber(): number;
        getState(): any;
        getTimeout(): any;
        getTransport(): any;
        getUrl(): any;
        getUseBasicHttpAuth(): any;
        getUsername(): any;
        initAsynchronous(value: any): any;
        initCrossDomain(value: any): any;
        initData(value: any): any;
        initFileUpload(value: any): any;
        initMethod(value: any): any;
        initParseJson(value: any): any;
        initPassword(value: any): any;
        initProhibitCaching(value: any): any;
        initResponseType(value: any): any;
        initState(value: any): any;
        initTimeout(value: any): any;
        initTransport(value: any): any;
        initUrl(value: any): any;
        initUseBasicHttpAuth(value: any): any;
        initUsername(value: any): any;
        isAborted(): boolean;
        isAsynchronous(): boolean;
        isCompleted(): boolean;
        isConfigured(): boolean;
        isCrossDomain(): boolean;
        isFailed(): boolean;
        isFileUpload(): boolean;
        isParseJson(): boolean;
        isQueued(): boolean;
        isReceiving(): boolean;
        isSending(): boolean;
        isTimeout(): boolean;
        isUseBasicHttpAuth(): boolean;
        removeFormField(vId: string): void;
        removeParameter(vId: string, bFromData: boolean): void;
        removeRequestHeader(vId: string): void;
        reset(): void;
        resetAsynchronous(): void;
        resetCrossDomain(): void;
        resetData(): void;
        resetFileUpload(): void;
        resetMethod(): void;
        resetParseJson(): void;
        resetPassword(): void;
        resetProhibitCaching(): void;
        resetResponseType(): void;
        resetState(): void;
        resetTimeout(): void;
        resetTransport(): void;
        resetUrl(): void;
        resetUseBasicHttpAuth(): void;
        resetUsername(): void;
        send(): void;
        setAsynchronous(value: any): any;
        setCrossDomain(value: any): any;
        setData(value: any): any;
        setFileUpload(value: any): any;
        setFormField(vId: string, vValue: string): void;
        setMethod(value: any): any;
        setParameter(vId: string, vValue: any, bAsData: boolean): void;
        setParseJson(value: any): any;
        setPassword(value: any): any;
        setProhibitCaching(value: any): any;
        setRequestHeader(vId: string, vValue: string): void;
        setResponseType(value: any): any;
        setState(value: any): any;
        setTimeout(value: any): any;
        setTransport(value: any): any;
        setUrl(value: any): any;
        setUseBasicHttpAuth(value: any): any;
        setUsername(value: any): any;
        toggleAsynchronous(): boolean;
        toggleCrossDomain(): boolean;
        toggleFileUpload(): boolean;
        toggleParseJson(): boolean;
        toggleUseBasicHttpAuth(): boolean;
        asynchronous: boolean;
        crossDomain: boolean;
        data: string;
        fileUpload: boolean;
        parseJson: boolean;
        password: string;
        prohibitCaching: any;
        timeout: number;
        transport: qx.io.remote.Exchange;
        url: string;
        useBasicHttpAuth: boolean;
        username: string;
    }
}
declare module qx.io.remote {
    class RequestQueue extends qx.core.Object {
        constructor();
        protected _applyEnabled(value: boolean, old: boolean): void;
        protected _check(): void;
        protected _debug(): void;
        protected _oncompleted(e: qx.event.type.Event): void;
        protected _oninterval(e: qx.event.type.Event): void;
        protected _onreceiving(e: qx.event.type.Event): void;
        protected _onsending(e: qx.event.type.Event): void;
        protected _remove(vTransport: qx.io.remote.Exchange): void;
        abort(vRequest: any): void;
        add(vRequest: any): void;
        getActiveQueue(): any[];
        getDefaultTimeout(): any;
        getEnabled(): any;
        getMaxConcurrentRequests(): any;
        getMaxTotalRequests(): any;
        getRequestQueue(): any[];
        initDefaultTimeout(value: any): any;
        initEnabled(value: any): any;
        initMaxConcurrentRequests(value: any): any;
        initMaxTotalRequests(value: any): any;
        isEnabled(): boolean;
        resetDefaultTimeout(): void;
        resetEnabled(): void;
        resetMaxConcurrentRequests(): void;
        resetMaxTotalRequests(): void;
        setDefaultTimeout(value: any): any;
        setEnabled(value: any): any;
        setMaxConcurrentRequests(value: any): any;
        setMaxTotalRequests(value: any): any;
        toggleEnabled(): boolean;
        defaultTimeout: number;
        enabled: boolean;
        maxConcurrentRequests: number;
        maxTotalRequests: number;
        static getInstance(): qx.io.remote.RequestQueue;
    }
}
declare module qx.io.remote {
    class Response extends qx.event.type.Event {
        protected _applyResponseHeaders(value: any, old: any): void;
        getContent(): any;
        getResponseHeader(vHeader: string): any;
        getResponseHeaders(): any;
        getState(): any;
        getStatusCode(): any;
        initContent(value: any): any;
        initResponseHeaders(value: any): any;
        initState(value: any): any;
        initStatusCode(value: any): any;
        resetContent(): void;
        resetResponseHeaders(): void;
        resetState(): void;
        resetStatusCode(): void;
        setContent(value: any): any;
        setResponseHeaders(value: any): any;
        setState(value: any): any;
        setStatusCode(value: any): any;
        responseHeaders: any;
        state: number;
        statusCode: number;
    }
}
declare module qx.io.remote {
    class Rpc extends qx.core.Object {
        constructor(url: string, serviceName: string);
        static makeServerURL(instanceId?: string): string;
        protected _callInternal(args: qx.data.Array, callType: number, refreshSession: boolean): any;
        protected _isConvertDates(): boolean;
        protected _isResponseJson(): boolean;
        abort(opaqueCallRef: any): void;
        callAsync(handler: Function, methodName: string): any;
        callAsyncListeners(coalesce: boolean, methodName: string): any;
        callSync(methodName: string): any;
        createRequest(): qx.io.remote.Request;
        createRpcData(id: number, method: string, parameters: qx.data.Array, serverData: any): any;
        fixUrl(url: string): string;
        getCrossDomain(): any;
        getPassword(): any;
        getProtocol(): any;
        getServerData(): any;
        getServiceName(): any;
        getTimeout(): any;
        getUrl(): any;
        getUseBasicHttpAuth(): any;
        getUsername(): any;
        initCrossDomain(value: any): any;
        initPassword(value: any): any;
        initProtocol(value: any): any;
        initServerData(value: any): any;
        initServiceName(value: any): any;
        initTimeout(value: any): any;
        initUrl(value: any): any;
        initUseBasicHttpAuth(value: any): any;
        initUsername(value: any): any;
        isCrossDomain(): boolean;
        isUseBasicHttpAuth(): boolean;
        refreshSession(handler: Function): void;
        resetCrossDomain(): void;
        resetPassword(): void;
        resetProtocol(): void;
        resetServerData(): void;
        resetServiceName(): void;
        resetTimeout(): void;
        resetUrl(): void;
        resetUseBasicHttpAuth(): void;
        resetUsername(): void;
        setCrossDomain(value: any): any;
        setPassword(value: any): any;
        setProtocol(value: any): any;
        setServerData(value: any): any;
        setServiceName(value: any): any;
        setTimeout(value: any): any;
        setUrl(value: any): any;
        setUseBasicHttpAuth(value: any): any;
        setUsername(value: any): any;
        toggleCrossDomain(): boolean;
        toggleUseBasicHttpAuth(): boolean;
        crossDomain: boolean;
        password: string;
        protocol: any;
        serverData: any;
        serviceName: string;
        timeout: number;
        url: string;
        useBasicHttpAuth: boolean;
        username: string;
    }
}
declare module qx.io.remote {
    class RpcError {
    }
}
declare module qx.io.remote.transport {
    class Abstract extends qx.core.Object {
        constructor();
        protected _applyState(value: any, old: any): void;
        abort(): void;
        failed(): void;
        getAsynchronous(): any;
        getData(): any;
        getFetchedLength(): number;
        getFormFields(): any;
        getMethod(): any;
        getParameters(): any;
        getPassword(): any;
        getRequestHeaders(): any;
        getResponseHeader(vLabel: string): any;
        getResponseHeaders(): any;
        getResponseText(): string;
        getResponseType(): any;
        getResponseXml(): any;
        getState(): any;
        getStatusCode(): number;
        getStatusText(): string;
        getUrl(): any;
        getUseBasicHttpAuth(): any;
        getUsername(): any;
        initAsynchronous(value: any): any;
        initData(value: any): any;
        initFormFields(value: any): any;
        initMethod(value: any): any;
        initParameters(value: any): any;
        initPassword(value: any): any;
        initRequestHeaders(value: any): any;
        initResponseType(value: any): any;
        initState(value: any): any;
        initUrl(value: any): any;
        initUseBasicHttpAuth(value: any): any;
        initUsername(value: any): any;
        isAsynchronous(): boolean;
        isUseBasicHttpAuth(): boolean;
        resetAsynchronous(): void;
        resetData(): void;
        resetFormFields(): void;
        resetMethod(): void;
        resetParameters(): void;
        resetPassword(): void;
        resetRequestHeaders(): void;
        resetResponseType(): void;
        resetState(): void;
        resetUrl(): void;
        resetUseBasicHttpAuth(): void;
        resetUsername(): void;
        send(): void;
        setAsynchronous(value: any): any;
        setData(value: any): any;
        setFormFields(value: any): any;
        setMethod(value: any): any;
        setParameters(value: any): any;
        setPassword(value: any): any;
        setRequestHeader(vLabel: string, vValue: any): void;
        setRequestHeaders(value: any): any;
        setResponseType(value: any): any;
        setState(value: any): any;
        setUrl(value: any): any;
        setUseBasicHttpAuth(value: any): any;
        setUsername(value: any): any;
        timeout(): void;
        toggleAsynchronous(): boolean;
        toggleUseBasicHttpAuth(): boolean;
        asynchronous: boolean;
        data: string;
        formFields: any;
        method: string;
        parameters: any;
        password: string;
        requestHeaders: any;
        responseType: string;
        url: string;
        useBasicHttpAuth: boolean;
        username: string;
    }
}
declare module qx.io.remote.transport {
    class Iframe extends qx.io.remote.transport.Abstract {
        constructor();
        static isSupported(): boolean;
        protected _onload(e: qx.event.type.Event): void;
        protected _onreadystatechange(e: qx.event.type.Event): void;
        protected _switchReadyState(vReadyState: string): void;
        getIframeBody(): any;
        getIframeDocument(): any;
        getIframeHtmlContent(): string;
        getIframeTextContent(): string;
        getIframeWindow(): any;
        getResponseContent(): string;
    }
}
declare module qx.io.remote.transport {
    class Script extends qx.io.remote.transport.Abstract {
        constructor();
        static _requestFinished(id: string, content: string): void;
        static isSupported(): boolean;
        protected _switchReadyState(vReadyState: string): void;
        getResponseContent(): string;
    }
}
declare module qx.io.remote.transport {
    class XmlHttp extends qx.io.remote.transport.Abstract {
        static createRequestObject(): any;
        static isSupported(): boolean;
        protected _onreadystatechange(e: qx.event.type.Event): void;
        failedLocally(): void;
        getParseJson(): any;
        getReadyState(): number;
        getRequest(): any;
        getResponseContent(): string;
        getStringResponseHeaders(): any;
        initParseJson(value: any): any;
        isParseJson(): boolean;
        resetParseJson(): void;
        setParseJson(value: any): any;
        toggleParseJson(): boolean;
        parseJson: boolean;
    }
}
declare module qx.io.request {
    class AbstractRequest extends qx.core.Object {
        constructor(url?: string);
        protected _createTransport(): qx.bom.request.IRequest;
        protected _fireStatefulEvent(evt: string): void;
        protected _getAllRequestHeaders(): IMap;
        protected _getConfiguredRequestHeaders(): IMap;
        protected _getConfiguredUrl(): string;
        protected _getMethod(): string;
        protected _getParsedResponse(): string;
        protected _isAsync(): boolean;
        protected _onAbort(): void;
        protected _onError(): void;
        protected _onLoad(): void;
        protected _onLoadEnd(): void;
        protected _onReadyStateChange(): void;
        protected _onTimeout(): void;
        protected _serializeData(data: qx.core.Object): any;
        protected _setPhase(phase: string): void;
        protected _setRequestHeaders(): void;
        protected _setResponse(response: string): void;
        abort(): void;
        getAllResponseHeaders(): string;
        getAuthentication(): any;
        getPhase(): string;
        getReadyState(): number;
        getRequestData(): any;
        getRequestHeader(key: string): string;
        getResponse(): string;
        getResponseContentType(): string;
        getResponseHeader(key: string): string;
        getResponseText(): string;
        getStatus(): number;
        getStatusText(): string;
        getTimeout(): any;
        getTransport(): any;
        getUrl(): any;
        initAuthentication(value: any): any;
        initRequestData(value: any): any;
        initTimeout(value: any): any;
        initUrl(value: any): any;
        isDone(): void;
        overrideResponseContentType(contentType: string): void;
        removeRequestHeader(key: string): void;
        resetAuthentication(): void;
        resetRequestData(): void;
        resetTimeout(): void;
        resetUrl(): void;
        send(): void;
        setAuthentication(value: any): any;
        setRequestData(value: any): any;
        setRequestHeader(key: string, value: string): void;
        setTimeout(value: any): any;
        setUrl(value: any): any;
        authentication: qx.io.request.authentication.IAuthentication;
        requestData: any;
        timeout: number;
        url: string;
    }
}
declare module qx.io.request {
    class Jsonp extends qx.io.request.AbstractRequest {
        getCache(): any;
        initCache(value: any): any;
        isCache(): boolean;
        resetCache(): void;
        setCache(value: any): any;
        setCallbackName(name: string): void;
        setCallbackParam(param: string): void;
        toggleCache(): boolean;
        cache: boolean;
    }
}
declare module qx.io.request {
    class Xhr extends qx.io.request.AbstractRequest {
        constructor(url?: string, method?: string);
        protected _createResponseParser(): qx.util.ResponseParser;
        getAccept(): any;
        getAsync(): any;
        getCache(): any;
        getMethod(): any;
        initAccept(value: any): any;
        initAsync(value: any): any;
        initCache(value: any): any;
        initMethod(value: any): any;
        isAsync(): boolean;
        resetAccept(): void;
        resetAsync(): void;
        resetCache(): void;
        resetMethod(): void;
        setAccept(value: any): any;
        setAsync(value: any): any;
        setCache(value: any): any;
        setMethod(value: any): any;
        setParser(parser: Function): Function;
        toggleAsync(): boolean;
        accept: string;
        async: boolean;
        cache: any;
    }
}
declare module qx.io.request.authentication {
    class Basic extends qx.core.Object implements qx.io.request.authentication.IAuthentication {
        getAuthHeaders(): IMap[];
        constructor(username: any, password: any);
    }
}
declare module qx.io.request.authentication {
    interface IAuthentication {
        getAuthHeaders(): IMap[];
    }
}
declare module qx.io.rest {
    class Resource extends qx.core.Object {
        constructor(description?: IMap);
        static placeholdersFromUrl(url: string): qx.data.Array;
        protected _getRequest(): qx.io.request.Xhr;
        protected _getRequestConfig(action: string, params: IMap): IMap;
        protected _getResource(description?: IMap): qx.bom.rest.Resource;
        protected _getThrottleCount(): number;
        protected _getThrottleLimit(): number;
        protected _tailorResource(resource: qx.bom.rest.Resource): qx.bom.rest.Resource;
        abort(varargs: number): void;
        configureRequest(callback: Function): void;
        invoke(action: string, params: IMap, data: string): number;
        longPoll(action: string): string;
        map(action: string, method: string, url: string, check?: IMap): void;
        poll(action: string, interval: number, params?: IMap, immediately?: boolean): qx.event.Timer;
        refresh(action: string): void;
        setBaseUrl(baseUrl: string): void;
    }
}
declare module qx.lang {
    class Array {
        static append(arr1: qx.data.Array, arr2: qx.data.Array): qx.data.Array;
        static cast(object: any, constructor: Function, offset?: number): qx.data.Array;
        static clone(arr: qx.data.Array): qx.data.Array;
        static contains(arr: qx.data.Array, obj: any): boolean;
        static equals(arr1: qx.data.Array, arr2: qx.data.Array): boolean;
        static exclude(arr1: qx.data.Array, arr2: qx.data.Array): qx.data.Array;
        static fromArguments(args: any, offset?: number): qx.data.Array;
        static fromCollection(coll: any): qx.data.Array;
        static fromShortHand(input: qx.data.Array): qx.data.Array;
        static insertAfter(arr: qx.data.Array, obj: any, obj2: any): qx.data.Array;
        static insertAt(arr: qx.data.Array, obj: any, i: number): qx.data.Array;
        static insertBefore(arr: qx.data.Array, obj: any, obj2: any): qx.data.Array;
        static max(arr: number[]): any;
        static min(arr: number[]): any;
        static remove(arr: qx.data.Array, obj: any): any;
        static removeAll(arr: qx.data.Array): qx.data.Array;
        static removeAt(arr: qx.data.Array, i: number): any;
        static sum(arr: number[]): number;
        static unique(arr: qx.data.Array): qx.data.Array;
    }
}
declare module qx.lang {
    class Function {
        static attempt(func: Function, self?: any, varargs?: any): any;
        static bind(func: Function, self?: any, varargs?: any): Function;
        static create(func: Function, options?: IMap): Function;
        static curry(func: Function, varargs: any): any;
        static delay(func: Function, delay: number, self?: any, varargs?: any): number;
        static getCaller(args: any): Function;
        static getName(fcn: Function): string;
        static globalEval(data: string): any;
        static listener(func: Function, self?: any, varargs?: any): any;
        static periodical(func: Function, interval: number, self?: any, varargs?: any): number;
    }
}
declare module qx.lang {
    class Json {
        static parse(text: string, reviver?: Function): any;
        static stringify(value: any, replacer?: Function, space?: string): string;
    }
}
declare module qx.lang {
    class Number {
        static isBetweenRange(nr: number, vmin: number, vmax: number): boolean;
        static isInRange(nr: number, vmin: number, vmax: number): boolean;
        static limit(nr: number, vmin: number, vmax: number): number;
    }
}
declare module qx.lang {
    class Object {
        static clone(source: any, deep: boolean): any;
        static contains(map: any, value: any): boolean;
        static empty(map: any): void;
        static equals(object1: any, object2: any): boolean;
        static fromArray(array: qx.data.Array): IMap;
        static getKeyFromValue(map: any, value: any): any;
        static getLength(map: any): number;
        static getValues(map: any): qx.data.Array;
        static invert(map: any): any;
        static isEmpty(map: any): boolean;
        static mergeWith(target: any, source: any, overwrite?: boolean): any;
    }
}
declare module qx.lang {
    class String {
        static camelCase(str: string): string;
        static capitalize(str: string): string;
        static clean(str: string): string;
        static contains(str: string, substring: string): boolean;
        static endsWith(fullstr: string, substr: string): boolean;
        static escapeRegexpChars(str: string): string;
        static firstLow(str: string): string;
        static firstUp(str: string): string;
        static format(pattern: string, args: qx.data.Array): string;
        static hyphenate(str: string): string;
        static pad(str: string, length: number, ch: string): string;
        static quote(str: string): string;
        static repeat(str: string, times: number): string;
        static startsWith(fullstr: string, substr: string): boolean;
        static stripScripts(str: string, exec?: boolean): string;
        static stripTags(str: string): string;
        static toArray(str: string): qx.data.Array;
        static trimLeft(str: string): string;
        static trimRight(str: string): string;
    }
}
declare module qx.lang {
    class Type {
        static getClass(value: any): string;
        static isArray(value: any): boolean;
        static isBoolean(value: any): boolean;
        static isDate(value: any): boolean;
        static isError(value: any): boolean;
        static isFunction(value: any): boolean;
        static isNumber(value: any): boolean;
        static isObject(value: any): boolean;
        static isRegExp(value: any): boolean;
        static isString(value: any): boolean;
    }
}
declare module qx.lang.normalize {
    class Array {
        static every(callback: Function, obj?: any): qx.data.Array;
        static filter(callback: Function, obj?: any): qx.data.Array;
        static forEach(callback: Function, obj?: any): void;
        static indexOf(searchElement: any, fromIndex?: number): number;
        static lastIndexOf(searchElement: any, fromIndex?: number): number;
        static map(callback: Function, obj?: any): qx.data.Array;
        static reduce(callback: Function, init?: any): any;
        static reduceRight(callback: Function, init?: any): any;
        static some(callback: Function, obj?: any): qx.data.Array;
    }
}
declare module qx.lang.normalize {
    class Date {
        static now(): number;
    }
}
declare module qx.lang.normalize {
    class Error {
    }
}
declare module qx.lang.normalize {
    class Function {
        static bind(that?: any): Function;
    }
}
declare module qx.lang.normalize {
    class Object {
        static keys(map: any): qx.data.Array;
    }
}
declare module qx.lang.normalize {
    class String {
        static trim(): string;
    }
}
declare module qx.locale {
    class Date {
        static _getTerritory(locale: string): string;
        static getAmMarker(locale: string): string;
        static getDateFormat(size: string, locale?: string): string;
        static getDateTimeFormat(canonical: string, fallback: string, locale: string): string;
        static getDayName(length: string, day: number, locale: string, context: string, withFallback?: boolean): string;
        static getDayNames(length: string, locale: string, context: string, withFallback?: boolean): string[];
        static getMonthName(length: string, month: number, locale: string, context: string, withFallback?: boolean): string;
        static getMonthNames(length: string, locale: string, context: string, withFallback?: boolean): string[];
        static getPmMarker(locale: string): string;
        static getTimeFormat(size: string, locale: string): string;
        static getWeekendEnd(locale: string): number;
        static getWeekendStart(locale: string): number;
        static getWeekStart(locale: string): number;
        static isWeekend(day: number, locale: string): boolean;
    }
}
declare module qx.locale {
    class Key {
        static getKeyName(size: string, keyIdentifier: string, locale: string): string;
    }
}
declare module qx.locale {
    class LocalizedString extends qx.type.BaseString {
        constructor(translation: string, messageId: string, args: qx.data.Array);
        getMessageId(): string;
        translate(): qx.locale.LocalizedString;
    }
}
declare module qx.locale {
    class MTranslation {
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
    }
}
declare module qx.locale {
    class Manager extends qx.core.Object {
        constructor();
        static getInstance(): qx.locale.Manager;
        static marktr(messageId: string): string;
        static tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        static trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        static trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        static trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        protected _applyLocale(value: string, old: string): void;
        addLocale(localeCode: string, localeMap: IMap): void;
        addTranslation(languageCode: string, translationMap: IMap): void;
        getAvailableLocales(includeNonloaded?: boolean): string[];
        getLanguage(): string;
        getLocale(): any;
        getTerritory(): string;
        initLocale(value: any): any;
        localize(messageId: string, args: any[], locale?: string): qx.locale.LocalizedString;
        resetLocale(): void;
        setLocale(value: any): any;
        translate(messageId: string, args: any[], locale?: string): qx.locale.LocalizedString;
    }
}
declare module qx.locale {
    class Number {
        static getDecimalSeparator(locale: string): string;
        static getGroupSeparator(locale: string): string;
        static getPercentFormat(locale: string): string;
    }
}
declare module qx.locale {
    class String {
        static getAlternateQuotationEnd(locale: string): string;
        static getAlternateQuotationStart(locale: string): string;
        static getQuotationEnd(locale: string): string;
        static getQuotationStart(locale: string): string;
    }
}
declare module qx.log {
    class Logger {
        static clear(): void;
        static debug(object: any, message: any): void;
        static deprecatedClassWarning(clazz: qx.Class, msg?: string): void;
        static deprecatedConstantWarning(clazz: qx.Class, constant: string, msg: string): void;
        static deprecatedEventWarning(clazz: qx.Class, event: string, msg?: string): void;
        static deprecatedMethodWarning(fcn: Function, msg?: string): void;
        static deprecatedMixinWarning(clazz: qx.Class, msg?: string): void;
        static deprecateMethodOverriding(object: qx.core.Object, baseclass: qx.Class, methodName: string, msg?: string): void;
        static error(object: any, message: any): void;
        static getLevel(): number;
        static getTreshold(): number;
        static info(object: any, message: any): void;
        static register(appender: qx.Class): void;
        static setLevel(value: string): void;
        static setTreshold(value: number): void;
        static trace(object?: any): void;
        static unregister(appender: qx.Class): void;
        static warn(object: any, message: any): void;
    }
}
declare module qx.log.appender {
    class Console {
        static clear(): void;
        static dispose(): void;
        static execute(): void;
        static init(): void;
        static process(entry: IMap): void;
        static show(): void;
        static toggle(): void;
    }
}
declare module qx.log.appender {
    class Element extends qx.core.Object {
        constructor(element: HTMLElement);
        clear(): void;
        process(entry: IMap): void;
        setElement(element: HTMLElement): void;
    }
}
declare module qx.log.appender {
    class Native {
        static process(entry: IMap): void;
    }
}
declare module qx.log.appender {
    class NodeConsole {
        static debug(logMessage: string): void;
        static error(logMessage: string): void;
        static info(logMessage: string): void;
        static log(logMessage: string, level: string): void;
        static process(entry: IMap): void;
        static warn(logMessage: string): void;
    }
}
declare module qx.log.appender {
    class PhoneGap {
        static process(entry: IMap): void;
    }
}
declare module qx.log.appender {
    class RhinoConsole {
        static debug(logMessage: string): void;
        static error(logMessage: string): void;
        static info(logMessage: string): void;
        static log(logMessage: string, level: string): void;
        static process(entry: IMap): void;
        static warn(logMessage: string): void;
    }
}
declare module qx.log.appender {
    class RhinoFile {
        static create(): void;
        static debug(logMessage: string): void;
        static error(logMessage: string): void;
        static info(logMessage: string): void;
        static log(logMessage: string, level: string): void;
        static process(entry: IMap): void;
        static warn(logMessage: string): void;
    }
}
declare module qx.log.appender {
    class RingBuffer extends qx.util.RingBuffer {
        constructor(maxMessages?: number);
        clearHistory(): void;
        getAllLogEvents(): qx.data.Array;
        getMaxMessages(): number;
        process(entry: IMap): void;
        retrieveLogEvents(count: number, startingFromMark?: boolean): qx.data.Array;
        setMaxMessages(maxMessages: number): void;
    }
}
declare module qx.log.appender {
    class Util {
        static escapeHTML(value: string): string;
        static formatOffset(offset: number, length?: number): string;
        static toHtml(entry: IMap): void;
        static toText(entry: IMap): string;
        static toTextArray(entry: IMap): qx.data.Array;
    }
}
declare module qx.theme {
    class Classic {
    }
}
declare module qx.theme {
    class Indigo {
    }
}
declare module qx.theme {
    class Modern {
    }
}
declare module qx.theme {
    class Simple {
    }
}
declare module qx.theme.classic {
    class Appearance {
    }
}
declare module qx.theme.classic {
    class Color {
    }
}
declare module qx.theme.classic {
    class Decoration {
    }
}
declare module qx.theme.classic {
    class Font {
    }
}
declare module qx.theme.icon {
    class Oxygen {
        static aliases:any;
    }
}
declare module qx.theme.icon {
    class Tango {
        static aliases:any;
    }
}
declare module qx.theme.indigo {
    class Appearance {
    }
}
declare module qx.theme.indigo {
    class Color {
    }
}
declare module qx.theme.indigo {
    class Decoration {
    }
}
declare module qx.theme.indigo {
    class Font {
    }
}
declare module qx.theme.manager {
    class Appearance extends qx.core.Object {
        constructor();
        protected _applyTheme(value: any, old: any): void;
        getTheme(): any;
        initTheme(value: any): any;
        resetTheme(): void;
        setTheme(value: any): any;
        styleFrom(id: string, states: IMap, theme?: any, defaultId?: string): IMap;
        static getInstance(): qx.theme.manager.Appearance;
    }
}
declare module qx.theme.manager {
    class Color extends qx.util.ValueManager {
        protected _applyTheme(value: any, old: any): void;
        getTheme(): any;
        initTheme(value: any): any;
        resetTheme(): void;
        setTheme(value: any): any;
        static getInstance(): qx.theme.manager.Color;
    }
}
declare module qx.theme.manager {
    class Decoration extends qx.core.Object {
        constructor();
        protected _applyTheme(value: any, old: any): void;
        addCssClass(value: qx.ui.decoration.IDecorator): string;
        getCssClassName(value: qx.ui.decoration.IDecorator): string;
        getTheme(): any;
        initTheme(value: any): any;
        isDynamic(value: string): boolean;
        isValidPropertyValue(value: any): boolean;
        resetTheme(): void;
        resolve(value: string): any;
        setTheme(value: any): any;
        static getInstance(): qx.theme.manager.Decoration;
    }
}
declare module qx.theme.manager {
    class Font extends qx.util.ValueManager {
        protected _applyTheme(value: any, old: any): void;
        getTheme(): any;
        initTheme(value: any): any;
        resetTheme(): void;
        setTheme(value: any): any;
        static getInstance(): qx.theme.manager.Font;
    }
}
declare module qx.theme.manager {
    class Icon extends qx.core.Object {
        protected _applyTheme(value: any, old: any): void;
        getTheme(): any;
        initTheme(value: any): any;
        resetTheme(): void;
        setTheme(value: any): any;
        static getInstance(): qx.theme.manager.Icon;
    }
}
declare module qx.theme.manager {
    class Meta extends qx.core.Object {
        protected _applyTheme(value: any, old: any): void;
        getTheme(): any;
        initialize(): void;
        initTheme(value: any): any;
        resetTheme(): void;
        setTheme(value: any): any;
        theme: any;
        static getInstance(): qx.theme.manager.Meta;
    }
}
declare module qx.theme.modern {
    class Appearance {
    }
}
declare module qx.theme.modern {
    class Color {
    }
}
declare module qx.theme.modern {
    class Decoration {
    }
}
declare module qx.theme.modern {
    class Font {
    }
}
declare module qx.theme.simple {
    class Appearance {
    }
}
declare module qx.theme.simple {
    class Color {
    }
}
declare module qx.theme.simple {
    class Decoration {
    }
}
declare module qx.theme.simple {
    class Font {
    }
}
declare module qx.theme.simple {
    class Image extends qx.core.Object {
    }
}
declare module qx.type {
    class Array extends qx.type.BaseArray {
        constructor(length_or_items?: any);
        append(arr: qx.data.Array): qx.data.Array;
        clone(): qx.data.Array;
        contains(obj: any): boolean;
        insertAfter(obj: any, obj2: any): qx.data.Array;
        insertAt(obj: any, i: number): qx.data.Array;
        insertBefore(obj: any, obj2: any): qx.data.Array;
        prepend(arr: qx.data.Array): qx.data.Array;
        remove(obj: any): any;
        removeAll(): qx.data.Array;
        removeAt(i: number): any;
    }
}
declare module qx.type {
    class BaseArray extends qx.data.Array {
        constructor(length_or_items?: any);
        concat(varargs: any): qx.type.BaseArray;
        every(callback: Function, obj: any): boolean;
        filter(callback: Function, obj: any): any;
        forEach(callback: Function, obj: any): void;
        indexOf(searchElement: any, fromIndex?: number): number;
        join(separator: string): string;
        lastIndexOf(searchElement: any, fromIndex?: number): number;
        map(callback: Function, obj: any): any;
        pop(): any;
        push(varargs: any): number;
        reverse(): qx.data.Array;
        shift(): any;
        slice(begin: number, end?: number): any;
        some(callback: Function, obj: any): boolean;
        sort(compareFunction?: Function): qx.data.Array;
        splice(index: number, howMany: number, varargs?: any): any;
        toArray(): qx.data.Array;
        unshift(varargs: any): number;
    }
}
declare module qx.type {
    class BaseError extends ErrorImpl {
        constructor(comment: string, failMessage: string);
        getComment(): string;
    }
}
declare module qx.type {
    class BaseString {
        constructor(txt?: string);
        base(args: any, varags: any): any;
        charAt(index: number): string;
        charCodeAt(index: number): number;
        concat(stringN: string): string;
        indexOf(index: string, offset?: number): number;
        lastIndexOf(index: string, offset?: number): number;
        match(regexp: any): any;
        replace(regexp: any, aFunction: Function): string;
        search(regexp: any): any;
        slice(beginslice: number, endSlice?: number): string;
        split(separator?: string, limit?: number): qx.data.Array;
        substr(start: number, length?: number): string;
        substring(indexA: number, indexB?: number): string;
        toHashCode(): number;
        toLocaleLowerCase(): string;
        toLocaleUpperCase(): string;
        toLowerCase(): string;
        toUpperCase(): string;
    }
}
declare module qx.ui.basic {
    class Atom extends qx.ui.core.Widget {
        constructor(label: string, icon?: string);
        protected _applyCenter(value: boolean, old: boolean): void;
        protected _applyGap(value: number, old: number): void;
        protected _applyIcon(value: string, old: string): void;
        protected _applyIconPosition(value: any, old: any): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyRich(value: boolean, old: boolean): void;
        protected _applyShow(value: any, old: any): void;
        protected _handleIcon(): void;
        protected _handleLabel(): void;
        getCenter(): any;
        getGap(): any;
        getIcon(): any;
        getIconPosition(): any;
        getLabel(): any;
        getRich(): any;
        getShow(): any;
        initCenter(value: any): any;
        initGap(value: any): any;
        initIcon(value: any): any;
        initIconPosition(value: any): any;
        initLabel(value: any): any;
        initRich(value: any): any;
        initShow(value: any): any;
        isCenter(): boolean;
        isRich(): boolean;
        resetCenter(): void;
        resetGap(): void;
        resetIcon(): void;
        resetIconPosition(): void;
        resetLabel(): void;
        resetRich(): void;
        resetShow(): void;
        setCenter(value: any): any;
        setGap(value: any): any;
        setIcon(value: any): any;
        setIconPosition(value: any): any;
        setLabel(value: any): any;
        setRich(value: any): any;
        setShow(value: any): any;
        toggleCenter(): boolean;
        toggleRich(): boolean;
        center: boolean;
        rich: boolean;
    }
}
declare module qx.ui.basic {
    class Image extends qx.ui.core.Widget {
        constructor(source?: string);
        protected _applyScale(value: boolean, old: boolean): void;
        protected _applySource(value: string, old: string): void;
        protected _styleSource(): void;
        getScale(): any;
        getSource(): any;
        initScale(value: any): any;
        initSource(value: any): any;
        isScale(): boolean;
        resetScale(): void;
        resetSource(): void;
        setScale(value: any): any;
        setSource(value: any): any;
        toggleScale(): boolean;
        scale: boolean;
    }
}
declare module qx.ui.basic {
    class Label extends qx.ui.core.Widget implements qx.ui.form.IStringForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor(value: string);
        buddy: qx.ui.core.Widget;
        wrap: boolean;
        protected _applyBuddy(value: qx.ui.core.Widget, old: qx.ui.core.Widget): void;
        protected _applyRich(value: boolean, old: boolean): void;
        protected _applyTextAlign(value: any, old: any): void;
        protected _applyValue(value: string, old: string): void;
        protected _applyWrap(value: boolean, old: boolean): void;
        protected _onChangeLocale(e: qx.event.type.Event): void;
        protected _onWebFontStatusChange(ev: qx.event.type.Data): void;
        getBuddy(): any;
        getRich(): any;
        getTextAlign(): any;
        getWrap(): any;
        initBuddy(value: any): any;
        initRich(value: any): any;
        initTextAlign(value: any): any;
        initValue(value: any): any;
        initWrap(value: any): any;
        isRich(): boolean;
        isWrap(): boolean;
        resetBuddy(): void;
        resetRich(): void;
        resetTextAlign(): void;
        resetWrap(): void;
        setBuddy(value: any): any;
        setRich(value: any): any;
        setTextAlign(value: any): any;
        setWrap(value: any): any;
        toggleRich(): boolean;
        toggleWrap(): boolean;
    }
}
declare module qx.ui.container {
    class Composite extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        constructor(layout: qx.ui.layout.Abstract);
    }
}
declare module qx.ui.container {
    class Resizer extends qx.ui.container.Composite {
        protected _getResizeFrame(): qx.ui.core.Widget;
        getResizableBottom(): any;
        getResizableLeft(): any;
        getResizableRight(): any;
        getResizableTop(): any;
        getResizeSensitivity(): any;
        getUseResizeFrame(): any;
        initResizableBottom(value: any): any;
        initResizableLeft(value: any): any;
        initResizableRight(value: any): any;
        initResizableTop(value: any): any;
        initResizeSensitivity(value: any): any;
        initUseResizeFrame(value: any): any;
        isResizableBottom(): boolean;
        isResizableLeft(): boolean;
        isResizableRight(): boolean;
        isResizableTop(): boolean;
        isUseResizeFrame(): boolean;
        resetResizable(): void;
        resetResizableBottom(): void;
        resetResizableLeft(): void;
        resetResizableRight(): void;
        resetResizableTop(): void;
        resetResizeSensitivity(): void;
        resetUseResizeFrame(): void;
        setResizable(resizableTop: any, resizableRight: any, resizableBottom: any, resizableLeft: any): void;
        setResizableBottom(value: any): any;
        setResizableLeft(value: any): any;
        setResizableRight(value: any): any;
        setResizableTop(value: any): any;
        setResizeSensitivity(value: any): any;
        setUseResizeFrame(value: any): any;
        toggleResizableBottom(): boolean;
        toggleResizableLeft(): boolean;
        toggleResizableRight(): boolean;
        toggleResizableTop(): boolean;
        toggleUseResizeFrame(): boolean;
    }
}
declare module qx.ui.container {
    class Scroll extends qx.ui.core.scroll.AbstractScrollArea {
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        constructor(content?: qx.ui.core.LayoutItem);
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        add(widget: qx.ui.core.Widget): void;
        getChildren(): any[];
        remove(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.container {
    class SlideBar extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        constructor(orientation?: string);
        protected _applyOrientation(value: any, old: any): void;
        protected _hideArrows(): void;
        protected _onExecuteBackward(): void;
        protected _onExecuteForward(): void;
        protected _onResize(e: qx.event.type.Event): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _onScroll(): void;
        protected _onScrollAnimationEnd(): void;
        protected _showArrows(): void;
        protected _updateArrowsEnabled(): void;
        getOrientation(): any;
        getScrollStep(): any;
        initOrientation(value: any): any;
        initScrollStep(value: any): any;
        resetOrientation(): void;
        resetScrollStep(): void;
        scrollBy(offset?: number, duration?: number): void;
        scrollTo(value: number, duration?: number): void;
        setOrientation(value: any): any;
        setScrollStep(value: any): any;
        scrollStep: number;
    }
}
declare module qx.ui.container {
    class Stack extends qx.ui.core.Widget implements qx.ui.core.ISingleSelection {
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
        protected _onChangeSelected(e: qx.event.type.Data): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        constructor();
        protected _applyDynamic(value: boolean, old: boolean): void;
        protected _getItems(): qx.ui.core.Widget[];
        protected _isAllowEmptySelection(): boolean;
        protected _isItemSelectable(item: qx.ui.core.Widget): boolean;
        getDynamic(): any;
        initDynamic(value: any): any;
        isDynamic(): boolean;
        next(): void;
        previous(): void;
        resetDynamic(): void;
        setDynamic(value: any): any;
        toggleDynamic(): boolean;
        dynamic: boolean;
    }
}
declare module qx.ui.control {
    class ColorPopup extends qx.ui.popup.Popup implements qx.ui.form.IColorForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor();
        protected _applyValue(value: any, old: any): void;
        protected _createBoxes(): void;
        protected _createColorSelector(): void;
        protected _onAutomaticBtnExecute(): void;
        protected _onChangeVisibility(e: qx.event.type.Data): void;
        protected _onColorSelectorCancel(): void;
        protected _onColorSelectorOk(): void;
        protected _onFieldPointerDown(e: qx.event.type.Pointer): void;
        protected _onFieldPointerOut(e: qx.event.type.Pointer): void;
        protected _onFieldPointerOver(e: qx.event.type.Pointer): void;
        protected _onSelectorButtonExecute(): void;
        protected _rotatePreviousColors(): void;
        getBlue(): any;
        getGreen(): any;
        getRed(): any;
        initBlue(value: any): any;
        initGreen(value: any): any;
        initRed(value: any): any;
        initValue(value: any): any;
        resetBlue(): void;
        resetGreen(): void;
        resetRed(): void;
        setBlue(value: any): any;
        setGreen(value: any): any;
        setRed(value: any): any;
    }
}
declare module qx.ui.control {
    class ColorSelector extends qx.ui.core.Widget implements qx.ui.form.IColorForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor();
        protected _applyBlue(value: number, old: number): void;
        protected _applyBrightness(value: number, old: number): void;
        protected _applyGreen(value: number, old: number): void;
        protected _applyHue(value: number, old: number): void;
        protected _applyRed(value: number, old: number): void;
        protected _applySaturation(value: number, old: number): void;
        protected _onAppear(e: qx.event.type.Data): void;
        protected _onBrightnessFieldPointerDown(e: qx.event.type.Pointer): void;
        protected _onBrightnessHandlePointerDown(e: qx.event.type.Pointer): void;
        protected _onBrightnessHandlePointerMove(e: qx.event.type.Pointer): void;
        protected _onBrightnessHandlePointerUp(e: qx.event.type.Pointer): void;
        protected _onBrightnessPaneRoll(e: qx.event.type.Roll): void;
        protected _onColorFieldTap(e: qx.event.type.Pointer): void;
        protected _onHexFieldChange(e: qx.event.type.Data): void;
        protected _onHueSaturationFieldPointerDown(e: qx.event.type.Pointer): void;
        protected _onHueSaturationHandlePointerMove(e: qx.event.type.Pointer): void;
        protected _onHueSaturationHandlePointerUp(e: qx.event.type.Pointer): void;
        protected _onHueSaturationPaneRoll(e: qx.event.type.Roll): void;
        protected _setBlueFromSpinner(): void;
        protected _setBrightnessFromSpinner(): void;
        protected _setBrightnessGradiant(): void;
        protected _setBrightnessOnFieldEvent(e: qx.event.type.Pointer): void;
        protected _setGreenFromSpinner(): void;
        protected _setHexFromRgb(): void;
        protected _setHueFromRgb(): void;
        protected _setHueFromSpinner(): void;
        protected _setHueSaturationOnFieldEvent(e: qx.event.type.Pointer): void;
        protected _setPreviewFromRgb(): void;
        protected _setRedFromSpinner(): void;
        protected _setRgbFromHue(): void;
        protected _setSaturationFromSpinner(): void;
        getBlue(): any;
        getBrightness(): any;
        getGreen(): any;
        getHue(): any;
        getRed(): any;
        getSaturation(): any;
        initBlue(value: any): any;
        initBrightness(value: any): any;
        initGreen(value: any): any;
        initHue(value: any): any;
        initRed(value: any): any;
        initSaturation(value: any): any;
        resetBlue(): void;
        resetBrightness(): void;
        resetGreen(): void;
        resetHue(): void;
        resetRed(): void;
        resetSaturation(): void;
        setBlue(value: any): any;
        setBrightness(value: any): any;
        setGreen(value: any): any;
        setHue(value: any): any;
        setPreviousColor(red: number, green: number, blue: number): void;
        setRed(value: any): any;
        setSaturation(value: any): any;
        blue: number;
        brightness: number;
        green: number;
        hue: number;
        red: number;
        saturation: number;
    }
}
declare module qx.ui.control {
    class DateChooser extends qx.ui.core.Widget implements qx.ui.form.IExecutable, qx.ui.form.IForm, qx.ui.form.IDateForm {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(date?: Date);
        protected _applyValue(value: Date, old: Date): void;
        protected _onDayDblTap(): void;
        protected _onDayTap(evt: qx.event.type.Data): void;
        protected _onKeyPress(evt: qx.event.type.Data): void;
        protected _onNavButtonTap(evt: qx.event.type.Data): void;
        protected _onPointerUpDown(e: qx.event.type.Pointer): void;
        protected _updateDatePane(): void;
        getShownMonth(): any;
        getShownYear(): any;
        handleKeyPress(e: qx.event.type.Data): void;
        initShownMonth(value: any): any;
        initShownYear(value: any): any;
        initValue(value: any): any;
        resetShownMonth(): void;
        resetShownYear(): void;
        setShownMonth(value: any): any;
        setShownYear(value: any): any;
        showMonth(month?: number, year?: number): void;
    }
}
declare module qx.ui.core {
    class Blocker extends qx.core.Object {
        constructor(widget: qx.ui.core.Widget);
        protected _applyColor(value: string, old: string): void;
        protected _applyOpacity(value: number, old: number): void;
        protected _backupActiveWidget(): void;
        protected _block(zIndex: number, blockContent: boolean): void;
        protected _onChangeTheme(): void;
        protected _restoreActiveWidget(): void;
        protected _updateBlockerBounds(bounds: IMap): void;
        block(): void;
        blockContent(zIndex: number): void;
        forceUnblock(): void;
        getBlockerElement(widget: qx.ui.core.Widget): qx.html.Element;
        getColor(): any;
        getKeepBlockerActive(): any;
        getOpacity(): any;
        initColor(value: any): any;
        initKeepBlockerActive(value: any): any;
        initOpacity(value: any): any;
        isBlocked(): boolean;
        isKeepBlockerActive(): boolean;
        resetColor(): void;
        resetKeepBlockerActive(): void;
        resetOpacity(): void;
        setColor(value: any): any;
        setKeepBlockerActive(value: any): any;
        setOpacity(value: any): any;
        toggleKeepBlockerActive(): boolean;
        unblock(): void;
        color: string;
        keepBlockerActive: boolean;
        opacity: number;
    }
}
declare module qx.ui.core {
    class ColumnData extends qx.ui.core.LayoutItem {
        constructor();
        getComputedWidth(): number;
        getFlex(): number;
        setColumnWidth(width: string, flex?: number): void;
    }
}
declare module qx.ui.core {
    class Command extends qx.core.Object {
        constructor(shortcut: string);
        protected _applyEnabled(value: boolean, old: boolean): void;
        protected _applyShortcut(value: string, old: string): void;
        execute(target: any): void;
        getEnabled(): any;
        getIcon(): any;
        getLabel(): any;
        getMenu(): any;
        getShortcut(): any;
        getToolTipText(): any;
        getValue(): any;
        initEnabled(value: any): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initMenu(value: any): any;
        initShortcut(value: any): any;
        initToolTipText(value: any): any;
        initValue(value: any): any;
        isEnabled(): boolean;
        resetEnabled(): void;
        resetIcon(): void;
        resetLabel(): void;
        resetMenu(): void;
        resetShortcut(): void;
        resetToolTipText(): void;
        resetValue(): void;
        setEnabled(value: any): any;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setMenu(value: any): any;
        setShortcut(value: any): any;
        setToolTipText(value: any): any;
        setValue(value: any): any;
        toggleEnabled(): boolean;
        shortcut: string;
    }
}
declare module qx.ui.core {
    class DragDropCursor extends qx.ui.basic.Image {
        static getMoveDirection(): string;
        static getVisibleElement(): any;
        static setMoveDirection(direction: string): void;
        static setVisibleElement(elem: qx.ui.core.Widget): void;
        protected _getPlacementOffsets(): IMap;
        protected _place(coords: IMap): void;
        getDomMove(): any;
        getLayoutLocation(widget: qx.ui.core.Widget): IMap;
        getOffsetBottom(): any;
        getOffsetLeft(): any;
        getOffsetRight(): any;
        getOffsetTop(): any;
        getPlacementModeX(): any;
        getPlacementModeY(): any;
        getPlaceMethod(): any;
        getPosition(): any;
        initDomMove(value: any): any;
        initOffsetBottom(value: any): any;
        initOffsetLeft(value: any): any;
        initOffsetRight(value: any): any;
        initOffsetTop(value: any): any;
        initPlacementModeX(value: any): any;
        initPlacementModeY(value: any): any;
        initPlaceMethod(value: any): any;
        initPosition(value: any): any;
        isDomMove(): boolean;
        moveTo(left: number, top: number): void;
        placeToElement(elem: HTMLElement, liveupdate: boolean): void;
        placeToPoint(point: IMap): void;
        placeToPointer(event: qx.event.type.Pointer): void;
        placeToWidget(target: qx.ui.core.Widget, liveupdate: boolean): boolean;
        resetDomMove(): void;
        resetOffset(): void;
        resetOffsetBottom(): void;
        resetOffsetLeft(): void;
        resetOffsetRight(): void;
        resetOffsetTop(): void;
        resetPlacementModeX(): void;
        resetPlacementModeY(): void;
        resetPlaceMethod(): void;
        resetPosition(): void;
        setDomMove(value: any): any;
        setOffset(offsetTop: any, offsetRight: any, offsetBottom: any, offsetLeft: any): void;
        setOffsetBottom(value: any): any;
        setOffsetLeft(value: any): any;
        setOffsetRight(value: any): any;
        setOffsetTop(value: any): any;
        setPlacementModeX(value: any): any;
        setPlacementModeY(value: any): any;
        setPlaceMethod(value: any): any;
        setPosition(value: any): any;
        toggleDomMove(): boolean;
        constructor();
        protected _applyAction(value: any, old: any): void;
        getAction(): any;
        initAction(value: any): any;
        resetAction(): void;
        setAction(value: any): any;
        static getInstance(): qx.ui.core.DragDropCursor;
    }
}
declare module qx.ui.core {
    class EventHandler extends qx.core.Object implements qx.event.IEventHandler {
        canHandleEvent(target: any, type: string): boolean;
        registerEvent(target: any, type: string, capture: boolean): void;
        unregisterEvent(target: any, type: string, capture: boolean): void;
        constructor();
        protected _dispatchEvent(domEvent: qx.event.type.Event): void;
    }
}
declare module qx.ui.core {
    class FocusHandler extends qx.core.Object {
        constructor();
        protected _onActivate(e: qx.event.type.Focus): void;
        protected _onDeactivate(e: qx.event.type.Focus): void;
        protected _onFocusIn(e: qx.event.type.Focus): void;
        protected _onFocusOut(e: qx.event.type.Focus): void;
        addRoot(widget: qx.ui.core.Widget): void;
        connectTo(root: qx.ui.root.Abstract): void;
        getActiveWidget(): any;
        getFocusedWidget(): any;
        isActive(widget: qx.ui.core.Widget): boolean;
        isFocused(widget: qx.ui.core.Widget): boolean;
        isFocusRoot(widget: qx.ui.core.Widget): boolean;
        removeRoot(widget: qx.ui.core.Widget): void;
        static getInstance(): qx.ui.core.FocusHandler;
    }
}
declare module qx.ui.core {
    interface IMultiSelection {
        addToSelection(item: qx.ui.core.Widget): void;
        removeFromSelection(item: qx.ui.core.Widget): void;
        selectAll(): void;
    }
}
declare module qx.ui.core {
    interface ISingleSelection {
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
    }
}
declare module qx.ui.core {
    interface ISingleSelectionProvider {
        getItems(): qx.ui.core.Widget[];
        isItemSelectable(item: qx.ui.core.Widget): boolean;
    }
}
declare module qx.ui.core {
    class LayoutItem extends qx.core.Object {
        constructor();
        protected _applyAlign(value: any, old: any): void;
        protected _applyDimension(value: number, old: number): void;
        protected _applyMargin(value: number, old: number): void;
        protected _applyStretching(value: boolean, old: boolean): void;
        protected _computeSizeHint(): IMap;
        protected _getHeightForWidth(width: number): number;
        protected _getLayout(): qx.ui.layout.Abstract;
        protected _getRoot(): qx.ui.core.Widget;
        protected _hasHeightForWidth(): boolean;
        protected _onChangeTheme(): void;
        clearLayoutProperties(): void;
        clearSeparators(): void;
        getAlignX(): any;
        getAlignY(): any;
        getAllowGrowX(): any;
        getAllowGrowY(): any;
        getAllowShrinkX(): any;
        getAllowShrinkY(): any;
        getApplicationRoot(): qx.ui.root.Abstract;
        getBounds(): IMap;
        getHeight(): any;
        getLayoutParent(): any;
        getLayoutProperties(): IMap;
        getMarginBottom(): any;
        getMarginLeft(): any;
        getMarginRight(): any;
        getMarginTop(): any;
        getMaxHeight(): any;
        getMaxWidth(): any;
        getMinHeight(): any;
        getMinWidth(): any;
        getSizeHint(compute?: boolean): IMap;
        getWidth(): any;
        hasUserBounds(): boolean;
        hasValidLayout(): boolean;
        initAlignX(value: any): any;
        initAlignY(value: any): any;
        initAllowGrowX(value: any): any;
        initAllowGrowY(value: any): any;
        initAllowShrinkX(value: any): any;
        initAllowShrinkY(value: any): any;
        initHeight(value: any): any;
        initMarginBottom(value: any): any;
        initMarginLeft(value: any): any;
        initMarginRight(value: any): any;
        initMarginTop(value: any): any;
        initMaxHeight(value: any): any;
        initMaxWidth(value: any): any;
        initMinHeight(value: any): any;
        initMinWidth(value: any): any;
        initWidth(value: any): any;
        invalidateLayoutCache(): void;
        isAllowGrowX(): boolean;
        isAllowGrowY(): boolean;
        isAllowShrinkX(): boolean;
        isAllowShrinkY(): boolean;
        isExcluded(): boolean;
        isRootWidget(): boolean;
        renderLayout(left: number, top: number, width: number, height: number): IMap;
        renderSeparator(separator: qx.ui.decoration.IDecorator, bounds: IMap): void;
        resetAlignX(): void;
        resetAlignY(): void;
        resetAllowGrowX(): void;
        resetAllowGrowY(): void;
        resetAllowShrinkX(): void;
        resetAllowShrinkY(): void;
        resetAllowStretchX(): void;
        resetAllowStretchY(): void;
        resetHeight(): void;
        resetMargin(): void;
        resetMarginBottom(): void;
        resetMarginLeft(): void;
        resetMarginRight(): void;
        resetMarginTop(): void;
        resetMaxHeight(): void;
        resetMaxWidth(): void;
        resetMinHeight(): void;
        resetMinWidth(): void;
        resetUserBounds(): void;
        resetWidth(): void;
        scheduleLayoutUpdate(): void;
        setAlignX(value: any): any;
        setAlignY(value: any): any;
        setAllowGrowX(value: any): any;
        setAllowGrowY(value: any): any;
        setAllowShrinkX(value: any): any;
        setAllowShrinkY(value: any): any;
        setAllowStretchX(allowGrowX: any, allowShrinkX: any): void;
        setAllowStretchY(allowGrowY: any, allowShrinkY: any): void;
        setHeight(value: any): any;
        setLayoutParent(parent: any): void;
        setLayoutProperties(props: IMap): void;
        setMargin(marginTop: any, marginRight: any, marginBottom: any, marginLeft: any): void;
        setMarginBottom(value: any): any;
        setMarginLeft(value: any): any;
        setMarginRight(value: any): any;
        setMarginTop(value: any): any;
        setMaxHeight(value: any): any;
        setMaxWidth(value: any): any;
        setMinHeight(value: any): any;
        setMinWidth(value: any): any;
        setUserBounds(left: number, top: number, width: number, height: number): void;
        setWidth(value: any): any;
        toggleAllowGrowX(): boolean;
        toggleAllowGrowY(): boolean;
        toggleAllowShrinkX(): boolean;
        toggleAllowShrinkY(): boolean;
        updateLayoutProperties(props?: IMap): void;
        allowGrowX: boolean;
        allowGrowY: boolean;
        allowShrinkX: boolean;
        allowShrinkY: boolean;
        marginBottom: number;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        maxHeight: number;
        maxWidth: number;
        minHeight: number;
        minWidth: number;
    }
}
declare module qx.ui.core {
    class MBlocker {
        protected _applyBlockerColor(value: string, old: string): void;
        protected _applyBlockerOpacity(value: number, old: number): void;
        protected _createBlocker(): qx.ui.core.Blocker;
        block(): void;
        blockContent(zIndex: number): void;
        forceUnblock(): void;
        getBlocker(): qx.ui.core.Blocker;
        getBlockerColor(): any;
        getBlockerOpacity(): any;
        initBlockerColor(value: any): any;
        initBlockerOpacity(value: any): any;
        isBlocked(): boolean;
        resetBlockerColor(): void;
        resetBlockerOpacity(): void;
        setBlockerColor(value: any): any;
        setBlockerOpacity(value: any): any;
        unblock(): void;
        blockerColor: string;
        blockerOpacity: number;
    }
}
declare module qx.ui.core {
    class MChildrenHandling {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
    }
}
declare module qx.ui.core {
    class MContentPadding {
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        contentPaddingBottom: number;
        contentPaddingLeft: number;
        contentPaddingRight: number;
        contentPaddingTop: number;
    }
}
declare module qx.ui.core {
    class MDragDropScrolling {
        constructor();
        protected _calculateScrollAmount(scrollbarSize: number, exceedanceAmount: number): number;
        protected _calculateThresholdExceedance(diff: number, threshold: number): number;
        protected _findScrollableParent(widget: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        protected _getAxis(edgeType: string): string;
        protected _getBounds(scrollable: qx.ui.core.Widget): IMap;
        protected _getEdgeType(diff: IMap, thresholdX: number, thresholdY: number): string;
        protected _getThresholdByEdgeType(edgeType: string): number;
        protected _isScrollable(widget: qx.ui.core.Widget): boolean;
        protected _isScrollbarExceedingMaxPos(scrollbar: qx.ui.core.scroll.IScrollBar, axis: string, amount: number): boolean;
        protected _isScrollbarVisible(scrollable: qx.ui.core.Widget, axis: string): boolean;
        protected _scrollBy(scrollable: qx.ui.core.Widget, axis: string, exceedanceAmount: number): void;
        getDragScrollSlowDownFactor(): any;
        getDragScrollThresholdX(): any;
        getDragScrollThresholdY(): any;
        initDragScrollSlowDownFactor(value: any): any;
        initDragScrollThresholdX(value: any): any;
        initDragScrollThresholdY(value: any): any;
        resetDragScrollSlowDownFactor(): void;
        resetDragScrollThresholdX(): void;
        resetDragScrollThresholdY(): void;
        setDragScrollSlowDownFactor(value: any): any;
        setDragScrollThresholdX(value: any): any;
        setDragScrollThresholdY(value: any): any;
        dragScrollSlowDownFactor: number;
        dragScrollThresholdX: number;
        dragScrollThresholdY: number;
    }
}
declare module qx.ui.core {
    class MExecutable {
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        execute(): void;
        getCommand(): any;
        initCommand(value: any): any;
        resetCommand(): void;
        setCommand(value: any): any;
    }
}
declare module qx.ui.core {
    class MLayoutHandling {
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        static remap(members: IMap): void;
    }
}
declare module qx.ui.core {
    class MMovable {
        protected _activateMoveHandle(widget: qx.ui.core.Widget): void;
        protected _onMovePointerDown(e: qx.event.type.Pointer): void;
        protected _onMovePointerMove(e: qx.event.type.Pointer): void;
        protected _onMovePointerUp(e: qx.event.type.Pointer): void;
        protected _onMoveRoll(e: qx.event.type.Roll): void;
        getMovable(): any;
        getUseMoveFrame(): any;
        initMovable(value: any): any;
        initUseMoveFrame(value: any): any;
        isMovable(): boolean;
        isUseMoveFrame(): boolean;
        resetMovable(): void;
        resetUseMoveFrame(): void;
        setMovable(value: any): any;
        setUseMoveFrame(value: any): any;
        toggleMovable(): boolean;
        toggleUseMoveFrame(): boolean;
        movable: boolean;
        useMoveFrame: boolean;
    }
}
declare module qx.ui.core {
    class MMultiSelectionHandling {
        constructor();
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _getLeadItem(): qx.ui.core.Widget;
        protected _getManager(): qx.ui.core.selection.Abstract;
        protected _onSelectionChange(e: qx.event.type.Data): void;
        addToSelection(item: qx.ui.core.Widget): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        getSelectionContext(): any;
        getSelectionMode(): any;
        getSortedSelection(): qx.ui.core.Widget[];
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelectionMode(value: any): any;
        invertSelection(): void;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        removeFromSelection(item: qx.ui.core.Widget): void;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelection(): void;
        resetSelectionMode(): void;
        selectAll(): void;
        selectRange(begin: qx.ui.core.Widget, end: qx.ui.core.Widget): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelection(items: qx.ui.core.Widget[]): void;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        dragSelection: boolean;
        quickSelection: boolean;
    }
}
declare module qx.ui.core {
    class MNativeOverflow {
        protected _applyOverflowX(value: any, old: any): void;
        protected _applyOverflowY(value: any, old: any): void;
        getOverflowX(): any;
        getOverflowY(): any;
        initOverflowX(value: any): any;
        initOverflowY(value: any): any;
        resetOverflow(): void;
        resetOverflowX(): void;
        resetOverflowY(): void;
        setOverflow(overflowX: any, overflowY: any): void;
        setOverflowX(value: any): any;
        setOverflowY(value: any): any;
    }
}
declare module qx.ui.core {
    class MPlacement {
        static getMoveDirection(): string;
        static getVisibleElement(): any;
        static setMoveDirection(direction: string): void;
        static setVisibleElement(elem: qx.ui.core.Widget): void;
        protected _getPlacementOffsets(): IMap;
        protected _place(coords: IMap): void;
        getDomMove(): any;
        getLayoutLocation(widget: qx.ui.core.Widget): IMap;
        getOffsetBottom(): any;
        getOffsetLeft(): any;
        getOffsetRight(): any;
        getOffsetTop(): any;
        getPlacementModeX(): any;
        getPlacementModeY(): any;
        getPlaceMethod(): any;
        getPosition(): any;
        initDomMove(value: any): any;
        initOffsetBottom(value: any): any;
        initOffsetLeft(value: any): any;
        initOffsetRight(value: any): any;
        initOffsetTop(value: any): any;
        initPlacementModeX(value: any): any;
        initPlacementModeY(value: any): any;
        initPlaceMethod(value: any): any;
        initPosition(value: any): any;
        isDomMove(): boolean;
        moveTo(left: number, top: number): void;
        placeToElement(elem: HTMLElement, liveupdate: boolean): void;
        placeToPoint(point: IMap): void;
        placeToPointer(event: qx.event.type.Pointer): void;
        placeToWidget(target: qx.ui.core.Widget, liveupdate: boolean): boolean;
        resetDomMove(): void;
        resetOffset(): void;
        resetOffsetBottom(): void;
        resetOffsetLeft(): void;
        resetOffsetRight(): void;
        resetOffsetTop(): void;
        resetPlacementModeX(): void;
        resetPlacementModeY(): void;
        resetPlaceMethod(): void;
        resetPosition(): void;
        setDomMove(value: any): any;
        setOffset(offsetTop: any, offsetRight: any, offsetBottom: any, offsetLeft: any): void;
        setOffsetBottom(value: any): any;
        setOffsetLeft(value: any): any;
        setOffsetRight(value: any): any;
        setOffsetTop(value: any): any;
        setPlacementModeX(value: any): any;
        setPlacementModeY(value: any): any;
        setPlaceMethod(value: any): any;
        setPosition(value: any): any;
        toggleDomMove(): boolean;
        domMove: boolean;
        offsetBottom: number;
        offsetLeft: number;
        offsetRight: number;
        offsetTop: number;
    }
}
declare module qx.ui.core {
    class MRemoteChildrenHandling {
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
    }
}
declare module qx.ui.core {
    class MRemoteLayoutHandling {
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
    }
}
declare module qx.ui.core {
    class MResizable {
        constructor();
        protected _getResizeFrame(): qx.ui.core.Widget;
        getResizableBottom(): any;
        getResizableLeft(): any;
        getResizableRight(): any;
        getResizableTop(): any;
        getResizeSensitivity(): any;
        getUseResizeFrame(): any;
        initResizableBottom(value: any): any;
        initResizableLeft(value: any): any;
        initResizableRight(value: any): any;
        initResizableTop(value: any): any;
        initResizeSensitivity(value: any): any;
        initUseResizeFrame(value: any): any;
        isResizableBottom(): boolean;
        isResizableLeft(): boolean;
        isResizableRight(): boolean;
        isResizableTop(): boolean;
        isUseResizeFrame(): boolean;
        resetResizable(): void;
        resetResizableBottom(): void;
        resetResizableLeft(): void;
        resetResizableRight(): void;
        resetResizableTop(): void;
        resetResizeSensitivity(): void;
        resetUseResizeFrame(): void;
        setResizable(resizableTop: any, resizableRight: any, resizableBottom: any, resizableLeft: any): void;
        setResizableBottom(value: any): any;
        setResizableLeft(value: any): any;
        setResizableRight(value: any): any;
        setResizableTop(value: any): any;
        setResizeSensitivity(value: any): any;
        setUseResizeFrame(value: any): any;
        toggleResizableBottom(): boolean;
        toggleResizableLeft(): boolean;
        toggleResizableRight(): boolean;
        toggleResizableTop(): boolean;
        toggleUseResizeFrame(): boolean;
        resizableBottom: boolean;
        resizableLeft: boolean;
        resizableRight: boolean;
        resizableTop: boolean;
        resizeSensitivity: number;
        useResizeFrame: boolean;
    }
}
declare module qx.ui.core {
    class MSingleSelectionHandling {
        protected _onChangeSelected(e: qx.event.type.Data): void;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
    }
}
declare module qx.ui.core {
    class SingleSelectionManager extends qx.core.Object {
        constructor(selectionProvider: qx.ui.core.ISingleSelectionProvider);
        getAllowEmptySelection(): any;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelected(): any;
        initAllowEmptySelection(value: any): any;
        isAllowEmptySelection(): boolean;
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetAllowEmptySelection(): void;
        resetSelected(): void;
        setAllowEmptySelection(value: any): any;
        setSelected(item: qx.ui.core.Widget): void;
        toggleAllowEmptySelection(): boolean;
        allowEmptySelection: boolean;
    }
}
declare module qx.ui.core {
    class Spacer extends qx.ui.core.LayoutItem {
        constructor(width?: number, height?: number);
        addChildrenToQueue(queue: IMap): void;
        destroy(): void;
    }
}
declare module qx.ui.core {
    class Widget extends qx.ui.core.LayoutItem {
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        constructor();
        protected _add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        protected _addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        protected _addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        protected _addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        protected _afterAddChild(child: qx.ui.core.LayoutItem): void;
        protected _afterRemoveChild(child: qx.ui.core.LayoutItem): void;
        protected _applyAppearance(value: string, old: string): void;
        protected _applyBackgroundColor(value: string, old: string): void;
        protected _applyContextMenu(value: qx.ui.menu.Menu, old: qx.ui.menu.Menu): void;
        protected _applyCursor(value: string, old: string): void;
        protected _applyDecorator(value: qx.ui.decoration.Decorator, old: qx.ui.decoration.Decorator): void;
        protected _applyDraggable(value: boolean, old: boolean): void;
        protected _applyDroppable(value: boolean, old: boolean): void;
        protected _applyEnabled(value: boolean, old: boolean): void;
        protected _applyFocusable(value: boolean, old: boolean): void;
        protected _applyFont(value: string, old: string): void;
        protected _applyKeepActive(value: boolean, old: boolean): void;
        protected _applyKeepFocus(value: boolean, old: boolean): void;
        protected _applyNativeContextMenu(value: boolean, old: boolean): void;
        protected _applyOpacity(value: number, old: number): void;
        protected _applyPadding(value: number, old: number): void;
        protected _applySelectable(value: boolean, old: boolean): void;
        protected _applyTabIndex(value: number, old: number): void;
        protected _applyTextColor(value: string, old: string): void;
        protected _applyToolTipText(value: string, old: string): void;
        protected _applyVisibility(value: any, old: any): void;
        protected _applyZIndex(value: number, old: number): void;
        protected _createChildControl(id: string): qx.ui.core.Widget;
        protected _createChildControlImpl(id: string, hash?: string): qx.ui.core.Widget;
        protected _createContentElement(): qx.html.Element;
        protected _disposeChildControls(): void;
        protected _excludeChildControl(id: string): void;
        protected _findTopControl(): qx.ui.core.Widget;
        protected _getChildren(): qx.ui.core.LayoutItem[];
        protected _getContentHeightForWidth(width: number): number;
        protected _getContentHint(): IMap;
        protected _getCreatedChildControls(): IMap;
        protected _getDragDropCursor(): qx.ui.core.DragDropCursor;
        protected _hasChildren(): boolean;
        protected _indexOf(child: qx.ui.core.Widget): number;
        protected _isChildControlVisible(id: string): boolean;
        protected _onBeforeContextMenuOpen(e: qx.event.type.Data): void;
        protected _onContextMenuOpen(e: qx.event.type.Pointer): void;
        protected _onDrag(e: qx.event.type.Drag): void;
        protected _onDragChange(e: qx.event.type.Drag): void;
        protected _onDragEnd(e: qx.event.type.Drag): void;
        protected _onDragStart(e: qx.event.type.Drag): void;
        protected _onStopEvent(e: qx.event.type.Event): void;
        protected _releaseChildControl(id: string): qx.ui.core.Widget;
        protected _remove(child: qx.ui.core.LayoutItem): void;
        protected _removeAll(): qx.data.Array;
        protected _removeAt(index: number): qx.ui.core.LayoutItem;
        protected _setLayout(layout: qx.ui.layout.Abstract): void;
        protected _showChildControl(id: string): qx.ui.core.Widget;
        activate(): void;
        addChildrenToQueue(queue: qx.data.Array): void;
        addState(state: string): void;
        blur(): void;
        capture(capture?: boolean): void;
        deactivate(): void;
        destroy(): void;
        exclude(): void;
        fadeIn(duration: number): qx.bom.element.AnimationHandle;
        fadeOut(duration: number): qx.bom.element.AnimationHandle;
        focus(): void;
        getAnonymous(): any;
        getAppearance(): any;
        getBackgroundColor(): any;
        getBlockToolTip(): any;
        getChildControl(id: string, notcreate?: boolean): qx.ui.core.Widget;
        getChildrenContainer(): qx.ui.core.Widget;
        getContentElement(): qx.html.Element;
        getContentLocation(mode?: string): IMap;
        getContextMenu(): any;
        getCursor(): any;
        getDecorator(): any;
        getDraggable(): any;
        getDroppable(): any;
        getEnabled(): any;
        getEventTarget(): qx.ui.core.Widget;
        getFocusable(): any;
        getFocusElement(): qx.html.Element;
        getFocusTarget(): qx.ui.core.Widget;
        getFont(): any;
        getInnerSize(): IMap;
        getInsets(): IMap;
        getKeepActive(): any;
        getKeepFocus(): any;
        getNativeContextMenu(): any;
        getOpacity(): any;
        getPaddingBottom(): any;
        getPaddingLeft(): any;
        getPaddingRight(): any;
        getPaddingTop(): any;
        getSelectable(): any;
        getTabIndex(): any;
        getTextColor(): any;
        getToolTip(): any;
        getToolTipIcon(): any;
        getToolTipText(): any;
        getVisibility(): any;
        getZIndex(): any;
        hasChildControl(id: string): boolean;
        hasLayoutChildren(): boolean;
        hasState(state: string): boolean;
        hide(): void;
        initAnonymous(value: any): any;
        initAppearance(value: any): any;
        initBackgroundColor(value: any): any;
        initBlockToolTip(value: any): any;
        initContextMenu(value: any): any;
        initCursor(value: any): any;
        initDecorator(value: any): any;
        initDraggable(value: any): any;
        initDroppable(value: any): any;
        initEnabled(value: any): any;
        initFocusable(value: any): any;
        initFont(value: any): any;
        initKeepActive(value: any): any;
        initKeepFocus(value: any): any;
        initNativeContextMenu(value: any): any;
        initOpacity(value: any): any;
        initPaddingBottom(value: any): any;
        initPaddingLeft(value: any): any;
        initPaddingRight(value: any): any;
        initPaddingTop(value: any): any;
        initSelectable(value: any): any;
        initTabIndex(value: any): any;
        initTextColor(value: any): any;
        initToolTip(value: any): any;
        initToolTipIcon(value: any): any;
        initToolTipText(value: any): any;
        initVisibility(value: any): any;
        initZIndex(value: any): any;
        invalidateLayoutChildren(): void;
        isAnonymous(): boolean;
        isBlockToolTip(): boolean;
        isCapturing(): boolean;
        isDraggable(): boolean;
        isDroppable(): boolean;
        isEnabled(): boolean;
        isFocusable(): boolean;
        isHidden(): boolean;
        isKeepActive(): boolean;
        isKeepFocus(): boolean;
        isNativeContextMenu(): boolean;
        isSeeable(): boolean;
        isSelectable(): boolean;
        isTabable(): boolean;
        isVisible(): boolean;
        releaseCapture(): void;
        removeState(state: string): void;
        replaceState(old: string, value: string): void;
        resetAnonymous(): void;
        resetAppearance(): void;
        resetBackgroundColor(): void;
        resetBlockToolTip(): void;
        resetContextMenu(): void;
        resetCursor(): void;
        resetDecorator(): void;
        resetDraggable(): void;
        resetDroppable(): void;
        resetEnabled(): void;
        resetFocusable(): void;
        resetFont(): void;
        resetKeepActive(): void;
        resetKeepFocus(): void;
        resetNativeContextMenu(): void;
        resetOpacity(): void;
        resetPadding(): void;
        resetPaddingBottom(): void;
        resetPaddingLeft(): void;
        resetPaddingRight(): void;
        resetPaddingTop(): void;
        resetSelectable(): void;
        resetTabIndex(): void;
        resetTextColor(): void;
        resetToolTip(): void;
        resetToolTipIcon(): void;
        resetToolTipText(): void;
        resetVisibility(): void;
        resetZIndex(): void;
        scrollChildIntoView(child: qx.ui.core.Widget, alignX?: string, alignY?: string, direct?: boolean): void;
        scrollChildIntoViewX(child: qx.ui.core.Widget, align?: string, direct?: boolean): void;
        scrollChildIntoViewY(child: qx.ui.core.Widget, align?: string, direct?: boolean): void;
        setAnonymous(value: any): any;
        setAppearance(value: any): any;
        setBackgroundColor(value: any): any;
        setBlockToolTip(value: any): any;
        setContextMenu(value: any): any;
        setCursor(value: any): any;
        setDecorator(value: any): any;
        setDomLeft(value: number): void;
        setDomPosition(left: number, top: number): void;
        setDomTop(value: number): void;
        setDraggable(value: any): any;
        setDroppable(value: any): any;
        setEnabled(value: any): any;
        setFocusable(value: any): any;
        setFont(value: any): any;
        setKeepActive(value: any): any;
        setKeepFocus(value: any): any;
        setNativeContextMenu(value: any): any;
        setOpacity(value: any): any;
        setPadding(paddingTop: any, paddingRight: any, paddingBottom: any, paddingLeft: any): void;
        setPaddingBottom(value: any): any;
        setPaddingLeft(value: any): any;
        setPaddingRight(value: any): any;
        setPaddingTop(value: any): any;
        setSelectable(value: any): any;
        setTabIndex(value: any): any;
        setTextColor(value: any): any;
        setToolTip(value: any): any;
        setToolTipIcon(value: any): any;
        setToolTipText(value: any): any;
        setVisibility(value: any): any;
        setZIndex(value: any): any;
        show(arg?: any): void;
        syncAppearance(): void;
        syncWidget(jobs: IMap): void;
        toggleAnonymous(): boolean;
        toggleBlockToolTip(): boolean;
        toggleDraggable(): boolean;
        toggleDroppable(): boolean;
        toggleEnabled(): boolean;
        toggleFocusable(): boolean;
        toggleKeepActive(): boolean;
        toggleKeepFocus(): boolean;
        toggleNativeContextMenu(): boolean;
        toggleSelectable(): boolean;
        updateAppearance(): void;
        anonymous: boolean;
        blockToolTip: boolean;
        cursor: string;
        draggable: boolean;
        droppable: boolean;
        focusable: boolean;
        keepActive: boolean;
        keepFocus: boolean;
        opacity: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        paddingTop: number;
        tabIndex: number;
        toolTip: qx.ui.tooltip.ToolTip;
        static contains(parent: qx.ui.core.Widget, child: qx.ui.core.Widget): boolean;
        static getWidgetByElement(element: HTMLElement, considerAnonymousState?: boolean): qx.ui.core.Widget;
    }
}
declare module qx.ui.core.queue {
    class Appearance {
        static add(widget: qx.ui.core.Widget): void;
        static flush(): void;
        static has(widget: qx.ui.core.Widget): boolean;
        static remove(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.core.queue {
    class Dispose {
        static add(widget: qx.ui.core.Widget): void;
        static flush(): void;
    }
}
declare module qx.ui.core.queue {
    class Layout {
        static add(widget: qx.ui.core.Widget): void;
        static flush(): void;
        static getNestingLevel(widget: qx.ui.core.Widget): number;
        static isScheduled(widget: qx.ui.core.Widget): boolean;
        static remove(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.core.queue {
    class Manager {
        static flush(): void;
        static scheduleFlush(job: string): void;
    }
}
declare module qx.ui.core.queue {
    class Visibility {
        static add(widget: qx.ui.core.Widget): void;
        static flush(): void;
        static isVisible(widget: qx.ui.core.Widget): boolean;
        static remove(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.core.queue {
    class Widget {
        static add(widget: qx.ui.core.Widget, job?: string): void;
        static flush(): void;
        static remove(widget: qx.ui.core.Widget, job?: string): void;
    }
}
declare module qx.ui.core.scroll {
    class AbstractScrollArea extends qx.ui.core.Widget {
        protected _createScrollBar(orientation?: string): qx.ui.core.scroll.IScrollBar;
        protected _addRollHandling(): void;
        protected _onPointerDownForRoll(e: qx.event.type.Pointer): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _removeRollHandling(): void;
        protected _calculateScrollAmount(scrollbarSize: number, exceedanceAmount: number): number;
        protected _calculateThresholdExceedance(diff: number, threshold: number): number;
        protected _findScrollableParent(widget: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        protected _getAxis(edgeType: string): string;
        protected _getBounds(scrollable: qx.ui.core.Widget): IMap;
        protected _getEdgeType(diff: IMap, thresholdX: number, thresholdY: number): string;
        protected _getThresholdByEdgeType(edgeType: string): number;
        protected _isScrollable(widget: qx.ui.core.Widget): boolean;
        protected _isScrollbarExceedingMaxPos(scrollbar: qx.ui.core.scroll.IScrollBar, axis: string, amount: number): boolean;
        protected _isScrollbarVisible(scrollable: qx.ui.core.Widget, axis: string): boolean;
        protected _scrollBy(scrollable: qx.ui.core.Widget, axis: string, exceedanceAmount: number): void;
        getDragScrollSlowDownFactor(): any;
        getDragScrollThresholdX(): any;
        getDragScrollThresholdY(): any;
        initDragScrollSlowDownFactor(value: any): any;
        initDragScrollThresholdX(value: any): any;
        initDragScrollThresholdY(value: any): any;
        resetDragScrollSlowDownFactor(): void;
        resetDragScrollThresholdX(): void;
        resetDragScrollThresholdY(): void;
        setDragScrollSlowDownFactor(value: any): any;
        setDragScrollThresholdX(value: any): any;
        setDragScrollThresholdY(value: any): any;
        constructor();
        protected _computeScrollbars(): void;
        protected _onChangeScrollbarXVisibility(e: qx.event.type.Event): void;
        protected _onChangeScrollbarYVisibility(e: qx.event.type.Event): void;
        protected _onScrollAnimationEnd(direction: string): void;
        protected _onScrollBarX(e: qx.event.type.Data): void;
        protected _onScrollBarY(e: qx.event.type.Data): void;
        protected _onScrollPaneX(e: qx.event.type.Data): void;
        protected _onScrollPaneY(e: qx.event.type.Data): void;
        getItemBottom(item: qx.ui.core.Widget): number;
        getItemLeft(item: qx.ui.core.Widget): number;
        getItemRight(item: qx.ui.core.Widget): number;
        getItemTop(item: qx.ui.core.Widget): number;
        getPaneSize(): IMap;
        getScrollbarX(): any;
        getScrollbarY(): any;
        getScrollX(): number;
        getScrollY(): number;
        initScrollbarX(value: any): any;
        initScrollbarY(value: any): any;
        resetScrollbar(): void;
        resetScrollbarX(): void;
        resetScrollbarY(): void;
        scrollByX(value: number, duration?: number): void;
        scrollByY(value: number, duration?: number): void;
        scrollToX(value: number, duration?: number): void;
        scrollToY(value: number, duration?: number): void;
        setScrollbar(scrollbarX: any, scrollbarY: any): void;
        setScrollbarX(value: any): any;
        setScrollbarY(value: any): any;
        stopScrollAnimationX(): void;
        stopScrollAnimationY(): void;
    }
}
declare module qx.ui.core.scroll {
    interface IScrollBar {
        getKnobFactor(): any;
        getMaximum(): any;
        getOrientation(): any;
        getPosition(): any;
        initKnobFactor(value: any): any;
        initMaximum(value: any): any;
        initOrientation(value: any): any;
        initPosition(value: any): any;
        resetKnobFactor(): void;
        resetMaximum(): void;
        resetOrientation(): void;
        resetPosition(): void;
        scrollBy(offset: number, duration: number): void;
        scrollBySteps(steps: number, duration: number): void;
        scrollTo(position: number, duration: number): void;
        setKnobFactor(value: any): any;
        setMaximum(value: any): any;
        setOrientation(value: any): any;
        setPosition(value: any): any;
    }
}
declare module qx.ui.core.scroll {
    class MRoll {
        protected _addRollHandling(): void;
        protected _onPointerDownForRoll(e: qx.event.type.Pointer): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _removeRollHandling(): void;
    }
}
declare module qx.ui.core.scroll {
    class MScrollBarFactory {
        protected _createScrollBar(orientation?: string): qx.ui.core.scroll.IScrollBar;
    }
}
declare module qx.ui.core.scroll {
    class MWheelHandling {
        protected _onMouseWheel(e: qx.event.type.Mouse): void;
    }
}
declare module qx.ui.core.scroll {
    class NativeScrollBar extends qx.ui.core.Widget implements qx.ui.core.scroll.IScrollBar {
        getKnobFactor(): any;
        getMaximum(): any;
        getOrientation(): any;
        getPosition(): any;
        initKnobFactor(value: any): any;
        initMaximum(value: any): any;
        initOrientation(value: any): any;
        initPosition(value: any): any;
        resetKnobFactor(): void;
        resetMaximum(): void;
        resetOrientation(): void;
        resetPosition(): void;
        scrollBy(offset: number, duration: number): void;
        scrollBySteps(steps: number, duration: number): void;
        scrollTo(position: number, duration: number): void;
        setKnobFactor(value: any): any;
        setMaximum(value: any): any;
        setOrientation(value: any): any;
        setPosition(value: any): any;
        constructor(orientation?: string);
        protected _applyMaximum(value: number, old: number): void;
        protected _applyOrientation(value: any, old: any): void;
        protected _applyPosition(value: number, old: number): void;
        protected _getScrollPaneElement(): qx.html.Element;
        protected _onAppear(e: qx.event.type.Data): void;
        protected _onScroll(e: qx.event.type.Event): void;
        protected _stopPropagation(e: qx.event.type.Event): void;
        protected _updateScrollBar(): void;
        getSingleStep(): any;
        initSingleStep(value: any): any;
        resetSingleStep(): void;
        setSingleStep(value: any): any;
        stopScrollAnimation(): void;
        updatePosition(position: number): void;
        knobFactor: number;
        maximum: number;
        singleStep: number;
    }
}
declare module qx.ui.core.scroll {
    class ScrollBar extends qx.ui.core.Widget implements qx.ui.core.scroll.IScrollBar {
        getKnobFactor(): any;
        getMaximum(): any;
        getOrientation(): any;
        getPosition(): any;
        initKnobFactor(value: any): any;
        initMaximum(value: any): any;
        initOrientation(value: any): any;
        initPosition(value: any): any;
        resetKnobFactor(): void;
        resetMaximum(): void;
        resetOrientation(): void;
        resetPosition(): void;
        scrollBy(offset: number, duration: number): void;
        scrollBySteps(steps: number, duration: number): void;
        scrollTo(position: number, duration: number): void;
        setKnobFactor(value: any): any;
        setMaximum(value: any): any;
        setOrientation(value: any): any;
        setPosition(value: any): any;
        constructor(orientation?: string);
        protected _applyKnobFactor(value: number, old: number): void;
        protected _applyMaximum(value: number, old: number): void;
        protected _applyOrientation(value: any, old: any): void;
        protected _applyPageStep(value: number, old: number): void;
        protected _applyPosition(value: any, old: any): void;
        protected _onChangeSliderValue(e: qx.event.type.Data): void;
        protected _onExecuteBegin(e: qx.event.type.Event): void;
        protected _onExecuteEnd(e: qx.event.type.Event): void;
        protected _onResizeSlider(e: qx.event.type.Data): void;
        protected _onSlideAnimationEnd(): void;
        getPageStep(): any;
        getSingleStep(): any;
        initPageStep(value: any): any;
        initSingleStep(value: any): any;
        resetPageStep(): void;
        resetSingleStep(): void;
        setPageStep(value: any): any;
        setSingleStep(value: any): any;
        stopScrollAnimation(): void;
        updatePosition(position: number): void;
        knobFactor: number;
        maximum: number;
        pageStep: number;
        singleStep: number;
    }
}
declare module qx.ui.core.scroll {
    class ScrollPane extends qx.ui.core.Widget {
        constructor();
        protected _applyScrollX(value: any, old: any): void;
        protected _applyScrollY(value: any, old: any): void;
        protected _onAppear(e: qx.event.type.Event): void;
        protected _onScroll(e: qx.event.type.Event): void;
        protected _onUpdate(e: qx.event.type.Event): void;
        add(widget?: qx.ui.core.Widget): void;
        getChildren(): any[];
        getItemBottom(item: qx.ui.core.Widget): number;
        getItemLeft(item: qx.ui.core.Widget): number;
        getItemRight(item: qx.ui.core.Widget): number;
        getItemTop(item: qx.ui.core.Widget): number;
        getScrollMaxX(): number;
        getScrollMaxY(): number;
        getScrollSize(): IMap;
        getScrollX(): any;
        getScrollY(): any;
        initScrollX(value: any): any;
        initScrollY(value: any): any;
        remove(widget?: qx.ui.core.Widget): void;
        resetScrollX(): void;
        resetScrollY(): void;
        scrollByX(x?: number, duration?: number): void;
        scrollByY(y?: number, duration?: number): void;
        scrollToX(value: number, duration?: number): void;
        scrollToY(value: number, duration?: number): void;
        setScrollX(value: any): any;
        setScrollY(value: any): any;
        stopScrollAnimation(): void;
    }
}
declare module qx.ui.core.scroll {
    class ScrollSlider extends qx.ui.form.Slider {
        constructor(orientation: any);
    }
}
declare module qx.ui.core.selection {
    class Abstract extends qx.core.Object {
        constructor();
        protected _addToSelection(item: any): void;
        protected _applyDefaultSelection(force: boolean): any;
        protected _applyMode(value: any, old: any): void;
        protected _autoSelect(): void;
        protected _capture(): void;
        protected _cleanup(): void;
        protected _clearSelection(): void;
        protected _deselectItemRange(item1: any, item2: any): void;
        protected _fireChange(context: string): void;
        protected _getAnchorItem(): any;
        protected _getDimension(): IMap;
        protected _getFirstSelectable(): any;
        protected _getLastSelectable(): any;
        protected _getLocation(): IMap;
        protected _getPage(lead: any, up?: boolean): void;
        protected _getRelatedSelectable(item: any, relation: string): any;
        protected _getScroll(): IMap;
        protected _getSelectableFromPointerEvent(event: qx.event.type.Pointer): any;
        protected _getSelectableLocationX(item: any): IMap;
        protected _getSelectableLocationY(item: any): IMap;
        protected _getSelectableRange(item1: any, item2: any): qx.data.Array;
        protected _getSelectedItem(): any;
        protected _isSelectable(item: any): boolean;
        protected _onInterval(e: qx.event.type.Event): void;
        protected _releaseCapture(): void;
        protected _removeFromSelection(item: any): void;
        protected _replaceMultiSelection(items: qx.data.Array): void;
        protected _scrollBy(xoff: number, yoff: number): void;
        protected _scrollItemIntoView(item: any): void;
        protected _selectableToHashCode(item: any): string;
        protected _selectAllItems(): void;
        protected _selectItemRange(item1: any, item2: any, extend?: boolean): void;
        protected _setAnchorItem(value: any): void;
        protected _setLeadItem(value: any): void;
        protected _setSelectedItem(item: any): void;
        protected _styleSelectable(item: any, type: string, enabled: boolean): void;
        protected _toggleInSelection(item: any): void;
        addItem(item: any): void;
        clearSelection(): void;
        getDrag(): any;
        getLeadItem(): any;
        getMode(): any;
        getQuick(): any;
        getSelectables(all: boolean): qx.data.Array;
        getSelectedItem(): any;
        getSelection(): any[];
        getSelectionContext(): string;
        getSortedSelection(): any[];
        handleAddItem(e: qx.event.type.Data): void;
        handleKeyPress(event: qx.event.type.KeySequence): void;
        handleLoseCapture(event: qx.event.type.Pointer): void;
        handlePointerDown(event: qx.event.type.Pointer): void;
        handlePointerMove(event: qx.event.type.Pointer): void;
        handlePointerOver(event: qx.event.type.Pointer): void;
        handleRemoveItem(e: qx.event.type.Data): void;
        handleTap(event: qx.event.type.Tap): void;
        initDrag(value: any): any;
        initMode(value: any): any;
        initQuick(value: any): any;
        invertSelection(): void;
        isDrag(): boolean;
        isItemSelected(item: any): boolean;
        isQuick(): boolean;
        isSelectionEmpty(): boolean;
        removeItem(item: any): void;
        replaceSelection(items: qx.data.Array): void;
        resetDrag(): void;
        resetMode(): void;
        resetQuick(): void;
        selectAll(): void;
        selectItem(item: any): void;
        selectItemRange(begin: any, end: any): void;
        setDrag(value: any): any;
        setMode(value: any): any;
        setQuick(value: any): any;
        toggleDrag(): boolean;
        toggleQuick(): boolean;
        drag: boolean;
        quick: boolean;
    }
}
declare module qx.ui.core.selection {
    class ScrollArea extends qx.ui.core.selection.Widget {
    }
}
declare module qx.ui.core.selection {
    class Widget extends qx.ui.core.selection.Abstract {
        constructor(widget: qx.ui.core.Widget);
        protected _getWidget(): qx.ui.core.Widget;
        protected _isItemSelectable(item: qx.ui.core.Widget): boolean;
    }
}
declare module qx.ui.decoration {
    class Abstract extends qx.core.Object implements qx.ui.decoration.IDecorator {
        getInsets(): IMap;
        getPadding(): IMap;
        getStyles(): IMap;
        protected _getDefaultInsets(): IMap;
        protected _isInitialized(): boolean;
        protected _resetInsets(): void;
    }
}
declare module qx.ui.decoration {
    class Decorator extends qx.ui.decoration.Abstract implements qx.ui.decoration.IDecorator {
        getInsets(): IMap;
        getPadding(): IMap;
        getStyles(): IMap;
        protected _applyBackgroundColor(value: string, old: string): void;
        protected _styleBackgroundColor(styles: IMap): void;
        getBackgroundColor(): any;
        initBackgroundColor(value: any): any;
        resetBackgroundColor(): void;
        setBackgroundColor(value: any): any;
        protected _applyBorderRadius(value: number, old: number): void;
        protected _styleBorderRadius(styles: IMap): void;
        getRadiusBottomLeft(): any;
        getRadiusBottomRight(): any;
        getRadiusTopLeft(): any;
        getRadiusTopRight(): any;
        initRadiusBottomLeft(value: any): any;
        initRadiusBottomRight(value: any): any;
        initRadiusTopLeft(value: any): any;
        initRadiusTopRight(value: any): any;
        resetRadius(): void;
        resetRadiusBottomLeft(): void;
        resetRadiusBottomRight(): void;
        resetRadiusTopLeft(): void;
        resetRadiusTopRight(): void;
        setRadius(radiusTopLeft: any, radiusTopRight: any, radiusBottomRight: any, radiusBottomLeft: any): void;
        setRadiusBottomLeft(value: any): any;
        setRadiusBottomRight(value: any): any;
        setRadiusTopLeft(value: any): any;
        setRadiusTopRight(value: any): any;
        protected _applyBoxShadow(value: any, old: any): void;
        protected _styleBoxShadow(styles: IMap): void;
        getInset(): any;
        getShadowBlurRadius(): any;
        getShadowColor(): any;
        getShadowHorizontalLength(): any;
        getShadowSpreadRadius(): any;
        getShadowVerticalLength(): any;
        initInset(value: any): any;
        initShadowBlurRadius(value: any): any;
        initShadowColor(value: any): any;
        initShadowHorizontalLength(value: any): any;
        initShadowSpreadRadius(value: any): any;
        initShadowVerticalLength(value: any): any;
        isInset(): boolean;
        resetInset(): void;
        resetShadowBlurRadius(): void;
        resetShadowColor(): void;
        resetShadowHorizontalLength(): void;
        resetShadowLength(): void;
        resetShadowSpreadRadius(): void;
        resetShadowVerticalLength(): void;
        setInset(value: any): any;
        setShadowBlurRadius(value: any): any;
        setShadowColor(value: any): any;
        setShadowHorizontalLength(value: any): any;
        setShadowLength(shadowHorizontalLength: any, shadowVerticalLength: any): void;
        setShadowSpreadRadius(value: any): any;
        setShadowVerticalLength(value: any): any;
        toggleInset(): boolean;
        protected _applyDoubleBorder(value: any, old: any): void;
        getInnerColorBottom(): any;
        getInnerColorLeft(): any;
        getInnerColorRight(): any;
        getInnerColorTop(): any;
        getInnerOpacity(): any;
        getInnerWidthBottom(): any;
        getInnerWidthLeft(): any;
        getInnerWidthRight(): any;
        getInnerWidthTop(): any;
        initInnerColorBottom(value: any): any;
        initInnerColorLeft(value: any): any;
        initInnerColorRight(value: any): any;
        initInnerColorTop(value: any): any;
        initInnerOpacity(value: any): any;
        initInnerWidthBottom(value: any): any;
        initInnerWidthLeft(value: any): any;
        initInnerWidthRight(value: any): any;
        initInnerWidthTop(value: any): any;
        resetInnerColor(): void;
        resetInnerColorBottom(): void;
        resetInnerColorLeft(): void;
        resetInnerColorRight(): void;
        resetInnerColorTop(): void;
        resetInnerOpacity(): void;
        resetInnerWidth(): void;
        resetInnerWidthBottom(): void;
        resetInnerWidthLeft(): void;
        resetInnerWidthRight(): void;
        resetInnerWidthTop(): void;
        setInnerColor(innerColorTop: any, innerColorRight: any, innerColorBottom: any, innerColorLeft: any): void;
        setInnerColorBottom(value: any): any;
        setInnerColorLeft(value: any): any;
        setInnerColorRight(value: any): any;
        setInnerColorTop(value: any): any;
        setInnerOpacity(value: any): any;
        setInnerWidth(innerWidthTop: any, innerWidthRight: any, innerWidthBottom: any, innerWidthLeft: any): void;
        setInnerWidthBottom(value: any): any;
        setInnerWidthLeft(value: any): any;
        setInnerWidthRight(value: any): any;
        setInnerWidthTop(value: any): any;
        protected _applyLinearBackgroundGradient(value: any, old: any): void;
        protected _getContent(): string;
        protected _styleLinearBackgroundGradient(styles: IMap): void;
        getColorPositionUnit(): any;
        getEndColor(): any;
        getEndColorPosition(): any;
        getOrientation(): any;
        getStartColor(): any;
        getStartColorPosition(): any;
        initColorPositionUnit(value: any): any;
        initEndColor(value: any): any;
        initEndColorPosition(value: any): any;
        initOrientation(value: any): any;
        initStartColor(value: any): any;
        initStartColorPosition(value: any): any;
        resetColorPositionUnit(): void;
        resetEndColor(): void;
        resetEndColorPosition(): void;
        resetGradientEnd(): void;
        resetGradientStart(): void;
        resetOrientation(): void;
        resetStartColor(): void;
        resetStartColorPosition(): void;
        setColorPositionUnit(value: any): any;
        setEndColor(value: any): any;
        setEndColorPosition(value: any): any;
        setGradientEnd(endColor: any, endColorPosition: any): void;
        setGradientStart(startColor: any, startColorPosition: any): void;
        setOrientation(value: any): any;
        setStartColor(value: any): any;
        setStartColorPosition(value: any): any;
        protected _applyBorderImage(value: any, old: any): void;
        protected _getDefaultInsetsForBorderImage(): IMap;
        protected _styleBorderImage(styles: IMap): void;
        getBorderImage(): any;
        getBorderImageMode(): any;
        getFill(): any;
        getRepeatX(): any;
        getRepeatY(): any;
        getSliceBottom(): any;
        getSliceLeft(): any;
        getSliceRight(): any;
        getSliceTop(): any;
        initBorderImage(value: any): any;
        initBorderImageMode(value: any): any;
        initFill(value: any): any;
        initRepeatX(value: any): any;
        initRepeatY(value: any): any;
        initSliceBottom(value: any): any;
        initSliceLeft(value: any): any;
        initSliceRight(value: any): any;
        initSliceTop(value: any): any;
        isFill(): boolean;
        resetBorderImage(): void;
        resetBorderImageMode(): void;
        resetFill(): void;
        resetRepeat(): void;
        resetRepeatX(): void;
        resetRepeatY(): void;
        resetSlice(): void;
        resetSliceBottom(): void;
        resetSliceLeft(): void;
        resetSliceRight(): void;
        resetSliceTop(): void;
        setBorderImage(value: any): any;
        setBorderImageMode(value: any): any;
        setFill(value: any): any;
        setRepeat(repeatX: any, repeatY: any): void;
        setRepeatX(value: any): any;
        setRepeatY(value: any): any;
        setSlice(sliceTop: any, sliceRight: any, sliceBottom: any, sliceLeft: any): void;
        setSliceBottom(value: any): any;
        setSliceLeft(value: any): any;
        setSliceRight(value: any): any;
        setSliceTop(value: any): any;
        toggleFill(): boolean;
        protected _getStyles(): IMap;
    }
}
declare module qx.ui.decoration {
    interface IDecorator {
        getInsets(): IMap;
        getPadding(): IMap;
        getStyles(): IMap;
    }
}
declare module qx.ui.decoration {
    class MBackgroundColor {
        protected _applyBackgroundColor(value: string, old: string): void;
        protected _styleBackgroundColor(styles: IMap): void;
        getBackgroundColor(): any;
        initBackgroundColor(value: any): any;
        resetBackgroundColor(): void;
        setBackgroundColor(value: any): any;
        backgroundColor: string;
    }
}
declare module qx.ui.decoration {
    class MBackgroundImage {
        protected _applyBackgroundImage(value: any, old: any): void;
        protected _applyBackgroundPosition(value: any, old: any): void;
        protected _styleBackgroundImage(styles: IMap): void;
        getBackgroundImage(): any;
        getBackgroundPositionX(): any;
        getBackgroundPositionY(): any;
        getBackgroundRepeat(): any;
        initBackgroundImage(value: any): any;
        initBackgroundPositionX(value: any): any;
        initBackgroundPositionY(value: any): any;
        initBackgroundRepeat(value: any): any;
        resetBackgroundImage(): void;
        resetBackgroundPosition(): void;
        resetBackgroundPositionX(): void;
        resetBackgroundPositionY(): void;
        resetBackgroundRepeat(): void;
        setBackgroundImage(value: any): any;
        setBackgroundPosition(backgroundPositionY: any, backgroundPositionX: any): void;
        setBackgroundPositionX(value: any): any;
        setBackgroundPositionY(value: any): any;
        setBackgroundRepeat(value: any): any;
        backgroundImage: string;
    }
}
declare module qx.ui.decoration {
    class MBorderImage {
        protected _applyBorderImage(value: any, old: any): void;
        protected _getDefaultInsetsForBorderImage(): IMap;
        protected _styleBorderImage(styles: IMap): void;
        getBorderImage(): any;
        getBorderImageMode(): any;
        getFill(): any;
        getRepeatX(): any;
        getRepeatY(): any;
        getSliceBottom(): any;
        getSliceLeft(): any;
        getSliceRight(): any;
        getSliceTop(): any;
        initBorderImage(value: any): any;
        initBorderImageMode(value: any): any;
        initFill(value: any): any;
        initRepeatX(value: any): any;
        initRepeatY(value: any): any;
        initSliceBottom(value: any): any;
        initSliceLeft(value: any): any;
        initSliceRight(value: any): any;
        initSliceTop(value: any): any;
        isFill(): boolean;
        resetBorderImage(): void;
        resetBorderImageMode(): void;
        resetFill(): void;
        resetRepeat(): void;
        resetRepeatX(): void;
        resetRepeatY(): void;
        resetSlice(): void;
        resetSliceBottom(): void;
        resetSliceLeft(): void;
        resetSliceRight(): void;
        resetSliceTop(): void;
        setBorderImage(value: any): any;
        setBorderImageMode(value: any): any;
        setFill(value: any): any;
        setRepeat(repeatX: any, repeatY: any): void;
        setRepeatX(value: any): any;
        setRepeatY(value: any): any;
        setSlice(sliceTop: any, sliceRight: any, sliceBottom: any, sliceLeft: any): void;
        setSliceBottom(value: any): any;
        setSliceLeft(value: any): any;
        setSliceRight(value: any): any;
        setSliceTop(value: any): any;
        toggleFill(): boolean;
        borderImage: string;
        fill: boolean;
        sliceBottom: number;
        sliceLeft: number;
        sliceRight: number;
        sliceTop: number;
    }
}
declare module qx.ui.decoration {
    class MBorderRadius {
        protected _applyBorderRadius(value: number, old: number): void;
        protected _styleBorderRadius(styles: IMap): void;
        getRadiusBottomLeft(): any;
        getRadiusBottomRight(): any;
        getRadiusTopLeft(): any;
        getRadiusTopRight(): any;
        initRadiusBottomLeft(value: any): any;
        initRadiusBottomRight(value: any): any;
        initRadiusTopLeft(value: any): any;
        initRadiusTopRight(value: any): any;
        resetRadius(): void;
        resetRadiusBottomLeft(): void;
        resetRadiusBottomRight(): void;
        resetRadiusTopLeft(): void;
        resetRadiusTopRight(): void;
        setRadius(radiusTopLeft: any, radiusTopRight: any, radiusBottomRight: any, radiusBottomLeft: any): void;
        setRadiusBottomLeft(value: any): any;
        setRadiusBottomRight(value: any): any;
        setRadiusTopLeft(value: any): any;
        setRadiusTopRight(value: any): any;
        radiusBottomLeft: number;
        radiusBottomRight: number;
        radiusTopLeft: number;
        radiusTopRight: number;
    }
}
declare module qx.ui.decoration {
    class MBoxShadow {
        protected _applyBoxShadow(value: any, old: any): void;
        protected _styleBoxShadow(styles: IMap): void;
        getInset(): any;
        getShadowBlurRadius(): any;
        getShadowColor(): any;
        getShadowHorizontalLength(): any;
        getShadowSpreadRadius(): any;
        getShadowVerticalLength(): any;
        initInset(value: any): any;
        initShadowBlurRadius(value: any): any;
        initShadowColor(value: any): any;
        initShadowHorizontalLength(value: any): any;
        initShadowSpreadRadius(value: any): any;
        initShadowVerticalLength(value: any): any;
        isInset(): boolean;
        resetInset(): void;
        resetShadowBlurRadius(): void;
        resetShadowColor(): void;
        resetShadowHorizontalLength(): void;
        resetShadowLength(): void;
        resetShadowSpreadRadius(): void;
        resetShadowVerticalLength(): void;
        setInset(value: any): any;
        setShadowBlurRadius(value: any): any;
        setShadowColor(value: any): any;
        setShadowHorizontalLength(value: any): any;
        setShadowLength(shadowHorizontalLength: any, shadowVerticalLength: any): void;
        setShadowSpreadRadius(value: any): any;
        setShadowVerticalLength(value: any): any;
        toggleInset(): boolean;
        inset: boolean;
        shadowBlurRadius: number;
        shadowColor: string;
        shadowHorizontalLength: number;
        shadowSpreadRadius: number;
        shadowVerticalLength: number;
    }
}
declare module qx.ui.decoration {
    class MDoubleBorder {
        protected _applyStyle(value: any, old: any): void;
        protected _applyWidth(value: number, old: number): void;
        protected _getDefaultInsetsForBorder(): IMap;
        protected _styleBorder(styles: IMap): void;
        getColorBottom(): any;
        getColorLeft(): any;
        getColorRight(): any;
        getColorTop(): any;
        getStyleBottom(): any;
        getStyleLeft(): any;
        getStyleRight(): any;
        getStyleTop(): any;
        getWidthBottom(): any;
        getWidthLeft(): any;
        getWidthRight(): any;
        getWidthTop(): any;
        initColorBottom(value: any): any;
        initColorLeft(value: any): any;
        initColorRight(value: any): any;
        initColorTop(value: any): any;
        initStyleBottom(value: any): any;
        initStyleLeft(value: any): any;
        initStyleRight(value: any): any;
        initStyleTop(value: any): any;
        initWidthBottom(value: any): any;
        initWidthLeft(value: any): any;
        initWidthRight(value: any): any;
        initWidthTop(value: any): any;
        resetBottom(): void;
        resetColor(): void;
        resetColorBottom(): void;
        resetColorLeft(): void;
        resetColorRight(): void;
        resetColorTop(): void;
        resetLeft(): void;
        resetRight(): void;
        resetStyle(): void;
        resetStyleBottom(): void;
        resetStyleLeft(): void;
        resetStyleRight(): void;
        resetStyleTop(): void;
        resetTop(): void;
        resetWidth(): void;
        resetWidthBottom(): void;
        resetWidthLeft(): void;
        resetWidthRight(): void;
        resetWidthTop(): void;
        setBottom(widthBottom: any, styleBottom: any, colorBottom: any): void;
        setColor(colorTop: any, colorRight: any, colorBottom: any, colorLeft: any): void;
        setColorBottom(value: any): any;
        setColorLeft(value: any): any;
        setColorRight(value: any): any;
        setColorTop(value: any): any;
        setLeft(widthLeft: any, styleLeft: any, colorLeft: any): void;
        setRight(widthRight: any, styleRight: any, colorRight: any): void;
        setStyle(styleTop: any, styleRight: any, styleBottom: any, styleLeft: any): void;
        setStyleBottom(value: any): any;
        setStyleLeft(value: any): any;
        setStyleRight(value: any): any;
        setStyleTop(value: any): any;
        setTop(widthTop: any, styleTop: any, colorTop: any): void;
        setWidth(widthTop: any, widthRight: any, widthBottom: any, widthLeft: any): void;
        setWidthBottom(value: any): any;
        setWidthLeft(value: any): any;
        setWidthRight(value: any): any;
        setWidthTop(value: any): any;
        protected _applyBackgroundImage(value: any, old: any): void;
        protected _applyBackgroundPosition(value: any, old: any): void;
        protected _styleBackgroundImage(styles: IMap): void;
        getBackgroundImage(): any;
        getBackgroundPositionX(): any;
        getBackgroundPositionY(): any;
        getBackgroundRepeat(): any;
        initBackgroundImage(value: any): any;
        initBackgroundPositionX(value: any): any;
        initBackgroundPositionY(value: any): any;
        initBackgroundRepeat(value: any): any;
        resetBackgroundImage(): void;
        resetBackgroundPosition(): void;
        resetBackgroundPositionX(): void;
        resetBackgroundPositionY(): void;
        resetBackgroundRepeat(): void;
        setBackgroundImage(value: any): any;
        setBackgroundPosition(backgroundPositionY: any, backgroundPositionX: any): void;
        setBackgroundPositionX(value: any): any;
        setBackgroundPositionY(value: any): any;
        setBackgroundRepeat(value: any): any;
        constructor();
        protected _applyDoubleBorder(value: any, old: any): void;
        getInnerColorBottom(): any;
        getInnerColorLeft(): any;
        getInnerColorRight(): any;
        getInnerColorTop(): any;
        getInnerOpacity(): any;
        getInnerWidthBottom(): any;
        getInnerWidthLeft(): any;
        getInnerWidthRight(): any;
        getInnerWidthTop(): any;
        initInnerColorBottom(value: any): any;
        initInnerColorLeft(value: any): any;
        initInnerColorRight(value: any): any;
        initInnerColorTop(value: any): any;
        initInnerOpacity(value: any): any;
        initInnerWidthBottom(value: any): any;
        initInnerWidthLeft(value: any): any;
        initInnerWidthRight(value: any): any;
        initInnerWidthTop(value: any): any;
        resetInnerColor(): void;
        resetInnerColorBottom(): void;
        resetInnerColorLeft(): void;
        resetInnerColorRight(): void;
        resetInnerColorTop(): void;
        resetInnerOpacity(): void;
        resetInnerWidth(): void;
        resetInnerWidthBottom(): void;
        resetInnerWidthLeft(): void;
        resetInnerWidthRight(): void;
        resetInnerWidthTop(): void;
        setInnerColor(innerColorTop: any, innerColorRight: any, innerColorBottom: any, innerColorLeft: any): void;
        setInnerColorBottom(value: any): any;
        setInnerColorLeft(value: any): any;
        setInnerColorRight(value: any): any;
        setInnerColorTop(value: any): any;
        setInnerOpacity(value: any): any;
        setInnerWidth(innerWidthTop: any, innerWidthRight: any, innerWidthBottom: any, innerWidthLeft: any): void;
        setInnerWidthBottom(value: any): any;
        setInnerWidthLeft(value: any): any;
        setInnerWidthRight(value: any): any;
        setInnerWidthTop(value: any): any;
        innerColorBottom: string;
        innerColorLeft: string;
        innerColorRight: string;
        innerColorTop: string;
        innerOpacity: number;
        innerWidthBottom: number;
        innerWidthLeft: number;
        innerWidthRight: number;
        innerWidthTop: number;
    }
}
declare module qx.ui.decoration {
    class MLinearBackgroundGradient {
        protected _applyLinearBackgroundGradient(value: any, old: any): void;
        protected _getContent(): string;
        protected _styleLinearBackgroundGradient(styles: IMap): void;
        getColorPositionUnit(): any;
        getEndColor(): any;
        getEndColorPosition(): any;
        getOrientation(): any;
        getStartColor(): any;
        getStartColorPosition(): any;
        initColorPositionUnit(value: any): any;
        initEndColor(value: any): any;
        initEndColorPosition(value: any): any;
        initOrientation(value: any): any;
        initStartColor(value: any): any;
        initStartColorPosition(value: any): any;
        resetColorPositionUnit(): void;
        resetEndColor(): void;
        resetEndColorPosition(): void;
        resetGradientEnd(): void;
        resetGradientStart(): void;
        resetOrientation(): void;
        resetStartColor(): void;
        resetStartColorPosition(): void;
        setColorPositionUnit(value: any): any;
        setEndColor(value: any): any;
        setEndColorPosition(value: any): any;
        setGradientEnd(endColor: any, endColorPosition: any): void;
        setGradientStart(startColor: any, startColorPosition: any): void;
        setOrientation(value: any): any;
        setStartColor(value: any): any;
        setStartColorPosition(value: any): any;
        endColor: string;
        endColorPosition: number;
        startColor: string;
        startColorPosition: number;
    }
}
declare module qx.ui.decoration {
    class MSingleBorder {
        protected _applyStyle(value: any, old: any): void;
        protected _applyWidth(value: number, old: number): void;
        protected _getDefaultInsetsForBorder(): IMap;
        protected _styleBorder(styles: IMap): void;
        getColorBottom(): any;
        getColorLeft(): any;
        getColorRight(): any;
        getColorTop(): any;
        getStyleBottom(): any;
        getStyleLeft(): any;
        getStyleRight(): any;
        getStyleTop(): any;
        getWidthBottom(): any;
        getWidthLeft(): any;
        getWidthRight(): any;
        getWidthTop(): any;
        initColorBottom(value: any): any;
        initColorLeft(value: any): any;
        initColorRight(value: any): any;
        initColorTop(value: any): any;
        initStyleBottom(value: any): any;
        initStyleLeft(value: any): any;
        initStyleRight(value: any): any;
        initStyleTop(value: any): any;
        initWidthBottom(value: any): any;
        initWidthLeft(value: any): any;
        initWidthRight(value: any): any;
        initWidthTop(value: any): any;
        resetBottom(): void;
        resetColor(): void;
        resetColorBottom(): void;
        resetColorLeft(): void;
        resetColorRight(): void;
        resetColorTop(): void;
        resetLeft(): void;
        resetRight(): void;
        resetStyle(): void;
        resetStyleBottom(): void;
        resetStyleLeft(): void;
        resetStyleRight(): void;
        resetStyleTop(): void;
        resetTop(): void;
        resetWidth(): void;
        resetWidthBottom(): void;
        resetWidthLeft(): void;
        resetWidthRight(): void;
        resetWidthTop(): void;
        setBottom(widthBottom: any, styleBottom: any, colorBottom: any): void;
        setColor(colorTop: any, colorRight: any, colorBottom: any, colorLeft: any): void;
        setColorBottom(value: any): any;
        setColorLeft(value: any): any;
        setColorRight(value: any): any;
        setColorTop(value: any): any;
        setLeft(widthLeft: any, styleLeft: any, colorLeft: any): void;
        setRight(widthRight: any, styleRight: any, colorRight: any): void;
        setStyle(styleTop: any, styleRight: any, styleBottom: any, styleLeft: any): void;
        setStyleBottom(value: any): any;
        setStyleLeft(value: any): any;
        setStyleRight(value: any): any;
        setStyleTop(value: any): any;
        setTop(widthTop: any, styleTop: any, colorTop: any): void;
        setWidth(widthTop: any, widthRight: any, widthBottom: any, widthLeft: any): void;
        setWidthBottom(value: any): any;
        setWidthLeft(value: any): any;
        setWidthRight(value: any): any;
        setWidthTop(value: any): any;
        colorBottom: string;
        colorLeft: string;
        colorRight: string;
        colorTop: string;
        widthBottom: number;
        widthLeft: number;
        widthRight: number;
        widthTop: number;
    }
}
declare module qx.ui.embed {
    class AbstractIframe extends qx.ui.core.Widget {
        constructor(source: string);
        protected _applyFrameName(value: string, old: string): void;
        protected _applySource(value: string, old: string): void;
        protected _getIframeElement(): qx.html.Iframe;
        getBody(): HTMLElement;
        getDocument(): Document;
        getFrameName(): any;
        getName(): string;
        getSource(): any;
        getWindow(): Window;
        initFrameName(value: any): any;
        initSource(value: any): any;
        reload(): void;
        resetFrameName(): void;
        resetSource(): void;
        setFrameName(value: any): any;
        setSource(value: any): any;
        frameName: string;
        source: string;
    }
}
declare module qx.ui.embed {
    class Canvas extends qx.ui.core.Widget {
        constructor(canvasWidth?: number, canvasHeight?: number);
        protected _applyCanvasHeight(value: number, old: number): void;
        protected _applyCanvasWidth(value: number, old: number): void;
        protected _draw(width: number, height: number, context: any): void;
        protected _onResize(e: qx.event.type.Data): void;
        getCanvasHeight(): any;
        getCanvasWidth(): any;
        getContext2d(): any;
        getSyncDimension(): any;
        initCanvasHeight(value: any): any;
        initCanvasWidth(value: any): any;
        initSyncDimension(value: any): any;
        isSyncDimension(): boolean;
        resetCanvasHeight(): void;
        resetCanvasWidth(): void;
        resetSyncDimension(): void;
        setCanvasHeight(value: any): any;
        setCanvasWidth(value: any): any;
        setSyncDimension(value: any): any;
        toggleSyncDimension(): boolean;
        update(): void;
        canvasHeight: number;
        canvasWidth: number;
        syncDimension: boolean;
    }
}
declare module qx.ui.embed {
    class Flash extends qx.ui.core.Widget {
        constructor(source: string, id?: string);
        protected _applyAllowScriptAccess(value: any, old: any): void;
        protected _applyId(value: string, old: string): void;
        protected _applyLiveConnect(value: boolean, old: boolean): void;
        protected _applyLoop(value: boolean, old: boolean): void;
        protected _applyMayScript(value: boolean, old: boolean): void;
        protected _applyMenu(value: boolean, old: boolean): void;
        protected _applyPlay(value: boolean, old: boolean): void;
        protected _applyQuality(value: any, old: any): void;
        protected _applyScale(value: any, old: any): void;
        protected _applySource(value: string, old: string): void;
        protected _applyVariables(value: IMap, old: IMap): void;
        protected _applyWmode(value: any, old: any): void;
        protected _checkLoading(): void;
        getAllowScriptAccess(): any;
        getFlashElement(): any;
        getId(): any;
        getLiveConnect(): any;
        getLoadTimeout(): any;
        getLoop(): any;
        getMayScript(): any;
        getMenu(): any;
        getPercentLoaded(): number;
        getPlay(): any;
        getQuality(): any;
        getScale(): any;
        getSource(): any;
        getVariables(): any;
        getWmode(): any;
        initAllowScriptAccess(value: any): any;
        initId(value: any): any;
        initLiveConnect(value: any): any;
        initLoadTimeout(value: any): any;
        initLoop(value: any): any;
        initMayScript(value: any): any;
        initMenu(value: any): any;
        initPlay(value: any): any;
        initQuality(value: any): any;
        initScale(value: any): any;
        initSource(value: any): any;
        initVariables(value: any): any;
        initWmode(value: any): any;
        isLiveConnect(): boolean;
        isLoaded(): boolean;
        isLoop(): boolean;
        isMayScript(): boolean;
        isMenu(): boolean;
        isPlay(): boolean;
        resetAllowScriptAccess(): void;
        resetId(): void;
        resetLiveConnect(): void;
        resetLoadTimeout(): void;
        resetLoop(): void;
        resetMayScript(): void;
        resetMenu(): void;
        resetPlay(): void;
        resetQuality(): void;
        resetScale(): void;
        resetSource(): void;
        resetVariables(): void;
        resetWmode(): void;
        setAllowScriptAccess(value: any): any;
        setId(value: any): any;
        setLiveConnect(value: any): any;
        setLoadTimeout(value: any): any;
        setLoop(value: any): any;
        setMayScript(value: any): any;
        setMenu(value: any): any;
        setPlay(value: any): any;
        setQuality(value: any): any;
        setScale(value: any): any;
        setSource(value: any): any;
        setVariables(value: any): any;
        setWmode(value: any): any;
        toggleLiveConnect(): boolean;
        toggleLoop(): boolean;
        toggleMayScript(): boolean;
        toggleMenu(): boolean;
        togglePlay(): boolean;
        id: string;
        liveConnect: boolean;
        loadTimeout: number;
        loop: boolean;
        mayScript: boolean;
        menu: boolean;
        play: boolean;
        source: string;
        variables: IMap;
    }
}
declare module qx.ui.embed {
    class Html extends qx.ui.core.Widget {
        protected _applyOverflowX(value: any, old: any): void;
        protected _applyOverflowY(value: any, old: any): void;
        getOverflowX(): any;
        getOverflowY(): any;
        initOverflowX(value: any): any;
        initOverflowY(value: any): any;
        resetOverflow(): void;
        resetOverflowX(): void;
        resetOverflowY(): void;
        setOverflow(overflowX: any, overflowY: any): void;
        setOverflowX(value: any): any;
        setOverflowY(value: any): any;
        constructor(html: string);
        protected _applyCssClass(value: string, old: string): void;
        protected _applyHtml(value: string, old: string): void;
        getCssClass(): any;
        getHtml(): any;
        initCssClass(value: any): any;
        initHtml(value: any): any;
        resetCssClass(): void;
        resetHtml(): void;
        setCssClass(value: any): any;
        setHtml(value: any): any;
        cssClass: string;
    }
}
declare module qx.ui.embed {
    class Iframe extends qx.ui.embed.AbstractIframe {
        constructor(source: string);
        protected _applyNativeHelp(value: boolean, old: boolean): void;
        protected _applyScrollbar(value: any, old: any): void;
        protected _createBlockerElement(): any;
        protected _onIframeLoad(e: qx.event.type.Event): void;
        protected _onNativeContextMenu(e: qx.event.type.Mouse): void;
        protected _syncSourceAfterDOMMove(): void;
        block(): void;
        getNativeHelp(): any;
        getScrollbar(): any;
        initNativeHelp(value: any): any;
        initScrollbar(value: any): any;
        isNativeHelp(): boolean;
        release(): void;
        resetNativeHelp(): void;
        resetScrollbar(): void;
        setNativeHelp(value: any): any;
        setScrollbar(value: any): any;
        toggleNativeHelp(): boolean;
        nativeHelp: boolean;
    }
}
declare module qx.ui.embed {
    class ThemedIframe extends qx.ui.embed.AbstractIframe {
        protected _addRollHandling(): void;
        protected _onPointerDownForRoll(e: qx.event.type.Pointer): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _removeRollHandling(): void;
        constructor(source: any);
        protected _addRollListener(): void;
        protected _configureScrollbar(scrollbarId: string, show: boolean, containerSize: number, contentSize: number): void;
        protected _disableScollbars(): void;
        protected _getIframeSize(): any;
        protected _onIframeLoad(): void;
        protected _onIframeObserverInterval(): void;
        protected _onIframeResize(): void;
        protected _onScrollBarX(e: qx.event.type.Data): void;
        protected _onScrollBarY(e: qx.event.type.Data): void;
        protected _preventIframeScrolling(): void;
        protected _startIframeObserver(): void;
        protected _stopIframeObserver(): void;
        protected _updateCornerWidget(): void;
        protected _updateScrollbars(): void;
        getScrollbarX(): any;
        getScrollbarY(): any;
        initScrollbarX(value: any): any;
        initScrollbarY(value: any): any;
        resetScrollbar(): void;
        resetScrollbarX(): void;
        resetScrollbarY(): void;
        scrollToX(x: number): void;
        scrollToY(y: number): void;
        setScrollbar(scrollbarX: any, scrollbarY: any): void;
        setScrollbarX(value: any): any;
        setScrollbarY(value: any): any;
    }
}
declare module qx.ui.form {
    class AbstractField extends qx.ui.core.Widget implements qx.ui.form.IStringForm, qx.ui.form.IForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(value?: string);
        protected _applyMaxLength(value: number, old: number): void;
        protected _applyPlaceholder(value: string, old: string): void;
        protected _applyReadOnly(value: boolean, old: boolean): void;
        protected _applyTextAlign(value: any, old: any): void;
        protected _createInputElement(): qx.html.Input;
        protected _getPlaceholderElement(): void;
        protected _getTextSize(): IMap;
        protected _onChangeContent(e: qx.event.type.Data): void;
        protected _onChangeLocale(e: qx.event.type.Event): void;
        protected _onHtmlInput(e: qx.event.type.Data): void;
        protected _onPointerDownPlaceholder(): void;
        protected _onWebFontStatusChange(ev: qx.event.type.Data): void;
        protected _removePlaceholder(): void;
        protected _renderContentElement(innerHeight: number, element: HTMLElement): void;
        protected _showPlaceholder(): void;
        protected _syncPlaceholder(): void;
        clearTextSelection(): void;
        getFilter(): any;
        getLiveUpdate(): any;
        getMaxLength(): any;
        getPlaceholder(): any;
        getReadOnly(): any;
        getTextAlign(): any;
        getTextSelection(): any;
        getTextSelectionEnd(): any;
        getTextSelectionLength(): any;
        getTextSelectionStart(): any;
        initFilter(value: any): any;
        initLiveUpdate(value: any): any;
        initMaxLength(value: any): any;
        initPlaceholder(value: any): any;
        initReadOnly(value: any): any;
        initTextAlign(value: any): any;
        isLiveUpdate(): boolean;
        isReadOnly(): boolean;
        resetFilter(): void;
        resetLiveUpdate(): void;
        resetMaxLength(): void;
        resetPlaceholder(): void;
        resetReadOnly(): void;
        resetTextAlign(): void;
        selectAllText(): void;
        setFilter(value: any): any;
        setLiveUpdate(value: any): any;
        setMaxLength(value: any): any;
        setPlaceholder(value: any): any;
        setReadOnly(value: any): any;
        setTextAlign(value: any): any;
        setTextSelection(start: number, end: number): void;
        toggleLiveUpdate(): boolean;
        toggleReadOnly(): boolean;
        filter: RegExp;
        liveUpdate: boolean;
        maxLength: number;
        placeholder: string;
    }
}
declare module qx.ui.form {
    class AbstractSelectBox extends qx.ui.core.Widget implements qx.ui.form.IForm {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor();
        format: Function;
        maxListHeight: number;
        protected _applyMaxListHeight(value: number, old: number): void;
        protected _defaultFormat(item: any): string;
        protected _onBlur(e: qx.event.type.Focus): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onListChangeSelection(e: qx.event.type.Data): void;
        protected _onListPointerDown(e: qx.event.type.Pointer): void;
        protected _onPopupChangeVisibility(e: qx.event.type.Data): void;
        protected _onResize(e: qx.event.type.Data): void;
        close(): void;
        getFormat(): any;
        getMaxListHeight(): any;
        initFormat(value: any): any;
        initMaxListHeight(value: any): any;
        open(): void;
        resetFormat(): void;
        resetMaxListHeight(): void;
        setFormat(value: any): any;
        setMaxListHeight(value: any): any;
        toggle(): void;
    }
}
declare module qx.ui.form {
    class Button extends qx.ui.basic.Atom implements qx.ui.form.IExecutable {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        constructor(label: string, icon?: string, command?: qx.ui.core.Command);
        protected _onKeyDown(e: qx.event.type.Event): void;
        protected _onKeyUp(e: qx.event.type.Event): void;
        protected _onPointerDown(e: qx.event.type.Event): void;
        protected _onPointerOut(e: qx.event.type.Event): void;
        protected _onPointerOver(e: qx.event.type.Event): void;
        protected _onPointerUp(e: qx.event.type.Event): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        press(): void;
        release(): void;
        reset(): void;
    }
}
declare module qx.ui.form {
    class CheckBox extends qx.ui.form.ToggleButton implements qx.ui.form.IForm, qx.ui.form.IModel {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        constructor(label?: string);
    }
}
declare module qx.ui.form {
    class ComboBox extends qx.ui.form.AbstractSelectBox implements qx.ui.form.IStringForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor();
        protected _applyPlaceholder(value: string, old: string): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        protected _onTextFieldChangeValue(e: qx.event.type.Data): void;
        protected _setPreselectedItem(): void;
        clearTextSelection(): void;
        getPlaceholder(): any;
        getTextSelection(): any;
        getTextSelectionLength(): any;
        initPlaceholder(value: any): any;
        resetAllTextSelection(): void;
        resetPlaceholder(): void;
        selectAllText(): void;
        setPlaceholder(value: any): any;
        setTextSelection(start: number, end: number): void;
        placeholder: string;
    }
}
declare module qx.ui.form {
    class DateField extends qx.ui.core.Widget implements qx.ui.form.IForm, qx.ui.form.IDateForm {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor();
        dateFormat: qx.util.format.DateFormat;
        placeholder: string;
        protected _addLocaleChangeListener(): void;
        protected _applyDateFormat(value: qx.util.format.DateFormat, old: qx.util.format.DateFormat): void;
        protected _applyPlaceholder(value: string, old: string): void;
        protected _onBlur(e: qx.event.type.Focus): void;
        protected _onChangeDate(e: qx.event.type.Pointer): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onPopupChangeVisibility(e: qx.event.type.Data): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        protected _onTextFieldChangeValue(e: qx.event.type.Data): void;
        protected _setDefaultDateFormat(): void;
        close(): void;
        getDateFormat(): any;
        getPlaceholder(): any;
        initDateFormat(value: any): any;
        initPlaceholder(value: any): any;
        isEmpty(): boolean;
        open(): void;
        resetDateFormat(): void;
        resetPlaceholder(): void;
        setDateFormat(value: any): any;
        setPlaceholder(value: any): any;
        toggle(): void;
        static getDefaultDateFormatter(): qx.util.format.DateFormat;
    }
}
declare module qx.ui.form {
    class Form extends qx.core.Object {
        constructor();
        protected _createResetter(): qx.ui.form.Resetter;
        protected _createValidationManager(): qx.ui.form.validation.Manager;
        add(item: qx.ui.form.IForm, label: string, validator?: qx.ui.form.validation.AsyncValidator, name?: string, validatorContext?: any, options?: IMap): void;
        addButton(button: qx.ui.form.Button, options?: IMap): void;
        addGroupHeader(title: string, options?: IMap): void;
        getValidationManager(): qx.ui.form.validation.Manager;
        redefineResetter(): void;
        redefineResetterItem(item: qx.ui.core.Widget): void;
        remove(item: qx.ui.form.IForm): boolean;
        removeButton(button: qx.ui.form.Button): boolean;
        removeGroupHeader(title: string): boolean;
        reset(): void;
        validate(): any;
    }
}
declare module qx.ui.form {
    class HoverButton extends qx.ui.basic.Atom implements qx.ui.form.IExecutable {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        constructor(label: string, icon?: string);
        protected _onInterval(): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        getFirstInterval(): any;
        getInterval(): any;
        getMinTimer(): any;
        getTimerDecrease(): any;
        initFirstInterval(value: any): any;
        initInterval(value: any): any;
        initMinTimer(value: any): any;
        initTimerDecrease(value: any): any;
        resetFirstInterval(): void;
        resetInterval(): void;
        resetMinTimer(): void;
        resetTimerDecrease(): void;
        setFirstInterval(value: any): any;
        setInterval(value: any): any;
        setMinTimer(value: any): any;
        setTimerDecrease(value: any): any;
        firstInterval: number;
        interval: number;
        minTimer: number;
        timerDecrease: number;
    }
}
declare module qx.ui.form {
    interface IBooleanForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
    }
}
declare module qx.ui.form {
    interface IColorForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
    }
}
declare module qx.ui.form {
    interface IDateForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
    }
}
declare module qx.ui.form {
    interface IExecutable {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
    }
}
declare module qx.ui.form {
    interface IForm {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
    }
}
declare module qx.ui.form {
    interface IModel {
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
    }
}
declare module qx.ui.form {
    interface IModelSelection {
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
    }
}
declare module qx.ui.form {
    interface INumberForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
    }
}
declare module qx.ui.form {
    interface IRadioItem {
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
    }
}
declare module qx.ui.form {
    interface IRange {
        getMaximum(): number;
        getMinimum(): number;
        getPageStep(): number;
        getSingleStep(): number;
        setMaximum(max: number): void;
        setMinimum(min: number): void;
        setPageStep(step: number): void;
        setSingleStep(step: number): void;
    }
}
declare module qx.ui.form {
    interface IStringForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
    }
}
declare module qx.ui.form {
    class List extends qx.ui.core.scroll.AbstractScrollArea implements qx.ui.core.IMultiSelection, qx.ui.form.IForm, qx.ui.form.IModelSelection {
        addToSelection(item: qx.ui.core.Widget): void;
        removeFromSelection(item: qx.ui.core.Widget): void;
        selectAll(): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _getLeadItem(): qx.ui.core.Widget;
        protected _getManager(): qx.ui.core.selection.Abstract;
        protected _onSelectionChange(e: qx.event.type.Data): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        getSelectionContext(): any;
        getSelectionMode(): any;
        getSortedSelection(): qx.ui.core.Widget[];
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelectionMode(value: any): any;
        invertSelection(): void;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelection(): void;
        resetSelectionMode(): void;
        selectRange(begin: qx.ui.core.Widget, end: qx.ui.core.Widget): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelection(items: qx.ui.core.Widget[]): void;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(horizontal?: boolean);
        enableInlineFind: boolean;
        spacing: number;
        protected _applyOrientation(value: any, old: any): void;
        protected _applySpacing(value: number, old: number): void;
        protected _createListItemContainer(): qx.ui.container.Composite;
        protected _onAddChild(e: qx.event.type.Data): void;
        protected _onKeyInput(e: qx.event.type.KeyInput): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): boolean;
        protected _onRemoveChild(e: qx.event.type.Data): void;
        findItem(search: string, ignoreCase?: boolean): qx.ui.form.ListItem;
        findItemByLabelFuzzy(search: string): qx.ui.form.ListItem;
        getEnableInlineFind(): any;
        getOrientation(): any;
        getSpacing(): any;
        handleKeyPress(e: qx.event.type.KeySequence): void;
        initEnableInlineFind(value: any): any;
        initOrientation(value: any): any;
        initSpacing(value: any): any;
        isEnableInlineFind(): boolean;
        resetEnableInlineFind(): void;
        resetOrientation(): void;
        resetSpacing(): void;
        setEnableInlineFind(value: any): any;
        setOrientation(value: any): any;
        setSpacing(value: any): any;
        toggleEnableInlineFind(): boolean;
    }
}
declare module qx.ui.form {
    class ListItem extends qx.ui.basic.Atom implements qx.ui.form.IModel {
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        constructor(label: string, icon?: string, model?: string);
        protected _onPointerOut(): void;
        protected _onPointerOver(): void;
    }
}
declare module qx.ui.form {
    class MForm {
        constructor();
        protected _applyValid(value: boolean, old: boolean): void;
        getInvalidMessage(): any;
        getRequired(): any;
        getRequiredInvalidMessage(): any;
        getValid(): any;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        setInvalidMessage(value: any): any;
        setRequired(value: any): any;
        setRequiredInvalidMessage(value: any): any;
        setValid(value: any): any;
        toggleRequired(): boolean;
        toggleValid(): boolean;
    }
}
declare module qx.ui.form {
    class MModelProperty {
        protected _applyModel(value: any, old: any): void;
        getModel(): any;
        initModel(value: any): any;
        resetModel(): void;
        setModel(value: any): any;
    }
}
declare module qx.ui.form {
    class MModelSelection {
        constructor();
        getModelSelection(): qx.data.Array;
        setModelSelection(modelSelection: qx.data.Array): void;
    }
}
declare module qx.ui.form {
    class MenuButton extends qx.ui.form.Button {
        constructor(label: string, icon?: string, menu?: qx.ui.menu.Menu);
        protected _applyMenu(value: qx.ui.menu.Menu, old: qx.ui.menu.Menu): void;
        protected _onMenuChange(e: qx.event.type.Data): void;
        getMenu(): any;
        initMenu(value: any): any;
        open(selectFirst?: boolean): void;
        resetMenu(): void;
        setMenu(value: any): any;
    }
}
declare module qx.ui.form {
    class PasswordField extends qx.ui.form.TextField {
    }
}
declare module qx.ui.form {
    class RadioButton extends qx.ui.form.Button implements qx.ui.form.IRadioItem, qx.ui.form.IForm, qx.ui.form.IBooleanForm, qx.ui.form.IModel {
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        resetValue(): void;
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        constructor(label?: string);
        group: qx.ui.form.RadioGroup;
        protected _applyGroup(value: any, old: any): void;
        protected _applyValue(value: boolean, old: boolean): void;
        protected _onExecute(e: qx.event.type.Event): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        initGroup(value: any): any;
        initValue(value: any): any;
        isValue(): boolean;
        resetGroup(): void;
        toggleValue(): boolean;
    }
}
declare module qx.ui.form {
    class RadioButtonGroup extends qx.ui.core.Widget implements qx.ui.form.IForm, qx.ui.core.ISingleSelection, qx.ui.form.IModelSelection {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        static remap(members: IMap): void;
        constructor(layout: qx.ui.layout.Abstract);
        protected _applyInvalidMessage(value: string, old: string): void;
        protected _applyValid(value: boolean, old: boolean): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        getRadioGroup(): qx.ui.form.RadioGroup;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
    }
}
declare module qx.ui.form {
    class RadioGroup extends qx.core.Object implements qx.ui.core.ISingleSelection, qx.ui.form.IForm, qx.ui.form.IModelSelection {
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
        protected _onChangeSelected(e: qx.event.type.Data): void;
        constructor(varargs: qx.core.Object);
        protected _applyAllowEmptySelection(value: boolean, old: boolean): void;
        protected _applyEnabled(value: boolean, old: boolean): void;
        protected _applyInvalidMessage(value: string, old: string): void;
        protected _applyValid(value: boolean, old: boolean): void;
        protected _getItems(): qx.ui.form.IRadioItem[];
        protected _isAllowEmptySelection(): boolean;
        protected _isItemSelectable(item: qx.ui.form.IRadioItem): boolean;
        protected _onItemChangeChecked(e: qx.event.type.Data): void;
        add(varargs: qx.ui.form.IRadioItem): void;
        getAllowEmptySelection(): any;
        getChildren(): qx.ui.form.IRadioItem[];
        getItems(): qx.ui.form.IRadioItem[];
        getWrap(): any;
        initAllowEmptySelection(value: any): any;
        initEnabled(value: any): any;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        initWrap(value: any): any;
        isAllowEmptySelection(): boolean;
        isEnabled(): boolean;
        isRequired(): boolean;
        isValid(): boolean;
        isWrap(): boolean;
        remove(item: qx.ui.form.IRadioItem): void;
        resetAllowEmptySelection(): void;
        resetEnabled(): void;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        resetWrap(): void;
        selectNext(): void;
        selectPrevious(): void;
        setAllowEmptySelection(value: any): any;
        setWrap(value: any): any;
        toggleAllowEmptySelection(): boolean;
        toggleEnabled(): boolean;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        toggleWrap(): boolean;
        allowEmptySelection: boolean;
        wrap: boolean;
    }
}
declare module qx.ui.form {
    class RepeatButton extends qx.ui.form.Button {
        constructor(label: string, icon?: string);
        protected _onInterval(e: qx.event.type.Event): void;
        getFirstInterval(): any;
        getInterval(): any;
        getMinTimer(): any;
        getTimerDecrease(): any;
        initFirstInterval(value: any): any;
        initInterval(value: any): any;
        initMinTimer(value: any): any;
        initTimerDecrease(value: any): any;
        resetFirstInterval(): void;
        resetInterval(): void;
        resetMinTimer(): void;
        resetTimerDecrease(): void;
        setFirstInterval(value: any): any;
        setInterval(value: any): any;
        setMinTimer(value: any): any;
        setTimerDecrease(value: any): any;
        firstInterval: number;
        interval: number;
        minTimer: number;
        timerDecrease: number;
    }
}
declare module qx.ui.form {
    class Resetter extends qx.core.Object {
        constructor();
        protected _supportsValue(formItem: qx.core.Object): boolean;
        add(item: qx.ui.core.Widget): void;
        redefine(): void;
        redefineItem(item: qx.ui.core.Widget): void;
        remove(item: qx.ui.core.Widget): boolean;
        reset(): void;
        resetItem(item: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.form {
    class SelectBox extends qx.ui.form.AbstractSelectBox implements qx.ui.core.ISingleSelection, qx.ui.form.IModelSelection {
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
        protected _onChangeSelected(e: qx.event.type.Data): void;
        constructor();
        protected _getItems(): qx.ui.form.ListItem[];
        protected _isAllowEmptySelection(): boolean;
        protected _onKeyInput(e: qx.event.type.KeyInput): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        protected _onTap(e: qx.event.type.Pointer): void;
    }
}
declare module qx.ui.form {
    class Slider extends qx.ui.core.Widget implements qx.ui.form.IForm, qx.ui.form.INumberForm, qx.ui.form.IRange {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        getMaximum(): number;
        getMinimum(): number;
        getPageStep(): number;
        getSingleStep(): number;
        setMaximum(max: number): void;
        setMinimum(min: number): void;
        setPageStep(step: number): void;
        setSingleStep(step: number): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(orientation?: string);
        protected _applyKnobFactor(value: number, old: number): void;
        protected _applyMaximum(value: number, old: number): void;
        protected _applyMinimum(value: number, old: number): void;
        protected _applyOrientation(value: any, old: any): void;
        protected _applyValue(value: any, old: any): void;
        protected _fireValue(): void;
        protected _onInterval(e: qx.event.type.Event): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onPointerDown(e: qx.event.type.Pointer): void;
        protected _onPointerMove(e: qx.event.type.Pointer): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        protected _onPointerUp(e: qx.event.type.Pointer): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _onUpdate(e: qx.event.type.Data): void;
        protected _positionToValue(position: number): number;
        protected _setKnobPosition(position: number): void;
        protected _updateKnobPosition(): void;
        protected _updateKnobSize(): void;
        protected _valueToPosition(value: number): number;
        getKnobFactor(): any;
        getOrientation(): any;
        initKnobFactor(value: any): any;
        initMaximum(value: any): any;
        initMinimum(value: any): any;
        initOrientation(value: any): any;
        initPageStep(value: any): any;
        initSingleStep(value: any): any;
        initValue(value: any): any;
        resetKnobFactor(): void;
        resetMaximum(): void;
        resetMinimum(): void;
        resetOrientation(): void;
        resetPageStep(): void;
        resetSingleStep(): void;
        setKnobFactor(value: any): any;
        setOrientation(value: any): any;
        slideBack(): void;
        slideBy(offset: number, duration: number): void;
        slideForward(): void;
        slidePageBack(duration: number): void;
        slidePageForward(duration: number): void;
        slideTo(value: number, duration: number): void;
        slideToBegin(duration: number): void;
        slideToEnd(duration: number): void;
        stopSlideAnimation(): void;
        updatePosition(value: number): void;
        knobFactor: number;
        pageStep: number;
        singleStep: number;
        value: any;
    }
}
declare module qx.ui.form {
    class Spinner extends qx.ui.core.Widget implements qx.ui.form.INumberForm, qx.ui.form.IRange, qx.ui.form.IForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        getMaximum(): number;
        getMinimum(): number;
        getPageStep(): number;
        getSingleStep(): number;
        setMaximum(max: number): void;
        setMinimum(min: number): void;
        setPageStep(step: number): void;
        setSingleStep(step: number): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(min?: number, value?: number, max?: number);
        protected _applyEditable(value: boolean, old: boolean): void;
        protected _applyMaximum(value: number, old: number): void;
        protected _applyMinimum(value: number, old: number): void;
        protected _applyNumberFormat(value: boolean, old: boolean): void;
        protected _applyValue(value: number, old: number): void;
        protected _applyWrap(value: boolean, old: boolean): void;
        protected _checkValue(value: any): boolean;
        protected _countDown(): void;
        protected _countUp(): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _getFilterRegExp(): RegExp;
        protected _onChangeLocale(ev: qx.event.type.Event): void;
        protected _onChangeNumberFormat(ev: qx.event.type.Event): void;
        protected _onKeyDown(e: qx.event.type.KeySequence): void;
        protected _onKeyUp(e: qx.event.type.KeySequence): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _onTextChange(e: qx.event.type.Event): void;
        protected _updateButtons(): void;
        getEditable(): any;
        getNumberFormat(): any;
        getWrap(): any;
        gotoValue(value: number): number;
        initEditable(value: any): any;
        initMaximum(value: any): any;
        initMinimum(value: any): any;
        initNumberFormat(value: any): any;
        initPageStep(value: any): any;
        initSingleStep(value: any): any;
        initValue(value: any): any;
        initWrap(value: any): any;
        isEditable(): boolean;
        isWrap(): boolean;
        resetEditable(): void;
        resetMaximum(): void;
        resetMinimum(): void;
        resetNumberFormat(): void;
        resetPageStep(): void;
        resetSingleStep(): void;
        resetWrap(): void;
        setEditable(value: any): any;
        setNumberFormat(value: any): any;
        setWrap(value: any): any;
        toggleEditable(): boolean;
        toggleWrap(): boolean;
        editable: boolean;
        numberFormat: qx.util.format.NumberFormat;
        pageStep: number;
        singleStep: number;
        wrap: boolean;
    }
}
declare module qx.ui.form {
    class SplitButton extends qx.ui.core.Widget implements qx.ui.form.IExecutable {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        constructor(label: string, icon?: string, menu?: qx.ui.menu.Menu, command?: qx.ui.core.Command);
        protected _applyIcon(value: string, old: string): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyMenu(value: qx.ui.menu.Menu, old: qx.ui.menu.Menu): void;
        protected _applyShow(value: any, old: any): void;
        protected _onButtonExecute(e: qx.event.type.Event): void;
        protected _onChangeMenuVisibility(e: qx.event.type.Data): void;
        protected _onKeyDown(e: qx.event.type.KeySequence): void;
        protected _onKeyUp(e: qx.event.type.KeySequence): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        getIcon(): any;
        getLabel(): any;
        getMenu(): any;
        getShow(): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initMenu(value: any): any;
        initShow(value: any): any;
        resetIcon(): void;
        resetLabel(): void;
        resetMenu(): void;
        resetShow(): void;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setMenu(value: any): any;
        setShow(value: any): any;
        icon: string;
        label: string;
    }
}
declare module qx.ui.form {
    class TextArea extends qx.ui.form.AbstractField {
        constructor(value?: string);
        protected _applyAutoSize(value: boolean, old: boolean): void;
        protected _applyMinimalLineHeight(value: number, old: number): void;
        protected _applyWrap(value: boolean, old: boolean): void;
        protected _getAreaHeight(): number;
        protected _getScrolledAreaHeight(): number;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _setAreaHeight(height: number): void;
        getAutoSize(): any;
        getMinimalLineHeight(): any;
        getSingleStep(): any;
        getWrap(): any;
        initAutoSize(value: any): any;
        initMinimalLineHeight(value: any): any;
        initSingleStep(value: any): any;
        initWrap(value: any): any;
        isAutoSize(): boolean;
        isWrap(): boolean;
        resetAutoSize(): void;
        resetMinimalLineHeight(): void;
        resetSingleStep(): void;
        resetWrap(): void;
        setAutoSize(value: any): any;
        setMinimalLineHeight(value: any): any;
        setSingleStep(value: any): any;
        setWrap(value: any): any;
        toggleAutoSize(): boolean;
        toggleWrap(): boolean;
        autoSize: boolean;
        minimalLineHeight: number;
        singleStep: number;
        wrap: boolean;
    }
}
declare module qx.ui.form {
    class TextField extends qx.ui.form.AbstractField {
    }
}
declare module qx.ui.form {
    class ToggleButton extends qx.ui.basic.Atom implements qx.ui.form.IBooleanForm, qx.ui.form.IExecutable, qx.ui.form.IRadioItem {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        getGroup(): qx.ui.form.RadioGroup;
        setGroup(value: qx.ui.form.RadioGroup): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        constructor(label: string, icon: string);
        group: qx.ui.form.RadioGroup;
        triState: boolean;
        protected _applyGroup(value: any, old: any): void;
        protected _applyTriState(value: boolean, old: boolean): void;
        protected _applyValue(value: boolean, old: boolean): void;
        protected _onExecute(e: qx.event.type.Event): void;
        protected _onKeyDown(e: qx.event.type.Event): void;
        protected _onKeyUp(e: qx.event.type.Event): void;
        protected _onPointerDown(e: qx.event.type.Pointer): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        protected _onPointerUp(e: qx.event.type.Pointer): void;
        getTriState(): any;
        initGroup(value: any): any;
        initTriState(value: any): any;
        initValue(value: any): any;
        isTriState(): boolean;
        isValue(): boolean;
        resetGroup(): void;
        resetTriState(): void;
        setTriState(value: any): any;
        toggleTriState(): boolean;
        toggleValue(): boolean;
    }
}
declare module qx.ui.form {
    class VirtualComboBox extends qx.ui.form.core.AbstractVirtualBox implements qx.ui.form.IStringForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor(model: any);
        defaultFormat: Function;
        placeholder: string;
        protected _applyPlaceholder(value: string, old: string): void;
        clearTextSelection(): void;
        getDefaultFormat(): any;
        getPlaceholder(): any;
        getTextSelection(): any;
        getTextSelectionLength(): any;
        initDefaultFormat(value: any): any;
        initPlaceholder(value: any): any;
        initValue(value: any): any;
        resetAllTextSelection(): void;
        resetDefaultFormat(): void;
        resetPlaceholder(): void;
        selectAllText(): void;
        setDefaultFormat(value: any): any;
        setPlaceholder(value: any): any;
        setTextSelection(start: number, end: number): void;
    }
}
declare module qx.ui.form {
    class VirtualSelectBox extends qx.ui.form.core.AbstractVirtualBox implements qx.data.controller.ISelection {
        getSelection(): qx.data.IListData;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
        constructor(model: any);
        protected _addBindings(): void;
        protected _applySelection(value: qx.data.Array, old: qx.data.Array): void;
        protected _onPointerOut(event: qx.event.type.Pointer): void;
        protected _onPointerOver(event: qx.event.type.Pointer): void;
        protected _removeBindings(): void;
        initSelection(value: any): any;
    }
}
declare module qx.ui.form.core {
    class AbstractVirtualBox extends qx.ui.core.Widget implements qx.ui.form.IForm {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(model?: qx.data.Array);
        protected _applyDelegate(value: any, old: any): void;
        protected _applyIconOptions(value: any, old: any): void;
        protected _applyIconPath(value: string, old: string): void;
        protected _applyLabelOptions(value: any, old: any): void;
        protected _applyLabelPath(value: string, old: string): void;
        protected _applyMaxListHeight(value: number, old: number): void;
        protected _applyModel(value: qx.data.Array, old: qx.data.Array): void;
        protected _applyRowHeight(value: number, old: number): void;
        protected _beforeClose(): void;
        protected _beforeOpen(): void;
        protected _getAction(event: qx.event.type.KeySequence): any;
        protected _getBindPath(source: string, path?: string): string;
        protected _handleKeyboard(event: qx.event.type.KeySequence): void;
        protected _handlePointer(event: qx.event.type.Roll): void;
        protected _isModifierPressed(event: qx.event.type.KeySequence): boolean;
        protected _onBlur(event: qx.event.type.Focus): void;
        protected _onPopupChangeVisibility(event: qx.event.type.Data): void;
        protected _onResize(event: qx.event.type.Data): void;
        close(): void;
        getDelegate(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getItemHeight(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        getMaxListHeight(): any;
        getModel(): any;
        initDelegate(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initItemHeight(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        initMaxListHeight(value: any): any;
        initModel(value: any): any;
        open(): void;
        refresh(): void;
        resetDelegate(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetItemHeight(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        resetMaxListHeight(): void;
        resetModel(): void;
        setDelegate(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setItemHeight(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        setMaxListHeight(value: any): any;
        setModel(value: any): any;
        toggle(): void;
        itemHeight: number;
        maxListHeight: number;
    }
}
declare module qx.ui.form.core {
    class VirtualDropDownList extends qx.ui.popup.Popup {
        constructor(target: qx.ui.form.core.AbstractVirtualBox);
        protected _applySelection(value: qx.data.Array, old: qx.data.Array): void;
        protected _handleKeyboard(event: qx.event.type.KeySequence): void;
        protected _handlePointer(event: qx.event.type.Mouse): void;
        protected _onChangeDelegate(event: qx.event.type.Data): void;
        protected _onChangeModel(event: qx.event.type.Data): void;
        protected _onListChangeSelection(event: qx.event.type.Data): void;
        close(): void;
        getSelection(): any;
        initSelection(value: any): any;
        open(): void;
        resetSelection(): void;
        setPreselected(modelItem: any): void;
        setSelection(value: any): any;
    }
}
declare module qx.ui.form.renderer {
    class AbstractRenderer extends qx.ui.core.Widget implements qx.ui.form.renderer.IFormRenderer {
        addButton(button: qx.ui.form.Button, options?: IMap): void;
        addItems(items: qx.ui.core.Widget[], names: string[], title?: string, itemsOptions?: qx.data.Array, headerOptions?: IMap): void;
        constructor(form: qx.ui.form.Form);
        protected _connectVisibility(item: qx.ui.core.Widget, label: qx.ui.basic.Label): void;
        protected _createLabelText(name: string, item: qx.ui.form.IForm): string;
        protected _onChangeLocale(e: qx.event.type.Event): void;
        protected _onFormChange(): void;
        protected _render(): void;
    }
}
declare module qx.ui.form.renderer {
    class Double extends qx.ui.form.renderer.AbstractRenderer {
        constructor(form: any);
        protected _createHeader(title: string): qx.ui.basic.Label;
        protected _createLabel(name: string, item: qx.ui.core.Widget): qx.ui.basic.Label;
        getLayout(): qx.ui.layout.Grid;
    }
}
declare module qx.ui.form.renderer {
    interface IFormRenderer {
        addButton(button: qx.ui.form.Button, options?: IMap): void;
        addItems(items: qx.ui.core.Widget[], names: string[], title?: string, itemsOptions?: qx.data.Array, headerOptions?: IMap): void;
    }
}
declare module qx.ui.form.renderer {
    class Single extends qx.ui.form.renderer.AbstractRenderer {
        constructor(form: any);
        protected _createHeader(title: string): qx.ui.basic.Label;
        protected _createLabel(name: string, item: qx.ui.core.Widget): qx.ui.basic.Label;
        getLayout(): qx.ui.layout.Grid;
    }
}
declare module qx.ui.form.renderer {
    class SinglePlaceholder extends qx.ui.form.renderer.Single implements qx.ui.form.renderer.IFormRenderer {
        addButton(button: qx.ui.form.Button, options?: IMap): void;
        addItems(items: qx.ui.core.Widget[], names: string[], title?: string, itemsOptions?: qx.data.Array, headerOptions?: IMap): void;
    }
}
declare module qx.ui.form.validation {
    class AsyncValidator extends qx.core.Object {
        constructor(validator: Function);
        setValid(valid: boolean, message?: string): void;
    }
}
declare module qx.ui.form.validation {
    class Manager extends qx.core.Object {
        constructor();
        protected _showToolTip(valid: boolean): void;
        add(formItem: qx.ui.core.Widget, validator: qx.ui.form.validation.AsyncValidator, context?: any): void;
        getContext(): any;
        getInvalidFormItems(): qx.data.Array;
        getInvalidMessage(): any;
        getInvalidMessages(): string[];
        getItems(): qx.data.Array;
        getRequiredFieldMessage(): any;
        getValid(): any;
        getValidator(): any;
        initContext(value: any): any;
        initInvalidMessage(value: any): any;
        initRequiredFieldMessage(value: any): any;
        initValidator(value: any): any;
        isValid(): any;
        remove(formItem: qx.ui.core.Widget): qx.ui.core.Widget;
        reset(): void;
        resetContext(): void;
        resetInvalidMessage(): void;
        resetRequiredFieldMessage(): void;
        resetValidator(): void;
        setContext(value: any): any;
        setInvalidMessage(value: any): any;
        setRequiredFieldMessage(value: any): any;
        setValidator(value: any): any;
        validate(): any;
        invalidMessage: string;
        requiredFieldMessage: string;
        validator: any;
    }
}
declare module qx.ui.groupbox {
    class CheckGroupBox extends qx.ui.groupbox.GroupBox implements qx.ui.form.IExecutable, qx.ui.form.IBooleanForm, qx.ui.form.IModel {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        protected _onExecute(e: qx.event.type.Event): void;
        protected _onRadioChangeValue(e: qx.event.type.Data): void;
    }
}
declare module qx.ui.groupbox {
    class GroupBox extends qx.ui.core.Widget implements qx.ui.form.IForm {
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor(legend?: string, icon?: string);
        protected _applyLegendPosition(e: any): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _repositionFrame(): void;
        getIcon(): string;
        getLegend(): string;
        getLegendPosition(): any;
        initLegendPosition(value: any): any;
        resetLegendPosition(): void;
        setIcon(icon: string): void;
        setLegend(legend: string): void;
        setLegendPosition(value: any): any;
    }
}
declare module qx.ui.groupbox {
    class RadioGroupBox extends qx.ui.groupbox.GroupBox implements qx.ui.form.IRadioItem, qx.ui.form.IExecutable, qx.ui.form.IBooleanForm, qx.ui.form.IModel {
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        resetValue(): void;
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        protected _onExecute(e: qx.event.type.Event): void;
        protected _onRadioChangeValue(e: qx.event.type.Data): void;
        getLabel(): string;
    }
}
declare module qx.ui.indicator {
    class ProgressBar extends qx.ui.container.Composite {
        constructor(value?: number, maximum?: number);
        protected _changeProgress(value: number): void;
        getMaximum(): number;
        getValue(): number;
        setMaximum(value: number): any;
        setValue(value: number): any;
    }
}
declare module qx.ui.layout {
    class Abstract extends qx.core.Object {
        protected _applyLayoutChange(): void;
        protected _clearSeparators(): void;
        protected _computeSizeHint(): IMap;
        protected _getLayoutChildren(): qx.data.Array;
        protected _getWidget(): qx.ui.core.Widget;
        protected _renderSeparator(separator: qx.ui.decoration.IDecorator, bounds: IMap): void;
        connectToWidget(widget: qx.ui.core.Widget): void;
        getHeightForWidth(width: number): number;
        getSizeHint(): any;
        hasHeightForWidth(): boolean;
        invalidateChildrenCache(): void;
        invalidateLayoutCache(): void;
        renderLayout(availWidth: number, availHeight: number, padding: IMap): void;
        verifyLayoutProperty(item: any, name: any, value: any): void;
    }
}
declare module qx.ui.layout {
    class Atom extends qx.ui.layout.Abstract {
        getCenter(): any;
        getGap(): any;
        getIconPosition(): any;
        initCenter(value: any): any;
        initGap(value: any): any;
        initIconPosition(value: any): any;
        isCenter(): boolean;
        resetCenter(): void;
        resetGap(): void;
        resetIconPosition(): void;
        setCenter(value: any): any;
        setGap(value: any): any;
        setIconPosition(value: any): any;
        toggleCenter(): boolean;
        center: boolean;
        gap: number;
    }
}
declare module qx.ui.layout {
    class Basic extends qx.ui.layout.Abstract {
    }
}
declare module qx.ui.layout {
    class Canvas extends qx.ui.layout.Abstract {
        getDesktop(): any;
        initDesktop(value: any): any;
        isDesktop(): boolean;
        resetDesktop(): void;
        setDesktop(value: any): any;
        toggleDesktop(): boolean;
        desktop: boolean;
    }
}
declare module qx.ui.layout {
    class Dock extends qx.ui.layout.Abstract {
        constructor(spacingX?: number, spacingY?: number, separatorX?: qx.ui.decoration.IDecorator, separatorY?: qx.ui.decoration.IDecorator);
        protected _applySort(value: any, old: any): void;
        protected _getSeparatorWidths(): IMap;
        getConnectSeparators(): any;
        getSeparatorX(): any;
        getSeparatorY(): any;
        getSort(): any;
        getSpacingX(): any;
        getSpacingY(): any;
        initConnectSeparators(value: any): any;
        initSeparatorX(value: any): any;
        initSeparatorY(value: any): any;
        initSort(value: any): any;
        initSpacingX(value: any): any;
        initSpacingY(value: any): any;
        isConnectSeparators(): boolean;
        resetConnectSeparators(): void;
        resetSeparatorX(): void;
        resetSeparatorY(): void;
        resetSort(): void;
        resetSpacingX(): void;
        resetSpacingY(): void;
        setConnectSeparators(value: any): any;
        setSeparatorX(value: any): any;
        setSeparatorY(value: any): any;
        setSort(value: any): any;
        setSpacingX(value: any): any;
        setSpacingY(value: any): any;
        toggleConnectSeparators(): boolean;
        connectSeparators: boolean;
        separatorX: qx.ui.decoration.Decorator;
        separatorY: qx.ui.decoration.Decorator;
        spacingX: number;
        spacingY: number;
    }
}
declare module qx.ui.layout {
    class Flow extends qx.ui.layout.Abstract {
        constructor(spacingX?: number, spacingY?: number, alignX?: string);
        getAlignX(): any;
        getAlignY(): any;
        getLastLineChildren(width: number): qx.data.Array;
        getReversed(): any;
        getSpacingX(): any;
        getSpacingY(): any;
        initAlignX(value: any): any;
        initAlignY(value: any): any;
        initReversed(value: any): any;
        initSpacingX(value: any): any;
        initSpacingY(value: any): any;
        isReversed(): boolean;
        resetAlignX(): void;
        resetAlignY(): void;
        resetReversed(): void;
        resetSpacingX(): void;
        resetSpacingY(): void;
        setAlignX(value: any): any;
        setAlignY(value: any): any;
        setReversed(value: any): any;
        setSpacingX(value: any): any;
        setSpacingY(value: any): any;
        toggleReversed(): boolean;
        reversed: boolean;
        spacingX: number;
        spacingY: number;
    }
}
declare module qx.ui.layout {
    class Grid extends qx.ui.layout.Abstract {
        constructor(spacingX?: number, spacingY?: number);
        protected _fixHeightsRowSpan(rowHeights: IMap[]): void;
        protected _fixWidthsColSpan(colWidths: IMap[]): void;
        protected _getColumnFlexOffsets(width: number): number[];
        protected _getColWidths(): IMap[];
        protected _getRowFlexOffsets(height: number): number[];
        protected _getRowHeights(): IMap[];
        protected _setColumnData(column: number, key: string, value: any): void;
        protected _setRowData(row: number, key: string, value: any): void;
        getCellAlign(row: number, column: number): IMap;
        getCellWidget(row: number, column: number): any;
        getColumnAlign(column: number): IMap;
        getColumnCount(): number;
        getColumnFlex(column: number): number;
        getColumnMaxWidth(column: number): number;
        getColumnMinWidth(column: number): number;
        getColumnWidth(column: number): number;
        getRowAlign(row: number): IMap;
        getRowCount(): number;
        getRowFlex(row: number): number;
        getRowHeight(row: number): number;
        getRowMaxHeight(row: number): number;
        getRowMinHeight(row: number): number;
        getSpacingX(): any;
        getSpacingY(): any;
        initSpacingX(value: any): any;
        initSpacingY(value: any): any;
        resetSpacingX(): void;
        resetSpacingY(): void;
        setColumnAlign(column: number, hAlign: string, vAlign: string): qx.ui.layout.Grid;
        setColumnFlex(column: number, flex: number): qx.ui.layout.Grid;
        setColumnMaxWidth(column: number, maxWidth: number): qx.ui.layout.Grid;
        setColumnMinWidth(column: number, minWidth: number): qx.ui.layout.Grid;
        setColumnWidth(column: number, width: number): qx.ui.layout.Grid;
        setRowAlign(row: number, hAlign: string, vAlign: string): qx.ui.layout.Grid;
        setRowFlex(row: number, flex: number): qx.ui.layout.Grid;
        setRowHeight(row: number, height: number): qx.ui.layout.Grid;
        setRowMaxHeight(row: number, maxHeight: number): qx.ui.layout.Grid;
        setRowMinHeight(row: number, minHeight: number): qx.ui.layout.Grid;
        setSpacing(spacing: number): qx.ui.layout.Grid;
        setSpacingX(value: any): any;
        setSpacingY(value: any): any;
        spacingX: number;
        spacingY: number;
    }
}
declare module qx.ui.layout {
    class Grow extends qx.ui.layout.Abstract {
    }
}
declare module qx.ui.layout {
    class HBox extends qx.ui.layout.Abstract {
        constructor(spacing?: number, alignX?: string, separator?: qx.ui.decoration.IDecorator);
        protected _applyReversed(value: boolean, old: boolean): void;
        getAlignX(): any;
        getAlignY(): any;
        getReversed(): any;
        getSeparator(): any;
        getSpacing(): any;
        initAlignX(value: any): any;
        initAlignY(value: any): any;
        initReversed(value: any): any;
        initSeparator(value: any): any;
        initSpacing(value: any): any;
        isReversed(): boolean;
        resetAlignX(): void;
        resetAlignY(): void;
        resetReversed(): void;
        resetSeparator(): void;
        resetSpacing(): void;
        setAlignX(value: any): any;
        setAlignY(value: any): any;
        setReversed(value: any): any;
        setSeparator(value: any): any;
        setSpacing(value: any): any;
        toggleReversed(): boolean;
        reversed: boolean;
        separator: qx.ui.decoration.Decorator;
        spacing: number;
    }
}
declare module qx.ui.layout {
    class LineSizeIterator {
        constructor(children: qx.ui.core.Widget[], spacing: number);
        computeNextLine(availWidth: number): IMap;
        hasMoreLines(): boolean;
    }
}
declare module qx.ui.layout {
    class Util {
        static arrangeIdeals(beginMin: number, beginIdeal: number, beginMax: number, endMin: number, endIdeal: number, endMax: number): IMap;
        static collapseMargins(varargs: any): number;
        static computeFlexOffsets(flexibles: IMap, avail: number, used: number): IMap;
        static computeHorizontalAlignOffset(align: string, width: number, availWidth: number, marginLeft?: number, marginRight?: number): number;
        static computeHorizontalGaps(children: qx.data.Array, spacing?: number, collapse?: boolean): number;
        static computeHorizontalSeparatorGaps(children: qx.ui.core.LayoutItem[], spacing: number, separator: qx.ui.decoration.IDecorator): number;
        static computeVerticalAlignOffset(align: string, height: number, availHeight: number, marginTop?: number, marginBottom?: number): number;
        static computeVerticalGaps(children: qx.data.Array, spacing?: number, collapse?: boolean): number;
        static computeVerticalSeparatorGaps(children: qx.ui.core.LayoutItem[], spacing: number, separator: qx.ui.decoration.IDecorator): number;
    }
}
declare module qx.ui.layout {
    class VBox extends qx.ui.layout.Abstract {
        constructor(spacing?: number, alignY?: string, separator?: qx.ui.decoration.IDecorator);
        protected _applyReversed(value: boolean, old: boolean): void;
        getAlignX(): any;
        getAlignY(): any;
        getReversed(): any;
        getSeparator(): any;
        getSpacing(): any;
        initAlignX(value: any): any;
        initAlignY(value: any): any;
        initReversed(value: any): any;
        initSeparator(value: any): any;
        initSpacing(value: any): any;
        isReversed(): boolean;
        resetAlignX(): void;
        resetAlignY(): void;
        resetReversed(): void;
        resetSeparator(): void;
        resetSpacing(): void;
        setAlignX(value: any): any;
        setAlignY(value: any): any;
        setReversed(value: any): any;
        setSeparator(value: any): any;
        setSpacing(value: any): any;
        toggleReversed(): boolean;
        reversed: boolean;
        separator: qx.ui.decoration.Decorator;
        spacing: number;
    }
}
declare module qx.ui.list {
    class List extends qx.ui.virtual.core.Scroller implements qx.data.controller.ISelection {
        getSelection(): qx.data.IListData;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
        protected _applyDefaultSelection(): void;
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelection(value: qx.data.Array, old: qx.data.Array): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _initSelectionManager(): void;
        protected _onChangeSelection(e: qx.event.type.Data): void;
        protected _onManagerChangeSelection(e: qx.event.type.Data): void;
        protected _updateSelection(): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelectionMode(): any;
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelection(value: any): any;
        initSelectionMode(value: any): any;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelectionMode(): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        constructor(model: any);
        protected _applyDelegate(value: any, old: any): void;
        protected _applyGroupLabelOptions(value: any, old: any): void;
        protected _applyGroupLabelPath(value: string, old: string): void;
        protected _applyIconOptions(value: any, old: any): void;
        protected _applyIconPath(value: string, old: string): void;
        protected _applyLabelOptions(value: any, old: any): void;
        protected _applyLabelPath(value: string, old: string): void;
        protected _applyModel(value: qx.data.IListData, old: qx.data.IListData): void;
        protected _applyRowHeight(value: number, old: number): void;
        protected _getDataFromRow(row: number): any;
        protected _getLookupTable(): qx.data.Array;
        protected _getSelectables(): any;
        protected _init(): void;
        protected _initBackground(): void;
        protected _initLayer(): void;
        protected _isGroup(row: number): boolean;
        protected _lookup(row: number): number;
        protected _lookupGroup(row: number): number;
        protected _onModelChange(e: qx.event.type.Data): void;
        protected _onResize(e: qx.event.type.Data): void;
        protected _reverseLookup(index: number): number;
        protected _runDelegateFilter(model: qx.data.IListData): void;
        protected _runDelegateGroup(model: qx.data.IListData): void;
        protected _runDelegateSorter(model: qx.data.IListData): void;
        getAutoGrouping(): any;
        getDelegate(): any;
        getGroupLabelOptions(): any;
        getGroupLabelPath(): any;
        getGroups(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getItemHeight(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        getModel(): any;
        initAutoGrouping(value: any): any;
        initDelegate(value: any): any;
        initGroupLabelOptions(value: any): any;
        initGroupLabelPath(value: any): any;
        initGroups(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initItemHeight(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        initModel(value: any): any;
        isAutoGrouping(): boolean;
        refresh(): void;
        resetAutoGrouping(): void;
        resetDelegate(): void;
        resetGroupLabelOptions(): void;
        resetGroupLabelPath(): void;
        resetGroups(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetItemHeight(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        resetModel(): void;
        setAutoGrouping(value: any): any;
        setDelegate(value: any): any;
        setGroupLabelOptions(value: any): any;
        setGroupLabelPath(value: any): any;
        setGroups(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setItemHeight(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        setModel(value: any): any;
        toggleAutoGrouping(): boolean;
        autoGrouping: boolean;
        groupLabelPath: string;
        iconPath: string;
        itemHeight: number;
        labelPath: string;
    }
}
declare module qx.ui.list.core {
    interface IListDelegate {
        bindGroupItem(controller: qx.ui.list.core.MWidgetController, item: qx.ui.core.Widget, id: number): void;
        bindItem(controller: qx.ui.list.core.MWidgetController, item: qx.ui.core.Widget, id: number): void;
        configureGroupItem(item: qx.ui.core.Widget): void;
        configureItem(item: qx.ui.core.Widget): void;
        createGroupItem(): qx.ui.core.Widget;
        createItem(): qx.ui.core.Widget;
        filter(data: any): boolean;
        group(data: any): any;
        onPool(item: qx.ui.core.Widget): void;
        sorter(a: any, b: any): number;
    }
}
declare module qx.ui.list.core {
    class MWidgetController {
        constructor();
        protected _bindGroupItem(item: qx.ui.core.Widget, index: number): void;
        protected _bindItem(item: qx.ui.core.Widget, index: number): void;
        protected _configureGroupItem(item: qx.ui.core.Widget): void;
        protected _configureItem(item: qx.ui.core.Widget): void;
        protected _removeBindingsFrom(item: qx.ui.core.Widget): void;
        bindDefaultProperties(item: qx.ui.core.Widget, index: number): void;
        bindProperty(sourcePath: any, targetProperty: string, options: any, targetWidget: qx.ui.core.Widget, index: number): void;
        bindPropertyReverse(targetPath: any, sourceProperty: string, options: any, sourceWidget: qx.ui.core.Widget, index: number): void;
        getDelegate(): any;
        getGroupLabelOptions(): any;
        getGroupLabelPath(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        initDelegate(value: any): any;
        initGroupLabelOptions(value: any): any;
        initGroupLabelPath(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        removeBindings(): void;
        resetDelegate(): void;
        resetGroupLabelOptions(): void;
        resetGroupLabelPath(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        setDelegate(value: any): any;
        setGroupLabelOptions(value: any): any;
        setGroupLabelPath(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        groupLabelPath: string;
        iconPath: string;
        labelPath: string;
    }
}
declare module qx.ui.list.provider {
    interface IListProvider {
        createGroupRenderer(): any;
        createItemRenderer(): any;
        createLayer(): qx.ui.virtual.layer.Abstract;
        isSelectable(row: number): boolean;
        removeBindings(): void;
        setDelegate(delegate: any): void;
        setIconOptions(options: IMap): void;
        setIconPath(path: string): void;
        setLabelOptions(options: IMap): void;
        setLabelPath(path: string): void;
        styleSelectabled(row: number): void;
        styleUnselectabled(row: number): void;
    }
}
declare module qx.ui.list.provider {
    class WidgetProvider extends qx.core.Object implements qx.ui.virtual.core.IWidgetCellProvider, qx.ui.list.provider.IListProvider {
        getCellWidget(row: number, column: number): qx.ui.core.LayoutItem;
        poolCellWidget(widget: qx.ui.core.LayoutItem): void;
        createGroupRenderer(): any;
        createItemRenderer(): any;
        createLayer(): qx.ui.virtual.layer.Abstract;
        isSelectable(row: number): boolean;
        removeBindings(): void;
        setDelegate(delegate: any): void;
        setIconOptions(options: IMap): void;
        setIconPath(path: string): void;
        setLabelOptions(options: IMap): void;
        setLabelPath(path: string): void;
        styleSelectabled(row: number): void;
        styleUnselectabled(row: number): void;
        protected _bindGroupItem(item: qx.ui.core.Widget, index: number): void;
        protected _bindItem(item: qx.ui.core.Widget, index: number): void;
        protected _configureGroupItem(item: qx.ui.core.Widget): void;
        protected _configureItem(item: qx.ui.core.Widget): void;
        protected _removeBindingsFrom(item: qx.ui.core.Widget): void;
        bindDefaultProperties(item: qx.ui.core.Widget, index: number): void;
        bindProperty(sourcePath: any, targetProperty: string, options: any, targetWidget: qx.ui.core.Widget, index: number): void;
        bindPropertyReverse(targetPath: any, sourceProperty: string, options: any, sourceWidget: qx.ui.core.Widget, index: number): void;
        getDelegate(): any;
        getGroupLabelOptions(): any;
        getGroupLabelPath(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        initDelegate(value: any): any;
        initGroupLabelOptions(value: any): any;
        initGroupLabelPath(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        resetDelegate(): void;
        resetGroupLabelOptions(): void;
        resetGroupLabelPath(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        setGroupLabelOptions(value: any): any;
        setGroupLabelPath(value: any): any;
        constructor(list: qx.ui.list.List);
        protected _onChangeDelegate(event: qx.event.type.Data): void;
        protected _onGroupItemCreated(event: qx.event.type.Data): void;
        protected _onItemCreated(event: qx.event.type.Data): void;
        protected _onPool(item: qx.ui.core.Widget): void;
        protected _styleSelectabled(widget: qx.ui.core.Widget): void;
        protected _styleUnselectabled(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.menu {
    class AbstractButton extends qx.ui.core.Widget implements qx.ui.form.IExecutable {
        execute(): void;
        getCommand(): qx.ui.core.Command;
        setCommand(command: qx.ui.core.Command): void;
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        initCommand(value: any): any;
        resetCommand(): void;
        constructor();
        protected _applyIcon(value: string, old: string): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyMenu(value: qx.ui.menu.Menu, old: qx.ui.menu.Menu): void;
        protected _applyShowCommandLabel(value: boolean, old: boolean): void;
        protected _onChangeCommand(e: qx.event.type.Data): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        getChildrenSizes(): qx.data.Array;
        getIcon(): any;
        getLabel(): any;
        getMenu(): any;
        getShowCommandLabel(): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initMenu(value: any): any;
        initShowCommandLabel(value: any): any;
        isShowCommandLabel(): boolean;
        resetIcon(): void;
        resetLabel(): void;
        resetMenu(): void;
        resetShowCommandLabel(): void;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setMenu(value: any): any;
        setShowCommandLabel(value: any): any;
        toggleShowCommandLabel(): boolean;
    }
}
declare module qx.ui.menu {
    class Button extends qx.ui.menu.AbstractButton {
        constructor(label: string, icon?: string, command?: qx.ui.core.Command, menu?: qx.ui.menu.Menu);
    }
}
declare module qx.ui.menu {
    class ButtonLayout extends qx.ui.layout.Abstract {
    }
}
declare module qx.ui.menu {
    class CheckBox extends qx.ui.menu.AbstractButton implements qx.ui.form.IBooleanForm {
        getValue(): any;
        resetValue(): void;
        setValue(value: any): void;
        constructor(label: string, menu: qx.ui.menu.Menu);
        protected _applyValue(value: boolean, old: boolean): void;
        protected _onExecute(e: qx.event.type.Event): void;
        initValue(value: any): any;
        isValue(): boolean;
        toggleValue(): boolean;
    }
}
declare module qx.ui.menu {
    class Layout extends qx.ui.layout.VBox {
        getArrowColumnWidth(): any;
        getColumnSizes(): qx.data.Array;
        getColumnSpacing(): any;
        getIconColumnWidth(): any;
        getSpanColumn(): any;
        initArrowColumnWidth(value: any): any;
        initColumnSpacing(value: any): any;
        initIconColumnWidth(value: any): any;
        initSpanColumn(value: any): any;
        resetArrowColumnWidth(): void;
        resetColumnSpacing(): void;
        resetIconColumnWidth(): void;
        resetSpanColumn(): void;
        setArrowColumnWidth(value: any): any;
        setColumnSpacing(value: any): any;
        setIconColumnWidth(value: any): any;
        setSpanColumn(value: any): any;
        arrowColumnWidth: number;
        columnSpacing: number;
        iconColumnWidth: number;
        spanColumn: number;
    }
}
declare module qx.ui.menu {
    class Manager extends qx.core.Object {
        constructor();
        protected _getChild(menu: qx.ui.menu.Menu, start: number, iter: number, loop?: boolean): qx.ui.menu.Button;
        protected _getMenuButton(widget: qx.ui.core.Widget): qx.ui.menu.Button;
        protected _isInMenu(widget: qx.ui.core.Widget): boolean;
        protected _isMenuOpener(widget: qx.ui.core.Widget): boolean;
        protected _onCloseInterval(e: qx.event.type.Event): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onKeyPressDown(menu: qx.ui.menu.Menu): void;
        protected _onKeyPressEnter(menu: qx.ui.menu.Menu, button: qx.ui.menu.AbstractButton, e: qx.event.type.KeySequence): void;
        protected _onKeyPressLeft(menu: qx.ui.menu.Menu): void;
        protected _onKeyPressRight(menu: qx.ui.menu.Menu): void;
        protected _onKeyPressSpace(menu: qx.ui.menu.Menu, button: qx.ui.menu.AbstractButton, e: qx.event.type.KeySequence): void;
        protected _onKeyPressUp(menu: qx.ui.menu.Menu): void;
        protected _onKeyUpDown(e: qx.event.type.KeySequence): void;
        protected _onOpenInterval(e: qx.event.type.Event): void;
        protected _onPointerDown(e: qx.event.type.Pointer): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        add(obj: qx.ui.menu.Menu): void;
        cancelClose(menu: qx.ui.menu.Menu): void;
        cancelOpen(menu: qx.ui.menu.Menu): void;
        getActiveMenu(): qx.ui.menu.Menu;
        hideAll(): void;
        remove(obj: qx.ui.menu.Menu): void;
        scheduleClose(menu: qx.ui.menu.Menu): void;
        scheduleOpen(menu: qx.ui.menu.Menu): void;
        static getInstance(): qx.ui.menu.Manager;
    }
}
declare module qx.ui.menu {
    class Menu extends qx.ui.core.Widget {
        static getMoveDirection(): string;
        static getVisibleElement(): any;
        static setMoveDirection(direction: string): void;
        static setVisibleElement(elem: qx.ui.core.Widget): void;
        protected _getPlacementOffsets(): IMap;
        protected _place(coords: IMap): void;
        getDomMove(): any;
        getLayoutLocation(widget: qx.ui.core.Widget): IMap;
        getOffsetBottom(): any;
        getOffsetLeft(): any;
        getOffsetRight(): any;
        getOffsetTop(): any;
        getPlacementModeX(): any;
        getPlacementModeY(): any;
        getPlaceMethod(): any;
        getPosition(): any;
        initDomMove(value: any): any;
        initOffsetBottom(value: any): any;
        initOffsetLeft(value: any): any;
        initOffsetRight(value: any): any;
        initOffsetTop(value: any): any;
        initPlacementModeX(value: any): any;
        initPlacementModeY(value: any): any;
        initPlaceMethod(value: any): any;
        initPosition(value: any): any;
        isDomMove(): boolean;
        moveTo(left: number, top: number): void;
        placeToElement(elem: HTMLElement, liveupdate: boolean): void;
        placeToPoint(point: IMap): void;
        placeToPointer(event: qx.event.type.Pointer): void;
        placeToWidget(target: qx.ui.core.Widget, liveupdate: boolean): boolean;
        resetDomMove(): void;
        resetOffset(): void;
        resetOffsetBottom(): void;
        resetOffsetLeft(): void;
        resetOffsetRight(): void;
        resetOffsetTop(): void;
        resetPlacementModeX(): void;
        resetPlacementModeY(): void;
        resetPlaceMethod(): void;
        resetPosition(): void;
        setDomMove(value: any): any;
        setOffset(offsetTop: any, offsetRight: any, offsetBottom: any, offsetLeft: any): void;
        setOffsetBottom(value: any): any;
        setOffsetLeft(value: any): any;
        setOffsetRight(value: any): any;
        setOffsetTop(value: any): any;
        setPlacementModeX(value: any): any;
        setPlacementModeY(value: any): any;
        setPlaceMethod(value: any): any;
        setPosition(value: any): any;
        toggleDomMove(): boolean;
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        constructor();
        protected _applyArrowColumnWidth(value: number, old: number): void;
        protected _applyBlockerColor(value: string, old: string): void;
        protected _applyBlockerOpacity(value: number, old: number): void;
        protected _applyIconColumnWidth(value: number, old: number): void;
        protected _applyOpenedButton(value: qx.ui.core.Widget, old: qx.ui.core.Widget): void;
        protected _applySelectedButton(value: qx.ui.core.Widget, old: qx.ui.core.Widget): void;
        protected _applySpacingX(value: number, old: number): void;
        protected _applySpacingY(value: number, old: number): void;
        protected _assertSlideBar(callback: Function): any;
        protected _computePlacementSize(): IMap;
        protected _getMenuBounds(): IMap;
        protected _getMenuLayout(): any;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        protected _onResize(): void;
        addSeparator(): void;
        getArrowColumnWidth(): any;
        getBlockBackground(): any;
        getBlockerColor(): any;
        getBlockerOpacity(): any;
        getCloseInterval(): any;
        getColumnSizes(): qx.data.Array;
        getIconColumnWidth(): any;
        getOpenedButton(): any;
        getOpener(): any;
        getOpenInterval(): any;
        getParentMenu(): any;
        getSelectables(): qx.ui.core.Widget[];
        getSelectedButton(): any;
        getSpacingX(): any;
        getSpacingY(): any;
        initArrowColumnWidth(value: any): any;
        initBlockBackground(value: any): any;
        initBlockerColor(value: any): any;
        initBlockerOpacity(value: any): any;
        initCloseInterval(value: any): any;
        initIconColumnWidth(value: any): any;
        initOpenedButton(value: any): any;
        initOpener(value: any): any;
        initOpenInterval(value: any): any;
        initSelectedButton(value: any): any;
        initSpacingX(value: any): any;
        initSpacingY(value: any): any;
        isBlockBackground(): boolean;
        open(): void;
        openAtMouse(e: qx.event.type.Mouse): void;
        openAtPoint(point: IMap): void;
        openAtPointer(e: qx.event.type.Pointer): void;
        resetArrowColumnWidth(): void;
        resetBlockBackground(): void;
        resetBlockerColor(): void;
        resetBlockerOpacity(): void;
        resetCloseInterval(): void;
        resetIconColumnWidth(): void;
        resetOpenedButton(): void;
        resetOpener(): void;
        resetOpenInterval(): void;
        resetSelectedButton(): void;
        resetSpacingX(): void;
        resetSpacingY(): void;
        setArrowColumnWidth(value: any): any;
        setBlockBackground(value: any): any;
        setBlockerColor(value: any): any;
        setBlockerOpacity(value: any): any;
        setCloseInterval(value: any): any;
        setIconColumnWidth(value: any): any;
        setOpenedButton(value: any): any;
        setOpener(value: any): any;
        setOpenInterval(value: any): any;
        setSelectedButton(value: any): any;
        setSpacingX(value: any): any;
        setSpacingY(value: any): any;
        toggleBlockBackground(): boolean;
        arrowColumnWidth: number;
        blockBackground: boolean;
        blockerColor: string;
        blockerOpacity: number;
        closeInterval: number;
        iconColumnWidth: number;
        openedButton: qx.ui.core.Widget;
        opener: qx.ui.core.Widget;
        openInterval: number;
        selectedButton: qx.ui.core.Widget;
        spacingX: number;
        spacingY: number;
    }
}
declare module qx.ui.menu {
    class MenuSlideBar extends qx.ui.container.SlideBar {
        constructor();
    }
}
declare module qx.ui.menu {
    class RadioButton extends qx.ui.menu.AbstractButton implements qx.ui.form.IRadioItem, qx.ui.form.IBooleanForm, qx.ui.form.IModel {
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
        resetValue(): void;
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        constructor(label: string, menu: qx.ui.menu.Menu);
        protected _applyGroup(value: qx.ui.form.RadioGroup, old: qx.ui.form.RadioGroup): void;
        protected _applyValue(value: boolean, old: boolean): void;
        protected _onExecute(e: qx.event.type.Event): void;
        initGroup(value: any): any;
        initValue(value: any): any;
        isValue(): boolean;
        resetGroup(): void;
        toggleValue(): boolean;
        group: qx.ui.form.RadioGroup;
    }
}
declare module qx.ui.menu {
    class Separator extends qx.ui.core.Widget {
    }
}
declare module qx.ui.menubar {
    class Button extends qx.ui.form.MenuButton {
        constructor(label: any, icon: any, menu: any);
        getMenuBar(): qx.ui.menubar.MenuBar;
    }
}
declare module qx.ui.menubar {
    class MenuBar extends qx.ui.toolbar.ToolBar {
    }
}
declare module qx.ui.popup {
    class Manager extends qx.core.Object {
        constructor();
        add(obj: qx.ui.popup.Popup): void;
        hideAll(): void;
        remove(obj: qx.ui.popup.Popup): void;
        static getInstance(): qx.ui.popup.Manager;
    }
}
declare module qx.ui.popup {
    class Popup extends qx.ui.container.Composite {
        static getMoveDirection(): string;
        static getVisibleElement(): any;
        static setMoveDirection(direction: string): void;
        static setVisibleElement(elem: qx.ui.core.Widget): void;
        protected _getPlacementOffsets(): IMap;
        protected _place(coords: IMap): void;
        getDomMove(): any;
        getLayoutLocation(widget: qx.ui.core.Widget): IMap;
        getOffsetBottom(): any;
        getOffsetLeft(): any;
        getOffsetRight(): any;
        getOffsetTop(): any;
        getPlacementModeX(): any;
        getPlacementModeY(): any;
        getPlaceMethod(): any;
        getPosition(): any;
        initDomMove(value: any): any;
        initOffsetBottom(value: any): any;
        initOffsetLeft(value: any): any;
        initOffsetRight(value: any): any;
        initOffsetTop(value: any): any;
        initPlacementModeX(value: any): any;
        initPlacementModeY(value: any): any;
        initPlaceMethod(value: any): any;
        initPosition(value: any): any;
        isDomMove(): boolean;
        moveTo(left: number, top: number): void;
        placeToElement(elem: HTMLElement, liveupdate: boolean): void;
        placeToPoint(point: IMap): void;
        placeToPointer(event: qx.event.type.Pointer): void;
        placeToWidget(target: qx.ui.core.Widget, liveupdate: boolean): boolean;
        resetDomMove(): void;
        resetOffset(): void;
        resetOffsetBottom(): void;
        resetOffsetLeft(): void;
        resetOffsetRight(): void;
        resetOffsetTop(): void;
        resetPlacementModeX(): void;
        resetPlacementModeY(): void;
        resetPlaceMethod(): void;
        resetPosition(): void;
        setDomMove(value: any): any;
        setOffset(offsetTop: any, offsetRight: any, offsetBottom: any, offsetLeft: any): void;
        setOffsetBottom(value: any): any;
        setOffsetLeft(value: any): any;
        setOffsetRight(value: any): any;
        setOffsetTop(value: any): any;
        setPlacementModeX(value: any): any;
        setPlacementModeY(value: any): any;
        setPlaceMethod(value: any): any;
        setPosition(value: any): any;
        toggleDomMove(): boolean;
        constructor(layout: any);
        autoHide: boolean;
        getAutoHide(): any;
        initAutoHide(value: any): any;
        isAutoHide(): boolean;
        resetAutoHide(): void;
        setAutoHide(value: any): any;
        toggleAutoHide(): boolean;
    }
}
declare module qx.ui.progressive {
    class Progressive extends qx.ui.container.Composite {
        constructor(structure: qx.ui.progressive.structure.Abstract);
        protected _applyDataModel(value: qx.ui.progressive.model.Abstract, old: any): void;
        addRenderer(name: string, renderer: qx.ui.progressive.renderer.Abstract): void;
        getBatchSize(): any;
        getDataModel(): any;
        getFlushWidgetQueueAfterBatch(): any;
        getInterElementTimeout(): any;
        getStructure(): qx.ui.progressive.structure.Abstract;
        initBatchSize(value: any): any;
        initDataModel(value: any): any;
        initFlushWidgetQueueAfterBatch(value: any): any;
        initInterElementTimeout(value: any): any;
        isFlushWidgetQueueAfterBatch(): boolean;
        removeRenderer(name: string): void;
        render(): void;
        resetBatchSize(): void;
        resetDataModel(): void;
        resetFlushWidgetQueueAfterBatch(): void;
        resetInterElementTimeout(): void;
        setBatchSize(value: any): any;
        setDataModel(value: any): any;
        setFlushWidgetQueueAfterBatch(value: any): any;
        setInterElementTimeout(value: any): any;
        toggleFlushWidgetQueueAfterBatch(): boolean;
        batchSize: number;
        dataModel: qx.ui.progressive.model.Abstract;
        flushWidgetQueueAfterBatch: boolean;
        interElementTimeout: number;
    }
}
declare module qx.ui.progressive {
    class State extends qx.core.Object {
        constructor(initialState: IMap);
        getBatchSize(): any;
        getModel(): any;
        getPane(): any;
        getProgressive(): any;
        getRendererData(): any;
        initBatchSize(value: any): any;
        initModel(value: any): any;
        initPane(value: any): any;
        initProgressive(value: any): any;
        initRendererData(value: any): any;
        initUserData(value: any): any;
        resetBatchSize(): void;
        resetModel(): void;
        resetPane(): void;
        resetProgressive(): void;
        resetRendererData(): void;
        resetUserData(): void;
        setBatchSize(value: any): any;
        setModel(value: any): any;
        setPane(value: any): any;
        setProgressive(value: any): any;
        setRendererData(value: any): any;
    }
}
declare module qx.ui.progressive.headfoot {
    class Abstract extends qx.ui.container.Composite {
        constructor();
        join(progressive: qx.ui.progressive.Progressive): void;
    }
}
declare module qx.ui.progressive.headfoot {
    class Null extends qx.ui.progressive.headfoot.Abstract {
        constructor();
    }
}
declare module qx.ui.progressive.headfoot {
    class Progress extends qx.ui.progressive.headfoot.Abstract {
        constructor(columnWidths: qx.ui.progressive.renderer.table.Widths, labelArr: qx.data.Array);
    }
}
declare module qx.ui.progressive.headfoot {
    class TableHeading extends qx.ui.progressive.headfoot.Abstract {
        constructor(columnWidths: qx.ui.progressive.renderer.table.Widths, labelArr: qx.data.Array);
        protected _resizeColumns(e: qx.event.type.Event): void;
    }
}
declare module qx.ui.progressive.model {
    class Abstract extends qx.core.Object {
        getElementCount(): number;
        getNextElement(): any;
    }
}
declare module qx.ui.progressive.model {
    class Default extends qx.ui.progressive.model.Abstract {
        constructor();
        addElement(elem: any): void;
        addElements(elems: qx.data.Array): void;
    }
}
declare module qx.ui.progressive.renderer {
    class Abstract extends qx.core.Object {
        join(progressive: qx.ui.progressive.Progressive, name: string): void;
        render(state: qx.ui.progressive.State, element: any): void;
    }
}
declare module qx.ui.progressive.renderer {
    class FunctionCaller extends qx.ui.progressive.renderer.Abstract {
    }
}
declare module qx.ui.progressive.renderer.table {
    class Row extends qx.ui.progressive.renderer.Abstract {
        constructor(columnWidths: qx.ui.progressive.renderer.table.Widths);
        protected _resizeColumns(e: qx.event.type.Event): void;
        addRenderer(column: number, renderer: qx.ui.progressive.renderer.table.cell.Abstract): void;
        getDefaultRowHeight(): any;
        getLayoutChildren(): qx.data.Array;
        initDefaultRowHeight(value: any): any;
        removeRenderer(column: number): void;
        resetDefaultRowHeight(): void;
        setDefaultRowHeight(value: any): any;
    }
}
declare module qx.ui.progressive.renderer.table {
    class Widths extends qx.core.Object {
        constructor(numColumns: number);
        getData(): qx.data.Array;
        set(column: number, map: IMap): void;
        setMaxWidth(column: number, width: number): void;
        setMinWidth(column: number, width: number): void;
        setWidth(column: number, width: string): void;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Abstract extends qx.core.Object {
        protected _getCellExtras(cellInfo: any): string;
        protected _getCellStyle(cellInfo: any): string;
        protected _getContentHtml(cellInfo: any): string;
        render(cellInfo: any): string;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Boolean extends qx.ui.progressive.renderer.table.cell.Icon {
        constructor();
        getAllowToggle(): any;
        initAllowToggle(value: any): any;
        isAllowToggle(): boolean;
        resetAllowToggle(): void;
        setAllowToggle(value: any): any;
        toggleAllowToggle(): boolean;
        allowToggle: boolean;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Conditional extends qx.ui.progressive.renderer.table.cell.Abstract {
        constructor(align: string, color: string, style: string, weight: string);
        addBetweenCondition(condition: string, value1: number, value2: number, align: string, color: string, style: string, weight: string, target: string): void;
        addNumericCondition(condition: string, value1: number, align: string, color: string, style: string, weight: string, target: string): void;
        addRegex(regex: string, align: string, color: string, style: string, weight: string, target: string): void;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Default extends qx.ui.progressive.renderer.table.cell.Abstract {
        constructor();
        protected _formatValue(value: any): string;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Html extends qx.ui.progressive.renderer.table.cell.Abstract {
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Icon extends qx.ui.progressive.renderer.table.cell.Abstract {
        constructor();
        protected _identifyImage(cellInfo: IMap): IMap;
        getBlankImage(): string;
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class Image extends qx.ui.progressive.renderer.table.cell.Icon {
        constructor(width?: number, height?: number);
    }
}
declare module qx.ui.progressive.renderer.table.cell {
    class String extends qx.ui.progressive.renderer.table.cell.Abstract {
        constructor();
    }
}
declare module qx.ui.progressive.structure {
    class Abstract extends qx.core.Object {
        constructor(pane: any);
        applyStructure(progressive: qx.ui.progressive.Progressive): void;
        getPane(): qx.ui.core.Widget;
    }
}
declare module qx.ui.progressive.structure {
    class Default extends qx.ui.progressive.structure.Abstract {
        constructor(header: any, footer: any, pane: any);
        getFooter(): qx.ui.progressive.headfoot.Abstract;
        getHeader(): qx.ui.progressive.headfoot.Abstract;
    }
}
declare module qx.ui.root {
    class Abstract extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        protected _applyBlockerColor(value: string, old: string): void;
        protected _applyBlockerOpacity(value: number, old: number): void;
        protected _createBlocker(): qx.ui.core.Blocker;
        block(): void;
        blockContent(zIndex: number): void;
        forceUnblock(): void;
        getBlocker(): qx.ui.core.Blocker;
        getBlockerColor(): any;
        getBlockerOpacity(): any;
        initBlockerColor(value: any): any;
        initBlockerOpacity(value: any): any;
        isBlocked(): boolean;
        resetBlockerColor(): void;
        resetBlockerOpacity(): void;
        setBlockerColor(value: any): any;
        setBlockerOpacity(value: any): any;
        unblock(): void;
        protected _addWindow(win: qx.ui.window.Window): void;
        protected _afterAddChild(win: qx.ui.core.Widget): void;
        protected _afterRemoveChild(win: qx.ui.core.Widget): void;
        protected _applyActiveWindow(value: qx.ui.window.Window, old: qx.ui.window.Window): void;
        protected _onChangeActive(e: qx.event.type.Event): void;
        protected _onChangeModal(e: qx.event.type.Event): void;
        protected _onChangeVisibility(): void;
        protected _removeWindow(win: qx.ui.window.Window): void;
        getActiveWindow(): any;
        getWindowManager(): qx.ui.window.IWindowManager;
        getWindows(): qx.ui.window.Window[];
        initActiveWindow(value: any): any;
        resetActiveWindow(): void;
        setActiveWindow(value: any): any;
        setWindowManager(manager: qx.ui.window.IWindowManager): void;
        supportsMaximize(): boolean;
        constructor();
        protected _applyNativeHelp(value: boolean, old: boolean): void;
        protected _onNativeContextMenu(e: qx.event.type.Mouse): void;
        getGlobalCursor(): any;
        getLayout(): qx.ui.layout.Abstract;
        getNativeHelp(): any;
        initGlobalCursor(value: any): any;
        initNativeHelp(value: any): any;
        isNativeHelp(): boolean;
        resetGlobalCursor(): void;
        resetNativeHelp(): void;
        setGlobalCursor(value: any): any;
        setNativeHelp(value: any): any;
        toggleNativeHelp(): boolean;
        nativeHelp: boolean;
    }
}
declare module qx.ui.root {
    class Application extends qx.ui.root.Abstract {
        constructor(doc: Document);
        protected _onResize(e: qx.event.type.Event): void;
    }
}
declare module qx.ui.root {
    class Inline extends qx.ui.root.Abstract {
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        static remap(members: IMap): void;
        constructor(el: HTMLElement, dynamicX: boolean, dynamicY: boolean);
        protected _onResize(e: qx.event.type.Event): void;
        protected _onWindowResize(): void;
    }
}
declare module qx.ui.root {
    class Page extends qx.ui.root.Abstract {
        constructor(doc: Document);
        supportsMaximize(): boolean;
    }
}
declare module qx.ui.splitpane {
    class Blocker extends qx.html.Element {
        constructor(orientation: string);
        protected _applyOrientation(value: any, old: any): void;
        getOrientation(): any;
        initOrientation(value: any): any;
        resetOrientation(): void;
        setHeight(offset: number, spliterSize: number): void;
        setLeft(offset: number, splitterLeft: number): void;
        setOrientation(value: any): any;
        setTop(offset: number, splitterTop: number): void;
        setWidth(offset: number, spliterSize: number): void;
    }
}
declare module qx.ui.splitpane {
    class HLayout extends qx.ui.layout.Abstract {
    }
}
declare module qx.ui.splitpane {
    class Pane extends qx.ui.core.Widget {
        constructor(orientation: string);
        offset: number;
        protected _applyOffset(value: number, old: number): void;
        protected _applyOrientation(value: string, old: string): void;
        protected _finalizeSizes(): void;
        protected _isActiveDragSession(): boolean;
        protected _onPointerDown(e: qx.event.type.Pointer): void;
        protected _onPointerMove(e: qx.event.type.Pointer): void;
        protected _onPointerOut(e: qx.event.type.Pointer): void;
        protected _onPointerUp(e: qx.event.type.Pointer): void;
        protected _setLastPointerPosition(x: number, y: number): void;
        add(widget: qx.ui.core.Widget, flex: number): void;
        getChildren(): qx.ui.core.Widget[];
        getOffset(): any;
        getOrientation(): any;
        initOffset(value: any): any;
        initOrientation(value: any): any;
        remove(widget: qx.ui.core.Widget): void;
        resetOffset(): void;
        resetOrientation(): void;
        setOffset(value: any): any;
        setOrientation(value: any): any;
    }
}
declare module qx.ui.splitpane {
    class Slider extends qx.ui.core.Widget {
    }
}
declare module qx.ui.splitpane {
    class Splitter extends qx.ui.core.Widget {
        constructor(parentWidget: qx.ui.splitpane.Pane);
    }
}
declare module qx.ui.splitpane {
    class VLayout extends qx.ui.layout.Abstract {
    }
}
declare module qx.ui.style {
    class Stylesheet extends qx.core.Object {
        constructor();
        addRule(selector: string, css: string): void;
        hasRule(selector: string): boolean;
        removeRule(selector: string): void;
        static getInstance(): qx.ui.style.Stylesheet;
    }
}
declare module qx.ui.table {
    interface ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
    }
}
declare module qx.ui.table {
    interface ICellRenderer {
        createDataCellHtml(cellInfo: IMap, htmlArr: string[]): any;
    }
}
declare module qx.ui.table {
    interface IColumnMenuButton {
        empty(): void;
        factory(item: string, options: IMap): qx.ui.core.Widget;
        getMenu(): any;
        initMenu(value: any): any;
        resetMenu(): void;
        setMenu(value: any): any;
    }
}
declare module qx.ui.table {
    interface IColumnMenuItem {
        getVisible(): any;
        initVisible(value: any): any;
        resetVisible(): void;
        setVisible(value: any): any;
    }
}
declare module qx.ui.table {
    interface IHeaderRenderer {
        createHeaderCell(cellInfo: IMap): qx.ui.core.Widget;
        updateHeaderCell(cellInfo: IMap, cellWidget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.table {
    interface IRowRenderer {
        createRowStyle(rowInfo: IMap): void;
        getRowClass(rowInfo: IMap): void;
        getRowHeightStyle(height: number): void;
        updateDataRowElement(rowInfo: IMap, rowElement: HTMLElement): void;
    }
}
declare module qx.ui.table {
    interface ITableModel {
        getColumnCount(): number;
        getColumnId(columnIndex: number): string;
        getColumnIndexById(columnId: string): number;
        getColumnName(columnIndex: number): string;
        getRowCount(): number;
        getRowData(rowIndex: number): any;
        getSortColumnIndex(): number;
        getValue(columnIndex: number, rowIndex: number): any;
        getValueById(columnId: string, rowIndex: number): any;
        isColumnEditable(columnIndex: number): boolean;
        isColumnSortable(columnIndex: number): boolean;
        isSortAscending(): boolean;
        prefetchRows(firstRowIndex: number, lastRowIndex: number): void;
        setValue(columnIndex: number, rowIndex: number, value: any): void;
        setValueById(columnId: string, rowIndex: number, value: any): void;
        sortByColumn(columnIndex: number, ascending: boolean): void;
    }
}
declare module qx.ui.table {
    class MTableContextMenu {
        constructor();
        getContextMenuHandler(col: number): Function;
        setContextMenuHandler(col: number, handler: Function, context?: any): void;
    }
}
declare module qx.ui.table {
    class Table extends qx.ui.core.Widget {
        protected _calculateScrollAmount(scrollbarSize: number, exceedanceAmount: number): number;
        protected _calculateThresholdExceedance(diff: number, threshold: number): number;
        protected _findScrollableParent(widget: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        protected _getAxis(edgeType: string): string;
        protected _getBounds(scrollable: qx.ui.core.Widget): IMap;
        protected _getEdgeType(diff: IMap, thresholdX: number, thresholdY: number): string;
        protected _getThresholdByEdgeType(edgeType: string): number;
        protected _isScrollable(widget: qx.ui.core.Widget): boolean;
        protected _isScrollbarExceedingMaxPos(scrollbar: qx.ui.core.scroll.IScrollBar, axis: string, amount: number): boolean;
        protected _isScrollbarVisible(scrollable: qx.ui.core.Widget, axis: string): boolean;
        protected _scrollBy(scrollable: qx.ui.core.Widget, axis: string, exceedanceAmount: number): void;
        getDragScrollSlowDownFactor(): any;
        getDragScrollThresholdX(): any;
        getDragScrollThresholdY(): any;
        initDragScrollSlowDownFactor(value: any): any;
        initDragScrollThresholdX(value: any): any;
        initDragScrollThresholdY(value: any): any;
        resetDragScrollSlowDownFactor(): void;
        resetDragScrollThresholdX(): void;
        resetDragScrollThresholdY(): void;
        setDragScrollSlowDownFactor(value: any): any;
        setDragScrollThresholdX(value: any): any;
        setDragScrollThresholdY(value: any): any;
        constructor(tableModel?: qx.ui.table.ITableModel, custom?: IMap);
        protected _applyAdditionalStatusBarText(value: any, old: any): void;
        protected _applyColumnVisibilityButtonVisible(value: boolean, old: boolean): void;
        protected _applyContextMenuFromDataCellsOnly(value: boolean, old: boolean): void;
        protected _applyFocusCellOnPointerMove(value: boolean, old: boolean): void;
        protected _applyHeaderCellHeight(value: number, old: number): void;
        protected _applyHeaderCellsVisible(value: boolean, old: boolean): void;
        protected _applyKeepFirstVisibleRowComplete(value: boolean, old: boolean): void;
        protected _applyMetaColumnCounts(value: any, old: any): void;
        protected _applyResetSelectionOnHeaderTap(value: boolean, old: boolean): void;
        protected _applyRowHeight(value: number, old: number): void;
        protected _applySelectionModel(value: qx.ui.table.selection.Model, old: qx.ui.table.selection.Model): void;
        protected _applyShowCellFocusIndicator(value: boolean, old: boolean): void;
        protected _applyStatusBarVisible(value: boolean, old: boolean): void;
        protected _applyTableModel(value: qx.ui.table.ITableModel, old: qx.ui.table.ITableModel): void;
        protected _cleanUpMetaColumns(fromMetaColumn: number): void;
        protected _createColumnVisibilityCheckBoxHandler(col: number): Function;
        protected _getMetaColumnAtColumnX(visXPos: number): number;
        protected _getMetaColumnAtPageX(pageX: number): number;
        protected _getPaneScrollerArr(): qx.ui.table.pane.Scroller[];
        protected _initColumnMenu(): void;
        protected _onChangeLocale(evt: qx.event.type.Event): void;
        protected _onColOrderChanged(evt: IMap): void;
        protected _onColVisibilityChanged(evt: IMap): void;
        protected _onColWidthChanged(evt: IMap): void;
        protected _onFocusChanged(evt: IMap): void;
        protected _onKeyPress(evt: qx.event.type.KeySequence): void;
        protected _onResize(): void;
        protected _onScrollY(evt: IMap): void;
        protected _onSelectionChanged(evt: IMap): void;
        protected _onTableModelDataChanged(evt: IMap): void;
        protected _onTableModelMetaDataChanged(evt: IMap): void;
        protected _updateScrollBarVisibility(): void;
        protected _updateScrollerWidths(): void;
        protected _updateStatusBar(): void;
        protected _updateTableData(firstRow: number, lastRow: number, firstColumn: number, lastColumn: number, removeStart?: number, removeCount?: number): void;
        blockHeaderElements(): void;
        cancelEditing(): void;
        clearFocusedRowHighlight(evt: qx.event.type.Pointer): void;
        getAdditionalStatusBarText(): any;
        getAlwaysUpdateCells(): any;
        getColumnVisibilityButtonVisible(): any;
        getContextMenuFromDataCellsOnly(): any;
        getDataRowRenderer(): any;
        getEmptyTableModel(): qx.ui.table.ITableModel;
        getFocusCellOnPointerMove(): any;
        getFocusedColumn(): number;
        getFocusedRow(): number;
        getForceLineHeight(): any;
        getHeaderCellHeight(): any;
        getHeaderCellsVisible(): any;
        getInitiallyHiddenColumns(): any;
        getKeepFirstVisibleRowComplete(): any;
        getMetaColumnCounts(): any;
        getModalCellEditorPreOpenFunction(): any;
        getNewColumnMenu(): any;
        getNewSelectionManager(): any;
        getNewSelectionModel(): any;
        getNewTableColumnModel(): any;
        getNewTablePane(): any;
        getNewTablePaneHeader(): any;
        getNewTablePaneModel(): any;
        getNewTablePaneScroller(): any;
        getPaneScroller(metaColumn: number): qx.ui.table.pane.Scroller;
        getResetSelectionOnHeaderTap(): any;
        getRowFocusChangeModifiesSelection(): any;
        getRowHeight(): any;
        getSelectionManager(): qx.ui.table.selection.Manager;
        getSelectionModel(): any;
        getShowCellFocusIndicator(): any;
        getStatusBarVisible(): any;
        getTableColumnModel(): qx.ui.table.columnmodel.Basic;
        getTableModel(): any;
        getTablePaneScrollerAtPageX(pageX: number): qx.ui.table.pane.Scroller;
        highlightFocusedRow(bHighlight: boolean): void;
        initAdditionalStatusBarText(value: any): any;
        initAlwaysUpdateCells(value: any): any;
        initColumnVisibilityButtonVisible(value: any): any;
        initContextMenuFromDataCellsOnly(value: any): any;
        initDataRowRenderer(value: any): any;
        initFocusCellOnPointerMove(value: any): any;
        initForceLineHeight(value: any): any;
        initHeaderCellHeight(value: any): any;
        initHeaderCellsVisible(value: any): any;
        initInitiallyHiddenColumns(value: any): any;
        initKeepFirstVisibleRowComplete(value: any): any;
        initMetaColumnCounts(value: any): any;
        initModalCellEditorPreOpenFunction(value: any): any;
        initNewColumnMenu(value: any): any;
        initNewSelectionManager(value: any): any;
        initNewSelectionModel(value: any): any;
        initNewTableColumnModel(value: any): any;
        initNewTablePane(value: any): any;
        initNewTablePaneHeader(value: any): any;
        initNewTablePaneModel(value: any): any;
        initNewTablePaneScroller(value: any): any;
        initResetSelectionOnHeaderTap(value: any): any;
        initRowFocusChangeModifiesSelection(value: any): any;
        initRowHeight(value: any): any;
        initSelectionModel(value: any): any;
        initShowCellFocusIndicator(value: any): any;
        initStatusBarVisible(value: any): any;
        initTableModel(value: any): any;
        isAlwaysUpdateCells(): boolean;
        isColumnVisibilityButtonVisible(): boolean;
        isContextMenuFromDataCellsOnly(): boolean;
        isEditing(): any;
        isFocusCellOnPointerMove(): boolean;
        isForceLineHeight(): boolean;
        isHeaderCellsVisible(): boolean;
        isKeepFirstVisibleRowComplete(): boolean;
        isResetSelectionOnHeaderTap(): boolean;
        isRowFocusChangeModifiesSelection(): boolean;
        isShowCellFocusIndicator(): boolean;
        isStatusBarVisible(): boolean;
        moveFocusedCell(deltaX: number, deltaY: number): void;
        resetAdditionalStatusBarText(): void;
        resetAlwaysUpdateCells(): void;
        resetCellFocus(): void;
        resetColumnVisibilityButtonVisible(): void;
        resetContextMenuFromDataCellsOnly(): void;
        resetDataRowRenderer(): void;
        resetFocusCellOnPointerMove(): void;
        resetForceLineHeight(): void;
        resetHeaderCellHeight(): void;
        resetHeaderCellsVisible(): void;
        resetInitiallyHiddenColumns(): void;
        resetKeepFirstVisibleRowComplete(): void;
        resetMetaColumnCounts(): void;
        resetModalCellEditorPreOpenFunction(): void;
        resetNewColumnMenu(): void;
        resetNewSelectionManager(): void;
        resetNewSelectionModel(): void;
        resetNewTableColumnModel(): void;
        resetNewTablePane(): void;
        resetNewTablePaneHeader(): void;
        resetNewTablePaneModel(): void;
        resetNewTablePaneScroller(): void;
        resetResetSelectionOnHeaderTap(): void;
        resetRowFocusChangeModifiesSelection(): void;
        resetRowHeight(): void;
        resetSelection(): void;
        resetSelectionModel(): void;
        resetShowCellFocusIndicator(): void;
        resetStatusBarVisible(): void;
        resetTableModel(): void;
        scrollCellVisible(col: number, row: number): void;
        setAdditionalStatusBarText(value: any): any;
        setAlwaysUpdateCells(value: any): any;
        setColumnVisibilityButtonVisible(value: any): any;
        setColumnWidth(col: number, width: number): void;
        setContextMenuFromDataCellsOnly(value: any): any;
        setDataRowRenderer(value: any): any;
        setFocusCellOnPointerMove(value: any): any;
        setFocusedCell(col?: number, row?: number, scrollVisible?: boolean): void;
        setForceLineHeight(value: any): any;
        setHeaderCellHeight(value: any): any;
        setHeaderCellsVisible(value: any): any;
        setInitiallyHiddenColumns(value: any): any;
        setKeepFirstVisibleRowComplete(value: any): any;
        setMetaColumnCounts(value: any): any;
        setModalCellEditorPreOpenFunction(value: any): any;
        setNewColumnMenu(value: any): any;
        setNewSelectionManager(value: any): any;
        setNewSelectionModel(value: any): any;
        setNewTableColumnModel(value: any): any;
        setNewTablePane(value: any): any;
        setNewTablePaneHeader(value: any): any;
        setNewTablePaneModel(value: any): any;
        setNewTablePaneScroller(value: any): any;
        setResetSelectionOnHeaderTap(value: any): any;
        setRowFocusChangeModifiesSelection(value: any): any;
        setRowHeight(value: any): any;
        setSelectionModel(value: any): any;
        setShowCellFocusIndicator(value: any): any;
        setStatusBarVisible(value: any): any;
        setTableModel(value: any): any;
        startEditing(): boolean;
        stopEditing(): void;
        toggleAlwaysUpdateCells(): boolean;
        toggleColumnVisibilityButtonVisible(): boolean;
        toggleContextMenuFromDataCellsOnly(): boolean;
        toggleFocusCellOnPointerMove(): boolean;
        toggleForceLineHeight(): boolean;
        toggleHeaderCellsVisible(): boolean;
        toggleKeepFirstVisibleRowComplete(): boolean;
        toggleResetSelectionOnHeaderTap(): boolean;
        toggleRowFocusChangeModifiesSelection(): boolean;
        toggleShowCellFocusIndicator(): boolean;
        toggleStatusBarVisible(): boolean;
        unblockHeaderElements(): void;
        updateContent(): void;
        alwaysUpdateCells: boolean;
        columnVisibilityButtonVisible: boolean;
        contextMenuFromDataCellsOnly: boolean;
        focusCellOnPointerMove: boolean;
        forceLineHeight: boolean;
        headerCellsVisible: boolean;
        keepFirstVisibleRowComplete: boolean;
        metaColumnCounts: any;
        modalCellEditorPreOpenFunction: Function;
        newColumnMenu: Function;
        newSelectionManager: Function;
        newSelectionModel: Function;
        newTableColumnModel: Function;
        newTablePane: Function;
        newTablePaneHeader: Function;
        newTablePaneModel: Function;
        newTablePaneScroller: Function;
        resetSelectionOnHeaderTap: boolean;
        rowFocusChangeModifiesSelection: boolean;
        showCellFocusIndicator: boolean;
        statusBarVisible: boolean;
    }
}
declare module qx.ui.table.celleditor {
    class AbstractField extends qx.core.Object implements qx.ui.table.ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
        protected _createEditor(): qx.ui.core.Widget;
        getValidationFunction(): any;
        initValidationFunction(value: any): any;
        resetValidationFunction(): void;
        setValidationFunction(value: any): any;
        validationFunction: Function;
    }
}
declare module qx.ui.table.celleditor {
    class CheckBox extends qx.core.Object implements qx.ui.table.ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
    }
}
declare module qx.ui.table.celleditor {
    class ComboBox extends qx.core.Object implements qx.ui.table.ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
        getListData(): any;
        getValidationFunction(): any;
        initListData(value: any): any;
        initValidationFunction(value: any): any;
        resetListData(): void;
        resetValidationFunction(): void;
        setListData(value: any): any;
        setValidationFunction(value: any): any;
        listData: qx.data.Array;
        validationFunction: Function;
    }
}
declare module qx.ui.table.celleditor {
    class Dynamic extends qx.core.Object implements qx.ui.table.ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
        constructor(cellEditorFactoryFunction?: Function);
        getCellEditorFactoryFunction(): any;
        initCellEditorFactoryFunction(value: any): any;
        resetCellEditorFactoryFunction(): void;
        setCellEditorFactoryFunction(value: any): any;
        cellEditorFactoryFunction: Function;
    }
}
declare module qx.ui.table.celleditor {
    class PasswordField extends qx.ui.table.celleditor.AbstractField {
    }
}
declare module qx.ui.table.celleditor {
    class SelectBox extends qx.core.Object implements qx.ui.table.ICellEditorFactory {
        createCellEditor(cellInfo: IMap): qx.ui.core.Widget;
        getCellEditorValue(cellEditor: qx.ui.core.Widget): any;
        getListData(): any;
        getValidationFunction(): any;
        initListData(value: any): any;
        initValidationFunction(value: any): any;
        resetListData(): void;
        resetValidationFunction(): void;
        setListData(value: any): any;
        setValidationFunction(value: any): any;
        listData: qx.data.Array;
        validationFunction: Function;
    }
}
declare module qx.ui.table.celleditor {
    class TextField extends qx.ui.table.celleditor.AbstractField {
    }
}
declare module qx.ui.table.cellrenderer {
    class Abstract extends qx.core.Object implements qx.ui.table.ICellRenderer {
        createDataCellHtml(cellInfo: IMap, htmlArr: string[]): any;
        constructor();
        protected _createStyleSheet(): void;
        protected _getCellAttributes(cellInfo: IMap): string;
        protected _getCellClass(cellInfo: IMap): string;
        protected _getCellSizeStyle(width: number, height: number, insetX: number, insetY: number): string;
        protected _getCellStyle(cellInfo: IMap): any;
        protected _getContentHtml(cellInfo: IMap): string;
        protected _onChangeTheme(): void;
        getDefaultCellStyle(): any;
        initDefaultCellStyle(value: any): any;
        resetDefaultCellStyle(): void;
        setDefaultCellStyle(value: any): any;
        defaultCellStyle: string;
    }
}
declare module qx.ui.table.cellrenderer {
    class AbstractImage extends qx.ui.table.cellrenderer.Abstract {
        constructor();
        protected _getImageInfos(cellInfo: IMap): IMap;
        protected _identifyImage(cellInfo: IMap): IMap;
        getRepeat(): any;
        initRepeat(value: any): any;
        resetRepeat(): void;
        setRepeat(value: any): any;
        repeat: any;
    }
}
declare module qx.ui.table.cellrenderer {
    class Boolean extends qx.ui.table.cellrenderer.AbstractImage {
        constructor();
        protected _applyIconFalse(value: string, old: string): void;
        protected _applyIconTrue(value: string, old: string): void;
        getIconFalse(): any;
        getIconTrue(): any;
        initIconFalse(value: any): any;
        initIconTrue(value: any): any;
        resetIconFalse(): void;
        resetIconTrue(): void;
        setIconFalse(value: any): any;
        setIconTrue(value: any): any;
        iconFalse: string;
        iconTrue: string;
    }
}
declare module qx.ui.table.cellrenderer {
    class Conditional extends qx.ui.table.cellrenderer.Default {
        constructor(align: any, color: any, style: any, weight: any);
        addBetweenCondition(condition: string, value1: number, value2: number, align: any, color: any, style: any, weight: any, target: any): void;
        addNumericCondition(condition: string, value1: number, align: any, color: any, style: any, weight: any, target: any): void;
        addRegex(regex: string, align: any, color: any, style: any, weight: any, target: any): void;
    }
}
declare module qx.ui.table.cellrenderer {
    class Date extends qx.ui.table.cellrenderer.Conditional {
        getDateFormat(): any;
        initDateFormat(value: any): any;
        resetDateFormat(): void;
        setDateFormat(value: any): any;
        dateFormat: qx.util.format.DateFormat;
    }
}
declare module qx.ui.table.cellrenderer {
    class Debug extends qx.ui.table.cellrenderer.Abstract {
    }
}
declare module qx.ui.table.cellrenderer {
    class Default extends qx.ui.table.cellrenderer.Abstract {
        protected _formatValue(cellInfo: IMap): string;
        protected _getStyleFlags(cellInfo: IMap): number;
        getUseAutoAlign(): any;
        initUseAutoAlign(value: any): any;
        isUseAutoAlign(): boolean;
        resetUseAutoAlign(): void;
        setUseAutoAlign(value: any): any;
        toggleUseAutoAlign(): boolean;
        useAutoAlign: boolean;
    }
}
declare module qx.ui.table.cellrenderer {
    class Dynamic extends qx.ui.table.cellrenderer.Default {
        constructor(cellRendererFactoryFunction?: Function);
        getCellRendererFactoryFunction(): any;
        initCellRendererFactoryFunction(value: any): any;
        resetCellRendererFactoryFunction(): void;
        setCellRendererFactoryFunction(value: any): any;
        cellRendererFactoryFunction: Function;
    }
}
declare module qx.ui.table.cellrenderer {
    class Html extends qx.ui.table.cellrenderer.Conditional {
    }
}
declare module qx.ui.table.cellrenderer {
    class Image extends qx.ui.table.cellrenderer.AbstractImage {
        constructor(width?: number, height?: number);
    }
}
declare module qx.ui.table.cellrenderer {
    class Number extends qx.ui.table.cellrenderer.Conditional {
        getNumberFormat(): any;
        initNumberFormat(value: any): any;
        resetNumberFormat(): void;
        setNumberFormat(value: any): any;
        numberFormat: qx.util.format.NumberFormat;
    }
}
declare module qx.ui.table.cellrenderer {
    class Password extends qx.ui.table.cellrenderer.Default {
    }
}
declare module qx.ui.table.cellrenderer {
    class Replace extends qx.ui.table.cellrenderer.Default {
        addReversedReplaceMap(): boolean;
        getReplaceFunction(): any;
        getReplaceMap(): any;
        initReplaceFunction(value: any): any;
        initReplaceMap(value: any): any;
        resetReplaceFunction(): void;
        resetReplaceMap(): void;
        setReplaceFunction(value: any): any;
        setReplaceMap(value: any): any;
        replaceFunction: Function;
        replaceMap: any;
    }
}
declare module qx.ui.table.cellrenderer {
    class String extends qx.ui.table.cellrenderer.Conditional {
    }
}
declare module qx.ui.table.columnmenu {
    class Button extends qx.ui.form.MenuButton implements qx.ui.table.IColumnMenuButton {
        empty(): void;
        factory(item: string, options: IMap): qx.ui.core.Widget;
        getMenu(): any;
        initMenu(value: any): any;
        resetMenu(): void;
        setMenu(value: any): any;
        constructor();
        getBlocker(): qx.ui.core.Blocker;
    }
}
declare module qx.ui.table.columnmenu {
    class MenuItem extends qx.ui.menu.CheckBox implements qx.ui.table.IColumnMenuItem {
        getVisible(): any;
        initVisible(value: any): any;
        resetVisible(): void;
        setVisible(value: any): any;
        protected _applyVisible(value: boolean, old: boolean): void;
        toggleVisible(): boolean;
        constructor(text: string);
    }
}
declare module qx.ui.table.columnmodel {
    class Basic extends qx.core.Object {
        constructor();
        protected _getColToXPosMap(): IMap;
        getCellEditorFactory(col: number): qx.ui.table.ICellEditorFactory;
        getColumnWidth(col: number): number;
        getDataCellRenderer(col: number): qx.ui.table.ICellRenderer;
        getHeaderCellRenderer(col: number): qx.ui.table.IHeaderRenderer;
        getOverallColumnAtX(overXPos: number): number;
        getOverallColumnCount(): number;
        getOverallX(col: number): number;
        getVisibleColumnAtX(visXPos: number): number;
        getVisibleColumnCount(): number;
        getVisibleColumns(): qx.data.Array;
        getVisibleX(col: number): number;
        init(colCount: number, table: qx.ui.table.Table): void;
        isColumnVisible(col: number): boolean;
        moveColumn(fromOverXPos: number, toOverXPos: number): void;
        setCellEditorFactory(col: number, factory: qx.ui.table.ICellEditorFactory): void;
        setColumnsOrder(newPositions: number[]): void;
        setColumnVisible(col: number, visible: boolean): void;
        setColumnWidth(col: number, width: number, isPointerAction: boolean): void;
        setDataCellRenderer(col: number, renderer: qx.ui.table.ICellRenderer): qx.ui.table.ICellRenderer;
        setHeaderCellRenderer(col: number, renderer: qx.ui.table.IHeaderRenderer): void;
    }
}
declare module qx.ui.table.columnmodel {
    class Resize extends qx.ui.table.columnmodel.Basic {
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        constructor(obj: any);
        protected _addResetColumnWidthButton(event: qx.event.type.Data): void;
        protected _applyBehavior(value: qx.ui.table.columnmodel.resizebehavior.Abstract, old: qx.ui.table.columnmodel.resizebehavior.Abstract): void;
        protected _onappear(event: qx.event.type.Event): void;
        protected _oncolumnwidthchanged(event: qx.event.type.Data): void;
        protected _onTableWidthChanged(event: qx.event.type.Event): void;
        protected _onverticalscrollbarchanged(event: qx.event.type.Data): void;
        protected _onvisibilitychanged(event: qx.event.type.Data): void;
        getBehavior(): any;
        getTable(): qx.ui.table.Table;
        initBehavior(value: any): any;
        resetBehavior(): void;
        setBehavior(value: any): any;
    }
}
declare module qx.ui.table.columnmodel.resizebehavior {
    class Abstract extends qx.core.Object {
        protected _getAvailableWidth(): number;
        protected _setNumColumns(numColumns: number): void;
        onAppear(event: any, forceRefresh?: boolean): void;
        onColumnWidthChanged(event: any): void;
        onTableWidthChanged(event: any): void;
        onVerticalScrollBarChanged(event: any): void;
        onVisibilityChanged(event: any): void;
    }
}
declare module qx.ui.table.columnmodel.resizebehavior {
    class Default extends qx.ui.table.columnmodel.resizebehavior.Abstract {
        constructor();
        protected _computeColumnsFlexWidth(): void;
        protected _extendLastColumn(event: qx.event.type.Data): void;
        protected _extendNextColumn(event: qx.event.type.Data): void;
        protected _getResizeColumnData(): qx.ui.core.ColumnData[];
        getInitializeWidthsOnEveryAppear(): any;
        getLayoutChildren(): qx.ui.core.ColumnData[];
        getNewResizeBehaviorColumnData(): any;
        getTableColumnModel(): any;
        initInitializeWidthsOnEveryAppear(value: any): any;
        initNewResizeBehaviorColumnData(value: any): any;
        initTableColumnModel(value: any): any;
        isInitializeWidthsOnEveryAppear(): boolean;
        resetInitializeWidthsOnEveryAppear(): void;
        resetNewResizeBehaviorColumnData(): void;
        resetTableColumnModel(): void;
        set(col: number, map: IMap): void;
        setInitializeWidthsOnEveryAppear(value: any): any;
        setMaxWidth(col: number, width: number): void;
        setMinWidth(col: number, width: number): void;
        setNewResizeBehaviorColumnData(value: any): any;
        setTableColumnModel(value: any): any;
        setWidth(col: number, width: string, flex?: number): void;
        toggleInitializeWidthsOnEveryAppear(): boolean;
        initializeWidthsOnEveryAppear: boolean;
        newResizeBehaviorColumnData: Function;
        tableColumnModel: qx.ui.table.columnmodel.Resize;
    }
}
declare module qx.ui.table.headerrenderer {
    class Default extends qx.core.Object implements qx.ui.table.IHeaderRenderer {
        createHeaderCell(cellInfo: IMap): qx.ui.core.Widget;
        updateHeaderCell(cellInfo: IMap, cellWidget: qx.ui.core.Widget): void;
        getToolTip(): any;
        initToolTip(value: any): any;
        resetToolTip(): void;
        setToolTip(value: any): any;
        toolTip: string;
    }
}
declare module qx.ui.table.headerrenderer {
    class HeaderCell extends qx.ui.container.Composite {
        constructor();
        protected _applyIcon(value: string, old: string): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applySortIcon(value: string, old: string): void;
        getIcon(): any;
        getLabel(): any;
        getSortIcon(): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initSortIcon(value: any): any;
        resetIcon(): void;
        resetLabel(): void;
        resetSortIcon(): void;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setSortIcon(value: any): any;
        icon: string;
        label: string;
        sortIcon: string;
    }
}
declare module qx.ui.table.headerrenderer {
    class Icon extends qx.ui.table.headerrenderer.Default {
        constructor(iconUrl: string, tooltip?: string);
        getIconUrl(): any;
        initIconUrl(value: any): any;
        resetIconUrl(): void;
        setIconUrl(value: any): any;
        iconUrl: string;
    }
}
declare module qx.ui.table.model {
    class Abstract extends qx.core.Object implements qx.ui.table.ITableModel {
        getColumnCount(): number;
        getColumnId(columnIndex: number): string;
        getColumnIndexById(columnId: string): number;
        getColumnName(columnIndex: number): string;
        getRowCount(): number;
        getRowData(rowIndex: number): any;
        getSortColumnIndex(): number;
        getValue(columnIndex: number, rowIndex: number): any;
        getValueById(columnId: string, rowIndex: number): any;
        isColumnEditable(columnIndex: number): boolean;
        isColumnSortable(columnIndex: number): boolean;
        isSortAscending(): boolean;
        prefetchRows(firstRowIndex: number, lastRowIndex: number): void;
        setValue(columnIndex: number, rowIndex: number, value: any): void;
        setValueById(columnId: string, rowIndex: number, value: any): void;
        sortByColumn(columnIndex: number, ascending: boolean): void;
        constructor();
        init(table: qx.ui.table.Table): void;
        setColumnIds(columnIdArr: string[]): void;
        setColumnNamesById(columnNameMap: IMap): void;
        setColumnNamesByIndex(columnNameArr: string[]): void;
        setColumns(columnNameArr: string[], columnIdArr?: string[]): void;
    }
}
declare module qx.ui.table.model {
    class Filtered extends qx.ui.table.model.Simple {
        constructor();
        protected _js_in_array(the_needle: string, the_haystack: qx.data.Array): boolean;
        addBetweenFilter(filter: string, value1: number, value2: number, target: string): void;
        addNotRegex(regex: string, target: string, ignorecase: boolean): void;
        addNumericFilter(filter: string, value1: number, target: string): void;
        addRegex(regex: string, target: string, ignorecase: boolean): void;
        applyFilters(): void;
        hideRows(rowNum: number, numOfRows: number, dispatchEvent?: boolean): void;
        resetHiddenRows(): void;
    }
}
declare module qx.ui.table.model {
    class Remote extends qx.ui.table.model.Abstract {
        constructor();
        protected _cancelCurrentRequest(): boolean;
        protected _getIgnoreCurrentRequest(): boolean;
        protected _loadRowCount(): void;
        protected _loadRowData(firstRow: number, lastRow: number): void;
        protected _onRowCountLoaded(rowCount: number): void;
        protected _onRowDataLoaded(rowDataArr: IMap[]): void;
        protected _setRowBlockData(block: number, rowDataArr: any[]): void;
        clearCache(): void;
        getBlockConcurrentLoadRowCount(): any;
        getBlockSize(): any;
        getCacheContent(): IMap;
        getClearCacheOnRemove(): any;
        getMaxCachedBlockCount(): any;
        initBlockConcurrentLoadRowCount(value: any): any;
        initBlockSize(value: any): any;
        initClearCacheOnRemove(value: any): any;
        initMaxCachedBlockCount(value: any): any;
        isBlockConcurrentLoadRowCount(): boolean;
        isClearCacheOnRemove(): boolean;
        iterateCachedRows(iterator: Function, object: any): void;
        reloadData(): void;
        removeRow(rowIndex: number): void;
        resetBlockConcurrentLoadRowCount(): void;
        resetBlockSize(): void;
        resetClearCacheOnRemove(): void;
        resetMaxCachedBlockCount(): void;
        restoreCacheContent(cacheContent: IMap): void;
        setBlockConcurrentLoadRowCount(value: any): any;
        setBlockSize(value: any): any;
        setClearCacheOnRemove(value: any): any;
        setColumnEditable(columnIndex: number, editable: boolean): void;
        setColumnSortable(columnIndex: number, sortable: boolean): void;
        setEditable(editable: boolean): void;
        setMaxCachedBlockCount(value: any): any;
        setSortAscendingWithoutSortingData(sortAscending: boolean): void;
        setSortColumnIndexWithoutSortingData(sortColumnIndex: number): void;
        toggleBlockConcurrentLoadRowCount(): boolean;
        toggleClearCacheOnRemove(): boolean;
        blockConcurrentLoadRowCount: boolean;
        blockSize: number;
        clearCacheOnRemove: boolean;
        maxCachedBlockCount: number;
    }
}
declare module qx.ui.table.model {
    class Simple extends qx.ui.table.model.Abstract {
        constructor();
        protected _mapArray2RowArr(mapArr: IMap[], rememberMaps?: boolean): any[];
        protected _setSortAscending(ascending: boolean): void;
        protected _setSortColumnIndex(columnIndex: number): void;
        addRows(rowArr: any[], startIndex?: number, clearSorting?: boolean): void;
        addRowsAsMapArray(mapArr: IMap[], startIndex?: number, rememberMaps?: boolean, clearSorting?: boolean): void;
        clearSorting(): void;
        getCaseSensitiveSorting(): any;
        getData(): any[];
        getDataAsMapArray(): IMap[];
        getRowDataAsMap(rowIndex: number): IMap;
        getSortMethods(columnIndex: number): IMap;
        initCaseSensitiveSorting(value: any): any;
        isCaseSensitiveSorting(): boolean;
        removeRows(startIndex: number, howMany: number, clearSorting?: boolean): void;
        resetCaseSensitiveSorting(): void;
        setCaseSensitiveSorting(value: any): any;
        setColumnEditable(columnIndex: number, editable: boolean): void;
        setColumnSortable(columnIndex: number, sortable: boolean): void;
        setData(rowArr: any[], clearSorting?: boolean): void;
        setDataAsMapArray(mapArr: IMap[], rememberMaps?: boolean, clearSorting?: boolean): void;
        setEditable(editable: boolean): void;
        setRows(rowArr: any[], startIndex?: number, clearSorting?: boolean): void;
        setRowsAsMapArray(mapArr: IMap[], startIndex?: number, rememberMaps?: boolean, clearSorting?: boolean): void;
        setSortMethods(columnIndex: number, compare: IMap): void;
        toggleCaseSensitiveSorting(): boolean;
        caseSensitiveSorting: boolean;
        static _defaultSortComparatorAscending(row1: any, row2: any): number;
        static _defaultSortComparatorDescending(row1: any, row2: any): number;
        static _defaultSortComparatorInsensitiveAscending(row1: any, row2: any): number;
        static _defaultSortComparatorInsensitiveDescending(row1: any, row2: any): number;
    }
}
declare module qx.ui.table.pane {
    class CellEvent extends qx.event.type.Pointer {
        getColumn(): any;
        getRow(): any;
        initColumn(value: any): any;
        initRow(value: any): any;
        resetColumn(): void;
        resetRow(): void;
        setColumn(value: any): any;
        setRow(value: any): any;
        column: number;
        row: number;
    }
}
declare module qx.ui.table.pane {
    class Clipper extends qx.ui.container.Composite {
        constructor();
        scrollToX(value: number): void;
        scrollToY(value: number): void;
    }
}
declare module qx.ui.table.pane {
    class FocusIndicator extends qx.ui.container.Composite {
        constructor(scroller: any);
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        getColumn(): any;
        getRow(): any;
        initColumn(value: any): any;
        initRow(value: any): any;
        moveToCell(col?: number, row?: number): void;
        resetColumn(): void;
        resetRow(): void;
        setColumn(value: any): any;
        setRow(value: any): any;
        column: number;
        row: number;
    }
}
declare module qx.ui.table.pane {
    class Header extends qx.ui.core.Widget {
        constructor(paneScroller: qx.ui.table.pane.Scroller);
        protected _cleanUpCells(): void;
        protected _updateContent(completeUpdate: boolean): void;
        getBlocker(): qx.ui.core.Blocker;
        getHeaderWidgetAtColumn(col: number): qx.ui.table.headerrenderer.HeaderCell;
        getPaneScroller(): qx.ui.table.pane.Scroller;
        getTable(): qx.ui.table.Table;
        hideColumnMoveFeedback(): void;
        isShowingColumnMoveFeedback(): boolean;
        onColOrderChanged(): void;
        onPaneModelChanged(): void;
        onTableModelMetaDataChanged(): void;
        setColumnWidth(col: number, width: number, isPointerAction: boolean): void;
        setPointerOverColumn(col: number): void;
        showColumnMoveFeedback(col: number, x: number): void;
    }
}
declare module qx.ui.table.pane {
    class Model extends qx.core.Object {
        constructor(tableColumnModel: qx.ui.table.columnmodel.Basic);
        protected _applyFirstColumnX(value: number, old: number): void;
        protected _applyMaxColumnCount(value: number, old: number): void;
        protected _onColVisibilityChanged(evt: IMap): void;
        protected _onHeaderCellRendererChanged(evt: IMap): void;
        getColumnAtX(xPos: number): number;
        getColumnCount(): number;
        getColumnLeft(col: number): any;
        getFirstColumnX(): any;
        getMaxColumnCount(): any;
        getTotalWidth(): number;
        getX(col: number): number;
        initFirstColumnX(value: any): any;
        initMaxColumnCount(value: any): any;
        resetFirstColumnX(): void;
        resetMaxColumnCount(): void;
        setFirstColumnX(value: any): any;
        setMaxColumnCount(value: any): any;
        setTableColumnModel(tableColumnModel: qx.ui.table.columnmodel.Basic): void;
        firstColumnX: number;
        maxColumnCount: number;
    }
}
declare module qx.ui.table.pane {
    class Pane extends qx.ui.core.Widget {
        constructor(paneScroller: qx.ui.table.pane.Scroller);
        protected _applyFirstVisibleRow(value: number, old: number): void;
        protected _applyMaxCacheLines(value: number, old: number): void;
        protected _applyVisibleRowCount(value: number, old: number): void;
        protected _getRowsHtml(firstRow: number, rowCount: number): string;
        protected _scrollContent(rowOffset: number): void;
        protected _updateAllRows(): void;
        protected _updateRowStyles(onlyRow?: any): void;
        getFirstVisibleRow(): any;
        getMaxCacheLines(): any;
        getPaneScroller(): qx.ui.table.pane.Scroller;
        getTable(): qx.ui.table.Table;
        getVisibleRowCount(): any;
        initFirstVisibleRow(value: any): any;
        initMaxCacheLines(value: any): any;
        initVisibleRowCount(value: any): any;
        onColOrderChanged(): void;
        onFocusChanged(): void;
        onPaneModelChanged(): void;
        onSelectionChanged(): void;
        onTableModelDataChanged(firstRow: number, lastRow: number, firstColumn: number, lastColumn: number): void;
        onTableModelMetaDataChanged(): void;
        resetFirstVisibleRow(): void;
        resetMaxCacheLines(): void;
        resetVisibleRowCount(): void;
        setColumnWidth(col: number, width: number): void;
        setFirstVisibleRow(value: any): any;
        setFocusedCell(col?: number, row?: number, massUpdate?: boolean): void;
        setMaxCacheLines(value: any): any;
        setVisibleRowCount(value: any): any;
        updateContent(completeUpdate?: boolean, scrollOffset?: number, onlyRow?: number, onlySelectionOrFocusChanged?: boolean): void;
        firstVisibleRow: number;
        maxCacheLines: number;
        visibleRowCount: number;
    }
}
declare module qx.ui.table.pane {
    class Scroller extends qx.ui.core.Widget {
        protected _createScrollBar(orientation?: string): qx.ui.core.scroll.IScrollBar;
        constructor(table: qx.ui.table.Table);
        protected _applyHorizontalScrollBarVisible(value: boolean, old: boolean): void;
        protected _applyScrollTimeout(value: number, old: number): void;
        protected _applyShowCellFocusIndicator(value: boolean, old: boolean): void;
        protected _applyTablePaneModel(value: qx.ui.table.pane.Model, old: qx.ui.table.pane.Model): void;
        protected _applyVerticalScrollBarVisible(value: boolean, old: boolean): void;
        protected _createHeaderClipper(): qx.ui.table.pane.Clipper;
        protected _createPaneClipper(): qx.ui.table.pane.Clipper;
        protected _focusCellAtPagePos(pageX: number, pageY: number): void;
        protected _getColumnForPageX(pageX: number): number;
        protected _getResizeColumnForPageX(pageX: number): number;
        protected _getRowForPagePos(pageX: number, pageY: number): number;
        protected _hideResizeLine(): void;
        protected _onAppear(): void;
        protected _onCellEditorModalWindowClose(e: IMap): void;
        protected _onChangeCaptureHeader(e: qx.event.type.Data): void;
        protected _onContextMenu(e: qx.event.type.Pointer): void;
        protected _onDbltapPane(e: IMap): void;
        protected _onDisappear(): void;
        protected _oninterval(): void;
        protected _onPaneModelChanged(): void;
        protected _onPointerdownHeader(e: IMap): void;
        protected _onPointerdownPane(e: IMap): void;
        protected _onPointermoveHeader(e: IMap): void;
        protected _onPointermovePane(e: IMap): void;
        protected _onPointerout(e: IMap): void;
        protected _onPointerupFocusIndicator(e: qx.event.type.Pointer): void;
        protected _onPointerupHeader(e: IMap): void;
        protected _onResizePane(): void;
        protected _onRoll(e: qx.event.type.Roll): void;
        protected _onScrollX(e: IMap): void;
        protected _onScrollY(e: IMap): void;
        protected _onTapHeader(e: IMap): void;
        protected _onTapPane(e: IMap): void;
        protected _postponedUpdateContent(): void;
        protected _showResizeLine(x: number): void;
        protected _startInterval(timeout: number): void;
        protected _startMoveHeader(moveCol: number, pageX: number): void;
        protected _startResizeHeader(resizeCol: number, pageX: number): void;
        protected _stopInterval(): void;
        protected _stopMoveHeader(): void;
        protected _stopResizeHeader(): void;
        protected _updateContent(): void;
        protected _updateFocusIndicator(): void;
        cancelEditing(): void;
        flushEditor(): void;
        getContextMenuFromDataCellsOnly(): any;
        getFocusCellOnPointerMove(): any;
        getFocusedColumn(): number;
        getFocusedRow(): number;
        getHeader(): qx.ui.table.pane.Header;
        getHorizontalScrollBarVisible(): any;
        getLiveResize(): any;
        getNeededScrollBars(forceHorizontal?: boolean, preventVertical?: boolean): number;
        getPaneClipper(): qx.ui.table.pane.Clipper;
        getPaneInsetRight(): number;
        getResetSelectionOnHeaderTap(): any;
        getScrollAreaContainer(): qx.ui.table.pane.Clipper;
        getScrollTimeout(): any;
        getScrollX(): number;
        getScrollY(): number;
        getSelectBeforeFocus(): any;
        getShowCellFocusIndicator(): any;
        getTable(): qx.ui.table.Table;
        getTablePane(): qx.ui.table.pane.Pane;
        getTablePaneModel(): any;
        getTopRightWidget(): qx.ui.core.Widget;
        getVerticalScrollBarVisible(): any;
        hideColumnMoveFeedback(): void;
        initContextMenuFromDataCellsOnly(value: any): any;
        initFocusCellOnPointerMove(value: any): any;
        initHorizontalScrollBarVisible(value: any): any;
        initLiveResize(value: any): any;
        initResetSelectionOnHeaderTap(value: any): any;
        initScrollTimeout(value: any): any;
        initSelectBeforeFocus(value: any): any;
        initShowCellFocusIndicator(value: any): any;
        initTablePaneModel(value: any): any;
        initVerticalScrollBarVisible(value: any): any;
        isContextMenuFromDataCellsOnly(): boolean;
        isEditing(): any;
        isFocusCellOnPointerMove(): boolean;
        isHorizontalScrollBarVisible(): boolean;
        isLiveResize(): boolean;
        isResetSelectionOnHeaderTap(): boolean;
        isSelectBeforeFocus(): boolean;
        isShowCellFocusIndicator(): boolean;
        isVerticalScrollBarVisible(): boolean;
        onColOrderChanged(): void;
        onColVisibilityChanged(): void;
        onFocusChanged(): void;
        onKeepFirstVisibleRowCompleteChanged(): void;
        onSelectionChanged(): void;
        onTableModelDataChanged(firstRow: number, lastRow: number, firstColumn: number, lastColumn: number): void;
        onTableModelMetaDataChanged(): void;
        resetContextMenuFromDataCellsOnly(): void;
        resetFocusCellOnPointerMove(): void;
        resetHorizontalScrollBarVisible(): void;
        resetLiveResize(): void;
        resetResetSelectionOnHeaderTap(): void;
        resetScrollTimeout(): void;
        resetSelectBeforeFocus(): void;
        resetShowCellFocusIndicator(): void;
        resetTablePaneModel(): void;
        resetVerticalScrollBarVisible(): void;
        scrollCellVisible(col: number, row: number): void;
        setColumnWidth(col: number, width: number): void;
        setContextMenuFromDataCellsOnly(value: any): any;
        setFocusCellOnPointerMove(value: any): any;
        setFocusedCell(col: number, row: number): void;
        setHorizontalScrollBarVisible(value: any): any;
        setLiveResize(value: any): any;
        setPaneWidth(width: number): void;
        setResetSelectionOnHeaderTap(value: any): any;
        setScrollTimeout(value: any): any;
        setScrollX(scrollX: number): void;
        setScrollY(scrollY: number, renderSync?: boolean): void;
        setSelectBeforeFocus(value: any): any;
        setShowCellFocusIndicator(value: any): any;
        setTablePaneModel(value: any): any;
        setTopRightWidget(widget: qx.ui.core.Widget): void;
        setVerticalScrollBarVisible(value: any): any;
        showColumnMoveFeedback(pageX: number): number;
        startEditing(): boolean;
        stopEditing(): void;
        toggleContextMenuFromDataCellsOnly(): boolean;
        toggleFocusCellOnPointerMove(): boolean;
        toggleHorizontalScrollBarVisible(): boolean;
        toggleLiveResize(): boolean;
        toggleResetSelectionOnHeaderTap(): boolean;
        toggleSelectBeforeFocus(): boolean;
        toggleShowCellFocusIndicator(): boolean;
        toggleVerticalScrollBarVisible(): boolean;
        updateHorScrollBarMaximum(): void;
        updateVerScrollBarMaximum(): void;
        contextMenuFromDataCellsOnly: boolean;
        focusCellOnPointerMove: boolean;
        liveResize: boolean;
        resetSelectionOnHeaderTap: boolean;
        scrollTimeout: number;
        selectBeforeFocus: boolean;
        showCellFocusIndicator: boolean;
    }
}
declare module qx.ui.table.rowrenderer {
    class Default extends qx.core.Object implements qx.ui.table.IRowRenderer {
        createRowStyle(rowInfo: IMap): void;
        getRowClass(rowInfo: IMap): void;
        getRowHeightStyle(height: number): void;
        updateDataRowElement(rowInfo: IMap, rowElement: HTMLElement): void;
        constructor();
        protected _renderFont(font: qx.bom.Font): void;
        getHighlightFocusRow(): any;
        getRowAttributes(rowInfo: any): string;
        initHighlightFocusRow(value: any): any;
        isHighlightFocusRow(): boolean;
        resetHighlightFocusRow(): void;
        setHighlightFocusRow(value: any): any;
        toggleHighlightFocusRow(): boolean;
        highlightFocusRow: boolean;
    }
}
declare module qx.ui.table.selection {
    class Manager extends qx.core.Object {
        constructor();
        protected _handleSelectEvent(index: number, evt: IMap): void;
        getSelectionModel(): any;
        handleMoveKeyDown(index: number, evt: IMap): void;
        handleSelectKeyDown(index: number, evt: IMap): void;
        handleTap(index: number, evt: qx.event.type.Tap): void;
        initSelectionModel(value: any): any;
        resetSelectionModel(): void;
        setSelectionModel(value: any): any;
        selectionModel: qx.ui.table.selection.Model;
    }
}
declare module qx.ui.table.selection {
    class Model extends qx.core.Object {
        constructor();
        protected _addSelectionInterval(fromIndex: number, toIndex: number): void;
        protected _applySelectionMode(selectionMode: any, old: any): void;
        protected _dumpRanges(): void;
        protected _fireChangeSelection(): void;
        protected _getSelectedRangeArr(): IMap[];
        protected _resetSelection(): void;
        protected _setAnchorSelectionIndex(index: number): void;
        protected _setLeadSelectionIndex(index: number): void;
        addSelectionInterval(fromIndex: number, toIndex: number): void;
        getAnchorSelectionIndex(): number;
        getLeadSelectionIndex(): number;
        getSelectedCount(): number;
        getSelectedRanges(): IMap[];
        getSelectionMode(): any;
        hasBatchMode(): boolean;
        initSelectionMode(value: any): any;
        isSelectedIndex(index: number): boolean;
        isSelectionEmpty(): boolean;
        iterateSelection(iterator: Function, object?: any): void;
        removeSelectionInterval(fromIndex: number, toIndex: number): void;
        resetSelection(): void;
        resetSelectionMode(): void;
        setBatchMode(batchMode: boolean): boolean;
        setSelectionInterval(fromIndex: number, toIndex: number): void;
        setSelectionMode(value: any): any;
    }
}
declare module qx.ui.tabview {
    class Page extends qx.ui.container.Composite {
        constructor(label: string, icon?: string);
        protected _applyIcon(value: string, old: string): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyShowCloseButton(value: boolean, old: boolean): void;
        protected _onButtonClose(): void;
        getIcon(): any;
        getButton(): qx.ui.tabview.TabButton;
        getLabel(): any;
        getShowCloseButton(): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initShowCloseButton(value: any): any;
        isShowCloseButton(): boolean;
        resetIcon(): void;
        resetLabel(): void;
        resetShowCloseButton(): void;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setShowCloseButton(value: any): any;
        toggleShowCloseButton(): boolean;
        icon: string;
        label: string;
        showCloseButton: boolean;
    }
}
declare module qx.ui.tabview {
    class TabButton extends qx.ui.form.RadioButton implements qx.ui.form.IRadioItem {
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
        constructor();
        protected _applyShowCloseButton(value: boolean, old: boolean): void;
        protected _onCloseButtonTap(): void;
        getShowCloseButton(): any;
        initShowCloseButton(value: any): any;
        isShowCloseButton(): boolean;
        resetShowCloseButton(): void;
        setShowCloseButton(value: any): any;
        toggleShowCloseButton(): boolean;
        showCloseButton: boolean;
    }
}
declare module qx.ui.tabview {
    class TabView extends qx.ui.core.Widget implements qx.ui.core.ISingleSelection {
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetSelection(): void;
        setSelection(items: qx.ui.core.Widget[]): void;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        constructor(barPosition?: string);
        protected _applyBarPosition(value: boolean, old: boolean): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _onBeforeChangeSelection(e: qx.event.type.Event): void;
        protected _onChangeSelection(e: qx.event.type.Data): void;
        protected _onPageClose(e: qx.event.type.Pointer): void;
        protected _onRadioChangeSelection(e: qx.event.type.Data): void;
        add(page: qx.ui.tabview.Page): void;
        addAt(page: qx.ui.tabview.Page, index?: number): void;
        getBarPosition(): any;
        getChildren(): qx.ui.tabview.Page[];
        indexOf(page: qx.ui.tabview.Page): number;
        initBarPosition(value: any): any;
        remove(page: qx.ui.tabview.Page): void;
        resetBarPosition(): void;
        setBarPosition(value: any): any;
    }
}
declare module qx.ui.toolbar {
    class Button extends qx.ui.form.Button {
        constructor(label: any, icon?: any, command?: any);
    }
}
declare module qx.ui.toolbar {
    class CheckBox extends qx.ui.form.ToggleButton {
        constructor(label?: any, icon?: any);
    }
}
declare module qx.ui.toolbar {
    class MenuButton extends qx.ui.menubar.Button {
        showArrow: boolean;
        protected _applyShowArrow(value: boolean, old: boolean): void;
        getShowArrow(): any;
        initShowArrow(value: any): any;
        isShowArrow(): boolean;
        resetShowArrow(): void;
        setShowArrow(value: any): any;
        toggleShowArrow(): boolean;
    }
}
declare module qx.ui.toolbar {
    class Part extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        constructor();
        protected _applySpacing(value: number, old: number): void;
        addSeparator(): void;
        getMenuButtons(): qx.data.Array;
        getShow(): any;
        getSpacing(): any;
        initShow(value: any): any;
        initSpacing(value: any): any;
        resetShow(): void;
        resetSpacing(): void;
        setShow(value: any): any;
        setSpacing(value: any): any;
        spacing: number;
    }
}
declare module qx.ui.toolbar {
    class PartContainer extends qx.ui.container.Composite {
        constructor();
        getShow(): any;
        initShow(value: any): any;
        resetShow(): void;
        setShow(value: any): any;
    }
}
declare module qx.ui.toolbar {
    class RadioButton extends qx.ui.toolbar.CheckBox implements qx.ui.form.IModel, qx.ui.form.IRadioItem {
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        getGroup(): qx.ui.form.RadioGroup;
        getValue(): boolean;
        setGroup(value: qx.ui.form.RadioGroup): void;
        setValue(value: boolean): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
    }
}
declare module qx.ui.toolbar {
    class Separator extends qx.ui.core.Widget {
    }
}
declare module qx.ui.toolbar {
    class SplitButton extends qx.ui.form.SplitButton {
        constructor(label: any, icon: any, menu: any, command: any);
    }
}
declare module qx.ui.toolbar {
    class ToolBar extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        constructor();
        protected _applyOverflowHandling(value: boolean, old: boolean): void;
        protected _applyOverflowIndicator(value: qx.ui.core.Widget, old: qx.ui.core.Widget): void;
        protected _applyShow(value: any, old: any): void;
        protected _applySpacing(value: number, old: number): void;
        protected _getNextToHide(): any;
        protected _onResize(e: qx.event.type.Data): void;
        protected _recalculateOverflow(width?: number, requiredWidth?: number): void;
        addSeparator(): void;
        addSpacer(): qx.ui.core.Spacer;
        getMenuButtons(): qx.data.Array;
        getOpenMenu(): any;
        getOverflowHandling(): any;
        getOverflowIndicator(): any;
        getShow(): any;
        getSpacing(): any;
        initOpenMenu(value: any): any;
        initOverflowHandling(value: any): any;
        initOverflowIndicator(value: any): any;
        initShow(value: any): any;
        initSpacing(value: any): any;
        isOverflowHandling(): boolean;
        resetOpenMenu(): void;
        resetOverflowHandling(): void;
        resetOverflowIndicator(): void;
        resetShow(): void;
        resetSpacing(): void;
        setOpenMenu(value: any): any;
        setOverflowHandling(value: any): any;
        setOverflowIndicator(value: any): any;
        setRemovePriority(item: qx.ui.core.Widget, priority: number, override: boolean): void;
        setShow(value: any): any;
        setSpacing(value: any): any;
        toggleOverflowHandling(): boolean;
        overflowHandling: boolean;
        overflowIndicator: qx.ui.core.Widget;
        spacing: number;
    }
}
declare module qx.ui.tooltip {
    class Manager extends qx.core.Object {
        constructor();
        protected _applyCurrent(value: qx.ui.tooltip.ToolTip, old: qx.ui.tooltip.ToolTip): void;
        getCurrent(): any;
        getSharedErrorTooltip(): qx.ui.tooltip.ToolTip;
        getSharedTooltip(): qx.ui.tooltip.ToolTip;
        getShowInvalidToolTips(): any;
        getShowToolTips(): any;
        initCurrent(value: any): any;
        initShowInvalidToolTips(value: any): any;
        initShowToolTips(value: any): any;
        isShowInvalidToolTips(): boolean;
        isShowToolTips(): boolean;
        resetCurrent(): void;
        resetShowInvalidToolTips(): void;
        resetShowToolTips(): void;
        setCurrent(value: any): any;
        setShowInvalidToolTips(value: any): any;
        setShowToolTips(value: any): any;
        showToolTip(target: any): void;
        toggleShowInvalidToolTips(): boolean;
        toggleShowToolTips(): boolean;
        current: qx.ui.tooltip.ToolTip;
        showInvalidToolTips: boolean;
        showToolTips: boolean;
        static getInstance(): qx.ui.tooltip.Manager;
    }
}
declare module qx.ui.tooltip {
    class ToolTip extends qx.ui.popup.Popup {
        constructor(label: string, icon?: string);
        protected _applyArrowPosition(value: any, old: any): void;
        protected _applyIcon(value: string, old: string): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyRich(value: boolean, old: boolean): void;
        protected _onPointerOver(e: qx.event.type.Pointer): void;
        getArrowPosition(): any;
        getHideTimeout(): any;
        getIcon(): any;
        getLabel(): any;
        getOpener(): any;
        getRich(): any;
        getShowTimeout(): any;
        initArrowPosition(value: any): any;
        initHideTimeout(value: any): any;
        initIcon(value: any): any;
        initLabel(value: any): any;
        initOpener(value: any): any;
        initRich(value: any): any;
        initShowTimeout(value: any): any;
        isRich(): boolean;
        resetArrowPosition(): void;
        resetHideTimeout(): void;
        resetIcon(): void;
        resetLabel(): void;
        resetOpener(): void;
        resetRich(): void;
        resetShowTimeout(): void;
        setArrowPosition(value: any): any;
        setHideTimeout(value: any): any;
        setIcon(value: any): any;
        setLabel(value: any): any;
        setOpener(value: any): any;
        setRich(value: any): any;
        setShowTimeout(value: any): any;
        toggleRich(): boolean;
        hideTimeout: number;
        icon: string;
        label: string;
        opener: qx.ui.core.Widget;
        rich: boolean;
        showTimeout: number;
    }
}
declare module qx.ui.tree {
    class Tree extends qx.ui.core.scroll.AbstractScrollArea implements qx.ui.core.IMultiSelection, qx.ui.form.IModelSelection, qx.ui.form.IForm {
        addToSelection(item: qx.ui.core.Widget): void;
        removeFromSelection(item: qx.ui.core.Widget): void;
        selectAll(): void;
        getModelSelection(): qx.data.Array;
        setModelSelection(value: qx.data.Array): void;
        getEnabled(): boolean;
        getInvalidMessage(): string;
        getRequired(): boolean;
        getRequiredInvalidMessage(): string;
        getValid(): boolean;
        setEnabled(enabled: boolean): void;
        setInvalidMessage(message: string): void;
        setRequired(required: boolean): void;
        setRequiredInvalidMessage(message: string): void;
        setValid(valid: boolean): void;
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _getLeadItem(): qx.ui.core.Widget;
        protected _getManager(): qx.ui.core.selection.Abstract;
        protected _onSelectionChange(e: qx.event.type.Data): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelectables(all: boolean): qx.ui.core.Widget[];
        getSelection(): qx.ui.core.Widget[];
        getSelectionContext(): any;
        getSelectionMode(): any;
        getSortedSelection(): qx.ui.core.Widget[];
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelectionMode(value: any): any;
        invertSelection(): void;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        isSelected(item: qx.ui.core.Widget): boolean;
        isSelectionEmpty(): boolean;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelection(): void;
        resetSelectionMode(): void;
        selectRange(begin: qx.ui.core.Widget, end: qx.ui.core.Widget): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelection(items: qx.ui.core.Widget[]): void;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        protected _applyValid(value: boolean, old: boolean): void;
        initInvalidMessage(value: any): any;
        initRequired(value: any): any;
        initRequiredInvalidMessage(value: any): any;
        initValid(value: any): any;
        isRequired(): boolean;
        isValid(): boolean;
        resetInvalidMessage(): void;
        resetRequired(): void;
        resetRequiredInvalidMessage(): void;
        resetValid(): void;
        toggleRequired(): boolean;
        toggleValid(): boolean;
        constructor();
        protected _applyHideRoot(value: boolean, old: boolean): void;
        protected _applyOpenMode(value: any, old: any): void;
        protected _applyRoot(value: qx.ui.tree.core.AbstractTreeItem, old: qx.ui.tree.core.AbstractTreeItem): void;
        protected _applyRootOpenClose(value: boolean, old: boolean): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _onChangeSelection(e: qx.event.type.Data): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onOpen(e: qx.event.type.Pointer): void;
        getChildren(): qx.ui.tree.core.AbstractTreeItem[];
        getHideRoot(): any;
        getItems(recursive?: boolean, invisible?: boolean): qx.ui.tree.core.AbstractTreeItem[];
        getNextNodeOf(treeItem: qx.ui.tree.core.AbstractTreeItem, invisible?: boolean): qx.ui.tree.core.AbstractTreeItem;
        getNextSiblingOf(treeItem: qx.ui.tree.core.AbstractTreeItem): qx.ui.tree.core.AbstractTreeItem;
        getOpenMode(): any;
        getPreviousNodeOf(treeItem: qx.ui.tree.core.AbstractTreeItem, invisible?: boolean): qx.ui.tree.core.AbstractTreeItem;
        getPreviousSiblingOf(treeItem: qx.ui.tree.core.AbstractTreeItem): qx.ui.tree.core.AbstractTreeItem;
        getRoot(): any;
        getRootOpenClose(): any;
        getTreeItem(widget: qx.ui.core.Widget): any;
        initHideRoot(value: any): any;
        initOpenMode(value: any): any;
        initRoot(value: any): any;
        initRootOpenClose(value: any): any;
        isHideRoot(): boolean;
        isRootOpenClose(): boolean;
        resetHideRoot(): void;
        resetOpenMode(): void;
        resetRoot(): void;
        resetRootOpenClose(): void;
        setHideRoot(value: any): any;
        setOpenMode(value: any): any;
        setRoot(value: any): any;
        setRootOpenClose(value: any): any;
        toggleHideRoot(): boolean;
        toggleRootOpenClose(): boolean;
        hideRoot: boolean;
        rootOpenClose: boolean;
    }
}
declare module qx.ui.tree {
    class TreeFile extends qx.ui.tree.core.AbstractTreeItem {
    }
}
declare module qx.ui.tree {
    class TreeFolder extends qx.ui.tree.core.AbstractTreeItem {
    }
}
declare module qx.ui.tree {
    class VirtualTree extends qx.ui.virtual.core.Scroller implements qx.ui.tree.core.IVirtualTree, qx.data.controller.ISelection {
        closeNode(node: qx.core.Object): void;
        getLevel(row: number): number;
        getSelection(): qx.data.Array;
        isNodeOpen(node: qx.core.Object): boolean;
        isShowTopLevelOpenCloseIcons(): boolean;
        openNode(node: qx.core.Object): void;
        resetSelection(): void;
        setSelection(value: qx.data.IListData): void;
        protected _applyDefaultSelection(): void;
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelection(value: qx.data.Array, old: qx.data.Array): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _initSelectionManager(): void;
        protected _onChangeSelection(e: qx.event.type.Data): void;
        protected _onManagerChangeSelection(e: qx.event.type.Data): void;
        protected _updateSelection(): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelectionMode(): any;
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelection(value: any): any;
        initSelectionMode(value: any): any;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelectionMode(): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        constructor(model?: qx.core.Object, labelPath?: string, childProperty?: string);
        protected _afterApplySelection(): void;
        protected _applyChildProperty(value: string, old: string): void;
        protected _applyDelegate(value: any, old: any): void;
        protected _applyHideRoot(value: boolean, old: boolean): void;
        protected _applyIconOptions(value: any, old: any): void;
        protected _applyIconPath(value: string, old: string): void;
        protected _applyLabelOptions(value: any, old: any): void;
        protected _applyLabelPath(value: string, old: string): void;
        protected _applyModel(value: qx.core.Object, old: qx.core.Object): void;
        protected _applyOpenMode(value: any, old: any): void;
        protected _applyRowHeight(value: number, old: number): void;
        protected _applyShowLeafs(value: boolean, old: boolean): void;
        protected _applyShowTopLevelOpenCloseIcons(value: boolean, old: boolean): void;
        protected _beforeApplySelection(newSelection: qx.data.Array): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _getDataFromRow(row: number): any;
        protected _getSelectables(): qx.data.Array;
        protected _init(): void;
        protected _initLayer(): void;
        protected _onChangeBubble(event: qx.event.type.Data): void;
        protected _onKeyPress(e: qx.event.type.KeySequence): void;
        protected _onOpen(event: qx.ui.virtual.core.CellEvent): void;
        protected _onUpdated(event: qx.event.type.Event): void;
        protected _reverseLookup(index: number): number;
        getChildProperty(): any;
        getDelegate(): any;
        getHideRoot(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getItemHeight(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        getLookupTable(): void;
        getModel(): any;
        getOpenMode(): any;
        getShowLeafs(): any;
        getShowTopLevelOpenCloseIcons(): any;
        hasChildren(node: any): void;
        initChildProperty(value: any): any;
        initDelegate(value: any): any;
        initHideRoot(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initItemHeight(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        initModel(value: any): any;
        initOpenMode(value: any): any;
        initShowLeafs(value: any): any;
        initShowTopLevelOpenCloseIcons(value: any): any;
        isHideRoot(): boolean;
        isNode(item: any): void;
        isShowLeafs(): boolean;
        openNodeAndParents(node: qx.core.Object): void;
        refresh(): void;
        resetChildProperty(): void;
        resetDelegate(): void;
        resetHideRoot(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetItemHeight(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        resetModel(): void;
        resetOpenMode(): void;
        resetShowLeafs(): void;
        resetShowTopLevelOpenCloseIcons(): void;
        setChildProperty(value: any): any;
        setDelegate(value: any): any;
        setHideRoot(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setItemHeight(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        setModel(value: any): any;
        setOpenMode(value: any): any;
        setShowLeafs(value: any): any;
        setShowTopLevelOpenCloseIcons(value: any): any;
        toggleHideRoot(): boolean;
        toggleShowLeafs(): boolean;
        toggleShowTopLevelOpenCloseIcons(): boolean;
        childProperty: string;
        hideRoot: boolean;
        iconPath: string;
        itemHeight: number;
        labelPath: string;
        showLeafs: boolean;
        showTopLevelOpenCloseIcons: boolean;
    }
}
declare module qx.ui.tree {
    class VirtualTreeItem extends qx.ui.tree.core.AbstractItem {
        protected _applyModel(value: any, old: any): void;
        protected _onChangeChildProperty(e: qx.event.type.Data): void;
        protected _onChangeLength(): void;
    }
}
declare module qx.ui.tree.core {
    class AbstractItem extends qx.ui.core.Widget implements qx.ui.form.IModel {
        getModel(): any;
        resetModel(): void;
        setModel(value: any): void;
        protected _applyModel(value: any, old: any): void;
        initModel(value: any): any;
        constructor(label?: string);
        protected _addWidgets(): void;
        protected _applyIcon(value: string, old: string): void;
        protected _applyIconOpened(value: string, old: string): void;
        protected _applyIndent(value: number, old: number): void;
        protected _applyLabel(value: string, old: string): void;
        protected _applyOpen(value: boolean, old: boolean): void;
        protected _applyOpenSymbolMode(value: any, old: any): void;
        protected _onChangeOpen(e: qx.event.type.Data): void;
        protected _shouldShowOpenSymbol(): boolean;
        protected _updateIndent(): void;
        addIcon(): void;
        addLabel(text?: string): void;
        addOpenButton(): void;
        addSpacer(): void;
        addWidget(widget: qx.ui.core.Widget, options?: IMap): void;
        getIcon(): any;
        getIconOpened(): any;
        getIndent(): any;
        getLabel(): any;
        getLevel(): any;
        getOpen(): any;
        getOpenSymbolMode(): any;
        hasChildren(): boolean;
        initIcon(value: any): any;
        initIconOpened(value: any): any;
        initIndent(value: any): any;
        initLabel(value: any): any;
        initOpen(value: any): any;
        initOpenSymbolMode(value: any): any;
        isOpen(): boolean;
        isOpenable(): boolean;
        resetIcon(): void;
        resetIconOpened(): void;
        resetIndent(): void;
        resetLabel(): void;
        resetOpen(): void;
        resetOpenSymbolMode(): void;
        setIcon(value: any): any;
        setIconOpened(value: any): any;
        setIndent(value: any): any;
        setLabel(value: any): any;
        setOpen(value: any): any;
        setOpenSymbolMode(value: any): any;
        toggleOpen(): boolean;
    }
}
declare module qx.ui.tree.core {
    class AbstractTreeItem extends qx.ui.tree.core.AbstractItem {
        constructor(label: any);
        add(varargs: qx.ui.tree.core.AbstractTreeItem): void;
        addAfter(treeItem: qx.ui.tree.core.AbstractTreeItem, after: qx.ui.tree.core.AbstractTreeItem): void;
        addAt(treeItem: qx.ui.tree.core.AbstractTreeItem, index: number): void;
        addAtBegin(treeItem: qx.ui.tree.core.AbstractTreeItem): void;
        addBefore(treeItem: qx.ui.tree.core.AbstractTreeItem, before: qx.ui.tree.core.AbstractTreeItem): void;
        getChildren(): qx.ui.tree.core.AbstractTreeItem[];
        getItems(recursive?: boolean, invisible?: boolean, ignoreFirst?: boolean): qx.ui.tree.core.AbstractTreeItem[];
        getParent(): any;
        getParentChildrenContainer(): qx.ui.core.Widget;
        getTree(): any;
        hasChildrenContainer(): boolean;
        initParent(value: any): any;
        remove(varargs: qx.ui.tree.core.AbstractTreeItem): void;
        removeAll(): void;
        removeAt(index: number): void;
        resetParent(): void;
        setParent(value: any): any;
        parent: qx.ui.tree.core.AbstractTreeItem;
    }
}
declare module qx.ui.tree.core {
    class FolderOpenButton extends qx.ui.basic.Image {
        protected _applyCommand(value: qx.ui.core.Command, old: qx.ui.core.Command): void;
        execute(): void;
        getCommand(): any;
        initCommand(value: any): any;
        resetCommand(): void;
        setCommand(value: any): any;
        constructor();
        protected _applyOpen(value: boolean, old: boolean): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        protected _stopPropagation(e: qx.event.type.Event): void;
        getOpen(): any;
        initOpen(value: any): any;
        isOpen(): boolean;
        resetOpen(): void;
        setOpen(value: any): any;
        toggleOpen(): boolean;
    }
}
declare module qx.ui.tree.core {
    interface IVirtualTree {
        closeNode(node: qx.core.Object): void;
        getLevel(row: number): number;
        getSelection(): qx.data.Array;
        isNodeOpen(node: qx.core.Object): boolean;
        isShowTopLevelOpenCloseIcons(): boolean;
        openNode(node: qx.core.Object): void;
    }
}
declare module qx.ui.tree.core {
    interface IVirtualTreeDelegate {
        bindItem(controller: qx.ui.list.core.MWidgetController, item: qx.ui.core.Widget, id: number): void;
        configureItem(item: qx.ui.core.Widget): void;
        createItem(): qx.ui.core.Widget;
        filter(data: any): boolean;
        onPool(item: qx.ui.core.Widget): void;
        sorter(a: any, b: any): number;
    }
}
declare module qx.ui.tree.core {
    class MWidgetController {
        constructor();
        protected _bindItem(item: qx.ui.core.Widget, index: number): void;
        protected _removeBindingsFrom(item: qx.ui.core.Widget): void;
        bindDefaultProperties(item: qx.ui.core.Widget, index: number): void;
        bindProperty(sourcePath: any, targetProperty: string, options: any, targetWidget: qx.ui.core.Widget, index: number): void;
        bindPropertyReverse(targetPath: any, sourceProperty: string, options: any, sourceWidget: qx.ui.core.Widget, index: number): void;
        getChildProperty(): any;
        getDelegate(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        initChildProperty(value: any): any;
        initDelegate(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        removeBindings(): void;
        resetChildProperty(): void;
        resetDelegate(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        setChildProperty(value: any): any;
        setDelegate(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setLabelOptions(value: any): any;
        setLabelPath(value: any): any;
        childProperty: string;
        iconPath: string;
        labelPath: string;
    }
}
declare module qx.ui.tree.core {
    class Util {
        static hasChildren(node: qx.core.Object, childProperty: string, ignoreLeafs?: boolean): boolean;
        static isNode(node: qx.core.Object, childProperty: string): boolean;
    }
}
declare module qx.ui.tree.provider {
    interface IVirtualTreeProvider {
        createLayer(): qx.ui.virtual.layer.Abstract;
        createRenderer(): any;
        isSelectable(row: number): boolean;
        setChildProperty(value: string): void;
        setLabelPath(value: string): void;
        styleSelectabled(row: number): void;
        styleUnselectabled(row: number): void;
    }
}
declare module qx.ui.tree.provider {
    class WidgetProvider extends qx.core.Object implements qx.ui.virtual.core.IWidgetCellProvider, qx.ui.tree.provider.IVirtualTreeProvider {
        getCellWidget(row: number, column: number): qx.ui.core.LayoutItem;
        poolCellWidget(widget: qx.ui.core.LayoutItem): void;
        createLayer(): qx.ui.virtual.layer.Abstract;
        createRenderer(): any;
        isSelectable(row: number): boolean;
        setChildProperty(value: string): void;
        setLabelPath(value: string): void;
        styleSelectabled(row: number): void;
        styleUnselectabled(row: number): void;
        protected _bindItem(item: qx.ui.core.Widget, index: number): void;
        protected _removeBindingsFrom(item: qx.ui.core.Widget): void;
        bindDefaultProperties(item: qx.ui.core.Widget, index: number): void;
        bindProperty(sourcePath: any, targetProperty: string, options: any, targetWidget: qx.ui.core.Widget, index: number): void;
        bindPropertyReverse(targetPath: any, sourceProperty: string, options: any, sourceWidget: qx.ui.core.Widget, index: number): void;
        getChildProperty(): any;
        getDelegate(): any;
        getIconOptions(): any;
        getIconPath(): any;
        getLabelOptions(): any;
        getLabelPath(): any;
        initChildProperty(value: any): any;
        initDelegate(value: any): any;
        initIconOptions(value: any): any;
        initIconPath(value: any): any;
        initLabelOptions(value: any): any;
        initLabelPath(value: any): any;
        removeBindings(): void;
        resetChildProperty(): void;
        resetDelegate(): void;
        resetIconOptions(): void;
        resetIconPath(): void;
        resetLabelOptions(): void;
        resetLabelPath(): void;
        setDelegate(value: any): any;
        setIconOptions(value: any): any;
        setIconPath(value: any): any;
        setLabelOptions(value: any): any;
        constructor(tree: qx.ui.tree.VirtualTree);
        protected _onChangeDelegate(event: qx.event.type.Data): void;
        protected _onItemCreated(event: qx.event.type.Data): void;
        protected _onPool(item: qx.ui.core.Widget): void;
        protected _styleSelectabled(widget: qx.ui.core.Widget): void;
        protected _styleUnselectabled(widget: qx.ui.core.Widget): void;
    }
}
declare module qx.ui.tree.selection {
    class SelectionManager extends qx.ui.core.selection.ScrollArea {
    }
}
declare module qx.ui.treevirtual {
    class DefaultDataCellRenderer extends qx.ui.table.cellrenderer.Default {
    }
}
declare module qx.ui.treevirtual {
    class MFamily {
        familyGetFirstChild(nodeReference: number): number;
        familyGetLastChild(nodeReference: number): number;
        familyGetNextSibling(nodeReference: number): number;
        familyGetPrevSibling(nodeReference: number): number;
    }
}
declare module qx.ui.treevirtual {
    class MNode {
        nodeGet(nodeReference: number): any;
        nodeGetCellStyle(nodeReference: number): string;
        nodeGetHideOpenClose(nodeReference: number): boolean;
        nodeGetIcon(nodeReference: number): string;
        nodeGetLabel(nodeReference: number): string;
        nodeGetLabelStyle(nodeReference: number): string;
        nodeGetOpened(nodeReference: number): boolean;
        nodeGetSelected(nodeReference: number): boolean;
        nodeGetSelectedIcon(nodeReference: number): string;
        nodeSetCellStyle(nodeReference: number, style: string): void;
        nodeSetHideOpenClose(nodeReference: number, b: boolean): void;
        nodeSetIcon(nodeReference: number, path: string): void;
        nodeSetLabel(nodeReference: number, label: string): void;
        nodeSetLabelStyle(nodeReference: number, style: string): void;
        nodeSetOpened(nodeReference: number, b: boolean): void;
        nodeSetSelected(nodeReference: number, b: boolean): void;
        nodeSetSelectedIcon(nodeReference: number, path: string): void;
        nodeSetState(nodeReference: number, attributes: IMap): void;
        nodeToggleOpened(nodeReference: number): void;
    }
}
declare module qx.ui.treevirtual {
    class MTreePrimitive {
        static _addNode(nodeArr: IMap, parentNodeId: number, label: string, bOpened: boolean, bHideOpenCloseButton: boolean, type: number, icon: string, iconSelected: string, nodeId?: number): number;
        static _getEmptyTree(): IMap;
    }
}
declare module qx.ui.treevirtual {
    class SelectionManager extends qx.ui.table.selection.Manager {
        constructor(table: qx.ui.table.Table);
        protected _handleExtendedClick(tree: qx.ui.treevirtual.TreeVirtual, evt: IMap, node: IMap, left: number): boolean;
        getTable(): qx.ui.table.Table;
    }
}
declare module qx.ui.treevirtual {
    class SimpleTreeDataCellRenderer extends qx.ui.table.cellrenderer.Abstract {
        constructor();
        protected _addExtraContentBeforeIcon(cellInfo: IMap, pos: number): IMap;
        protected _addExtraContentBeforeIndentation(cellInfo: IMap, pos: number): IMap;
        protected _addExtraContentBeforeLabel(cellInfo: IMap, pos: number): IMap;
        protected _addIcon(cellInfo: IMap, pos: number): IMap;
        protected _addImage(imageInfo: IMap): string;
        protected _addIndentation(cellInfo: IMap, pos: number): IMap;
        protected _addLabel(cellInfo: IMap, pos: number): string;
        protected _getIndentSymbol(column: number, node: any, bUseTreeLines: boolean, bAlwaysShowOpenCloseSymbol: boolean, bExcludeFirstLevelTreeLines: boolean): IMap;
        getAlwaysShowOpenCloseSymbol(): any;
        getExcludeFirstLevelTreeLines(): any;
        getUseTreeLines(): any;
        initAlwaysShowOpenCloseSymbol(value: any): any;
        initExcludeFirstLevelTreeLines(value: any): any;
        initUseTreeLines(value: any): any;
        isAlwaysShowOpenCloseSymbol(): boolean;
        isExcludeFirstLevelTreeLines(): boolean;
        isUseTreeLines(): boolean;
        resetAlwaysShowOpenCloseSymbol(): void;
        resetExcludeFirstLevelTreeLines(): void;
        resetUseTreeLines(): void;
        setAlwaysShowOpenCloseSymbol(value: any): any;
        setExcludeFirstLevelTreeLines(value: any): any;
        setUseTreeLines(value: any): any;
        toggleAlwaysShowOpenCloseSymbol(): boolean;
        toggleExcludeFirstLevelTreeLines(): boolean;
        toggleUseTreeLines(): boolean;
        alwaysShowOpenCloseSymbol: boolean;
        excludeFirstLevelTreeLines: boolean;
        useTreeLines: boolean;
    }
}
declare module qx.ui.treevirtual {
    class SimpleTreeDataModel extends qx.ui.table.model.Abstract {
        static _addNode(nodeArr: IMap, parentNodeId: number, label: string, bOpened: boolean, bHideOpenCloseButton: boolean, type: number, icon: string, iconSelected: string, nodeId?: number): number;
        static _getEmptyTree(): IMap;
        constructor();
        protected _applyFilter(value: Function, old: Function): void;
        protected _clearSelections(): void;
        addBranch(parentNodeId: number, label: string, bOpened: boolean, bHideOpenCloseButton: boolean, icon: string, iconSelected: string): number;
        addLeaf(parentNodeId: number, label: string, icon: string, iconSelected: string): number;
        clearData(): void;
        getColumnData(nodeId: number, columnIndex: number): any;
        getData(): qx.data.Array;
        getFilter(): any;
        getNode(rowIndex: number): any;
        getNodeFromRow(rowIndex: number): any;
        getNodeRowMap(): qx.data.Array;
        getRowFromNodeId(nodeId: number): number;
        getSelectedNodes(): qx.data.Array;
        getTree(): qx.ui.treevirtual.TreeVirtual;
        getTreeColumn(): number;
        initFilter(value: any): any;
        move(moveNodeReference: number, parentNodeReference: number): void;
        prune(nodeReference: number, bSelfAlso: boolean): void;
        resetFilter(): void;
        setColumnData(nodeId: number, columnIndex: number, data: any): void;
        setColumnEditable(columnIndex: number, editable: boolean): void;
        setData(nodeArr: any): void;
        setEditable(editable: boolean): void;
        setFilter(value: any): any;
        setState(nodeReference: number, attributes: IMap): void;
        setTree(tree: qx.ui.treevirtual.TreeVirtual): void;
        setTreeColumn(columnIndex: number): void;
        filter: Function;
    }
}
declare module qx.ui.treevirtual {
    class SimpleTreeDataRowRenderer extends qx.ui.table.rowrenderer.Default {
        constructor();
    }
}
declare module qx.ui.treevirtual {
    class TreeVirtual extends qx.ui.table.Table {
        constructor(headings: string, custom?: IMap);
        protected _calculateSelectedNodes(): qx.data.Array;
        getAlwaysShowOpenCloseSymbol(): boolean;
        getDataModel(): qx.ui.table.ITableModel;
        getExcludeFirstLevelTreeLines(): boolean;
        getHierarchy(nodeReference: number): qx.data.Array;
        getOpenCloseClickSelectsRow(): any;
        getSelectedNodes(): qx.data.Array;
        getSelectionMode(): number;
        getUseTreeLines(): boolean;
        initOpenCloseClickSelectsRow(value: any): any;
        isOpenCloseClickSelectsRow(): boolean;
        resetOpenCloseClickSelectsRow(): void;
        setAlwaysShowOpenCloseSymbol(b: boolean): void;
        setExcludeFirstLevelTreeLines(b: boolean): void;
        setOpenCloseClickSelectsRow(value: any): any;
        setOverflow(s: string): void;
        setSelectionMode(mode: number): void;
        setUseTreeLines(b: boolean): void;
        toggleOpenCloseClickSelectsRow(): boolean;
        openCloseClickSelectsRow: boolean;
    }
}
declare module qx.ui.virtual.behavior {
    class Prefetch extends qx.core.Object {
        constructor(scroller: qx.ui.virtual.core.Scroller, settings: IMap);
        protected _applyInterval(value: number, old: number): void;
        protected _applyScroller(value: qx.ui.virtual.core.Scroller, old: qx.ui.virtual.core.Scroller): void;
        protected _onInterval(): void;
        getInterval(): any;
        getScroller(): any;
        initInterval(value: any): any;
        initScroller(value: any): any;
        resetInterval(): void;
        resetScroller(): void;
        setInterval(value: any): any;
        setPrefetchX(minLeft: number, maxLeft: number, minRight: number, maxRight: number): void;
        setPrefetchY(minAbove: number, maxAbove: number, minBelow: number, maxBelow: number): void;
        setScroller(value: any): any;
        interval: number;
        scroller: qx.ui.virtual.core.Scroller;
    }
}
declare module qx.ui.virtual.cell {
    class Abstract extends qx.core.Object implements qx.ui.virtual.cell.ICell {
        getCellProperties(data: any, states: IMap): IMap;
        constructor();
        getAttributes(value: any, states: any): string;
        getContent(value: any, states: any): string;
        getCssClasses(value: any, states: any): string;
        getInsets(value: any, states: any): number[];
        getStyles(value: any, states: any): string;
    }
}
declare module qx.ui.virtual.cell {
    class AbstractImage extends qx.ui.virtual.cell.Cell {
        constructor();
        protected _identifyImage(value: any): IMap;
    }
}
declare module qx.ui.virtual.cell {
    class AbstractWidget extends qx.core.Object implements qx.ui.virtual.cell.IWidgetCell {
        getCellWidget(data: any, states: IMap): qx.ui.core.LayoutItem;
        pool(widget: qx.ui.core.LayoutItem): void;
        updateData(widget: qx.ui.core.LayoutItem, data: any): void;
        updateStates(widget: qx.ui.core.LayoutItem, states: IMap): void;
        constructor();
        protected _cleanupPool(): void;
        protected _createWidget(): qx.ui.core.LayoutItem;
    }
}
declare module qx.ui.virtual.cell {
    class Boolean extends qx.ui.virtual.cell.AbstractImage {
        constructor();
        protected _applyIconFalse(value: string, old: string): void;
        protected _applyIconTrue(value: string, old: string): void;
        getIconFalse(): any;
        getIconTrue(): any;
        initIconFalse(value: any): any;
        initIconTrue(value: any): any;
        resetIconFalse(): void;
        resetIconTrue(): void;
        setIconFalse(value: any): any;
        setIconTrue(value: any): any;
        iconFalse: string;
        iconTrue: string;
    }
}
declare module qx.ui.virtual.cell {
    class Cell extends qx.ui.virtual.cell.Abstract {
        constructor();
        protected _applyAppearance(value: string, old: string): void;
        protected _applyBackgroundColor(value: string, old: string): void;
        protected _applyFont(value: string, old: string): void;
        protected _applyPadding(value: number, old: number): void;
        protected _applyTextAlign(value: any, old: any): void;
        protected _applyTextColor(value: string, old: string): void;
        protected _getCssProperties(): qx.data.Array;
        protected _getValue(propertyName: string): any;
        protected _storeStyle(propertyName: string, styles: string): void;
        getAppearance(): any;
        getBackgroundColor(): any;
        getFont(): any;
        getPaddingBottom(): any;
        getPaddingLeft(): any;
        getPaddingRight(): any;
        getPaddingTop(): any;
        getTextAlign(): any;
        getTextColor(): any;
        initAppearance(value: any): any;
        initBackgroundColor(value: any): any;
        initFont(value: any): any;
        initPaddingBottom(value: any): any;
        initPaddingLeft(value: any): any;
        initPaddingRight(value: any): any;
        initPaddingTop(value: any): any;
        initTextAlign(value: any): any;
        initTextColor(value: any): any;
        resetAppearance(): void;
        resetBackgroundColor(): void;
        resetFont(): void;
        resetPadding(): void;
        resetPaddingBottom(): void;
        resetPaddingLeft(): void;
        resetPaddingRight(): void;
        resetPaddingTop(): void;
        resetTextAlign(): void;
        resetTextColor(): void;
        setAppearance(value: any): any;
        setBackgroundColor(value: any): any;
        setFont(value: any): any;
        setPadding(paddingTop: any, paddingRight: any, paddingBottom: any, paddingLeft: any): void;
        setPaddingBottom(value: any): any;
        setPaddingLeft(value: any): any;
        setPaddingRight(value: any): any;
        setPaddingTop(value: any): any;
        setTextAlign(value: any): any;
        setTextColor(value: any): any;
        appearance: string;
        backgroundColor: string;
        font: string;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        paddingTop: number;
        textColor: string;
    }
}
declare module qx.ui.virtual.cell {
    class CellStylesheet extends qx.core.Object {
        constructor();
        computeClassForStyles(key: string, styleString: string): string;
        getCssClass(key: string): any;
        getStylesheet(): any;
        static getInstance(): qx.ui.virtual.cell.CellStylesheet;
    }
}
declare module qx.ui.virtual.cell {
    class Date extends qx.ui.virtual.cell.Cell {
        constructor(dateFormat: any);
        dateFormat: qx.util.format.DateFormat;
        getDateFormat(): any;
        initDateFormat(value: any): any;
        resetDateFormat(): void;
        setDateFormat(value: any): any;
    }
}
declare module qx.ui.virtual.cell {
    class Html extends qx.ui.virtual.cell.Cell {
    }
}
declare module qx.ui.virtual.cell {
    interface ICell {
        getCellProperties(data: any, states: IMap): IMap;
    }
}
declare module qx.ui.virtual.cell {
    interface IWidgetCell {
        getCellWidget(data: any, states: IMap): qx.ui.core.LayoutItem;
        pool(widget: qx.ui.core.LayoutItem): void;
        updateData(widget: qx.ui.core.LayoutItem, data: any): void;
        updateStates(widget: qx.ui.core.LayoutItem, states: IMap): void;
    }
}
declare module qx.ui.virtual.cell {
    interface IWidgetCellDelegate {
        createWidget(): qx.ui.core.LayoutItem;
    }
}
declare module qx.ui.virtual.cell {
    class Image extends qx.ui.virtual.cell.AbstractImage {
    }
}
declare module qx.ui.virtual.cell {
    class Number extends qx.ui.virtual.cell.Cell {
        constructor(numberFormat: any);
        numberFormat: qx.util.format.NumberFormat;
        getNumberFormat(): any;
        initNumberFormat(value: any): any;
        resetNumberFormat(): void;
        setNumberFormat(value: any): any;
    }
}
declare module qx.ui.virtual.cell {
    class String extends qx.ui.virtual.cell.Cell {
        constructor();
    }
}
declare module qx.ui.virtual.cell {
    class WidgetCell extends qx.ui.virtual.cell.AbstractWidget {
        protected _applyDelegate(value: any, old: any): void;
        getDelegate(): any;
        initDelegate(value: any): any;
        resetDelegate(): void;
        setDelegate(value: any): any;
    }
}
declare module qx.ui.virtual.core {
    class Axis extends qx.core.Object {
        constructor(defaultItemSize: number, itemCount: number);
        getDefaultItemSize(): number;
        getItemAtPosition(position: any): IMap;
        getItemCount(): number;
        getItemPosition(index: number): any;
        getItemSize(index: number): number;
        getItemSizes(startIndex: number, minSizeSum: number): number[];
        getTotalSize(): number;
        resetItemSizes(): void;
        setDefaultItemSize(defaultItemSize: number): void;
        setItemCount(itemCount: number): void;
        setItemSize(index: number, size: number): void;
    }
}
declare module qx.ui.virtual.core {
    class CellEvent extends qx.event.type.Pointer {
        getColumn(): any;
        getRow(): any;
        initColumn(value: any): any;
        initRow(value: any): any;
        resetColumn(): void;
        resetRow(): void;
        setColumn(value: any): any;
        setRow(value: any): any;
        column: number;
        row: number;
    }
}
declare module qx.ui.virtual.core {
    interface IHtmlCellProvider {
        getCellProperties(row: number, column: number): IMap;
    }
}
declare module qx.ui.virtual.core {
    interface ILayer {
        fullUpdate(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
        updateLayerData(): void;
        updateLayerWindow(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
    }
}
declare module qx.ui.virtual.core {
    interface IWidgetCellProvider {
        getCellWidget(row: number, column: number): qx.ui.core.LayoutItem;
        poolCellWidget(widget: qx.ui.core.LayoutItem): void;
    }
}
declare module qx.ui.virtual.core {
    class Pane extends qx.ui.core.Widget {
        constructor(rowCount?: number, columnCount?: number, cellHeight?: number, cellWidth?: number);
        protected _deferredUpdateScrollPosition(): void;
        protected _fullUpdate(): void;
        protected _onAppear(): void;
        protected _onContextmenu(e: qx.event.type.Pointer): void;
        protected _onDbltap(e: qx.event.type.Pointer): void;
        protected _onPointerDown(e: qx.event.type.Pointer): void;
        protected _onResize(): void;
        protected _onTap(e: qx.event.type.Pointer): void;
        protected _setLayerWindow(layers: qx.ui.virtual.core.ILayer[], left: number, top: number, minWidth: number, minHeight: number, doFullUpdate?: boolean): void;
        protected _updateScrollPosition(): void;
        addLayer(layer: qx.ui.virtual.core.ILayer): void;
        fullUpdate(): void;
        getCellAtPosition(documentX: number, documentY: number): any;
        getChildren(): any[];
        getColumnConfig(): qx.ui.virtual.core.Axis;
        getLayers(): qx.ui.virtual.core.ILayer[];
        getRowConfig(): qx.ui.virtual.core.Axis;
        getScrollMaxX(): number;
        getScrollMaxY(): number;
        getScrollSize(): IMap;
        getScrollX(): number;
        getScrollY(): number;
        getVisibleLayers(): qx.ui.virtual.core.ILayer[];
        isUpdatePending(): boolean;
        prefetchX(minLeft: number, maxLeft: number, minRight: number, maxRight: number): void;
        prefetchY(minAbove: number, maxAbove: number, minBelow: number, maxBelow: number): void;
        scrollCellIntoView(column: number, row: number): void;
        scrollColumnIntoView(column: number): void;
        scrollRowIntoView(row: number): void;
        setScrollX(value: number): void;
        setScrollY(value: number): void;
    }
}
declare module qx.ui.virtual.core {
    class Scroller extends qx.ui.core.scroll.AbstractScrollArea {
        constructor(rowCount?: number, columnCount?: number, cellHeight?: number, cellWidth?: number);
        getPane(): any;
    }
}
declare module qx.ui.virtual.layer {
    class Abstract extends qx.ui.core.Widget implements qx.ui.virtual.core.ILayer {
        fullUpdate(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
        updateLayerData(): void;
        updateLayerWindow(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
        constructor();
        protected _fullUpdate(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
        protected _updateLayerData(): void;
        protected _updateLayerWindow(firstRow: number, firstColumn: number, rowSizes: number[], columnSizes: number[]): void;
        getColumnSizes(): number[];
        getFirstColumn(): number;
        getFirstRow(): number;
        getRowSizes(): number[];
    }
}
declare module qx.ui.virtual.layer {
    class AbstractBackground extends qx.ui.virtual.layer.Abstract {
        constructor(colorEven?: string, colorOdd?: string);
        protected _applyColorEven(value: string, old: string): void;
        protected _applyColorOdd(value: string, old: string): void;
        clearCustomColors(): void;
        getBackground(index: number): qx.ui.decoration.IDecorator;
        getColor(index: number): string;
        getColorEven(): any;
        getColorOdd(): any;
        initColorEven(value: any): any;
        initColorOdd(value: any): any;
        resetColorEven(): void;
        resetColorOdd(): void;
        setBackground(index: number, decorator: any): void;
        setColor(index: number, color: any): void;
        setColorEven(value: any): any;
        setColorOdd(value: any): any;
        colorEven: string;
        colorOdd: string;
    }
}
declare module qx.ui.virtual.layer {
    class CellSpanManager extends qx.core.Object {
        constructor(rowConfig: qx.ui.virtual.core.Axis, columnConfig: qx.ui.virtual.core.Axis);
        protected _findCellsInRange(key: string, min: number, max: number): IMap;
        protected _getColumnPosition(column: number): number;
        protected _getRowPosition(row: number): number;
        protected _getSingleCellBounds(cell: IMap, firstVisibleRow: IMap, firstVisibleColumn: IMap): IMap;
        protected _getSortedCells(key: string): IMap[];
        protected _invalidatePositionCache(): void;
        protected _invalidateSortCache(): void;
        protected _onColumnConfigChange(e: qx.event.type.Event): void;
        protected _onRowConfigChange(e: qx.event.type.Event): void;
        addCell(id: string, row: number, column: number, rowSpan: number, columnSpan: number): void;
        computeCellSpanMap(cells: IMap[], firstRow: number, firstColumn: number, rowCount: number, columnCount: number): IMap[];
        findCellsInWindow(firstRow: number, firstColumn: number, rowCount: number, columnCount: number): IMap[];
        getCellBounds(cells: IMap[], firstVisibleRow: IMap, firstVisibleColumn: IMap): IMap[];
        removeCell(id: string): void;
    }
}
declare module qx.ui.virtual.layer {
    class Column extends qx.ui.virtual.layer.AbstractBackground {
    }
}
declare module qx.ui.virtual.layer {
    class GridLines extends qx.ui.virtual.layer.Abstract {
        constructor(orientation?: string, lineColor?: string, lineSize?: any);
        getDefaultLineColor(): any;
        getDefaultLineSize(): any;
        getLineColor(index: number): string;
        getLineSize(index: number): number;
        initDefaultLineColor(value: any): any;
        initDefaultLineSize(value: any): any;
        isHorizontal(): boolean;
        resetDefaultLineColor(): void;
        resetDefaultLineSize(): void;
        setDefaultLineColor(value: any): any;
        setDefaultLineSize(value: any): any;
        setLineColor(index: number, color: string): void;
        setLineSize(index: number, size: number): void;
        defaultLineColor: string;
        defaultLineSize: number;
    }
}
declare module qx.ui.virtual.layer {
    class HtmlCell extends qx.ui.virtual.layer.Abstract {
        constructor(htmlCellProvider: qx.ui.virtual.core.IHtmlCellProvider);
        protected _getCellSizeStyle(width: number, height: number, insetX: number, insetY: number): string;
    }
}
declare module qx.ui.virtual.layer {
    class HtmlCellSpan extends qx.ui.virtual.layer.HtmlCell {
        constructor(htmlCellProvider: qx.ui.virtual.core.IHtmlCellProvider, rowConfig: qx.ui.virtual.core.Axis, columnConfig: qx.ui.virtual.core.Axis);
        setCellSpan(row: number, column: number, rowSpan: number, columnSpan: number): void;
    }
}
declare module qx.ui.virtual.layer {
    class Row extends qx.ui.virtual.layer.AbstractBackground {
    }
}
declare module qx.ui.virtual.layer {
    class WidgetCell extends qx.ui.virtual.layer.Abstract {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        constructor(widgetCellProvider: qx.ui.virtual.core.IWidgetCellProvider);
        protected _activateNotEmptyChild(elementToPool: qx.ui.core.Widget): void;
        protected _getSpacer(): qx.ui.core.Spacer;
        getRenderedCellWidget(row: number, column: number): any;
    }
}
declare module qx.ui.virtual.layer {
    class WidgetCellSpan extends qx.ui.virtual.layer.Abstract {
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        constructor(widgetCellProvider: qx.ui.virtual.core.IWidgetCellProvider, rowConfig: qx.ui.virtual.core.Axis, columnConfig: qx.ui.virtual.core.Axis);
        getRenderedCellWidget(row: number, column: number): any;
        setCellSpan(row: number, column: number, rowSpan: number, columnSpan: number): void;
    }
}
declare module qx.ui.virtual.selection {
    class Abstract extends qx.ui.core.selection.Abstract {
        constructor(pane: qx.ui.virtual.core.Pane, selectionDelegate?: any);
        attachKeyEvents(target: qx.core.Object): void;
        attachListEvents(list: qx.core.Object): void;
        attachPointerEvents(): void;
        detachKeyEvents(target: qx.core.Object): void;
        detachListEvents(list: qx.core.Object): void;
        detatchPointerEvents(): void;
    }
}
declare module qx.ui.virtual.selection {
    class CellLines extends qx.ui.virtual.selection.CellRectangle {
    }
}
declare module qx.ui.virtual.selection {
    class CellRectangle extends qx.ui.virtual.selection.Abstract {
        protected _getItemCount(): number;
    }
}
declare module qx.ui.virtual.selection {
    class Column extends qx.ui.virtual.selection.Row {
    }
}
declare module qx.ui.virtual.selection {
    interface ISelectionDelegate {
        isItemSelectable(item: any): boolean;
        styleSelectable(item: any, type: string, wasAdded: boolean): void;
    }
}
declare module qx.ui.virtual.selection {
    class MModel {
        constructor();
        protected _applyDefaultSelection(): void;
        protected _applyDragSelection(value: boolean, old: boolean): void;
        protected _applyQuickSelection(value: boolean, old: boolean): void;
        protected _applySelection(value: qx.data.Array, old: qx.data.Array): void;
        protected _applySelectionMode(value: any, old: any): void;
        protected _initSelectionManager(): void;
        protected _onChangeSelection(e: qx.event.type.Data): void;
        protected _onManagerChangeSelection(e: qx.event.type.Data): void;
        protected _updateSelection(): void;
        getDragSelection(): any;
        getQuickSelection(): any;
        getSelection(): any;
        getSelectionMode(): any;
        initDragSelection(value: any): any;
        initQuickSelection(value: any): any;
        initSelection(value: any): any;
        initSelectionMode(value: any): any;
        isDragSelection(): boolean;
        isQuickSelection(): boolean;
        resetDragSelection(): void;
        resetQuickSelection(): void;
        resetSelection(): void;
        resetSelectionMode(): void;
        setDragSelection(value: any): any;
        setQuickSelection(value: any): any;
        setSelection(value: any): any;
        setSelectionMode(value: any): any;
        toggleDragSelection(): boolean;
        toggleQuickSelection(): boolean;
        dragSelection: boolean;
        quickSelection: boolean;
    }
}
declare module qx.ui.virtual.selection {
    class Row extends qx.ui.virtual.selection.Abstract {
        protected _getItemCount(): number;
    }
}
declare module qx.ui.window {
    class Desktop extends qx.ui.core.Widget implements qx.ui.window.IDesktop {
        blockContent(zIndex: number): void;
        getWindows(): qx.ui.window.Window[];
        isBlocked(): boolean;
        setWindowManager(manager: qx.ui.window.IWindowManager): void;
        supportsMaximize(): boolean;
        unblock(): void;
        add(child: qx.ui.core.LayoutItem, options?: IMap): void;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.Widget): number;
        remove(child: qx.ui.core.LayoutItem): void;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        static remap(members: IMap): void;
        protected _addWindow(win: qx.ui.window.Window): void;
        protected _afterAddChild(win: qx.ui.core.Widget): void;
        protected _afterRemoveChild(win: qx.ui.core.Widget): void;
        protected _applyActiveWindow(value: qx.ui.window.Window, old: qx.ui.window.Window): void;
        protected _onChangeActive(e: qx.event.type.Event): void;
        protected _onChangeModal(e: qx.event.type.Event): void;
        protected _onChangeVisibility(): void;
        protected _removeWindow(win: qx.ui.window.Window): void;
        getActiveWindow(): any;
        getWindowManager(): qx.ui.window.IWindowManager;
        initActiveWindow(value: any): any;
        resetActiveWindow(): void;
        setActiveWindow(value: any): any;
        protected _applyBlockerColor(value: string, old: string): void;
        protected _applyBlockerOpacity(value: number, old: number): void;
        protected _createBlocker(): qx.ui.core.Blocker;
        block(): void;
        forceUnblock(): void;
        getBlocker(): qx.ui.core.Blocker;
        getBlockerColor(): any;
        getBlockerOpacity(): any;
        initBlockerColor(value: any): any;
        initBlockerOpacity(value: any): any;
        resetBlockerColor(): void;
        resetBlockerOpacity(): void;
        setBlockerColor(value: any): any;
        setBlockerOpacity(value: any): any;
        constructor(windowManager: any);
    }
}
declare module qx.ui.window {
    interface IDesktop {
        blockContent(zIndex: number): void;
        getWindows(): qx.ui.window.Window[];
        isBlocked(): boolean;
        setWindowManager(manager: qx.ui.window.IWindowManager): void;
        supportsMaximize(): boolean;
        unblock(): void;
    }
}
declare module qx.ui.window {
    interface IWindowManager {
        bringToFront(win: Window): void;
        changeActiveWindow(active: Window, oldActive: Window): void;
        sendToBack(win: Window): void;
        setDesktop(desktop: any): void;
        updateStack(): void;
    }
}
declare module qx.ui.window {
    class MDesktop {
        protected _addWindow(win: qx.ui.window.Window): void;
        protected _afterAddChild(win: qx.ui.core.Widget): void;
        protected _afterRemoveChild(win: qx.ui.core.Widget): void;
        protected _applyActiveWindow(value: qx.ui.window.Window, old: qx.ui.window.Window): void;
        protected _onChangeActive(e: qx.event.type.Event): void;
        protected _onChangeModal(e: qx.event.type.Event): void;
        protected _onChangeVisibility(): void;
        protected _removeWindow(win: qx.ui.window.Window): void;
        getActiveWindow(): any;
        getWindowManager(): qx.ui.window.IWindowManager;
        getWindows(): qx.ui.window.Window[];
        initActiveWindow(value: any): any;
        resetActiveWindow(): void;
        setActiveWindow(value: any): any;
        setWindowManager(manager: qx.ui.window.IWindowManager): void;
        supportsMaximize(): boolean;
        activeWindow: qx.ui.window.Window;
    }
}
declare module qx.ui.window {
    class Manager extends qx.core.Object implements qx.ui.window.IWindowManager {
        bringToFront(win: Window): void;
        changeActiveWindow(active: Window, oldActive: Window): void;
        sendToBack(win: Window): void;
        setDesktop(desktop: any): void;
        updateStack(): void;
        getDesktop(): qx.ui.window.IDesktop;
        syncWidget(): void;
    }
}
declare module qx.ui.window {
    class Window extends qx.ui.core.Widget {
        add(child: qx.ui.core.LayoutItem, options?: IMap): qx.ui.core.Widget;
        addAfter(child: qx.ui.core.LayoutItem, after: qx.ui.core.LayoutItem, options?: IMap): void;
        addAt(child: qx.ui.core.LayoutItem, index: number, options?: IMap): void;
        addBefore(child: qx.ui.core.LayoutItem, before: qx.ui.core.LayoutItem, options?: IMap): void;
        getChildren(): qx.ui.core.LayoutItem[];
        hasChildren(): boolean;
        indexOf(child: qx.ui.core.LayoutItem): number;
        remove(child: qx.ui.core.LayoutItem): qx.ui.core.Widget;
        removeAll(): qx.data.Array;
        removeAt(index: number): qx.ui.core.LayoutItem;
        getLayout(): qx.ui.layout.Abstract;
        setLayout(layout: qx.ui.layout.Abstract): void;
        protected _getResizeFrame(): qx.ui.core.Widget;
        getResizableBottom(): any;
        getResizableLeft(): any;
        getResizableRight(): any;
        getResizableTop(): any;
        getResizeSensitivity(): any;
        getUseResizeFrame(): any;
        initResizableBottom(value: any): any;
        initResizableLeft(value: any): any;
        initResizableRight(value: any): any;
        initResizableTop(value: any): any;
        initResizeSensitivity(value: any): any;
        initUseResizeFrame(value: any): any;
        isResizableBottom(): boolean;
        isResizableLeft(): boolean;
        isResizableRight(): boolean;
        isResizableTop(): boolean;
        isUseResizeFrame(): boolean;
        resetResizable(): void;
        resetResizableBottom(): void;
        resetResizableLeft(): void;
        resetResizableRight(): void;
        resetResizableTop(): void;
        resetResizeSensitivity(): void;
        resetUseResizeFrame(): void;
        setResizable(resizableTop: any, resizableRight: any, resizableBottom: any, resizableLeft: any): void;
        setResizableBottom(value: any): any;
        setResizableLeft(value: any): any;
        setResizableRight(value: any): any;
        setResizableTop(value: any): any;
        setResizeSensitivity(value: any): any;
        setUseResizeFrame(value: any): any;
        toggleResizableBottom(): boolean;
        toggleResizableLeft(): boolean;
        toggleResizableRight(): boolean;
        toggleResizableTop(): boolean;
        toggleUseResizeFrame(): boolean;
        protected _activateMoveHandle(widget: qx.ui.core.Widget): void;
        protected _onMovePointerDown(e: qx.event.type.Pointer): void;
        protected _onMovePointerMove(e: qx.event.type.Pointer): void;
        protected _onMovePointerUp(e: qx.event.type.Pointer): void;
        protected _onMoveRoll(e: qx.event.type.Roll): void;
        getMovable(): any;
        getUseMoveFrame(): any;
        initMovable(value: any): any;
        initUseMoveFrame(value: any): any;
        isMovable(): boolean;
        isUseMoveFrame(): boolean;
        resetMovable(): void;
        resetUseMoveFrame(): void;
        setMovable(value: any): any;
        setUseMoveFrame(value: any): any;
        toggleMovable(): boolean;
        toggleUseMoveFrame(): boolean;
        protected _applyContentPadding(value: number, old: number): void;
        getContentPaddingBottom(): any;
        getContentPaddingLeft(): any;
        getContentPaddingRight(): any;
        getContentPaddingTop(): any;
        initContentPaddingBottom(value: any): any;
        initContentPaddingLeft(value: any): any;
        initContentPaddingRight(value: any): any;
        initContentPaddingTop(value: any): any;
        resetContentPadding(): void;
        resetContentPaddingBottom(): void;
        resetContentPaddingLeft(): void;
        resetContentPaddingRight(): void;
        resetContentPaddingTop(): void;
        setContentPadding(contentPaddingTop: any, contentPaddingRight: any, contentPaddingBottom: any, contentPaddingLeft: any): void;
        setContentPaddingBottom(value: any): any;
        setContentPaddingLeft(value: any): any;
        setContentPaddingRight(value: any): any;
        setContentPaddingTop(value: any): any;
        constructor(caption: string, icon?: string);
        protected _applyActive(value: boolean, old: boolean): void;
        protected _applyCaptionBarChange(value: any, old: any): void;
        protected _applyModal(value: boolean, old: boolean): void;
        protected _applyShowStatusbar(value: boolean, old: boolean): void;
        protected _applyStatus(value: string, old: string): void;
        protected _getContentPaddingTarget(): qx.ui.core.Widget;
        protected _onCaptionPointerDblTap(e: qx.event.type.Pointer): void;
        protected _onCloseButtonTap(e: qx.event.type.Pointer): void;
        protected _onMaximizeButtonTap(e: qx.event.type.Pointer): void;
        protected _onMinimizeButtonTap(e: qx.event.type.Pointer): void;
        protected _onRestoreButtonTap(e: qx.event.type.Pointer): void;
        protected _onWindowEventStop(e: qx.event.type.Event): void;
        protected _onWindowFocusOut(e: qx.event.type.Focus): void;
        protected _onWindowPointerDown(e: qx.event.type.Pointer): void;
        protected _updateCaptionBar(): void;
        center(): void;
        close(): void;
        getActive(): any;
        getAllowClose(): any;
        getAllowMaximize(): any;
        getAllowMinimize(): any;
        getAlwaysOnTop(): any;
        getCaption(): any;
        getIcon(): any;
        getModal(): any;
        getMode(): string;
        getShowClose(): any;
        getShowMaximize(): any;
        getShowMinimize(): any;
        getShowStatusbar(): any;
        getStatus(): any;
        initActive(value: any): any;
        initAllowClose(value: any): any;
        initAllowMaximize(value: any): any;
        initAllowMinimize(value: any): any;
        initAlwaysOnTop(value: any): any;
        initCaption(value: any): any;
        initIcon(value: any): any;
        initModal(value: any): any;
        initShowClose(value: any): any;
        initShowMaximize(value: any): any;
        initShowMinimize(value: any): any;
        initShowStatusbar(value: any): any;
        initStatus(value: any): any;
        isActive(): boolean;
        isAllowClose(): boolean;
        isAllowMaximize(): boolean;
        isAllowMinimize(): boolean;
        isAlwaysOnTop(): boolean;
        isMaximized(): boolean;
        isModal(): boolean;
        isShowClose(): boolean;
        isShowMaximize(): boolean;
        isShowMinimize(): boolean;
        isShowStatusbar(): boolean;
        maximize(): void;
        minimize(): void;
        moveTo(left: number, top: number): void;
        open(): void;
        resetActive(): void;
        resetAllowClose(): void;
        resetAllowMaximize(): void;
        resetAllowMinimize(): void;
        resetAlwaysOnTop(): void;
        resetCaption(): void;
        resetIcon(): void;
        resetModal(): void;
        resetShowClose(): void;
        resetShowMaximize(): void;
        resetShowMinimize(): void;
        resetShowStatusbar(): void;
        resetStatus(): void;
        restore(): void;
        setActive(value: any): any;
        setAllowClose(value: any): any;
        setAllowMaximize(value: any): any;
        setAllowMinimize(value: any): any;
        setAlwaysOnTop(value: any): any;
        setCaption(value: any): any;
        setIcon(value: any): any;
        setModal(value: any): any;
        setShowClose(value: any): any;
        setShowMaximize(value: any): any;
        setShowMinimize(value: any): any;
        setShowStatusbar(value: any): any;
        setStatus(value: any): any;
        toggleActive(): boolean;
        toggleAllowClose(): boolean;
        toggleAllowMaximize(): boolean;
        toggleAllowMinimize(): boolean;
        toggleAlwaysOnTop(): boolean;
        toggleModal(): boolean;
        toggleShowClose(): boolean;
        toggleShowMaximize(): boolean;
        toggleShowMinimize(): boolean;
        toggleShowStatusbar(): boolean;
        allowClose: boolean;
        allowMaximize: boolean;
        allowMinimize: boolean;
        showClose: boolean;
        showMaximize: boolean;
        showMinimize: boolean;
        showStatusbar: boolean;
    }
}
declare module qx.util {
    class AliasManager extends qx.util.ValueManager {
        constructor();
        protected _preprocess(value: string): string;
        add(alias: string, base: string): void;
        getAliases(): IMap;
        remove(alias: string): void;
        static getInstance(): qx.util.AliasManager;
    }
}
declare module qx.util {
    class Animation {
    }
}
declare module qx.util {
    class Base64 {
        static decode(input: string, is8bit?: boolean): string;
        static encode(input: string, is8bit?: boolean): string;
    }
}
declare module qx.util {
    class ColorUtil {
        static cssStringToRgb(str: string): qx.data.Array;
        static hex3StringToHex6String(value: string): string;
        static hex3StringToRgb(value: string): qx.data.Array;
        static hex6StringToRgb(value: string): qx.data.Array;
        static hexStringToRgb(value: string): qx.data.Array;
        static hsbToRgb(hsb: number[]): number[];
        static isCssString(str: string): boolean;
        static isHex3String(str: string): boolean;
        static isHex6String(str: string): boolean;
        static isNamedColor(value: string): boolean;
        static isRgbaString(str: string): boolean;
        static isRgbString(str: string): boolean;
        static isSystemColor(value: string): boolean;
        static isThemedColor(value: string): boolean;
        static isValidPropertyValue(str: string): boolean;
        static randomColor(): string;
        static rgbToHexString(rgb: qx.data.Array): string;
        static rgbToHsb(rgb: number[]): qx.data.Array;
        static rgbToRgbString(rgb: qx.data.Array): string;
        static stringToRgb(str: string): qx.data.Array;
        static stringToRgbString(str: string): string;
        static supportsThemes(): boolean;
    }
}
declare module qx.util {
    class DeferredCall extends qx.core.Object {
        constructor(callback: Function, context?: any);
        call(): void;
        cancel(): void;
        schedule(): void;
    }
}
declare module qx.util {
    class DeferredCallManager extends qx.core.Object {
        constructor();
        cancel(deferredCall: qx.util.DeferredCall): void;
        schedule(deferredCall: qx.util.DeferredCall): void;
        static getInstance(): qx.util.DeferredCallManager;
    }
}
declare module qx.util {
    class Delegate {
        static containsMethod(delegate: any, specificMethod: string): boolean;
        static getMethod(delegate: any, specificMethod: string): any;
    }
}
declare module qx.util {
    class DisposeUtil {
        static _collectContainerChildren(container: qx.ui.container.Stack, arr: qx.data.Array): void;
        static destroyContainer(container: qx.ui.container.Stack): void;
        static disposeArray(obj: any, field: string): void;
        static disposeMap(obj: any, field: string): void;
        static disposeObjects(obj: any, arr: qx.data.Array, disposeSingletons?: boolean): void;
        static disposeTriggeredBy(disposeMe: any, trigger: any): void;
    }
}
declare module qx.util {
    class EditDistance {
        static getEditOperations(dataA: qx.data.Array, dataB: qx.data.Array): IMap[];
    }
}
declare module qx.util {
    class ExtendedColor {
        static isExtendedColor(value: string): boolean;
        static toRgb(value: string): qx.data.Array;
        static toRgbString(value: string): string;
    }
}

declare module qx.util {
    class OOUtil {
        static classIsDefined(name: string): boolean;
        static getByInterface(clazz: qx.Class, iface: any): any;
        static getEventType(clazz: qx.Class, name: string): any;
        static getMixins(clazz: qx.Class): any[];
        static getPropertyDefinition(clazz: qx.Class, name: string): any;
        static hasInterface(clazz: qx.Class, iface: any): boolean;
        static hasProperty(clazz: qx.Class, name: string): boolean;
        static supportsEvent(clazz: qx.Class, name: string): boolean;
    }
}
declare module qx.util {
    class ObjectPool extends qx.core.Object {
        constructor(size: number);
        getObject(clazz: qx.Class): any;
        getSize(): any;
        initSize(value: any): any;
        poolObject(obj: any): void;
        resetSize(): void;
        setSize(value: any): any;
        size: number;
    }
}
declare module qx.util {
    class Permutation {
        static permute(options: IMap, callback: Function, context: any): void;
    }
}
declare module qx.util {
    class PropertyUtil {
        static deleteInitValue(object: any, propertyName: string): void;
        static deleteThemeValue(object: any, propertyName: string): void;
        static deleteUserValue(object: any, propertyName: string): void;
        static getAllProperties(clazz: qx.Class): IMap;
        static getInitValue(object: any, propertyName: string): any;
        static getProperties(clazz: qx.Class): IMap;
        static getThemeValue(object: any, propertyName: string): any;
        static getUserValue(object: any, propertyName: string): any;
        static resetThemed(object: any, propertyName: string): void;
        static setInitValue(object: any, propertyName: string, value: any): void;
        static setThemed(object: any, propertyName: string, value: any): void;
        static setThemeValue(object: any, propertyName: string, value: any): void;
        static setUserValue(object: any, propertyName: string, value: any): void;
    }
}
declare module qx.util {
    class Request {
        static isCrossDomain(url: string): boolean;
        static isMethod(method: string): boolean;
        static isSuccessful(status: number): boolean;
        static methodAllowsRequestBody(method: string): boolean;
    }
}
declare module qx.util {
    class ResourceManager extends qx.core.Object {
        constructor();
        getCombinedFormat(id: string): string;
        getData(id: string): qx.data.Array;
        getImageFormat(id: string): string;
        getImageHeight(id: string): number;
        getImageWidth(id: string): number;
        has(id: string): boolean;
        toDataUri(resid: string): string;
        toUri(id: string): string;
        static getInstance(): qx.util.ResourceManager;
    }
}
declare module qx.util {
    class ResponseParser {
        constructor(parser: Function);
        protected _getParser(contentType: string): any;
        parse(response: string, contentType: string): any;
        setParser(parser: Function): Function;
    }
}
declare module qx.util {
    class RingBuffer {
        constructor(maxEntries?: number);
        addEntry(entry: any): void;
        clear(): void;
        clearMark(): void;
        getAllEntries(): qx.data.Array;
        getEntries(count: number, startingFromMark?: boolean): qx.data.Array;
        getMaxEntries(): number;
        mark(): void;
        setMaxEntries(maxEntries: number): void;
    }
}
declare module qx.util {
    class Serializer {
        static toJson(object: qx.core.Object, qxSerializer?: Function, dateFormat?: qx.util.format.DateFormat): string;
        static toNativeObject(object: qx.core.Object, qxSerializer: Function, dateFormat: qx.util.format.DateFormat): string;
        static toUriParameter(object: qx.core.Object, qxSerializer: Function, dateFormat: qx.util.format.DateFormat): string;
    }
}
declare module qx.util {
    class StringBuilder extends qx.type.BaseArray {
        constructor(length_or_items?: any);
        add(varargs: string): void;
        clear(): void;
        get(): string;
        isEmpty(): boolean;
        size(): number;
    }
}
declare module qx.util {
    class StringEscape {
        static escape(str: string, charCodeToEntities: IMap): string;
        static unescape(str: string, entitiesToCharCode: IMap): string;
    }
}
declare module qx.util {
    class StringSplit {
        static split(str: string, separator: RegExp, limit?: number): string[];
    }
}
declare module qx.util {
    class TimerManager extends qx.core.Object {
        start(callback: Function, recurTime: any, context: any, userData: any, initialTime: any): number;
        stop(timerId: number): void;
        static getInstance(): qx.util.TimerManager;
    }
}
declare module qx.util {
    class Uri {
        static appendParamsToUrl(url: string, params: string): string;
        static getAbsolute(uri: string): string;
        static parseUri(str: string, strict: boolean): any;
        static toParameter(obj: any, post: boolean): string;
    }
}
declare module qx.util {
    class Validate {
        static checkColor(value: any, formItem: qx.ui.form.IForm, errorMessage?: string): void;
        static checkEmail(value: any, formItem: qx.ui.form.IForm, errorMessage?: string): void;
        static checkNumber(value: any, formItem: qx.ui.form.IForm, errorMessage?: string): void;
        static checkString(value: any, formItem: qx.ui.form.IForm, errorMessage?: string): void;
        static checkUrl(value: any, formItem: qx.ui.form.IForm, errorMessage?: string): void;
        static color(errorMessage?: string): Function;
        static email(errorMessage?: string): Function;
        static inArray(array: qx.data.Array, errorMessage?: string): Function;
        static number(errorMessage?: string): Function;
        static range(from: number, to: number, errorMessage?: string): Function;
        static regExp(reg: RegExp, errorMessage?: string): Function;
        static string(errorMessage?: string): Function;
        static url(errorMessage?: string): Function;
    }
}
declare module qx.util {
    class ValueManager extends qx.core.Object {
        constructor();
        protected _getDynamic(): IMap;
        protected _setDynamic(value: IMap): void;
        isDynamic(value: string): boolean;
        resolve(value: string): any;
        resolveDynamic(value: string): any;
    }
}
declare module qx.util {
    class Wheel {
        static getDelta(domEvent: qx.event.type.Event, axis?: string): number;
    }
}
declare module qx.util.format {
    class DateFormat extends qx.core.Object implements qx.util.format.IFormat {
        format(obj: any): string;
        parse(str: string): any;
        constructor(format: any, locale?: string);
        protected _applyLocale(value: string, old: string): void;
        getLocale(): any;
        initLocale(value: any): any;
        resetLocale(): void;
        setLocale(value: any): any;
        locale: string;
        static getDateInstance(): qx.util.format.DateFormat;
        static getDateTimeInstance(): qx.util.format.DateFormat;
    }
}
declare module qx.util.format {
    interface IFormat {
        format(obj: any): string;
        parse(str: string): any;
    }
}
declare module qx.util.format {
    class NumberFormat extends qx.core.Object implements qx.util.format.IFormat {
        format(obj: any): string;
        parse(str: string): any;
        constructor(locale: string);
        getGroupingUsed(): any;
        getMaximumFractionDigits(): any;
        getMaximumIntegerDigits(): any;
        getMinimumFractionDigits(): any;
        getMinimumIntegerDigits(): any;
        getPostfix(): any;
        getPrefix(): any;
        initGroupingUsed(value: any): any;
        initMaximumFractionDigits(value: any): any;
        initMaximumIntegerDigits(value: any): any;
        initMinimumFractionDigits(value: any): any;
        initMinimumIntegerDigits(value: any): any;
        initPostfix(value: any): any;
        initPrefix(value: any): any;
        isGroupingUsed(): boolean;
        resetGroupingUsed(): void;
        resetMaximumFractionDigits(): void;
        resetMaximumIntegerDigits(): void;
        resetMinimumFractionDigits(): void;
        resetMinimumIntegerDigits(): void;
        resetPostfix(): void;
        resetPrefix(): void;
        setGroupingUsed(value: any): any;
        setMaximumFractionDigits(value: any): any;
        setMaximumIntegerDigits(value: any): any;
        setMinimumFractionDigits(value: any): any;
        setMinimumIntegerDigits(value: any): any;
        setPostfix(value: any): any;
        setPrefix(value: any): any;
        toggleGroupingUsed(): boolean;
        groupingUsed: boolean;
        maximumFractionDigits: number;
        maximumIntegerDigits: number;
        minimumFractionDigits: number;
        minimumIntegerDigits: number;
    }
}
declare module qx.util.fsm {
    class FiniteStateMachine extends qx.core.Object {
        constructor(machineName: string);
        protected _getInternalData(): IMap;
        addObject(friendlyName: string, obj: any, groupNames: qx.data.Array): void;
        addState(state: qx.util.fsm.State): void;
        displayAllObjects(): void;
        enqueueEvent(event: qx.event.type.Event, bAddAtHead: boolean): void;
        eventListener(event: qx.event.type.Event): void;
        fireImmediateEvent(type: string, target: qx.core.Object, data: any): void;
        getDebugFlags(): any;
        getFriendlyName(obj: any): string;
        getGroupObjects(groupName: string): qx.data.Array;
        getMaxSavedStates(): any;
        getName(): any;
        getNextState(): any;
        getObject(friendlyName: string): any;
        getPreviousState(): any;
        getState(): any;
        initDebugFlags(value: any): any;
        initMaxSavedStates(value: any): any;
        initName(value: any): any;
        initNextState(value: any): any;
        initPreviousState(value: any): any;
        initState(value: any): any;
        popState(): boolean;
        postponeEvent(event: qx.event.type.Event): void;
        pushState(state: string): void;
        removeObject(friendlyName: string): void;
        replaceState(state: qx.util.fsm.State, bDispose: boolean): any;
        resetDebugFlags(): void;
        resetMaxSavedStates(): void;
        resetName(): void;
        resetNextState(): void;
        resetPreviousState(): void;
        resetState(): void;
        scheduleEvent(type: string, target: qx.core.Object, data: any, timeout: any): void;
        setDebugFlags(value: any): any;
        setMaxSavedStates(value: any): any;
        setName(value: any): any;
        setNextState(value: any): any;
        setPreviousState(value: any): any;
        setState(value: any): any;
        start(): void;
        debugFlags: number;
        maxSavedStates: number;
        name: string;
        nextState: string;
        previousState: string;
        state: string;
    }
}
declare module qx.util.fsm {
    class State extends qx.core.Object {
        constructor(stateName: string, stateInfo: IMap);
        static _commonTransformAutoActions(actionType: string, value: any, context: any): Function;
        addTransition(trans: qx.util.fsm.Transition): void;
        getAutoActionsAfterOnentry(): any;
        getAutoActionsAfterOnexit(): any;
        getAutoActionsBeforeOnentry(): any;
        getAutoActionsBeforeOnexit(): any;
        getEvents(): any;
        getName(): any;
        getOnentry(): any;
        getOnexit(): any;
        initAutoActionsAfterOnentry(value: any): any;
        initAutoActionsAfterOnexit(value: any): any;
        initAutoActionsBeforeOnentry(value: any): any;
        initAutoActionsBeforeOnexit(value: any): any;
        initEvents(value: any): any;
        initName(value: any): any;
        initOnentry(value: any): any;
        initOnexit(value: any): any;
        resetAutoActionsAfterOnentry(): void;
        resetAutoActionsAfterOnexit(): void;
        resetAutoActionsBeforeOnentry(): void;
        resetAutoActionsBeforeOnexit(): void;
        resetEvents(): void;
        resetName(): void;
        resetOnentry(): void;
        resetOnexit(): void;
        setAutoActionsAfterOnentry(value: any): any;
        setAutoActionsAfterOnexit(value: any): any;
        setAutoActionsBeforeOnentry(value: any): any;
        setAutoActionsBeforeOnexit(value: any): any;
        setEvents(value: any): any;
        setName(value: any): any;
        setOnentry(value: any): any;
        setOnexit(value: any): any;
    }
}
declare module qx.util.fsm {
    class Transition extends qx.core.Object {
        constructor(transitionName: string, transitionInfo: any);
        getAutoActionsAfterOntransition(): any;
        getAutoActionsBeforeOntransition(): any;
        getName(): any;
        getNextState(): any;
        getOntransition(): any;
        getPredicate(): any;
        initAutoActionsAfterOntransition(value: any): any;
        initAutoActionsBeforeOntransition(value: any): any;
        initName(value: any): any;
        initNextState(value: any): any;
        initOntransition(value: any): any;
        initPredicate(value: any): any;
        resetAutoActionsAfterOntransition(): void;
        resetAutoActionsBeforeOntransition(): void;
        resetName(): void;
        resetNextState(): void;
        resetOntransition(): void;
        resetPredicate(): void;
        setAutoActionsAfterOntransition(value: any): any;
        setAutoActionsBeforeOntransition(value: any): any;
        setName(value: any): any;
        setNextState(value: any): any;
        setOntransition(value: any): any;
        setPredicate(value: any): any;
        name: string;
    }
}
declare module qx.util.placement {
    class AbstractAxis {
        static _isInRange(start: number, size: number, areaSize: number): boolean;
        static _moveToEdgeAndAlign(size: number, target: IMap, offsets: IMap, position: string): number;
        static computeStart(size: number, target: IMap, offsets: IMap, areaSize: number, position: string): number;
    }
}
declare module qx.util.placement {
    class BestFitAxis {
        static computeStart(size: number, target: IMap, offsets: IMap, areaSize: number, position: string): number;
    }
}
declare module qx.util.placement {
    class DirectAxis {
        static computeStart(size: number, target: IMap, offsets: IMap, areaSize: number, position: string): number;
    }
}
declare module qx.util.placement {
    class KeepAlignAxis {
        static computeStart(size: number, target: IMap, offsets: IMap, areaSize: number, position: string): number;
    }
}
declare module qx.util.placement {
    class Placement extends qx.core.Object {
        constructor();
        compute(size: IMap, area: IMap, target: IMap, offsets: IMap): IMap;
        getAlign(): any;
        getAxisX(): any;
        getAxisY(): any;
        getEdge(): any;
        initAlign(value: any): any;
        initAxisX(value: any): any;
        initAxisY(value: any): any;
        initEdge(value: any): any;
        resetAlign(): void;
        resetAxisX(): void;
        resetAxisY(): void;
        resetEdge(): void;
        setAlign(value: any): any;
        setAxisX(value: any): any;
        setAxisY(value: any): any;
        setEdge(value: any): any;
        axisX: qx.Class;
        axisY: qx.Class;
    }
}
declare module qx.xml {
    class Document {
        static create(namespaceUri?: string, qualifiedName?: string): Document;
        static fromString(str: string): Document;
        static isXmlDocument(elem: HTMLElement): boolean;
    }
}
declare module qx.xml {
    class Element {
        static createSubElementNS(document: Document, parent: HTMLElement, name: string, namespaceUri: string): HTMLElement;
        static getAttributeNS(element: HTMLElement, namespaceUri: string, name: string): string;
        static getElementsByTagNameNS(element: Document, namespaceURI: any, tagname: string): HTMLElement[];
        static getSingleNodeText(element: Document, query: string): string;
        static selectNodes(element: Document, query: string, namespaces: IMap): HTMLElement[];
        static selectSingleNode(element: Document, query: string, namespaces: IMap): HTMLElement;
        static serialize(element: Document): string;
        static setAttributeNS(document: Document, element: HTMLElement, namespaceUri: string, name: string, value: string): void;
    }
}
declare module qx.xml {
    class String {
        static escape(str: string): string;
        static unescape(str: string): string;
    }
}
declare module qx.ui.mobile.core {
    class Widget extends qx.core.Object {
        marktr(messageId: string): string;
        tr(messageId: string, varargs: any): qx.locale.LocalizedString;
        trc(hint: string, messageId: string, varargs: any): qx.locale.LocalizedString;
        trn(singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        trnc(hint: string, singularMessageId: string, pluralMessageId: string, count: number, varargs: any): qx.locale.LocalizedString;
        constructor();
        protected _add(child: qx.ui.core.Widget, layoutProperties?: IMap): void;
        protected _addAfter(child: qx.ui.core.Widget, afterWidget: qx.ui.core.Widget, layoutProperties?: IMap): void;
        protected _addAt(child: qx.ui.core.Widget, index: number, options?: IMap): void;
        protected _addBefore(child: qx.ui.core.Widget, beforeWidget: qx.ui.core.Widget, layoutProperties?: IMap): void;
        protected _applyAttribute(value: any, old: any, attribute: string): void;
        protected _applyDefaultCssClass(value: string, old: string): void;
        protected _applyEnabled(value: boolean, old?: boolean): void;
        protected _applyId(value: string, old: string): void;
        protected _applyStyle(value: any, old: any, style: any): void;
        protected _applyVisibility(value: any, old: any): void;
        protected _createContainerElement(): HTMLElement;
        protected _domUpdated(): void;
        protected _getAttribute(attribute: string): any;
        protected _getChildren(): qx.ui.core.Widget[];
        protected _getContentElement(): HTMLElement;
        protected _getLayout(): qx.ui.mobile.layout.Abstract;
        protected _getStyle(style: string): any;
        protected _getTagName(): string;
        protected _hasChildren(): boolean;
        protected _indexOf(child: qx.ui.core.Widget): number;
        protected _initializeChildLayout(child: qx.ui.core.Widget, layoutProperties?: IMap): void;
        protected _remove(child: qx.ui.core.Widget): void;
        protected _removeAll(): qx.data.Array;
        protected _removeAt(index: number): void;
        protected _setAttribute(attribute: string, value: any): void;
        protected _setContainerElement(element: HTMLElement): void;
        protected _setHtml(value?: string): void;
        protected _setLayout(layout: qx.ui.mobile.layout.Abstract): void;
        protected _setStyle(style: string, value: any): void;
        protected _transform(): void;
        protected _transformId(value: string): string;
        addCssClass(cssClass: string): void;
        addCssClasses(cssClasses: string[]): void;
        destroy(): void;
        exclude(properties: IMap): void;
        getActivatable(): any;
        getAnonymous(): any;
        getDefaultCssClass(): any;
        getEnabled(): any;
        getId(): any;
        getLayoutParent(): qx.ui.core.Widget;
        getName(): any;
        getRotation(): any;
        getScaleX(): any;
        getScaleY(): any;
        getTransformUnit(): any;
        getTranslateX(): any;
        getTranslateY(): any;
        getTranslateZ(): any;
        getVisibility(): any;
        hasCssClass(cssClass: string): boolean;
        hide(properties: IMap): void;
        initActivatable(value: any): any;
        initAnonymous(value: any): any;
        initDefaultCssClass(value: any): any;
        initEnabled(value: any): any;
        initId(value: any): any;
        initName(value: any): any;
        initRotation(value: any): any;
        initScaleX(value: any): any;
        initScaleY(value: any): any;
        initTransformUnit(value: any): any;
        initTranslateX(value: any): any;
        initTranslateY(value: any): any;
        initTranslateZ(value: any): any;
        initVisibility(value: any): any;
        isActivatable(): boolean;
        isAnonymous(): boolean;
        isEnabled(): boolean;
        isExcluded(): boolean;
        isHidden(): boolean;
        isSeeable(): boolean;
        isVisible(): boolean;
        removeCssClass(cssClass: string): void;
        removeCssClasses(cssClasses: string[]): void;
        resetActivatable(): void;
        resetAnonymous(): void;
        resetDefaultCssClass(): void;
        resetEnabled(): void;
        resetId(): void;
        resetName(): void;
        resetRotation(): void;
        resetScaleX(): void;
        resetScaleY(): void;
        resetTransformUnit(): void;
        resetTranslateX(): void;
        resetTranslateY(): void;
        resetTranslateZ(): void;
        resetVisibility(): void;
        setActivatable(value: any): any;
        setAnonymous(value: any): any;
        setDefaultCssClass(value: any): any;
        setEnabled(value: any): any;
        setId(value: any): any;
        setLayoutProperties(properties: IMap): void;
        setName(value: any): any;
        setRotation(value: any): any;
        setScaleX(value: any): any;
        setScaleY(value: any): any;
        setTransformUnit(value: any): any;
        setTranslateX(value: any): any;
        setTranslateY(value: any): any;
        setTranslateZ(value: any): any;
        setVisibility(value: any): any;
        show(properties: IMap): void;
        toggleActivatable(): boolean;
        toggleAnonymous(): boolean;
        toggleCssClass(cssClass: string): void;
        toggleEnabled(): boolean;
        activatable: boolean;
        anonymous: boolean;
        defaultCssClass: string;
        name: string;
        rotation: number;
        scaleX: number;
        scaleY: number;
        translateX: number;
        translateY: number;
        translateZ: number;
        static addAttributeMapping(property: string, attribute: string, values: IMap): void;
        static addStyleMapping(property: string, style: string, values: IMap): void;
        static getWidgetById(id: string): qx.ui.core.Widget;
    }
}
declare module qx.ui.mobile.layout {
    class Abstract extends qx.core.Object {
        protected _addCachedProperty(property: string, value: any): void;
        protected _addPropertyToChildLayoutCache(widget: qx.ui.mobile.core.Widget, property: string, value: any): void;
        protected _getChildLayoutPropertyValue(widget: qx.ui.mobile.core.Widget, property: string): any;
        protected _getCssClasses(): qx.data.Array;
        protected _getSupportedChildLayoutProperties(): IMap;
        protected _setLayoutProperty(widget: qx.ui.mobile.core.Widget, property?: string, value?: any): void;
        connectToChildWidget(widget: qx.ui.mobile.core.Widget): void;
        connectToWidget(widget: qx.ui.mobile.core.Widget): void;
        disconnectFromChildWidget(widget: qx.ui.mobile.core.Widget): void;
        setLayoutProperties(widget: qx.ui.mobile.core.Widget, properties: IMap): void;
        updateLayout(widget: qx.ui.mobile.core.Widget, action: string, properties: IMap): void;
    }
}

declare module qx.registry {
    function registerMainMethod(fn: (app: qx.application.Standalone) => void): void;
}

