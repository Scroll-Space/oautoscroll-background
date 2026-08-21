# oautoscroll-background
Фоновый ONLYOFFICE плагин управления перемоткой позиции в документе

## 1. Установка зависимостей для режима разработки
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

## 2. Настройка для FUSE для правильного монтирования
Расскомментируется строку с `#user_allow_other`
```bash
sudo nano /etc/fuse.conf
```

## 3. Установка плагина в режиме разработки
Создание папки в директории с плагинами
```bash
mkdir -p ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

Монтирование текущей папки разработки с папкой плагина
```bash
bindfs --resolve-symlinks $PWD ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```

## 4. Удаление плагина
```bash
sudo umount ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{2c3dfbcf-c7b2-48e5-befa-8843d04437a5}
```
