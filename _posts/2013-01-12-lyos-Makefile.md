---
layout: default
title: 关于lyos的Makefile
tag: lyos
---
#{{ page.title }}
对于Linux下编程来说，Makefile的编写是十分重要的
一个环节，和代码一样重要，不容忽视。当然，现在有
类似automake这样的工具存在，简化了Makefile的编写
。但是我个人认为手动编写Makefile依旧是一项不可缺
少的技能。好的Makefile可以大大加快开发进程，简化
工作。

由于lyos分为tools,boot,kern,lib等几个部分，所以
Makefile也采用分层的模式。即由项目的主Makefile
来引入tools/Makefrag等。在Makefile中的是与整个
项目都有关的选项与功能。

首先来介绍一下首层的Makefile吧。

首层的Makefile主要是一些设置参数，调试命令以及a.img
的生成等命令所对应的目标。其中a.img的生成又依赖于tools,boot等目标
的生成。

现在以tools/Makefrag文件，讲解一下tools的生成。

在这个文件的开头也是一些设置选项，不过只和tools
下的各类工具的生成有关。目前tools下只有creat_boot
这一个工具。
	
	TOOLS_ALL:=creat_boot
	TOOLS_ALL:=$(patsubst %,$(OBJDIR)/tools/%,$(TOOLS_ALL))

第一句指定了要生成的工具的名称，多个工具间用空格
分开。但是由于这些工具要生成到特定的目录下去，所
以第二句要对第一句的内容进行变换。由于在Makefile
中OBJDIR被设置为obj，所以TOOLS_ALL的值会变成
obj/tools/creat_boot。
	
	TOOLS_SRC:=creat_boot.c
	TOOLS_SRC:=$(patsubst %.c,tools/%.c,$(TOOLS_SRC))

TOOLS_SRC使用来记录tools下的源码文件的。

	TOOLS_OBJS:=$(patsubst %.c,$(OBJDIR)/%.o,$(TOOLS_SRC))

TOOLS_OBJS保存了要生成的对象文件名。

然后就是怎么让源码生成相应的工具。当然，目前只有c
代码，所以分为两步，首先是将.c编译生成.o。
	
	$(TOOLS_OBJS):$(OBJDIR)/tools/%.o:tools/%.c
		@mkdir -p $(OBJDIR)/tools
		$(V)$(CC) $(TOOLS_CFLAGS) -o $@ $< 

然后将.o文件进行链接，生成最后的工具。

	$(TOOLS_ALL):$(OBJDIR)/tools/%:$(OBJDIR)/tools/%.o
		@echo + $@
		$(V)$(TOOLS_LD) $(TOOLS_LDFLAGS) -o $@ $<

当然，所有tools下工具的都可以使用tools伪目标，这样做
是为了方便管理。

	tools:$(TOOLS_ALL)

boot和kern下的Makefrag基本上也符合这个格式，就不详细
讲解了。
