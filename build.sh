#!/bin/sh

# install required node scripts:
# npm install --global typescript rollup uglify

cd "$(dirname $0)"
rm -rf src/built/* dist/*
tsc
rollup --config

mkdir -p dist/theme/
cat src/css/layout.css src/css/skin-gray.css > dist/theme/gray.css
uglify -c -s dist/theme/gray.css -o dist/theme/gray.min.css