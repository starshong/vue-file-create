//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let minimist = require("minimist");
minimist = __toESM(minimist);
let node_path = require("node:path");
node_path = __toESM(node_path);
let fs_extra = require("fs-extra");
fs_extra = __toESM(fs_extra);
let magic_string = require("magic-string");
magic_string = __toESM(magic_string);
//#region src/index.ts
const args = (0, minimist.default)(process.argv.slice(2));
const pkg = fs_extra.default.readJSONSync(node_path.default.join(process.cwd(), "package.json"));
const isTs = JSON.stringify(pkg).indexOf("typescript") > -1;
const templateRootPath = `${node_path.default.join(process.cwd(), "src/templates")}`;
const s = new magic_string.default(fs_extra.default.readFileSync(node_path.default.join(templateRootPath, "vue3-temp.vue"), { encoding: "utf-8" }));
s.replace("默认内容", args.f);
if (isTs) s.replace(`lang="ts"`, "");
const s1 = new magic_string.default(fs_extra.default.readFileSync(node_path.default.join(templateRootPath, "page.ts"), { encoding: "utf-8" }));
s1.replace("\"default\"", `'${args.f.split(/\\|\//).reduce((prev, curr) => `${(prev ? prev.charAt(0).toUpperCase() + prev.slice(1) : prev) + (curr.charAt(0).toUpperCase() + curr.slice(1))}`)}'`);
if (!fs_extra.default.existsSync(node_path.default.join(process.cwd(), args.r, args.f, "index.vue"))) fs_extra.default.createFileSync(node_path.default.join(process.cwd(), args.r, args.f, "index.vue"));
if (!fs_extra.default.existsSync(node_path.default.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`))) fs_extra.default.createFileSync(node_path.default.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`));
fs_extra.default.writeFileSync(node_path.default.join(process.cwd(), args.r, args.f, "index.vue"), s.toString());
fs_extra.default.writeFileSync(node_path.default.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`), s1.toString());
//#endregion
