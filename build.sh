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
# append IE6 compatible css
echo >> dist/theme/gray.css
echo >> dist/theme/gray.css
cat src/css/layout/index.css src/css/skin/gray.css | \
	sed -n -e '/\.tab-container-horizontal/,/}/p' | \
	sed -e 's/\.tab-container-horizontal/*html .tab-container/g' -e 's/\s*>\s*/ /g' >> \
	dist/theme/gray.css
# compress css
uglify -c -s dist/theme/gray.css -o dist/theme/gray.min.css

cp src/css/effect/* dist/theme/effect/
for file in dist/theme/effect/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;
