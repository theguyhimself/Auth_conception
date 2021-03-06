var battle_dao = require('auth_db').battle_dao;
var user_dao = require('auth_db').user_dao;
const bcrypt = require('bcrypt');

module.exports = class ControleurBattle {
    listBattles(callback) {
        battle_dao.findAll((err, battles) => {
            if(err == null){
                callback( {statusRequest:200, battles: battles});
            }else{
                callback( {statusRequest:500 ,"erreur" : "bdd"});
            }
        });
    }

    /**
     * 
     * @param { id de l'utilisateur 1} player1 
     * @param { id de l'utilisateur 2 } player2 
     * @param { score de l'utilisateur 1 } score1 
     * @param { score de l'utilisateur 2 } score1 
     * @param { date en string au format YYYY-mm-dd } date 
     * @param { time en string au format hh:ii:ss } time 
     */
    addBattleToDB(player1, player2, score1, score2, date, time, callback)
    {
        if(player1 !== player2){
            user_dao.findBy2Key(player1, player2,  (err, users)=>{
                if (users.length == 2){
                    battle_dao.insert([player1, player2, score1, score2, date, time], (err, battle)=>{
                        if(err == null){
                            callback( {statusRequest:201, id : battle});
                        }else{
                            callback( {statusRequest:500 ,erreur : "bdd"});
                        }
                    });
                }else{
                    callback( {statusRequest:403 ,erreur : "au moins un des players n'existe pas"});
                }
                
            });    
        }else{
            callback( {statusRequest:403 ,erreur : "player identique"}); 
        }
        
    }
}