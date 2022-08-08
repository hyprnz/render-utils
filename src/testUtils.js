"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.renderer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var testing_1 = require("@apollo/client/testing");
var react_router_dom_1 = require("react-router-dom");
var baseWrapper = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.renderer = makeRenderer(baseWrapper);
function makeRenderer(Providers) {
    return {
        render: function (ui, options) {
            if (options === void 0) { options = {}; }
            return (0, react_1.render)(ui, __assign(__assign({}, options), { wrapper: Providers }));
        },
        withGql: makeWithGql(Providers),
        withRouter: makeWithRouter(Providers)
    };
}
function makeWithGql(ParentProviders) {
    return function withGql(mocks) {
        if (mocks === void 0) { mocks = []; }
        var Providers = function (_a) {
            var children = _a.children;
            return ((0, jsx_runtime_1.jsx)(ParentProviders, { children: (0, jsx_runtime_1.jsx)(testing_1.MockedProvider, __assign({ mocks: mocks, addTypename: false }, { children: children })) }));
        };
        return makeRenderer(Providers);
    };
}
function makeWithRouter(ParentProviders) {
    return function withRouter(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.initialEntries, initialEntries = _c === void 0 ? ["/"] : _c, _d = _b.route, route = _d === void 0 ? "/" : _d;
        var Providers = function (_a) {
            var children = _a.children;
            return ((0, jsx_runtime_1.jsx)(ParentProviders, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.MemoryRouter, __assign({ initialEntries: initialEntries, initialIndex: 0 }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: route, element: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) }) }) })) }));
        };
        return makeRenderer(Providers);
    };
}
