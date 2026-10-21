#!/usr/bin/env node
// Hook PostToolUse : normalise le fichier que Claude vient d'éditer.
//
// Un hook ne reçoit PAS le chemin en argument : il reçoit un payload JSON sur stdin.
// C'est l'erreur la plus fréquente quand on écrit son premier hook.
import { readFileSync, writeFileSync } from "node:fs";

const EXTENSIONS = [".ts", ".js", ".mjs", ".json", ".md"];

const readStdin = async () => {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
};

const payload = JSON.parse((await readStdin()) || "{}");
const filePath = payload.tool_input?.file_path;

if (!filePath || !EXTENSIONS.some((ext) => filePath.endsWith(ext))) {
  process.exit(0);
}

let original;
try {
  original = readFileSync(filePath, "utf8");
} catch {
  process.exit(0); // fichier supprimé ou déplacé entre-temps
}

const formatted =
  original
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "") + "\n";

if (formatted !== original) {
  writeFileSync(filePath, formatted);
  console.error(`format.mjs: ${filePath} normalisé`);
}
