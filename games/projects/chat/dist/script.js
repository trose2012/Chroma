const embed = document.querySelector('widgetbot')

document.querySelector('#general').addEventListener('click', () => {
  embed.emit('navigate', {
    guild: '299881420891881473',
    channel: '368427726358446110'
  })
})

document.querySelector('#live-demo').addEventListener('click', () => {
  embed.emit('navigate', {
    guild: '299881420891881473',
    channel: '355719584830980096'
  })
})

document.querySelector('#login').addEventListener('click', () => {
  embed.emit('login')
})

document.querySelector('#logout').addEventListener('click', () => {
  embed.emit('logout')
})