#!/bin/bash
cd $TJ/blog
ddd=`date "+%Y-%m-%d %H:%M:%S"`
git add -A
git commit -m "$ddd"
git push -u origin master
