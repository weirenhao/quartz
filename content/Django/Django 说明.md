---
date: 2024-12-11 10:52
share: "true"
---
# Django 框架说明

Django 是一个高级的 Python Web 框架，旨在快速开发和清晰的设计。它鼓励快速开发、简洁的设计和可复用的组件。Django 遵循“不要重复自己”（DRY，Don't Repeat Yourself）原则，提供了丰富的工具和库来帮助开发者高效地构建 Web 应用程序。



## 安装 Django

Django 可以通过 `pip` 轻松安装，确保你已经安装了 Python 和 pip，可以参考[[../Python/Django/Django 安装|Django 安装]]和[[../Python/Django/Django 项目创建|Django 项目创建]]。

```bash
pip install django
```

安装完成后，可以通过以下命令检查是否成功安装：

```bash
django-admin --version
```

### 创建 Django 项目

在终端中运行以下命令来创建一个新的 Django 项目：

```bash
django-admin startproject myproject
```

`myproject` 是你要创建的项目的名称。该命令会创建一个包含以下结构的文件夹：

```text
myproject/
    manage.py
    myproject/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

---

## Django 的核心概念

### MTV 模式

Django 是基于 MTV（Model-Template-View）架构设计的，与 MVC 模式类似，但做了一些修改：

- **Model（模型）**：定义数据结构和数据库交互。
- **Template（模板）**：定义 HTML 页面结构和前端展示。
- **View（视图）**：处理业务逻辑并返回响应（通常是通过模板渲染的 HTML 页面）。

### URL 路由

Django 的 URL 路由系统负责将用户的请求映射到相应的视图。路由的配置在 `urls.py` 中进行。

例如：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]
```

### 视图

视图是处理请求并返回响应的函数或类。在 Django 中，视图函数接受 Web 请求，处理相应的业务逻辑，然后返回一个 Web 响应。

视图函数示例：

```python
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')
```

### 模板

模板负责将动态内容呈现给用户。Django 使用 `Django Template Language`（DTL）来渲染 HTML 页面。模板文件通常位于 `templates` 文件夹中。

模板示例：

```html
<!-- home.html -->
<h1>欢迎来到我的网站</h1>
<p>这是主页。</p>
```

### 模型

模型是 Django 用来与数据库交互的组件。它通常是一个继承自 `django.db.models.Model` 的 Python 类。

模型示例：

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

---

## Django 的主要组件

### Django Admin

Django 提供了一个内置的管理界面（Django Admin），使得网站管理员可以方便地管理数据库中的内容。通过创建一个管理员用户，你可以访问 Django 提供的后台管理界面。

创建管理员用户：

```bash
python manage.py createsuperuser
```

然后启动开发服务器并访问 `/admin` 页面：

```bash
python manage.py runserver
```

### ORM (对象关系映射)

Django 使用 ORM 来将数据库表映射为 Python 对象。你可以通过模型类的实例来访问和操作数据库。

例如，获取所有文章：

```python
articles = Article.objects.all()
```

### Django ORM 数据库迁移

Django 使用迁移来同步数据库模式。每当你对模型做出更改时，必须创建并应用迁移。

创建迁移：

```bash
python manage.py makemigrations
```

应用迁移：

```bash
python manage.py migrate
```

---

## 项目结构

一个典型的 Django 项目结构如下：

```text
myproject/
    manage.py                # 项目管理脚本
    myproject/               # 项目的主目录
        __init__.py
        settings.py          # 项目的配置文件
        urls.py              # 路由配置
        asgi.py
        wsgi.py
    app/                      # 一个 Django 应用
        __init__.py
        admin.py
        apps.py
        models.py
        views.py
        tests.py
        migrations/           # 数据库迁移文件
            __init__.py
    templates/                # 存放 HTML 模板文件
    static/                   # 存放静态文件，如图片、CSS、JavaScript
```

---

## 开发步骤

1. **创建项目**：
    
    ```bash
    django-admin startproject myproject
    ```
    
2. **创建应用**： 在项目目录下，创建一个应用：
    
    ```bash
    python manage.py startapp blog
    ```
    
3. **配置数据库**： 在 `settings.py` 中配置数据库（默认为 SQLite）。
    
4. **定义模型**： 在 `blog/models.py` 中定义数据库模型。
    
5. **创建视图**： 在 `blog/views.py` 中编写视图函数。
    
6. **配置 URL 路由**： 在 `blog/urls.py` 中配置路由。
    
7. **运行开发服务器**： 启动开发服务器并在浏览器中访问：
    
    ```bash
    python manage.py runserver
    ```
    

---

## 常见问题与解决方案

### 1. 迁移报错：“OperationalError: no such table”

解决方案：你需要先运行 `makemigrations` 和 `migrate` 来同步数据库。

```bash
python manage.py makemigrations
python manage.py migrate
```

### 2. 模板不加载静态文件

解决方案：确保你在 `settings.py` 中正确配置了 `STATIC_URL` 和 `STATICFILES_DIRS`。

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
```

### 3. 视图函数返回错误

解决方案：检查视图函数的实现和 URL 配置是否正确，确保视图函数没有抛出异常。

---

## 参考文档

- [Django 官方文档](https://docs.djangoproject.com/)
- [Django 中文文档](https://www.djangoproject.com/start/)

---

