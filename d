#!/bin/bash
git add .
git commit -am "Update $(date)"
git push -u origin master
hexo clean
hexo g
hexo douban -b
hexo deploy
