const jobBtn = document.querySelector("#jobButton");

jobBtn.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    window.location.href = 'index.html';
})