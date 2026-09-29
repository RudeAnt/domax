import {
  __commonJS,
  __toESM,
  require_react
} from "./chunk-KWUQWS3S.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x2) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e2) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x2) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k2) {
            return "key" !== k2;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement2(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement2(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement2(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@maxhub/max-ui/dist/index.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var t = __toESM(require_react());
var import_react = __toESM(require_react());
function m(e2) {
  var a2, t2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var r2 = e2.length;
    for (a2 = 0; a2 < r2; a2++) e2[a2] && (t2 = m(e2[a2])) && (n2 && (n2 += " "), n2 += t2);
  } else for (t2 in e2) e2[t2] && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function h() {
  for (var e2, a2, t2 = 0, n2 = "", r2 = arguments.length; t2 < r2; t2++) (e2 = arguments[t2]) && (a2 = m(e2)) && (n2 && (n2 += " "), n2 += a2);
  return n2;
}
var y;
function v() {
  return v = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, v.apply(null, arguments);
}
var g;
var C = function(e2) {
  return t.createElement("svg", v({ xmlns: "http://www.w3.org/2000/svg", width: 12, height: 16, fill: "none" }, e2), y || (y = t.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M2.934 3.434a.8.8 0 0 1 1.132 0l4 4a.8.8 0 0 1 0 1.132l-4 4a.8.8 0 0 1-1.132-1.132L6.37 8 2.934 4.566a.8.8 0 0 1 0-1.132", clipRule: "evenodd" })));
};
function f() {
  return f = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, f.apply(null, arguments);
}
var T;
var b = function(e2) {
  return t.createElement("svg", f({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, e2), g || (g = t.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M5.566 4.434a.8.8 0 1 0-1.132 1.132L6.87 8l-2.435 2.434a.8.8 0 0 0 1.132 1.132L8 9.13l2.434 2.435a.8.8 0 0 0 1.132-1.132L9.13 8l2.435-2.434a.8.8 0 0 0-1.132-1.132L8 6.87z", clipRule: "evenodd" })));
};
function x() {
  return x = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, x.apply(null, arguments);
}
var N;
var B = function(e2) {
  return t.createElement("svg", x({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, e2), T || (T = t.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M7.242 2.115c-2.605 0-4.677 2.044-4.677 4.517s2.072 4.517 4.677 4.517 4.677-2.044 4.677-4.517-2.072-4.517-4.677-4.517M1 6.632C1 3.252 3.817.55 7.242.55s6.242 2.701 6.242 6.082a5.97 5.97 0 0 1-1.692 4.165l3 3.247a.783.783 0 1 1-1.15 1.062l-3.074-3.326a6.34 6.34 0 0 1-3.326.935C3.817 12.715 1 10.013 1 6.632", clipRule: "evenodd" })));
};
function I() {
  return I = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, I.apply(null, arguments);
}
var S;
var A;
var w = function(e2) {
  return t.createElement("svg", I({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, fill: "none" }, e2), N || (N = t.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M4.364 4.364a.9.9 0 0 1 1.272 0L10 8.727l4.364-4.363a.9.9 0 0 1 1.272 1.272L11.273 10l4.363 4.364a.9.9 0 0 1-1.272 1.272L10 11.273l-4.364 4.363a.9.9 0 0 1-1.272-1.272L8.727 10 4.364 5.636a.9.9 0 0 1 0-1.272", clipRule: "evenodd" })));
};
function z() {
  return z = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, z.apply(null, arguments);
}
var L;
var E = function(e2) {
  return t.createElement("svg", z({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, fill: "none" }, e2), S || (S = t.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "currentColor" })), A || (A = t.createElement("path", { fill: "#fff", fillRule: "evenodd", d: "M5.364 5.364a.9.9 0 0 1 1.272 0L10 8.727l3.364-3.363a.9.9 0 0 1 1.272 1.272L11.274 10l3.364 3.364a.9.9 0 1 1-1.273 1.272L10 11.273l-3.364 3.363a.9.9 0 0 1-1.272-1.272L8.727 10 5.364 6.636a.9.9 0 0 1 0-1.272", clipRule: "evenodd" })));
};
function M() {
  return M = Object.assign ? Object.assign.bind() : function(e2) {
    for (var a2 = 1; a2 < arguments.length; a2++) {
      var t2 = arguments[a2];
      for (var n2 in t2) ({}).hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
    }
    return e2;
  }, M.apply(null, arguments);
}
var k = function(e2) {
  return t.createElement("svg", M({ xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, fill: "none" }, e2), L || (L = t.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M6.268 6.268a.915.915 0 0 1 1.294 0L12 10.706l4.438-4.438a.915.915 0 1 1 1.294 1.294L13.294 12l4.438 4.438a.915.915 0 1 1-1.294 1.294L12 13.294l-4.438 4.438a.915.915 0 1 1-1.294-1.294L10.706 12 6.268 7.562a.915.915 0 0 1 0-1.294", clipRule: "evenodd" })));
};
var O = Object.defineProperty;
var j = (e2, a2) => O(e2, "name", { value: a2, configurable: true });
function P(e2, a2) {
  if ("function" == typeof e2) return e2(a2);
  null != e2 && (e2.current = a2);
}
function H(...e2) {
  return (a2) => {
    let t2 = false;
    const n2 = e2.map((e3) => {
      const n3 = P(e3, a2);
      return t2 || "function" != typeof n3 || (t2 = true), n3;
    });
    if (t2) return () => {
      for (let a3 = 0; a3 < n2.length; a3++) {
        const t3 = n2[a3];
        "function" == typeof t3 ? t3() : P(e2[a3], null);
      }
    };
  };
}
function U(...e2) {
  return t.useCallback(H(...e2), e2);
}
j(P, "setRef"), j(H, "composeRefs"), j(U, "useComposedRefs");
var $ = Object.defineProperty;
var R = (e2, a2) => $(e2, "name", { value: a2, configurable: true });
function Y(e2) {
  const a2 = t.forwardRef((a3, n2) => {
    let { children: r2, ...l2 } = a3, i2 = null, _2 = false;
    const o2 = [];
    Q(r2) && "function" == typeof te && (r2 = te(r2._payload)), t.Children.forEach(r2, (e3) => {
      var _a2;
      if (q(e3)) {
        _2 = true;
        const a4 = e3;
        let t2 = "child" in a4.props ? a4.props.child : a4.props.children;
        Q(t2) && "function" == typeof te && (t2 = te(t2._payload)), i2 = G(a4, t2), o2.push((_a2 = i2 == null ? void 0 : i2.props) == null ? void 0 : _a2.children);
      } else o2.push(e3);
    }), i2 ? i2 = t.cloneElement(i2, void 0, o2) : !_2 && 1 === t.Children.count(r2) && t.isValidElement(r2) && (i2 = r2);
    const s2 = i2 ? Z(i2) : void 0, c2 = U(n2, s2);
    if (!i2) {
      if (r2 || 0 === r2) throw new Error(_2 ? ae(e2) : ee(e2));
      return r2;
    }
    const p2 = V(l2, i2.props ?? {});
    return i2.type !== t.Fragment && (p2.ref = n2 ? c2 : s2), t.cloneElement(i2, p2);
  });
  return a2.displayName = `${e2}.Slot`, a2;
}
R(Y, "createSlot");
var D = Y("Slot");
var W = Symbol.for("radix.slottable");
function X(e2) {
  const a2 = R((e3) => "child" in e3 ? e3.children(e3.child) : e3.children, "Slottable");
  return a2.displayName = `${e2}.Slottable`, a2.__radixId = W, a2;
}
R(X, "createSlottable");
var F = X("Slottable");
var G = R((e2, a2) => {
  if ("child" in e2.props) {
    const a3 = e2.props.child;
    return t.isValidElement(a3) ? t.cloneElement(a3, void 0, e2.props.children(a3.props.children)) : null;
  }
  return t.isValidElement(a2) ? a2 : null;
}, "getSlottableElementFromSlottable");
function V(e2, a2) {
  const t2 = { ...a2 };
  for (const n2 in a2) {
    const r2 = e2[n2], l2 = a2[n2];
    /^on[A-Z]/.test(n2) ? r2 && l2 ? t2[n2] = (...e3) => {
      const a3 = l2(...e3);
      return r2(...e3), a3;
    } : r2 && (t2[n2] = r2) : "style" === n2 ? t2[n2] = { ...r2, ...l2 } : "className" === n2 && (t2[n2] = [r2, l2].filter(Boolean).join(" "));
  }
  return { ...e2, ...t2 };
}
function Z(e2) {
  var _a2, _b;
  let a2 = (_a2 = Object.getOwnPropertyDescriptor(e2.props, "ref")) == null ? void 0 : _a2.get, t2 = a2 && "isReactWarning" in a2 && a2.isReactWarning;
  return t2 ? e2.ref : (a2 = (_b = Object.getOwnPropertyDescriptor(e2, "ref")) == null ? void 0 : _b.get, t2 = a2 && "isReactWarning" in a2 && a2.isReactWarning, t2 ? e2.props.ref : e2.props.ref || e2.ref);
}
function q(e2) {
  return t.isValidElement(e2) && "function" == typeof e2.type && "__radixId" in e2.type && e2.type.__radixId === W;
}
R(V, "mergeProps"), R(Z, "getElementRef"), R(q, "isSlottable");
var J = Symbol.for("react.lazy");
function Q(e2) {
  return null != e2 && "object" == typeof e2 && "$$typeof" in e2 && e2.$$typeof === J && "_payload" in e2 && K(e2._payload);
}
function K(e2) {
  return "object" == typeof e2 && null !== e2 && "then" in e2;
}
R(Q, "isLazyComponent"), R(K, "isPromiseLike");
var ee = R((e2) => `${e2} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError");
var ae = R((e2) => `${e2} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError");
var te = t[" use ".trim().toString()];
var ne = "SvgButton__-Jm";
var re = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, asChild: r2, ...l2 } = a2;
  return (0, import_jsx_runtime.jsx)(r2 ? D : "button", { ref: t2, className: h(ne, n2), ...l2 });
});
re.displayName = "SvgButton";
var le = (0, import_react.createContext)({ size: 48 });
var ie = () => (0, import_react.useContext)(le);
var _e = {};
var oe = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, onClick: r2, ...l2 } = a2, { size: i2 } = ie(), _2 = ((e2) => e2 < 40 ? 12 : e2 < 54 ? 16 : e2 < 72 ? 20 : 24)(i2);
  return (0, import_jsx_runtime.jsx)(re, { ref: t2, className: h(_e.AvatarCloseButton, n2), onClick: (e2) => {
    e2.preventDefault(), r2 == null ? void 0 : r2(e2);
  }, ...l2, children: (0, import_jsx_runtime.jsx)(E, { width: _2, height: _2 }) });
});
oe.displayName = "AvatarCloseButton";
var se = (e2) => "string" == typeof e2 ? e2 : `${e2}px`;
var ce = (e2) => {
  const { options: a2, content: t2 } = e2, { asChild: n2, children: r2 } = a2;
  if (!n2) return "function" == typeof t2 ? t2(r2) : t2;
  const l2 = import_react.Children.only(r2);
  return (0, import_react.cloneElement)(l2, { children: "function" == typeof t2 ? t2(l2.props.children) : t2 });
};
var pe = (e2) => void 0 !== e2 && false !== e2 && null !== e2 && "" !== e2;
var de = () => !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
var ue = (...e2) => {
  const a2 = e2.filter(Boolean);
  if (a2.length <= 1) {
    return a2[0] ?? null;
  }
  return (e3) => {
    for (const t2 of a2) "function" == typeof t2 ? t2(e3) : t2 && (t2.current = e3);
  };
};
var me = () => {
};
var he = [{ maxExclusive: 40, size: "xs" }, { maxExclusive: 52, size: "s" }, { maxExclusive: 72, size: "m" }];
var ye = { AvatarContainer: "AvatarContainer__7c-", AvatarContainer_form_circle: "AvatarContainer_form_circle__J44", AvatarContainer__content: "AvatarContainer__content__h8v", AvatarContainer_form_squircle: "AvatarContainer_form_squircle__1i0", AvatarContainer__onlineStatus: "AvatarContainer__onlineStatus__cdV", AvatarContainer_onlineStatus_xs: "AvatarContainer_onlineStatus_xs__sy8", AvatarContainer_onlineStatus_s: "AvatarContainer_onlineStatus_s__YBz", AvatarContainer_onlineStatus_m: "AvatarContainer_onlineStatus_m__IU3", AvatarContainer_onlineStatus_l: "AvatarContainer_onlineStatus_l__X3w", AvatarContainer__overlay: "AvatarContainer__overlay__qul", AvatarContainer__rightBottomCorner: "AvatarContainer__rightBottomCorner__kZG", AvatarContainer__rightTopCorner: "AvatarContainer__rightTopCorner__y4y" };
var ve = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, style: l2, children: i2, overlay: _2, rightTopCorner: o2, rightBottomCorner: s2, innerClassNames: c2, size: p2 = 40, asChild: d2, form: u2 = "circle", onlineStatus: m2 = false, ...y2 } = t2, v2 = d2 ? D : "div", { normalizedSize: g2, hasOnlineStatus: C2, onlineStatusSize: f2 } = (({ size: e2, onlineStatus: a2, isCircle: t3 }) => {
    var _a2;
    const n3 = Number.isFinite(e2) ? Math.min(200, Math.max(16, e2)) : 40;
    return { normalizedSize: n3, hasOnlineStatus: a2 && t3 && n3 >= 24 && n3 <= 80, onlineStatusSize: (r3 = n3, ((_a2 = he.find(({ maxExclusive: e3 }) => r3 < e3)) == null ? void 0 : _a2.size) ?? "l") };
    var r3;
  })({ size: p2, onlineStatus: m2, isCircle: "circle" === u2 }), T2 = !m2 && g2 > 24 && pe(s2), b2 = h(ye.AvatarContainer, ye[`AvatarContainer_form_${u2}`], C2 && ye.AvatarContainer_onlineStatus, C2 && ye[`AvatarContainer_onlineStatus_${f2}`], r2);
  return (0, import_jsx_runtime.jsx)(le.Provider, { value: { size: g2 }, children: (0, import_jsx_runtime.jsxs)(v2, { ref: n2, className: b2, style: { "--MaxUi-AvatarContainer_size": `${g2}px`, ...l2 }, ...y2, children: [(0, import_jsx_runtime.jsx)(F, { children: ce({ options: { asChild: t2.asChild, children: i2 }, content: (t3) => (0, import_jsx_runtime.jsxs)("span", { className: h(ye.AvatarContainer__content, c2 == null ? void 0 : c2.content), children: [t3, pe(_2) && (0, import_jsx_runtime.jsx)("span", { className: h(ye.AvatarContainer__overlay, c2 == null ? void 0 : c2.overlay), children: _2 })] }, "subtree-container") }) }), C2 && (0, import_jsx_runtime.jsx)("span", { className: ye.AvatarContainer__onlineStatus, "aria-hidden": "true" }), T2 && (0, import_jsx_runtime.jsx)("span", { className: h(ye.AvatarContainer__rightBottomCorner, c2 == null ? void 0 : c2.rightBottomCorner), children: s2 }), pe(o2) && (0, import_jsx_runtime.jsx)("span", { className: h(ye.AvatarContainer__rightTopCorner, c2 == null ? void 0 : c2.rightTopCorner), children: o2 })] }) });
});
ve.displayName = "AvatarContainer";
var ge = "AvatarIcon__ZUI";
var Ce = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, ...r2 } = a2;
  return (0, import_jsx_runtime.jsx)("span", { ref: t2, className: h(ge, n2), ...r2 });
});
Ce.displayName = "AvatarIcon";
var fe = (e2) => {
  const { asChild: a2, children: t2, rootElement: n2, disabled: r2, loading: l2, onClick: i2 } = e2, _2 = Boolean(r2 || l2), s2 = _2 ? (e3) => {
    e3.preventDefault();
  } : i2;
  if (!a2 && "button" === n2) {
    return { disabled: _2, onClick: s2, ...l2 ? { "aria-busy": true, "aria-disabled": true } : {} };
  }
  if (a2 && (0, import_react.isValidElement)(t2)) {
    const { type: e3 } = t2;
    if ("a" === e3) {
      return { "aria-disabled": _2, onClick: s2, ...l2 ? { "aria-busy": true } : {}, ...r2 ? { tabIndex: -1 } : {} };
    }
  }
  return { role: "button", tabIndex: r2 ? -1 : 0, "aria-disabled": _2, onClick: s2, ...l2 ? { "aria-busy": true } : {} };
};
var Te = (e2) => {
  const a2 = (0, import_react.useRef)(e2);
  return (0, import_react.useEffect)(() => {
    a2.current = e2;
  }), (0, import_react.useMemo)(() => (...e3) => {
    var _a2;
    return (_a2 = a2.current) == null ? void 0 : _a2.call(a2, ...e3);
  }, []);
};
var be = (0, import_react.createContext)({ platform: "ios", colorScheme: "light" });
var xe = () => (0, import_react.useContext)(be);
var Ne = () => {
  const { colorScheme: e2 } = xe();
  return e2;
};
var Be = (e2) => {
  const { src: a2, referrerPolicy: t2 } = e2, [n2, r2] = (0, import_react.useState)("idle");
  return (0, import_react.useLayoutEffect)(() => {
    if (!a2) return void r2("error");
    let e3 = true;
    const n3 = new window.Image(), l2 = (a3) => () => {
      e3 && r2(a3);
    };
    return r2("loading"), n3.onload = l2("loaded"), n3.onerror = l2("error"), n3.src = a2, t2 && (n3.referrerPolicy = t2), () => {
      e3 = false;
    };
  }, [a2, t2]), n2;
};
var Ie = () => {
  const { platform: e2 } = xe();
  return e2;
};
var Se = (e2 = {}) => {
  const { listenChanges: a2 } = e2, [t2, n2] = (0, import_react.useState)(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), r2 = (e3) => {
    n2(() => e3.matches ? "dark" : "light");
  };
  return (0, import_react.useEffect)(() => {
    const e3 = window.matchMedia("(prefers-color-scheme: dark)");
    return n2(() => e3.matches ? "dark" : "light"), a2 ? (e3.addEventListener("change", r2), () => {
      e3.removeEventListener("change", r2);
    }) : me;
  }, [a2]), t2;
};
var Ae = { AvatarText: "AvatarText__DIj", AvatarText_gradient_red: "AvatarText_gradient_red__bnV", AvatarText_gradient_orange: "AvatarText_gradient_orange__Ngq", AvatarText_gradient_green: "AvatarText_gradient_green__n7Z", AvatarText_gradient_blue: "AvatarText_gradient_blue__gLu", AvatarText_gradient_purple: "AvatarText_gradient_purple__UsS", AvatarText__in: "AvatarText__in__cDg" };
var we = (e2) => e2 < 20 ? { fontSize: 6 } : e2 < 28 ? { fontSize: 8 } : e2 < 32 ? { fontSize: 10 } : e2 < 36 ? { fontSize: 11 } : e2 < 40 ? { fontSize: 13 } : e2 < 48 ? { fontSize: 14 } : e2 < 54 ? { fontSize: 17 } : e2 < 64 ? { fontSize: 18 } : e2 < 72 ? { fontSize: 21 } : e2 < 88 ? { fontSize: 26 } : { fontSize: 30 };
var ze = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, children: r2, gradient: l2 = "red", ...i2 } = a2, { size: _2 } = ie(), o2 = h(Ae.AvatarText, { [Ae[`AvatarText_gradient_${l2}`]]: "custom" !== l2 }, n2);
  return (0, import_jsx_runtime.jsx)("span", { ref: t2, className: o2, ...i2, children: (0, import_jsx_runtime.jsx)("span", { className: Ae.AvatarText__in, style: we(_2), children: r2 }) });
});
ze.displayName = "AvatarText";
var Le = "AvatarImage__H7-";
var Ee = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, fallback: r2, fallbackGradient: l2 = "red", ...i2 } = a2, [_2, o2] = (0, import_react.useState)("idle"), s2 = Be({ src: i2.src ?? i2.srcSet, referrerPolicy: i2.referrerPolicy }), c2 = Te((e2) => {
    o2(e2);
  });
  return (0, import_react.useLayoutEffect)(() => {
    "idle" !== s2 && c2(s2);
  }, [s2, c2]), "error" === _2 ? (0, import_jsx_runtime.jsx)(ze, { gradient: l2, children: r2 }) : (0, import_jsx_runtime.jsx)("img", { ref: t2, className: h(Le, n2), ...i2 });
});
Ee.displayName = "AvatarImage";
var Me = "AvatarOverlay__-nV";
var ke = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, onClick: r2, ...l2 } = a2;
  return (0, import_jsx_runtime.jsx)("span", { ref: t2, className: h(Me, n2), onClick: (e2) => {
    e2.preventDefault(), r2 == null ? void 0 : r2(e2);
  }, ...l2 });
});
ke.displayName = "AvatarOverlay";
var Oe = Object.assign({}, { Container: ve, Image: Ee, Overlay: ke, Icon: Ce, Text: ze, CloseButton: oe });
var je = "ClearableInput__4PN";
var Pe = "ClearableInput__button__iUo";
var He = "ClearableInput__count__K7Z";
var Ue = (e2) => void 0 === e2 || "" === e2 || Array.isArray(e2) && 0 === e2.length;
var $e = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, onChange: l2, innerClassNames: i2, withClearButton: _2 = true, disabled: o2, count: c2, ...p2 } = t2, u2 = (0, import_react.useRef)(null), m2 = void 0 !== p2.value, [y2, v2] = (0, import_react.useState)(() => Ue(p2.defaultValue)), g2 = m2 ? Ue(p2.value) : y2;
  return (0, import_jsx_runtime.jsxs)("span", { className: h(je, r2), children: [(0, import_jsx_runtime.jsx)("input", { ref: ue(u2, n2), className: h(i2 == null ? void 0 : i2.input), onChange: (e2) => {
    m2 || v2("" === e2.currentTarget.value), l2 == null ? void 0 : l2(e2);
  }, disabled: o2, ...p2 }), !g2 && !o2 && !!c2 && (0, import_jsx_runtime.jsx)("div", { className: h(He, i2 == null ? void 0 : i2.count), children: c2 }), !g2 && !o2 && _2 && (0, import_jsx_runtime.jsx)(re, { type: "button", className: h(Pe, i2 == null ? void 0 : i2.clearButton), onClick: () => {
    u2.current && ((e2) => {
      var _a2;
      const { el: a2, value: t3 } = e2, n3 = (_a2 = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) == null ? void 0 : _a2.set;
      n3 == null ? void 0 : n3.call(a2, t3);
      const r3 = new Event("input", { bubbles: true });
      a2.dispatchEvent(r3);
    })({ el: u2.current, value: "" });
  }, "aria-label": "Очистить", children: (0, import_jsx_runtime.jsx)(b, {}) })] });
});
$e.displayName = "ClearableInput";
var Re = "Container__yZR";
var Ye = "Container_fullWidth__2tY";
var De = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, asChild: r2, fullWidth: l2, ...i2 } = a2, _2 = r2 ? D : "div", o2 = h(Re, { [Ye]: l2 }, n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
De.displayName = "Container";
var We = "EllipsisText__DEC";
var Xe = "EllipsisText_multiline__y4t";
var Fe = "EllipsisText_singleLine__Arf";
var Ge = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, maxLines: r2 = 1, style: l2, asChild: i2, ..._2 } = a2, o2 = i2 ? D : "span", s2 = h(We, { [Xe]: r2 > 1, [Fe]: 1 === r2 }, n2);
  return (0, import_jsx_runtime.jsx)(o2, { ref: t2, className: s2, style: { "--MaxUi-EllipsisText_linesCount": r2, ...l2 }, ..._2 });
});
Ge.displayName = "EllipsisText";
var Ve = "Flex__pih";
var Ze = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, display: r2 = "flex", direction: l2 = "row", align: i2 = "flex-start", justify: _2 = "start", asChild: o2, wrap: s2, style: c2, gap: p2, gapX: d2, gapY: u2, ...m2 } = a2;
  return (0, import_jsx_runtime.jsx)(o2 ? D : "div", { ref: t2, className: h(Ve, n2), style: { flexDirection: l2, justifyContent: _2, alignItems: i2, flexWrap: s2, ...c2, display: r2, "--MaxUi-Flex_gapX": se(d2 ?? p2 ?? 0), "--MaxUi-Flex_gapY": se(u2 ?? p2 ?? 0) }, ...m2 });
});
Ze.displayName = "Flex";
var qe = "Grid__lFk";
var Je = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, style: r2, display: l2 = "grid", align: i2 = "start", justify: _2 = "start", gap: o2, gapX: s2, gapY: c2, cols: p2, rows: d2, asChild: u2, ...m2 } = a2;
  return (0, import_jsx_runtime.jsx)(u2 ? D : "div", { ref: t2, className: h(qe, n2), style: { justifyContent: _2, alignItems: i2, ...r2, display: l2, "--MaxUi-Grid_gapX": se(s2 ?? o2 ?? 0), "--MaxUi-Grid_gapY": se(c2 ?? o2 ?? 0), "--MaxUi-Grid_cols": p2 ?? 0, "--MaxUi-Grid_rows": d2 ?? 0 }, ...m2 });
});
Je.displayName = "Grid";
var Qe = { Panel: "Panel__XH0", Panel_centeredX: "Panel_centeredX__DG7", Panel_centeredY: "Panel_centeredY__f-k", Panel_mode_primary: "Panel_mode_primary__fNs", Panel_mode_secondary: "Panel_mode_secondary__Tez" };
var Ke = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, mode: r2 = "primary", centeredX: l2, centeredY: i2, ..._2 } = a2, o2 = h(Qe.Panel, Qe[`Panel_mode_${r2}`], { [Qe.Panel_centeredX]: l2, [Qe.Panel_centeredY]: i2 }, n2);
  return (0, import_jsx_runtime.jsx)("div", { ref: t2, className: o2, ..._2 });
});
Ke.displayName = "Panel";
var ea = "Ripple__dJ9";
var aa = "Ripple_active__uv5";
var ta = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, ...r2 } = a2, l2 = (0, import_react.useRef)(null), i2 = (0, import_react.useRef)(null), _2 = (e2) => {
    const a3 = e2.currentTarget.getBoundingClientRect();
    ((e3, a4) => {
      null !== i2.current && (i2.current.classList.remove(aa), i2.current.style.top = a4 + "px", i2.current.style.left = e3 + "px", i2.current.classList.add(aa));
    })(e2.clientX - (a3.left ?? 0), e2.clientY - (a3.top ?? 0));
  };
  return (0, import_react.useEffect)(() => {
    if (i2.current) return l2.current = i2.current.parentElement, null !== l2.current && l2.current.addEventListener("pointerdown", _2), () => {
      var _a2;
      null !== l2.current && ((_a2 = l2.current) == null ? void 0 : _a2.removeEventListener("pointerdown", _2));
    };
  }, []), (0, import_jsx_runtime.jsx)("span", { ref: ue(t2, i2), role: "presentation", "aria-hidden": true, className: h(ea, n2), onAnimationEnd: () => {
    null !== i2.current && i2.current.classList.remove(aa);
  }, ...r2 });
});
ta.displayName = "Ripple";
var na = "Tappable__O--";
var ra = "Tappable_interactive__4Uv";
var la = "Tappable_disabled__0z8";
var ia = "Tappable_activeMode_ripple__3k-";
var _a = "Tappable_activeMode_highlight__Hs-";
var oa = "Tappable__ripple__Egr";
var sa = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, disabled: l2, asChild: i2, children: _2, onClick: s2, parentChildren: c2, as: p2 = "div", ...d2 } = t2, u2 = i2 ? D : p2, m2 = Ie(), y2 = fe({ asChild: i2, children: _2, disabled: l2, onClick: s2, rootElement: p2 }), v2 = (({ onClick: e2, href: a2, children: t3, asChild: n3, parentChildren: r3 = t3 }) => n3 ? !(!n3 || !(0, import_react.isValidElement)(r3)) && ("href" in r3.props || "onClick" in r3.props) : !!e2 || !!a2)({ onClick: s2, href: d2.href, children: _2, asChild: i2, parentChildren: c2 }), g2 = "android" === m2 && v2 && !l2, C2 = h(na, { [ra]: v2, [la]: l2, [_a]: !g2, [ia]: g2 }, r2);
  return (0, import_jsx_runtime.jsxs)(u2, { ref: n2, className: C2, ...v2 ? y2 : {}, ...d2, children: [_2, g2 && (0, import_jsx_runtime.jsx)(ta, { className: oa })] });
});
sa.displayName = "Tappable";
var ca = { Spinner: "Spinner__piy", Spinner_appearance_primary: "Spinner_appearance_primary__mxz", Spinner_appearance_themed: "Spinner_appearance_themed__-9S", "Spinner_appearance_primary-static": "Spinner_appearance_primary-static__JxW", Spinner_appearance_contrast: "Spinner_appearance_contrast__Mv6", "Spinner_appearance_contrast-static": "Spinner_appearance_contrast-static__rM7", Spinner_appearance_negative: "Spinner_appearance_negative__eMf", "Spinner_appearance_neutral-themed": "Spinner_appearance_neutral-themed__D8F", androidSpinner: "androidSpinner__w-L", rotation: "rotation__CUP", iosSpinner: "iosSpinner__3q2", bar: "bar__aHj", fade: "fade__2ZD" };
var pa = ({ size: a2 }) => (0, import_jsx_runtime.jsx)("div", { className: ca.androidSpinner, style: { width: a2, height: a2 } });
var da = ({ size: a2 }) => (0, import_jsx_runtime.jsx)("div", { className: ca.iosSpinner, style: { width: a2, height: a2 }, children: Array.from({ length: 8 }, (a3, t2) => (0, import_jsx_runtime.jsx)("div", { className: ca.bar }, t2)) });
var ua = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, size: r2 = 20, appearance: l2 = "primary", ...i2 } = a2, _2 = Ie(), o2 = h(ca.Spinner, ca[`Spinner_appearance_${l2}`], n2);
  return (0, import_jsx_runtime.jsx)("span", { ref: t2, role: "status", className: o2, ...i2, children: (0, import_jsx_runtime.jsx)("ios" === _2 ? da : pa, { size: r2 }) });
});
ua.displayName = "Spinner";
var ma = { Button: "Button__0OJ", Button_loading: "Button_loading__LD-", Button__iconBefore: "Button__iconBefore__BUe", Button__content: "Button__content__vnq", Button__indicator: "Button__indicator__HuA", Button__iconAfter: "Button__iconAfter__VhZ", Button_disabled: "Button_disabled__jkY", Button_stretched: "Button_stretched__mzq", Button_activeMode_ripple: "Button_activeMode_ripple__E5Y", Button_activeMode_highlight: "Button_activeMode_highlight__K3j", Button_size_xsmall: "Button_size_xsmall__QCm", Button_size_small: "Button_size_small__LLG", Button_size_medium: "Button_size_medium__fI9", Button_size_large: "Button_size_large__S2-", Button_variant_primary: "Button_variant_primary__yLL", Button_variant_secondary: "Button_variant_secondary__DR6", Button_variant_ghost: "Button_variant_ghost__EkG", "Button_variant_primary-contrast": "Button_variant_primary-contrast__b63", "Button_variant_secondary-contrast": "Button_variant_secondary-contrast__cey", Button_variant_overlay: "Button_variant_overlay__keO", Button_variant_destructive: "Button_variant_destructive__2Ug", Button__spinnerContainer: "Button__spinnerContainer__G4I", Button__ripple: "Button__ripple__jw0" };
var ha = { Counter: "Counter__0Oj", Counter_variant_primary: "Counter_variant_primary__8Mz", "Counter_variant_primary-contrast": "Counter_variant_primary-contrast__yFz", Counter_variant_attention: "Counter_variant_attention__IWH", "Counter_variant_attention-contrast": "Counter_variant_attention-contrast__LHu", Counter_variant_promo: "Counter_variant_promo__9kD", Counter_variant_static: "Counter_variant_static__d8Y", "Counter_variant_static-contrast": "Counter_variant_static-contrast__bAq", Counter_variant_default: "Counter_variant_default__weZ", Counter_variant_mute: "Counter_variant_mute__2SU", Counter_variant_menu: "Counter_variant_menu__qf0" };
var ya = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, value: r2, rounded: l2, variant: i2 = "primary", ..._2 } = a2, o2 = h(ha.Counter, ha[`Counter_variant_${i2}`], n2), s2 = (0, import_react.useMemo)(() => l2 ? Intl.NumberFormat("en", { notation: "compact" }).format(r2) : r2, [l2, r2]);
  return (0, import_jsx_runtime.jsx)("span", { ref: t2, className: o2, ..._2, children: s2 });
});
ya.displayName = "Counter";
var va = (e2) => {
  switch (e2) {
    case "xsmall":
      return 16;
    case "small":
    case "medium":
      return 20;
    case "large":
      return 24;
  }
};
var ga = (e2) => {
  switch (e2) {
    case "primary":
    case "destructive":
    case "overlay":
      return "contrast-static";
    case "secondary":
      return "primary";
    case "ghost":
      return "themed";
    case "primary-contrast":
    case "secondary-contrast":
      return "primary-static";
  }
};
var Ca = (e2) => {
  switch (e2) {
    case "primary":
      return { variant: "primary-contrast" };
    case "secondary":
    case "ghost":
    case "primary-contrast":
    case "secondary-contrast":
      return { variant: "static" };
    case "overlay":
      return { variant: "static-contrast" };
    case "destructive":
      return { variant: "attention-contrast" };
  }
};
var fa = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, iconBefore: l2, iconAfter: i2, indicator: s2, children: c2, onClick: p2, loading: d2, disabled: u2 = false, asChild: m2 = false, innerClassNames: y2, stretched: v2 = false, size: g2 = "medium", variant: C2 = "primary", ...f2 } = t2, T2 = "button", b2 = m2 ? D : T2, x2 = Ie(), N2 = fe({ asChild: m2, children: c2, disabled: u2, loading: d2, onClick: p2, rootElement: T2 }), B2 = u2 || d2, I2 = "android" === x2, S2 = h(ma.Button, ma[`Button_variant_${C2}`], ma[`Button_size_${g2}`], { [ma.Button_loading]: d2, [ma.Button_disabled]: u2, [ma.Button_stretched]: v2, [ma.Button_activeMode_highlight]: !B2 && !I2, [ma.Button_activeMode_ripple]: !B2 && I2 }, r2);
  return (0, import_jsx_runtime.jsxs)(b2, { ref: n2, className: S2, ...N2, ...f2, children: [pe(l2) && (0, import_jsx_runtime.jsx)("span", { className: h(ma.Button__iconBefore, y2 == null ? void 0 : y2.iconBefore), children: l2 }), d2 && (0, import_jsx_runtime.jsx)("span", { className: h(ma.Button__spinnerContainer, y2 == null ? void 0 : y2.spinnerContainer), children: (0, import_jsx_runtime.jsx)(ua, { className: h(y2 == null ? void 0 : y2.spinner), size: va(g2), appearance: ga(C2) }) }), (0, import_jsx_runtime.jsx)(F, { children: ce({ options: { asChild: m2, children: c2 }, content: (a2) => (0, import_jsx_runtime.jsx)(Ge, { className: h(ma.Button__content, y2 == null ? void 0 : y2.content), children: a2 }, "subtree-container") }) }), pe(s2) && (0, import_jsx_runtime.jsx)("span", { className: h(ma.Button__indicator, y2 == null ? void 0 : y2.indicator), children: (A2 = s2, w2 = C2, (0, import_react.isValidElement)(A2) && A2.type === ya ? (0, import_react.cloneElement)(A2, { ...Ca(w2) }) : A2) }), pe(i2) && (0, import_jsx_runtime.jsx)("span", { className: h(ma.Button__iconAfter, y2 == null ? void 0 : y2.iconAfter), children: i2 }), I2 && !B2 && (0, import_jsx_runtime.jsx)(ta, { className: ma.Button__ripple })] });
  var A2, w2;
});
fa.displayName = "Button";
var Ta = { CellAction: "CellAction__vzN", CellAction_mode_primary: "CellAction_mode_primary__vZQ", CellAction_disabled: "CellAction_disabled__VZA", CellAction_mode_secondary: "CellAction_mode_secondary__AJk", CellAction_mode_themed: "CellAction_mode_themed__-Gg", CellAction_mode_destructive: "CellAction_mode_destructive__ovY", CellAction_mode_custom: "CellAction_mode_custom__3T8", CellAction_height_compact: "CellAction_height_compact__ysc", CellAction_height_normal: "CellAction_height_normal__ELj", CellAction_surface_island: "CellAction_surface_island__REC", CellAction__before: "CellAction__before__oZm", CellAction__content: "CellAction__content__Uib", CellAction__chevron: "CellAction__chevron__6SI" };
var ba = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, before: l2, children: i2, innerClassNames: _2, asChild: o2 = false, mode: s2 = "primary", surface: c2 = "default", height: p2 = "normal", showChevron: d2 = false, ...u2 } = t2, m2 = h(Ta.CellAction, Ta[`CellAction_mode_${s2}`], Ta[`CellAction_height_${p2}`], { [Ta.CellAction_surface_island]: "island" === c2, [Ta.CellAction_disabled]: u2.disabled }, r2);
  return (0, import_jsx_runtime.jsxs)(sa, { ref: n2, className: m2, asChild: o2, as: "button", parentChildren: i2, ...u2, children: [pe(l2) && (0, import_jsx_runtime.jsx)("span", { className: h(Ta.CellAction__before, _2 == null ? void 0 : _2.before), children: l2 }), (0, import_jsx_runtime.jsx)(F, { children: ce({ options: { asChild: o2, children: i2 }, content: (a2) => (0, import_jsx_runtime.jsx)("span", { className: h(Ta.CellAction__content, _2 == null ? void 0 : _2.content), children: a2 }, "subtree-container") }) }), d2 && (0, import_jsx_runtime.jsx)(C, { className: h(Ta.CellAction__chevron, _2 == null ? void 0 : _2.chevron) })] });
});
ba.displayName = "CellAction";
var xa = { CellHeader: "CellHeader__Epf", CellHeader_titleStyle_caps: "CellHeader_titleStyle_caps__nfB", CellHeader__content: "CellHeader__content__El-", CellHeader_titleStyle_normal: "CellHeader_titleStyle_normal__M-p", CellHeader_fullWidth: "CellHeader_fullWidth__h2Y", CellHeader__after: "CellHeader__after__RXN" };
var Na = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, titleStyle: l2 = "caps", fullWidth: i2 = false, children: _2, after: o2, innerClassNames: s2, ...c2 } = t2, p2 = h(xa.CellHeader, xa[`CellHeader_titleStyle_${l2}`], { [xa.CellHeader_fullWidth]: i2 }, r2);
  return (0, import_jsx_runtime.jsxs)("div", { ref: n2, className: p2, ...c2, children: [pe(_2) && (0, import_jsx_runtime.jsx)("div", { className: h(xa.CellHeader__content, s2 == null ? void 0 : s2.content), children: _2 }), pe(o2) && (0, import_jsx_runtime.jsx)("div", { className: h(xa.CellHeader__after, s2 == null ? void 0 : s2.after), children: o2 })] });
});
Na.displayName = "CellHeader";
var Ba = { CellInput: "CellInput__92-", CellInput_disabled: "CellInput_disabled__fZ7", CellInput__input: "CellInput__input__gQ3", CellInput_height_compact: "CellInput_height_compact__Mv2", CellInput_height_normal: "CellInput_height_normal__ovc", CellInput_surface_island: "CellInput_surface_island__cls", CellInput__before: "CellInput__before__Hkm", CellInput__body: "CellInput__body__Egp", CellInput__clearButton: "CellInput__clearButton__znK" };
var Ia = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, before: l2, innerClassNames: i2, disabled: _2, height: o2 = "normal", surface: s2 = "default", ...c2 } = t2, p2 = h(Ba.CellInput, Ba[`CellInput_height_${o2}`], { [Ba.CellInput_surface_island]: "island" === s2, [Ba.CellInput_disabled]: _2 }, r2);
  return (0, import_jsx_runtime.jsxs)("label", { className: p2, children: [pe(l2) && (0, import_jsx_runtime.jsx)(Ge, { className: h(Ba.CellInput__before, i2 == null ? void 0 : i2.before), maxLines: 1, children: l2 }), (0, import_jsx_runtime.jsx)($e, { ref: n2, className: h(Ba.CellInput__body, i2 == null ? void 0 : i2.body), innerClassNames: { input: h(Ba.CellInput__input, i2 == null ? void 0 : i2.input), clearButton: h(Ba.CellInput__clearButton, i2 == null ? void 0 : i2.clearButton) }, type: "text", disabled: _2, ...c2 })] });
});
Ia.displayName = "CellInput";
var Sa = { CellList: "CellList__1ou", CellList_filled: "CellList_filled__ikE", CellList__body: "CellList__body__ouS", CellList_mode_island: "CellList_mode_island__aCu" };
var Aa = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, header: l2, children: i2, mode: _2 = "full-width", filled: o2 = "island" === _2, ...s2 } = t2, c2 = h(Sa.CellList, Sa[`CellList_mode_${_2}`], { [Sa.CellList_filled]: o2 }, r2);
  return (0, import_jsx_runtime.jsxs)("div", { ref: n2, className: c2, ...s2, children: [pe(l2) && (0, import_jsx_runtime.jsx)("div", { className: Sa.CellList__header, children: l2 }), (0, import_jsx_runtime.jsx)("div", { className: Sa.CellList__body, children: i2 })] });
});
Aa.displayName = "CellList";
var wa = { CellSimple: "CellSimple__n0z", CellSimple_disabled: "CellSimple_disabled__T-3", CellSimple__title: "CellSimple__title__aYs", CellSimple__overline: "CellSimple__overline__Ncr", CellSimple__link: "CellSimple__link__ie-", CellSimple_subtitle_secondary: "CellSimple_subtitle_secondary__3uL", CellSimple__subtitle: "CellSimple__subtitle__oIF", CellSimple_subtitle_tertiary: "CellSimple_subtitle_tertiary__lz0", CellSimple_height_compact: "CellSimple_height_compact__HUQ", CellSimple_height_normal: "CellSimple_height_normal__pxj", CellSimple_surface_island: "CellSimple_surface_island__GzM", CellSimple__before: "CellSimple__before__5Q9", CellSimple__after: "CellSimple__after__2FK", CellSimple__content: "CellSimple__content__SOk", CellSimple__chevron: "CellSimple__chevron__cSs", CellSimple_separator: "CellSimple_separator__aOX" };
var za = (0, import_react.forwardRef)((t2, n2) => {
  const { link: r2, after: l2, title: i2, before: _2, subtitle: o2, children: s2, overline: c2, separator: p2, className: d2, innerClassNames: u2, as: m2 = "div", surface: y2 = "default", height: v2 = "normal", asChild: g2 = false, disabled: f2 = false, showChevron: T2 = false, subtitleMode: b2 = "secondary", ...x2 } = t2, N2 = h(wa.CellSimple, wa[`CellSimple_height_${v2}`], wa[`CellSimple_subtitle_${b2}`], { [wa.CellSimple_surface_island]: "island" === y2, [wa.CellSimple_disabled]: f2, [wa.CellSimple_separator]: p2 }, d2);
  return (0, import_jsx_runtime.jsxs)(sa, { ref: n2, className: N2, asChild: g2, as: m2, disabled: f2, parentChildren: s2, ...x2, children: [pe(_2) && (0, import_jsx_runtime.jsx)("div", { className: h(wa.CellSimple__before, u2 == null ? void 0 : u2.before), children: _2 }), (0, import_jsx_runtime.jsx)(F, { children: ce({ options: { asChild: g2, children: s2 }, content: (t3) => (0, import_jsx_runtime.jsxs)("div", { className: h(wa.CellSimple__content, u2 == null ? void 0 : u2.content), children: [pe(c2) && (0, import_jsx_runtime.jsx)("div", { className: h(wa.CellSimple__overline, u2 == null ? void 0 : u2.overline), children: c2 }), pe(i2) && (0, import_jsx_runtime.jsx)("div", { className: h(wa.CellSimple__title, u2 == null ? void 0 : u2.title), children: i2 }), pe(o2) && (0, import_jsx_runtime.jsx)("div", { className: h(wa.CellSimple__subtitle, u2 == null ? void 0 : u2.subtitle), children: o2 }), t3, r2 && (0, import_jsx_runtime.jsx)("a", { className: h(wa.CellSimple__link, u2 == null ? void 0 : u2.link), href: r2, target: "_blank", rel: "noreferrer", children: r2 })] }, "subtree-container") }) }), (pe(l2) || T2) && (0, import_jsx_runtime.jsxs)("div", { className: h(wa.CellSimple__after, u2 == null ? void 0 : u2.after), children: [l2, T2 && (0, import_jsx_runtime.jsx)(C, { className: h(wa.CellSimple__chevron, u2 == null ? void 0 : u2.chevron) })] })] });
});
za.displayName = "CellSimple";
var La = (e2) => {
  switch (e2) {
    case "xsmall":
      return 16;
    case "small":
    case "medium":
      return 20;
    case "large":
      return 24;
  }
};
var Ea = (e2) => {
  switch (e2) {
    case "primary":
    case "destructive":
    case "overlay":
      return "contrast-static";
    case "secondary":
    case "ghost":
      return "primary";
    case "primary-contrast":
    case "secondary-contrast":
      return "primary-static";
  }
};
var Ma = { IconButton: "IconButton__KCr", IconButton_loading: "IconButton_loading__RxW", IconButton__content: "IconButton__content__dCL", IconButton_disabled: "IconButton_disabled__SZj", IconButton_activeMode_ripple: "IconButton_activeMode_ripple__asi", IconButton_activeMode_highlight: "IconButton_activeMode_highlight__h15", IconButton_size_xsmall: "IconButton_size_xsmall__G5T", IconButton_size_small: "IconButton_size_small__e3f", IconButton_size_medium: "IconButton_size_medium__MQQ", IconButton_size_large: "IconButton_size_large__9oz", IconButton_variant_primary: "IconButton_variant_primary__-4n", IconButton_variant_secondary: "IconButton_variant_secondary__dFi", IconButton_variant_ghost: "IconButton_variant_ghost__jvE", "IconButton_variant_primary-contrast": "IconButton_variant_primary-contrast__O-T", "IconButton_variant_secondary-contrast": "IconButton_variant_secondary-contrast__uNH", IconButton_variant_overlay: "IconButton_variant_overlay__vJc", IconButton_variant_destructive: "IconButton_variant_destructive__9rk", IconButton__spinnerContainer: "IconButton__spinnerContainer__9--", IconButton__ripple: "IconButton__ripple__l8M" };
var ka = (0, import_react.forwardRef)((t2, n2) => {
  const { children: r2, className: l2, disabled: i2, innerClassNames: _2, loading: o2, onClick: s2, asChild: c2 = false, size: p2 = "medium", variant: d2 = "primary", ...u2 } = t2, m2 = "button", y2 = c2 ? D : m2, v2 = Ie(), g2 = fe({ asChild: c2, children: r2, disabled: i2, loading: o2, onClick: s2, rootElement: m2 }), C2 = i2 || o2, f2 = "android" === v2, T2 = h(Ma.IconButton, Ma[`IconButton_variant_${d2}`], Ma[`IconButton_size_${p2}`], { [Ma.IconButton_loading]: o2, [Ma.IconButton_disabled]: i2, [Ma.IconButton_activeMode_highlight]: !C2 && !f2, [Ma.IconButton_activeMode_ripple]: !C2 && f2 }, l2);
  return (0, import_jsx_runtime.jsxs)(y2, { ref: n2, className: T2, ...g2, ...u2, children: [o2 && (0, import_jsx_runtime.jsx)("span", { className: h(Ma.IconButton__spinnerContainer, _2 == null ? void 0 : _2.spinnerContainer), children: (0, import_jsx_runtime.jsx)(ua, { className: h(_2 == null ? void 0 : _2.spinner), size: La(p2), appearance: Ea(d2) }) }), (0, import_jsx_runtime.jsx)(F, { children: ce({ options: { asChild: c2, children: r2 }, content: (a2) => (0, import_jsx_runtime.jsx)("span", { className: h(Ma.IconButton__content, _2 == null ? void 0 : _2.content), children: a2 }, "subtree-container") }) }), f2 && !C2 && (0, import_jsx_runtime.jsx)(ta, { className: Ma.IconButton__ripple })] });
});
ka.displayName = "IconButton";
var Oa = { Input: "Input__A3w", Input_disabled: "Input_disabled__mpt", Input__iconBefore: "Input__iconBefore__gxx", Input__iconAfter: "Input__iconAfter__jL1", Input_size_medium: "Input_size_medium__EjC", Input__input: "Input__input__gy5", Input_size_large: "Input_size_large__8OF", Input_mode_default: "Input_mode_default__ncX", Input_mode_contrast: "Input_mode_contrast__EIY", Input__body: "Input__body__sVJ", Input__clearButton: "Input__clearButton__nKe", Input__count: "Input__count__zAz", Input__hint: "Input__hint__dE5", Input__hint_disabled: "Input__hint_disabled__E55" };
var ja = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, innerClassNames: l2, withClearButton: i2, iconBefore: _2, iconAfter: o2, size: s2 = "large", mode: c2 = "default", count: p2, hint: d2, ...u2 } = t2, m2 = h(Oa.Input, Oa[`Input_mode_${c2}`], Oa[`Input_size_${s2}`], { [Oa.Input_disabled]: u2.disabled }, r2);
  return (0, import_jsx_runtime.jsxs)("div", { className: h(l2 == null ? void 0 : l2.container), children: [(0, import_jsx_runtime.jsxs)("label", { className: m2, children: [pe(_2) && (0, import_jsx_runtime.jsx)("div", { className: h(Oa.Input__iconBefore, l2 == null ? void 0 : l2.iconBefore), children: _2 }), (0, import_jsx_runtime.jsx)($e, { ref: n2, className: h(Oa.Input__body, l2 == null ? void 0 : l2.body), withClearButton: i2, count: p2, innerClassNames: { input: h(Oa.Input__input, l2 == null ? void 0 : l2.input), clearButton: h(Oa.Input__clearButton, l2 == null ? void 0 : l2.clearButton), count: h(Oa.Input__count, l2 == null ? void 0 : l2.count) }, ...u2 }), pe(o2) && (0, import_jsx_runtime.jsx)("div", { className: h(Oa.Input__iconAfter, l2 == null ? void 0 : l2.iconAfter), children: o2 })] }), pe(d2) && (0, import_jsx_runtime.jsx)("div", { className: h(Oa.Input__hint, { [Oa.Input__hint_disabled]: u2.disabled }, l2 == null ? void 0 : l2.hint), children: d2 })] });
});
ja.displayName = "Input";
var Pa = { MaxUI: "MaxUI__g7Q", MaxUI_platform_ios: "MaxUI_platform_ios__gAV", MaxUI_platform_android: "MaxUI_platform_android__m3U", MaxUI_colorScheme_light: "MaxUI_colorScheme_light__Woo", MaxUI_colorScheme_dark: "MaxUI_colorScheme_dark__jFq", MaxUI_resetBody: "MaxUI_resetBody__Mwh" };
var Ha = (0, import_react.forwardRef)((a2, t2) => {
  const { children: n2, className: r2, colorScheme: l2, platform: i2 = de() ? "ios" : "android", resetBody: _2 = false } = a2, o2 = Se({ listenChanges: !l2 }), s2 = l2 ?? o2, d2 = (0, import_react.useMemo)(() => ({ colorScheme: s2, platform: i2 }), [s2, i2]);
  (0, import_react.useEffect)(() => {
    if (_2) return document.body.classList.add(Pa.MaxUI_resetBody), () => {
      document.body.classList.remove(Pa.MaxUI_resetBody);
    };
  }, [_2]);
  const u2 = h(Pa.MaxUI, Pa[`MaxUI_colorScheme_${s2}`], Pa[`MaxUI_platform_${i2}`], r2);
  return (0, import_jsx_runtime.jsx)(be.Provider, { value: d2, children: (0, import_jsx_runtime.jsx)("div", { ref: t2, className: u2, children: n2 }) });
});
Ha.displayName = "MaxUI";
var Ua = "Radio__MT3";
var $a = "Radio__input__QY4";
var Ra = "Radio__control__T5I";
var Ya = "Radio_animated__XvV";
var Da = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, ...l2 } = t2, i2 = h(Ua, Ya, r2);
  return (0, import_jsx_runtime.jsxs)("span", { className: i2, children: [(0, import_jsx_runtime.jsx)("input", { ...l2, ref: n2, type: "radio", className: $a }), (0, import_jsx_runtime.jsx)("span", { className: Ra })] });
});
Da.displayName = "Radio";
var Wa = { Switch: "Switch__-vj", Switch__toggle: "Switch__toggle__WU2", Switch__thumb: "Switch__thumb__jlX", Switch__input: "Switch__input__EDr", Switch_platform_ios: "Switch_platform_ios__B-C", Switch_platform_android: "Switch_platform_android__72T" };
var Xa = (0, import_react.forwardRef)((t2, n2) => {
  const { className: r2, ...l2 } = t2, i2 = Ie(), _2 = h(Wa.Switch, Wa[`Switch_platform_${i2}`], r2);
  return (0, import_jsx_runtime.jsxs)("span", { className: _2, children: [(0, import_jsx_runtime.jsx)("input", { ref: n2, type: "checkbox", role: "switch", className: Wa.Switch__input, ...l2 }), (0, import_jsx_runtime.jsx)("span", { className: Wa.Switch__toggle, children: (0, import_jsx_runtime.jsx)("span", { className: Wa.Switch__thumb }) })] });
});
Xa.displayName = "Switch";
var Fa = { Textarea: "Textarea__Sy6", Textarea_disabled: "Textarea_disabled__uY3", Textarea_mode_primary: "Textarea_mode_primary__E7l", Textarea_mode_secondary: "Textarea_mode_secondary__BYw", Textarea__textarea: "Textarea__textarea__Ok-" };
var Ga = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, innerClassNames: r2, mode: l2 = "primary", ...i2 } = a2, _2 = h(Fa.Textarea, Fa[`Textarea_mode_${l2}`], { [Fa.Textarea_disabled]: i2.disabled }, n2);
  return (0, import_jsx_runtime.jsx)("div", { className: _2, children: (0, import_jsx_runtime.jsx)("textarea", { ref: t2, className: h(Fa.Textarea__textarea, r2 == null ? void 0 : r2.textarea), ...i2 }) });
});
Ga.displayName = "Textarea";
var Va = { TypographyAction_variant_large: "TypographyAction_variant_large__l5j", TypographyAction_variant_medium: "TypographyAction_variant_medium__9H-", TypographyAction_variant_small: "TypographyAction_variant_small__-LL", TypographyAction_variant_xsmall: "TypographyAction_variant_xsmall__dcP" };
var Za = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "large", asChild: l2, ...i2 } = a2, _2 = l2 ? D : "span", o2 = h(Va.TypographyAction, Va[`TypographyAction_variant_${r2}`], n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
Za.displayName = "TypographyAction";
var qa = { TypographyBody_variant_large: "TypographyBody_variant_large__vlS", "TypographyBody_variant_large-strong": "TypographyBody_variant_large-strong__V9x", TypographyBody_variant_medium: "TypographyBody_variant_medium__9v3", "TypographyBody_variant_medium-strong": "TypographyBody_variant_medium-strong__bCQ", TypographyBody_variant_small: "TypographyBody_variant_small__beJ", "TypographyBody_variant_small-strong": "TypographyBody_variant_small-strong__mWy" };
var Ja = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "large-strong", asChild: l2, ...i2 } = a2, _2 = l2 ? D : "span", o2 = h(qa.TypographyBody, qa[`TypographyBody_variant_${r2}`], n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
Ja.displayName = "TypographyBody";
var Qa = "TypographyDisplay__6MW";
var Ka = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, asChild: r2, ...l2 } = a2;
  return (0, import_jsx_runtime.jsx)(r2 ? D : "span", { ref: t2, className: h(Qa, n2), ...l2 });
});
Ka.displayName = "TypographyDisplay";
var et = { "TypographyHeadline_variant_large-strong": "TypographyHeadline_variant_large-strong__mwz", TypographyHeadline_variant_medium: "TypographyHeadline_variant_medium__s92", TypographyHeadline_variant_small: "TypographyHeadline_variant_small__8Ei" };
var at = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "large-strong", asChild: l2, ...i2 } = a2, _2 = l2 ? D : "span", o2 = h(et.TypographyHeadline, et[`TypographyHeadline_variant_${r2}`], n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
at.displayName = "TypographyHeadline";
var tt = { TypographyLabel_variant_large: "TypographyLabel_variant_large__6vr", "TypographyLabel_variant_large-strong": "TypographyLabel_variant_large-strong__uCg", TypographyLabel_variant_medium: "TypographyLabel_variant_medium__Xo5", "TypographyLabel_variant_medium-strong": "TypographyLabel_variant_medium-strong__Bk8", TypographyLabel_variant_small: "TypographyLabel_variant_small__dGi", "TypographyLabel_variant_small-strong": "TypographyLabel_variant_small-strong__qCw" };
var nt = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "large", asChild: l2, ...i2 } = a2, _2 = l2 ? D : "span", o2 = h(tt.TypographyLabel, tt[`TypographyLabel_variant_${r2}`], n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
nt.displayName = "TypographyLabel";
var rt = { TypographyText_variant_hero: "TypographyText_variant_hero__78f", TypographyText_variant_header: "TypographyText_variant_header__YA-", TypographyText_variant_subheader: "TypographyText_variant_subheader__8tX", TypographyText_variant_title: "TypographyText_variant_title__3HO", TypographyText_variant_body: "TypographyText_variant_body__-U7", "TypographyText_variant_body-strong": "TypographyText_variant_body-strong__g4v", TypographyText_variant_detail: "TypographyText_variant_detail__2eL", "TypographyText_variant_detail-strong": "TypographyText_variant_detail-strong__-9M", TypographyText_variant_description: "TypographyText_variant_description__FAg", "TypographyText_variant_description-strong": "TypographyText_variant_description-strong__GYo", TypographyText_variant_label: "TypographyText_variant_label__s4i", "TypographyText_variant_label-strong": "TypographyText_variant_label-strong__hPM", TypographyText_variant_tag: "TypographyText_variant_tag__6CN", "TypographyText_variant_tag-strong": "TypographyText_variant_tag-strong__4DW", TypographyText_variant_note: "TypographyText_variant_note__QH-", "TypographyText_variant_note-strong": "TypographyText_variant_note-strong__sWX", "TypographyText_variant_action-large": "TypographyText_variant_action-large__Pa-", "TypographyText_variant_action-medium": "TypographyText_variant_action-medium__Xyt", "TypographyText_variant_action-small": "TypographyText_variant_action-small__mna", "TypographyText_variant_action-xsmall": "TypographyText_variant_action-xsmall__IX0", TypographyText_color_primary: "TypographyText_color_primary__yhI", TypographyText_color_secondary: "TypographyText_color_secondary__ycW", TypographyText_color_tertiary: "TypographyText_color_tertiary__OTn", TypographyText_color_inherit: "TypographyText_color_inherit__hh5" };
var lt = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "body", color: l2 = "inherit", asChild: i2, ..._2 } = a2, o2 = i2 ? D : "span", s2 = h(rt.TypographyText, rt[`TypographyText_variant_${r2}`], rt[`TypographyText_color_${l2}`], n2);
  return (0, import_jsx_runtime.jsx)(o2, { ref: t2, className: s2, ..._2 });
});
lt.displayName = "TypographyText";
var it = { "TypographyTitle_variant_large-strong": "TypographyTitle_variant_large-strong__9PL", TypographyTitle_variant_medium: "TypographyTitle_variant_medium__TrJ", "TypographyTitle_variant_medium-strong": "TypographyTitle_variant_medium-strong__th0", TypographyTitle_variant_small: "TypographyTitle_variant_small__zJR", "TypographyTitle_variant_small-strong": "TypographyTitle_variant_small-strong__BrE" };
var _t = (0, import_react.forwardRef)((a2, t2) => {
  const { className: n2, variant: r2 = "large-strong", asChild: l2, ...i2 } = a2, _2 = l2 ? D : "span", o2 = h(it.TypographyTitle, it[`TypographyTitle_variant_${r2}`], n2);
  return (0, import_jsx_runtime.jsx)(_2, { ref: t2, className: o2, ...i2 });
});
_t.displayName = "TypographyTitle";
var ot = Object.assign({}, { Display: Ka, Headline: at, Title: _t, Body: Ja, Label: nt, Text: lt, Action: Za });
export {
  Oe as Avatar,
  fa as Button,
  ba as CellAction,
  Na as CellHeader,
  Ia as CellInput,
  Aa as CellList,
  za as CellSimple,
  $e as ClearableInput,
  De as Container,
  ya as Counter,
  Ge as EllipsisText,
  Ze as Flex,
  Je as Grid,
  C as Icon16Chevron,
  b as Icon16CloseIos,
  B as Icon16SearchOutline,
  w as Icon20CloseAndroid,
  E as Icon20CloseFilled,
  k as Icon24CloseAndroid,
  ka as IconButton,
  ja as Input,
  Ha as MaxUI,
  be as MaxUIContext,
  Ke as Panel,
  Da as Radio,
  ta as Ripple,
  D as Slot,
  F as Slottable,
  ua as Spinner,
  re as SvgButton,
  Xa as Switch,
  sa as Tappable,
  Ga as Textarea,
  ot as Typography,
  ce as getSubtree,
  pe as hasReactNode,
  ue as mergeRefs,
  xe as useAppearance,
  fe as useButtonLikeProps,
  Te as useCallbackRef,
  Ne as useColorScheme,
  Be as useImageLoadingStatus,
  Ie as usePlatform,
  Se as useSystemColorScheme
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@maxhub_max-ui.js.map
