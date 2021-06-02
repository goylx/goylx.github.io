---
author: 欧阳罗霄
title:  搭建本地代码仓库
categories: 
	- git
tags:
	- git
references:
  - title: 《Git Pro2中文Gitbook》
    url: https://bingohuang.gitbooks.io/progit2/content/01-introduction/sections/about-version-control.html
  - title: 高质量的 Git 中文教程
    url : https://github.com/geeeeeeeeek/git-recipes
  - title: 动图展示十大Git命令
	  url : http://dockone.io/article/10081
---
## 安装git
{% note blue, 本文默认你对命令行工具有基本的了解，如果你还不知道如何使用请先对命令行工具有基本的了解后继续本文的阅读。 %}
打开命令行工具输入命令`git version`查看git版本，如果没有安装git参照如下方式：
{% tabs tab-id %}

<!-- tab windows -->

在 Git 官方网站下载，打开 http://git-scm.com/download/win 选择对应版本，下载后双击运行安装程序即可

<!-- endtab -->

<!-- tab linux -->

如果你想在 Linux 上用二进制安装程序来安装 Git，可以使用发行版包含的基础软件包管理工具来安装。 如果以 Fedora 上为例，你可以使用 yum：

```bash
$ sudo yum install git
```

如果你在基于 Debian 的发行版上，请尝试用 apt-get：

```bash
$ sudo apt-get install git
```

要了解更多选择，Git 官方网站上有在各种 Unix 风格的系统上安装步骤，网址为 http://git-scm.com/download/linux。

<!-- endtab -->

<!-- tab mac -->

安装 Xcode Command Line Tools。 Mavericks （10.9） 或更高版本的系统中，在 Terminal 里尝试首次运行 'git' 命令即可。 如果没有安装过命令行开发者工具，将会提示你安装。

如果你想安装更新的版本，可以使用二进制安装程序。 官方维护的 OSX Git 安装程序可以在 Git 官方网站下载，网址为 http://git-scm.com/download/mac。

<!-- endtab -->

{% endtabs %}

## git配置
Git 可以通过`git config`命令查看或者定制git的环境信息，环境配置一共有三种作用域
- system: `git config --system`，配置文件存放在/etc/gitconfig，对于系统所有用户起作用，不常用
- global: `git config --global`，配置文件存放在~/.gitconfig 或 ~/.config/git/config，只对当前用户起作用，常用
- local : `git condif --local `，配置文件存放在当前使用仓库的 Git 目录中的 config 文件（就是 .git/config），只针对当前仓库，常用

查看配置信息：
```bash
git config --list或-l           #列出所有配置项，可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如：/etc/gitconfig 与 ~/.gitconfig）。 这种情况下，Git 会使用它找到的每一个变量的最后一个配置。
git config --global --list      #只查看全局的配置
git config <key>                #查看制定配置项的值
```
配置自定义环境：
```bash
git config --global user.name xxxx              #配置用户名
git config --global user.email xxx@xxx.com      #配置邮箱地址
当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中
当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 git config --local user.name xxxx  选项的命令来配置

git config --global core.editor emacs           #配置默认的编辑器
当 Git 需要你输入信息时会调用它。 如果未配置，Git 会使用操作系统默认的文本编辑器，通常是 Vim。

git config --global alias.co checkout			#给命令配置别名
```
## 获取代码仓库

有两种取得 Git 项目仓库的方法。 第一种是将现有项目导入到 Git 控制中，或者新建一个Git控制的项目； 第二种是从一个服务器克隆一个现有的 Git 仓库。

### 在现有目录中初始化仓库
`git init`命令创建一个新的 Git 仓库。它用来将已存在但还没有版本控制的项目转换成一个 Git 仓库，或者创建一个空的新仓库。大多数Git命令在未初始化的仓库中都是无法使用的，所以这就是你运行新项目的第一个命令了。运行 `git init` 命令会在你项目的根目录下创建一个新的 .git 目录，其中包含了你项目必需的所有元数据。
```bash
git init                    # 将当前的目录转换成一个 Git 仓库
git init <directory>        # 在指定目录创建一个空的 Git 仓库。
git init --bare <directory> # 初始化一个裸的 Git 仓库，没有工作目录
```
{% note ,  使用--bare标记生成一个没有工作目录的裸仓库，用于作为中央仓库，因为向非裸仓库推送分支有可能会覆盖已有的代码变动。应该将裸仓库看做一个存储设施而非开发环境，在客户端的非裸仓库进行开发后推送到中央的裸仓库 %}

### 克隆已有的仓库
`git clone`命令拷贝整个 Git 仓库,默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。通常可以使用任何一个克隆下来的用户端来重建服务器上的仓库（虽然可能会丢失某些服务器端的挂钩设置，但是所有版本的数据仍在）
```bash
git clone /home/xxx/git_learing                         # 从本地/home/xxx/git_learing仓库克隆一份仓库，使用哑协议——不建议
git clone file:///home/xxx/git_learing                  # 从本地/home/xxx/git_learing仓库克隆一份仓库，使用智能协议——建议
git clone https://github.com/libgit2/libgit2            # 从github上克隆一份仓库，会在当前目录下创建一个名为libgit2的仓库
git clone https://github.com/libgit2/libgit2 mylibgit   # 将执行与上一个命令相同的操作，不过在本地创建的仓库名字变为mylibgit
```
Git 支持多种数据传输协议。上面的例子使用的是 https:// 协议，不过你也可以使用 git:// 协议或者使用 SSH 传输协议，比如 user@server:path/to/repo.git 。

## 记录每次更新到仓库
工作目录下的每一个文件都不外乎这两种状态：已跟踪或未跟踪。 {% span red, 已跟踪的文件 %}是指那些被纳入了版本控制的文件，在{% span red,上一次快照中有它们的记录 %}，在工作一段时间后，它们的状态可能处于未修改，已修改或已放入暂存区。 工作目录中除已跟踪文件以外的所有其它文件都属于未跟踪文件，它们既不存在于上次快照的记录中，也没有放入暂存区。 初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。
编辑过某些文件之后，由于自上次提交后你对它们做了修改，Git 将它们标记为已修改文件。 我们逐步将这些修改过的文件放入暂存区，然后提交所有暂存了的修改，如此反复。所以使用 Git 时文件的生命周期如下：
{% image /image/Devops/git/lifeCycle.png, alt=git项目中文件的生命周期 %}
### 检查当前文件状态
要查看哪些文件处于什么状态，可以用`git status`命令。如果在克隆/新建仓库后立即使用此命令，会看到类似这样的输出：
```bash
$ git status
On branch master
nothing to commit, working directory clean
```
这说明现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。 此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪状态的新文件，否则 Git 会在这里列出来。 最后，该命令还显示了当前所在分支，并告诉你这个分支同远程服务器上对应的分支没有偏离。 现在分支名是master,这是默认的分支名。
### 跟踪新文件
{% folding green , 查看新建的未被跟踪的文件状态 %}
如果在项目中新建一个未被跟踪的文件，运行`git status`命令会看到如下内容：
```bash
$ echo 'hello world' > README
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README

nothing added to commit but untracked files present (use "git add" to track)

```
{% endfolding %}
使用命令 `git add` 开始跟踪一个文件。 所以，要跟踪 README 文件，运行：
```bash
$ git add README
```
`git add`命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件，例如`git add .`会暂存当前目录下全部文件，`git add -a`会暂存当前项目全部修改的文件。
{% folding green , 查看执行 git add 命令后的文件状态 %}
此时再运行 git status 命令，会看到 README 文件已被跟踪，并处于暂存状态：

```bash
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README

```
只要在 Changes to be committed 这行下面的，就说明是已暂存状态。如果此时使用`git commit`命令提交，那么该文件此时此刻的版本将被留存在历史记录中。
{% endfolding %}

### 提交更新
使用`git commit`命令将{% span red ,暂存区 %}的内容做一次提交，保存为一份快照。在此之前，请一定要确认还有什么修改过的或新建的文件还没有`git add`过，否则提交的时候不会记录这些还没暂存起来的变化。
```bash
$ git commit -m 'add README'                # -m 参数指定本次提交的说明信息
[master (root-commit) 48a8482] add README   # 显示提交到的分支（master），本次提交索引的校验和（48a8482）
 1 file changed, 1 insertion(+)             # 显示一个文件被修改，添加了一行内容
 create mode 100644 README
```
{% note , git commit本身只会提交暂存区的内容，没有使用git add命令暂存的修改不会被提交，可以使用git commit -am '提交的说明信息'命令跳过暂存区直接将工作区的已经被纳入跟踪的文件进行提交，相当于执行了 git add -a 和 git commit -m 两条命令 %}

### 暂存已修改文件

如果修改了一个已经保存被提交（`git commit`）的文件，运行`git status`命令会看到如下内容：
```bash
$ echo 'change content' >> README
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README

no changes added to commit (use "git add" and/or "git commit -a")
```
文件`README`出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。 要暂存这次更新，需要运行 `git add`命令。 这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。 将这个命令理解为“添加内容到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。运行`git add`将README放到暂存区，然后再看看`git status`的输出：

```bash
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   README
```

### 比较文件详细差异

- 查看工作区文件和暂存区文件差异

  ```bash
  $ git diff README
  diff --git a/README b/README
  index 325b5ab..557db03 100644
  --- a/README
  +++ b/README
  @@ -1,2 +1 @@
   Hello World
  -change content
  ```

- 查看暂存区和上一次提交的文件差异

  ```bash
  $ git add .
  $ git diff --staged                  # 或者使用git diff --cached
  diff --git a/README b/README
  index 557db03..0835e4f 100644
  --- a/README
  +++ b/README
  @@ -1 +1 @@
  -Hello World
  +change
  
  ```

### 移除文件
在工作目录删除文件后，需要将删除修改暂存到暂存区然后再进行提交才能从已跟踪清单中移除。
{% folding green , 从工作目录删除文件后查看文件状态 %}
```bash
git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    README

no changes added to commit (use "git add" and/or "git commit -a")
```
此时显示删除修改没有被暂存，下次提交的快照记录中不会删除文件，此时可以使用git add 或者git rm将删除修改保存到暂存区。
{% endfolding %}
使用`git rm <file>`命令可以将文件从工作区删除并将删除修改保存到暂存区
```bash
$ git rm README 
rm 'README'
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    README
```
{% note , 如果删除的文件被修改并保存到了暂存区，需要使用-f选项强制删除 %}
{% note , 如果只想删除暂存区的文件保留工作目录下的文件，需要使用--cached选项 %}
### 移动文件
和移除文件类似，在工作目录移动文件后需要将修改暂存才能在下次提交中被提交，可以使用`git mv <file>`命令移动工作区文件并暂存移动修改，等价于如下命令集合: 
```bash
$ mv README.md README
$ git rm README.md
$ git add README
```
{% image /image/Devops/git/addCommit.png, alt=提交一次更新 %}
## 回滚修改
### 撤销未提交的变更
- 将工作区的文件回退到和暂存区一致：
  - `git checkout [--] <file>`：旧版本
  - `git restore [--worktree] <file>`
- 使用上一次提交的快照替换暂存区的内容：
  - `git reset [HEAD] [<file>]`:旧版本，如果不指定文件则替换全部暂存
  - `git restore --staged <file>`
- 取消暂存的文件同时更改工作目录中的文件（将指定文件从暂存区中移除并将工作目录中的文件回退到上一次提交的版本）：
  - `git reset --hard [HEAD]`:旧版本，只能全部重置不能指定某个文件
  - `git checkout HEAD [<file> <file> ...]`：旧版本
  - `git restore --staged --worktree <file> <file> ...`
  {% note , 三种回滚的方式都可以指定回退到那一个版本的提交，git reset --hard <commit_id>、git checkout <commit_id> [<file> <file>]（如果不指定回退的文件则会全部回退，并且处于[分离头指针]()的状态）、git restore --staged [--worktree] --source=<commit_id> <file> <file> %}
{% image /image/Devops/git/stagedBack.png, alt=撤销未提交的变更 %}
{% note danger, git reset 不仅会将文件回退到之前的版本甚至会清除指定提交版本之后的提交历史记录，永远不要重置那些已经被推送到公共仓库的提交快照 %}

### 撤销提交错误
- `git commit --amend`：修复最新的一次提交，可以将暂存区的修改和上一次提交合并，而不是提交一份新的快照。缓存区没有文件时运行这个命令可以用来编辑上次提交的提交信息，而不会更改快照。
  下面这个🌰展示了 Git 开发工作流中的一个常见情形。我们编辑了一些希望在同一个快照中提交的文件，但我们忘记添加了其中的一个。修复错误只需要缓存那个文件并且用 --amend 标记提交：

  ```bash
  # 编辑 hello.py 和 main.py
  git add hello.py
  git commit
  
  # 意识到你忘记添加 main.py 的更改
  git add main.py
  git commit --amend --no-edit
  ```

  编辑器会弹出上一次提交的信息，加入 --no-edit 标记会修复提交但不修改提交信息。需要的话你可以修改，不然的话就像往常一样保存并关闭文件。完整的提交会替换之前不完整的提交，看上去就像我们在同一个快照中提交了 hello.py 和 main.py。
  {% image /image/Devops/git/amend.gif, alt='git commit --amend'更新上一次提交 %}

- `git rebase <commit_id>`：基于某一次提交的快照，重新整理之后的提交记录。可以通过-i选项进行交互式整理提交历史，如果不使用默认会将提交历史线性化处理一般用在处理分支合并的情况。
    {% image /image/Devops/git/rebase.gif, alt='git rebase --i <commit_id>'整理指定提交后的提交 %}

- `git revert <commit_id>`：基于指定的快照做一次新的提交，同时会更新暂存区和工作区
  {% image /image/Devops/git/revert.png, alt='git revert <commit_id> '使用指定版本的提交快照做一次新的提交 %}

### 查看提交历史

使用`git log`命令可以回顾提交历史，不传入任何参数的默认情况下，会按时间先后顺序列出所有的提交，最近的更新排在最上面。

```bash
$ git log 
commit 8a71ac1b9775a0dd80f31aba914513539cfa4441 (HEAD -> master)
Author: 欧阳罗霄 <2236212702@qq.com>
Date:   Thu May 27 14:41:19 2021 +0800

    Revert "add index.js"
    
    This reverts commit 5a412bfa187031dd9321ad17575dd907390893ab.

commit 5a412bfa187031dd9321ad17575dd907390893ab
Author: 欧阳罗霄 <2236212702@qq.com>
Date:   Thu May 27 14:38:33 2021 +0800

    add index.js

commit 31ae2ddc94e9f944c2befe0a61604e68355d199c
Author: 欧阳罗霄 <2236212702@qq.com>
Date:   Thu May 27 14:35:19 2021 +0800

    add style.css

commit f106a0567207fc166d9cbd2e2e2867a66335e155
Author: 欧阳罗霄 <2236212702@qq.com>
Date:   Thu May 27 14:24:46 2021 +0800

    合并两次提交
```

这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。

常用的选项如下：

| 选项        | 描述                                       |
| ----------- | ------------------------------------------ |
| `--patch`   | 按补丁格式显示每个提交引入的差异。         |
| `--stat`    | 显示每次提交的文件修改统计信息。           |
| `--oneline` | 仅显示commit_id缩略号和提交信息            |
| `-<n>`      | 仅显示最近的 n 条提交。                    |
| `--author`  | 仅显示作者匹配指定字符串的提交。           |
| `-S`        | 仅显示添加或删除内容匹配指定字符串的提交。 |

## 打标签
Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）。Git 使用两种主要类型的标签：轻量标签（lightweight）与附注标签（annotated）。
一个轻量标签很像一个不会改变的分支 - 它只是一个特定提交的引用。
附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；并且可以使用 GNU Privacy Guard （GPG）签名与验证。 通常建议创建附注标签，这样你可以拥有以上所有信息；但是如果你只是想用一个临时的标签，或者因为某些原因不想要保存那些信息，轻量标签也是可用的。
- 新建附注标签：
  ```bash
  git tag -a <tag_name> -m '标签说明信息' [<commit_id>]			#如果没有为附注标签指定一条信息，Git 会运行编辑器要求你输入信息。不指定提交id则默认为HEAD提交打标签
  ```

- 新建轻量标签：

  ```bash
  git tag <tag_name> -m '标签说明信息' [<commit_id>]	
  ```

- 列出现有的标签：

  ```bash
  git tag -l '过滤条件'
  ```

- 显示标签对应的提交详细信息：

  ```bash
  git show <tag>
  ```

## 分支
### git三大对象
在学习分支之前需要深入理解一下git的一些底层概念和实际存储，其中最重要的是commit、tree、blob三个对象，实际数据都存放在项目根目录下的.git目录。
暂存操作'git add'会使用SHA-1哈希算法计算每个文件的校验和，然后会把当前版本的文件快照保存到 Git 仓库中（Git 使用 blob 对象来保存它们，如果文件的内容没有改变则不会保存重复的快照），最终将校验和加入到暂存区域等待提交。
当使用`git commit`进行提交操作时，Git 会先计算每一个子目录的校验和，然后在 Git 仓库中这些校验和保存为树对象。 随后，Git 便会创建一个提交对象包含指向项目根目录对应的树对象的指针、作者的姓名和邮箱、提交时输入的信息以及指向它的父对象的指针。首次提交产生的提交对象没有父对象，普通提交操作产生的提交对象有一个父对象，而由多个分支合并产生的提交对象有多个父对象
{% image /image/Devops/git/gitObjects.png, alt='commit、tree、blob对象之间的关系' %}
做些修改后再次提交，那么这次产生的提交对象会包含一个指向上次提交对象（父对象）的指针。
{% image /image/Devops/git/commits-and-parents.png, alt='提交对象及其父对象' %}

### git核心目录
在项目根目录下的.git目录存有git仓库的全部数据:

```bash
.git/
├── branches
├── COMMIT_EDITMSG
├── config				# git config --local 设置的配置存放文件
├── description
├── HEAD				# 指向当前追踪的提交对象即下一次提交的父对象
├── hooks
├── index
├── info
├── logs				# 存放git的日志
├── objects				# 存放git的三大对象：commit、tree、blob
├── ORIG_HEAD
├── packed-refs
├── REBASE_HEAD
└── refs				# 存放标签、分支
```

### 分支、标签、HEAD头指针

Git 的分支、标签、HEAD头指针都是指向提交对象的指针，区别在于一般HEAD、分支都是可变的，而标签声明后不会指向其他提交对象。在`.git/refs`目录下有`heads`、`tag`目录分别存放当前项目的分支和标签，这些文件的内容是提交对象的校验和即commit_id，而HEAD头指针记录在`.git/HEAD`文件中，通常是指向一个分支指向`.git/refs/heads`下的一个文件例如：`ref: refs/heads/master`，也可以直接指向提交对象（此时称为分离头指针状态）保存提交对象的索引`commit_id`。

{% image /image/Devops/git/branch-and-history.png, alt='分支及其提交历史' %}

### 分支的新建、切换、删除与合并

- 查看分支

  ```bash
  $ git branch 	# 查看存在的分支列表
    iss53		
  * master		# 当前HEAD指针正指向master分支
  ```

  常用选项

  | 选项                        | 描述                                             |
  | --------------------------- | ------------------------------------------------ |
  | `-v`                        | 查看每一个分支的最后一次提交                     |
  | `--merged` 与 `--no-merged` | 过滤这个列表中已经合并或尚未合并到当前分支的分支 |

- 新建分支

  ```bash
  $ git branch <branch_name>			# 基于当前HEAD指向的提交对象新建一个branch_name分支，当前跟踪的分支不变
  ```

  {% image /image/Devops/git/create-branching-1.png, alt='根据HEAD指向的提交对象新建分支' %}

- 切换分支

  本质上是改变HEAD头指针的值，如果切换到分支，每一次提交时HEAD指向的分支指针会指向最新的提交对象。

  ```bash
  $ git checkout <branch_name>或git switch <branch_name>			# 切换到branch_name分支，清空暂存区，将工作目录同步到切换的分支
  $ git checkout -b <branch_name>或git switch -c <branch_name>     # 基于当前HEAD指向的提交对象新建一个branch_name分支，并且换到新分支
  
  # git checkout命令可以切换到提交对象、分支、标签，git switch只能切换到分支
  ```

  使用上面的命令切换到iss53分支，并做出一些修改并提交到iss53分支

  ```bash
  $ vim index.html
  $ git commit -a -m 'added a new footer [issue 53]'
  ```

  {% image /image/Devops/git/switch-branching.png, alt='提交到新分支' %}

- 合并分支

  ```bash
  $ git merge <branch_name>				# 将branch_name分支合并到当前分支
  ```

  - fast-forwrad合并

    如果当前分支与合并分支属于线性关系，即合并分支指向的提交对象是当前分支指向的提交对象的直接后继， Git会直接将当前分支指针向前移动。换句话说，当你试图合并两个分支时， 如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候， 只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。

    {% image /image/Devops/git/merge-ff.gif, alt='当前分支相比于我们要合并的分支没有额外的提交（commit）时，执行 fast-forward 合并' %}

  - No-fast-foward (—no-ff)

    如果当前分支含有合并分支没有的提交对象，则会进行No-fast-foward合并。Git 会使用两个分支的末端所指的快照以及这两个分支的公共祖先，做一个简单的三方合并。

    {% image /image/Devops/git/merge-no-ff.gif, alt='当前分支相比于我们要合并的分支有额外的提交（commit）时，执行 No-fast-forward 合并' %}

  - 发生合并冲突

    如果两个分支修改了同一个文件同一处位置的代码时或者一个分支删除了一个文件而另一个分支修改了这个文件时，Git不能自己决定该使用哪一个分支的内容，因此就出现了合并冲突，当尝试合并这些分支时，Git 会向你展示冲突出现的位置。我们可以手动移除我们不想保留的修改，保存这些修改，再次添加这个已修改的文件，然后提交这些修改。

    {% image /image/Devops/git/merge-conflict.gif, alt='手动解决合并冲突，重新提交' %}

- 删除分支

  ```bash
  $ git branch -d <branch_name>			# 删除分支
  ```

## 贮藏与清理

如果需要暂时存储当前做出的改变切换到另一个分支，但是不想要对只完成了一般的工作做一次提交，可能需要用到贮藏功能。贮藏（stash）会将跟踪文件的修改与暂存的改动保存到一个栈上， 可以在任何时候重新应用这些改动（甚至在不同的分支上）。

```bash
$ git stash [push]					# 将当前的改动入栈
保存工作目录和索引状态 WIP on master: 8a71ac1 Revert "add index.js"
git stash list				# 
```

