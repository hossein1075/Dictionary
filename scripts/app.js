// dark mode / light mode
const toggleBtn = document.getElementById('darkModeToggle')

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