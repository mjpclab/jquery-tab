#!/bin/bash

# install required node scripts:
# npm install --global typescript rollup uglify

cd "$(dirname $0)"
rm -rf src/built/* dist/*
tsc
rollup --config

mkdir -p dist/theme/effect/

# generate css
cat src/css/layout/index.css src/css/skin/gray.css | \
	awk '
		{print;}

		/* .label-item-hidden is added for CSS priority */
		/\.tab-container-horizontal|\.label-item-hidden/,/}/ {
			if (length(hold) > 0) {
				hold=hold"\n";
			}
			hold=hold$0;
		}

		/}/ {
			if (length(hold) > 0) {
				gsub(/\.tab-container-horizontal/, ".tab-container", hold);
				gsub(/\.tab-container/, "*html .tab-container", hold);
				gsub(/\s*>\s*/, " ", hold);
				print hold;
				hold="";
			}
		}
	' > dist/theme/gray.css
for file in dist/theme/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;

cp src/css/effect/* dist/theme/effect/
for file in dist/theme/effect/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;
