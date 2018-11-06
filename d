#!/bin/bash
hexo clean
hexo douban -b
hexo g
cd dist/
hexo deploy
