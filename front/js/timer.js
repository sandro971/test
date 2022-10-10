class Timer{
    //elements du DOM modifiables
    #ui = {
        timer: document.getElementById('timer'),
        timer_bar: document.getElementById('timer__bar')
    };
    
    //temps utilisé
    #value = 0;

    //id de la fonction setInterval
    #timerInterval = null;
    
    //temps limite
    #timeout = 120;

    constructor(){
    }

    // retourne le temps consommé
    getValue(){
        return this.#value
    }

    // test si on est hors temps
    isTimeout(){
        return this.#value >= this.#timeout
    }

    // démarre le timer
    start(){
        //on initialise le timer
        this.clear()
        
        this.#timerInterval = setInterval(()=>{
            //le timer prend une seconde
            this.#value += 1

            //la barre de chargement augmente
            this.#ui.timer_bar.style.width = (this.#value / this.#timeout * 100) + '%'

            //si on est hors du temps limite, on affiche le message de game over
            if(this.isTimeout()){
                return Game.getInstance().showGameOverMessage(false)
            }
        }, 1000)
    }

    //stop et efface les données du timer
    clear(){
        //on stop le timer
        this.stop()
        //on ramène la bar de chargement à 0%
        this.#ui.timer_bar.style.width = 0
        //on réinitialise le timer
        this.#value = 0
    }

    //Stop l'interval
    stop(){
        this.#timerInterval && clearInterval(this.#timerInterval)
    }
}
