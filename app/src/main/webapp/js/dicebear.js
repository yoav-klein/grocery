//#region node_modules/@dicebear/core/lib/Error/ValidationError.js
var e = class extends Error {
	constructor(e, t) {
		let n = [];
		for (let e of t) {
			let t = [];
			e.instancePath && t.push(e.instancePath), e.message && t.push(e.message), n.push(t.join(" "));
		}
		super(`${e}: ${n.join(", ")}`), this.name = "ValidationError", this.details = t;
	}
}, t = class extends e {
	constructor(e) {
		super("Invalid style definition", e), this.name = "StyleValidationError";
	}
};
//#endregion
//#region node_modules/@dicebear/core/lib/Validator/StyleValidator.js
function n(e) {
	let t = 0;
	for (let n of e) t++;
	return t;
}
var r = n, i = /* @__PURE__ */ RegExp("^https?://", "u"), a = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*$", "u"), o = /* @__PURE__ */ RegExp("^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$", "u"), s = {
	description: "A map of allowed SVG presentation attributes. Only a safe subset is permitted; event handlers (e.g. `onclick`) and namespace attributes (e.g. `xlink:href`) are not allowed.",
	type: "object",
	properties: {
		"alignment-baseline": { $ref: "#/definitions/attributeString" },
		amplitude: { $ref: "#/definitions/attributeString" },
		azimuth: { $ref: "#/definitions/attributeString" },
		baseFrequency: { $ref: "#/definitions/attributeString" },
		"baseline-shift": { $ref: "#/definitions/attributeString" },
		bias: { $ref: "#/definitions/attributeString" },
		class: { $ref: "#/definitions/attributeString" },
		clipPathUnits: { $ref: "#/definitions/attributeString" },
		"clip-path": { $ref: "#/definitions/attributeString" },
		"clip-rule": { $ref: "#/definitions/attributeString" },
		color: { $ref: "#/definitions/colorValue" },
		"color-interpolation": { $ref: "#/definitions/attributeString" },
		"color-interpolation-filters": { $ref: "#/definitions/attributeString" },
		crossorigin: { $ref: "#/definitions/attributeString" },
		cx: { $ref: "#/definitions/attributeString" },
		cy: { $ref: "#/definitions/attributeString" },
		d: { $ref: "#/definitions/pathDataString" },
		decoding: { $ref: "#/definitions/attributeString" },
		diffuseConstant: { $ref: "#/definitions/attributeString" },
		direction: { $ref: "#/definitions/attributeString" },
		display: { $ref: "#/definitions/attributeString" },
		divisor: { $ref: "#/definitions/attributeString" },
		"dominant-baseline": { $ref: "#/definitions/attributeString" },
		dx: { $ref: "#/definitions/attributeString" },
		dy: { $ref: "#/definitions/attributeString" },
		edgeMode: { $ref: "#/definitions/attributeString" },
		elevation: { $ref: "#/definitions/attributeString" },
		exponent: { $ref: "#/definitions/attributeString" },
		fill: { $ref: "#/definitions/colorValue" },
		"fill-opacity": { $ref: "#/definitions/attributeString" },
		"fill-rule": { $ref: "#/definitions/attributeString" },
		filter: { $ref: "#/definitions/attributeString" },
		filterUnits: { $ref: "#/definitions/attributeString" },
		"flood-color": { $ref: "#/definitions/colorValue" },
		"flood-opacity": { $ref: "#/definitions/attributeString" },
		"font-family": { anyOf: [{ $ref: "#/definitions/attributeString" }, {
			type: "object",
			properties: {
				type: { const: "variable" },
				name: { const: "fontFamily" }
			},
			required: ["type", "name"],
			additionalProperties: !1
		}] },
		"font-size": { $ref: "#/definitions/attributeString" },
		"font-size-adjust": { $ref: "#/definitions/attributeString" },
		"font-style": { $ref: "#/definitions/attributeString" },
		"font-variant": { $ref: "#/definitions/attributeString" },
		"font-weight": { anyOf: [{ $ref: "#/definitions/attributeString" }, {
			type: "object",
			properties: {
				type: { const: "variable" },
				name: { const: "fontWeight" }
			},
			required: ["type", "name"],
			additionalProperties: !1
		}] },
		fx: { $ref: "#/definitions/attributeString" },
		fy: { $ref: "#/definitions/attributeString" },
		gradientTransform: { $ref: "#/definitions/attributeString" },
		gradientUnits: { $ref: "#/definitions/attributeString" },
		height: { $ref: "#/definitions/attributeString" },
		href: { anyOf: [{
			type: "string",
			pattern: "^#[a-zA-Z_][a-zA-Z0-9_.-]*$",
			maxLength: 128
		}, {
			type: "string",
			pattern: "^data:image/(png|gif|jpeg|webp|avif);base64,[a-zA-Z0-9+/=]+$",
			maxLength: 262144
		}] },
		id: { $ref: "#/definitions/attributeString" },
		"image-rendering": { $ref: "#/definitions/attributeString" },
		in: { $ref: "#/definitions/attributeString" },
		in2: { $ref: "#/definitions/attributeString" },
		intercept: { $ref: "#/definitions/attributeString" },
		k1: { $ref: "#/definitions/attributeString" },
		k2: { $ref: "#/definitions/attributeString" },
		k3: { $ref: "#/definitions/attributeString" },
		k4: { $ref: "#/definitions/attributeString" },
		kernelMatrix: { $ref: "#/definitions/attributeString" },
		kernelUnitLength: { $ref: "#/definitions/attributeString" },
		lang: { $ref: "#/definitions/attributeString" },
		lengthAdjust: { $ref: "#/definitions/attributeString" },
		"letter-spacing": { $ref: "#/definitions/attributeString" },
		"lighting-color": { $ref: "#/definitions/colorValue" },
		"marker-end": { $ref: "#/definitions/attributeString" },
		"marker-mid": { $ref: "#/definitions/attributeString" },
		"marker-start": { $ref: "#/definitions/attributeString" },
		markerHeight: { $ref: "#/definitions/attributeString" },
		markerUnits: { $ref: "#/definitions/attributeString" },
		markerWidth: { $ref: "#/definitions/attributeString" },
		mask: { $ref: "#/definitions/attributeString" },
		maskContentUnits: { $ref: "#/definitions/attributeString" },
		maskUnits: { $ref: "#/definitions/attributeString" },
		media: { $ref: "#/definitions/attributeString" },
		method: { $ref: "#/definitions/attributeString" },
		mode: { $ref: "#/definitions/attributeString" },
		numOctaves: { $ref: "#/definitions/attributeString" },
		offset: { $ref: "#/definitions/attributeString" },
		opacity: { $ref: "#/definitions/attributeString" },
		operator: { $ref: "#/definitions/attributeString" },
		order: { $ref: "#/definitions/attributeString" },
		orient: { $ref: "#/definitions/attributeString" },
		overflow: { $ref: "#/definitions/attributeString" },
		"paint-order": { $ref: "#/definitions/attributeString" },
		path: { $ref: "#/definitions/attributeString" },
		pathLength: { $ref: "#/definitions/attributeString" },
		patternContentUnits: { $ref: "#/definitions/attributeString" },
		patternTransform: { $ref: "#/definitions/attributeString" },
		patternUnits: { $ref: "#/definitions/attributeString" },
		points: { $ref: "#/definitions/attributeString" },
		preserveAlpha: { $ref: "#/definitions/attributeString" },
		preserveAspectRatio: { $ref: "#/definitions/attributeString" },
		primitiveUnits: { $ref: "#/definitions/attributeString" },
		r: { $ref: "#/definitions/attributeString" },
		radius: { $ref: "#/definitions/attributeString" },
		refX: { $ref: "#/definitions/attributeString" },
		refY: { $ref: "#/definitions/attributeString" },
		result: { $ref: "#/definitions/attributeString" },
		rx: { $ref: "#/definitions/attributeString" },
		ry: { $ref: "#/definitions/attributeString" },
		scale: { $ref: "#/definitions/attributeString" },
		seed: { $ref: "#/definitions/attributeString" },
		"shape-rendering": { $ref: "#/definitions/attributeString" },
		slope: { $ref: "#/definitions/attributeString" },
		specularConstant: { $ref: "#/definitions/attributeString" },
		specularExponent: { $ref: "#/definitions/attributeString" },
		spreadMethod: { $ref: "#/definitions/attributeString" },
		startOffset: { $ref: "#/definitions/attributeString" },
		stdDeviation: { $ref: "#/definitions/attributeString" },
		stitchTiles: { $ref: "#/definitions/attributeString" },
		"stop-color": { $ref: "#/definitions/colorValue" },
		"stop-opacity": { $ref: "#/definitions/attributeString" },
		stroke: { $ref: "#/definitions/colorValue" },
		"stroke-dasharray": { $ref: "#/definitions/attributeString" },
		"stroke-dashoffset": { $ref: "#/definitions/attributeString" },
		"stroke-linecap": { $ref: "#/definitions/attributeString" },
		"stroke-linejoin": { $ref: "#/definitions/attributeString" },
		"stroke-miterlimit": { $ref: "#/definitions/attributeString" },
		"stroke-opacity": { $ref: "#/definitions/attributeString" },
		"stroke-width": { $ref: "#/definitions/attributeString" },
		style: { $ref: "#/definitions/cssString" },
		surfaceScale: { $ref: "#/definitions/attributeString" },
		systemLanguage: { $ref: "#/definitions/attributeString" },
		tabindex: { $ref: "#/definitions/attributeString" },
		tableValues: { $ref: "#/definitions/attributeString" },
		targetX: { $ref: "#/definitions/attributeString" },
		targetY: { $ref: "#/definitions/attributeString" },
		"text-anchor": { $ref: "#/definitions/attributeString" },
		"text-decoration": { $ref: "#/definitions/attributeString" },
		"text-rendering": { $ref: "#/definitions/attributeString" },
		textLength: { $ref: "#/definitions/attributeString" },
		transform: { $ref: "#/definitions/attributeString" },
		"transform-origin": { $ref: "#/definitions/attributeString" },
		type: { $ref: "#/definitions/attributeString" },
		values: { $ref: "#/definitions/attributeString" },
		viewBox: { $ref: "#/definitions/attributeString" },
		visibility: { $ref: "#/definitions/attributeString" },
		width: { $ref: "#/definitions/attributeString" },
		"word-spacing": { $ref: "#/definitions/attributeString" },
		"writing-mode": { $ref: "#/definitions/attributeString" },
		x: { $ref: "#/definitions/attributeString" },
		x1: { $ref: "#/definitions/attributeString" },
		x2: { $ref: "#/definitions/attributeString" },
		xChannelSelector: { $ref: "#/definitions/attributeString" },
		y: { $ref: "#/definitions/attributeString" },
		y1: { $ref: "#/definitions/attributeString" },
		y2: { $ref: "#/definitions/attributeString" },
		yChannelSelector: { $ref: "#/definitions/attributeString" },
		z: { $ref: "#/definitions/attributeString" }
	},
	additionalProperties: !1
}, c = Object.prototype.hasOwnProperty, l = /* @__PURE__ */ RegExp("[uU][rR][lL]\\s*\\(\\s*[^#)\\s]", "u"), u = /* @__PURE__ */ RegExp("[eE][xX][pP][rR][eE][sS][sS][iI][oO][nN]\\s*\\(", "u"), d = /* @__PURE__ */ RegExp("[bB][eE][hH][aA][vV][iI][oO][rR]\\s*:", "u"), f = /* @__PURE__ */ RegExp("-[mM][oO][zZ]-[bB][iI][nN][dD][iI][nN][gG]", "u"), p = /* @__PURE__ */ RegExp("[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]\\s*:", "u"), m = /* @__PURE__ */ RegExp("[vV][bB][sS][cC][rR][iI][pP][tT]\\s*:", "u"), ee = /* @__PURE__ */ RegExp("\\\\", "u");
function h(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: a = e } = {}) {
	let o = null, s = 0, c = s, g = s, _ = s;
	if (typeof e != "string") {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	let v = s, y = !1, te = s;
	if (s === te) if (typeof e == "string") {
		if (!l.test(e)) {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
	} else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	var b = te === s;
	if (y ||= b, !y) {
		let t = s;
		if (s === t) if (typeof e == "string") {
			if (!u.test(e)) {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
		} else {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		var b = t === s;
		if (y ||= b, !y) {
			let t = s;
			if (s === t) if (typeof e == "string") {
				if (!d.test(e)) {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
			} else {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
			var b = t === s;
			if (y ||= b, !y) {
				let t = s;
				if (s === t) if (typeof e == "string") {
					if (!f.test(e)) {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
				} else {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
				var b = t === s;
				if (y ||= b, !y) {
					let t = s;
					if (s === t) if (typeof e == "string") {
						if (!p.test(e)) {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
					} else {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
					var b = t === s;
					if (y ||= b, !y) {
						let t = s;
						if (s === t) if (typeof e == "string") {
							if (!m.test(e)) {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
						} else {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
						var b = t === s;
						if (y ||= b, !y) {
							let t = s;
							if (s === t) if (typeof e == "string") {
								if (!ee.test(e)) {
									let e = {};
									o === null ? o = [e] : o.push(e), s++;
								}
							} else {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
							var b = t === s;
							y ||= b;
						}
					}
				}
			}
		}
	}
	if (y) s = v, o !== null && (v ? o.length = v : o = null);
	else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	if (_ === s) return h.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/filteredString/not",
		keyword: "not",
		params: {},
		message: "must NOT be valid"
	}], !1;
	if (s = g, o !== null && (g ? o.length = g : o = null), s === c) if (typeof e == "string") {
		if (r(e) > 16384) return h.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/filteredString/maxLength",
			keyword: "maxLength",
			params: { limit: 16384 },
			message: "must NOT have more than 16384 characters"
		}], !1;
	} else return h.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/filteredString/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	if (s === 0) if (typeof e == "string") {
		if (r(e) > 1024) return h.errors = [{
			instancePath: t,
			schemaPath: "#/maxLength",
			keyword: "maxLength",
			params: { limit: 1024 },
			message: "must NOT have more than 1024 characters"
		}], !1;
	} else return h.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	return h.errors = o, s === 0;
}
function g(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: o = e } = {}) {
	if (typeof e == "string") {
		if (r(e) > 64) return g.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/camelCaseName/maxLength",
			keyword: "maxLength",
			params: { limit: 64 },
			message: "must NOT have more than 64 characters"
		}], !1;
		if (!a.test(e)) return g.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/camelCaseName/pattern",
			keyword: "pattern",
			params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
			message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\""
		}], !1;
	} else return g.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/camelCaseName/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	return g.errors = null, !0;
}
function _(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0, s = o, c = !1, l = o;
	h(e, {
		instancePath: t,
		parentData: n,
		parentDataProperty: r,
		rootData: i
	}) || (a = a === null ? h.errors : a.concat(h.errors), o = a.length);
	var u = l === o;
	if (c ||= u, !c) {
		let n = o;
		if (o === n) if (e && typeof e == "object" && !Array.isArray(e)) {
			let n;
			if (e.type === void 0 && (n = "type") || e.name === void 0 && (n = "name")) {
				let e = {
					instancePath: t,
					schemaPath: "#/anyOf/1/required",
					keyword: "required",
					params: { missingProperty: n },
					message: "must have required property '" + n + "'"
				};
				a === null ? a = [e] : a.push(e), o++;
			} else {
				let n = o;
				for (let n in e) if (!(n === "type" || n === "name")) {
					let e = {
						instancePath: t,
						schemaPath: "#/anyOf/1/additionalProperties",
						keyword: "additionalProperties",
						params: { additionalProperty: n },
						message: "must NOT have additional properties"
					};
					a === null ? a = [e] : a.push(e), o++;
					break;
				}
				if (n === o) {
					if (e.type !== void 0) {
						let n = o;
						if (e.type !== "color") {
							let e = {
								instancePath: t + "/type",
								schemaPath: "#/anyOf/1/properties/type/const",
								keyword: "const",
								params: { allowedValue: "color" },
								message: "must be equal to constant"
							};
							a === null ? a = [e] : a.push(e), o++;
						}
						var d = n === o;
					} else var d = !0;
					if (d) if (e.name !== void 0) {
						let n = o;
						g(e.name, {
							instancePath: t + "/name",
							parentData: e,
							parentDataProperty: "name",
							rootData: i
						}) || (a = a === null ? g.errors : a.concat(g.errors), o = a.length);
						var d = n === o;
					} else var d = !0;
				}
			}
		} else {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/type",
				keyword: "type",
				params: { type: "object" },
				message: "must be object"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
		var u = n === o;
		c ||= u;
	}
	if (c) o = s, a !== null && (s ? a.length = s : a = null);
	else {
		let e = {
			instancePath: t,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf"
		};
		return a === null ? a = [e] : a.push(e), o++, _.errors = a, !1;
	}
	return _.errors = a, o === 0;
}
function v(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: a = e } = {}) {
	let o = null, s = 0, c = s, h = s, g = s;
	if (typeof e != "string") {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	let _ = s, y = !1, te = s;
	if (s === te) if (typeof e == "string") {
		if (!l.test(e)) {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
	} else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	var b = te === s;
	if (y ||= b, !y) {
		let t = s;
		if (s === t) if (typeof e == "string") {
			if (!u.test(e)) {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
		} else {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		var b = t === s;
		if (y ||= b, !y) {
			let t = s;
			if (s === t) if (typeof e == "string") {
				if (!d.test(e)) {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
			} else {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
			var b = t === s;
			if (y ||= b, !y) {
				let t = s;
				if (s === t) if (typeof e == "string") {
					if (!f.test(e)) {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
				} else {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
				var b = t === s;
				if (y ||= b, !y) {
					let t = s;
					if (s === t) if (typeof e == "string") {
						if (!p.test(e)) {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
					} else {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
					var b = t === s;
					if (y ||= b, !y) {
						let t = s;
						if (s === t) if (typeof e == "string") {
							if (!m.test(e)) {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
						} else {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
						var b = t === s;
						if (y ||= b, !y) {
							let t = s;
							if (s === t) if (typeof e == "string") {
								if (!ee.test(e)) {
									let e = {};
									o === null ? o = [e] : o.push(e), s++;
								}
							} else {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
							var b = t === s;
							y ||= b;
						}
					}
				}
			}
		}
	}
	if (y) s = _, o !== null && (_ ? o.length = _ : o = null);
	else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	if (g === s) return v.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/filteredString/not",
		keyword: "not",
		params: {},
		message: "must NOT be valid"
	}], !1;
	if (s = h, o !== null && (h ? o.length = h : o = null), s === c) if (typeof e == "string") {
		if (r(e) > 16384) return v.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/filteredString/maxLength",
			keyword: "maxLength",
			params: { limit: 16384 },
			message: "must NOT have more than 16384 characters"
		}], !1;
	} else return v.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/filteredString/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	if (s === 0) if (typeof e == "string") {
		if (r(e) > 16384) return v.errors = [{
			instancePath: t,
			schemaPath: "#/maxLength",
			keyword: "maxLength",
			params: { limit: 16384 },
			message: "must NOT have more than 16384 characters"
		}], !1;
	} else return v.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	return v.errors = o, s === 0;
}
var y = /* @__PURE__ */ RegExp("@[iI][mM][pP][oO][rR][tT]", "u"), te = /* @__PURE__ */ RegExp("@[fF][oO][nN][tT]-[fF][aA][cC][eE]", "u"), b = /* @__PURE__ */ RegExp("@[dD][oO][cC][uU][mM][eE][nN][tT]", "u"), ne = /* @__PURE__ */ RegExp("@[cC][hH][aA][rR][sS][eE][tT]", "u");
function x(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: a = e } = {}) {
	let o = null, s = 0, c = s, h = s;
	if (typeof e != "string") {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	let g = s, _ = !1, v = s;
	if (s === v) if (typeof e == "string") {
		if (!y.test(e)) {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
	} else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	var re = v === s;
	if (_ ||= re, !_) {
		let t = s;
		if (s === t) if (typeof e == "string") {
			if (!te.test(e)) {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
		} else {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		var re = t === s;
		if (_ ||= re, !_) {
			let t = s;
			if (s === t) if (typeof e == "string") {
				if (!b.test(e)) {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
			} else {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
			var re = t === s;
			if (_ ||= re, !_) {
				let t = s;
				if (s === t) if (typeof e == "string") {
					if (!ne.test(e)) {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
				} else {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
				var re = t === s;
				_ ||= re;
			}
		}
	}
	if (_) s = g, o !== null && (g ? o.length = g : o = null);
	else {
		let e = {};
		o === null ? o = [e] : o.push(e), s++;
	}
	if (h === s) return x.errors = [{
		instancePath: t,
		schemaPath: "#/not",
		keyword: "not",
		params: {},
		message: "must NOT be valid"
	}], !1;
	{
		s = c, o !== null && (c ? o.length = c : o = null);
		let n = s, i = s, a = s;
		if (typeof e != "string") {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		let h = s, g = !1, _ = s;
		if (s === _) if (typeof e == "string") {
			if (!l.test(e)) {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
		} else {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		var ie = _ === s;
		if (g ||= ie, !g) {
			let t = s;
			if (s === t) if (typeof e == "string") {
				if (!u.test(e)) {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
			} else {
				let e = {};
				o === null ? o = [e] : o.push(e), s++;
			}
			var ie = t === s;
			if (g ||= ie, !g) {
				let t = s;
				if (s === t) if (typeof e == "string") {
					if (!d.test(e)) {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
				} else {
					let e = {};
					o === null ? o = [e] : o.push(e), s++;
				}
				var ie = t === s;
				if (g ||= ie, !g) {
					let t = s;
					if (s === t) if (typeof e == "string") {
						if (!f.test(e)) {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
					} else {
						let e = {};
						o === null ? o = [e] : o.push(e), s++;
					}
					var ie = t === s;
					if (g ||= ie, !g) {
						let t = s;
						if (s === t) if (typeof e == "string") {
							if (!p.test(e)) {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
						} else {
							let e = {};
							o === null ? o = [e] : o.push(e), s++;
						}
						var ie = t === s;
						if (g ||= ie, !g) {
							let t = s;
							if (s === t) if (typeof e == "string") {
								if (!m.test(e)) {
									let e = {};
									o === null ? o = [e] : o.push(e), s++;
								}
							} else {
								let e = {};
								o === null ? o = [e] : o.push(e), s++;
							}
							var ie = t === s;
							if (g ||= ie, !g) {
								let t = s;
								if (s === t) if (typeof e == "string") {
									if (!ee.test(e)) {
										let e = {};
										o === null ? o = [e] : o.push(e), s++;
									}
								} else {
									let e = {};
									o === null ? o = [e] : o.push(e), s++;
								}
								var ie = t === s;
								g ||= ie;
							}
						}
					}
				}
			}
		}
		if (g) s = h, o !== null && (h ? o.length = h : o = null);
		else {
			let e = {};
			o === null ? o = [e] : o.push(e), s++;
		}
		if (a === s) return x.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/filteredString/not",
			keyword: "not",
			params: {},
			message: "must NOT be valid"
		}], !1;
		if (s = i, o !== null && (i ? o.length = i : o = null), s === n) if (typeof e == "string") {
			if (r(e) > 16384) return x.errors = [{
				instancePath: t,
				schemaPath: "#/definitions/filteredString/maxLength",
				keyword: "maxLength",
				params: { limit: 16384 },
				message: "must NOT have more than 16384 characters"
			}], !1;
		} else return x.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/filteredString/type",
			keyword: "type",
			params: { type: "string" },
			message: "must be string"
		}], !1;
	}
	if (s === 0) if (typeof e == "string") {
		if (r(e) > 4096) return x.errors = [{
			instancePath: t,
			schemaPath: "#/maxLength",
			keyword: "maxLength",
			params: { limit: 4096 },
			message: "must NOT have more than 4096 characters"
		}], !1;
	} else return x.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	return x.errors = o, s === 0;
}
var re = /* @__PURE__ */ RegExp("^#[a-zA-Z_][a-zA-Z0-9_.-]*$", "u"), ie = /* @__PURE__ */ RegExp("^data:image/(png|gif|jpeg|webp|avif);base64,[a-zA-Z0-9+/=]+$", "u");
function S(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: a = e } = {}) {
	let o = null, l = 0;
	if (l === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n = l;
		for (let n in e) if (!c.call(s.properties, n)) return S.errors = [{
			instancePath: t,
			schemaPath: "#/additionalProperties",
			keyword: "additionalProperties",
			params: { additionalProperty: n },
			message: "must NOT have additional properties"
		}], !1;
		if (n === l) {
			if (e["alignment-baseline"] !== void 0) {
				let n = l;
				h(e["alignment-baseline"], {
					instancePath: t + "/alignment-baseline",
					parentData: e,
					parentDataProperty: "alignment-baseline",
					rootData: a
				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
				var u = n === l;
			} else var u = !0;
			if (u) {
				if (e.amplitude !== void 0) {
					let n = l;
					h(e.amplitude, {
						instancePath: t + "/amplitude",
						parentData: e,
						parentDataProperty: "amplitude",
						rootData: a
					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
					var u = n === l;
				} else var u = !0;
				if (u) {
					if (e.azimuth !== void 0) {
						let n = l;
						h(e.azimuth, {
							instancePath: t + "/azimuth",
							parentData: e,
							parentDataProperty: "azimuth",
							rootData: a
						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
						var u = n === l;
					} else var u = !0;
					if (u) {
						if (e.baseFrequency !== void 0) {
							let n = l;
							h(e.baseFrequency, {
								instancePath: t + "/baseFrequency",
								parentData: e,
								parentDataProperty: "baseFrequency",
								rootData: a
							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
							var u = n === l;
						} else var u = !0;
						if (u) {
							if (e["baseline-shift"] !== void 0) {
								let n = l;
								h(e["baseline-shift"], {
									instancePath: t + "/baseline-shift",
									parentData: e,
									parentDataProperty: "baseline-shift",
									rootData: a
								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
								var u = n === l;
							} else var u = !0;
							if (u) {
								if (e.bias !== void 0) {
									let n = l;
									h(e.bias, {
										instancePath: t + "/bias",
										parentData: e,
										parentDataProperty: "bias",
										rootData: a
									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
									var u = n === l;
								} else var u = !0;
								if (u) {
									if (e.class !== void 0) {
										let n = l;
										h(e.class, {
											instancePath: t + "/class",
											parentData: e,
											parentDataProperty: "class",
											rootData: a
										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
										var u = n === l;
									} else var u = !0;
									if (u) {
										if (e.clipPathUnits !== void 0) {
											let n = l;
											h(e.clipPathUnits, {
												instancePath: t + "/clipPathUnits",
												parentData: e,
												parentDataProperty: "clipPathUnits",
												rootData: a
											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
											var u = n === l;
										} else var u = !0;
										if (u) {
											if (e["clip-path"] !== void 0) {
												let n = l;
												h(e["clip-path"], {
													instancePath: t + "/clip-path",
													parentData: e,
													parentDataProperty: "clip-path",
													rootData: a
												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
												var u = n === l;
											} else var u = !0;
											if (u) {
												if (e["clip-rule"] !== void 0) {
													let n = l;
													h(e["clip-rule"], {
														instancePath: t + "/clip-rule",
														parentData: e,
														parentDataProperty: "clip-rule",
														rootData: a
													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
													var u = n === l;
												} else var u = !0;
												if (u) {
													if (e.color !== void 0) {
														let n = l;
														_(e.color, {
															instancePath: t + "/color",
															parentData: e,
															parentDataProperty: "color",
															rootData: a
														}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
														var u = n === l;
													} else var u = !0;
													if (u) {
														if (e["color-interpolation"] !== void 0) {
															let n = l;
															h(e["color-interpolation"], {
																instancePath: t + "/color-interpolation",
																parentData: e,
																parentDataProperty: "color-interpolation",
																rootData: a
															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
															var u = n === l;
														} else var u = !0;
														if (u) {
															if (e["color-interpolation-filters"] !== void 0) {
																let n = l;
																h(e["color-interpolation-filters"], {
																	instancePath: t + "/color-interpolation-filters",
																	parentData: e,
																	parentDataProperty: "color-interpolation-filters",
																	rootData: a
																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																var u = n === l;
															} else var u = !0;
															if (u) {
																if (e.crossorigin !== void 0) {
																	let n = l;
																	h(e.crossorigin, {
																		instancePath: t + "/crossorigin",
																		parentData: e,
																		parentDataProperty: "crossorigin",
																		rootData: a
																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																	var u = n === l;
																} else var u = !0;
																if (u) {
																	if (e.cx !== void 0) {
																		let n = l;
																		h(e.cx, {
																			instancePath: t + "/cx",
																			parentData: e,
																			parentDataProperty: "cx",
																			rootData: a
																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																		var u = n === l;
																	} else var u = !0;
																	if (u) {
																		if (e.cy !== void 0) {
																			let n = l;
																			h(e.cy, {
																				instancePath: t + "/cy",
																				parentData: e,
																				parentDataProperty: "cy",
																				rootData: a
																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																			var u = n === l;
																		} else var u = !0;
																		if (u) {
																			if (e.d !== void 0) {
																				let n = l;
																				v(e.d, {
																					instancePath: t + "/d",
																					parentData: e,
																					parentDataProperty: "d",
																					rootData: a
																				}) || (o = o === null ? v.errors : o.concat(v.errors), l = o.length);
																				var u = n === l;
																			} else var u = !0;
																			if (u) {
																				if (e.decoding !== void 0) {
																					let n = l;
																					h(e.decoding, {
																						instancePath: t + "/decoding",
																						parentData: e,
																						parentDataProperty: "decoding",
																						rootData: a
																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																					var u = n === l;
																				} else var u = !0;
																				if (u) {
																					if (e.diffuseConstant !== void 0) {
																						let n = l;
																						h(e.diffuseConstant, {
																							instancePath: t + "/diffuseConstant",
																							parentData: e,
																							parentDataProperty: "diffuseConstant",
																							rootData: a
																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																						var u = n === l;
																					} else var u = !0;
																					if (u) {
																						if (e.direction !== void 0) {
																							let n = l;
																							h(e.direction, {
																								instancePath: t + "/direction",
																								parentData: e,
																								parentDataProperty: "direction",
																								rootData: a
																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																							var u = n === l;
																						} else var u = !0;
																						if (u) {
																							if (e.display !== void 0) {
																								let n = l;
																								h(e.display, {
																									instancePath: t + "/display",
																									parentData: e,
																									parentDataProperty: "display",
																									rootData: a
																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																								var u = n === l;
																							} else var u = !0;
																							if (u) {
																								if (e.divisor !== void 0) {
																									let n = l;
																									h(e.divisor, {
																										instancePath: t + "/divisor",
																										parentData: e,
																										parentDataProperty: "divisor",
																										rootData: a
																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																									var u = n === l;
																								} else var u = !0;
																								if (u) {
																									if (e["dominant-baseline"] !== void 0) {
																										let n = l;
																										h(e["dominant-baseline"], {
																											instancePath: t + "/dominant-baseline",
																											parentData: e,
																											parentDataProperty: "dominant-baseline",
																											rootData: a
																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																										var u = n === l;
																									} else var u = !0;
																									if (u) {
																										if (e.dx !== void 0) {
																											let n = l;
																											h(e.dx, {
																												instancePath: t + "/dx",
																												parentData: e,
																												parentDataProperty: "dx",
																												rootData: a
																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																											var u = n === l;
																										} else var u = !0;
																										if (u) {
																											if (e.dy !== void 0) {
																												let n = l;
																												h(e.dy, {
																													instancePath: t + "/dy",
																													parentData: e,
																													parentDataProperty: "dy",
																													rootData: a
																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																												var u = n === l;
																											} else var u = !0;
																											if (u) {
																												if (e.edgeMode !== void 0) {
																													let n = l;
																													h(e.edgeMode, {
																														instancePath: t + "/edgeMode",
																														parentData: e,
																														parentDataProperty: "edgeMode",
																														rootData: a
																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																													var u = n === l;
																												} else var u = !0;
																												if (u) {
																													if (e.elevation !== void 0) {
																														let n = l;
																														h(e.elevation, {
																															instancePath: t + "/elevation",
																															parentData: e,
																															parentDataProperty: "elevation",
																															rootData: a
																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																														var u = n === l;
																													} else var u = !0;
																													if (u) {
																														if (e.exponent !== void 0) {
																															let n = l;
																															h(e.exponent, {
																																instancePath: t + "/exponent",
																																parentData: e,
																																parentDataProperty: "exponent",
																																rootData: a
																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																															var u = n === l;
																														} else var u = !0;
																														if (u) {
																															if (e.fill !== void 0) {
																																let n = l;
																																_(e.fill, {
																																	instancePath: t + "/fill",
																																	parentData: e,
																																	parentDataProperty: "fill",
																																	rootData: a
																																}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
																																var u = n === l;
																															} else var u = !0;
																															if (u) {
																																if (e["fill-opacity"] !== void 0) {
																																	let n = l;
																																	h(e["fill-opacity"], {
																																		instancePath: t + "/fill-opacity",
																																		parentData: e,
																																		parentDataProperty: "fill-opacity",
																																		rootData: a
																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																	var u = n === l;
																																} else var u = !0;
																																if (u) {
																																	if (e["fill-rule"] !== void 0) {
																																		let n = l;
																																		h(e["fill-rule"], {
																																			instancePath: t + "/fill-rule",
																																			parentData: e,
																																			parentDataProperty: "fill-rule",
																																			rootData: a
																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																		var u = n === l;
																																	} else var u = !0;
																																	if (u) {
																																		if (e.filter !== void 0) {
																																			let n = l;
																																			h(e.filter, {
																																				instancePath: t + "/filter",
																																				parentData: e,
																																				parentDataProperty: "filter",
																																				rootData: a
																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																			var u = n === l;
																																		} else var u = !0;
																																		if (u) {
																																			if (e.filterUnits !== void 0) {
																																				let n = l;
																																				h(e.filterUnits, {
																																					instancePath: t + "/filterUnits",
																																					parentData: e,
																																					parentDataProperty: "filterUnits",
																																					rootData: a
																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																				var u = n === l;
																																			} else var u = !0;
																																			if (u) {
																																				if (e["flood-color"] !== void 0) {
																																					let n = l;
																																					_(e["flood-color"], {
																																						instancePath: t + "/flood-color",
																																						parentData: e,
																																						parentDataProperty: "flood-color",
																																						rootData: a
																																					}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
																																					var u = n === l;
																																				} else var u = !0;
																																				if (u) {
																																					if (e["flood-opacity"] !== void 0) {
																																						let n = l;
																																						h(e["flood-opacity"], {
																																							instancePath: t + "/flood-opacity",
																																							parentData: e,
																																							parentDataProperty: "flood-opacity",
																																							rootData: a
																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																						var u = n === l;
																																					} else var u = !0;
																																					if (u) {
																																						if (e["font-family"] !== void 0) {
																																							let n = e["font-family"], r = l, i = l, s = !1, c = l;
																																							h(n, {
																																								instancePath: t + "/font-family",
																																								parentData: e,
																																								parentDataProperty: "font-family",
																																								rootData: a
																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																							var d = c === l;
																																							if (s ||= d, !s) {
																																								let e = l;
																																								if (l === e) if (n && typeof n == "object" && !Array.isArray(n)) {
																																									let e;
																																									if (n.type === void 0 && (e = "type") || n.name === void 0 && (e = "name")) {
																																										let n = {
																																											instancePath: t + "/font-family",
																																											schemaPath: "#/properties/font-family/anyOf/1/required",
																																											keyword: "required",
																																											params: { missingProperty: e },
																																											message: "must have required property '" + e + "'"
																																										};
																																										o === null ? o = [n] : o.push(n), l++;
																																									} else {
																																										let e = l;
																																										for (let e in n) if (!(e === "type" || e === "name")) {
																																											let n = {
																																												instancePath: t + "/font-family",
																																												schemaPath: "#/properties/font-family/anyOf/1/additionalProperties",
																																												keyword: "additionalProperties",
																																												params: { additionalProperty: e },
																																												message: "must NOT have additional properties"
																																											};
																																											o === null ? o = [n] : o.push(n), l++;
																																											break;
																																										}
																																										if (e === l) {
																																											if (n.type !== void 0) {
																																												let e = l;
																																												if (n.type !== "variable") {
																																													let e = {
																																														instancePath: t + "/font-family/type",
																																														schemaPath: "#/properties/font-family/anyOf/1/properties/type/const",
																																														keyword: "const",
																																														params: { allowedValue: "variable" },
																																														message: "must be equal to constant"
																																													};
																																													o === null ? o = [e] : o.push(e), l++;
																																												}
																																												var f = e === l;
																																											} else var f = !0;
																																											if (f) if (n.name !== void 0) {
																																												let e = l;
																																												if (n.name !== "fontFamily") {
																																													let e = {
																																														instancePath: t + "/font-family/name",
																																														schemaPath: "#/properties/font-family/anyOf/1/properties/name/const",
																																														keyword: "const",
																																														params: { allowedValue: "fontFamily" },
																																														message: "must be equal to constant"
																																													};
																																													o === null ? o = [e] : o.push(e), l++;
																																												}
																																												var f = e === l;
																																											} else var f = !0;
																																										}
																																									}
																																								} else {
																																									let e = {
																																										instancePath: t + "/font-family",
																																										schemaPath: "#/properties/font-family/anyOf/1/type",
																																										keyword: "type",
																																										params: { type: "object" },
																																										message: "must be object"
																																									};
																																									o === null ? o = [e] : o.push(e), l++;
																																								}
																																								var d = e === l;
																																								s ||= d;
																																							}
																																							if (s) l = i, o !== null && (i ? o.length = i : o = null);
																																							else {
																																								let e = {
																																									instancePath: t + "/font-family",
																																									schemaPath: "#/properties/font-family/anyOf",
																																									keyword: "anyOf",
																																									params: {},
																																									message: "must match a schema in anyOf"
																																								};
																																								return o === null ? o = [e] : o.push(e), l++, S.errors = o, !1;
																																							}
																																							var u = r === l;
																																						} else var u = !0;
																																						if (u) {
																																							if (e["font-size"] !== void 0) {
																																								let n = l;
																																								h(e["font-size"], {
																																									instancePath: t + "/font-size",
																																									parentData: e,
																																									parentDataProperty: "font-size",
																																									rootData: a
																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																								var u = n === l;
																																							} else var u = !0;
																																							if (u) {
																																								if (e["font-size-adjust"] !== void 0) {
																																									let n = l;
																																									h(e["font-size-adjust"], {
																																										instancePath: t + "/font-size-adjust",
																																										parentData: e,
																																										parentDataProperty: "font-size-adjust",
																																										rootData: a
																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																									var u = n === l;
																																								} else var u = !0;
																																								if (u) {
																																									if (e["font-style"] !== void 0) {
																																										let n = l;
																																										h(e["font-style"], {
																																											instancePath: t + "/font-style",
																																											parentData: e,
																																											parentDataProperty: "font-style",
																																											rootData: a
																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																										var u = n === l;
																																									} else var u = !0;
																																									if (u) {
																																										if (e["font-variant"] !== void 0) {
																																											let n = l;
																																											h(e["font-variant"], {
																																												instancePath: t + "/font-variant",
																																												parentData: e,
																																												parentDataProperty: "font-variant",
																																												rootData: a
																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																											var u = n === l;
																																										} else var u = !0;
																																										if (u) {
																																											if (e["font-weight"] !== void 0) {
																																												let n = e["font-weight"], r = l, i = l, s = !1, c = l;
																																												h(n, {
																																													instancePath: t + "/font-weight",
																																													parentData: e,
																																													parentDataProperty: "font-weight",
																																													rootData: a
																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																												var p = c === l;
																																												if (s ||= p, !s) {
																																													let e = l;
																																													if (l === e) if (n && typeof n == "object" && !Array.isArray(n)) {
																																														let e;
																																														if (n.type === void 0 && (e = "type") || n.name === void 0 && (e = "name")) {
																																															let n = {
																																																instancePath: t + "/font-weight",
																																																schemaPath: "#/properties/font-weight/anyOf/1/required",
																																																keyword: "required",
																																																params: { missingProperty: e },
																																																message: "must have required property '" + e + "'"
																																															};
																																															o === null ? o = [n] : o.push(n), l++;
																																														} else {
																																															let e = l;
																																															for (let e in n) if (!(e === "type" || e === "name")) {
																																																let n = {
																																																	instancePath: t + "/font-weight",
																																																	schemaPath: "#/properties/font-weight/anyOf/1/additionalProperties",
																																																	keyword: "additionalProperties",
																																																	params: { additionalProperty: e },
																																																	message: "must NOT have additional properties"
																																																};
																																																o === null ? o = [n] : o.push(n), l++;
																																																break;
																																															}
																																															if (e === l) {
																																																if (n.type !== void 0) {
																																																	let e = l;
																																																	if (n.type !== "variable") {
																																																		let e = {
																																																			instancePath: t + "/font-weight/type",
																																																			schemaPath: "#/properties/font-weight/anyOf/1/properties/type/const",
																																																			keyword: "const",
																																																			params: { allowedValue: "variable" },
																																																			message: "must be equal to constant"
																																																		};
																																																		o === null ? o = [e] : o.push(e), l++;
																																																	}
																																																	var m = e === l;
																																																} else var m = !0;
																																																if (m) if (n.name !== void 0) {
																																																	let e = l;
																																																	if (n.name !== "fontWeight") {
																																																		let e = {
																																																			instancePath: t + "/font-weight/name",
																																																			schemaPath: "#/properties/font-weight/anyOf/1/properties/name/const",
																																																			keyword: "const",
																																																			params: { allowedValue: "fontWeight" },
																																																			message: "must be equal to constant"
																																																		};
																																																		o === null ? o = [e] : o.push(e), l++;
																																																	}
																																																	var m = e === l;
																																																} else var m = !0;
																																															}
																																														}
																																													} else {
																																														let e = {
																																															instancePath: t + "/font-weight",
																																															schemaPath: "#/properties/font-weight/anyOf/1/type",
																																															keyword: "type",
																																															params: { type: "object" },
																																															message: "must be object"
																																														};
																																														o === null ? o = [e] : o.push(e), l++;
																																													}
																																													var p = e === l;
																																													s ||= p;
																																												}
																																												if (s) l = i, o !== null && (i ? o.length = i : o = null);
																																												else {
																																													let e = {
																																														instancePath: t + "/font-weight",
																																														schemaPath: "#/properties/font-weight/anyOf",
																																														keyword: "anyOf",
																																														params: {},
																																														message: "must match a schema in anyOf"
																																													};
																																													return o === null ? o = [e] : o.push(e), l++, S.errors = o, !1;
																																												}
																																												var u = r === l;
																																											} else var u = !0;
																																											if (u) {
																																												if (e.fx !== void 0) {
																																													let n = l;
																																													h(e.fx, {
																																														instancePath: t + "/fx",
																																														parentData: e,
																																														parentDataProperty: "fx",
																																														rootData: a
																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																													var u = n === l;
																																												} else var u = !0;
																																												if (u) {
																																													if (e.fy !== void 0) {
																																														let n = l;
																																														h(e.fy, {
																																															instancePath: t + "/fy",
																																															parentData: e,
																																															parentDataProperty: "fy",
																																															rootData: a
																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																														var u = n === l;
																																													} else var u = !0;
																																													if (u) {
																																														if (e.gradientTransform !== void 0) {
																																															let n = l;
																																															h(e.gradientTransform, {
																																																instancePath: t + "/gradientTransform",
																																																parentData: e,
																																																parentDataProperty: "gradientTransform",
																																																rootData: a
																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																															var u = n === l;
																																														} else var u = !0;
																																														if (u) {
																																															if (e.gradientUnits !== void 0) {
																																																let n = l;
																																																h(e.gradientUnits, {
																																																	instancePath: t + "/gradientUnits",
																																																	parentData: e,
																																																	parentDataProperty: "gradientUnits",
																																																	rootData: a
																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																var u = n === l;
																																															} else var u = !0;
																																															if (u) {
																																																if (e.height !== void 0) {
																																																	let n = l;
																																																	h(e.height, {
																																																		instancePath: t + "/height",
																																																		parentData: e,
																																																		parentDataProperty: "height",
																																																		rootData: a
																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																	var u = n === l;
																																																} else var u = !0;
																																																if (u) {
																																																	if (e.href !== void 0) {
																																																		let n = e.href, i = l, a = l, s = !1, c = l;
																																																		if (l === c) if (typeof n == "string") {
																																																			if (r(n) > 128) {
																																																				let e = {
																																																					instancePath: t + "/href",
																																																					schemaPath: "#/properties/href/anyOf/0/maxLength",
																																																					keyword: "maxLength",
																																																					params: { limit: 128 },
																																																					message: "must NOT have more than 128 characters"
																																																				};
																																																				o === null ? o = [e] : o.push(e), l++;
																																																			} else if (!re.test(n)) {
																																																				let e = {
																																																					instancePath: t + "/href",
																																																					schemaPath: "#/properties/href/anyOf/0/pattern",
																																																					keyword: "pattern",
																																																					params: { pattern: "^#[a-zA-Z_][a-zA-Z0-9_.-]*$" },
																																																					message: "must match pattern \"^#[a-zA-Z_][a-zA-Z0-9_.-]*$\""
																																																				};
																																																				o === null ? o = [e] : o.push(e), l++;
																																																			}
																																																		} else {
																																																			let e = {
																																																				instancePath: t + "/href",
																																																				schemaPath: "#/properties/href/anyOf/0/type",
																																																				keyword: "type",
																																																				params: { type: "string" },
																																																				message: "must be string"
																																																			};
																																																			o === null ? o = [e] : o.push(e), l++;
																																																		}
																																																		var ee = c === l;
																																																		if (s ||= ee, !s) {
																																																			let e = l;
																																																			if (l === e) if (typeof n == "string") {
																																																				if (r(n) > 262144) {
																																																					let e = {
																																																						instancePath: t + "/href",
																																																						schemaPath: "#/properties/href/anyOf/1/maxLength",
																																																						keyword: "maxLength",
																																																						params: { limit: 262144 },
																																																						message: "must NOT have more than 262144 characters"
																																																					};
																																																					o === null ? o = [e] : o.push(e), l++;
																																																				} else if (!ie.test(n)) {
																																																					let e = {
																																																						instancePath: t + "/href",
																																																						schemaPath: "#/properties/href/anyOf/1/pattern",
																																																						keyword: "pattern",
																																																						params: { pattern: "^data:image/(png|gif|jpeg|webp|avif);base64,[a-zA-Z0-9+/=]+$" },
																																																						message: "must match pattern \"^data:image/(png|gif|jpeg|webp|avif);base64,[a-zA-Z0-9+/=]+$\""
																																																					};
																																																					o === null ? o = [e] : o.push(e), l++;
																																																				}
																																																			} else {
																																																				let e = {
																																																					instancePath: t + "/href",
																																																					schemaPath: "#/properties/href/anyOf/1/type",
																																																					keyword: "type",
																																																					params: { type: "string" },
																																																					message: "must be string"
																																																				};
																																																				o === null ? o = [e] : o.push(e), l++;
																																																			}
																																																			var ee = e === l;
																																																			s ||= ee;
																																																		}
																																																		if (s) l = a, o !== null && (a ? o.length = a : o = null);
																																																		else {
																																																			let e = {
																																																				instancePath: t + "/href",
																																																				schemaPath: "#/properties/href/anyOf",
																																																				keyword: "anyOf",
																																																				params: {},
																																																				message: "must match a schema in anyOf"
																																																			};
																																																			return o === null ? o = [e] : o.push(e), l++, S.errors = o, !1;
																																																		}
																																																		var u = i === l;
																																																	} else var u = !0;
																																																	if (u) {
																																																		if (e.id !== void 0) {
																																																			let n = l;
																																																			h(e.id, {
																																																				instancePath: t + "/id",
																																																				parentData: e,
																																																				parentDataProperty: "id",
																																																				rootData: a
																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																			var u = n === l;
																																																		} else var u = !0;
																																																		if (u) {
																																																			if (e["image-rendering"] !== void 0) {
																																																				let n = l;
																																																				h(e["image-rendering"], {
																																																					instancePath: t + "/image-rendering",
																																																					parentData: e,
																																																					parentDataProperty: "image-rendering",
																																																					rootData: a
																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																				var u = n === l;
																																																			} else var u = !0;
																																																			if (u) {
																																																				if (e.in !== void 0) {
																																																					let n = l;
																																																					h(e.in, {
																																																						instancePath: t + "/in",
																																																						parentData: e,
																																																						parentDataProperty: "in",
																																																						rootData: a
																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																					var u = n === l;
																																																				} else var u = !0;
																																																				if (u) {
																																																					if (e.in2 !== void 0) {
																																																						let n = l;
																																																						h(e.in2, {
																																																							instancePath: t + "/in2",
																																																							parentData: e,
																																																							parentDataProperty: "in2",
																																																							rootData: a
																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																						var u = n === l;
																																																					} else var u = !0;
																																																					if (u) {
																																																						if (e.intercept !== void 0) {
																																																							let n = l;
																																																							h(e.intercept, {
																																																								instancePath: t + "/intercept",
																																																								parentData: e,
																																																								parentDataProperty: "intercept",
																																																								rootData: a
																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																							var u = n === l;
																																																						} else var u = !0;
																																																						if (u) {
																																																							if (e.k1 !== void 0) {
																																																								let n = l;
																																																								h(e.k1, {
																																																									instancePath: t + "/k1",
																																																									parentData: e,
																																																									parentDataProperty: "k1",
																																																									rootData: a
																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																								var u = n === l;
																																																							} else var u = !0;
																																																							if (u) {
																																																								if (e.k2 !== void 0) {
																																																									let n = l;
																																																									h(e.k2, {
																																																										instancePath: t + "/k2",
																																																										parentData: e,
																																																										parentDataProperty: "k2",
																																																										rootData: a
																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																									var u = n === l;
																																																								} else var u = !0;
																																																								if (u) {
																																																									if (e.k3 !== void 0) {
																																																										let n = l;
																																																										h(e.k3, {
																																																											instancePath: t + "/k3",
																																																											parentData: e,
																																																											parentDataProperty: "k3",
																																																											rootData: a
																																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																										var u = n === l;
																																																									} else var u = !0;
																																																									if (u) {
																																																										if (e.k4 !== void 0) {
																																																											let n = l;
																																																											h(e.k4, {
																																																												instancePath: t + "/k4",
																																																												parentData: e,
																																																												parentDataProperty: "k4",
																																																												rootData: a
																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																											var u = n === l;
																																																										} else var u = !0;
																																																										if (u) {
																																																											if (e.kernelMatrix !== void 0) {
																																																												let n = l;
																																																												h(e.kernelMatrix, {
																																																													instancePath: t + "/kernelMatrix",
																																																													parentData: e,
																																																													parentDataProperty: "kernelMatrix",
																																																													rootData: a
																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																												var u = n === l;
																																																											} else var u = !0;
																																																											if (u) {
																																																												if (e.kernelUnitLength !== void 0) {
																																																													let n = l;
																																																													h(e.kernelUnitLength, {
																																																														instancePath: t + "/kernelUnitLength",
																																																														parentData: e,
																																																														parentDataProperty: "kernelUnitLength",
																																																														rootData: a
																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																													var u = n === l;
																																																												} else var u = !0;
																																																												if (u) {
																																																													if (e.lang !== void 0) {
																																																														let n = l;
																																																														h(e.lang, {
																																																															instancePath: t + "/lang",
																																																															parentData: e,
																																																															parentDataProperty: "lang",
																																																															rootData: a
																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																														var u = n === l;
																																																													} else var u = !0;
																																																													if (u) {
																																																														if (e.lengthAdjust !== void 0) {
																																																															let n = l;
																																																															h(e.lengthAdjust, {
																																																																instancePath: t + "/lengthAdjust",
																																																																parentData: e,
																																																																parentDataProperty: "lengthAdjust",
																																																																rootData: a
																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																															var u = n === l;
																																																														} else var u = !0;
																																																														if (u) {
																																																															if (e["letter-spacing"] !== void 0) {
																																																																let n = l;
																																																																h(e["letter-spacing"], {
																																																																	instancePath: t + "/letter-spacing",
																																																																	parentData: e,
																																																																	parentDataProperty: "letter-spacing",
																																																																	rootData: a
																																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																var u = n === l;
																																																															} else var u = !0;
																																																															if (u) {
																																																																if (e["lighting-color"] !== void 0) {
																																																																	let n = l;
																																																																	_(e["lighting-color"], {
																																																																		instancePath: t + "/lighting-color",
																																																																		parentData: e,
																																																																		parentDataProperty: "lighting-color",
																																																																		rootData: a
																																																																	}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
																																																																	var u = n === l;
																																																																} else var u = !0;
																																																																if (u) {
																																																																	if (e["marker-end"] !== void 0) {
																																																																		let n = l;
																																																																		h(e["marker-end"], {
																																																																			instancePath: t + "/marker-end",
																																																																			parentData: e,
																																																																			parentDataProperty: "marker-end",
																																																																			rootData: a
																																																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																		var u = n === l;
																																																																	} else var u = !0;
																																																																	if (u) {
																																																																		if (e["marker-mid"] !== void 0) {
																																																																			let n = l;
																																																																			h(e["marker-mid"], {
																																																																				instancePath: t + "/marker-mid",
																																																																				parentData: e,
																																																																				parentDataProperty: "marker-mid",
																																																																				rootData: a
																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																			var u = n === l;
																																																																		} else var u = !0;
																																																																		if (u) {
																																																																			if (e["marker-start"] !== void 0) {
																																																																				let n = l;
																																																																				h(e["marker-start"], {
																																																																					instancePath: t + "/marker-start",
																																																																					parentData: e,
																																																																					parentDataProperty: "marker-start",
																																																																					rootData: a
																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																				var u = n === l;
																																																																			} else var u = !0;
																																																																			if (u) {
																																																																				if (e.markerHeight !== void 0) {
																																																																					let n = l;
																																																																					h(e.markerHeight, {
																																																																						instancePath: t + "/markerHeight",
																																																																						parentData: e,
																																																																						parentDataProperty: "markerHeight",
																																																																						rootData: a
																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																					var u = n === l;
																																																																				} else var u = !0;
																																																																				if (u) {
																																																																					if (e.markerUnits !== void 0) {
																																																																						let n = l;
																																																																						h(e.markerUnits, {
																																																																							instancePath: t + "/markerUnits",
																																																																							parentData: e,
																																																																							parentDataProperty: "markerUnits",
																																																																							rootData: a
																																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																						var u = n === l;
																																																																					} else var u = !0;
																																																																					if (u) {
																																																																						if (e.markerWidth !== void 0) {
																																																																							let n = l;
																																																																							h(e.markerWidth, {
																																																																								instancePath: t + "/markerWidth",
																																																																								parentData: e,
																																																																								parentDataProperty: "markerWidth",
																																																																								rootData: a
																																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																							var u = n === l;
																																																																						} else var u = !0;
																																																																						if (u) {
																																																																							if (e.mask !== void 0) {
																																																																								let n = l;
																																																																								h(e.mask, {
																																																																									instancePath: t + "/mask",
																																																																									parentData: e,
																																																																									parentDataProperty: "mask",
																																																																									rootData: a
																																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																								var u = n === l;
																																																																							} else var u = !0;
																																																																							if (u) {
																																																																								if (e.maskContentUnits !== void 0) {
																																																																									let n = l;
																																																																									h(e.maskContentUnits, {
																																																																										instancePath: t + "/maskContentUnits",
																																																																										parentData: e,
																																																																										parentDataProperty: "maskContentUnits",
																																																																										rootData: a
																																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																									var u = n === l;
																																																																								} else var u = !0;
																																																																								if (u) {
																																																																									if (e.maskUnits !== void 0) {
																																																																										let n = l;
																																																																										h(e.maskUnits, {
																																																																											instancePath: t + "/maskUnits",
																																																																											parentData: e,
																																																																											parentDataProperty: "maskUnits",
																																																																											rootData: a
																																																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																										var u = n === l;
																																																																									} else var u = !0;
																																																																									if (u) {
																																																																										if (e.media !== void 0) {
																																																																											let n = l;
																																																																											h(e.media, {
																																																																												instancePath: t + "/media",
																																																																												parentData: e,
																																																																												parentDataProperty: "media",
																																																																												rootData: a
																																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																											var u = n === l;
																																																																										} else var u = !0;
																																																																										if (u) {
																																																																											if (e.method !== void 0) {
																																																																												let n = l;
																																																																												h(e.method, {
																																																																													instancePath: t + "/method",
																																																																													parentData: e,
																																																																													parentDataProperty: "method",
																																																																													rootData: a
																																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																												var u = n === l;
																																																																											} else var u = !0;
																																																																											if (u) {
																																																																												if (e.mode !== void 0) {
																																																																													let n = l;
																																																																													h(e.mode, {
																																																																														instancePath: t + "/mode",
																																																																														parentData: e,
																																																																														parentDataProperty: "mode",
																																																																														rootData: a
																																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																													var u = n === l;
																																																																												} else var u = !0;
																																																																												if (u) {
																																																																													if (e.numOctaves !== void 0) {
																																																																														let n = l;
																																																																														h(e.numOctaves, {
																																																																															instancePath: t + "/numOctaves",
																																																																															parentData: e,
																																																																															parentDataProperty: "numOctaves",
																																																																															rootData: a
																																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																														var u = n === l;
																																																																													} else var u = !0;
																																																																													if (u) {
																																																																														if (e.offset !== void 0) {
																																																																															let n = l;
																																																																															h(e.offset, {
																																																																																instancePath: t + "/offset",
																																																																																parentData: e,
																																																																																parentDataProperty: "offset",
																																																																																rootData: a
																																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																															var u = n === l;
																																																																														} else var u = !0;
																																																																														if (u) {
																																																																															if (e.opacity !== void 0) {
																																																																																let n = l;
																																																																																h(e.opacity, {
																																																																																	instancePath: t + "/opacity",
																																																																																	parentData: e,
																																																																																	parentDataProperty: "opacity",
																																																																																	rootData: a
																																																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																var u = n === l;
																																																																															} else var u = !0;
																																																																															if (u) {
																																																																																if (e.operator !== void 0) {
																																																																																	let n = l;
																																																																																	h(e.operator, {
																																																																																		instancePath: t + "/operator",
																																																																																		parentData: e,
																																																																																		parentDataProperty: "operator",
																																																																																		rootData: a
																																																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																	var u = n === l;
																																																																																} else var u = !0;
																																																																																if (u) {
																																																																																	if (e.order !== void 0) {
																																																																																		let n = l;
																																																																																		h(e.order, {
																																																																																			instancePath: t + "/order",
																																																																																			parentData: e,
																																																																																			parentDataProperty: "order",
																																																																																			rootData: a
																																																																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																		var u = n === l;
																																																																																	} else var u = !0;
																																																																																	if (u) {
																																																																																		if (e.orient !== void 0) {
																																																																																			let n = l;
																																																																																			h(e.orient, {
																																																																																				instancePath: t + "/orient",
																																																																																				parentData: e,
																																																																																				parentDataProperty: "orient",
																																																																																				rootData: a
																																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																			var u = n === l;
																																																																																		} else var u = !0;
																																																																																		if (u) {
																																																																																			if (e.overflow !== void 0) {
																																																																																				let n = l;
																																																																																				h(e.overflow, {
																																																																																					instancePath: t + "/overflow",
																																																																																					parentData: e,
																																																																																					parentDataProperty: "overflow",
																																																																																					rootData: a
																																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																				var u = n === l;
																																																																																			} else var u = !0;
																																																																																			if (u) {
																																																																																				if (e["paint-order"] !== void 0) {
																																																																																					let n = l;
																																																																																					h(e["paint-order"], {
																																																																																						instancePath: t + "/paint-order",
																																																																																						parentData: e,
																																																																																						parentDataProperty: "paint-order",
																																																																																						rootData: a
																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																					var u = n === l;
																																																																																				} else var u = !0;
																																																																																				if (u) {
																																																																																					if (e.path !== void 0) {
																																																																																						let n = l;
																																																																																						h(e.path, {
																																																																																							instancePath: t + "/path",
																																																																																							parentData: e,
																																																																																							parentDataProperty: "path",
																																																																																							rootData: a
																																																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																						var u = n === l;
																																																																																					} else var u = !0;
																																																																																					if (u) {
																																																																																						if (e.pathLength !== void 0) {
																																																																																							let n = l;
																																																																																							h(e.pathLength, {
																																																																																								instancePath: t + "/pathLength",
																																																																																								parentData: e,
																																																																																								parentDataProperty: "pathLength",
																																																																																								rootData: a
																																																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																							var u = n === l;
																																																																																						} else var u = !0;
																																																																																						if (u) {
																																																																																							if (e.patternContentUnits !== void 0) {
																																																																																								let n = l;
																																																																																								h(e.patternContentUnits, {
																																																																																									instancePath: t + "/patternContentUnits",
																																																																																									parentData: e,
																																																																																									parentDataProperty: "patternContentUnits",
																																																																																									rootData: a
																																																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																								var u = n === l;
																																																																																							} else var u = !0;
																																																																																							if (u) {
																																																																																								if (e.patternTransform !== void 0) {
																																																																																									let n = l;
																																																																																									h(e.patternTransform, {
																																																																																										instancePath: t + "/patternTransform",
																																																																																										parentData: e,
																																																																																										parentDataProperty: "patternTransform",
																																																																																										rootData: a
																																																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																									var u = n === l;
																																																																																								} else var u = !0;
																																																																																								if (u) {
																																																																																									if (e.patternUnits !== void 0) {
																																																																																										let n = l;
																																																																																										h(e.patternUnits, {
																																																																																											instancePath: t + "/patternUnits",
																																																																																											parentData: e,
																																																																																											parentDataProperty: "patternUnits",
																																																																																											rootData: a
																																																																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																										var u = n === l;
																																																																																									} else var u = !0;
																																																																																									if (u) {
																																																																																										if (e.points !== void 0) {
																																																																																											let n = l;
																																																																																											h(e.points, {
																																																																																												instancePath: t + "/points",
																																																																																												parentData: e,
																																																																																												parentDataProperty: "points",
																																																																																												rootData: a
																																																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																											var u = n === l;
																																																																																										} else var u = !0;
																																																																																										if (u) {
																																																																																											if (e.preserveAlpha !== void 0) {
																																																																																												let n = l;
																																																																																												h(e.preserveAlpha, {
																																																																																													instancePath: t + "/preserveAlpha",
																																																																																													parentData: e,
																																																																																													parentDataProperty: "preserveAlpha",
																																																																																													rootData: a
																																																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																												var u = n === l;
																																																																																											} else var u = !0;
																																																																																											if (u) {
																																																																																												if (e.preserveAspectRatio !== void 0) {
																																																																																													let n = l;
																																																																																													h(e.preserveAspectRatio, {
																																																																																														instancePath: t + "/preserveAspectRatio",
																																																																																														parentData: e,
																																																																																														parentDataProperty: "preserveAspectRatio",
																																																																																														rootData: a
																																																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																													var u = n === l;
																																																																																												} else var u = !0;
																																																																																												if (u) {
																																																																																													if (e.primitiveUnits !== void 0) {
																																																																																														let n = l;
																																																																																														h(e.primitiveUnits, {
																																																																																															instancePath: t + "/primitiveUnits",
																																																																																															parentData: e,
																																																																																															parentDataProperty: "primitiveUnits",
																																																																																															rootData: a
																																																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																														var u = n === l;
																																																																																													} else var u = !0;
																																																																																													if (u) {
																																																																																														if (e.r !== void 0) {
																																																																																															let n = l;
																																																																																															h(e.r, {
																																																																																																instancePath: t + "/r",
																																																																																																parentData: e,
																																																																																																parentDataProperty: "r",
																																																																																																rootData: a
																																																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																															var u = n === l;
																																																																																														} else var u = !0;
																																																																																														if (u) {
																																																																																															if (e.radius !== void 0) {
																																																																																																let n = l;
																																																																																																h(e.radius, {
																																																																																																	instancePath: t + "/radius",
																																																																																																	parentData: e,
																																																																																																	parentDataProperty: "radius",
																																																																																																	rootData: a
																																																																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																var u = n === l;
																																																																																															} else var u = !0;
																																																																																															if (u) {
																																																																																																if (e.refX !== void 0) {
																																																																																																	let n = l;
																																																																																																	h(e.refX, {
																																																																																																		instancePath: t + "/refX",
																																																																																																		parentData: e,
																																																																																																		parentDataProperty: "refX",
																																																																																																		rootData: a
																																																																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																	var u = n === l;
																																																																																																} else var u = !0;
																																																																																																if (u) {
																																																																																																	if (e.refY !== void 0) {
																																																																																																		let n = l;
																																																																																																		h(e.refY, {
																																																																																																			instancePath: t + "/refY",
																																																																																																			parentData: e,
																																																																																																			parentDataProperty: "refY",
																																																																																																			rootData: a
																																																																																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																		var u = n === l;
																																																																																																	} else var u = !0;
																																																																																																	if (u) {
																																																																																																		if (e.result !== void 0) {
																																																																																																			let n = l;
																																																																																																			h(e.result, {
																																																																																																				instancePath: t + "/result",
																																																																																																				parentData: e,
																																																																																																				parentDataProperty: "result",
																																																																																																				rootData: a
																																																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																			var u = n === l;
																																																																																																		} else var u = !0;
																																																																																																		if (u) {
																																																																																																			if (e.rx !== void 0) {
																																																																																																				let n = l;
																																																																																																				h(e.rx, {
																																																																																																					instancePath: t + "/rx",
																																																																																																					parentData: e,
																																																																																																					parentDataProperty: "rx",
																																																																																																					rootData: a
																																																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																				var u = n === l;
																																																																																																			} else var u = !0;
																																																																																																			if (u) {
																																																																																																				if (e.ry !== void 0) {
																																																																																																					let n = l;
																																																																																																					h(e.ry, {
																																																																																																						instancePath: t + "/ry",
																																																																																																						parentData: e,
																																																																																																						parentDataProperty: "ry",
																																																																																																						rootData: a
																																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																					var u = n === l;
																																																																																																				} else var u = !0;
																																																																																																				if (u) {
																																																																																																					if (e.scale !== void 0) {
																																																																																																						let n = l;
																																																																																																						h(e.scale, {
																																																																																																							instancePath: t + "/scale",
																																																																																																							parentData: e,
																																																																																																							parentDataProperty: "scale",
																																																																																																							rootData: a
																																																																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																						var u = n === l;
																																																																																																					} else var u = !0;
																																																																																																					if (u) {
																																																																																																						if (e.seed !== void 0) {
																																																																																																							let n = l;
																																																																																																							h(e.seed, {
																																																																																																								instancePath: t + "/seed",
																																																																																																								parentData: e,
																																																																																																								parentDataProperty: "seed",
																																																																																																								rootData: a
																																																																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																							var u = n === l;
																																																																																																						} else var u = !0;
																																																																																																						if (u) {
																																																																																																							if (e["shape-rendering"] !== void 0) {
																																																																																																								let n = l;
																																																																																																								h(e["shape-rendering"], {
																																																																																																									instancePath: t + "/shape-rendering",
																																																																																																									parentData: e,
																																																																																																									parentDataProperty: "shape-rendering",
																																																																																																									rootData: a
																																																																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																								var u = n === l;
																																																																																																							} else var u = !0;
																																																																																																							if (u) {
																																																																																																								if (e.slope !== void 0) {
																																																																																																									let n = l;
																																																																																																									h(e.slope, {
																																																																																																										instancePath: t + "/slope",
																																																																																																										parentData: e,
																																																																																																										parentDataProperty: "slope",
																																																																																																										rootData: a
																																																																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																									var u = n === l;
																																																																																																								} else var u = !0;
																																																																																																								if (u) {
																																																																																																									if (e.specularConstant !== void 0) {
																																																																																																										let n = l;
																																																																																																										h(e.specularConstant, {
																																																																																																											instancePath: t + "/specularConstant",
																																																																																																											parentData: e,
																																																																																																											parentDataProperty: "specularConstant",
																																																																																																											rootData: a
																																																																																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																										var u = n === l;
																																																																																																									} else var u = !0;
																																																																																																									if (u) {
																																																																																																										if (e.specularExponent !== void 0) {
																																																																																																											let n = l;
																																																																																																											h(e.specularExponent, {
																																																																																																												instancePath: t + "/specularExponent",
																																																																																																												parentData: e,
																																																																																																												parentDataProperty: "specularExponent",
																																																																																																												rootData: a
																																																																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																											var u = n === l;
																																																																																																										} else var u = !0;
																																																																																																										if (u) {
																																																																																																											if (e.spreadMethod !== void 0) {
																																																																																																												let n = l;
																																																																																																												h(e.spreadMethod, {
																																																																																																													instancePath: t + "/spreadMethod",
																																																																																																													parentData: e,
																																																																																																													parentDataProperty: "spreadMethod",
																																																																																																													rootData: a
																																																																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																												var u = n === l;
																																																																																																											} else var u = !0;
																																																																																																											if (u) {
																																																																																																												if (e.startOffset !== void 0) {
																																																																																																													let n = l;
																																																																																																													h(e.startOffset, {
																																																																																																														instancePath: t + "/startOffset",
																																																																																																														parentData: e,
																																																																																																														parentDataProperty: "startOffset",
																																																																																																														rootData: a
																																																																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																													var u = n === l;
																																																																																																												} else var u = !0;
																																																																																																												if (u) {
																																																																																																													if (e.stdDeviation !== void 0) {
																																																																																																														let n = l;
																																																																																																														h(e.stdDeviation, {
																																																																																																															instancePath: t + "/stdDeviation",
																																																																																																															parentData: e,
																																																																																																															parentDataProperty: "stdDeviation",
																																																																																																															rootData: a
																																																																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																														var u = n === l;
																																																																																																													} else var u = !0;
																																																																																																													if (u) {
																																																																																																														if (e.stitchTiles !== void 0) {
																																																																																																															let n = l;
																																																																																																															h(e.stitchTiles, {
																																																																																																																instancePath: t + "/stitchTiles",
																																																																																																																parentData: e,
																																																																																																																parentDataProperty: "stitchTiles",
																																																																																																																rootData: a
																																																																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																															var u = n === l;
																																																																																																														} else var u = !0;
																																																																																																														if (u) {
																																																																																																															if (e["stop-color"] !== void 0) {
																																																																																																																let n = l;
																																																																																																																_(e["stop-color"], {
																																																																																																																	instancePath: t + "/stop-color",
																																																																																																																	parentData: e,
																																																																																																																	parentDataProperty: "stop-color",
																																																																																																																	rootData: a
																																																																																																																}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
																																																																																																																var u = n === l;
																																																																																																															} else var u = !0;
																																																																																																															if (u) {
																																																																																																																if (e["stop-opacity"] !== void 0) {
																																																																																																																	let n = l;
																																																																																																																	h(e["stop-opacity"], {
																																																																																																																		instancePath: t + "/stop-opacity",
																																																																																																																		parentData: e,
																																																																																																																		parentDataProperty: "stop-opacity",
																																																																																																																		rootData: a
																																																																																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																	var u = n === l;
																																																																																																																} else var u = !0;
																																																																																																																if (u) {
																																																																																																																	if (e.stroke !== void 0) {
																																																																																																																		let n = l;
																																																																																																																		_(e.stroke, {
																																																																																																																			instancePath: t + "/stroke",
																																																																																																																			parentData: e,
																																																																																																																			parentDataProperty: "stroke",
																																																																																																																			rootData: a
																																																																																																																		}) || (o = o === null ? _.errors : o.concat(_.errors), l = o.length);
																																																																																																																		var u = n === l;
																																																																																																																	} else var u = !0;
																																																																																																																	if (u) {
																																																																																																																		if (e["stroke-dasharray"] !== void 0) {
																																																																																																																			let n = l;
																																																																																																																			h(e["stroke-dasharray"], {
																																																																																																																				instancePath: t + "/stroke-dasharray",
																																																																																																																				parentData: e,
																																																																																																																				parentDataProperty: "stroke-dasharray",
																																																																																																																				rootData: a
																																																																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																			var u = n === l;
																																																																																																																		} else var u = !0;
																																																																																																																		if (u) {
																																																																																																																			if (e["stroke-dashoffset"] !== void 0) {
																																																																																																																				let n = l;
																																																																																																																				h(e["stroke-dashoffset"], {
																																																																																																																					instancePath: t + "/stroke-dashoffset",
																																																																																																																					parentData: e,
																																																																																																																					parentDataProperty: "stroke-dashoffset",
																																																																																																																					rootData: a
																																																																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																				var u = n === l;
																																																																																																																			} else var u = !0;
																																																																																																																			if (u) {
																																																																																																																				if (e["stroke-linecap"] !== void 0) {
																																																																																																																					let n = l;
																																																																																																																					h(e["stroke-linecap"], {
																																																																																																																						instancePath: t + "/stroke-linecap",
																																																																																																																						parentData: e,
																																																																																																																						parentDataProperty: "stroke-linecap",
																																																																																																																						rootData: a
																																																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																					var u = n === l;
																																																																																																																				} else var u = !0;
																																																																																																																				if (u) {
																																																																																																																					if (e["stroke-linejoin"] !== void 0) {
																																																																																																																						let n = l;
																																																																																																																						h(e["stroke-linejoin"], {
																																																																																																																							instancePath: t + "/stroke-linejoin",
																																																																																																																							parentData: e,
																																																																																																																							parentDataProperty: "stroke-linejoin",
																																																																																																																							rootData: a
																																																																																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																						var u = n === l;
																																																																																																																					} else var u = !0;
																																																																																																																					if (u) {
																																																																																																																						if (e["stroke-miterlimit"] !== void 0) {
																																																																																																																							let n = l;
																																																																																																																							h(e["stroke-miterlimit"], {
																																																																																																																								instancePath: t + "/stroke-miterlimit",
																																																																																																																								parentData: e,
																																																																																																																								parentDataProperty: "stroke-miterlimit",
																																																																																																																								rootData: a
																																																																																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																							var u = n === l;
																																																																																																																						} else var u = !0;
																																																																																																																						if (u) {
																																																																																																																							if (e["stroke-opacity"] !== void 0) {
																																																																																																																								let n = l;
																																																																																																																								h(e["stroke-opacity"], {
																																																																																																																									instancePath: t + "/stroke-opacity",
																																																																																																																									parentData: e,
																																																																																																																									parentDataProperty: "stroke-opacity",
																																																																																																																									rootData: a
																																																																																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																								var u = n === l;
																																																																																																																							} else var u = !0;
																																																																																																																							if (u) {
																																																																																																																								if (e["stroke-width"] !== void 0) {
																																																																																																																									let n = l;
																																																																																																																									h(e["stroke-width"], {
																																																																																																																										instancePath: t + "/stroke-width",
																																																																																																																										parentData: e,
																																																																																																																										parentDataProperty: "stroke-width",
																																																																																																																										rootData: a
																																																																																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																									var u = n === l;
																																																																																																																								} else var u = !0;
																																																																																																																								if (u) {
																																																																																																																									if (e.style !== void 0) {
																																																																																																																										let n = l;
																																																																																																																										x(e.style, {
																																																																																																																											instancePath: t + "/style",
																																																																																																																											parentData: e,
																																																																																																																											parentDataProperty: "style",
																																																																																																																											rootData: a
																																																																																																																										}) || (o = o === null ? x.errors : o.concat(x.errors), l = o.length);
																																																																																																																										var u = n === l;
																																																																																																																									} else var u = !0;
																																																																																																																									if (u) {
																																																																																																																										if (e.surfaceScale !== void 0) {
																																																																																																																											let n = l;
																																																																																																																											h(e.surfaceScale, {
																																																																																																																												instancePath: t + "/surfaceScale",
																																																																																																																												parentData: e,
																																																																																																																												parentDataProperty: "surfaceScale",
																																																																																																																												rootData: a
																																																																																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																											var u = n === l;
																																																																																																																										} else var u = !0;
																																																																																																																										if (u) {
																																																																																																																											if (e.systemLanguage !== void 0) {
																																																																																																																												let n = l;
																																																																																																																												h(e.systemLanguage, {
																																																																																																																													instancePath: t + "/systemLanguage",
																																																																																																																													parentData: e,
																																																																																																																													parentDataProperty: "systemLanguage",
																																																																																																																													rootData: a
																																																																																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																												var u = n === l;
																																																																																																																											} else var u = !0;
																																																																																																																											if (u) {
																																																																																																																												if (e.tabindex !== void 0) {
																																																																																																																													let n = l;
																																																																																																																													h(e.tabindex, {
																																																																																																																														instancePath: t + "/tabindex",
																																																																																																																														parentData: e,
																																																																																																																														parentDataProperty: "tabindex",
																																																																																																																														rootData: a
																																																																																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																													var u = n === l;
																																																																																																																												} else var u = !0;
																																																																																																																												if (u) {
																																																																																																																													if (e.tableValues !== void 0) {
																																																																																																																														let n = l;
																																																																																																																														h(e.tableValues, {
																																																																																																																															instancePath: t + "/tableValues",
																																																																																																																															parentData: e,
																																																																																																																															parentDataProperty: "tableValues",
																																																																																																																															rootData: a
																																																																																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																														var u = n === l;
																																																																																																																													} else var u = !0;
																																																																																																																													if (u) {
																																																																																																																														if (e.targetX !== void 0) {
																																																																																																																															let n = l;
																																																																																																																															h(e.targetX, {
																																																																																																																																instancePath: t + "/targetX",
																																																																																																																																parentData: e,
																																																																																																																																parentDataProperty: "targetX",
																																																																																																																																rootData: a
																																																																																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																															var u = n === l;
																																																																																																																														} else var u = !0;
																																																																																																																														if (u) {
																																																																																																																															if (e.targetY !== void 0) {
																																																																																																																																let n = l;
																																																																																																																																h(e.targetY, {
																																																																																																																																	instancePath: t + "/targetY",
																																																																																																																																	parentData: e,
																																																																																																																																	parentDataProperty: "targetY",
																																																																																																																																	rootData: a
																																																																																																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																var u = n === l;
																																																																																																																															} else var u = !0;
																																																																																																																															if (u) {
																																																																																																																																if (e["text-anchor"] !== void 0) {
																																																																																																																																	let n = l;
																																																																																																																																	h(e["text-anchor"], {
																																																																																																																																		instancePath: t + "/text-anchor",
																																																																																																																																		parentData: e,
																																																																																																																																		parentDataProperty: "text-anchor",
																																																																																																																																		rootData: a
																																																																																																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																	var u = n === l;
																																																																																																																																} else var u = !0;
																																																																																																																																if (u) {
																																																																																																																																	if (e["text-decoration"] !== void 0) {
																																																																																																																																		let n = l;
																																																																																																																																		h(e["text-decoration"], {
																																																																																																																																			instancePath: t + "/text-decoration",
																																																																																																																																			parentData: e,
																																																																																																																																			parentDataProperty: "text-decoration",
																																																																																																																																			rootData: a
																																																																																																																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																		var u = n === l;
																																																																																																																																	} else var u = !0;
																																																																																																																																	if (u) {
																																																																																																																																		if (e["text-rendering"] !== void 0) {
																																																																																																																																			let n = l;
																																																																																																																																			h(e["text-rendering"], {
																																																																																																																																				instancePath: t + "/text-rendering",
																																																																																																																																				parentData: e,
																																																																																																																																				parentDataProperty: "text-rendering",
																																																																																																																																				rootData: a
																																																																																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																			var u = n === l;
																																																																																																																																		} else var u = !0;
																																																																																																																																		if (u) {
																																																																																																																																			if (e.textLength !== void 0) {
																																																																																																																																				let n = l;
																																																																																																																																				h(e.textLength, {
																																																																																																																																					instancePath: t + "/textLength",
																																																																																																																																					parentData: e,
																																																																																																																																					parentDataProperty: "textLength",
																																																																																																																																					rootData: a
																																																																																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																				var u = n === l;
																																																																																																																																			} else var u = !0;
																																																																																																																																			if (u) {
																																																																																																																																				if (e.transform !== void 0) {
																																																																																																																																					let n = l;
																																																																																																																																					h(e.transform, {
																																																																																																																																						instancePath: t + "/transform",
																																																																																																																																						parentData: e,
																																																																																																																																						parentDataProperty: "transform",
																																																																																																																																						rootData: a
																																																																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																					var u = n === l;
																																																																																																																																				} else var u = !0;
																																																																																																																																				if (u) {
																																																																																																																																					if (e["transform-origin"] !== void 0) {
																																																																																																																																						let n = l;
																																																																																																																																						h(e["transform-origin"], {
																																																																																																																																							instancePath: t + "/transform-origin",
																																																																																																																																							parentData: e,
																																																																																																																																							parentDataProperty: "transform-origin",
																																																																																																																																							rootData: a
																																																																																																																																						}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																						var u = n === l;
																																																																																																																																					} else var u = !0;
																																																																																																																																					if (u) {
																																																																																																																																						if (e.type !== void 0) {
																																																																																																																																							let n = l;
																																																																																																																																							h(e.type, {
																																																																																																																																								instancePath: t + "/type",
																																																																																																																																								parentData: e,
																																																																																																																																								parentDataProperty: "type",
																																																																																																																																								rootData: a
																																																																																																																																							}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																							var u = n === l;
																																																																																																																																						} else var u = !0;
																																																																																																																																						if (u) {
																																																																																																																																							if (e.values !== void 0) {
																																																																																																																																								let n = l;
																																																																																																																																								h(e.values, {
																																																																																																																																									instancePath: t + "/values",
																																																																																																																																									parentData: e,
																																																																																																																																									parentDataProperty: "values",
																																																																																																																																									rootData: a
																																																																																																																																								}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																								var u = n === l;
																																																																																																																																							} else var u = !0;
																																																																																																																																							if (u) {
																																																																																																																																								if (e.viewBox !== void 0) {
																																																																																																																																									let n = l;
																																																																																																																																									h(e.viewBox, {
																																																																																																																																										instancePath: t + "/viewBox",
																																																																																																																																										parentData: e,
																																																																																																																																										parentDataProperty: "viewBox",
																																																																																																																																										rootData: a
																																																																																																																																									}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																									var u = n === l;
																																																																																																																																								} else var u = !0;
																																																																																																																																								if (u) {
																																																																																																																																									if (e.visibility !== void 0) {
																																																																																																																																										let n = l;
																																																																																																																																										h(e.visibility, {
																																																																																																																																											instancePath: t + "/visibility",
																																																																																																																																											parentData: e,
																																																																																																																																											parentDataProperty: "visibility",
																																																																																																																																											rootData: a
																																																																																																																																										}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																										var u = n === l;
																																																																																																																																									} else var u = !0;
																																																																																																																																									if (u) {
																																																																																																																																										if (e.width !== void 0) {
																																																																																																																																											let n = l;
																																																																																																																																											h(e.width, {
																																																																																																																																												instancePath: t + "/width",
																																																																																																																																												parentData: e,
																																																																																																																																												parentDataProperty: "width",
																																																																																																																																												rootData: a
																																																																																																																																											}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																											var u = n === l;
																																																																																																																																										} else var u = !0;
																																																																																																																																										if (u) {
																																																																																																																																											if (e["word-spacing"] !== void 0) {
																																																																																																																																												let n = l;
																																																																																																																																												h(e["word-spacing"], {
																																																																																																																																													instancePath: t + "/word-spacing",
																																																																																																																																													parentData: e,
																																																																																																																																													parentDataProperty: "word-spacing",
																																																																																																																																													rootData: a
																																																																																																																																												}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																												var u = n === l;
																																																																																																																																											} else var u = !0;
																																																																																																																																											if (u) {
																																																																																																																																												if (e["writing-mode"] !== void 0) {
																																																																																																																																													let n = l;
																																																																																																																																													h(e["writing-mode"], {
																																																																																																																																														instancePath: t + "/writing-mode",
																																																																																																																																														parentData: e,
																																																																																																																																														parentDataProperty: "writing-mode",
																																																																																																																																														rootData: a
																																																																																																																																													}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																													var u = n === l;
																																																																																																																																												} else var u = !0;
																																																																																																																																												if (u) {
																																																																																																																																													if (e.x !== void 0) {
																																																																																																																																														let n = l;
																																																																																																																																														h(e.x, {
																																																																																																																																															instancePath: t + "/x",
																																																																																																																																															parentData: e,
																																																																																																																																															parentDataProperty: "x",
																																																																																																																																															rootData: a
																																																																																																																																														}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																														var u = n === l;
																																																																																																																																													} else var u = !0;
																																																																																																																																													if (u) {
																																																																																																																																														if (e.x1 !== void 0) {
																																																																																																																																															let n = l;
																																																																																																																																															h(e.x1, {
																																																																																																																																																instancePath: t + "/x1",
																																																																																																																																																parentData: e,
																																																																																																																																																parentDataProperty: "x1",
																																																																																																																																																rootData: a
																																																																																																																																															}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																															var u = n === l;
																																																																																																																																														} else var u = !0;
																																																																																																																																														if (u) {
																																																																																																																																															if (e.x2 !== void 0) {
																																																																																																																																																let n = l;
																																																																																																																																																h(e.x2, {
																																																																																																																																																	instancePath: t + "/x2",
																																																																																																																																																	parentData: e,
																																																																																																																																																	parentDataProperty: "x2",
																																																																																																																																																	rootData: a
																																																																																																																																																}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																var u = n === l;
																																																																																																																																															} else var u = !0;
																																																																																																																																															if (u) {
																																																																																																																																																if (e.xChannelSelector !== void 0) {
																																																																																																																																																	let n = l;
																																																																																																																																																	h(e.xChannelSelector, {
																																																																																																																																																		instancePath: t + "/xChannelSelector",
																																																																																																																																																		parentData: e,
																																																																																																																																																		parentDataProperty: "xChannelSelector",
																																																																																																																																																		rootData: a
																																																																																																																																																	}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																	var u = n === l;
																																																																																																																																																} else var u = !0;
																																																																																																																																																if (u) {
																																																																																																																																																	if (e.y !== void 0) {
																																																																																																																																																		let n = l;
																																																																																																																																																		h(e.y, {
																																																																																																																																																			instancePath: t + "/y",
																																																																																																																																																			parentData: e,
																																																																																																																																																			parentDataProperty: "y",
																																																																																																																																																			rootData: a
																																																																																																																																																		}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																		var u = n === l;
																																																																																																																																																	} else var u = !0;
																																																																																																																																																	if (u) {
																																																																																																																																																		if (e.y1 !== void 0) {
																																																																																																																																																			let n = l;
																																																																																																																																																			h(e.y1, {
																																																																																																																																																				instancePath: t + "/y1",
																																																																																																																																																				parentData: e,
																																																																																																																																																				parentDataProperty: "y1",
																																																																																																																																																				rootData: a
																																																																																																																																																			}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																			var u = n === l;
																																																																																																																																																		} else var u = !0;
																																																																																																																																																		if (u) {
																																																																																																																																																			if (e.y2 !== void 0) {
																																																																																																																																																				let n = l;
																																																																																																																																																				h(e.y2, {
																																																																																																																																																					instancePath: t + "/y2",
																																																																																																																																																					parentData: e,
																																																																																																																																																					parentDataProperty: "y2",
																																																																																																																																																					rootData: a
																																																																																																																																																				}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																				var u = n === l;
																																																																																																																																																			} else var u = !0;
																																																																																																																																																			if (u) {
																																																																																																																																																				if (e.yChannelSelector !== void 0) {
																																																																																																																																																					let n = l;
																																																																																																																																																					h(e.yChannelSelector, {
																																																																																																																																																						instancePath: t + "/yChannelSelector",
																																																																																																																																																						parentData: e,
																																																																																																																																																						parentDataProperty: "yChannelSelector",
																																																																																																																																																						rootData: a
																																																																																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																					var u = n === l;
																																																																																																																																																				} else var u = !0;
																																																																																																																																																				if (u) if (e.z !== void 0) {
																																																																																																																																																					let n = l;
																																																																																																																																																					h(e.z, {
																																																																																																																																																						instancePath: t + "/z",
																																																																																																																																																						parentData: e,
																																																																																																																																																						parentDataProperty: "z",
																																																																																																																																																						rootData: a
																																																																																																																																																					}) || (o = o === null ? h.errors : o.concat(h.errors), l = o.length);
																																																																																																																																																					var u = n === l;
																																																																																																																																																				} else var u = !0;
																																																																																																																																																			}
																																																																																																																																																		}
																																																																																																																																																	}
																																																																																																																																																}
																																																																																																																																															}
																																																																																																																																														}
																																																																																																																																													}
																																																																																																																																												}
																																																																																																																																											}
																																																																																																																																										}
																																																																																																																																									}
																																																																																																																																								}
																																																																																																																																							}
																																																																																																																																						}
																																																																																																																																					}
																																																																																																																																				}
																																																																																																																																			}
																																																																																																																																		}
																																																																																																																																	}
																																																																																																																																}
																																																																																																																															}
																																																																																																																														}
																																																																																																																													}
																																																																																																																												}
																																																																																																																											}
																																																																																																																										}
																																																																																																																									}
																																																																																																																								}
																																																																																																																							}
																																																																																																																						}
																																																																																																																					}
																																																																																																																				}
																																																																																																																			}
																																																																																																																		}
																																																																																																																	}
																																																																																																																}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	} else return S.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return S.errors = o, l === 0;
}
var ae = {
	description: "A raw text node. Its `value` becomes the text content rendered into the parent element.",
	type: "object",
	properties: {
		type: { const: "text" },
		value: {
			description: "Either a plain string, or a `variable` reference resolved at render time to the seed's initials.",
			anyOf: [{
				type: "string",
				maxLength: 4096
			}, {
				type: "object",
				properties: {
					type: { const: "variable" },
					name: { enum: ["initial", "initials"] }
				},
				required: ["type", "name"],
				additionalProperties: !1
			}]
		}
	},
	required: ["type", "value"],
	additionalProperties: !1
};
function C(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: o = e } = {}) {
	if (typeof e == "string") {
		if (r(e) > 64) return C.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/camelCaseName/maxLength",
			keyword: "maxLength",
			params: { limit: 64 },
			message: "must NOT have more than 64 characters"
		}], !1;
		if (!a.test(e)) return C.errors = [{
			instancePath: t,
			schemaPath: "#/definitions/camelCaseName/pattern",
			keyword: "pattern",
			params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
			message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\""
		}], !1;
	} else return C.errors = [{
		instancePath: t,
		schemaPath: "#/definitions/camelCaseName/type",
		keyword: "type",
		params: { type: "string" },
		message: "must be string"
	}], !1;
	return C.errors = null, !0;
}
function oe(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0;
	if (o === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.type === void 0 && (n = "type") || e.name === void 0 && (n = "name")) return oe.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = o;
			for (let n in e) if (!(n === "type" || n === "name" || n === "attributes")) return oe.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === o) {
				if (e.type !== void 0) {
					let n = o;
					if (e.type !== "component") return oe.errors = [{
						instancePath: t + "/type",
						schemaPath: "#/properties/type/const",
						keyword: "const",
						params: { allowedValue: "component" },
						message: "must be equal to constant"
					}], !1;
					var s = n === o;
				} else var s = !0;
				if (s) {
					if (e.name !== void 0) {
						let n = o;
						C(e.name, {
							instancePath: t + "/name",
							parentData: e,
							parentDataProperty: "name",
							rootData: i
						}) || (a = a === null ? C.errors : a.concat(C.errors), o = a.length);
						var s = n === o;
					} else var s = !0;
					if (s) if (e.attributes !== void 0) {
						let n = o;
						S(e.attributes, {
							instancePath: t + "/attributes",
							parentData: e,
							parentDataProperty: "attributes",
							rootData: i
						}) || (a = a === null ? S.errors : a.concat(S.errors), o = a.length);
						var s = n === o;
					} else var s = !0;
				}
			}
		}
	} else return oe.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return oe.errors = a, o === 0;
}
function w(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0;
	if (o === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.type === void 0 && (n = "type") || e.name === void 0 && (n = "name")) return w.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = o;
			for (let n in e) if (!(n === "type" || n === "name" || n === "attributes" || n === "children")) return w.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === o) {
				if (e.type !== void 0) {
					let n = o;
					if (e.type !== "element") return w.errors = [{
						instancePath: t + "/type",
						schemaPath: "#/properties/type/const",
						keyword: "const",
						params: { allowedValue: "element" },
						message: "must be equal to constant"
					}], !1;
					var s = n === o;
				} else var s = !0;
				if (s) {
					if (e.name !== void 0) {
						let n = o;
						if (e.name !== "style") return w.errors = [{
							instancePath: t + "/name",
							schemaPath: "#/properties/name/const",
							keyword: "const",
							params: { allowedValue: "style" },
							message: "must be equal to constant"
						}], !1;
						var s = n === o;
					} else var s = !0;
					if (s) {
						if (e.attributes !== void 0) {
							let n = o;
							S(e.attributes, {
								instancePath: t + "/attributes",
								parentData: e,
								parentDataProperty: "attributes",
								rootData: i
							}) || (a = a === null ? S.errors : a.concat(S.errors), o = a.length);
							var s = n === o;
						} else var s = !0;
						if (s) if (e.children !== void 0) {
							let n = e.children, r = o;
							if (o === r) if (Array.isArray(n)) {
								if (n.length > 64) return w.errors = [{
									instancePath: t + "/children",
									schemaPath: "#/properties/children/maxItems",
									keyword: "maxItems",
									params: { limit: 64 },
									message: "must NOT have more than 64 items"
								}], !1;
								{
									let e = n.length;
									for (let r = 0; r < e; r++) {
										let e = n[r], s = o;
										if (o === s) if (e && typeof e == "object" && !Array.isArray(e)) {
											let n;
											if (e.type === void 0 && (n = "type") || e.value === void 0 && (n = "value")) return w.errors = [{
												instancePath: t + "/children/" + r,
												schemaPath: "#/properties/children/items/required",
												keyword: "required",
												params: { missingProperty: n },
												message: "must have required property '" + n + "'"
											}], !1;
											{
												let n = o;
												for (let n in e) if (!(n === "type" || n === "value")) return w.errors = [{
													instancePath: t + "/children/" + r,
													schemaPath: "#/properties/children/items/additionalProperties",
													keyword: "additionalProperties",
													params: { additionalProperty: n },
													message: "must NOT have additional properties"
												}], !1;
												if (n === o) {
													if (e.type !== void 0) {
														let n = o;
														if (e.type !== "text") return w.errors = [{
															instancePath: t + "/children/" + r + "/type",
															schemaPath: "#/properties/children/items/properties/type/const",
															keyword: "const",
															params: { allowedValue: "text" },
															message: "must be equal to constant"
														}], !1;
														var c = n === o;
													} else var c = !0;
													if (c) if (e.value !== void 0) {
														let n = o;
														x(e.value, {
															instancePath: t + "/children/" + r + "/value",
															parentData: e,
															parentDataProperty: "value",
															rootData: i
														}) || (a = a === null ? x.errors : a.concat(x.errors), o = a.length);
														var c = n === o;
													} else var c = !0;
												}
											}
										} else return w.errors = [{
											instancePath: t + "/children/" + r,
											schemaPath: "#/properties/children/items/type",
											keyword: "type",
											params: { type: "object" },
											message: "must be object"
										}], !1;
										if (s !== o) break;
									}
								}
							} else return w.errors = [{
								instancePath: t + "/children",
								schemaPath: "#/properties/children/type",
								keyword: "type",
								params: { type: "array" },
								message: "must be array"
							}], !1;
							var s = r === o;
						} else var s = !0;
					}
				}
			}
		}
	} else return w.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return w.errors = a, o === 0;
}
var se = {
	description: "Any SVG element other than `<style>`, which has its own stricter content policy.",
	type: "object",
	properties: {
		type: { const: "element" },
		name: {
			description: "The SVG tag name. Only a safe subset of SVG elements is permitted; dangerous elements such as `script`, `foreignObject`, or `a` are excluded.",
			enum: /* @__PURE__ */ "circle.clipPath.defs.desc.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.g.image.line.linearGradient.marker.mask.metadata.mpath.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.title.tspan.use.view".split(".")
		},
		attributes: { $ref: "#/definitions/attributes" },
		children: {
			type: "array",
			items: { $ref: "#/definitions/element" },
			maxItems: 1024
		}
	},
	required: ["type", "name"],
	additionalProperties: !1
}, ce = { validate: E };
function T(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0;
	if (o === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.type === void 0 && (n = "type") || e.name === void 0 && (n = "name")) return T.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = o;
			for (let n in e) if (!(n === "type" || n === "name" || n === "attributes" || n === "children")) return T.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === o) {
				if (e.type !== void 0) {
					let n = o;
					if (e.type !== "element") return T.errors = [{
						instancePath: t + "/type",
						schemaPath: "#/properties/type/const",
						keyword: "const",
						params: { allowedValue: "element" },
						message: "must be equal to constant"
					}], !1;
					var s = n === o;
				} else var s = !0;
				if (s) {
					if (e.name !== void 0) {
						let n = e.name, r = o;
						if (!(n === "circle" || n === "clipPath" || n === "defs" || n === "desc" || n === "ellipse" || n === "feBlend" || n === "feColorMatrix" || n === "feComponentTransfer" || n === "feComposite" || n === "feConvolveMatrix" || n === "feDiffuseLighting" || n === "feDisplacementMap" || n === "feDistantLight" || n === "feDropShadow" || n === "feFlood" || n === "feFuncA" || n === "feFuncB" || n === "feFuncG" || n === "feFuncR" || n === "feGaussianBlur" || n === "feImage" || n === "feMerge" || n === "feMergeNode" || n === "feMorphology" || n === "feOffset" || n === "fePointLight" || n === "feSpecularLighting" || n === "feSpotLight" || n === "feTile" || n === "feTurbulence" || n === "filter" || n === "g" || n === "image" || n === "line" || n === "linearGradient" || n === "marker" || n === "mask" || n === "metadata" || n === "mpath" || n === "path" || n === "pattern" || n === "polygon" || n === "polyline" || n === "radialGradient" || n === "rect" || n === "stop" || n === "svg" || n === "switch" || n === "symbol" || n === "text" || n === "textPath" || n === "title" || n === "tspan" || n === "use" || n === "view")) return T.errors = [{
							instancePath: t + "/name",
							schemaPath: "#/properties/name/enum",
							keyword: "enum",
							params: { allowedValues: se.properties.name.enum },
							message: "must be equal to one of the allowed values"
						}], !1;
						var s = r === o;
					} else var s = !0;
					if (s) {
						if (e.attributes !== void 0) {
							let n = o;
							S(e.attributes, {
								instancePath: t + "/attributes",
								parentData: e,
								parentDataProperty: "attributes",
								rootData: i
							}) || (a = a === null ? S.errors : a.concat(S.errors), o = a.length);
							var s = n === o;
						} else var s = !0;
						if (s) if (e.children !== void 0) {
							let n = e.children, r = o;
							if (o === r) if (Array.isArray(n)) {
								if (n.length > 1024) return T.errors = [{
									instancePath: t + "/children",
									schemaPath: "#/properties/children/maxItems",
									keyword: "maxItems",
									params: { limit: 1024 },
									message: "must NOT have more than 1024 items"
								}], !1;
								{
									let e = n.length;
									for (let r = 0; r < e; r++) {
										let e = o;
										if (ce.validate(n[r], {
											instancePath: t + "/children/" + r,
											parentData: n,
											parentDataProperty: r,
											rootData: i
										}) || (a = a === null ? ce.validate.errors : a.concat(ce.validate.errors), o = a.length), e !== o) break;
									}
								}
							} else return T.errors = [{
								instancePath: t + "/children",
								schemaPath: "#/properties/children/type",
								keyword: "type",
								params: { type: "array" },
								message: "must be array"
							}], !1;
							var s = r === o;
						} else var s = !0;
					}
				}
			}
		}
	} else return T.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return T.errors = a, o === 0;
}
function E(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: a = e } = {}) {
	let o = null, s = 0, c = s, l = !1, u = s;
	if (s === s) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.type === void 0 && (n = "type") || e.value === void 0 && (n = "value")) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/textElement/required",
				keyword: "required",
				params: { missingProperty: n },
				message: "must have required property '" + n + "'"
			};
			o === null ? o = [e] : o.push(e), s++;
		} else {
			let n = s;
			for (let n in e) if (!(n === "type" || n === "value")) {
				let e = {
					instancePath: t,
					schemaPath: "#/definitions/textElement/additionalProperties",
					keyword: "additionalProperties",
					params: { additionalProperty: n },
					message: "must NOT have additional properties"
				};
				o === null ? o = [e] : o.push(e), s++;
				break;
			}
			if (n === s) {
				if (e.type !== void 0) {
					let n = s;
					if (e.type !== "text") {
						let e = {
							instancePath: t + "/type",
							schemaPath: "#/definitions/textElement/properties/type/const",
							keyword: "const",
							params: { allowedValue: "text" },
							message: "must be equal to constant"
						};
						o === null ? o = [e] : o.push(e), s++;
					}
					var d = n === s;
				} else var d = !0;
				if (d) if (e.value !== void 0) {
					let n = e.value, i = s, a = s, c = !1, l = s;
					if (s === l) if (typeof n == "string") {
						if (r(n) > 4096) {
							let e = {
								instancePath: t + "/value",
								schemaPath: "#/definitions/textElement/properties/value/anyOf/0/maxLength",
								keyword: "maxLength",
								params: { limit: 4096 },
								message: "must NOT have more than 4096 characters"
							};
							o === null ? o = [e] : o.push(e), s++;
						}
					} else {
						let e = {
							instancePath: t + "/value",
							schemaPath: "#/definitions/textElement/properties/value/anyOf/0/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						o === null ? o = [e] : o.push(e), s++;
					}
					var f = l === s;
					if (c ||= f, !c) {
						let e = s;
						if (s === e) if (n && typeof n == "object" && !Array.isArray(n)) {
							let e;
							if (n.type === void 0 && (e = "type") || n.name === void 0 && (e = "name")) {
								let n = {
									instancePath: t + "/value",
									schemaPath: "#/definitions/textElement/properties/value/anyOf/1/required",
									keyword: "required",
									params: { missingProperty: e },
									message: "must have required property '" + e + "'"
								};
								o === null ? o = [n] : o.push(n), s++;
							} else {
								let e = s;
								for (let e in n) if (!(e === "type" || e === "name")) {
									let n = {
										instancePath: t + "/value",
										schemaPath: "#/definitions/textElement/properties/value/anyOf/1/additionalProperties",
										keyword: "additionalProperties",
										params: { additionalProperty: e },
										message: "must NOT have additional properties"
									};
									o === null ? o = [n] : o.push(n), s++;
									break;
								}
								if (e === s) {
									if (n.type !== void 0) {
										let e = s;
										if (n.type !== "variable") {
											let e = {
												instancePath: t + "/value/type",
												schemaPath: "#/definitions/textElement/properties/value/anyOf/1/properties/type/const",
												keyword: "const",
												params: { allowedValue: "variable" },
												message: "must be equal to constant"
											};
											o === null ? o = [e] : o.push(e), s++;
										}
										var p = e === s;
									} else var p = !0;
									if (p) if (n.name !== void 0) {
										let e = n.name, r = s;
										if (!(e === "initial" || e === "initials")) {
											let e = {
												instancePath: t + "/value/name",
												schemaPath: "#/definitions/textElement/properties/value/anyOf/1/properties/name/enum",
												keyword: "enum",
												params: { allowedValues: ae.properties.value.anyOf[1].properties.name.enum },
												message: "must be equal to one of the allowed values"
											};
											o === null ? o = [e] : o.push(e), s++;
										}
										var p = r === s;
									} else var p = !0;
								}
							}
						} else {
							let e = {
								instancePath: t + "/value",
								schemaPath: "#/definitions/textElement/properties/value/anyOf/1/type",
								keyword: "type",
								params: { type: "object" },
								message: "must be object"
							};
							o === null ? o = [e] : o.push(e), s++;
						}
						var f = e === s;
						c ||= f;
					}
					if (c) s = a, o !== null && (a ? o.length = a : o = null);
					else {
						let e = {
							instancePath: t + "/value",
							schemaPath: "#/definitions/textElement/properties/value/anyOf",
							keyword: "anyOf",
							params: {},
							message: "must match a schema in anyOf"
						};
						o === null ? o = [e] : o.push(e), s++;
					}
					var d = i === s;
				} else var d = !0;
			}
		}
	} else {
		let e = {
			instancePath: t,
			schemaPath: "#/definitions/textElement/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		o === null ? o = [e] : o.push(e), s++;
	}
	var m = u === s;
	if (l ||= m, !l) {
		let r = s;
		oe(e, {
			instancePath: t,
			parentData: n,
			parentDataProperty: i,
			rootData: a
		}) || (o = o === null ? oe.errors : o.concat(oe.errors), s = o.length);
		var m = r === s;
		if (l ||= m, !l) {
			let r = s;
			w(e, {
				instancePath: t,
				parentData: n,
				parentDataProperty: i,
				rootData: a
			}) || (o = o === null ? w.errors : o.concat(w.errors), s = o.length);
			var m = r === s;
			if (l ||= m, !l) {
				let r = s;
				T(e, {
					instancePath: t,
					parentData: n,
					parentDataProperty: i,
					rootData: a
				}) || (o = o === null ? T.errors : o.concat(T.errors), s = o.length);
				var m = r === s;
				l ||= m;
			}
		}
	}
	if (l) s = c, o !== null && (c ? o.length = c : o = null);
	else {
		let e = {
			instancePath: t,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf"
		};
		return o === null ? o = [e] : o.push(e), s++, E.errors = o, !1;
	}
	return E.errors = o, s === 0;
}
function D(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	if (e && typeof e == "object" && !Array.isArray(e)) {
		for (let n in e) if (!(n === "x" || n === "y")) return D.errors = [{
			instancePath: t,
			schemaPath: "#/additionalProperties",
			keyword: "additionalProperties",
			params: { additionalProperty: n },
			message: "must NOT have additional properties"
		}], !1;
		if (e.x !== void 0) {
			let n = e.x;
			if (n && typeof n == "object" && !Array.isArray(n)) {
				let e;
				if (n.min === void 0 && (e = "min") || n.max === void 0 && (e = "max")) return D.errors = [{
					instancePath: t + "/x",
					schemaPath: "#/definitions/translateValue/required",
					keyword: "required",
					params: { missingProperty: e },
					message: "must have required property '" + e + "'"
				}], !1;
				for (let e in n) if (!(e === "min" || e === "max" || e === "step")) return D.errors = [{
					instancePath: t + "/x",
					schemaPath: "#/definitions/translateValue/additionalProperties",
					keyword: "additionalProperties",
					params: { additionalProperty: e },
					message: "must NOT have additional properties"
				}], !1;
				if (n.min !== void 0) {
					let e = n.min;
					if (typeof e == "number" && isFinite(e)) {
						if (e > 1e3 || isNaN(e)) return D.errors = [{
							instancePath: t + "/x/min",
							schemaPath: "#/definitions/translateValue/properties/min/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 1e3
							},
							message: "must be <= 1000"
						}], !1;
						if (e < -1e3 || isNaN(e)) return D.errors = [{
							instancePath: t + "/x/min",
							schemaPath: "#/definitions/translateValue/properties/min/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: -1e3
							},
							message: "must be >= -1000"
						}], !1;
					} else return D.errors = [{
						instancePath: t + "/x/min",
						schemaPath: "#/definitions/translateValue/properties/min/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					}], !1;
					var a = !0;
				} else var a = !0;
				if (a) {
					if (n.max !== void 0) {
						let e = n.max;
						if (typeof e == "number" && isFinite(e)) {
							if (e > 1e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/x/max",
								schemaPath: "#/definitions/translateValue/properties/max/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 1e3
								},
								message: "must be <= 1000"
							}], !1;
							if (e < -1e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/x/max",
								schemaPath: "#/definitions/translateValue/properties/max/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: -1e3
								},
								message: "must be >= -1000"
							}], !1;
						} else return D.errors = [{
							instancePath: t + "/x/max",
							schemaPath: "#/definitions/translateValue/properties/max/type",
							keyword: "type",
							params: { type: "number" },
							message: "must be number"
						}], !1;
						var a = !0;
					} else var a = !0;
					if (a) if (n.step !== void 0) {
						let e = n.step;
						if (typeof e == "number" && isFinite(e)) {
							if (e > 2e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/x/step",
								schemaPath: "#/definitions/translateValue/properties/step/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 2e3
								},
								message: "must be <= 2000"
							}], !1;
							if (e <= 0 || isNaN(e)) return D.errors = [{
								instancePath: t + "/x/step",
								schemaPath: "#/definitions/translateValue/properties/step/exclusiveMinimum",
								keyword: "exclusiveMinimum",
								params: {
									comparison: ">",
									limit: 0
								},
								message: "must be > 0"
							}], !1;
						} else return D.errors = [{
							instancePath: t + "/x/step",
							schemaPath: "#/definitions/translateValue/properties/step/type",
							keyword: "type",
							params: { type: "number" },
							message: "must be number"
						}], !1;
						var a = !0;
					} else var a = !0;
				}
			} else return D.errors = [{
				instancePath: t + "/x",
				schemaPath: "#/definitions/translateValue/type",
				keyword: "type",
				params: { type: "object" },
				message: "must be object"
			}], !1;
			var o = !0;
		} else var o = !0;
		if (o) if (e.y !== void 0) {
			let n = e.y;
			if (n && typeof n == "object" && !Array.isArray(n)) {
				let e;
				if (n.min === void 0 && (e = "min") || n.max === void 0 && (e = "max")) return D.errors = [{
					instancePath: t + "/y",
					schemaPath: "#/definitions/translateValue/required",
					keyword: "required",
					params: { missingProperty: e },
					message: "must have required property '" + e + "'"
				}], !1;
				for (let e in n) if (!(e === "min" || e === "max" || e === "step")) return D.errors = [{
					instancePath: t + "/y",
					schemaPath: "#/definitions/translateValue/additionalProperties",
					keyword: "additionalProperties",
					params: { additionalProperty: e },
					message: "must NOT have additional properties"
				}], !1;
				if (n.min !== void 0) {
					let e = n.min;
					if (typeof e == "number" && isFinite(e)) {
						if (e > 1e3 || isNaN(e)) return D.errors = [{
							instancePath: t + "/y/min",
							schemaPath: "#/definitions/translateValue/properties/min/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 1e3
							},
							message: "must be <= 1000"
						}], !1;
						if (e < -1e3 || isNaN(e)) return D.errors = [{
							instancePath: t + "/y/min",
							schemaPath: "#/definitions/translateValue/properties/min/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: -1e3
							},
							message: "must be >= -1000"
						}], !1;
					} else return D.errors = [{
						instancePath: t + "/y/min",
						schemaPath: "#/definitions/translateValue/properties/min/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					}], !1;
					var s = !0;
				} else var s = !0;
				if (s) {
					if (n.max !== void 0) {
						let e = n.max;
						if (typeof e == "number" && isFinite(e)) {
							if (e > 1e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/y/max",
								schemaPath: "#/definitions/translateValue/properties/max/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 1e3
								},
								message: "must be <= 1000"
							}], !1;
							if (e < -1e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/y/max",
								schemaPath: "#/definitions/translateValue/properties/max/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: -1e3
								},
								message: "must be >= -1000"
							}], !1;
						} else return D.errors = [{
							instancePath: t + "/y/max",
							schemaPath: "#/definitions/translateValue/properties/max/type",
							keyword: "type",
							params: { type: "number" },
							message: "must be number"
						}], !1;
						var s = !0;
					} else var s = !0;
					if (s) if (n.step !== void 0) {
						let e = n.step;
						if (typeof e == "number" && isFinite(e)) {
							if (e > 2e3 || isNaN(e)) return D.errors = [{
								instancePath: t + "/y/step",
								schemaPath: "#/definitions/translateValue/properties/step/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 2e3
								},
								message: "must be <= 2000"
							}], !1;
							if (e <= 0 || isNaN(e)) return D.errors = [{
								instancePath: t + "/y/step",
								schemaPath: "#/definitions/translateValue/properties/step/exclusiveMinimum",
								keyword: "exclusiveMinimum",
								params: {
									comparison: ">",
									limit: 0
								},
								message: "must be > 0"
							}], !1;
						} else return D.errors = [{
							instancePath: t + "/y/step",
							schemaPath: "#/definitions/translateValue/properties/step/type",
							keyword: "type",
							params: { type: "number" },
							message: "must be number"
						}], !1;
						var s = !0;
					} else var s = !0;
				}
			} else return D.errors = [{
				instancePath: t + "/y",
				schemaPath: "#/definitions/translateValue/type",
				keyword: "type",
				params: { type: "object" },
				message: "must be object"
			}], !1;
			var o = !0;
		} else var o = !0;
	} else return D.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return D.errors = null, !0;
}
function O(e, { instancePath: t = "", parentData: n, parentDataProperty: i, rootData: o = e } = {}) {
	let s = null, c = 0;
	if (c === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.width === void 0 && (n = "width") || e.height === void 0 && (n = "height") || e.variants === void 0 && (n = "variants")) return O.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = c;
			for (let n in e) if (!(n === "width" || n === "height" || n === "probability" || n === "rotate" || n === "scale" || n === "translate" || n === "variants")) return O.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === c) {
				if (e.width !== void 0) {
					let n = e.width, r = c;
					if (c === r) if (typeof n == "number" && isFinite(n)) {
						if (n > 1e6 || isNaN(n)) return O.errors = [{
							instancePath: t + "/width",
							schemaPath: "#/properties/width/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 1e6
							},
							message: "must be <= 1000000"
						}], !1;
						if (n < 1 || isNaN(n)) return O.errors = [{
							instancePath: t + "/width",
							schemaPath: "#/properties/width/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: 1
							},
							message: "must be >= 1"
						}], !1;
					} else return O.errors = [{
						instancePath: t + "/width",
						schemaPath: "#/properties/width/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					}], !1;
					var l = r === c;
				} else var l = !0;
				if (l) {
					if (e.height !== void 0) {
						let n = e.height, r = c;
						if (c === r) if (typeof n == "number" && isFinite(n)) {
							if (n > 1e6 || isNaN(n)) return O.errors = [{
								instancePath: t + "/height",
								schemaPath: "#/properties/height/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 1e6
								},
								message: "must be <= 1000000"
							}], !1;
							if (n < 1 || isNaN(n)) return O.errors = [{
								instancePath: t + "/height",
								schemaPath: "#/properties/height/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: 1
								},
								message: "must be >= 1"
							}], !1;
						} else return O.errors = [{
							instancePath: t + "/height",
							schemaPath: "#/properties/height/type",
							keyword: "type",
							params: { type: "number" },
							message: "must be number"
						}], !1;
						var l = r === c;
					} else var l = !0;
					if (l) {
						if (e.probability !== void 0) {
							let n = e.probability, r = c;
							if (c === c) if (typeof n == "number" && isFinite(n)) {
								if (n > 100 || isNaN(n)) return O.errors = [{
									instancePath: t + "/probability",
									schemaPath: "#/definitions/componentProbability/maximum",
									keyword: "maximum",
									params: {
										comparison: "<=",
										limit: 100
									},
									message: "must be <= 100"
								}], !1;
								if (n < 0 || isNaN(n)) return O.errors = [{
									instancePath: t + "/probability",
									schemaPath: "#/definitions/componentProbability/minimum",
									keyword: "minimum",
									params: {
										comparison: ">=",
										limit: 0
									},
									message: "must be >= 0"
								}], !1;
							} else return O.errors = [{
								instancePath: t + "/probability",
								schemaPath: "#/definitions/componentProbability/type",
								keyword: "type",
								params: { type: "number" },
								message: "must be number"
							}], !1;
							var l = r === c;
						} else var l = !0;
						if (l) {
							if (e.rotate !== void 0) {
								let n = e.rotate, r = c;
								if (c === c) if (n && typeof n == "object" && !Array.isArray(n)) {
									let e;
									if (n.min === void 0 && (e = "min") || n.max === void 0 && (e = "max")) return O.errors = [{
										instancePath: t + "/rotate",
										schemaPath: "#/definitions/componentRotate/required",
										keyword: "required",
										params: { missingProperty: e },
										message: "must have required property '" + e + "'"
									}], !1;
									{
										let e = c;
										for (let e in n) if (!(e === "min" || e === "max" || e === "step")) return O.errors = [{
											instancePath: t + "/rotate",
											schemaPath: "#/definitions/componentRotate/additionalProperties",
											keyword: "additionalProperties",
											params: { additionalProperty: e },
											message: "must NOT have additional properties"
										}], !1;
										if (e === c) {
											if (n.min !== void 0) {
												let e = n.min, r = c;
												if (c === r) if (typeof e == "number" && isFinite(e)) {
													if (e > 360 || isNaN(e)) return O.errors = [{
														instancePath: t + "/rotate/min",
														schemaPath: "#/definitions/componentRotate/properties/min/maximum",
														keyword: "maximum",
														params: {
															comparison: "<=",
															limit: 360
														},
														message: "must be <= 360"
													}], !1;
													if (e < -360 || isNaN(e)) return O.errors = [{
														instancePath: t + "/rotate/min",
														schemaPath: "#/definitions/componentRotate/properties/min/minimum",
														keyword: "minimum",
														params: {
															comparison: ">=",
															limit: -360
														},
														message: "must be >= -360"
													}], !1;
												} else return O.errors = [{
													instancePath: t + "/rotate/min",
													schemaPath: "#/definitions/componentRotate/properties/min/type",
													keyword: "type",
													params: { type: "number" },
													message: "must be number"
												}], !1;
												var u = r === c;
											} else var u = !0;
											if (u) {
												if (n.max !== void 0) {
													let e = n.max, r = c;
													if (c === r) if (typeof e == "number" && isFinite(e)) {
														if (e > 360 || isNaN(e)) return O.errors = [{
															instancePath: t + "/rotate/max",
															schemaPath: "#/definitions/componentRotate/properties/max/maximum",
															keyword: "maximum",
															params: {
																comparison: "<=",
																limit: 360
															},
															message: "must be <= 360"
														}], !1;
														if (e < -360 || isNaN(e)) return O.errors = [{
															instancePath: t + "/rotate/max",
															schemaPath: "#/definitions/componentRotate/properties/max/minimum",
															keyword: "minimum",
															params: {
																comparison: ">=",
																limit: -360
															},
															message: "must be >= -360"
														}], !1;
													} else return O.errors = [{
														instancePath: t + "/rotate/max",
														schemaPath: "#/definitions/componentRotate/properties/max/type",
														keyword: "type",
														params: { type: "number" },
														message: "must be number"
													}], !1;
													var u = r === c;
												} else var u = !0;
												if (u) if (n.step !== void 0) {
													let e = n.step, r = c;
													if (c === r) if (typeof e == "number" && isFinite(e)) {
														if (e > 720 || isNaN(e)) return O.errors = [{
															instancePath: t + "/rotate/step",
															schemaPath: "#/definitions/componentRotate/properties/step/maximum",
															keyword: "maximum",
															params: {
																comparison: "<=",
																limit: 720
															},
															message: "must be <= 720"
														}], !1;
														if (e <= 0 || isNaN(e)) return O.errors = [{
															instancePath: t + "/rotate/step",
															schemaPath: "#/definitions/componentRotate/properties/step/exclusiveMinimum",
															keyword: "exclusiveMinimum",
															params: {
																comparison: ">",
																limit: 0
															},
															message: "must be > 0"
														}], !1;
													} else return O.errors = [{
														instancePath: t + "/rotate/step",
														schemaPath: "#/definitions/componentRotate/properties/step/type",
														keyword: "type",
														params: { type: "number" },
														message: "must be number"
													}], !1;
													var u = r === c;
												} else var u = !0;
											}
										}
									}
								} else return O.errors = [{
									instancePath: t + "/rotate",
									schemaPath: "#/definitions/componentRotate/type",
									keyword: "type",
									params: { type: "object" },
									message: "must be object"
								}], !1;
								var l = r === c;
							} else var l = !0;
							if (l) {
								if (e.scale !== void 0) {
									let n = e.scale, r = c;
									if (c === c) if (n && typeof n == "object" && !Array.isArray(n)) {
										let e;
										if (n.min === void 0 && (e = "min") || n.max === void 0 && (e = "max")) return O.errors = [{
											instancePath: t + "/scale",
											schemaPath: "#/definitions/componentScale/required",
											keyword: "required",
											params: { missingProperty: e },
											message: "must have required property '" + e + "'"
										}], !1;
										{
											let e = c;
											for (let e in n) if (!(e === "min" || e === "max" || e === "step")) return O.errors = [{
												instancePath: t + "/scale",
												schemaPath: "#/definitions/componentScale/additionalProperties",
												keyword: "additionalProperties",
												params: { additionalProperty: e },
												message: "must NOT have additional properties"
											}], !1;
											if (e === c) {
												if (n.min !== void 0) {
													let e = n.min, r = c;
													if (c === r) if (typeof e == "number" && isFinite(e)) {
														if (e > 10 || isNaN(e)) return O.errors = [{
															instancePath: t + "/scale/min",
															schemaPath: "#/definitions/componentScale/properties/min/maximum",
															keyword: "maximum",
															params: {
																comparison: "<=",
																limit: 10
															},
															message: "must be <= 10"
														}], !1;
														if (e < 0 || isNaN(e)) return O.errors = [{
															instancePath: t + "/scale/min",
															schemaPath: "#/definitions/componentScale/properties/min/minimum",
															keyword: "minimum",
															params: {
																comparison: ">=",
																limit: 0
															},
															message: "must be >= 0"
														}], !1;
													} else return O.errors = [{
														instancePath: t + "/scale/min",
														schemaPath: "#/definitions/componentScale/properties/min/type",
														keyword: "type",
														params: { type: "number" },
														message: "must be number"
													}], !1;
													var d = r === c;
												} else var d = !0;
												if (d) {
													if (n.max !== void 0) {
														let e = n.max, r = c;
														if (c === r) if (typeof e == "number" && isFinite(e)) {
															if (e > 10 || isNaN(e)) return O.errors = [{
																instancePath: t + "/scale/max",
																schemaPath: "#/definitions/componentScale/properties/max/maximum",
																keyword: "maximum",
																params: {
																	comparison: "<=",
																	limit: 10
																},
																message: "must be <= 10"
															}], !1;
															if (e < 0 || isNaN(e)) return O.errors = [{
																instancePath: t + "/scale/max",
																schemaPath: "#/definitions/componentScale/properties/max/minimum",
																keyword: "minimum",
																params: {
																	comparison: ">=",
																	limit: 0
																},
																message: "must be >= 0"
															}], !1;
														} else return O.errors = [{
															instancePath: t + "/scale/max",
															schemaPath: "#/definitions/componentScale/properties/max/type",
															keyword: "type",
															params: { type: "number" },
															message: "must be number"
														}], !1;
														var d = r === c;
													} else var d = !0;
													if (d) if (n.step !== void 0) {
														let e = n.step, r = c;
														if (c === r) if (typeof e == "number" && isFinite(e)) {
															if (e > 10 || isNaN(e)) return O.errors = [{
																instancePath: t + "/scale/step",
																schemaPath: "#/definitions/componentScale/properties/step/maximum",
																keyword: "maximum",
																params: {
																	comparison: "<=",
																	limit: 10
																},
																message: "must be <= 10"
															}], !1;
															if (e <= 0 || isNaN(e)) return O.errors = [{
																instancePath: t + "/scale/step",
																schemaPath: "#/definitions/componentScale/properties/step/exclusiveMinimum",
																keyword: "exclusiveMinimum",
																params: {
																	comparison: ">",
																	limit: 0
																},
																message: "must be > 0"
															}], !1;
														} else return O.errors = [{
															instancePath: t + "/scale/step",
															schemaPath: "#/definitions/componentScale/properties/step/type",
															keyword: "type",
															params: { type: "number" },
															message: "must be number"
														}], !1;
														var d = r === c;
													} else var d = !0;
												}
											}
										}
									} else return O.errors = [{
										instancePath: t + "/scale",
										schemaPath: "#/definitions/componentScale/type",
										keyword: "type",
										params: { type: "object" },
										message: "must be object"
									}], !1;
									var l = r === c;
								} else var l = !0;
								if (l) {
									if (e.translate !== void 0) {
										let n = c;
										D(e.translate, {
											instancePath: t + "/translate",
											parentData: e,
											parentDataProperty: "translate",
											rootData: o
										}) || (s = s === null ? D.errors : s.concat(D.errors), c = s.length);
										var l = n === c;
									} else var l = !0;
									if (l) if (e.variants !== void 0) {
										let n = e.variants, i = c;
										if (c === i) if (n && typeof n == "object" && !Array.isArray(n)) {
											if (Object.keys(n).length > 512) return O.errors = [{
												instancePath: t + "/variants",
												schemaPath: "#/properties/variants/maxProperties",
												keyword: "maxProperties",
												params: { limit: 512 },
												message: "must NOT have more than 512 properties"
											}], !1;
											for (let e in n) {
												let n = c;
												if (c === c) if (typeof e == "string") {
													if (r(e) > 64) {
														let n = {
															instancePath: t + "/variants",
															schemaPath: "#/definitions/camelCaseName/maxLength",
															keyword: "maxLength",
															params: { limit: 64 },
															message: "must NOT have more than 64 characters",
															propertyName: e
														};
														s === null ? s = [n] : s.push(n), c++;
													} else if (!a.test(e)) {
														let n = {
															instancePath: t + "/variants",
															schemaPath: "#/definitions/camelCaseName/pattern",
															keyword: "pattern",
															params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
															message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\"",
															propertyName: e
														};
														s === null ? s = [n] : s.push(n), c++;
													}
												} else {
													let n = {
														instancePath: t + "/variants",
														schemaPath: "#/definitions/camelCaseName/type",
														keyword: "type",
														params: { type: "string" },
														message: "must be string",
														propertyName: e
													};
													s === null ? s = [n] : s.push(n), c++;
												}
												var f = n === c;
												if (!f) {
													let n = {
														instancePath: t + "/variants",
														schemaPath: "#/properties/variants/propertyNames",
														keyword: "propertyNames",
														params: { propertyName: e },
														message: "property name must be valid"
													};
													return s === null ? s = [n] : s.push(n), c++, O.errors = s, !1;
												}
											}
											if (f) for (let e in n) {
												let r = n[e], i = c;
												if (c === i) if (r && typeof r == "object" && !Array.isArray(r)) {
													let n;
													if (r.elements === void 0 && (n = "elements")) return O.errors = [{
														instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
														schemaPath: "#/properties/variants/additionalProperties/required",
														keyword: "required",
														params: { missingProperty: n },
														message: "must have required property '" + n + "'"
													}], !1;
													{
														let n = c;
														for (let n in r) if (!(n === "elements" || n === "weight")) return O.errors = [{
															instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
															schemaPath: "#/properties/variants/additionalProperties/additionalProperties",
															keyword: "additionalProperties",
															params: { additionalProperty: n },
															message: "must NOT have additional properties"
														}], !1;
														if (n === c) {
															if (r.elements !== void 0) {
																let n = r.elements, i = c;
																if (c === i) if (Array.isArray(n)) {
																	if (n.length > 1024) return O.errors = [{
																		instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/elements",
																		schemaPath: "#/properties/variants/additionalProperties/properties/elements/maxItems",
																		keyword: "maxItems",
																		params: { limit: 1024 },
																		message: "must NOT have more than 1024 items"
																	}], !1;
																	{
																		let r = n.length;
																		for (let i = 0; i < r; i++) {
																			let r = c;
																			if (E(n[i], {
																				instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/elements/" + i,
																				parentData: n,
																				parentDataProperty: i,
																				rootData: o
																			}) || (s = s === null ? E.errors : s.concat(E.errors), c = s.length), r !== c) break;
																		}
																	}
																} else return O.errors = [{
																	instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/elements",
																	schemaPath: "#/properties/variants/additionalProperties/properties/elements/type",
																	keyword: "type",
																	params: { type: "array" },
																	message: "must be array"
																}], !1;
																var p = i === c;
															} else var p = !0;
															if (p) if (r.weight !== void 0) {
																let n = r.weight, i = c;
																if (c === i) if (typeof n == "number" && isFinite(n)) {
																	if (n > 1e6 || isNaN(n)) return O.errors = [{
																		instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/weight",
																		schemaPath: "#/properties/variants/additionalProperties/properties/weight/maximum",
																		keyword: "maximum",
																		params: {
																			comparison: "<=",
																			limit: 1e6
																		},
																		message: "must be <= 1000000"
																	}], !1;
																	if (n < 0 || isNaN(n)) return O.errors = [{
																		instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/weight",
																		schemaPath: "#/properties/variants/additionalProperties/properties/weight/minimum",
																		keyword: "minimum",
																		params: {
																			comparison: ">=",
																			limit: 0
																		},
																		message: "must be >= 0"
																	}], !1;
																} else return O.errors = [{
																	instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/weight",
																	schemaPath: "#/properties/variants/additionalProperties/properties/weight/type",
																	keyword: "type",
																	params: { type: "number" },
																	message: "must be number"
																}], !1;
																var p = i === c;
															} else var p = !0;
														}
													}
												} else return O.errors = [{
													instancePath: t + "/variants/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
													schemaPath: "#/properties/variants/additionalProperties/type",
													keyword: "type",
													params: { type: "object" },
													message: "must be object"
												}], !1;
												if (i !== c) break;
											}
										} else return O.errors = [{
											instancePath: t + "/variants",
											schemaPath: "#/properties/variants/type",
											keyword: "type",
											params: { type: "object" },
											message: "must be object"
										}], !1;
										var l = i === c;
									} else var l = !0;
								}
							}
						}
					}
				}
			}
		}
	} else return O.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return O.errors = s, c === 0;
}
function le(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0;
	if (o === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.extends === void 0 && (n = "extends")) return le.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = o;
			for (let n in e) if (n !== "extends") return le.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			n === o && e.extends !== void 0 && (C(e.extends, {
				instancePath: t + "/extends",
				parentData: e,
				parentDataProperty: "extends",
				rootData: i
			}) || (a = a === null ? C.errors : a.concat(C.errors), o = a.length));
		}
	} else return le.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return le.errors = a, o === 0;
}
function k(e, { instancePath: t = "", parentData: n, parentDataProperty: s, rootData: c = e } = {}) {
	let l = null, u = 0;
	if (u === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		let n;
		if (e.canvas === void 0 && (n = "canvas")) return k.errors = [{
			instancePath: t,
			schemaPath: "#/required",
			keyword: "required",
			params: { missingProperty: n },
			message: "must have required property '" + n + "'"
		}], !1;
		{
			let n = u;
			for (let n in e) if (!(n === "$id" || n === "$schema" || n === "$comment" || n === "meta" || n === "attributes" || n === "canvas" || n === "components" || n === "colors")) return k.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === u) {
				if (e.$id !== void 0) {
					let n = e.$id, i = u;
					if (u === i) if (typeof n == "string") {
						if (r(n) > 256) return k.errors = [{
							instancePath: t + "/$id",
							schemaPath: "#/properties/%24id/maxLength",
							keyword: "maxLength",
							params: { limit: 256 },
							message: "must NOT have more than 256 characters"
						}], !1;
					} else return k.errors = [{
						instancePath: t + "/$id",
						schemaPath: "#/properties/%24id/type",
						keyword: "type",
						params: { type: "string" },
						message: "must be string"
					}], !1;
					var d = i === u;
				} else var d = !0;
				if (d) {
					if (e.$schema !== void 0) {
						let n = e.$schema, i = u;
						if (u === i) if (typeof n == "string") {
							if (r(n) > 256) return k.errors = [{
								instancePath: t + "/$schema",
								schemaPath: "#/properties/%24schema/maxLength",
								keyword: "maxLength",
								params: { limit: 256 },
								message: "must NOT have more than 256 characters"
							}], !1;
						} else return k.errors = [{
							instancePath: t + "/$schema",
							schemaPath: "#/properties/%24schema/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						}], !1;
						var d = i === u;
					} else var d = !0;
					if (d) {
						if (e.$comment !== void 0) {
							let n = e.$comment, i = u;
							if (u === i) if (typeof n == "string") {
								if (r(n) > 4096) return k.errors = [{
									instancePath: t + "/$comment",
									schemaPath: "#/properties/%24comment/maxLength",
									keyword: "maxLength",
									params: { limit: 4096 },
									message: "must NOT have more than 4096 characters"
								}], !1;
							} else return k.errors = [{
								instancePath: t + "/$comment",
								schemaPath: "#/properties/%24comment/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							}], !1;
							var d = i === u;
						} else var d = !0;
						if (d) {
							if (e.meta !== void 0) {
								let n = e.meta, a = u;
								if (u === a) if (n && typeof n == "object" && !Array.isArray(n)) {
									let e = u;
									for (let e in n) if (!(e === "license" || e === "creator" || e === "source")) return k.errors = [{
										instancePath: t + "/meta",
										schemaPath: "#/properties/meta/additionalProperties",
										keyword: "additionalProperties",
										params: { additionalProperty: e },
										message: "must NOT have additional properties"
									}], !1;
									if (e === u) {
										if (n.license !== void 0) {
											let e = n.license, a = u;
											if (u === a) if (e && typeof e == "object" && !Array.isArray(e)) {
												let n = u;
												for (let n in e) if (!(n === "name" || n === "url" || n === "text")) return k.errors = [{
													instancePath: t + "/meta/license",
													schemaPath: "#/properties/meta/properties/license/additionalProperties",
													keyword: "additionalProperties",
													params: { additionalProperty: n },
													message: "must NOT have additional properties"
												}], !1;
												if (n === u) {
													if (e.name !== void 0) {
														let n = e.name, i = u;
														if (u === i) if (typeof n == "string") {
															if (r(n) > 128) return k.errors = [{
																instancePath: t + "/meta/license/name",
																schemaPath: "#/properties/meta/properties/license/properties/name/maxLength",
																keyword: "maxLength",
																params: { limit: 128 },
																message: "must NOT have more than 128 characters"
															}], !1;
														} else return k.errors = [{
															instancePath: t + "/meta/license/name",
															schemaPath: "#/properties/meta/properties/license/properties/name/type",
															keyword: "type",
															params: { type: "string" },
															message: "must be string"
														}], !1;
														var f = i === u;
													} else var f = !0;
													if (f) {
														if (e.url !== void 0) {
															let n = e.url, a = u;
															if (u === u) if (typeof n == "string") {
																if (r(n) > 2048) return k.errors = [{
																	instancePath: t + "/meta/license/url",
																	schemaPath: "#/definitions/safeUrl/maxLength",
																	keyword: "maxLength",
																	params: { limit: 2048 },
																	message: "must NOT have more than 2048 characters"
																}], !1;
																if (!i.test(n)) return k.errors = [{
																	instancePath: t + "/meta/license/url",
																	schemaPath: "#/definitions/safeUrl/pattern",
																	keyword: "pattern",
																	params: { pattern: "^https?://" },
																	message: "must match pattern \"^https?://\""
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/license/url",
																schemaPath: "#/definitions/safeUrl/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var f = a === u;
														} else var f = !0;
														if (f) if (e.text !== void 0) {
															let n = e.text, i = u;
															if (u === i) if (typeof n == "string") {
																if (r(n) > 32768) return k.errors = [{
																	instancePath: t + "/meta/license/text",
																	schemaPath: "#/properties/meta/properties/license/properties/text/maxLength",
																	keyword: "maxLength",
																	params: { limit: 32768 },
																	message: "must NOT have more than 32768 characters"
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/license/text",
																schemaPath: "#/properties/meta/properties/license/properties/text/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var f = i === u;
														} else var f = !0;
													}
												}
											} else return k.errors = [{
												instancePath: t + "/meta/license",
												schemaPath: "#/properties/meta/properties/license/type",
												keyword: "type",
												params: { type: "object" },
												message: "must be object"
											}], !1;
											var p = a === u;
										} else var p = !0;
										if (p) {
											if (n.creator !== void 0) {
												let e = n.creator, a = u;
												if (u === a) if (e && typeof e == "object" && !Array.isArray(e)) {
													let n = u;
													for (let n in e) if (!(n === "name" || n === "url")) return k.errors = [{
														instancePath: t + "/meta/creator",
														schemaPath: "#/properties/meta/properties/creator/additionalProperties",
														keyword: "additionalProperties",
														params: { additionalProperty: n },
														message: "must NOT have additional properties"
													}], !1;
													if (n === u) {
														if (e.name !== void 0) {
															let n = e.name, i = u;
															if (u === i) if (typeof n == "string") {
																if (r(n) > 128) return k.errors = [{
																	instancePath: t + "/meta/creator/name",
																	schemaPath: "#/properties/meta/properties/creator/properties/name/maxLength",
																	keyword: "maxLength",
																	params: { limit: 128 },
																	message: "must NOT have more than 128 characters"
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/creator/name",
																schemaPath: "#/properties/meta/properties/creator/properties/name/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var m = i === u;
														} else var m = !0;
														if (m) if (e.url !== void 0) {
															let n = e.url, a = u;
															if (u === u) if (typeof n == "string") {
																if (r(n) > 2048) return k.errors = [{
																	instancePath: t + "/meta/creator/url",
																	schemaPath: "#/definitions/safeUrl/maxLength",
																	keyword: "maxLength",
																	params: { limit: 2048 },
																	message: "must NOT have more than 2048 characters"
																}], !1;
																if (!i.test(n)) return k.errors = [{
																	instancePath: t + "/meta/creator/url",
																	schemaPath: "#/definitions/safeUrl/pattern",
																	keyword: "pattern",
																	params: { pattern: "^https?://" },
																	message: "must match pattern \"^https?://\""
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/creator/url",
																schemaPath: "#/definitions/safeUrl/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var m = a === u;
														} else var m = !0;
													}
												} else return k.errors = [{
													instancePath: t + "/meta/creator",
													schemaPath: "#/properties/meta/properties/creator/type",
													keyword: "type",
													params: { type: "object" },
													message: "must be object"
												}], !1;
												var p = a === u;
											} else var p = !0;
											if (p) if (n.source !== void 0) {
												let e = n.source, a = u;
												if (u === a) if (e && typeof e == "object" && !Array.isArray(e)) {
													let n = u;
													for (let n in e) if (!(n === "name" || n === "url")) return k.errors = [{
														instancePath: t + "/meta/source",
														schemaPath: "#/properties/meta/properties/source/additionalProperties",
														keyword: "additionalProperties",
														params: { additionalProperty: n },
														message: "must NOT have additional properties"
													}], !1;
													if (n === u) {
														if (e.name !== void 0) {
															let n = e.name, i = u;
															if (u === i) if (typeof n == "string") {
																if (r(n) > 128) return k.errors = [{
																	instancePath: t + "/meta/source/name",
																	schemaPath: "#/properties/meta/properties/source/properties/name/maxLength",
																	keyword: "maxLength",
																	params: { limit: 128 },
																	message: "must NOT have more than 128 characters"
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/source/name",
																schemaPath: "#/properties/meta/properties/source/properties/name/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var ee = i === u;
														} else var ee = !0;
														if (ee) if (e.url !== void 0) {
															let n = e.url, a = u;
															if (u === u) if (typeof n == "string") {
																if (r(n) > 2048) return k.errors = [{
																	instancePath: t + "/meta/source/url",
																	schemaPath: "#/definitions/safeUrl/maxLength",
																	keyword: "maxLength",
																	params: { limit: 2048 },
																	message: "must NOT have more than 2048 characters"
																}], !1;
																if (!i.test(n)) return k.errors = [{
																	instancePath: t + "/meta/source/url",
																	schemaPath: "#/definitions/safeUrl/pattern",
																	keyword: "pattern",
																	params: { pattern: "^https?://" },
																	message: "must match pattern \"^https?://\""
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/meta/source/url",
																schemaPath: "#/definitions/safeUrl/type",
																keyword: "type",
																params: { type: "string" },
																message: "must be string"
															}], !1;
															var ee = a === u;
														} else var ee = !0;
													}
												} else return k.errors = [{
													instancePath: t + "/meta/source",
													schemaPath: "#/properties/meta/properties/source/type",
													keyword: "type",
													params: { type: "object" },
													message: "must be object"
												}], !1;
												var p = a === u;
											} else var p = !0;
										}
									}
								} else return k.errors = [{
									instancePath: t + "/meta",
									schemaPath: "#/properties/meta/type",
									keyword: "type",
									params: { type: "object" },
									message: "must be object"
								}], !1;
								var d = a === u;
							} else var d = !0;
							if (d) {
								if (e.attributes !== void 0) {
									let n = u;
									S(e.attributes, {
										instancePath: t + "/attributes",
										parentData: e,
										parentDataProperty: "attributes",
										rootData: c
									}) || (l = l === null ? S.errors : l.concat(S.errors), u = l.length);
									var d = n === u;
								} else var d = !0;
								if (d) {
									if (e.canvas !== void 0) {
										let n = e.canvas, r = u;
										if (u === r) if (n && typeof n == "object" && !Array.isArray(n)) {
											let e;
											if (n.elements === void 0 && (e = "elements") || n.width === void 0 && (e = "width") || n.height === void 0 && (e = "height")) return k.errors = [{
												instancePath: t + "/canvas",
												schemaPath: "#/properties/canvas/required",
												keyword: "required",
												params: { missingProperty: e },
												message: "must have required property '" + e + "'"
											}], !1;
											{
												let e = u;
												for (let e in n) if (!(e === "elements" || e === "width" || e === "height")) return k.errors = [{
													instancePath: t + "/canvas",
													schemaPath: "#/properties/canvas/additionalProperties",
													keyword: "additionalProperties",
													params: { additionalProperty: e },
													message: "must NOT have additional properties"
												}], !1;
												if (e === u) {
													if (n.elements !== void 0) {
														let e = n.elements, r = u;
														if (u === r) if (Array.isArray(e)) {
															if (e.length > 1024) return k.errors = [{
																instancePath: t + "/canvas/elements",
																schemaPath: "#/properties/canvas/properties/elements/maxItems",
																keyword: "maxItems",
																params: { limit: 1024 },
																message: "must NOT have more than 1024 items"
															}], !1;
															{
																let n = e.length;
																for (let r = 0; r < n; r++) {
																	let n = u;
																	if (E(e[r], {
																		instancePath: t + "/canvas/elements/" + r,
																		parentData: e,
																		parentDataProperty: r,
																		rootData: c
																	}) || (l = l === null ? E.errors : l.concat(E.errors), u = l.length), n !== u) break;
																}
															}
														} else return k.errors = [{
															instancePath: t + "/canvas/elements",
															schemaPath: "#/properties/canvas/properties/elements/type",
															keyword: "type",
															params: { type: "array" },
															message: "must be array"
														}], !1;
														var h = r === u;
													} else var h = !0;
													if (h) {
														if (n.width !== void 0) {
															let e = n.width, r = u;
															if (u === r) if (typeof e == "number" && isFinite(e)) {
																if (e > 1e6 || isNaN(e)) return k.errors = [{
																	instancePath: t + "/canvas/width",
																	schemaPath: "#/properties/canvas/properties/width/maximum",
																	keyword: "maximum",
																	params: {
																		comparison: "<=",
																		limit: 1e6
																	},
																	message: "must be <= 1000000"
																}], !1;
																if (e < 1 || isNaN(e)) return k.errors = [{
																	instancePath: t + "/canvas/width",
																	schemaPath: "#/properties/canvas/properties/width/minimum",
																	keyword: "minimum",
																	params: {
																		comparison: ">=",
																		limit: 1
																	},
																	message: "must be >= 1"
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/canvas/width",
																schemaPath: "#/properties/canvas/properties/width/type",
																keyword: "type",
																params: { type: "number" },
																message: "must be number"
															}], !1;
															var h = r === u;
														} else var h = !0;
														if (h) if (n.height !== void 0) {
															let e = n.height, r = u;
															if (u === r) if (typeof e == "number" && isFinite(e)) {
																if (e > 1e6 || isNaN(e)) return k.errors = [{
																	instancePath: t + "/canvas/height",
																	schemaPath: "#/properties/canvas/properties/height/maximum",
																	keyword: "maximum",
																	params: {
																		comparison: "<=",
																		limit: 1e6
																	},
																	message: "must be <= 1000000"
																}], !1;
																if (e < 1 || isNaN(e)) return k.errors = [{
																	instancePath: t + "/canvas/height",
																	schemaPath: "#/properties/canvas/properties/height/minimum",
																	keyword: "minimum",
																	params: {
																		comparison: ">=",
																		limit: 1
																	},
																	message: "must be >= 1"
																}], !1;
															} else return k.errors = [{
																instancePath: t + "/canvas/height",
																schemaPath: "#/properties/canvas/properties/height/type",
																keyword: "type",
																params: { type: "number" },
																message: "must be number"
															}], !1;
															var h = r === u;
														} else var h = !0;
													}
												}
											}
										} else return k.errors = [{
											instancePath: t + "/canvas",
											schemaPath: "#/properties/canvas/type",
											keyword: "type",
											params: { type: "object" },
											message: "must be object"
										}], !1;
										var d = r === u;
									} else var d = !0;
									if (d) {
										if (e.components !== void 0) {
											let n = e.components, i = u;
											if (u === i) if (n && typeof n == "object" && !Array.isArray(n)) {
												if (Object.keys(n).length > 512) return k.errors = [{
													instancePath: t + "/components",
													schemaPath: "#/properties/components/maxProperties",
													keyword: "maxProperties",
													params: { limit: 512 },
													message: "must NOT have more than 512 properties"
												}], !1;
												for (let e in n) {
													let n = u;
													if (u === u) if (typeof e == "string") {
														if (r(e) > 64) {
															let n = {
																instancePath: t + "/components",
																schemaPath: "#/definitions/camelCaseName/maxLength",
																keyword: "maxLength",
																params: { limit: 64 },
																message: "must NOT have more than 64 characters",
																propertyName: e
															};
															l === null ? l = [n] : l.push(n), u++;
														} else if (!a.test(e)) {
															let n = {
																instancePath: t + "/components",
																schemaPath: "#/definitions/camelCaseName/pattern",
																keyword: "pattern",
																params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
																message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\"",
																propertyName: e
															};
															l === null ? l = [n] : l.push(n), u++;
														}
													} else {
														let n = {
															instancePath: t + "/components",
															schemaPath: "#/definitions/camelCaseName/type",
															keyword: "type",
															params: { type: "string" },
															message: "must be string",
															propertyName: e
														};
														l === null ? l = [n] : l.push(n), u++;
													}
													var _ = n === u;
													if (!_) {
														let n = {
															instancePath: t + "/components",
															schemaPath: "#/properties/components/propertyNames",
															keyword: "propertyNames",
															params: { propertyName: e },
															message: "property name must be valid"
														};
														return l === null ? l = [n] : l.push(n), u++, k.errors = l, !1;
													}
												}
												if (_) for (let e in n) {
													let r = n[e], i = u, a = u, o = !1, s = u;
													O(r, {
														instancePath: t + "/components/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
														parentData: n,
														parentDataProperty: e,
														rootData: c
													}) || (l = l === null ? O.errors : l.concat(O.errors), u = l.length);
													var v = s === u;
													if (o ||= v, !o) {
														let i = u;
														le(r, {
															instancePath: t + "/components/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
															parentData: n,
															parentDataProperty: e,
															rootData: c
														}) || (l = l === null ? le.errors : l.concat(le.errors), u = l.length);
														var v = i === u;
														o ||= v;
													}
													if (o) u = a, l !== null && (a ? l.length = a : l = null);
													else {
														let n = {
															instancePath: t + "/components/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
															schemaPath: "#/properties/components/additionalProperties/anyOf",
															keyword: "anyOf",
															params: {},
															message: "must match a schema in anyOf"
														};
														return l === null ? l = [n] : l.push(n), u++, k.errors = l, !1;
													}
													if (i !== u) break;
												}
											} else return k.errors = [{
												instancePath: t + "/components",
												schemaPath: "#/properties/components/type",
												keyword: "type",
												params: { type: "object" },
												message: "must be object"
											}], !1;
											var d = i === u;
										} else var d = !0;
										if (d) if (e.colors !== void 0) {
											let n = e.colors, i = u;
											if (u === i) if (n && typeof n == "object" && !Array.isArray(n)) {
												if (Object.keys(n).length > 512) return k.errors = [{
													instancePath: t + "/colors",
													schemaPath: "#/properties/colors/maxProperties",
													keyword: "maxProperties",
													params: { limit: 512 },
													message: "must NOT have more than 512 properties"
												}], !1;
												for (let e in n) {
													let n = u;
													if (u === u) if (typeof e == "string") {
														if (r(e) > 64) {
															let n = {
																instancePath: t + "/colors",
																schemaPath: "#/definitions/camelCaseName/maxLength",
																keyword: "maxLength",
																params: { limit: 64 },
																message: "must NOT have more than 64 characters",
																propertyName: e
															};
															l === null ? l = [n] : l.push(n), u++;
														} else if (!a.test(e)) {
															let n = {
																instancePath: t + "/colors",
																schemaPath: "#/definitions/camelCaseName/pattern",
																keyword: "pattern",
																params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
																message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\"",
																propertyName: e
															};
															l === null ? l = [n] : l.push(n), u++;
														}
													} else {
														let n = {
															instancePath: t + "/colors",
															schemaPath: "#/definitions/camelCaseName/type",
															keyword: "type",
															params: { type: "string" },
															message: "must be string",
															propertyName: e
														};
														l === null ? l = [n] : l.push(n), u++;
													}
													var y = n === u;
													if (!y) {
														let n = {
															instancePath: t + "/colors",
															schemaPath: "#/properties/colors/propertyNames",
															keyword: "propertyNames",
															params: { propertyName: e },
															message: "property name must be valid"
														};
														return l === null ? l = [n] : l.push(n), u++, k.errors = l, !1;
													}
												}
												if (y) for (let e in n) {
													let i = n[e], a = u;
													if (u === a) if (i && typeof i == "object" && !Array.isArray(i)) {
														let n;
														if (i.values === void 0 && (n = "values")) return k.errors = [{
															instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
															schemaPath: "#/properties/colors/additionalProperties/required",
															keyword: "required",
															params: { missingProperty: n },
															message: "must have required property '" + n + "'"
														}], !1;
														{
															let n = u;
															for (let n in i) if (!(n === "values" || n === "notEqualTo" || n === "contrastTo")) return k.errors = [{
																instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
																schemaPath: "#/properties/colors/additionalProperties/additionalProperties",
																keyword: "additionalProperties",
																params: { additionalProperty: n },
																message: "must NOT have additional properties"
															}], !1;
															if (n === u) {
																if (i.values !== void 0) {
																	let n = i.values, a = u;
																	if (u === a) if (Array.isArray(n)) {
																		if (n.length > 128) return k.errors = [{
																			instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values",
																			schemaPath: "#/properties/colors/additionalProperties/properties/values/maxItems",
																			keyword: "maxItems",
																			params: { limit: 128 },
																			message: "must NOT have more than 128 items"
																		}], !1;
																		if (n.length < 1) return k.errors = [{
																			instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values",
																			schemaPath: "#/properties/colors/additionalProperties/properties/values/minItems",
																			keyword: "minItems",
																			params: { limit: 1 },
																			message: "must NOT have fewer than 1 items"
																		}], !1;
																		{
																			let i = n.length;
																			for (let a = 0; a < i; a++) {
																				let i = n[a], s = u;
																				if (u === u) if (typeof i == "string") {
																					if (r(i) > 9) return k.errors = [{
																						instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values/" + a,
																						schemaPath: "#/definitions/hexColor/maxLength",
																						keyword: "maxLength",
																						params: { limit: 9 },
																						message: "must NOT have more than 9 characters"
																					}], !1;
																					if (!o.test(i)) return k.errors = [{
																						instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values/" + a,
																						schemaPath: "#/definitions/hexColor/pattern",
																						keyword: "pattern",
																						params: { pattern: "^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$" },
																						message: "must match pattern \"^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$\""
																					}], !1;
																				} else return k.errors = [{
																					instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values/" + a,
																					schemaPath: "#/definitions/hexColor/type",
																					keyword: "type",
																					params: { type: "string" },
																					message: "must be string"
																				}], !1;
																				if (s !== u) break;
																			}
																		}
																	} else return k.errors = [{
																		instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/values",
																		schemaPath: "#/properties/colors/additionalProperties/properties/values/type",
																		keyword: "type",
																		params: { type: "array" },
																		message: "must be array"
																	}], !1;
																	var te = a === u;
																} else var te = !0;
																if (te) {
																	if (i.notEqualTo !== void 0) {
																		let n = i.notEqualTo, r = u;
																		if (u === r) if (Array.isArray(n)) {
																			if (n.length > 64) return k.errors = [{
																				instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/notEqualTo",
																				schemaPath: "#/properties/colors/additionalProperties/properties/notEqualTo/maxItems",
																				keyword: "maxItems",
																				params: { limit: 64 },
																				message: "must NOT have more than 64 items"
																			}], !1;
																			{
																				let r = n.length;
																				for (let i = 0; i < r; i++) {
																					let r = u;
																					if (g(n[i], {
																						instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/notEqualTo/" + i,
																						parentData: n,
																						parentDataProperty: i,
																						rootData: c
																					}) || (l = l === null ? g.errors : l.concat(g.errors), u = l.length), r !== u) break;
																				}
																			}
																		} else return k.errors = [{
																			instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/notEqualTo",
																			schemaPath: "#/properties/colors/additionalProperties/properties/notEqualTo/type",
																			keyword: "type",
																			params: { type: "array" },
																			message: "must be array"
																		}], !1;
																		var te = r === u;
																	} else var te = !0;
																	if (te) if (i.contrastTo !== void 0) {
																		let n = u;
																		g(i.contrastTo, {
																			instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1") + "/contrastTo",
																			parentData: i,
																			parentDataProperty: "contrastTo",
																			rootData: c
																		}) || (l = l === null ? g.errors : l.concat(g.errors), u = l.length);
																		var te = n === u;
																	} else var te = !0;
																}
															}
														}
													} else return k.errors = [{
														instancePath: t + "/colors/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
														schemaPath: "#/properties/colors/additionalProperties/type",
														keyword: "type",
														params: { type: "object" },
														message: "must be object"
													}], !1;
													if (a !== u) break;
												}
											} else return k.errors = [{
												instancePath: t + "/colors",
												schemaPath: "#/properties/colors/type",
												keyword: "type",
												params: { type: "object" },
												message: "must be object"
											}], !1;
											var d = i === u;
										} else var d = !0;
									}
								}
							}
						}
					}
				}
			}
		}
	} else return k.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return k.errors = l, u === 0;
}
var ue = class {
	static validate(e) {
		if (!k(e)) throw new t(k.errors || []);
	}
}, de = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, fe = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, pe, me = class {
	constructor(e) {
		pe.set(this, void 0), de(this, pe, e, "f");
	}
	name() {
		return fe(this, pe, "f").name;
	}
	url() {
		return fe(this, pe, "f").url;
	}
	text() {
		return fe(this, pe, "f").text;
	}
};
pe = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/MetaCreator.js
var he = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, ge = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, _e, ve = class {
	constructor(e) {
		_e.set(this, void 0), he(this, _e, e, "f");
	}
	name() {
		return ge(this, _e, "f").name;
	}
	url() {
		return ge(this, _e, "f").url;
	}
};
_e = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/MetaSource.js
var ye = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, be = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, xe, Se = class {
	constructor(e) {
		xe.set(this, void 0), ye(this, xe, e, "f");
	}
	name() {
		return be(this, xe, "f").name;
	}
	url() {
		return be(this, xe, "f").url;
	}
};
xe = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/Meta.js
var Ce = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, A = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, we, Te, Ee, De, Oe = class {
	constructor(e) {
		we.set(this, void 0), Te.set(this, void 0), Ee.set(this, void 0), De.set(this, void 0), Ce(this, we, e, "f");
	}
	license() {
		return Ce(this, Te, A(this, Te, "f") ?? new me(A(this, we, "f").license ?? {}), "f"), A(this, Te, "f");
	}
	creator() {
		return Ce(this, Ee, A(this, Ee, "f") ?? new ve(A(this, we, "f").creator ?? {}), "f"), A(this, Ee, "f");
	}
	source() {
		return Ce(this, De, A(this, De, "f") ?? new Se(A(this, we, "f").source ?? {}), "f"), A(this, De, "f");
	}
};
we = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/Element.js
var ke = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Ae = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, je, Me, Ne = class e {
	constructor(e) {
		je.set(this, void 0), Me.set(this, void 0), ke(this, je, e, "f");
	}
	type() {
		return Ae(this, je, "f").type;
	}
	name() {
		return Ae(this, je, "f").name;
	}
	value() {
		return Ae(this, je, "f").value;
	}
	attributes() {
		return Ae(this, je, "f").attributes;
	}
	children() {
		return ke(this, Me, Ae(this, Me, "f") ?? (Ae(this, je, "f").children ?? []).map((t) => new e(t)), "f"), Ae(this, Me, "f");
	}
};
je = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/Canvas.js
var Pe = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Fe = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Ie, Le, Re = class {
	constructor(e) {
		Ie.set(this, void 0), Le.set(this, void 0), Pe(this, Ie, e, "f");
	}
	width() {
		return Fe(this, Ie, "f").width;
	}
	height() {
		return Fe(this, Ie, "f").height;
	}
	elements() {
		return Pe(this, Le, Fe(this, Le, "f") ?? Fe(this, Ie, "f").elements.map((e) => new Ne(e)), "f"), Fe(this, Le, "f");
	}
};
Ie = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/ComponentTranslate.js
var ze = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Be = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Ve, He = class {
	constructor(e) {
		Ve.set(this, void 0), ze(this, Ve, e, "f");
	}
	x() {
		return Be(this, Ve, "f").x;
	}
	y() {
		return Be(this, Ve, "f").y;
	}
};
Ve = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/ComponentVariant.js
var Ue = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, We = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Ge, Ke, qe = class {
	constructor(e) {
		Ge.set(this, void 0), Ke.set(this, void 0), Ue(this, Ge, e, "f");
	}
	elements() {
		return Ue(this, Ke, We(this, Ke, "f") ?? We(this, Ge, "f").elements.map((e) => new Ne(e)), "f"), We(this, Ke, "f");
	}
	weight() {
		return We(this, Ge, "f").weight ?? 1;
	}
};
Ge = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style/Component.js
var Je = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, j = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, M, Ye, Xe, N, Ze, Qe, $e, et = class {
	constructor(e, t, n) {
		M.add(this), Ye.set(this, void 0), Xe.set(this, void 0), N.set(this, void 0), Ze.set(this, void 0), Qe.set(this, void 0), Je(this, Ye, t, "f"), Je(this, Xe, e, "f"), Je(this, N, n, "f");
	}
	name() {
		return j(this, Xe, "f");
	}
	extendsName() {
		return "extends" in j(this, Ye, "f") ? j(this, Ye, "f").extends : void 0;
	}
	sourceName() {
		return this.extendsName() ?? j(this, Xe, "f");
	}
	width() {
		return j(this, N, "f") ? j(this, N, "f").width() : j(this, M, "m", $e).call(this).width;
	}
	height() {
		return j(this, N, "f") ? j(this, N, "f").height() : j(this, M, "m", $e).call(this).height;
	}
	probability() {
		return j(this, N, "f") ? j(this, N, "f").probability() : j(this, M, "m", $e).call(this).probability ?? 100;
	}
	rotate() {
		return j(this, N, "f") ? j(this, N, "f").rotate() : j(this, M, "m", $e).call(this).rotate;
	}
	scale() {
		return j(this, N, "f") ? j(this, N, "f").scale() : j(this, M, "m", $e).call(this).scale;
	}
	translate() {
		return j(this, N, "f") ? j(this, N, "f").translate() : (Je(this, Ze, j(this, Ze, "f") ?? new He(j(this, M, "m", $e).call(this).translate ?? {}), "f"), j(this, Ze, "f"));
	}
	variants() {
		return j(this, N, "f") ? j(this, N, "f").variants() : (Je(this, Qe, j(this, Qe, "f") ?? new Map(Object.entries(j(this, M, "m", $e).call(this).variants).map(([e, t]) => [e, new qe(t)])), "f"), j(this, Qe, "f"));
	}
};
Ye = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), $e = function() {
	return j(this, Ye, "f");
};
//#endregion
//#region node_modules/@dicebear/core/lib/Style/Color.js
var tt = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, nt = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, rt, it = class {
	constructor(e) {
		rt.set(this, void 0), tt(this, rt, e, "f");
	}
	values() {
		return nt(this, rt, "f").values;
	}
	notEqualTo() {
		return nt(this, rt, "f").notEqualTo ?? [];
	}
	contrastTo() {
		return nt(this, rt, "f").contrastTo;
	}
};
rt = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Style.js
var at = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, P = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, ot, F, I, st, ct, lt, ut, dt, ft, pt = class {
	constructor(e) {
		ot.add(this), I.set(this, void 0), st.set(this, void 0), ct.set(this, void 0), lt.set(this, void 0), ut.set(this, void 0), ue.validate(e), at(this, I, structuredClone(e), "f"), P(this, ot, "m", dt).call(this);
	}
	id() {
		return P(this, I, "f").$id;
	}
	schema() {
		return P(this, I, "f").$schema;
	}
	comment() {
		return P(this, I, "f").$comment;
	}
	meta() {
		return at(this, st, P(this, st, "f") ?? new Oe(P(this, I, "f").meta ?? {}), "f"), P(this, st, "f");
	}
	attributes() {
		return structuredClone(P(this, I, "f").attributes ?? {});
	}
	definition() {
		return structuredClone(P(this, I, "f"));
	}
	canvas() {
		return at(this, ct, P(this, ct, "f") ?? new Re(P(this, I, "f").canvas), "f"), P(this, ct, "f");
	}
	components() {
		if (P(this, lt, "f")) return P(this, lt, "f");
		let e = Object.entries(P(this, I, "f").components ?? {}), t = /* @__PURE__ */ new Map();
		for (let [n, r] of e) P(F, F, "m", ft).call(F, r) || t.set(n, new et(n, r));
		for (let [n, r] of e) P(F, F, "m", ft).call(F, r) && t.set(n, new et(n, r, t.get(r.extends)));
		return at(this, lt, t, "f"), P(this, lt, "f");
	}
	colors() {
		return at(this, ut, P(this, ut, "f") ?? new Map(Object.entries(P(this, I, "f").colors ?? {}).map(([e, t]) => [e, new it(t)])), "f"), P(this, ut, "f");
	}
};
F = pt, I = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakSet(), dt = function() {
	let e = P(this, I, "f").components;
	if (!e) return;
	let n = [];
	for (let [t, r] of Object.entries(e)) {
		if (!P(F, F, "m", ft).call(F, r)) continue;
		let i = r.extends, a = e[i];
		if (!a) {
			n.push({
				instancePath: `/components/${t}/extends`,
				message: `references unknown component "${i}"`
			});
			continue;
		}
		P(F, F, "m", ft).call(F, a) && n.push({
			instancePath: `/components/${t}/extends`,
			message: `references alias "${i}" — alias chains are not allowed`
		});
	}
	if (n.length > 0) throw new t(n);
}, ft = function(e) {
	return "extends" in e;
};
//#endregion
//#region node_modules/@dicebear/core/lib/Error/OptionsValidationError.js
var mt = class extends e {
	constructor(e) {
		super("Invalid options", e), this.name = "OptionsValidationError";
	}
};
//#endregion
//#region node_modules/@dicebear/core/lib/Validator/OptionsValidator.js
function ht(e) {
	let t = 0;
	for (let n of e) t++;
	return t;
}
var gt = {
	$id: "https://cdn.hopjs.net/npm/@dicebear/schema@1.1.0/dist/options.min.json",
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DiceBear options schema",
	type: "object",
	definitions: {
		flip: {
			type: "string",
			enum: [
				"none",
				"horizontal",
				"vertical",
				"both"
			]
		},
		rotate: {
			type: "number",
			minimum: -360,
			maximum: 360
		},
		scale: {
			type: "number",
			minimum: 0,
			maximum: 10
		},
		translate: {
			type: "number",
			minimum: -1e3,
			maximum: 1e3
		},
		borderRadius: {
			type: "number",
			minimum: 0,
			maximum: 50
		},
		color: {
			type: "string",
			pattern: "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$"
		},
		colorFill: {
			type: "string",
			enum: [
				"solid",
				"linear",
				"radial"
			]
		},
		colorFillStops: {
			type: "integer",
			minimum: 2
		},
		fontFamilyName: {
			type: "string",
			pattern: "^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$",
			maxLength: 256
		},
		fontWeight: {
			type: "integer",
			minimum: 1,
			maximum: 1e3
		},
		variantName: {
			type: "string",
			pattern: "^[a-z][a-zA-Z0-9]*$",
			maxLength: 64
		},
		rotateOption: { anyOf: [{ $ref: "#/definitions/rotate" }, {
			type: "array",
			items: { $ref: "#/definitions/rotate" },
			minItems: 0,
			maxItems: 2
		}] },
		translateOption: { anyOf: [{ $ref: "#/definitions/translate" }, {
			type: "array",
			items: { $ref: "#/definitions/translate" },
			minItems: 0,
			maxItems: 2
		}] },
		scaleOption: { anyOf: [{ $ref: "#/definitions/scale" }, {
			type: "array",
			items: { $ref: "#/definitions/scale" },
			minItems: 0,
			maxItems: 2
		}] }
	},
	properties: {
		seed: {
			type: "string",
			description: "The starting value for the pseudorandom number generator (PRNG) used in the avatar generation process. This option is essential for creating unique and consistent avatars. By setting a specific seed, you ensure that the same sequence of random characteristics is applied, allowing identical avatars to be reproduced. This is especially valuable for maintaining consistency across sessions and allowing users to share or recreate their personalized avatars.",
			maxLength: 1024
		},
		size: {
			type: "integer",
			description: "Specifies the dimensions of the avatar in pixels. If no size is specified, the avatar defaults to a responsive design or scales to 100% of its container. This flexibility allows the avatar to seamlessly adapt to different screen sizes and layouts, ensuring optimal display across devices and environments.",
			minimum: 1,
			maximum: 4096
		},
		idRandomization: {
			type: "boolean",
			description: "Generates random values for all IDs present in the SVG. This process ensures that while the avatar appears visually identical, the underlying code remains unique. This is particularly useful for embedding the same avatar multiple times in a document without running into duplicate ID conflicts that can interfere with styles and scripts."
		},
		title: {
			type: "string",
			description: "Specifies an accessible title for the avatar. When set, the SVG will include a <title> element and an aria-label attribute, allowing screen readers and other assistive technologies to describe the avatar to users.",
			maxLength: 256
		},
		flip: {
			description: "Specifies how the avatar will be flipped. Options include `none` for no flip, `horizontal` for a left-to-right flip, `vertical` for an upside-down flip, and `both` for a complete flip. If specified as an array, the PRNG will choose from the available options.",
			anyOf: [{ $ref: "#/definitions/flip" }, {
				type: "array",
				items: { $ref: "#/definitions/flip" },
				minItems: 0,
				maxItems: 4
			}]
		},
		fontFamily: {
			description: "Specifies the font family used for text rendering. If specified as an array, the PRNG will choose from the available options.",
			anyOf: [{ $ref: "#/definitions/fontFamilyName" }, {
				type: "array",
				items: { $ref: "#/definitions/fontFamilyName" },
				minItems: 0,
				maxItems: 128
			}]
		},
		fontWeight: {
			description: "Specifies the font weight used for text rendering. The value must be an integer between 1 and 1000. If specified as an array, the PRNG will choose from the available options.",
			anyOf: [{ $ref: "#/definitions/fontWeight" }, {
				type: "array",
				items: { $ref: "#/definitions/fontWeight" },
				minItems: 0,
				maxItems: 128
			}]
		},
		scale: {
			description: "Sets the scaling of the avatar. A value of `1` corresponds to the original size of the avatar. This setting affects the size of the avatar itself, but not the size of the avatar container; any excess content will be clipped. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			allOf: [{ $ref: "#/definitions/scaleOption" }]
		},
		borderRadius: {
			description: "This is the radius of the corners of the avatar. This value can be a float or an integer. A value of 0 means that the avatar has sharp corners, while larger values result in more rounded corners. The maximum value is 50, which turns the avatar into a complete circle. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			anyOf: [{ $ref: "#/definitions/borderRadius" }, {
				type: "array",
				items: { $ref: "#/definitions/borderRadius" },
				minItems: 0,
				maxItems: 2
			}]
		}
	},
	patternProperties: {
		"^[a-z][a-zA-Z0-9]*Probability$": {
			type: "number",
			description: "Represents the probability that a component of the avatar will be displayed. The value can be either a float or an integer, but is interpreted as a percentage. For example, a value of 0 means the part will never be displayed, while a value of 100 means it will always be displayed.",
			minimum: 0,
			maximum: 100
		},
		"^[a-z][a-zA-Z0-9]*Variant$": {
			description: "Specifies which variants of the avatar part can be selected by the PRNG and their relative weights. A string or array of strings filters which variants the PRNG can choose from. An object maps variant names to non-negative weights, simultaneously filtering and weighting selection. Variant names must be camelCase identifiers.",
			anyOf: [
				{ $ref: "#/definitions/variantName" },
				{
					type: "array",
					items: { $ref: "#/definitions/variantName" },
					minItems: 0,
					maxItems: 128
				},
				{
					type: "object",
					propertyNames: { $ref: "#/definitions/variantName" },
					additionalProperties: {
						type: "number",
						minimum: 0
					},
					minProperties: 1,
					maxProperties: 512
				}
			]
		},
		"^[a-z][a-zA-Z0-9]*Color$": {
			description: "Specifies which colors for the avatar component can be selected by the PRNG. If specified as a string or array with only one value, the value is fixed. However, if specified as an array with multiple values, the PRNG will choose from the available options. The color must be specified as a hex value.",
			anyOf: [{ $ref: "#/definitions/color" }, {
				type: "array",
				items: { $ref: "#/definitions/color" },
				minItems: 0,
				maxItems: 128
			}]
		},
		"^[a-z][a-zA-Z0-9]*ColorFill$": {
			description: "Specifies the color fill method for the avatar component. Options include `solid` for a flat color, `linear` for a linear gradient, and `radial` for a radial gradient. If specified as a string or array with only one value, the value is fixed. However, if specified as an array with multiple values, the PRNG will choose from the available options.",
			anyOf: [{ $ref: "#/definitions/colorFill" }, {
				type: "array",
				items: { $ref: "#/definitions/colorFill" },
				minItems: 0,
				maxItems: 128
			}]
		},
		"^[a-z][a-zA-Z0-9]*ColorFillStops$": {
			description: "Specifies the number of color stops for gradient fills. This value is only relevant when the color fill method is set to `linear` or `radial`. The minimum value is 2. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			anyOf: [{ $ref: "#/definitions/colorFillStops" }, {
				type: "array",
				items: { $ref: "#/definitions/colorFillStops" },
				minItems: 0,
				maxItems: 2
			}]
		},
		"^[a-z][a-zA-Z0-9]*ColorAngle$": {
			description: "Specifies the angle for the color gradient. This value can be an integer or a float. A value of 0 results in no rotation, while values between -360 and 360 define the degree of rotation. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			allOf: [{ $ref: "#/definitions/rotateOption" }]
		},
		"^rotate$": {
			description: "This is the rotation angle for the entire avatar. This value can be an integer or a float. A value of 0 results in no rotation, while values between -360 and 360 define the degree of rotation in both directions. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			allOf: [{ $ref: "#/definitions/rotateOption" }]
		},
		"^translateY$": {
			description: "This is the vertical translation of the entire avatar. This value can be an integer or a float. A value of 0 results in no translation, while positive values move the avatar down and negative values move it up. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			allOf: [{ $ref: "#/definitions/translateOption" }]
		},
		"^translateX$": {
			description: "This is the horizontal translation of the entire avatar. This value can be an integer or a float. A value of 0 results in no translation, while positive values move the avatar to the right and negative values move it to the left. If specified as an array, the PRNG will select a value within the specified range, including the values themselves.",
			allOf: [{ $ref: "#/definitions/translateOption" }]
		}
	},
	propertyNames: { maxLength: 128 },
	additionalProperties: !1,
	maxProperties: 512
}, _t = {
	type: "string",
	enum: [
		"none",
		"horizontal",
		"vertical",
		"both"
	]
}, vt = {
	type: "string",
	enum: [
		"solid",
		"linear",
		"radial"
	]
}, yt = ht, bt = Object.prototype.hasOwnProperty, xt = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*Probability$", "u"), St = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*Variant$", "u"), Ct = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*Color$", "u"), wt = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*ColorFill$", "u"), Tt = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*ColorFillStops$", "u"), Et = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*ColorAngle$", "u"), Dt = /* @__PURE__ */ RegExp("^rotate$", "u"), Ot = /* @__PURE__ */ RegExp("^translateY$", "u"), kt = /* @__PURE__ */ RegExp("^translateX$", "u"), At = /* @__PURE__ */ RegExp("^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$", "u"), jt = /* @__PURE__ */ RegExp("^[a-z][a-zA-Z0-9]*$", "u"), Mt = /* @__PURE__ */ RegExp("^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$", "u");
function Nt(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0, s = o, c = !1, l = o;
	if (o === o) if (typeof e == "number" && isFinite(e)) {
		if (e > 10 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/scale/maximum",
				keyword: "maximum",
				params: {
					comparison: "<=",
					limit: 10
				},
				message: "must be <= 10"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e < 0 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/scale/minimum",
				keyword: "minimum",
				params: {
					comparison: ">=",
					limit: 0
				},
				message: "must be >= 0"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
	} else {
		let e = {
			instancePath: t,
			schemaPath: "#/definitions/scale/type",
			keyword: "type",
			params: { type: "number" },
			message: "must be number"
		};
		a === null ? a = [e] : a.push(e), o++;
	}
	var u = l === o;
	if (c ||= u, !c) {
		let n = o;
		if (o === n) if (Array.isArray(e)) if (e.length > 2) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/maxItems",
				keyword: "maxItems",
				params: { limit: 2 },
				message: "must NOT have more than 2 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e.length < 0) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/minItems",
				keyword: "minItems",
				params: { limit: 0 },
				message: "must NOT have fewer than 0 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else {
			let n = e.length;
			for (let r = 0; r < n; r++) {
				let n = e[r], i = o;
				if (o === o) if (typeof n == "number" && isFinite(n)) {
					if (n > 10 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/scale/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 10
							},
							message: "must be <= 10"
						};
						a === null ? a = [e] : a.push(e), o++;
					} else if (n < 0 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/scale/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: 0
							},
							message: "must be >= 0"
						};
						a === null ? a = [e] : a.push(e), o++;
					}
				} else {
					let e = {
						instancePath: t + "/" + r,
						schemaPath: "#/definitions/scale/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					};
					a === null ? a = [e] : a.push(e), o++;
				}
				if (i !== o) break;
			}
		}
		else {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/type",
				keyword: "type",
				params: { type: "array" },
				message: "must be array"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
		var u = n === o;
		c ||= u;
	}
	if (c) o = s, a !== null && (s ? a.length = s : a = null);
	else {
		let e = {
			instancePath: t,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf"
		};
		return a === null ? a = [e] : a.push(e), o++, Nt.errors = a, !1;
	}
	return Nt.errors = a, o === 0;
}
function Pt(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0, s = o, c = !1, l = o;
	if (o === o) if (typeof e == "number" && isFinite(e)) {
		if (e > 360 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/rotate/maximum",
				keyword: "maximum",
				params: {
					comparison: "<=",
					limit: 360
				},
				message: "must be <= 360"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e < -360 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/rotate/minimum",
				keyword: "minimum",
				params: {
					comparison: ">=",
					limit: -360
				},
				message: "must be >= -360"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
	} else {
		let e = {
			instancePath: t,
			schemaPath: "#/definitions/rotate/type",
			keyword: "type",
			params: { type: "number" },
			message: "must be number"
		};
		a === null ? a = [e] : a.push(e), o++;
	}
	var u = l === o;
	if (c ||= u, !c) {
		let n = o;
		if (o === n) if (Array.isArray(e)) if (e.length > 2) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/maxItems",
				keyword: "maxItems",
				params: { limit: 2 },
				message: "must NOT have more than 2 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e.length < 0) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/minItems",
				keyword: "minItems",
				params: { limit: 0 },
				message: "must NOT have fewer than 0 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else {
			let n = e.length;
			for (let r = 0; r < n; r++) {
				let n = e[r], i = o;
				if (o === o) if (typeof n == "number" && isFinite(n)) {
					if (n > 360 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/rotate/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 360
							},
							message: "must be <= 360"
						};
						a === null ? a = [e] : a.push(e), o++;
					} else if (n < -360 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/rotate/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: -360
							},
							message: "must be >= -360"
						};
						a === null ? a = [e] : a.push(e), o++;
					}
				} else {
					let e = {
						instancePath: t + "/" + r,
						schemaPath: "#/definitions/rotate/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					};
					a === null ? a = [e] : a.push(e), o++;
				}
				if (i !== o) break;
			}
		}
		else {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/type",
				keyword: "type",
				params: { type: "array" },
				message: "must be array"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
		var u = n === o;
		c ||= u;
	}
	if (c) o = s, a !== null && (s ? a.length = s : a = null);
	else {
		let e = {
			instancePath: t,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf"
		};
		return a === null ? a = [e] : a.push(e), o++, Pt.errors = a, !1;
	}
	return Pt.errors = a, o === 0;
}
function Ft(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0, s = o, c = !1, l = o;
	if (o === o) if (typeof e == "number" && isFinite(e)) {
		if (e > 1e3 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/translate/maximum",
				keyword: "maximum",
				params: {
					comparison: "<=",
					limit: 1e3
				},
				message: "must be <= 1000"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e < -1e3 || isNaN(e)) {
			let e = {
				instancePath: t,
				schemaPath: "#/definitions/translate/minimum",
				keyword: "minimum",
				params: {
					comparison: ">=",
					limit: -1e3
				},
				message: "must be >= -1000"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
	} else {
		let e = {
			instancePath: t,
			schemaPath: "#/definitions/translate/type",
			keyword: "type",
			params: { type: "number" },
			message: "must be number"
		};
		a === null ? a = [e] : a.push(e), o++;
	}
	var u = l === o;
	if (c ||= u, !c) {
		let n = o;
		if (o === n) if (Array.isArray(e)) if (e.length > 2) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/maxItems",
				keyword: "maxItems",
				params: { limit: 2 },
				message: "must NOT have more than 2 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else if (e.length < 0) {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/minItems",
				keyword: "minItems",
				params: { limit: 0 },
				message: "must NOT have fewer than 0 items"
			};
			a === null ? a = [e] : a.push(e), o++;
		} else {
			let n = e.length;
			for (let r = 0; r < n; r++) {
				let n = e[r], i = o;
				if (o === o) if (typeof n == "number" && isFinite(n)) {
					if (n > 1e3 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/translate/maximum",
							keyword: "maximum",
							params: {
								comparison: "<=",
								limit: 1e3
							},
							message: "must be <= 1000"
						};
						a === null ? a = [e] : a.push(e), o++;
					} else if (n < -1e3 || isNaN(n)) {
						let e = {
							instancePath: t + "/" + r,
							schemaPath: "#/definitions/translate/minimum",
							keyword: "minimum",
							params: {
								comparison: ">=",
								limit: -1e3
							},
							message: "must be >= -1000"
						};
						a === null ? a = [e] : a.push(e), o++;
					}
				} else {
					let e = {
						instancePath: t + "/" + r,
						schemaPath: "#/definitions/translate/type",
						keyword: "type",
						params: { type: "number" },
						message: "must be number"
					};
					a === null ? a = [e] : a.push(e), o++;
				}
				if (i !== o) break;
			}
		}
		else {
			let e = {
				instancePath: t,
				schemaPath: "#/anyOf/1/type",
				keyword: "type",
				params: { type: "array" },
				message: "must be array"
			};
			a === null ? a = [e] : a.push(e), o++;
		}
		var u = n === o;
		c ||= u;
	}
	if (c) o = s, a !== null && (s ? a.length = s : a = null);
	else {
		let e = {
			instancePath: t,
			schemaPath: "#/anyOf",
			keyword: "anyOf",
			params: {},
			message: "must match a schema in anyOf"
		};
		return a === null ? a = [e] : a.push(e), o++, Ft.errors = a, !1;
	}
	return Ft.errors = a, o === 0;
}
function L(e, { instancePath: t = "", parentData: n, parentDataProperty: r, rootData: i = e } = {}) {
	let a = null, o = 0;
	if (o === 0) if (e && typeof e == "object" && !Array.isArray(e)) {
		if (Object.keys(e).length > 512) return L.errors = [{
			instancePath: t,
			schemaPath: "#/maxProperties",
			keyword: "maxProperties",
			params: { limit: 512 },
			message: "must NOT have more than 512 properties"
		}], !1;
		for (let n in e) {
			let e = o;
			if (typeof n == "string" && yt(n) > 128) {
				let e = {
					instancePath: t,
					schemaPath: "#/propertyNames/maxLength",
					keyword: "maxLength",
					params: { limit: 128 },
					message: "must NOT have more than 128 characters",
					propertyName: n
				};
				a === null ? a = [e] : a.push(e), o++;
			}
			var s = e === o;
			if (!s) {
				let e = {
					instancePath: t,
					schemaPath: "#/propertyNames",
					keyword: "propertyNames",
					params: { propertyName: n },
					message: "property name must be valid"
				};
				return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
			}
		}
		if (s) {
			let n = o;
			for (let n in e) if (!(bt.call(gt.properties, n) || xt.test(n) || St.test(n) || Ct.test(n) || wt.test(n) || Tt.test(n) || Et.test(n) || Dt.test(n) || Ot.test(n) || kt.test(n))) return L.errors = [{
				instancePath: t,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: n },
				message: "must NOT have additional properties"
			}], !1;
			if (n === o) {
				if (e.seed !== void 0) {
					let n = e.seed, r = o;
					if (o === r) if (typeof n == "string") {
						if (yt(n) > 1024) return L.errors = [{
							instancePath: t + "/seed",
							schemaPath: "#/properties/seed/maxLength",
							keyword: "maxLength",
							params: { limit: 1024 },
							message: "must NOT have more than 1024 characters"
						}], !1;
					} else return L.errors = [{
						instancePath: t + "/seed",
						schemaPath: "#/properties/seed/type",
						keyword: "type",
						params: { type: "string" },
						message: "must be string"
					}], !1;
					var c = r === o;
				} else var c = !0;
				if (c) {
					if (e.size !== void 0) {
						let n = e.size, r = o;
						if (!(typeof n == "number" && !(n % 1) && !isNaN(n) && isFinite(n))) return L.errors = [{
							instancePath: t + "/size",
							schemaPath: "#/properties/size/type",
							keyword: "type",
							params: { type: "integer" },
							message: "must be integer"
						}], !1;
						if (o === r && typeof n == "number" && isFinite(n)) {
							if (n > 4096 || isNaN(n)) return L.errors = [{
								instancePath: t + "/size",
								schemaPath: "#/properties/size/maximum",
								keyword: "maximum",
								params: {
									comparison: "<=",
									limit: 4096
								},
								message: "must be <= 4096"
							}], !1;
							if (n < 1 || isNaN(n)) return L.errors = [{
								instancePath: t + "/size",
								schemaPath: "#/properties/size/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: 1
								},
								message: "must be >= 1"
							}], !1;
						}
						var c = r === o;
					} else var c = !0;
					if (c) {
						if (e.idRandomization !== void 0) {
							let n = o;
							if (typeof e.idRandomization != "boolean") return L.errors = [{
								instancePath: t + "/idRandomization",
								schemaPath: "#/properties/idRandomization/type",
								keyword: "type",
								params: { type: "boolean" },
								message: "must be boolean"
							}], !1;
							var c = n === o;
						} else var c = !0;
						if (c) {
							if (e.title !== void 0) {
								let n = e.title, r = o;
								if (o === r) if (typeof n == "string") {
									if (yt(n) > 256) return L.errors = [{
										instancePath: t + "/title",
										schemaPath: "#/properties/title/maxLength",
										keyword: "maxLength",
										params: { limit: 256 },
										message: "must NOT have more than 256 characters"
									}], !1;
								} else return L.errors = [{
									instancePath: t + "/title",
									schemaPath: "#/properties/title/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								}], !1;
								var c = r === o;
							} else var c = !0;
							if (c) {
								if (e.flip !== void 0) {
									let n = e.flip, r = o, i = o, s = !1, u = o;
									if (typeof n != "string") {
										let e = {
											instancePath: t + "/flip",
											schemaPath: "#/definitions/flip/type",
											keyword: "type",
											params: { type: "string" },
											message: "must be string"
										};
										a === null ? a = [e] : a.push(e), o++;
									}
									if (!(n === "none" || n === "horizontal" || n === "vertical" || n === "both")) {
										let e = {
											instancePath: t + "/flip",
											schemaPath: "#/definitions/flip/enum",
											keyword: "enum",
											params: { allowedValues: _t.enum },
											message: "must be equal to one of the allowed values"
										};
										a === null ? a = [e] : a.push(e), o++;
									}
									var l = u === o;
									if (s ||= l, !s) {
										let e = o;
										if (o === e) if (Array.isArray(n)) if (n.length > 4) {
											let e = {
												instancePath: t + "/flip",
												schemaPath: "#/properties/flip/anyOf/1/maxItems",
												keyword: "maxItems",
												params: { limit: 4 },
												message: "must NOT have more than 4 items"
											};
											a === null ? a = [e] : a.push(e), o++;
										} else if (n.length < 0) {
											let e = {
												instancePath: t + "/flip",
												schemaPath: "#/properties/flip/anyOf/1/minItems",
												keyword: "minItems",
												params: { limit: 0 },
												message: "must NOT have fewer than 0 items"
											};
											a === null ? a = [e] : a.push(e), o++;
										} else {
											let e = n.length;
											for (let r = 0; r < e; r++) {
												let e = n[r], i = o;
												if (typeof e != "string") {
													let e = {
														instancePath: t + "/flip/" + r,
														schemaPath: "#/definitions/flip/type",
														keyword: "type",
														params: { type: "string" },
														message: "must be string"
													};
													a === null ? a = [e] : a.push(e), o++;
												}
												if (!(e === "none" || e === "horizontal" || e === "vertical" || e === "both")) {
													let e = {
														instancePath: t + "/flip/" + r,
														schemaPath: "#/definitions/flip/enum",
														keyword: "enum",
														params: { allowedValues: _t.enum },
														message: "must be equal to one of the allowed values"
													};
													a === null ? a = [e] : a.push(e), o++;
												}
												if (i !== o) break;
											}
										}
										else {
											let e = {
												instancePath: t + "/flip",
												schemaPath: "#/properties/flip/anyOf/1/type",
												keyword: "type",
												params: { type: "array" },
												message: "must be array"
											};
											a === null ? a = [e] : a.push(e), o++;
										}
										var l = e === o;
										s ||= l;
									}
									if (s) o = i, a !== null && (i ? a.length = i : a = null);
									else {
										let e = {
											instancePath: t + "/flip",
											schemaPath: "#/properties/flip/anyOf",
											keyword: "anyOf",
											params: {},
											message: "must match a schema in anyOf"
										};
										return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
									}
									var c = r === o;
								} else var c = !0;
								if (c) {
									if (e.fontFamily !== void 0) {
										let n = e.fontFamily, r = o, i = o, s = !1, l = o;
										if (o === o) if (typeof n == "string") {
											if (yt(n) > 256) {
												let e = {
													instancePath: t + "/fontFamily",
													schemaPath: "#/definitions/fontFamilyName/maxLength",
													keyword: "maxLength",
													params: { limit: 256 },
													message: "must NOT have more than 256 characters"
												};
												a === null ? a = [e] : a.push(e), o++;
											} else if (!At.test(n)) {
												let e = {
													instancePath: t + "/fontFamily",
													schemaPath: "#/definitions/fontFamilyName/pattern",
													keyword: "pattern",
													params: { pattern: "^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$" },
													message: "must match pattern \"^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$\""
												};
												a === null ? a = [e] : a.push(e), o++;
											}
										} else {
											let e = {
												instancePath: t + "/fontFamily",
												schemaPath: "#/definitions/fontFamilyName/type",
												keyword: "type",
												params: { type: "string" },
												message: "must be string"
											};
											a === null ? a = [e] : a.push(e), o++;
										}
										var u = l === o;
										if (s ||= u, !s) {
											let e = o;
											if (o === e) if (Array.isArray(n)) if (n.length > 128) {
												let e = {
													instancePath: t + "/fontFamily",
													schemaPath: "#/properties/fontFamily/anyOf/1/maxItems",
													keyword: "maxItems",
													params: { limit: 128 },
													message: "must NOT have more than 128 items"
												};
												a === null ? a = [e] : a.push(e), o++;
											} else if (n.length < 0) {
												let e = {
													instancePath: t + "/fontFamily",
													schemaPath: "#/properties/fontFamily/anyOf/1/minItems",
													keyword: "minItems",
													params: { limit: 0 },
													message: "must NOT have fewer than 0 items"
												};
												a === null ? a = [e] : a.push(e), o++;
											} else {
												let e = n.length;
												for (let r = 0; r < e; r++) {
													let e = n[r], i = o;
													if (o === o) if (typeof e == "string") {
														if (yt(e) > 256) {
															let e = {
																instancePath: t + "/fontFamily/" + r,
																schemaPath: "#/definitions/fontFamilyName/maxLength",
																keyword: "maxLength",
																params: { limit: 256 },
																message: "must NOT have more than 256 characters"
															};
															a === null ? a = [e] : a.push(e), o++;
														} else if (!At.test(e)) {
															let e = {
																instancePath: t + "/fontFamily/" + r,
																schemaPath: "#/definitions/fontFamilyName/pattern",
																keyword: "pattern",
																params: { pattern: "^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$" },
																message: "must match pattern \"^[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*(, ?[a-zA-Z0-9_\\-]+( [a-zA-Z0-9_\\-]+)*)*$\""
															};
															a === null ? a = [e] : a.push(e), o++;
														}
													} else {
														let e = {
															instancePath: t + "/fontFamily/" + r,
															schemaPath: "#/definitions/fontFamilyName/type",
															keyword: "type",
															params: { type: "string" },
															message: "must be string"
														};
														a === null ? a = [e] : a.push(e), o++;
													}
													if (i !== o) break;
												}
											}
											else {
												let e = {
													instancePath: t + "/fontFamily",
													schemaPath: "#/properties/fontFamily/anyOf/1/type",
													keyword: "type",
													params: { type: "array" },
													message: "must be array"
												};
												a === null ? a = [e] : a.push(e), o++;
											}
											var u = e === o;
											s ||= u;
										}
										if (s) o = i, a !== null && (i ? a.length = i : a = null);
										else {
											let e = {
												instancePath: t + "/fontFamily",
												schemaPath: "#/properties/fontFamily/anyOf",
												keyword: "anyOf",
												params: {},
												message: "must match a schema in anyOf"
											};
											return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
										}
										var c = r === o;
									} else var c = !0;
									if (c) {
										if (e.fontWeight !== void 0) {
											let n = e.fontWeight, r = o, i = o, s = !1, l = o, u = o;
											if (!(typeof n == "number" && !(n % 1) && !isNaN(n) && isFinite(n))) {
												let e = {
													instancePath: t + "/fontWeight",
													schemaPath: "#/definitions/fontWeight/type",
													keyword: "type",
													params: { type: "integer" },
													message: "must be integer"
												};
												a === null ? a = [e] : a.push(e), o++;
											}
											if (o === u && typeof n == "number" && isFinite(n)) {
												if (n > 1e3 || isNaN(n)) {
													let e = {
														instancePath: t + "/fontWeight",
														schemaPath: "#/definitions/fontWeight/maximum",
														keyword: "maximum",
														params: {
															comparison: "<=",
															limit: 1e3
														},
														message: "must be <= 1000"
													};
													a === null ? a = [e] : a.push(e), o++;
												} else if (n < 1 || isNaN(n)) {
													let e = {
														instancePath: t + "/fontWeight",
														schemaPath: "#/definitions/fontWeight/minimum",
														keyword: "minimum",
														params: {
															comparison: ">=",
															limit: 1
														},
														message: "must be >= 1"
													};
													a === null ? a = [e] : a.push(e), o++;
												}
											}
											var d = l === o;
											if (s ||= d, !s) {
												let e = o;
												if (o === e) if (Array.isArray(n)) if (n.length > 128) {
													let e = {
														instancePath: t + "/fontWeight",
														schemaPath: "#/properties/fontWeight/anyOf/1/maxItems",
														keyword: "maxItems",
														params: { limit: 128 },
														message: "must NOT have more than 128 items"
													};
													a === null ? a = [e] : a.push(e), o++;
												} else if (n.length < 0) {
													let e = {
														instancePath: t + "/fontWeight",
														schemaPath: "#/properties/fontWeight/anyOf/1/minItems",
														keyword: "minItems",
														params: { limit: 0 },
														message: "must NOT have fewer than 0 items"
													};
													a === null ? a = [e] : a.push(e), o++;
												} else {
													let e = n.length;
													for (let r = 0; r < e; r++) {
														let e = n[r], i = o, s = o;
														if (!(typeof e == "number" && !(e % 1) && !isNaN(e) && isFinite(e))) {
															let e = {
																instancePath: t + "/fontWeight/" + r,
																schemaPath: "#/definitions/fontWeight/type",
																keyword: "type",
																params: { type: "integer" },
																message: "must be integer"
															};
															a === null ? a = [e] : a.push(e), o++;
														}
														if (o === s && typeof e == "number" && isFinite(e)) {
															if (e > 1e3 || isNaN(e)) {
																let e = {
																	instancePath: t + "/fontWeight/" + r,
																	schemaPath: "#/definitions/fontWeight/maximum",
																	keyword: "maximum",
																	params: {
																		comparison: "<=",
																		limit: 1e3
																	},
																	message: "must be <= 1000"
																};
																a === null ? a = [e] : a.push(e), o++;
															} else if (e < 1 || isNaN(e)) {
																let e = {
																	instancePath: t + "/fontWeight/" + r,
																	schemaPath: "#/definitions/fontWeight/minimum",
																	keyword: "minimum",
																	params: {
																		comparison: ">=",
																		limit: 1
																	},
																	message: "must be >= 1"
																};
																a === null ? a = [e] : a.push(e), o++;
															}
														}
														if (i !== o) break;
													}
												}
												else {
													let e = {
														instancePath: t + "/fontWeight",
														schemaPath: "#/properties/fontWeight/anyOf/1/type",
														keyword: "type",
														params: { type: "array" },
														message: "must be array"
													};
													a === null ? a = [e] : a.push(e), o++;
												}
												var d = e === o;
												s ||= d;
											}
											if (s) o = i, a !== null && (i ? a.length = i : a = null);
											else {
												let e = {
													instancePath: t + "/fontWeight",
													schemaPath: "#/properties/fontWeight/anyOf",
													keyword: "anyOf",
													params: {},
													message: "must match a schema in anyOf"
												};
												return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
											}
											var c = r === o;
										} else var c = !0;
										if (c) {
											if (e.scale !== void 0) {
												let n = o;
												Nt(e.scale, {
													instancePath: t + "/scale",
													parentData: e,
													parentDataProperty: "scale",
													rootData: i
												}) || (a = a === null ? Nt.errors : a.concat(Nt.errors), o = a.length);
												var c = n === o;
											} else var c = !0;
											if (c) {
												if (e.borderRadius !== void 0) {
													let n = e.borderRadius, r = o, i = o, s = !1, l = o;
													if (o === o) if (typeof n == "number" && isFinite(n)) {
														if (n > 50 || isNaN(n)) {
															let e = {
																instancePath: t + "/borderRadius",
																schemaPath: "#/definitions/borderRadius/maximum",
																keyword: "maximum",
																params: {
																	comparison: "<=",
																	limit: 50
																},
																message: "must be <= 50"
															};
															a === null ? a = [e] : a.push(e), o++;
														} else if (n < 0 || isNaN(n)) {
															let e = {
																instancePath: t + "/borderRadius",
																schemaPath: "#/definitions/borderRadius/minimum",
																keyword: "minimum",
																params: {
																	comparison: ">=",
																	limit: 0
																},
																message: "must be >= 0"
															};
															a === null ? a = [e] : a.push(e), o++;
														}
													} else {
														let e = {
															instancePath: t + "/borderRadius",
															schemaPath: "#/definitions/borderRadius/type",
															keyword: "type",
															params: { type: "number" },
															message: "must be number"
														};
														a === null ? a = [e] : a.push(e), o++;
													}
													var f = l === o;
													if (s ||= f, !s) {
														let e = o;
														if (o === e) if (Array.isArray(n)) if (n.length > 2) {
															let e = {
																instancePath: t + "/borderRadius",
																schemaPath: "#/properties/borderRadius/anyOf/1/maxItems",
																keyword: "maxItems",
																params: { limit: 2 },
																message: "must NOT have more than 2 items"
															};
															a === null ? a = [e] : a.push(e), o++;
														} else if (n.length < 0) {
															let e = {
																instancePath: t + "/borderRadius",
																schemaPath: "#/properties/borderRadius/anyOf/1/minItems",
																keyword: "minItems",
																params: { limit: 0 },
																message: "must NOT have fewer than 0 items"
															};
															a === null ? a = [e] : a.push(e), o++;
														} else {
															let e = n.length;
															for (let r = 0; r < e; r++) {
																let e = n[r], i = o;
																if (o === o) if (typeof e == "number" && isFinite(e)) {
																	if (e > 50 || isNaN(e)) {
																		let e = {
																			instancePath: t + "/borderRadius/" + r,
																			schemaPath: "#/definitions/borderRadius/maximum",
																			keyword: "maximum",
																			params: {
																				comparison: "<=",
																				limit: 50
																			},
																			message: "must be <= 50"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	} else if (e < 0 || isNaN(e)) {
																		let e = {
																			instancePath: t + "/borderRadius/" + r,
																			schemaPath: "#/definitions/borderRadius/minimum",
																			keyword: "minimum",
																			params: {
																				comparison: ">=",
																				limit: 0
																			},
																			message: "must be >= 0"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																} else {
																	let e = {
																		instancePath: t + "/borderRadius/" + r,
																		schemaPath: "#/definitions/borderRadius/type",
																		keyword: "type",
																		params: { type: "number" },
																		message: "must be number"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																}
																if (i !== o) break;
															}
														}
														else {
															let e = {
																instancePath: t + "/borderRadius",
																schemaPath: "#/properties/borderRadius/anyOf/1/type",
																keyword: "type",
																params: { type: "array" },
																message: "must be array"
															};
															a === null ? a = [e] : a.push(e), o++;
														}
														var f = e === o;
														s ||= f;
													}
													if (s) o = i, a !== null && (i ? a.length = i : a = null);
													else {
														let e = {
															instancePath: t + "/borderRadius",
															schemaPath: "#/properties/borderRadius/anyOf",
															keyword: "anyOf",
															params: {},
															message: "must match a schema in anyOf"
														};
														return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
													}
													var c = r === o;
												} else var c = !0;
												if (c) {
													var p = !0;
													for (let n in e) if (xt.test(n)) {
														let r = e[n], i = o;
														if (o === i) if (typeof r == "number" && isFinite(r)) {
															if (r > 100 || isNaN(r)) return L.errors = [{
																instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Probability%24/maximum",
																keyword: "maximum",
																params: {
																	comparison: "<=",
																	limit: 100
																},
																message: "must be <= 100"
															}], !1;
															if (r < 0 || isNaN(r)) return L.errors = [{
																instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Probability%24/minimum",
																keyword: "minimum",
																params: {
																	comparison: ">=",
																	limit: 0
																},
																message: "must be >= 0"
															}], !1;
														} else return L.errors = [{
															instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
															schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Probability%24/type",
															keyword: "type",
															params: { type: "number" },
															message: "must be number"
														}], !1;
														var p = i === o;
														if (!p) break;
													}
													if (p) {
														var p = !0;
														for (let n in e) if (St.test(n)) {
															let r = e[n], i = o, s = o, c = !1, l = o;
															if (o === o) if (typeof r == "string") {
																if (yt(r) > 64) {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/definitions/variantName/maxLength",
																		keyword: "maxLength",
																		params: { limit: 64 },
																		message: "must NOT have more than 64 characters"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																} else if (!jt.test(r)) {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/definitions/variantName/pattern",
																		keyword: "pattern",
																		params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
																		message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\""
																	};
																	a === null ? a = [e] : a.push(e), o++;
																}
															} else {
																let e = {
																	instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																	schemaPath: "#/definitions/variantName/type",
																	keyword: "type",
																	params: { type: "string" },
																	message: "must be string"
																};
																a === null ? a = [e] : a.push(e), o++;
															}
															var m = l === o;
															if (c ||= m, !c) {
																let e = o;
																if (o === e) if (Array.isArray(r)) if (r.length > 128) {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/1/maxItems",
																		keyword: "maxItems",
																		params: { limit: 128 },
																		message: "must NOT have more than 128 items"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																} else if (r.length < 0) {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/1/minItems",
																		keyword: "minItems",
																		params: { limit: 0 },
																		message: "must NOT have fewer than 0 items"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																} else {
																	let e = r.length;
																	for (let i = 0; i < e; i++) {
																		let e = r[i], s = o;
																		if (o === o) if (typeof e == "string") {
																			if (yt(e) > 64) {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																					schemaPath: "#/definitions/variantName/maxLength",
																					keyword: "maxLength",
																					params: { limit: 64 },
																					message: "must NOT have more than 64 characters"
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			} else if (!jt.test(e)) {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																					schemaPath: "#/definitions/variantName/pattern",
																					keyword: "pattern",
																					params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
																					message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\""
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			}
																		} else {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																				schemaPath: "#/definitions/variantName/type",
																				keyword: "type",
																				params: { type: "string" },
																				message: "must be string"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		}
																		if (s !== o) break;
																	}
																}
																else {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/1/type",
																		keyword: "type",
																		params: { type: "array" },
																		message: "must be array"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																}
																var m = e === o;
																if (c ||= m, !c) {
																	let e = o;
																	if (o === e) if (r && typeof r == "object" && !Array.isArray(r)) if (Object.keys(r).length > 512) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/maxProperties",
																			keyword: "maxProperties",
																			params: { limit: 512 },
																			message: "must NOT have more than 512 properties"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	} else if (Object.keys(r).length < 1) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/minProperties",
																			keyword: "minProperties",
																			params: { limit: 1 },
																			message: "must NOT have fewer than 1 properties"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	} else {
																		for (let e in r) {
																			let r = o;
																			if (o === o) if (typeof e == "string") {
																				if (yt(e) > 64) {
																					let r = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																						schemaPath: "#/definitions/variantName/maxLength",
																						keyword: "maxLength",
																						params: { limit: 64 },
																						message: "must NOT have more than 64 characters",
																						propertyName: e
																					};
																					a === null ? a = [r] : a.push(r), o++;
																				} else if (!jt.test(e)) {
																					let r = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																						schemaPath: "#/definitions/variantName/pattern",
																						keyword: "pattern",
																						params: { pattern: "^[a-z][a-zA-Z0-9]*$" },
																						message: "must match pattern \"^[a-z][a-zA-Z0-9]*$\"",
																						propertyName: e
																					};
																					a === null ? a = [r] : a.push(r), o++;
																				}
																			} else {
																				let r = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/definitions/variantName/type",
																					keyword: "type",
																					params: { type: "string" },
																					message: "must be string",
																					propertyName: e
																				};
																				a === null ? a = [r] : a.push(r), o++;
																			}
																			var ee = r === o;
																			if (!ee) {
																				let r = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/propertyNames",
																					keyword: "propertyNames",
																					params: { propertyName: e },
																					message: "property name must be valid"
																				};
																				a === null ? a = [r] : a.push(r), o++;
																				break;
																			}
																		}
																		if (ee) for (let e in r) {
																			let i = r[e], s = o;
																			if (o === s) if (typeof i == "number" && isFinite(i)) {
																				if (i < 0 || isNaN(i)) {
																					let r = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
																						schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/additionalProperties/minimum",
																						keyword: "minimum",
																						params: {
																							comparison: ">=",
																							limit: 0
																						},
																						message: "must be >= 0"
																					};
																					a === null ? a = [r] : a.push(r), o++;
																				}
																			} else {
																				let r = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/additionalProperties/type",
																					keyword: "type",
																					params: { type: "number" },
																					message: "must be number"
																				};
																				a === null ? a = [r] : a.push(r), o++;
																			}
																			if (s !== o) break;
																		}
																	}
																	else {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf/2/type",
																			keyword: "type",
																			params: { type: "object" },
																			message: "must be object"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																	var m = e === o;
																	c ||= m;
																}
															}
															if (c) o = s, a !== null && (s ? a.length = s : a = null);
															else {
																let e = {
																	instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																	schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Variant%24/anyOf",
																	keyword: "anyOf",
																	params: {},
																	message: "must match a schema in anyOf"
																};
																return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
															}
															var p = i === o;
															if (!p) break;
														}
														if (p) {
															var p = !0;
															for (let n in e) if (Ct.test(n)) {
																let r = e[n], i = o, s = o, c = !1, l = o;
																if (o === o) if (typeof r == "string") {
																	if (!Mt.test(r)) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/definitions/color/pattern",
																			keyword: "pattern",
																			params: { pattern: "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$" },
																			message: "must match pattern \"^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$\""
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																} else {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/definitions/color/type",
																		keyword: "type",
																		params: { type: "string" },
																		message: "must be string"
																	};
																	a === null ? a = [e] : a.push(e), o++;
																}
																var h = l === o;
																if (c ||= h, !c) {
																	let e = o;
																	if (o === e) if (Array.isArray(r)) if (r.length > 128) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Color%24/anyOf/1/maxItems",
																			keyword: "maxItems",
																			params: { limit: 128 },
																			message: "must NOT have more than 128 items"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	} else if (r.length < 0) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Color%24/anyOf/1/minItems",
																			keyword: "minItems",
																			params: { limit: 0 },
																			message: "must NOT have fewer than 0 items"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	} else {
																		let e = r.length;
																		for (let i = 0; i < e; i++) {
																			let e = r[i], s = o;
																			if (o === o) if (typeof e == "string") {
																				if (!Mt.test(e)) {
																					let e = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																						schemaPath: "#/definitions/color/pattern",
																						keyword: "pattern",
																						params: { pattern: "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$" },
																						message: "must match pattern \"^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$\""
																					};
																					a === null ? a = [e] : a.push(e), o++;
																				}
																			} else {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																					schemaPath: "#/definitions/color/type",
																					keyword: "type",
																					params: { type: "string" },
																					message: "must be string"
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			}
																			if (s !== o) break;
																		}
																	}
																	else {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Color%24/anyOf/1/type",
																			keyword: "type",
																			params: { type: "array" },
																			message: "must be array"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																	var h = e === o;
																	c ||= h;
																}
																if (c) o = s, a !== null && (s ? a.length = s : a = null);
																else {
																	let e = {
																		instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																		schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*Color%24/anyOf",
																		keyword: "anyOf",
																		params: {},
																		message: "must match a schema in anyOf"
																	};
																	return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
																}
																var p = i === o;
																if (!p) break;
															}
															if (p) {
																var p = !0;
																for (let n in e) if (wt.test(n)) {
																	let r = e[n], i = o, s = o, c = !1, l = o;
																	if (typeof r != "string") {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/definitions/colorFill/type",
																			keyword: "type",
																			params: { type: "string" },
																			message: "must be string"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																	if (!(r === "solid" || r === "linear" || r === "radial")) {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/definitions/colorFill/enum",
																			keyword: "enum",
																			params: { allowedValues: vt.enum },
																			message: "must be equal to one of the allowed values"
																		};
																		a === null ? a = [e] : a.push(e), o++;
																	}
																	var g = l === o;
																	if (c ||= g, !c) {
																		let e = o;
																		if (o === e) if (Array.isArray(r)) if (r.length > 128) {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFill%24/anyOf/1/maxItems",
																				keyword: "maxItems",
																				params: { limit: 128 },
																				message: "must NOT have more than 128 items"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		} else if (r.length < 0) {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFill%24/anyOf/1/minItems",
																				keyword: "minItems",
																				params: { limit: 0 },
																				message: "must NOT have fewer than 0 items"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		} else {
																			let e = r.length;
																			for (let i = 0; i < e; i++) {
																				let e = r[i], s = o;
																				if (typeof e != "string") {
																					let e = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																						schemaPath: "#/definitions/colorFill/type",
																						keyword: "type",
																						params: { type: "string" },
																						message: "must be string"
																					};
																					a === null ? a = [e] : a.push(e), o++;
																				}
																				if (!(e === "solid" || e === "linear" || e === "radial")) {
																					let e = {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																						schemaPath: "#/definitions/colorFill/enum",
																						keyword: "enum",
																						params: { allowedValues: vt.enum },
																						message: "must be equal to one of the allowed values"
																					};
																					a === null ? a = [e] : a.push(e), o++;
																				}
																				if (s !== o) break;
																			}
																		}
																		else {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFill%24/anyOf/1/type",
																				keyword: "type",
																				params: { type: "array" },
																				message: "must be array"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		}
																		var g = e === o;
																		c ||= g;
																	}
																	if (c) o = s, a !== null && (s ? a.length = s : a = null);
																	else {
																		let e = {
																			instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																			schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFill%24/anyOf",
																			keyword: "anyOf",
																			params: {},
																			message: "must match a schema in anyOf"
																		};
																		return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
																	}
																	var p = i === o;
																	if (!p) break;
																}
																if (p) {
																	var p = !0;
																	for (let n in e) if (Tt.test(n)) {
																		let r = e[n], i = o, s = o, c = !1, l = o, u = o;
																		if (!(typeof r == "number" && !(r % 1) && !isNaN(r) && isFinite(r))) {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/definitions/colorFillStops/type",
																				keyword: "type",
																				params: { type: "integer" },
																				message: "must be integer"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		}
																		if (o === u && typeof r == "number" && isFinite(r) && (r < 2 || isNaN(r))) {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/definitions/colorFillStops/minimum",
																				keyword: "minimum",
																				params: {
																					comparison: ">=",
																					limit: 2
																				},
																				message: "must be >= 2"
																			};
																			a === null ? a = [e] : a.push(e), o++;
																		}
																		var _ = l === o;
																		if (c ||= _, !c) {
																			let e = o;
																			if (o === e) if (Array.isArray(r)) if (r.length > 2) {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFillStops%24/anyOf/1/maxItems",
																					keyword: "maxItems",
																					params: { limit: 2 },
																					message: "must NOT have more than 2 items"
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			} else if (r.length < 0) {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFillStops%24/anyOf/1/minItems",
																					keyword: "minItems",
																					params: { limit: 0 },
																					message: "must NOT have fewer than 0 items"
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			} else {
																				let e = r.length;
																				for (let i = 0; i < e; i++) {
																					let e = r[i], s = o, c = o;
																					if (!(typeof e == "number" && !(e % 1) && !isNaN(e) && isFinite(e))) {
																						let e = {
																							instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																							schemaPath: "#/definitions/colorFillStops/type",
																							keyword: "type",
																							params: { type: "integer" },
																							message: "must be integer"
																						};
																						a === null ? a = [e] : a.push(e), o++;
																					}
																					if (o === c && typeof e == "number" && isFinite(e) && (e < 2 || isNaN(e))) {
																						let e = {
																							instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i,
																							schemaPath: "#/definitions/colorFillStops/minimum",
																							keyword: "minimum",
																							params: {
																								comparison: ">=",
																								limit: 2
																							},
																							message: "must be >= 2"
																						};
																						a === null ? a = [e] : a.push(e), o++;
																					}
																					if (s !== o) break;
																				}
																			}
																			else {
																				let e = {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFillStops%24/anyOf/1/type",
																					keyword: "type",
																					params: { type: "array" },
																					message: "must be array"
																				};
																				a === null ? a = [e] : a.push(e), o++;
																			}
																			var _ = e === o;
																			c ||= _;
																		}
																		if (c) o = s, a !== null && (s ? a.length = s : a = null);
																		else {
																			let e = {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				schemaPath: "#/patternProperties/%5E%5Ba-z%5D%5Ba-zA-Z0-9%5D*ColorFillStops%24/anyOf",
																				keyword: "anyOf",
																				params: {},
																				message: "must match a schema in anyOf"
																			};
																			return a === null ? a = [e] : a.push(e), o++, L.errors = a, !1;
																		}
																		var p = i === o;
																		if (!p) break;
																	}
																	if (p) {
																		var p = !0;
																		for (let n in e) if (Et.test(n)) {
																			let r = o;
																			Pt(e[n], {
																				instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																				parentData: e,
																				parentDataProperty: n,
																				rootData: i
																			}) || (a = a === null ? Pt.errors : a.concat(Pt.errors), o = a.length);
																			var p = r === o;
																			if (!p) break;
																		}
																		if (p) {
																			var p = !0;
																			for (let n in e) if (Dt.test(n)) {
																				let r = o;
																				Pt(e[n], {
																					instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																					parentData: e,
																					parentDataProperty: n,
																					rootData: i
																				}) || (a = a === null ? Pt.errors : a.concat(Pt.errors), o = a.length);
																				var p = r === o;
																				if (!p) break;
																			}
																			if (p) {
																				var p = !0;
																				for (let n in e) if (Ot.test(n)) {
																					let r = o;
																					Ft(e[n], {
																						instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																						parentData: e,
																						parentDataProperty: n,
																						rootData: i
																					}) || (a = a === null ? Ft.errors : a.concat(Ft.errors), o = a.length);
																					var p = r === o;
																					if (!p) break;
																				}
																				if (p) {
																					var p = !0;
																					for (let n in e) if (kt.test(n)) {
																						let r = o;
																						Ft(e[n], {
																							instancePath: t + "/" + n.replace(/~/g, "~0").replace(/\//g, "~1"),
																							parentData: e,
																							parentDataProperty: n,
																							rootData: i
																						}) || (a = a === null ? Ft.errors : a.concat(Ft.errors), o = a.length);
																						var p = r === o;
																						if (!p) break;
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	} else return L.errors = [{
		instancePath: t,
		schemaPath: "#/type",
		keyword: "type",
		params: { type: "object" },
		message: "must be object"
	}], !1;
	return L.errors = a, o === 0;
}
var It = class {
	static validate(e) {
		if (!L(e)) throw new mt(L.errors || []);
	}
}, Lt = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, R = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, z, B, Rt, zt, Bt, Vt = class {
	constructor(e = {}) {
		z.add(this), B.set(this, void 0), It.validate(e), Lt(this, B, structuredClone(e), "f");
	}
	seed() {
		return R(this, B, "f").seed;
	}
	size() {
		return R(this, B, "f").size;
	}
	idRandomization() {
		return R(this, B, "f").idRandomization;
	}
	title() {
		return R(this, B, "f").title;
	}
	flip() {
		return R(this, z, "m", zt).call(this, R(this, B, "f").flip);
	}
	fontFamily() {
		return R(this, z, "m", zt).call(this, R(this, B, "f").fontFamily);
	}
	fontWeight() {
		return R(this, z, "m", zt).call(this, R(this, B, "f").fontWeight);
	}
	scale() {
		return R(this, z, "m", Bt).call(this, R(this, B, "f").scale);
	}
	borderRadius() {
		return R(this, z, "m", Bt).call(this, R(this, B, "f").borderRadius);
	}
	rotate() {
		return R(this, z, "m", Bt).call(this, R(this, B, "f").rotate);
	}
	translateX() {
		return R(this, z, "m", Bt).call(this, R(this, B, "f").translateX);
	}
	translateY() {
		return R(this, z, "m", Bt).call(this, R(this, B, "f").translateY);
	}
	componentVariant(e) {
		let t = R(this, z, "m", Rt).call(this, `${e}Variant`);
		if (t !== void 0) return typeof t == "string" ? { [t]: 1 } : Array.isArray(t) ? Object.fromEntries(t.map((e) => [e, 1])) : t;
	}
	componentProbability(e) {
		return R(this, z, "m", Rt).call(this, `${e}Probability`);
	}
	color(e) {
		let t = R(this, z, "m", Rt).call(this, `${e}Color`);
		return t === void 0 ? void 0 : R(this, z, "m", zt).call(this, t);
	}
	colorFill(e) {
		return R(this, z, "m", zt).call(this, R(this, z, "m", Rt).call(this, `${e}ColorFill`));
	}
	colorAngle(e) {
		return R(this, z, "m", Bt).call(this, R(this, z, "m", Rt).call(this, `${e}ColorAngle`));
	}
	colorFillStops(e) {
		return R(this, z, "m", Bt).call(this, R(this, z, "m", Rt).call(this, `${e}ColorFillStops`));
	}
};
B = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), Rt = function(e) {
	return R(this, B, "f")[e];
}, zt = function(e) {
	return e === void 0 ? [] : Array.isArray(e) ? e : [e];
}, Bt = function(e) {
	if (e !== void 0) {
		if (typeof e == "number") return {
			min: e,
			max: e
		};
		if (e.length !== 0) return {
			min: Math.min(...e),
			max: Math.max(...e)
		};
	}
};
//#endregion
//#region node_modules/@dicebear/core/lib/Prng/Fnv1a.js
var Ht = class e {
	static hash(e) {
		let t = 2166136261;
		for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
		return t >>> 0;
	}
	static hex(t) {
		return e.hash(t).toString(16).padStart(8, "0");
	}
}, Ut = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Wt = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Gt, Kt = 2 ** 32, qt = class {
	constructor(e) {
		Gt.set(this, void 0), Ut(this, Gt, e, "f");
	}
	next() {
		let e = Ut(this, Gt, Wt(this, Gt, "f") + 1831565813 | 0, "f"), t = Math.imul(e ^ e >>> 15, e | 1);
		return t ^= t + Math.imul(t ^ t >>> 7, t | 61), (t ^ t >>> 14) >>> 0;
	}
	nextFloat() {
		return this.next() / Kt;
	}
	state() {
		return Wt(this, Gt, "f");
	}
};
Gt = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/Prng.js
var Jt = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Yt = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Xt, Zt, Qt, $t, en = class {
	constructor(e) {
		Xt.add(this), Zt.set(this, void 0), Jt(this, Zt, e, "f");
	}
	pick(e, t) {
		if (t.length === 0) return;
		if (t.length === 1) return t[0];
		let n = Yt(this, Xt, "m", Qt).call(this, t);
		if (n.length === 1) return n[0];
		let r = n.sort(Yt(this, Xt, "m", $t));
		return r[Math.floor(this.getValue(e) * r.length)];
	}
	weightedPick(e, t) {
		let n = Object.keys(t);
		if (n.length === 0) return;
		if (n.length === 1) return n[0];
		let r = n.sort(Yt(this, Xt, "m", $t)), i = r.reduce((e, n) => e + t[n], 0);
		if (i === 0) return this.pick(e, r);
		let a = this.getValue(e) * i, o = 0;
		for (let e of r) if (o += t[e], a < o) return e;
		return r[r.length - 1];
	}
	bool(e, t = 50) {
		return this.getValue(e) * 100 < t;
	}
	float(e, t) {
		let n = Math.min(t.min, t.max), r = Math.max(t.min, t.max), i = t.step ?? 0, a;
		if (i > 0) {
			let t = Math.floor((r - n) / i) + 1;
			a = n + Math.floor(this.getValue(e) * t) * i;
		} else a = n + this.getValue(e) * (r - n);
		return Math.round(a * 1e4) / 1e4;
	}
	integer(e, t) {
		let n = Math.min(t.min, t.max), r = Math.max(t.min, t.max);
		return Math.floor(this.getValue(e) * (r - n + 1)) + n;
	}
	shuffle(e, t) {
		if (t.length <= 1) return [...t];
		let n = Yt(this, Xt, "m", Qt).call(this, t).sort(Yt(this, Xt, "m", $t)), r = new qt(Ht.hash(Yt(this, Zt, "f") + ":" + e));
		for (let e = n.length - 1; e > 0; e--) {
			let t = Math.floor(r.nextFloat() * (e + 1)), i = n[e];
			n[e] = n[t], n[t] = i;
		}
		return n;
	}
	getValue(e) {
		return new qt(Ht.hash(Yt(this, Zt, "f") + ":" + e)).nextFloat();
	}
};
Zt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakSet(), Qt = function(e, t = String) {
	let n = /* @__PURE__ */ new Set(), r = [];
	for (let i of e) {
		let e = t(i);
		n.has(e) || (n.add(e), r.push(i));
	}
	return r;
}, $t = function(e, t) {
	let n = String(e), r = String(t);
	return n < r ? -1 : +(n > r);
};
//#endregion
//#region node_modules/@dicebear/core/lib/Utils/Color.js
var tn = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, nn, rn, an = class {
	static toHex(e) {
		let t = e.replace(/^#/, "").toLowerCase();
		return t.length === 3 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t.length === 4 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] : "#" + t;
	}
	static toRgbHex(e) {
		let t = this.toHex(e);
		return t.length > 7 ? t.slice(0, 7) : t;
	}
	static parseHex(e) {
		let t = this.toHex(e).slice(1);
		return [
			parseInt(t.slice(0, 2), 16),
			parseInt(t.slice(2, 4), 16),
			parseInt(t.slice(4, 6), 16)
		];
	}
	static luminance(e) {
		let t = this.parseHex(e), n = tn(this, nn, "m", rn).call(this, t[0]), r = tn(this, nn, "m", rn).call(this, t[1]), i = tn(this, nn, "m", rn).call(this, t[2]);
		return .2126 * n + .7152 * r + .0722 * i;
	}
	static sortByContrast(e, t) {
		let n = this.luminance(t), r = e.map((e) => {
			let t = this.luminance(e);
			return {
				color: e,
				ratio: (Math.max(t, n) + .05) / (Math.min(t, n) + .05)
			};
		});
		return r.sort((e, t) => t.ratio - e.ratio), r.map((e) => e.color);
	}
	static filterNotEqualTo(e, t) {
		let n = new Set(t.map((e) => this.toRgbHex(e))), r = e.filter((e) => !n.has(this.toRgbHex(e)));
		return r.length > 0 ? r : Array.from(e);
	}
};
nn = an, rn = function(e) {
	let t = e / 255;
	return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
};
//#endregion
//#region node_modules/@dicebear/core/lib/Error/CircularColorReferenceError.js
var on = class extends Error {
	constructor(e) {
		let t = e.join(" → ");
		super(`Circular color reference: ${t}`), this.name = "CircularColorReferenceError", this.chain = e;
	}
}, sn = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, V = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, H, cn, U, W, ln, un, dn, fn, pn, mn, G, K, hn = class {
	constructor(e, t) {
		H.add(this), cn.set(this, void 0), U.set(this, void 0), W.set(this, void 0), ln.set(this, []), un.set(this, {}), sn(this, cn, e, "f"), sn(this, U, t, "f"), sn(this, W, new en(this.seed()), "f");
	}
	seed() {
		return V(this, U, "f").seed() ?? "";
	}
	size() {
		return V(this, H, "m", K).call(this, "size", () => V(this, U, "f").size());
	}
	idRandomization() {
		return V(this, H, "m", K).call(this, "idRandomization", () => V(this, U, "f").idRandomization() ?? !1);
	}
	title() {
		return V(this, H, "m", K).call(this, "title", () => V(this, U, "f").title());
	}
	flip() {
		return V(this, H, "m", K).call(this, "flip", () => V(this, W, "f").pick("flip", V(this, U, "f").flip()) ?? "none");
	}
	fontFamily() {
		return V(this, H, "m", K).call(this, "fontFamily", () => V(this, W, "f").pick("fontFamily", V(this, U, "f").fontFamily()) ?? "system-ui");
	}
	fontWeight() {
		return V(this, H, "m", K).call(this, "fontWeight", () => V(this, W, "f").pick("fontWeight", V(this, U, "f").fontWeight()) ?? 400);
	}
	scale() {
		return V(this, H, "m", G).call(this, "scale", V(this, U, "f").scale(), 1);
	}
	borderRadius() {
		return V(this, H, "m", G).call(this, "borderRadius", V(this, U, "f").borderRadius(), 0);
	}
	rotate() {
		return V(this, H, "m", G).call(this, "rotate", V(this, U, "f").rotate(), 0);
	}
	translateX() {
		return V(this, H, "m", G).call(this, "translateX", V(this, U, "f").translateX(), 0);
	}
	translateY() {
		return V(this, H, "m", G).call(this, "translateY", V(this, U, "f").translateY(), 0);
	}
	variant(e) {
		return V(this, H, "m", K).call(this, `${e}Variant`, () => {
			let t = V(this, cn, "f").components().get(e);
			if (!t || !V(this, H, "m", fn).call(this, e, t)) return;
			let n = V(this, U, "f").componentVariant(t.sourceName()), r = t.variants(), i = {};
			if (n === void 0) for (let [e, t] of r) i[e] = t.weight();
			else for (let [e, t] of Object.entries(n)) r.has(e) && (i[e] = t);
			return V(this, W, "f").weightedPick(`${e}Variant`, i);
		});
	}
	color(e) {
		return V(this, H, "m", K).call(this, `${e}Color`, () => V(this, H, "m", pn).call(this, e));
	}
	colorFill(e) {
		return V(this, H, "m", K).call(this, `${e}ColorFill`, () => V(this, W, "f").pick(`${e}ColorFill`, V(this, U, "f").colorFill(e)) ?? "solid");
	}
	colorAngle(e) {
		return V(this, H, "m", G).call(this, `${e}ColorAngle`, V(this, U, "f").colorAngle(e), 0);
	}
	componentTransform(e) {
		let t = V(this, cn, "f").components().get(e);
		return {
			rotate: V(this, H, "m", G).call(this, `${e}Rotate`, t?.rotate(), 0),
			translateX: V(this, H, "m", G).call(this, `${e}TranslateX`, t?.translate().x(), 0),
			translateY: V(this, H, "m", G).call(this, `${e}TranslateY`, t?.translate().y(), 0),
			scale: V(this, H, "m", G).call(this, `${e}Scale`, t?.scale(), 1)
		};
	}
	resolved() {
		return V(this, un, "f");
	}
};
cn = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), dn = function(e) {
	return V(this, U, "f").componentProbability(e.sourceName()) ?? e.probability();
}, fn = function(e, t) {
	return V(this, W, "f").bool(`${e}Probability`, V(this, H, "m", dn).call(this, t));
}, pn = function(e) {
	let t = V(this, U, "f").color(e), n = V(this, cn, "f").colors().get(e), r = (t ?? n?.values() ?? []).map((e) => an.toHex(e)), i = this.colorFill(e) === "solid" ? 1 : V(this, H, "m", mn).call(this, e);
	if (!n) return V(this, W, "f").shuffle(`${e}Color`, r).slice(0, i);
	if (V(this, ln, "f").includes(e)) throw new on(V(this, ln, "f").concat(e));
	V(this, ln, "f").push(e);
	let a = n.contrastTo(), o = n.notEqualTo();
	try {
		if (a) {
			let e = this.color(a)[0];
			e && (r = an.sortByContrast(r, e));
		}
		if (o.length > 0) {
			let e = [];
			for (let t of o) for (let n of this.color(t)) e.push(n);
			r = an.filterNotEqualTo(r, e);
		}
	} finally {
		V(this, ln, "f").pop();
	}
	return (a ? r : V(this, W, "f").shuffle(`${e}Color`, r)).slice(0, i);
}, mn = function(e) {
	let t = V(this, U, "f").colorFillStops(e);
	return t ? V(this, W, "f").integer(`${e}ColorFillStops`, t) : 2;
}, G = function(e, t, n) {
	return V(this, H, "m", K).call(this, e, () => t ? V(this, W, "f").float(e, t) : n);
}, K = function(e, t) {
	if (e in V(this, un, "f")) return V(this, un, "f")[e];
	let n = t();
	return V(this, un, "f")[e] = n, n;
};
//#endregion
//#region node_modules/@dicebear/core/lib/Utils/Initials.js
var gn = class {
	static fromSeed(e, t = !0) {
		let n = e;
		t && (n = e.replace(/@.*/, "")), n = n.replace(/[`´'ʼ]/g, "");
		let r = n.match(/(\p{L}[\p{L}\p{M}]*)/gu);
		if (!r) return t ? this.fromSeed(e, !1) : "";
		if (r.length === 1) {
			let e = r[0].match(/^(?:\p{L}\p{M}*){1,2}/u);
			return e ? e[0].toUpperCase() : "";
		}
		let i = r[0].match(/^(?:\p{L}\p{M}*)/u), a = r[r.length - 1].match(/^(?:\p{L}\p{M}*)/u);
		return !i || !a ? "" : (i[0] + a[0]).toUpperCase();
	}
}, _n = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, vn, yn, bn, q = class {
	static escape(e) {
		return e.replace(_n(vn, vn, "f", bn), (e) => _n(vn, vn, "f", yn)[e]);
	}
};
vn = q, yn = { value: {
	"&": "&amp;",
	"'": "&apos;",
	"\"": "&quot;",
	"<": "&lt;",
	">": "&gt;"
} }, bn = { value: RegExp(`[${Object.keys(_n(vn, vn, "f", yn)).join("")}]`, "g") };
//#endregion
//#region node_modules/@dicebear/core/lib/Utils/License.js
var xn = class {
	static text(e) {
		let t = e.source().name(), n = e.source().url(), r = e.creator().name(), i = e.license().name(), a = e.license().url();
		if (!t && !r && !i) return "";
		let o = t ? `“${t}”` : "Design";
		n && (o += ` (${n})`);
		let s = `“${r ?? "Unknown"}”`, c = "";
		return i !== "MIT" && r !== "DiceBear" && t && (c += "Remix of "), c += `${o} by ${s}`, i && (c += `, licensed under “${i}”`, a && (c += ` (${a})`)), c;
	}
	static xml(e) {
		let t = e.source().name(), n = e.creator().name(), r = e.source().url(), i = e.license().url(), a = this.text(e);
		if (!t && !n && !r && !i && !a) return "";
		let o = [];
		return t && o.push(`<dc:title>${q.escape(t)}</dc:title>`), n && o.push(`<dc:creator>${q.escape(n)}</dc:creator>`), r && o.push(`<dc:source xsi:type="dcterms:URI">${q.escape(r)}</dc:source>`), i && o.push(`<dcterms:license xsi:type="dcterms:URI">${q.escape(i)}</dcterms:license>`), a && o.push(`<dc:rights>${q.escape(a)}</dc:rights>`), `<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description>${o.join("")}</rdf:Description></rdf:RDF></metadata>`;
	}
}, J = class {
	static format(e) {
		if (e !== e) return "NaN";
		if (e === Infinity) return "Infinity";
		if (e === -Infinity) return "-Infinity";
		let t = Math.round(e * 1e5), n = t < 0 ? "-" : "";
		t = Math.abs(t);
		let r = Math.floor(t / 1e5), i = String(t % 1e5).padStart(5, "0").replace(/0+$/, "");
		return `${n}${r}${i ? `.${i}` : ""}`;
	}
}, Sn = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Y = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, X, Cn, Z, Q, wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn = class {
	constructor(e, t) {
		X.add(this), Cn.set(this, void 0), Z.set(this, void 0), Q.set(this, /* @__PURE__ */ new Map()), wn.set(this, void 0), Tn.set(this, void 0), Sn(this, Cn, e, "f"), Sn(this, Z, t, "f");
	}
	render() {
		let e = Y(this, Cn, "f").canvas(), t = Y(this, X, "m", jn).call(this, e), n = Y(this, X, "m", Nn).call(this, e.elements());
		n = Y(this, X, "m", Dn).call(this, n, e), n = Y(this, X, "m", En).call(this, n, e), n = Y(this, X, "m", kn).call(this, n, e), n = Y(this, X, "m", An).call(this, n, e), n = Y(this, X, "m", On).call(this, `${t}${n}`, e);
		let r = xn.xml(Y(this, Cn, "f").meta()), i = Y(this, Q, "f").size > 0 ? `<defs>${Array.from(Y(this, Q, "f").values()).join("")}</defs>` : "", a = Y(this, Z, "f").size(), o = Y(this, Z, "f").title(), s = o === void 0 ? void 0 : q.escape(o), c = ["xmlns=\"http://www.w3.org/2000/svg\"", `viewBox="0 0 ${J.format(e.width())} ${J.format(e.height())}"`], l = Y(this, X, "m", zn).call(this, Y(this, Cn, "f").attributes());
		if (l && c.push(l.trimStart()), s === void 0 ? c.push("aria-hidden=\"true\"") : c.push("role=\"img\"", `aria-label="${s}"`), a !== void 0) {
			let e = J.format(a);
			c.push(`width="${e}"`, `height="${e}"`);
		}
		let u = s === void 0 ? "" : `<title>${s}</title>`, d = `<svg ${c.join(" ")}>${r}${i}${u}${n}</svg>`;
		return Y(this, Z, "f").idRandomization() && (d = Y(this, X, "m", Mn).call(this, d)), d;
	}
};
Cn = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), En = function(e, t) {
	let n = Y(this, Z, "f").flip();
	if (n === "none") return e;
	let r = J.format(t.width()), i = J.format(t.height()), a;
	switch (n) {
		case "horizontal":
			a = `translate(${r}, 0) scale(-1, 1)`;
			break;
		case "vertical":
			a = `translate(0, ${i}) scale(1, -1)`;
			break;
		case "both":
			a = `translate(${r}, ${i}) scale(-1, -1)`;
			break;
	}
	return `<g transform="${a}">${e}</g>`;
}, Dn = function(e, t) {
	let n = Y(this, Z, "f").scale();
	if (n === 1) return e;
	let r = t.width() / 2, i = t.height() / 2;
	return `<g transform="translate(${J.format(r)}, ${J.format(i)}) scale(${J.format(n)}) translate(${J.format(-r)}, ${J.format(-i)})">${e}</g>`;
}, On = function(e, t) {
	let n = Y(this, Z, "f").borderRadius(), r = `clip-${Y(this, X, "m", Kn).call(this)}`, i = J.format(n / 100 * t.width()), a = J.format(n / 100 * t.height());
	return Y(this, Q, "f").set(r, `<clipPath id="${r}"><rect width="${J.format(t.width())}" height="${J.format(t.height())}" rx="${i}" ry="${a}"/></clipPath>`), `<g clip-path="url(#${r})">${e}</g>`;
}, kn = function(e, t) {
	let n = Y(this, Z, "f").rotate();
	if (n === 0) return e;
	let r = t.width() / 2, i = t.height() / 2;
	return `<g transform="rotate(${J.format(n)}, ${J.format(r)}, ${J.format(i)})">${e}</g>`;
}, An = function(e, t) {
	let n = Y(this, Z, "f").translateX(), r = Y(this, Z, "f").translateY();
	return n === 0 && r === 0 ? e : `<g transform="translate(${J.format(n / 100 * t.width())}, ${J.format(r / 100 * t.height())})">${e}</g>`;
}, jn = function(e) {
	return Y(this, Z, "f").color("background").length === 0 ? "" : `<rect width="${J.format(e.width())}" height="${J.format(e.height())}" fill="${q.escape(Y(this, X, "m", Vn).call(this, "background"))}"/>`;
}, Mn = function(e) {
	let t = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"), n = /* @__PURE__ */ new Set();
	for (let t of e.matchAll(/\bid="([^"]+)"/g)) n.add(t[1]);
	if (n.size === 0) return e;
	let r = Array.from(n, (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), i = RegExp(`(id="|url\\(#|href="#)(${r.join("|")})("|\\))`, "g");
	return e.replace(i, (e, n, r, i) => `${n}${r}-${t}${i}`);
}, Nn = function(e) {
	return e.map((e) => Y(this, X, "m", Pn).call(this, e)).join("");
}, Pn = function(e) {
	switch (e.type()) {
		case "element": return Y(this, X, "m", Fn).call(this, e);
		case "text": return Y(this, X, "m", In).call(this, e);
		case "component": return Y(this, X, "m", Ln).call(this, e);
	}
}, Fn = function(e) {
	let t = e.name();
	if (!t) return "";
	if (t === "defs") {
		for (let t of e.children()) {
			let e = Y(this, X, "m", Pn).call(this, t);
			if (e.length > 0) {
				let n = t.attributes()?.id, r = typeof n == "string" ? n : `_${Y(this, Q, "f").size}`;
				Y(this, Q, "f").set(r, e);
			}
		}
		return "";
	}
	let n = Y(this, X, "m", zn).call(this, e.attributes()), r = Y(this, X, "m", Nn).call(this, e.children());
	return r.length === 0 ? `<${t}${n}/>` : `<${t}${n}>${r}</${t}>`;
}, In = function(e) {
	let t = e.value();
	return t === void 0 ? "" : q.escape(Y(this, X, "m", Un).call(this, t));
}, Ln = function(e) {
	let t = e.name();
	if (typeof t != "string") return "";
	let n = Y(this, Z, "f").variant(t);
	if (!n) return "";
	let r = Y(this, Cn, "f").components().get(t);
	if (!r) return "";
	let i = r.variants().get(n);
	if (!i) return "";
	let a = `${r.sourceName()}-${n}-${Y(this, X, "m", Kn).call(this)}`;
	if (!Y(this, Q, "f").has(a)) {
		let e = Y(this, X, "m", Nn).call(this, i.elements());
		Y(this, Q, "f").set(a, `<g id="${a}">${e}</g>`);
	}
	let o = Y(this, X, "m", Rn).call(this, r), s = e.attributes(), c = s;
	if (o.length > 0) {
		let e = s?.transform, t = typeof e == "string" && e.length > 0 ? [e, ...o] : o;
		c = {
			...s,
			transform: t.join(" ")
		};
	}
	return `<use${Y(this, X, "m", zn).call(this, c)} href="#${a}"/>`;
}, Rn = function(e) {
	let { rotate: t, translateX: n, translateY: r, scale: i } = Y(this, Z, "f").componentTransform(e.name());
	if (n === 0 && r === 0 && t === 0 && i === 1) return [];
	let a = [], o = e.width() / 2, s = e.height() / 2, c = J.format(o), l = J.format(s);
	if (n !== 0 || r !== 0) {
		let t = J.format(n / 100 * e.width()), i = J.format(r / 100 * e.height());
		a.push(`translate(${t}, ${i})`);
	}
	return t !== 0 && a.push(`rotate(${J.format(t)}, ${c}, ${l})`), i !== 1 && a.push(`translate(${c}, ${l}) scale(${J.format(i)}) translate(${J.format(-o)}, ${J.format(-s)})`), a;
}, zn = function(e) {
	if (!e) return "";
	let t = [];
	for (let [n, r] of Object.entries(e)) r !== void 0 && t.push(`${n}="${q.escape(Y(this, X, "m", Bn).call(this, r))}"`);
	return t.length === 0 ? "" : ` ${t.join(" ")}`;
}, Bn = function(e) {
	return typeof e == "string" ? e : e.type === "color" ? Y(this, X, "m", Vn).call(this, e.name) : Y(this, X, "m", Wn).call(this, e.name);
}, Vn = function(e) {
	let t = Y(this, Z, "f").color(e), n = Y(this, Z, "f").colorFill(e);
	return n === "solid" || t.length <= 1 ? t[0] ?? "none" : Y(this, X, "m", Hn).call(this, e, t, n);
}, Hn = function(e, t, n) {
	let r = Y(this, Z, "f").colorAngle(e), i = `${e}-color-${Y(this, X, "m", Kn).call(this)}`, a = n === "linear" ? "linearGradient" : "radialGradient", o = r === 0 ? "" : ` gradientTransform="rotate(${J.format(r)}, 0.5, 0.5)"`, s = t.map((e, n) => `<stop offset="${J.format(n / (t.length - 1) * 100)}%" stop-color="${q.escape(e)}"/>`);
	return Y(this, Q, "f").set(i, `<${a} id="${i}"${o}>${s.join("")}</${a}>`), `url(#${i})`;
}, Un = function(e) {
	return typeof e == "string" ? e : e.type === "variable" ? Y(this, X, "m", Wn).call(this, e.name) : "";
}, Wn = function(e) {
	switch (e) {
		case "initial": return Y(this, X, "m", Gn).call(this).charAt(0);
		case "initials": return Y(this, X, "m", Gn).call(this);
		case "fontWeight": return J.format(Y(this, Z, "f").fontWeight());
		case "fontFamily": return Y(this, Z, "f").fontFamily();
	}
}, Gn = function() {
	return Sn(this, Tn, Y(this, Tn, "f") ?? gn.fromSeed(Y(this, Z, "f").seed()), "f");
}, Kn = function() {
	return Sn(this, wn, Y(this, wn, "f") ?? Ht.hex(Y(this, Z, "f").seed()), "f");
};
//#endregion
//#region node_modules/@dicebear/core/lib/Avatar.js
var Jn = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Yn = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Xn, Zn, Qn = class {
	constructor(e, t) {
		Xn.set(this, void 0), Zn.set(this, void 0);
		let n = e instanceof pt ? e : new pt(e), r = new hn(n, new Vt(t));
		Jn(this, Xn, new qn(n, r).render(), "f"), Jn(this, Zn, r.resolved(), "f");
	}
	toString() {
		return Yn(this, Xn, "f");
	}
	toJSON() {
		return {
			svg: Yn(this, Xn, "f"),
			options: structuredClone(Yn(this, Zn, "f"))
		};
	}
	toDataUri() {
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(Yn(this, Xn, "f"))}`;
	}
};
Xn = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@dicebear/core/lib/OptionsDescriptor.js
var $n = function(e, t, n, r, i) {
	if (r === "m") throw TypeError("Private method is not writable");
	if (r === "a" && !i) throw TypeError("Private accessor was defined without a setter");
	if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
	return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, $ = function(e, t, n, r) {
	if (n === "a" && !r) throw TypeError("Private accessor was defined without a getter");
	if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
	return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, er, tr, nr, rr, ir, ar, or, sr = class {
	constructor(e) {
		er.add(this), ir.set(this, void 0), ar.set(this, void 0), $n(this, ar, e, "f");
	}
	toJSON() {
		return $n(this, ir, $(this, ir, "f") ?? $(this, er, "m", or).call(this), "f"), structuredClone($(this, ir, "f"));
	}
};
tr = sr, ir = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakSet(), or = function() {
	let e = {
		seed: { type: "string" },
		size: {
			type: "number",
			min: 1,
			max: 4096
		},
		idRandomization: { type: "boolean" },
		title: { type: "string" },
		flip: {
			type: "enum",
			values: [
				"none",
				"horizontal",
				"vertical",
				"both"
			],
			list: !0
		},
		fontFamily: {
			type: "string",
			list: !0
		},
		fontWeight: {
			type: "number",
			min: 1,
			max: 1e3,
			list: !0
		},
		scale: {
			type: "range",
			min: 0,
			max: 10
		},
		borderRadius: {
			type: "range",
			min: 0,
			max: 50
		},
		rotate: $(tr, tr, "f", nr),
		translateX: $(tr, tr, "f", rr),
		translateY: $(tr, tr, "f", rr)
	};
	for (let [t, n] of $(this, ar, "f").components()) {
		if (n.extendsName() !== void 0) continue;
		let r = Array.from(n.variants().keys()).sort();
		e[`${t}Variant`] = {
			type: "enum",
			values: r,
			list: !0,
			weighted: !0
		}, e[`${t}Probability`] = {
			type: "number",
			min: 0,
			max: 100
		};
	}
	for (let t of [...$(this, ar, "f").colors().keys(), "background"]) {
		let n = $(this, ar, "f").colors().get(t)?.contrastTo();
		e[`${t}Color`] = {
			type: "color",
			list: !0,
			...n ? { contrastTo: n } : {}
		}, e[`${t}ColorFill`] = {
			type: "enum",
			values: [
				"solid",
				"linear",
				"radial"
			],
			list: !0
		}, e[`${t}ColorFillStops`] = {
			type: "range",
			min: 2
		}, e[`${t}ColorAngle`] = $(tr, tr, "f", nr);
	}
	return e;
}, nr = { value: {
	type: "range",
	min: -360,
	max: 360
} }, rr = { value: {
	type: "range",
	min: -1e3,
	max: 1e3
} };
//#endregion
export { Qn as Avatar, an as Color, sr as OptionsDescriptor, pt as Style };
