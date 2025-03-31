# cach merge tu dong  ./backend/git_merge.ps1
git checkout master

git add .

git commit -m "end before merge"

git checkout main

git pull origin main

git merge master

git checkout master

git branch