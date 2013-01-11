---
layout: default
title: 关于lyos
---
#{{ page.title }}
##简介
学习了这么久的操作系统，也做过了JOS，突然很想实现一个自己
的操作系统，就叫lyos吧。

这是一个以学习实验为主的操作系统，所以一切功能力求简单，
以实现这些功能为主要目的，其他就不追求了。
##日志
{% for post in site.posts %}
	{% if post.tag == 'lyos' %}
1.[{{ post.title }}]({{ post.url }})<br />
	{% endif %}
{% endfor %}
