---
layout: post
title:  "Headsmart如何使用"
date:   2017-02-07 15:03:19 +0800
categories: headsmart
---
## Headsmart简介
Headsmart是一个jQuery插件，它根据存在的标题动态应用标题层次。

在构建模板时，我们不能相信我们的用户，他们会选择我们喜欢的标头标签层次结构。虽然我们很乐意承担，他们会知道我们希望他们开始用`<h3>`，更可能他们会用一个开始`<h1>`。这是Headsmart进来的地方。

Headsmart查看您提供的元素，并将标题类级别1-6分配给实际存在的标题标记。这意味着，最大头还是会看起来像你的1级标题是否是一个`<h1>`或`<h3>`。

## Headsmart用法
1、既然你将与类，而不是他们的实际元素造型你的头，你要使用的来样的`CSS`复位，以让所有的头长得一模一样。

2、现在你的`css`都是平等的，只需在包含你的内容的元素使用**headsmart**。**Headsmart**仅查找所提供元素的直接子元素，因此不会影响嵌套标题 `$('#site-content').headsmart()`

3、风格由headsmart生成的类，请：` .header-level-1` `.header-level-2` ` .header-level-3` `.header-level-4` ` .header-level-5`  `.header-level-6`

例如
![Headsmart用法图片](/assets/img1.png)