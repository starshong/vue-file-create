import minimist from "minimist";
import path from "node:path";
import fs from "fs-extra";
import MagicString from "magic-string";
//#region src/index.ts
const args = minimist(process.argv.slice(2));
const pkg = fs.readJSONSync(path.join(process.cwd(), "package.json"));
const isTs = JSON.stringify(pkg).indexOf("typescript") > -1;
const templateRootPath = `${path.join(process.cwd(), "src/templates")}`;
const s = new MagicString(fs.readFileSync(path.join(templateRootPath, "vue3-temp.vue"), { encoding: "utf-8" }));
s.replace("默认内容", args.f);
if (isTs) s.replace(`lang="ts"`, "");
const s1 = new MagicString(fs.readFileSync(path.join(templateRootPath, "page.ts"), { encoding: "utf-8" }));
s1.replace("\"default\"", `'${args.f.split(/\\|\//).reduce((prev, curr) => `${(prev ? prev.charAt(0).toUpperCase() + prev.slice(1) : prev) + (curr.charAt(0).toUpperCase() + curr.slice(1))}`)}'`);
if (!fs.existsSync(path.join(process.cwd(), args.r, args.f, "index.vue"))) fs.createFileSync(path.join(process.cwd(), args.r, args.f, "index.vue"));
if (!fs.existsSync(path.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`))) fs.createFileSync(path.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`));
fs.writeFileSync(path.join(process.cwd(), args.r, args.f, "index.vue"), s.toString());
fs.writeFileSync(path.join(process.cwd(), args.r, args.f, `page.${isTs ? "ts" : "js"}`), s1.toString());
//#endregion
export {};
