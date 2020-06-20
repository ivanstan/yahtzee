#!/usr/bin/env bash

NOW=$(date +"%Y%m%d%H%M")
TAG="release-${NOW}"

yarn build
cp -r build/* docs

git add docs
git commit -m "${TAG}"
git tag "${TAG}"
git push
