cd docs
git init
git add -A
git commit -m 'docs($site): deploy site'
git push -f git@github.com:iq9891/ieditor.git master:gh-pages
