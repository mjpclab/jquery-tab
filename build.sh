#!/bin/sh

cd "$(dirname $0)"
rm -rf src/built/* dist/*
tsc
webpack

mkdir -p dist/theme/
cat src/css/layout.css src/css/skin-gray.css > dist/theme/gray.css
uglify -c -s dist/theme/gray.css -o dist/theme/gray.min.css