#!/bin/bash

# install required node scripts:
# npm install --global typescript rollup uglify

cd "$(dirname $0)"
rm -rf src/built/* dist/*
tsc
rollup --config

mkdir -p dist/theme/effect/

# generate css
cat src/css/layout/index.css src/css/skin/gray.css > dist/theme/gray.css
for file in dist/theme/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;

cp src/css/effect/* dist/theme/effect/
for file in dist/theme/effect/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;
