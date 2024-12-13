---
date: 2024-12-12 14:24
share: "true"
tags:
  - Web开发
  - Django
---

# Django Login 实现

Django 提供了强大的认证系统，可以用来轻松地实现用户登录、注册、登出等功能。在这里，我们将通过创建一个简单的登录功能来演示如何在 Django 中实现用户认证。

## 1. 创建 Django 项目和应用

首先，确保你已经安装了 Django，并且创建了一个新的项目和应用。

```bash
django-admin startproject testproject
cd testproject
python manage.py startapp login
```

## 2. 配置 `settings.py`

### 2.1 添加 `login` 应用到 `INSTALLED_APPS`

在 `testproject/settings.py` 中，将 `login` 应用添加到 `INSTALLED_APPS` 列表中：

```python
INSTALLED_APPS = [
    'django.contrib.auth',  # Django 的认证系统
    'login',  # 登录应用
]
```

### 2.2 配置登录重定向（为验证）

在 `settings.py` 中，配置成功登录后的重定向 URL：

```python
LOGIN_REDIRECT_URL = '/'  # 登录成功后重定向到首页
LOGOUT_REDIRECT_URL = '/'  # 登出后重定向到首页
```

### 2.3配置登录模版路径

配置TEMPLATES的 DIRS为 [BASE_DIR / 'templates']

```python

TEMPLATES = [

    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

```

## 3. 创建用户登录视图

### 3.1 在 `login/views.py` 中创建登录视图, 这里使用了[Django 的验证系统](https://docs.djangoproject.com/zh-hans/5.1/topics/auth/default/)。

```zh

# login/views.py

from django.shortcuts import render,redirect
from .forms import CustomAuthenticationForm
from django.contrib.auth import authenticate, login


def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # 登录成功后重定向到主页
    else:
        form = CustomAuthenticationForm()
    return render(request, 'login.html', {'form': form})
```

## 4. 创建登录模板

在 `testproject/templates/` 文件夹中创建 `login.html` 模板文件。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录页面</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .login-container {
            max-width: 400px;
            margin: 100px auto;
        }
        .login-card {
            padding: 30px;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .form-title {
            margin-bottom: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

    </style>
</head>
<body>
<div class="login-container">
    <div class="login-card">
        <div class="form-title">
            登录
        </div>
        <form method="POST">
            {% csrf_token %}
            {{ form.as_p }}
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">登录</button>
            </div>
        </form>
        <div class="text-center mt-3">
            <a href="#">忘记密码?</a> | <a href="#">注册账户</a>
        </div>
    </div>
</div>
<!-- 引入Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
</body>
</html>
```

### 4.1 自定义登录表单

创建一个登录表单并在视图中使用。例如，创建一个 `forms.py` 来定义表单：

```python
from django import forms
from django.contrib.auth.forms import AuthenticationForm
  
class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        max_length=100,
        label="用户名",
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '请输入用户名'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': '请输入密码'}),
        label="密码"
    )

  
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].error_messages = {'required': '用户名不能为空'}
        self.fields['password'].error_messages = {'required': '密码不能为空'}
```

然后在视图中使用这个表单

## 5. URL 配置

###5.1在 login 创建 urls.py

```zh
# login/urls.py

from django.urls import path
from .views import login_view
  
urlpatterns = [
    path('', login_view),
]

```

###5.2在 login 创建 urls.py

将app urls 关联到主项目

```zh
# ocpptest/urls.py
from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login.urls')),

]

```

## 6. 运行服务器

完成上述步骤后，运行开发服务器并访问登录页面：

```bash
python manage.py runserver
```

- 登录：访问 `/login/`
- ![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20241212144729.png)

- 注册（[注册实现](Django%2520login%2520app%2520%E5%AE%9E%E7%8E%B0.md##register%E5%AE%9E%E7%8E%B0)）：访问 `/login/register/`


# Register实现

django.contrib.auth  自带了一套验证体系，包括身份验证和授权以及注册。可以直接使用UserCreationForm 创建用户

## 注册视图
```python

def register_view(request):

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  # 注册新用户
            messages.success(request, 'Your account has been created successfully! You can now log in.')
            return redirect('login')  # 注册成功后重定向到登录页面
        else:
            messages.error(request, form.errors)

    else:
        form = UserCreationForm()  # GET 请求时传递空的表单对象， 这里有bug,后续xiufu
    return render(request, 'register.html', {'form': form})
```


## 配置路由

```logion/urls.py
    path('register/', register_view, name='register'),
```


##  编辑注册页面


实际实现可以裁分，提升模版复用率

```zh
<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>注册页面</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>

        body {

            background-color: #f8f9fa;

            font-family: 'Arial', sans-serif;

        }

  

        /* 主容器 */

        .login-container {

            max-width: 450px;

            margin: 100px auto;

        }

  

        /* 卡片样式 */

        .login-card {

            padding: 30px;

            border-radius: 8px;

            background-color: white;

            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        }

  

        .form-title {

            margin-bottom: 20px;

            text-align: center;

            font-size: 28px;

            font-weight: bold;

            color: #333;

        }

  

        .form-group {

            margin-bottom: 15px;

        }

  

        .form-control {

            border-radius: 5px;

            padding: 10px;

            font-size: 16px;

        }

  

        /* 按钮样式 */

        .btn-primary {

            background-color: #007bff;

            border: none;

            border-radius: 5px;

            padding: 12px 20px;

            font-size: 16px;

            width: 100%;

            transition: background-color 0.3s ease;

        }

  

        .btn-primary:hover {

            background-color: #0056b3;

        }

  

        .text-muted {

            font-size: 14px;

            text-align: center;

            color: #6c757d;

        }

  

        .text-muted a {

            color: #007bff;

        }

  

        .text-muted a:hover {

            text-decoration: underline;

        }

  

        .messages {

            margin-top: 20px;

            background-color: #f8d7da;

            color: #721c24;

            padding: 10px;

            border-radius: 5px;

        }

  

        /* 错误提示框 */

        .form-text {

            font-size: 12px;

            color: #e3342f;

        }

  

        /* 密码强度提示样式 */

        .password-strength {

            font-size: 14px;

            margin-top: 5px;

            color: #28a745;

        }

  

        .password-strength.weak {

            color: #dc3545;

        }

  

        .password-strength.medium {

            color: #ffc107;

        }

  

        .password-strength.strong {

            color: #28a745;

        }

  

    </style>

</head>

  

<body>

  

    <div class="login-container">

        <div class="login-card">

            <h2 class="form-title">注册账户</h2>

  

            <!-- 注册表单 -->

            <form method="post">

                {% csrf_token %}

  

                <!-- 用户名输入框 -->

                <div class="form-group">

                    <label for="id_username">用户名</label>

                    <input type="text" class="form-control {% if form.username.errors %}is-invalid{% endif %}"

                           id="id_username" name="username" value="{{ form.username.value }}" required autofocus>

                    {% if form.username.errors %}

                        <div class="form-text">

                            {% for error in form.username.errors %}

                                <p>{{ error }}</p>

                            {% endfor %}

                        </div>

                    {% endif %}

                </div>

  

                <!-- 密码输入框 -->

                <div class="form-group">

                    <label for="id_password1">密码</label>

                    <input type="password" class="form-control {% if form.password1.errors %}is-invalid{% endif %}"

                           id="id_password1" name="password1" value="{{ form.password1.value }}" required>

                    <div id="password-strength" class="password-strength"></div>

                    {% if form.password1.errors %}

                        <div class="form-text">

                            {% for error in form.password1.errors %}

                                <p>{{ error }}</p>

                            {% endfor %}

                        </div>

                    {% endif %}

                </div>

  

                <!-- 密码确认输入框 -->

                <div class="form-group">

                    <label for="id_password2">确认密码</label>

                    <input type="password" class="form-control {% if form.password2.errors %}is-invalid{% endif %}"

                           id="id_password2" name="password2" value="{{ form.password2.value }}" required>

                    {% if form.password2.errors %}

                        <div class="form-text">

                            {% for error in form.password2.errors %}

                                <p>{{ error }}</p>

                            {% endfor %}

                        </div>

                    {% endif %}

                </div>

  

                <button type="submit" class="btn btn-primary">注册</button>

            </form>

  

            <div class="text-muted mt-3">

                已有账户? <a href="{% url 'login' %}">登录这里</a>

            </div>

  

            <!-- 显示系统级消息 -->

            {% if messages %}

            <div class="messages mt-3">

                {% for message in messages %}

                    <p>{{ message }}</p>

                {% endfor %}

            </div>

            {% endif %}

        </div>

    </div>

  

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

  

    <script>

        // 密码强度检测

        const passwordInput = document.getElementById("id_password1");

        const strengthOutput = document.getElementById("password-strength");

  

        passwordInput.addEventListener("input", function () {

            const password = passwordInput.value;

            let strength = "weak";

            if (password.length >= 8) {

                const hasNumbers = /[0-9]/.test(password);

                const hasLetters = /[a-zA-Z]/.test(password);

                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  

                if (hasNumbers && hasLetters && hasSpecial) {

                    strength = "strong";

                } else if (hasNumbers && hasLetters) {

                    strength = "medium";

                }

            }

  

            strengthOutput.textContent = `密码强度: ${strength}`;

            strengthOutput.className = `password-strength ${strength}`;

        });

    </script>

</body>

</html>
```



---

## 结论

通过以上步骤，实现了一个简单的用户登录系统，使用 Django 内置的认证视图、登录模板以及视图定制化来处理用户认证。 


[下一篇，主页实现](Django login app 实现)