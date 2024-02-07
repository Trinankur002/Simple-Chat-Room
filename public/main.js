// const express = require("express")

// const socket = io("http://localhost:4000", {})
const socket = io()
const clientsTotal = document.getElementById('clients-total')
const messageContainer= document.getElementById('massage-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('massage-form')
const messageInput = document.getElementById('massage-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMassage()
})

function sendMassage() {
    if (messageInput.value === "" ) return;
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        massage: messageInput.value,
        date : new Date(),
    }
    socket.emit('massage', data)
    addMassageToUi(true, data)
}

socket.on('clients-total', (data) => {
    // console.log(data)
    clientsTotal.innerText = `Total Clients ${data}`
})

socket.on('chat-msg', (data) => {
    console.log(data)
    addMassageToUi(false, data)
})

function addMassageToUi(isOwnMsg , data) {
    const element = 
        `<li class="${isOwnMsg ? "massage-left" : "massage-right"}">
            <p class="massage">${data.massage}
            <br />
                <span> 🗨️${data.name}⏲️ ${data.date}</span>
            </p>
        </li>`
    messageContainer.innerHTML += element
    
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
    messageInput.value= " "
}