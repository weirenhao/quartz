---
date: 2024-12-10 16:35
share: "true"
tags:
  - Web开发
  - Django
updated: 2024-12-10 16:37
---

### [创建 Django 项目](https://code.visualstudio.com/docs/python/tutorial-django#_create-the-django-project)

1. 在激活虚拟环境的 VS Code 终端中，运行以下命令：

   ```
   django-admin startproject web_project .
   ```

   此命令假定（通过在末尾`startproject`使用）当前文件夹是您的项目文件夹，并在其中创建以下内容：`.`

   - `manage.py`：项目的 Django 命令行管理实用程序。您可以使用 运行项目的管理命令`python manage.py <command> [options]`。

   - 名为 的子文件夹`web_project`，其中包含以下文件：

     - `__init__.py`：一个空文件，告诉 Python 该文件夹是一个 Python 包。
     - `asgi.py`[：与 ASGI 兼容的](https://asgi.readthedocs.io/en/latest/)Web 服务器为您的项目提供服务的入口点。您通常保留此文件原样，因为它为生产 Web 服务器提供了挂钩。
     - `settings.py`：包含 Django 项目的设置，您可以在开发 Web 应用程序的过程中对其进行修改。
     - `urls.py`：包含 Django 项目的目录，您也可以在开发过程中对其进行修改。
     - `wsgi.py`：WSGI 兼容 Web 服务器的入口点，用于为您的项目提供服务。您通常可以保留此文件原样，因为它为生产 Web 服务器提供了挂钩。

2. 通过运行以下命令创建一个空的开发数据库：

   ```
   python manage.py migrate
   ```

   首次运行服务器时，它会在文件中创建一个默认的 SQLite 数据库`db.sqlite3`，该数据库用于开发目的，但可用于生产低容量 Web 应用。有关数据库的其他信息，请参阅[数据库类型](https://code.visualstudio.com/docs/python/tutorial-django#_types-of-databases)部分。

3. 要验证 Django 项目，请确保您的虚拟环境已激活，然后使用命令启动 Django 的开发服务器`python manage.py runserver`。服务器在默认端口 8000 上运行，您会在终端窗口中看到类似以下输出的输出：

   ```
   Watching for file changes with StatReloader
   Performing system checks...

   System check identified no issues (0 silenced).
   June 13, 2023 - 18:38:07
   Django version 4.2.2, using settings 'web_project.settings'
   Starting development server at http://127.0.0.1:8000/
   Quit the server with CTRL-BREAK.
   ```

   Django 的内置 Web 服务器_仅_用于本地开发目的。但是，当您部署到 Web 主机时，Django 会改用主机的 Web 服务器。Django项目中的`wsgi.py`和`asgi.py`模块负责挂接到生产服务器。

   如果要使用默认 8000 以外的其他端口，请在命令行中指定端口号，例如`python manage.py runserver 5000`。

4. 按住 Ctrl 键并单击终端输出窗口中的URL `http://127.0.0.1:8000/`，以打开默认浏览器并转到该地址。如果 Django 安装正确且项目有效，您将看到如下所示的默认页面。VS Code 终端输出窗口还会显示服务器日志。

   ![Django 教程：空 Django 项目的默认视图](https://code.visualstudio.com/assets/docs/python/django-tutorial/django-empty-project-success.png)

5. 完成后，关闭浏览器窗口并使用Ctrl+C在 VS Code 中停止服务器，如终端输出窗口所示。

### [创建 Django 应用](https://code.visualstudio.com/docs/python/tutorial-django#_create-a-django-app)

1. 在激活虚拟环境的 VS Code 终端中，`startapp`在项目文件夹（所在`manage.py`位置）中运行管理实用程序的命令：

   ```
   python manage.py startapp hello
   ```

   该命令创建一个名为 的文件夹`hello`，其中包含许多代码文件和一个子文件夹。其中，您经常使用的`views.py`（包含定义 Web 应用程序中页面的函数）和`models.py`（包含定义数据对象的类）。Django`migrations`的管理实用程序使用该文件夹来管理数据库版本，如本教程后面所述。此外还有文件`apps.py`（应用程序配置）、`admin.py`（用于创建[管理界面](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/)）和`tests.py`（用于[创建测试](https://docs.djangoproject.com/en/3.1/topics/testing/)），本文未涉及这些文件。

2. 修改`hello/views.py`以匹配以下代码，该代码为应用程序的主页创建单一视图：

   ```
   from django.http import HttpResponse

   def home(request):
       return HttpResponse("Hello, Django!")
   ```

3. 创建一个文件，`hello/urls.py`内容如下。该`urls.py`文件用于指定将不同 URL 路由到相应视图的模式。以下代码包含一个路由，用于将应用程序的根 URL ( `""`) 映射到`views.home`您刚刚添加到的函数`hello/views.py`：

   ```
   from django.urls import path
   from hello import views

   urlpatterns = [
       path("", views.home, name="home"),
   ]
   ```

4. 该`web_project`文件夹还包含一个`urls.py`文件，该文件实际上是处理 URL 路由的地方。打开`web_project/urls.py`并修改它以匹配以下代码（如果您愿意，可以保留有用的注释）。此代码提取应用程序的`hello/urls.py`using `django.urls.include`，从而使应用程序的路由包含在应用程序内。当项目包含多个应用程序时，这种分离很有用。

   ```
   from django.contrib import admin
   from django.urls import include, path

   urlpatterns = [
       path("", include("hello.urls")),
       path('admin/', admin.site.urls)
   ]
   ```

5. 保存所有修改过的文件。

6. 在 VS Code 终端中，再次激活虚拟环境，运行开发服务器`python manage.py runserver`并打开浏览器 `http://127.0.0.1:8000/`查看呈现“Hello, Django”的页面。

   ![Django 教程：在浏览器中运行的基本 Django 应用程序](https://code.visualstudio.com/assets/docs/python/django-tutorial/app-in-browser-01.png)
