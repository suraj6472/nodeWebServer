console.log("working")
fetch('https://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data);
    })
})




const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent =  'Loading...'
    var location=address.value
    let url = '/weather?address='+location
    fetch(url).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent =  data.error
            } else {
                messageOne.textContent =  data.location
                messageTwo.textContent =  data.forcast
            }
        })
    })
})