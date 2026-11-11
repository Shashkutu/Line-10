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
}, k = class extends Event {
	constructor(e, t) {
		super("context-provider", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t;
	}
}, A = class extends ce {
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
		this.host.dispatchEvent(new k(this.context, this.host));
	}
}, le = /* @__PURE__ */ new WeakSet(), j = class extends se {
	hostConnected() {
		ue(this.host.ownerDocument), super.hostConnected();
	}
};
function ue(e) {
	if (le.has(e)) return;
	le.add(e);
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
function M(e, t) {
	let n = { ...t };
	for (let r of Object.keys(t)) {
		let t = e[r];
		a(t) || (n[r] = t);
	}
	return n;
}
// node_modules/@videojs/utils/dist/function/noop.js
function de(...e) {}
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
	#i = de;
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
		this.#i(), this.#i = de, this.#r = void 0;
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
		if (n?.aborted) return de;
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
		this.#e = n ?? de, Ae(t) ? (this.#n = t, this.#t = null) : (this.#n = null, this.#t = new j(e, {
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
		this.#e = e, this.#t = n, this.#n = new j(e, {
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
function lt(e, t) {
	for (let [n, r] of Object.entries(t)) typeof r == "string" && e.style.setProperty(st(n), r);
}
function ut(e, t) {
	return [...t].map((t) => {
		let n = st(t);
		return {
			property: n,
			value: e.style.getPropertyValue(n),
			priority: e.style.getPropertyPriority(n)
		};
	});
}
function I(e, t) {
	for (let { property: n, value: r, priority: i } of t) r ? e.style.setProperty(n, r, i) : e.style.removeProperty(n);
}
function dt(e, t, n) {
	let r = ut(e, Object.keys(t));
	try {
		return lt(e, t), n();
	} finally {
		I(e, r);
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
	if (typeof ResizeObserver > "u") return de;
	let n = new ResizeObserver(t), r = Symbol.iterator in Object(e) ? e : [e];
	for (let e of r) n.observe(e);
	return () => n.disconnect();
}
function Tt({ getElements: e, onChange: t, root: n, mutations: r }) {
	let i = de, a = () => {
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
var L = {
	sideOffset: 0,
	boundaryOffset: 0
}, Dt = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function Ot(e, t, n, r) {
	let i = r.boundaryOffset ?? 0;
	switch (n) {
		case "top": return e.top - t.top - i - r.sideOffset;
		case "bottom": return t.bottom - e.bottom - i - r.sideOffset;
		case "left": return e.left - t.left - i - r.sideOffset;
		case "right": return t.right - e.right - i - r.sideOffset;
	}
}
function kt(e, t, n, r, i = L) {
	let a = r.side, o = Dt[a], s = a === "top" || a === "bottom" ? t.height : t.width, c = Ot(e, n, a, i);
	return c >= s ? a : Ot(e, n, o, i) > c ? o : a;
}
function At(e) {
	try {
		e?.showPopover?.();
	} catch {}
}
function jt(e) {
	try {
		e?.hidePopover?.();
	} catch {}
}
function Mt(e) {
	e instanceof Element && e.shadowRoot && Mt(e.shadowRoot);
	for (let t of e.querySelectorAll("*")) Nt(t) && jt(t), t.shadowRoot && Mt(t.shadowRoot);
}
function Nt(e) {
	try {
		return e.matches(":popover-open");
	} catch {
		return !1;
	}
}
// node_modules/@videojs/utils/dist/dom/raf-throttle.js
function Pt(e) {
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
function Ft(e) {
	for (let t of e.children) if (t.localName === "template" && "content" in t) return t;
	return null;
}
function It(e) {
	let t = e.content.firstElementChild;
	return t && !t.nextElementSibling ? t : null;
}
function Lt(e, t = e.ownerDocument) {
	return t.importNode(e, !0);
}
// node_modules/@videojs/utils/dist/dom/time-ranges.js
function Rt(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push([e.start(n), e.end(n)]);
	return t;
}
// node_modules/@videojs/utils/dist/dom/tree.js
function zt(e, t) {
	let n = t;
	for (; n;) {
		if (n === e || e.contains(n)) return !0;
		let t = n.getRootNode();
		n = n.assignedSlot ?? n.parentElement ?? (Ue(t) ? t.host : null);
	}
	return !1;
}
// node_modules/@videojs/element/dist/default/destroy-mixin.js
var Bt = /* @__PURE__ */ new WeakSet();
function Vt(e) {
	e.shadowRoot && Ht(e.shadowRoot), Ht(e);
}
function Ht(e) {
	for (let t of Array.from(e.children)) Bt.has(t) ? t.destroy() : Vt(t);
}
function Ut(e) {
	class t extends e {
		#e = !1;
		#t = /* @__PURE__ */ new Set();
		constructor(...e) {
			super(...e), Bt.add(this);
		}
		get destroyed() {
			return this.#e;
		}
		destroy() {
			this.#e || (this.#e = !0, Vt(this), this.destroyCallback());
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
var Wt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new Map(), Kt = globalThis.HTMLElement ?? class {}, qt = class extends Kt {
	static {
		this.properties = {};
	}
	static get observedAttributes() {
		return [...Jt(this).attrToProp.keys()];
	}
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor() {
		super(), this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#r = !1, this.isUpdatePending = !1, this.hasUpdated = !1, this.#i = new Promise((e) => this.enableUpdating = e);
		let { props: e } = Jt(this.constructor);
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
		let { props: r, attrToProp: i } = Jt(this.constructor), a = i.get(e);
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
		let { props: e } = Jt(this.constructor);
		for (let t of e.keys()) {
			let e = this.#n?.has(t) ?? !1, n = Object.hasOwn(this, t);
			if (!e && !n) continue;
			let r = e ? this.#n?.get(t) : Reflect.get(this, t);
			n && Reflect.deleteProperty(this, t), Reflect.set(this, t, r);
		}
		this.#n = void 0;
	}
};
function Jt(e) {
	let t = Wt.get(e);
	if (t) return t;
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let [t, i] of Object.entries(e.properties)) if (n.set(t, i), r.set(i.attribute ?? t, t), !Object.getOwnPropertyDescriptor(e.prototype, t)?.get) {
		let n = Gt.get(t);
		n || (n = Symbol(t), Gt.set(t, n)), Object.defineProperty(e.prototype, t, {
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
	return Wt.set(e, i), i;
}
// node_modules/@videojs/html/dist/default/ui/ui-element.js
var R = class extends Ut(qt) {};
// node_modules/@videojs/media/dist/default/core/predicate.js
function Yt(e) {
	return e.readyState >= re.HAVE_METADATA;
}
function Xt(e) {
	if (Number.isFinite(e.duration) && e.duration > 0) return e.duration;
	let t = e.seekable.at(-1)?.[1];
	return t === void 0 || !Number.isFinite(t) || t <= 0 ? 0 : t;
}
function Zt(e) {
	return Xt(e) > 0;
}
function Qt(e) {
	return !!e && !e.paused && !e.ended && !e.waiting;
}
function $t(e) {
	return S(e) && i(e.autoplay);
}
function en(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.paused) && !a(t.ended) && r(t.pause);
}
function tn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.currentTime) && !a(t.duration) && !a(t.seeking);
}
function nn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.src) && !a(t.currentSrc) && !a(t.readyState) && r(t.load);
}
function rn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.volume) && !a(t.muted);
}
function an(e) {
	return S(e) ? !a(e.muted) : !1;
}
function on(e) {
	return S(e) ? !a(e.playbackRate) : !1;
}
function sn(e) {
	return S(e) ? r(e.requestPictureInPicture) : !1;
}
function cn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.buffered) && t.buffered !== w && !a(t.seekable) && t.seekable !== w;
}
function ln(e) {
	return S(e) ? !a(e.error) : !1;
}
function un(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.textTracks) && t.textTracks !== _;
}
function dn(e) {
	return S(e) ? !a(e.videoRenditions) : !1;
}
function fn(e) {
	return S(e) ? !a(e.audioTracks) : !1;
}
function pn(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.videoWidth) && !a(t.videoHeight);
}
function mn(e) {
	if (!S(e)) return !1;
	let t = e;
	return S(t.remote) && t.remote !== ne;
}
function hn(e) {
	return S(e) ? !a(e.streamType) : !1;
}
function gn(e) {
	return S(e) ? !a(e.contentData) : !1;
}
function _n(e) {
	if (!S(e)) return !1;
	let t = e;
	return !a(t.liveEdgeStart) && !a(t.targetLiveWindow);
}
function vn(e) {
	return S(e) && "querySelectorAll" in e && r(e.querySelectorAll);
}
// node_modules/@videojs/core/dist/default/dom/extensions/media.js
function yn(e, t) {
	return new Proxy(e, {
		get(e, n) {
			if (n === x) return e;
			let i = bn(t, n) ?? e, a = i[n];
			return r(a) && n !== "constructor" ? a.bind(i) : a;
		},
		set(e, n, r) {
			let i = bn(t, n) ?? e;
			return Reflect.set(i, n, r);
		},
		has(e, n) {
			return !u(bn(t, n)) || n in e;
		}
	});
}
function bn(e, t) {
	if (Object.hasOwn(Object.prototype, t)) return null;
	for (let { mediaOverride: n } of e()) if (!u(n) && !a(n[t])) return n;
	return null;
}
// node_modules/@videojs/core/dist/default/dom/extensions/coordinator.js
function xn(e) {
	return !!e && "mediaOverride" in e;
}
var Sn = class {
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
		return n !== e && (n && this.#s(n), this.#e.set(t, e), e.connect?.(this.#n), this.#i && e.attach?.(this.#i), (xn(n) || xn(e)) && this.#r()), () => this.#o(e);
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
		return t || (t = yn(e, () => this.#e.values()), this.#t.set(e, t)), t;
	}
	#a() {
		for (let e of this.#e.values()) if (xn(e)) return !0;
		return !1;
	}
	#o(e) {
		let t = e.constructor;
		this.#e.get(t) === e && (this.#e.delete(t), this.#s(e), xn(e) && this.#r());
	}
	#s(e) {
		this.#i && e.detach?.(), e.disconnect?.();
	}
};
// node_modules/@videojs/core/dist/default/dom/feature.js
function z(e) {
	let t = Object.values(e.config ?? {}).map((e) => e.state);
	return {
		...e,
		...t.length > 0 ? { preserve: t } : {}
	};
}
function Cn(e) {
	let t = e.map((e) => e.config ?? {});
	return Object.assign({}, ...t);
}
function wn(e, t, n) {
	let r = e[t.action];
	if (typeof r != "function") throw TypeError(`Missing config action "${String(t.action)}"`);
	r(n);
}
// node_modules/@videojs/core/dist/default/dom/media-action-value.js
function Tn(e, t, n) {
	if (!a(n)) return n;
	let r = t?.toLowerCase();
	if (e === "seekStep") return r === "arrowleft" || r === "j" ? -10 : 10;
	if (e === "volumeStep") return r === "arrowdown" ? -.05 : 5 / 100;
}
// node_modules/@videojs/core/dist/default/dom/gesture/action-value.js
function En(e, t, n) {
	return e === "seekStep" && a(n) && t === "left" ? -10 : Tn(e, void 0, n);
}
// node_modules/@videojs/core/dist/default/dom/store/features/audio-track.js
function Dn(e, t) {
	return e.id || String(t);
}
function On(e, t) {
	return {
		id: Dn(e, t),
		...e.kind !== void 0 && { kind: e.kind },
		label: e.label,
		language: e.language,
		enabled: e.enabled
	};
}
var kn = z({
	name: "audioTrack",
	state: ({ target: e }) => ({
		audioTrackList: [],
		selectAudioTrack(t) {
			let { media: n } = e();
			if (!fn(n)) return;
			let r = [...n.audioTracks], i = r.find((e, n) => Dn(e, n) === t);
			if (i) for (let e of r) e.enabled = e === i;
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = null, a = null, o = () => fn(r) ? r.audioTracks : null, s = (e = o()) => {
			n({ audioTrackList: e ? [...e].map(On) : [] });
		}, c = () => {
			let e = o();
			e === i ? s(e) : (a?.abort(), a = new AbortController(), i = e, i && (h(i, "addtrack", () => s(i), { signal: a.signal }), h(i, "removetrack", () => s(i), { signal: a.signal }), h(i, "change", () => s(i), { signal: a.signal })), s(i));
		};
		c(), h(r, "loadstart", c, { signal: t }), t.addEventListener("abort", () => a?.abort(), { once: !0 });
	}
}), An = z({
	name: "buffer",
	state: () => ({
		buffered: [],
		seekable: []
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!cn(r)) return;
		let i = () => n({
			buffered: Rt(r.buffered),
			seekable: Rt(r.seekable)
		});
		i(), h(r, "loadedmetadata", i, { signal: t }), h(r, "durationchange", i, { signal: t }), h(r, "progress", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), jn = /* @__PURE__ */ new WeakMap();
function Mn(e) {
	jn.set(e, (jn.get(e) ?? 0) + 1);
	let t = !1;
	return () => {
		if (t) return;
		t = !0;
		let n = jn.get(e) ?? 0;
		n <= 1 ? jn.delete(e) : jn.set(e, n - 1);
	};
}
function Nn(e) {
	return (jn.get(e) ?? 0) > 0;
}
// node_modules/@videojs/core/dist/default/dom/gesture/region.js
function Pn(e, t, n) {
	let r = e - t.left, i = t.width;
	if (i === 0) return null;
	let a = r / i;
	return n.size === 2 && n.has("left") && n.has("right") ? a < .5 ? "left" : "right" : n.size === 3 ? a < 1 / 3 ? "left" : a < 2 / 3 ? "center" : "right" : n.has("left") && a < .5 ? "left" : n.has("right") && a >= .5 ? "right" : n.has("center") && (n.size === 1 || a >= 1 / 3 && a < 2 / 3) ? "center" : null;
}
// node_modules/@videojs/core/dist/default/dom/gesture/coordinator.js
var Fn = 250, In = class {
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
		return Nn(this.#e) ? !0 : !nt(e) && this.#t.some((n) => n.type === "tap" && n.action === t && (!n.pointer || n.pointer === e.pointerType));
	}
	add(e) {
		let t = En(e.action ?? "", e.region, e.value), n = {
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
			if (Nn(this.#e)) t = 0;
			else if (e.button === 0) {
				t = Date.now();
				for (let e of this.#t) e.onPointerDown?.();
			}
		}, { signal: e }), h(this.#e, "pointerup", (e) => {
			if (Nn(this.#e)) {
				t = 0;
				return;
			}
			if (e.button !== 0 || Date.now() - t > Fn || nt(e)) return;
			let n = e.pointerType, r = e.clientX, i = this.#e, a = this.#t, o = { resolve: (e) => Bn(a, e, n, r, i) };
			for (let t of this.#n) t.handleUp(o, e);
		}, { signal: e });
	}
	#o() {
		if (!(this.#t.length > 0)) {
			for (let e of this.#n) e.reset();
			this.#n.clear(), this.#r?.abort(), this.#r = null;
		}
	}
}, Ln = /* @__PURE__ */ new WeakMap();
function Rn(e) {
	return Ln.get(e);
}
function zn(e) {
	let t = Ln.get(e);
	return t || (t = new In(e), Ln.set(e, t)), t;
}
function Bn(e, t, n, r, i) {
	let a = i.getBoundingClientRect(), o = Vn(e, t, n), s = o.size > 0 ? Pn(r, a, o) : null, c = [];
	for (let r of e) if (!r.disabled && r.type === t && !(r.pointer && r.pointer !== n)) {
		if (r.region) {
			if (r.region !== s) continue;
		} else if (s !== null) continue;
		c.push(r);
	}
	return c;
}
function Vn(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let i of e) i.disabled || i.type === t && (i.pointer && i.pointer !== n || i.region && r.add(i.region));
	return r;
}
// node_modules/@videojs/core/dist/default/dom/presentation/remote-playback.js
function Hn(e) {
	let t = e;
	if (S(t.remote) && "state" in t.remote && "prompt" in t.remote) return t.remote;
}
function Un(e) {
	return Hn(e)?.state === "connected";
}
function Wn(e) {
	return Hn(e)?.state === "connecting";
}
async function Gn(e) {
	let t = Hn(e);
	if (!t) throw new DOMException("Remote playback not supported", "NotSupportedError");
	return t.prompt();
}
// node_modules/@videojs/core/dist/default/dom/store/features/controls.js
var Kn = 2e3, qn = 250, Jn = 500, Yn = 100, Xn = /* @__PURE__ */ new WeakMap(), Zn = z({
	name: "controls",
	state: ({ get: e, set: t }) => {
		let n = Qn(() => (t({ controlsVisible: !0 }), () => {}), (n) => {
			let r = n ?? !e().userActive;
			return t({
				userActive: r,
				controlsVisible: r
			}), r;
		});
		return Xn.set(n.requestControlsLock, n), {
			userActive: !0,
			controlsVisible: !0,
			requestControlsLock: n.requestControlsLock,
			toggleControls: n.toggleControls
		};
	},
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i, container: a } = e;
		if (!en(i) || C(a)) return;
		let o, s = 0, c = (e) => s > 0 || e || i.paused || Un(i) || Wn(i);
		function l() {
			clearTimeout(o), o = void 0;
		}
		function u() {
			l(), s > 0 || (o = setTimeout(f, Kn));
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
		let _ = Xn.get(n().requestControlsLock);
		_.setDelegates(p, m);
		let v = 0, y = 0, b = () => y > 0 && Date.now() - y < Jn, x = 0, S = () => x > 0 && Date.now() - x < Yn;
		function w(e) {
			v = Date.now(), e.pointerType === "touch" && (y = v);
		}
		function T(e) {
			if (e.pointerType === "touch" && (y = Date.now()), e.pointerType === "touch" && Date.now() - v < qn) {
				if (Rn(a)?.claimsTap(e, "toggleControls")) return;
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
		}, { signal: t }), h(i, "play", E, { signal: t }), h(i, "pause", E, { signal: t }), h(i, "ended", E, { signal: t }), mn(i)) {
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
function Qn(e, t) {
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
var $n = z({
	name: "error",
	state: ({ set: e }) => ({
		error: null,
		dismissError() {
			e({ error: null });
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		ln(r) && (h(r, "error", () => n({ error: r.error }), { signal: t }), h(r, "emptied", () => n({ error: null }), { signal: t }));
	}
});
// node_modules/@videojs/core/dist/default/dom/presentation/fullscreen.js
function er() {
	let e = document;
	if (e.fullscreenEnabled || e.webkitFullscreenEnabled) return !0;
	let t = document.createElement("video");
	return r(t.webkitSetPresentationMode);
}
function tr() {
	let e = document;
	return e.fullscreenElement ?? e.webkitFullscreenElement ?? null;
}
function nr(e) {
	if (!(e instanceof Element)) return !1;
	try {
		return e.matches(":fullscreen");
	} catch {
		return !1;
	}
}
function rr(e, t) {
	if (t.webkitPresentationMode === "fullscreen") return !0;
	let n = tr();
	return n && (n === e || n === g(t)) || nr(e) || nr(t) ? !0 : t.isFullscreen ?? !1;
}
async function ir(e, t) {
	let n = document;
	if (e && (n.fullscreenEnabled || n.webkitFullscreenEnabled)) {
		let t = e;
		if (Mt(e), r(t.requestFullscreen)) return t.requestFullscreen();
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
async function ar(e) {
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
function or() {
	if (document.pictureInPictureEnabled) {
		let e = /.*Version\/.*Safari\/.*/.test(navigator.userAgent), t = typeof matchMedia == "function" && matchMedia("(display-mode: standalone)").matches;
		return !e || !t;
	}
	let e = document.createElement("video");
	return r(e.webkitSetPresentationMode);
}
function sr(e) {
	return r(e.webkitSetPresentationMode) ? !0 : sn(e);
}
function cr(e) {
	return e.webkitPresentationMode === "picture-in-picture" || document.pictureInPictureElement === g(e) ? !0 : e.isPictureInPicture ?? !1;
}
async function lr(e) {
	let t = e;
	if (r(t.webkitSetPresentationMode)) {
		t.webkitSetPresentationMode("picture-in-picture");
		return;
	}
	let n = e;
	if (r(n.requestPictureInPicture)) return n.requestPictureInPicture();
}
async function ur(e) {
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
var dr = z({
	name: "fullscreen",
	state: ({ target: e }) => ({
		isFullscreen: !1,
		fullscreenAvailability: "unavailable",
		async requestFullscreen() {
			let { media: t, container: n } = e();
			return cr(t) && await ur(t), ir(n, t);
		},
		async exitFullscreen() {
			let { media: t } = e();
			return ar(t);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r, container: i } = e;
		n({ fullscreenAvailability: er() ? "available" : "unsupported" });
		let a = () => n({ isFullscreen: rr(i, r) });
		a(), h(document, "fullscreenchange", a, { signal: t }), h(document, "webkitfullscreenchange", a, { signal: t }), "webkitPresentationMode" in r && h(r, "webkitpresentationmodechanged", a, { signal: t });
	}
}), fr = z({
	name: "live",
	state: () => ({
		liveEdgeStart: NaN,
		targetLiveWindow: NaN
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!_n(r)) return;
		let i = () => n({
			liveEdgeStart: r.liveEdgeStart,
			targetLiveWindow: r.targetLiveWindow
		});
		i(), h(r, "targetlivewindowchange", i, { signal: t }), h(r, "streamtypechange", i, { signal: t }), h(r, "loadedmetadata", i, { signal: t }), h(r, "canplay", i, { signal: t }), h(r, "progress", i, { signal: t }), h(r, "durationchange", i, { signal: t }), h(r, "timeupdate", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), pr = Symbol("@videojs/media-title"), mr = Symbol("@videojs/user-title"), hr = Symbol("@videojs/set-user-title"), gr = "", _r = Symbol("@videojs/media-poster"), vr = Symbol("@videojs/user-poster"), yr = Symbol("@videojs/set-user-poster"), br = "", xr = z({
	name: "metadata",
	config: {
		title: {
			action: hr,
			state: mr,
			html: { attribute: "content-title" }
		},
		poster: {
			action: yr,
			state: vr
		}
	},
	state: ({ set: e }) => ({
		[pr]: void 0,
		[mr]: void 0,
		[hr]: (t) => e({ [mr]: t }),
		[_r]: void 0,
		[vr]: void 0,
		[yr]: (t) => e({ [vr]: t })
	}),
	derived: {
		title: ({ get: e }) => e()[mr] ?? e()[pr] ?? gr,
		poster: ({ get: e }) => e()[vr] ?? e()[_r] ?? br
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = () => {
			let e = gn(r) ? r.contentData : void 0;
			n({
				[pr]: e?.title,
				[_r]: e?.poster
			});
		}, a = () => {
			i(), gn(r) && h(r, "contentdatachange", i, { signal: t });
		};
		a(), h(r, "loadstart", a, { signal: t });
	}
}), Sr = z({
	name: "pip",
	state: ({ target: e }) => ({
		isPictureInPicture: !1,
		pictureInPictureAvailability: "unavailable",
		async requestPictureInPicture() {
			let { media: t, container: n } = e();
			if (sr(t)) {
				if (!nn(t) || !Yt(t)) throw new DOMException("The media has no video data yet.", "InvalidStateError");
				return rr(n, t) && await ar(t), lr(t);
			}
		},
		async exitPictureInPicture() {
			let { media: t } = e();
			return ur(t);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = or() && sr(r), a = () => n({
			isPictureInPicture: cr(r),
			pictureInPictureAvailability: i ? nn(r) && Yt(r) ? "available" : "unavailable" : "unsupported"
		});
		a(), h(r, "enterpictureinpicture", a, { signal: t }), h(r, "leavepictureinpicture", a, { signal: t }), h(r, "loadstart", a, { signal: t }), h(r, "loadedmetadata", a, { signal: t }), h(r, "emptied", a, { signal: t }), "webkitPresentationMode" in r && h(r, "webkitpresentationmodechanged", a, { signal: t });
	}
}), Cr = z({
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
			return en(n) && !n.paused && t({
				paused: !1,
				ended: !1,
				started: !0
			}), r;
		},
		pause() {
			let { media: n } = e();
			en(n) && (n.pause(), t({
				paused: n.paused,
				autoplaying: !1
			}));
		}
	}),
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i } = e;
		if (!en(i) || !tn(i) || !nn(i)) return;
		let a = () => $t(i) && i.autoplay, o, s = () => {
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
}), wr = {
	min: .0625,
	max: 16
};
function Tr(e) {
	return e?.playbackRateRange ?? wr;
}
function Er(e) {
	let t = d(e) ? e.trim().split(/\s+/).map(Number) : e ?? [], n = [...new Set(t.filter((e) => Number.isFinite(e) && e > 0))];
	return n.length > 0 ? n : void 0;
}
function Dr(e, t) {
	if (e.includes(t)) return e;
	let n = e.findIndex((e) => e > t);
	return n === -1 ? [...e, t] : [
		...e.slice(0, n),
		t,
		...e.slice(n)
	];
}
function Or(e, { min: t, max: n }) {
	return e.filter((e) => e >= t && e <= n);
}
function kr(e) {
	return Math.round(e * 1e5) / 1e5;
}
// node_modules/@videojs/utils/dist/number/number.js
function B(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Ar(e, t, n) {
	let r = n - t;
	return !Number.isFinite(r) || r <= 0 ? 0 : B((e - t) / r * 100, 0, 100);
}
function jr(e, t, n) {
	let r = Math.round((e - n) / t) * t + n, i = `${t}`.indexOf(".");
	return i === -1 ? r : Number(r.toFixed(`${t}`.length - i - 1));
}
// node_modules/@videojs/core/dist/default/dom/store/features/playback-rate.js
var Mr = [
	.5,
	.75,
	1,
	1.25,
	1.5,
	1.75,
	2
], Nr = Symbol("@videojs/default-playback-rates"), Pr = Symbol("@videojs/set-default-playback-rates"), Fr = Symbol("@videojs/playback-rate-range");
function Ir(e, t) {
	let n = Or(e, t);
	if (n.length > 0) return n;
	let r = Or(Mr, t);
	return r.length > 0 ? r : [B(1, t.min, t.max)];
}
var Lr = z({
	name: "playbackRate",
	config: { defaultPlaybackRates: {
		action: Pr,
		state: Nr
	} },
	state: ({ target: e, get: t, set: n }) => ({
		[Nr]: Mr,
		[Pr]: (e) => {
			let t = Er(e) ?? Mr;
			n({ [Nr]: t });
		},
		[Fr]: wr,
		playbackRate: 1,
		playbackRateAvailability: "unavailable",
		setPlaybackRate(t) {
			let { media: n } = e();
			if (!on(n)) return;
			let { min: r, max: i } = Tr(n);
			n.playbackRate = B(t, r, i);
		}
	}),
	derived: { playbackRates: ({ get: e }) => Ir(e()[Nr], e()[Fr]) },
	attach({ target: e, signal: t, get: n, set: r }) {
		let { media: i } = e, a = () => {
			let e = Tr(i), t = n()[Fr];
			(e.min !== t.min || e.max !== t.max) && r({ [Fr]: e });
		};
		if (a(), h(i, "loadstart", a, { signal: t }), !on(i)) {
			r({
				playbackRate: 1,
				playbackRateAvailability: "unsupported"
			});
			return;
		}
		let o = () => r({ playbackRate: kr(i.playbackRate) });
		r({ playbackRateAvailability: "available" }), o(), h(i, "ratechange", o, { signal: t });
	}
}), Rr = "auto";
function zr(e, t) {
	return e.id || String(t);
}
function Br(e, t) {
	return {
		id: zr(e, t),
		...e.width !== void 0 && { width: e.width },
		...e.height !== void 0 && { height: e.height },
		...e.bitrate !== void 0 && { bitrate: e.bitrate },
		...e.frameRate !== void 0 && { frameRate: e.frameRate },
		...e.codec !== void 0 && { codec: e.codec },
		selected: e.selected
	};
}
function Vr(e) {
	return e.width && e.height ? Math.min(e.width, e.height) : e.height ?? e.width;
}
var Hr = z({
	name: "quality",
	state: ({ target: e }) => ({
		videoRenditionList: [],
		activeVideoRendition: null,
		selectVideoRendition(t) {
			let { media: n } = e();
			if (!dn(n)) return;
			if (t === Rr) {
				n.videoRenditions.selectedIndex = -1;
				return;
			}
			let r = [...n.videoRenditions].findIndex((e, n) => zr(e, n) === t);
			r !== -1 && (n.videoRenditions.selectedIndex = r);
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = null, a = null, o = () => dn(r) ? r.videoRenditions : null, s = (e) => {
			if (!e) return null;
			let t = [...e], n = t.find((e) => e.active);
			if (n) return n;
			if (!pn(r) || !r.videoWidth && !r.videoHeight) return null;
			let i = Vr({
				width: r.videoWidth || void 0,
				height: r.videoHeight || void 0
			}), a = t.filter((e) => Vr(e) === i);
			return a.length === 1 ? a[0] : null;
		}, c = (e = o()) => {
			let t = e ? [...e] : [], r = s(e);
			n({
				videoRenditionList: t.map(Br),
				activeVideoRendition: r ? Br(r, t.indexOf(r)) : null
			});
		}, l = () => {
			let e = o();
			e === i ? c(e) : (a?.abort(), a = new AbortController(), i = e, i && (h(i, "addrendition", () => c(i), { signal: a.signal }), h(i, "removerendition", () => c(i), { signal: a.signal }), h(i, "change", () => c(i), { signal: a.signal }), h(i, "activechange", () => c(i), { signal: a.signal })), c(i));
		};
		l(), h(r, "loadstart", l, { signal: t }), h(r, "resize", () => c(i), { signal: t }), t.addEventListener("abort", () => a?.abort(), { once: !0 });
	}
}), Ur = z({
	name: "remotePlayback",
	state: ({ target: e }) => ({
		remotePlaybackState: "disconnected",
		remotePlaybackAvailability: "unsupported",
		async promptRemotePlayback() {
			let { media: t, container: n } = e();
			return Un(t) ? Gn(t) : (rr(n, t) && await ar(t), await Gn(t));
		}
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!mn(r)) return;
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
			r.remote?.cancelWatchAvailability?.()?.catch(de);
		});
	}
}), Wr = z({
	name: "source",
	state: () => ({
		currentSrc: "",
		canPlay: !1
	}),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!nn(r)) return;
		let i = () => n({
			currentSrc: r.currentSrc,
			canPlay: r.readyState >= re.HAVE_FUTURE_DATA
		});
		i(), h(r, "canplay", i, { signal: t }), h(r, "canplaythrough", i, { signal: t }), h(r, "loadstart", i, { signal: t }), h(r, "emptied", i, { signal: t });
	}
}), Gr = z({
	name: "streamType",
	state: () => ({ streamType: E.UNKNOWN }),
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (hn(r)) {
			let e = () => n({ streamType: r.streamType });
			e(), h(r, "streamtypechange", e, { signal: t });
			return;
		}
		if (!tn(r)) return;
		let i = () => {
			let { duration: e } = r;
			return e === Infinity ? E.LIVE : Number.isFinite(e) && e > 0 ? E.ON_DEMAND : E.UNKNOWN;
		}, a = () => n({ streamType: i() });
		a(), h(r, "durationchange", a, { signal: t }), h(r, "loadedmetadata", a, { signal: t }), h(r, "emptied", a, { signal: t }), cn(r) && h(r, "progress", a, { signal: t });
	}
}), Kr = Symbol.for("@videojs/i18n-registry");
function qr() {
	let e = globalThis, t = e[Kr];
	if (t) return t;
	let n = {
		layers: /* @__PURE__ */ new Map(),
		subscribers: /* @__PURE__ */ new Set()
	};
	return e[Kr] = n, n;
}
function Jr(e) {
	return e.trim().replaceAll("_", "-").toLowerCase();
}
function Yr(e) {
	let t = e.indexOf("-x-"), n = (t === -1 ? e : e.slice(0, t)).indexOf("-u-");
	return n === -1 ? e : e.slice(0, n) + (t === -1 ? "" : e.slice(t));
}
function Xr(e) {
	if (e[0] !== "zh") return;
	let t = e.find((e) => e === "hant" || e === "hans");
	return t === "hant" ? "zh-tw" : t === "hans" ? "zh-cn" : void 0;
}
function Zr(e) {
	return Yr(Jr(e));
}
function Qr(e) {
	let t = Zr(e);
	if (!t) return ["en"];
	let n = t.split("-").filter(Boolean), r = [];
	for (let e = n.length; e >= 1; e--) r.push(n.slice(0, e).join("-"));
	let i = Xr(n), a = r.indexOf("zh");
	i && a !== -1 && r.splice(a, 0, i);
	let o = [], s = /* @__PURE__ */ new Set();
	for (let e of r) s.has(e) || (s.add(e), o.push(e));
	return s.has("en") || o.push("en"), o;
}
function $r(e) {
	let { layers: t } = qr(), n = {};
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r], a = t.get(i);
		a && Object.assign(n, a);
	}
	return n;
}
function ei(e) {
	return $r(Qr(e));
}
function ti(e) {
	let { subscribers: t } = qr();
	return t.add(e), () => {
		t.delete(e);
	};
}
// node_modules/@videojs/core/dist/default/core/i18n/resolve-text.js
function ni(e) {
	return typeof e == "string" ? e : e.text;
}
// node_modules/@videojs/core/dist/default/core/i18n/text.js
function ri(e) {
	return S(e) && "key" in e && "text" in e;
}
// node_modules/@videojs/core/dist/default/core/i18n/utils/interpolate.js
var ii = /\{([^{}]+)\}/g;
function ai(e, t) {
	return t ? e.replace(ii, (e, n) => Object.hasOwn(t, n) ? String(t[n]) : e) : e;
}
// node_modules/@videojs/core/dist/default/core/i18n/translate-text.js
function V(e, t, n) {
	return typeof e == "string" ? e : typeof t == "function" ? t(e, n) : ai(ni(e), t ?? n);
}
// node_modules/@videojs/core/dist/default/core/i18n/translator.js
function oi(e, t) {
	return (t, n) => {
		let r = n, i = typeof t != "string", a = i ? t.key : t, o = e[a], s = r?.default, c = r ? { ...r } : void 0;
		return c && delete c.default, ai(o ?? (i ? t.text : s) ?? String(a), c);
	};
}
// node_modules/@videojs/core/dist/default/dom/store/text-cues.js
function si(e, t) {
	if (!e) return [];
	let n = Number.isFinite(t) && t > 0 ? t : Infinity;
	return Array.from(e, (e) => ({
		startTime: e.startTime,
		endTime: Math.min(e.endTime, n),
		text: e.text ?? ""
	}));
}
// node_modules/@videojs/core/dist/default/dom/store/features/text-track.js
function ci(e, t) {
	return e.id || `track:${t}:${e.kind}:${e.language}:${e.label}`;
}
function li(e) {
	return y(Array.from(e.textTracks, (e, t) => ({
		id: ci(e, t),
		kind: e.kind,
		track: e
	})));
}
function ui(e, t) {
	for (let { track: n } of e) {
		let e = n === t ? "showing" : "disabled";
		n.mode !== e && (n.mode = e);
	}
}
function di(e, t) {
	let n = Zr(t), r = Qr(t);
	n !== "en" && !n.startsWith("en-") && r.pop();
	for (let t of r) {
		let n = e.find(({ track: e }) => Zr(e.language) === t);
		if (n) return n;
		let r = e.find(({ track: e }) => Zr(e.language).startsWith(`${t}-`));
		if (r) return r;
	}
}
var fi = z({
	name: "textTrack",
	state: ({ target: e }) => {
		let t = null;
		return {
			textTrackList: [],
			subtitlesShowing: !1,
			toggleSubtitles(n) {
				let { media: r } = e();
				if (!un(r)) return !1;
				let i = li(r);
				if (!i.length) return !1;
				let a = i.find(({ track: e }) => e.mode === "showing"), o = n ?? !a;
				if (a && (t = a.id), !o) return ui(i, null), !1;
				let s = a ?? i.find(({ id: e }) => e === t) ?? di(i, globalThis.navigator?.language ?? "") ?? i[0];
				return t = s.id, ui(i, s.track), !0;
			},
			selectSubtitlesTrack(n) {
				let { media: r } = e();
				if (!un(r)) return;
				let i = li(r);
				if (!i.length) return;
				if (C(n)) {
					let e = i.find(({ track: e }) => e.mode === "showing");
					e && (t = e.id), ui(i, null);
					return;
				}
				let a = i.find((e) => e.id === n);
				a && (t = a.id, ui(i, a.track));
			},
			chaptersCues: [],
			thumbnailsTrack: null
		};
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e;
		if (!un(r)) return;
		let i = null, a = () => {
			i?.abort(), i = new AbortController();
			let e = null, t = null, o = [], s = !1;
			for (let n = 0; n < r.textTracks.length; n++) {
				let i = r.textTracks[n];
				!e && i.kind === "chapters" && (e = i), !t && i.kind === "metadata" && i.label === "thumbnails" && (t = i), o.push({
					id: ci(i, n),
					kind: i.kind,
					label: i.label,
					language: i.language,
					mode: i.mode
				}), ee(i) && i.mode === "showing" && (s = !0);
			}
			let c = si(e?.cues, tn(r) ? r.duration : NaN), l = null;
			t && (l = {
				cues: t.cues ? Array.from(t.cues) : [],
				src: v(r, t)?.src ?? null,
				crossOrigin: nn(r) ? te(r.crossOrigin) : null
			});
			let u = vn(r) && r.querySelectorAll("track") || [], d = r instanceof HTMLElement && r.shadowRoot?.querySelectorAll("track") || [];
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
}), pi = { seek: Symbol.for("@videojs/seek") }, mi = z({
	name: "time",
	state: ({ target: e, signals: t, set: n }) => ({
		currentTime: 0,
		duration: 0,
		seeking: !1,
		async seek(r) {
			let { media: i } = e(), a = t.supersede(pi.seek);
			if (!tn(i) || !nn(i)) return 0;
			if (h(i, "emptied", () => t.supersede(pi.seek), {
				signal: a,
				once: !0
			}), !Yt(i) && !await Ve(i, "loadedmetadata", { signal: a }).catch(() => !1)) return i.currentTime;
			let o = Math.max(0, Math.min(r, i.duration || Infinity));
			return n({
				currentTime: o,
				seeking: !0
			}), i.currentTime = o, await Ve(i, "seeked", { signal: a }).catch(de), i.currentTime;
		}
	}),
	attach({ target: e, signal: t, set: n, get: r }) {
		let { media: i } = e;
		if (!tn(i)) return;
		let a = () => {
			let { duration: e } = i;
			if (e === Infinity && cn(i)) {
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
			if (!en(i) || i.paused || i.ended) {
				l();
				return;
			}
			let e = r(), t = i.currentTime;
			!e.seeking && t !== e.currentTime && n({ currentTime: t }), c = Pe(u);
		}, d = () => {
			!c && en(i) && !i.paused && !i.ended && (c = Pe(u));
		}, f = () => {
			l(), s();
		};
		o(), d(), t.addEventListener("abort", l, { once: !0 }), h(i, "play", d, { signal: t }), h(i, "playing", d, { signal: t }), h(i, "pause", f, { signal: t }), h(i, "ended", f, { signal: t }), h(i, "timeupdate", () => {
			(!c || document.hidden) && s();
		}, { signal: t }), h(i, "durationchange", o, { signal: t }), h(i, "seeking", o, { signal: t }), h(i, "seeked", o, { signal: t }), h(i, "loadedmetadata", o, { signal: t }), h(i, "emptied", () => {
			l(), o();
		}, { signal: t }), h(i, "progress", s, { signal: t });
	}
}), hi = .25, gi = z({
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
				if (!rn(i)) return 0;
				let a = Math.max(0, Math.min(1, t));
				return a > 0 && i.muted && (i.muted = !1), r() || (i.volume = a), n({
					volume: i.volume,
					muted: i.muted
				}), i.volume;
			},
			setMuted(t) {
				let { media: i } = e();
				if (!an(i)) return !1;
				i.muted = t;
				let a = rn(i);
				return !t && a && !r() && i.volume === 0 && (i.volume = hi), n({
					volume: a ? i.volume : 1,
					muted: i.muted
				}), i.muted;
			}
		};
	},
	attach({ target: e, signal: t, set: n }) {
		let { media: r } = e, i = rn(r), a = an(r);
		if (!i && !a) return;
		n({
			volumeAvailability: i ? _i() : "unavailable",
			mutedAvailability: a ? "available" : "unavailable"
		});
		let o = () => n({
			volume: i ? r.volume : 1,
			muted: a ? r.muted : !1
		});
		o(), h(r, "volumechange", o, { signal: t });
	}
});
function _i() {
	let e = document.createElement("video");
	try {
		return e.volume = .5, e.volume === .5 ? "available" : "unsupported";
	} catch {
		return "unsupported";
	}
}
// node_modules/@videojs/store/dist/default/core/combine.js
function vi(...e) {
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
var yi = {
	target: _e,
	signals: new he(),
	get: _e,
	set: _e
};
function H(e) {
	let t = e.state(yi), r = [...Object.keys(t), ...Object.keys(e.derived ?? {})], i = r[0];
	return Object.assign(i ? (e) => {
		if (i in e) return n(e, r);
	} : () => void 0, { displayName: e.name });
}
H(kn);
var bi = H(An), xi = H(Zn), Si = H($n), Ci = H(dr);
H(fr);
var wi = H(xr), Ti = H(Sr), Ei = H(Cr), Di = H(Lr), Oi = H(Hr);
H(Ur), H(Wr), H(Gr);
var ki = H(fi), Ai = H(mi), ji = H(gi);
// node_modules/@videojs/core/dist/default/dom/media-actions.js
function Mi(e) {
	l(e) && e.catch(de);
}
var U = {
	togglePaused({ store: e, state: t = e.state }) {
		let n = Ei(t);
		n && Mi(n.paused && !n.autoplaying ? n.play() : n.pause());
	},
	toggleMuted({ store: e }) {
		let t = ji(e.state);
		t && t.setMuted(!(t.muted || t.volume === 0));
	},
	toggleFullscreen({ store: e }) {
		let t = Ci(e.state);
		t && Mi(t.isFullscreen ? t.exitFullscreen() : t.requestFullscreen());
	},
	togglePictureInPicture({ store: e }) {
		let t = Ti(e.state);
		t && Mi(t.isPictureInPicture ? t.exitPictureInPicture() : t.requestPictureInPicture());
	},
	seekStep({ store: e, value: t, key: n }) {
		let r = Tn("seekStep", n, t), i = Ai(e.state);
		i && i.seek(i.currentTime + r);
	},
	volumeStep({ store: e, value: t, key: n }) {
		let r = Tn("volumeStep", n, t), i = ji(e.state);
		i && i.setVolume(i.volume + r);
	},
	speedUp({ store: e, value: t }) {
		let n = Di(e.state);
		if (!n) return;
		if (!a(t)) {
			n.setPlaybackRate(kr(n.playbackRate + t));
			return;
		}
		let { playbackRates: r, playbackRate: i } = n, o = r.filter((e) => e > i);
		o.length !== 0 && n.setPlaybackRate(Math.min(...o));
	},
	speedDown({ store: e, value: t }) {
		let n = Di(e.state);
		if (!n) return;
		if (!a(t)) {
			n.setPlaybackRate(kr(n.playbackRate - t));
			return;
		}
		let { playbackRates: r, playbackRate: i } = n, o = r.filter((e) => e < i);
		o.length !== 0 && n.setPlaybackRate(Math.max(...o));
	}
}, Ni = {
	togglePaused: U.togglePaused,
	toggleMuted: U.toggleMuted,
	toggleFullscreen: U.toggleFullscreen,
	togglePictureInPicture: U.togglePictureInPicture,
	seekStep: U.seekStep,
	volumeStep: U.volumeStep,
	speedUp: U.speedUp,
	speedDown: U.speedDown
};
function Pi(e) {
	return Ni[e] || (({ store: t }) => {
		let n = t.state[e];
		r(n) && Mi(n());
	});
}
// node_modules/@videojs/core/dist/default/dom/gesture/tap.js
var Fi = 200, Ii = class {
	#e = 0;
	#t = null;
	handleUp(e, t) {
		if (e.resolve("doubletap").length > 0) {
			let n = Date.now();
			if (n - this.#e < Fi) {
				this.#n(), this.#e = 0, e.resolve("doubletap")[0]?.onActivate(t);
				return;
			}
			this.#e = n, this.#n(), this.#t = setTimeout(() => {
				this.#t = null, this.#e = 0, e.resolve("tap")[0]?.onActivate(t);
			}, Fi);
		} else e.resolve("tap")[0]?.onActivate(t);
	}
	#n() {
		this.#t !== null && (clearTimeout(this.#t), this.#t = null);
	}
	reset() {
		this.#n(), this.#e = 0;
	}
}, Li = /* @__PURE__ */ new WeakMap();
function Ri(e) {
	let t = Li.get(e);
	return t || (t = new Ii(), Li.set(e, t), t);
}
function zi(e, t, n) {
	return zn(e).add({
		type: "tap",
		recognizer: Ri(e),
		onActivate: t,
		onPointerDown: n?.onPointerDown,
		pointer: n?.pointer,
		region: n?.region,
		disabled: n?.disabled,
		action: n?.action,
		value: n?.value
	});
}
function Bi(e, t, n) {
	return zn(e).add({
		type: "doubletap",
		recognizer: Ri(e),
		onActivate: t,
		pointer: n?.pointer,
		region: n?.region,
		disabled: n?.disabled,
		action: n?.action,
		value: n?.value
	});
}
// node_modules/@videojs/core/dist/default/dom/hotkey/actions.js
function Vi(e) {
	return e.startsWith("toggle");
}
var Hi = {
	togglePaused: U.togglePaused,
	toggleMuted: U.toggleMuted,
	toggleFullscreen: U.toggleFullscreen,
	toggleSubtitles({ store: e }) {
		ki(e.state)?.toggleSubtitles();
	},
	togglePictureInPicture: U.togglePictureInPicture,
	seekStep: U.seekStep,
	volumeStep: U.volumeStep,
	speedUp: U.speedUp,
	speedDown: U.speedDown,
	seekToPercent({ store: e, value: t, key: n }) {
		let r = Ai(e.state);
		if (!r) return;
		let i = bi(e.state), o = Xt({
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
function Ui(e) {
	return Hi[e];
}
// node_modules/@videojs/core/dist/default/dom/hotkey/aria.js
var Wi = {
	shift: "Shift",
	ctrl: "Control",
	alt: "Alt",
	meta: "Meta"
}, Gi = {
	shift: "Shift",
	ctrl: "Ctrl",
	alt: "Alt",
	meta: "Meta"
}, Ki = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
function qi(e) {
	return e.map((e) => {
		let t = [];
		for (let n of Ki) e.modifiers.has(n) && t.push(Wi[n]);
		return t.push(e.originalKey), t.join("+");
	}).join(" ");
}
function Ji(e) {
	let t = [];
	for (let n of Ki) e.modifiers.has(n) && t.push(Gi[n]);
	return t.push(Yi(e.originalKey)), t.join("+");
}
function Yi(e) {
	return e.length === 1 ? e.toUpperCase() : e;
}
// node_modules/@videojs/core/dist/default/dom/hotkey/coordinator.js
var Xi = class {
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
			parsed: Qi(e.keys),
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
			aria: qi(r),
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
		if (Nn(this.#e) || e.key === "Unidentified" || at(e) || e.defaultPrevented) return;
		let t = tt(e);
		for (let n of this.#t) {
			let { options: r, parsed: i } = n;
			if (!r.disabled && !(e.repeat && r.repeatable === !1) && r.target === "document" == (e.currentTarget === document)) {
				for (let n of i) if (ea(n, e) && !(t && n.modifiers.size === 0)) {
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
		return e.options.keys === "0-9" ? e.options.keys : Ji(e.parsed[0]);
	}
	#h() {
		for (let e of this.#o) e();
	}
}, Zi = /* @__PURE__ */ new Set([
	"shift",
	"ctrl",
	"alt",
	"meta"
]);
function Qi(e) {
	if (e === "0-9") return Array.from({ length: 10 }, (e, t) => ({
		modifiers: /* @__PURE__ */ new Set(),
		key: String(t),
		originalKey: String(t)
	}));
	let t = e.split("+"), n = t.pop(), r = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = e.toLowerCase();
		t === "mod" ? r.add(Et() ? "meta" : "ctrl") : Zi.has(t) && r.add(t);
	}
	return [{
		modifiers: r,
		key: n === "Space" ? " " : n.toLowerCase(),
		originalKey: n
	}];
}
function $i(e) {
	return e.length === 1 && !/[a-z]/i.test(e);
}
function ea(e, t) {
	if (t.key === "Unidentified" || t.key.toLowerCase() !== e.key) return !1;
	let n = $i(t.key), r = n ? t.shiftKey && e.modifiers.has("shift") : t.shiftKey, i = n ? t.altKey && e.modifiers.has("alt") : t.altKey;
	return r === e.modifiers.has("shift") && t.ctrlKey === e.modifiers.has("ctrl") && i === e.modifiers.has("alt") && t.metaKey === e.modifiers.has("meta");
}
var ta = /* @__PURE__ */ new WeakMap();
function na(e) {
	let t = ta.get(e);
	return t || (t = new Xi(e), ta.set(e, t)), t;
}
function ra(e, t) {
	let n = na(e), r = Qi(t.keys)[0]?.originalKey;
	return n.add({
		...t,
		value: Tn(t.action ?? "", r, t.value)
	});
}
// node_modules/@videojs/core/dist/default/dom/hotkey/hotkey-events.js
var ia = "hotkey-shortcut-change", aa = [
	Cr,
	Lr,
	Hr,
	kn,
	gi,
	mi,
	Wr,
	An,
	dr,
	Sr,
	Ur,
	Zn,
	fi,
	$n,
	xr
];
// node_modules/@videojs/core/dist/default/dom/ui/button.js
function oa(e) {
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
var sa = "group";
function ca(e) {
	e.hasAttribute("role") || e.setAttribute("role", sa), e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0");
}
function la(e) {
	let t = F(e.ownerDocument);
	t && t !== e.ownerDocument.body && zt(e, t) || e.focus({ preventScroll: !0 });
}
// node_modules/@videojs/core/dist/default/dom/ui/dismiss-layer.js
function ua(e) {
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
function da(e) {
	let t = null, n = null, r = null, i = null, a = null, o = null, s = 0, c = /* @__PURE__ */ new Map(), l = N({ documentModal: !0 }), u = ua({
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
			let t = F(), i = a && t instanceof Element && !zt(a, t);
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
		e.shiftKey && (r === i || !r || !zt(t, r)) ? (e.preventDefault(), a.focus()) : e.shiftKey || r !== a && r && zt(t, r) || (e.preventDefault(), i.focus());
	}
	function _(e) {
		d.current.active && t && (e.target instanceof Element && zt(t, e.target) || a && e.target instanceof Element && !zt(a, e.target) || (Je(t)[0] ?? t).focus());
	}
	function v(e) {
		n = e;
	}
	function y(e) {
		t !== e && C(), t = e, w(), e && d.current.active && x();
		let n = F();
		e && d.current.active && (!n || !zt(e, n)) && m();
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
		}, { composed: !0 }), a && (o = Mn(a)));
	}
	function S(e) {
		c.set(e, e.hasAttribute("inert")), e.setAttribute("inert", "");
	}
	function C() {
		for (let [e, t] of c) t || e.removeAttribute("inert");
		c.clear(), o?.(), o = null;
	}
	function w() {
		a = i && t && zt(i, t) ? i : null, l.patch({ documentModal: !a });
	}
	function T(e) {
		if (!a) return !0;
		let t = e.target instanceof Element ? e.target : F();
		return t instanceof Element && zt(a, t);
	}
}
// node_modules/@videojs/core/dist/default/core/ui/transition.js
var fa = {
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style"
};
function pa(e) {
	return {
		transitionStarting: e === "starting",
		transitionEnding: e === "ending"
	};
}
// node_modules/@videojs/core/dist/default/core/ui/indicator/lifecycle.js
var ma = class {
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
}, ha = class {
	#e = /* @__PURE__ */ new Set();
	register(e) {
		return this.#e.add(e), () => this.#e.delete(e);
	}
	show(e) {
		for (let t of this.#e) t !== e && t.close();
	}
};
function ga(e) {
	return e.closeDelay ?? 800;
}
function _a(e, t) {
	return e.open || t.active;
}
function va(e, t, n) {
	let r = e.open ? e : t;
	return {
		...r,
		open: e.open && n.active,
		generation: e.open ? e.generation : r.generation,
		...pa(n.status)
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/input-action.js
function ya(e) {
	return {
		action: e.action,
		value: e.value,
		source: e.source,
		key: "key" in e.event ? e.event.key : void 0,
		repeat: "repeat" in e.event ? e.event.repeat : void 0
	};
}
function ba(e) {
	if (!e) return {};
	let t = e.state, n = Ai(t), r = Ei(t), i = ki(t);
	return {
		paused: r && r.paused && !r.autoplaying,
		volume: ji(t)?.volume,
		muted: ji(t)?.muted,
		playbackRate: Di(t)?.playbackRate,
		isFullscreen: Ci(t)?.isFullscreen,
		subtitlesShowing: i?.subtitlesShowing,
		subtitlesAvailable: i ? (i.textTrackList ?? []).some(ee) : void 0,
		isPictureInPicture: Ti(t)?.isPictureInPicture,
		currentTime: n?.currentTime,
		duration: n?.duration,
		seeking: n?.seeking
	};
}
function xa(e, t) {
	let n = (e) => t(ya(e)), r = zn(e).subscribe(n), i = na(e).subscribe(n);
	return () => {
		r(), i();
	};
}
var Sa = /* @__PURE__ */ new WeakMap();
function Ca(e) {
	let t = Sa.get(e);
	return t || (t = new ha(), Sa.set(e, t)), t;
}
// node_modules/@videojs/core/dist/default/dom/utils/layout.js
function wa(e) {
	e?.getBoundingClientRect();
}
function Ta(e, t, n, r) {
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
function Ea(e, t) {
	let n = Math.max(e.left, t.left), r = Math.max(e.top, t.top), i = Math.min(e.right, t.right), a = Math.min(e.bottom, t.bottom);
	return Ta(n, r, Math.max(0, i - n), Math.max(0, a - r));
}
function Da(e) {
	let t = document.documentElement.getBoundingClientRect();
	return e ? Ea(t, e.getBoundingClientRect()) : t;
}
function Oa(e, t = {}) {
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
function ka(e) {
	let { onOpenChange: t, closeOnOutsideClick: n } = e, r = null, i = null, a = null, o = null, s = /* @__PURE__ */ new Set(), c = !1, l = null, u = ua({
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
			!u.signal.aborted && d.current.active && d.current.status !== "ending" && At(i);
		}), e.group?.()?.open(f), t.then(() => {
			!u.signal.aborted && d.current.active && d.current.status === "idle" && e.onOpenChangeComplete?.(!0);
		}));
	}
	function C() {
		let t = u.close(i);
		t && (e.group?.()?.close(f), t.then(() => {
			u.signal.aborted || d.current.active || (jt(i), e.onOpenChangeComplete?.(!1));
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
		!e && i && d.current.active && jt(i), a?.abort(), a = null, i = e, e && (a = new AbortController(), h(e, "toggle", ne, { signal: a.signal }), d.current.active && At(e));
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
var Aa = {
	item: "data-item",
	highlighted: "data-highlighted"
}, ja = {
	sideOffset: "--media-popover-side-offset",
	alignOffset: "--media-popover-align-offset",
	boundaryOffset: "--media-popover-boundary-offset",
	anchorWidth: "--media-popover-anchor-width",
	anchorHeight: "--media-popover-anchor-height",
	width: "--media-menu-width",
	height: "--media-menu-height",
	availableWidth: "--media-menu-available-width",
	availableHeight: "--media-menu-available-height"
}, Ma = {
	sideOffset: "--media-popover-side-offset",
	alignOffset: "--media-popover-align-offset",
	boundaryOffset: "--media-popover-boundary-offset",
	anchorWidth: "--media-popover-anchor-width",
	anchorHeight: "--media-popover-anchor-height",
	availableWidth: "--media-popover-available-width",
	availableHeight: "--media-popover-available-height"
};
// node_modules/@videojs/core/dist/default/dom/ui/menu/menu.js
function Na(e) {
	let { key: t } = e;
	return t === "ArrowDown" || t === "ArrowUp" || t === "ArrowLeft" || t === "ArrowRight" || t === "Home" || t === "End" || t === "Enter" || t === " " || t === "Escape" || t.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey;
}
function Pa(e, t) {
	return !e || !t ? null : {
		side: e,
		align: t
	};
}
var Fa = {
	...Ma,
	availableWidth: ja.availableWidth,
	availableHeight: ja.availableHeight
}, Ia = /* @__PURE__ */ new WeakMap();
function La(e) {
	e.close();
}
function Ra(e) {
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
			t?.setAttribute(Aa.highlighted, r?.pointer === !0 ? "pointer" : "");
			return;
		}
		let i = n;
		i && (i.tabIndex = -1), n = t, t ? (t.tabIndex = 0, t.setAttribute(Aa.highlighted, r?.pointer === !0 ? "pointer" : ""), i && ie(t, i) < 0 && r?.pointer && wa(t.parentElement), i?.removeAttribute(Aa.highlighted), r?.focus !== !1 && (r?.preventScroll ? t.focus({ preventScroll: !0 }) : t.focus())) : i?.removeAttribute(Aa.highlighted), e.onHighlightChange?.(t);
	}
	function v() {
		n && (n.tabIndex = -1, n.removeAttribute(Aa.highlighted), n = null, e.onHighlightChange?.(null));
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
	let E = ka({
		transition: e.transition,
		deferOpenChanges: !0,
		onOpenChange(t, n) {
			f = t ? null : n.reason, e.onOpenChange(t, n), t ? w() : (v(), C());
		},
		onOpenChangeComplete(t) {
			if (e.onOpenChangeComplete?.(t), !t && i) {
				let e = F(i.ownerDocument);
				(!(e instanceof Element) || e === i.ownerDocument.body || zt(i, e)) && x();
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
			if (t !== "Escape" && Na(e) && !e.defaultPrevented && e.preventDefault(), r.length !== 0) switch (t) {
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
		t.active && t.status !== "ending" && e.key !== "Escape" && Na(e) && (D.onKeyDown(e), e.stopPropagation());
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
		return e.tabIndex = -1, e.setAttribute(Aa.item, ""), e.addEventListener("focus", r), t.push(e), t.sort(ie), E.input.current.active && E.input.current.status !== "ending" && !n && w(), () => {
			e.removeEventListener("focus", r);
			let i = t.indexOf(e);
			i !== -1 && t.splice(i, 1), n === e && v();
		};
	}
	function oe(e) {
		o.add(e), Ia.set(e, p);
		let t = e.input.subscribe(se);
		return s.set(e, t), () => {
			o.delete(e), Ia.get(e) === p && Ia.delete(e), s.get(e)?.(), s.delete(e), se();
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
		if (e) Ia.get(p)?.highlight(null);
		else for (let e of o) e.close("imperative-action");
		E.syncOpen(e);
	}
	function k() {
		cancelAnimationFrame(d), d = 0, C();
		for (let e of s.values()) e();
		for (let e of o) Ia.get(e) === p && Ia.delete(e);
		s.clear(), o.clear(), Ia.delete(p), u = null, E.destroy();
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
		destroy: k
	}, p;
}
// node_modules/@videojs/core/dist/default/core/ui/menu/data.js
var za = {
	open: "data-open",
	side: "data-side",
	align: "data-align",
	...fa
}, Ba = {
	open: "data-open",
	isSubmenu: "data-submenu",
	childOpen: "data-child-open",
	...fa
};
({
	...za,
	...Ba
});
// node_modules/@videojs/core/dist/default/dom/ui/menu/popup.js
function Va() {
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
				t.delete(n), e.has(n) && !o(n.menu) && (n.element.removeAttribute(Ba.childOpen), g());
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
			return t instanceof Element && zt(e.element, t);
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
			let t = ft(e, ja.availableWidth);
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
			e ? (c(n), n.menu.highlight(null), n.element.setAttribute(Ba.childOpen, "")) : s(n.menu) && n.element.hasAttribute(Ba.childOpen) ? l(n) : (c(n), n.element.removeAttribute(Ba.childOpen));
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
		n.style.setProperty(ja.width, `${b}px`), n.style.setProperty(ja.height, `${x}px`);
		let S = m(r.element);
		S > 0 && n.style.setProperty(ja.width, `${b + S}px`);
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
			c(n), e.delete(n), n.unsubscribe(), n.stopObserving(), oe(t.element, n.accessibility), t.element.removeAttribute(Ba.childOpen), t.menu.contentElement === t.element && t.menu.setContentElement(null), i();
		};
	}
	function y() {
		cancelAnimationFrame(r);
		for (let e of t.values()) cancelAnimationFrame(e);
		t.clear();
		for (let t of e) t.unsubscribe(), t.stopObserving(), oe(t.element, t.accessibility), t.element.removeAttribute(Ba.childOpen), t.menu.contentElement === t.element && t.menu.setContentElement(null);
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
function Ha() {
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
function Ua(e, t) {
	if (!t) return !1;
	if (r(e.composedPath)) return e.composedPath().includes(t);
	let n = e.target;
	return n instanceof Node && t.contains(n);
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/positioning.js
var Wa = {
	sideOffset: 0,
	alignOffset: 0,
	boundaryOffset: 0
}, Ga = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function Ka(e) {
	return `${B(e, 0, Infinity)}px`;
}
function qa(e, t, n, r) {
	let i = n - r;
	return i < t ? t : B(e, t, i);
}
function Ja({ align: e, direction: t = "ltr" }) {
	return t === "rtl" ? e === "start" ? "end" : e === "end" ? "start" : e : e;
}
function Ya(e, t, n, r, i, a, o, s, c, l) {
	let u = a === "start" ? e + o : a === "end" ? t + o : e + n / 2 + o, d = c === "horizontal" ? "left" : "top", f = Ga[d], p = a === "start" ? d : a === "end" ? f : "center", m = a === "start" ? "0px" : a === "end" ? "-100%" : "-50%";
	return {
		base: `calc(anchor(${p}) + ${l})`,
		translate: `clamp(${r + s - u}px, ${m}, calc(${i - s - u}px - 100%))`
	};
}
function Xa(e, t, n, r, i, a, o = Ma) {
	if (Xe()) return {
		...Za(e, t, o, n, i, a),
		...n && i ? Qa(n, i, t, a, o) : {}
	};
	if (n && r) {
		let e = a ?? Wa;
		return {
			position: "fixed",
			margin: "0",
			...$a(n, r, t, e, i),
			...i ? Qa(n, i, t, e, o) : {}
		};
	}
	return {};
}
function Za(e, t, n = Ma, r, i, a = Wa) {
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
	}, f = Ga[c];
	if (c === "top" || c === "bottom") {
		let e = Ja(t);
		if (d[f] = `calc(anchor(${c}) + ${o})`, r && i) {
			let { base: t, translate: n } = Ya(r.left, r.right, r.width, i.left, i.right, e, a.alignOffset, u, "horizontal", s);
			return d.left = t, d.translate = `${n} 0`, d;
		}
		e === "start" ? d.left = `calc(anchor(left) + ${s})` : e === "end" ? d.right = `calc(anchor(right) + ${s})` : (d.justifySelf = "anchor-center", d.marginInlineStart = s);
	} else {
		if (d[f] = `calc(anchor(${c}) + ${o})`, r && i) {
			let { base: e, translate: t } = Ya(r.top, r.bottom, r.height, i.top, i.bottom, l, a.alignOffset, u, "vertical", s);
			return d.top = e, d.translate = `0 ${t}`, d;
		}
		l === "start" ? d.top = `calc(anchor(top) + ${s})` : l === "end" ? d.bottom = `calc(anchor(bottom) + ${s})` : (d.alignSelf = "anchor-center", d.marginBlockStart = s);
	}
	return d;
}
function Qa(e, t, n, r = Wa, i = Ma) {
	let a = {}, { side: o } = n, s = r.boundaryOffset ?? 0, c = t.left + s, l = t.right - s, u = t.top + s, d = t.bottom - s;
	if (a[i.anchorWidth] = `${e.width}px`, a[i.anchorHeight] = `${e.height}px`, o === "top" || o === "bottom") {
		let t = o === "top" ? e.top - u : d - e.bottom;
		a[i.availableHeight] = Ka(t - r.sideOffset), a[i.availableWidth] = Ka(l - c);
	} else {
		let t = o === "left" ? e.left - c : l - e.right;
		a[i.availableWidth] = Ka(t - r.sideOffset), a[i.availableHeight] = Ka(d - u);
	}
	return a;
}
function $a(e, t, n, r = {
	sideOffset: 0,
	alignOffset: 0
}, i) {
	let { side: a, align: o } = n, { sideOffset: s, alignOffset: c } = r, l = 0, u, d = 0, f;
	if (a === "top" ? u = `calc(100% - ${e.top}px + ${s}px)` : a === "bottom" ? l = e.bottom + s : a === "left" ? f = `calc(100% - ${e.left}px + ${s}px)` : d = e.right + s, a === "top" || a === "bottom") {
		let r = Ja(n);
		d = r === "start" ? e.left + c : r === "end" ? e.right - t.width + c : e.left + (e.width - t.width) / 2 + c;
	} else l = o === "start" ? e.top + c : o === "end" ? e.bottom - t.height + c : e.top + (e.height - t.height) / 2 + c;
	if (i) {
		let e = r.boundaryOffset ?? 0;
		a === "top" || a === "bottom" ? d = qa(d, i.left + e, i.right - e, t.width) : l = qa(l, i.top + e, i.bottom - e, t.height);
	}
	return {
		top: a === "top" ? "auto" : `${l}px`,
		bottom: u ?? "auto",
		left: a === "left" ? "auto" : `${d}px`,
		right: f ?? "auto"
	};
}
function eo(e, t = Ma) {
	let n = getComputedStyle(e);
	return {
		sideOffset: pt(e, n.getPropertyValue(t.sideOffset)),
		alignOffset: pt(e, n.getPropertyValue(t.alignOffset)),
		boundaryOffset: pt(e, n.getPropertyValue(t.boundaryOffset))
	};
}
function to(e, t) {
	let n = e.getBoundingClientRect(), r = mt(e, {
		box: "layout",
		overflow: t === "left" || t === "right" ? "width" : "height"
	});
	return Ta(n.left, n.top, r.width, r.height);
}
function no(e) {
	let t = e.parentNode;
	if (io(e) || !t) return {
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
function ro(e, t) {
	return Ta(e.left - t.x, e.top - t.y, e.width, e.height);
}
function io(e) {
	return e.hasAttribute("popover") && Ze();
}
// node_modules/@videojs/core/dist/default/dom/ui/popover/positioner.js
var ao = [
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
], oo = class {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = !1;
	#o = null;
	#s = null;
	#c = Pt(() => this.#f());
	sync(e) {
		let { anchorName: t, position: n, trigger: r, popup: i, boundary: a, container: o, cssVars: s = Ma } = e;
		if (!n || !r || !i) {
			this.cleanup();
			return;
		}
		let c = Oa(a, {
			container: o ?? null,
			root: i.getRootNode()
		}), l = this.#e;
		!l || l.anchorName !== t || l.trigger !== r || l.popup !== i || (l.cssVars ?? Ma) !== s || l.trackResize !== e.trackResize || this.#t !== c ? (l?.popup && this.#m(l.popup), this.#u(), this.#e = {
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
		!t || e && Ua(e, t) || this.#c();
	};
	#f() {
		let e = this.#e;
		if (!e?.position || !e.trigger || !e.popup) return;
		let t = e.trigger, n = Xe(), r = n ? {
			x: 0,
			y: 0
		} : no(e.popup), i = ro(t.getBoundingClientRect(), r), a = ro(Da(this.#t), r), o = eo(e.popup, e.cssVars), s = e.position, c = () => ro(to(e.popup, s.side), r), l = (r) => {
			let c = kt(i, r, a, s, o), { positionAnchor: l, ...u } = Xa(e.anchorName, {
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
		if (this.#p(e.popup, e.cssVars ?? Ma), lt(e.popup, u.style), e.onSideChange?.(u.side), n || !e.onSideChange) return;
		let d = c();
		if (d.width === u.popupRect.width && d.height === u.popupRect.height) return;
		let f = l(d);
		lt(e.popup, f.style), f.side !== u.side && e.onSideChange(f.side);
	}
	#p(e, t) {
		if (this.#s) return;
		let n = [
			...ao,
			t.anchorWidth,
			t.anchorHeight,
			t.availableWidth,
			t.availableHeight
		];
		this.#s = ut(e, n);
	}
	#m(e) {
		this.#s &&= (I(e, this.#s), null);
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
function so(e, t, n) {
	let r;
	return r = n === "vertical" ? 1 - (e.clientY - t.top) / t.height : (e.clientX - t.left) / t.width, Number.isFinite(r) ? B(r * 100, 0, 100) : 0;
}
// node_modules/@videojs/core/dist/default/dom/ui/slider/slider.js
var co = 3;
function lo(e) {
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
			let p = so(n, a, e.getOrientation());
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
				let r = so(n, a, e.getOrientation()), i = !t.current.dragging;
				if (i && Math.hypot(n.clientX - s, n.clientY - c) < co) return;
				l = r, u = r, t.patch({
					dragging: !0,
					dragPercent: r,
					pointerPercent: r
				}), i && e.onDragStart?.(), m(r, !0);
				return;
			}
			let r = so(n, e.getElement().getBoundingClientRect(), e.getOrientation());
			t.patch({
				pointing: !0,
				pointerPercent: r
			});
		},
		onPointerUp(t) {
			if (e.isDisabled() || (t.stopPropagation(), C(o))) return;
			let n = so(t, a, e.getOrientation());
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
			let r = e.getStepPercent(), i = e.getLargeStepPercent(), a = jr(n.repeat && !C(u) ? u : e.getPercent(), r, 0), o = n.shiftKey ? i : r, s = null;
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
			s !== null && (n.preventDefault(), s = B(s, 0, 100), u = s, t.patch({
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
var uo = {
	fill: "--media-slider-fill",
	pointer: "--media-slider-pointer",
	buffer: "--media-slider-buffer"
};
// node_modules/@videojs/core/dist/default/dom/ui/slider/css-vars.js
function fo(e) {
	return {
		[uo.fill]: `${e.fillPercent.toFixed(3)}%`,
		[uo.pointer]: `${e.pointerPercent.toFixed(3)}%`
	};
}
function po(e) {
	return {
		...fo(e),
		[uo.buffer]: `${e.bufferPercent.toFixed(3)}%`
	};
}
function mo(e, t) {
	let n = e / 2;
	return {
		position: "absolute",
		left: t === "visible" ? `calc(var(${uo.pointer}) - ${n}px)` : `min(max(0px, calc(var(${uo.pointer}) - ${n}px)), calc(100% - ${e}px))`,
		width: "max-content",
		pointerEvents: "none"
	};
}
// node_modules/@videojs/core/dist/default/dom/ui/slider/focus.js
function ho(e = document) {
	let t = F(He(e) ? e : e.ownerDocument);
	return t?.getAttribute("role") === "slider" ? He(e) || zt(e, t) : !1;
}
// node_modules/@videojs/core/dist/default/dom/ui/time-slider/seek.js
function go(e) {
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
function _o(e, t) {
	let n = !0, r = !1, i = e.target, a = 0, o = () => {
		i = e.target, r = !0;
		let o = ++a;
		t.resetSnapshot(), queueMicrotask(() => {
			n && o === a && (r = !1, i = e.target, i && t.processSnapshot(ba(e)));
		});
	}, s = e.subscribe(() => {
		let n = e.target;
		n === i ? n && !r && t.processSnapshot(ba(e)) : o();
	});
	return o(), () => {
		n = !1, s();
	};
}
function vo(e) {
	return !e || !ho(e);
}
// node_modules/@videojs/utils/dist/array/find-last-at-or-before.js
function yo(e, t, n) {
	let r = 0, i = e.length - 1, a = -1;
	for (; r <= i;) {
		let o = r + i >>> 1;
		n(e[o]) <= t ? (a = o, r = o + 1) : i = o - 1;
	}
	return a;
}
function bo(e, t, n) {
	let r = yo(e, t, n);
	return r < 0 ? void 0 : e[r];
}
// node_modules/@videojs/utils/dist/array/find-range-at.js
function xo(e, t, n, r) {
	let i = yo(e, t, n);
	if (i < 0) return;
	let a = e[i], o = r(a), s = i === e.length - 1;
	return t < o || s && t === o ? a : void 0;
}
// node_modules/@videojs/core/dist/default/core/ui/thumbnail/core.js
var So = class {
	findActiveThumbnail(e, t) {
		return bo(e, t, (e) => e.startTime);
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
function Co(e) {
	let { getContainer: t, getImg: n, onStateChange: r } = e, i = new So(), a = !1, o = !1, s = 0, c = 0, l = "", u = null, d = null, f = null, p = null, m = /* @__PURE__ */ new Set();
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
var wo = {
	hover: "hover",
	focus: "focus",
	escape: "escape",
	blur: "blur",
	"imperative-action": "imperative-action"
};
function To(e) {
	let t = {
		transition: e.transition,
		onOpenChange(t, n) {
			let r = wo[n.reason];
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
	let n = ka(t), r = !1, i, a;
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
function Eo() {
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
					let e = Do(o);
					ko(e), Oo(e);
				}
				r = requestAnimationFrame(() => {
					if (r = 0, t || l !== i || !e.current.active) return c(l);
					e.patch({ status: "idle" }), n = requestAnimationFrame(() => {
						if (n = 0, t || l !== i || !e.current.active) return c(l);
						Ao(Do(o)).finally(() => c(l));
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
					Ao(o).finally(() => {
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
function Do(e) {
	return typeof e == "function" ? e() : e;
}
function Oo(e) {
	e && e.offsetHeight;
}
function ko(e) {
	let t = e?.getAnimations?.({ subtree: !0 }) ?? [];
	for (let e of t) e.cancel();
}
function Ao(e) {
	if (!e) return Promise.resolve();
	let t = e.getAnimations?.() ?? [];
	return t.length === 0 ? Promise.resolve() : Promise.all(t.map((e) => e.finished)).then(de, de);
}
// node_modules/@videojs/core/dist/default/dom/ui/wheel-step.js
function jo(e) {
	return { onWheel(t) {
		if (e.isDisabled()) return;
		let n = Math.sign(t.deltaY);
		if (n === 0) return;
		t.preventDefault();
		let r = e.getStepPercent(), i = B(e.getPercent() - n * r, 0, 100);
		e.onValueChange?.(i);
	} };
}
// node_modules/@videojs/core/dist/default/dom/utils/element-props.js
function W(e, t, n) {
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
function G(e, t, n) {
	for (let r in t) {
		if (n && !(r in n)) continue;
		let i = n?.[r] ?? Mo(r), a = t[r];
		a === !0 ? e.setAttribute(i, "") : a ? e.setAttribute(i, String(a)) : e.removeAttribute(i);
	}
}
function Mo(e) {
	return `data-${e.toLowerCase()}`;
}
// node_modules/@videojs/html/dist/default/player/element.js
function No(e) {
	return Object.entries(e).map(([e, t]) => {
		let n = t.html?.attribute ?? b(e);
		return {
			property: T(n),
			attribute: n,
			entry: t
		};
	});
}
function Po(e) {
	let t = No(e.config);
	class n extends R {
		static {
			this.properties = {
				...R.properties,
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
		#d = new Sn(() => this.#T());
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
		#h = new A(this, {
			context: e.playerContext,
			initialValue: this.store
		});
		#g = new A(this, {
			context: e.mediaContext,
			initialValue: {
				media: this.#i,
				registerMedia: this.#p
			}
		});
		#_ = new A(this, {
			context: e.containerContext,
			initialValue: {
				container: this.#o,
				registerContainer: this.#m
			}
		});
		constructor() {
			super(), new A(this, {
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
				wn(this.store, r, this[t]);
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
					wn(e, r, this[t]);
				}
				this.#t = e;
			}
		}
	}
	return n;
}
// node_modules/@videojs/html/dist/default/player/create-player.js
function Fo(e) {
	let t = vi(...e.features), n = Cn(e.features);
	return {
		PlayerElement: Po({
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
var { PlayerElement: Io, PlayerController: Lo } = Fo({ features: aa }), Ro = class extends Io {
	static {
		this.tagName = "video-player";
	}
};
// node_modules/@videojs/html/dist/default/define/video/player.js
o(Ro);
var K = t(Symbol.for("@videojs/i18n")), zo;
function Bo() {
	return zo ??= oi(ei("en"), "en"), zo;
}
var q = class {
	#e;
	#t;
	#n;
	constructor(e, t) {
		this.#e = e, this.#t = new j(e, {
			context: t,
			callback: () => this.#e.requestUpdate(),
			subscribe: !0
		}), e.addController(this);
	}
	get value() {
		return this.#t.value?.translator ?? Bo();
	}
	get locale() {
		return this.#t.value?.locale ?? "en";
	}
	hostConnected() {
		zo = void 0, this.#n = ti(() => {
			zo = void 0, this.#t.value || this.#e.requestUpdate();
		});
	}
	hostDisconnected() {
		this.#n?.(), this.#n = void 0;
	}
}, Vo = t(Symbol.for("@videojs/popup-group"));
// node_modules/@videojs/core/dist/default/core/ui/utils/resolve-label.js
function J(e, t) {
	return r(e) ? e(t) || void 0 : e || void 0;
}
// node_modules/@videojs/core/dist/default/core/ui/dialog/core.js
var Ho = class {
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
			...pa(e.status)
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
}, Uo = class extends Ho {
	constructor() {
		super("alertdialog");
	}
}, Wo = {
	open: "data-open",
	transitionStarting: "data-starting-style",
	transitionEnding: "data-ending-style",
	scope: "data-scope"
}, Go = "menu.", Ko = {
	key: `${Go}quality`,
	text: "Quality"
}, qo = {
	key: `${Go}playbackRate`,
	text: "Playback rate"
}, Jo = {
	key: `${Go}customRate`,
	text: "Custom, {rate}"
}, Yo = {
	key: `${Go}auto`,
	text: "Auto"
}, Xo = {
	key: `${Go}autoWithLabel`,
	text: "Auto ({label})"
}, Zo = class e {
	static defaultProps = { delay: 500 };
	state = N({ visible: !1 });
	#e = { ...e.defaultProps };
	#t = null;
	setProps(t) {
		this.#e = M(t, e.defaultProps);
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
}, Qo = { visible: "data-visible" }, $o = "captions.", es = {
	key: `${$o}enable`,
	text: "Enable captions"
}, ts = {
	key: `${$o}disable`,
	text: "Disable captions"
}, ns = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || (e.subtitlesShowing ? ts : es);
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	toggle(e) {
		this.setMedia(e), this.getState().disabled || this.#e.menuTrigger && rs(e) > 1 || e.toggleSubtitles();
	}
};
function rs(e) {
	return e.textTrackList.filter(ee).length;
}
// node_modules/@videojs/core/dist/default/core/ui/captions-button/data.js
var is = {
	subtitlesShowing: "data-active",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, as = class {
	#e = null;
	setMedia(e) {
		this.#e = e;
	}
	getState() {
		return { controlsVisible: this.#e.controlsVisible };
	}
}, os = { controlsVisible: "data-controls-visible" }, ss = class e {
	static defaultProps = { visibility: "auto" };
	#e = { ...e.defaultProps };
	#t = null;
	constructor(e) {
		e && this.setProps(e);
	}
	setProps(t) {
		this.#e = M(t, e.defaultProps);
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
}, cs = {
	visible: "data-visible",
	userActive: "data-user-active"
}, ls = class extends Uo {
	setProps() {}
}, us = { ...Wo }, ds = "common.", fs = {
	key: `${ds}empty`,
	text: ""
}, ps = {
	key: `${ds}ok`,
	text: "OK"
}, ms = "errors.", hs = {
	key: `${ms}aborted`,
	text: "You stopped media playback before it finished."
}, gs = {
	key: `${ms}network`,
	text: "This media could not be loaded due to a network or server issue."
}, _s = {
	key: `${ms}decode`,
	text: "This media could not be played. It may be corrupted, or your browser may not support its format."
}, vs = {
	key: `${ms}source`,
	text: "This media could not be loaded. It may be unavailable, or your browser may not support its format."
}, ys = {
	key: `${ms}encrypted`,
	text: "This media could not be played because it could not be decrypted."
}, bs = {
	key: `${ms}unplayable`,
	text: "This media is unsupported by the player."
}, xs = {
	key: `${ms}title`,
	text: "Something went wrong."
}, Ss = {
	key: `${ms}unexpected`,
	text: "An unexpected error occurred."
}, Cs = 99001, ws = {
	[D.MEDIA_ERR_ABORTED]: hs,
	[D.MEDIA_ERR_NETWORK]: gs,
	[D.MEDIA_ERR_DECODE]: _s,
	[D.MEDIA_ERR_SRC_NOT_SUPPORTED]: vs,
	[D.MEDIA_ERR_ENCRYPTED]: ys,
	[D.MEDIA_ERR_CUSTOM]: fs,
	[Cs]: bs
}, Ts = { [D.MEDIA_ERR_SRC_NOT_SUPPORTED]: ["Failed to open media"] };
function Es(e) {
	return e >= D.MEDIA_ERR_ABORTED && e <= D.MEDIA_ERR_ENCRYPTED;
}
function Ds() {
	return xs;
}
function Os() {
	return ps;
}
function ks() {
	return Ss;
}
function As(e, t) {
	if (e) {
		let t = ws[e.code], n = e.message?.trim();
		if (n) {
			let r = D.defaultMessages[e.code];
			if (t && r && n === r) return t;
			let i = Ts[e.code];
			return t && Es(e.code) && !e.context && i?.includes(n) ? t : n;
		}
		if (t) return t;
	}
	return t?.trim() || Ss;
}
// node_modules/@videojs/core/dist/default/i18n/text/fullscreen.js
var js = "fullscreen.", Ms = {
	key: `${js}enter`,
	text: "Enter fullscreen"
}, Ns = {
	key: `${js}exit`,
	text: "Exit fullscreen"
}, Ps = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || (e.fullscreen ? Ns : Ms);
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (this.setMedia(e), !this.getState().disabled) return e.isFullscreen ? e.exitFullscreen() : e.requestFullscreen();
	}
}, Fs = {
	fullscreen: "data-fullscreen",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, Is = "status.", Ls = {
	key: `${Is}captionsOn`,
	text: "Captions on"
}, Rs = {
	key: `${Is}captionsOff`,
	text: "Captions off"
}, zs = {
	key: `${Is}paused`,
	text: "Paused"
}, Bs = {
	key: `${Is}playing`,
	text: "Playing"
}, Vs = {
	key: `${Is}fullscreen`,
	text: "Fullscreen"
}, Hs = {
	key: `${Is}pip`,
	text: "Picture in picture"
}, Us = {
	key: `${Is}exitPip`,
	text: "Exit picture in picture"
}, Ws = {
	key: `${Is}seekedTo`,
	text: "Seeked to {time}"
}, Gs = "volume.", Ks = {
	key: `${Gs}mutedValue`,
	text: "{percent}, muted"
}, qs = {
	key: `${Gs}muted`,
	text: "Muted"
}, Js = {
	key: `${Gs}label`,
	text: "Volume"
}, Ys = {
	key: `${Gs}value`,
	text: "Volume {value}"
}, Xs = {
	muted: V(qs),
	volume: V(Js),
	captionsOn: V(Ls),
	captionsOff: V(Rs),
	paused: V(zs),
	playing: V(Bs),
	fullscreen: V(Vs),
	exitFullscreen: V(Ns),
	pictureInPicture: V(Hs),
	exitPictureInPicture: V(Us)
};
function Zs(e) {
	return {
		muted: e(qs),
		volume: e(Js),
		captionsOn: e(Ls),
		captionsOff: e(Rs),
		paused: e(zs),
		playing: e(Bs),
		fullscreen: e(Vs),
		exitFullscreen: e(Ns),
		pictureInPicture: e(Hs),
		exitPictureInPicture: e(Us)
	};
}
// node_modules/@videojs/core/dist/default/core/ui/input-action.js
function Qs(e, t) {
	return e ? !t || t.includes(e) : !1;
}
// node_modules/@videojs/core/dist/default/core/ui/menu/core.js
function $s(e) {
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
var ec = class e {
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
		this.#e = M(t, e.defaultProps);
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
			...pa(e.status)
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
}, tc = "buttons.", nc = {
	key: `${tc}play`,
	text: "Play"
}, rc = {
	key: `${tc}pause`,
	text: "Pause"
}, ic = {
	key: `${tc}replay`,
	text: "Replay"
}, ac = {
	key: `${tc}mute`,
	text: "Mute"
}, oc = {
	key: `${tc}unmute`,
	text: "Unmute"
}, sc = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || (e.muted ? oc : ac);
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
			volumeLevel: cc(e),
			availability: t,
			hidden: t !== "available"
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	toggle(e) {
		this.#e.disabled || e.mutedAvailability !== "available" || e.setMuted(!(e.muted || e.volume === 0));
	}
};
function cc(e) {
	return e.muted || e.volume === 0 ? "off" : e.volume < .5 ? "low" : e.volume < .75 ? "medium" : "high";
}
// node_modules/@videojs/core/dist/default/core/ui/mute-button/data.js
var lc = {
	muted: "data-muted",
	volumeLevel: "data-volume-level",
	availability: "data-availability",
	hidden: "data-hidden"
}, uc = "pip.", dc = {
	key: `${uc}enter`,
	text: "Enter picture-in-picture"
}, fc = {
	key: `${uc}exit`,
	text: "Exit picture-in-picture"
}, pc = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || (e.pip ? fc : dc);
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (this.setMedia(e), !this.getState().disabled) return e.isPictureInPicture ? e.exitPictureInPicture() : e.requestPictureInPicture();
	}
}, mc = {
	pip: "data-pip",
	availability: "data-availability",
	disabled: "data-disabled",
	hidden: "data-hidden"
}, hc = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || (e.ended ? ic : e.paused ? nc : rc);
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	async toggle(e) {
		if (!this.#e.disabled) {
			if (e.paused && !e.autoplaying || e.ended) return e.play();
			e.pause();
		}
	}
}, gc = {
	paused: "data-paused",
	ended: "data-ended",
	started: "data-started"
}, _c = { length: "--media-playback-rate-length" }, vc = {
	key: "playback.rate",
	text: "Playback rate, {rate}"
}, yc = class e {
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		let t = J(this.#e.label, e);
		return t === void 0 ? vc : t;
	}
	getTooltipLabel(e) {
		let t = J(this.#e.label, e);
		return t === void 0 ? qo : t;
	}
	getLabelParams(e) {
		if (J(this.#e.label, e) === void 0) return { rate: e.rate };
	}
	getCSSVars(e) {
		return { [_c.length]: String(String(e.rate).length) };
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	getRates(e) {
		return Er(this.#e.rates) ?? e.playbackRates;
	}
	cycle(e) {
		if (this.#e.disabled || e.playbackRateAvailability !== "available" || this.#e.menuTrigger) return;
		let t = this.getRates(e);
		if (t.length === 0) return;
		let { playbackRate: n } = e, r = t.indexOf(n), i = r === -1 ? t.find((e) => e > n) ?? t[0] : t[(r + 1) % t.length];
		e.setPlaybackRate(i);
	}
}, bc = {
	rate: "data-rate",
	availability: "data-availability",
	hidden: "data-hidden"
}, xc = 1;
function Sc(e) {
	return `${e}×`;
}
var Cc = class e {
	static defaultProps = {
		label: "",
		formatRate: Sc,
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		let t = J(this.#e.label, e);
		return t === void 0 ? qo : t;
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
		return Er(this.#e.rates) ?? e.playbackRates;
	}
	setMedia(e) {
		this.#t = e;
	}
	getState() {
		let e = this.#t, t = this.getRates(e), n = e.playbackRateAvailability === "available" ? t.length > 0 ? "available" : "unavailable" : e.playbackRateAvailability, r = n === "available" ? Dr(t, e.playbackRate) : t;
		return this.state.patch({
			rate: e.playbackRate,
			value: this.getRateValue(e.playbackRate),
			options: r.map((e) => {
				let n = this.getRateLabel(e), r = e !== xc && !t.includes(e);
				return {
					rate: e,
					value: this.getRateValue(e),
					label: n,
					...r && {
						ariaLabel: Jo,
						ariaLabelParams: { rate: n }
					},
					disabled: !1,
					custom: r
				};
			}),
			disabled: this.#e.disabled || n !== "available",
			hidden: n !== "available",
			availability: n
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
	}
	select(e, t) {
		this.#e.disabled || e.playbackRateAvailability !== "available" || (this.getRates(e).includes(t) || t === e.playbackRate) && e.setPlaybackRate(t);
	}
	selectValue(e, t) {
		let n = Dr(this.getRates(e), e.playbackRate).find((e) => this.getRateValue(e) === t);
		a(n) || this.select(e, n);
	}
}, wc = {
	rate: "data-rate",
	disabled: "data-disabled",
	hidden: "data-hidden",
	availability: "data-availability"
}, Tc = class e {
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
		this.#e = M(t, e.defaultProps);
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
			...pa(e.status)
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
	...fa
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
	return t ? `${t}p` : e.bitrate ? Nc(e.bitrate) : Ko;
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
			label: Yo,
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		return J(this.#e.label, e) || Ko;
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
			label: t === -1 && a ? Xo : Yo,
			disabled: !1,
			...t === -1 && a && { labelParams: { label: ni(a.label) } }
		};
		return this.state.patch({
			options: [o, ...e.videoRenditionList.map(r)],
			value: t === -1 ? jc : e.videoRenditionList[t].id,
			disabled: this.#e.disabled || n === "unavailable",
			hidden: n === "unavailable",
			availability: n
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
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
		this.#e = M(t, e.defaultProps);
	}
	getLabel(e) {
		let t = J(this.#e.label, e);
		return t === void 0 ? e.direction === "backward" ? Wc : Uc : t;
	}
	getLabelParams(e) {
		if (J(this.#e.label, e) === void 0) return { seconds: Math.abs(this.#e.seconds) };
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
		}), this.state.patch({ label: ni(this.getLabel(this.state.current)) }), this.state.current;
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
	return e.value === void 0 ? !e.key || e.key < "0" || e.key > "9" ? null : Number(e.key) * 10 : B(e.value, 0, 100);
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
	#n = new ma(() => {
		this.#t = null, this.state.patch({
			open: !1,
			direction: null,
			count: 0,
			seekTotal: 0,
			value: null
		});
	}, () => ga(this.#e));
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
		this.#e = M(t, e.defaultProps);
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
		return J(this.#e.label, e) || "";
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
		return jr(B(t + e / 100 * (n - t), t, n), r, t);
	}
	rawValueFromPercent(e) {
		let { min: t, max: n } = this.#e;
		return B(t + e / 100 * (n - t), t, n);
	}
	percentFromValue(e) {
		let { min: t, max: n } = this.#e;
		return Ar(e, t, n);
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
			fillPercent: Ar(t.value, e.start, e.end),
			active: o,
			pointing: s,
			dragging: c,
			highlighted: e.highlight !== !1 && s,
			interactive: s || c || l && o
		};
	}
}, fl = {
	...Xs,
	volumeWithValue: (e) => V(Ys, { value: e }),
	seekedTo: (e) => V(Ws, { time: el(e) }),
	playbackRate: (e) => V(vc, { rate: e })
};
function pl(e, t = "en") {
	return {
		...Zs(e),
		volumeWithValue: (t) => e(Ys, { value: t }),
		seekedTo: (n) => e(Ws, { time: el(n, { locale: t }) }),
		playbackRate: (t) => e(vc, { rate: t })
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
	return `${Math.round(B(e, 0, 1) * 100)}%`;
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
		let t = B(r + (e.value ?? 0), 0, 1);
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
function yl(e, t, n = Xs, r) {
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
	#a = new ma(() => this.state.patch({ label: null }), () => ga(this.#e));
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
function Tl(e, t, n = Xs) {
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
	#t = new ma(() => this.state.patch({
		open: !1,
		status: null,
		label: null,
		value: null
	}), () => ga(this.#e));
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
		if (!Qs(e.action, this.#e.actions)) return !1;
		let n = Tl(e, t, {
			...Xs,
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
		this.#e = M(t, e.defaultProps);
	}
	setMedia(e) {
		this.#t = e;
	}
	setFormatLocale(e) {
		this.#n = e;
	}
	#r() {
		let e = this.#t, t = Xt(e), { type: n } = this.#e;
		switch (n) {
			case "current": return e.currentTime;
			case "duration": return t;
			case "remaining": return e.currentTime - t;
			default: return 0;
		}
	}
	#i() {
		let e = this.#t, t = this.#r(), n = Xt(e), r = this.#n === void 0 ? void 0 : { locale: this.#n };
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
		let n = J(this.#e.label, e);
		return n === void 0 ? e.disabled || e.unavailable ? Gl : this.#e.toggle ? Kl[this.#s(t, e.type)] : ql[this.#e.type] : n;
	}
	getLabelParams(e) {
		if (J(this.#e.label, e) !== void 0 || e.disabled || !this.#e.toggle) return;
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
		let e = this.#r(), t = !Zt(this.#t);
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
		this.#e = M(t, e.defaultProps), super.setProps({
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
		let e = this.#t, { currentTime: t, seeking: n, buffered: r } = e, i = Xt(e);
		super.setProps({
			...this.#e,
			disabled: this.#e.disabled || !Zt(e),
			min: 0,
			max: i
		});
		let a = super.getSliderState(t), o = Ar(r.length > 0 ? r[r.length - 1][1] : 0, 0, i);
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
		return xo(e, t, (e) => e.start, (e) => e.end);
	}
	getState(e, t, n) {
		return {
			...e,
			cue: t[e.index]?.cue ?? null,
			bufferPercent: Ar(n, e.start, e.end)
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
		this.#e = M(t, e.defaultProps);
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
			...pa(e.status)
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
	...fa
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
		this.#e = M(t, e.defaultProps);
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
	#n = new ma(() => this.state.patch({
		open: !1,
		level: null,
		value: null,
		fill: null,
		min: !1,
		max: !1
	}), () => ga(this.#e));
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
			...Xs,
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
}, gu = { fill: "--media-volume-fill" }, _u = class extends Tc {
	static defaultProps = Tc.defaultProps;
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
		let n = M(t, e.defaultProps);
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
		return super.getLabel(e) || Js;
	}
	getValueText(e) {
		return e.muted ? Ks : this.getValueTextParams(e).percent;
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
}, Du = class extends R {
	static {
		this.tagName = "media-container";
	}
	#e = null;
	#t = null;
	#n = null;
	#r = new as();
	#i = new P(this, O, xi);
	#a = new q(this, K);
	#o = Ha();
	#s = new A(this, {
		context: Vo,
		initialValue: this.#o
	});
	#c = new j(this, {
		context: s,
		callback: (e) => this.#l(e)
	});
	connectedCallback() {
		super.connectedCallback(), this.#s.setValue(this.#o), this.#l(this.#c.value), ca(this), this.#u(), this.#t = new AbortController(), h(this, "pointerup", this.#d, { signal: this.#t.signal });
	}
	disconnectedCallback() {
		this.#e?.(), this.#e = null, this.#t?.abort(), this.#t = null, super.disconnectedCallback();
	}
	update(e) {
		super.update(e), this.#u();
		let t = this.#i.value;
		t ? (this.#r.setMedia(t), G(this, this.#r.getState(), os)) : this.removeAttribute(os.controlsVisible);
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
		la(this);
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
var Mu = class extends R {
	static {
		this.tagName = "media-poster";
	}
	#e = new kc();
	#t = this.attachShadow({ mode: "open" });
	#n = ju();
	#r = new MutationObserver(() => this.requestUpdate());
	#i = new P(this, O, Ei);
	#a = new P(this, O, wi);
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
		this.#f(Re(this, We) ?? this.#n), this.#p(n), this.#e.setImageLoadState(this.#d), G(this, this.#e.getState(), Ac);
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
var Nu = class extends R {
	static {
		this.tagName = "media-title";
	}
	#e = new au();
	#t = new P(this, O, wi);
	#n = new P(this, O, xi);
	connectedCallback() {
		super.connectedCallback();
	}
	update(e) {
		super.update(e);
		let t = this.#t.value;
		if (!t) return;
		let n = this.#e.getState(t, this.#n.value);
		this.textContent !== n.title && (this.textContent = n.title), this.hidden = n.hidden, G(this, n, ou);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/title.js
o(Nu);
// node_modules/@videojs/html/dist/default/ui/controls/context.js
var Pu = t(Symbol("@videojs/controls")), Fu = class extends R {
	constructor(...e) {
		super(...e), this.visibility = ss.defaultProps.visibility, this.#e = new ss(), this.#t = new P(this, O, xi), this.#n = new A(this, { context: Pu }), this.#r = !0;
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
		G(this, t, cs), this.#n.setValue({
			state: t,
			stateAttrMap: cs
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
var Iu = class extends R {
	connectedCallback() {
		super.connectedCallback(), this.#e();
	}
	update(e) {
		super.update(e), this.#e();
	}
	#e() {
		let e = this.consumer.value;
		e && G(this, e.state, e.stateAttrMap);
	}
}, Lu = class extends Iu {
	constructor(...e) {
		super(...e), this.consumer = new j(this, {
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
		super(...e), this.consumer = new j(this, {
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
		this.#e = e, this.#t = t, this.#n = n.value, this.#r = new j(e, {
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
		return e ? na(e).getShortcut(this.#t, this.#n?.()) : {};
	}
	hostConnected() {
		this.#a(this.#r.value?.container);
	}
	hostDisconnected() {
		this.#o();
	}
	#a(e) {
		if (this.#o(), !e) return;
		let t = na(e), n = () => {
			this.#e.requestUpdate();
		};
		this.#i = t.subscribeShortcutChanges(n), n();
	}
	#o() {
		this.#i?.(), this.#i = null;
	}
}, Bu = class extends R {
	constructor(...e) {
		super(...e), this.disabled = !1, this.label = "", this.hotkeyAction = void 0, this.#e = null, this.#t = null, this.#r = new q(this, K);
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
		let e = oa({
			onActivate: (e, t) => this.handleActivate(e, t),
			isDisabled: () => this.getIsButtonDisabled()
		});
		W(this, e, { signal: this.#e.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#e?.abort(), this.#e = null;
	}
	getLabel() {
		return this.core.state.current.label ? ni(this.core.state.current.label) : void 0;
	}
	getShortcut() {
		return this.#t?.shortcut;
	}
	getResolvedLabel() {
		let e = this.mediaState.value;
		if (!e) return;
		this.core.setMedia(e);
		let t = this.core.getState();
		return this.core.getTooltipLabel ? V(this.core.getTooltipLabel(t), this.#r.value) : V(this.core.getLabel(t), this.#r.value, this.core.getLabelParams?.(t));
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
		ri(r["aria-label"]) && (r["aria-label"] = V(r["aria-label"], this.#r.value, this.core.getLabelParams?.(n))), W(this, {
			...r,
			"aria-keyshortcuts": this.#t?.aria,
			...Vu(n) && this.reflectsHidden() && { hidden: n.hidden ? "" : void 0 }
		}), G(this, n, this.stateAttrMap);
		for (let [e, t] of Object.entries(this.core.getCSSVars?.(n) ?? {})) this.style.setProperty(e, t);
	}
	reflectsHidden() {
		return !0;
	}
	#i() {
		let e = this.getShortcut();
		e !== this.#n && (this.#n = e, this.dispatchEvent(new CustomEvent(ia)));
	}
};
function Vu(e) {
	return S(e) && i(e.hidden);
}
// node_modules/@videojs/html/dist/default/ui/play-button/element.js
var Hu = class extends Bu {
	constructor(...e) {
		super(...e), this.core = new hc(), this.stateAttrMap = gc, this.mediaState = new P(this, O, Ei), this.hotkeyAction = "togglePaused";
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
		super(...e), this.seconds = Gc.defaultProps.seconds, this.core = new Gc(), this.stateAttrMap = Kc, this.mediaState = new P(this, O, Ai), this.hotkeyAction = "seekStep";
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
		super(...e), this.core = new sc(), this.stateAttrMap = lc, this.mediaState = new P(this, O, ji), this.hotkeyAction = "toggleMuted";
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
	#t = new oo();
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
var Ju = class extends R {
	constructor(...e) {
		super(...e), this.open = Tc.defaultProps.open, this.defaultOpen = Tc.defaultProps.defaultOpen, this.side = Tc.defaultProps.side, this.align = Tc.defaultProps.align, this.modal = Tc.defaultProps.modal, this.closeOnEscape = Tc.defaultProps.closeOnEscape, this.closeOnOutsideClick = Tc.defaultProps.closeOnOutsideClick, this.openOnHover = Tc.defaultProps.openOnHover, this.delay = Tc.defaultProps.delay, this.closeDelay = Tc.defaultProps.closeDelay, this.boundary = "container", this.#e = new Tc(), this.#t = new j(this, {
			context: s,
			subscribe: !0
		}), this.#n = new j(this, { context: Vo }), this.#r = new Ku(this), this.#i = null, this.#a = null, this.#o = null, this.#s = null, this.#c = null;
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
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#o = new AbortController(), this.#i = ka({
			transition: Eo(),
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
		}), this.#i.setPopupElement(this), W(this, this.#i.popupProps, { signal: this.#o.signal }), this.#a ? this.#a.track(this.#i.input) : this.#a = new pe(this, this.#i.input));
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
		W(this, this.#e.getPopupAttrs(r)), G(this, r, Ec), r.open ? At(this) : jt(this), this.#c && W(this.#c, this.#e.getTriggerAttrs(r, this.id)), r.open ? this.#r.sync({
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
		e !== this.#c && (this.#r.cleanup(), this.#u(), this.#c = e, this.#i?.setTriggerElement(e), e && this.#i && (this.#s = new AbortController(), W(e, this.#i.triggerProps, { signal: this.#s.signal })));
	}
	#u() {
		this.#c && W(this.#c, {
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
	#t = new P(this, O, ji);
	update(e) {
		super.update(e), this.#e.setProps(this), this.#e.setInput({
			active: this.hasAttribute("data-open"),
			status: this.hasAttribute("data-starting-style") ? "starting" : this.hasAttribute("data-ending-style") ? "ending" : "idle"
		}), this.#e.setMedia(this.#t.value ?? Yu);
		let t = this.#e.getState();
		G(this, t, vu), this.hidden = t.hidden, t.hidden && (this.close(), this.triggerElement && W(this.triggerElement, {
			"aria-expanded": void 0,
			"aria-haspopup": void 0,
			"aria-controls": void 0
		}));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-popover.js
o(Xu);
// node_modules/@videojs/html/dist/default/ui/slider/context.js
var Zu = t(Symbol("@videojs/slider")), Qu = class extends R {
	constructor(...e) {
		super(...e), this.label = "", this.step = wu.defaultProps.step, this.largeStep = wu.defaultProps.largeStep, this.wheelStep = wu.defaultProps.wheelStep, this.orientation = wu.defaultProps.orientation, this.disabled = wu.defaultProps.disabled, this.thumbAlignment = wu.defaultProps.thumbAlignment, this.#e = new wu(), this.#t = new P(this, O, xi), this.#n = new A(this, { context: Zu }), this.#r = new P(this, O, ji), this.#i = new q(this, K), this.#a = null, this.#o = null, this.#s = null;
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
		this.#a = lo({
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
		let a = jo({
			isDisabled: t,
			getPercent: n,
			getStepPercent: () => this.#e.getWheelStepPercent(),
			onValueChange: (e) => this.#r.value?.setVolume(this.#e.rawValueFromPercent(e) / 100)
		});
		W(this, this.#a.rootProps, { signal: e }), W(this, a, { signal: e }), lt(this, this.#a.rootStyle), this.#a.input.subscribe(() => this.requestUpdate(), { signal: e });
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
		let n = this.#e.getState(), r = fo(this.#a.adjustForAlignment(n)), i = this.#e.getAttrs(n);
		lt(this, r), G(this, n, Tu), W(this, { hidden: n.hidden ? "" : void 0 }), this.#n.setValue({
			state: n,
			stateAttrMap: Tu,
			pointerValue: this.#e.valueFromPercent(n.pointerPercent),
			thumbAttrs: {
				...i,
				"aria-label": V(i["aria-label"], this.#i.value),
				"aria-valuetext": V(i["aria-valuetext"], this.#i.value, this.#e.getValueTextParams(n))
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
var $u = class extends R {
	constructor(...e) {
		super(...e), this.label = "", this.changeThrottle = Ql.defaultProps.changeThrottle, this.step = Ql.defaultProps.step, this.largeStep = Ql.defaultProps.largeStep, this.orientation = Ql.defaultProps.orientation, this.disabled = Ql.defaultProps.disabled, this.thumbAlignment = Ql.defaultProps.thumbAlignment, this.pauseOnDrag = Ql.defaultProps.pauseOnDrag, this.#e = new Ql(), this.#t = new P(this, O, xi), this.#n = new A(this, { context: Zu }), this.#r = new P(this, O, Ai), this.#i = new P(this, O, bi), this.#a = new P(this, O, Ei), this.#o = go(uo.fill), this.#s = new q(this, K), this.#c = {}, this.#l = null, this.#u = null, this.#d = null;
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
		this.#l = lo({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled: () => {
				let e = this.#r.value, t = this.#i.value;
				return this.disabled || !e || !Zt({
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
		}), W(this, this.#l.rootProps, { signal: e }), lt(this, this.#l.rootStyle), this.#l.input.subscribe(() => this.requestUpdate(), { signal: e }), this.#o.state.subscribe(() => this.requestUpdate(), { signal: e });
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
		this.toggleAttribute("data-playing", Qt(this.#a.value) && !i.disabled && !i.dragging && !i.seeking && a === void 0);
		let o = a === void 0 || i.dragging || i.disabled ? i : {
			...i,
			fillPercent: a
		}, s = po(this.#l.adjustForAlignment(o)), c = Object.fromEntries(Object.entries(s).filter(([e, t]) => this.#c[e] !== t));
		lt(this, c), this.#c = s;
		let l = this.#e.getAttrs(i);
		G(this, i, $l), this.#n.setValue({
			state: i,
			stateAttrMap: $l,
			pointerValue: this.#e.rawValueFromPercent(i.pointerPercent),
			thumbAttrs: {
				...l,
				"aria-label": V(l["aria-label"], this.#s.value),
				"aria-valuetext": V(l["aria-valuetext"], this.#s.value, this.#e.getValueTextParams(i))
			},
			thumbProps: this.#l.thumbProps,
			formatValue: (e) => Qc(e, i.duration, { locale: this.#s.locale })
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-slider.js
o($u);
// node_modules/@videojs/html/dist/default/ui/time-slider/chapters.js
var ed = class extends R {
	static {
		this.tagName = "media-time-slider-chapters";
	}
	#e = new dl();
	#t = new nu();
	#n = new j(this, {
		context: Zu,
		subscribe: !0
	});
	#r = new P(this, O, ki);
	#i = new P(this, O, bi);
	#a = new P(this, O, Ai);
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = !1;
	connectedCallback() {
		super.connectedCallback(), this.setAttribute("aria-hidden", "true");
	}
	update(e) {
		super.update(e);
		let t = this.#n.value, n = this.#a.value?.duration ?? 0, r = this.#l();
		if (!t || (G(this, t.state, t.stateAttrMap), !r)) return;
		let { chapters: i, ranges: a, max: o } = this.#t.getRanges(this.#r.value?.chaptersCues ?? [], 0, n), s = this.#e.getGeometry({
			ranges: a,
			min: 0,
			max: o,
			orientation: t.state.orientation
		}), c = this.#i.value?.buffered ?? [], l = c.length ? c[c.length - 1][1] : 0, u = /* @__PURE__ */ new Map();
		for (let e of s) {
			let n = this.#t.getState(this.#e.getState(e, t.state, t.pointerValue), i, l), a = this.#o.get(n.key);
			a ||= Lt(r, this.ownerDocument), this.#u(a, "pointer-events", n.cue ? void 0 : "none"), this.#u(a, iu.start, n.startPercent), this.#u(a, iu.end, n.endPercent), this.#u(a, iu.width, n.width ?? n.height), this.#u(a, iu.fill, `${n.fillPercent}%`), this.#u(a, iu.buffer, `${n.bufferPercent}%`), G(a, t.state, t.stateAttrMap), G(a, n, ru), u.set(n.key, a);
		}
		for (let [e, t] of this.#o) u.has(e) || t.remove();
		let d = null;
		for (let e of [...u.values()].reverse()) (e.parentNode !== this || e.nextSibling !== d) && this.insertBefore(e, d), d = e;
		this.#o.clear();
		for (let [e, t] of u) this.#o.set(e, t);
	}
	#l() {
		if (this.#c) return this.#s;
		let e = Ft(this);
		if (!e) {
			for (let e of [...this.childNodes]) e.remove();
			return null;
		}
		this.#c = !0;
		let t = It(e);
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
var td = class extends R {
	static {
		this.tagName = "media-time-slider-chapter-title";
	}
	#e = new nu();
	#t = new j(this, {
		context: Zu,
		subscribe: !0
	});
	#n = new P(this, O, ki);
	#r = new P(this, O, Ai);
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
		super(...e), this.consumer = new j(this, {
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
		super(...e), this.consumer = new j(this, {
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
		super(...e), this.consumer = new j(this, {
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
var ad = class extends R {
	static {
		this.tagName = "media-slider-thumb";
	}
	#e = new j(this, {
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
		t && (!this.#n && this.#t && (W(this, t.thumbProps, { signal: this.#t.signal }), this.#n = !0), W(this, t.thumbAttrs), G(this, t.state, t.stateAttrMap));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-thumb.js
o(ad);
// node_modules/@videojs/html/dist/default/ui/slider/preview.js
var od = class extends R {
	constructor(...e) {
		super(...e), this.overflow = "clamp", this.#e = new j(this, {
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
		lt(this, mo(this.#n, this.overflow));
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		t && G(this, t.state, t.stateAttrMap), this.#r();
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
var ud = class extends R {
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
		super(), this.time = 0, this.#e = new So(), this.#t = this.attachShadow({ mode: "open" }), this.#n = ld(), this.#r = new MutationObserver(() => this.requestUpdate()), this.#i = new MutationObserver(() => this.requestUpdate()), this.#a = new P(this, O, ki), this.#o = null, this.#s = null, this.#c = /* @__PURE__ */ new Set(), this.#l = [], this.#f = null;
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
		super.connectedCallback(), this.destroyed || (this.#f = Co({
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
			W(this, this.#e.getAttrs(e)), G(this, e, Al);
			return;
		}
		let i = this.#f, a = this.#e.getState(i?.loading ?? !1, i?.error ?? !1, n);
		if (W(this, this.#e.getAttrs(a)), G(this, a, Al), i?.naturalWidth && i.naturalHeight) {
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
		W(e, n);
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
	#e = new j(this, {
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
var fd = class extends R {
	constructor(...e) {
		super(...e), this.type = "current", this.#e = new j(this, {
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
		this.textContent = t.formatValue ? t.formatValue(n, this.type) : String(Math.round(n)), G(this, t.state, t.stateAttrMap);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/slider-value.js
o(fd);
// node_modules/@videojs/html/dist/default/ui/time/element.js
var pd = class extends R {
	constructor(...e) {
		super(...e), this.type = Yl.defaultProps.type, this.negativeSign = Yl.defaultProps.negativeSign, this.label = "", this.toggle = Yl.defaultProps.toggle, this.#e = new Yl(), this.#t = new P(this, O, Ai), this.#n = new P(this, O, bi), this.#r = new q(this, K), this.#i = document.createElement("span"), this.#a = new Text(), this.#o = null, this.#s = !1, this.#c = Yl.defaultProps.type, this.#u = (e) => {
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
		let r = this.#e.getAttrs(n, this.type), i = V(r["aria-label"], this.#r.value, this.#l(n)), a = r["aria-description"] ? V(r["aria-description"], this.#r.value) : void 0;
		W(this, {
			"aria-label": i,
			"aria-description": a,
			"aria-disabled": r["aria-disabled"],
			role: this.toggle ? r.role : "time",
			tabIndex: r.tabIndex,
			datetime: this.toggle || n.unavailable ? void 0 : n.datetime
		}), G(this, n, Xl);
	}
	#l(e) {
		if (!this.#e.getLabelParams(e)) return;
		let t = el(Math.abs(e.seconds), { locale: this.#r.locale }), n = {
			current: Il,
			duration: Ll,
			remaining: Rl
		}[e.type];
		return { duration: V(n, this.#r.value, { duration: t }) };
	}
	#u;
	#d;
	#f() {
		this.#c = this.type === "current" ? this.#c === "remaining" ? "current" : "remaining" : this.#c === "duration" ? "remaining" : "duration", this.requestUpdate();
	}
	#p() {
		let e = this.#t.value;
		return e ? Zt({
			...e,
			seekable: this.#n.value?.seekable ?? []
		}) : !1;
	}
	#m() {
		!this.toggle || !this.#o || this.#s || (this.#s = !0, W(this, {
			onClick: this.#u,
			onKeyDown: this.#d
		}, { signal: this.#o.signal }));
	}
	#h() {
		W(this, {
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
var md = class extends R {
	static {
		this.tagName = "media-time-group";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/time-group.js
o(md);
// node_modules/@videojs/html/dist/default/ui/time/separator.js
var hd = class extends R {
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
var gd = t(Symbol("@videojs/radio-group")), _d = Symbol("@videojs/menu"), vd = Symbol("@videojs/menu-group"), yd = t(_d), bd = t(vd), xd = class extends R {
	constructor(...e) {
		super(...e), this.open = ec.defaultProps.open, this.defaultOpen = ec.defaultProps.defaultOpen, this.side = ec.defaultProps.side, this.align = ec.defaultProps.align, this.closeOnEscape = ec.defaultProps.closeOnEscape, this.closeOnOutsideClick = ec.defaultProps.closeOnOutsideClick, this.boundary = "container", this.#e = new ec(), this.#t = new A(this, { context: yd }), this.#n = new Ku(this), this.#r = new P(this, O, xi), this.#i = new j(this, {
			context: s,
			subscribe: !0
		}), this.#a = new j(this, { context: Vo }), this.#o = null, this.#s = null, this.#c = null, this.#l = null, this.#u = null, this.#d = null, this.#f = !1, this.#p = !1, this.#m = null, this.#h = /* @__PURE__ */ new Map(), this.#g = null, this.#v = (e) => {
			this.#o?.contentProps.onFocusOut(e);
		}, this.#b = (e, t) => {
			let n = this.#h.get(e);
			t && Sd(n, t) || (t || n) && (t ? this.#h.set(e, t) : this.#h.delete(e), this.#g = $s(this.#h.values()), (this.#g?.disabled || this.#g?.hidden) && this.open && this.close("imperative-action"), this.#x(this.#d));
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
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#l = new AbortController(), this.#s = Va(), this.#s.setElement(this), this.#o = Ra({
			transition: Eo(),
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
		}), this.#o.setPopupElement(this), W(this, { onFocusOut: this.#v }, { signal: this.#l.signal }), this.#c ? this.#c.track(this.#o.input) : this.#c = new pe(this, this.#o.input));
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
		if (this.#y(r), W(this, this.#e.getPopupAttrs()), G(this, n, za), n.open ? At(this) : jt(this), this.#d && (W(this.#d, this.#e.getTriggerAttrs(n, this.#o.contentElement?.id)), this.#x(this.#d)), !n.open) this.#n.cleanup();
		else {
			this.#s.sync();
			let e = Pa(n.side, n.align);
			e && this.#d && this.#n.sync({
				anchorName: this.id,
				position: e,
				trigger: this.#d,
				boundary: this.boundary,
				container: this.#i.value?.container ?? null,
				cssVars: Fa,
				trackResize: !1,
				onSideChange: (e) => this.setAttribute(za.side, e)
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
		e !== this.#d && (this.#n.cleanup(), this.#S(), this.#d = e, this.#f = e ? Cd(e) : !1, this.#p = e?.hidden === !0, this.#o?.setTriggerElement(e), e && this.#o && (this.#u = new AbortController(), W(e, this.#o.triggerProps, { signal: this.#u.signal }), this.#x(e)));
	}
	#b;
	#x(e) {
		if (!e) return;
		W(e, {
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
			W(this.#d, {
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
var wd = 0, Td = class e extends R {
	constructor(...e) {
		super(...e), this.open = !1, this.defaultOpen = !1, this.#e = new j(this, {
			context: yd,
			subscribe: !0
		}), this.#t = new A(this, { context: yd }), this.#n = new ec(), this.#r = `vjs-menu-content-${wd++}`, this.#i = null, this.#a = null, this.#o = null, this.#s = null, this.#c = !1, this.#l = null, this.#u = null, this.#d = null, this.#f = /* @__PURE__ */ new Map(), this.#p = Symbol("menu"), this.#m = null, this.#h = null, this.#g = null, this.#_ = !1, this.#v = !1, this.#y = !1, this.#b = !1, this.#T = (e) => {
			let t = Na(e), n = e.defaultPrevented;
			this.#a?.contentProps.onKeyDown(e), this.#o && (e.key === "ArrowLeft" || e.key === "Escape") && !n && (e.preventDefault(), this.#a?.close("escape")), e.key !== "Escape" && t && e.stopPropagation();
		}, this.#E = (e) => {
			this.#a?.contentProps.onFocusOut(e);
		}, this.#D = (e, t) => {
			let n = this.#f.get(e);
			t && Ed(n, t) || (t || n) && (t ? this.#f.set(e, t) : this.#f.delete(e), this.#m = $s(this.#f.values()), (this.#m?.disabled || this.#m?.hidden) && this.open && this.#o && this.close("imperative-action"), this.#k(this.#C()), this.#h?.setOptionState(this.#p, this.#m));
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
		super.connectedCallback(), this.#b || (this.#l = new AbortController(), W(this, {
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
		W(this, {
			...this.#n.getContentAttrs(),
			hidden: !u
		}), G(this, l, Ba), r && (s.setTriggerElement(r), W(r, this.#n.getTriggerAttrs(l, u ? this.id : void 0)), this.#k(r)), o && u && !this.#y && s.highlightInitialItem({ preventScroll: !0 }), this.#y = u, this.#i = {
			core: this.#n,
			menu: s,
			popup: n.popup,
			state: l,
			setOptionState: this.#D
		}, this.#t.setValue(this.#i), n.popup.sync(), this.#w();
	}
	#x(e, t) {
		if (t !== null) {
			this.#c = !0, this.#a = Ra({
				transition: Eo(),
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
		W(e, {
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
		W(e, {
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
var Od = class extends R {
	constructor(...e) {
		super(...e), this.value = "", this.disabled = !1, this.#e = new j(this, {
			context: yd,
			subscribe: !0
		}), this.#t = new j(this, {
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
		this.#r || (this.#r = !0, this.#i = t.menu.registerItem(this), W(this, {
			onClick: () => {
				let e = this.#e.value, t = this.#t.value;
				e && t && !this.disabled && (t.onValueChange(this.value), La(e.menu));
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
		W(this, {
			role: "menuitemradio",
			"aria-checked": String(r),
			"aria-disabled": this.disabled ? "true" : void 0
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-radio-item.js
o(Od);
// node_modules/@videojs/html/dist/default/ui/radio-group/element.js
var kd = class extends R {
	constructor(...e) {
		super(...e), this.value = "", this.#e = new A(this, { context: gd });
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
		this.#e = e, this.#t = new A(e, {
			context: bd,
			initialValue: this.#n
		});
	}
	applyProps() {
		let e = this.#e.getAttribute("aria-labelledby") ?? void 0, t = e !== void 0 && e !== this.#i;
		this.#e.hasAttribute("aria-label") || t ? (this.#i && e === this.#i && this.#e.removeAttribute("aria-labelledby"), this.#i = void 0, W(this.#e, { role: "group" })) : (this.#i = this.#r, W(this.#e, {
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
	#t = new j(this, {
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
var Md = class extends R {
	constructor(...e) {
		super(...e), this.disabled = !1, this.commandfor = void 0, this.#e = new j(this, {
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
		this.#n !== t.menu && (this.#r?.(), this.#n = t.menu, this.#r = t.menu.registerItem(this), W(this, {
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
					La(t.menu);
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
		W(this, {
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
var Nd = class extends R {
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
		W(this, {
			"aria-hidden": "true",
			hidden: t
		});
	}
};
// node_modules/@videojs/html/dist/default/define/ui/menu-item-indicator.js
o(Nd);
// node_modules/@videojs/html/dist/default/ui/menu/group-label.js
var Pd = 0, Fd = class extends R {
	static {
		this.tagName = "media-menu-group-label";
	}
	#e = new j(this, {
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
		this.#e.value = e.value, W(this.#e, {
			"aria-disabled": e.disabled ? "true" : void 0,
			hidden: e.hidden ? "" : void 0
		});
		let r = Ft(this.#e), i = r ? It(r) : null, o = i?.localName === Od.tagName ? i : null, s = `${e.options.map((e) => `${e.value}:${Id(e.label, e.labelParams)}:${Id(e.ariaLabel ?? "", e.ariaLabelParams)}:${this.#t.getOptionCacheKey?.(e) ?? ""}`).join("|")}::${n}::${r?.innerHTML ?? ""}`;
		if (s !== this.#n || t !== this.#r) {
			this.#n = s, this.#r = t;
			let n = [...this.#e.children].filter((e) => e !== r), i = this.#o()?.value, c = e.options.map((e) => {
				let n = o ? Lt(o, this.#e.ownerDocument) : this.#e.ownerDocument.createElement(Od.tagName);
				n.value = e.value, this.#t.setItemAttributes?.(n, e);
				let r = V(e.label, t, e.labelParams);
				return this.#t.renderItem ? this.#t.renderItem(n, r, e) : this.#s(n, r), a(e.ariaLabel) || n.setAttribute("aria-label", V(e.ariaLabel, t, e.ariaLabelParams)), n;
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
		super(...e), this.disabled = !1, this.rates = void 0, this.formatRate = Cc.defaultProps.formatRate, this.#e = new Cc(), this.#t = new q(this, K), this.#n = new P(this, O, Di), this.#r = new Ld(this, {
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
		}), this.#e.setMedia(t), n = this.#e.getState(), this.applyDefaultAriaLabel(V(this.#e.getLabel(n), this.#t.value, this.#e.getLabelParams(n))), this.#r.sync(n, this.#t.value, this.#t.locale), this.publishMenuOptionState(n.disabled, n.hidden, n.availability)) : this.publishMenuOptionState(!0, !0, "unsupported"), super.update(e), n && G(this, n, wc);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/playback-rate-radio-group.js
o(Rd);
// node_modules/@videojs/html/dist/default/ui/quality-radio-group/element.js
var zd = class extends jd {
	constructor(...e) {
		super(...e), this.disabled = !1, this.label = "", this.formatRendition = Bc.defaultProps.formatRendition, this.#e = new Bc(), this.#t = new q(this, K), this.#n = new P(this, O, Oi), this.#r = new Ld(this, {
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
		}), this.#e.setMedia(t), n = this.#e.getState(), this.applyDefaultAriaLabel(V(this.#e.getLabel(n), this.#t.value)), this.#r.sync(n, this.#t.value, this.#t.locale), this.publishMenuOptionState(n.disabled, n.hidden, n.availability)) : this.publishMenuOptionState(!0, !0, "unsupported"), super.update(e), n && G(this, n, Vc);
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
		super(...e), this.commandfor = void 0, this.rates = void 0, this.core = new yc(), this.stateAttrMap = bc, this.mediaState = new P(this, O, Di), this.hotkeyAction = "speedUp";
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
		super.update(e), this.mediaState.value && this.commandfor && W(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 });
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
		super(...e), this.commandfor = void 0, this.menuFor = void 0, this.#e = void 0, this.core = new ns(), this.stateAttrMap = is, this.mediaState = new P(this, O, ki), this.hotkeyAction = "toggleSubtitles";
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
		t && (this.#t(t), this.menuFor && Hd(t) > 1 && W(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 }));
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
		super(...e), this.core = new pc(), this.stateAttrMap = mc, this.mediaState = new P(this, O, Ti), this.hotkeyAction = "togglePictureInPicture";
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
		super(...e), this.core = new Ps(), this.stateAttrMap = Fs, this.mediaState = new P(this, O, Ci), this.hotkeyAction = "toggleFullscreen", this.#e = new j(this, {
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
var Jd = class e extends R {
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
}, Yd = class e extends R {
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
var Zd = class extends R {
	constructor(...e) {
		super(...e), this.open = su.defaultProps.open, this.defaultOpen = su.defaultProps.defaultOpen, this.side = su.defaultProps.side, this.align = su.defaultProps.align, this.delay = su.defaultProps.delay, this.closeDelay = su.defaultProps.closeDelay, this.disableHoverablePopup = su.defaultProps.disableHoverablePopup, this.disabled = su.defaultProps.disabled, this.sticky = su.defaultProps.sticky, this.boundary = "container", this.trigger = "", this.#e = new su(), this.#t = new q(this, K), this.#n = new j(this, { context: Kd }), this.#r = new j(this, {
			context: s,
			subscribe: !0
		}), this.#i = new j(this, { context: Vo }), this.#a = new Ku(this), this.#o = null, this.#s = null, this.#c = null, this.#l = null, this.#u = null;
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
		super.connectedCallback(), this.destroyed || (this.setAttribute(Dc, ""), this.#c = new AbortController(), this.#o = To({
			transition: Eo(),
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
		}), this.#o.setPopupElement(this), W(this, this.#o.popupProps, { signal: this.#c.signal }), this.#s ? this.#s.track(this.#o.input) : this.#s = new pe(this, this.#o.input));
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
		W(this, this.#e.getPopupAttrs(r)), G(this, r, cu), r.open ? At(this) : jt(this), r.open ? this.#a.sync({
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
		e !== this.#u && (this.#a.cleanup(), this.#m(), this.#u = e, this.#o?.setTriggerElement(e), e && this.#o && (this.#l = new AbortController(), W(e, this.#o.triggerProps, { signal: this.#l.signal }), Xd(e) && (this.#f(e), e.$state.subscribe(() => this.#f(e), { signal: this.#l.signal }), h(e, ia, () => this.#f(e), { signal: this.#l.signal }))));
	}
	#f(e) {
		let t = e.getLabel(), n = r(e.getResolvedLabel) ? e.getResolvedLabel() : void 0;
		n === void 0 && t && (n = V(t, this.#t.value));
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
var Qd = class extends R {
	constructor(...e) {
		super(...e), this.delay = lu.defaultProps.delay, this.closeDelay = lu.defaultProps.closeDelay, this.timeout = lu.defaultProps.timeout, this.#e = new lu(), this.#t = new A(this, {
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
var $d = class extends R {
	constructor(...e) {
		super(...e), this.delay = Zo.defaultProps.delay, this.#e = new Zo(), this.#t = new P(this, O, Ei), this.#n = null;
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
		t && (this.#e.update(t), G(this, this.#e.state.current, Qo));
	}
};
// node_modules/@videojs/html/dist/default/define/ui/buffering-indicator.js
o($d);
// node_modules/@videojs/html/dist/default/ui/input-indicator/element.js
var ef = class extends R {
	constructor(...e) {
		super(...e), this.player = new P(this, O), this.container = new j(this, {
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
		if (!_a(t, n)) {
			this.liveIndicator.remove();
			return;
		}
		let r = va(t, this.#s(), n);
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
		let t = Ca(e), n = this.#o();
		this.#n = t.register(n), this.#t = xa(e, (e) => {
			this.core.processEvent(e, ba(this.player.value)) && t.show(n);
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
		return this.#e.hidden = !1, G(this.#e, e, this.#t), this.#n(this.#e, e), this.#e;
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
	#e = new q(this, K);
	#t = new sl();
	#n = Eo();
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
var af = class extends R {
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
	#e = new q(this, K);
	#t = new Ol();
	#n = Eo();
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
			labels: Zs(this.#e.value),
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
var lf = class extends R {
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
	#e = new q(this, K);
	#t = new pu();
	#n = Eo();
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
			labels: Zs(this.#e.value)
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
var ff = class extends R {
	static {
		this.tagName = "media-volume-indicator-fill";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-indicator-fill.js
o(ff);
// node_modules/@videojs/html/dist/default/ui/volume-indicator/value.js
var pf = class extends R {
	static {
		this.tagName = "media-volume-indicator-value";
	}
};
// node_modules/@videojs/html/dist/default/define/ui/volume-indicator-value.js
o(pf);
// node_modules/@videojs/html/dist/default/ui/hotkey/element.js
var mf = class extends R {
	constructor(...e) {
		super(...e), this.keys = "", this.action = "", this.value = void 0, this.disabled = !1, this.target = "player", this.#e = new P(this, O), this.#t = new j(this, {
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
		let n = Ui(this.action);
		if (!n) return;
		let { value: r, action: i } = this;
		this.#n = ra(t, {
			keys: this.keys,
			action: i,
			value: r,
			target: this.target,
			disabled: this.disabled,
			repeatable: !Vi(i),
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
var hf = class extends R {
	constructor(...e) {
		super(...e), this.type = "", this.action = "", this.value = void 0, this.pointer = void 0, this.region = void 0, this.disabled = !1, this.#e = new P(this, O), this.#t = new j(this, {
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
		let n = Pi(this.action);
		if (!n) return;
		let { value: r, region: i } = this, a = En(this.action, i, r), o, s = (t) => {
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
		this.type === "doubletap" ? this.#n = Bi(t, s, c) : this.type === "tap" && (this.#n = zi(t, s, c));
	}
	#i() {
		this.#n?.(), this.#n = null;
	}
};
// node_modules/@videojs/html/dist/default/define/ui/gesture.js
o(hf);
// node_modules/@videojs/html/dist/default/ui/status-announcer/element.js
var gf = class extends R {
	static {
		this.tagName = "media-status-announcer";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#e = new q(this, K);
	#t = new wl();
	#n = null;
	#r = new j(this, {
		context: O,
		callback: (e) => this.#s(e),
		subscribe: !0
	});
	#i = new j(this, {
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
			shouldAnnounce: () => vo(this.#i.value?.container)
		});
	}
	update(e) {
		super.update(e);
		let t = this.#t.state.current.label, n = this.#c();
		t === null ? n.replaceChildren() : n.replaceChildren(document.createTextNode(t));
	}
	#s(e = this.#r.value) {
		this.#n?.(), this.#n = null, e ? this.#n = _o(e, this.#t) : this.#t.resetSnapshot();
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
var bf = class extends R {
	static {
		this.tagName = "media-error-dialog";
	}
	#e = new ls();
	#t = new A(this, { context: _f });
	#n = `vjs-error-dialog-popup-${vf++}`;
	#r = `vjs-error-dialog-title-${vf++}`;
	#i = `vjs-error-dialog-desc-${vf++}`;
	#a = new P(this, O, Si);
	#o = new q(this, K);
	#s = new j(this, {
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
		super.connectedCallback(), this.destroyed || (this.#c = da({
			transition: Eo(),
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
		G(this, n, us), this.#t.setValue({
			state: n,
			stateAttrMap: us,
			dialog: this.#c,
			popupId: this.#n,
			popupAttrs: this.#e.getPopupAttrs(n),
			close: () => this.#c?.close()
		});
	}
	#h(e) {
		let t = this.#o.value, n = this.querySelector("media-dialog-title");
		n && !this.#g(n) && (n.textContent = V(Ds(), t));
		let r = this.querySelector("media-dialog-description");
		if (r && !this.#g(r)) {
			let n = e ? As(e) : null;
			n && (this.#f = n), r.textContent = V((n ?? this.#f) || ks(), t);
		}
		let i = this.querySelector("media-dialog-close");
		i && !this.#g(i) && (i.textContent = V(Os(), t));
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
		super(...e), this.consumer = new j(this, {
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
		super(...e), this.consumer = new j(this, {
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
		t && (this.#e !== t.dialog && (this.#e?.setPopupElement(null), this.#e = t.dialog, this.#e.setPopupElement(this)), W(this, {
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
		super(...e), this.consumer = new j(this, {
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
		super(...e), this.consumer = new j(this, {
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
var Tf = class extends R {
	constructor(...e) {
		super(...e), this.disabled = !1, this.#e = new j(this, {
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
		let e = oa({
			onActivate: () => this.#e.value?.close(),
			isDisabled: () => this.disabled
		});
		W(this, e, { signal: this.#t.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.#t?.abort(), this.#t = null;
	}
	update(e) {
		super.update(e);
		let t = this.#e.value;
		t && G(this, t.state, t.stateAttrMap);
	}
};
// node_modules/@videojs/html/dist/default/define/ui/dialog-close.js
o(Tf);
// src/line10/icons.js
var X = (e, t = "") => `<svg class="l10-icon ${t}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e}</svg>`, Z = {
	play: (e) => X("<path class=\"l10-solid\" d=\"M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z\"/>", e),
	pause: (e) => X("<rect class=\"l10-solid\" x=\"6.5\" y=\"5\" width=\"4\" height=\"14\" rx=\"1.2\"/><rect class=\"l10-solid\" x=\"13.5\" y=\"5\" width=\"4\" height=\"14\" rx=\"1.2\"/>", e),
	link: (e) => X("<path d=\"M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1\"/><path d=\"M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1\"/>", e),
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
      <media-menu-content class="l10-menu-content" id="${e("m-st")}">${Kf("Stations")}<div class="l10-menu-group l10-stlist"></div><div class="l10-menu-rule" aria-hidden="true"></div><media-menu-item class="l10-menu-item l10-share">${Z.link("l10-menu-ico")}<span class="l10-menu-text">Copy link to this stop</span></media-menu-item></media-menu-content>
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
                    <div class="l10-menu-rule" aria-hidden="true"></div><media-menu-item class="l10-menu-item l10-share">${Z.link("l10-menu-ico")}<span class="l10-menu-text">Copy link to this stop</span></media-menu-item>
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

    <!-- A short note: where a ride continued from, or that a link was copied. -->
    <div class="l10-toast">
      <span class="l10-toast-text" role="status"></span>
      <button type="button" class="l10-toast-btn" id="${n("over")}" aria-keyshortcuts="R" hidden>${Z.restart()}<span>Start over</span></button>
      ${$(n("over"), ["R"], { label: "Start over" })}
    </div>

    <div class="l10-indicators" aria-hidden="true">
      <media-seek-indicator class="l10-ind"><media-seek-indicator-value class="l10-ind-value"></media-seek-indicator-value></media-seek-indicator>
      <media-volume-indicator class="l10-ind l10-ind-vol">
        <span class="l10-ind-gauge"><media-volume-indicator-fill class="l10-ind-fill"></media-volume-indicator-fill></span>
        <media-volume-indicator-value class="l10-ind-value"></media-volume-indicator-value>
      </media-volume-indicator>
      <media-status-indicator class="l10-ind"><media-status-indicator-value class="l10-ind-value"></media-status-indicator-value></media-status-indicator>
    </div>

    <!-- taps on the picture: a click plays or pauses and a double click goes fullscreen; on touch a tap shows the
         controls (on phones, where they sit under the picture, it plays or pauses), and a double tap on the left or
         right third skips 5 seconds (the middle third goes fullscreen) -->
    <media-gesture type="tap" action="togglePaused" pointer="mouse"></media-gesture>
    <media-gesture type="doubletap" action="toggleFullscreen" pointer="mouse"></media-gesture>
    <media-gesture class="l10-g-controls" type="tap" action="toggleControls" pointer="touch"></media-gesture>
    <media-gesture class="l10-g-play" type="tap" action="togglePaused" pointer="touch" disabled></media-gesture>
    <media-gesture type="doubletap" action="seekStep" region="left" value="-5" pointer="touch"></media-gesture>
    <media-gesture type="doubletap" action="seekStep" region="right" value="5" pointer="touch"></media-gesture>
    <media-gesture type="doubletap" action="toggleFullscreen" region="center" pointer="touch"></media-gesture>

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
		let x = r(".l10-toast"), S = r(".l10-toast-text"), C = r(".l10-toast-btn"), w = 0, T = () => {
			x.removeAttribute("data-show"), C.hidden = !0;
		}, E = (e, { over: t = !1, ms: n = 2400 } = {}) => {
			S.innerHTML = e, C.hidden = !t, x.setAttribute("data-show", ""), clearTimeout(w), n && (w = setTimeout(T, n));
		}, D = (e) => m.find((t) => e >= t.start && e < t.end) || m[m.length - 1];
		i.querySelectorAll(".l10-share").forEach((e) => e.addEventListener("select", async () => {
			let e = D(a.currentTime || 0), t = new URL(location.href);
			t.hash = "", t.searchParams.set("t", String(Math.floor(e ? e.start : a.currentTime || 0)));
			let n = t.toString(), r = !0;
			try {
				await navigator.clipboard.writeText(n);
			} catch {
				try {
					let e = Object.assign(document.createElement("textarea"), { value: n });
					document.body.append(e), e.select(), r = document.execCommand("copy"), e.remove();
				} catch {
					r = !1;
				}
			}
			E(r ? `Link copied${e ? `<span class="l10-toast-dot">·</span><b>${Q(e.name)}</b>` : ""}` : "Couldn't copy the link"), this.dispatchEvent(new CustomEvent("line10:share", {
				bubbles: !0,
				detail: {
					url: n,
					station: e?.name
				}
			}));
		}));
		let ee = `line10:pos:${this.getAttribute("playback-id") || this.getAttribute("src") || ""}`, te = document.querySelector("line10-player") === this ? parseFloat(new URLSearchParams(location.search).get("t")) : NaN, ne = parseFloat(this.getAttribute("start")), re = !1;
		if (Number.isFinite(ne) || (ne = te), !Number.isFinite(ne) && this.getAttribute("resume") !== "off" && !this.hasAttribute("autoplay")) try {
			let e = parseFloat(localStorage.getItem(ee));
			e > 0 && (ne = e, re = !0);
		} catch {}
		let ie = () => {
			if (!Number.isFinite(ne) || !(a.duration > 0)) return;
			let e = Math.max(0, Math.min(ne, a.duration - 2));
			ne = NaN, e < 1 || (a.currentTime = e, setTimeout(() => {
				let t = D(e), n = t ? `<b>${Q(t.name)}</b><span class="l10-toast-dot">·</span>${Lf(e)}` : `<b>${Lf(e)}</b>`;
				E(`${re ? "Continued from" : "Starting at"} ${n}`, {
					over: !0,
					ms: 0
				});
			}, 350));
		};
		a.addEventListener("loadedmetadata", ie), a.readyState >= 1 && ie(), C.addEventListener("click", () => {
			a.currentTime = 0, T();
			try {
				localStorage.removeItem(ee);
			} catch {}
			i.focus({ preventScroll: !0 });
		}), a.addEventListener("playing", () => {
			C.hidden || (clearTimeout(w), w = setTimeout(T, 5e3));
		});
		let ae = () => {
			if (Number.isFinite(ne) || this.getAttribute("resume") === "off") return;
			let e = a.currentTime, t = a.duration;
			try {
				!(t > 0) || e < 5 || e > t - 8 || a.ended ? localStorage.removeItem(ee) : localStorage.setItem(ee, e.toFixed(1));
			} catch {}
		}, oe = 0;
		a.addEventListener("timeupdate", () => {
			let e = performance.now();
			e - oe > 2e3 && (oe = e, ae());
		}), a.addEventListener("pause", ae), a.addEventListener("ended", ae), window.addEventListener("pagehide", ae, n);
		let O = r(".l10-center");
		O.setAttribute("aria-hidden", "true");
		let se = () => O.querySelectorAll(".l10-btn").forEach((e) => {
			e.getAttribute("tabindex") !== "-1" && e.setAttribute("tabindex", "-1");
		});
		se(), new MutationObserver(se).observe(O, {
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
				/^r$/i.test(e.key) && !C.hidden ? (C.click(), e.preventDefault()) : ((e.key === "]" || e.key === "n") && (b(1), e.preventDefault()), (e.key === "[" || e.key === "p") && (b(-1), e.preventDefault()));
			}
		});
		let ce = () => {
			d.textContent = Ef[a.playbackRate] || "Custom", r(".l10-service-rate").textContent = `${a.playbackRate}×`;
		}, k = Pf(), A = () => {}, le = 0, j = 0, ue = !1;
		k.board && !k.boardSize && (k.boardSize = k.board), k.boardPos === "center" && (k.boardPos = "left");
		let M = {
			boardSize: "board",
			boardPos: "boardPos",
			boardStyle: "boardStyle",
			boardFlip: "boardFlip",
			capSize: "capsize",
			capColor: "capcolor",
			capBg: "capbg",
			capEdge: "capedge",
			capShadow: "capshadow"
		}, de = () => {
			for (let [e, t] of Object.entries(M)) i.dataset[t] = k[e] ?? jf[e];
			i.querySelectorAll(".l10-menu-value[data-for]").forEach((e) => {
				let t = e.dataset.for;
				e.textContent = (Of[t].find(([e]) => e === k[t]) || [])[1] || "";
			}), ue = !0, i.querySelectorAll("media-menu-radio-group[data-pref]").forEach((e) => {
				let t = k[e.dataset.pref] ?? jf[e.dataset.pref];
				e.value !== t && (e.value = t);
			}), ue = !1, fe.setAttribute("align", k.boardPos === "right" ? "end" : k.boardPos === "center" ? "center" : "start"), A();
		}, fe = r(".l10-boardmenu"), pe = (e, t) => {
			k[e] = t, Ff(k), e.startsWith("cap") && (le = Date.now() + 2600), de(), e.startsWith("cap") && (clearTimeout(j), j = setTimeout(() => A(), 2700));
		};
		i.querySelectorAll("media-menu-radio-group[data-pref]").forEach((e) => {
			e.value = k[e.dataset.pref] ?? jf[e.dataset.pref], e.addEventListener("value-change", (t) => {
				ue || k[e.dataset.pref] === t.detail.value || pe(e.dataset.pref, t.detail.value);
			});
		});
		let me = r(".l10-cspage"), he = () => me.querySelectorAll(".l10-csopt").forEach((e) => {
			let t = (k[e.dataset.k] ?? jf[e.dataset.k]) === e.dataset.v;
			e.toggleAttribute("data-checked", t), e.setAttribute("aria-label", `${e.querySelector(".l10-menu-text").textContent}${t ? ", selected" : ""}`);
		}), ge = (e) => {
			me.dataset.show = e, me.querySelectorAll(".l10-csview").forEach((t) => {
				t.hidden = t.dataset.view !== e;
			}), he();
			let t = me.querySelector(`.l10-csview[data-view="${e}"] ${e === "list" ? ".l10-csrow" : ".l10-csopt[data-checked]"}`);
			requestAnimationFrame(() => t?.focus({ preventScroll: !0 })), me.scrollTop = 0, mt();
		};
		me.addEventListener("select", (e) => {
			let t = e.target.closest(".l10-csrow, .l10-csback, .l10-csopt");
			t && (e.preventDefault(), t.classList.contains("l10-csrow") ? ge(t.dataset.k) : t.classList.contains("l10-csback") ? ge("list") : (pe(t.dataset.k, t.dataset.v), he()));
		});
		let _e = !1, ve = () => {
			_e || (_e = !0, Number.isFinite(k.volume) && (a.volume = Math.min(1, Math.max(0, k.volume))), a.muted = !!k.muted, k.rate && Ef[k.rate] && (a.playbackRate = k.rate, a.defaultPlaybackRate = k.rate), ye());
		}, ye = () => {
			let e = [...a.textTracks || []].filter((e) => e.kind === "captions" || e.kind === "subtitles"), t = e.find((e) => e.label === "English") || e[0];
			t && k.captions && t.mode !== "showing" && (t.mode = "showing");
		};
		a.addEventListener("loadedmetadata", ve), a.readyState >= 1 && ve(), a.addEventListener("volumechange", () => {
			_e && (k.volume = a.volume, k.muted = a.muted, Ff(k));
		}), a.addEventListener("ratechange", () => {
			_e && (k.rate = a.playbackRate, Ff(k));
		});
		let be = 0, xe = () => {
			be = Date.now();
		};
		r(".l10-cc").addEventListener("click", xe), i.addEventListener("keydown", (e) => {
			(e.key === "c" || e.key === "C") && xe();
		}), a.textTracks?.addEventListener?.("change", () => {
			!_e || Date.now() - be > 1500 || (k.captions = [...a.textTracks].some((e) => (e.kind === "captions" || e.kind === "subtitles") && e.mode === "showing"), Ff(k));
		});
		let Se = r(".l10-mute"), Ce = () => {
			let e = Math.round(a.volume * 100);
			Se.dataset.level = a.muted || e === 0 ? "0" : e <= 33 ? "1" : e <= 65 ? "2" : "3";
		};
		a.addEventListener("volumechange", Ce), Ce();
		let we = r(".l10-slider"), N = !1;
		we.addEventListener("pointerdown", (e) => {
			if (e.button !== 0) return;
			N = !a.paused, N && a.pause();
			let t = () => {
				n.removeEventListener("pointerup", t, !0), n.removeEventListener("pointercancel", t, !0), N && (N = !1, setTimeout(() => a.play().catch(() => {}), 0));
			}, n = we.ownerDocument.defaultView || window, r = -2, i = (e) => {
				let t = we.getBoundingClientRect(), n = a.duration;
				if (!m.length || !t.width || !Number.isFinite(n)) return;
				let i = Math.min(Math.max((e.clientX - t.left) / t.width, 0), 1) * n, o = m.findIndex((e) => i >= e.start && i < e.end);
				if (o < 0 && (o = m.length - 1), r !== -2 && o !== r) try {
					navigator.vibrate?.(9);
				} catch {}
				r = o;
			};
			if (e.pointerType === "touch" && navigator.vibrate) {
				i(e), n.addEventListener("pointermove", i, !0);
				let t = () => {
					n.removeEventListener("pointermove", i, !0), n.removeEventListener("pointerup", t, !0), n.removeEventListener("pointercancel", t, !0);
				};
				n.addEventListener("pointerup", t, !0), n.addEventListener("pointercancel", t, !0);
			}
			n.addEventListener("pointerup", t, !0), n.addEventListener("pointercancel", t, !0);
		});
		let Te = () => {
			let e = a.shadowRoot;
			if (!e || e.querySelector("style[data-l10]")) return;
			let t = document.createElement("style");
			t.dataset.l10 = "", t.textContent = "video::cue{color:transparent!important;background:transparent!important;text-shadow:none!important}", e.appendChild(t);
		};
		Te(), a.localName.includes("-") && customElements.whenDefined(a.localName).then(Te), a.addEventListener("loadedmetadata", Te);
		let Ee = r(".l10-captions"), De = r(".l10-cap-text"), Oe = (e) => e.kind === "captions" || e.kind === "subtitles";
		A = () => {
			let e = [...a.textTracks || []].find((e) => Oe(e) && e.mode === "showing"), [t, n] = Mf[k.capBrackets] || Mf.square, r = e ? [...e.activeCues || []].map((e) => (e.text || "").replace(/<[^>]+>/g, "").replace(/\[([^\]]*)\]/g, (e, r) => `${t}${r.trim()}${n}`)).join("\n") : "", i = Date.now() < le ? `${t ? `${t}music${n} ` : ""}Captions will look like this` : r;
			De.textContent = i, Ee.toggleAttribute("data-empty", !i);
		};
		let ke = (e) => {
			Oe(e) && !e._l10 && (e._l10 = !0, e.addEventListener("cuechange", A));
		};
		[...a.textTracks || []].forEach(ke), a.textTracks?.addEventListener?.("addtrack", (e) => {
			ke(e.track), _e && ye();
		});
		let Ae = () => {
			let e = [...a.textTracks || []].filter(Oe), t = e.find((e) => e.label === "English");
			if (!(!t || e.length < 2)) for (let n of e) n !== t && n.mode === "showing" && (n.mode = "disabled", t.mode = "showing");
		};
		a.textTracks?.addEventListener?.("change", () => {
			Ae(), A();
		});
		let je = r(".l10-quality"), Me = r(".l10-quality-name"), P = [...i.querySelectorAll(".l10-qgroup")], Ne = P[0], Pe = (e) => parseInt(e.querySelector("[data-part~=\"label\"]")?.textContent, 10) || 0, Fe = (e) => /auto/i.test(e.querySelector("[data-part~=\"label\"]")?.textContent || e.textContent), Ie = () => [...Ne.querySelectorAll("media-menu-radio-item")], Le = () => Ie().filter((e) => !Fe(e)), Re = () => Ie().find(Fe), ze = () => setTimeout(() => {
			let e = a.engine;
			e && e.manualLevel >= 0 && e.currentLevel !== e.manualLevel && (e.currentLevel = e.manualLevel);
		}, 30), Be = () => {
			let e = a.engine;
			return e?.levels?.[e.currentLevel]?.height || a.videoHeight || 0;
		}, Ve = !1, He = !1, Ue = "", We = () => {
			let e = Le();
			je.toggleAttribute("data-off", e.length < 2);
			let t = Ie().find((e) => e.getAttribute("aria-checked") === "true"), n = t && Fe(t), r = n ? Be() : t ? Pe(t) : 0;
			Ue = n ? r ? `Auto · ${r}p` : "Auto" : r ? `${r}p` : "…", Me.textContent = n ? "Auto" : Ue, je.dataset.top = r >= 2160 ? "4K" : r >= 1440 ? "2K" : r >= 720 ? "HD" : r ? "SD" : "";
		};
		a.addEventListener("resize", We), a.addEventListener("timeupdate", () => {
			Me.textContent === "Auto" && We();
		});
		let Ge = 0, Ke = setInterval(() => {
			if (Ve || ++Ge > 40) {
				clearInterval(Ke);
				return;
			}
			let e = Le();
			if (e.length < 2 || a.readyState < 1) return;
			let t = Re();
			if (typeof k.quality == "number") {
				let n = e.filter((e) => Pe(e) <= k.quality);
				t = n.length ? n.reduce((e, t) => Pe(t) > Pe(e) ? t : e) : e[0];
			}
			Ve = !0, t && t.getAttribute("aria-checked") !== "true" && (He = !0, t.click(), He = !1, ze());
		}, 400);
		for (let e of P) new MutationObserver(We).observe(e, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-checked"]
		}), e.addEventListener("value-change", (e) => {
			if (ze(), He) return;
			Ve = !0;
			let t = String(e.detail?.value), n = Le().find((e) => e.getAttribute("data-rendition") === t);
			if (!n && /auto|^-1$/i.test(t)) {
				k.quality = "auto", Ff(k);
				return;
			}
			let r = n ? Pe(n) : parseInt(t, 10);
			r && (k.quality = r, Ff(k));
		});
		We(), i.querySelectorAll(".l10-flip-list").forEach((e) => e.addEventListener("keydown", (e) => {
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
		let qe = r(".l10-controls"), F = (e) => i.toggleAttribute("data-quiet", e), Je = (e) => {
			if (!i.isConnected) return;
			let t = i.ownerDocument;
			if (e.currentTarget !== t) return;
			let n = t.activeElement;
			if (n && n !== t.body && !i.contains(n)) return;
			let r = e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "m" || e.key === "M";
			r && e.target.closest?.("media-time-slider, media-volume-slider, [role=\"menu\"]") || (r && (!qe.hasAttribute("data-visible") || i.hasAttribute("data-quiet")) ? F(!0) : r || F(!1));
		};
		document.addEventListener("keydown", Je, {
			capture: !0,
			signal: t.signal
		}), i.addEventListener("pointermove", () => F(!1)), i.addEventListener("pointerdown", () => F(!1)), new MutationObserver(() => {
			qe.hasAttribute("data-visible") || F(!1);
		}).observe(qe, {
			attributes: !0,
			attributeFilter: ["data-visible"]
		});
		let Ye = r(".l10-capset"), Xe = () => {
			Ye.toggleAttribute("data-off", ![...a.textTracks || []].some(Oe));
		};
		a.textTracks?.addEventListener?.("addtrack", Xe), a.textTracks?.addEventListener?.("removetrack", Xe), Xe(), a.addEventListener("loadedmetadata", Xe), a.addEventListener("loadeddata", Xe), a.textTracks?.addEventListener?.("change", Xe);
		let Ze = 0, Qe = setInterval(() => {
			Xe(), (++Ze > 20 || !Ye.hasAttribute("data-off")) && clearInterval(Qe);
		}, 750), $e = window.documentPictureInPicture, et = r(".l10-pip"), tt = this, nt = null, rt = async () => {
			let e = i.getBoundingClientRect(), t = await $e.requestWindow({
				width: Math.max(400, Math.round(e.width * .55)),
				height: Math.max(225, Math.round(e.width * .55 * e.height / e.width))
			});
			nt = t;
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
			tt.before(o), n.body.append(tt), i.toggleAttribute("data-docpip", !0), s && a.paused && a.play().catch(() => {}), i.focus({ preventScroll: !0 }), n.addEventListener("keydown", Je, !0), t.addEventListener("pagehide", () => {
				let e = !a.paused;
				i.toggleAttribute("data-docpip", !1), nt = null, o.isConnected ? (o.replaceWith(tt), e && a.paused && a.play().catch(() => {})) : (a.pause(), tt.remove());
			}, { once: !0 });
		}, it = !1, at = () => {
			let e = a.ownerDocument;
			return e.pictureInPictureElement ? e.exitPictureInPicture().catch(() => {}) : (a.requestPictureInPicture || a.nativeEl?.requestPictureInPicture?.bind(a.nativeEl))?.call(a).catch(() => {});
		}, ot = () => {
			nt ? nt.close() : it || a.ownerDocument.pictureInPictureElement ? at() : rt().catch(() => {
				it = !0, at();
			});
		};
		$e && (et.addEventListener("click", (e) => {
			e.stopImmediatePropagation(), e.preventDefault(), ot();
		}, !0), i.addEventListener("keydown", (e) => {
			e.key !== "i" && e.key !== "I" || e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, textarea") || (e.preventDefault(), ot());
		}));
		let st = (e) => {
			let t = a.shadowRoot?.querySelector("style[data-l10]");
			t?.sheet && (t.sheet.disabled = e), i.toggleAttribute("data-native-cues", e);
		};
		a.addEventListener("enterpictureinpicture", () => st(!0)), a.addEventListener("leavepictureinpicture", () => st(!1)), a.addEventListener("webkitpresentationmodechanged", () => st(a.webkitPresentationMode === "picture-in-picture"));
		let ct = () => matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 600, lt = !1, ut = () => {
			let e = i.ownerDocument, t = e.fullscreenElement || e.webkitFullscreenElement, n = !!(t && (t === i || t.contains(i) || i.contains(t))), r = screen.orientation;
			if (n && ct() && r?.lock) {
				let e = a.videoWidth || 16, t = a.videoHeight || 9;
				r.lock(e >= t ? "landscape" : "portrait").then(() => {
					lt = !0;
				}).catch(() => {});
			} else if (!n && lt) {
				lt = !1;
				try {
					r?.unlock?.();
				} catch {}
			}
		};
		document.addEventListener("fullscreenchange", ut, n), document.addEventListener("webkitfullscreenchange", ut, n), i.querySelectorAll("media-tooltip.l10-tip-end").forEach((e) => {
			let t = i.querySelector(`#${CSS.escape(e.getAttribute("trigger"))}`);
			if (!t) return;
			let n = () => e.style.setProperty("--l10-anchor-w", `${t.offsetWidth}px`);
			t.addEventListener("pointerenter", n), t.addEventListener("focus", n);
		});
		let I = r(".l10-more"), dt = (e, t) => {
			let n = i.querySelector(`[data-m="${e}"]`);
			n && (n.textContent = t);
		}, ft = r(".l10-cc"), pt = () => [...a.textTracks || []].some((e) => Oe(e) && e.mode === "showing"), mt = () => i.querySelectorAll(".l10-moremenu media-menu-item").forEach((e) => {
			let t = e.hasAttribute("data-off") || !!e.closest(".l10-csview[hidden]") || getComputedStyle(e).display === "none" && !e.closest("media-menu-content[hidden]");
			e.toggleAttribute("data-hidden", t);
		}), ht = () => {
			let e = Math.floor(I.getBoundingClientRect().top - 12);
			r(".l10-moremenu").style.setProperty("--l10-more-room", `${Math.max(160, e)}px`);
			let t = i.querySelector(".l10-nextstop");
			dt("l10-m-st", m[h]?.name || ""), dt("l10-m-next", (t.getAttribute("aria-label") || "").replace(/^Next stop: /, "")), r(".l10-m-next").toggleAttribute("data-disabled", t.hasAttribute("data-last")), dt("l10-m-svc", `${Ef[a.playbackRate] || "Custom"} · ${a.playbackRate}×`), dt("l10-m-q", Ue), r(".l10-m-q").toggleAttribute("data-off", je.hasAttribute("data-off")), dt("l10-m-cc", pt() ? "On" : "Off"), r(".l10-m-cc").toggleAttribute("data-off", Ye.hasAttribute("data-off")), r(".l10-m-cs").toggleAttribute("data-off", Ye.hasAttribute("data-off"));
			let n = !!(nt || a.ownerDocument.pictureInPictureElement);
			r(".l10-m-pip-text").textContent = n ? "Exit picture-in-picture" : "Picture-in-picture", r(".l10-m-pip").toggleAttribute("data-off", !$e && !document.pictureInPictureEnabled), mt();
		}, gt = r(".l10-moremenu"), _t = () => {
			let e = [...gt.children].find((e) => e.localName === "media-menu-content" && !e.hidden && !e.hasAttribute("data-child-open")), t = e ? e.scrollTop + e.clientHeight < e.scrollHeight - 2 : !1;
			gt.toggleAttribute("data-more-below", t);
		};
		gt.addEventListener("scroll", _t, !0), gt.addEventListener("click", () => {
			setTimeout(_t, 60), setTimeout(_t, 360);
		}), gt.addEventListener("keydown", () => setTimeout(_t, 60)), new MutationObserver(() => requestAnimationFrame(_t)).observe(gt, {
			attributes: !0,
			subtree: !0,
			attributeFilter: [
				"data-open",
				"hidden",
				"data-show"
			]
		}), i.addEventListener("keydown", (e) => {
			e.key !== "s" && e.key !== "S" || e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, textarea, [role=\"menu\"]") || I.offsetParent && (e.preventDefault(), ht(), ge("list"), I.focus(), I.click());
		}), I.addEventListener("pointerdown", ht), I.addEventListener("keydown", ht), I.addEventListener("click", ht), I.addEventListener("click", () => ge("list")), r(".l10-m-cs").addEventListener("click", () => ge("list"), !0), a.addEventListener("ratechange", ht), a.textTracks?.addEventListener?.("change", ht), a.addEventListener("timeupdate", () => {
			I.getAttribute("aria-expanded") === "true" && ht();
		});
		let vt = () => setTimeout(() => {
			I.getAttribute("aria-expanded") === "true" && I.click();
		}, 120);
		r(".l10-moremenu").addEventListener("select", (e) => {
			e.target.closest(".l10-st-item") && vt();
		}), r(".l10-moremenu").querySelectorAll("media-playback-rate-radio-group, media-quality-radio-group").forEach((e) => e.addEventListener("value-change", vt)), r(".l10-m-next").addEventListener("select", () => b(1)), r(".l10-m-cc").addEventListener("select", () => {
			ft.click(), setTimeout(ht, 50);
		}), r(".l10-m-pip").addEventListener("select", () => {
			$e ? ot() : at();
		}), t.signal.addEventListener("abort", () => {
			clearInterval(Ke), clearInterval(Qe), clearTimeout(j);
		}), de();
		let yt = r(".l10-panel"), bt = i.parentElement, xt = r(".l10-g-play"), St = r(".l10-g-controls"), Ct = (e) => {
			e.target.closest?.("button, a, input, select, textarea, [role=\"slider\"], [role=\"button\"], [role^=\"menuitem\"], [tabindex]") || e.stopPropagation();
		};
		[
			yt,
			r(".l10-board"),
			r(".l10-endcard"),
			...i.querySelectorAll("media-menu, media-popover")
		].forEach((e) => e?.addEventListener("pointerup", Ct));
		let wt = r("media-gesture[action=\"togglePaused\"][pointer=\"mouse\"]"), Tt = () => [...i.querySelectorAll("media-menu, media-popover")].some((e) => e.hasAttribute("data-open")), Et = 0;
		bt.addEventListener("pointerdown", (e) => {
			Tt() && !e.target.closest("media-menu, media-popover") && (wt.setAttribute("disabled", ""), xt.setAttribute("disabled", ""), clearTimeout(Et), Et = setTimeout(() => {
				wt.removeAttribute("disabled"), xt.toggleAttribute("disabled", !i.hasAttribute("data-dock"));
			}, 450));
		}, !0);
		let L = this.getAttribute("ambient") === "off" ? null : document.createElement("canvas");
		if (L) {
			L.className = "l10-glow", L.width = 32, L.height = 18, L.setAttribute("aria-hidden", "true"), bt.prepend(L);
			let e = L.getContext("2d"), t = () => a instanceof HTMLVideoElement ? a : a.nativeEl || a.shadowRoot?.querySelector("video"), n = !0, r = 0, o = (n) => {
				let r = t(), a = r && r.readyState >= 2 && !i.querySelector(".l10-poster[data-visible]") ? r : null;
				if (!a) {
					let e = i.querySelector(".l10-poster img");
					e?.complete && e.naturalWidth && (a = e);
				}
				if (a) try {
					e.globalAlpha = n, e.drawImage(a, 0, 0, L.width, L.height), L.toggleAttribute("data-on", !0);
				} catch {}
			}, s = () => {
				clearTimeout(r), !a.paused && i.isConnected && (n && o(.18), r = setTimeout(s, 120));
			};
			new IntersectionObserver(([e]) => {
				n = e.isIntersecting;
			}).observe(i), a.addEventListener("play", s), a.addEventListener("playing", s), [
				"loadeddata",
				"seeked",
				"emptied"
			].forEach((e) => a.addEventListener(e, () => o(1))), i.querySelector(".l10-poster img")?.addEventListener("load", () => o(1)), o(1);
		}
		let Dt = () => {
			let e = !1;
			try {
				e = i.matches(":fullscreen");
			} catch {
				try {
					e = i.matches(":-webkit-full-screen");
				} catch {}
			}
			let t = i.clientWidth, n = !this.getAttribute("ratio") && !e && !i.hasAttribute("data-docpip") && t > 0 && t <= Rf;
			n !== i.hasAttribute("data-dock") && i.toggleAttribute("data-dock", n), bt.style.paddingBottom = n ? `${yt.offsetHeight}px` : "", xt.toggleAttribute("disabled", !n), St.toggleAttribute("disabled", n), L && (L.style.height = `${i.offsetHeight}px`), bt.style.setProperty("--l10-dock-h", n ? `${yt.offsetHeight}px` : "0px");
		};
		new ResizeObserver(() => {
			i.style.setProperty("--l10-panel-h", `${yt.offsetHeight}px`), Dt();
		}).observe(yt), new ResizeObserver(Dt).observe(i), new MutationObserver(Dt).observe(i, {
			attributes: !0,
			attributeFilter: ["data-docpip"]
		}), document.addEventListener("fullscreenchange", Dt, n), document.addEventListener("webkitfullscreenchange", Dt, n), a.addEventListener("timeupdate", v), a.addEventListener("seeked", v), a.addEventListener("ended", v), r(".l10-endcard");
		let Ot = r(".l10-term-next"), kt = (e) => {
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
			if (Ot.hidden = !e, !e) return;
			let t = this.getAttribute("next-line") || "";
			r(".l10-term-next-name").textContent = e, r(".l10-term-badge").textContent = this.getAttribute("next-number") || "", Ot.style.setProperty("--l10-next", t || "var(--l10-line)"), Ot.style.setProperty("--l10-next-ink", t ? kt(t) : "var(--l10-line-ink)"), Ot.setAttribute("aria-label", `Change here for ${e}`);
		}, this.#t(), Ot.addEventListener("click", () => this.dispatchEvent(new CustomEvent("line10:next", { bubbles: !0 }))), r(".l10-term-again").addEventListener("click", () => {
			a.ended || (a.currentTime = 0), a.play().catch(() => {}), i.focus({ preventScroll: !0 });
		});
		let At = !1, jt = 0;
		if (a.addEventListener("ended", () => {
			At = !0;
		}), a.addEventListener("play", () => {
			At && (jt = performance.now());
		}), a.addEventListener("playing", () => {
			At = !1, jt = 0;
		}), a.addEventListener("pause", () => {
			if (!jt || performance.now() - jt > 4e3) return;
			jt = 0;
			let e = () => a.play().catch(() => {});
			a.seeking ? a.addEventListener("seeked", e, { once: !0 }) : e();
		}), this.hasAttribute("autoplay")) {
			let e = () => a.play().catch(() => {});
			a.readyState >= 2 ? e() : a.addEventListener("canplay", e, { once: !0 });
		}
		a.addEventListener("ratechange", ce), a.addEventListener("loadedmetadata", _), a.addEventListener("durationchange", _);
		let Mt = (e) => {
			e.kind === "chapters" && (e.mode === "disabled" && (e.mode = "hidden"), e.addEventListener("cuechange", _));
		};
		[...a.textTracks || []].forEach(Mt), a.textTracks?.addEventListener?.("addtrack", (e) => {
			Mt(e.track), setTimeout(_, 200);
		}), i.querySelectorAll("track[kind=\"chapters\"]").forEach((e) => e.addEventListener("load", _)), setTimeout(_, 400), v();
	}
};
customElements.get("line10-player") || customElements.define("line10-player", ep);
export { Ef as SERVICES };
