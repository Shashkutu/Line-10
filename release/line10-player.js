import { A as e, B as t, C as n, D as r, E as i, F as a, H as o, I as s, L as c, N as l, O as u, P as d, R as f, S as p, V as m, _ as h, a as g, c as _, d as v, f as y, h as b, i as x, j as S, k as C, l as w, m as T, n as E, o as D, p as ee, r as te, s as ne, t as re, u as ie, x as ae, y as oe, z as O } from "./types-CbTK6jiX.js";
// node_modules/@lit/context/lib/controllers/context-consumer.js
var se = class {
	constructor(e, t, n, r) {
		if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (e, t) => {
			this.unsubscribe && (this.unsubscribe !== t && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = e, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(e, t)), this.unsubscribe = t;
		}, this.host = e, t.context !== void 0) {
			let e = t;
			this.context = e.context, this.callback = e.callback, this.subscribe = e.subscribe ?? !1;
		} else this.context = t, this.callback = n, this.subscribe = r ?? !1;
		this.host.addController(this);
	}
	hostConnected() {
		this.dispatchRequest();
	}
	hostDisconnected() {
		this.unsubscribe &&= (this.unsubscribe(), void 0);
	}
	dispatchRequest() {
		this.host.dispatchEvent(new m(this.context, this.host, this.t, this.subscribe));
	}
}, ce = class {
	get value() {
		return this.o;
	}
	set value(e) {
		this.setValue(e);
	}
	setValue(e, t = !1) {
		let n = t || !Object.is(e, this.o);
		this.o = e, n && this.updateObservers();
	}
	constructor(e) {
		this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
			for (let [e, { disposer: t }] of this.subscriptions) e(this.o, t);
		}, e !== void 0 && (this.value = e);
	}
	addCallback(e, t, n) {
		if (!n) return void e(this.value);
		this.subscriptions.has(e) || this.subscriptions.set(e, {
			disposer: () => {
				this.subscriptions.delete(e);
			},
			consumerHost: t
		});
		let { disposer: r } = this.subscriptions.get(e);
		e(this.value, r);
	}
	clearCallbacks() {
		this.subscriptions.clear();
	}
}, le = class extends Event {
	constructor(e, t) {
		super("context-provider", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t;
	}
}, k = class extends ce {
	constructor(e, t, n) {
		super(t.context === void 0 ? n : t.initialValue), this.onContextRequest = (e) => {
			if (e.context !== this.context) return;
			let t = e.contextTarget ?? e.composedPath()[0];
			t !== this.host && (e.stopPropagation(), this.addCallback(e.callback, t, e.subscribe));
		}, this.onProviderRequest = (e) => {
			if (e.context !== this.context || (e.contextTarget ?? e.composedPath()[0]) === this.host) return;
			let t = /* @__PURE__ */ new Set();
			for (let [e, { consumerHost: n }] of this.subscriptions) t.has(e) || (t.add(e), n.dispatchEvent(new m(this.context, n, e, !0)));
			e.stopPropagation();
		}, this.host = e, this.context = t.context === void 0 ? t : t.context, this.attachListeners(), this.host.addController?.(this);
	}
	attachListeners() {
		this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
	}
	hostConnected() {
		this.host.dispatchEvent(new le(this.context, this.host));
	}
}, ue = /* @__PURE__ */ new WeakSet(), A = class extends se {
	hostConnected() {
		de(this.host.ownerDocument), super.hostConnected();
	}
};
function de(e) {
	if (ue.has(e)) return;
	ue.add(e);
	let t = /* @__PURE__ */ new Map();
	e.addEventListener("context-request", (e) => {
		let n = e;
		if (n.subscribe !== !0) return;
		let r = n.contextTarget ?? n.composedPath()[0], i = t.get(n.context) ?? [];
		i.some((e) => e.element.deref() === r && e.callback.deref() === n.callback) || (i.push({
			element: new WeakRef(r),
			callback: new WeakRef(n.callback)
		}), t.set(n.context, i));
	}), e.addEventListener("context-provider", (e) => {
		let { context: n } = e, r = t.get(n);
		if (r) {
			t.delete(n);
			for (let e of r) {
				let t = e.element.deref(), r = e.callback.deref();
				t?.isConnected && r && t.dispatchEvent(new m(n, t, r, !0));
			}
		}
	});
}
// node_modules/@videojs/utils/dist/object/defaults.js
function j(e, t) {
	let n = { ...t };
	for (let r of Object.keys(t)) {
		let t = e[r];
		a(t) || (n[r] = t);
	}
	return n;
}
// node_modules/@videojs/utils/dist/function/noop.js
function M(...e) {}
// node_modules/@videojs/utils/dist/function/throttle.js
function fe(e, t, n) {
	let r = n?.leading ?? !1, i = null, a, o = !1;
	function s() {
		i = setTimeout(() => {
			i = null, o && (o = !1, e(...a), s());
		}, t);
	}
	let c = (...n) => {
		if (a = n, r) i === null ? (e(...a), s()) : o = !0;
		else {
			if (i !== null) return;
			i = setTimeout(() => {
				i = null, e(...a);
			}, t);
		}
	};
	return c.cancel = () => {
		i !== null && (clearTimeout(i), i = null), o = !1;
	}, c;
}
// node_modules/@videojs/store/dist/default/html/controllers/snapshot-controller.js
var pe = class {
	#e;
	#t;
	#n;
	#r;
	#i = M;
	constructor(e, t, n) {
		this.#e = e, this.#n = t, this.#t = n, e.addController(this);
	}
	get value() {
		return this.#t ? (this.#r ??= this.#t(this.#n.current), this.#r) : this.#n.current;
	}
	track(e) {
		this.#n = e, this.#a();
	}
	hostConnected() {
		this.#a();
	}
	hostDisconnected() {
		this.#i(), this.#i = M, this.#r = void 0;
	}
	#a() {
		if (this.#i(), !this.#t) {
			this.#i = this.#n.subscribe(() => this.#e.requestUpdate());
			return;
		}
		let e = this.#t;
		this.#r = e(this.#n.current), this.#i = this.#n.subscribe(() => {
			let t = e(this.#n.current);
			p(this.#r, t) || (this.#r = t, this.#e.requestUpdate());
		});
	}
};
// node_modules/@videojs/utils/dist/events/abort.js
function me(e) {
	if ("any" in AbortSignal) return AbortSignal.any(e);
	let t = new AbortController();
	for (let n of e) {
		if (n.aborted) return t.abort(n.reason), t.signal;
		n.addEventListener("abort", () => t.abort(n.reason), { signal: t.signal });
	}
	return t.signal;
}
// node_modules/@videojs/store/dist/default/core/abort-controller-registry.js
var he = class {
	#e;
	#t = /* @__PURE__ */ new Map();
	get base() {
		return (this.#e ??= new AbortController()).signal;
	}
	clear() {
		for (let e of this.#t.values()) e.abort();
		this.#t.clear();
	}
	reset() {
		this.clear(), this.#e?.abort(), this.#e = void 0;
	}
	supersede(e) {
		this.#t.get(e)?.abort();
		let t = new AbortController();
		return this.#t.set(e, t), me([this.base, t.signal]);
	}
}, ge = class extends Error {
	code;
	cause;
	constructor(e, t) {
		super(t?.message ?? e), this.name = "StoreError", this.code = e, this.cause = t?.cause;
	}
};
function _e() {
	throw new ge("NO_TARGET");
}
function ve() {
	throw new ge("DESTROYED");
}
// node_modules/@videojs/store/dist/default/core/state.js
var ye = !1;
function be() {
	ye || (ye = !0, queueMicrotask(Se));
}
var xe = /* @__PURE__ */ new Set();
function Se() {
	ye = !1;
	for (let e of xe) e.flush();
	xe.clear();
}
var Ce = Object.prototype.hasOwnProperty, we = class {
	#e;
	#t = /* @__PURE__ */ new Set();
	#n = !1;
	constructor(e) {
		this.#e = Object.freeze({ ...e });
	}
	get current() {
		return this.#e;
	}
	patch(e) {
		let t = { ...this.#e }, n = !1;
		for (let r of Reflect.ownKeys(e)) {
			if (!Ce.call(e, r)) continue;
			let i = e[r];
			Object.is(this.#e[r], i) || (t[r] = i, n = !0);
		}
		n && (this.#e = Object.freeze(t), this.#r());
	}
	replace(e) {
		p(this.#e, e) || (this.#e = Object.freeze({ ...e }), this.#r());
	}
	subscribe(e, t) {
		let n = t?.signal;
		if (n?.aborted) return M;
		if (this.#t.add(e), !n) return () => this.#t.delete(e);
		let r = () => this.#t.delete(e);
		return n.addEventListener("abort", r, { once: !0 }), () => {
			n.removeEventListener("abort", r), this.#t.delete(e);
		};
	}
	flush() {
		if (this.#n) {
			this.#n = !1;
			for (let e of this.#t) e();
		}
	}
	#r() {
		this.#n = !0, xe.add(this), be();
	}
};
function N(e) {
	return new we(e);
}
// node_modules/@videojs/store/dist/default/core/store.js
var Te = Symbol.for("@videojs/store"), Ee = Object.prototype.hasOwnProperty;
function De() {
	return ((e, t = {}) => {
		let n = null, i = !1, a = new AbortController(), o = new he(), s = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakSet(), u, d;
		function f() {
			i && ve(), n || _e();
		}
		let p = Oe(e.state({
			target: () => (f(), n),
			signals: o,
			get: () => u,
			set: (e) => y(e)
		}));
		u = p;
		let m = g(u);
		d = N(_(u, m));
		let h = {
			[Te]: !0,
			get $state() {
				return d;
			},
			get target() {
				return n;
			},
			get destroyed() {
				return i;
			},
			get state() {
				return d.current;
			},
			attach: b,
			destroy: w,
			subscribe: T
		};
		for (let e of Object.keys(d.current)) Object.defineProperty(h, e, {
			get: () => d.current[e],
			enumerable: !0
		});
		for (let e of Object.getOwnPropertySymbols(u)) typeof u[e] == "function" && Object.defineProperty(h, e, { get: () => u[e] });
		try {
			t.onSetup?.({
				store: h,
				signal: a.signal
			});
		} catch (e) {
			E(e);
		}
		return h;
		function g(t) {
			let n = {}, r = e.derived;
			if (!r) return n;
			let i = { get: () => t };
			for (let e of Object.keys(r)) n[e] = r[e](i);
			return n;
		}
		function _(e, t) {
			let n = {};
			for (let t of Object.keys(e)) n[t] = e[t];
			Object.assign(n, t);
			for (let e of Object.keys(n)) {
				let t = n[e];
				r(t) && (n[e] = v(t));
			}
			return n;
		}
		function v(e) {
			let n = s.get(e);
			if (n) return n;
			let r = function(...n) {
				try {
					let r = e.apply(this, n);
					return t.onError && l(r) && r.catch(E), r;
				} catch (e) {
					throw t.onError && E(e), e;
				}
			};
			return s.set(e, r), r;
		}
		function y(e) {
			let t = ke(u, e);
			if (!t) return;
			let n = g(t.next);
			u = t.next, d.replace(_(u, n));
		}
		function b(r) {
			i && ve(), o.reset(), n = r;
			let a = {
				target: r,
				signal: o.base,
				get: () => u,
				set: (e) => {
					try {
						y(e);
					} catch (e) {
						E(e);
					}
				},
				reportError: E,
				store: {
					get state() {
						return d.current;
					},
					subscribe: T
				}
			};
			try {
				e.attach?.(a);
			} catch (e) {
				E(e);
			}
			try {
				t.onAttach?.({
					store: h,
					target: r,
					signal: o.base
				});
			} catch (e) {
				E(e);
			}
			return x;
		}
		function x() {
			if (C(n)) return;
			o.reset(), n = null;
			let t = { ...p };
			for (let n of e.preserve ?? []) t[n] = u[n];
			y(t);
		}
		function w() {
			i || (i = !0, x(), a.abort());
		}
		function T(e, t) {
			return d.subscribe(e, t);
		}
		function E(e) {
			if (S(e)) {
				if (c.has(e)) return;
				c.add(e);
			}
			t.onError ? t.onError({
				store: h,
				error: e
			}) : console.error("[vjs-store]", e);
		}
	});
}
function Oe(e) {
	return Object.freeze({ ...e });
}
function ke(e, t) {
	let n = { ...e }, r = !1;
	for (let i of Reflect.ownKeys(t)) {
		if (!Ee.call(t, i)) continue;
		let a = t[i];
		Object.is(e[i], a) || (n[i] = a, r = !0);
	}
	return r ? { next: Object.freeze(n) } : null;
}
function Ae(e) {
	return S(e) && Te in e;
}
// node_modules/@videojs/store/dist/default/html/store-accessor.js
var je = class {
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		this.#e = n ?? M, Ae(t) ? (this.#n = t, this.#t = null) : (this.#n = null, this.#t = new A(e, {
			context: t,
			callback: (e) => this.#e(e),
			subscribe: !1
		})), e.addController(this);
	}
	get value() {
		return this.#t ? this.#t.value ?? null : this.#n;
	}
	hostConnected() {
		this.#n && this.#e(this.#n);
	}
}, Me = class {
	#e;
	#t;
	#n;
	#r = null;
	constructor(e, t, n) {
		this.#e = e, this.#t = n, this.#n = new je(e, t, (e) => this.#i(e)), e.addController(this);
	}
	get value() {
		let e = this.#n.value;
		if (C(e)) throw Error("Store not available");
		return a(this.#t) ? e : this.#r.value;
	}
	hostConnected() {}
	#i(e) {
		a(this.#t) || (this.#r ? this.#r.track(e.$state) : this.#r = new pe(this.#e, e.$state, this.#t));
	}
}, P = class {
	#e;
	#t;
	#n;
	#r = null;
	constructor(e, t, n) {
		this.#e = e, this.#t = n, this.#n = new A(e, {
			context: t,
			callback: (e) => this.#i(e),
			subscribe: !0
		}), e.addController(this);
	}
	get value() {
		let e = this.#n.value;
		if (e) return this.#t ? this.#r?.value : e;
	}
	get displayName() {
		return this.#t?.displayName;
	}
	hostConnected() {
		let e = this.#n.value;
		e && this.#i(e);
	}
	hostDisconnected() {
		this.#r = null;
	}
	#i(e) {
		!this.#r && this.#t && (this.#r = new Me(this.#e, e, this.#t));
	}
};
function Ne(e) {
	class t extends P {
		constructor(t, n) {
			n ? super(t, e, n) : super(t, e);
		}
	}
	return t;
}
// node_modules/@videojs/utils/dist/dom/animation-frame.js
function Pe(e) {
	let t = requestAnimationFrame(e);
	return () => cancelAnimationFrame(t);
}
// node_modules/@videojs/utils/dist/dom/children.js
function Fe(e, t) {
	let n = [];
	for (let r = 0; r < e.children.length; r++) {
		let i = e.children.item(r);
		i && t(i, r) && n.push(i);
	}
	return n;
}
function Ie(e, t) {
	for (let n = 0; n < e.children.length; n++) {
		let r = e.children.item(n);
		if (r && t(r, n)) return r;
	}
	return null;
}
function Le(e) {
	if (e instanceof HTMLSlotElement) {
		let t = e.assignedElements();
		if (t.length > 0) return t;
	}
	return [...e.children];
}
function Re(e, t) {
	let n = Le(e);
	for (let [e, r] of n.entries()) {
		if (t(r, e)) return r;
		let n = Re(r, t);
		if (n) return n;
	}
	return null;
}
// node_modules/@videojs/utils/dist/dom/direction.js
function ze(e) {
	let t = e.closest("[dir]")?.getAttribute("dir")?.toLowerCase();
	return t === "rtl" || t === "ltr" ? t === "rtl" : getComputedStyle(e).direction === "rtl";
}
// node_modules/@videojs/utils/dist/dom/event.js
function Be(e) {
	let t = e.composedPath();
	return t.length > 0 ? t[0] : e.target;
}
function Ve(e, t, n) {
	return new Promise((r, i) => {
		let a = () => {
			i(n?.signal?.reason ?? "Aborted");
		};
		n?.signal?.aborted ? a() : (n?.signal?.addEventListener("abort", a, { once: !0 }), e.addEventListener(t, (e) => {
			n?.signal?.removeEventListener("abort", a), r(e);
		}, {
			...n,
			once: !0
		}));
	});
}
// node_modules/@videojs/utils/dist/dom/predicates.js
function He(e) {
	return e instanceof Node && e.nodeType === 9;
}
function Ue(e) {
	return e instanceof Node && e.nodeType === 11 && "host" in e;
}
function We(e) {
	return e instanceof HTMLImageElement;
}
// node_modules/@videojs/utils/dist/dom/walk-ancestors.js
function Ge(e, t, n = {}) {
	if (!e || typeof document > "u") return;
	let r = e;
	for (; r;) {
		let e = t(r);
		if (!a(e)) return e;
		r = n.composed ? Ke(r) : r.parentElement;
	}
}
function Ke(e) {
	if (e.assignedSlot) return e.assignedSlot;
	if (e.parentElement) return e.parentElement;
	let t = e.getRootNode();
	return Ue(t) ? t.host : null;
}
// node_modules/@videojs/utils/dist/dom/focus.js
var qe = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),audio[controls],video[controls],iframe,[contenteditable]:not([contenteditable=\"false\"]),[tabindex]:not([tabindex=\"-1\"])";
function F(e = document) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t;
}
function Je(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	return r(e), t;
	function r(e) {
		for (let t of e.children) i(t);
	}
	function i(e) {
		if (!n.has(e)) {
			if (n.add(e), e instanceof HTMLElement && Ye(e) && t.push(e), e instanceof HTMLSlotElement) {
				let t = e.assignedElements({ flatten: !0 });
				if (t.length > 0) for (let e of t) i(e);
				else r(e);
			} else e.shadowRoot ? r(e.shadowRoot) : r(e);
		}
	}
}
function Ye(e) {
	return !e.matches(qe) || e.tabIndex < 0 || e.matches(":disabled") ? !1 : !Ge(e, (e) => {
		if (e instanceof HTMLElement && (e.hidden || e.hasAttribute("inert") || e.getAttribute("aria-hidden") === "true")) return !0;
	}, { composed: !0 });
}
// node_modules/@videojs/utils/dist/dom/supports.js
function Xe() {
	return typeof CSS < "u" && CSS.supports("anchor-name: --a");
}
function Ze() {
	return typeof HTMLElement < "u" && "popover" in HTMLElement.prototype;
}
// node_modules/@videojs/utils/dist/dom/interactive.js
var Qe = "button,input,select,textarea,a[href],[role=\"button\"],[role=\"menu\"],[role=\"menuitem\"],[role=\"menuitemcheckbox\"],[role=\"menuitemradio\"],[role=\"slider\"],[data-interactive]", $e = [
	"textarea",
	"select",
	"input:not([type])",
	...[
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"number"
	].map((e) => `input[type="${e}"]`),
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function et(e) {
	return e.matches($e);
}
function tt(e) {
	let t = Be(e);
	return t instanceof Element && et(t);
}
function nt(e) {
	let t = Be(e);
	return t instanceof Element && t.closest(Qe) !== null;
}
var rt = /* @__PURE__ */ new Set([" ", "Enter"]), it = "button,a[href],[role=\"slider\"],[role=\"button\"]";
function at(e) {
	if (!rt.has(e.key)) return !1;
	let t = Be(e);
	return t instanceof Element && t.matches(it);
}
// node_modules/@videojs/utils/dist/dom/keep-alive.js
function ot(e) {
	return Ge(e, (e) => e.hasAttribute("keep-alive") ? !0 : void 0, { composed: !0 }) ?? !1;
}
// node_modules/@videojs/utils/dist/dom/style.js
function st(e) {
	return e.startsWith("--") ? e : b(e);
}
function ct(e) {
	let t = e.style.getPropertyValue("anchor-name").trim();
	return !t || t === "none" ? [] : t.split(",").map((e) => e.trim()).filter(Boolean);
}
function I(e, t) {
	for (let [n, r] of Object.entries(t)) typeof r == "string" && e.style.setProperty(st(n), r);
}
function lt(e, t) {
	return [...t].map((t) => {
		let n = st(t);
		return {
			property: n,
			value: e.style.getPropertyValue(n),
			priority: e.style.getPropertyPriority(n)
		};
	});
}
function ut(e, t) {
	for (let { property: n, value: r, priority: i } of t) r ? e.style.setProperty(n, r, i) : e.style.removeProperty(n);
}
function dt(e, t, n) {
	let r = lt(e, Object.keys(t));
	try {
		return I(e, t), n();
	} finally {
		ut(e, r);
	}
}
function ft(e, t, { source: n = "inline-or-computed" } = {}) {
	let r = st(t), i = n !== "computed" && e instanceof HTMLElement ? e.style.getPropertyValue(r) : "";
	return !i && n !== "inline" && (i = getComputedStyle(e).getPropertyValue(r)), i.trim() ? pt(e, i) : null;
}
function pt(e, t) {
	let n = t.trim();
	if (!n) return 0;
	let r = Number.parseFloat(n);
	if (!Number.isNaN(r) && (/^-?\d*\.?\d+$/.test(n) || n.endsWith("px"))) return r;
	let i = e.ownerDocument, a = i?.documentElement;
	if (!Number.isNaN(r) && n.endsWith("rem")) return r * (a && Number.parseFloat(getComputedStyle(a).fontSize) || 16);
	if (!Number.isNaN(r) && n.endsWith("em")) return r * (e instanceof HTMLElement && Number.parseFloat(getComputedStyle(e).fontSize) || 16);
	if (!i) return Number.isNaN(r) ? 0 : r;
	let o = i.createElement("div");
	if (o.style.position = "absolute", o.style.visibility = "hidden", o.style.pointerEvents = "none", o.style.inlineSize = n, !o.style.inlineSize) return 0;
	o.style.blockSize = "0", o.style.padding = "0", o.style.border = "0", o.style.inset = "0";
	let s = getComputedStyle(e);
	o.style.fontSize = s.fontSize;
	for (let e = 0; e < s.length; e++) {
		let t = s.item(e);
		t.startsWith("--") && o.style.setProperty(t, s.getPropertyValue(t));
	}
	let c = i.body ?? i.documentElement;
	if (!c) return Number.isNaN(r) ? 0 : r;
	if (c.appendChild(o), getComputedStyle(o).inlineSize === "auto") return o.remove(), 0;
	let l = o.getBoundingClientRect().width;
	return o.remove(), Number.isFinite(l) ? l : Number.isNaN(r) ? 0 : r;
}
// node_modules/@videojs/utils/dist/dom/layout.js
function mt(e, { box: t = "bounding", overflow: n = "none" } = {}) {
	let r = e.getBoundingClientRect(), i = t === "layout" && e.offsetWidth || r.width, a = t === "layout" && e.offsetHeight || r.height;
	return (n === "width" || n === "both") && (i = Math.max(i, e.scrollWidth)), (n === "height" || n === "both") && (a = Math.max(a, e.scrollHeight)), {
		width: i,
		height: a
	};
}
function ht(e, t) {
	let n = e.getBoundingClientRect();
	return n.width > 0 && n.height > 0 && t.clientX >= n.left && t.clientX < n.right && t.clientY >= n.top && t.clientY < n.bottom;
}
function gt(e, t = {}) {
	let { styles: n, ...r } = t, i = () => mt(e, r);
	return n ? dt(e, n, i) : i();
}
function _t(e) {
	let t = getComputedStyle(e);
	return {
		inlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
		inlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0,
		blockStart: Number.parseFloat(t.paddingBlockStart) || 0,
		blockEnd: Number.parseFloat(t.paddingBlockEnd) || 0
	};
}
function vt(e) {
	return e.inlineStart + e.inlineEnd;
}
function yt(e) {
	return e.blockStart + e.blockEnd;
}
function bt(e) {
	let t = getComputedStyle(e);
	return {
		x: Number.parseFloat(t.paddingLeft) || 0,
		y: Number.parseFloat(t.paddingTop) || 0
	};
}
function xt(e) {
	if (e.length === 0) return {
		width: 0,
		height: 0
	};
	let t = Math.max(...e.map(({ offsetLeft: e, size: t }) => e + t.width)), n = e[0].offsetTop;
	return {
		width: t,
		height: e.some(({ offsetTop: e }) => e !== n) ? Math.max(...e.map(({ offsetTop: e, size: t }) => e + t.height)) : e.reduce((e, { size: t }) => e + t.height, 0)
	};
}
function St(e, { children: t, includePadding: n = !1, maxWidth: r = null, measure: i = (e, t) => gt(e, t === void 0 ? void 0 : { styles: { width: `${t}px` } }), resolveSize: a = xt } = {}) {
	let o = [...t ?? Array.from(e.children).filter((e) => e instanceof HTMLElement)].filter((e) => !e.hidden), s = n ? _t(e) : {
		inlineStart: 0,
		inlineEnd: 0,
		blockStart: 0,
		blockEnd: 0
	}, c = vt(s), l = yt(s), u = n ? bt(e) : {
		x: 0,
		y: 0
	};
	if (o.length === 0) return {
		width: c,
		height: l
	};
	let d = (e) => o.map((t) => ({
		element: t,
		size: i(t, e),
		offsetLeft: t.offsetLeft - u.x,
		offsetTop: t.offsetTop - u.y
	})), f = d(), p = a(f).width + c, m = r === null ? p : Math.min(p, Math.max(0, r));
	return m < p && (f = d(Math.max(0, m - c))), {
		width: m,
		height: a(f).height + l
	};
}
// node_modules/@videojs/utils/dist/i18n.js
function Ct(e) {
	let t = Array.isArray(e) ? e[0] : e;
	return !t || t === "en" || t.startsWith("en-");
}
// node_modules/@videojs/utils/dist/dom/observe-elements.js
function wt(e, t) {
	if (typeof ResizeObserver > "u") return M;
	let n = new ResizeObserver(t), r = Symbol.iterator in Object(e) ? e : [e];
	for (let e of r) n.observe(e);
	return () => n.disconnect();
}
function Tt({ getElements: e, onChange: t, root: n, mutations: r }) {
	let i = M, a = () => {
		i(), i = wt(e(), t);
	};
	a();
	let o = null;
	return n && r !== !1 && typeof MutationObserver < "u" && (o = new MutationObserver(() => {
		a(), t();
	}), o.observe(n, r ?? { childList: !0 })), () => {
		o?.disconnect(), i();
	};
}
// node_modules/@videojs/utils/dist/dom/platform.js
function Et() {
	return typeof navigator < "u" && /mac/i.test(navigator.userAgent);
}
// node_modules/@videojs/utils/dist/dom/popover.js
var Dt = {
	sideOffset: 0,
	boundaryOffset: 0
}, Ot = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function kt(e, t, n, r) {
	let i = r.boundaryOffset ?? 0;
	switch (n) {
		case "top": return e.top - t.top - i - r.sideOffset;
		case "bottom": return t.bottom - e.bottom - i - r.sideOffset;
		case "left": return e.left - t.left - i - r.sideOffset;
		case "right": return t.right - e.right - i - r.sideOffset;
	}
}
function At(e, t, n, r, i = Dt) {
	let a = r.side, o = Ot[a], s = a === "top" || a === "bottom" ? t.height : t.width, c = kt(e, n, a, i);
	return c >= s ? a : kt(e, n, o, i) > c ? o : a;
}
function jt(e) {
	try {
		e?.showPopover?.();
	} catch {}
}
function Mt(e) {
	try {
		e?.hidePopover?.();
	} catch {}
}
function Nt(e) {
	e instanceof Element && e.shadowRoot && Nt(e.shadowRoot);
	for (let t of e.querySelectorAll("*")) Pt(t) && Mt(t), t.shadowRoot && Nt(t.shadowRoot);
}
function Pt(e) {
	try {
		return e.matches(":popover-open");
	} catch {
		return !1;
	}
}
// node_modules/@videojs/utils/dist/dom/raf-throttle.js
function Ft(e) {
	let t = null, n, r = (...r) => {
		n = r, t === null && (t = requestAnimationFrame(() => {
			t = null, e(...n);
		}));
	};
	return r.cancel = () => {
		t !== null && (cancelAnimationFrame(t), t = null);
	}, r;
}
// node_modules/@videojs/utils/dist/dom/template.js
function It(e) {
	for (let t of e.children) if (t.localName === "template" && "content" in t) return t;
	return null;
}
function Lt(e) {
	let t = e.content.firstElementChild;
	return t && !t.nextElementSibling ? t : null;
}
function Rt(e, t = e.ownerDocument) {
	return t.importNode(e, !0);
}
// node_modules/@videojs/utils/dist/dom/time-ranges.js
function zt(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push([e.start(n), e.end(n)]);
	return t;
}
// node_modules/@videojs/utils/dist/dom/tree.js
function Bt(e, t) {
	let n = t;
	for (; n;) {
		if (n === e || e.contains(n)) return !0;
		let t = n.getRootNode();
		n = n.assignedSlot ?? n.parentElement ?? (Ue(t) ? t.host : null);
	}
	return !1;
}
// node_modules/@videojs/element/dist/default/destroy-mixin.js
var Vt = /* @__PURE__ */ new WeakSet();
function Ht(e) {
	e.shadowRoot && Ut(e.shadowRoot), Ut(e);
}
function Ut(e) {
	for (let t of Array.from(e.children)) Vt.has(t) ? t.destroy() : Ht(t);
}
function Wt(e) {
	class t extends e {
		#e = !1;
		#t = /* @__PURE__ */ new Set();
		constructor(...e) {
			super(...e), Vt.add(this);
		}
		get destroyed() {
			return this.#e;
		}
		destroy() {
			this.#e || (this.#e = !0, Ht(this), this.destroyCallback());
		}
		destroyCallback() {
			for (let e of this.#t) e.hostDestroyed?.();
		}
		addController(e) {
			super.addController(e), this.#t.add(e);
		}
		removeController(e) {
			super.removeController(e), this.#t.delete(e);
		}
		connectedCallback() {
			this.#e || super.connectedCallback();
		}
		disconnectedCallback() {
			super.disconnectedCallback(), !this.#e && !ot(this) && requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					this.isConnected || this.destroy();
				});
			});
		}
		performUpdate() {
			this.#e || super.performUpdate();
		}
	}
	return t;
}
// node_modules/@videojs/element/dist/default/reactive-element.js
var Gt = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new Map(), qt = globalThis.HTMLElement ?? class {}, Jt = class extends qt {
	static {
		this.properties = {};
	}
	static get observedAttributes() {
		return [...Yt(this).attrToProp.keys()];
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor() {
		super(), this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#r = !1, this.isUpdatePending = !1, this.hasUpdated = !1, this.#i = new Promise((e) => this.enableUpdating = e);
		let { props: e } = Yt(this.constructor);
		for (let t of e.keys()) Object.hasOwn(this, t) && ((this.#n ??= /* @__PURE__ */ new Map()).set(t, this[t]), delete this[t]);
		this.requestUpdate();
	}
	enableUpdating(e) {}
	addController(e) {
		this.#e.add(e), this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this.#e.delete(e);
	}
	connectedCallback() {
		this.#o(), this.enableUpdating(!0);
		for (let e of this.#e) e.hostConnected?.();
	}
	disconnectedCallback() {
		for (let e of this.#e) e.hostDisconnected?.();
	}
	attributeChangedCallback(e, t, n) {
		if (t === n) return;
		let { props: r, attrToProp: i } = Yt(this.constructor), a = i.get(e);
		if (!a) return;
		let o = r.get(a);
		if (!o) return;
		let s = n;
		o.type === Boolean ? s = n !== null : o.type === Number && (s = n === null ? null : Number(n)), this[a] = s;
	}
	requestUpdate(e, t) {
		e !== void 0 && !this.#t.has(e) && this.#t.set(e, t), this.isUpdatePending || (this.#i = this.#a());
	}
	async #a() {
		this.isUpdatePending = !0;
		try {
			await this.#i;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		let e = this.#t;
		this.willUpdate(e);
		for (let e of this.#e) e.hostUpdate?.();
		this.update(e), this.#t = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		for (let e of this.#e) e.hostUpdated?.();
		this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	willUpdate(e) {}
	update(e) {}
	firstUpdated(e) {}
	updated(e) {}
	get updateComplete() {
		return this.#i;
	}
	#o() {
		if (this.#r) return;
		this.#r = !0;
		let { props: e } = Yt(this.constructor);
		for (let t of e.keys()) {
			let e = this.#n?.has(t) ?? !1, n = Object.hasOwn(this, t);
			if (!e && !n) continue;
			let r = e ? this.#n?.get(t) : Reflect.get(this, t);
			n && Reflect.deleteProperty(this, t), Reflect.set(this, t, r);
		}
		this.#n = void 0;
	}
};
function Yt(e) {
	let t = Gt.get(e);
	if (t) return t;
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let [t, i] of Object.entries(e.properties)) if (n.set(t, i), r.set(i.attribute ?? t, t), !Object.getOwnPropertyDescriptor(e.prototype, t)?.get) {
		let n = Kt.get(t);
		n || (n = Symbol(t), Kt.set(t, n)), Object.defineProperty(e.prototype, t, {
			get() {
				return this[n];
			},
			set(e) {
				let r = this[n];
				this[n] = e, Object.is(r, e) || this.requestUpdate(t, r);
			},
			configurable: !0,
			enumerable: !0
		});
	}
	let i = {
		props: n,
		attrToProp: r
	};
	return Gt.set(e, i), i;
}
// node_modules/@videojs/html/dist/default/ui/ui-element.js
var L = class extends Wt(Jt) {};
// node_modules/@videojs/media/dist/default/core/predicate.js
function Xt(e) {
	return e.readyState >= re.HAVE_METADATA;
}
function Zt(e) {
	if (Number.isFinite(e.duration) && e.duration > 0) return e.duration;
	let t = e.seekable.at(-1)?.[1];
	return t === void 0 || !Number.isFinite(t) || t <= 0 ? 0 : t;
}
function Qt(e) {
	return Zt(e) > 0;
}
function $t(e) {
	return !!e && !e.paused && !e.ended && !e.waiting;
}
function en(e) {
	return S(e) && i(e.autoplay);
}
function tn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.paused) && !a(t.ended) && r(t.pause);
}
function nn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.currentTime) && !a(t.duration) && !a(t.seeking);
}
function rn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.src) && !a(t.currentSrc) && !a(t.readyState) && r(t.load);
}
function an(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.volume) && !a(t.muted);
}
function on(e) {
	return S(e) ? !a(e.muted) : !1;
}
function sn(e) {
	return S(e) ? !a(e.playbackRate) : !1;
}
function cn(e) {
	return S(e) ? r(e.requestPictureInPicture) : !1;
}
function ln(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.buffered) && t.buffered !== w && !a(t.seekable) && t.seekable !== w;
}
function un(e) {
	return S(e) ? !a(e.error) : !1;
}
function dn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.textTracks) && t.textTracks !== _;
}
function fn(e) {
	return S(e) ? !a(e.videoRenditions) : !1;
}
function pn(e) {
	return S(e) ? !a(e.audioTracks) : !1;
}
function mn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.videoWidth) && !a(t.videoHeight);
}
function hn(e) {
	if (!S(e)) return !1;
	let t = e;
	return S(t.remote) && t.remote !== ne;
}
function gn(e) {
	return S(e) ? !a(e.streamType) : !1;
}
function _n(e) {
	return S(e) ? !a(e.contentData) : !1;
}
function vn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.liveEdgeStart) && !a(t.targetLiveWindow);
}
function yn(e) {
	return S(e) && "querySelectorAll" in e && r(e.querySelectorAll);
}
// node_modules/@videojs/core/dist/default/dom/extensions/media.js
function bn(e, t) {
	return new Proxy(e, {
		get(e, n) {
			if (n === x) return e;
			let i = xn(t, n) ?? e, a = i[n];
			return r(a) && n !== "constructor" ? a.bind(i) : a;
		},
		set(e, n, r) {
			let i = xn(t, n) ?? e;
			return Reflect.set(i, n, r);
		},
		has(e, n) {
			return !u(xn(t, n)) || n in e;
		}
	});
}
function xn(e, t) {
	if (Object.hasOwn(Object.prototype, t)) return null;
	for (let { mediaOverride: n } of e()) if (!u(n) && !a(n[t])) return n;
	return null;
}
// node_modules/@videojs/core/dist/default/dom/extensions/coordinator.js
function Sn(e) {
	return !!e && "mediaOverride" in e;
}
var Cn = class {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new WeakMap();
	#n = { initTime: Date.now() };
	#r;
	#i = null;
	constructor(e) {
		this.#r = e;
	}
	get size() {
		return this.#e.size;
	}
	get(e) {
		return this.#e.get(e);
	}
	register(e) {
		let t = e.constructor, n = this.#e.get(t);
		return n !== e && (n && this.#s(n), this.#e.set(t, e), e.connect?.(this.#n), this.#i && e.attach?.(this.#i), (Sn(n) || Sn(e)) && this.#r()), () => this.#o(e);
	}
	attach(e) {
		if (this.#i?.media === e.media) this.#i = e;
		else {
			this.detach(), this.#i = e;
			for (let t of this.#e.values()) t.attach?.(e);
		}
	}
	detach() {
		if (this.#i) {
			for (let e of this.#e.values()) e.detach?.();
			this.#i = null;
		}
	}
	destroy() {
		this.detach();
		for (let e of this.#e.values()) e.disconnect?.();
		this.#e.clear();
	}
	getStoreMedia(e) {
		if (!this.#a()) return e;
		let t = this.#t.get(e);
		return t || (t = bn(e, () => this.#e.values()), this.#t.set(e, t)), t;
	}
	#a() {
		for (let e of this.#e.values()) if (Sn(e)) return !0;
		return !1;
	}
	#o(e) {
		let t = e.constructor;
		this.#e.get(t) === e && (this.#e.delete(t), this.#s(e), Sn(e) && this.#r());
	}
	#s(e) {
		this.#i && e.detach?.(), e.disconnect?.();
	}
};
// node_modules/@videojs/core/dist/default/dom/feature.js
function R(e) {
	let t = Object.values(e.config ?? {}).map((e) => e.state);
	return {
		...e,
		...t.length > 0 ? { preserve: t } : {}
	};
}
function wn(e) {
	let t = e.map((e) => e.config ?? {});
	return Object.assign({}, ...t);
}
function Tn(e, t, n) {
	let r = e[t.action];
	if (typeof r != "function") throw TypeError(`Missing config action "${String(t.action)}"`);
	r(n);
}
// node_modules/@videojs/core/dist/default/dom/media-action-value.js
function En(e, t, n) {
	if (!a(n)) return n;
	let r = t?.toLowerCase();
	if (e === "seekStep") return r === "arrowleft" || r === "j" ? -10 : 10;
	if (e === "volumeStep") return r === "arrowdown" ? -.05 : 5 / 100;
}
// node_modules/@videojs/core/dist/default/dom/gesture/action-value.js
function Dn(e, t, n) {
	return e === "seekStep" && a(n) && t === "left" ? -10 : En(e, void 0, n);
}
// node_modules/@videojs/core/dist/default/dom/store/features/audio-track.js
function On(e, t) {
	return e.id || String(t);
}
function kn(e, t) {
	return {
		id: On(e, t),
		...e.kind !== void 0 && { kind: e.kind },
		label: e.label,
		language: e.language,
		enabled: e.enabled
	};
}
var An = R({
	name: "audioTrack",
	state: ({ target: e }) => ({
		audioTrackList: [],
		selectAudioTrack(t) {
			let { media: n } = e();
			if (!pn(n)) return;
			let r = [...n.audioTracks], i = r.find((e, n) => On(e, n) === t);
			if (i) for (let e of r) e.enabled = e === i;
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = null, a = null, o = () => pn(r) ? r.audioTracks : null, s = (e = o()) => {
			n({ audioTrackList: e ? [...e].map(kn) : [] });
		}, c = () => {
			let e = o();
			e === i ? s(e) : (a?.abort(), a = new AbortController(), i = e, i && (h(i, "addtrack", () => s(i), { signal: a.signal }), h(i, "removetrack", () => s(i), { signal: a.signal }), h(i, "change", () => s(i), { signal: a.signal })), s(i));
		};
		c(), h(r, "loadstart", c, { signal: t }), t.addEventListener("abort", () => a?.abort(), { once: !0 });
	}
}), jn = R({
	name: "buffer",
	state: () => ({
		buffered: [],
		seekable: []
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!ln(r)) return;
		let i = () => n({
			buffered: zt(r.buffered),
			seekable: zt(r.seekable)
		});
		i(), h(r, "loadedmetadata", i, { signal: t }), h(r, "durationchange", i, { signal: t }), h(r, "progress", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), Mn = /* @__PURE__ */ new WeakMap();
function Nn(e) {
	Mn.set(e, (Mn.get(e) ?? 0) + 1);
	let t = !1;
	return () => {
		if (t) return;
		t = !0;
		let n = Mn.get(e) ?? 0;
		n <= 1 ? Mn.delete(e) : Mn.set(e, n - 1);
	};
}
function Pn(e) {
	return (Mn.get(e) ?? 0) > 0;
}
// node_modules/@videojs/core/dist/default/dom/gesture/region.js
function Fn(e, t, n) {
	let r = e - t.left, i = t.width;
	if (i === 0) return null;
	let a = r / i;
	return n.size === 2 && n.has("left") && n.has("right") ? a < .5 ? "left" : "right" : n.size === 3 ? a < 1 / 3 ? "left" : a < 2 / 3 ? "center" : "right" : n.has("left") && a < .5 ? "left" : n.has("right") && a >= .5 ? "right" : n.has("center") && (n.size === 1 || a >= 1 / 3 && a < 2 / 3) ? "center" : null;
}
// node_modules/@videojs/core/dist/default/dom/gesture/coordinator.js
var In = 250, Ln = class {
	#e;
	#t = [];
	#n = /* @__PURE__ */ new Set();
	#r = null;
	#i = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#e = e;
	}
	get bindings() {
		return this.#t;
	}
	subscribe(e) {
		return this.#i.add(e), () => this.#i.delete(e);
	}
	claimsTap(e, t) {
		return Pn(this.#e) ? !0 : !nt(e) && this.#t.some((n) => n.type === "tap" && n.action === t && (!n.pointer || n.pointer === e.pointerType));
	}
	add(e) {
		let t = Dn(e.action ?? "", e.region, e.value), n = {
			...e,
			value: t,
			onActivate: (n) => {
				if (this.#i.size > 0) {
					let r = {
						type: e.type,
						source: "gesture",
						action: e.action,
						value: t,
						region: e.region,
						pointer: e.pointer,
						event: n
					};
					for (let e of this.#i) try {
						e(r);
					} catch {}
				}
				e.onActivate(n);
			}
		};
		this.#t.push(n), this.#n.add(n.recognizer), this.#a();
		let r = !1;
		return () => {
			if (r) return;
			r = !0;
			let e = this.#t.indexOf(n);
			e !== -1 && this.#t.splice(e, 1), this.#o();
		};
	}
	#a() {
		if (this.#r) return;
		this.#r = new AbortController();
		let { signal: e } = this.#r, t = 0;
		h(this.#e, "pointerdown", (e) => {
			if (Pn(this.#e)) t = 0;
			else if (e.button === 0) {
				t = Date.now();
				for (let e of this.#t) e.onPointerDown?.();
			}
		}, { signal: e }), h(this.#e, "pointerup", (e) => {
			if (Pn(this.#e)) {
				t = 0;
				return;
			}
			if (e.button !== 0 || Date.now() - t > In || nt(e)) return;
			let n = e.pointerType, r = e.clientX, i = this.#e, a = this.#t, o = { resolve: (e) => Vn(a, e, n, r, i) };
			for (let t of this.#n) t.handleUp(o, e);
		}, { signal: e });
	}
	#o() {
		if (!(this.#t.length > 0)) {
			for (let e of this.#n) e.reset();
			this.#n.clear(), this.#r?.abort(), this.#r = null;
		}
	}
}, Rn = /* @__PURE__ */ new WeakMap();
function zn(e) {
	return Rn.get(e);
}
function Bn(e) {
	let t = Rn.get(e);
	return t || (t = new Ln(e), Rn.set(e, t)), t;
}
function Vn(e, t, n, r, i) {
	let a = i.getBoundingClientRect(), o = Hn(e, t, n), s = o.size > 0 ? Fn(r, a, o) : null, c = [];
	for (let r of e) if (!r.disabled && r.type === t && !(r.pointer && r.pointer !== n)) {
		if (r.region) {
			if (r.region !== s) continue;
		} else if (s !== null) continue;
		c.push(r);
	}
	return c;
}
function Hn(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let i of e) i.disabled || i.type === t && (i.pointer && i.pointer !== n || i.region && r.add(i.region));
	return r;
}
// node_modules/@videojs/core/dist/default/dom/presentation/remote-playback.js
function Un(e) {
	let t = e;
	if (S(t.remote) && "state" in t.remote && "prompt" in t.remote) return t.remote;
}
function Wn(e) {
	return Un(e)?.state === "connected";
}
function Gn(e) {
	return Un(e)?.state === "connecting";
}
async function Kn(e) {
	let t = Un(e);
	if (!t) throw new DOMException("Remote playback not supported", "NotSupportedError");
	return t.prompt();
}
// node_modules/@videojs/core/dist/default/dom/store/features/controls.js
var qn = 2e3, Jn = 250, Yn = 500, Xn = 100, Zn = /* @__PURE__ */ new WeakMap(), Qn = R({
	name: "controls",
	state: ({ get: e, set: t }) => {
		let n = $n(() => (t({ controlsVisible: !0 }), () => {}), (n) => {
			let r = n ?? !e().userActive;
			return t({
				userActive: r,
				controlsVisible: r
			}), r;
		});
		return Zn.set(n.requestControlsLock, n), {
			userActive: !0,
			controlsVisible: !0,
			requestControlsLock: n.requestControlsLock,
			toggleControls: n.toggleControls
		};
	},
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i, container: a } = e;
		if (!tn(i) || C(a)) return;
		let o, s = 0, c = (e) => s > 0 || e || i.paused || Wn(i) || Gn(i);
		function l() {
			clearTimeout(o), o = void 0;
		}
		function u() {
			l(), s > 0 || (o = setTimeout(f, qn));
		}
		function d() {
			n().userActive || r({
				userActive: !0,
				controlsVisible: !0
			}), u();
		}
		function f() {
			l(), r({
				userActive: !1,
				controlsVisible: c(!1)
			});
		}
		function p() {
			s++, l(), n().controlsVisible || r({ controlsVisible: !0 });
			let e = !1;
			return () => {
				e || t.aborted || (e = !0, s--, s === 0 && d());
			};
		}
		function m(e) {
			return e ?? !n().controlsVisible ? d() : f(), n().controlsVisible;
		}
		let _ = Zn.get(n().requestControlsLock);
		_.setDelegates(p, m);
		let v = 0, y = 0, b = () => y > 0 && Date.now() - y < Yn, x = 0, S = () => x > 0 && Date.now() - x < Xn;
		function w(e) {
			v = Date.now(), e.pointerType === "touch" && (y = v);
		}
		function T(e) {
			if (e.pointerType === "touch" && (y = Date.now()), e.pointerType === "touch" && Date.now() - v < Jn) {
				if (zn(a)?.claimsTap(e, "toggleControls")) return;
				let t = [g(i), a].includes(e.target);
				n().controlsVisible && t ? f() : d();
			} else d();
		}
		let E = () => {
			let { userActive: e } = n();
			r({ controlsVisible: c(e) }), !i.paused && e && u();
		};
		function D(e) {
			e.pointerType === "touch" ? n().userActive && u() : d();
		}
		if (h(a, "pointermove", D, { signal: t }), h(a, "pointerdown", w, { signal: t }), h(a, "pointerup", T, { signal: t }), h(a, "lostpointercapture", () => {
			x = Date.now();
		}, { signal: t }), h(a, "keydown", d, { signal: t }), h(a, "keyup", d, { signal: t }), h(a, "focusin", () => {
			b() || d();
		}, { signal: t }), h(a, "mouseleave", (e) => {
			b() || S() && e instanceof MouseEvent && ht(a, e) || f();
		}, { signal: t }), h(i, "play", E, { signal: t }), h(i, "pause", E, { signal: t }), h(i, "ended", E, { signal: t }), hn(i)) {
			let e = () => {
				let { userActive: e } = n();
				r({ controlsVisible: c(e) });
			};
			h(i.remote, "connect", e, { signal: t }), h(i.remote, "connecting", e, { signal: t }), h(i.remote, "disconnect", e, { signal: t });
		}
		t.addEventListener("abort", () => {
			_.reset(), s = 0, l();
		}, { once: !0 }), u();
	}
});
function $n(e, t) {
	let n = e, r = t, i = /* @__PURE__ */ new Set(), a = {
		requestControlsLock: () => {
			let e = { release: n() }, t = !1;
			return i.add(e), () => {
				t || (t = !0, i.delete(e), e.release());
			};
		},
		toggleControls: (e) => r(e),
		setDelegates(e, t) {
			if (e !== n) {
				n = e;
				for (let t of i) t.release(), t.release = e();
			}
			r = t;
		},
		reset() {
			a.setDelegates(e, t);
		}
	};
	return a;
}
// node_modules/@videojs/core/dist/default/dom/store/features/error.js
var er = R({
	name: "error",
	state: ({ set: e }) => ({
		error: null,
		dismissError() {
			e({ error: null });
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		un(r) && (h(r, "error", () => n({ error: r.error }), { signal: t }), h(r, "emptied", () => n({ error: null }), { signal: t }));
	}
});
// node_modules/@videojs/core/dist/default/dom/presentation/fullscreen.js
function tr() {
	let e = document;
	if (e.fullscreenEnabled || e.webkitFullscreenEnabled) return !0;
	let t = document.createElement("video");
	return r(t.webkitSetPresentationMode);
}
function nr() {
	let e = document;
	return e.fullscreenElement ?? e.webkitFullscreenElement ?? null;
}
function rr(e) {
	if (!(e instanceof Element)) return !1;
	try {
		return e.matches(":fullscreen");
	} catch {
		return !1;
	}
}
function ir(e, t) {
	if (t.webkitPresentationMode === "fullscreen") return !0;
	let n = nr();
	return n && (n === e || n === g(t)) || rr(e) || rr(t) ? !0 : t.isFullscreen ?? !1;
}
async function ar(e, t) {
	let n = document;
	if (e && (n.fullscreenEnabled || n.webkitFullscreenEnabled)) {
		let t = e;
		if (Nt(e), r(t.requestFullscreen)) return t.requestFullscreen();
		if (r(t.webkitRequestFullscreen)) return t.webkitRequestFullscreen();
	}
	let i = t;
	if (r(i.webkitSetPresentationMode)) {
		i.webkitSetPresentationMode("fullscreen");
		return;
	}
	let a = t;
	if (r(a.requestFullscreen)) return a.requestFullscreen();
}
async function or(e) {
	let t = document, n = e;
	if (n.webkitPresentationMode === "fullscreen" && r(n.webkitSetPresentationMode)) {
		n.webkitSetPresentationMode("inline");
		return;
	}
	if (r(t.exitFullscreen)) return t.exitFullscreen();
	if (r(t.webkitExitFullscreen)) return t.webkitExitFullscreen();
	let i = e;
	if (r(i.exitFullscreen)) return i.exitFullscreen();
}
// node_modules/@videojs/core/dist/default/dom/presentation/pip.js
function sr() {
	if (document.pictureInPictureEnabled) {
		let e = /.*Version\/.*Safari\/.*/.test(navigator.userAgent), t = typeof matchMedia == "function" && matchMedia("(display-mode: standalone)").matches;
		return !e || !t;
	}
	let e = document.createElement("video");
	return r(e.webkitSetPresentationMode);
}
function cr(e) {
	return r(e.webkitSetPresentationMode) ? !0 : cn(e);
}
function lr(e) {
	return e.webkitPresentationMode === "picture-in-picture" || document.pictureInPictureElement === g(e) ? !0 : e.isPictureInPicture ?? !1;
}
async function ur(e) {
	let t = e;
	if (r(t.webkitSetPresentationMode)) {
		t.webkitSetPresentationMode("picture-in-picture");
		return;
	}
	let n = e;
	if (r(n.requestPictureInPicture)) return n.requestPictureInPicture();
}
async function dr(e) {
	let t = e;
	if (t.webkitPresentationMode === "picture-in-picture" && r(t.webkitSetPresentationMode)) {
		t.webkitSetPresentationMode("inline");
		return;
	}
	if (r(document.exitPictureInPicture)) return document.exitPictureInPicture();
	let n = e;
	if (r(n.exitPictureInPicture)) return n.exitPictureInPicture();
}
// node_modules/@videojs/core/dist/default/dom/store/features/fullscreen.js
var fr = R({
	name: "fullscreen",
	state: ({ target: e }) => ({
		isFullscreen: !1,
		fullscreenAvailability: "unavailable",
		async requestFullscreen() {
			let { media: t, container: n } = e();
			return lr(t) && await dr(t), ar(n, t);
		},
		async exitFullscreen() {
			let { media: t } = e();
			return or(t);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r, container: i } = e;
		n({ fullscreenAvailability: tr() ? "available" : "unsupported" });
		let a = () => n({ isFullscreen: ir(i, r) });
		a(), h(document, "fullscreenchange", a, { signal: t }), h(document, "webkitfullscreenchange", a, { signal: t }), "webkitPresentationMode" in r && h(r, "webkitpresentationmodechanged", a, { signal: t });
	}
}), pr = R({
	name: "live",
	state: () => ({
		liveEdgeStart: NaN,
		targetLiveWindow: NaN
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!vn(r)) return;
		let i = () => n({
			liveEdgeStart: r.liveEdgeStart,
			targetLiveWindow: r.targetLiveWindow
		});
		i(), h(r, "targetlivewindowchange", i, { signal: t }), h(r, "streamtypechange", i, { signal: t }), h(r, "loadedmetadata", i, { signal: t }), h(r, "canplay", i, { signal: t }), h(r, "progress", i, { signal: t }), h(r, "durationchange", i, { signal: t }), h(r, "timeupdate", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), mr = Symbol("@videojs/media-title"), hr = Symbol("@videojs/user-title"), gr = Symbol("@videojs/set-user-title"), _r = "", vr = Symbol("@videojs/media-poster"), yr = Symbol("@videojs/user-poster"), br = Symbol("@videojs/set-user-poster"), xr = "", Sr = R({
	name: "metadata",
	config: {
		title: {
			action: gr,
			state: hr,
			html: { attribute: "content-title" }
		},
		poster: {
			action: br,
			state: yr
		}
	},
	state: ({ set: e }) => ({
		[mr]: void 0,
		[hr]: void 0,
		[gr]: (t) => e({ [hr]: t }),
		[vr]: void 0,
		[yr]: void 0,
		[br]: (t) => e({ [yr]: t })
	}),
	derived: {
		title: ({ get: e }) => e()[hr] ?? e()[mr] ?? _r,
		poster: ({ get: e }) => e()[yr] ?? e()[vr] ?? xr
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = () => {
			let e = _n(r) ? r.contentData : void 0;
			n({
				[mr]: e?.title,
				[vr]: e?.poster
			});
		}, a = () => {
			i(), _n(r) && h(r, "contentdatachange", i, { signal: t });
		};
		a(), h(r, "loadstart", a, { signal: t });
	}
}), Cr = R({
	name: "pip",
	state: ({ target: e }) => ({
		isPictureInPicture: !1,
		pictureInPictureAvailability: "unavailable",
		async requestPictureInPicture() {
			let { media: t, container: n } = e();
			if (cr(t)) {
				if (!rn(t) || !Xt(t)) throw new DOMException("The media has no video data yet.", "InvalidStateError");
				return ir(n, t) && await or(t), ur(t);
			}
		},
		async exitPictureInPicture() {
			let { media: t } = e();
			return dr(t);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = sr() && cr(r), a = () => n({
			isPictureInPicture: lr(r),
			pictureInPictureAvailability: i ? rn(r) && Xt(r) ? "available" : "unavailable" : "unsupported"
		});
		a(), h(r, "enterpictureinpicture", a, { signal: t }), h(r, "leavepictureinpicture", a, { signal: t }), h(r, "loadstart", a, { signal: t }), h(r, "loadedmetadata", a, { signal: t }), h(r, "emptied", a, { signal: t }), "webkitPresentationMode" in r && h(r, "webkitpresentationmodechanged", a, { signal: t });
	}
}), wr = R({
	name: "playback",
	state: ({ target: e, set: t }) => ({
		paused: !0,
		ended: !1,
		started: !1,
		waiting: !1,
		autoplay: !1,
		autoplaying: !1,
		play() {
			let { media: n } = e(), r = n.play();
			return tn(n) && !n.paused && t({
				paused: !1,
				ended: !1,
				started: !0
			}), r;
		},
		pause() {
			let { media: n } = e();
			tn(n) && (n.pause(), t({
				paused: n.paused,
				autoplaying: !1
			}));
		}
	}),
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i } = e;
		if (!tn(i) || !nn(i) || !rn(i)) return;
		let a = () => en(i) && i.autoplay, o, s = () => {
			o !== void 0 && cancelAnimationFrame(o), o = void 0;
		}, c = () => {
			s();
			let e = a() && !!(i.currentSrc || i.src) && i.paused && !i.ended && i.currentTime === 0 && i.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA;
			r({
				autoplay: a(),
				autoplaying: e
			});
		}, l = () => {
			n().autoplaying && r({ autoplaying: !1 });
		}, u = () => {
			n().autoplaying && (s(), o = requestAnimationFrame(() => {
				o = requestAnimationFrame(() => {
					o = void 0, i.paused && l();
				});
			}));
		};
		t.addEventListener("abort", s);
		let d = null, f = () => {
			let e = i.readyState < HTMLMediaElement.HAVE_FUTURE_DATA && !i.paused;
			e ? d ??= i.currentTime : d = null;
			let t = !i.paused || i.currentTime > 0;
			r({
				paused: i.paused,
				ended: i.ended,
				started: t,
				waiting: e && d === i.currentTime,
				autoplay: a(),
				autoplaying: n().autoplaying && !t && !i.ended
			});
		}, p = () => {
			d = i.currentTime, f();
		};
		c(), f(), h(i, "emptied", c, { signal: t }), h(i, "loadstart", c, { signal: t }), h(i, "canplaythrough", u, { signal: t }), h(i, "pause", l, { signal: t }), h(i, "error", l, { signal: t }), h(i, "emptied", p, { signal: t }), h(i, "play", p, { signal: t }), h(i, "pause", f, { signal: t }), h(i, "ended", f, { signal: t }), h(i, "playing", f, { signal: t }), h(i, "waiting", p, { signal: t }), h(i, "seeking", p, { signal: t }), h(i, "seeked", f, { signal: t }), h(i, "canplay", f, { signal: t }), h(i, "timeupdate", f, { signal: t });
	}
}), Tr = {
	min: .0625,
	max: 16
};
function Er(e) {
	return e?.playbackRateRange ?? Tr;
}
function Dr(e) {
	let t = d(e) ? e.trim().split(/\s+/).map(Number) : e ?? [], n = [...new Set(t.filter((e) => Number.isFinite(e) && e > 0))];
	return n.length > 0 ? n : void 0;
}
function Or(e, t) {
	if (e.includes(t)) return e;
	let n = e.findIndex((e) => e > t);
	return n === -1 ? [...e, t] : [
		...e.slice(0, n),
		t,
		...e.slice(n)
	];
}
function kr(e, { min: t, max: n }) {
	return e.filter((e) => e >= t && e <= n);
}
function Ar(e) {
	return Math.round(e * 1e5) / 1e5;
}
// node_modules/@videojs/utils/dist/number/number.js
function z(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function jr(e, t, n) {
	let r = n - t;
	return !Number.isFinite(r) || r <= 0 ? 0 : z((e - t) / r * 100, 0, 100);
}
function Mr(e, t, n) {
	let r = Math.round((e - n) / t) * t + n, i = `${t}`.indexOf(".");
	return i === -1 ? r : Number(r.toFixed(`${t}`.length - i - 1));
}
// node_modules/@videojs/core/dist/default/dom/store/features/playback-rate.js
var Nr = [
	.5,
	.75,
	1,
	1.25,
	1.5,
	1.75,
	2
], Pr = Symbol("@videojs/default-playback-rates"), Fr = Symbol("@videojs/set-default-playback-rates"), Ir = Symbol("@videojs/playback-rate-range");
function Lr(e, t) {
	let n = kr(e, t);
	if (n.length > 0) return n;
	let r = kr(Nr, t);
	return r.length > 0 ? r : [z(1, t.min, t.max)];
}
var Rr = R({
	name: "playbackRate",
	config: { defaultPlaybackRates: {
		action: Fr,
		state: Pr
	} },
	state: ({ target: e, get: t, set: n }) => ({
		[Pr]: Nr,
		[Fr]: (e) => {
			let t = Dr(e) ?? Nr;
			n({ [Pr]: t });
		},
		[Ir]: Tr,
		playbackRate: 1,
		playbackRateAvailability: "unavailable",
		setPlaybackRate(t) {
			let { media: n } = e();
			if (!sn(n)) return;
			let { min: r, max: i } = Er(n);
			n.playbackRate = z(t, r, i);
		}
	}),
	derived: { playbackRates: ({ get: e }) => Lr(e()[Pr], e()[Ir]) },
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i } = e, a = () => {
			let e = Er(i), t = n()[Ir];
			(e.min !== t.min || e.max !== t.max) && r({ [Ir]: e });
		};
		if (a(), h(i, "loadstart", a, { signal: t }), !sn(i)) {
			r({
				playbackRate: 1,
				playbackRateAvailability: "unsupported"
			});
			return;
		}
		let o = () => r({ playbackRate: Ar(i.playbackRate) });
		r({ playbackRateAvailability: "available" }), o(), h(i, "ratechange", o, { signal: t });
	}
}), zr = "auto";
function Br(e, t) {
	return e.id || String(t);
}
function Vr(e, t) {
	return {
		id: Br(e, t),
		...e.width !== void 0 && { width: e.width },
		...e.height !== void 0 && { height: e.height },
		...e.bitrate !== void 0 && { bitrate: e.bitrate },
		...e.frameRate !== void 0 && { frameRate: e.frameRate },
		...e.codec !== void 0 && { codec: e.codec },
		selected: e.selected
	};
}
function Hr(e) {
	return e.width && e.height ? Math.min(e.width, e.height) : e.height ?? e.width;
}
var Ur = R({
	name: "quality",
	state: ({ target: e }) => ({
		videoRenditionList: [],
		activeVideoRendition: null,
		selectVideoRendition(t) {
			let { media: n } = e();
			if (!fn(n)) return;
			if (t === zr) {
				n.videoRenditions.selectedIndex = -1;
				return;
			}
			let r = [...n.videoRenditions].findIndex((e, n) => Br(e, n) === t);
			r !== -1 && (n.videoRenditions.selectedIndex = r);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = null, a = null, o = () => fn(r) ? r.videoRenditions : null, s = (e) => {
			if (!e) return null;
			let t = [...e], n = t.find((e) => e.active);
			if (n) return n;
			if (!mn(r) || !r.videoWidth && !r.videoHeight) return null;
			let i = Hr({
				width: r.videoWidth || void 0,
				height: r.videoHeight || void 0
			}), a = t.filter((e) => Hr(e) === i);
			return a.length === 1 ? a[0] : null;
		}, c = (e = o()) => {
			let t = e ? [...e] : [], r = s(e);
			n({
				videoRenditionList: t.map(Vr),
				activeVideoRendition: r ? Vr(r, t.indexOf(r)) : null
			});
		}, l = () => {
			let e = o();
			e === i ? c(e) : (a?.abort(), a = new AbortController(), i = e, i && (h(i, "addrendition", () => c(i), { signal: a.signal }), h(i, "removerendition", () => c(i), { signal: a.signal }), h(i, "change", () => c(i), { signal: a.signal }), h(i, "activechange", () => c(i), { signal: a.signal })), c(i));
		};
		l(), h(r, "loadstart", l, { signal: t }), h(r, "resize", () => c(i), { signal: t }), t.addEventListener("abort", () => a?.abort(), { once: !0 });
	}
}), Wr = R({
	name: "remotePlayback",
	state: ({ target: e }) => ({
		remotePlaybackState: "disconnected",
		remotePlaybackAvailability: "unsupported",
		async promptRemotePlayback() {
			let { media: t, container: n } = e();
			return Wn(t) ? Kn(t) : (ir(n, t) && await or(t), await Kn(t));
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!hn(r)) return;
		if (ie(r)) {
			let e = () => {
				n({ remotePlaybackState: r.webkitCurrentPlaybackTargetIsWireless ? "connected" : "disconnected" });
			};
			h(r, "webkitplaybacktargetavailabilitychanged", (e) => {
				let { availability: t } = e;
				n({ remotePlaybackAvailability: t === "available" ? "available" : "unavailable" });
			}, { signal: t }), h(r, "webkitcurrentplaybacktargetiswirelesschanged", e, { signal: t }), e();
			return;
		}
		let i = () => n({ remotePlaybackState: r.remote.state });
		i(), h(r.remote, "connect", i, { signal: t }), h(r.remote, "connecting", i, { signal: t }), h(r.remote, "disconnect", i, { signal: t }), r.remote.watchAvailability((e) => {
			n({ remotePlaybackAvailability: e ? "available" : "unavailable" });
		}).catch(() => {
			n({ remotePlaybackAvailability: "unsupported" });
		}), t.addEventListener("abort", () => {
			r.remote?.cancelWatchAvailability?.()?.catch(M);
		});
	}
}), Gr = R({
	name: "source",
	state: () => ({
		currentSrc: "",
		canPlay: !1
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!rn(r)) return;
		let i = () => n({
			currentSrc: r.currentSrc,
			canPlay: r.readyState >= re.HAVE_FUTURE_DATA
		});
		i(), h(r, "canplay", i, { signal: t }), h(r, "canplaythrough", i, { signal: t }), h(r, "loadstart", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), Kr = R({
	name: "streamType",
	state: () => ({ streamType: E.UNKNOWN }),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (gn(r)) {
			let e = () => n({ streamType: r.streamType });
			e(), h(r, "streamtypechange", e, { signal: t });
			return;
		}
		if (!nn(r)) return;
		let i = () => {
			let { duration: e } = r;
			return e === Infinity ? E.LIVE : Number.isFinite(e) && e > 0 ? E.ON_DEMAND : E.UNKNOWN;
		}, a = () => n({ streamType: i() });
		a(), h(r, "durationchange", a, { signal: t }), h(r, "loadedmetadata", a, { signal: t }), h(r, "emptied", a, { signal: t }), ln(r) && h(r, "progress", a, { signal: t });
	}
}), qr = Symbol.for("@videojs/i18n-registry");
function Jr() {
	let e = globalThis, t = e[qr];
	if (t) return t;
	let n = {
		layers: /* @__PURE__ */ new Map(),
		subscribers: /* @__PURE__ */ new Set()
	};
	return e[qr] = n, n;
}
function Yr(e) {
	return e.trim().replaceAll("_", "-").toLowerCase();
}
function Xr(e) {
	let t = e.indexOf("-x-"), n = (t === -1 ? e : e.slice(0, t)).indexOf("-u-");
	return n === -1 ? e : e.slice(0, n) + (t === -1 ? "" : e.slice(t));
}
function Zr(e) {
	if (e[0] !== "zh") return;
	let t = e.find((e) => e === "hant" || e === "hans");
	return t === "hant" ? "zh-tw" : t === "hans" ? "zh-cn" : void 0;
}
function Qr(e) {
	return Xr(Yr(e));
}
function $r(e) {
	let t = Qr(e);
	if (!t) return ["en"];
	let n = t.split("-").filter(Boolean), r = [];
	for (let e = n.length; e >= 1; e--) r.push(n.slice(0, e).join("-"));
	let i = Zr(n), a = r.indexOf("zh");
	i && a !== -1 && r.splice(a, 0, i);
	let o = [], s = /* @__PURE__ */ new Set();
	for (let e of r) s.has(e) || (s.add(e), o.push(e));
	return s.has("en") || o.push("en"), o;
}
function ei(e) {
	let { layers: t } = Jr(), n = {};
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r], a = t.get(i);
		a && Object.assign(n, a);
	}
	return n;
}
function ti(e) {
	return ei($r(e));
}
function ni(e) {
	let { subscribers: t } = Jr();
	return t.add(e), () => {
		t.delete(e);
	};
}
// node_modules/@videojs/core/dist/default/core/i18n/resolve-text.js
function ri(e) {
	return typeof e == "string" ? e : e.text;
}
// node_modules/@videojs/core/dist/default/core/i18n/text.js
function ii(e) {
	return S(e) && "key" in e && "text" in e;
}
// node_modules/@videojs/core/dist/default/core/i18n/utils/interpolate.js
var ai = /\{([^{}]+)\}/g;
function oi(e, t) {
	return t ? e.replace(ai, (e, n) => Object.hasOwn(t, n) ? String(t[n]) : e) : e;
}
// node_modules/@videojs/core/dist/default/core/i18n/translate-text.js
function B(e, t, n) {
	return typeof e == "string" ? e : typeof t == "function" ? t(e, n) : oi(ri(e), t ?? n);
}
// node_modules/@videojs/core/dist/default/core/i18n/translator.js
function si(e, t) {
	return (t, n) => {
		let r = n, i = typeof t != "string", a = i ? t.key : t, o = e[a], s = r?.default, c = r ? { ...r } : void 0;
		return c && delete c.default, oi(o ?? (i ? t.text : s) ?? String(a), c);
	};
}
// node_modules/@videojs/core/dist/default/dom/store/text-cues.js
function ci(e, t) {
	if (!e) return [];
	let n = Number.isFinite(t) && t > 0 ? t : Infinity;
	return Array.from(e, (e) => ({
		startTime: e.startTime,
		endTime: Math.min(e.endTime, n),
		text: e.text ?? ""
	}));
}
// node_modules/@videojs/core/dist/default/dom/store/features/text-track.js
function li(e, t) {
	return e.id || `track:${t}:${e.kind}:${e.language}:${e.label}`;
}
function ui(e) {
	return y(Array.from(e.textTracks, (e, t) => ({
		id: li(e, t),
		kind: e.kind,
		track: e
	})));
}
function di(e, t) {
	for (let { track: n } of e) {
		let e = n === t ? "showing" : "disabled";
		n.mode !== e && (n.mode = e);
	}
}
function fi(e, t) {
	let n = Qr(t), r = $r(t);
	n !== "en" && !n.startsWith("en-") && r.pop();
	for (let t of r) {
		let n = e.find(({ track: e }) => Qr(e.language) === t);
		if (n) return n;
		let r = e.find(({ track: e }) => Qr(e.language).startsWith(`${t}-`));
		if (r) return r;
	}
}
var pi = R({
	name: "textTrack",
	state: ({ target: e }) => {
		let t = null;
		return {
			textTrackList: [],
			subtitlesShowing: !1,
			toggleSubtitles(n) {
				let { media: r } = e();
				if (!dn(r)) return !1;
				let i = ui(r);
				if (!i.length) return !1;
				let a = i.find(({ track: e }) => e.mode === "showing"), o = n ?? !a;
				if (a && (t = a.id), !o) return di(i, null), !1;
				let s = a ?? i.find(({ id: e }) => e === t) ?? fi(i, globalThis.navigator?.language ?? "") ?? i[0];
				return t = s.id, di(i, s.track), !0;
			},
			selectSubtitlesTrack(n) {
				let { media: r } = e();
				if (!dn(r)) return;
				let i = ui(r);
				if (!i.length) return;
				if (C(n)) {
					let e = i.find(({ track: e }) => e.mode === "showing");
					e && (t = e.id), di(i, null);
					return;
				}
				let a = i.find((e) => e.id === n);
				a && (t = a.id, di(i, a.track));
			},
			chaptersCues: [],
			thumbnailsTrack: null
		};
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!dn(r)) return;
		let i = null, a = () => {
			i?.abort(), i = new AbortController();
			let e = null, t = null, o = [], s = !1;
			for (let n = 0; n < r.textTracks.length; n++) {
				let i = r.textTracks[n];
				!e && i.kind === "chapters" && (e = i), !t && i.kind === "metadata" && i.label === "thumbnails" && (t = i), o.push({
					id: li(i, n),
					kind: i.kind,
					label: i.label,
					language: i.language,
					mode: i.mode
				}), ee(i) && i.mode === "showing" && (s = !0);
			}
			let c = ci(e?.cues, nn(r) ? r.duration : NaN), l = null;
			t && (l = {
				cues: t.cues ? Array.from(t.cues) : [],
				src: v(r, t)?.src ?? null,
				crossOrigin: rn(r) ? te(r.crossOrigin) : null
			});
			let u = yn(r) && r.querySelectorAll("track") || [], d = r instanceof HTMLElement && r.shadowRoot?.querySelectorAll("track") || [];
			for (let e of [...u, ...d]) e.track?.cues?.length || h(e, "load", a, { signal: i.signal });
			n({
				textTrackList: o,
				subtitlesShowing: s,
				chaptersCues: c,
				thumbnailsTrack: l
			});
		};
		a();
		let o = r.textTracks;
		o instanceof EventTarget && (h(o, "addtrack", a, { signal: t }), h(o, "removetrack", a, { signal: t }), h(o, "change", a, { signal: t })), h(r, "loadstart", a, { signal: t }), h(r, "durationchange", a, { signal: t }), t.addEventListener("abort", () => i?.abort(), { once: !0 });
	}
}), mi = { seek: Symbol.for("@videojs/seek") }, hi = R({
	name: "time",
	state: ({ target: e, signals: t, set: n }) => ({
		currentTime: 0,
		duration: 0,
		seeking: !1,
		async seek(r) {
			let { media: i } = e(), a = t.supersede(mi.seek);
			if (!nn(i) || !rn(i)) return 0;
			if (h(i, "emptied", () => t.supersede(mi.seek), {
				signal: a,
				once: !0
			}), !Xt(i) && !await Ve(i, "loadedmetadata", { signal: a }).catch(() => !1)) return i.currentTime;
			let o = Math.max(0, Math.min(r, i.duration || Infinity));
			return n({
				currentTime: o,
				seeking: !0
			}), i.currentTime = o, await Ve(i, "seeked", { signal: a }).catch(M), i.currentTime;
		}
	}),
	attach({ target: e, signal: t, set: n, get: r }) {
		let { media: i } = e;
		if (!nn(i)) return;
		let a = () => {
			let { duration: e } = i;
			if (e === Infinity && ln(i)) {
				let { seekable: e } = i;
				return e.length > 0 ? e.end(e.length - 1) : 0;
			}
			return Number.isFinite(e) ? e : 0;
		}, o = () => n({
			currentTime: i.currentTime,
			duration: a(),
			seeking: i.seeking
		}), s = () => {
			r().seeking || o();
		}, c, l = () => {
			c?.(), c = void 0;
		}, u = () => {
			if (!tn(i) || i.paused || i.ended) {
				l();
				return;
			}
			let e = r(), t = i.currentTime;
			!e.seeking && t !== e.currentTime && n({ currentTime: t }), c = Pe(u);
		}, d = () => {
			!c && tn(i) && !i.paused && !i.ended && (c = Pe(u));
		}, f = () => {
			l(), s();
		};
		o(), d(), t.addEventListener("abort", l, { once: !0 }), h(i, "play", d, { signal: t }), h(i, "playing", d, { signal: t }), h(i, "pause", f, { signal: t }), h(i, "ended", f, { signal: t }), h(i, "timeupdate", () => {
			(!c || document.hidden) && s();
		}, { signal: t }), h(i, "durationchange", o, { signal: t }), h(i, "seeking", o, { signal: t }), h(i, "seeked", o, { signal: t }), h(i, "loadedmetadata", o, { signal: t }), h(i, "emptied", () => {
			l(), o();
		}, { signal: t }), h(i, "progress", s, { signal: t });
	}
}), gi = .25, _i = R({
	name: "volume",
	state: ({ target: e, get: t, set: n }) => {
		let r = () => t().volumeAvailability === "unsupported";
		return {
			volume: 1,
			muted: !1,
			volumeAvailability: "unavailable",
			mutedAvailability: "unavailable",
			setVolume(t) {
				let { media: i } = e();
				if (!an(i)) return 0;
				let a = Math.max(0, Math.min(1, t));
				return a > 0 && i.muted && (i.muted = !1), r() || (i.volume = a), n({
					volume: i.volume,
					muted: i.muted
				}), i.volume;
			},
			setMuted(t) {
				let { media: i } = e();
				if (!on(i)) return !1;
				i.muted = t;
				let a = an(i);
				return !t && a && !r() && i.volume === 0 && (i.volume = gi), n({
					volume: a ? i.volume : 1,
					muted: i.muted
				}), i.muted;
			}
		};
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = an(r), a = on(r);
		if (!i && !a) return;
		n({
			volumeAvailability: i ? vi() : "unavailable",
			mutedAvailability: a ? "available" : "unavailable"
		});
		let o = () => n({
			volume: i ? r.volume : 1,
			muted: a ? r.muted : !1
		});
		o(), h(r, "volumechange", o, { signal: t });
	}
});
function vi() {
	let e = document.createElement("video");
	try {
		return e.volume = .5, e.volume === .5 ? "available" : "unsupported";
	} catch {
		return "unsupported";
	}
}
// node_modules/@videojs/store/dist/default/core/combine.js
function yi(...e) {
	let t = e.map((e) => e.derived ?? {});
	return {
		state: (t) => {
			let n = e.map((e) => e.state(t));
			return Object.assign({}, ...n);
		},
		preserve: Array.from(new Set(e.flatMap((e) => e.preserve ?? []))),
		derived: Object.assign({}, ...t),
		attach: (t) => {
			for (let n of e) try {
				n.attach?.(t);
			} catch (e) {
				t.reportError(e);
			}
		}
	};
}
// node_modules/@videojs/store/dist/default/core/selector.js
var bi = {
	target: _e,
	signals: new he(),
	get: _e,
	set: _e
};
function V(e) {
	let t = e.state(bi), r = [...Object.keys(t), ...Object.keys(e.derived ?? {})], i = r[0];
	return Object.assign(i ? (e) => {
		if (i in e) return n(e, r);
	} : () => void 0, { displayName: e.name });
}
V(An);
var xi = V(jn), Si = V(Qn), Ci = V(er), wi = V(fr);
V(pr);
var Ti = V(Sr), Ei = V(Cr), Di = V(wr), Oi = V(Rr), ki = V(Ur);
V(Wr), V(Gr), V(Kr);
var Ai = V(pi), ji = V(hi), Mi = V(_i);
// node_modules/@videojs/core/dist/default/dom/media-actions.js
function Ni(e) {
	l(e) && e.catch(M);
}
var H = {
	togglePaused({ store: e, state: t = e.state }) {
		let n = Di(t);
		n && Ni(n.paused && !n.autoplaying ? n.play() : n.pause());
	},
	toggleMuted({ store: e }) {
		let t = Mi(e.state);
		t && t.setMuted(!(t.muted || t.volume === 0));
	},
	toggleFullscreen({ store: e }) {
		let t = wi(e.state);
		t && Ni(t.isFullscreen ? t.exitFullscreen() : t.requestFullscreen());
	},
	togglePictureInPicture({ store: e }) {
		let t = Ei(e.state);
		t && Ni(t.isPictureInPicture ? t.exitPictureInPicture() : t.requestPictureInPicture());
	},
	seekStep({ store: e, value: t, key: n }) {
		let r = En("seekStep", n, t), i = ji(e.state);
		i && i.seek(i.currentTime + r);
	},
	volumeStep({ store: e, value: t, key: n }) {
		let r = En("volumeStep", n, t), i = Mi(e.state);
		i && i.setVolume(i.volume + r);
	},
	speedUp({ store: e, value: t }) {
		let n = Oi(e.state);
		if (!n) return;
		if (!a(t)) {
			n.setPlaybackRate(Ar(n.playbackRate + t));
			return;
		}
		let { playbackRates: r, playbackRate: i } = n, o = r.filter((e) => e > i);
		o.length !== 0 && n.setPlaybackRate(Math.min(...o));
	},
	speedDown({ store: e, value: t }) {
		let n = Oi(e.state);
		if (!n) return;
		if (!a(t)) {
			n.setPlaybackRate(Ar(n.playbackRate - t));
			return;
		}
		let { playbackRates: r, playbackRate: i } = n, o = r.filter((e) => e < i);
		o.length !== 0 && n.setPlaybackRate(Math.max(...o));
	}
}, Pi = {
	togglePaused: H.togglePaused,
	toggleMuted: H.toggleMuted,
	toggleFullscreen: H.toggleFullscreen,
	togglePictureInPicture: H.togglePictureInPicture,
	seekStep: H.seekStep,
	volumeStep: H.volumeStep,
	speedUp: H.speedUp,
	speedDown: H.speedDown
};
function Fi(e) {
	return Pi[e] || (({ store: t }) => {
		let n = t.state[e];
		r(n) && Ni(n());
	});
}
// node_modules/@videojs/core/dist/default/dom/gesture/tap.js
var Ii = 200, Li = class {
	#e = 0;
	#t = null;
	handleUp(e, t) {
		if (e.resolve("doubletap").length > 0) {
			let n = Date.now();
			if (n - this.#e < Ii) {
				this.#n(), this.#e = 0, e.resolve("doubletap")[0]?.onActivate(t);
				return;
			}
			this.#e = n, this.#n(), this.#t = setTimeout(() => {
				this.#t = null, this.#e = 0, e.resolve("tap")[0]?.onActivate(t);
			}, Ii);
		} else e.resolve("tap")[0]?.onActivate(t);
	}
	#n() {
		this.#t !== null && (clearTimeout(this.#t), this.#t = null);
	}
	reset() {
		this.#n(), this.#e = 0;
	}
}, Ri = /* @__PURE__ */ new WeakMap();
function zi(e) {
	let t = Ri.get(e);
	return t || (t = new Li(), Ri.set(e, t), t);
}
function Bi(e, t, n) {
	return Bn(e).add({
		type: "tap",
		recognizer: zi(e),
		onActivate: t,
		onPointerDown: n?.onPointerDown,
		pointer: n?.pointer,
		region: n?.region,
		disabled: n?.disabled,
		action: n?.action,
		value: n?.value
	});
}
function Vi(e, t, n) {
	return Bn(e).add({
		type: "doubletap",
		recognizer: zi(e),
		onActivate: t,
		pointer: n?.pointer,
		region: n?.region,
		disabled: n?.disabled,
		action: n?.action,
		value: n?.value
	});
}
// node_modules/@videojs/core/dist/default/dom/hotkey/actions.js
function Hi(e) {
	return e.startsWith("toggle");
}
var Ui = {
	togglePaused: H.togglePaused,
	toggleMuted: H.toggleMuted,
	toggleFullscreen: H.toggleFullscreen,
	toggleSubtitles({ store: e }) {
		Ai(e.state)?.toggleSubtitles();
	},
	togglePictureInPicture: H.togglePictureInPicture,
	seekStep: H.seekStep,
	volumeStep: H.volumeStep,
	speedUp: H.speedUp,
	speedDown: H.speedDown,
	seekToPercent({ store: e, value: t, key: n }) {
		let r = ji(e.state);
		if (!r) return;
		let i = xi(e.state), o = Zt({
			duration: r.duration,
			seekable: i?.seekable ?? []
		});
		if (o <= 0) return;
		let s;
		if (!a(t)) s = t;
		else if (n >= "0" && n <= "9") s = Number(n) * 10;
		else return;
		r.seek(s / 100 * o);
	}
};
function Wi(e) {
	return Ui[e];
}
// node_modules/@videojs/core/dist/default/dom/hotkey/aria.js
var Gi = {
	shift: "Shift",
	ctrl: "Control",
	alt: "Alt",
	meta: "Meta"
}, Ki = {
	shift: "Shift",
	ctrl: "Ctrl",
	alt: "Alt",
	meta: "Meta"
}, qi = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
function Ji(e) {
	return e.map((e) => {
		let t = [];
		for (let n of qi) e.modifiers.has(n) && t.push(Gi[n]);
		return t.push(e.originalKey), t.join("+");
	}).join(" ");
}
function Yi(e) {
	let t = [];
	for (let n of qi) e.modifiers.has(n) && t.push(Ki[n]);
	return t.push(Xi(e.originalKey)), t.join("+");
}
function Xi(e) {
	return e.length === 1 ? e.toUpperCase() : e;
}
// node_modules/@videojs/core/dist/default/dom/hotkey/coordinator.js
var Zi = class {
	#e;
	#t = [];
	#n = 0;
	#r = null;
	#i = null;
	#a = /* @__PURE__ */ new Set();
	#o = /* @__PURE__ */ new Set();
	#s = !1;
	constructor(e) {
		this.#e = e;
	}
	subscribe(e) {
		return this.#a.add(e), () => this.#a.delete(e);
	}
	subscribeShortcutChanges(e) {
		return this.#o.add(e), () => this.#o.delete(e);
	}
	add(e) {
		let t = {
			parsed: $i(e.keys),
			options: e,
			id: this.#n++
		};
		this.#t.push(t), this.#c(), e.target === "document" ? this.#u() : this.#l(), this.#h();
		let n = !1;
		return () => {
			if (n) return;
			n = !0;
			let e = this.#t.indexOf(t);
			e !== -1 && this.#t.splice(e, 1), this.#d(), this.#h();
		};
	}
	getAriaKeys(e) {
		return this.getShortcut(e).aria;
	}
	getShortcut(e, t) {
		let n = this.#p(e, t);
		if (!n.length) return {};
		let r = n.flatMap((e) => e.parsed), i = n[n.length - 1];
		return {
			aria: Ji(r),
			shortcut: this.#m(i)
		};
	}
	destroy() {
		this.#s || (this.#s = !0, this.#r?.abort(), this.#r = null, this.#i?.abort(), this.#i = null, this.#t = [], this.#h(), this.#a.clear(), this.#o.clear());
	}
	#c() {
		this.#t.sort((e, t) => {
			let n = t.parsed[0].modifiers.size - e.parsed[0].modifiers.size;
			return n === 0 ? e.id - t.id : n;
		});
	}
	#l() {
		this.#r || (this.#r = new AbortController(), h(this.#e, "keydown", this.#f, { signal: this.#r.signal }));
	}
	#u() {
		this.#i || (this.#i = new AbortController(), h(document, "keydown", this.#f, { signal: this.#i.signal }));
	}
	#d() {
		let e = this.#t.some((e) => e.options.target !== "document"), t = this.#t.some((e) => e.options.target === "document");
		e || (this.#r?.abort(), this.#r = null), t || (this.#i?.abort(), this.#i = null);
	}
	#f = (e) => {
		if (Pn(this.#e) || e.key === "Unidentified" || at(e) || e.defaultPrevented) return;
		let t = tt(e);
		for (let n of this.#t) {
			let { options: r, parsed: i } = n;
			if (!r.disabled && !(e.repeat && r.repeatable === !1) && r.target === "document" == (e.currentTarget === document)) {
				for (let n of i) if (ta(n, e) && !(t && n.modifiers.size === 0)) {
					if (this.#a.size > 0) {
						let t = {
							source: "hotkey",
							action: r.action,
							value: r.value,
							event: e
						};
						for (let e of this.#a) try {
							e(t);
						} catch {}
					}
					e.preventDefault(), r.onActivate(e, n.originalKey);
					return;
				}
			}
		}
	};
	#p(e, t) {
		return this.#t.filter((n) => n.options.disabled || n.options.action !== e ? !1 : a(t) ? !0 : n.options.value === t).sort((e, t) => e.id - t.id);
	}
	#m(e) {
		return e.options.keys === "0-9" ? e.options.keys : Yi(e.parsed[0]);
	}
	#h() {
		for (let e of this.#o) e();
	}
}, Qi = /* @__PURE__ */ new Set([
	"shift",
	"ctrl",
	"alt",
	"meta"
]);
function $i(e) {
	if (e === "0-9") return Array.from({ length: 10 }, (e, t) => ({
		modifiers: /* @__PURE__ */ new Set(),
		key: String(t),
		originalKey: String(t)
	}));
	let t = e.split("+"), n = t.pop(), r = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = e.toLowerCase();
		t === "mod" ? r.add(Et() ? "meta" : "ctrl") : Qi.has(t) && r.add(t);
	}
	return [{
		modifiers: r,
		key: n === "Space" ? " " : n.toLowerCase(),
		originalKey: n
	}];
}
function ea(e) {
	return e.length === 1 && !/[a-z]/i.test(e);
}
function ta(e, t) {
	if (t.key === "Unidentified" || t.key.toLowerCase() !== e.key) return !1;
	let n = ea(t.key), r = n ? t.shiftKey && e.modifiers.has("shift") : t.shiftKey, i = n ? t.altKey && e.modifiers.has("alt") : t.altKey;
	return r === e.modifiers.has("shift") && t.ctrlKey === e.modifiers.has("ctrl") && i === e.modifiers.has("alt") && t.metaKey === e.modifiers.has("meta");
}
var na = /* @__PURE__ */ new WeakMap();
function ra(e) {
	let t = na.get(e);
	return t || (t = new Zi(e), na.set(e, t)), t;
}
function ia(e, t) {
	let n = ra(e), r = $i(t.keys)[0]?.originalKey;
	return n.add({
		...t,
		value: En(t.action ?? "", r, t.value)
	});
}
// node_modules/@videojs/core/dist/default/dom/hotkey/hotkey-events.js
var aa = "hotkey-shortcut-change", oa = [
	wr,
	Rr,
	Ur,
	An,
	_i,
	hi,
	Gr,
	jn,
	fr,
	Cr,
	Wr,
	Qn,
	pi,
	er,
	Sr
];
// node_modules/@videojs/core/dist/default/dom/ui/button.js
function sa(e) {
	let { onActivate: t, isDisabled: n } = e;
	return {
		role: "button",
		tabIndex: 0,
		onClick(e) {
			n() ? e.preventDefault() : t(e, (e.detail ?? 0) > 0 ? "pointer" : "virtual");
		},
		onPointerDown(e) {
			n() && e.preventDefault();
		},
		onMouseDown(e) {
			n() && e.preventDefault();
		},
		onKeyDown(e) {
			e.target === e.currentTarget && (n() ? e.key !== "Tab" && e.preventDefault() : e.key === "Enter" ? (e.preventDefault(), t(e, "keyboard")) : e.key === " " && e.preventDefault());
		},
		onKeyUp(e) {
			e.target === e.currentTarget && (n() || e.key === " " && t(e, "keyboard"));
		}
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/container.js
var ca = "group";
function la(e) {
	e.hasAttribute("role") || e.setAttribute("role", ca), e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0");
}
function ua(e) {
	let t = F(e.ownerDocument);
	t && t !== e.ownerDocument.body && Bt(e, t) || e.focus({ preventScroll: !0 });
}
// node_modules/@videojs/core/dist/default/dom/ui/dismiss-layer.js
function da(e) {
	let { transition: t } = e, n = t.state, r = new AbortController(), i = null;
	function a(e) {
		if (r.signal.aborted) return null;
		let { active: i, status: a } = n.current;
		return i && a !== "ending" ? null : (a === "ending" && t.cancel(), t.open(e));
	}
	function o(e) {
		let { active: i, status: a } = n.current;
		return r.signal.aborted || !i || a === "ending" ? null : t.close(e);
	}
	function s() {
		if (c(), typeof document > "u") return;
		i = new AbortController();
		let { signal: t } = i;
		h(document, "keydown", l, { signal: t }), e.onDocumentActive?.(t);
	}
	function c() {
		i?.abort(), i = null;
	}
	function l(t) {
		t.key === "Escape" && (t.defaultPrevented || n.current.active && (e.closeOnEscape?.() ?? !0) && e.onEscapeDismiss(t));
	}
	let u = n.subscribe(() => {
		n.current.active && n.current.status !== "ending" ? s() : c();
	});
	r.signal.addEventListener("abort", () => {
		u(), t.destroy(), c();
	});
	function d() {
		r.signal.aborted || r.abort();
	}
	return {
		input: n,
		open: a,
		close: o,
		signal: r.signal,
		destroy: d
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/dialog.js
function fa(e) {
	let t = null, n = null, r = null, i = null, a = null, o = null, s = 0, c = /* @__PURE__ */ new Map(), l = N({ documentModal: !0 }), u = da({
		transition: e.transition,
		closeOnEscape: e.closeOnEscape,
		onEscapeDismiss(e) {
			T(e) && (e.preventDefault(), e.stopPropagation(), p());
		},
		onDocumentActive(e) {
			h(document, "keydown", g, {
				capture: !0,
				signal: e
			}), h(document, "focusin", _, { signal: e });
		}
	}), d = u.input;
	function f() {
		r = F();
		let n = u.open(() => t);
		n && (w(), x(), e.onOpenChange(!0), m(), n.then(() => {
			!u.signal.aborted && d.current.active && d.current.status === "idle" && e.onOpenChangeComplete?.(!0);
		}));
	}
	function p() {
		let i = u.close(t);
		i && (cancelAnimationFrame(s), s = 0, e.onOpenChange(!1), i.then(() => {
			if (u.signal.aborted || d.current.active) return;
			let t = F(), i = a && t instanceof Element && !Bt(a, t);
			C();
			let o = n?.isConnected ? n : r;
			!i && o?.isConnected && o.focus(), r = null, e.onOpenChangeComplete?.(!1);
		}));
	}
	function m() {
		cancelAnimationFrame(s), s = requestAnimationFrame(() => {
			s = 0, !u.signal.aborted && d.current.active && t && (t.querySelector("[autofocus]") ?? Je(t)[0] ?? t).focus();
		});
	}
	function g(e) {
		if (e.key !== "Tab" || !d.current.active || !t || !l.current.documentModal) return;
		let n = Je(t);
		if (n.length === 0) {
			e.preventDefault(), t.focus();
			return;
		}
		let r = F(), i = n[0], a = n[n.length - 1];
		e.shiftKey && (r === i || !r || !Bt(t, r)) ? (e.preventDefault(), a.focus()) : e.shiftKey || r !== a && r && Bt(t, r) || (e.preventDefault(), i.focus());
	}
	function _(e) {
		d.current.active && t && (e.target instanceof Element && Bt(t, e.target) || a && e.target instanceof Element && !Bt(a, e.target) || (Je(t)[0] ?? t).focus());
	}
	function v(e) {
		n = e;
	}
	function y(e) {
		t !== e && C(), t = e, w(), e && d.current.active && x();
		let n = F();
		e && d.current.active && (!n || !Bt(e, n)) && m();
	}
	function b(e) {
		i !== e && (C(), i = e, w(), t && d.current.active && x());
	}
	return u.signal.addEventListener("abort", () => {
		cancelAnimationFrame(s), s = 0, C(), t = null, n = null, r = null, i = null, a = null;
	}), {
		input: d,
		modality: l,
		triggerProps: { onClick() {
			f();
		} },
		open: f,
		close: p,
		setTriggerElement: v,
		setPopupElement: y,
		setInteractionRoot: b,
		destroy: u.destroy
	};
	function x() {
		!t?.isConnected || c.size > 0 || o || (w(), Ge(t, (e) => {
			if (e === a || e === t?.ownerDocument.body) return !0;
			if (e.assignedSlot) {
				for (let t of e.assignedSlot.assignedElements({ flatten: !0 })) t !== e && t instanceof HTMLElement && S(t);
				return;
			}
			let n = e.parentElement;
			if (n) {
				for (let t of n.children) t !== e && t instanceof HTMLElement && S(t);
				return;
			}
			let r = e.getRootNode();
			if (r instanceof ShadowRoot) for (let t of r.children) t !== e && t instanceof HTMLElement && S(t);
		}, { composed: !0 }), a && (o = Nn(a)));
	}
	function S(e) {
		c.set(e, e.hasAttribute("inert")), e.setAttribute("inert", "");
	}
	function C() {
		for (let [e, t] of c) t || e.removeAttribute("inert");
		c.clear(), o?.(), o = null;
	}
	function w() {
		a = i && t && Bt(i, t) ? i : null, l.patch({ documentModal: !a });
	}
	function T(e) {
		if (!a) return !0;
		let t = e.target instanceof Element ? e.target : F();
		return t instanceof Element && Bt(a, t);
	}
}
// node_modules/@videojs/core/dist/default/core/ui/transition.js
var pa = {
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
};
function ma(e) {
	return {
		transitionStarting: e === "starting",
		transitionEnding: e === "ending"
	};
}
// node_modules/@videojs/core/dist/default/core/ui/indicator/lifecycle.js
var ha = class {
	#e = null;
	#t;
	#n;
	constructor(e, t) {
		this.#t = e, this.#n = t;
	}
	arm() {
		this.clear(), this.#e = setTimeout(() => {
			this.#e = null, this.#t();
		}, this.#n());
	}
	clear() {
		this.#e !== null && (clearTimeout(this.#e), this.#e = null);
	}
	close() {
		this.clear(), this.#t();
	}
	destroy() {
		this.clear();
	}
}, ga = class {
	#e = /* @__PURE__ */ new Set();
	register(e) {
		return this.#e.add(e), () => this.#e.delete(e);
	}
	show(e) {
		for (let t of this.#e) t !== e && t.close();
	}
};
function _a(e) {
	return e.closeDelay ?? 800;
}
function va(e, t) {
	return e.open || t.active;
}
function ya(e, t, n) {
	let r = e.open ? e : t;
	return {
		...r,
		open: e.open && n.active,
		generation: e.open ? e.generation : r.generation,
		...ma(n.status)
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/input-action.js
function ba(e) {
	return {
		action: e.action,
		value: e.value,
		source: e.source,
		key: "key" in e.event ? e.event.key : void 0,
		repeat: "repeat" in e.event ? e.event.repeat : void 0
	};
}
function xa(e) {
	if (!e) return {};
	let t = e.state, n = ji(t), r = Di(t), i = Ai(t);
	return {
		paused: r && r.paused && !r.autoplaying,
		volume: Mi(t)?.volume,
		muted: Mi(t)?.muted,
		playbackRate: Oi(t)?.playbackRate,
		isFullscreen: wi(t)?.isFullscreen,
		subtitlesShowing: i?.subtitlesShowing,
		subtitlesAvailable: i ? (i.textTrackList ?? []).some(ee) : void 0,
		isPictureInPicture: Ei(t)?.isPictureInPicture,
		currentTime: n?.currentTime,
		duration: n?.duration,
		seeking: n?.seeking
	};
}
function Sa(e, t) {
	let n = (e) => t(ba(e)), r = Bn(e).subscribe(n), i = ra(e).subscribe(n);
	return () => {
		r(), i();
	};
}
var Ca = /* @__PURE__ */ new WeakMap();
function wa(e) {
	let t = Ca.get(e);
	return t || (t = new ga(), Ca.set(e, t)), t;
}
// node_modules/@videojs/core/dist/default/dom/utils/layout.js
function Ta(e) {
	e?.getBoundingClientRect();
}
function Ea(e, t, n, r) {
	let i = e + n, a = t + r;
	return {
		x: e,
		y: t,
		width: n,
		height: r,
		top: t,
		right: i,
		bottom: a,
		left: e,
		toJSON() {
			return {
				x: e,
				y: t,
				width: n,
				height: r,
				top: t,
				right: i,
				bottom: a,
				left: e
			};
		}
	};
}
function Da(e, t) {
	let n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), i = Math.min(e.right, t.right), a = Math.min(e.bottom, t.bottom);
	return Ea(n, r, Math.max(0, i - n), Math.max(0, a - r));
}
function Oa(e) {
	let t = document.documentElement.getBoundingClientRect();
	return e ? Da(t, e.getBoundingClientRect()) : t;
}
function ka(e, t = {}) {
	if (!e) return null;
	if (!d(e)) return e;
	if (e === "viewport") return null;
	if (e === "container") return t.container ?? null;
	try {
		return (t.root ?? document).querySelector(e);
	} catch {
		return null;
	}
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/popover.js
function Aa(e) {
	let { onOpenChange: t, closeOnOutsideClick: n } = e, r = null, i = null, a = null, o = null, s = /* @__PURE__ */ new Set(), c = !1, l = null, u = da({
		transition: e.transition,
		closeOnEscape: e.closeOnEscape,
		onEscapeDismiss(e) {
			e.preventDefault(), T("escape", e);
		},
		onDocumentActive(e) {
			h(document, "pointerdown", te, {
				capture: !0,
				signal: e
			});
		}
	}), d = u.input, f = {
		close(e) {
			T(e);
		},
		get triggerElement() {
			return r;
		}
	};
	function p() {
		o !== null && (clearTimeout(o), o = null);
	}
	function m() {
		return globalThis.matchMedia?.("(hover: hover)")?.matches ?? !1;
	}
	function g() {
		return m() ? globalThis.matchMedia?.("(pointer: fine)")?.matches ?? !1 : !1;
	}
	function _() {
		return !e.openOnHover?.() || m();
	}
	function v() {
		c = !1, l !== null && (clearTimeout(l), l = null);
	}
	function y() {
		c = !0, l !== null && clearTimeout(l), l = setTimeout(v, 500);
	}
	function b() {
		return c ? (v(), !0) : !1;
	}
	function x() {
		return r ? r.hasAttribute("disabled") ? !0 : r.getAttribute("aria-disabled") === "true" : !1;
	}
	function S() {
		let t = u.open(() => i);
		t && (queueMicrotask(() => {
			!u.signal.aborted && d.current.active && d.current.status !== "ending" && jt(i);
		}), e.group?.()?.open(f), t.then(() => {
			!u.signal.aborted && d.current.active && d.current.status === "idle" && e.onOpenChangeComplete?.(!0);
		}));
	}
	function C() {
		let t = u.close(i);
		t && (e.group?.()?.close(f), t.then(() => {
			u.signal.aborted || d.current.active || (Mt(i), e.onOpenChangeComplete?.(!1));
		}));
	}
	function w(n, r) {
		if (u.signal.aborted) return;
		let { active: i, status: a } = d.current;
		i && a !== "ending" || (t(!0, r ? {
			reason: n,
			event: r
		} : { reason: n }), e.deferOpenChanges || S());
	}
	function T(n, r) {
		if (u.signal.aborted) return;
		let { active: i, status: a } = d.current;
		i && a !== "ending" && (t(!1, r ? {
			reason: n,
			event: r
		} : { reason: n }), e.deferOpenChanges || C());
	}
	function E(e = "click") {
		w(e);
	}
	function D(e = "click") {
		p(), T(e);
	}
	function ee(t) {
		e.deferOpenChanges && (t ? S() : C());
	}
	function te(e) {
		if (!n() || !d.current.active) return;
		let t = e.composedPath();
		r && t.includes(r) || i && t.includes(i) ? y() : (v(), T("outside-click", e));
	}
	function ne(e) {
		e.newState === "closed" && T("imperative-action", e);
	}
	u.signal.addEventListener("abort", () => {
		a?.abort(), a = null, e.group?.()?.close(f), p(), v(), s.clear(), r = null, i = null;
	});
	let re = {
		onClick(e) {
			_() && (x() || (d.current.active && d.current.status !== "ending" ? T("click", e) : w("click", e)));
		},
		onPointerEnter(t) {
			if (!e.openOnHover?.() || !m() || (p(), d.current.active)) return;
			let n = e.delay?.() ?? 300;
			o = setTimeout(() => w("hover"), n);
		},
		onPointerLeave(t) {
			if (!e.openOnHover?.() || !m() || (p(), !d.current.active)) return;
			let n = e.closeDelay?.() ?? 0;
			o = setTimeout(() => T("hover"), n);
		},
		onFocusIn(t) {
			if (e.openOnHover?.()) {
				if (!g()) return;
				w("focus");
			}
		},
		onFocusOut(t) {
			let n = t.relatedTarget;
			n && (r?.contains(n) || i?.contains(n)) || e.openOnHover?.() && T("blur");
		}
	}, ie = {
		onPointerEnter(t) {
			e.openOnHover?.() && p();
		},
		onPointerLeave(t) {
			if (!e.openOnHover?.() || s.size > 0 || (p(), !d.current.active)) return;
			let n = e.closeDelay?.() ?? 0;
			o = setTimeout(() => T("hover"), n);
		},
		onGotPointerCapture(e) {
			s.add(e.pointerId);
		},
		onLostPointerCapture(e) {
			s.delete(e.pointerId);
		},
		onFocusOut(e) {
			let t = e.relatedTarget;
			t && (r?.contains(t) || i?.contains(t)) || b() || (t === null ? requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (!d.current.active || d.current.status === "ending" || d.current.status === "starting") return;
					let e = F(i?.ownerDocument);
					e && (r?.contains(e) || i?.contains(e)) || T("blur");
				});
			}) : T("blur"));
		}
	};
	function ae(e) {
		r = e;
	}
	function oe(e) {
		!e && i && d.current.active && Mt(i), a?.abort(), a = null, i = e, e && (a = new AbortController(), h(e, "toggle", ne, { signal: a.signal }), d.current.active && jt(e));
	}
	return {
		input: d,
		triggerProps: re,
		popupProps: ie,
		get triggerElement() {
			return r;
		},
		setTriggerElement: ae,
		setPopupElement: oe,
		open: E,
		close: D,
		syncOpen: ee,
		destroy: u.destroy
	};
}
// node_modules/@videojs/core/dist/default/core/ui/menu/item.js
var ja = {
	item: "data-item",
	highlighted: "data-highlighted"
}, Ma = {
	sideOffset: "--media-popover-side-offset",
	alignOffset: "--media-popover-align-offset",
	boundaryOffset: "--media-popover-boundary-offset",
	anchorWidth: "--media-popover-anchor-width",
	anchorHeight: "--media-popover-anchor-height",
	width: "--media-menu-width",
	height: "--media-menu-height",
	availableWidth: "--media-menu-available-width",
	availableHeight: "--media-menu-available-height"
}, Na = {
	sideOffset: "--media-popover-side-offset",
	alignOffset: "--media-popover-align-offset",
	boundaryOffset: "--media-popover-boundary-offset",
	anchorWidth: "--media-popover-anchor-width",
	anchorHeight: "--media-popover-anchor-height",
	availableWidth: "--media-popover-available-width",
	availableHeight: "--media-popover-available-height"
};
// node_modules/@videojs/core/dist/default/dom/ui/menu/menu.js
function Pa(e) {
	let { key: t } = e;
	return t === "ArrowDown" || t === "ArrowUp" || t === "ArrowLeft" || t === "ArrowRight" || t === "Home" || t === "End" || t === "Enter" || t === " " || t === "Escape" || t.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey;
}
function Fa(e, t) {
	return !e || !t ? null : {
		side: e,
		align: t
	};
}
var Ia = {
	...Na,
	availableWidth: Ma.availableWidth,
	availableHeight: Ma.availableHeight
}, La = /* @__PURE__ */ new WeakMap();
function Ra(e) {
	e.close();
}
function za(e) {
	let t = [], n = null, r = null, i = null, a = null, o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map(), c = "", l = null, u = null, d = 0, f = null, p;
	function m(e) {
		let t = e.getAttribute("data-availability");
		return !!(e.hidden || e.hasAttribute("data-hidden") || e.getAttribute("aria-hidden") === "true" || t === "unavailable" || t === "unsupported");
	}
	function h() {
		return t.filter((e) => !m(e));
	}
	function g(e) {
		if (t.length === 0) return null;
		let r = n ? t.indexOf(n) : e === 1 ? -1 : 0;
		for (let n = 1; n <= t.length; n++) {
			let i = (r + e * n + t.length) % t.length, a = t[i];
			if (a && !m(a)) return a;
		}
		return null;
	}
	function _(t, r) {
		if (!t && d && (cancelAnimationFrame(d), d = 0), t && m(t)) {
			t === n && _(g(1), r);
			return;
		}
		if (n === t) {
			t?.setAttribute(ja.highlighted, r?.pointer === !0 ? "pointer" : "");
			return;
		}
		let i = n;
		i && (i.tabIndex = -1), n = t, t ? (t.tabIndex = 0, t.setAttribute(ja.highlighted, r?.pointer === !0 ? "pointer" : ""), i && ie(t, i) < 0 && r?.pointer && Ta(t.parentElement), i?.removeAttribute(ja.highlighted), r?.focus !== !1 && (r?.preventScroll ? t.focus({ preventScroll: !0 }) : t.focus())) : i?.removeAttribute(ja.highlighted), e.onHighlightChange?.(t);
	}
	function v() {
		n && (n.tabIndex = -1, n.removeAttribute(ja.highlighted), n = null, e.onHighlightChange?.(null));
	}
	function y(e) {
		_(h()[0] ?? null, e);
	}
	function b(e) {
		_(S(), e);
	}
	function x(e) {
		f !== "imperative-action" && f !== "group-open" && f !== "blur" && f !== "outside-click" && (e ? r?.focus(e) : r?.focus());
	}
	function S() {
		let e = h();
		return e.find((e) => e.matches("[role=\"menuitemradio\"][aria-checked=\"true\"], [aria-selected=\"true\"]")) ?? e[0] ?? null;
	}
	function C() {
		l !== null && (clearTimeout(l), l = null), c = "";
	}
	function w() {
		cancelAnimationFrame(d), d = requestAnimationFrame(() => {
			d = 0, E.input.current.active && E.input.current.status !== "ending" && !n && _(S(), { preventScroll: !0 });
		});
	}
	function T(e) {
		c = c.length === 1 && c.toLowerCase() === e.toLowerCase() ? e : c + e, l !== null && clearTimeout(l), l = setTimeout(C, 500);
		let t = h(), r = (n ? t.indexOf(n) : -1) + 1, i = [...t.slice(r), ...t.slice(0, r)], a = c.toLowerCase(), o = i.find((e) => (e.textContent?.trim().toLowerCase() ?? "").startsWith(a));
		o && _(o);
	}
	let E = Aa({
		transition: e.transition,
		deferOpenChanges: !0,
		onOpenChange(t, n) {
			f = t ? null : n.reason, e.onOpenChange(t, n), t ? w() : (v(), C());
		},
		onOpenChangeComplete(t) {
			if (e.onOpenChangeComplete?.(t), !t && i) {
				let e = F(i.ownerDocument);
				(!(e instanceof Element) || e === i.ownerDocument.body || Bt(i, e)) && x();
			}
		},
		closeOnEscape: e.closeOnEscape,
		closeOnOutsideClick: e.closeOnOutsideClick,
		...e.group ? { group: e.group } : {}
	}), D = {
		onFocusOut(e) {
			e.relatedTarget === null && O() ? u = e : E.popupProps.onFocusOut(e);
		},
		onKeyDown(e) {
			let { key: t } = e, r = h();
			if (t !== "Escape" && Pa(e) && !e.defaultPrevented && e.preventDefault(), r.length !== 0) switch (t) {
				case "ArrowDown":
					e.preventDefault(), _(g(1));
					break;
				case "ArrowUp":
					e.preventDefault(), _(g(-1));
					break;
				case "Home":
					e.preventDefault(), _(r[0] ?? null);
					break;
				case "End":
					e.preventDefault(), _(r[r.length - 1] ?? null);
					break;
				case "Enter":
				case " ":
					e.preventDefault(), n && r.includes(n) && n.click();
					break;
				default: t.length !== 1 || e.ctrlKey || e.altKey || e.metaKey || T(t);
			}
		}
	};
	function ee(e) {
		let t = E.input.current;
		t.active && t.status !== "ending" && e.key !== "Escape" && Pa(e) && (D.onKeyDown(e), e.stopPropagation());
	}
	function te(e) {
		r = e, E.setTriggerElement(e);
	}
	function ne(e) {
		i = e;
	}
	function re(e) {
		a = e, E.setPopupElement(e);
	}
	function ie(e, t) {
		if (e === t) return 0;
		let n = e.compareDocumentPosition(t);
		return n & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
	}
	function ae(e) {
		let r = () => _(e, { focus: !1 });
		return e.tabIndex = -1, e.setAttribute(ja.item, ""), e.addEventListener("focus", r), t.push(e), t.sort(ie), E.input.current.active && E.input.current.status !== "ending" && !n && w(), () => {
			e.removeEventListener("focus", r);
			let i = t.indexOf(e);
			i !== -1 && t.splice(i, 1), n === e && v();
		};
	}
	function oe(e) {
		o.add(e), La.set(e, p);
		let t = e.input.subscribe(se);
		return s.set(e, t), () => {
			o.delete(e), La.get(e) === p && La.delete(e), s.get(e)?.(), s.delete(e), se();
		};
	}
	function O() {
		return [...o].some(({ input: e }) => e.current.status === "ending");
	}
	function se() {
		if (!u || O()) return;
		let e = u;
		u = null, E.popupProps.onFocusOut(e);
	}
	function ce(e) {
		if (e) La.get(p)?.highlight(null);
		else for (let e of o) e.close("imperative-action");
		E.syncOpen(e);
	}
	function le() {
		cancelAnimationFrame(d), d = 0, C();
		for (let e of s.values()) e();
		for (let e of o) La.get(e) === p && La.delete(e);
		s.clear(), o.clear(), La.delete(p), u = null, E.destroy();
	}
	return p = {
		input: E.input,
		triggerProps: {
			onClick: E.triggerProps.onClick,
			onKeyDown: ee
		},
		contentProps: D,
		get triggerElement() {
			return r;
		},
		get contentElement() {
			return i;
		},
		get popupElement() {
			return a;
		},
		setTriggerElement: te,
		setContentElement: ne,
		setPopupElement: re,
		registerItem: ae,
		registerSubmenu: oe,
		highlight: _,
		highlightFirstItem: y,
		highlightInitialItem: b,
		restoreFocus: x,
		open: E.open,
		close: E.close,
		syncOpen: ce,
		destroy: le
	}, p;
}
// node_modules/@videojs/core/dist/default/core/ui/menu/data.js
var Ba = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	...pa
}, Va = {
	open: "data-open",
	isSubmenu: "data-submenu",
	childOpen: "data-child-open",
	...pa
};
({
	...Ba,
	...Va
});
// node_modules/@videojs/core/dist/default/dom/ui/menu/popup.js
function Ha() {
	let e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Map(), n = null, r = 0;
	function i() {
		cancelAnimationFrame(r), g(), r = requestAnimationFrame(g);
	}
	function a(t) {
		return [...e].filter((e) => e.parent === t);
	}
	function o(e) {
		return a(e).find(({ menu: e }) => {
			let t = e.input.current;
			return t.active && t.status !== "ending";
		}) ?? null;
	}
	function s(e) {
		return a(e).find(({ menu: e }) => {
			let t = e.input.current;
			return t.active && t.status === "ending";
		}) ?? null;
	}
	function c(e) {
		cancelAnimationFrame(t.get(e) ?? 0), t.delete(e);
	}
	function l(n) {
		if (t.has(n)) return;
		let r = requestAnimationFrame(() => {
			t.set(n, requestAnimationFrame(() => {
				t.delete(n), e.has(n) && !o(n.menu) && (n.element.removeAttribute(Va.childOpen), g());
			}));
		});
		t.set(n, r);
	}
	function u() {
		let n = [...e].find((e) => e.parent === null) ?? null;
		for (; n;) {
			let e = o(n.menu) ?? (t.has(n) ? s(n.menu) : null);
			if (!e) return n;
			n = e;
		}
		return null;
	}
	function d(e, t) {
		t ? (e.element.setAttribute("aria-hidden", "true"), e.element.setAttribute("inert", "")) : oe(e.element, e.accessibility);
	}
	function f(e) {
		let t = () => {
			let t = F(e.element.ownerDocument);
			return t instanceof Element && Bt(e.element, t);
		};
		if (!t()) return;
		e.menu.restoreFocus();
		let n = e.parent?.input.current;
		t() && n?.active && n.status !== "ending" && e.menu.triggerElement?.focus();
		let r = F(e.element.ownerDocument);
		t() && r instanceof HTMLElement && r.blur();
	}
	function p(e) {
		return Ge(e, (e) => {
			let t = ft(e, Ma.availableWidth);
			return t !== null && t > 0 ? t : void 0;
		}) ?? null;
	}
	function m(e) {
		if (e.scrollHeight <= e.clientHeight) return 0;
		let t = getComputedStyle(e), n = (Number.parseFloat(t.borderInlineStartWidth) || 0) + (Number.parseFloat(t.borderInlineEndWidth) || 0);
		return Math.max(0, e.offsetWidth - e.clientWidth - n);
	}
	function h(e, t) {
		let n = Fe(e, (e) => e instanceof HTMLElement && !e.hidden);
		return n.length === 0 ? gt(e, {
			overflow: "both",
			styles: {
				width: "max-content",
				height: "auto",
				minWidth: "0px",
				maxWidth: "none"
			}
		}) : St(e, {
			children: n,
			includePadding: !0,
			maxWidth: t,
			measure: (e, t) => gt(e, {
				overflow: "both",
				styles: {
					insetInlineStart: "0px",
					insetInlineEnd: "auto",
					width: t === void 0 ? "max-content" : `${t}px`,
					height: "auto",
					minWidth: "0px",
					maxWidth: "none"
				}
			})
		});
	}
	function g() {
		if (!n) return;
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let e = o(n.menu);
			e ? (c(n), n.menu.highlight(null), n.element.setAttribute(Va.childOpen, "")) : s(n.menu) && n.element.hasAttribute(Va.childOpen) ? l(n) : (c(n), n.element.removeAttribute(Va.childOpen));
			let r = n.menu.input.current, i = n.parent !== null && r.active && r.status === "ending";
			t.set(n, e !== null || i), d(n, !1);
		}
		for (let [e, n] of t) {
			let t = e.menu.input.current;
			e.parent !== null && t.active && t.status === "ending" && f(e), d(e, n);
		}
		let r = u();
		if (!r) return;
		let i = r.parent === null ? _t(n) : null, a = i ? vt(i) : 0, g = i ? yt(i) : 0, _ = p(n), v = _ === null ? null : Math.max(0, _ - a), y = h(r.element, v), b = Math.ceil(y.width + a), x = Math.ceil(y.height + g);
		n.style.setProperty(Ma.width, `${b}px`), n.style.setProperty(Ma.height, `${x}px`);
		let S = m(r.element);
		S > 0 && n.style.setProperty(Ma.width, `${b + S}px`);
	}
	function _(e) {
		n = e, i();
	}
	function v(t) {
		let n = {
			...t,
			accessibility: ae(t.element, ["aria-hidden", "inert"]),
			stopObserving: () => {},
			unsubscribe: () => {}
		};
		return n.unsubscribe = t.menu.input.subscribe(i), n.stopObserving = Tt({
			root: t.element,
			getElements: () => [t.element],
			mutations: {
				childList: !0,
				subtree: !0,
				characterData: !0
			},
			onChange: i
		}), e.add(n), t.menu.setContentElement(t.element), i(), () => {
			c(n), e.delete(n), n.unsubscribe(), n.stopObserving(), oe(t.element, n.accessibility), t.element.removeAttribute(Va.childOpen), t.menu.contentElement === t.element && t.menu.setContentElement(null), i();
		};
	}
	function y() {
		cancelAnimationFrame(r);
		for (let e of t.values()) cancelAnimationFrame(e);
		t.clear();
		for (let t of e) t.unsubscribe(), t.stopObserving(), oe(t.element, t.accessibility), t.element.removeAttribute(Va.childOpen), t.menu.contentElement === t.element && t.menu.setContentElement(null);
		e.clear(), n = null;
	}
	return {
		get element() {
			return n;
		},
		setElement: _,
		registerContent: v,
		sync: g,
		destroy: y
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/group.js
function Ua() {
	let e = null, t = /* @__PURE__ */ new Set();
	function n() {
		for (let e of t) e();
	}
	return {
		open(t) {
			if (e === t) return;
			let r = e;
			e = t, r?.close("group-open"), n();
		},
		close(t) {
			e === t && (e = null, n());
		},
		isOpenFor(t) {
			return t !== null && e?.triggerElement === t;
		},
		subscribe(e) {
			return t.add(e), () => t.delete(e);
		}
	};
}
// node_modules/@videojs/core/dist/default/dom/utils/event.js
function Wa(e, t) {
	if (!t) return !1;
	if (r(e.composedPath)) return e.composedPath().includes(t);
	let n = e.target;
	return n instanceof Node && t.contains(n);
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/positioning.js
var Ga = {
	sideOffset: 0,
	alignOffset: 0,
	boundaryOffset: 0
}, Ka = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function qa(e) {
	return `${z(e, 0, Infinity)}px`;
}
function Ja(e, t, n, r) {
	let i = n - r;
	return i < t ? t : z(e, t, i);
}
function Ya({ align: e, direction: t = "ltr" }) {
	return t === "rtl" ? e === "start" ? "end" : e === "end" ? "start" : e : e;
}
function Xa(e, t, n, r, i, a, o, s, c, l) {
	let u = a === "start" ? e + o : a === "end" ? t + o : e + n / 2 + o, d = c === "horizontal" ? "left" : "top", f = Ka[d], p = a === "start" ? d : a === "end" ? f : "center", m = a === "start" ? "0px" : a === "end" ? "-100%" : "-50%";
	return {
		base: `calc(anchor(${p}) + ${l})`,
		translate: `clamp(${r + s - u}px, ${m}, calc(${i - s - u}px - 100%))`
	};
}
function Za(e, t, n, r, i, a, o = Na) {
	if (Xe()) return {
		...Qa(e, t, o, n, i, a),
		...n && i ? $a(n, i, t, a, o) : {}
	};
	if (n && r) {
		let e = a ?? Ga;
		return {
			position: "fixed",
			margin: "0",
			...eo(n, r, t, e, i),
			...i ? $a(n, i, t, e, o) : {}
		};
	}
	return {};
}
function Qa(e, t, n = Na, r, i, a = Ga) {
	let o = `var(${n.sideOffset}, 0px)`, s = `var(${n.alignOffset}, 0px)`, { side: c, align: l } = t, u = a.boundaryOffset ?? 0, d = {
		positionAnchor: `--${e}`,
		position: "fixed",
		inset: "auto",
		margin: "0",
		justifySelf: "normal",
		alignSelf: "normal",
		marginInlineStart: "0",
		marginBlockStart: "0",
		translate: "none"
	}, f = Ka[c];
	if (c === "top" || c === "bottom") {
		let e = Ya(t);
		if (d[f] = `calc(anchor(${c}) + ${o})`, r && i) {
			let { base: t, translate: n } = Xa(r.left, r.right, r.width, i.left, i.right, e, a.alignOffset, u, "horizontal", s);
			return d.left = t, d.translate = `${n} 0`, d;
		}
		e === "start" ? d.left = `calc(anchor(left) + ${s})` : e === "end" ? d.right = `calc(anchor(right) + ${s})` : (d.justifySelf = "anchor-center", d.marginInlineStart = s);
	} else {
		if (d[f] = `calc(anchor(${c}) + ${o})`, r && i) {
			let { base: e, translate: t } = Xa(r.top, r.bottom, r.height, i.top, i.bottom, l, a.alignOffset, u, "vertical", s);
			return d.top = e, d.translate = `0 ${t}`, d;
		}
		l === "start" ? d.top = `calc(anchor(top) + ${s})` : l === "end" ? d.bottom = `calc(anchor(bottom) + ${s})` : (d.alignSelf = "anchor-center", d.marginBlockStart = s);
	}
	return d;
}
function $a(e, t, n, r = Ga, i = Na) {
	let a = {}, { side: o } = n, s = r.boundaryOffset ?? 0, c = t.left + s, l = t.right - s, u = t.top + s, d = t.bottom - s;
	if (a[i.anchorWidth] = `${e.width}px`, a[i.anchorHeight] = `${e.height}px`, o === "top" || o === "bottom") {
		let t = o === "top" ? e.top - u : d - e.bottom;
		a[i.availableHeight] = qa(t - r.sideOffset), a[i.availableWidth] = qa(l - c);
	} else {
		let t = o === "left" ? e.left - c : l - e.right;
		a[i.availableWidth] = qa(t - r.sideOffset), a[i.availableHeight] = qa(d - u);
	}
	return a;
}
function eo(e, t, n, r = {
	sideOffset: 0,
	alignOffset: 0
}, i) {
	let { side: a, align: o } = n, { sideOffset: s, alignOffset: c } = r, l = 0, u, d = 0, f;
	if (a === "top" ? u = `calc(100% - ${e.top}px + ${s}px)` : a === "bottom" ? l = e.bottom + s : a === "left" ? f = `calc(100% - ${e.left}px + ${s}px)` : d = e.right + s, a === "top" || a === "bottom") {
		let r = Ya(n);
		d = r === "start" ? e.left + c : r === "end" ? e.right - t.width + c : e.left + (e.width - t.width) / 2 + c;
	} else l = o === "start" ? e.top + c : o === "end" ? e.bottom - t.height + c : e.top + (e.height - t.height) / 2 + c;
	if (i) {
		let e = r.boundaryOffset ?? 0;
		a === "top" || a === "bottom" ? d = Ja(d, i.left + e, i.right - e, t.width) : l = Ja(l, i.top + e, i.bottom - e, t.height);
	}
	return {
		top: a === "top" ? "auto" : `${l}px`,
		bottom: u ?? "auto",
		left: a === "left" ? "auto" : `${d}px`,
		right: f ?? "auto"
	};
}
function to(e, t = Na) {
	let n = getComputedStyle(e);
	return {
		sideOffset: pt(e, n.getPropertyValue(t.sideOffset)),
		alignOffset: pt(e, n.getPropertyValue(t.alignOffset)),
		boundaryOffset: pt(e, n.getPropertyValue(t.boundaryOffset))
	};
}
function no(e, t) {
	let n = e.getBoundingClientRect(), r = mt(e, {
		box: "layout",
		overflow: t === "left" || t === "right" ? "width" : "height"
	});
	return Ea(n.left, n.top, r.width, r.height);
}
function ro(e) {
	let t = e.parentNode;
	if (ao(e) || !t) return {
		x: 0,
		y: 0
	};
	let n = e.ownerDocument.createElement("div");
	n.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;margin:0;padding:0;border:0;visibility:hidden;pointer-events:none", t.insertBefore(n, e);
	let r = n.getBoundingClientRect();
	return n.remove(), {
		x: r.left,
		y: r.top
	};
}
function io(e, t) {
	return Ea(e.left - t.x, e.top - t.y, e.width, e.height);
}
function ao(e) {
	return e.hasAttribute("popover") && Ze();
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/positioner.js
var oo = [
	"position",
	"inset",
	"margin",
	"margin-top",
	"margin-right",
	"margin-bottom",
	"margin-left",
	"justify-self",
	"align-self",
	"margin-inline-start",
	"margin-block-start",
	"translate",
	"top",
	"right",
	"bottom",
	"left"
], so = class {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = !1;
	#o = null;
	#s = null;
	#c = Ft(() => this.#f());
	sync(e) {
		let { anchorName: t, position: n, trigger: r, popup: i, boundary: a, container: o, cssVars: s = Na } = e;
		if (!n || !r || !i) {
			this.cleanup();
			return;
		}
		let c = ka(a, {
			container: o ?? null,
			root: i.getRootNode()
		}), l = this.#e;
		!l || l.anchorName !== t || l.trigger !== r || l.popup !== i || (l.cssVars ?? Na) !== s || l.trackResize !== e.trackResize || this.#t !== c ? (l?.popup && this.#m(l.popup), this.#u(), this.#e = {
			...e,
			cssVars: s
		}, this.#t = c, this.#l()) : this.#e = {
			...e,
			cssVars: s
		}, this.#f();
	}
	cleanup() {
		this.#e && (this.#e.popup && this.#m(this.#e.popup), this.#u(), this.#e = null, this.#t = null);
	}
	#l() {
		let e = this.#e;
		if (!e?.trigger || !e.popup) return;
		this.#h(e.trigger, e.popup, e.anchorName), this.#n = new AbortController();
		let { signal: t } = this.#n;
		window.addEventListener("scroll", this.#d, {
			capture: !0,
			passive: !0,
			signal: t
		}), window.addEventListener("resize", this.#d, { signal: t });
		let n = [e.trigger];
		e.trackResize !== !1 && n.push(e.popup), this.#t && n.push(this.#t), this.#r = wt(n, () => this.#d());
	}
	#u() {
		this.#n?.abort(), this.#n = null, this.#r?.(), this.#r = null, this.#c.cancel(), this.#g();
	}
	#d = (e) => {
		let t = this.#e?.popup;
		!t || e && Wa(e, t) || this.#c();
	};
	#f() {
		let e = this.#e;
		if (!e?.position || !e.trigger || !e.popup) return;
		let t = e.trigger, n = Xe(), r = n ? {
			x: 0,
			y: 0
		} : ro(e.popup), i = io(t.getBoundingClientRect(), r), a = io(Oa(this.#t), r), o = to(e.popup, e.cssVars), s = e.position, c = () => io(no(e.popup, s.side), r), l = (r) => {
			let c = At(i, r, a, s, o), { positionAnchor: l, ...u } = Za(e.anchorName, {
				...s,
				side: c,
				direction: ze(t) ? "rtl" : "ltr"
			}, i, n ? void 0 : r, a, o, e.cssVars);
			return {
				popupRect: r,
				side: c,
				style: u
			};
		}, u = l(c());
		if (this.#p(e.popup, e.cssVars ?? Na), I(e.popup, u.style), e.onSideChange?.(u.side), n || !e.onSideChange) return;
		let d = c();
		if (d.width === u.popupRect.width && d.height === u.popupRect.height) return;
		let f = l(d);
		I(e.popup, f.style), f.side !== u.side && e.onSideChange(f.side);
	}
	#p(e, t) {
		if (this.#s) return;
		let n = [
			...oo,
			t.anchorWidth,
			t.anchorHeight,
			t.availableWidth,
			t.availableHeight
		];
		this.#s = lt(e, n);
	}
	#m(e) {
		this.#s &&= (ut(e, this.#s), null);
	}
	#h(e, t, n) {
		if (!Xe()) return;
		let r = `--${n}`, i = this.#_(e, "anchor-name");
		this.#o = this.#_(t, "position-anchor");
		let a = ct(e);
		this.#i = r, this.#a = !a.includes(r), this.#a && a.push(r), e.style.setProperty("anchor-name", a.join(", "), i.priority), t.style.setProperty("position-anchor", r);
	}
	#g() {
		let e = this.#e;
		if (e?.trigger && e.popup) {
			if (this.#i && this.#a) {
				let t = this.#_(e.trigger, "anchor-name"), n = ct(e.trigger).filter((e) => e !== this.#i);
				this.#v(e.trigger, "anchor-name", {
					value: n.join(", "),
					priority: t.priority
				});
			}
			this.#o && this.#v(e.popup, "position-anchor", this.#o), this.#i = null, this.#a = !1, this.#o = null;
		}
	}
	#_(e, t) {
		let n = t.startsWith("--") ? t : b(t);
		return {
			value: e.style.getPropertyValue(n),
			priority: e.style.getPropertyPriority(n)
		};
	}
	#v(e, t, n) {
		let r = t.startsWith("--") ? t : b(t);
		n.value ? e.style.setProperty(r, n.value, n.priority) : e.style.removeProperty(r);
	}
};
// node_modules/@videojs/core/dist/default/dom/utils/pointer.js
function co(e, t, n) {
	let r;
	return r = n === "vertical" ? 1 - (e.clientY - t.top) / t.height : (e.clientX - t.left) / t.width, Number.isFinite(r) ? z(r * 100, 0, 100) : 0;
}
// node_modules/@videojs/core/dist/default/dom/ui/slider/slider.js
var lo = 3;
function uo(e) {
	let t = N({
		pointerPercent: 0,
		dragPercent: 0,
		dragging: !1,
		pointing: !1,
		focused: !1
	}), n = new AbortController(), r = e.changeThrottle ?? 0, i = !1, a = null, o = null, s = 0, c = 0, l = 0, u = null, d = !1, f = !1, p = r > 0 ? fe((t) => e.onValueChange?.(t), r, { leading: !0 }) : null;
	function m(t, n) {
		n && p ? p(t) : e.onValueChange?.(t);
	}
	function h() {
		if (C(o)) return;
		let t = o;
		o = null;
		try {
			e.getElement().releasePointerCapture(t);
		} catch {}
	}
	function g() {
		if (!i) return;
		let n = d && f, r = t.current.dragging;
		d || e.onValueCommit?.(l), i = !1, t.patch({
			dragging: !1,
			pointing: n
		}), r && e.onDragEnd?.(), e.onPressEnd?.(), d = !1, f = !1, _();
	}
	function _() {
		p?.cancel(), o = null, a = null;
	}
	let v = {
		onPointerDown(n) {
			if (e.isDisabled()) return;
			n.stopPropagation(), n.preventDefault();
			let r = e.getElement();
			a = r.getBoundingClientRect(), d = !1, f = !1, h(), o = n.pointerId, r.setPointerCapture(n.pointerId);
			let p = co(n, a, e.getOrientation());
			i = !0, s = n.clientX, c = n.clientY, l = p, u = p, t.patch({
				pointing: !0,
				pointerPercent: p,
				dragPercent: p
			}), e.onPressStart?.(), e.onValueChange?.(p), e.getThumbElement?.()?.focus({
				preventScroll: !0,
				focusVisible: !1
			});
		},
		onPointerMove(n) {
			if (e.isDisabled()) return;
			if (!C(o)) {
				if (n.pointerType !== "touch" && n.buttons === 0) {
					g();
					return;
				}
				let r = co(n, a, e.getOrientation()), i = !t.current.dragging;
				if (i && Math.hypot(n.clientX - s, n.clientY - c) < lo) return;
				l = r, u = r, t.patch({
					dragging: !0,
					dragPercent: r,
					pointerPercent: r
				}), i && e.onDragStart?.(), m(r, !0);
				return;
			}
			let r = co(n, e.getElement().getBoundingClientRect(), e.getOrientation());
			t.patch({
				pointing: !0,
				pointerPercent: r
			});
		},
		onPointerUp(t) {
			if (e.isDisabled() || (t.stopPropagation(), C(o))) return;
			let n = co(t, a, e.getOrientation());
			f = t.pointerType !== "touch" && ht(e.getElement(), t), p?.cancel(), e.onValueChange?.(n), e.onValueCommit?.(n), d = !0;
		},
		onPointerLeave() {
			C(o) && t.patch({ pointing: !1 });
		},
		onLostPointerCapture() {
			g();
		}
	}, y = {
		onKeyDownCapture(n) {
			if (e.isDisabled()) {
				n.key !== "Tab" && n.preventDefault();
				return;
			}
			let r = e.getStepPercent(), i = e.getLargeStepPercent(), a = Mr(n.repeat && !C(u) ? u : e.getPercent(), r, 0), o = n.shiftKey ? i : r, s = null;
			switch (n.key) {
				case "ArrowRight":
					s = a + o;
					break;
				case "ArrowLeft":
					s = a - o;
					break;
				case "ArrowUp":
					s = a + o;
					break;
				case "ArrowDown":
					s = a - o;
					break;
				case "PageUp":
					s = a + i;
					break;
				case "PageDown":
					s = a - i;
					break;
				case "Home":
					s = 0;
					break;
				case "End": s = 100;
			}
			s !== null && (n.preventDefault(), s = z(s, 0, 100), u = s, t.patch({
				pointerPercent: s,
				dragPercent: s,
				pointing: !1
			}), e.onValueChange?.(s), e.onValueCommit?.(s));
		},
		onFocus() {
			t.patch({ focused: !0 });
		},
		onBlur() {
			t.patch({ focused: !1 });
		}
	};
	function b(t) {
		if (!e.adjustPercent || t.thumbAlignment !== "edge") return t;
		let n = e.getElement(), r = e.getThumbElement?.();
		if (!r) return t;
		let i = t.orientation === "horizontal", a = i ? r.offsetWidth : r.offsetHeight, o = i ? n.offsetWidth : n.offsetHeight;
		return {
			...t,
			fillPercent: e.adjustPercent(t.fillPercent, a, o),
			pointerPercent: e.adjustPercent(t.pointerPercent, a, o)
		};
	}
	let x = null;
	return e.onResize && (x = wt(e.getElement(), () => e.onResize())), {
		input: t,
		rootProps: v,
		rootStyle: {
			touchAction: "none",
			userSelect: "none"
		},
		thumbProps: y,
		adjustForAlignment: b,
		destroy() {
			n.signal.aborted || (n.abort(), x?.(), h(), _());
		}
	};
}
// node_modules/@videojs/core/dist/default/core/ui/slider/vars.js
var fo = {
	fill: "--media-slider-fill",
	pointer: "--media-slider-pointer",
	buffer: "--media-slider-buffer"
};
// node_modules/@videojs/core/dist/default/dom/ui/slider/css-vars.js
function po(e) {
	return {
		[fo.fill]: `${e.fillPercent.toFixed(3)}%`,
		[fo.pointer]: `${e.pointerPercent.toFixed(3)}%`
	};
}
function mo(e) {
	return {
		...po(e),
		[fo.buffer]: `${e.bufferPercent.toFixed(3)}%`
	};
}
function ho(e, t) {
	let n = e / 2;
	return {
		position: "absolute",
		left: t === "visible" ? `calc(var(${fo.pointer}) - ${n}px)` : `min(max(0px, calc(var(${fo.pointer}) - ${n}px)), calc(100% - ${e}px))`,
		width: "max-content",
		pointerEvents: "none"
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/slider/focus.js
function go(e = document) {
	let t = F(He(e) ? e : e.ownerDocument);
	return t?.getAttribute("role") === "slider" ? He(e) || Bt(e, t) : !1;
}
// node_modules/@videojs/core/dist/default/dom/ui/time-slider/seek.js
function _o(e) {
	let t = N({ percent: void 0 }), n, r = !1, i = null;
	function a() {
		let o = i?.getAnimations?.().some((t) => "transitionProperty" in t && t.transitionProperty === e && t.playState !== "finished");
		r || o ? n = Pe(a) : (n = void 0, t.patch({ percent: void 0 }));
	}
	function o(e) {
		n?.(), t.patch({ percent: e }), n = Pe(a);
	}
	return {
		state: t,
		seek: o,
		update(e, n, a) {
			i = a, e && !r && t.current.percent === void 0 && o(n), r = e;
		},
		destroy() {
			n?.(), n = void 0, r = !1, i = null, t.patch({ percent: void 0 });
		}
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/status-announcer.js
function vo(e, t) {
	let n = !0, r = !1, i = e.target, a = 0, o = () => {
		i = e.target, r = !0;
		let o = ++a;
		t.resetSnapshot(), queueMicrotask(() => {
			n && o === a && (r = !1, i = e.target, i && t.processSnapshot(xa(e)));
		});
	}, s = e.subscribe(() => {
		let n = e.target;
		n === i ? n && !r && t.processSnapshot(xa(e)) : o();
	});
	return o(), () => {
		n = !1, s();
	};
}
function yo(e) {
	return !e || !go(e);
}
// node_modules/@videojs/utils/dist/array/find-last-at-or-before.js
function bo(e, t, n) {
	let r = 0, i = e.length - 1, a = -1;
	for (; r <= i;) {
		let o = r + i >>> 1;
		n(e[o]) <= t ? (a = o, r = o + 1) : i = o - 1;
	}
	return a;
}
function xo(e, t, n) {
	let r = bo(e, t, n);
	return r < 0 ? void 0 : e[r];
}
// node_modules/@videojs/utils/dist/array/find-range-at.js
function So(e, t, n, r) {
	let i = bo(e, t, n);
	if (i < 0) return;
	let a = e[i], o = r(a), s = i === e.length - 1;
	return t < o || s && t === o ? a : void 0;
}
// node_modules/@videojs/core/dist/default/core/ui/thumbnail/core.js
var Co = class {
	findActiveThumbnail(e, t) {
		return xo(e, t, (e) => e.startTime);
	}
	parseConstraints(e) {
		let t = parseFloat(e.minWidth), n = parseFloat(e.maxWidth), r = parseFloat(e.minHeight), i = parseFloat(e.maxHeight);
		return {
			minWidth: Number.isFinite(t) ? t : 0,
			maxWidth: Number.isFinite(n) ? n : Infinity,
			minHeight: Number.isFinite(r) ? r : 0,
			maxHeight: Number.isFinite(i) ? i : Infinity
		};
	}
	calculateScale(e, t, n) {
		let { minWidth: r, maxWidth: i, minHeight: a, maxHeight: o } = n, s = Math.min(i / e, o / t), c = Math.max(r / e, a / t), l = Number.isFinite(s) ? s : 1;
		return Number.isFinite(c) && c > l ? c : l;
	}
	resize(e, t, n, r) {
		let i = e.width ?? t, a = e.height ?? n;
		if (!i || !a) return;
		let o = this.calculateScale(i, a, r), s = e.coords?.x ?? 0, c = e.coords?.y ?? 0, l = o === 1 ? 0 : 1;
		return {
			scale: o,
			containerWidth: Math.max(0, Math.floor(i * o) - l * 2),
			containerHeight: Math.max(0, Math.floor(a * o) - l * 2),
			imageWidth: Math.ceil(t * o),
			imageHeight: Math.ceil(n * o),
			offsetX: Math.ceil(s * o) + l,
			offsetY: Math.ceil(c * o) + l
		};
	}
	resolveCrossOrigin(e, t) {
		if (!C(e)) return a(e) ? t ?? void 0 : e;
	}
	getState(e, t, n) {
		return {
			loading: e,
			error: t,
			hidden: !e && !n
		};
	}
	getAttrs(e) {
		return {
			dir: "ltr",
			role: "img",
			"aria-hidden": "true"
		};
	}
};
// node_modules/@videojs/core/dist/default/dom/ui/thumbnail.js
function wo(e) {
	let { getContainer: t, getImg: n, onStateChange: r } = e, i = new Co(), a = !1, o = !1, s = 0, c = 0, l = "", u = null, d = null, f = null, p = null, m = /* @__PURE__ */ new Set();
	function g() {
		let e = n();
		e && (s = e.naturalWidth, c = e.naturalHeight), m.delete(l), a = !1, o = !1, r();
	}
	function _() {
		m.add(l), a = !1, o = !0;
	}
	function v() {
		_(), r();
	}
	function y(e) {
		f = new AbortController(), h(e, "load", g, { signal: f.signal }), h(e, "error", v, { signal: f.signal });
	}
	function b() {
		let e = n();
		if (e !== u && (f?.abort(), f = null, u = e, d = null, e && y(e)), !p) {
			let e = t();
			e && (p = wt(e, r));
		}
	}
	function x(e) {
		b();
		let t = e ?? "";
		if (t !== l) {
			if (l = t, t) {
				let e = m.has(t);
				a = !e, o = e;
			} else a = !1, o = !1, s = 0, c = 0;
		}
	}
	function S() {
		b();
		let e = n();
		if (!e || e === d || (d = e, !e.complete || !l)) return;
		let t = {
			loading: a,
			error: o,
			naturalWidth: s,
			naturalHeight: c
		};
		e.naturalWidth > 0 ? (s = e.naturalWidth, c = e.naturalHeight, a = !1, o = !1) : _(), (t.loading !== a || t.error !== o || t.naturalWidth !== s || t.naturalHeight !== c) && r();
	}
	function C(e) {
		e === u && (f?.abort(), f = null, u = null, d = null);
	}
	function w() {
		f?.abort(), f = null, u = null, d = null, p?.(), p = null;
	}
	return {
		get loading() {
			return a;
		},
		get error() {
			return o;
		},
		get naturalWidth() {
			return s;
		},
		get naturalHeight() {
			return c;
		},
		readConstraints() {
			let e = t();
			return e ? i.parseConstraints(getComputedStyle(e)) : {
				minWidth: 0,
				maxWidth: Infinity,
				minHeight: 0,
				maxHeight: Infinity
			};
		},
		updateSrc: x,
		connect: S,
		disconnectImg: C,
		destroy: w
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/tooltip/tooltip.js
var To = {
	hover: "hover",
	focus: "focus",
	escape: "escape",
	blur: "blur",
	"imperative-action": "imperative-action"
};
function Eo(e) {
	let t = {
		transition: e.transition,
		onOpenChange(t, n) {
			let r = To[n.reason];
			if (!r) return;
			let i = e.group?.();
			t ? i?.notifyOpen() : i?.notifyClose();
			let a = n.event ? {
				reason: r,
				event: n.event
			} : { reason: r };
			e.onOpenChange(t, a);
		},
		closeOnEscape: () => !0,
		closeOnOutsideClick: () => !1,
		openOnHover: () => !0,
		delay: () => {
			let t = e.group?.();
			return t?.shouldSkipDelay() ? 0 : e.delay?.() ?? t?.delay ?? 600;
		},
		closeDelay: () => {
			let t = e.group?.();
			return e.closeDelay?.() ?? t?.closeDelay ?? 0;
		}
	};
	e.onOpenChangeComplete && (t.onOpenChangeComplete = e.onOpenChangeComplete);
	let n = Aa(t), r = !1, i, a;
	function o() {
		return i?.isOpenFor(n.triggerElement) ?? !1;
	}
	function s() {
		return e.sticky?.() ?? !1;
	}
	function c() {
		let t = e.popupGroup?.();
		t !== i && (a?.(), i = t, a = i?.subscribe(() => {
			o() && !s() && n.close("imperative-action");
		}));
	}
	function l(e) {
		n.setTriggerElement(e), c(), o() && !s() && n.close("imperative-action");
	}
	let { onClick: u, ...d } = n.triggerProps, f = {
		...d,
		onPointerDown() {
			c(), r = !0, s() || n.close("imperative-action");
		},
		onPointerEnter(t) {
			c(), e.disabled?.() || (!o() || s()) && t.pointerType !== "touch" && d.onPointerEnter(t);
		},
		onFocusIn(t) {
			c(), e.disabled?.() || (!o() || s()) && (r ? r = !1 : d.onFocusIn(t));
		}
	}, p = {
		...n.popupProps,
		onPointerEnter(t) {
			e.disableHoverablePopup?.() || n.popupProps.onPointerEnter(t);
		}
	};
	return {
		...n,
		triggerProps: f,
		popupProps: p,
		get triggerElement() {
			return n.triggerElement;
		},
		setTriggerElement: l,
		open: () => {
			c(), (!o() || s()) && n.open("hover");
		},
		close: (e = "hover") => n.close(e),
		destroy() {
			a?.(), n.destroy();
		}
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/transition.js
function Do() {
	let e = N({
		active: !1,
		status: "idle"
	}), t = !1, n = 0, r = 0, i = 0, a = null;
	function o() {
		cancelAnimationFrame(n), cancelAnimationFrame(r), n = 0, r = 0;
	}
	function s() {
		return i++, o(), a?.(), a = null, i;
	}
	function c(e) {
		if (e !== i) return;
		let t = a;
		a = null, t?.();
	}
	function l(o = null) {
		if (t) return Promise.resolve();
		let l = s(), u = e.current.active;
		return u && e.patch({ status: "idle" }), e.patch({
			active: !0,
			status: "starting"
		}), new Promise((s) => {
			a = s, n = requestAnimationFrame(() => {
				if (n = 0, u) {
					let e = Oo(o);
					Ao(e), ko(e);
				}
				r = requestAnimationFrame(() => {
					if (r = 0, t || l !== i || !e.current.active) return c(l);
					e.patch({ status: "idle" }), n = requestAnimationFrame(() => {
						if (n = 0, t || l !== i || !e.current.active) return c(l);
						jo(Oo(o)).finally(() => c(l));
					});
				});
			});
		});
	}
	function u(o) {
		if (t) return Promise.resolve();
		let l = s();
		return e.patch({ status: "ending" }), new Promise((s) => {
			a = s, n = requestAnimationFrame(() => {
				n = 0, r = requestAnimationFrame(() => {
					if (r = 0, t || l !== i) return c(l);
					jo(o).finally(() => {
						if (t || l !== i || e.current.status !== "ending") return c(l);
						e.patch({
							active: !1,
							status: "idle"
						}), c(l);
					});
				});
			});
		});
	}
	function d() {
		i++, o(), a?.(), a = null, e.current.status !== "idle" && e.patch({ status: "idle" });
	}
	return {
		state: e,
		open: l,
		close: u,
		cancel: d,
		destroy() {
			t || (t = !0, d());
		}
	};
}
function Oo(e) {
	return typeof e == "function" ? e() : e;
}
function ko(e) {
	e && e.offsetHeight;
}
function Ao(e) {
	let t = e?.getAnimations?.({ subtree: !0 }) ?? [];
	for (let e of t) e.cancel();
}
function jo(e) {
	if (!e) return Promise.resolve();
	let t = e.getAnimations?.() ?? [];
	return t.length === 0 ? Promise.resolve() : Promise.all(t.map((e) => e.finished)).then(M, M);
}
// node_modules/@videojs/core/dist/default/dom/ui/wheel-step.js
function Mo(e) {
	return { onWheel(t) {
		if (e.isDisabled()) return;
		let n = Math.sign(t.deltaY);
		if (n === 0) return;
		t.preventDefault();
		let r = e.getStepPercent(), i = z(e.getPercent() - n * r, 0, 100);
		e.onValueChange?.(i);
	} };
}
// node_modules/@videojs/core/dist/default/dom/utils/element-props.js
function U(e, t, n) {
	let i = n?.signal;
	for (let [n, o] of Object.entries(t)) if (r(o) && n.startsWith("on")) {
		let t = n.endsWith("Capture") && !n.endsWith("PointerCapture"), r = n.slice(2, t ? -7 : void 0).toLowerCase();
		h(e, r, o, i ? {
			capture: t,
			signal: i
		} : { capture: t });
	} else a(o) || o === !1 ? e.removeAttribute(n) : o === !0 ? e.setAttribute(n, "") : e.setAttribute(n, String(o));
}
// node_modules/@videojs/core/dist/default/dom/utils/state-data-attrs.js
function W(e, t, n) {
	for (let r in t) {
		if (n && !(r in n)) continue;
		let i = n?.[r] ?? No(r), a = t[r];
		a === !0 ? e.setAttribute(i, "") : a ? e.setAttribute(i, String(a)) : e.removeAttribute(i);
	}
}
function No(e) {
	return `data-${e.toLowerCase()}`;
}
// node_modules/@videojs/html/dist/default/player/element.js
function Po(e) {
	return Object.entries(e).map(([e, t]) => {
		let n = t.html?.attribute ?? b(e);
		return {
			property: T(n),
			attribute: n,
			entry: t
		};
	});
}
function Fo(e) {
	let t = Po(e.config);
	class n extends L {
		static {
			this.properties = {
				...L.properties,
				...Object.fromEntries(t.map(({ property: e, attribute: t }) => [e, {
					type: String,
					attribute: t
				}]))
			};
		}
		#e = e.factory();
		#t = null;
		#n = null;
		#r = !1;
		#i = null;
		#a = null;
		#o = null;
		#s = null;
		#c = [];
		#l = [];
		#u = new MutationObserver(() => this.#b());
		#d = new Cn(() => this.#T());
		#f = (e) => this.#d.register(e);
		#p = (e) => {
			let t = { value: e };
			return this.#c.push(t), this.#v(), () => {
				let e = this.#c.indexOf(t);
				e < 0 || (this.#c.splice(e, 1), this.#b(), this.#v());
			};
		};
		#m = (e) => {
			let t = { value: e };
			return this.#l.push(t), this.#y(), () => {
				let e = this.#l.indexOf(t);
				e < 0 || (this.#l.splice(e, 1), this.#y());
			};
		};
		#h = new k(this, {
			context: e.playerContext,
			initialValue: this.store
		});
		#g = new k(this, {
			context: e.mediaContext,
			initialValue: {
				media: this.#i,
				registerMedia: this.#p
			}
		});
		#_ = new k(this, {
			context: e.containerContext,
			initialValue: {
				container: this.#o,
				registerContainer: this.#m
			}
		});
		constructor() {
			super(), new k(this, {
				context: e.extensionContext,
				initialValue: { registerExtension: this.#f }
			});
		}
		get store() {
			return C(this.#e) && (this.#e = e.factory()), this.#e;
		}
		connectedCallback() {
			this.#r = !0, super.connectedCallback(), this.#D(), this.#h.setValue(this.store), this.#x(), this.#S(), this.#u.observe(this, {
				childList: !0,
				subtree: !0
			}), queueMicrotask(() => {
				this.#r && this.#b();
			}), this.#C();
		}
		disconnectedCallback() {
			this.#r = !1, this.#u.disconnect(), this.#E(), super.disconnectedCallback();
		}
		destroyCallback() {
			this.#u.disconnect(), this.#E(), this.#d.destroy(), this.#e?.destroy(), this.#e = null, super.destroyCallback();
		}
		willUpdate(e) {
			super.willUpdate(e);
			for (let { property: n, entry: r } of t) {
				if (!e.has(n)) continue;
				let t = n;
				Tn(this.store, r, this[t]);
			}
		}
		#v() {
			let e = this.#c.at(-1)?.value ?? null ?? this.#a;
			this.#i !== e && (this.#i = e, this.#x(), this.#C());
		}
		#y() {
			let e = this.#l.at(-1)?.value ?? null;
			this.#o !== e && (this.#o = e, this.#S(), this.#C());
		}
		#b() {
			let e = this.querySelector("video, audio");
			this.#a !== e && (this.#a = e, this.#v());
		}
		#x() {
			this.#g.setValue({
				media: this.#i,
				registerMedia: this.#p
			});
		}
		#S() {
			this.#_.setValue({
				container: this.#o,
				registerContainer: this.#m
			});
		}
		#C() {
			if (!this.#r || !this.#e) return;
			if (!this.#i) {
				this.#E();
				return;
			}
			let e = {
				media: this.#i,
				container: this.#o
			}, t = this.#s?.media !== e.media, n = this.#s?.container !== e.container;
			(t || n) && this.#w(e);
		}
		#w(e) {
			let t = this.#e;
			t && (this.#n?.(), this.#s = e, this.#d.attach(e), this.#n = t.attach({
				media: this.#d.getStoreMedia(e.media),
				container: e.container
			}));
		}
		#T() {
			this.#s && this.#w(this.#s);
		}
		#E() {
			this.#n?.(), this.#n = null, this.#d.detach(), this.#s = null;
		}
		#D() {
			let e = this.store;
			if (this.#t !== e) {
				for (let { property: n, entry: r } of t) {
					let t = n;
					Tn(e, r, this[t]);
				}
				this.#t = e;
			}
		}
	}
	return n;
}
// node_modules/@videojs/html/dist/default/player/create-player.js
function Io(e) {
	let t = yi(...e.features), n = wn(e.features);
	return {
		PlayerElement: Fo({
			playerContext: O,
			mediaContext: f,
			containerContext: s,
			extensionContext: c,
			factory: () => De()(t),
			config: n
		}),
		PlayerController: Ne(O),
		playerContext: O
	};
}
// node_modules/@videojs/html/dist/default/presets/video/player.js
var { PlayerElement: Lo, PlayerController: Ro } = Io({ features: oa }), zo = class extends Lo {
	static {
		this.tagName = "video-player";
	}
};
// node_modules/@videojs/html/dist/default/define/video/player.js
o(zo);
var G = t(Symbol.for("@videojs/i18n")), Bo;
function Vo() {
	return Bo ??= si(ti("en"), "en"), Bo;
}
var K = class {
	#e;
	#t;
	#n;
	constructor(e, t) {
		this.#e = e, this.#t = new A(e, {
			context: t,
			callback: () => this.#e.requestUpdate(),
			subscribe: !0
		}), e.addController(this);
	}
	get value() {
		return this.#t.value?.translator ?? Vo();
	}
	get locale() {
		return this.#t.value?.locale ?? "en";
	}
	hostConnected() {
		Bo = void 0, this.#n = ni(() => {
			Bo = void 0, this.#t.value || this.#e.requestUpdate();
		});
	}
	hostDisconnected() {
		this.#n?.(), this.#n = void 0;
	}
}, Ho = t(Symbol.for("@videojs/popup-group"));
// node_modules/@videojs/core/dist/default/core/ui/utils/resolve-label.js
function q(e, t) {
	return r(e) ? e(t) || void 0 : e || void 0;
}
// node_modules/@videojs/core/dist/default/core/ui/dialog/core.js
var Uo = class {
	static defaultProps = {
		open: !1,
		defaultOpen: !1,
		closeOnEscape: !0
	};
	#e;
	#t = null;
	#n = void 0;
	#r = void 0;
	#i = !0;
	constructor(e = "dialog") {
		this.#e = e;
	}
	setProps(e) {}
	setInput(e) {
		this.#t = e;
	}
	setTitleId(e) {
		this.#n = e;
	}
	setDescriptionId(e) {
		this.#r = e;
	}
	setDocumentModal(e) {
		this.#i = e;
	}
	getState() {
		let e = this.#t;
		return {
			open: e.active,
			status: e.status,
			titleId: this.#n,
			descriptionId: this.#r,
			scope: this.#i ? "document" : "player",
			...ma(e.status)
		};
	}
	getTriggerAttrs(e, t) {
		return {
			"aria-expanded": e.open && e.status !== "ending" ? "true" : "false",
			"aria-haspopup": "dialog",
			"aria-controls": t
		};
	}
	getPopupAttrs(e) {
		return {
			role: this.#e,
			"aria-modal": this.#i ? "true" : void 0,
			"aria-labelledby": e.titleId,
			"aria-describedby": e.descriptionId
		};
	}
}, Wo = class extends Uo {
	constructor() {
		super("alertdialog");
	}
}, Go = {
	open: "data-open",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style",
	scope: "data-scope"
}, Ko = "menu.", qo = {
	key: `${Ko}quality`,
	text: "Quality"
}, Jo = {
	key: `${Ko}playbackRate`,
	text: "Playback rate"
}, Yo = {
	key: `${Ko}customRate`,
	text: "Custom, {rate}"
}, Xo = {
	key: `${Ko}auto`,
	text: "Auto"
}, Zo = {
	key: `${Ko}autoWithLabel`,
	text: "Auto ({label})"
}, Qo = class e {
	static defaultProps = { delay: 500 };
	state = N({ visible: !1 });
	#e = { ...e.defaultProps };
	#t = null;
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	destroy() {
		this.#n();
	}
	update(e) {
		let t = e.waiting && !e.paused || e.autoplaying;
		t && !this.state.current.visible && !this.#t ? this.#t = setTimeout(() => {
			this.#t = null, this.state.patch({ visible: !0 });
		}, this.#e.delay) : t || (this.#n(), this.state.patch({ visible: !1 }));
	}
	#n() {
		this.#t !== null && (clearTimeout(this.#t), this.#t = null);
	}
}, $o = { visible: "data-visible" }, es = "captions.", ts = {
	key: `${es}enable`,
	text: "Enable captions"
}, ns = {
	key: `${es}disable`,
	text: "Disable captions"
}, rs = class e {
	static defaultProps = {
		label: "",
		disabled: !1,
		menuTrigger: !1
	};
	state = N({
		subtitlesShowing: !1,
		availability: "unavailable",
		disabled: !0,
		hidden: !0,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || (e.subtitlesShowing ? ns : ts);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.textTrackList.some(ee) ? "available" : "unavailable";
		return this.state.patch({
			subtitlesShowing: e.subtitlesShowing,
			availability: t,
			disabled: this.#e.disabled || t !== "available",
			hidden: t === "unavailable"
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	toggle(e) {
		this.setMedia(e), this.getState().disabled || this.#e.menuTrigger && is(e) > 1 || e.toggleSubtitles();
	}
};
function is(e) {
	return e.textTrackList.filter(ee).length;
}
// node_modules/@videojs/core/dist/default/core/ui/captions-button/data.js
var as = {
	subtitlesShowing: "data-active",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, os = class {
	#e = null;
	setMedia(e) {
		this.#e = e;
	}
	getState() {
		return { controlsVisible: this.#e.controlsVisible };
	}
}, ss = { controlsVisible: "data-controls-visible" }, cs = class e {
	static defaultProps = { visibility: "auto" };
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t;
		return e ? {
			visible: this.#e.visibility === "always" || e.controlsVisible,
			userActive: e.userActive
		} : this.#e.visibility === "always" ? {
			visible: !0,
			userActive: !0
		} : null;
	}
}, ls = {
	visible: "data-visible",
	userActive: "data-user-active"
}, us = class extends Wo {
	setProps() {}
}, ds = { ...Go }, fs = "common.", ps = {
	key: `${fs}empty`,
	text: ""
}, ms = {
	key: `${fs}ok`,
	text: "OK"
}, hs = "errors.", gs = {
	key: `${hs}aborted`,
	text: "You stopped media playback before it finished."
}, _s = {
	key: `${hs}network`,
	text: "This media could not be loaded due to a network or server issue."
}, vs = {
	key: `${hs}decode`,
	text: "This media could not be played. It may be corrupted, or your browser may not support its format."
}, ys = {
	key: `${hs}source`,
	text: "This media could not be loaded. It may be unavailable, or your browser may not support its format."
}, bs = {
	key: `${hs}encrypted`,
	text: "This media could not be played because it could not be decrypted."
}, xs = {
	key: `${hs}unplayable`,
	text: "This media is unsupported by the player."
}, Ss = {
	key: `${hs}title`,
	text: "Something went wrong."
}, Cs = {
	key: `${hs}unexpected`,
	text: "An unexpected error occurred."
}, ws = 99001, Ts = {
	[D.MEDIA_ERR_ABORTED]: gs,
	[D.MEDIA_ERR_NETWORK]: _s,
	[D.MEDIA_ERR_DECODE]: vs,
	[D.MEDIA_ERR_SRC_NOT_SUPPORTED]: ys,
	[D.MEDIA_ERR_ENCRYPTED]: bs,
	[D.MEDIA_ERR_CUSTOM]: ps,
	[ws]: xs
}, Es = { [D.MEDIA_ERR_SRC_NOT_SUPPORTED]: ["Failed to open media"] };
function Ds(e) {
	return e >= D.MEDIA_ERR_ABORTED && e <= D.MEDIA_ERR_ENCRYPTED;
}
function Os() {
	return Ss;
}
function ks() {
	return ms;
}
function As() {
	return Cs;
}
function js(e, t) {
	if (e) {
		let t = Ts[e.code], n = e.message?.trim();
		if (n) {
			let r = D.defaultMessages[e.code];
			if (t && r && n === r) return t;
			let i = Es[e.code];
			return t && Ds(e.code) && !e.context && i?.includes(n) ? t : n;
		}
		if (t) return t;
	}
	return t?.trim() || Cs;
}
// node_modules/@videojs/core/dist/default/i18n/text/fullscreen.js
var Ms = "fullscreen.", Ns = {
	key: `${Ms}enter`,
	text: "Enter fullscreen"
}, Ps = {
	key: `${Ms}exit`,
	text: "Exit fullscreen"
}, Fs = class e {
	static defaultProps = {
		label: "",
		disabled: !1
	};
	state = N({
		fullscreen: !1,
		availability: "unavailable",
		disabled: !0,
		hidden: !0,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || (e.fullscreen ? Ps : Ns);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.fullscreenAvailability;
		return this.state.patch({
			fullscreen: e.isFullscreen,
			availability: t,
			disabled: this.#e.disabled || t !== "available",
			hidden: t !== "available"
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (this.setMedia(e), !this.getState().disabled) return e.isFullscreen ? e.exitFullscreen() : e.requestFullscreen();
	}
}, Is = {
	fullscreen: "data-fullscreen",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, Ls = "status.", Rs = {
	key: `${Ls}captionsOn`,
	text: "Captions on"
}, zs = {
	key: `${Ls}captionsOff`,
	text: "Captions off"
}, Bs = {
	key: `${Ls}paused`,
	text: "Paused"
}, Vs = {
	key: `${Ls}playing`,
	text: "Playing"
}, Hs = {
	key: `${Ls}fullscreen`,
	text: "Fullscreen"
}, Us = {
	key: `${Ls}pip`,
	text: "Picture in picture"
}, Ws = {
	key: `${Ls}exitPip`,
	text: "Exit picture in picture"
}, Gs = {
	key: `${Ls}seekedTo`,
	text: "Seeked to {time}"
}, Ks = "volume.", qs = {
	key: `${Ks}mutedValue`,
	text: "{percent}, muted"
}, Js = {
	key: `${Ks}muted`,
	text: "Muted"
}, Ys = {
	key: `${Ks}label`,
	text: "Volume"
}, Xs = {
	key: `${Ks}value`,
	text: "Volume {value}"
}, Zs = {
	muted: B(Js),
	volume: B(Ys),
	captionsOn: B(Rs),
	captionsOff: B(zs),
	paused: B(Bs),
	playing: B(Vs),
	fullscreen: B(Hs),
	exitFullscreen: B(Ps),
	pictureInPicture: B(Us),
	exitPictureInPicture: B(Ws)
};
function Qs(e) {
	return {
		muted: e(Js),
		volume: e(Ys),
		captionsOn: e(Rs),
		captionsOff: e(zs),
		paused: e(Bs),
		playing: e(Vs),
		fullscreen: e(Hs),
		exitFullscreen: e(Ps),
		pictureInPicture: e(Us),
		exitPictureInPicture: e(Ws)
	};
}
// node_modules/@videojs/core/dist/default/core/ui/input-action.js
function $s(e, t) {
	return e ? !t || t.includes(e) : !1;
}
// node_modules/@videojs/core/dist/default/core/ui/menu/core.js
function ec(e) {
	let t = [...e];
	if (t.length === 0) return null;
	let n = t.filter((e) => !e.hidden), r = n.filter((e) => e.availability === "available").length > 0 ? "available" : t.every((e) => e.availability === "unsupported") ? "unsupported" : "unavailable";
	return {
		value: t.length === 1 ? t[0].value : "",
		disabled: n.length === 0 || n.every((e) => e.disabled),
		hidden: n.length === 0,
		availability: r
	};
}
var tc = class e {
	static defaultProps = {
		side: "bottom",
		align: "start",
		open: !1,
		defaultOpen: !1,
		closeOnEscape: !0,
		closeOnOutsideClick: !0
	};
	#e = { ...e.defaultProps };
	#t = null;
	get props() {
		return this.#e;
	}
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	setInput(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.isSubmenu;
		return {
			open: e.active,
			status: e.status,
			side: t ? void 0 : this.#e.side,
			align: t ? void 0 : this.#e.align,
			isSubmenu: t,
			...ma(e.status)
		};
	}
	getTriggerAttrs(e, t) {
		return {
			...!e.isSubmenu && { tabIndex: 0 },
			"aria-haspopup": "menu",
			"aria-expanded": e.open && e.status !== "ending" ? "true" : "false",
			"aria-controls": t
		};
	}
	getContentAttrs() {
		return {
			role: "menu",
			tabIndex: -1
		};
	}
	getPopupAttrs() {
		return { popover: "manual" };
	}
}, nc = "buttons.", rc = {
	key: `${nc}play`,
	text: "Play"
}, ic = {
	key: `${nc}pause`,
	text: "Pause"
}, ac = {
	key: `${nc}replay`,
	text: "Replay"
}, oc = {
	key: `${nc}mute`,
	text: "Mute"
}, sc = {
	key: `${nc}unmute`,
	text: "Unmute"
}, cc = class e {
	static defaultProps = {
		label: "",
		disabled: !1
	};
	state = N({
		muted: !1,
		volumeLevel: "off",
		availability: "unavailable",
		hidden: !0,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || (e.muted ? sc : oc);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": this.#e.disabled ? "true" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.mutedAvailability;
		return this.state.patch({
			muted: e.muted || e.volume === 0,
			volumeLevel: lc(e),
			availability: t,
			hidden: t !== "available"
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	toggle(e) {
		this.#e.disabled || e.mutedAvailability !== "available" || e.setMuted(!(e.muted || e.volume === 0));
	}
};
function lc(e) {
	return e.muted || e.volume === 0 ? "off" : e.volume < .5 ? "low" : e.volume < .75 ? "medium" : "high";
}
// node_modules/@videojs/core/dist/default/core/ui/mute-button/data.js
var uc = {
	muted: "data-muted",
	volumeLevel: "data-volume-level",
	availability: "data-availability",
	hidden: "data-hidden"
}, dc = "pip.", fc = {
	key: `${dc}enter`,
	text: "Enter picture-in-picture"
}, pc = {
	key: `${dc}exit`,
	text: "Exit picture-in-picture"
}, mc = class e {
	static defaultProps = {
		label: "",
		disabled: !1
	};
	state = N({
		pip: !1,
		availability: "unavailable",
		disabled: !0,
		hidden: !0,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || (e.pip ? pc : fc);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.pictureInPictureAvailability, n = e.isPictureInPicture || t === "available";
		return this.state.patch({
			pip: e.isPictureInPicture,
			availability: t,
			disabled: this.#e.disabled || !n,
			hidden: !n
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (this.setMedia(e), !this.getState().disabled) return e.isPictureInPicture ? e.exitPictureInPicture() : e.requestPictureInPicture();
	}
}, hc = {
	pip: "data-pip",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, gc = class e {
	static defaultProps = {
		label: "",
		disabled: !1
	};
	state = N({
		paused: !0,
		ended: !1,
		started: !1,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || (e.ended ? ac : e.paused ? rc : ic);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": this.#e.disabled ? "true" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t;
		return this.state.patch({
			paused: e.paused && !e.autoplaying,
			ended: e.ended,
			started: e.started || e.autoplaying
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (!this.#e.disabled) {
			if (e.paused && !e.autoplaying || e.ended) return e.play();
			e.pause();
		}
	}
}, _c = {
	paused: "data-paused",
	ended: "data-ended",
	started: "data-started"
}, vc = { length: "--media-playback-rate-length" }, yc = {
	key: "playback.rate",
	text: "Playback rate, {rate}"
}, bc = class e {
	static defaultProps = {
		label: "",
		disabled: !1,
		menuTrigger: !1,
		rates: []
	};
	state = N({
		rate: 1,
		availability: "unavailable",
		hidden: !0,
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		let t = q(this.#e.label, e);
		return t === void 0 ? yc : t;
	}
	getTooltipLabel(e) {
		let t = q(this.#e.label, e);
		return t === void 0 ? Jo : t;
	}
	getLabelParams(e) {
		if (q(this.#e.label, e) === void 0) return { rate: e.rate };
	}
	getCSSVars(e) {
		return { [vc.length]: String(String(e.rate).length) };
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": this.#e.disabled ? "true" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.playbackRateAvailability;
		return this.state.patch({
			rate: e.playbackRate,
			availability: t,
			hidden: t !== "available"
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	getRates(e) {
		return Dr(this.#e.rates) ?? e.playbackRates;
	}
	cycle(e) {
		if (this.#e.disabled || e.playbackRateAvailability !== "available" || this.#e.menuTrigger) return;
		let t = this.getRates(e);
		if (t.length === 0) return;
		let { playbackRate: n } = e, r = t.indexOf(n), i = r === -1 ? t.find((e) => e > n) ?? t[0] : t[(r + 1) % t.length];
		e.setPlaybackRate(i);
	}
}, xc = {
	rate: "data-rate",
	availability: "data-availability",
	hidden: "data-hidden"
}, Sc = 1;
function Cc(e) {
	return `${e}×`;
}
var wc = class e {
	static defaultProps = {
		label: "",
		formatRate: Cc,
		disabled: !1,
		rates: []
	};
	state = N({
		rate: 1,
		value: "1",
		options: [],
		disabled: !0,
		hidden: !0,
		availability: "unavailable",
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		let t = q(this.#e.label, e);
		return t === void 0 ? Jo : t;
	}
	getLabelParams(e) {}
	getRateLabel(e) {
		return this.#e.formatRate(e);
	}
	getRateValue(e) {
		return String(e);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		};
	}
	getRates(e) {
		return Dr(this.#e.rates) ?? e.playbackRates;
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = this.getRates(e), n = e.playbackRateAvailability === "available" ? t.length > 0 ? "available" : "unavailable" : e.playbackRateAvailability, r = n === "available" ? Or(t, e.playbackRate) : t;
		return this.state.patch({
			rate: e.playbackRate,
			value: this.getRateValue(e.playbackRate),
			options: r.map((e) => {
				let n = this.getRateLabel(e), r = e !== Sc && !t.includes(e);
				return {
					rate: e,
					value: this.getRateValue(e),
					label: n,
					...r && {
						ariaLabel: Yo,
						ariaLabelParams: { rate: n }
					},
					disabled: !1,
					custom: r
				};
			}),
			disabled: this.#e.disabled || n !== "available",
			hidden: n !== "available",
			availability: n
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	select(e, t) {
		this.#e.disabled || e.playbackRateAvailability !== "available" || (this.getRates(e).includes(t) || t === e.playbackRate) && e.setPlaybackRate(t);
	}
	selectValue(e, t) {
		let n = Or(this.getRates(e), e.playbackRate).find((e) => this.getRateValue(e) === t);
		a(n) || this.select(e, n);
	}
}, Tc = {
	rate: "data-rate",
	disabled: "data-disabled",
	hidden: "data-hidden",
	availability: "data-availability"
}, J = class e {
	static defaultProps = {
		side: "top",
		align: "center",
		modal: !1,
		closeOnEscape: !0,
		closeOnOutsideClick: !0,
		open: !1,
		defaultOpen: !1,
		openOnHover: !1,
		delay: 300,
		closeDelay: 0
	};
	#e = { ...e.defaultProps };
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	#t = null;
	setInput(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t;
		return {
			open: e.active,
			status: e.status,
			side: this.#e.side,
			align: this.#e.align,
			modal: this.#e.modal,
			...ma(e.status)
		};
	}
	getTriggerAttrs(e, t) {
		return {
			"aria-expanded": e.open && e.status !== "ending" ? "true" : "false",
			"aria-haspopup": "dialog",
			"aria-controls": t
		};
	}
	getPopupAttrs(e) {
		return {
			popover: "manual",
			role: "dialog",
			"aria-modal": e.modal === !0 ? "true" : void 0
		};
	}
}, Ec = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	...pa
}, Dc = "data-popup", Oc = `[${Dc}]`, kc = class {
	#e = null;
	#t = "none";
	setMedia(e) {
		this.#e = e;
	}
	setImageLoadState(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#e;
		return {
			visible: !e.started,
			src: e.poster,
			loading: this.#t === "loading",
			loaded: this.#t === "loaded",
			error: this.#t === "error"
		};
	}
}, Ac = {
	visible: "data-visible",
	loading: "data-loading",
	loaded: "data-loaded",
	error: "data-error"
}, jc = "auto", Mc = [
	4320,
	2160,
	1440,
	1080,
	720,
	480,
	360,
	240
];
function Nc(e) {
	return e >= 1e6 ? `${Math.round(e / 1e5) / 10} Mbps` : `${Math.round(e / 1e3)} kbps`;
}
function Pc(e) {
	let t = Math.round(e * 9 / 16);
	return Mc.includes(t) ? t : void 0;
}
function Fc(e) {
	let { width: t, height: n } = e;
	if (t && n) return t > n && t * 9 > n * 16 ? Pc(t) ?? n : Math.min(t, n);
	if (n) return n;
	if (t) return Pc(t) ?? t;
}
function Ic(e, t) {
	let n = Fc(e);
	return !!(n && t.some((t) => t !== e && Fc(t) === n));
}
function Lc(e) {
	let t = Fc(e);
	return t ? `${t}p` : e.bitrate ? Nc(e.bitrate) : qo;
}
function Rc(e, t = []) {
	if (Fc(e) && e.bitrate && Ic(e, t)) return Nc(e.bitrate);
}
function zc(e) {
	let t = Fc(e);
	if (t) {
		if (t >= 4320) return "8K";
		if (t >= 2160) return "4K";
		if (t >= 1080) return "HD";
	}
}
var Bc = class e {
	static defaultProps = {
		label: "",
		formatRendition: Lc,
		disabled: !1
	};
	state = N({
		options: [{
			value: jc,
			label: Xo,
			disabled: !1
		}],
		value: jc,
		disabled: !0,
		hidden: !0,
		availability: "unavailable",
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		return q(this.#e.label, e) || qo;
	}
	getRenditionLabel(t) {
		return this.#e.formatRendition === e.defaultProps.formatRendition ? Lc(t) : this.#e.formatRendition(t);
	}
	getRenditionBadge(t, n = []) {
		if (this.#e.formatRendition === e.defaultProps.formatRendition) return Rc(t, n);
	}
	getRenditionTier(t) {
		if (this.#e.formatRendition === e.defaultProps.formatRendition) return zc(t);
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = e.videoRenditionList.findIndex((e) => e.selected), n = e.videoRenditionList.length > 1 ? "available" : "unavailable", r = (t) => {
			let n = this.getRenditionTier(t), r = this.getRenditionBadge(t, e.videoRenditionList);
			return {
				value: t.id,
				label: this.getRenditionLabel(t),
				disabled: !1,
				...n && { tier: n },
				...r && { badge: r }
			};
		}, { activeVideoRendition: i } = e, a = i && e.videoRenditionList.some((e) => e.id === i.id) ? r(i) : void 0, o = {
			value: jc,
			label: t === -1 && a ? Zo : Xo,
			disabled: !1,
			...t === -1 && a && { labelParams: { label: ri(a.label) } }
		};
		return this.state.patch({
			options: [o, ...e.videoRenditionList.map(r)],
			value: t === -1 ? jc : e.videoRenditionList[t].id,
			disabled: this.#e.disabled || n === "unavailable",
			hidden: n === "unavailable",
			availability: n
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	select(e, t) {
		this.#e.disabled || (t === "auto" || e.videoRenditionList.some((e) => e.id === t)) && e.selectVideoRendition(t);
	}
	selectValue(e, t) {
		this.select(e, t);
	}
}, Vc = {
	value: "data-quality",
	disabled: "data-disabled",
	hidden: "data-hidden",
	availability: "data-availability"
}, Hc = "seek.", Uc = {
	key: `${Hc}forward`,
	text: "Seek forward {seconds} seconds"
}, Wc = {
	key: `${Hc}backward`,
	text: "Seek backward {seconds} seconds"
}, Gc = class e {
	static defaultProps = {
		seconds: 30,
		label: "",
		disabled: !1
	};
	state = N({
		seeking: !1,
		direction: "forward",
		label: ""
	});
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	getLabel(e) {
		let t = q(this.#e.label, e);
		return t === void 0 ? e.direction === "backward" ? Wc : Uc : t;
	}
	getLabelParams(e) {
		if (q(this.#e.label, e) === void 0) return { seconds: Math.abs(this.#e.seconds) };
	}
	getAttrs(e) {
		return {
			"aria-label": this.getLabel(e),
			"aria-disabled": this.#e.disabled ? "true" : void 0
		};
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = this.#e.seconds < 0 ? "backward" : "forward";
		return this.state.patch({
			seeking: e.seeking,
			direction: t
		}), this.state.patch({ label: ri(this.getLabel(this.state.current)) }), this.state.current;
	}
	async seek(e) {
		this.#e.disabled || await e.seek(e.currentTime + this.#e.seconds);
	}
}, Kc = {
	seeking: "data-seeking",
	direction: "data-direction"
}, qc = /* @__PURE__ */ new Map();
function Jc(e, t, n) {
	if (e === "digital") {
		let e = new Intl.NumberFormat(n, { useGrouping: !1 }), r = new Intl.NumberFormat(n, {
			minimumIntegerDigits: 2,
			useGrouping: !1
		});
		return { format: (n) => {
			let i = `${r.format(n.minutes ?? 0)}:${r.format(n.seconds ?? 0)}`;
			return t === "always" || n.hours !== void 0 ? `${e.format(n.hours ?? 0)}:${i}` : i;
		} };
	}
	let r = [
		["hours", new Intl.NumberFormat(n, {
			style: "unit",
			unit: "hour",
			unitDisplay: e
		})],
		["minutes", new Intl.NumberFormat(n, {
			style: "unit",
			unit: "minute",
			unitDisplay: e
		})],
		["seconds", new Intl.NumberFormat(n, {
			style: "unit",
			unit: "second",
			unitDisplay: e
		})]
	], i = typeof Intl.ListFormat == "function" ? new Intl.ListFormat(n, {
		type: "unit",
		style: e
	}) : { format: (t) => [...t].join(e === "narrow" ? " " : ", ") };
	return { format: (e) => i.format(r.filter(([t]) => e[t] !== void 0).map(([t, n]) => n.format(e[t] ?? 0))) };
}
function Yc(e) {
	return e === void 0 ? "" : Array.isArray(e) ? e.join(":") : e;
}
function Xc(e, t = "long", n) {
	let r = `${Yc(e)}:${t}:${n ?? ""}`, i = qc.get(r);
	return i || (i = Jc(t, n, e), qc.set(r, i)), i;
}
function Zc(t) {
	return e(t) && Number.isFinite(t);
}
function Qc(e, t, n) {
	if (!Zc(e)) return "0:00";
	let r = e < 0, i = Math.floor(Math.abs(e)), a = Math.floor(i / 3600), o = Math.floor(i % 3600 / 60), s = i % 60, c = Zc(t ?? 0) ? Math.abs(t ?? 0) : 0, l = Math.floor(c / 3600), u = Math.floor(c / 60 % 60), d = a > 0 || l > 0, f = d || u >= 10, p = d ? {
		hours: a,
		minutes: o,
		seconds: s
	} : {
		minutes: o,
		seconds: s
	}, { locale: m = "en" } = n ?? {}, h = Xc(m, "digital", d ? "always" : "auto").format(p);
	if (!f) {
		let e = new Intl.NumberFormat(m, { useGrouping: !1 }).format(0);
		h = h.replace(RegExp(`^${e}(?=\\p{Nd}\\D)`, "u"), "");
	}
	return `${r ? "-" : ""}${h}`;
}
function $c(e) {
	if (!Zc(e)) return "PT0S";
	let t = Math.abs(e), n = Math.floor(t / 3600), r = Math.floor(t / 60 % 60), i = Math.floor(t % 60), a = "PT";
	return n > 0 && (a += `${n}H`), r > 0 && (a += `${r}M`), (i > 0 || a === "PT") && (a += `${i}S`), a;
}
function el(e, t) {
	if (!Zc(e)) return "";
	let { locale: n = "en", style: r = "long", formatRemaining: i } = t ?? {}, a = e < 0, o = Math.floor(Math.abs(e)), s = Math.floor(o / 3600), c = Math.floor(o % 3600 / 60), l = o % 60, u = {};
	s > 0 && (u.hours = s), c > 0 && (u.minutes = c), (l > 0 || s === 0 && c === 0) && (u.seconds = l);
	let d = Xc(n, r).format(u);
	return a ? i ? i(d) : Ct(n) ? `${d} remaining` : d : d;
}
// node_modules/@videojs/core/dist/default/core/ui/seek-indicator/status.js
function tl(e) {
	return e === "seekStep" || e === "seekToPercent";
}
function nl(e, t) {
	let n = t === void 0 ? void 0 : { locale: t };
	return Qc(e.currentTime ?? 0, e.duration, n);
}
function rl(e) {
	return e.value ?? e.currentTime;
}
function il(e) {
	return e.value === void 0 ? !e.key || e.key < "0" || e.key > "9" ? null : Number(e.key) * 10 : z(e.value, 0, 100);
}
function al(e, t) {
	if (e.action === "seekStep" && e.value !== void 0) {
		if (e.value > 0) return "forward";
		if (e.value < 0) return "backward";
	}
	if (e.action === "seekToPercent") {
		let n = il(e);
		if (n === null || t.duration === void 0 || t.duration <= 0) return null;
		let r = n / 100 * t.duration, i = t.currentTime ?? 0;
		if (r > i) return "forward";
		if (r < i) return "backward";
	}
	return null;
}
// node_modules/@videojs/core/dist/default/core/ui/seek-indicator/core.js
var ol = {
	open: !1,
	generation: 0,
	direction: null,
	count: 0,
	seekTotal: 0,
	value: null,
	currentTime: "0:00",
	transitionStarting: !1,
	transitionEnding: !1
}, sl = class {
	state = N({ ...ol });
	#e = {};
	#t = null;
	#n = new ha(() => {
		this.#t = null, this.state.patch({
			open: !1,
			direction: null,
			count: 0,
			seekTotal: 0,
			value: null
		});
	}, () => _a(this.#e));
	setProps(e) {
		this.#e = e;
	}
	destroy() {
		this.#n.destroy();
	}
	close() {
		this.#n.close();
	}
	processEvent(e, t) {
		if (!tl(e.action)) return !1;
		let n = this.state.current, r = al(e, t), i = n.open && e.action === "seekStep" && n.direction === r;
		i || (this.#t = t.currentTime ?? null);
		let a = this.#r(e, t, i), o = i ? n.seekTotal + Math.abs(a) : Math.abs(a), s = e.action === "seekStep" && o > 0 ? new Intl.NumberFormat(this.#e.locale ?? "en", {
			style: "unit",
			unit: "second",
			unitDisplay: Ct(this.#e.locale) ? "narrow" : "short",
			useGrouping: !1
		}).format(o) : null;
		return this.state.patch({
			open: !0,
			generation: n.generation + 1,
			direction: r,
			count: i ? n.count + 1 : 1,
			seekTotal: o,
			value: s,
			currentTime: nl(t, this.#e.locale)
		}), this.#n.arm(), !0;
	}
	#r(e, t, n) {
		if (e.action !== "seekStep" || e.value === void 0) return 0;
		if (!n || this.#t === null) return e.value;
		let r = this.#t, i = t.duration ?? Infinity, a = this.state.current.seekTotal, o = Math.abs(e.value);
		return (e.value < 0 ? Math.max(0, r - a) : Math.max(0, i - r - a)) >= o ? e.value : 0;
	}
}, cl = {
	open: "data-open",
	direction: "data-direction",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
}, ll = class e {
	static defaultProps = {
		label: "",
		step: 1,
		largeStep: 10,
		orientation: "horizontal",
		disabled: !1,
		thumbAlignment: "center",
		value: 0,
		min: 0,
		max: 100
	};
	static defaultInput = {
		pointerPercent: 0,
		dragPercent: 0,
		dragging: !1,
		pointing: !1,
		focused: !1
	};
	#e = { ...e.defaultProps };
	#t = { ...e.defaultInput };
	get props() {
		return this.#e;
	}
	get input() {
		return this.#t;
	}
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	setInput(e) {
		this.#t = e;
	}
	getSliderState(e) {
		let { orientation: t, disabled: n, thumbAlignment: r } = this.#e, { pointerPercent: i, dragging: a, pointing: o, focused: s } = this.#t;
		return {
			value: e,
			fillPercent: this.percentFromValue(e),
			pointerPercent: i,
			dragging: a,
			pointing: o,
			interactive: a || o || s,
			orientation: t,
			disabled: n,
			thumbAlignment: r
		};
	}
	getLabel(e) {
		return q(this.#e.label, e) || "";
	}
	getAttrs(e) {
		return {
			role: "slider",
			tabIndex: e.disabled ? -1 : 0,
			autoComplete: "off",
			"aria-label": this.getLabel(e),
			"aria-valuemin": this.#e.min,
			"aria-valuemax": this.#e.max,
			"aria-valuenow": e.value,
			"aria-orientation": e.orientation,
			"aria-disabled": e.disabled ? "true" : void 0
		};
	}
	valueFromPercent(e) {
		let { min: t, max: n, step: r } = this.#e;
		return Mr(z(t + e / 100 * (n - t), t, n), r, t);
	}
	rawValueFromPercent(e) {
		let { min: t, max: n } = this.#e;
		return z(t + e / 100 * (n - t), t, n);
	}
	percentFromValue(e) {
		let { min: t, max: n } = this.#e;
		return jr(e, t, n);
	}
	getStepPercent() {
		let { step: e, min: t, max: n } = this.#e, r = n - t;
		return r > 0 ? e / r * 100 : 0;
	}
	getLargeStepPercent() {
		let { largeStep: e, min: t, max: n } = this.#e, r = n - t;
		return r > 0 ? e / r * 100 : 0;
	}
	adjustPercentForAlignment(e, t, n) {
		if (this.#e.thumbAlignment === "center" || n === 0) return e;
		let r = t / n * 100 / 2, i = r, a = 100 - r;
		return i + e / 100 * (a - i);
	}
}, ul = {
	dragging: "data-dragging",
	pointing: "data-pointing",
	interactive: "data-interactive",
	orientation: "data-orientation",
	disabled: "data-disabled"
}, dl = class {
	getGeometry(e) {
		let { ranges: t, min: n, max: r, orientation: i } = e, a = r - n;
		if (!Number.isFinite(a) || a <= 0) return [];
		let o = t.filter((e) => {
			let t = (e.end - e.start) / a, r = (e.start - n) / a;
			return Number.isFinite(t) && Number.isFinite(r) && t > 0;
		});
		return o.map((e, t) => {
			let r = (e.start - n) / a, s = (e.end - e.start) / a, c = `${s * 100}%`;
			return {
				...e,
				index: t,
				last: t === o.length - 1,
				orientation: i,
				width: i === "horizontal" ? c : void 0,
				height: i === "vertical" ? c : void 0,
				startPercent: `${r * 100}%`,
				endPercent: `${(r + s) * 100}%`
			};
		});
	}
	getState(e, t, n) {
		let { last: r, ...i } = e, a = (t) => t >= e.start && (t < e.end || r && t === e.end), o = a(t.value), s = t.pointing && a(n), c = t.dragging && a(n), l = t.interactive && !t.pointing && !t.dragging;
		return {
			...i,
			fillPercent: jr(t.value, e.start, e.end),
			active: o,
			pointing: s,
			dragging: c,
			highlighted: e.highlight !== !1 && s,
			interactive: s || c || l && o
		};
	}
}, fl = {
	...Zs,
	volumeWithValue: (e) => B(Xs, { value: e }),
	seekedTo: (e) => B(Gs, { time: el(e) }),
	playbackRate: (e) => B(yc, { rate: e })
};
function pl(e, t = "en") {
	return {
		...Qs(e),
		volumeWithValue: (t) => e(Xs, { value: t }),
		seekedTo: (n) => e(Gs, { time: el(n, { locale: t }) }),
		playbackRate: (t) => e(yc, { rate: t })
	};
}
// node_modules/@videojs/core/dist/default/core/ui/volume-indicator/status.js
function ml(e) {
	return e === "toggleMuted" || e === "volumeStep";
}
function hl(e) {
	return e <= 0 ? "off" : e <= .5 ? "low" : "high";
}
function gl(e) {
	return `${Math.round(z(e, 0, 1) * 100)}%`;
}
function _l(e) {
	return e.value ?? "";
}
function vl(e, t) {
	let n = t.muted === !0, r = t.volume ?? 0;
	if (e.action === "toggleMuted") return {
		snapshotVolume: r,
		nextMuted: !n,
		nextVolume: r
	};
	if (e.action === "volumeStep") {
		let t = z(r + (e.value ?? 0), 0, 1);
		return {
			snapshotVolume: r,
			nextMuted: n && t <= 0,
			nextVolume: t
		};
	}
	return {
		snapshotVolume: r,
		nextMuted: n,
		nextVolume: r
	};
}
function yl(e, t, n = Zs, r) {
	let i = r ?? vl(e, t), a = i.nextMuted ? "off" : hl(i.nextVolume), o = i.nextMuted ? "0%" : gl(i.nextVolume);
	return {
		status: a === "off" ? "volume-off" : a === "low" ? "volume-low" : "volume-high",
		label: a === "off" ? n.muted : n.volume,
		value: o,
		volumeLevel: a
	};
}
// node_modules/@videojs/core/dist/default/core/ui/status-announcer/status.js
function bl(e, t, n = fl) {
	let r = [];
	return Sl(e.paused, t.paused) && r.push(t.paused ? n.paused : n.playing), Sl(e.subtitlesShowing, t.subtitlesShowing) && t.subtitlesAvailable !== !1 && r.push(t.subtitlesShowing ? n.captionsOn : n.captionsOff), Sl(e.isFullscreen, t.isFullscreen) && r.push(t.isFullscreen ? n.fullscreen : n.exitFullscreen), Sl(e.isPictureInPicture, t.isPictureInPicture) && r.push(t.isPictureInPicture ? n.pictureInPicture : n.exitPictureInPicture), Sl(e.playbackRate, t.playbackRate) && r.push(n.playbackRate(`${t.playbackRate}×`)), r.length > 0 ? r.join(". ") : null;
}
function xl(e, t, n = fl) {
	if (!Sl(e.volume, t.volume) && !Sl(e.muted, t.muted)) return null;
	let r = t.volume ?? e.volume, i = t.muted ?? e.muted;
	return r === void 0 && i === void 0 ? null : i || (r ?? 0) <= 0 ? n.muted : n.volumeWithValue(gl(r ?? 0));
}
function Sl(e, t) {
	return e !== void 0 && t !== void 0 && !Object.is(e, t);
}
// node_modules/@videojs/core/dist/default/core/ui/status-announcer/core.js
var Cl = 200, wl = class {
	state = N({
		generation: 0,
		label: null
	});
	#e = {};
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = new ha(() => this.state.patch({ label: null }), () => _a(this.#e));
	setProps(e) {
		this.#e = e;
	}
	resetSnapshot() {
		this.#t = null, this.#n = null, this.#r = null, this.#f(), this.#a.close();
	}
	destroy() {
		this.#f(), this.#a.destroy();
	}
	processSnapshot(e) {
		let t = this.#t;
		if (this.#t = e, !t) return !1;
		let n = this.#o(), r = bl(t, e, n), i = r !== null && this.#s(r), a = this.#l(t, e, n, i), o = this.#c(t, e, n, i || a);
		return i || a || o;
	}
	#o() {
		return {
			...fl,
			...this.#e.labels
		};
	}
	#s(e) {
		return this.#f(), this.state.patch({
			generation: this.state.current.generation + 1,
			label: e
		}), this.#a.arm(), !0;
	}
	#c(e, t, n, r) {
		let i = xl(e, t, n);
		return i === null || r || !this.#d() ? !1 : (this.#u(i), !0);
	}
	#l(e, t, n, r) {
		if (e.seeking !== !0 && t.seeking === !0) return this.#n = e.currentTime ?? null, this.#r = t.currentTime ?? null, this.#f(), !1;
		if (t.seeking === !0) return this.#r = t.currentTime ?? this.#r, !1;
		if (e.seeking !== !0 || t.seeking !== !1) return !1;
		let i = t.currentTime ?? this.#r, a = this.#n;
		return this.#n = null, this.#r = null, i == null || Object.is(i, a) || r || !this.#d() ? !1 : (this.#u(n.seekedTo(i)), !0);
	}
	#u(e) {
		this.#f(), this.#i = setTimeout(() => {
			this.#i = null, this.#d() && this.#s(e);
		}, Cl);
	}
	#d() {
		return this.#e.shouldAnnounce?.() !== !1;
	}
	#f() {
		this.#i !== null && (clearTimeout(this.#i), this.#i = null);
	}
};
// node_modules/@videojs/core/dist/default/core/ui/status-indicator/status.js
function Tl(e, t, n = Zs) {
	switch (e.action) {
		case "togglePaused": {
			let e = t.paused === void 0 || !t.paused;
			return {
				status: e ? "pause" : "play",
				label: e ? n.paused : n.playing,
				value: null
			};
		}
		case "toggleMuted":
		case "volumeStep": return yl(e, t, n);
		case "toggleSubtitles": {
			if (t.subtitlesAvailable === !1) return null;
			let e = t.subtitlesShowing === void 0 || !t.subtitlesShowing;
			return {
				status: e ? "captions-on" : "captions-off",
				label: e ? n.captionsOn : n.captionsOff,
				value: null
			};
		}
		case "toggleFullscreen": {
			let e = t.isFullscreen === void 0 || !t.isFullscreen;
			return {
				status: e ? "fullscreen" : "exit-fullscreen",
				label: e ? n.fullscreen : n.exitFullscreen,
				value: null
			};
		}
		case "togglePictureInPicture": {
			let e = t.isPictureInPicture === void 0 || !t.isPictureInPicture;
			return {
				status: e ? "pip" : "exit-pip",
				label: e ? n.pictureInPicture : n.exitPictureInPicture,
				value: null
			};
		}
		default: return null;
	}
}
function El(e) {
	return e.value ?? e.label ?? "";
}
// node_modules/@videojs/core/dist/default/core/ui/status-indicator/core.js
var Dl = {
	open: !1,
	generation: 0,
	status: null,
	label: null,
	value: null,
	transitionStarting: !1,
	transitionEnding: !1
}, Ol = class {
	state = N({ ...Dl });
	#e = {};
	#t = new ha(() => this.state.patch({
		open: !1,
		status: null,
		label: null,
		value: null
	}), () => _a(this.#e));
	setProps(e) {
		this.#e = e;
	}
	destroy() {
		this.#t.destroy();
	}
	close() {
		this.#t.close();
	}
	processEvent(e, t) {
		if (!$s(e.action, this.#e.actions)) return !1;
		let n = Tl(e, t, {
			...Zs,
			...this.#e.labels
		}) ?? this.#e.deriveCustomStatus?.(e, t);
		return n ? (this.state.patch({
			open: !0,
			generation: this.state.current.generation + 1,
			status: n.status,
			label: n.label,
			value: n.value
		}), this.#t.arm(), !0) : !1;
	}
}, kl = {
	open: "data-open",
	status: "data-status",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
}, Al = {
	loading: "data-loading",
	error: "data-error",
	hidden: "data-hidden"
};
// node_modules/@videojs/core/dist/default/core/ui/thumbnail/media-fragment.js
function jl(t, n) {
	let r = t.trim().split("#"), i = r[0] ?? "", a = r[1], o = n ? new URL(i, n).href : i;
	if (!a) return { url: o };
	let s = a.indexOf("=");
	if (s === -1) return { url: o };
	let c = a.slice(0, s), l = a.slice(s + 1).split(",").map(Number), u = {};
	for (let t = 0; t < c.length; t++) {
		let n = c[t], r = l[t];
		n && e(r) && !Number.isNaN(r) && (u[n] = r);
	}
	let d = { url: o };
	return e(u.w) && (d.width = u.w), e(u.h) && (d.height = u.h), e(u.x) && e(u.y) && (d.coords = {
		x: u.x,
		y: u.y
	}), d;
}
function Ml(e, t) {
	let n = [];
	for (let r of e) {
		let e = jl(r.text, t), i = {
			url: e.url,
			startTime: r.startTime,
			endTime: r.endTime
		};
		e.width && (i.width = e.width), e.height && (i.height = e.height), e.coords && (i.coords = e.coords), n.push(i);
	}
	return n;
}
// node_modules/@videojs/core/dist/default/i18n/text/time.js
var Y = "time.", Nl = {
	key: `${Y}current`,
	text: "Current time"
}, Pl = {
	key: `${Y}duration`,
	text: "Duration"
}, Fl = {
	key: `${Y}remaining`,
	text: "Remaining"
}, Il = {
	key: `${Y}elapsedSuffix`,
	text: "{duration} elapsed"
}, Ll = {
	key: `${Y}durationSuffix`,
	text: "{duration} duration"
}, Rl = {
	key: `${Y}remainingSuffix`,
	text: "{duration} remaining"
}, zl = {
	key: `${Y}showElapsed`,
	text: "Show elapsed time, {duration}."
}, Bl = {
	key: `${Y}showDuration`,
	text: "Show duration, {duration}."
}, Vl = {
	key: `${Y}showRemaining`,
	text: "Show remaining time, {duration}."
}, Hl = {
	key: `${Y}toggleElapsed`,
	text: "Toggle between elapsed and remaining time."
}, Ul = {
	key: `${Y}toggleDuration`,
	text: "Toggle between duration and remaining time."
}, Wl = {
	key: `${Y}position`,
	text: "{current} of {duration}"
}, Gl = {
	key: `${Y}unknown`,
	text: "Media not loaded, unknown time."
}, Kl = {
	current: zl,
	duration: Bl,
	remaining: Vl
}, ql = {
	current: Nl,
	duration: Pl,
	remaining: Fl
}, Jl = {
	current: Hl,
	duration: Ul,
	remaining: Ul
}, Yl = class e {
	static defaultProps = {
		type: "current",
		negativeSign: "-",
		label: "",
		toggle: !1
	};
	#e = { ...e.defaultProps };
	#t = null;
	#n;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	setMedia(e) {
		this.#t = e;
	}
	setFormatLocale(e) {
		this.#n = e;
	}
	#r() {
		let e = this.#t, t = Zt(e), { type: n } = this.#e;
		switch (n) {
			case "current": return e.currentTime;
			case "duration": return t;
			case "remaining": return e.currentTime - t;
			default: return 0;
		}
	}
	#i() {
		let e = this.#t, t = this.#r(), n = Zt(e), r = this.#n === void 0 ? void 0 : { locale: this.#n };
		return Qc(Math.abs(t), n, r);
	}
	#a() {
		let { type: e } = this.#e, t = this.#r();
		return el(e === "remaining" ? t < 0 ? t : -Math.abs(t) : t);
	}
	#o() {
		let e = this.#r();
		return $c(Math.abs(e));
	}
	#s(e, t) {
		return e === "current" ? t === "remaining" ? "current" : "remaining" : t === "duration" ? "remaining" : "duration";
	}
	getLabel(e, t = this.#e.type) {
		let n = q(this.#e.label, e);
		return n === void 0 ? e.disabled || e.unavailable ? Gl : this.#e.toggle ? Kl[this.#s(t, e.type)] : ql[this.#e.type] : n;
	}
	getLabelParams(e) {
		if (q(this.#e.label, e) !== void 0 || e.disabled || !this.#e.toggle) return;
		let t = this.#n === void 0 ? void 0 : { locale: this.#n }, n = el(Math.abs(e.seconds), t);
		switch (e.type) {
			case "current": return { duration: `${n} elapsed` };
			case "duration": return { duration: `${n} duration` };
			case "remaining": return { duration: `${n} remaining` };
		}
	}
	getDescription(e, t = this.#e.type) {
		return this.#e.toggle && !e.disabled ? Jl[t] : void 0;
	}
	getAttrs(e, t = this.#e.type) {
		return {
			"aria-label": this.getLabel(e, t),
			"aria-description": this.getDescription(e, t),
			"aria-disabled": this.#e.toggle && e.disabled ? "true" : void 0,
			role: this.#e.toggle ? "button" : void 0,
			tabIndex: this.#e.toggle ? e.disabled ? -1 : 0 : void 0
		};
	}
	getState() {
		let e = this.#r(), t = !Qt(this.#t);
		return {
			type: this.#e.type,
			disabled: this.#e.toggle && t,
			unavailable: !this.#e.toggle && t,
			seconds: e,
			negative: this.#e.type === "remaining" && e < 0,
			text: this.#i(),
			phrase: this.#a(),
			datetime: this.#o()
		};
	}
}, Xl = {
	type: "data-type",
	disabled: "data-disabled",
	unavailable: "data-unavailable"
}, Zl = {
	key: "slider.seek",
	text: "Seek"
}, Ql = class e extends ll {
	static defaultProps = {
		...ll.defaultProps,
		label: "",
		changeThrottle: 100,
		pauseOnDrag: !1
	};
	#e = { ...e.defaultProps };
	#t = null;
	#n;
	#r = !1;
	#i;
	constructor(e) {
		super(), e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps), super.setProps({
			...t,
			min: 0
		});
	}
	setMedia(e) {
		this.#t = e;
	}
	setFormatLocale(e) {
		this.#n !== e && (this.#i = void 0), this.#n = e;
	}
	getState() {
		let e = this.#t, { currentTime: t, seeking: n, buffered: r } = e, i = Zt(e);
		super.setProps({
			...this.#e,
			disabled: this.#e.disabled || !Qt(e),
			min: 0,
			max: i
		});
		let a = super.getSliderState(t), o = jr(r.length > 0 ? r[r.length - 1][1] : 0, 0, i);
		return {
			...a,
			currentTime: t,
			duration: i,
			seeking: n,
			bufferPercent: o
		};
	}
	getLabel(e) {
		return super.getLabel(e) || Zl;
	}
	#a(e) {
		return e.dragging ? this.rawValueFromPercent(e.pointerPercent) : e.value;
	}
	#o(e) {
		return this.#n === void 0 ? el(e) : el(e, { locale: this.#n });
	}
	getValueText(e) {
		return e.duration <= 0 ? Gl : Number.isFinite(e.duration) ? Wl : this.getValueTextParams(e).current;
	}
	getValueTextParams(e) {
		let t = Math.floor(this.#a(e)), n = Math.floor(e.duration);
		if (this.#i && this.#i.current === t && this.#i.duration === n) return this.#i.params;
		let r = Number.isFinite(n) ? {
			current: this.#o(t),
			duration: this.#o(n)
		} : { current: this.#o(t) };
		return this.#i = {
			current: t,
			duration: n,
			params: r
		}, r;
	}
	startDrag(e) {
		this.#r = !1, this.#e.pauseOnDrag && e && !e.paused && (this.#r = !0, e.pause());
	}
	endDrag(e) {
		this.#r && e?.play().catch(() => {}), this.#r = !1;
	}
	getAttrs(e) {
		let t = super.getAttrs(e), n = this.#a(e);
		return {
			...t,
			"aria-valuenow": n,
			"aria-valuetext": this.getValueText(e)
		};
	}
}, $l = {
	...ul,
	seeking: "data-seeking"
};
// node_modules/@videojs/core/dist/default/core/ui/time-slider/chapters/core.js
function eu(e, t) {
	let n = e.id, r = `cue-${typeof n == "string" && n ? `${n}-` : ""}${e.startTime}-${e.text}`, i = t.get(r) ?? 0;
	return t.set(r, i + 1), i ? `${r}-${i}` : r;
}
function tu(e, t, n) {
	if (!Number.isFinite(t) || !Number.isFinite(n) || n <= t) return [];
	let r = /* @__PURE__ */ new Map(), i = e.map((e, t) => ({
		cue: e,
		index: t,
		key: eu(e, r)
	})).filter(({ cue: e }) => Number.isFinite(e.startTime) && Number.isFinite(e.endTime)).sort((e, t) => e.cue.startTime - t.cue.startTime || e.index - t.index), a = [], o = t, s = "start";
	for (let { cue: e, key: r } of i) {
		let i = Math.max(t, e.startTime), c = Math.min(n, e.endTime);
		if (c <= i) continue;
		i > o && a.push({
			key: `gap-${s}-${r}`,
			start: o,
			end: i,
			cue: null
		});
		let l = Math.max(i, o);
		c <= l || (a.push({
			key: r,
			start: l,
			end: c,
			cue: e
		}), o = c, s = r);
	}
	return a.length === 0 ? [{
		key: "gap-start-end",
		start: t,
		end: n,
		cue: null
	}] : (o < n && a.push({
		key: `gap-${s}-end`,
		start: o,
		end: n,
		cue: null
	}), a);
}
var nu = class {
	#e = null;
	#t = 0;
	#n = 0;
	#r = null;
	getRanges(e, t, n) {
		if (this.#r && (this.#e === e || this.#e?.length === 0 && e.length === 0) && this.#t === t && this.#n === n) return this.#r;
		let r = n > t, i = r ? n : t + 1, a = tu(r ? e : [], t, i), o = a.map(({ key: e, start: t, end: n, cue: r }) => ({
			key: e,
			start: t,
			end: n,
			highlight: r !== null
		}));
		return this.#e = e, this.#t = t, this.#n = n, this.#r = {
			chapters: a,
			ranges: o,
			max: i
		}, this.#r;
	}
	findChapter(e, t) {
		return So(e, t, (e) => e.start, (e) => e.end);
	}
	getState(e, t, n) {
		return {
			...e,
			cue: t[e.index]?.cue ?? null,
			bufferPercent: jr(n, e.start, e.end)
		};
	}
}, ru = {
	active: "data-active",
	highlighted: "data-highlighted"
}, iu = {
	start: "--media-slider-chapter-start",
	end: "--media-slider-chapter-end",
	width: "--media-slider-chapter-width",
	fill: "--media-slider-chapter-fill",
	buffer: "--media-slider-chapter-buffer"
}, au = class {
	getState(e, t) {
		let { title: n } = e;
		return {
			title: n,
			hidden: n.length === 0,
			visible: t?.controlsVisible ?? !1
		};
	}
}, ou = {
	hidden: "data-hidden",
	visible: "data-visible"
}, su = class e {
	static defaultProps = {
		side: "top",
		align: "center",
		open: !1,
		defaultOpen: !1,
		delay: 600,
		closeDelay: 0,
		disableHoverablePopup: !0,
		disabled: !1,
		sticky: !1
	};
	#e = { ...e.defaultProps };
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	#t = null;
	setInput(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t;
		return {
			open: e.active,
			status: e.status,
			side: this.#e.side,
			align: this.#e.align,
			...ma(e.status)
		};
	}
	getPopupAttrs(e) {
		return {
			popover: "manual",
			role: "presentation"
		};
	}
}, cu = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	...pa
}, lu = class e {
	static defaultProps = {
		delay: 600,
		closeDelay: 0,
		timeout: 400
	};
	#e = { ...e.defaultProps };
	#t = 0;
	#n = !1;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = j(t, e.defaultProps);
	}
	get delay() {
		return this.#e.delay;
	}
	get closeDelay() {
		return this.#e.closeDelay;
	}
	shouldSkipDelay() {
		return this.#n ? !0 : Date.now() - this.#t < this.#e.timeout;
	}
	notifyOpen() {
		this.#n = !0;
	}
	notifyClose() {
		this.#n = !1, this.#t = Date.now();
	}
}, uu = {
	sideOffset: "--media-tooltip-side-offset",
	alignOffset: "--media-tooltip-align-offset",
	boundaryOffset: "--media-tooltip-boundary-offset",
	anchorWidth: "--media-tooltip-anchor-width",
	anchorHeight: "--media-tooltip-anchor-height",
	availableWidth: "--media-tooltip-available-width",
	availableHeight: "--media-tooltip-available-height"
}, du = 300, fu = {
	open: !1,
	generation: 0,
	level: null,
	value: null,
	fill: null,
	min: !1,
	max: !1,
	transitionStarting: !1,
	transitionEnding: !1
}, pu = class {
	state = N({ ...fu });
	#e = {};
	#t = null;
	#n = new ha(() => this.state.patch({
		open: !1,
		level: null,
		value: null,
		fill: null,
		min: !1,
		max: !1
	}), () => _a(this.#e));
	setProps(e) {
		this.#e = e;
	}
	destroy() {
		this.#n.destroy(), this.#a();
	}
	close() {
		this.#a(), this.#n.close();
	}
	processEvent(e, t) {
		if (!ml(e.action)) return !1;
		let n = this.state.current, r = vl(e, t), i = yl(e, t, {
			...Zs,
			...this.#e.labels
		}, r), a = mu(e, r.snapshotVolume, r.nextVolume), o = a !== null && !e.repeat;
		return a || this.#a(), this.state.patch({
			open: !0,
			generation: n.generation + 1,
			level: i.volumeLevel,
			value: i.value,
			fill: i.value,
			min: a && e.repeat ? n.min : o && a === "min",
			max: a && e.repeat ? n.max : o && a === "max"
		}), o && this.#r(), this.#n.arm(), !0;
	}
	#r() {
		this.#i(), this.#t = setTimeout(() => {
			this.#t = null, this.state.patch({
				min: !1,
				max: !1
			});
		}, du);
	}
	#i() {
		this.#t !== null && (clearTimeout(this.#t), this.#t = null);
	}
	#a() {
		this.#i();
	}
};
function mu(e, t, n) {
	return e.action !== "volumeStep" || e.value === void 0 || e.value === 0 || n !== t ? null : e.value < 0 ? "min" : "max";
}
// node_modules/@videojs/core/dist/default/core/ui/volume-indicator/data.js
var hu = {
	open: "data-open",
	level: "data-level",
	min: "data-min",
	max: "data-max",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
}, gu = { fill: "--media-volume-fill" }, _u = class extends J {
	static defaultProps = J.defaultProps;
	#e = null;
	setMedia(e) {
		this.#e = e;
	}
	getState() {
		let e = this.#e.volumeAvailability;
		return {
			...super.getState(),
			availability: e,
			hidden: e !== "available"
		};
	}
}, vu = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style",
	availability: "data-availability",
	hidden: "data-hidden"
}, yu = /* @__PURE__ */ new Map();
function bu(e) {
	return e === void 0 ? "" : Array.isArray(e) ? e.join(":") : e;
}
function xu(e) {
	let t = bu(e), n = yu.get(t);
	if (!n) try {
		n = new Intl.NumberFormat(e, {
			style: "percent",
			maximumFractionDigits: 0
		}), yu.set(t, n);
	} catch {
		return;
	}
	return n;
}
function Su(e) {
	return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
function Cu(t, n) {
	let r = !e(t) || !Number.isFinite(t) ? 0 : Math.min(1, Math.max(0, t));
	try {
		let e = xu(n) ?? xu(void 0);
		if (e) return e.format(r);
	} catch {}
	return Su(r);
}
// node_modules/@videojs/core/dist/default/core/ui/volume-slider/core.js
var wu = class e extends ll {
	static defaultProps = {
		...ll.defaultProps,
		label: "",
		step: 5,
		wheelStep: 5
	};
	#e = e.defaultProps.wheelStep;
	#t = null;
	#n;
	constructor(e) {
		super(), e && this.setProps(e);
	}
	setProps(t) {
		let n = j(t, e.defaultProps);
		this.#e = n.wheelStep, super.setProps(n);
	}
	setMedia(e) {
		this.#t = e;
	}
	setFormatLocale(e) {
		this.#n = e;
	}
	getState() {
		let e = this.#t, { volume: t, muted: n } = e, r = n || t === 0, { dragging: i, dragPercent: a } = this.input, o = t * 100, s = i ? this.valueFromPercent(a) : o, c = super.getSliderState(s), l = e.volumeAvailability;
		return {
			...c,
			disabled: c.disabled || l !== "available",
			fillPercent: r ? 0 : c.fillPercent,
			volume: t,
			muted: r,
			availability: l,
			hidden: l !== "available"
		};
	}
	getWheelStepPercent() {
		let { min: e, max: t } = this.props, n = t - e;
		return n > 0 ? this.#e / n * 100 : 0;
	}
	getLabel(e) {
		return super.getLabel(e) || Ys;
	}
	getValueText(e) {
		return e.muted ? qs : this.getValueTextParams(e).percent;
	}
	getValueTextParams(e) {
		return { percent: Cu(e.value / 100, this.#n) };
	}
	getAttrs(e) {
		return {
			...super.getAttrs(e),
			"aria-valuetext": this.getValueText(e)
		};
	}
}, Tu = {
	...ul,
	availability: "data-availability",
	hidden: "data-hidden"
}, Eu = {
	key: "container.label",
	text: "Media player"
}, Du = class extends L {
	static {
		this.tagName = "media-container";
	}
	#e = null;
	#t = null;
	#n = null;
	#r = new os();
	#i = new P(this, O, Si);
	#a = new K(this, G);
	#o = Ua();
	#s = new k(this, {
		context: Ho,
		initialValue: this.#o
	});
	#c = new A(this, {
		context: s,
		callback: (e) => this.#l(e)
	});
	connectedCallback() {
		super.connectedCallback(), this.#s.setValue(this.#o), this.#l(this.#c.value), la(this), this.#u(), this.#t = new AbortController(), h(this, "pointerup", this.#d, { signal: this.#t.signal });
	}
	disconnectedCallback() {
		this.#e?.(), this.#e = null, this.#t?.abort(), this.#t = null, super.disconnectedCallback();
	}
	update(e) {
		super.update(e), this.#u();
		let t = this.#i.value;
		t ? (this.#r.setMedia(t), W(this, this.#r.getState(), ss)) : this.removeAttribute(ss.controlsVisible);
	}
	#l(e) {
		this.#e?.(), this.#e = null, this.isConnected && e && (this.#e = e.registerContainer(this));
	}
	#u() {
		let e = this.getAttribute("aria-label");
		if (e && e !== this.#n) return;
		if (this.hasAttribute("aria-labelledby")) {
			e === this.#n && (this.removeAttribute("aria-label"), this.#n = null);
			return;
		}
		let t = this.#a.value(Eu);
		this.setAttribute("aria-label", t), this.#n = t;
	}
	#d = () => {
		ua(this);
	};
};
// node_modules/@videojs/html/dist/default/define/ui/container.js
o(Du);
// node_modules/@videojs/html/dist/default/ui/poster/element.js
var Ou = ":host {\n  display: block;\n}\nimg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: var(--media-object-fit, contain);\n  object-position: var(--media-object-position, center);\n}\nimg:not([src]) {\n  visibility: hidden;\n}";
function ku(e) {
	if (e.hasAttribute("src") || e.hasAttribute("srcset")) return !0;
	let t = e.parentElement;
	return t?.localName === "picture" && t.querySelector("source") !== null;
}
function Au(e) {
	return !!e.getAttribute("src") || e.hasAttribute("srcset");
}
function ju() {
	let e = document.createElement("img");
	return e.alt = "", e.setAttribute("part", "image"), e.setAttribute("decoding", "async"), e;
}
var Mu = class extends L {
	static {
		this.tagName = "media-poster";
	}
	#e = new kc();
	#t = this.attachShadow({ mode: "open" });
	#n = ju();
	#r = new MutationObserver(() => this.requestUpdate());
	#i = new P(this, O, Di);
	#a = new P(this, O, Ti);
	#o = null;
	#s = !1;
	#c = "pending";
	#l = null;
	#u = null;
	constructor() {
		super();
		let e = document.createElement("style");
		e.textContent = Ou, this.#t.append(e, document.createElement("slot"), this.#n);
	}
	connectedCallback() {
		if (super.connectedCallback(), this.destroyed) return;
		this.#u = new AbortController();
		let { signal: e } = this.#u;
		this.addEventListener("slotchange", () => this.requestUpdate(), { signal: e }), this.#r.observe(this, {
			childList: !0,
			subtree: !0
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#f(null), this.#r.disconnect(), this.#u?.abort(), this.#u = null;
	}
	get #d() {
		return !this.#o || !ku(this.#o) ? "none" : this.#c === "pending" ? "loading" : this.#c;
	}
	update(e) {
		super.update(e);
		let t = this.#i.value;
		if (!t) return;
		this.#e.setMedia({
			started: t.started,
			poster: this.#a.value?.poster ?? ""
		});
		let { src: n } = this.#e.getState();
		this.#f(Re(this, We) ?? this.#n), this.#p(n), this.#e.setImageLoadState(this.#d), W(this, this.#e.getState(), Ac);
	}
	#f(e) {
		if (e === this.#o || (this.#s && this.#o?.removeAttribute("src"), this.#l?.abort(), this.#l = null, this.#o = e, this.#s = e !== null && !ku(e), this.#c = "pending", e === this.#n ? this.#t.append(this.#n) : e && this.#n.remove(), !e)) return;
		e.naturalWidth > 0 ? this.#c = "loaded" : e.complete && Au(e) && (this.#c = "error"), this.#l = new AbortController();
		let { signal: t } = this.#l, n = (e) => () => {
			this.#c = e, this.requestUpdate();
		};
		e.addEventListener("load", n("loaded"), { signal: t }), e.addEventListener("error", n("error"), { signal: t });
	}
	#p(e) {
		let t = this.#o;
		t && this.#s && (e ? t.getAttribute("src") !== e && (this.#c = "pending", t.setAttribute("src", e)) : (this.#c = "pending", t.removeAttribute("src")));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/poster.js
o(Mu);
// node_modules/@videojs/html/dist/default/ui/title/element.js
var Nu = class extends L {
	static {
		this.tagName = "media-title";
	}
	#e = new au();
	#t = new P(this, O, Ti);
	#n = new P(this, O, Si);
	connectedCallback() {
		super.connectedCallback();
	}
	update(e) {
		super.update(e);
		let t = this.#t.value;
		if (!t) return;
		let n = this.#e.getState(t, this.#n.value);
		this.textContent !== n.title && (this.textContent = n.title), this.hidden = n.hidden, W(this, n, ou);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/title.js
o(Nu);
// node_modules/@videojs/html/dist/default/ui/controls/context.js
var Pu = t(Symbol("@videojs/controls")), Fu = class extends L {
	constructor(...e) {
		super(...e), this.visibility = cs.defaultProps.visibility, this.#e = new cs(), this.#t = new P(this, O, Si), this.#n = new k(this, { context: Pu }), this.#r = !0;
	}
	static {
		this.tagName = "media-controls";
	}
	static {
		this.properties = { visibility: { type: String } };
	}
	#e;
	#t;
	#n;
	#r;
	connectedCallback() {
		super.connectedCallback();
	}
	update(e) {
		super.update(e), this.#e.setProps({ visibility: this.visibility }), this.#e.setMedia(this.#t.value ?? null);
		let t = this.#e.getState();
		if (!t) return;
		W(this, t, ls), this.#n.setValue({
			state: t,
			stateAttrMap: ls
		});
		let n = this.#r;
		this.#r = t.visible, n && !t.visible && this.#i();
	}
	#i() {
		for (let e of this.querySelectorAll(Oc)) {
			let t = e;
			r(t.close) && t.close("imperative-action");
		}
	}
};
// node_modules/@videojs/html/dist/default/define/ui/controls.js
o(Fu);
// node_modules/@videojs/html/dist/default/ui/context-part-element.js
var Iu = class extends L {
	connectedCallback() {
		super.connectedCallback(), this.#e();
	}
	update(e) {
		super.update(e), this.#e();
	}
	#e() {
		let e = this.consumer.value;
		e && W(this, e.state, e.stateAttrMap);
	}
}, Lu = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: Pu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-controls-content";
	}
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("data-interactive", "");
	}
};
// node_modules/@videojs/html/dist/default/define/ui/controls-content.js
o(Lu);
// node_modules/@videojs/html/dist/default/ui/controls/group.js
var Ru = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: Pu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-controls-group";
	}
	connectedCallback() {
		super.connectedCallback(), (this.hasAttribute("aria-label") || this.hasAttribute("aria-labelledby")) && this.setAttribute("role", "group");
	}
};
// node_modules/@videojs/html/dist/default/define/ui/controls-group.js
o(Ru);
// node_modules/@videojs/html/dist/default/ui/hotkey/aria-key-shortcuts-controller.js
var zu = class {
	#e;
	#t;
	#n;
	#r;
	#i = null;
	constructor(e, t, n = {}) {
		this.#e = e, this.#t = t, this.#n = n.value, this.#r = new A(e, {
			context: s,
			callback: (e) => this.#a(e?.container),
			subscribe: !0
		}), e.addController(this);
	}
	get value() {
		return this.aria;
	}
	get aria() {
		return this.details.aria;
	}
	get shortcut() {
		return this.details.shortcut;
	}
	get details() {
		let e = this.#r.value?.container;
		return e ? ra(e).getShortcut(this.#t, this.#n?.()) : {};
	}
	hostConnected() {
		this.#a(this.#r.value?.container);
	}
	hostDisconnected() {
		this.#o();
	}
	#a(e) {
		if (this.#o(), !e) return;
		let t = ra(e), n = () => {
			this.#e.requestUpdate();
		};
		this.#i = t.subscribeShortcutChanges(n), n();
	}
	#o() {
		this.#i?.(), this.#i = null;
	}
}, Bu = class extends L {
	constructor(...e) {
		super(...e), this.disabled = !1, this.label = "", this.hotkeyAction = void 0, this.#e = null, this.#t = null, this.#r = new K(this, G);
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean }
		};
	}
	getIsButtonDisabled() {
		return this.disabled || !this.mediaState.value;
	}
	handleActivate(e, t) {
		Promise.resolve(this.activate(this.mediaState.value, e, t)).catch((e) => {});
	}
	get hotkeyValue() {}
	get $state() {
		return this.core.state;
	}
	#e;
	#t;
	#n;
	#r;
	connectedCallback() {
		if (super.connectedCallback(), this.destroyed) return;
		this.hotkeyAction && !this.#t && (this.#t = new zu(this, this.hotkeyAction, { value: () => this.hotkeyValue })), this.#e = new AbortController();
		let e = sa({
			onActivate: (e, t) => this.handleActivate(e, t),
			isDisabled: () => this.getIsButtonDisabled()
		});
		U(this, e, { signal: this.#e.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#e?.abort(), this.#e = null;
	}
	getLabel() {
		return this.core.state.current.label ? ri(this.core.state.current.label) : void 0;
	}
	getShortcut() {
		return this.#t?.shortcut;
	}
	getResolvedLabel() {
		let e = this.mediaState.value;
		if (!e) return;
		this.core.setMedia(e);
		let t = this.core.getState();
		return this.core.getTooltipLabel ? B(this.core.getTooltipLabel(t), this.#r.value) : B(this.core.getLabel(t), this.#r.value, this.core.getLabelParams?.(t));
	}
	willUpdate(e) {
		super.willUpdate(e), this.core.setProps?.(this);
	}
	update(e) {
		super.update(e);
		let t = this.mediaState.value;
		if (this.#i(), !t) return;
		this.core.setMedia(t);
		let n = this.core.getState(), r = this.core.getAttrs?.(n) ?? {};
		ii(r["aria-label"]) && (r["aria-label"] = B(r["aria-label"], this.#r.value, this.core.getLabelParams?.(n))), U(this, {
			...r,
			"aria-keyshortcuts": this.#t?.aria,
			...Vu(n) && this.reflectsHidden() && { hidden: n.hidden ? "" : void 0 }
		}), W(this, n, this.stateAttrMap);
		for (let [e, t] of Object.entries(this.core.getCSSVars?.(n) ?? {})) this.style.setProperty(e, t);
	}
	reflectsHidden() {
		return !0;
	}
	#i() {
		let e = this.getShortcut();
		e !== this.#n && (this.#n = e, this.dispatchEvent(new CustomEvent(aa)));
	}
};
function Vu(e) {
	return S(e) && i(e.hidden);
}
// node_modules/@videojs/html/dist/default/ui/play-button/element.js
var Hu = class extends Bu {
	constructor(...e) {
		super(...e), this.core = new gc(), this.stateAttrMap = _c, this.mediaState = new P(this, O, Di), this.hotkeyAction = "togglePaused";
	}
	static {
		this.tagName = "media-play-button";
	}
	activate(e) {
		return this.core.toggle(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/play-button.js
o(Hu);
// node_modules/@videojs/html/dist/default/ui/seek-button/element.js
var Uu = class extends Bu {
	constructor(...e) {
		super(...e), this.seconds = Gc.defaultProps.seconds, this.core = new Gc(), this.stateAttrMap = Kc, this.mediaState = new P(this, O, ji), this.hotkeyAction = "seekStep";
	}
	static {
		this.tagName = "media-seek-button";
	}
	static {
		this.properties = {
			...Bu.properties,
			seconds: { type: Number }
		};
	}
	get hotkeyValue() {
		return this.seconds;
	}
	activate(e) {
		this.core.seek(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/seek-button.js
o(Uu);
// node_modules/@videojs/html/dist/default/ui/mute-button/element.js
var Wu = class extends Bu {
	constructor(...e) {
		super(...e), this.core = new cc(), this.stateAttrMap = uc, this.mediaState = new P(this, O, Mi), this.hotkeyAction = "toggleMuted";
	}
	static {
		this.tagName = "media-mute-button";
	}
	activate(e) {
		this.core.toggle(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/mute-button.js
o(Wu);
// node_modules/@videojs/html/dist/default/ui/position-controller.js
var Gu = 0, Ku = class {
	#e;
	#t = new so();
	#n = null;
	constructor(e) {
		this.#e = e, e.addController(this);
	}
	findTrigger(e) {
		let t = this.#e.getRootNode();
		if (t.nodeType !== Node.DOCUMENT_NODE && t.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return this.#r(), null;
		let n = t;
		if (e) return this.#r(), n.getElementById(e);
		if (this.#n) {
			let { id: e, trigger: t } = this.#n;
			if (this.#e.id === e && t.getAttribute("commandfor") === e && this.#e.previousElementSibling === t) return t;
			this.#r();
		}
		if (this.#e.id) return n.querySelector(`[commandfor="${this.#e.id}"]`);
		let r = this.#e.previousElementSibling;
		if (!(r instanceof HTMLElement) || r.getAttribute("commandfor")) return null;
		let i = qu(n);
		return this.#e.id = i, r.setAttribute("commandfor", i), this.#n = {
			id: i,
			trigger: r
		}, r;
	}
	sync(e) {
		this.#t.sync({
			...e,
			popup: this.#e
		});
	}
	cleanup() {
		this.#t.cleanup();
	}
	hostDisconnected() {
		this.cleanup(), this.#r();
	}
	hostDestroyed() {
		this.cleanup(), this.#r();
	}
	#r() {
		let e = this.#n;
		e && (e.trigger.getAttribute("commandfor") === e.id && e.trigger.removeAttribute("commandfor"), this.#e.id === e.id && this.#e.removeAttribute("id"), this.#n = null);
	}
};
function qu(e) {
	let t;
	do
		t = `vjs-popup-${++Gu}`;
	while (e.getElementById(t));
	return t;
}
// node_modules/@videojs/html/dist/default/ui/popover/element.js
var Ju = class extends L {
	constructor(...e) {
		super(...e), this.open = J.defaultProps.open, this.defaultOpen = J.defaultProps.defaultOpen, this.side = J.defaultProps.side, this.align = J.defaultProps.align, this.modal = J.defaultProps.modal, this.closeOnEscape = J.defaultProps.closeOnEscape, this.closeOnOutsideClick = J.defaultProps.closeOnOutsideClick, this.openOnHover = J.defaultProps.openOnHover, this.delay = J.defaultProps.delay, this.closeDelay = J.defaultProps.closeDelay, this.boundary = "container", this.#e = new J(), this.#t = new A(this, {
			context: s,
			subscribe: !0
		}), this.#n = new A(this, { context: Ho }), this.#r = new Ku(this), this.#i = null, this.#a = null, this.#o = null, this.#s = null, this.#c = null;
	}
	static {
		this.tagName = "media-popover";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			modal: { type: Boolean },
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			},
			closeOnOutsideClick: {
				type: Boolean,
				attribute: "close-on-outside-click"
			},
			openOnHover: {
				type: Boolean,
				attribute: "open-on-hover"
			},
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			boundary: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#o = new AbortController(), this.#i = Aa({
			transition: Do(),
			onOpenChange: (e, t) => {
				this.open = e, this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: e,
					...t
				} }));
			},
			closeOnEscape: () => this.closeOnEscape,
			closeOnOutsideClick: () => this.closeOnOutsideClick,
			openOnHover: () => this.openOnHover,
			delay: () => this.delay,
			closeDelay: () => this.closeDelay,
			group: () => this.#n.value
		}), this.#i.setPopupElement(this), U(this, this.#i.popupProps, { signal: this.#o.signal }), this.#a ? this.#a.track(this.#i.input) : this.#a = new pe(this, this.#i.input));
	}
	firstUpdated(e) {
		super.firstUpdated(e), this.defaultOpen && !this.open && this.#i?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#o?.abort(), this.#o = null;
	}
	destroyCallback() {
		this.#u(), this.#i?.destroy(), super.destroyCallback();
	}
	close(e = "imperative-action") {
		this.#i?.close(e);
	}
	get triggerElement() {
		return this.#c;
	}
	willUpdate(e) {
		if (super.willUpdate(e), this.#e.setProps(this), this.#i && e.has("open")) {
			let { active: e } = this.#i.input.current;
			this.open !== e && (this.open ? this.#i.open() : this.#i.close());
		}
	}
	update(e) {
		if (super.update(e), !this.#i) return;
		let t = this.#r.findTrigger();
		this.#l(t);
		let n = this.#i.input.current;
		this.#e.setInput(n);
		let r = this.#e.getState();
		U(this, this.#e.getPopupAttrs(r)), W(this, r, Ec), r.open ? jt(this) : Mt(this), this.#c && U(this.#c, this.#e.getTriggerAttrs(r, this.id)), r.open ? this.#r.sync({
			anchorName: this.id,
			position: {
				side: r.side,
				align: r.align
			},
			trigger: this.#c,
			boundary: this.boundary,
			container: this.#t.value?.container ?? null,
			onSideChange: (e) => this.setAttribute(Ec.side, e)
		}) : this.#r.cleanup();
	}
	#l(e) {
		e !== this.#c && (this.#r.cleanup(), this.#u(), this.#c = e, this.#i?.setTriggerElement(e), e && this.#i && (this.#s = new AbortController(), U(e, this.#i.triggerProps, { signal: this.#s.signal })));
	}
	#u() {
		this.#c && U(this.#c, {
			"aria-expanded": void 0,
			"aria-haspopup": void 0,
			"aria-controls": void 0
		}), this.#s?.abort(), this.#s = null, this.#c = null;
	}
}, Yu = {
	volume: 0,
	muted: !1,
	volumeAvailability: "unsupported",
	mutedAvailability: "unsupported",
	setVolume: () => 0,
	setMuted: () => !1
}, Xu = class extends Ju {
	static {
		this.tagName = "media-volume-popover";
	}
	#e = new _u();
	#t = new P(this, O, Mi);
	update(e) {
		super.update(e), this.#e.setProps(this), this.#e.setInput({
			active: this.hasAttribute("data-open"),
			status: this.hasAttribute("data-starting-style") ? "starting" : this.hasAttribute("data-ending-style") ? "ending" : "idle"
		}), this.#e.setMedia(this.#t.value ?? Yu);
		let t = this.#e.getState();
		W(this, t, vu), this.hidden = t.hidden, t.hidden && (this.close(), this.triggerElement && U(this.triggerElement, {
			"aria-expanded": void 0,
			"aria-haspopup": void 0,
			"aria-controls": void 0
		}));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-popover.js
o(Xu);
// node_modules/@videojs/html/dist/default/ui/slider/context.js
var Zu = t(Symbol("@videojs/slider")), Qu = class extends L {
	constructor(...e) {
		super(...e), this.label = "", this.step = wu.defaultProps.step, this.largeStep = wu.defaultProps.largeStep, this.wheelStep = wu.defaultProps.wheelStep, this.orientation = wu.defaultProps.orientation, this.disabled = wu.defaultProps.disabled, this.thumbAlignment = wu.defaultProps.thumbAlignment, this.#e = new wu(), this.#t = new P(this, O, Si), this.#n = new k(this, { context: Zu }), this.#r = new P(this, O, Mi), this.#i = new K(this, G), this.#a = null, this.#o = null, this.#s = null;
	}
	static {
		this.tagName = "media-volume-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			wheelStep: {
				type: Number,
				attribute: "wheel-step"
			},
			orientation: { type: String },
			disabled: { type: Boolean },
			thumbAlignment: {
				type: String,
				attribute: "thumb-alignment"
			}
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	connectedCallback() {
		if (super.connectedCallback(), this.destroyed) return;
		this.#o = new AbortController();
		let e = this.#o.signal, t = () => {
			let e = this.#r.value;
			return this.disabled || !e || e.volumeAvailability !== "available";
		}, n = () => (this.#r.value?.volume ?? 0) * 100, r = () => this.#e.getStepPercent(), i = (e) => this.#l(e);
		this.#a = uo({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled: t,
			getPercent: n,
			getStepPercent: r,
			getLargeStepPercent: () => this.#e.getLargeStepPercent(),
			onValueChange: i,
			onValueCommit: i,
			onPressStart: () => {
				this.#s ??= this.#t.value?.requestControlsLock() ?? null;
			},
			onPressEnd: () => this.#c(),
			onDragStart: () => {
				this.dispatchEvent(new CustomEvent("drag-start", { bubbles: !0 }));
			},
			onDragEnd: () => {
				this.dispatchEvent(new CustomEvent("drag-end", { bubbles: !0 }));
			},
			adjustPercent: (e, t, n) => this.#e.adjustPercentForAlignment(e, t, n),
			onResize: () => {
				this.thumbAlignment === "edge" && this.requestUpdate();
			}
		});
		let a = Mo({
			isDisabled: t,
			getPercent: n,
			getStepPercent: () => this.#e.getWheelStepPercent(),
			onValueChange: (e) => this.#r.value?.setVolume(this.#e.rawValueFromPercent(e) / 100)
		});
		U(this, this.#a.rootProps, { signal: e }), U(this, a, { signal: e }), I(this, this.#a.rootStyle), this.#a.input.subscribe(() => this.requestUpdate(), { signal: e });
	}
	disconnectedCallback() {
		this.#c(), super.disconnectedCallback(), this.#o?.abort(), this.#o = null;
	}
	destroyCallback() {
		this.#c(), this.#a?.destroy(), super.destroyCallback();
	}
	#c() {
		this.#s?.(), this.#s = null;
	}
	willUpdate(e) {
		super.willUpdate(e), this.#e.setProps(this), this.#e.setFormatLocale(this.#i.locale);
	}
	update(e) {
		if (super.update(e), !this.#a) return;
		let t = this.#r.value;
		if (!t) return;
		this.#e.setInput(this.#a.input.current), this.#e.setMedia(t);
		let n = this.#e.getState(), r = po(this.#a.adjustForAlignment(n)), i = this.#e.getAttrs(n);
		I(this, r), W(this, n, Tu), U(this, { hidden: n.hidden ? "" : void 0 }), this.#n.setValue({
			state: n,
			stateAttrMap: Tu,
			pointerValue: this.#e.valueFromPercent(n.pointerPercent),
			thumbAttrs: {
				...i,
				"aria-label": B(i["aria-label"], this.#i.value),
				"aria-valuetext": B(i["aria-valuetext"], this.#i.value, this.#e.getValueTextParams(n))
			},
			thumbProps: this.#a.thumbProps,
			formatValue: (e) => `${Math.round(e)}%`
		});
	}
	#l(e) {
		this.#r.value?.setVolume(this.#e.valueFromPercent(e) / 100);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-slider.js
o(Qu);
// node_modules/@videojs/html/dist/default/ui/time-slider/element.js
var $u = class extends L {
	constructor(...e) {
		super(...e), this.label = "", this.changeThrottle = Ql.defaultProps.changeThrottle, this.step = Ql.defaultProps.step, this.largeStep = Ql.defaultProps.largeStep, this.orientation = Ql.defaultProps.orientation, this.disabled = Ql.defaultProps.disabled, this.thumbAlignment = Ql.defaultProps.thumbAlignment, this.pauseOnDrag = Ql.defaultProps.pauseOnDrag, this.#e = new Ql(), this.#t = new P(this, O, Si), this.#n = new k(this, { context: Zu }), this.#r = new P(this, O, ji), this.#i = new P(this, O, xi), this.#a = new P(this, O, Di), this.#o = _o(fo.fill), this.#s = new K(this, G), this.#c = {}, this.#l = null, this.#u = null, this.#d = null;
	}
	static {
		this.tagName = "media-time-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			changeThrottle: {
				type: Number,
				attribute: "change-throttle"
			},
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			orientation: { type: String },
			disabled: { type: Boolean },
			thumbAlignment: {
				type: String,
				attribute: "thumb-alignment"
			},
			pauseOnDrag: {
				type: Boolean,
				attribute: "pause-on-drag"
			}
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	connectedCallback() {
		if (super.connectedCallback(), this.destroyed) return;
		this.#u = new AbortController();
		let e = this.#u.signal, t, n = (e) => {
			let t = this.#r.value;
			if (t) {
				let n = this.#e.rawValueFromPercent(e);
				this.#o.seek(e), t.seek(n);
			}
		};
		this.#l = uo({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled: () => {
				let e = this.#r.value, t = this.#i.value;
				return this.disabled || !e || !Qt({
					...e,
					...t ?? {
						buffered: [],
						seekable: []
					}
				});
			},
			getPercent: () => {
				let e = this.#r.value;
				return e ? this.#e.percentFromValue(e.currentTime) : 0;
			},
			getStepPercent: () => this.#e.getStepPercent(),
			getLargeStepPercent: () => this.#e.getLargeStepPercent(),
			onValueChange: (e) => {
				this.#l?.input.current.dragging && e !== t && (t = e, n(e));
			},
			onValueCommit: (e) => {
				e !== t && n(e), t = void 0;
			},
			changeThrottle: this.changeThrottle,
			onPressStart: () => {
				this.#d ??= this.#t.value?.requestControlsLock() ?? null;
			},
			onPressEnd: () => this.#p(),
			onDragStart: () => {
				this.#e.startDrag(this.#a.value), this.dispatchEvent(new CustomEvent("drag-start", { bubbles: !0 }));
			},
			onDragEnd: () => {
				this.#e.endDrag(this.#a.value), this.dispatchEvent(new CustomEvent("drag-end", { bubbles: !0 }));
			},
			adjustPercent: (e, t, n) => this.#e.adjustPercentForAlignment(e, t, n),
			onResize: () => {
				this.thumbAlignment === "edge" && this.requestUpdate();
			}
		}), U(this, this.#l.rootProps, { signal: e }), I(this, this.#l.rootStyle), this.#l.input.subscribe(() => this.requestUpdate(), { signal: e }), this.#o.state.subscribe(() => this.requestUpdate(), { signal: e });
	}
	disconnectedCallback() {
		this.#p(), this.#f(), this.#o.destroy(), super.disconnectedCallback(), this.#u?.abort(), this.#u = null;
	}
	destroyCallback() {
		this.#p(), this.#f(), this.#o.destroy(), this.#l?.destroy(), super.destroyCallback();
	}
	#f() {
		this.#e.endDrag(this.#a.value);
	}
	#p() {
		this.#d?.(), this.#d = null;
	}
	willUpdate(e) {
		super.willUpdate(e), this.#e.setProps({
			label: this.label,
			changeThrottle: this.changeThrottle,
			step: this.step,
			largeStep: this.largeStep,
			orientation: this.orientation,
			disabled: this.disabled,
			thumbAlignment: this.thumbAlignment,
			pauseOnDrag: this.pauseOnDrag
		}), this.#e.setFormatLocale(this.#s.locale);
	}
	update(e) {
		if (super.update(e), !this.#l) return;
		let t = this.#r.value, n = this.#i.value;
		if (!t) {
			this.#o.destroy(), this.removeAttribute("data-playing");
			return;
		}
		this.#e.setInput(this.#l.input.current);
		let r = {
			...t,
			...n ?? {
				buffered: [],
				seekable: []
			}
		};
		this.#e.setMedia(r);
		let i = this.#e.getState();
		this.#o.update(i.seeking, i.fillPercent, this);
		let a = this.#o.state.current.percent;
		this.toggleAttribute("data-playing", $t(this.#a.value) && !i.disabled && !i.dragging && !i.seeking && a === void 0);
		let o = a === void 0 || i.dragging || i.disabled ? i : {
			...i,
			fillPercent: a
		}, s = mo(this.#l.adjustForAlignment(o)), c = Object.fromEntries(Object.entries(s).filter(([e, t]) => this.#c[e] !== t));
		I(this, c), this.#c = s;
		let l = this.#e.getAttrs(i);
		W(this, i, $l), this.#n.setValue({
			state: i,
			stateAttrMap: $l,
			pointerValue: this.#e.rawValueFromPercent(i.pointerPercent),
			thumbAttrs: {
				...l,
				"aria-label": B(l["aria-label"], this.#s.value),
				"aria-valuetext": B(l["aria-valuetext"], this.#s.value, this.#e.getValueTextParams(i))
			},
			thumbProps: this.#l.thumbProps,
			formatValue: (e) => Qc(e, i.duration, { locale: this.#s.locale })
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-slider.js
o($u);
// node_modules/@videojs/html/dist/default/ui/time-slider/chapters.js
var ed = class extends L {
	static {
		this.tagName = "media-time-slider-chapters";
	}
	#e = new dl();
	#t = new nu();
	#n = new A(this, {
		context: Zu,
		subscribe: !0
	});
	#r = new P(this, O, Ai);
	#i = new P(this, O, xi);
	#a = new P(this, O, ji);
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = !1;
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("aria-hidden", "true");
	}
	update(e) {
		super.update(e);
		let t = this.#n.value, n = this.#a.value?.duration ?? 0, r = this.#l();
		if (!t || (W(this, t.state, t.stateAttrMap), !r)) return;
		let { chapters: i, ranges: a, max: o } = this.#t.getRanges(this.#r.value?.chaptersCues ?? [], 0, n), s = this.#e.getGeometry({
			ranges: a,
			min: 0,
			max: o,
			orientation: t.state.orientation
		}), c = this.#i.value?.buffered ?? [], l = c.length ? c[c.length - 1][1] : 0, u = /* @__PURE__ */ new Map();
		for (let e of s) {
			let n = this.#t.getState(this.#e.getState(e, t.state, t.pointerValue), i, l), a = this.#o.get(n.key);
			a ||= Rt(r, this.ownerDocument), this.#u(a, "pointer-events", n.cue ? void 0 : "none"), this.#u(a, iu.start, n.startPercent), this.#u(a, iu.end, n.endPercent), this.#u(a, iu.width, n.width ?? n.height), this.#u(a, iu.fill, `${n.fillPercent}%`), this.#u(a, iu.buffer, `${n.bufferPercent}%`), W(a, t.state, t.stateAttrMap), W(a, n, ru), u.set(n.key, a);
		}
		for (let [e, t] of this.#o) u.has(e) || t.remove();
		let d = null;
		for (let e of [...u.values()].reverse()) (e.parentNode !== this || e.nextSibling !== d) && this.insertBefore(e, d), d = e;
		this.#o.clear();
		for (let [e, t] of u) this.#o.set(e, t);
	}
	#l() {
		if (this.#c) return this.#s;
		let e = It(this);
		if (!e) {
			for (let e of [...this.childNodes]) e.remove();
			return null;
		}
		this.#c = !0;
		let t = Lt(e);
		for (let t of [...this.childNodes]) t !== e && t.remove();
		return t?.namespaceURI === "http://www.w3.org/1999/xhtml" ? (this.#s = t, this.#s) : null;
	}
	#u(e, t, n) {
		n === void 0 ? e.style.removeProperty(t) : e.style.setProperty(t, n);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-slider-chapters.js
o(ed);
// node_modules/@videojs/html/dist/default/ui/time-slider/chapter-title.js
var td = class extends L {
	static {
		this.tagName = "media-time-slider-chapter-title";
	}
	#e = new nu();
	#t = new A(this, {
		context: Zu,
		subscribe: !0
	});
	#n = new P(this, O, Ai);
	#r = new P(this, O, ji);
	update(e) {
		super.update(e);
		let t = this.#t.value;
		if (!t) return;
		let n = this.#r.value?.duration ?? 0, { chapters: r } = this.#e.getRanges(this.#n.value?.chaptersCues ?? [], 0, n), i = t.state.interactive && !t.state.pointing && !t.state.dragging, a = t.state.pointing || t.state.dragging ? t.pointerValue : t.state.value, o = this.#e.findChapter(r, a);
		this.textContent = o?.cue?.text ?? "", i ? (this.removeAttribute("aria-hidden"), this.setAttribute("aria-live", "polite")) : (this.setAttribute("aria-hidden", "true"), this.removeAttribute("aria-live"));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-slider-chapter-title.js
o(td);
// node_modules/@videojs/html/dist/default/ui/slider/track.js
var nd = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: Zu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-slider-track";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-track.js
o(nd);
// node_modules/@videojs/html/dist/default/ui/slider/buffer.js
var rd = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: Zu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-slider-buffer";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-buffer.js
o(rd);
// node_modules/@videojs/html/dist/default/ui/slider/fill.js
var id = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: Zu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-slider-fill";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-fill.js
o(id);
// node_modules/@videojs/html/dist/default/ui/slider/thumb.js
var ad = class extends L {
	static {
		this.tagName = "media-slider-thumb";
	}
	#e = new A(this, {
		context: Zu,
		subscribe: !0
	});
	#t = null;
	#n = !1;
	connectedCallback() {
		super.connectedCallback(), this.#t = new AbortController(), this.#n = !1;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#t?.abort(), this.#t = null, this.#n = !1;
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		t && (!this.#n && this.#t && (U(this, t.thumbProps, { signal: this.#t.signal }), this.#n = !0), U(this, t.thumbAttrs), W(this, t.state, t.stateAttrMap));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-thumb.js
o(ad);
// node_modules/@videojs/html/dist/default/ui/slider/preview.js
var od = class extends L {
	constructor(...e) {
		super(...e), this.overflow = "clamp", this.#e = new A(this, {
			context: Zu,
			subscribe: !0
		}), this.#t = null, this.#n = 0;
	}
	static {
		this.tagName = "media-slider-preview";
	}
	static {
		this.properties = { overflow: { type: String } };
	}
	#e;
	#t;
	#n;
	connectedCallback() {
		super.connectedCallback(), this.#t = wt(this, ([e]) => {
			this.#n = e.contentRect.width, this.#r();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#t?.(), this.#t = null;
	}
	#r() {
		I(this, ho(this.#n, this.overflow));
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		t && W(this, t.state, t.stateAttrMap), this.#r();
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-preview.js
o(od);
// node_modules/@videojs/html/dist/default/ui/thumbnail/element.js
var sd = ":host {\n  display: inline-block;\n  overflow: hidden;\n}\nimg,\n::slotted(img) {\n  display: block;\n}", cd = [
	"crossorigin",
	"loading",
	"fetchpriority"
];
function ld() {
	let e = document.createElement("img");
	return e.alt = "", e.setAttribute("part", "image"), e.setAttribute("aria-hidden", "true"), e.setAttribute("decoding", "async"), e;
}
var ud = class extends L {
	static {
		this.tagName = "media-thumbnail";
	}
	static {
		this.properties = {
			time: { type: Number },
			crossOrigin: {
				type: String,
				attribute: "crossorigin"
			},
			loading: { type: String },
			fetchPriority: {
				type: String,
				attribute: "fetchpriority"
			}
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	constructor() {
		super(), this.time = 0, this.#e = new Co(), this.#t = this.attachShadow({ mode: "open" }), this.#n = ld(), this.#r = new MutationObserver(() => this.requestUpdate()), this.#i = new MutationObserver(() => this.requestUpdate()), this.#a = new P(this, O, Ai), this.#o = null, this.#s = null, this.#c = /* @__PURE__ */ new Set(), this.#l = [], this.#f = null;
		let e = document.createElement("style");
		e.textContent = sd, this.#t.append(e, document.createElement("slot"), this.#n);
	}
	get thumbnails() {
		return this.#u;
	}
	set thumbnails(e) {
		this.#u = e, this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.#f = wo({
			getContainer: () => this,
			getImg: () => this.#s,
			onStateChange: () => this.requestUpdate()
		}), this.#r.observe(this, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: ["src", "srcset"]
		}), this.#o = new AbortController(), h(this, "slotchange", () => this.requestUpdate(), { signal: this.#o.signal }), this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#_(null), this.#r.disconnect(), this.#o?.abort(), this.#o = null, this.#f?.destroy(), this.#f = null;
	}
	destroyCallback() {
		this.#f?.destroy(), super.destroyCallback();
	}
	update(e) {
		super.update(e);
		let t = this.#a.value;
		if (this.#u) this.#l = this.#u;
		else if (t !== this.#d) {
			this.#d = t;
			let e = t?.thumbnailsTrack;
			this.#l = e && e.cues.length > 0 ? Ml(e.cues, e.src ?? void 0) : [];
		}
		let n = this.#e.findActiveThumbnail(this.#l, this.time), r = Re(this, We) ?? this.#n;
		if (this.#_(r), this.#m(r, t), this.#f?.updateSrc(n?.url), this.#v(n?.url), this.#f?.connect(), !n) {
			this.#g();
			let e = this.#e.getState(!1, !1, void 0);
			U(this, this.#e.getAttrs(e)), W(this, e, Al);
			return;
		}
		let i = this.#f, a = this.#e.getState(i?.loading ?? !1, i?.error ?? !1, n);
		if (U(this, this.#e.getAttrs(a)), W(this, a, Al), i?.naturalWidth && i.naturalHeight) {
			let e = i.readConstraints(), t = this.#e.resize(n, i.naturalWidth, i.naturalHeight, e);
			t && this.#h(t);
		}
	}
	#p(e) {
		return this.#u ? void 0 : e?.thumbnailsTrack?.crossOrigin;
	}
	#m(e, t) {
		let n = {
			crossorigin: this.#e.resolveCrossOrigin(this.crossOrigin, this.#p(t)),
			loading: this.loading,
			fetchpriority: this.fetchPriority
		};
		for (let e of this.#c) delete n[e];
		U(e, n);
	}
	#h(e) {
		this.style.width = `${e.containerWidth}px`, this.style.height = `${e.containerHeight}px`;
		let t = this.#s?.style;
		t && (t.width = `${e.imageWidth}px`, t.height = `${e.imageHeight}px`, t.maxWidth = "none", t.transform = e.offsetX || e.offsetY ? `translate(-${e.offsetX}px, -${e.offsetY}px)` : "");
	}
	#g() {
		this.style.width = "", this.style.height = "";
		let e = this.#s?.style;
		e && (e.width = "", e.height = "", e.maxWidth = "", e.transform = "");
	}
	#_(e) {
		if (e === this.#s) return;
		let t = this.#s;
		if (t) {
			this.#f?.disconnectImg(t), this.#g(), t.removeAttribute("src"), t.removeAttribute("srcset");
			for (let e of cd) this.#c.has(e) || t.removeAttribute(e);
		}
		this.#s = e, this.#c = new Set(e ? cd.filter((t) => e.hasAttribute(t)) : []), this.#i.disconnect(), e && e !== this.#n && this.#i.observe(e, {
			attributes: !0,
			attributeFilter: ["src", "srcset"]
		}), e === this.#n ? this.#t.append(this.#n) : e && this.#n.remove(), this.#f?.updateSrc(void 0);
	}
	#v(e) {
		let t = this.#s;
		t && (t.removeAttribute("srcset"), e ? t.getAttribute("src") !== e && t.setAttribute("src", e) : t.removeAttribute("src"));
	}
}, dd = class extends ud {
	static {
		this.tagName = "media-slider-thumbnail";
	}
	#e = new A(this, {
		context: Zu,
		subscribe: !0
	});
	update(e) {
		let t = this.#e.value;
		t && (this.time = t.pointerValue), super.update(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-thumbnail.js
o(dd);
// node_modules/@videojs/html/dist/default/ui/slider/value.js
var fd = class extends L {
	constructor(...e) {
		super(...e), this.type = "current", this.#e = new A(this, {
			context: Zu,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-slider-value";
	}
	static {
		this.properties = { type: { type: String } };
	}
	#e;
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("aria-live", "off");
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		if (!t) return;
		let n = this.type === "pointer" ? t.pointerValue : t.state.value;
		this.textContent = t.formatValue ? t.formatValue(n, this.type) : String(Math.round(n)), W(this, t.state, t.stateAttrMap);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-value.js
o(fd);
// node_modules/@videojs/html/dist/default/ui/time/element.js
var pd = class extends L {
	constructor(...e) {
		super(...e), this.type = Yl.defaultProps.type, this.negativeSign = Yl.defaultProps.negativeSign, this.label = "", this.toggle = Yl.defaultProps.toggle, this.#e = new Yl(), this.#t = new P(this, O, ji), this.#n = new P(this, O, xi), this.#r = new K(this, G), this.#i = document.createElement("span"), this.#a = new Text(), this.#o = null, this.#s = !1, this.#c = Yl.defaultProps.type, this.#u = (e) => {
			!e.defaultPrevented && this.toggle && this.#t.value && this.#p() && this.#f();
		}, this.#d = (e) => {
			!e.defaultPrevented && at(e) && this.toggle && this.#t.value && this.#p() && (e.preventDefault(), e.repeat || this.#f());
		};
	}
	static {
		this.tagName = "media-time";
	}
	static {
		this.properties = {
			type: { type: String },
			negativeSign: {
				type: String,
				attribute: "negative-sign"
			},
			label: { type: String },
			toggle: { type: Boolean }
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	connectedCallback() {
		super.connectedCallback(), this.#o = new AbortController(), this.#m(), this.#i.parentNode || (this.#i.setAttribute("aria-hidden", "true"), this.#i.hidden = !0, this.append(this.#i, this.#a));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#o?.abort(), this.#o = null, this.#s = !1;
	}
	willUpdate(e) {
		super.willUpdate(e), (e.has("type") || e.has("toggle")) && (this.#c = this.type);
	}
	update(e) {
		super.update(e), e.has("toggle") && this.#m();
		let t = this.#t.value;
		if (!t) {
			this.#h();
			return;
		}
		this.#e.setProps({
			type: this.toggle ? this.#c : this.type,
			negativeSign: this.negativeSign,
			label: this.label,
			toggle: this.toggle
		}), this.#e.setMedia({
			...t,
			seekable: this.#n.value?.seekable ?? []
		}), this.#e.setFormatLocale(this.#r.locale);
		let n = this.#e.getState();
		this.#i.hidden = !n.negative, this.#i.textContent = n.negative ? this.negativeSign : "", this.#a.textContent = n.text;
		let r = this.#e.getAttrs(n, this.type), i = B(r["aria-label"], this.#r.value, this.#l(n)), a = r["aria-description"] ? B(r["aria-description"], this.#r.value) : void 0;
		U(this, {
			"aria-label": i,
			"aria-description": a,
			"aria-disabled": r["aria-disabled"],
			role: this.toggle ? r.role : "time",
			tabIndex: r.tabIndex,
			datetime: this.toggle || n.unavailable ? void 0 : n.datetime
		}), W(this, n, Xl);
	}
	#l(e) {
		if (!this.#e.getLabelParams(e)) return;
		let t = el(Math.abs(e.seconds), { locale: this.#r.locale }), n = {
			current: Il,
			duration: Ll,
			remaining: Rl
		}[e.type];
		return { duration: B(n, this.#r.value, { duration: t }) };
	}
	#u;
	#d;
	#f() {
		this.#c = this.type === "current" ? this.#c === "remaining" ? "current" : "remaining" : this.#c === "duration" ? "remaining" : "duration", this.requestUpdate();
	}
	#p() {
		let e = this.#t.value;
		return e ? Qt({
			...e,
			seekable: this.#n.value?.seekable ?? []
		}) : !1;
	}
	#m() {
		!this.toggle || !this.#o || this.#s || (this.#s = !0, U(this, {
			onClick: this.#u,
			onKeyDown: this.#d
		}, { signal: this.#o.signal }));
	}
	#h() {
		U(this, {
			"aria-label": void 0,
			"aria-description": void 0,
			"aria-disabled": void 0,
			role: void 0,
			tabIndex: void 0,
			datetime: void 0,
			"data-type": void 0,
			"data-disabled": void 0,
			"data-unavailable": void 0
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time.js
o(pd);
// node_modules/@videojs/html/dist/default/ui/time/group.js
var md = class extends L {
	static {
		this.tagName = "media-time-group";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-group.js
o(md);
// node_modules/@videojs/html/dist/default/ui/time/separator.js
var hd = class extends L {
	static {
		this.tagName = "media-time-separator";
	}
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("aria-hidden", "true"), this.textContent?.trim() || (this.textContent = "/");
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-separator.js
o(hd);
// node_modules/@videojs/html/dist/default/ui/radio-group/context.js
var gd = t(Symbol("@videojs/radio-group")), _d = Symbol("@videojs/menu"), vd = Symbol("@videojs/menu-group"), yd = t(_d), bd = t(vd), xd = class extends L {
	constructor(...e) {
		super(...e), this.open = tc.defaultProps.open, this.defaultOpen = tc.defaultProps.defaultOpen, this.side = tc.defaultProps.side, this.align = tc.defaultProps.align, this.closeOnEscape = tc.defaultProps.closeOnEscape, this.closeOnOutsideClick = tc.defaultProps.closeOnOutsideClick, this.boundary = "container", this.#e = new tc(), this.#t = new k(this, { context: yd }), this.#n = new Ku(this), this.#r = new P(this, O, Si), this.#i = new A(this, {
			context: s,
			subscribe: !0
		}), this.#a = new A(this, { context: Ho }), this.#o = null, this.#s = null, this.#c = null, this.#l = null, this.#u = null, this.#d = null, this.#f = !1, this.#p = !1, this.#m = null, this.#h = /* @__PURE__ */ new Map(), this.#g = null, this.#v = (e) => {
			this.#o?.contentProps.onFocusOut(e);
		}, this.#b = (e, t) => {
			let n = this.#h.get(e);
			t && Sd(n, t) || (t || n) && (t ? this.#h.set(e, t) : this.#h.delete(e), this.#g = ec(this.#h.values()), (this.#g?.disabled || this.#g?.hidden) && this.open && this.close("imperative-action"), this.#x(this.#d));
		};
	}
	static {
		this.tagName = "media-menu";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			},
			closeOnOutsideClick: {
				type: Boolean,
				attribute: "close-on-outside-click"
			},
			boundary: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	#p;
	#m;
	#h;
	#g;
	get menu() {
		return this.#o;
	}
	get popup() {
		return this.#s;
	}
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#l = new AbortController(), this.#s = Ha(), this.#s.setElement(this), this.#o = za({
			transition: Do(),
			onOpenChange: (e, t) => {
				this.dispatchEvent(new CustomEvent("open-change", {
					bubbles: !0,
					cancelable: !0,
					composed: !0,
					detail: {
						open: e,
						...t
					}
				})) && (this.open = e);
			},
			closeOnEscape: () => this.closeOnEscape,
			closeOnOutsideClick: () => this.closeOnOutsideClick,
			group: () => this.#a.value
		}), this.#o.setPopupElement(this), U(this, { onFocusOut: this.#v }, { signal: this.#l.signal }), this.#c ? this.#c.track(this.#o.input) : this.#c = new pe(this, this.#o.input));
	}
	disconnectedCallback() {
		this.#_(), super.disconnectedCallback(), this.#n.cleanup(), this.#S(), this.#s?.destroy(), this.#s = null, this.#o?.destroy(), this.#o = null, this.#l?.abort(), this.#l = null;
	}
	close(e = "imperative-action") {
		this.#o?.close(e);
	}
	openMenu(e = "imperative-action") {
		this.#o?.open(e);
	}
	willUpdate(e) {
		super.willUpdate(e), !this.hasUpdated && this.defaultOpen && !this.open && (this.open = !0), this.#e.setProps({
			open: this.open,
			defaultOpen: this.defaultOpen,
			side: this.side,
			align: this.align,
			closeOnEscape: this.closeOnEscape,
			closeOnOutsideClick: this.closeOnOutsideClick
		}), this.#o && e.has("open") && this.#o.syncOpen(this.open);
	}
	update(e) {
		if (super.update(e), !this.#o || !this.#s) return;
		let t = this.#o.input.current;
		this.#e.setInput({
			...t,
			isSubmenu: !1
		});
		let n = this.#e.getState();
		n.open ? this.#m ??= this.#r.value?.requestControlsLock() ?? null : this.#_();
		let r = this.#n.findTrigger();
		if (this.#y(r), U(this, this.#e.getPopupAttrs()), W(this, n, Ba), n.open ? jt(this) : Mt(this), this.#d && (U(this.#d, this.#e.getTriggerAttrs(n, this.#o.contentElement?.id)), this.#x(this.#d)), !n.open) this.#n.cleanup();
		else {
			this.#s.sync();
			let e = Fa(n.side, n.align);
			e && this.#d && this.#n.sync({
				anchorName: this.id,
				position: e,
				trigger: this.#d,
				boundary: this.boundary,
				container: this.#i.value?.container ?? null,
				cssVars: Ia,
				trackResize: !1,
				onSideChange: (e) => this.setAttribute(Ba.side, e)
			});
		}
		this.#t.setValue({
			core: this.#e,
			menu: this.#o,
			popup: this.#s,
			state: n,
			setOptionState: this.#b
		});
	}
	#_() {
		this.#m?.(), this.#m = null;
	}
	#v;
	#y(e) {
		e !== this.#d && (this.#n.cleanup(), this.#S(), this.#d = e, this.#f = e ? Cd(e) : !1, this.#p = e?.hidden === !0, this.#o?.setTriggerElement(e), e && this.#o && (this.#u = new AbortController(), U(e, this.#o.triggerProps, { signal: this.#u.signal }), this.#x(e)));
	}
	#b;
	#x(e) {
		if (!e) return;
		U(e, {
			disabled: this.#f || this.#g?.disabled || void 0,
			"aria-disabled": this.#f || this.#g?.disabled ? "true" : void 0,
			"data-availability": this.#g?.availability,
			hidden: this.#p || this.#g?.hidden || void 0
		});
		let t = e.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
		t && t.textContent !== this.#g?.value && (t.textContent = this.#g?.value ?? "");
	}
	#S() {
		if (this.#d) {
			U(this.#d, {
				"aria-expanded": void 0,
				"aria-haspopup": void 0,
				"aria-controls": void 0,
				disabled: this.#f || void 0,
				"aria-disabled": this.#f ? "true" : void 0,
				"data-availability": void 0,
				hidden: this.#p || void 0
			});
			let e = this.#d.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
			e?.textContent && (e.textContent = "");
		}
		this.#u?.abort(), this.#u = null, this.#d = null, this.#f = !1, this.#p = !1;
	}
};
function Sd(e, t) {
	return e?.value === t.value && e.disabled === t.disabled && e.hidden === t.hidden && e.availability === t.availability;
}
function Cd(e) {
	return e.hasAttribute("disabled") || "disabled" in e && e.disabled === !0;
}
// node_modules/@videojs/html/dist/default/define/ui/menu.js
o(xd);
// node_modules/@videojs/html/dist/default/ui/menu/content.js
var wd = 0, Td = class e extends L {
	constructor(...e) {
		super(...e), this.open = !1, this.defaultOpen = !1, this.#e = new A(this, {
			context: yd,
			subscribe: !0
		}), this.#t = new k(this, { context: yd }), this.#n = new tc(), this.#r = `vjs-menu-content-${wd++}`, this.#i = null, this.#a = null, this.#o = null, this.#s = null, this.#c = !1, this.#l = null, this.#u = null, this.#d = null, this.#f = /* @__PURE__ */ new Map(), this.#p = Symbol("menu"), this.#m = null, this.#h = null, this.#g = null, this.#_ = !1, this.#v = !1, this.#y = !1, this.#b = !1, this.#T = (e) => {
			let t = Pa(e), n = e.defaultPrevented;
			this.#a?.contentProps.onKeyDown(e), this.#o && (e.key === "ArrowLeft" || e.key === "Escape") && !n && (e.preventDefault(), this.#a?.close("escape")), e.key !== "Escape" && t && e.stopPropagation();
		}, this.#E = (e) => {
			this.#a?.contentProps.onFocusOut(e);
		}, this.#D = (e, t) => {
			let n = this.#f.get(e);
			t && Ed(n, t) || (t || n) && (t ? this.#f.set(e, t) : this.#f.delete(e), this.#m = ec(this.#f.values()), (this.#m?.disabled || this.#m?.hidden) && this.open && this.#o && this.close("imperative-action"), this.#k(this.#C()), this.#h?.setOptionState(this.#p, this.#m));
		};
	}
	static {
		this.tagName = "media-menu-content";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			}
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	#p;
	#m;
	#h;
	#g;
	#_;
	#v;
	#y;
	#b;
	get context() {
		return this.#i;
	}
	connectedCallback() {
		super.connectedCallback(), this.#b || (this.#l = new AbortController(), U(this, {
			onKeyDown: this.#T,
			onFocusOut: this.#E
		}, { signal: this.#l.signal }));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#b || (this.#S(), this.#l?.abort(), this.#l = null);
	}
	openMenu(e = "imperative-action") {
		this.#a?.open(e);
	}
	close(e = "imperative-action") {
		this.#a?.close(e);
	}
	willUpdate(e) {
		super.willUpdate(e), !this.hasUpdated && this.defaultOpen && !this.open && (this.open = !0), this.#c && this.#a && e.has("open") && this.#a.syncOpen(this.open);
	}
	update(t) {
		super.update(t);
		let n = this.#e.value ?? null;
		if (!n) return;
		this.id ||= this.#r;
		let r = this.#C(), i = r?.closest(e.tagName) ?? null;
		if (i && !i.context) {
			this.hidden = !0, requestAnimationFrame(() => this.requestUpdate());
			return;
		}
		let a = i?.context?.menu ?? null, o = a !== null;
		(n.menu !== this.#s || a !== this.#o) && (this.#S(), this.#s = n.menu, this.#o = a, this.#x(n, a)), this.#O(i?.context ?? n);
		let s = this.#a;
		if (!s) return;
		let c = s.input.current;
		this.#n.setInput({
			...c,
			isSubmenu: o
		});
		let l = this.#n.getState(), u = !o || l.open || l.status === "ending";
		U(this, {
			...this.#n.getContentAttrs(),
			hidden: !u
		}), W(this, l, Va), r && (s.setTriggerElement(r), U(r, this.#n.getTriggerAttrs(l, u ? this.id : void 0)), this.#k(r)), o && u && !this.#y && s.highlightInitialItem({ preventScroll: !0 }), this.#y = u, this.#i = {
			core: this.#n,
			menu: s,
			popup: n.popup,
			state: l,
			setOptionState: this.#D
		}, this.#t.setValue(this.#i), n.popup.sync(), this.#w();
	}
	#x(e, t) {
		if (t !== null) {
			this.#c = !0, this.#a = za({
				transition: Do(),
				onOpenChange: (e, t) => {
					this.dispatchEvent(new CustomEvent("open-change", {
						bubbles: !0,
						cancelable: !0,
						composed: !0,
						detail: {
							open: e,
							...t
						}
					})) && (this.open = e);
				},
				closeOnEscape: () => !0,
				closeOnOutsideClick: () => !1
			}), this.#a.setPopupElement(this), this.#d = t.registerSubmenu(this.#a);
			let e = this.#l?.signal;
			e && this.#a.input.subscribe(() => this.requestUpdate(), { signal: e }), this.#a.syncOpen(this.open);
		} else this.#c = !1, this.#a = e.menu;
		this.#u = e.popup.registerContent({
			menu: this.#a,
			parent: t,
			element: this
		});
	}
	#S() {
		this.#u?.(), this.#u = null, this.#d?.(), this.#d = null, this.#O(null), this.#A(), this.#f.clear(), this.#m = null, this.#c && this.#a?.destroy(), this.#a = null, this.#i = null, this.#s = null, this.#o = null, this.#c = !1, this.#y = !1;
	}
	#C() {
		return this.id ? [...this.getRootNode().querySelectorAll("[commandfor], media-menu-item")].find((e) => e.getAttribute("commandfor") === this.id || e.commandfor === this.id) ?? null : null;
	}
	#w() {
		let e = this.closest("media-menu");
		e && this.parentElement !== e && (this.#b = !0, e.append(this), this.#b = !1);
	}
	#T;
	#E;
	#D;
	#O(e) {
		e?.menu === this.#h?.menu ? this.#h = e : (this.#h?.setOptionState(this.#p, null), this.#h = e, this.#h?.setOptionState(this.#p, this.#m));
	}
	#k(e) {
		if (e !== this.#g && (this.#A(), this.#g = e, this.#_ = e ? Dd(e) : !1, this.#v = e?.hidden === !0), !e) return;
		let t = this.#m?.disabled || this.#_;
		U(e, {
			disabled: t || void 0,
			"aria-disabled": t ? "true" : void 0,
			"data-availability": this.#m?.availability,
			hidden: this.#v || this.#m?.hidden || void 0
		});
		let n = e.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
		n && n.textContent !== this.#m?.value && (n.textContent = this.#m?.value ?? "");
	}
	#A() {
		let e = this.#g;
		if (!e) return;
		U(e, {
			disabled: this.#_ || void 0,
			"aria-disabled": this.#_ ? "true" : void 0,
			"data-availability": void 0,
			hidden: this.#v || void 0
		});
		let t = e.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
		t?.textContent && (t.textContent = ""), this.#g = null, this.#_ = !1, this.#v = !1;
	}
};
function Ed(e, t) {
	return e?.value === t.value && e.disabled === t.disabled && e.hidden === t.hidden && e.availability === t.availability;
}
function Dd(e) {
	return e.hasAttribute("disabled") || "disabled" in e && e.disabled === !0;
}
// node_modules/@videojs/html/dist/default/define/ui/menu-content.js
o(Td);
// node_modules/@videojs/html/dist/default/ui/menu/radio-item.js
var Od = class extends L {
	constructor(...e) {
		super(...e), this.value = "", this.disabled = !1, this.#e = new A(this, {
			context: yd,
			subscribe: !0
		}), this.#t = new A(this, {
			context: gd,
			subscribe: !0
		}), this.#n = null, this.#r = !1, this.#i = null;
	}
	static {
		this.tagName = "media-menu-radio-item";
	}
	static {
		this.properties = {
			value: { type: String },
			disabled: { type: Boolean }
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	connectedCallback() {
		super.connectedCallback(), this.#n = new AbortController(), this.#r = !1;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#i?.(), this.#i = null, this.#n?.abort(), this.#n = null, this.#r = !1;
	}
	update(e) {
		super.update(e);
		let t = this.#e.value, n = this.#t.value;
		if (!t || !n || !this.#n) return;
		this.#r || (this.#r = !0, this.#i = t.menu.registerItem(this), U(this, {
			onClick: () => {
				let e = this.#e.value, t = this.#t.value;
				e && t && !this.disabled && (t.onValueChange(this.value), Ra(e.menu));
			},
			onPointerenter: () => {
				let e = this.#e.value;
				this.disabled || e?.menu.highlight(this, {
					focus: !1,
					pointer: !0
				});
			}
		}, { signal: this.#n.signal }));
		let r = n.value === this.value;
		U(this, {
			role: "menuitemradio",
			"aria-checked": String(r),
			"aria-disabled": this.disabled ? "true" : void 0
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-radio-item.js
o(Od);
// node_modules/@videojs/html/dist/default/ui/radio-group/element.js
var kd = class extends L {
	constructor(...e) {
		super(...e), this.value = "", this.#e = new k(this, { context: gd });
	}
	static {
		this.properties = { value: { type: String } };
	}
	#e;
	update(e) {
		super.update(e), this.#e.setValue({
			value: this.value,
			onValueChange: (e) => {
				this.value = e, this.dispatchEvent(new CustomEvent("value-change", {
					detail: { value: e },
					bubbles: !0
				}));
			}
		});
	}
}, Ad = class {
	#e;
	#t;
	#n = { registerLabel: (e) => this.#a(e) };
	#r;
	#i;
	constructor(e) {
		this.#e = e, this.#t = new k(e, {
			context: bd,
			initialValue: this.#n
		});
	}
	applyProps() {
		let e = this.#e.getAttribute("aria-labelledby") ?? void 0, t = e !== void 0 && e !== this.#i;
		this.#e.hasAttribute("aria-label") || t ? (this.#i && e === this.#i && this.#e.removeAttribute("aria-labelledby"), this.#i = void 0, U(this.#e, { role: "group" })) : (this.#i = this.#r, U(this.#e, {
			role: "group",
			"aria-labelledby": this.#r
		}));
	}
	#a(e) {
		return this.#r = e, this.#t.setValue(this.#n), this.#e.requestUpdate(), () => {
			this.#r === e && (this.#r = void 0, this.#e.requestUpdate());
		};
	}
}, jd = class extends kd {
	static {
		this.tagName = "media-menu-radio-group";
	}
	#e = new Ad(this);
	#t = new A(this, {
		context: yd,
		subscribe: !0
	});
	#n = Symbol("menu-option");
	#r = null;
	#i = null;
	#a = null;
	disconnectedCallback() {
		this.#o(), super.disconnectedCallback();
	}
	update(e) {
		super.update(e), this.#e.applyProps();
	}
	setItemLabel(e, t) {
		let n = e.querySelector("[data-part~=\"label\"]");
		n ? n.textContent = t : e.textContent = t;
	}
	applyDefaultAriaLabel(e) {
		if (this.hasAttribute("aria-labelledby")) return;
		let t = this.getAttribute("aria-label");
		(t === null || t === this.#r) && (this.#r = e, this.setAttribute("aria-label", e));
	}
	publishMenuOptionState(e, t, n) {
		let r = this.#t.value ?? null;
		if (r?.menu !== this.#i && (this.#o(), this.#i = r?.menu ?? null, this.#a = r?.setOptionState ?? null), !this.#a) return;
		let i = Ie(this, (e) => e instanceof Od && e.value === this.value), a = i?.querySelector("[data-part~=\"label\"]")?.textContent ?? i?.textContent?.trim() ?? "";
		this.#a(this.#n, {
			value: a,
			disabled: e,
			hidden: t,
			availability: n
		});
	}
	#o() {
		this.#a?.(this.#n, null), this.#i = null, this.#a = null;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-radio-group.js
o(jd);
// node_modules/@videojs/html/dist/default/ui/menu/item.js
var Md = class extends L {
	constructor(...e) {
		super(...e), this.disabled = !1, this.commandfor = void 0, this.#e = new A(this, {
			context: yd,
			subscribe: !0
		}), this.#t = null, this.#n = null, this.#r = null;
	}
	static {
		this.tagName = "media-menu-item";
	}
	static {
		this.properties = {
			disabled: { type: Boolean },
			commandfor: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	connectedCallback() {
		super.connectedCallback(), this.#t = new AbortController();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#r?.(), this.#r = null, this.#n = null, this.#t?.abort(), this.#t = null;
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		if (!t || !this.#t) return;
		this.#n !== t.menu && (this.#r?.(), this.#n = t.menu, this.#r = t.menu.registerItem(this), U(this, {
			onClick: (e) => {
				let t = this.#e.value;
				if (!t || this.#a()) return;
				let n = this.commandfor;
				if (n) this.#i(n);
				else {
					let n = new CustomEvent("select", {
						bubbles: !0,
						cancelable: !0
					});
					if (!this.dispatchEvent(n)) {
						e.preventDefault();
						return;
					}
					Ra(t.menu);
				}
				e.preventDefault();
			},
			onKeyDown: (e) => {
				if (!this.#e.value || this.#a() || e.key !== "ArrowRight") return;
				let t = this.commandfor;
				t && (this.#i(t), e.preventDefault());
			},
			onPointerenter: () => {
				let e = this.#e.value;
				this.#a() || e?.menu.highlight(this, {
					focus: !1,
					pointer: !0
				});
			}
		}, { signal: this.#t.signal }));
		let n = !!this.commandfor;
		U(this, {
			role: "menuitem",
			"aria-disabled": this.#a() ? "true" : void 0,
			...n && {
				"aria-haspopup": "menu",
				"aria-expanded": "false",
				"data-has-submenu": ""
			}
		});
	}
	#i(e) {
		this.getRootNode().querySelector(`#${CSS.escape(e)}`)?.openMenu?.("click");
	}
	#a() {
		return this.disabled || this.getAttribute("aria-disabled") === "true";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-item.js
o(Md);
// node_modules/@videojs/html/dist/default/ui/menu/item-indicator.js
var Nd = class extends L {
	constructor(...e) {
		super(...e), this.checked = !1, this.forceMount = !1;
	}
	static {
		this.tagName = "media-menu-item-indicator";
	}
	static {
		this.properties = {
			checked: { type: Boolean },
			forceMount: {
				type: Boolean,
				attribute: "force-mount"
			}
		};
	}
	update(e) {
		super.update(e);
		let t = !this.checked && !this.forceMount;
		U(this, {
			"aria-hidden": "true",
			hidden: t
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-item-indicator.js
o(Nd);
// node_modules/@videojs/html/dist/default/ui/menu/group-label.js
var Pd = 0, Fd = class extends L {
	static {
		this.tagName = "media-menu-group-label";
	}
	#e = new A(this, {
		context: bd,
		subscribe: !0
	});
	#t = `vjs-menu-group-label-${Pd++}`;
	#n = null;
	#r = null;
	disconnectedCallback() {
		super.disconnectedCallback(), this.#n?.(), this.#n = null, this.#r = null;
	}
	update(e) {
		super.update(e), this.id ||= this.#t, this.#i();
	}
	#i() {
		let e = this.#e.value;
		e ? this.#r !== this.id && (this.#n?.(), this.#r = this.id, this.#n = e.registerLabel(this.id)) : (this.#n?.(), this.#n = null, this.#r = null);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-group-label.js
o(Fd);
// node_modules/@videojs/html/dist/default/i18n/cache-key.js
function Id(e, t) {
	return JSON.stringify([e, t]);
}
// node_modules/@videojs/html/dist/default/ui/radio-options/controller.js
var Ld = class {
	#e;
	#t;
	#n = "";
	#r = null;
	#i = null;
	constructor(e, t) {
		this.#e = e, this.#t = t, e.addController(this);
	}
	hostConnected() {
		this.#i = new AbortController(), this.#e.addEventListener("value-change", this.#a, { signal: this.#i.signal });
	}
	hostDisconnected() {
		this.#i?.abort(), this.#i = null;
	}
	hostDestroyed() {
		this.hostDisconnected();
	}
	sync(e, t, n) {
		this.#e.value = e.value, U(this.#e, {
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		});
		let r = It(this.#e), i = r ? Lt(r) : null, o = i?.localName === Od.tagName ? i : null, s = `${e.options.map((e) => `${e.value}:${Id(e.label, e.labelParams)}:${Id(e.ariaLabel ?? "", e.ariaLabelParams)}:${this.#t.getOptionCacheKey?.(e) ?? ""}`).join("|")}::${n}::${r?.innerHTML ?? ""}`;
		if (s !== this.#n || t !== this.#r) {
			this.#n = s, this.#r = t;
			let n = [...this.#e.children].filter((e) => e !== r), i = this.#o()?.value, c = e.options.map((e) => {
				let n = o ? Rt(o, this.#e.ownerDocument) : this.#e.ownerDocument.createElement(Od.tagName);
				n.value = e.value, this.#t.setItemAttributes?.(n, e);
				let r = B(e.label, t, e.labelParams);
				return this.#t.renderItem ? this.#t.renderItem(n, r, e) : this.#s(n, r), a(e.ariaLabel) || n.setAttribute("aria-label", B(e.ariaLabel, t, e.ariaLabelParams)), n;
			});
			this.#e.append(...c);
			let l = () => {
				for (let e of n) e.remove();
			}, u = a(i) ? void 0 : c.find((e) => e.value === i) ?? c.find((t) => t.value === e.value);
			u ? u.updateComplete.then(() => {
				u.focus(), l();
			}) : l();
		}
		let c = new Map(e.options.map((e) => [e.value, e]));
		for (let t of this.#e.querySelectorAll(Od.tagName)) {
			let n = t.value === e.value, r = c.get(t.value);
			t.disabled = e.disabled || r?.disabled === !0;
			for (let e of t.querySelectorAll(Nd.tagName)) e.checked = n;
		}
	}
	#a = (e) => {
		if (e.target !== this.#e) return;
		let { value: t } = e.detail;
		this.#t.onValueChange(t);
	};
	#o() {
		let e = this.#e.getRootNode().activeElement;
		return e instanceof Od && e.parentElement === this.#e ? e : null;
	}
	#s(e, t) {
		let n = e.querySelector("[data-part~=\"label\"]");
		n ? n.textContent = t : e.textContent = t;
	}
}, Rd = class extends jd {
	constructor(...e) {
		super(...e), this.disabled = !1, this.rates = void 0, this.formatRate = wc.defaultProps.formatRate, this.#e = new wc(), this.#t = new K(this, G), this.#n = new P(this, O, Oi), this.#r = new Ld(this, {
			setItemAttributes: (e, t) => {
				e.setAttribute("data-rate", t.value), e.toggleAttribute("data-custom", t.custom);
			},
			getOptionCacheKey: (e) => e.custom ? "custom" : "",
			onValueChange: (e) => {
				let t = this.#n.value;
				t && this.#e.selectValue(t, e);
			}
		});
	}
	static {
		this.tagName = "media-playback-rate-radio-group";
	}
	static {
		this.properties = {
			...jd.properties,
			disabled: { type: Boolean },
			rates: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	connectedCallback() {
		super.connectedCallback(), this.destroyed;
	}
	update(e) {
		let t = this.#n.value, n = null;
		t ? (this.#e.setProps({
			formatRate: this.formatRate,
			disabled: this.disabled,
			rates: this.rates
		}), this.#e.setMedia(t), n = this.#e.getState(), this.applyDefaultAriaLabel(B(this.#e.getLabel(n), this.#t.value, this.#e.getLabelParams(n))), this.#r.sync(n, this.#t.value, this.#t.locale), this.publishMenuOptionState(n.disabled, n.hidden, n.availability)) : this.publishMenuOptionState(!0, !0, "unsupported"), super.update(e), n && W(this, n, Tc);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/playback-rate-radio-group.js
o(Rd);
// node_modules/@videojs/html/dist/default/ui/quality-radio-group/element.js
var zd = class extends jd {
	constructor(...e) {
		super(...e), this.disabled = !1, this.label = "", this.formatRendition = Bc.defaultProps.formatRendition, this.#e = new Bc(), this.#t = new K(this, G), this.#n = new P(this, O, ki), this.#r = new Ld(this, {
			renderItem: (e, t, n) => this.#i(e, t, n.tier, n.badge),
			setItemAttributes: (e, t) => e.setAttribute("data-rendition", t.value),
			getOptionCacheKey: (e) => `${e.tier ?? ""}:${e.badge ?? ""}`,
			onValueChange: (e) => {
				let t = this.#n.value;
				t && this.#e.selectValue(t, e);
			}
		});
	}
	static {
		this.tagName = "media-quality-radio-group";
	}
	static {
		this.properties = {
			...jd.properties,
			disabled: { type: Boolean },
			label: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	connectedCallback() {
		super.connectedCallback(), this.destroyed;
	}
	update(e) {
		let t = this.#n.value, n = null;
		t ? (this.#e.setProps({
			formatRendition: this.formatRendition,
			disabled: this.disabled,
			label: this.label
		}), this.#e.setMedia(t), n = this.#e.getState(), this.applyDefaultAriaLabel(B(this.#e.getLabel(n), this.#t.value)), this.#r.sync(n, this.#t.value, this.#t.locale), this.publishMenuOptionState(n.disabled, n.hidden, n.availability)) : this.publishMenuOptionState(!0, !0, "unsupported"), super.update(e), n && W(this, n, Vc);
	}
	#i(e, t, n, r) {
		let i = e.querySelector("[data-part~=\"label\"]"), a = e.querySelector("[data-part~=\"tier\"]"), o = e.querySelector("[data-part~=\"badge\"]");
		i && (i.textContent = t), a && (a.textContent = n ?? "", a.hidden = !n), o && (o.textContent = r ?? "", o.hidden = !r), i || a || o || (e.textContent = [
			t,
			n,
			r
		].filter(Boolean).join(" "));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/quality-radio-group.js
o(zd);
// node_modules/@videojs/html/dist/default/ui/playback-rate-button/element.js
var Bd = class extends Bu {
	constructor(...e) {
		super(...e), this.commandfor = void 0, this.rates = void 0, this.core = new bc(), this.stateAttrMap = xc, this.mediaState = new P(this, O, Oi), this.hotkeyAction = "speedUp";
	}
	static {
		this.tagName = "media-playback-rate-button";
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean },
			commandfor: { type: String },
			rates: { type: String }
		};
	}
	activate(e, t) {
		this.commandfor ? t instanceof KeyboardEvent && this.click() : this.core.cycle(e);
	}
	getIsButtonDisabled() {
		let e = this.mediaState.value;
		return !!(super.getIsButtonDisabled() || this.commandfor && e && this.core.getRates(e).length === 0);
	}
	reflectsHidden() {
		return !this.commandfor;
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("commandfor") && (this.commandfor ? this.setAttribute("commandfor", this.commandfor) : this.removeAttribute("commandfor"));
	}
	update(e) {
		super.update(e), this.mediaState.value && this.commandfor && U(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 });
	}
};
// node_modules/@videojs/html/dist/default/define/ui/playback-rate-button.js
o(Bd);
// node_modules/@videojs/html/dist/default/ui/command-for.js
function Vd(e, t) {
	let n = e.getRootNode(), r = ("getElementById" in n ? n.getElementById(t) : null) ?? n.querySelector(`#${CSS.escape(t)}`);
	if (!r || !("open" in r)) return;
	let i = r;
	i.open = !i.open;
}
// node_modules/@videojs/html/dist/default/ui/captions-button/element.js
function Hd(e) {
	return e.textTrackList.filter(ee).length;
}
var Ud = class extends Bu {
	constructor(...e) {
		super(...e), this.commandfor = void 0, this.menuFor = void 0, this.#e = void 0, this.core = new rs(), this.stateAttrMap = as, this.mediaState = new P(this, O, Ai), this.hotkeyAction = "toggleSubtitles";
	}
	static {
		this.tagName = "media-captions-button";
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean },
			commandfor: { type: String },
			menuFor: {
				type: String,
				attribute: "menu-for"
			}
		};
	}
	#e;
	connectedCallback() {
		super.connectedCallback(), this.commandfor && this.commandfor !== this.menuFor && (this.#e = this.commandfor);
	}
	activate(e, t) {
		this.menuFor && Hd(e) > 1 ? t instanceof KeyboardEvent && Vd(this, this.menuFor) : this.core.toggle(e);
	}
	getIsButtonDisabled() {
		let e = this.mediaState.value;
		return !!(super.getIsButtonDisabled() || e && Hd(e) === 0);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("commandfor") && this.commandfor !== this.menuFor && (this.#e = this.commandfor), (e.has("commandfor") || e.has("menuFor")) && this.#t();
	}
	update(e) {
		super.update(e);
		let t = this.mediaState.value;
		t && (this.#t(t), this.menuFor && Hd(t) > 1 && U(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 }));
	}
	#t(e) {
		let t = e ?? this.mediaState.value, n = t && this.menuFor && Hd(t) > 1 ? this.menuFor : this.#e;
		n ? this.setAttribute("commandfor", n) : this.removeAttribute("commandfor");
	}
};
// node_modules/@videojs/html/dist/default/define/ui/captions-button.js
o(Ud);
// node_modules/@videojs/html/dist/default/ui/pip-button/element.js
var Wd = class extends Bu {
	constructor(...e) {
		super(...e), this.core = new mc(), this.stateAttrMap = hc, this.mediaState = new P(this, O, Ei), this.hotkeyAction = "togglePictureInPicture";
	}
	static {
		this.tagName = "media-pip-button";
	}
	activate(e) {
		return this.core.toggle(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/pip-button.js
o(Wd);
// node_modules/@videojs/html/dist/default/ui/fullscreen-button/element.js
var Gd = class extends Bu {
	constructor(...e) {
		super(...e), this.core = new Fs(), this.stateAttrMap = Is, this.mediaState = new P(this, O, wi), this.hotkeyAction = "toggleFullscreen", this.#e = new A(this, {
			context: s,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-fullscreen-button";
	}
	#e;
	activate(e, t, n) {
		return n === "pointer" && this.#e.value?.container?.focus({ preventScroll: !0 }), this.core.toggle(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/fullscreen-button.js
o(Gd);
// node_modules/@videojs/html/dist/default/ui/tooltip/context.js
var Kd = t(Symbol("@videojs/tooltip-group"));
// node_modules/@videojs/html/dist/default/ui/tooltip/label.js
function qd(e) {
	return Array.from(e.childNodes).some((e) => !!e.textContent?.trim());
}
var Jd = class e extends L {
	static {
		this.tagName = "media-tooltip-label";
	}
	#e = !1;
	static findIn(t) {
		return t.querySelector(e.tagName);
	}
	static create() {
		return document.createElement(e.tagName);
	}
	connectedCallback() {
		this.#e ||= qd(this), super.connectedCallback();
	}
	setSyncedText(e) {
		this.#e || (this.textContent = e);
	}
}, Yd = class e extends L {
	static {
		this.tagName = "media-tooltip-shortcut";
	}
	static findIn(t) {
		return t.querySelector(e.tagName);
	}
	static create() {
		return document.createElement(e.tagName);
	}
	setSyncedShortcut(e) {
		e ? (this.textContent = e, this.hidden = !1) : (this.textContent = "", this.hidden = !0);
	}
};
// node_modules/@videojs/html/dist/default/ui/tooltip/element.js
function Xd(e) {
	return "$state" in e;
}
var Zd = class extends L {
	constructor(...e) {
		super(...e), this.open = su.defaultProps.open, this.defaultOpen = su.defaultProps.defaultOpen, this.side = su.defaultProps.side, this.align = su.defaultProps.align, this.delay = su.defaultProps.delay, this.closeDelay = su.defaultProps.closeDelay, this.disableHoverablePopup = su.defaultProps.disableHoverablePopup, this.disabled = su.defaultProps.disabled, this.sticky = su.defaultProps.sticky, this.boundary = "container", this.trigger = "", this.#e = new su(), this.#t = new K(this, G), this.#n = new A(this, { context: Kd }), this.#r = new A(this, {
			context: s,
			subscribe: !0
		}), this.#i = new A(this, { context: Ho }), this.#a = new Ku(this), this.#o = null, this.#s = null, this.#c = null, this.#l = null, this.#u = null;
	}
	static {
		this.tagName = "media-tooltip";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			disableHoverablePopup: {
				type: Boolean,
				attribute: "disable-hoverable-popup"
			},
			disabled: { type: Boolean },
			sticky: { type: Boolean },
			boundary: { type: String },
			trigger: { type: String }
		};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#c = new AbortController(), this.#o = Eo({
			transition: Do(),
			onOpenChange: (e, t) => {
				this.open = e, this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: e,
					...t
				} }));
			},
			delay: () => this.delay,
			closeDelay: () => this.closeDelay,
			disableHoverablePopup: () => this.disableHoverablePopup,
			disabled: () => this.disabled,
			sticky: () => this.sticky,
			group: () => this.#n.value,
			popupGroup: () => this.#i.value
		}), this.#o.setPopupElement(this), U(this, this.#o.popupProps, { signal: this.#c.signal }), this.#s ? this.#s.track(this.#o.input) : this.#s = new pe(this, this.#o.input));
	}
	firstUpdated(e) {
		super.firstUpdated(e), this.defaultOpen && !this.open && this.#o?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#m(), this.#o?.destroy(), this.#o = null, this.#c?.abort(), this.#c = null;
	}
	close(e = "imperative-action") {
		this.#o?.close(e);
	}
	willUpdate(e) {
		if (super.willUpdate(e), this.#e.setProps(this), this.#o && e.has("open")) {
			let { active: e } = this.#o.input.current;
			this.open !== e && (this.open ? this.#o.open() : this.#o.close());
		}
	}
	update(e) {
		if (super.update(e), !this.#o) return;
		let t = this.#a.findTrigger(this.trigger);
		this.#d(t), this.#u && Xd(this.#u) && this.#f(this.#u);
		let n = this.#o.input.current;
		this.#e.setInput(n);
		let r = this.#e.getState();
		U(this, this.#e.getPopupAttrs(r)), W(this, r, cu), r.open ? jt(this) : Mt(this), r.open ? this.#a.sync({
			anchorName: this.id,
			position: {
				side: r.side,
				align: r.align
			},
			trigger: this.#u,
			boundary: this.boundary,
			container: this.#r.value?.container ?? null,
			cssVars: uu,
			onSideChange: (e) => this.setAttribute(cu.side, e)
		}) : this.#a.cleanup();
	}
	#d(e) {
		e !== this.#u && (this.#a.cleanup(), this.#m(), this.#u = e, this.#o?.setTriggerElement(e), e && this.#o && (this.#l = new AbortController(), U(e, this.#o.triggerProps, { signal: this.#l.signal }), Xd(e) && (this.#f(e), e.$state.subscribe(() => this.#f(e), { signal: this.#l.signal }), h(e, aa, () => this.#f(e), { signal: this.#l.signal }))));
	}
	#f(e) {
		let t = e.getLabel(), n = r(e.getResolvedLabel) ? e.getResolvedLabel() : void 0;
		n === void 0 && t && (n = B(t, this.#t.value));
		let i = e.getShortcut?.(), a = Jd.findIn(this), o = Yd.findIn(this);
		if (!a && !o) {
			if (this.#p()) return;
			a = Jd.create(), o = Yd.create(), this.replaceChildren(a, o);
		}
		a?.setSyncedText(n ?? ""), o?.setSyncedShortcut(i);
	}
	#p() {
		return Array.from(this.childNodes).some((e) => !!e.textContent?.trim());
	}
	#m() {
		this.#l?.abort(), this.#l = null, this.#u = null;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/tooltip.js
o(Zd);
// node_modules/@videojs/html/dist/default/ui/tooltip/group.js
var Qd = class extends L {
	constructor(...e) {
		super(...e), this.delay = lu.defaultProps.delay, this.closeDelay = lu.defaultProps.closeDelay, this.timeout = lu.defaultProps.timeout, this.#e = new lu(), this.#t = new k(this, {
			context: Kd,
			initialValue: this.#e
		});
	}
	static {
		this.tagName = "media-tooltip-group";
	}
	static {
		this.properties = {
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			timeout: { type: Number }
		};
	}
	#e;
	#t;
	update(e) {
		super.update(e), this.#e.setProps(this), this.#t.setValue(this.#e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/tooltip-shortcut.js
o(Qd), o(Jd), o(Yd);
// node_modules/@videojs/html/dist/default/ui/buffering-indicator/element.js
var $d = class extends L {
	constructor(...e) {
		super(...e), this.delay = Qo.defaultProps.delay, this.#e = new Qo(), this.#t = new P(this, O, Di), this.#n = null;
	}
	static {
		this.tagName = "media-buffering-indicator";
	}
	static {
		this.properties = { delay: { type: Number } };
	}
	#e;
	#t;
	#n;
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.#n = new AbortController(), this.#e.state.subscribe(() => this.requestUpdate(), { signal: this.#n.signal }));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#n?.abort(), this.#n = null;
	}
	destroyCallback() {
		this.#e.destroy(), super.destroyCallback();
	}
	willUpdate(e) {
		super.willUpdate(e), this.#e.setProps(this);
	}
	update(e) {
		super.update(e);
		let t = this.#t.value;
		t && (this.#e.update(t), W(this, this.#e.state.current, $o));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/buffering-indicator.js
o($d);
// node_modules/@videojs/html/dist/default/ui/input-indicator/element.js
var ef = class extends L {
	constructor(...e) {
		super(...e), this.player = new P(this, O), this.container = new A(this, {
			context: s,
			callback: () => this.#l(),
			subscribe: !0
		}), this.#e = null, this.#t = null, this.#n = null, this.#r = null, this.#i = 0, this.#a = null;
	}
	get options() {
		return {};
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o() {
		return this.#r ??= { close: () => this.core.close() };
	}
	#s() {
		return this.#a ?? this.core.state.current;
	}
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.#a = this.core.state.current, this.#e = new AbortController(), this.core.state.subscribe(() => this.requestUpdate(), { signal: this.#e.signal }), this.transition.state.subscribe(() => this.requestUpdate(), { signal: this.#e.signal }), this.hidden = !0, this.#l());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#t?.(), this.#n?.(), this.#t = null, this.#n = null, this.#e?.abort(), this.#e = null;
	}
	destroyCallback() {
		this.#t?.(), this.#n?.(), this.core.destroy(), this.transition.destroy(), this.liveIndicator.remove(), super.destroyCallback();
	}
	willUpdate(e) {
		super.willUpdate(e), this.syncCoreProps();
	}
	update(e) {
		super.update(e), this.#c();
		let t = this.core.state.current, n = this.transition.state.current;
		if (!va(t, n)) {
			this.liveIndicator.remove();
			return;
		}
		let r = ya(t, this.#s(), n);
		this.liveIndicator.render(r);
	}
	#c() {
		let e = this.core.state.current;
		if (e.open) {
			if (this.#a = e, this.#i !== e.generation) {
				this.#i = e.generation;
				let t = this.transition.state.current;
				!t.active || this.options.replayOnUpdate !== !1 ? this.transition.open(this.liveIndicator.element) : t.status === "ending" && this.transition.cancel();
			}
			return;
		}
		let { active: t, status: n } = this.transition.state.current;
		t && n !== "ending" && this.transition.close(this.liveIndicator.element);
	}
	#l() {
		if (!this.container) return;
		this.#t?.(), this.#n?.(), this.#t = null, this.#n = null;
		let e = this.container.value?.container;
		if (!e) return;
		let t = wa(e), n = this.#o();
		this.#n = t.register(n), this.#t = Sa(e, (e) => {
			this.core.processEvent(e, xa(this.player.value)) && t.show(n);
		});
	}
}, tf = class {
	#e;
	#t;
	#n;
	constructor(e) {
		this.#e = e.host, this.#t = e.dataAttrs, this.#n = e.render;
	}
	get element() {
		return this.#e;
	}
	render(e) {
		return this.#e.hidden = !1, W(this.#e, e, this.#t), this.#n(this.#e, e), this.#e;
	}
	remove() {
		this.#e.hidden = !0;
		for (let e in this.#t) {
			let t = this.#t[e];
			t && this.#e.removeAttribute(t);
		}
	}
}, nf = class extends ef {
	static {
		this.tagName = "media-seek-indicator";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#e = new K(this, G);
	#t = new sl();
	#n = Do();
	#r = new tf({
		host: this,
		dataAttrs: cl,
		render: rf
	});
	get core() {
		return this.#t;
	}
	get transition() {
		return this.#n;
	}
	get liveIndicator() {
		return this.#r;
	}
	syncCoreProps() {
		this.#t.setProps({
			closeDelay: this.closeDelay,
			locale: this.#e.locale
		});
	}
};
function rf(e, t) {
	let n = e.querySelector("media-seek-indicator-value");
	n && (n.textContent = rl(t));
}
// node_modules/@videojs/html/dist/default/define/ui/seek-indicator.js
o(nf);
// node_modules/@videojs/html/dist/default/ui/seek-indicator/value.js
var af = class extends L {
	static {
		this.tagName = "media-seek-indicator-value";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/seek-indicator-value.js
o(af);
// node_modules/@videojs/html/dist/default/ui/status-indicator/element.js
var of = class extends ef {
	static {
		this.tagName = "media-status-indicator";
	}
	static {
		this.properties = {
			actions: { type: String },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			}
		};
	}
	#e = new K(this, G);
	#t = new Ol();
	#n = Do();
	#r = new tf({
		host: this,
		dataAttrs: kl,
		render: cf
	});
	#i = { replayOnUpdate: !1 };
	#a;
	get deriveCustomStatus() {
		return this.#a;
	}
	set deriveCustomStatus(e) {
		this.#a = e, this.requestUpdate();
	}
	get core() {
		return this.#t;
	}
	get transition() {
		return this.#n;
	}
	get liveIndicator() {
		return this.#r;
	}
	get options() {
		return this.#i;
	}
	syncCoreProps() {
		this.#t.setProps({
			actions: sf(this.actions),
			closeDelay: this.closeDelay,
			labels: Qs(this.#e.value),
			deriveCustomStatus: this.#a
		});
	}
};
function sf(e) {
	return e?.split(/[\s,]+/).filter(Boolean);
}
function cf(e, t) {
	let n = e.querySelector("media-status-indicator-value");
	n && (n.textContent = El(t));
}
// node_modules/@videojs/html/dist/default/define/ui/status-indicator.js
o(of);
// node_modules/@videojs/html/dist/default/ui/status-indicator/value.js
var lf = class extends L {
	static {
		this.tagName = "media-status-indicator-value";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/status-indicator-value.js
o(lf);
// node_modules/@videojs/html/dist/default/ui/volume-indicator/element.js
var uf = class extends ef {
	static {
		this.tagName = "media-volume-indicator";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#e = new K(this, G);
	#t = new pu();
	#n = Do();
	#r = new tf({
		host: this,
		dataAttrs: hu,
		render: df
	});
	#i = { replayOnUpdate: !1 };
	get core() {
		return this.#t;
	}
	get transition() {
		return this.#n;
	}
	get liveIndicator() {
		return this.#r;
	}
	get options() {
		return this.#i;
	}
	syncCoreProps() {
		this.#t.setProps({
			closeDelay: this.closeDelay,
			labels: Qs(this.#e.value)
		});
	}
};
function df(e, t) {
	let n = e.querySelector("media-volume-indicator-fill"), r = e.querySelector("media-volume-indicator-value");
	t.fill ? n?.style.setProperty(gu.fill, t.fill) : n?.style.removeProperty(gu.fill), r && (r.textContent = _l(t));
}
// node_modules/@videojs/html/dist/default/define/ui/volume-indicator.js
o(uf);
// node_modules/@videojs/html/dist/default/ui/volume-indicator/fill.js
var ff = class extends L {
	static {
		this.tagName = "media-volume-indicator-fill";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-indicator-fill.js
o(ff);
// node_modules/@videojs/html/dist/default/ui/volume-indicator/value.js
var pf = class extends L {
	static {
		this.tagName = "media-volume-indicator-value";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-indicator-value.js
o(pf);
// node_modules/@videojs/html/dist/default/ui/hotkey/element.js
var mf = class extends L {
	constructor(...e) {
		super(...e), this.keys = "", this.action = "", this.value = void 0, this.disabled = !1, this.target = "player", this.#e = new P(this, O), this.#t = new A(this, {
			context: s,
			callback: () => this.requestUpdate(),
			subscribe: !0
		}), this.#n = null;
	}
	static {
		this.tagName = "media-hotkey";
	}
	static {
		this.properties = {
			keys: { type: String },
			action: { type: String },
			value: { type: Number },
			disabled: { type: Boolean },
			target: { type: String }
		};
	}
	#e;
	#t;
	#n;
	connectedCallback() {
		super.connectedCallback(), this.style.display = "none", this.#r();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#i();
	}
	update(e) {
		super.update(e), this.isConnected && (this.#i(), this.#r());
	}
	#r() {
		let e = this.#e.value, t = this.#t.value?.container;
		if (!this.keys || !this.action || !e || !t) return;
		let n = Wi(this.action);
		if (!n) return;
		let { value: r, action: i } = this;
		this.#n = ia(t, {
			keys: this.keys,
			action: i,
			value: r,
			target: this.target,
			disabled: this.disabled,
			repeatable: !Hi(i),
			onActivate: (t, i) => {
				n({
					store: e,
					key: i,
					value: r
				});
			}
		});
	}
	#i() {
		this.#n?.(), this.#n = null;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/hotkey.js
o(mf);
// node_modules/@videojs/html/dist/default/ui/gesture/element.js
var hf = class extends L {
	constructor(...e) {
		super(...e), this.type = "", this.action = "", this.value = void 0, this.pointer = void 0, this.region = void 0, this.disabled = !1, this.#e = new P(this, O), this.#t = new A(this, {
			context: s,
			callback: () => this.requestUpdate(),
			subscribe: !0
		}), this.#n = null;
	}
	static {
		this.tagName = "media-gesture";
	}
	static {
		this.properties = {
			type: { type: String },
			action: { type: String },
			value: { type: Number },
			pointer: { type: String },
			region: { type: String },
			disabled: { type: Boolean }
		};
	}
	#e;
	#t;
	#n;
	connectedCallback() {
		super.connectedCallback(), this.style.display = "none", this.#r();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#i();
	}
	update(e) {
		super.update(e), this.isConnected && (this.#i(), this.#r());
	}
	#r() {
		let e = this.#e.value, t = this.#t.value?.container;
		if (!this.type || !this.action || !e || !t) return;
		let n = Fi(this.action);
		if (!n) return;
		let { value: r, region: i } = this, a = Dn(this.action, i, r), o, s = (t) => {
			n({
				store: e,
				state: o,
				value: a,
				event: t
			});
		}, c = {
			onPointerDown: () => o = e.state,
			pointer: this.pointer,
			region: i,
			disabled: this.disabled,
			action: this.action,
			value: a
		};
		this.type === "doubletap" ? this.#n = Vi(t, s, c) : this.type === "tap" && (this.#n = Bi(t, s, c));
	}
	#i() {
		this.#n?.(), this.#n = null;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/gesture.js
o(hf);
// node_modules/@videojs/html/dist/default/ui/status-announcer/element.js
var gf = class extends L {
	static {
		this.tagName = "media-status-announcer";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#e = new K(this, G);
	#t = new wl();
	#n = null;
	#r = new A(this, {
		context: O,
		callback: (e) => this.#s(e),
		subscribe: !0
	});
	#i = new A(this, {
		context: s,
		subscribe: !0
	});
	#a = null;
	#o = null;
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.setAttribute("role", "status"), this.#c(), this.#a = new AbortController(), this.#t.state.subscribe(() => this.requestUpdate(), { signal: this.#a.signal }), this.#s());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#n?.(), this.#n = null, this.#a?.abort(), this.#a = null;
	}
	destroyCallback() {
		this.#n?.(), this.#t.destroy(), super.destroyCallback();
	}
	willUpdate(e) {
		super.willUpdate(e), this.#t.setProps({
			closeDelay: this.closeDelay,
			labels: pl(this.#e.value, this.#e.locale),
			shouldAnnounce: () => yo(this.#i.value?.container)
		});
	}
	update(e) {
		super.update(e);
		let t = this.#t.state.current.label, n = this.#c();
		t === null ? n.replaceChildren() : n.replaceChildren(document.createTextNode(t));
	}
	#s(e = this.#r.value) {
		this.#n?.(), this.#n = null, e ? this.#n = vo(e, this.#t) : this.#t.resetSnapshot();
	}
	#c() {
		if (this.#o?.isConnected) return this.#o;
		let e = this.querySelector("[data-status-announcer-content]");
		return this.#o = e ?? document.createElement("span"), this.#o.setAttribute("data-status-announcer-content", ""), e || this.append(this.#o), this.#o;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/status-announcer.js
o(gf);
// node_modules/@videojs/html/dist/default/ui/dialog/context.js
var _f = t(Symbol("@videojs/dialog")), vf = 0;
function yf(e) {
	return Array.from(e.childNodes).some((e) => !!e.textContent?.trim());
}
var bf = class extends L {
	static {
		this.tagName = "media-error-dialog";
	}
	#e = new us();
	#t = new k(this, { context: _f });
	#n = `vjs-error-dialog-popup-${vf++}`;
	#r = `vjs-error-dialog-title-${vf++}`;
	#i = `vjs-error-dialog-desc-${vf++}`;
	#a = new P(this, O, Ci);
	#o = new K(this, G);
	#s = new A(this, {
		context: s,
		subscribe: !0
	});
	#c = null;
	#l = null;
	#u = null;
	#d = null;
	#f = null;
	#p = /* @__PURE__ */ new WeakSet();
	#m = /* @__PURE__ */ new WeakSet();
	constructor() {
		super(), this.#e.setTitleId(this.#r), this.#e.setDescriptionId(this.#i);
	}
	connectedCallback() {
		super.connectedCallback(), this.destroyed || (this.#c = fa({
			transition: Do(),
			onOpenChange: (e) => {
				e || this.#a.value?.dismissError();
			}
		}), this.#l ? this.#l.track(this.#c.input) : this.#l = new pe(this, this.#c.input), this.#u ? this.#u.track(this.#c.modality) : this.#u = new pe(this, this.#c.modality));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#c?.destroy(), this.#c = null;
	}
	willUpdate(e) {
		if (super.willUpdate(e), !this.#c) return;
		this.#c.setInteractionRoot(this.#s.value?.container ?? null);
		let t = this.#a.value, n = !!t?.error, { active: r } = this.#c.input.current;
		t?.error && (this.#d = t.error);
		let i = t?.error ?? (r ? this.#d : null);
		this.#h(i), !n && !r && (this.#d = null, this.#f = null), n && !r ? this.#c.open() : !n && r && this.#c.close();
	}
	update(e) {
		if (super.update(e), !this.#c) return;
		let t = this.#c.input.current;
		this.#e.setInput(t), this.#e.setDocumentModal(this.#c.modality.current.documentModal);
		let n = this.#e.getState();
		W(this, n, ds), this.#t.setValue({
			state: n,
			stateAttrMap: ds,
			dialog: this.#c,
			popupId: this.#n,
			popupAttrs: this.#e.getPopupAttrs(n),
			close: () => this.#c?.close()
		});
	}
	#h(e) {
		let t = this.#o.value, n = this.querySelector("media-dialog-title");
		n && !this.#g(n) && (n.textContent = B(Os(), t));
		let r = this.querySelector("media-dialog-description");
		if (r && !this.#g(r)) {
			let n = e ? js(e) : null;
			n && (this.#f = n), r.textContent = B((n ?? this.#f) || As(), t);
		}
		let i = this.querySelector("media-dialog-close");
		i && !this.#g(i) && (i.textContent = B(ks(), t));
	}
	#g(e) {
		return this.#p.has(e) || (this.#p.add(e), yf(e) && this.#m.add(e)), this.#m.has(e);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/error-dialog.js
o(bf);
// node_modules/@videojs/html/dist/default/ui/dialog/backdrop.js
var xf = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: _f,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-dialog-backdrop";
	}
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("role", "presentation"), this.setAttribute("aria-hidden", "true");
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-backdrop.js
o(xf);
// node_modules/@videojs/html/dist/default/ui/dialog/popup.js
var Sf = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: _f,
			subscribe: !0
		}), this.#e = null;
	}
	static {
		this.tagName = "media-dialog-popup";
	}
	#e;
	disconnectedCallback() {
		this.#e?.setPopupElement(null), this.#e = null, super.disconnectedCallback();
	}
	update(e) {
		super.update(e);
		let t = this.consumer.value;
		t && (this.#e !== t.dialog && (this.#e?.setPopupElement(null), this.#e = t.dialog, this.#e.setPopupElement(this)), U(this, {
			id: t.popupId,
			tabIndex: -1,
			...t.popupAttrs
		}));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-popup.js
o(Sf);
// node_modules/@videojs/html/dist/default/ui/dialog/title.js
var Cf = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: _f,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-dialog-title";
	}
	update(e) {
		super.update(e);
		let t = this.consumer.value?.state.titleId;
		t && (this.id = t);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-title.js
o(Cf);
// node_modules/@videojs/html/dist/default/ui/dialog/description.js
var wf = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new A(this, {
			context: _f,
			subscribe: !0
		});
	}
	static {
		this.tagName = "media-dialog-description";
	}
	update(e) {
		super.update(e);
		let t = this.consumer.value?.state.descriptionId;
		t && (this.id = t);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-description.js
o(wf);
// node_modules/@videojs/html/dist/default/ui/dialog/close.js
var Tf = class extends L {
	constructor(...e) {
		super(...e), this.disabled = !1, this.#e = new A(this, {
			context: _f,
			subscribe: !0
		}), this.#t = null;
	}
	static {
		this.tagName = "media-dialog-close";
	}
	static {
		this.properties = { disabled: { type: Boolean } };
	}
	#e;
	#t;
	connectedCallback() {
		super.connectedCallback(), this.#t = new AbortController();
		let e = sa({
			onActivate: () => this.#e.value?.close(),
			isDisabled: () => this.disabled
		});
		U(this, e, { signal: this.#t.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#t?.abort(), this.#t = null;
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		t && W(this, t.state, t.stateAttrMap);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-close.js
o(Tf);
// src/line10/icons.js
var X = (e, t = "") => `<svg class="l10-icon ${t}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e}</svg>`, Z = {
	play: (e) => X("<path class=\"l10-solid\" d=\"M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z\"/>", e),
	pause: (e) => X("<rect class=\"l10-solid\" x=\"6.5\" y=\"5\" width=\"4\" height=\"14\" rx=\"1.2\"/><rect class=\"l10-solid\" x=\"13.5\" y=\"5\" width=\"4\" height=\"14\" rx=\"1.2\"/>", e),
	restart: (e) => X("<path d=\"M5 12a7 7 0 1 0 2.05-4.95\"/><path d=\"M5 4.5V8h3.5\"/>", e),
	back: (e, t = 5) => X(`<path d="M12 4.6a7.4 7.4 0 1 1-6.9 4.8"/><path d="M12 2l-3 2.6 3 2.6"/><text class="l10-solid l10-skipnum" x="12" y="15.3" text-anchor="middle">${t}</text>`, e),
	fwd: (e, t = 5) => X(`<path d="M12 4.6a7.4 7.4 0 1 0 6.9 4.8"/><path d="M12 2l3 2.6-3 2.6"/><text class="l10-solid l10-skipnum" x="12" y="15.3" text-anchor="middle">${t}</text>`, e),
	nextStop: (e) => X("<path d=\"M3.5 12h10\"/><path d=\"M10 8l4 4-4 4\"/><circle cx=\"18.5\" cy=\"12\" r=\"2.6\"/>", e),
	vol1: (e) => X("<path class=\"l10-solid\" d=\"M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z\"/><path d=\"M14.2 9.6a3.4 3.4 0 0 1 0 4.8\"/>", e),
	vol2: (e) => X("<path class=\"l10-solid\" d=\"M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z\"/><path d=\"M14.2 9.6a3.4 3.4 0 0 1 0 4.8M16.8 7.2a6.8 6.8 0 0 1 0 9.6\"/>", e),
	vol3: (e) => X("<path class=\"l10-solid\" d=\"M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z\"/><path d=\"M14.2 9.6a3.4 3.4 0 0 1 0 4.8M16.8 7.2a6.8 6.8 0 0 1 0 9.6M19.4 4.8a10.2 10.2 0 0 1 0 14.4\"/>", e),
	volOff: (e) => X("<path class=\"l10-solid\" d=\"M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z\"/><path d=\"M15 9.5l5 5M20 9.5l-5 5\"/>", e),
	ccOff: (e) => X("<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"3\"/><path d=\"M10.2 10.3a2.3 2.3 0 1 0 0 3.4M16.7 10.3a2.3 2.3 0 1 0 0 3.4\"/>", e),
	ccOn: (e) => X("<rect class=\"l10-solid\" x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"3\"/><path class=\"l10-knock\" d=\"M10.2 10.3a2.3 2.3 0 1 0 0 3.4M16.7 10.3a2.3 2.3 0 1 0 0 3.4\"/>", e),
	pipIn: (e) => X("<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><rect class=\"l10-solid\" x=\"12\" y=\"11.5\" width=\"6.5\" height=\"5\" rx=\"1\"/>", e),
	pipOut: (e) => X("<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M8 13l4-4M8 9.5V13h3.5\"/>", e),
	fsIn: (e) => X("<path d=\"M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15\"/>", e),
	fsOut: (e) => X("<path d=\"M9 4v3.5A1.5 1.5 0 0 1 7.5 9H4M20 9h-3.5A1.5 1.5 0 0 1 15 7.5V4M15 20v-3.5a1.5 1.5 0 0 1 1.5-1.5H20M4 15h3.5A1.5 1.5 0 0 1 9 16.5V20\"/>", e),
	service: (e) => X("<path d=\"M3 12h18\"/><circle class=\"l10-solid\" cx=\"7\" cy=\"12\" r=\"2.4\"/><circle cx=\"17\" cy=\"12\" r=\"2.4\"/>", e),
	stations: (e) => X("<path d=\"M7 4v16\"/><circle class=\"l10-solid\" cx=\"7\" cy=\"6\" r=\"2.2\"/><circle cx=\"7\" cy=\"12\" r=\"2.2\" fill=\"currentColor\"/><circle cx=\"7\" cy=\"18\" r=\"2.2\"/><path d=\"M12 6h8M12 12h8M12 18h5\"/>", e),
	captionStyle: (e) => X("<rect x=\"2.5\" y=\"4.5\" width=\"19\" height=\"15\" rx=\"3\"/><text class=\"l10-solid l10-aa\" x=\"12\" y=\"15.4\" text-anchor=\"middle\">Aa</text>", e),
	quality: (e) => X("<rect x=\"2.5\" y=\"4.5\" width=\"19\" height=\"15\" rx=\"3\"/><text class=\"l10-solid l10-aa\" x=\"12\" y=\"15.4\" text-anchor=\"middle\">HD</text>", e),
	settings: (e) => X("<path d=\"M4 7h9M17 7h3M4 17h3M11 17h9\"/><circle cx=\"15\" cy=\"7\" r=\"2.2\"/><circle cx=\"9\" cy=\"17\" r=\"2.2\"/>", e),
	gear: (e) => X("<path d=\"M18.80 10.34 L21.20 10.61 L21.20 13.39 L18.80 13.66 L17.98 15.63 L19.48 17.52 L17.52 19.48 L15.63 17.98 L13.66 18.80 L13.39 21.20 L10.61 21.20 L10.34 18.80 L8.37 17.98 L6.48 19.48 L4.52 17.52 L6.02 15.63 L5.20 13.66 L2.80 13.39 L2.80 10.61 L5.20 10.34 L6.02 8.37 L4.52 6.48 L6.48 4.52 L8.37 6.02 L10.34 5.20 L10.61 2.80 L13.39 2.80 L13.66 5.20 L15.63 6.02 L17.52 4.52 L19.48 6.48 L17.98 8.37Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", e),
	chevron: (e) => X("<path d=\"M9.5 6l6 6-6 6\"/>", e),
	back2: (e) => X("<path d=\"M14.5 6l-6 6 6 6\"/>", e),
	check: (e) => X("<path d=\"M5 12.5l4.2 4.2L19 7\"/>", e)
}, Ef = {
	.5: "Slow",
	.75: "Night",
	1: "Local",
	1.25: "Limited",
	1.5: "Express",
	2: "Rapid"
}, Df = "0.5 0.75 1 1.25 1.5 2", Of = {
	boardSize: [
		["full", "Full"],
		["compact", "Compact"],
		["off", "Hidden"]
	],
	boardPos: [["right", "Top right"], ["left", "Top left"]],
	boardStyle: [
		["solid", "Solid"],
		["glass", "Glass"],
		["clear", "No panel"]
	],
	boardFlip: [["on", "Flip letters"], ["off", "Instant"]],
	capSize: [
		["xl", "Extra large"],
		["l", "Large"],
		["m", "Medium"],
		["s", "Small"],
		["xs", "Extra small"]
	],
	capColor: [
		["white", "White"],
		["yellow", "Yellow"],
		["line", "Line colour"]
	],
	capBg: [
		["100", "Solid"],
		["75", "75%"],
		["50", "50%"],
		["25", "25%"],
		["0", "Transparent"]
	],
	capEdge: [
		["thick", "Thick"],
		["medium", "Medium"],
		["thin", "Thin"],
		["none", "None"]
	],
	capShadow: [
		["glow", "All around"],
		["br", "Down-right ↘"],
		["b", "Down ↓"],
		["bl", "Down-left ↙"],
		["off", "Off"]
	],
	capBrackets: [
		["square", "[ ]"],
		["round", "( )"],
		["double", "“ ”"],
		["single", "‘ ’"],
		["none", "No brackets"]
	]
}, kf = [
	["boardSize", "Size"],
	["boardPos", "Position"],
	["boardStyle", "Style"],
	["boardFlip", "Letters"]
], Af = [
	["capSize", "Text size"],
	["capColor", "Text colour"],
	["capBg", "Background"],
	["capEdge", "Outline"],
	["capShadow", "Shadow"],
	["capBrackets", "Brackets"]
], jf = {
	boardSize: "full",
	boardPos: "left",
	boardStyle: "glass",
	boardFlip: "on",
	capSize: "m",
	capColor: "white",
	capBg: "75",
	capEdge: "none",
	capShadow: "off",
	capBrackets: "square",
	volume: 1,
	muted: !1,
	rate: 1,
	captions: !1
}, Mf = {
	square: ["[", "]"],
	round: ["(", ")"],
	double: ["“", "”"],
	single: ["‘", "’"],
	none: ["", ""]
}, Nf = "line10:prefs", Pf = () => {
	try {
		return {
			...jf,
			...JSON.parse(localStorage.getItem(Nf) || "{}")
		};
	} catch {
		return { ...jf };
	}
}, Ff = (e) => {
	try {
		localStorage.setItem(Nf, JSON.stringify(e));
	} catch {}
}, If = 0, Q = (e) => String(e ?? "").replace(/[&<>"]/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[e]), Lf = (e) => (e = Math.max(0, Math.floor(e || 0)), `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`), Rf = 540, zf = () => matchMedia("(prefers-reduced-motion: reduce)").matches, Bf = (e) => e.map((e) => `<kbd class="l10-key">${e}</kbd>`).join(""), $ = (e, t = [], { label: n = "", delay: r = "", side: i = "top" } = {}) => `
  <media-tooltip id="${e}-tip" trigger="${e}" side="${i === "left" || i === "right" ? "top" : i}" align="${i === "top" ? "center" : "start"}" class="l10-pop l10-tip${i === "left" ? " l10-tip-end" : i === "top" ? " l10-tip-mid" : ""}"${r ? ` delay="${r}"` : ""}>
    <media-tooltip-label>${n}</media-tooltip-label>
    ${t.length ? `<span class="l10-keys">${Bf(t)}</span>` : ""}
  </media-tooltip>`, Vf = (e, t, n, r, i, a = "top", o = "end") => `
  <media-menu id="${t}" side="${a}" align="${o}" class="l10-pop l10-menu l10-setmenu ${i}">
    <media-menu-content class="l10-menu-content">
      <span class="l10-menu-label" aria-hidden="true">${n}</span>
      ${Hf(e, "pg-", r)}
    </media-menu-content>
  </media-menu>`, Hf = (e, t, n) => `
      ${n.map(([n, r]) => `
      <media-menu-item commandfor="${e(t + n)}" class="l10-menu-item l10-menu-nav">
        <span class="l10-menu-text">${r}</span>
        <span class="l10-menu-value" data-for="${n}"></span>
        ${Z.chevron("l10-menu-chev")}
      </media-menu-item>
      <media-menu-content class="l10-menu-content" id="${e(t + n)}">
        <media-menu-item class="l10-menu-item l10-menu-back">${Z.back2("l10-menu-chev")}<span class="l10-menu-text">${r}</span></media-menu-item>
        <media-menu-radio-group class="l10-menu-group" data-pref="${n}" aria-label="${r}">
          ${Of[n].map(([e, t]) => `
          <media-menu-radio-item class="l10-menu-item" value="${e}">
            <span class="l10-menu-dot" aria-hidden="true"></span>
            <span data-part="label" class="l10-menu-text">${t}</span>
            <media-menu-item-indicator force-mount class="l10-menu-check">${Z.check()}</media-menu-item-indicator>
          </media-menu-radio-item>`).join("")}
        </media-menu-radio-group>
      </media-menu-content>`).join("")}`, Uf = (e = "") => `
                    <media-playback-rate-radio-group class="l10-menu-group ${e}" rates="${Df}" aria-label="Service">
                      <media-menu-group-label class="l10-menu-label">Service</media-menu-group-label>
                      <template>
                        <media-menu-radio-item class="l10-menu-item">
                          <span class="l10-menu-dot" aria-hidden="true"></span>
                          <span data-part="label" class="l10-menu-text"></span>
                          <media-menu-item-indicator force-mount class="l10-menu-check">${Z.check()}</media-menu-item-indicator>
                        </media-menu-radio-item>
                      </template>
                    </media-playback-rate-radio-group>`, Wf = () => `
                    <media-quality-radio-group class="l10-menu-group l10-qgroup">
                      <template>
                        <media-menu-radio-item class="l10-menu-item">
                          <span class="l10-menu-dot" aria-hidden="true"></span>
                          <span data-part="label" class="l10-menu-text"></span>
                          <span data-part="badge" class="l10-menu-badge"></span>
                          <media-menu-item-indicator force-mount class="l10-menu-check">${Z.check()}</media-menu-item-indicator>
                        </media-menu-radio-item>
                      </template>
                    </media-quality-radio-group>`, Gf = (e, t, n, r, i) => `
      <media-menu-item commandfor="${e(t)}" class="l10-menu-item l10-menu-nav ${n}">
        ${r}<span class="l10-menu-text">${i}</span><span class="l10-menu-value" data-m="${n}"></span>${Z.chevron("l10-menu-chev")}
      </media-menu-item>`, Kf = (e) => `<media-menu-item class="l10-menu-item l10-menu-back">${Z.back2("l10-menu-chev")}<span class="l10-menu-text">${e}</span></media-menu-item>`, qf = (e) => `
  <media-menu id="${e("more-menu")}" side="top" align="end" class="l10-pop l10-menu l10-setmenu l10-moremenu">
    <span class="l10-more-cue" aria-hidden="true">${Z.chevron()}</span>
    <media-menu-content class="l10-menu-content">
      <span class="l10-menu-label" aria-hidden="true">Settings</span>
      ${Gf(e, "m-st", "l10-m-st", Z.stations("l10-menu-ico"), "Stations")}
      <media-menu-content class="l10-menu-content" id="${e("m-st")}">${Kf("Stations")}<div class="l10-menu-group l10-stlist"></div></media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-next">${Z.nextStop("l10-menu-ico")}<span class="l10-menu-text">Next stop</span><span class="l10-menu-value" data-m="l10-m-next"></span></media-menu-item>
      ${Gf(e, "m-svc", "l10-m-svc", Z.service("l10-menu-ico"), "Speed")}
      <media-menu-content class="l10-menu-content l10-flip-list" id="${e("m-svc")}">${Kf("Speed")}${Uf()}</media-menu-content>
      ${Gf(e, "m-q", "l10-m-q", Z.quality("l10-menu-ico"), "Quality")}
      <media-menu-content class="l10-menu-content l10-flip-list" id="${e("m-q")}">${Kf("Quality")}${Wf()}</media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-cc">${Z.ccOff("l10-menu-ico")}<span class="l10-menu-text">Captions</span><span class="l10-menu-value" data-m="l10-m-cc"></span></media-menu-item>
      ${Gf(e, "m-cs", "l10-m-cs", Z.captionStyle("l10-menu-ico"), "Caption style")}
      <media-menu-content class="l10-menu-content l10-cspage" id="${e("m-cs")}" data-show="list">${Kf("Caption style")}
        <div class="l10-csview" data-view="list">${Af.map(([e, t]) => `
          <media-menu-item class="l10-menu-item l10-menu-nav l10-csrow" data-k="${e}">
            <span class="l10-menu-text">${t}</span><span class="l10-menu-value" data-for="${e}"></span>${Z.chevron("l10-menu-chev")}
          </media-menu-item>`).join("")}
        </div>${Af.map(([e, t]) => `
        <div class="l10-csview" data-view="${e}" hidden>
          <media-menu-item class="l10-menu-item l10-menu-back l10-csback">${Z.back2("l10-menu-chev")}<span class="l10-menu-text">${t}</span></media-menu-item>
          <div class="l10-menu-group" role="group" aria-label="${t}">${Of[e].map(([t, n]) => `
            <media-menu-item class="l10-menu-item l10-csopt" data-k="${e}" data-v="${t}">
              <span class="l10-menu-dot" aria-hidden="true"></span><span class="l10-menu-text">${n}</span><span class="l10-menu-check" aria-hidden="true">${Z.check()}</span>
            </media-menu-item>`).join("")}
          </div>
        </div>`).join("")}
      </media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-pip">${Z.pipIn("l10-menu-ico")}<span class="l10-menu-text l10-m-pip-text">Picture-in-picture</span></media-menu-item>
    </media-menu-content>
  </media-menu>`, Jf = "(max-width: 1180px) 100vw, 1140px", Yf = (e) => /image\.mux\.com\/.+[?&]width=\d+/.test(e) ? [
	640,
	960,
	1280
].map((t) => `${e.replace(/([?&]width=)\d+/, `$1${t}`)} ${t}w`).join(", ") : "", Xf = (e, t) => {
	let n = Yf(e);
	return `<img src="${Q(e)}"${n ? ` srcset="${Q(n)}" sizes="${Jf}"` : ""}${t ? " fetchpriority=\"high\"" : ""} alt="">`;
};
function Zf(e) {
	let t = ++If, n = (e) => `l10-${t}-${e}`, r = `
      ${e.captions ? `<track kind="captions" srclang="en" label="English" src="${Q(e.captions)}">` : ""}
      ${e.chapters ? `<track kind="chapters" srclang="en" label="Stations" src="${Q(e.chapters)}" default>` : ""}`, i = e.playbackId ? `<mux-video src="https://stream.mux.com/${Q(e.playbackId)}.m3u8" playsinline preload="metadata" crossorigin="anonymous">${r}</mux-video>` : `<video src="${Q(e.src)}" playsinline preload="metadata" crossorigin="anonymous">${r}
      ${e.storyboard ? `<track kind="metadata" label="thumbnails" src="${Q(e.storyboard)}" default>` : ""}</video>`, a = [e.line ? `--l10-line:${Q(e.line)}` : "", e.ratio ? `aspect-ratio:${Q(e.ratio)}` : ""].filter(Boolean).join(";"), o = Q(e.number || "10");
	return `
<video-player class="l10-player" ${e.title ? `content-title="${Q(e.title)}"` : ""}>
  <media-container class="l10" data-preset="video"${a ? ` style="${a}"` : ""}>
    ${i}
    <media-poster class="l10-poster">${e.poster ? Xf(e.poster, t === 1) : ""}</media-poster>

    <media-controls class="l10-controls">
      <media-controls-content class="l10-content">
        <media-tooltip-group delay="500">

          <!-- Departure board. The tiles are visual only: the title is announced by media-title, times by media-time. -->
          <div class="l10-board">
            <div class="l10-board-body" aria-hidden="true">
              <div class="l10-board-head">
                <span class="l10-badge">${o}</span>
                <span class="l10-board-title"></span>
              </div>
              <div class="l10-board-rows">
                <div class="l10-board-row l10-row-now" data-badge="${o}"><span class="l10-board-label">Now</span><span class="l10-flaps" data-flap="now" data-len="13"></span></div>
                <div class="l10-board-row l10-row-next"><span class="l10-board-label">Next</span><span class="l10-flaps" data-flap="next" data-len="13"></span><span class="l10-flaps l10-eta" data-flap="eta" data-len="4"></span></div>
              </div>
            </div>
            <button type="button" class="l10-gear" id="${n("gear")}" commandfor="${n("board-menu")}" aria-label="Departure board settings" aria-haspopup="menu">${Z.gear()}</button>
          </div>
          ${$(n("gear"), [], {
		label: "Departure board settings",
		side: "bottom"
	})}
          ${Vf(n, n("board-menu"), "Departure board", kf, "l10-boardmenu", "bottom", "start")}
          <media-title class="l10-sr"></media-title>

          <media-controls-group class="l10-center">
            <media-seek-button seconds="-5" class="l10-btn l10-ghost l10-cseek" id="${n("back")}">${Z.back()}</media-seek-button>
            ${$(n("back"), ["←", "J"])}
            <media-play-button class="l10-btn l10-play l10-cplay" id="${n("cplay")}">
              ${Z.restart("l10-i-restart")}${Z.play("l10-i-play")}${Z.pause("l10-i-pause")}
            </media-play-button>
            ${$(n("cplay"), ["Space", "K"])}
            <media-seek-button seconds="5" class="l10-btn l10-ghost l10-cseek" id="${n("fwd")}">${Z.fwd()}</media-seek-button>
            ${$(n("fwd"), ["→", "L"])}
          </media-controls-group>

          <div class="l10-panel">
            <div class="l10-route">
              <div class="l10-stations" aria-hidden="true"></div>
              <media-time-slider class="l10-slider" thumb-alignment="center">
                <media-time-slider-chapters class="l10-chapters">
                  <template>
                    <div class="l10-seg">
                      <media-slider-track class="l10-track">
                        <media-slider-buffer class="l10-buffer"></media-slider-buffer>
                        <media-slider-fill class="l10-fill"></media-slider-fill>
                      </media-slider-track>
                    </div>
                  </template>
                </media-time-slider-chapters>
                <media-slider-thumb class="l10-train"><span class="l10-train-car" aria-hidden="true"><i></i><i></i><i></i></span></media-slider-thumb>
                <media-slider-preview class="l10-sign" overflow="clamp">
                  <span class="l10-sign-card">
                    <media-slider-thumbnail class="l10-sign-img"></media-slider-thumbnail>
                    <span class="l10-sign-text">
                      <span class="l10-sign-top"><span class="l10-badge l10-badge-sm" aria-hidden="true">${o}</span><media-slider-value type="pointer" class="l10-sign-time"></media-slider-value></span>
                      <media-time-slider-chapter-title class="l10-sign-name"></media-time-slider-chapter-title>
                    </span>
                  </span>
                </media-slider-preview>
                <span class="l10-pole" aria-hidden="true"></span>
              </media-time-slider>
            </div>

            <media-controls-group class="l10-row">
              <media-controls-group class="l10-group">
                <media-play-button class="l10-btn l10-play l10-rplay" id="${n("play")}">
                  ${Z.restart("l10-i-restart")}${Z.play("l10-i-play")}${Z.pause("l10-i-pause")}
                </media-play-button>
                ${$(n("play"), ["Space", "K"], { side: "right" })}
                <media-seek-button seconds="-5" class="l10-btn l10-rseek" id="${n("rback")}">${Z.back()}</media-seek-button>
                ${$(n("rback"), ["←", "J"], { side: "right" })}
                <media-seek-button seconds="5" class="l10-btn l10-rseek" id="${n("rfwd")}">${Z.fwd()}</media-seek-button>
                ${$(n("rfwd"), ["→", "L"], { side: "right" })}
                <media-mute-button class="l10-btn l10-mute" id="${n("mute")}" commandfor="${n("vol")}">
                  ${Z.volOff("l10-i-off")}${Z.vol1("l10-i-v1")}${Z.vol2("l10-i-v2")}${Z.vol3("l10-i-v3")}
                </media-mute-button>
                <media-volume-popover open-on-hover delay="100" close-delay="300" side="top" class="l10-pop l10-volume" id="${n("vol")}">
                  <media-volume-slider class="l10-vslider" orientation="vertical" thumb-alignment="edge">
                    <media-slider-track class="l10-vtrack"><media-slider-fill class="l10-vfill"></media-slider-fill></media-slider-track>
                    <media-slider-thumb class="l10-vthumb"></media-slider-thumb>
                  </media-volume-slider>
                  <!-- after 2 s of hovering, a hint explains the control and its keys -->
                  <span class="l10-vol-hint" aria-hidden="true"><b>Volume</b><span>${Bf(["M"])} mute</span><span>${Bf(["↑", "↓"])} louder / quieter</span><span>Drag or click the fader</span></span>
                </media-volume-popover>
                <media-time-group class="l10-time">
                  <media-time type="current" class="l10-time-now"></media-time>
                  <media-time-separator class="l10-time-sep"></media-time-separator>
                  <media-time type="duration" class="l10-time-dur"></media-time>
                  <media-time type="remaining" class="l10-time-left"></media-time>
                </media-time-group>
              </media-controls-group>

              <media-controls-group class="l10-group l10-group-end">
                <button type="button" class="l10-btn l10-stbtn" id="${n("st")}" commandfor="${n("st-menu")}" aria-label="All stations" aria-haspopup="menu" data-off>${Z.stations()}</button>
                ${$(n("st"), [], {
		label: "All stations",
		side: "left"
	})}
                <media-menu id="${n("st-menu")}" side="top" align="end" class="l10-pop l10-menu l10-stmenu">
                  <media-menu-content class="l10-menu-content">
                    <span class="l10-menu-label" aria-hidden="true">Stations</span>
                    <div class="l10-menu-group l10-stlist"></div>
                  </media-menu-content>
                </media-menu>
                <button type="button" class="l10-btn l10-pill l10-nextstop" id="${n("next")}" aria-keyshortcuts="]" hidden>
                  ${Z.nextStop()}<span class="l10-pill-text">Next stop</span>
                </button>
                ${$(n("next"), ["[", "]"], {
		label: "Jump to the next station",
		side: "left"
	})}
                <media-playback-rate-button class="l10-btn l10-pill l10-service" id="${n("svc")}" commandfor="${n("svc-menu")}" rates="${Df}">
                  ${Z.service()}<span class="l10-pill-text l10-service-name" aria-hidden="true">Local</span><span class="l10-service-rate" aria-hidden="true">1×</span>
                </media-playback-rate-button>
                ${$(n("svc"), ["&lt;", "&gt;"], {
		label: "Speed",
		side: "left"
	})}
                <media-menu id="${n("svc-menu")}" side="top" align="end" class="l10-pop l10-menu l10-flip-list">
                  <media-menu-content class="l10-menu-content">
                    ${Uf()}
                  </media-menu-content>
                </media-menu>
                <button type="button" class="l10-btn l10-pill l10-quality" id="${n("q")}" commandfor="${n("q-menu")}" aria-label="Quality" aria-haspopup="menu" data-off><span class="l10-pill-text l10-quality-name">Auto</span></button>
                ${$(n("q"), [], {
		label: "Quality",
		side: "left"
	})}
                <media-menu id="${n("q-menu")}" side="top" align="end" class="l10-pop l10-menu l10-qmenu l10-flip-list">
                  <media-menu-content class="l10-menu-content">
                    <span class="l10-menu-label" aria-hidden="true">Quality</span>
                    ${Wf()}
                  </media-menu-content>
                </media-menu>
                <media-captions-button class="l10-btn l10-cc" id="${n("cc")}">${Z.ccOff("l10-i-cc-off")}${Z.ccOn("l10-i-cc-on")}</media-captions-button>
                ${$(n("cc"), ["C"], { side: "left" })}
                <button type="button" class="l10-btn l10-capset" id="${n("capset")}" commandfor="${n("capset-menu")}" aria-label="Caption style" aria-haspopup="menu">${Z.captionStyle()}</button>
                ${$(n("capset"), [], {
		label: "Caption style",
		side: "left"
	})}
                <media-pip-button class="l10-btn l10-pip" id="${n("pip")}">${Z.pipIn("l10-i-pip-in")}${Z.pipOut("l10-i-pip-out")}</media-pip-button>
                ${$(n("pip"), ["I"], { side: "left" })}
                ${Vf(n, n("capset-menu"), "Caption style", Af, "l10-capmenu")}
                <button type="button" class="l10-btn l10-more" id="${n("more")}" aria-keyshortcuts="S" commandfor="${n("more-menu")}" aria-label="Settings" aria-haspopup="menu">${Z.settings()}</button>
                ${$(n("more"), ["S"], {
		label: "Settings",
		side: "left"
	})}
                ${qf(n)}
                <media-fullscreen-button class="l10-btn l10-fs" id="${n("fs")}">${Z.fsIn("l10-i-fs-in")}${Z.fsOut("l10-i-fs-out")}</media-fullscreen-button>
                ${$(n("fs"), ["F"], { side: "left" })}
              </media-controls-group>
            </media-controls-group>
          </div>
        </media-tooltip-group>
      </media-controls-content>
    </media-controls>

    <!-- Shown while the controls are hidden: "Now arriving" as the train pulls into a station. -->
    <!-- Captions are drawn here (not by the browser) so they can step up above the line when the controls show. -->
    <div class="l10-captions" aria-hidden="true"><span class="l10-cap-text"></span></div>

    <div class="l10-arrival" aria-hidden="true"><span class="l10-badge l10-badge-sm">${o}</span><span><small>Now arriving</small><b class="l10-arrival-name"></b></span></div>

    <!-- Buffering: the train is held between two stops until the signal clears. -->
    <media-buffering-indicator class="l10-buffering">
      <span class="l10-hold" aria-hidden="true">
        <span class="l10-hold-track">${Array.from({ length: 12 }, (e, t) => `<i style="--i:${t}"></i>`).join("")}</span>
        <span class="l10-hold-text">Held at a signal</span>
      </span>
    </media-buffering-indicator>

    <!-- The end of the line: ride again, or change here for the next line the page offers. -->
    <div class="l10-endcard" role="group" aria-label="End of the line">
      <span class="l10-term-tag">Terminus</span>
      <b class="l10-term-name"></b>
      <div class="l10-term-actions">
        <button type="button" class="l10-term-btn l10-term-next" id="${n("tnext")}" aria-keyshortcuts="N" hidden>
          <span class="l10-badge l10-term-badge"></span>
          <span class="l10-term-label"><small>Change here for</small><b class="l10-term-next-name"></b></span>
          ${Z.chevron("l10-term-arrow")}
        </button>
        ${$(n("tnext"), ["N"], { label: "Next line" })}
        <button type="button" class="l10-term-btn l10-term-again" id="${n("tagain")}" aria-keyshortcuts="R">${Z.restart()}<span>Ride again</span></button>
        ${$(n("tagain"), ["R"], { label: "Ride again" })}
      </div>
    </div>

    <div class="l10-indicators" aria-hidden="true">
      <media-seek-indicator class="l10-ind"><media-seek-indicator-value class="l10-ind-value"></media-seek-indicator-value></media-seek-indicator>
      <media-volume-indicator class="l10-ind l10-ind-vol">
        <span class="l10-ind-gauge"><media-volume-indicator-fill class="l10-ind-fill"></media-volume-indicator-fill></span>
        <media-volume-indicator-value class="l10-ind-value"></media-volume-indicator-value>
      </media-volume-indicator>
      <media-status-indicator class="l10-ind"><media-status-indicator-value class="l10-ind-value"></media-status-indicator-value></media-status-indicator>
    </div>

    <media-hotkey keys="Space" action="togglePaused"></media-hotkey>
    <media-hotkey keys="k" action="togglePaused"></media-hotkey>
    <media-hotkey keys="m" action="toggleMuted"></media-hotkey>
    <media-hotkey keys="ArrowRight" action="seekStep" value="5"></media-hotkey>
    <media-hotkey keys="ArrowLeft" action="seekStep" value="-5"></media-hotkey>
    <media-hotkey keys="l" action="seekStep" value="5"></media-hotkey>
    <media-hotkey keys="j" action="seekStep" value="-5"></media-hotkey>
    <media-hotkey keys="ArrowUp" action="volumeStep" value="0.05"></media-hotkey>
    <media-hotkey keys="ArrowDown" action="volumeStep" value="-0.05"></media-hotkey>
    <media-hotkey keys="0-9" action="seekToPercent"></media-hotkey>
    <media-hotkey keys="Home" action="seekToPercent" value="0"></media-hotkey>
    <media-hotkey keys="End" action="seekToPercent" value="100"></media-hotkey>
    <media-hotkey keys="&gt;" action="speedUp"></media-hotkey>
    <media-hotkey keys="&lt;" action="speedDown"></media-hotkey>
    <media-hotkey keys="f" action="toggleFullscreen"></media-hotkey>
    <media-hotkey keys="c" action="toggleSubtitles"></media-hotkey>
    ${"documentPictureInPicture" in window ? "" : "<media-hotkey keys=\"i\" action=\"togglePictureInPicture\"></media-hotkey>"}

    <media-gesture type="tap" action="toggleControls" pointer="touch"></media-gesture>
    <media-gesture type="doubletap" action="seekStep" value="-5" region="left"></media-gesture>
    <media-gesture type="doubletap" action="toggleFullscreen" region="center"></media-gesture>
    <media-gesture type="doubletap" action="seekStep" value="5" region="right"></media-gesture>

    <media-status-announcer class="l10-sr"></media-status-announcer>
    <div class="l10-sr l10-sr-board" aria-live="polite" aria-atomic="true"></div>

    <media-error-dialog>
      <media-dialog-backdrop class="l10-backdrop"></media-dialog-backdrop>
      <media-dialog-popup class="l10-dialog">
        <span class="l10-dialog-tag" aria-hidden="true">Service notice</span>
        <media-dialog-title class="l10-dialog-title"></media-dialog-title>
        <p class="l10-dialog-help">This train can't run right now. Check your connection and try again.</p>
        <media-dialog-description class="l10-dialog-text"></media-dialog-description>
        <media-dialog-close class="l10-btn l10-pill l10-dialog-close"></media-dialog-close>
      </media-dialog-popup>
    </media-error-dialog>
  </media-container>
</video-player>`;
}
var Qf = "ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789";
function $f(e, t) {
	let n = Number(e.dataset.len) || t.length, r = String(t).toUpperCase().slice(0, n).padEnd(n, " ");
	if (e.dataset.text === r) return;
	let i = !e.children.length;
	i && (e.innerHTML = Array.from({ length: n }, () => "<span class=\"l10-tile\"><span> </span></span>").join("")), e.dataset.text = r;
	let a = i || zf() || e.closest(".l10")?.dataset.boardFlip === "off";
	[...e.children].forEach((e, t) => {
		let n = e.firstElementChild, i = r[t];
		if (clearTimeout(e._t), n.textContent === i) return;
		if (a) {
			n.textContent = i;
			return;
		}
		let o = i === " " ? 1 : 2 + t * 7 % 3, s = () => {
			e.classList.remove("l10-flip"), e.offsetWidth, e.classList.add("l10-flip"), n.textContent = o > 1 ? Qf[Math.random() * 35 | 0] : i, --o > 0 && (e._t = setTimeout(s, 70));
		};
		e._t = setTimeout(s, t * 28);
	});
}
var ep = class extends HTMLElement {
	static observedAttributes = [
		"line",
		"next-title",
		"next-number",
		"next-line"
	];
	attributeChangedCallback(e, t, n) {
		this.dataset.ready != null && (e === "line" ? this.querySelector(".l10")?.style.setProperty("--l10-line", n || "") : this.#t?.());
	}
	connectedCallback() {
		if (this.dataset.ready != null) return;
		this.dataset.ready = "";
		let e = (e) => this.getAttribute(e), t = e("title") || "";
		e("playback-id") && import("./mux-video-BHPpuX82.js");
		let n = this.querySelector("img.l10-preposter");
		this.innerHTML = Zf({
			src: e("src"),
			poster: e("poster"),
			title: e("title"),
			captions: e("captions"),
			chapters: e("chapters"),
			storyboard: e("storyboard"),
			playbackId: e("playback-id"),
			line: e("line"),
			number: e("number"),
			ratio: e("ratio")
		}), this.removeAttribute("title");
		let r = this.querySelector(".l10-poster img");
		n && r && (n.classList.remove("l10-preposter"), r.replaceWith(n)), e("playback-id") ? customElements.whenDefined("mux-video").then(() => this.#n(t)) : this.#n(t);
	}
	#e = null;
	#t = null;
	disconnectedCallback() {
		setTimeout(() => {
			this.isConnected || (this.#e?.abort(), this.#e = null);
		}, 0);
	}
	#n(e) {
		let t = this.#e = new AbortController(), n = { signal: t.signal }, r = (e) => this.querySelector(e), i = r(".l10"), a = i.querySelector("video, mux-video"), o = r(".l10-stations"), s = r(".l10-nextstop"), c = r(".l10-stbtn"), l = [...i.querySelectorAll(".l10-stlist")], u = r(".l10-sr-board"), d = r(".l10-service-name"), f = r(".l10-arrival"), p = {
			now: r("[data-flap=\"now\"]"),
			next: r("[data-flap=\"next\"]"),
			eta: r("[data-flap=\"eta\"]")
		};
		r(".l10-board-title").textContent = e;
		let m = [], h = -1, g = "";
		for (let e of i.querySelectorAll("media-playback-rate-radio-group")) {
			e.formatRate = (e) => Ef[e] || `${e}×`;
			let t = () => e.querySelectorAll("media-menu-radio-item[data-rate]").forEach((e) => {
				let t = Number(e.dataset.rate);
				e.setAttribute("aria-label", `${Ef[t] || "Custom"}, ${t} times speed`);
			});
			new MutationObserver(t).observe(e, {
				childList: !0,
				subtree: !0,
				attributeFilter: ["data-rate"]
			}), t();
		}
		let _ = () => {
			let e = [...a.textTracks || []].find((e) => e.kind === "chapters");
			if (!e) return;
			e.mode === "disabled" && (e.mode = "hidden");
			let t = [...e.cues || []], n = a.duration;
			if (!t.length || !Number.isFinite(n) || n <= 0) return;
			let u = t.map((e) => ({
				start: e.startTime,
				end: e.endTime,
				name: e.text.trim()
			})), d = JSON.stringify([n, u]);
			if (d === g) return;
			g = d, m = u, o.innerHTML = m.map((e, t) => `
        <span class="l10-stop${t === m.length - 1 ? " l10-terminus" : ""}${t === 0 ? " l10-origin" : ""}" style="--at:${e.start / n * 100}%">
          <span class="l10-dot"></span><span class="l10-name">${Q(e.name)}</span>
        </span>`).join("") + "<span class=\"l10-endcap\"></span>", i.style.setProperty("--l10-stops", m.length);
			let f = m.map((e, t) => `
        <media-menu-item class="l10-menu-item l10-st-item" data-k="${t}">
          <span class="l10-menu-dot" aria-hidden="true"></span>
          <span class="l10-menu-text">${Q(e.name)}</span>
          <span class="l10-st-time">${Lf(e.start)}</span>
        </media-menu-item>`).join("");
			l.forEach((e) => {
				e.innerHTML = f;
			}), c.toggleAttribute("data-off", m.length < 2), r(".l10-m-st").toggleAttribute("data-off", m.length < 2), r(".l10-m-next").toggleAttribute("data-off", m.length < 2), y(), s.hidden = m.length < 2, h = -1, v();
		}, v = () => {
			let t = a.currentTime || 0, n = a.duration || 0, c = a.ended || !!(n && t >= n - .05);
			if (i.hasAttribute("data-terminus") !== c && (i.toggleAttribute("data-terminus", c), r(".l10-term-name").textContent = m[m.length - 1]?.name || e.split(/[—–-]/)[0].trim() || ""), !m.length) {
				$f(p.now, e.split(/[—–-]/)[0].trim() || "Line 10"), $f(p.next, n ? "Terminus" : ""), $f(p.eta, n ? Lf(n - t) : "");
				return;
			}
			let d = m.findIndex((e) => t >= e.start && t < e.end);
			d < 0 && (d = t >= m[m.length - 1].start ? m.length - 1 : 0), o.querySelectorAll(".l10-stop").forEach((e, t) => {
				e.dataset.state = t < d ? "passed" : t === d ? "current" : "ahead";
			});
			let g = m[d + 1];
			$f(p.now, c ? "Terminus" : m[d].name), $f(p.next, c ? "Change here" : g ? g.name : "Terminus"), $f(p.eta, c ? "" : Lf((g ? g.start : n) - t)), s.setAttribute("aria-label", g ? `Next stop: ${g.name}` : "Last stop reached"), s.toggleAttribute("data-last", !g), d !== h && (h !== -1 && !a.paused && !c && (r(".l10-arrival-name").textContent = m[d].name, f.classList.remove("l10-show"), f.offsetWidth, f.classList.add("l10-show")), h = d, y(), l.forEach((e) => e.querySelectorAll(".l10-st-item").forEach((e, t) => e.toggleAttribute("data-current", t === d))), u.textContent = c ? "Terminus." : `Now at ${m[d].name}.${g ? ` Next: ${g.name}.` : " Last stop."}`);
		}, y = () => {
			let e = [...o.querySelectorAll(".l10-stop")];
			if (!e.length) return;
			let t = o.clientWidth;
			if (!t) return;
			let n = e.map((e, n) => {
				let r = e.querySelector(".l10-name"), i = r.offsetWidth, o = m[n].start / (a.duration || 1) * t, s = Math.min(Math.max(o - i / 2, -4), t - i + 4);
				return r.style.setProperty("--shift", `${Math.round(s - o)}px`), {
					el: e,
					k: n,
					left: s,
					right: s + i
				};
			}), r = (e) => e.el.dataset.state === "current" ? 0 : e.k === h + 1 ? 1 : e.k === m.length - 1 ? 2 : e.k === 0 ? 3 : 4, s = [[], []], c = (e, t) => e.some((e) => t.left < e.right + 12 && t.right + 12 > e.left);
			[...n].sort((e, t) => r(e) - r(t) || e.k - t.k).forEach((e) => {
				let t = c(s[0], e) ? c(s[1], e) ? -1 : 1 : 0;
				e.el.toggleAttribute("data-crowded", t < 0), e.el.style.setProperty("--row", t < 0 ? 0 : t), t >= 0 && s[t].push(e);
			}), i.toggleAttribute("data-two-rows", s[1].length > 0);
		};
		new ResizeObserver(() => y()).observe(o);
		let b = (e) => {
			if (!m.length) return;
			let t = a.currentTime;
			if (e > 0) {
				let e = m.find((e) => e.start > t + .25);
				a.currentTime = e ? e.start : a.duration;
			} else {
				let e = [...m].reverse().find((e) => e.start < t - 1.5);
				a.currentTime = e ? e.start : 0;
			}
		};
		s.addEventListener("click", () => b(1)), l.forEach((e) => e.addEventListener("select", (e) => {
			let t = e.target.closest(".l10-st-item");
			t && (a.currentTime = m[Number(t.dataset.k)].start);
		}));
		let x = r(".l10-center");
		x.setAttribute("aria-hidden", "true");
		let S = () => x.querySelectorAll(".l10-btn").forEach((e) => {
			e.getAttribute("tabindex") !== "-1" && e.setAttribute("tabindex", "-1");
		});
		S(), new MutationObserver(S).observe(x, {
			subtree: !0,
			attributes: !0,
			attributeFilter: ["tabindex"]
		}), i.addEventListener("keydown", (e) => {
			if (!(e.target.closest("input, textarea, [role=\"menu\"]") || e.altKey || e.ctrlKey || e.metaKey)) {
				if (i.hasAttribute("data-terminus") && /^[nr]$/i.test(e.key)) {
					let t = r(e.key.toLowerCase() === "n" ? ".l10-term-next" : ".l10-term-again");
					if (!t.hidden) {
						t.click(), e.preventDefault();
						return;
					}
				}
				(e.key === "]" || e.key === "n") && (b(1), e.preventDefault()), (e.key === "[" || e.key === "p") && (b(-1), e.preventDefault());
			}
		});
		let C = () => {
			d.textContent = Ef[a.playbackRate] || "Custom", r(".l10-service-rate").textContent = `${a.playbackRate}×`;
		}, w = Pf(), T = () => {}, E = 0, D = 0, ee = !1;
		w.board && !w.boardSize && (w.boardSize = w.board), w.boardPos === "center" && (w.boardPos = "left");
		let te = {
			boardSize: "board",
			boardPos: "boardPos",
			boardStyle: "boardStyle",
			boardFlip: "boardFlip",
			capSize: "capsize",
			capColor: "capcolor",
			capBg: "capbg",
			capEdge: "capedge",
			capShadow: "capshadow"
		}, ne = () => {
			for (let [e, t] of Object.entries(te)) i.dataset[t] = w[e] ?? jf[e];
			i.querySelectorAll(".l10-menu-value[data-for]").forEach((e) => {
				let t = e.dataset.for;
				e.textContent = (Of[t].find(([e]) => e === w[t]) || [])[1] || "";
			}), ee = !0, i.querySelectorAll("media-menu-radio-group[data-pref]").forEach((e) => {
				let t = w[e.dataset.pref] ?? jf[e.dataset.pref];
				e.value !== t && (e.value = t);
			}), ee = !1, re.setAttribute("align", w.boardPos === "right" ? "end" : w.boardPos === "center" ? "center" : "start"), T();
		}, re = r(".l10-boardmenu"), ie = (e, t) => {
			w[e] = t, Ff(w), e.startsWith("cap") && (E = Date.now() + 2600), ne(), e.startsWith("cap") && (clearTimeout(D), D = setTimeout(() => T(), 2700));
		};
		i.querySelectorAll("media-menu-radio-group[data-pref]").forEach((e) => {
			e.value = w[e.dataset.pref] ?? jf[e.dataset.pref], e.addEventListener("value-change", (t) => {
				ee || w[e.dataset.pref] === t.detail.value || ie(e.dataset.pref, t.detail.value);
			});
		});
		let ae = r(".l10-cspage"), oe = () => ae.querySelectorAll(".l10-csopt").forEach((e) => {
			let t = (w[e.dataset.k] ?? jf[e.dataset.k]) === e.dataset.v;
			e.toggleAttribute("data-checked", t), e.setAttribute("aria-label", `${e.querySelector(".l10-menu-text").textContent}${t ? ", selected" : ""}`);
		}), O = (e) => {
			ae.dataset.show = e, ae.querySelectorAll(".l10-csview").forEach((t) => {
				t.hidden = t.dataset.view !== e;
			}), oe();
			let t = ae.querySelector(`.l10-csview[data-view="${e}"] ${e === "list" ? ".l10-csrow" : ".l10-csopt[data-checked]"}`);
			requestAnimationFrame(() => t?.focus({ preventScroll: !0 })), ae.scrollTop = 0, tt();
		};
		ae.addEventListener("select", (e) => {
			let t = e.target.closest(".l10-csrow, .l10-csback, .l10-csopt");
			t && (e.preventDefault(), t.classList.contains("l10-csrow") ? O(t.dataset.k) : t.classList.contains("l10-csback") ? O("list") : (ie(t.dataset.k, t.dataset.v), oe()));
		});
		let se = !1, ce = () => {
			se || (se = !0, Number.isFinite(w.volume) && (a.volume = Math.min(1, Math.max(0, w.volume))), a.muted = !!w.muted, w.rate && Ef[w.rate] && (a.playbackRate = w.rate, a.defaultPlaybackRate = w.rate), le());
		}, le = () => {
			let e = [...a.textTracks || []].filter((e) => e.kind === "captions" || e.kind === "subtitles"), t = e.find((e) => e.label === "English") || e[0];
			t && w.captions && t.mode !== "showing" && (t.mode = "showing");
		};
		a.addEventListener("loadedmetadata", ce), a.readyState >= 1 && ce(), a.addEventListener("volumechange", () => {
			se && (w.volume = a.volume, w.muted = a.muted, Ff(w));
		}), a.addEventListener("ratechange", () => {
			se && (w.rate = a.playbackRate, Ff(w));
		});
		let k = 0, ue = () => {
			k = Date.now();
		};
		r(".l10-cc").addEventListener("click", ue), i.addEventListener("keydown", (e) => {
			(e.key === "c" || e.key === "C") && ue();
		}), a.textTracks?.addEventListener?.("change", () => {
			!se || Date.now() - k > 1500 || (w.captions = [...a.textTracks].some((e) => (e.kind === "captions" || e.kind === "subtitles") && e.mode === "showing"), Ff(w));
		});
		let A = r(".l10-mute"), de = () => {
			let e = Math.round(a.volume * 100);
			A.dataset.level = a.muted || e === 0 ? "0" : e <= 33 ? "1" : e <= 65 ? "2" : "3";
		};
		a.addEventListener("volumechange", de), de();
		let j = r(".l10-slider"), M = !1;
		j.addEventListener("pointerdown", (e) => {
			if (e.button !== 0) return;
			M = !a.paused, M && a.pause();
			let t = () => {
				n.removeEventListener("pointerup", t, !0), n.removeEventListener("pointercancel", t, !0), M && (M = !1, setTimeout(() => a.play().catch(() => {}), 0));
			}, n = j.ownerDocument.defaultView || window;
			n.addEventListener("pointerup", t, !0), n.addEventListener("pointercancel", t, !0);
		});
		let fe = () => {
			let e = a.shadowRoot;
			if (!e || e.querySelector("style[data-l10]")) return;
			let t = document.createElement("style");
			t.dataset.l10 = "", t.textContent = "video::cue{color:transparent!important;background:transparent!important;text-shadow:none!important}", e.appendChild(t);
		};
		fe(), a.localName.includes("-") && customElements.whenDefined(a.localName).then(fe), a.addEventListener("loadedmetadata", fe);
		let pe = r(".l10-captions"), me = r(".l10-cap-text"), he = (e) => e.kind === "captions" || e.kind === "subtitles";
		T = () => {
			let e = [...a.textTracks || []].find((e) => he(e) && e.mode === "showing"), [t, n] = Mf[w.capBrackets] || Mf.square, r = e ? [...e.activeCues || []].map((e) => (e.text || "").replace(/<[^>]+>/g, "").replace(/\[([^\]]*)\]/g, (e, r) => `${t}${r.trim()}${n}`)).join("\n") : "", i = Date.now() < E ? `${t ? `${t}music${n} ` : ""}Captions will look like this` : r;
			me.textContent = i, pe.toggleAttribute("data-empty", !i);
		};
		let ge = (e) => {
			he(e) && !e._l10 && (e._l10 = !0, e.addEventListener("cuechange", T));
		};
		[...a.textTracks || []].forEach(ge), a.textTracks?.addEventListener?.("addtrack", (e) => {
			ge(e.track), se && le();
		});
		let _e = () => {
			let e = [...a.textTracks || []].filter(he), t = e.find((e) => e.label === "English");
			if (!(!t || e.length < 2)) for (let n of e) n !== t && n.mode === "showing" && (n.mode = "disabled", t.mode = "showing");
		};
		a.textTracks?.addEventListener?.("change", () => {
			_e(), T();
		});
		let ve = r(".l10-quality"), ye = r(".l10-quality-name"), be = [...i.querySelectorAll(".l10-qgroup")], xe = be[0], Se = (e) => parseInt(e.querySelector("[data-part~=\"label\"]")?.textContent, 10) || 0, Ce = (e) => /auto/i.test(e.querySelector("[data-part~=\"label\"]")?.textContent || e.textContent), we = () => [...xe.querySelectorAll("media-menu-radio-item")], N = () => we().filter((e) => !Ce(e)), Te = () => we().find(Ce), Ee = () => setTimeout(() => {
			let e = a.engine;
			e && e.manualLevel >= 0 && e.currentLevel !== e.manualLevel && (e.currentLevel = e.manualLevel);
		}, 30), De = () => {
			let e = a.engine;
			return e?.levels?.[e.currentLevel]?.height || a.videoHeight || 0;
		}, Oe = !1, ke = !1, Ae = "", je = () => {
			let e = N();
			ve.toggleAttribute("data-off", e.length < 2);
			let t = we().find((e) => e.getAttribute("aria-checked") === "true"), n = t && Ce(t), r = n ? De() : t ? Se(t) : 0;
			Ae = n ? r ? `Auto · ${r}p` : "Auto" : r ? `${r}p` : "…", ye.textContent = n ? "Auto" : Ae, ve.dataset.top = r >= 2160 ? "4K" : r >= 1440 ? "2K" : r >= 720 ? "HD" : r ? "SD" : "";
		};
		a.addEventListener("resize", je), a.addEventListener("timeupdate", () => {
			ye.textContent === "Auto" && je();
		});
		let Me = 0, P = setInterval(() => {
			if (Oe || ++Me > 40) {
				clearInterval(P);
				return;
			}
			let e = N();
			if (e.length < 2 || a.readyState < 1) return;
			let t = Te();
			if (typeof w.quality == "number") {
				let n = e.filter((e) => Se(e) <= w.quality);
				t = n.length ? n.reduce((e, t) => Se(t) > Se(e) ? t : e) : e[0];
			}
			Oe = !0, t && t.getAttribute("aria-checked") !== "true" && (ke = !0, t.click(), ke = !1, Ee());
		}, 400);
		for (let e of be) new MutationObserver(je).observe(e, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-checked"]
		}), e.addEventListener("value-change", (e) => {
			if (Ee(), ke) return;
			Oe = !0;
			let t = String(e.detail?.value), n = N().find((e) => e.getAttribute("data-rendition") === t);
			if (!n && /auto|^-1$/i.test(t)) {
				w.quality = "auto", Ff(w);
				return;
			}
			let r = n ? Se(n) : parseInt(t, 10);
			r && (w.quality = r, Ff(w));
		});
		je(), i.querySelectorAll(".l10-flip-list").forEach((e) => e.addEventListener("keydown", (e) => {
			if (e._l10 || e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
			e.stopImmediatePropagation(), e.preventDefault();
			let t = new KeyboardEvent("keydown", {
				key: e.key === "ArrowUp" ? "ArrowDown" : "ArrowUp",
				bubbles: !0,
				cancelable: !0,
				composed: !0
			});
			t._l10 = !0, e.target.dispatchEvent(t);
		}, !0));
		let Ne = r(".l10-controls"), Pe = (e) => i.toggleAttribute("data-quiet", e), Fe = (e) => {
			if (!i.isConnected) return;
			let t = i.ownerDocument;
			if (e.currentTarget !== t) return;
			let n = t.activeElement;
			if (n && n !== t.body && !i.contains(n)) return;
			let r = e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "m" || e.key === "M";
			r && e.target.closest?.("media-time-slider, media-volume-slider, [role=\"menu\"]") || (r && (!Ne.hasAttribute("data-visible") || i.hasAttribute("data-quiet")) ? Pe(!0) : r || Pe(!1));
		};
		document.addEventListener("keydown", Fe, {
			capture: !0,
			signal: t.signal
		}), i.addEventListener("pointermove", () => Pe(!1)), i.addEventListener("pointerdown", () => Pe(!1)), new MutationObserver(() => {
			Ne.hasAttribute("data-visible") || Pe(!1);
		}).observe(Ne, {
			attributes: !0,
			attributeFilter: ["data-visible"]
		});
		let Ie = r(".l10-capset"), Le = () => {
			Ie.toggleAttribute("data-off", ![...a.textTracks || []].some(he));
		};
		a.textTracks?.addEventListener?.("addtrack", Le), a.textTracks?.addEventListener?.("removetrack", Le), Le(), a.addEventListener("loadedmetadata", Le), a.addEventListener("loadeddata", Le), a.textTracks?.addEventListener?.("change", Le);
		let Re = 0, ze = setInterval(() => {
			Le(), (++Re > 20 || !Ie.hasAttribute("data-off")) && clearInterval(ze);
		}, 750), Be = window.documentPictureInPicture, Ve = r(".l10-pip"), He = this, Ue = null, We = async () => {
			let e = i.getBoundingClientRect(), t = await Be.requestWindow({
				width: Math.max(400, Math.round(e.width * .55)),
				height: Math.max(225, Math.round(e.width * .55 * e.height / e.width))
			});
			Ue = t;
			let n = t.document, r = n.createElement("base");
			r.href = document.baseURI, n.head.append(r);
			for (let e of document.querySelectorAll("link[rel=\"stylesheet\"], style")) if (e.localName === "link") {
				let t = n.createElement("link");
				t.rel = "stylesheet", t.href = e.href, n.head.append(t);
			} else n.head.append(e.cloneNode(!0));
			n.title = document.title, n.body.className = "l10-pip-body";
			let o = document.createElement("div");
			o.className = "l10-pip-placeholder", o.style.aspectRatio = `${e.width} / ${e.height}`, o.innerHTML = "<span>Riding in picture-in-picture</span><button type=\"button\">Bring it back</button>", o.querySelector("button").addEventListener("click", () => t.close());
			let s = !a.paused;
			He.before(o), n.body.append(He), i.toggleAttribute("data-docpip", !0), s && a.paused && a.play().catch(() => {}), i.focus({ preventScroll: !0 }), n.addEventListener("keydown", Fe, !0), t.addEventListener("pagehide", () => {
				let e = !a.paused;
				i.toggleAttribute("data-docpip", !1), Ue = null, o.isConnected ? (o.replaceWith(He), e && a.paused && a.play().catch(() => {})) : (a.pause(), He.remove());
			}, { once: !0 });
		}, Ge = !1, Ke = () => {
			let e = a.ownerDocument;
			return e.pictureInPictureElement ? e.exitPictureInPicture().catch(() => {}) : (a.requestPictureInPicture || a.nativeEl?.requestPictureInPicture?.bind(a.nativeEl))?.call(a).catch(() => {});
		}, qe = () => {
			Ue ? Ue.close() : Ge || a.ownerDocument.pictureInPictureElement ? Ke() : We().catch(() => {
				Ge = !0, Ke();
			});
		};
		Be && (Ve.addEventListener("click", (e) => {
			e.stopImmediatePropagation(), e.preventDefault(), qe();
		}, !0), i.addEventListener("keydown", (e) => {
			e.key !== "i" && e.key !== "I" || e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, textarea") || (e.preventDefault(), qe());
		}));
		let F = (e) => {
			let t = a.shadowRoot?.querySelector("style[data-l10]");
			t?.sheet && (t.sheet.disabled = e), i.toggleAttribute("data-native-cues", e);
		};
		a.addEventListener("enterpictureinpicture", () => F(!0)), a.addEventListener("leavepictureinpicture", () => F(!1)), a.addEventListener("webkitpresentationmodechanged", () => F(a.webkitPresentationMode === "picture-in-picture"));
		let Je = () => matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 600, Ye = !1, Xe = () => {
			let e = i.ownerDocument, t = e.fullscreenElement || e.webkitFullscreenElement, n = !!(t && (t === i || t.contains(i) || i.contains(t))), r = screen.orientation;
			if (n && Je() && r?.lock) {
				let e = a.videoWidth || 16, t = a.videoHeight || 9;
				r.lock(e >= t ? "landscape" : "portrait").then(() => {
					Ye = !0;
				}).catch(() => {});
			} else if (!n && Ye) {
				Ye = !1;
				try {
					r?.unlock?.();
				} catch {}
			}
		};
		document.addEventListener("fullscreenchange", Xe, n), document.addEventListener("webkitfullscreenchange", Xe, n), i.querySelectorAll("media-tooltip.l10-tip-end").forEach((e) => {
			let t = i.querySelector(`#${CSS.escape(e.getAttribute("trigger"))}`);
			if (!t) return;
			let n = () => e.style.setProperty("--l10-anchor-w", `${t.offsetWidth}px`);
			t.addEventListener("pointerenter", n), t.addEventListener("focus", n);
		});
		let Ze = r(".l10-more"), Qe = (e, t) => {
			let n = i.querySelector(`[data-m="${e}"]`);
			n && (n.textContent = t);
		}, $e = r(".l10-cc"), et = () => [...a.textTracks || []].some((e) => he(e) && e.mode === "showing"), tt = () => i.querySelectorAll(".l10-moremenu media-menu-item").forEach((e) => {
			let t = e.hasAttribute("data-off") || !!e.closest(".l10-csview[hidden]") || getComputedStyle(e).display === "none" && !e.closest("media-menu-content[hidden]");
			e.toggleAttribute("data-hidden", t);
		}), nt = () => {
			let e = Math.floor(Ze.getBoundingClientRect().top - 12);
			r(".l10-moremenu").style.setProperty("--l10-more-room", `${Math.max(160, e)}px`);
			let t = i.querySelector(".l10-nextstop");
			Qe("l10-m-st", m[h]?.name || ""), Qe("l10-m-next", (t.getAttribute("aria-label") || "").replace(/^Next stop: /, "")), r(".l10-m-next").toggleAttribute("data-disabled", t.hasAttribute("data-last")), Qe("l10-m-svc", `${Ef[a.playbackRate] || "Custom"} · ${a.playbackRate}×`), Qe("l10-m-q", Ae), r(".l10-m-q").toggleAttribute("data-off", ve.hasAttribute("data-off")), Qe("l10-m-cc", et() ? "On" : "Off"), r(".l10-m-cc").toggleAttribute("data-off", Ie.hasAttribute("data-off")), r(".l10-m-cs").toggleAttribute("data-off", Ie.hasAttribute("data-off"));
			let n = !!(Ue || a.ownerDocument.pictureInPictureElement);
			r(".l10-m-pip-text").textContent = n ? "Exit picture-in-picture" : "Picture-in-picture", r(".l10-m-pip").toggleAttribute("data-off", !Be && !document.pictureInPictureEnabled), tt();
		}, rt = r(".l10-moremenu"), it = () => {
			let e = [...rt.children].find((e) => e.localName === "media-menu-content" && !e.hidden && !e.hasAttribute("data-child-open")), t = e ? e.scrollTop + e.clientHeight < e.scrollHeight - 2 : !1;
			rt.toggleAttribute("data-more-below", t);
		};
		rt.addEventListener("scroll", it, !0), rt.addEventListener("click", () => {
			setTimeout(it, 60), setTimeout(it, 360);
		}), rt.addEventListener("keydown", () => setTimeout(it, 60)), new MutationObserver(() => requestAnimationFrame(it)).observe(rt, {
			attributes: !0,
			subtree: !0,
			attributeFilter: [
				"data-open",
				"hidden",
				"data-show"
			]
		}), i.addEventListener("keydown", (e) => {
			e.key !== "s" && e.key !== "S" || e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, textarea, [role=\"menu\"]") || Ze.offsetParent && (e.preventDefault(), nt(), O("list"), Ze.focus(), Ze.click());
		}), Ze.addEventListener("pointerdown", nt), Ze.addEventListener("keydown", nt), Ze.addEventListener("click", nt), Ze.addEventListener("click", () => O("list")), r(".l10-m-cs").addEventListener("click", () => O("list"), !0), a.addEventListener("ratechange", nt), a.textTracks?.addEventListener?.("change", nt), a.addEventListener("timeupdate", () => {
			Ze.getAttribute("aria-expanded") === "true" && nt();
		});
		let at = () => setTimeout(() => {
			Ze.getAttribute("aria-expanded") === "true" && Ze.click();
		}, 120);
		r(".l10-moremenu").addEventListener("select", (e) => {
			e.target.closest(".l10-st-item") && at();
		}), r(".l10-moremenu").querySelectorAll("media-playback-rate-radio-group, media-quality-radio-group").forEach((e) => e.addEventListener("value-change", at)), r(".l10-m-next").addEventListener("select", () => b(1)), r(".l10-m-cc").addEventListener("select", () => {
			$e.click(), setTimeout(nt, 50);
		}), r(".l10-m-pip").addEventListener("select", () => {
			Be ? qe() : Ke();
		}), t.signal.addEventListener("abort", () => {
			clearInterval(P), clearInterval(ze), clearTimeout(D);
		}), ne();
		let ot = r(".l10-panel"), st = i.parentElement, ct = () => {
			let e = !1;
			try {
				e = i.matches(":fullscreen");
			} catch {
				try {
					e = i.matches(":-webkit-full-screen");
				} catch {}
			}
			let t = i.clientWidth, n = !this.getAttribute("ratio") && !e && !i.hasAttribute("data-docpip") && t > 0 && t <= Rf;
			n !== i.hasAttribute("data-dock") && i.toggleAttribute("data-dock", n), st.style.paddingBottom = n ? `${ot.offsetHeight}px` : "", st.style.setProperty("--l10-dock-h", n ? `${ot.offsetHeight}px` : "0px");
		};
		new ResizeObserver(() => {
			i.style.setProperty("--l10-panel-h", `${ot.offsetHeight}px`), ct();
		}).observe(ot), new ResizeObserver(ct).observe(i), new MutationObserver(ct).observe(i, {
			attributes: !0,
			attributeFilter: ["data-docpip"]
		}), document.addEventListener("fullscreenchange", ct, n), document.addEventListener("webkitfullscreenchange", ct, n), a.addEventListener("timeupdate", v), a.addEventListener("seeked", v), a.addEventListener("ended", v), r(".l10-endcard");
		let I = r(".l10-term-next"), lt = (e) => {
			let t = /^#?([0-9a-f]{6})$/i.exec((e || "").trim());
			if (!t) return "#14110a";
			let [n, r, i] = [
				0,
				2,
				4
			].map((e) => parseInt(t[1].slice(e, e + 2), 16) / 255).map((e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4);
			return .2126 * n + .7152 * r + .0722 * i > .32 ? "#14110a" : "#ffffff";
		};
		this.#t = () => {
			let e = this.getAttribute("next-title");
			if (I.hidden = !e, !e) return;
			let t = this.getAttribute("next-line") || "";
			r(".l10-term-next-name").textContent = e, r(".l10-term-badge").textContent = this.getAttribute("next-number") || "", I.style.setProperty("--l10-next", t || "var(--l10-line)"), I.style.setProperty("--l10-next-ink", t ? lt(t) : "var(--l10-line-ink)"), I.setAttribute("aria-label", `Change here for ${e}`);
		}, this.#t(), I.addEventListener("click", () => this.dispatchEvent(new CustomEvent("line10:next", { bubbles: !0 }))), r(".l10-term-again").addEventListener("click", () => {
			a.ended || (a.currentTime = 0), a.play().catch(() => {}), i.focus({ preventScroll: !0 });
		});
		let ut = !1, dt = 0;
		if (a.addEventListener("ended", () => {
			ut = !0;
		}), a.addEventListener("play", () => {
			ut && (dt = performance.now());
		}), a.addEventListener("playing", () => {
			ut = !1, dt = 0;
		}), a.addEventListener("pause", () => {
			if (!dt || performance.now() - dt > 4e3) return;
			dt = 0;
			let e = () => a.play().catch(() => {});
			a.seeking ? a.addEventListener("seeked", e, { once: !0 }) : e();
		}), this.hasAttribute("autoplay")) {
			let e = () => a.play().catch(() => {});
			a.readyState >= 2 ? e() : a.addEventListener("canplay", e, { once: !0 });
		}
		a.addEventListener("ratechange", C), a.addEventListener("loadedmetadata", _), a.addEventListener("durationchange", _);
		let ft = (e) => {
			e.kind === "chapters" && (e.mode === "disabled" && (e.mode = "hidden"), e.addEventListener("cuechange", _));
		};
		[...a.textTracks || []].forEach(ft), a.textTracks?.addEventListener?.("addtrack", (e) => {
			ft(e.track), setTimeout(_, 200);
		}), i.querySelectorAll("track[kind=\"chapters\"]").forEach((e) => e.addEventListener("load", _)), setTimeout(_, 400), v();
	}
};
customElements.get("line10-player") || customElements.define("line10-player", ep);
export { Ef as SERVICES };
