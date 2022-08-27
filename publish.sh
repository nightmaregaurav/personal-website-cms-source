#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');

const new_version = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf8' })).version;
const commit_message = "Automated: Release V${new_version}";

cp.execSync("git config --global user.email ${GITHUB_EMAIL}");
cp.execSync("git config --global user.name ${GITHUB_USER}");
cp.execSync("git clone ${TARGET_REPO} target_repo");
cp.execSync("rm -rf target_repo/*");
cp.execSync("cp -r dist/* target_repo");
cp.execSync("cp -r README.md target_repo/");
cp.execSync("cp -r LICENSE target_repo/");
cp.execSync("cd target_repo && git add -all && git commit -m '${commit_message}' && git push origin ${TARGET_BRANCH}");
