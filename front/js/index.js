const game = Game.getInstance()
const $button_restart = document.getElementById('button_restart')
const $button_cancel = document.getElementById('button_cancel')

//on démarre une partie en cliquant sur le bouton "nouvelle partie"
$button_restart.addEventListener('click', function(e){
    e.preventDefault()

    game.start()
})

//on arrête une partie en cliquant sur le bouton "abandonner"
$button_cancel.addEventListener('click', function(e){
    e.preventDefault()

    game.stop()
})

Score.getAll()
game.start()