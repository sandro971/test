class Score{

    //récupère les meilleurs scores depuis l'API
    static getAll(){
        var time_body = document.getElementById('time__body')
        /*
            `fetch` est une fonction qui permet de récupérer des données distantes de façon asynchrone
            Elle renvoie une "Promesse"
        */
        return fetch('http://localhost/time')
            //transforme la chaine de caractère en JSON
            .then(function(res){
                return res.json()
            })
            .then(function(data){
                //on efface le tableau
                time_body.innerHTML = ''

                //on insère chaque résultat sous forme d'HTML
                data.forEach(function(result){
                    time_body.innerHTML +=`
                        <tr>
                            <td>${result.name}</td>
                            <td>${result.time}</td>
                        </tr>
                    `
                })
            })
    }

    static save(time){
        /*
            On affiche une boîte de dialogue pour récupérer le nom du gagnant
            par défaut, AAA
        */
        let name = prompt('Entrer votre nom', 'AAA')
        
        /*
            L'envoie des données se fait au format JSON
            Pour cela, on utilise le paramètre 'application/json' dans le content-type
            et on transforme nos données à l'aide JSON.stringify
        */
        return fetch('http://localhost/time', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, time
            })
        })
        .then(function(res){
            //on rafraichit le tableau des scores
            Score.getAll()
        })
    }

}
