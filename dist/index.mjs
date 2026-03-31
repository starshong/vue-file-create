import minimist from "minimist";
import path from "node:path";
import fs from "fs-extra";
import MagicString from "magic-string";
//#region src/index.ts
const args = minimist(process.argv.slice(2));
const pkg = fs.readJSONSync(path.join(process.cwd(), "package.json"));
const isTs = JSON.stringify(pkg).indexOf("typescript") > -1;
const templateRootPath = path.join(process.cwd(), "src/templates");
function toPascalCase(str) {
	return str.split(/\\|\//).reduce((prev, curr) => {
		return (prev ? prev.charAt(0).toUpperCase() + prev.slice(1) : prev) + (curr.charAt(0).toUpperCase() + curr.slice(1));
	});
}
function generateVueContent(template, fileName, useTs) {
	const s = new MagicString(template);
	s.replace("默认内容", fileName);
	if (!useTs) s.replace(`lang="ts"`, "");
	return s.toString();
}
function generateRouteContent(template, fileName) {
	const s = new MagicString(template);
	const componentName = toPascalCase(fileName);
	s.replace("\"default\"", `'${componentName}'`);
	return s.toString();
}
const vueTemplate = fs.readFileSync(path.join(templateRootPath, "vue3-temp.vue"), { encoding: "utf-8" });
const routeTemplate = fs.readFileSync(path.join(templateRootPath, "page.ts"), { encoding: "utf-8" });
const vueContent = generateVueContent(vueTemplate, args.f, isTs);
const routeContent = generateRouteContent(routeTemplate, args.f);
const targetDir = path.join(process.cwd(), args.r, args.f);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
const vueFilePath = path.join(targetDir, "index.vue");
const routeFilePath = path.join(targetDir, `page.${isTs ? "ts" : "js"}`);
fs.writeFileSync(vueFilePath, vueContent);
fs.writeFileSync(routeFilePath, routeContent);
//#endregion
export {};
