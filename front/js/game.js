//Répertorie les différents état de la partie
const GAME_STATE = {
    WIN: 1,
    LOOSE: 0,
    PLAY: -1
}


class Game{
    //éléments du DOM modifiables
    #ui = {
        scene: document.getElementById('scene')
    };

    //Indique si l'utilisateur à la main ou pas
    #canPlay = true;

    //objet timer
    #timer = new Timer();

    //carte mise en mémoire
    #lastUnflippedCard = null;

    /*
        Pattern Singleton
        Nous n'avons besoin que d'une seul instance de Game.
        Elle pourra être appelée partout dans le code à l'aide de la méthode static getInstance()
    */
    static __instance = null;

    static getInstance(){
        if(!Game.__instance){
            Game.__instance = new Game()
        }

        return Game.__instance
    }


    constructor(){
        
    }

    //retourne l'objet timer
    getTimer(){
        return this.#timer
    }

    //retourne la carte mise en mémoire
    getLastUnflippedCard(){
        return this.#lastUnflippedCard
    }

    //met en mémoire une carte
    setLastUnflippedCard(card){
        this.#lastUnflippedCard = card
    }

    //indique si le joueur à la main
    getCanPlay(){
        return this.#canPlay
    }

    //enregistre si le joueur à la main
    setCanPlay(flag){
        this.#canPlay = flag
    }

    
    //renvoie l'état de la partie ( en cours, perdue, gagnée )
    getGameState(){
        //Si le temps est écoulé, la partie est perdue
        if(this.#timer.isTimeout()){
            return GAME_STATE.LOOSE
        }

        //on compte le nombre de cartes non retournées
        const hasUnflippedCards = document.querySelectorAll(
            `.card:not(.flip)`
        ).length != 0
        
        //si il reste des cartes à jouer, on continue
        if(hasUnflippedCards){
            return GAME_STATE.PLAY
        }

        //sinon, c'est gagné
        return GAME_STATE.WIN
    }


    //distribue les cartes pour une nouvelle partie
    dispatchCards(){
        //on supprime les précédentes cartes
        this.#ui.scene.innerHTML = ''
        
        //on récupère un nouveau jeu de carte et on les insère dans le dom
        Card.getDeck().forEach((card)=>{
            this.#ui.scene.appendChild(card)
        })
    }

    //permet de lancer une nouvelle partie
    start(){
        //si une partie est déjà lancée, on la stop
        this.stop()

        //on donne la main au joueur
        this.#canPlay = true

        //démarre le timer
        this.#timer.start()
    }

    //permet de stopper la partie en cours
    stop(){
        //on donne la main au joueur
        this.#canPlay = false

        //on distribue de nouvelle cartes pour effacer la partie
        this.dispatchCards()

        //on stop et efface toutes les données du timer
        this.#timer.clear()
    }

    //affiche un message de game over
    //si la partie est gagné, sauvegarde le temps du joueur
    showGameOverMessage(hasWin){
        //le joueur n'a plus la main
        this.#canPlay = false
    
        //on stop le timer
        this.#timer.stop()
    
        //on affiche le message de game over
        alert(hasWin ? 'Game Over, You WIN !': 'Game Over, You lose !')
    
        //si le jeu est remporté, on envoie le nouveau temps
        hasWin && Score.save(this.#timer.getValue())
    
        //on efface totalement les données de temps
        this.#timer.clear()
    }
}