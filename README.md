# CyberDrop 🎮

**CyberDrop** — Zuko maskoti bilan gaming portal sayt.

## Fayllar tuzilmasi

```
cyberdrop/
├── index.html          ← Asosiy sahifa
├── style.css           ← Barcha dizayn
├── script.js           ← Barcha funksiyalar
├── intro.mp4           ← Kirish videosi (zuko_uchmoqda.mp4)
├── zuko_salom.mp4      ← 2-video
├── zuko_pistolet.jpg   ← Logo + modal rasmi
├── zuko_otrbi.jpg      ← Hero + cases background
└── README.md
```

## Xususiyatlar

- 🎬 **Intro video** — kirganida video o'ynaladi, tugagach sayt ochiladi
- 🔐 **Login / Register** — modal, Telegram va Google orqali kirish
- ⚡ **Keyslar** — Bronze, Silver, Gold, Diamond
- 🎥 **Videolar** — hover preview, full modal player
- 🌌 **Dark cosmic dizayn** — Orbitron shrift, cyan neon ranglar

## GitHub Pages uchun sozlash

1. Barcha fayllarni repoga yuklang
2. Settings → Pages → Branch: main, folder: / (root)
3. Sayt tayyor!

## Telegram / Google auth ulash

`script.js` faylida `socialLogin()` funksiyasini o'zgartiring:

```js
// Telegram Bot API
window.open('https://oauth.telegram.org/auth?bot_id=YOUR_BOT_ID&...', '_blank');

// Google OAuth
window.open('https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&...', '_blank');
```
