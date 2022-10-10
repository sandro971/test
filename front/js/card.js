
class Card{
    constructor(){
    }
    
    //permet de masquer toutes les cartes ayant la valeur donnée
    static unflip(value){
        //on récupère la carte face recto aillant la même valeur
        let $card = document.querySelector(
            `.card.flip[data-value="${value}"]`
        )
        
        //on retire la class flip
        $card.classList.remove('flip')
    }

    //transforme une valeur en élément html
    static render(value){
        //On récupère l'instance du jeu
        let game = Game.getInstance()

        /*
            On crée l'élément de base qui va représenter une carte
            <div class="card" data-value="0....11"></div>
        */
        let $card = document.createElement('div')
        $card.setAttribute('data-value', value)
        $card.classList.add('card')

        /*
            On crée une fonction pour gérer l'événement "click" sur la carte
        */
        $card.addEventListener('click', (e)=>{
            //récupère la valeur de la carte
            const value = e.target.getAttribute('data-value')

            //si le joueur n'a pas la main, on ne fait rien
            if(!game.getCanPlay()){
                return
            }

            //si la carte a déjà été retournée
            if($card.classList.contains('flip')){
                return
            }

            //le joueur n'a plus la main
            game.setCanPlay(false)

            //retourne la carte sélectionnée
            $card.classList.add('flip')

            //on décale les vérifications au moment ou l'animation se termine
            setTimeout(()=>{
                // si c'est la 2nd carte de la paire qu'on teste
                if(game.getLastUnflippedCard()){

                    //on vérifie si la carte précédemment tournée correspond à la nouvelle carte
                    if(game.getLastUnflippedCard() == value){
                    
                        //on efface la dernière carte de la mémoire
                        game.setLastUnflippedCard(null)

                        /*
                            On vérifie l'état de la partie
                        */
                        switch(game.getGameState()){
                    
                            //si la partie est encore en cours, on redonne la main au joueur
                            case GAME_STATE.PLAY:
                                game.setCanPlay(true)
                                break


                            /*
                                showGameOverMessage( true : a gagné, false: a perdu)
                            */
                            
                            //si la partie est perdu, on affiche un message
                            case GAME_STATE.LOOSE:
                                game.setCanPlay(false)
                                game.showGameOverMessage(false)
                                break
                            
                            //si la partie est perdu, on affiche un message
                            case GAME_STATE.WIN:
                                game.setCanPlay(false)
                                game.showGameOverMessage(true)
                                break
                        }
                    }
                    else{
                        /*
                            Les deux cartes ne sont pas identiques
                            On retournent ces dernières et on efface la mémoire du game.getLastUnflippedCard()
                        */
                        Card.unflip(game.getLastUnflippedCard())
                        Card.unflip(value)
                        game.setLastUnflippedCard(null)
                    }

                }
                else{
                    /*
                    * étant donné que c'est la première carte de la paire à tester, 
                    * on la garde en mémoire pour la comparer à la carte suivante
                    */
                    game.setLastUnflippedCard(value)
                }

                //le joueur peut de nouveau jouer
                game.setCanPlay(true)
            }, 1000)
        })

        return $card
    }

    //distribue les cartes au hasard
    static getDeck(){
        /*
            La variable `cards` contient une liste de valeurs représentants chacune une carte
            Chaques valeurs arrivent par paire
        */
        var cards = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]

        //mélange des numéros de cartes
        cards.sort(_ => Math.random() - 0.5)

        //on retourne la liste sous forme d'éléments HTML
        return cards.map(Card.render)
    }
}