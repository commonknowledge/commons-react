/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require("child_process");

const isChore = execSync("git log -1 --pretty=%s")
  .toString()
  .startsWith("chore");

if (isChore) {
  console.log("Chore commit – skipping release");
  process.exit(0);
}

console.log("Bumping version…");
execSync("yarn lerna version --message 'chore: bump version' patch");
execSync("git push origin master");

console.log("Publishing to npm…");
execSync("yarn lerna publish -y");
execSync("git push --tags");
