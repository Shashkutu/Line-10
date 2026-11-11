// node_modules/@videojs/html/dist/default/registration/safe-define.js
function e(e, t = e.tagName) {
	let n = globalThis.customElements;
	n && !n.get(t) && n.define(t, e);
}
// node_modules/@lit/context/lib/context-request-event.js
var t = class extends Event {
	constructor(e, t, n, r) {
		super("context-request", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t, this.callback = n, this.subscribe = r ?? !1;
	}
};
// node_modules/@lit/context/lib/create-context.js
function n(e) {
	return e;
}
var r = n(Symbol.for("@videojs/player")), i = n(Symbol.for("@videojs/media")), a = n(Symbol.for("@videojs/container")), o = n(Symbol.for("@videojs/extension"));
// node_modules/@videojs/utils/dist/predicate/predicate.js
function s(e) {
	return typeof e == "string";
}
function c(e) {
	return typeof e == "number";
}
function l(e) {
	return typeof e == "boolean";
}
function u(e) {
	return typeof e == "function";
}
function d(e) {
	return e === null;
}
function f(e) {
	return e === void 0;
}
function p(e) {
	return e == null;
}
function m(e) {
	return e instanceof Promise;
}
function h(e) {
	return typeof e == "object" && !!e;
}
function g(e, t) {
	return h(e) ? t.every((t) => u(e[t])) : !1;
}
function _(e) {
	if (!h(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t === Object.prototype;
}
function v(e) {
	return e instanceof Error && e.name === "AbortError";
}
// node_modules/@videojs/utils/dist/object/pick.js
function y(e, t) {
	let n = {};
	for (let r of t) Object.hasOwn(e, r) && (n[r] = e[r]);
	return n;
}
// node_modules/@videojs/utils/dist/object/shallow-equal.js
var b = Object.prototype.hasOwnProperty;
function x(e, t) {
	if (Object.is(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let n = Reflect.ownKeys(e), r = Reflect.ownKeys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!b.call(t, r) || !Object.is(e[r], t[r])) return !1;
	return !0;
}
// node_modules/@videojs/utils/dist/string/escape-html.js
function S(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/`/g, "&#96;");
}
// node_modules/@videojs/utils/dist/dom/attributes.js
function C(e, t) {
	return [...t].map((t) => ({
		name: t,
		value: e.getAttribute(t)
	}));
}
function w(e, t) {
	for (let { name: n, value: r } of t) r === null ? e.removeAttribute(n) : e.setAttribute(n, r);
}
function T(e) {
	let t = {};
	for (let n of e) t[n.name] = n.value;
	return t;
}
function E(e) {
	let t = "";
	for (let n in e) {
		let r = e[n];
		t += r === "" ? ` ${n}` : ` ${n}="${S(r)}"`;
	}
	return t;
}
// node_modules/@videojs/utils/dist/dom/listen.js
function D(e, t, n, r) {
	return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
// node_modules/@videojs/utils/dist/string/casing.js
function O(e) {
	return e.replace(/[-_](.)/g, (e, t) => t.toUpperCase()).replace(/^(.)/, (e, t) => t.toUpperCase());
}
function k(e) {
	return O(e).replace(/^(.)/, (e, t) => t.toLowerCase());
}
function A(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function j(e) {
	return e.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
// node_modules/@videojs/utils/dist/dom/text-track.js
function M(e) {
	return e.kind === "captions" || e.kind === "subtitles";
}
function N(e) {
	return Array.from(e).filter(M).sort(F);
}
function P(e, t) {
	if (!(e instanceof HTMLElement)) return null;
	for (let n of e.querySelectorAll("track")) if (n.track === t) return n;
	return null;
}
function F(e, t) {
	return e.kind > t.kind ? 1 : e.kind < t.kind ? -1 : 0;
}
// node_modules/@videojs/utils/dist/dom/webkit.js
function I() {
	return "WebKitPlaybackTargetAvailabilityEvent" in globalThis;
}
function L(e) {
	return I() && "webkitCurrentPlaybackTargetIsWireless" in e;
}
// node_modules/@videojs/media/dist/default/core/constants.js
var R = Object.freeze({
	length: 0,
	start: () => 0,
	end: () => 0
});
Object.freeze({
	length: 0,
	start: () => 0,
	end: () => 0
});
var z = Object.assign(new EventTarget(), {
	length: 0,
	*[Symbol.iterator]() {},
	getTrackById: () => null
}), B = new EventTarget(), V = class e extends Error {
	static MEDIA_ERR_ABORTED = 1;
	static MEDIA_ERR_NETWORK = 2;
	static MEDIA_ERR_DECODE = 3;
	static MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
	static MEDIA_ERR_ENCRYPTED = 5;
	static MEDIA_ERR_CUSTOM = 100;
	static defaultMessages = {
		1: "You stopped media playback before it finished.",
		2: "This media could not be loaded due to a network or server issue.",
		3: "This media could not be played. It may be corrupted, or your browser may not support its format.",
		4: "This media could not be loaded. It may be unavailable, or your browser may not support its format.",
		5: "This media could not be played because it could not be decrypted."
	};
	name;
	code;
	context;
	fatal;
	data;
	constructor(t, n = e.MEDIA_ERR_CUSTOM, r, i) {
		super(t), this.name = "MediaError", this.code = n, this.context = i, this.fatal = r ?? (n >= e.MEDIA_ERR_NETWORK && n <= e.MEDIA_ERR_ENCRYPTED), this.message ||= e.defaultMessages[this.code] ?? "";
	}
}, H = Symbol.for("@videojs/media/registered");
function U(e) {
	return e?.[H] ?? e;
}
// node_modules/@videojs/media/dist/default/core/types.js
function W(e) {
	return p(e) ? null : e.toLowerCase() === "use-credentials" ? "use-credentials" : "anonymous";
}
var G = {
	HAVE_NOTHING: 0,
	HAVE_METADATA: 1,
	HAVE_CURRENT_DATA: 2,
	HAVE_FUTURE_DATA: 3,
	HAVE_ENOUGH_DATA: 4
}, K = {
	ON_DEMAND: "on-demand",
	LIVE: "live",
	UNKNOWN: "unknown"
};
export { c as A, n as B, y as C, u as D, l as E, f as F, e as H, a as I, o as L, _ as M, m as N, p as O, s as P, i as R, x as S, v as T, t as V, D as _, U as a, E as b, z as c, P as d, N as f, j as g, A as h, H as i, h as j, d as k, R as l, k as m, K as n, V as o, M as p, W as r, B as s, G as t, L as u, T as v, g as w, C as x, w as y, r as z };
