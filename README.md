# 📘 Smart Dictionary App

A smart English-to-Farsi dictionary app that shows word definitions, part of speech, pronunciation (US/UK), phonetics, examples, and search history.

---

## 🌐 APIs Used

1. **[Free Dictionary API](https://dictionaryapi.dev/)**
   - Used to fetch English word definitions, phonetics (IPA), example sentences, part of speech, and pronunciation audio (US/UK).
   - Endpoint: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

2. **[MyMemory Translation API](https://mymemory.translated.net/)**
   - Used to translate English words into Persian (Farsi).
   - Endpoint: `https://api.mymemory.translated.net/get?q={word}&langpair=en|fa`

---

## ✨ Features

- Search English words
- Display definitions, part of speech, example usage, and IPA phonetics
- Audio pronunciation (US and UK, if available)
- Persian (Farsi) translation of the word
- Dark mode / Light mode toggle
- Saves recent search history (up to 10 items)
- Custom toast notifications for errors and alerts

---

## 🛠 Tech Stack

- HTML5, CSS3 (Custom + Bootstrap)
- JavaScript (Vanilla)
- LocalStorage

---

## 📦 Installation

No setup required. Just open the `index.html` file in your browser or deploy to GitHub Pages.

---

> Built with ❤️ by [hossein hosseini😉]
