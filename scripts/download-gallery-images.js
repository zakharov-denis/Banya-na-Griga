#!/usr/bin/env node

/**
 * Скрипт для скачивания изображений галереи с ImgBB
 * Использование: node scripts/download-gallery-images.js
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL изображений из старой версии GallerySection.tsx
const urls = [
  'https://i.ibb.co/LXvvCcMs/ffff196a170572b94bbe7c562ffaff8745d352af.jpg',
  'https://i.ibb.co/DHtYkjg5/e1995d0fa7c393a67c9e207bb3e462d699b0ce06.jpg',
  'https://i.ibb.co/Zpz465CP/c88f797e6e429dbfe1447f62e27f90a3011248ab.jpg',
  'https://i.ibb.co/4nNG5pBk/453197347ee55544635467ff115a58cfc30cdad0.jpg',
  'https://i.ibb.co/DH5T21zv/329578bdf1c9c62b3ca991bc864a8d2423d161d2.jpg',
  'https://i.ibb.co/ZR9RHQjz/6626ebf24c5ab5cd5245c3ddeb1e66b400b184f8.jpg',
  'https://i.ibb.co/qMDkDVyP/4992df2a4b06a92ac1a196b68c66137cc923bbac-1.jpg',
  'https://i.ibb.co/JbMfnf7/0874a033290921344c54164a0f3f2ed50ec8fa62-1.jpg',
  'https://i.ibb.co/NdLM70fZ/5ad0915673e071d116fdeff50da75a7a93fd7540.jpg',
  'https://i.ibb.co/Nn3XmBdk/2baae3c0417ef2d1c1f94cb543bd99a4962f8df0.jpg',
  'https://i.ibb.co/d4DrQ4m6/ydym0xra1msgo4gsck80wgscwgckko.png',
  'https://i.ibb.co/LX8YyYVP/q6vleo5vha8w00wwow44k48cwkcwcs.png',
  'https://i.ibb.co/nGYpKXd/ge9i3235yhkcwggswsswc4gwwk0ok0.png',
  'https://i.ibb.co/pB4RZc5y/fjl8ynxe7r40g4oo0w04so4swo8448.png',
  'https://i.ibb.co/7NznksQn/f428nc2701wksccg8sss8cwkokgsg8.png',
  'https://i.ibb.co/67sjhnnF/452zlf0rh6m8o4swokwo0cok8kgccs.png',
  'https://i.ibb.co/7JFSntwJ/75xoa4zbcfksk8cw0s88gcgk40o4s0.png',
  'https://i.ibb.co/wNNpvSsM/46s16ev5igw0g0484kwcg840skc0ko.png',
  'https://i.ibb.co/DgQ4jWGR/9c60358o628sk4w0sk0kwwcow4wkog.png',
  'https://i.ibb.co/S7rZVLK5/6extxg9a0kg0c0c4800wwkc48ks488.png',
  'https://i.ibb.co/8g5Sjhkp/5f2t85xjx90cgo0kcs8coogk08cwk4.png',
  'https://i.ibb.co/QvkxLPWM/1tiuzu92lstcgwgcgk8occ88gk0kcc.png',
];

const downloadDir = path.join(__dirname, '..', 'public', 'images', 'gallery');

// Создаем папку, если её нет
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
  console.log(`Создана папка: ${downloadDir}`);
}

function downloadImage(url, index) {
  return new Promise((resolve, reject) => {
    const extension = url.endsWith('.png') ? 'png' : 'jpg';
    const filename = `gallery-${String(index + 1).padStart(2, '0')}.${extension}`;
    const filepath = path.join(downloadDir, filename);
    
    // Определяем, использовать ли https или http
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (response) => {
      // Проверяем статус ответа
      if (response.statusCode !== 200) {
        reject(new Error(`Ошибка при скачивании ${url}: статус ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Скачано: ${filename}`);
        resolve(filepath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Удаляем файл при ошибке
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log(`Начинаем скачивание ${urls.length} изображений...\n`);
  
  try {
    // Скачиваем все изображения последовательно
    for (let i = 0; i < urls.length; i++) {
      await downloadImage(urls[i], i);
    }
    
    console.log(`\n✓ Все изображения успешно скачаны в папку: ${downloadDir}`);
    console.log('\nТеперь вы можете использовать локальные изображения в галерее!');
  } catch (error) {
    console.error('\n✗ Ошибка при скачивании:', error.message);
    process.exit(1);
  }
}

// Запускаем скачивание
downloadAll();

