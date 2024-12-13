---
date: 2024-12-10 16:24
updated: 2024-12-10 16:25
tags:
  - Web开发
  - Django
share: "true"
---

Django 是一个高级 Python 框架，旨在实现快速、安全且可扩展的 Web 开发。Django 为 URL 路由、页面模板和数据处理提供了丰富的支持。

在本 Django 教程中，您将创建一个简单的 Django 应用，其中包含三个使用通用基本模板的页面。您将在 Visual Studio Code 环境中创建此应用，以了解如何在 VS Code 终端、编辑器和调试器中使用 Django。本教程不会探讨有关 Django 本身的各种细节，例如使用数据模型和创建管理界面。有关这些方面的指导，请参阅本教程末尾的 Django 文档链接。

本 Django 教程的完整代码项目可以在 GitHub 上找到：[python-sample-vscode-django-tutorial](https://github.com/microsoft/python-sample-vscode-django-tutorial)。

[如果您有任何问题，您可以在Python 扩展讨论问答](https://github.com/microsoft/vscode-python/discussions/categories/q-a)中搜索答案或提出问题。

## 先决条件

为了成功完成本 Django 教程，您必须执行以下操作与一般 Python 教程中的步骤相同：

1. 安装Python 扩展。

2. 安装 Python 3 版本（本教程针对该版本编写）。选项包括：

   - （所有操作系统）从[python.org](https://www.python.org/downloads/)下载；通常使用页面上首先出现的**下载 Python 3.9.1**按钮（或最新版本）。
   - （Linux）内置的 Python 3 安装运行良好，但要安装其他 Python 包，则必须`sudo apt install python3-pip`在终端中运行。
   - 
   - （macOS）在 macOS 上通过[Homebrew](https://brew.sh/)安装`brew install python3`（不支持在 macOS 上安装 Python 的系统）。
   - 
   - （所有操作系统）从[Anaconda](https://www.anaconda.com/download/)下载（用于数据科学目的）。

3. 在 Windows 上，确保您的 Python 解释器的位置包含在 PATH 环境变量中。您可以通过`path`在命令提示符下运行来检查位置。如果未包含 Python 解释器的文件夹，请打开 Windows 设置，搜索“环境”，选择**编辑您帐户的环境变量**，然后编辑**Path**变量以包含该文件夹。

## 为 Django 教程创建项目环境

在本部分中，您将创建一个虚拟环境，在其中安装 Django。使用虚拟环境可避免将 Django 安装到全局 Python 环境中，并让您能够精确控制应用程序中使用的库。虚拟环境还可以轻松为环境创建 requirements.txt 文件。

1. 在您的文件系统上，为本教程创建一个项目文件夹，例如`hello_django`。

2. 在该文件夹中，使用以下命令（适合您的计算机）创建一个`.venv`基于当前解释器命名的虚拟环境：

   ```
   # Linux
   sudo apt-get install python3-venv    # If needed
   python3 -m venv .venv
   source .venv/bin/activate

   # macOS
   python3 -m venv .venv
   source .venv/bin/activate

   # Windows   管理员权限且执行set-executionpolicy remotesigned
   py -3 -m venv .venv
   .venv\scripts\activate
   ```

   > **注意**：运行上述命令时，请使用现有的 Python 安装。如果您使用`python.exe`Anaconda 安装，则会看到错误，因为 Ensurepip 模块不可用，并且环境处于未完成状态。

3. `code .`通过运行，或者运行 VS Code 并使用**文件**>**打开文件夹**命令，在 VS Code 中打开项目文件夹。

4. 在 VS Code 中，打开命令面板（**视图**>**命令面板**或（Ctrl+Shift+P））。然后选择**Python：选择解释器**命令：

   ![Django 教程：在 VS Code 中打开命令面板](https://code.visualstudio.com/assets/docs/python/shared/command-palette.png)

5. 该命令显示了 VS Code 可以自动找到的可用解释器列表（您的列表会有所不同；如果您没有看到所需的解释器，请参阅[配置 Python 环境](https://code.visualstudio.com/docs/python/environments)`./.venv`）。从列表中，选择项目文件夹中以或开头的虚拟环境`.\.venv`：

   ![Django 教程：选择 Python 的虚拟环境](https://code.visualstudio.com/assets/docs/python/shared/select-virtual-environment.png)

6. 运行[**终端：从命令面板创建新终端**](https://code.visualstudio.com/docs/terminal/basics)（Ctrl+Shift+`），它将创建一个终端并通过运行其激活脚本自动激活虚拟环境。

   > **注意**：在 Windows 上，如果您的默认终端类型是 PowerShell，您可能会看到一个错误，提示无法运行 activate.ps1，因为系统上禁用了运行脚本。该错误提供了一个链接，提供有关如何允许脚本的信息。否则，请使用**终端：选择默认配置文件**将“命令提示符”或“Git Bash”设置为默认设置。

7. 所选环境会出现在 VS Code 状态栏的右侧，并且会出现**('.venv': venv)**指示符，表明您正在使用虚拟环境：

   ![Django 教程：VS Code 状态栏中显示选定的环境](https://code.visualstudio.com/assets/docs/python/shared/environment-in-status-bar.png)

8. 通过在 VS Code 终端中运行以下命令来更新虚拟环境中的 pip：

   ```
   python -m pip install --upgrade pip
   ```

9. 通过在 VS Code 终端中运行以下命令在虚拟环境中安装 Django：

   ```
   python -m pip install django
   ```

现在，您已拥有一个可用于编写 Django 代码的独立环境。当您使用[**终端：创建新终端**](https://code.visualstudio.com/docs/terminal/basics) ( Ctrl+Shift+` ) 时，VS Code 会自动激活该环境。如果您打开单独的命令提示符或终端，请通过运行`source .venv/bin/activate`(Linux/macOS) 或(Windows) 来激活该环境。当命令提示符在开头显示**(.venv)**`.venv\Scripts\Activate.ps1`时，您就知道环境已激活。


下面你可以开始创建一个Django项目[[./Django 项目创建|Django 项目创建]]


