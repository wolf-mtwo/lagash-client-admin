gulp build
find src/ -name '*.html' -exec cp --parents \{\} dist/ \;
mv dist/src/app dist
