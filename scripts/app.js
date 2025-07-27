"use strict"

// dark mode / light mode
const toggleBtn = document.getElementById('darkModeToggle')

// API
const inputElem = document.querySelector('.search-box__input')
const inputBtn = document.querySelector('.search-box__button')
const wordElem = document.querySelector('.result-card__word')
const definationWordElem = document.querySelector('.result-card__definition')
const translationWordElem = document.querySelector('.result-card__translation')
const phoneticsWordElem = document.querySelector('.phonetics__ipa')
const historyListElem = document.querySelector('.history__list')
const kindWord = document.querySelector('.result-card__pos')
const exampleWord = document.querySelector('.result-card__example')
const usBtn = document.querySelector('.phonetics__btn--us');
const ukBtn = document.querySelector('.phonetics__btn--uk');
let audioUS = null
let audioUK = null
// Modal
const modal = document.querySelector('.custom-toast')
const closeModal = document.querySelector('.toast-close')

// dark mode / light mode
const saveMode = localStorage.getItem('theme')

if(saveMode === 'light') {
    document.body.classList.add('light-mode')
    toggleBtn.textContent = '☀️'
} else {
    toggleBtn.textContent = '🌙'
}

toggleBtn.addEventListener('click', ()=> {
    document.body.classList.toggle('light-mode')
    if(document.body.classList.contains('light-mode')) {
        toggleBtn.textContent = '☀️'
        localStorage.setItem('theme', 'light')
    } else {
        toggleBtn.textContent = '🌙'
        localStorage.setItem('theme', 'dark')
    }
})
//  API Audio
usBtn.addEventListener('click', ()=> {
    if(audioUS) {
        audioUS.play()
    }
})
ukBtn.addEventListener('click', ()=> {
    if(audioUK) {
        audioUK.play()
    }
})
// API
inputBtn.addEventListener('click', ()=> {
    let word = inputElem.value.trim()
    inputBtn.disabled = word === ''

    if(word) {
        fetchDictionaryEN(word)
    } else {
        modal.classList.add('show')
    }
    setTimeout(() => {
        modal.classList.remove('show')
    }, 4000);
})
closeModal.addEventListener('click', ()=> {
    modal.classList.remove('show');
  });
inputElem.addEventListener('keyup', (e)=> {
    let word = inputElem.value.trim()
    inputBtn.disabled = word === ''
    if(e.key === 'Enter') {
        if(word) {
            fetchDictionaryEN(word)
        } else {
            modal.classList.add('show')
        }
        setTimeout(() => {
            modal.classList.remove('show')
        }, 4000);
    }
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
  });

// en

async function fetchDictionaryEN(word) {
    inputBtn.disabled = true
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

    if(!res.ok) {
        modal.classList.add('show')
        setTimeout(() => {
            modal.classList.remove('show')
        }, 4000);
        inputElem.value = ''
        return
    }
    const data = await res.json()

    const definition = data[0].meanings[0].definitions[0].definition
    const phonetics = data[0].phonetics[0].text

    wordElem.innerHTML = word // input.value
    definationWordElem.innerHTML = definition // definition word
    phoneticsWordElem.textContent = phonetics // phonetic word
    // audio
    const phoneticsList = data[0].phonetics 
    const usAudioData = phoneticsList.find(p => p.audio.includes('us'))
    const ukAudioData = phoneticsList.find(p => p.audio.includes('uk'))

    audioUS = usAudioData ? new Audio(usAudioData.audio) : null
    audioUK = ukAudioData ? new Audio(ukAudioData.audio) : null

    // for specify kind word
    const partOfSpeech = data[0].meanings[0].partOfSpeech
    kindWord.innerHTML = `(${partOfSpeech})` 

    // example word
    const example = data[0].meanings[0].definitions[0].example
    exampleWord.innerHTML = example ? `"${example}"` : '' ;

    inputElem.value = ''
    fetchDictionaryFA(word)
    saveHistory(word)
  } catch (err) {
    console.log(err);
    inputElem.value = ''
    modal.classList.add('show')
setTimeout(() => {
    modal.classList.remove('show')
}, 4000);
  } finally{
    inputBtn.disabled = false
  }
}
// fa

async function fetchDictionaryFA(word) {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|fa`)
    const data = await res.json()
    const translation = data.responseData.translatedText
    translationWordElem.innerHTML = translation
}

// history list

function saveHistory(word) {
    let history = JSON.parse(localStorage.getItem('dictionary')) || []

    // حذف تکراری ها
    history = history.filter(item => item !== word)

    // add to list
    history.unshift(word)

    // حداکثر 10 تا مورد
    if(history.length > 10) {
        history.pop()
    }

    localStorage.setItem('dictionary', JSON.stringify(history))
    updateHistory(history)
}

function updateHistory(history) {
    historyListElem.innerHTML = ''

    history.forEach(word => {
        const li = document.createElement('li')
        li.classList.add('history__item')
        li.innerHTML = word

        // delete item
        li.addEventListener('click', ()=> {
            deleteItem(word)
        })

        historyListElem.appendChild(li)
    })
}
// delete item
function deleteItem(word) {
    let history = JSON.parse(localStorage.getItem('dictionary')) || []

    // delete
    history = history.filter(item => item !== word)

    localStorage.setItem('dictionary', JSON.stringify(history))
    updateHistory(history)
}


// load Dom recent word
window.addEventListener('DOMContentLoaded', () => {
    let history = JSON.parse(localStorage.getItem('dictionary')) || []
    updateHistory(history)
})
