#!/usr/bin/env zx

$.verbose = true;

await $`rm -rf ./chroma`;

await $`docker info &>/dev/null || (echo 'Docker daemon is not running. Make sure its running before initializing database' && exit 1)`;

// await $`git clone git@github.com:chroma-core/chroma.git`;
await $`git clone git@github.com:chroma-core/chroma.git --branch 0.4.14 --single-branch`;

await within(async () => {
  cd("./chroma");
  await $`docker-compose up -d --build`;
});
