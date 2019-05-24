#!/bin/bash
git add .
git commit -am "Update $(date)"
git push -u origin master
./ls_app_md
hexo clean
hexo g
hexo douban -b
hexo deploy
