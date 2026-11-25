// Your Week in One Line — make.fun entry
// The week, told in four beats: what shipped, what paid, what broke, what is next.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const shipped = "Submitted 27 entries this week";
const paid = "won $0 so far";
const fixed = "fixed a badge, buried a bot";
const next = "still chasing top one";

const line = [shipped, paid, fixed, next].join(", ") + ".";

if (line.length < 1 || line.length > 100) {
  throw new Error(`entry must be 1-100 chars, got ${line.length}`);
}

// Single-line guard: the entry must be exactly one line.
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(`wrote ${line.length} chars to ${join(outDir, "entry.txt")}`);

// Read-back check: the file on disk must be byte-identical to the line.
import { readFileSync } from "node:fs";
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the entry line");
}
console.log("read-back check passed: entry.txt is byte-identical");
