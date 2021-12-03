#!/usr/bin/env node
import commander from "commander";
import { execSync } from "child_process";
commander.description("Run advent of code answers");
commander.arguments("<day-of-advent>");
commander.parse(process.argv);
const command = `npx ts-node src/${commander.args[0]}.ts`;
execSync(command, { stdio: "inherit" });

export { commander };
