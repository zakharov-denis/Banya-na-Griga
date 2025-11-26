# Инструкция по переносу изображений

## Вариант 1: Скачать текущие изображения с ImgBB

Если вы хотите сохранить текущие изображения локально, выполните следующие шаги:

1. Откройте файл `components/GallerySection.tsx` (старая версия с URL)
2. Скопируйте все URL-адреса из массива `allGalleryImages`
3. Скачайте каждое изображение и сохраните в этой папке с именами:
   - `gallery-01.jpg` (первое изображение)
   - `gallery-02.jpg` (второе изображение)
   - и так далее...

## Вариант 2: Использовать скрипт для скачивания

Вы можете использовать следующий скрипт (Node.js) для автоматического скачивания:

```javascript
// download-gallery-images.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://i.ibb.co/LXvvCcMs/ffff196a170572b94bbe7c562ffaff8745d352af.jpg',
  'https://i.ibb.co/DHtYkjg5/e1995d0fa7c393a67c9e207bb3e462d699b0ce06.jpg',
  // ... добавьте все URL
];

const downloadDir = path.join(__dirname, 'public/images/gallery');

urls.forEach((url, index) => {
  const filename = `gallery-${String(index + 1).padStart(2, '0')}.${url.endsWith('.png') ? 'png' : 'jpg'}`;
  const filepath = path.join(downloadDir, filename);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filepath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${filename}`);
    });
  });
});
```

## Вариант 3: Добавить новые изображения

1. Поместите ваши изображения в эту папку
2. Назовите их последовательно: `gallery-01.jpg`, `gallery-02.jpg`, и т.д.
3. Обновите массив `allGalleryImages` в `components/GallerySection.tsx`, если количество изображений изменилось

## Формат путей

В Vite файлы из папки `public` доступны по путям, начинающимся с `/`:
- Файл: `public/images/gallery/photo.jpg`
- Путь в коде: `/images/gallery/photo.jpg`

