# oautoscroll-background
Фоновый ONLYOFFICE плагин управления перемоткой позиции в документе

# 1. Предварительная настройка
Скачайте и обновите сабмодули через команду:
```сonsole
git submodule update --init --recursive
```

# 2. Установка в обычном режиме без возможности редактирвоания
## 2.1 Установка в linux
Если папка ранее существовала удалим ее
```bash
rm -rf ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

Создайте папку в папке плагинов
```bash
mkdir -p ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

Скопируйте туда все файлы из текущей папки
```bash
cp -r . ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}/
```

## 2.2 Установка в windows
Если папка ранее существовала удалим ее
```powershell
Remove-Item -Path "$env:LOCALAPPDATA\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}" -Recurse -Force
```

Скопируйте туда все файлы из текущей папки
```powershell
Copy-Item -Path "." -Destination "$env:LOCALAPPDATA\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}" -Recurse
```

# 3. Разработка на linux
## 3.1 Настройка зависимостей
Для вашей версии linux установите `bindfs`:
* __Ubuntu / Debian / Mint__
```console
sudo apt install bindfs
```

* __Fedora / RHEL / CentOS__
```console
sudo dnf install bindfs
```

* __Arch Linux / Manjaro__
```console
yay -S bindfs
```

Дальше для правильной работы `bindfs` необходимо в настройках fusr раскомментировать строку с Расскомментируется строку с `#user_allow_other`
```bash
sudo nano /etc/fuse.conf
```

## 3.2 Создание папки в директории с плагинами
```bash
mkdir -p ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

## 3.3 Монтирование текущей папки разработки с папкой плагина
```bash
bindfs --resolve-symlinks $PWD ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

## 3.4 Удаление плагина в режиме разработчика
```bash
sudo umount ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

# 4. Разработка на windows
## 4.1 Создание символьной ссылки
```powershell
cmd /c mklink /J "$env:LOCALAPPDATA\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}" "$PWD"
```
## 4.2 Удаление плагина в режиме разработчика
```powershell
Remove-Item "$env:LOCALAPPDATA\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}" -Force
```