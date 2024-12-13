---
date: 2024-12-13 15:41
share: "true"
---

### Django 模板系统概述

Django 的模板系统是一个功能强大且灵活的组件，它允许开发者动态生成 HTML 页面，并通过模板语言（Django Template Language，简称 DTL）进行页面的渲染。模板系统的主要作用是分离页面的逻辑和显示部分，使得应用的结构更加清晰、可维护，并且支持对 HTML 内容的动态生成。

---

### 1. 基本概念

Django 模板的基本构成包括以下几个元素：

- **模板文件**：通常是 `.html` 文件，用于定义页面的结构和布局。
- **模板变量**：通过 `{{ variable }}` 表示，动态地插入后台传递的数据。
- **模板标签**：用 `{% tag %}` 表示，控制模板的逻辑（如循环、条件判断、导入文件等）。
- **过滤器**：通过 `{{ value|filter }}` 表示，用来对变量进行处理（如格式化日期、文本处理等）。

---

### 2. 模板的基本语法

#### 2.1 变量

变量是 Django 模板的核心部分，它允许将视图传递给模板的上下文数据插入到 HTML 中。变量被包裹在双大括号 `{{ }}` 中。

```html
<p>欢迎，{{ username }}！</p>
```

在视图中传递一个名为 `username` 的变量，当渲染时，它的值将替代 `{{ username }}`。

#### 2.2 模板标签

模板标签用于添加逻辑操作，如控制流、循环等。它们用 `{% %}` 包裹。

- **条件语句**：

```html
{% if user.is_authenticated %}
    <p>欢迎, {{ user.username }}!</p>
{% else %}
    <p>请登录</p>
{% endif %}
```

- **循环语句**：

```html
<ul>
    {% for item in item_list %}
        <li>{{ item }}</li>
    {% endfor %}
</ul>
```

#### 2.3 过滤器

过滤器是用于修改变量显示方式的工具。过滤器放在变量名后面，用 `|` 连接。

- **文本处理**：

```html
<p>{{ username|lower }}</p>  <!-- 转换为小写 -->
<p>{{ description|truncatewords:20 }}</p>  <!-- 截断为20个单词 -->
```

- **日期格式化**：

```html
<p>{{ publication_date|date:"Y-m-d" }}</p>
```

#### 2.4 模板继承

模板继承是 Django 模板系统最强大的功能之一，它允许在多个模板之间复用布局和结构。通过 `{% extends %}` 和 `{% block %}` 标签，可以使模板代码更加模块化和清晰。

- **`base.html`**：定义基础布局文件，包括头部、导航栏、底部等通用部分。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}默认标题{% endblock %}</title>
</head>
<body>
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about/">关于</a></li>
            </ul>
        </nav>
    </header>

    <main>
        {% block content %}  <!-- 具体页面内容在这里渲染 -->
        {% endblock %}
    </main>

    <footer>
        <p>&copy; 2024 网站版权</p>
    </footer>
</body>
</html>
```

- **`home.html`**：继承 `base.html`，并填充具体内容。

```html
{% extends 'base.html' %}

{% block title %}首页{% endblock %}

{% block content %}
    <h2>欢迎来到我们的首页！</h2>
    <p>这里是一些主页内容。</p>
{% endblock %}
```

#### 2.5 静态文件的使用

Django 模板支持静态文件（如 CSS、JavaScript、图片等）的引用。在模板中，使用 `{% static %}` 标签引用静态资源。

```html
{% load static %}  <!-- 加载静态文件标签 -->

<link rel="stylesheet" href="{% static 'css/styles.css' %}">
<img src="{% static 'images/logo.png' %}" alt="网站Logo">
```

#### 2.6 模板过滤器与自定义过滤器

Django 提供了很多内置的过滤器（如 `date`、`length`、`lower` 等），但你也可以创建自定义过滤器来扩展模板功能。

**自定义过滤器**：

1. 创建一个文件 `templatetags/custom_filters.py`：

```python
from django import template

register = template.Library()

@register.filter
def reverse(value):
    """将字符串反转"""
    return value[::-1]
```

2. 在模板中加载并使用这个过滤器：

```html
{% load custom_filters %}

<p>{{ 'hello'|reverse }}</p>  <!-- 输出 olleh -->
```

---

### 3. 模板的高级功能

#### 3.1 包含模板

`{% include %}` 标签用于将其他模板文件嵌入当前模板中，从而复用内容。

```html
{% include 'partials/header.html' %}
```

#### 3.2 自定义标签

你可以创建自定义模板标签，这对于一些复杂的逻辑非常有用。

1. 创建一个自定义标签文件：

```python
from django import template

register = template.Library()

@register.simple_tag
def current_year():
    """返回当前年份"""
    from datetime import datetime
    return datetime.now().year
```

2. 在模板中使用自定义标签：

```html
{% load custom_tags %}
<p>当前年份是：{% current_year %}</p>
```

#### 3.3 缓存模板

Django 提供了模板缓存机制，允许你缓存特定视图或模板的渲染结果，减少数据库查询或计算的开销。你可以在模板中使用 `{% cache %}` 标签来实现。

```html
{% load cache %}

{% cache 600 some_cache_key %}
    <p>这是一个被缓存的内容</p>
{% endcache %}
```

---

### 4. 模板的安全性

Django 模板系统默认对所有输出的内容进行 **自动转义**，这意味着输出的文本中如果包含 HTML 标签，将被转义为安全的字符串，这可以防止 XSS（跨站脚本攻击）等安全问题。

例如：

```html
<p>{{ user_input }}</p>
```

如果 `user_input` 是 `"<script>alert('Hello')</script>"`，它将被转义为 `&lt;script&gt;alert('Hello')&lt;/script&gt;`，避免了执行 JavaScript 代码。

如果你确定某些内容是安全的，可以使用 `|safe` 过滤器来禁用转义：

```html
<p>{{ user_input|safe }}</p>
```

---

### 5. 总结

Django 模板系统使得前端开发和后端开发的分离变得简单高效。其主要功能包括：

- **模板变量、标签和过滤器** 来动态渲染内容。
- **模板继承**、**静态文件管理**、**模板缓存**等功能，提供灵活性和可维护性。
- 安全性方面，自动进行转义，防止 XSS 攻击。

通过合理使用 Django 模板，开发者可以更加高效地构建和维护 Web 应用，且前后端开发工作可以更好地协作。
