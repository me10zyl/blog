#!/bin/bash
hexo clean
hexo douban -b
hexo g
cd dist/
mv CSS css
hexo deploy
