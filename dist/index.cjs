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
const templateRootPath = node_path.default.join(process.cwd(), "src/templates");
function toPascalCase(str) {
	return str.split(/\\|\//).reduce((prev, curr) => {
		return (prev ? prev.charAt(0).toUpperCase() + prev.slice(1) : prev) + (curr.charAt(0).toUpperCase() + curr.slice(1));
	});
}
function generateVueContent(template, fileName, useTs) {
	const s = new magic_string.default(template);
	s.replace("默认内容", fileName);
	if (!useTs) s.replace(`lang="ts"`, "");
	return s.toString();
}
function generateRouteContent(template, fileName) {
	const s = new magic_string.default(template);
	const componentName = toPascalCase(fileName);
	s.replace("\"default\"", `'${componentName}'`);
	return s.toString();
}
const vueTemplate = fs_extra.default.readFileSync(node_path.default.join(templateRootPath, "vue3-temp.vue"), { encoding: "utf-8" });
const routeTemplate = fs_extra.default.readFileSync(node_path.default.join(templateRootPath, "page.ts"), { encoding: "utf-8" });
const vueContent = generateVueContent(vueTemplate, args.f, isTs);
const routeContent = generateRouteContent(routeTemplate, args.f);
const targetDir = node_path.default.join(process.cwd(), args.r, args.f);
if (!fs_extra.default.existsSync(targetDir)) fs_extra.default.mkdirSync(targetDir, { recursive: true });
const vueFilePath = node_path.default.join(targetDir, "index.vue");
const routeFilePath = node_path.default.join(targetDir, `page.${isTs ? "ts" : "js"}`);
fs_extra.default.writeFileSync(vueFilePath, vueContent);
fs_extra.default.writeFileSync(routeFilePath, routeContent);
//#endregion
