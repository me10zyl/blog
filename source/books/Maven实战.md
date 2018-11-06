---
title: CSS 盒子模型
tags:
---


<style>
.img-desc{
	font-size:10px;
	color:#555;
}
</style>

块元素与行内元素的盒子模型区别。

<!-- more -->

## 基本框

CSS假定每个元素都会生成一个或多个矩形框，这些成为元素框。  
各个元素框中心有一个内容区（**content area**），内容区周围有可选的内边距、边框和外边距。内边距不能是负值，但是外边距可以。外边距通常是透明的。


<center>
<img src='/images/box.png' alt='box-model'/>  
<div class='img-desc'>盒子模型</div>  
</center>

元素的`width`被认为从左内边界到右边界的距离，`height`是从上内边界到下内边界的距离。也就是说，元素的`width`与`height`不包含`padding、margin`。

讨论盒子模型之前需要先了解一些术语:  

+ 正常流 : 大多数元素从左向右、从上向下显示，要让一个元素不在正常流中，唯一的办法就是使之成为浮动或者定位元素。
+ 非替换元素 ： 元素包含在文档中，如`em`, `a`。
+ 替换元素 ： 作为其他内容的一个占位符，如`img`，大多数表单也可以替换，如`<input type="radio" />`。
+ 块级元素 ： 指段落、标题或者div之类的元素，这些元素会在正常流中，会在其框之前和之后产生<quote>“换行”</quote>。
+ 行内元素 ： 指storng或者span之类的元素。不会在元素前后生成“行分隔符”。
+ 根元素 ： html元素。
	
块级元素
-------

## 水平格式化

#### 水平属性

块级元素水平共有7个宽度，其总宽度为  

`total-width = width + margin-left + margin-right + border-left + border-right + padding-left + padding-right`

共7个宽度，其中 `margin-left`, `magin-right`, `width` 可以设置为**auto**。

#### 使用auto

块级元素水平属性中`margin-left`, `magin-right`, `width` 可以设置为**auto**，意思就是浏览器自动计算其值，当其中有两个值确定了，第三个值就会被设置为占满父元素剩下所需的宽度。

+ 当3个属性没有一个为**auto**，那么这种格式化属性“过分受限”，此时，浏览器会将`margin-right`设置为**auto**，此时右外边距将“填补”所需的距离。
+ 当3个属性都为**auto**时，就是默认块元素所显示的那样。

#### 设置元素水平居中

当`margin-left`, `magin-right`, `width`其中有二个设置了明确的值，第三个属性设置为**auto**时，会使第三个属性的宽度确定所需的长度，从而使元素狂的宽度等于父元素的width。   
所以设置元素的宽度再使左右外边距为**auto**，即  

``` css
margin-left:auto;margin-right:auto;width:100px
```
 
这样就能使元素的左右两边外边距自动计算从而实现居中。这样与`text-align:center`的区别就是，text-align只能应用于块级元素中的**内联元素**。

## 垂直格式化

#### 垂直属性

块级元素水平共有7个高度，其总高度为  

`total-height = height + margin-top + margin-bottom + border-top + border-bottom + padding-top + padding-bottom`

共7个高度，其中 `margin-top`, `magin-bottom`, `height` 可以设置为**auto**，**遗憾的是**，`margin-top`和`margin-bottom`为auto时，会被自动解析为0，所以很不容易让正常流元素居中。高度为**auto**时，其高度为内容的高度。

#### 使用auto

高度使用**auto**会使之适应子元素的内容高度，而外边距使用**auto**会使外边距为0。

#### 垂直居中

将元素居中的唯一办法就是把上下边距都设置为25%。


#### 合并垂直外边距

垂直相邻外边距会合并，以较大者为总的垂直外边距。**但是**如果元素有内边距和外边距，他们绝对不会合并。
考虑下面的情况：

<div style="height: auto;background: silver">
    <p style="margin-top: 2em; margin-bottom: 2em;">A paragraph!</p>
</div>
<div style="height: auto;background: silver;border-top:1px solid;border-bottom: 1px solid;">
    <p style="margin-top: 2em; margin-bottom: 2em;">Another paragraph!</p>
</div>

```html
<div style="height: auto;background: silver">
    <p style="margin-top: 2em; margin-bottom: 2em;">A paragraph!</p>
</div>
<div style="height: auto;background: silver;border-top:1px solid;border-bottom: 1px solid;">
    <p style="margin-top: 2em; margin-bottom: 2em;">Another paragraph!</p>
</div>
```

当父元素高度为**auto**，仅包含块级子元素，并且没有内边距或者边框，这时子元素的外边距将会“**超出**”父元素。


## 块级替换元素

块级替换元素，如

```html
<img src='test.png' style='display:block' />
```

与块级非替换元素的区别就是，设置`width:auto、height:auto`时，其高度宽度为元素都是替换内容的固有宽度高度。


## 行内元素

#### 基本术语

+ 匿名文本：顾名思义，未包含在行内元素的文本如 `<div>anonymous text</div>`
+ em框：也称为字符框，实际字体可能比em框大或者小，`font-size` 决定了em框的大小
+ 内容区：即em框，如果是替换元素，就是元素的固有高度加上外边距、边框和内边距
+ 行间距(leading)：是font-size与line-height之差，这个差实际上要分成两半，分别应用于内容区的顶部和底部，为内容区增加的这两部分分别称为半间距(half-leading)。行间距只适用于非替换元素
+ 行内框：内容区加上行间距，对于非替换元素，刚好等于line-height，对于替换元素，恰好等于内容区的高度，因为line-height不适用于替换元素
+ 行框：包含该行中出现的行内框的最高点和最低点的小框，换句话说，就是该行的总共高度（上边界到下边界）

#### 行内替换元素

替换元素可以增加行框的高度，但不影响line-height的值，然而，替换元素还是有一个line-height值，因为要用于vertical-align的计算。

块级元素VS行内元素
---

+ 块级元素的背景应用于整个元素包括外边距，而行内元素的背景应用于内容区和内边距
+ 行内非替换元素的内外边距、边框没有垂直效果，而块级元素则有
+ 行内元素不能设置其width、height

替换元素的特殊之处
---

+ 块级替换元素的width或height为auto时，刚好是图片的宽度与高度
+ 行内替换元素的内外边距、边框有垂直效果


小结
---

+ `内容区` 为CSS属性中的 `width` 和 `height` ，并不包括内外边距与边框
+ 背景色包括 `内边距` 和 `内容区` ，但不包括 `外边距`
+ 块级元素的 `height` 为auto时，高度为内容区大小
+ 块级元素的 `width` 尽可能的占满父元素
+ 块级元素***水平方向*** `margin` 为**auto**时， 会尽可能的占满父元素
+ 块级元素***水平居中*** `margin-left:auto, margin-right: auto, width: 100px` 
+ 块级元素***垂直方向*** `margin` 为**auto**时， 会被自动解析为0
+ 块级元素***垂直方向*** `margin` 会**合并**
+ 块级元素仅包含块级子元素时，如果没有设置 `padding` 、 `border` 与 `height` ，父元素***垂直方向***的 `margin` 会与 子元素垂直方向的 `margin` **合并**。
+ 块级元素***垂直居中*** `margin` 不容易居中，唯一办法就是设置上下外边距为25%
+ 块级***替换元素***的高度宽度由替换内容决定
+ 行内元素不能包含块元素（XHTML定义的就是这样）
+ 行内元素没有 `width` 和 `height` ，也没有垂直方向的 `margin`
+ 行内元素的内边距和边框不改变行高，边框边界由`font-size`（em框）决定，而不是`line-height`

参考资料
----
《CSS权威指南》
