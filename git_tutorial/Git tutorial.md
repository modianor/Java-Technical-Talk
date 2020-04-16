## Git tutorial

#### Why Git?

1. ##### [Git官网](https://git-scm.com/)

   > Git 是一个分布式版本控制系统. 它的灵活性, 优越性使得它从2005年发布以来. 获得了越来越多的使用和支持

2. ##### 什么时候需要Git？

   - 当你已经成为码农, 或者已经在成为码农的路上;
   - 当你觉得代码太多;
   - 当你已经开始用日期或版本号命名的代码文件的时候.

3. ##### 什么样的文件可以被Git管理？

   - 文本文件 (.txt) 等;
   - 脚本文件 (.py) 等;
   - 各种基于文本信息的文件.

#### Git 安装

1. ##### Windows系统为例

   - 打开[Git官网](https://git-scm.com/)

     <img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200416212553550.png" alt="image-20200416212553550" style="zoom: 33%;" />

   - 下载对应操作系统的Git安装包

     <img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200416212630421.png" alt="image-20200416212630421" style="zoom: 33%;" />

   - 点击安装，傻瓜无脑



#### 第一个版本库 **Repository**

1. ##### 创建版本库 (init) 

   - 我们先要确定要把哪个文件夹里的文件进行管理. 比如说我桌面上的一个叫 `git_project` 的文件夹. 然后在 Terminal (Windows 的 git bash) 中把当前目录调到这个文件夹 `git_project`, 我的做法是这样:

     ```bash
     cd C:\Users\Administrator\Desktop\git_project
     ```

   - 为了更好地使用 git, 我们同时也记录每一个施加修改的人. 这样人和修改能够对应上. 所以我们在 git 中添加用户名 `user.name` 和 用户 email `user.email`:

     ```bash
     git config --global user.name "modianor"
     git config --global user.email "1138716463@qq.com"
     ```

   - 然后我们就能在这个文件夹中建立 git 的管理文件了:

     ```bash
     git init
     ```

   

2. ##### 添加文件管理 (add)

   - 建立一个新的 `1.py` 文件:

     ```bash
     touch 1.py
     ```

   - 现在我们能用 `status` 来查看版本库的状态:

     ```bash
     git status
     ```

   - 现在 `1.py` 并没有被放入版本库中 (unstaged), 所以我们要使用 `add` 把它添加进版本库 (staged):

     ```bash
     git add 1.py
     ```

   - 如果想一次性添加文件夹中所有未被添加的文件, 可以使用这个:

     ```bash
     git add .
     ```



3. ##### 提交改变 (commit)

   - 我们已经添加好了 `1.py` 文件, 最后一步就是提交这次的改变, 并在 `-m` 自定义这次改变的信息:

     ```bash
     git commit -m "commit info"
     ```

     

4. ##### 流程图

   <img src="Git tutorial.assets/2-1-1.png" alt="img" style="zoom:80%;" />

   


#### 记录修改 (log & diff)

1. ##### 修改记录 log 

   - 之前我们以`modianor` 的名义对版本库进行了一次修改, 添加了一个 `1.py` 的文件. 接下来我们就来查看版本库的些施工的过程. 可以看到在 `Author` 那已经有我的名字和 email 信息了.

     ```bash
     git log
     ```

     

2. ##### 查看 unstaged

   - 如果想要查看这次还没 `add` (unstaged) 的修改部分 和上个已经 `commit` 的文件有何不同, 我们将使用 `$ git diff`:

     ```bash
     git diff
     ```

     

3. ##### 查看 staged (--cached) 

   - 如果你已经 `add` 了这次修改, 文件变成了 “可提交状态” (staged), 我们可以在 `diff` 中添加参数 `--cached` 来查看修改:

     ```bash
     git diff --cached
     ```

     

4. ##### 查看 staged & unstaged (HEAD) 

   - 还有种方法让我们可以查看 `add` 过 (staged) 和 没 `add` (unstaged) 的修改, 比如我们再修改一下 `1.py` 但不 `add`:

     ```bash
     git diff HEAD
     ```



#### 回到从前 (reset)

1. ##### 修改已 commit 的版本

   - 有时候我们总会忘了什么, 比如已经提交了 `commit` 却发现在这个 `commit` 中忘了附上另一个文件. 接下来我们模拟这种情况. 上节内容中, 我们最后一个 `commit` 是 `change 2`, 我们将要添加另外一个文件, 将这个修改也 `commit` 进 `change 2`. 所以我们复制 `1.py` 这个文件, 改名为 `2.py`. 并把 `2.py` 变成 `staged`, 然后使用 `--amend` 将这次改变合并到之前的 `change 2` 中.

     ```bash
     git add 2.py
     git commit --amend --no-edit
     git log --oneline
     ```

     

2. ##### reset 回到 add 之前

    `绿色状态` new file 当前新的文件被添加,`红色状态警告`有文件没有被添加到git仓库管理.

   ```
   git reset 1.py
   ```

   

3. ##### reset 回到 commit 之前

   - 在穿梭到过去的 `commit` 之前, 我们必须了解 git 是如何一步一步累加更改的. 

     每个 `commit` 都有自己的 `id` 数字号, `HEAD` 是一个指针, 指引当前的状态是在哪个 `commit`. 最近的一次 `commit` 在最右边, 我们如果要回到过去, 就是让 `HEAD` 回到过去并 `reset` 此时的 `HEAD` 到过去的位置.

     ![img](Git tutorial.assets/2-2-1.png)

     ```bash
     # 不管我们之前有没有做了一些 add 工作, 这一步让我们回到 上一次的 commit
     $ git reset --hard HEAD  
     
     # 看看所有的log
     $ git log --oneline
     
     # 回到 c6762a1 change 1
     # 方式1: "HEAD^"
     $ git reset --hard HEAD^  
     
     # 方式2: "commit id"
     $ git reset --hard c6762a1
     ```

   - 怎么 `change 2` 消失了!!! 还有办法挽救消失的 `change 2` 吗? 我们可以查看 `$ git reflog` 里面最近做的所有 `HEAD` 的改动, 并选择想要挽救的 `commit id`:

     ```bash
     $ git reflog
     $ git reset --hard 904e1ba
     $ git log --oneline
     ```



#### 回到从前 (checkout 针对单个文件)

1. ##### 改写文件 checkout 

   - 其实 `checkout` 最主要的用途并不是让单个文件回到过去, 我们之后会继续讲 `checkout` 在分支 `branch` 中的应用, 这一节主要讲 `checkout` 让文件回到过去.

     我们现在的版本库中有两个文件:

     ```bash
     - git_tutorial
         - 1.py
         - 2.py
     ```

   - 我们仅仅要对 `1.py` 进行回到过去操作, 回到 `c6762a1 change 1` 这一个 `commit`. 使用 `checkout` + id `c6762a1` + `--` + 文件目录 `1.py`, 我们就能将 `1.py` 的指针 `HEAD` 放在这个时刻 `c6762a1`:

   - ```bash
     $ git log --oneline
     # 输出
     904e1ba change 2
     c6762a1 change 1
     13be9a7 create 1.py
     ---------------------
     $ git checkout c6762a1 -- 1.py
     $ git add 1.py
     $ git commit -m "back to change 1 and add comment for 1.py"
     $ git log --oneline
     ```



#### 分支 (branch)

1. ##### 分支 图例

   - 我们之前的文件当中, 仅仅只有一条 `master` 分支, 我们可以通过 `--graph` 来观看分支:

     ```bash
     $ git log --oneline --graph
     # 输出
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     ```

   - 接着我们建立另一个分支 `dev`, 并查看所有分支:

     ```bash
     $ git branch dev    # 建立 dev 分支
     $ git branch        # 查看当前分支
     
     # 输出
       dev       
     * master    # * 代表了当前的 HEAD 所在的分支
     ```

   - 当我们想把 `HEAD` 切换去 `dev` 分支的时候, 我们可以用到上次说的 `checkout`:

     ```bash
     $ git checkout dev
     
     # 输出
     Switched to branch 'dev'
     --------------------------
     $ git branch
     
     # 输出
     * dev       # 这时 HEAD 已经被切换至 dev 分支
       master
     ```

     

2. ##### 使用 checkout 创建 dev 分支

   - 使用 `checkout -b` + 分支名, 就能直接创建和切换到新建的分支:

     ```bash
     $ git checkout -b  dev
     
     # 输出
     Switched to a new branch 'dev'
     --------------------------
     $ git branch
     
     # 输出
     * dev       # 这时 HEAD 已经被切换至 dev 分支
       master
     ```

   - 

3. ##### 在 dev 分支中修改 

   - `dev` 分支中的 `1.py` 和 `2.py` 和 `master` 中的文件是一模一样的. 因为当前的指针 `HEAD` 在 `dev` 分支上, 所以现在对文件夹中的文件进行修改将不会影响到 `master` 分支.

     我们在 `1.py` 上加入这一行 `# I was changed in dev branch`, 然后再 `commit`:

     ```bash
     $ git commit -am "change 3 in dev"  # "-am": add 所有改变 并直接 commit
     ```

   - 好了, 我们的开发板 `dev` 已经更新好了, 我们要将 `dev` 中的修改推送到 `master` 中, 大家就能使用到正式版中的新功能了.

     首先我们要切换到 `master`, 再将 `dev` 推送过来.

     ```bash
     $ git checkout master   # 切换至 master 才能把其他分支合并过来
     
     $ git merge dev         # 将 dev merge 到 master 中
     $ git log --oneline --graph
     
     # 输出
     * f9584f8 change 3 in dev
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     ```

   - 要注意的是, 如果直接 `git merge dev`, git 会采用默认的 `Fast forward` 格式进行 `merge`, 这样 `merge` 的这次操作不会有 `commit` 信息. `log` 中也不会有分支的图案. 我们可以采取 `--no-ff` 这种方式保留 `merge` 的 `commit` 信息.

     ```bash
     $ git merge --no-ff -m "keep merge info" dev         # 保留 merge 信息
     $ git log --oneline --graph
     
     # 输出
     *   c60668f keep merge info
     |\  
     | * f9584f8 change 3 in dev         # 这里就能看出, 我们建立过一个分支
     |/  
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     ```

4. ##### 将 dev 的修改推送到 master 



#### merge 分支冲突

1. ##### merge 分支冲突 

   - 今天的情况是这样, 想象不仅有人在做开发版 `dev` 的更新, 还有人在修改 `master` 中的一些 bug. 当我们再 `merge dev` 的时候, 冲突就来了. 因为 git 不知道应该怎么处理 `merge` 时, 在 `master` 和 `dev` 的不同修改.

     当创建了一个分支后, 我们同时对两个分支都进行了修改.

     比如在:

     - `master` 中的 `1.py` 加上 `# edited in master`.
     - `dev` 中的 `1.py` 加上 `# edited in dev`.

     在下面可以看出在 `master` 和 `dev` 中不同的 `commit`:

     ```bash
     # 这是 master 的 log
     * 3d7796e change 4 in master # 这一条 commit 和 dev 的不一样
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     -----------------------------
     # 这是 dev 的 log
     * f7d2e3a change 3 in dev   # 这一条 commit 和 master 的不一样
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     ```


   - 当我们想要 `merge` `dev` 到 `master` 的时候:

     ```bash
     $ git branch
       dev
     * master
     -------------------------
     $ git merge dev
     
     # 输出
     Auto-merging 1.py
     CONFLICT (content): Merge conflict in 1.py
     Automatic merge failed; fix conflicts and then commit the result.
     ```

   - git 发现的我们的 `1.py` 在 `master` 和 `dev` 上的版本是不同的, 所以提示 `merge` 有冲突. 具体的冲突, git 已经帮我们标记出来, 我们打开 `1.py` 就能看到:

     ```bash
     a = 1
     # I went back to change 1
     <<<<<<< HEAD
     # edited in master
     =======
     # edited in dev
     >>>>>>> dev
     ```

   - 所以我们只要在 `1.py` 中手动合并一下两者的不同就 OK 啦. 我们将当前 `HEAD` (也就是`master`) 中的描述 和 `dev` 中的描述合并一下.

     ```bash
     a = 1
     # I went back to change 1
     
     # edited in master and dev
     ```

   - 然后再 `commit` 现在的文件, 冲突就解决啦.

     ```bash
     $ git commit -am "solve conflict"
     ```

   - 再来看看 `master` 的 `log`:

     ```bash
     $ git log --oneline --graph
     
     # 输出
     *   7810065 solve conflict
     |\  
     | * f7d2e3a change 3 in dev
     * | 3d7796e change 4 in master
     |/  
     * 47f167e back to change 1 and add comment for 1.py
     * 904e1ba change 2
     * c6762a1 change 1
     * 13be9a7 create 1.py
     ```

   - 回到这张图, 他也诠释了两个分支都有更改的时候的样子, 在这种情况下 `merge`, 我们就要使用上述的流程.

     ![img](Git tutorial.assets/4-2-1.png)

#### rebase 分支冲突

1. ##### 什么是 rebase

2. ##### 使用 rebase



#### 临时修改 (stash)

1. ##### 暂存修改 

2. ##### 做其它任务

3. ##### 恢复暂存



