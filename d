#!/bin/bash
git add .
git commit -am "Update $(date)"
hexo clean
hexo g
hexo douban -b
hexo deploy
