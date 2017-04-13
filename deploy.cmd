set newdate=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
git add -A
git commit -m "%newdate%"
git push -u origin hexo
hexo d
