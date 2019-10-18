(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-admin-layout-admin-layout-module"],{

/***/ "./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js ***!
  \***********************************************************/
/*! exports provided: CLIPBOARD_SERVICE_PROVIDER_FACTORY, ClipboardService, CLIPBOARD_SERVICE_PROVIDER, ClipboardDirective, ClipboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLIPBOARD_SERVICE_PROVIDER_FACTORY", function() { return CLIPBOARD_SERVICE_PROVIDER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLIPBOARD_SERVICE_PROVIDER", function() { return CLIPBOARD_SERVICE_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardDirective", function() { return ClipboardDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardModule", function() { return ClipboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-window-token */ "./node_modules/ngx-window-token/fesm5/ngx-window-token.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardService = /** @class */ (function () {
    function ClipboardService(document, window) {
        this.document = document;
        this.window = window;
    }
    Object.defineProperty(ClipboardService.prototype, "isSupported", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} element
     * @return {?}
     */
    ClipboardService.prototype.isTargetValid = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    };
    /**
     * copyFromInputElement
     * @param {?} targetElm
     * @return {?}
     */
    ClipboardService.prototype.copyFromInputElement = /**
     * copyFromInputElement
     * @param {?} targetElm
     * @return {?}
     */
    function (targetElm) {
        try {
            this.selectTarget(targetElm);
            /** @type {?} */
            var re = this.copyText();
            this.clearSelection(targetElm, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    };
    // this is for IE11 return true even if copy fail
    /**
     * @return {?}
     */
    ClipboardService.prototype.isCopySuccessInIE11 = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    };
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     * @param {?} content
     * @param {?=} container
     * @return {?}
     */
    ClipboardService.prototype.copyFromContent = /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     * @param {?} content
     * @param {?=} container
     * @return {?}
     */
    function (content, container) {
        if (container === void 0) { container = this.window.document.body; }
        // check if the temp textarea is still belong the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        return this.copyFromInputElement(this.tempTextArea);
    };
    /**
     * @param {?=} container
     * @return {?}
     */
    ClipboardService.prototype.destroy = /**
     * @param {?=} container
     * @return {?}
     */
    function (container) {
        if (container === void 0) { container = this.window.document.body; }
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    };
    /**
     * @param {?} inputElement
     * @return {?}
     */
    ClipboardService.prototype.selectTarget = /**
     * @param {?} inputElement
     * @return {?}
     */
    function (inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    };
    /**
     * @return {?}
     */
    ClipboardService.prototype.copyText = /**
     * @return {?}
     */
    function () {
        return this.document.execCommand('copy');
    };
    /**
     * @param {?} inputElement
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.clearSelection = /**
     * @param {?} inputElement
     * @param {?} window
     * @return {?}
     */
    function (inputElement, window) {
        // tslint:disable-next-line:no-unused-expression
        inputElement && inputElement.blur();
        window.getSelection().removeAllRanges();
    };
    /**
     * @param {?} doc
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.createTempTextArea = /**
     * @param {?} doc
     * @param {?} window
     * @return {?}
     */
    function (doc, window) {
        /** @type {?} */
        var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        /** @type {?} */
        var ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        /** @type {?} */
        var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    };
    ClipboardService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    ClipboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"],] }] }
    ]; };
    return ClipboardService;
}());
/**
 * @param {?} doc
 * @param {?} win
 * @param {?} parentDispatcher
 * @return {?}
 */
function CLIPBOARD_SERVICE_PROVIDER_FACTORY(doc, win, parentDispatcher) {
    return parentDispatcher || new ClipboardService(doc, win);
}
/** @type {?} */
var CLIPBOARD_SERVICE_PROVIDER = {
    deps: [/** @type {?} */ (_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), /** @type {?} */ (ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"]), [new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ClipboardService]],
    provide: ClipboardService,
    useFactory: CLIPBOARD_SERVICE_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardDirective = /** @class */ (function () {
    function ClipboardDirective(clipboardSrv) {
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.clipboardSrv.destroy(this.container);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClipboardDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    };
    /**
     * Fires an event based on the copy operation result.
     * @param {?} succeeded
     * @param {?} copiedContent
     * @param {?} event
     * @return {?}
     */
    ClipboardDirective.prototype.handleResult = /**
     * Fires an event based on the copy operation result.
     * @param {?} succeeded
     * @param {?} copiedContent
     * @param {?} event
     * @return {?}
     */
    function (succeeded, copiedContent, event) {
        if (succeeded) {
            this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent, event: event });
        }
        else {
            this.cbOnError.emit({ isSuccess: false, event: event });
        }
    };
    ClipboardDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[ngxClipboard]'
                },] },
    ];
    /** @nocollapse */
    ClipboardDirective.ctorParameters = function () { return [
        { type: ClipboardService }
    ]; };
    ClipboardDirective.propDecorators = {
        targetElm: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ngxClipboard',] }],
        container: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cbContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cbOnSuccess: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cbOnError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event.target'],] }]
    };
    return ClipboardDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardModule = /** @class */ (function () {
    function ClipboardModule() {
    }
    ClipboardModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["NgxWindowTokenModule"]],
                    // tslint:disable-next-line:object-literal-sort-keys
                    declarations: [ClipboardDirective],
                    exports: [ClipboardDirective],
                    providers: [CLIPBOARD_SERVICE_PROVIDER]
                },] },
    ];
    return ClipboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWNsaXBib2FyZC9saWIvbmd4LWNsaXBib2FyZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtY2xpcGJvYXJkL2xpYi9uZ3gtY2xpcGJvYXJkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWNsaXBib2FyZC9saWIvbmd4LWNsaXBib2FyZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ25neC13aW5kb3ctdG9rZW4nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHRlbXBUZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHB1YmxpYyBkb2N1bWVudDogYW55LCBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW5kb3c6IGFueSkge31cclxuICAgIHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQgJiYgISF0aGlzLmRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCgnY29weScpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RhcmdldFZhbGlkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBQbGVhc2UgdXNlIFwicmVhZG9ubHlcIiBpbnN0ZWFkIG9mIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgc2hvdWxkIGJlIGlucHV0IG9yIHRleHRhcmVhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3B5RnJvbUlucHV0RWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29weUZyb21JbnB1dEVsZW1lbnQodGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFyZ2V0KHRhcmdldEVsbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlID0gdGhpcy5jb3B5VGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKHRhcmdldEVsbSwgdGhpcy53aW5kb3cpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmUgJiYgdGhpcy5pc0NvcHlTdWNjZXNzSW5JRTExKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGlzIGZvciBJRTExIHJldHVybiB0cnVlIGV2ZW4gaWYgY29weSBmYWlsXHJcbiAgICBpc0NvcHlTdWNjZXNzSW5JRTExKCkge1xyXG4gICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSB0aGlzLndpbmRvd1snY2xpcGJvYXJkRGF0YSddO1xyXG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhICYmIGNsaXBib2FyZERhdGEuZ2V0RGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZmFrZSB0ZXh0YXJlYSBlbGVtZW50LCBzZXRzIGl0cyB2YWx1ZSBmcm9tIGB0ZXh0YCBwcm9wZXJ0eSxcclxuICAgICAqIGFuZCBtYWtlcyBhIHNlbGVjdGlvbiBvbiBpdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvcHlGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLndpbmRvdy5kb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRlbXAgdGV4dGFyZWEgaXMgc3RpbGwgYmVsb25nIHRoZSBjdXJyZW50IGNvbnRhaW5lci5cclxuICAgICAgICAvLyBJbiBjYXNlIHdlIGhhdmUgbXVsdGlwbGUgcGxhY2VzIHVzaW5nIG5neC1jbGlwYm9hcmQsIG9uZSBpcyBpbiBhIG1vZGFsIHVzaW5nIGNvbnRhaW5lciBidXQgdGhlIG90aGVyIG9uZSBpcyBub3QuXHJcbiAgICAgICAgaWYgKHRoaXMudGVtcFRleHRBcmVhICYmICFjb250YWluZXIuY29udGFpbnModGhpcy50ZW1wVGV4dEFyZWEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSh0aGlzLnRlbXBUZXh0QXJlYS5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50ZW1wVGV4dEFyZWEpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEgPSB0aGlzLmNyZWF0ZVRlbXBUZXh0QXJlYSh0aGlzLmRvY3VtZW50LCB0aGlzLndpbmRvdyk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgc2hvdWxkIGJlIGEgRG9tIGVsZW1lbnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBUZXh0QXJlYS52YWx1ZSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29weUZyb21JbnB1dEVsZW1lbnQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0ZW1wb3JhcnkgdGV4dGFyZWEgaWYgYW55XHJcbiAgICBwdWJsaWMgZGVzdHJveShjb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy53aW5kb3cuZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBUZXh0QXJlYSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmVDaGlsZCBkb2Vzbid0IHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFRleHRBcmVhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzZWxlY3QgdGhlIHRhcmdldCBodG1sIGlucHV0IGVsZW1lbnRcclxuICAgIHByaXZhdGUgc2VsZWN0VGFyZ2V0KGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZWxlY3QoKTtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgaW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5VGV4dCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgfVxyXG4gICAgLy8gUmVtb3ZlcyBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZm9jdXMgZnJvbSBgdGFyZ2V0YCBlbGVtZW50LlxyXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbihpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCB3aW5kb3c6IFdpbmRvdykge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgYSBmYWtlIHRleHRhcmVhIGZvciBjb3B5IGNvbW1hbmRcclxuICAgIHByaXZhdGUgY3JlYXRlVGVtcFRleHRBcmVhKGRvYzogRG9jdW1lbnQsIHdpbmRvdzogV2luZG93KTogSFRNTFRleHRBcmVhRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgaXNSVEwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlyJykgPT09ICdydGwnO1xyXG4gICAgICAgIGxldCB0YTogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgICAgICB0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgIC8vIFByZXZlbnQgem9vbWluZyBvbiBpT1NcclxuICAgICAgICB0YS5zdHlsZS5mb250U2l6ZSA9ICcxMnB0JztcclxuICAgICAgICAvLyBSZXNldCBib3ggbW9kZWxcclxuICAgICAgICB0YS5zdHlsZS5ib3JkZXIgPSAnMCc7XHJcbiAgICAgICAgdGEuc3R5bGUucGFkZGluZyA9ICcwJztcclxuICAgICAgICB0YS5zdHlsZS5tYXJnaW4gPSAnMCc7XHJcbiAgICAgICAgLy8gTW92ZSBlbGVtZW50IG91dCBvZiBzY3JlZW4gaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgdGEuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHRhLnN0eWxlW2lzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0J10gPSAnLTk5OTlweCc7XHJcbiAgICAgICAgLy8gTW92ZSBlbGVtZW50IHRvIHRoZSBzYW1lIHBvc2l0aW9uIHZlcnRpY2FsbHlcclxuICAgICAgICBjb25zdCB5UG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgdGEuc3R5bGUudG9wID0geVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICB0YS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xyXG4gICAgICAgIHJldHVybiB0YTtcclxuICAgIH1cclxufVxyXG4vLyB0aGlzIHBhdHRlcm4gaXMgbWVudGlvbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEzODU0IGluICM0M1xyXG5leHBvcnQgZnVuY3Rpb24gQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVJfRkFDVE9SWShkb2M6IERvY3VtZW50LCB3aW46IFdpbmRvdywgcGFyZW50RGlzcGF0Y2hlcjogQ2xpcGJvYXJkU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHBhcmVudERpc3BhdGNoZXIgfHwgbmV3IENsaXBib2FyZFNlcnZpY2UoZG9jLCB3aW4pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVIgPSB7XHJcbiAgICBkZXBzOiBbRE9DVU1FTlQgYXMgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+LCBXSU5ET1cgYXMgSW5qZWN0aW9uVG9rZW48V2luZG93PiwgW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgQ2xpcGJvYXJkU2VydmljZV1dLFxyXG4gICAgcHJvdmlkZTogQ2xpcGJvYXJkU2VydmljZSxcclxuICAgIHVzZUZhY3Rvcnk6IENMSVBCT0FSRF9TRVJWSUNFX1BST1ZJREVSX0ZBQ1RPUllcclxufTtcclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW25neENsaXBib2FyZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBASW5wdXQoJ25neENsaXBib2FyZCcpXHJcbiAgICBwdWJsaWMgdGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjb250YWluZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjYkNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBjYk9uU3VjY2VzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBjYk9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaXBib2FyZFNydjogQ2xpcGJvYXJkU2VydmljZSkge31cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuY2xpcGJvYXJkU3J2LmRlc3Ryb3kodGhpcy5jb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgICBwdWJsaWMgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpcGJvYXJkU3J2LmlzU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KGZhbHNlLCB1bmRlZmluZWQsIGV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0RWxtICYmIHRoaXMuY2xpcGJvYXJkU3J2LmlzVGFyZ2V0VmFsaWQodGhpcy50YXJnZXRFbG0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHRoaXMuY2xpcGJvYXJkU3J2LmNvcHlGcm9tSW5wdXRFbGVtZW50KHRoaXMudGFyZ2V0RWxtKSwgdGhpcy50YXJnZXRFbG0udmFsdWUsIGV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2JDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHRoaXMuY2xpcGJvYXJkU3J2LmNvcHlGcm9tQ29udGVudCh0aGlzLmNiQ29udGVudCwgdGhpcy5jb250YWluZXIpLCB0aGlzLmNiQ29udGVudCwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIGFuIGV2ZW50IGJhc2VkIG9uIHRoZSBjb3B5IG9wZXJhdGlvbiByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0gc3VjY2VlZGVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlUmVzdWx0KHN1Y2NlZWRlZDogYm9vbGVhbiwgY29waWVkQ29udGVudDogc3RyaW5nIHwgdW5kZWZpbmVkLCBldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoc3VjY2VlZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JPblN1Y2Nlc3MuZW1pdCh7IGlzU3VjY2VzczogdHJ1ZSwgY29udGVudDogY29waWVkQ29udGVudCwgZXZlbnQ6IGV2ZW50IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JPbkVycm9yLmVtaXQoeyBpc1N1Y2Nlc3M6IGZhbHNlLCBldmVudDogZXZlbnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENsaXBib2FyZERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LWNsaXBib2FyZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVIgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFdpbmRvd1Rva2VuTW9kdWxlIH0gZnJvbSAnbmd4LXdpbmRvdy10b2tlbic7XG5leHBvcnQgKiBmcm9tICcuL25neC1jbGlwYm9hcmQuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbmd4LWNsaXBib2FyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmd4V2luZG93VG9rZW5Nb2R1bGVdLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gIGRlY2xhcmF0aW9uczogW0NsaXBib2FyZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtDbGlwYm9hcmREaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtDTElQQk9BUkRfU0VSVklDRV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkTW9kdWxlIHt9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFPSSwwQkFBcUMsUUFBYSxFQUEwQixNQUFXO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQUs7UUFBMEIsV0FBTSxHQUFOLE1BQU0sQ0FBSztLQUFJOzBCQUNoRix5Q0FBVzs7Ozs7WUFDbEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBRzNGLHdDQUFhOzs7O2NBQUMsT0FBK0M7UUFDaEUsSUFBSSxPQUFPLFlBQVksZ0JBQWdCLElBQUksT0FBTyxZQUFZLG1CQUFtQixFQUFFO1lBQy9FLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO2FBQ3hHO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs7Ozs7OztJQU1uRCwrQ0FBb0I7Ozs7O2NBQUMsU0FBaUQ7UUFDekUsSUFBSTtZQUNBLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBQzdCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOzs7Ozs7SUFJTCw4Q0FBbUI7OztJQUFuQjs7UUFDSSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7OztJQU1NLDBDQUFlOzs7Ozs7O2NBQUMsT0FBZSxFQUFFLFNBQWtEO1FBQWxELDBCQUFBLEVBQUEsWUFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTs7O1FBR3RGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQUk7Z0JBQ0EsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDeEQ7U0FDSjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7OztJQUlqRCxrQ0FBTzs7OztjQUFDLFNBQWtEO1FBQWxELDBCQUFBLEVBQUEsWUFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTtRQUM3RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBRXpDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDOzs7Ozs7SUFJRyx1Q0FBWTs7OztjQUFDLFlBQW9EO1FBQ3JFLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7Ozs7SUFHN0IsbUNBQVE7Ozs7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0lBR3JDLHlDQUFjOzs7OztjQUFDLFlBQW9ELEVBQUUsTUFBYzs7UUFFdkYsWUFBWSxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7Ozs7SUFJcEMsNkNBQWtCOzs7OztjQUFDLEdBQWEsRUFBRSxNQUFjOztRQUNwRCxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7O1FBQ2hFLElBQUksRUFBRSxDQUFzQjtRQUM1QixFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFFbkMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDOztRQUUzQixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7UUFFdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7O1FBRS9DLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDdEUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNoQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQzs7O2dCQTlHakIsVUFBVTs7OztnREFHTSxNQUFNLFNBQUMsUUFBUTtnREFBeUIsTUFBTSxTQUFDLE1BQU07OzJCQVB0RTs7Ozs7Ozs7QUFzSEEsNENBQW1ELEdBQWEsRUFBRSxHQUFXLEVBQUUsZ0JBQWtDO0lBQzdHLE9BQU8sZ0JBQWdCLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDN0Q7O0FBRUQsSUFBYSwwQkFBMEIsR0FBRztJQUN0QyxJQUFJLEVBQUUsbUJBQUMsUUFBb0MscUJBQUUsTUFBZ0MsR0FBRSxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xJLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsVUFBVSxFQUFFLGtDQUFrQztDQUNqRDs7Ozs7O0FDOUhEO0lBdUJJLDRCQUFvQixZQUE4QjtRQUE5QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7MkJBSlYsSUFBSSxZQUFZLEVBQU87eUJBR3pCLElBQUksWUFBWSxFQUFPO0tBQ1A7Ozs7SUFHL0MscUNBQVE7Ozs7Ozs7SUFFUix3Q0FBVzs7OztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7O0lBSXZDLG9DQUFPOzs7O0lBRGQsVUFDZSxLQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUc7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9HO0tBQ0o7Ozs7Ozs7O0lBTU8seUNBQVk7Ozs7Ozs7Y0FBQyxTQUFrQixFQUFFLGFBQWlDLEVBQUUsS0FBWTtRQUNwRixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDM0Q7OztnQkFoRFIsU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkFMUSxnQkFBZ0I7Ozs0QkFRcEIsS0FBSyxTQUFDLGNBQWM7NEJBRXBCLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxNQUFNOzRCQUdOLE1BQU07MEJBV04sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7NkJBaEM1Qzs7Ozs7OztBQ0FBOzs7O2dCQVFDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7O29CQUU3QyxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN4Qzs7MEJBZEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./node_modules/ngx-window-token/fesm5/ngx-window-token.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-window-token/fesm5/ngx-window-token.js ***!
  \*****************************************************************/
/*! exports provided: WINDOW, _window, NgxWindowTokenModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_window", function() { return _window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxWindowTokenModule", function() { return NgxWindowTokenModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('WindowToken');
/**
 * @return {?}
 */
function _window() {
    return window;
}
var NgxWindowTokenModule = /** @class */ (function () {
    function NgxWindowTokenModule() {
    }
    NgxWindowTokenModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    providers: [{
                            provide: WINDOW,
                            useFactory: _window
                        }]
                },] },
    ];
    return NgxWindowTokenModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXdpbmRvdy10b2tlbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXdpbmRvdy10b2tlbi9saWIvbmd4LXdpbmRvdy10b2tlbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW48V2luZG93PignV2luZG93VG9rZW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIF93aW5kb3coKTogV2luZG93IHtcbiAgICByZXR1cm4gd2luZG93O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogV0lORE9XLFxuICAgICAgICB1c2VGYWN0b3J5OiBfd2luZG93XG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4V2luZG93VG9rZW5Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUJBR2EsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLGFBQWEsQ0FBQyxDQUFDOzs7O0FBRWhFO0lBQ0ksT0FBTyxNQUFNLENBQUM7Q0FDakI7Ozs7O2dCQUVBLFFBQVEsU0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUsTUFBTTs0QkFDZixVQUFVLEVBQUUsT0FBTzt5QkFDdEIsQ0FBQztpQkFDTDs7K0JBZEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.module.ts ***!
  \*************************************************************/
/*! exports provided: AdminLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutModule", function() { return AdminLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js");
/* harmony import */ var _admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-layout.routing */ "./src/app/layouts/admin-layout/admin-layout.routing.ts");
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/icons/icons.component */ "./src/app/pages/icons/icons.component.ts");
/* harmony import */ var _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pages/maps/maps.component */ "./src/app/pages/maps/maps.component.ts");
/* harmony import */ var _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../pages/user-profile/user-profile.component */ "./src/app/pages/user-profile/user-profile.component.ts");
/* harmony import */ var _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../pages/tables/tables.component */ "./src/app/pages/tables/tables.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_pages_users_users_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/pages/users/users.component */ "./src/app/pages/users/users.component.ts");
/* harmony import */ var src_app_pages_user_user_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/pages/user/user.component */ "./src/app/pages/user/user.component.ts");
/* harmony import */ var src_app_pages_project_project_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/pages/project/project.component */ "./src/app/pages/project/project.component.ts");
/* harmony import */ var src_app_pages_tags_tags_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/pages/tags/tags.component */ "./src/app/pages/tags/tags.component.ts");
/* harmony import */ var src_app_pages_tag_tag_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/pages/tag/tag.component */ "./src/app/pages/tag/tag.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















// import { ToastrModule } from 'ngx-toastr';
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__["AdminLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"],
                ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__["ClipboardModule"]
            ],
            declarations: [
                _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__["UserProfileComponent"],
                src_app_pages_users_users_component__WEBPACK_IMPORTED_MODULE_13__["UsersComponent"],
                src_app_pages_user_user_component__WEBPACK_IMPORTED_MODULE_14__["UserComponent"],
                _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_11__["TablesComponent"],
                _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_8__["IconsComponent"],
                _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_9__["MapsComponent"],
                src_app_pages_project_project_component__WEBPACK_IMPORTED_MODULE_15__["ProjectComponent"],
                src_app_pages_tags_tags_component__WEBPACK_IMPORTED_MODULE_16__["TagsComponent"],
                src_app_pages_tag_tag_component__WEBPACK_IMPORTED_MODULE_17__["TagComponent"]
            ]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.routing.ts ***!
  \**************************************************************/
/*! exports provided: AdminLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutRoutes", function() { return AdminLayoutRoutes; });
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/icons/icons.component */ "./src/app/pages/icons/icons.component.ts");
/* harmony import */ var _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/maps/maps.component */ "./src/app/pages/maps/maps.component.ts");
/* harmony import */ var _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/user-profile/user-profile.component */ "./src/app/pages/user-profile/user-profile.component.ts");
/* harmony import */ var _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/tables/tables.component */ "./src/app/pages/tables/tables.component.ts");
/* harmony import */ var src_app_pages_users_users_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/pages/users/users.component */ "./src/app/pages/users/users.component.ts");
/* harmony import */ var src_app_pages_user_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/pages/user/user.component */ "./src/app/pages/user/user.component.ts");
/* harmony import */ var src_app_pages_project_project_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/pages/project/project.component */ "./src/app/pages/project/project.component.ts");
/* harmony import */ var src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var src_app_pages_tags_tags_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/pages/tags/tags.component */ "./src/app/pages/tags/tags.component.ts");
/* harmony import */ var src_app_pages_tag_tag_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/pages/tag/tag.component */ "./src/app/pages/tag/tag.component.ts");











var AdminLayoutRoutes = [
    { path: 'dashboard', component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'user-profile', component: _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_3__["UserProfileComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'projects', component: src_app_pages_project_project_component__WEBPACK_IMPORTED_MODULE_7__["ProjectComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'project', component: _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__["TablesComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'projects/:id/edit', component: _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__["TablesComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    // { path: 'projects/:id/tags', component: TagsComponent, canActivate: [AuthGuard] },
    { path: 'tags', component: src_app_pages_tags_tags_component__WEBPACK_IMPORTED_MODULE_9__["TagsComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'tag', component: src_app_pages_tag_tag_component__WEBPACK_IMPORTED_MODULE_10__["TagComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'tag/:id/edit', component: src_app_pages_tag_tag_component__WEBPACK_IMPORTED_MODULE_10__["TagComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'icons', component: _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_1__["IconsComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'users', component: src_app_pages_users_users_component__WEBPACK_IMPORTED_MODULE_5__["UsersComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'users/:id/edit', component: src_app_pages_user_user_component__WEBPACK_IMPORTED_MODULE_6__["UserComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'maps', component: _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_2__["MapsComponent"], canActivate: [src_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] }
];


/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <!-- <div class=\"offset-sm-2\"></div> -->\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <!-- <h5 class=\"card-title text-uppercase text-muted mb-0\"></h5> -->\r\n                  <span class=\"h2 font-weight-bold mb-0 mt-2\">Proyectos</span>\r\n                  <br>\r\n                  <a class=\"h5 font-weight-bold mb-0\" style=\"cursor: pointer;\" [routerLink]=\"['/projects']\">Ir a\r\n                    proyectos</a>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <ng-container *ngIf=\"showUsers\">\r\n          <div class=\"col-xl-3 col-lg-6\">\r\n            <div class=\"card card-stats mb-4 mb-xl-0\">\r\n              <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                  <div class=\"col\">\r\n                    <!-- <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5> -->\r\n                    <span class=\"h2 font-weight-bold mb-0\">Usuarios</span>\r\n                    <br>\r\n                    <a class=\"h5 font-weight-bold mb-0\" style=\"cursor: pointer;\" [routerLink]=\"['/users']\">Ir a\r\n                      usuarios</a>\r\n                  </div>\r\n                  <div class=\"col-auto\">\r\n                    <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                      <i class=\"fas fa-users\"></i>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xl-3 col-lg-6\">\r\n            <div class=\"card card-stats mb-4 mb-xl-0\">\r\n              <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                  <div class=\"col\">\r\n                    <!-- <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5> -->\r\n                    <span class=\"h2 font-weight-bold mb-0\">Etiquetas</span>\r\n                    <br>\r\n                    <a class=\"h5 font-weight-bold mb-0\" style=\"cursor: pointer;\" [routerLink]=\"['/tags']\">Ir a\r\n                      etiquetas</a>\r\n                  </div>\r\n                  <div class=\"col-auto\">\r\n                    <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                      <i class=\"fas fa-tag\"></i>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n        <!-- <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div> -->\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authService) {
        this.authService = authService;
        this.clicked = true;
        this.clicked1 = false;
        this.showUsers = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.showUsers = this.authService.isAdmin();
        // this.datasets = [
        //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
        //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
        // ];
        // this.data = this.datasets[0];
        // var chartOrders = document.getElementById('chart-orders');
        // parseOptions(Chart, chartOptions());
        // var ordersChart = new Chart(chartOrders, {
        //   type: 'bar',
        //   options: chartExample2.options,
        //   data: chartExample2.data
        // });
        // var chartSales = document.getElementById('chart-sales');
        // this.salesChart = new Chart(chartSales, {
        // 	type: 'line',
        // 	options: chartExample1.options,
        // 	data: chartExample1.data
        // });
    };
    DashboardComponent.prototype.updateOptions = function () {
        // this.salesChart.data.datasets[0].data = this.data;
        // this.salesChart.update();
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/pages/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/pages/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/pages/icons/icons.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/icons/icons.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Traffic</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">350,897</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fa fa-arrow-up\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">New users</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">2,356</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-pie\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-danger mr-2\"><i class=\"fas fa-arrow-down\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last week</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">924</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-users\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-warning mr-2\"><i class=\"fas fa-arrow-down\"></i> 1.10%</span>\r\n                <span class=\"text-nowrap\">Since yesterday</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header bg-transparent\">\r\n          <h3 class=\"mb-0\">Icons</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"row icon-examples\">\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'active-40' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'active-40'\" (cbOnSuccess) = \"copy = 'active-40'\">\r\n                <div>\r\n                  <i class=\"ni ni-active-40\"></i>\r\n                  <span>active-40</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'air-baloon' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'air-baloon'\" (cbOnSuccess) = \"copy = 'air-baloon'\">\r\n                <div>\r\n                  <i class=\"ni ni-air-baloon\"></i>\r\n                  <span>air-baloon</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'album-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'album-2'\" (cbOnSuccess) = \"copy = 'album-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-album-2\"></i>\r\n                  <span>album-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'align-center' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'align-center'\" (cbOnSuccess) = \"copy = 'align-center'\">\r\n                <div>\r\n                  <i class=\"ni ni-align-center\"></i>\r\n                  <span>align-center</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'align-left-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'align-left-2'\" (cbOnSuccess) = \"copy = 'align-left-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-align-left-2\"></i>\r\n                  <span>align-left-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ambulance' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ambulance'\" (cbOnSuccess) = \"copy = 'ambulance'\">\r\n                <div>\r\n                  <i class=\"ni ni-ambulance\"></i>\r\n                  <span>ambulance</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'app' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'app'\" (cbOnSuccess) = \"copy = 'app'\">\r\n                <div>\r\n                  <i class=\"ni ni-app\"></i>\r\n                  <span>app</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'archive-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'archive-2'\" (cbOnSuccess) = \"copy = 'archive-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-archive-2\"></i>\r\n                  <span>archive-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'atom' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'atom'\" (cbOnSuccess) = \"copy = 'atom'\">\r\n                <div>\r\n                  <i class=\"ni ni-atom\"></i>\r\n                  <span>atom</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'badge' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'badge'\" (cbOnSuccess) = \"copy = 'badge'\">\r\n                <div>\r\n                  <i class=\"ni ni-badge\"></i>\r\n                  <span>badge</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bag-17' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bag-17'\" (cbOnSuccess) = \"copy = 'bag-17'\">\r\n                <div>\r\n                  <i class=\"ni ni-bag-17\"></i>\r\n                  <span>bag-17</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'basket' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'basket'\" (cbOnSuccess) = \"copy = 'basket'\">\r\n                <div>\r\n                  <i class=\"ni ni-basket\"></i>\r\n                  <span>basket</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bell-55' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bell-55'\" (cbOnSuccess) = \"copy = 'bell-55'\">\r\n                <div>\r\n                  <i class=\"ni ni-bell-55\"></i>\r\n                  <span>bell-55</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-down' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-down'\" (cbOnSuccess) = \"copy = 'bold-down'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-down\"></i>\r\n                  <span>bold-down</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-left' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-left'\" (cbOnSuccess) = \"copy = 'bold-left'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-left\"></i>\r\n                  <span>bold-left</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-right' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-right'\" (cbOnSuccess) = \"copy = 'bold-right'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-right\"></i>\r\n                  <span>bold-right</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-up' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-up'\" (cbOnSuccess) = \"copy = 'bold-up'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-up\"></i>\r\n                  <span>bold-up</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold'\" (cbOnSuccess) = \"copy = 'bold'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold\"></i>\r\n                  <span>bold</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'book-bookmark' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'book-bookmark'\" (cbOnSuccess) = \"copy = 'book-bookmark'\">\r\n                <div>\r\n                  <i class=\"ni ni-book-bookmark\"></i>\r\n                  <span>book-bookmark</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'books' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'books'\" (cbOnSuccess) = \"copy = 'books'\">\r\n                <div>\r\n                  <i class=\"ni ni-books\"></i>\r\n                  <span>books</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'box-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'box-2'\" (cbOnSuccess) = \"copy = 'box-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-box-2\"></i>\r\n                  <span>box-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'briefcase-24' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'briefcase-24'\" (cbOnSuccess) = \"copy = 'briefcase-24'\">\r\n                <div>\r\n                  <i class=\"ni ni-briefcase-24\"></i>\r\n                  <span>briefcase-24</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'building' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'building'\" (cbOnSuccess) = \"copy = 'building'\">\r\n                <div>\r\n                  <i class=\"ni ni-building\"></i>\r\n                  <span>building</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bulb-61' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bulb-61'\" (cbOnSuccess) = \"copy = 'bulb-61'\">\r\n                <div>\r\n                  <i class=\"ni ni-bulb-61\"></i>\r\n                  <span>bulb-61</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bullet-list-67' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bullet-list-67'\" (cbOnSuccess) = \"copy = 'bullet-list-67'\">\r\n                <div>\r\n                  <i class=\"ni ni-bullet-list-67\"></i>\r\n                  <span>bullet-list-67</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bus-front-12' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bus-front-12'\" (cbOnSuccess) = \"copy = 'bus-front-12'\">\r\n                <div>\r\n                  <i class=\"ni ni-bus-front-12\"></i>\r\n                  <span>bus-front-12</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-pause' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-pause'\" (cbOnSuccess) = \"copy = 'button-pause'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-pause\"></i>\r\n                  <span>button-pause</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-play' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-play'\" (cbOnSuccess) = \"copy = 'button-play'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-play\"></i>\r\n                  <span>button-play</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-power' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-power'\" (cbOnSuccess) = \"copy = 'button-power'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-power\"></i>\r\n                  <span>button-power</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'calendar-grid-58' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'calendar-grid-58'\" (cbOnSuccess) = \"copy = 'calendar-grid-58'\">\r\n                <div>\r\n                  <i class=\"ni ni-calendar-grid-58\"></i>\r\n                  <span>calendar-grid-58</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'camera-compact' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'camera-compact'\" (cbOnSuccess) = \"copy = 'camera-compact'\">\r\n                <div>\r\n                  <i class=\"ni ni-camera-compact\"></i>\r\n                  <span>camera-compact</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'caps-small' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'caps-small'\" (cbOnSuccess) = \"copy = 'caps-small'\">\r\n                <div>\r\n                  <i class=\"ni ni-caps-small\"></i>\r\n                  <span>caps-small</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cart' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cart'\" (cbOnSuccess) = \"copy = 'cart'\">\r\n                <div>\r\n                  <i class=\"ni ni-cart\"></i>\r\n                  <span>cart</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chart-bar-32' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chart-bar-32'\" (cbOnSuccess) = \"copy = 'chart-bar-32'\">\r\n                <div>\r\n                  <i class=\"ni ni-chart-bar-32\"></i>\r\n                  <span>chart-bar-32</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chart-pie-35' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chart-pie-35'\" (cbOnSuccess) = \"copy = 'chart-pie-35'\">\r\n                <div>\r\n                  <i class=\"ni ni-chart-pie-35\"></i>\r\n                  <span>chart-pie-35</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chat-round' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chat-round'\" (cbOnSuccess) = \"copy = 'chat-round'\">\r\n                <div>\r\n                  <i class=\"ni ni-chat-round\"></i>\r\n                  <span>chat-round</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'check-bold' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'check-bold'\" (cbOnSuccess) = \"copy = 'check-bold'\">\r\n                <div>\r\n                  <i class=\"ni ni-check-bold\"></i>\r\n                  <span>check-bold</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'circle-08' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'circle-08'\" (cbOnSuccess) = \"copy = 'circle-08'\">\r\n                <div>\r\n                  <i class=\"ni ni-circle-08\"></i>\r\n                  <span>circle-08</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cloud-download-95' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cloud-download-95'\" (cbOnSuccess) = \"copy = 'cloud-download-95'\">\r\n                <div>\r\n                  <i class=\"ni ni-cloud-download-95\"></i>\r\n                  <span>cloud-download-95</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cloud-upload-96' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cloud-upload-96'\" (cbOnSuccess) = \"copy = 'cloud-upload-96'\">\r\n                <div>\r\n                  <i class=\"ni ni-cloud-upload-96\"></i>\r\n                  <span>cloud-upload-96</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'compass-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'compass-04'\" (cbOnSuccess) = \"copy = 'compass-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-compass-04\"></i>\r\n                  <span>compass-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'controller' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'controller'\" (cbOnSuccess) = \"copy = 'controller'\">\r\n                <div>\r\n                  <i class=\"ni ni-controller\"></i>\r\n                  <span>controller</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'credit-card' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'credit-card'\" (cbOnSuccess) = \"copy = 'credit-card'\">\r\n                <div>\r\n                  <i class=\"ni ni-credit-card\"></i>\r\n                  <span>credit-card</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'curved-next' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'curved-next'\" (cbOnSuccess) = \"copy = 'curved-next'\">\r\n                <div>\r\n                  <i class=\"ni ni-curved-next\"></i>\r\n                  <span>curved-next</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'delivery-fast' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'delivery-fast'\" (cbOnSuccess) = \"copy = 'delivery-fast'\">\r\n                <div>\r\n                  <i class=\"ni ni-delivery-fast\"></i>\r\n                  <span>delivery-fast</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'diamond' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'diamond'\" (cbOnSuccess) = \"copy = 'diamond'\">\r\n                <div>\r\n                  <i class=\"ni ni-diamond\"></i>\r\n                  <span>diamond</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'email-83' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'email-83'\" (cbOnSuccess) = \"copy = 'email-83'\">\r\n                <div>\r\n                  <i class=\"ni ni-email-83\"></i>\r\n                  <span>email-83</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-add' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-add'\" (cbOnSuccess) = \"copy = 'fat-add'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-add\"></i>\r\n                  <span>fat-add</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-delete' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-delete'\" (cbOnSuccess) = \"copy = 'fat-delete'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-delete\"></i>\r\n                  <span>fat-delete</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-remove' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-remove'\" (cbOnSuccess) = \"copy = 'fat-remove'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-remove\"></i>\r\n                  <span>fat-remove</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'favourite-28' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'favourite-28'\" (cbOnSuccess) = \"copy = 'favourite-28'\">\r\n                <div>\r\n                  <i class=\"ni ni-favourite-28\"></i>\r\n                  <span>favourite-28</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'folder-17' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'folder-17'\" (cbOnSuccess) = \"copy = 'folder-17'\">\r\n                <div>\r\n                  <i class=\"ni ni-folder-17\"></i>\r\n                  <span>folder-17</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'glasses-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'glasses-2'\" (cbOnSuccess) = \"copy = 'glasses-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-glasses-2\"></i>\r\n                  <span>glasses-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'hat-3' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'hat-3'\" (cbOnSuccess) = \"copy = 'hat-3'\">\r\n                <div>\r\n                  <i class=\"ni ni-hat-3\"></i>\r\n                  <span>hat-3</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'headphones' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'headphones'\" (cbOnSuccess) = \"copy = 'headphones'\">\r\n                <div>\r\n                  <i class=\"ni ni-headphones\"></i>\r\n                  <span>headphones</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'html5' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'html5'\" (cbOnSuccess) = \"copy = 'html5'\">\r\n                <div>\r\n                  <i class=\"ni ni-html5\"></i>\r\n                  <span>html5</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'istanbul' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'istanbul'\" (cbOnSuccess) = \"copy = 'istanbul'\">\r\n                <div>\r\n                  <i class=\"ni ni-istanbul\"></i>\r\n                  <span>istanbul</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'circle-08' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'circle-08'\" (cbOnSuccess) = \"copy = 'circle-08'\">\r\n                <div>\r\n                  <i class=\"ni ni-circle-08\"></i>\r\n                  <span>circle-08</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'key-25' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'key-25'\" (cbOnSuccess) = \"copy = 'key-25'\">\r\n                <div>\r\n                  <i class=\"ni ni-key-25\"></i>\r\n                  <span>key-25</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'laptop' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'laptop'\" (cbOnSuccess) = \"copy = 'laptop'\">\r\n                <div>\r\n                  <i class=\"ni ni-laptop\"></i>\r\n                  <span>laptop</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'like-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'like-2'\" (cbOnSuccess) = \"copy = 'like-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-like-2\"></i>\r\n                  <span>like-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'lock-circle-open' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'lock-circle-open'\" (cbOnSuccess) = \"copy = 'lock-circle-open'\">\r\n                <div>\r\n                  <i class=\"ni ni-lock-circle-open\"></i>\r\n                  <span>lock-circle-open</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'map-big' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'map-big'\" (cbOnSuccess) = \"copy = 'map-big'\">\r\n                <div>\r\n                  <i class=\"ni ni-map-big\"></i>\r\n                  <span>map-big</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'mobile-button' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'mobile-button'\" (cbOnSuccess) = \"copy = 'mobile-button'\">\r\n                <div>\r\n                  <i class=\"ni ni-mobile-button\"></i>\r\n                  <span>mobile-button</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'money-coins' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'money-coins'\" (cbOnSuccess) = \"copy = 'money-coins'\">\r\n                <div>\r\n                  <i class=\"ni ni-money-coins\"></i>\r\n                  <span>money-coins</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'note-03' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'note-03'\" (cbOnSuccess) = \"copy = 'note-03'\">\r\n                <div>\r\n                  <i class=\"ni ni-note-03\"></i>\r\n                  <span>note-03</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'notification-70' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'notification-70'\" (cbOnSuccess) = \"copy = 'notification-70'\">\r\n                <div>\r\n                  <i class=\"ni ni-notification-70\"></i>\r\n                  <span>notification-70</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'palette' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'palette'\" (cbOnSuccess) = \"copy = 'palette'\">\r\n                <div>\r\n                  <i class=\"ni ni-palette\"></i>\r\n                  <span>palette</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'paper-diploma' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'paper-diploma'\" (cbOnSuccess) = \"copy = 'paper-diploma'\">\r\n                <div>\r\n                  <i class=\"ni ni-paper-diploma\"></i>\r\n                  <span>paper-diploma</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'pin-3' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'pin-3'\" (cbOnSuccess) = \"copy = 'pin-3'\">\r\n                <div>\r\n                  <i class=\"ni ni-pin-3\"></i>\r\n                  <span>pin-3</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'planet' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'planet'\" (cbOnSuccess) = \"copy = 'planet'\">\r\n                <div>\r\n                  <i class=\"ni ni-planet\"></i>\r\n                  <span>planet</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ruler-pencil' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ruler-pencil'\" (cbOnSuccess) = \"copy = 'ruler-pencil'\">\r\n                <div>\r\n                  <i class=\"ni ni-ruler-pencil\"></i>\r\n                  <span>ruler-pencil</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'satisfied' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'satisfied'\" (cbOnSuccess) = \"copy = 'satisfied'\">\r\n                <div>\r\n                  <i class=\"ni ni-satisfied\"></i>\r\n                  <span>satisfied</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'scissors' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'scissors'\" (cbOnSuccess) = \"copy = 'scissors'\">\r\n                <div>\r\n                  <i class=\"ni ni-scissors\"></i>\r\n                  <span>scissors</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'send' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'send'\" (cbOnSuccess) = \"copy = 'send'\">\r\n                <div>\r\n                  <i class=\"ni ni-send\"></i>\r\n                  <span>send</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'settings-gear-65' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'settings-gear-65'\" (cbOnSuccess) = \"copy = 'settings-gear-65'\">\r\n                <div>\r\n                  <i class=\"ni ni-settings-gear-65\"></i>\r\n                  <span>settings-gear-65</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'settings' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'settings'\" (cbOnSuccess) = \"copy = 'settings'\">\r\n                <div>\r\n                  <i class=\"ni ni-settings\"></i>\r\n                  <span>settings</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'single-02' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'single-02'\" (cbOnSuccess) = \"copy = 'single-02'\">\r\n                <div>\r\n                  <i class=\"ni ni-single-02\"></i>\r\n                  <span>single-02</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'single-copy-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'single-copy-04'\" (cbOnSuccess) = \"copy = 'single-copy-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-single-copy-04\"></i>\r\n                  <span>single-copy-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'sound-wave' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'sound-wave'\" (cbOnSuccess) = \"copy = 'sound-wave'\">\r\n                <div>\r\n                  <i class=\"ni ni-sound-wave\"></i>\r\n                  <span>sound-wave</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'spaceship' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'spaceship'\" (cbOnSuccess) = \"copy = 'spaceship'\">\r\n                <div>\r\n                  <i class=\"ni ni-spaceship\"></i>\r\n                  <span>spaceship</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'square-pin' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'square-pin'\" (cbOnSuccess) = \"copy = 'square-pin'\">\r\n                <div>\r\n                  <i class=\"ni ni-square-pin\"></i>\r\n                  <span>square-pin</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'support-16' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'support-16'\" (cbOnSuccess) = \"copy = 'support-16'\">\r\n                <div>\r\n                  <i class=\"ni ni-support-16\"></i>\r\n                  <span>support-16</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tablet-button' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tablet-button'\" (cbOnSuccess) = \"copy = 'tablet-button'\">\r\n                <div>\r\n                  <i class=\"ni ni-tablet-button\"></i>\r\n                  <span>tablet-button</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tag' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tag'\" (cbOnSuccess) = \"copy = 'tag'\">\r\n                <div>\r\n                  <i class=\"ni ni-tag\"></i>\r\n                  <span>tag</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tie-bow' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tie-bow'\" (cbOnSuccess) = \"copy = 'tie-bow'\">\r\n                <div>\r\n                  <i class=\"ni ni-tie-bow\"></i>\r\n                  <span>tie-bow</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'time-alarm' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'time-alarm'\" (cbOnSuccess) = \"copy = 'time-alarm'\">\r\n                <div>\r\n                  <i class=\"ni ni-time-alarm\"></i>\r\n                  <span>time-alarm</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'trophy' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'trophy'\" (cbOnSuccess) = \"copy = 'trophy'\">\r\n                <div>\r\n                  <i class=\"ni ni-trophy\"></i>\r\n                  <span>trophy</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tv-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tv-2'\" (cbOnSuccess) = \"copy = 'tv-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-tv-2\"></i>\r\n                  <span>tv-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'umbrella-13' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'umbrella-13'\" (cbOnSuccess) = \"copy = 'umbrella-13'\">\r\n                <div>\r\n                  <i class=\"ni ni-umbrella-13\"></i>\r\n                  <span>umbrella-13</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'user-run' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'user-run'\" (cbOnSuccess) = \"copy = 'user-run'\">\r\n                <div>\r\n                  <i class=\"ni ni-user-run\"></i>\r\n                  <span>user-run</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'vector' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'vector'\" (cbOnSuccess) = \"copy = 'vector'\">\r\n                <div>\r\n                  <i class=\"ni ni-vector\"></i>\r\n                  <span>vector</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'watch-time' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'watch-time'\" (cbOnSuccess) = \"copy = 'watch-time'\">\r\n                <div>\r\n                  <i class=\"ni ni-watch-time\"></i>\r\n                  <span>watch-time</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'world' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'world'\" (cbOnSuccess) = \"copy = 'world'\">\r\n                <div>\r\n                  <i class=\"ni ni-world\"></i>\r\n                  <span>world</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'zoom-split-in' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'zoom-split-in'\" (cbOnSuccess) = \"copy = 'zoom-split-in'\">\r\n                <div>\r\n                  <i class=\"ni ni-zoom-split-in\"></i>\r\n                  <span>zoom-split-in</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'collection' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'collection'\" (cbOnSuccess) = \"copy = 'collection'\">\r\n                <div>\r\n                  <i class=\"ni ni-collection\"></i>\r\n                  <span>collection</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'image' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'image'\" (cbOnSuccess) = \"copy = 'image'\">\r\n                <div>\r\n                  <i class=\"ni ni-image\"></i>\r\n                  <span>image</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'shop' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'shop'\" (cbOnSuccess) = \"copy = 'shop'\">\r\n                <div>\r\n                  <i class=\"ni ni-shop\"></i>\r\n                  <span>shop</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ungroup' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ungroup'\" (cbOnSuccess) = \"copy = 'ungroup'\">\r\n                <div>\r\n                  <i class=\"ni ni-ungroup\"></i>\r\n                  <span>ungroup</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'world-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'world-2'\" (cbOnSuccess) = \"copy = 'world-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-world-2\"></i>\r\n                  <span>world-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ui-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ui-04'\" (cbOnSuccess) = \"copy = 'ui-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-ui-04\"></i>\r\n                  <span>ui-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/icons/icons.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/icons/icons.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ljb25zL2ljb25zLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/icons/icons.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/icons/icons.component.ts ***!
  \************************************************/
/*! exports provided: IconsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsComponent", function() { return IconsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IconsComponent = /** @class */ (function () {
    function IconsComponent() {
    }
    IconsComponent.prototype.ngOnInit = function () {
    };
    IconsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-icons',
            template: __webpack_require__(/*! ./icons.component.html */ "./src/app/pages/icons/icons.component.html"),
            styles: [__webpack_require__(/*! ./icons.component.scss */ "./src/app/pages/icons/icons.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], IconsComponent);
    return IconsComponent;
}());



/***/ }),

/***/ "./src/app/pages/maps/maps.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/maps/maps.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Traffic</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">350,897</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fa fa-arrow-up\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">New users</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">2,356</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-pie\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-danger mr-2\"><i class=\"fas fa-arrow-down\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last week</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">924</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-users\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-warning mr-2\"><i class=\"fas fa-arrow-down\"></i> 1.10%</span>\r\n                <span class=\"text-nowrap\">Since yesterday</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow border-0\">\r\n        <div id=\"map-canvas\" class=\"map-canvas\" data-lat=\"40.748817\" data-lng=\"-73.985428\" style=\"height: 600px;\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/maps/maps.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/maps/maps.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hcHMvbWFwcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/maps/maps.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/maps/maps.component.ts ***!
  \**********************************************/
/*! exports provided: MapsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsComponent", function() { return MapsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MapsComponent = /** @class */ (function () {
    function MapsComponent() {
    }
    MapsComponent.prototype.ngOnInit = function () {
        var map = document.getElementById('map-canvas');
        var lat = map.getAttribute('data-lat');
        var lng = map.getAttribute('data-lng');
        var myLatlng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            zoom: 12,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
                { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
                { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
                { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
                { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "water", "elementType": "all", "stylers": [{ "color": '#5e72e4' }, { "visibility": "on" }] }
            ]
        };
        map = new google.maps.Map(map, mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });
        var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
            '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    };
    MapsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-maps',
            template: __webpack_require__(/*! ./maps.component.html */ "./src/app/pages/maps/maps.component.html"),
            styles: [__webpack_require__(/*! ./maps.component.scss */ "./src/app/pages/maps/maps.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MapsComponent);
    return MapsComponent;
}());



/***/ }),

/***/ "./src/app/pages/project/project.component.html":
/*!******************************************************!*\
  !*** ./src/app/pages/project/project.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row justify-content-md-center\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <div class=\"row\">\r\n            <h3 class=\"\" style=\"margin-bottom: 5px;\">Listado proyectos</h3> &nbsp;&nbsp;\r\n            <a class=\"btn btn-info btn-sm\" [routerLink]=\"['/project']\"> Agregar</a>\r\n          </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-flush\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th scope=\"col\">Nombre</th>\r\n                <th scope=\"col\">Fecha inicio</th>\r\n                <th scope=\"col\">Opciones</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <ng-container *ngFor=\"let project of projectsList\">\r\n                <tr>\r\n                  <td> {{ project.name }} </td>\r\n                  <td> {{ project.startdate | date: 'mediumDate' }} </td>\r\n                  <td>\r\n                    <a class=\"btn btn-dark btn-sm fas fa-tasks\" title=\"Visualizar\" target=\"_blank\"\r\n                      [routerLink]=\"['/projects/', project.idproject, 'dashboard']\"> </a>\r\n                    <a class=\"btn btn-primary btn-sm fas fa-pencil-alt\" title=\"Editar\"\r\n                      [routerLink]=\"['/projects/', project.idproject, 'edit']\"> </a>\r\n                    <button class=\"btn btn-danger btn-sm far fa-trash-alt\" title=\"Eliminar\"\r\n                      (click)=\"delete(project.idproject)\"></button>\r\n                  </td>\r\n                </tr>\r\n              </ng-container>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/project/project.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/project/project.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/project/project.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/project/project.component.ts ***!
  \****************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    ProjectComponent.prototype.delete = function (idProject) {
        var _this = this;
        this.projectService.deleteProject(idProject).subscribe(function (data) {
            alert('Proyecto eliminado correctamente');
            _this.getProjects();
        });
    };
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjects().subscribe(function (data) {
            _this.projectsList = data['projects'];
        });
    };
    ProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(/*! ./project.component.html */ "./src/app/pages/project/project.component.html"),
            styles: [__webpack_require__(/*! ./project.component.scss */ "./src/app/pages/project/project.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/pages/tables/tables.component.html":
/*!****************************************************!*\
  !*** ./src/app/pages/tables/tables.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row justify-content-md-center\">\r\n    <div class=\"col-10\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <h3 class=\"mb-0\">Crear Proyecto</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <!-- Form groups used in grid -->\r\n          <form role=\"form\" (ngSubmit)=\"onSubmit()\">\r\n            <div class=\"row\">\r\n              <div class=\"col-12\">\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"form-control-label\">Nombre</label>\r\n                  <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Nombre del proyecto\"\r\n                    [(ngModel)]=\"form.name\">\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"form-control-label\">Fecha de inicio</label>\r\n                  <input type=\"date\" class=\"form-control\" name=\"startdate\" [(ngModel)]=\"form.startdate\">\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"form-control-label\">Fecha Fin</label>\r\n                  <input type=\"date\" class=\"form-control\" name=\"enddate\" [(ngModel)]=\"form.enddate\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"form-control-label\">Descripción</label>\r\n                  <textarea [(ngModel)]=\"form.description\" class=\"form-control\" name=\"description\" cols=\"30\" rows=\"10\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-12\">\r\n                <div class=\"text-right\">\r\n                  <a class=\"btn btn-danger mt-4\" [routerLink]=\"['/projects']\">Cancelar</a>\r\n                  <button type=\"submit\" class=\"btn btn-primary mt-4\">Crear</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/tables/tables.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pages/tables/tables.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhYmxlcy90YWJsZXMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/tables/tables.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/tables/tables.component.ts ***!
  \**************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TablesComponent = /** @class */ (function () {
    function TablesComponent(router, http, route, projectService) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.route = route;
        this.projectService = projectService;
        this.idproject = '';
        var DateObj = new Date;
        var date = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);
        this.date = date;
        this.form = {
            name: '',
            startdate: date,
            enddate: '',
            description: '',
            image: 'image'
        };
        this.route.params.subscribe(function (params) {
            _this.idproject = (params['id'] ? params['id'] : '');
        });
    }
    TablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.idproject != '') {
            this.projectService.getProject(this.idproject).subscribe(function (data) {
                _this.form = data['project'];
            });
        }
    };
    TablesComponent.prototype.onSubmit = function () {
        var _this = this;
        var route = '';
        if (this.form.idproject) {
            route = "/" + this.form.idproject;
        }
        this.http.post('http://localhost:8000/api/project' + route, this.form).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    TablesComponent.prototype.handleError = function (error) {
        console.log(error);
    };
    TablesComponent.prototype.handleResponse = function (data) {
        this.router.navigateByUrl('/projects');
    };
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tables',
            template: __webpack_require__(/*! ./tables.component.html */ "./src/app/pages/tables/tables.component.html"),
            styles: [__webpack_require__(/*! ./tables.component.scss */ "./src/app/pages/tables/tables.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_project_service__WEBPACK_IMPORTED_MODULE_3__["ProjectService"]])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/pages/tag/tag.component.html":
/*!**********************************************!*\
  !*** ./src/app/pages/tag/tag.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n    </div>\n  </div>\n</div>\n<div class=\"container-fluid mt--7\">\n  <div class=\"row justify-content-md-center\">\n    <div class=\"col-10\">\n      <div class=\"card mb-4\">\n        <!-- Card header -->\n        <div class=\"card-header\">\n          <h3 class=\"mb-0\">Formulario</h3>\n        </div>\n        <!-- Card body -->\n        <div class=\"card-body\">\n          <!-- Form groups used in grid -->\n          <form (ngSubmit)=\"onSubmit()\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                  <label class=\"form-control-label\" for=\"idproject\">Proyecto</label>\n                  <select name=\"idproject\" id=\"idproject\" class=\"form-control\" [(ngModel)]=\"tag.idproject\">\n                    <option *ngFor=\"let project of projectsList\" value=\"{{project.idproject}}\">{{project.name}}</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"col-md-8\">\n                <div class=\"form-group\">\n                  <label class=\"form-control-label\" for=\"name\">Nombre</label>\n                  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Nombre etiqueta\" name=\"name\"\n                    [(ngModel)]=\"tag.name\" type=\"text\" required>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"text-right\">\n                  <a class=\"btn btn-danger mt-4\" [routerLink]=\"['/tags']\">Cancelar</a>\n                  <button type=\"button\" type=\"submit\" class=\"btn btn-primary mt-4\">Guardar</button>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/tag/tag.component.scss":
/*!**********************************************!*\
  !*** ./src/app/pages/tag/tag.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhZy90YWcuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/tag/tag.component.ts":
/*!********************************************!*\
  !*** ./src/app/pages/tag/tag.component.ts ***!
  \********************************************/
/*! exports provided: TagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagComponent", function() { return TagComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TagComponent = /** @class */ (function () {
    function TagComponent(router, http, route, projectService) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.route = route;
        this.projectService = projectService;
        this.tag = {};
        this.tagId = 0;
        this.projectsList = [];
        this.route.params.subscribe(function (params) {
            _this.tagId = params['id'];
            _this.getTag();
        });
    }
    TagComponent.prototype.ngOnInit = function () {
        this.getTag();
    };
    TagComponent.prototype.getTag = function () {
        var _this = this;
        this.projectService.getProjects().subscribe(function (data) {
            _this.projectsList = data['projects'];
            _this.projectService.getTags(_this.tagId).subscribe(function (resp) {
                if (_this.tagId > 0) {
                    _this.tag = resp['tag'];
                }
            });
        });
    };
    TagComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.tag['idproject']) {
            this.tag['idproject'] = this.projectsList[0]['idproject'];
        }
        var data = this.tag;
        this.http.post('http://localhost:8000/api/tag', data).subscribe(function (data) { return _this.handleData(data); }, function (error) { return console.log(error); });
    };
    TagComponent.prototype.handleData = function (data) {
        this.router.navigateByUrl('/tags');
    };
    TagComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tag',
            template: __webpack_require__(/*! ./tag.component.html */ "./src/app/pages/tag/tag.component.html"),
            styles: [__webpack_require__(/*! ./tag.component.scss */ "./src/app/pages/tag/tag.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]])
    ], TagComponent);
    return TagComponent;
}());



/***/ }),

/***/ "./src/app/pages/tags/tags.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/tags/tags.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n    </div>\n  </div>\n</div>\n<div class=\"container-fluid mt--7\">\n  <!-- Table -->\n  <div class=\"row justify-content-md-center\">\n    <div class=\"col-12\">\n      <div class=\"card shadow\">\n        <div class=\"card-header border-0\">\n          <div class=\"row\">\n            <h3 class=\"\" style=\"margin-bottom: 5px;\">Listado etiquetas</h3> &nbsp;&nbsp;\n            <a class=\"btn btn-info btn-sm\" [routerLink]=\"['/tag']\"> Agregar</a>\n          </div>\n        </div>\n        <div class=\"table-responsive\">\n          <table class=\"table align-items-center table-flush\">\n            <thead class=\"thead-light\">\n              <tr>\n                <th scope=\"col\">Nombre</th>\n                <th scope=\"col\">Proyecto</th>\n                <th scope=\"col\">Opciones</th>\n              </tr>\n            </thead>\n            <tbody>\n              <ng-container *ngFor=\"let tag of tagsList\">\n                <tr>\n                  <td> {{ tag.name }} </td>\n                  <td> {{ tag.projectName }} </td>\n                  <td>\n                    <a class=\"btn btn-primary btn-sm fas fa-pencil-alt\" title=\"Editar\"\n                      [routerLink]=\"['/tag/', tag.idtag, 'edit']\"> </a>\n                    <button class=\"btn btn-danger btn-sm far fa-trash-alt\" title=\"Eliminar\"\n                      (click)=\"delete(tag.idTag)\"></button>\n                  </td>\n                </tr>\n              </ng-container>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/tags/tags.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/tags/tags.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhZ3MvdGFncy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/tags/tags.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/tags/tags.component.ts ***!
  \**********************************************/
/*! exports provided: TagsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsComponent", function() { return TagsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TagsComponent = /** @class */ (function () {
    function TagsComponent(route, projectService) {
        this.route = route;
        this.projectService = projectService;
        this.projectId = 0;
        this.projectName = '';
        this.tagsList = [];
        // this.route.params.subscribe(params => {
        //   this.projectId = params['id'];
        //   this.getTags();
        // });
    }
    TagsComponent.prototype.ngOnInit = function () {
        this.getTags();
    };
    TagsComponent.prototype.getTags = function () {
        var _this = this;
        this.projectService.getTags().subscribe(function (data) {
            _this.tagsList = data['tagsList'];
        });
    };
    TagsComponent.prototype.delete = function (tagId) {
        var _this = this;
        this.projectService.deleteTag(tagId).subscribe(function (data) {
            alert('Etiqueta eliminada correctamente');
            _this.getTags();
        });
    };
    TagsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tags',
            template: __webpack_require__(/*! ./tags.component.html */ "./src/app/pages/tags/tags.component.html"),
            styles: [__webpack_require__(/*! ./tags.component.scss */ "./src/app/pages/tags/tags.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"]])
    ], TagsComponent);
    return TagsComponent;
}());



/***/ }),

/***/ "./src/app/pages/user-profile/user-profile.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header pb-8 pt-5 pt-lg-8 d-flex align-items-center\" style=\"min-height: 600px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\r\n  <!-- Mask -->\r\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\r\n  <!-- Header container -->\r\n  <div class=\"container-fluid d-flex align-items-center\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-7 col-md-10\">\r\n        <h1 class=\"display-2 text-white\">Hello Jesse</h1>\r\n        <p class=\"text-white mt-0 mb-5\">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>\r\n        <a href=\"#!\" class=\"btn btn-info\">Edit profile</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-4 order-xl-2 mb-5 mb-xl-0\">\r\n      <div class=\"card card-profile shadow\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"col-lg-3 order-lg-2\">\r\n            <div class=\"card-profile-image\">\r\n              <a href=\"javascript:void(0)\">\r\n                <img src=\"assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n              </a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4\">\r\n          <div class=\"d-flex justify-content-between\">\r\n            <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-info mr-4\">Connect</a>\r\n            <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-default float-right\">Message</a>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body pt-0 pt-md-4\">\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <div class=\"card-profile-stats d-flex justify-content-center mt-md-5\">\r\n                <div>\r\n                  <span class=\"heading\">22</span>\r\n                  <span class=\"description\">Friends</span>\r\n                </div>\r\n                <div>\r\n                  <span class=\"heading\">10</span>\r\n                  <span class=\"description\">Photos</span>\r\n                </div>\r\n                <div>\r\n                  <span class=\"heading\">89</span>\r\n                  <span class=\"description\">Comments</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"text-center\">\r\n            <h3>\r\n              Jessica Jones<span class=\"font-weight-light\">, 27</span>\r\n            </h3>\r\n            <div class=\"h5 font-weight-300\">\r\n              <i class=\"ni location_pin mr-2\"></i>Bucharest, Romania\r\n            </div>\r\n            <div class=\"h5 mt-4\">\r\n              <i class=\"ni business_briefcase-24 mr-2\"></i>Solution Manager - Creative Tim Officer\r\n            </div>\r\n            <div>\r\n              <i class=\"ni education_hat mr-2\"></i>University of Computer Science\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>\r\n            <a href=\"javascript:void(0)\">Show more</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-8 order-xl-1\">\r\n      <div class=\"card bg-secondary shadow\">\r\n        <div class=\"card-header bg-white border-0\">\r\n          <div class=\"row align-items-center\">\r\n            <div class=\"col-8\">\r\n              <h3 class=\"mb-0\">My account</h3>\r\n            </div>\r\n            <div class=\"col-4 text-right\">\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary\">Settings</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form>\r\n            <h6 class=\"heading-small text-muted mb-4\">User information</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-username\">Username</label>\r\n                    <input type=\"text\" id=\"input-username\" class=\"form-control form-control-alternative\" placeholder=\"Username\" value=\"lucky.jesse\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-email\">Email address</label>\r\n                    <input type=\"email\" id=\"input-email\" class=\"form-control form-control-alternative\" placeholder=\"jesse@example.com\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-first-name\">First name</label>\r\n                    <input type=\"text\" id=\"input-first-name\" class=\"form-control form-control-alternative\" placeholder=\"First name\" value=\"Lucky\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-last-name\">Last name</label>\r\n                    <input type=\"text\" id=\"input-last-name\" class=\"form-control form-control-alternative\" placeholder=\"Last name\" value=\"Jesse\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <!-- Address -->\r\n            <h6 class=\"heading-small text-muted mb-4\">Contact information</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-address\">Address</label>\r\n                    <input id=\"input-address\" class=\"form-control form-control-alternative\" placeholder=\"Home Address\" value=\"Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09\" type=\"text\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-city\">City</label>\r\n                    <input type=\"text\" id=\"input-city\" class=\"form-control form-control-alternative\" placeholder=\"City\" value=\"New York\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-country\">Country</label>\r\n                    <input type=\"text\" id=\"input-country\" class=\"form-control form-control-alternative\" placeholder=\"Country\" value=\"United States\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-country\">Postal code</label>\r\n                    <input type=\"number\" id=\"input-postal-code\" class=\"form-control form-control-alternative\" placeholder=\"Postal code\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <!-- Description -->\r\n            <h6 class=\"heading-small text-muted mb-4\">About me</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"form-group\">\r\n                <label>About Me</label>\r\n                <textarea rows=\"4\" class=\"form-control form-control-alternative\" placeholder=\"A few words about you ...\">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/user-profile/user-profile.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/user-profile/user-profile.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.component.ts ***!
  \**************************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent() {
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-profile',
            template: __webpack_require__(/*! ./user-profile.component.html */ "./src/app/pages/user-profile/user-profile.component.html"),
            styles: [__webpack_require__(/*! ./user-profile.component.scss */ "./src/app/pages/user-profile/user-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "./src/app/pages/user/user.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/user/user.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"card mb-4\">\r\n    <!-- Card header -->\r\n    <div class=\"card-header\">\r\n      <h3 class=\"mb-0\">Formulario</h3>\r\n    </div>\r\n    <!-- Card body -->\r\n    <div class=\"card-body\">\r\n      <!-- Form groups used in grid -->\r\n      <form (ngSubmit)=\"onSubmit()\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-4\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"name\">Nombre</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Nombre usuario\" name=\"name\"\r\n                [(ngModel)]=\"user.name\" type=\"text\" required>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-4\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"surname\">Apellido</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"surname\" placeholder=\"Apellido\" name=\"surname\"\r\n                [(ngModel)]=\"user.surname\" type=\"text\" required>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-4\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"password\">Contraseña</label>\r\n              <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Contraseña\" name=\"password\"\r\n                [(ngModel)]=\"user.password\" type=\"password\" required (click)=\"user.password = ''\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-2\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"idrol\">Rol</label>\r\n              <select name=\"idrol\" id=\"idrol\" class=\"form-control\" [(ngModel)]=\"user.idrol\">\r\n                <option *ngFor=\"let rol of rolList\" value=\"{{rol.idrole}}\">{{rol.name}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"idnumber\">Número identificación</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"idnumber\" placeholder=\"Número identificación\" name=\"idnumber\"\r\n                [(ngModel)]=\"user.idnumber\" type=\"text\" required>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-4\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"email\">Correo electrónico</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"email\" placeholder=\"Correo electrónico\" name=\"email\"\r\n                [(ngModel)]=\"user.email\" type=\"text\" required>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-3\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-control-label\" for=\"charge\">Cargo</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"charge\" placeholder=\"Cargo\" name=\"charge\"\r\n                [(ngModel)]=\"user.charge\" type=\"text\" required>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12\">\r\n            <div class=\"text-right\">\r\n              <a class=\"btn btn-danger mt-4\" [routerLink]=\"['/users']\">Cancelar</a>\r\n              <button type=\"button\" type=\"submit\" class=\"btn btn-primary mt-4\">Guardar</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/user/user.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/user/user.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvdXNlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/user/user.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/user/user.component.ts ***!
  \**********************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserComponent = /** @class */ (function () {
    function UserComponent(router, http, route, projectService) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.route = route;
        this.projectService = projectService;
        this.rolList = [];
        this.user = {};
        this.route.params.subscribe(function (params) {
            _this.idUser = params['id'];
            _this.getUser();
        });
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    UserComponent.prototype.getUser = function () {
        var _this = this;
        this.projectService.getRoles().subscribe(function (data) {
            _this.rolList = data['roles'];
            _this.projectService.getUser(_this.idUser).subscribe(function (resp) {
                _this.user = resp['user'];
            });
        });
    };
    UserComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.user;
        console.log(data);
        this.http.post('http://localhost:8000/api/update', data).subscribe(function (data) { return _this.handleData(data); }, function (error) { return console.log(error); });
    };
    UserComponent.prototype.handleData = function (data) {
        this.router.navigateByUrl('/users');
    };
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/pages/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.scss */ "./src/app/pages/user/user.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_services_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/app/pages/users/users.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/users/users.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-5 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row justify-content-md-center\">\r\n    <div class=\"col-12\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <h3 class=\"mb-0\">Listado usuarios</h3>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-flush\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th scope=\"col\">Nombre</th>\r\n                <th scope=\"col\">Apellido</th>\r\n                <th scope=\"col\">Número de identificación</th>\r\n                <th scope=\"col\">Email</th>\r\n                <th scope=\"col\">Opciones</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <ng-container *ngFor=\"let user of usersList\">\r\n                <tr>\r\n                  <td> {{ user.name }} </td>\r\n                  <td> {{ user.surname }} </td>\r\n                  <td> {{ user.idnumber }} </td>\r\n                  <td> {{ user.email }} </td>\r\n                  <td> <a class=\"btn btn-primary btn-sm fas fa-pencil-alt\" title=\"Editar\"\r\n                      [routerLink]=\"['/users/', user.iduser, 'edit']\"> </a>\r\n                    <button class=\"btn btn-danger btn-sm far fa-trash-alt\" title=\"Eliminar\"\r\n                      (click)=\"delete(user.iduser)\"></button>\r\n                  </td>\r\n                </tr>\r\n              </ng-container>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- <div class=\"card-footer py-4\">\r\n  <nav aria-label=\"...\">\r\n    <ul class=\"pagination justify-content-end mb-0\">\r\n      <li class=\"page-item disabled\">\r\n        <a class=\"page-link\" href=\"javascript:void(0)\" tabindex=\"-1\">\r\n          <i class=\"fas fa-angle-left\"></i>\r\n          <span class=\"sr-only\">Previous</span>\r\n        </a>\r\n      </li>\r\n      <li class=\"page-item active\">\r\n        <a class=\"page-link\" href=\"javascript:void(0)\">1</a>\r\n      </li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"javascript:void(0)\">2 <span class=\"sr-only\">(current)</span></a>\r\n      </li>\r\n      <li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0)\">3</a></li>\r\n      <li class=\"page-item\">\r\n        <a class=\"page-link\" href=\"javascript:void(0)\">\r\n          <i class=\"fas fa-angle-right\"></i>\r\n          <span class=\"sr-only\">Next</span>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </nav>\r\n</div> -->"

/***/ }),

/***/ "./src/app/pages/users/users.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/users/users.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXJzL3VzZXJzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/users/users.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/users/users.component.ts ***!
  \************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/project.service */ "./src/app/services/project.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsersComponent = /** @class */ (function () {
    function UsersComponent(projectService) {
        this.projectService = projectService;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.delete = function (idUser) {
        var _this = this;
        this.projectService.deleteUser(idUser).subscribe(function (data) {
            alert('Usuario eliminado correctamente');
            _this.getUsers();
        });
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.projectService.getUsers().subscribe(function (data) {
            _this.usersList = data['users'];
        });
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/pages/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.scss */ "./src/app/pages/users/users.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-admin-layout-admin-layout-module.js.map