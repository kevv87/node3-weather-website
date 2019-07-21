console.log('Client side js');
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()  // Previene que se refresque la pagina

  const location = search.value
  // Lo siguiente solo sirve en js del lado del cliente

  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''
  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      messageOne.textContent = ''
      if(data.error){
        messageOne.textContent = data.error
        console.log(data.error);
      }else{
        messageOne.textContent = data.temp
        messageTwo.textContent = data.summary
        console.log(data);
      }
    })
  })
})
