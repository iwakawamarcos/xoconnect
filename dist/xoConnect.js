"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XoConnect = exports.TYPES = exports.METHODS = void 0;
var METHODS;
(function (METHODS) {
    METHODS["available"] = "available";
    METHODS["connect"] = "connect";
    METHODS["personalSign"] = "personalSign";
    METHODS["transactionSign"] = "transactionSign";
})(METHODS = exports.METHODS || (exports.METHODS = {}));
var TYPES;
(function (TYPES) {
    TYPES["request"] = "request";
    TYPES["response"] = "response";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
class XoConnect {
    constructor() {
        this.client = null;
    }
    static getInstance() {
        if (!XoConnect.instance) {
            XoConnect.instance = new XoConnect();
        }
        return XoConnect.instance;
    }
    isAvailable() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.sendRequest(METHODS.available);
            const resp = yield this.getResponse(METHODS.available);
            return (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.active;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendRequest(METHODS.connect);
            const resp = yield this.getResponse(METHODS.connect);
            this.client = resp === null || resp === void 0 ? void 0 : resp.data;
            return resp === null || resp === void 0 ? void 0 : resp.data;
        });
    }
    getClient() {
        return this.client;
    }
    getChains() {
        var _a;
        return (_a = this.client) === null || _a === void 0 ? void 0 : _a.chains;
    }
    personalSign(chainID, address, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { chainID, address, message };
            this.sendRequest(METHODS.personalSign, params);
            const resp = yield this.getResponse(METHODS.personalSign);
            return resp === null || resp === void 0 ? void 0 : resp.data;
        });
    }
    transactionSign(chainID, from, to, value, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { chainID, from, to, value, data };
            this.sendRequest(METHODS.transactionSign, params);
            const resp = yield this.getResponse(METHODS.transactionSign);
            return resp === null || resp === void 0 ? void 0 : resp.data;
        });
    }
    sendRequest(method, params) {
        window.postMessage(JSON.stringify({
            type: TYPES.request,
            method: method,
            params,
        }));
    }
    getResponse(method) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const messageHandler = (event) => {
                    var _a;
                    if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.length) {
                        const data = JSON.parse(event.data);
                        if (data.type === TYPES.response && data.method === method) {
                            window.removeEventListener("message", messageHandler);
                            resolve(data);
                        }
                    }
                };
                window.addEventListener("message", messageHandler, false);
            });
        });
    }
}
exports.XoConnect = XoConnect;
