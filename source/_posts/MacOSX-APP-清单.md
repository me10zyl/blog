---
title: MacOSX APP 清单
date: 2019-05-24 09:52:25
tags: [mac,app]
---

现在正在用的APP清单：
更新日期:
<date>2019年 5月24日 星期五 11时08分25秒 CST</date>
<!-- more -->

本列表由ls_app_md脚本生成：
```shell
#!/bin/bash
cd ~/blog
$(ls /Applications | grep -v '^\.' | sed -n 's/\(.*\).app$/+ \1/p;' > app.list)
sed -i "" "s/<date>.*<\/date>/<date>`date`<\/date>/;/\+.*/d;/list:/r app.list" source/_posts/MacOSX-APP-清单.md
```

list:
+ AirServer
+ Alfred 3
+ Aliwangwang
+ App Store
+ Automator
+ BaiduNetdisk_mac
+ Be Focused
+ Beyond Compare
+ Calculator
+ Calendar
+ Chess
+ CleanMyMac 3
+ Contacts
+ DVD Player
+ Dash
+ Dashboard
+ DataGrip
+ Dictionary
+ FWMSO2016VL
+ FaceTime
+ Flux
+ Folx
+ Font Book
+ Go2Shell
+ GoodSync
+ Google Chrome
+ GsExplorer
+ HexoEditor
+ Image Capture
+ IntelliJ IDEA
+ JD-GUI
+ KeePassXC
+ Kext Utility
+ Kext Wizard
+ LICEcap
+ Launchpad
+ Lepton
+ Listen1
+ Mail
+ Maipo
+ Maps
+ Messages
+ Microsoft Excel
+ Microsoft Remote Desktop
+ Microsoft Word
+ Mission Control
+ Mob
+ Moom
+ MySQLWorkbench
+ Navicat Premium
+ NeteaseMusic
+ Noizio
+ Notes
+ Nutstore
+ OmniGraffle
+ OneDrive
+ OpenBoard
+ OpenWebMonitor3
+ Paste
+ Pennywise
+ Photo Booth
+ Photos
+ Pomotodo
+ Pomy
+ Preview
+ Proxyee
+ QQ
+ QQLive
+ QuickTime Player
+ Quiver
+ Reflector 3
+ Reminders
+ Safari
+ Script Debugger
+ SecureCRT
+ ShadowsocksX-NG-R8
+ Siri
+ Sketch
+ Skipper
+ SnippetsLab
+ Steam
+ Stickies
+ System Preferences
+ TeaCode
+ Telegram
+ TextEdit
+ TextExpander
+ Thunder
+ Time Machine
+ TweetDeck
+ Ukelele
+ VMware Fusion
+ Visual Studio Code
+ WeChat
+ Wireless Signal
+ WirelessUtility
+ Wireshark
+ Workspaces
+ Xcode
+ Yoink
+ YoudaoNote
+ iBooks
+ iStat Menus
+ iTerm
+ iTunes
+ iZip Unarchiver
+ irreader
+ labelme
+ oss-browser
+ rdm
+ wechatwebdevtools
+ 企业微信
+ 爱奇艺
+ 网易有道词典
