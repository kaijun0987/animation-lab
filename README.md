Introduction to this Repo

这个Repo 是一个 template 本身 是已经setup 好 eslist, tailwindcss, pnpm script, workspace 和一个 子 project 的 template。

每次要开新的子 project 就只需要 按照下面的 “How to create a new sub project” 的 步骤就可以了。

你可以按照“How to start template project” 启动 子 project “template” 试玩。

另外如果你需要安装library 你需要分辨他是安装在 dependencies 还是 devDependencies。如果是安装在dependencies 你需要按照“How to install dependancy in inner project”。如果你要安装devDependencies 的话就参考"How to install devDependencies"。

How to start template project

1. pnpm template

How to run clone sub projects

这个 repo 目前有 7 个 clone sub project：

1. first-clone-bruja
   - status: abandoned
   - folder: projects/first-clone-bruja
   - run: pnpm 1clone
   - build: pnpm --filter @lab/first-clone-bruja build

2. second-clone-gsap-basic-four
   - status: completed
   - folder: projects/second-clone-gsap-basic-four
   - run: pnpm 2clone
   - build: pnpm --filter @lab/second-clone-gsap-basic-four build

3. third-clone-tricks-menu-slider
   - status: completed
   - folder: projects/third-clone-tricks-menu-slider
   - run: pnpm 3clone
   - build: pnpm --filter @lab/third-clone-tricks-menu-slider build

4. fourth-clone-gsap-scrolltrigger
   - status: completed
   - folder: projects/fourth-clone-gsap-scrolltrigger
   - run: pnpm 4clone
   - build: pnpm --filter @lab/fourth-clone-gsap-scrolltrigger build

5. fith-clone-pizza-vs-burger
   - status: completed
   - folder: projects/fith-clone-pizza-vs-burger
   - run: pnpm 5clone
   - build: pnpm --filter @lab/fith-clone-pizza-vs-burger build

6. six-clone-lithosquare
   - status: completed
   - folder: projects/six-clone-lithosquare
   - reference: https://lithosquare-preprod.webflow.io/
   - run: pnpm 6clone
   - build: pnpm --filter @lab/six-clone-lithosquare build

7. seven-clone-goonies
   - status: completed
   - folder: projects/seven-clone-goonies
   - reference: https://the-goonies.webflow.io/
   - run: pnpm 7clone
   - build: pnpm --filter @lab/seven-clone-goonies build

如果你想一次 build 全部 sub project，可以在 root 跑：

1. pnpm build:all

How to create a new sub project

1. 复制 projects/template 文件夹。
2. 改名为 project-02。(请随意起名)
3. 修改 project-02/package.json 里的 "name": "@lab/project-02"。(请按照上面文件夹的名字)
4. 在根目录执行 pnpm install。
5. 在跟目录的 package.json script 复制 "template": "pnpm --filter @lab/template dev"
6. 改成 "p2": "pnpm --filter @lab/project-02 dev", (p2 随意起名，project-02 按照上面)
7. 运行 pnpm p2 即可。

How to install dependancy in inner project

1. 添加 pnpm -F @lab/template add <pkg>
2. 删除 pnpm -F @lab/template add -D <dev-pkg>

How to install devDependencies

1. 如果是全局使用请按照下面的方法
   a. pnpm add -D <pkg>
   b. pnpm remove <pkg>
2. 如果是只在子目录使用请按照下面的方法
   a. pnpm -F @lab/template add -D <pkg>
   b. pnpm -F @lab/template remove <pkg>
