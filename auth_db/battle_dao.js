var db = require('./sqlite_connection');
var BattleDao = function(){
    /**
     * values : Tableau de valeur a inserer
     * callback : Message d'erreur
     */
    this.insert = function (values, callback) {
        let stmt = db.prepare("INSERT INTO battle (id_joueur1, id_joueur2, score1, score2, date, duree) VALUES(?, ?, ?, ?, ?, ?)")
        stmt.run([ values[0], values[1], values[2], values[3], values[4], values[5]], function(err){
            if(err){
                callback(err, null);
            }else{
                callback(null,this.lastID);
            } 
        });
    };

    /**
     * key : Cle d'identification
     * values : Tableau de valeur a modifier
     * callback : Message d'erreur
     */
    this.update = function (key, values, callback) {
        db.query(
            "UPDATE battle SET id_joueur1 = ?, id_joueur2 = ?, score1 = ?, score2 = ?, date = ?, duree = ? WHERE id_battle = ?",
            [ values[1], values[2], values[3], values[4], values[5], values[6], key ],
            callback
        );
    };

    /**
     * key : Cle d'identification
     * callback : Message d'erreur
     */
     this.delete = function(key, callback){
        db.query("DELETE FROM battle WHERE id_battle=?",key,callback);
    };

    /**
     * callback : Message d'erreur
     */
     this.findAll = function(callback){
        db.all("SELECT * FROM battle", function (err, rows) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    };

    /**
     * key : Cle d'identification
     * callback : Message d'erreur
     */
	this.findByKey = function(key, callback){
        db.query("SELECT * FROM battle WHERE id_battle =?",key, function(err,rows){
            if(err){
                console.log(err.message);
            }else{
                callback(rows);
            }
        });
    };

    /**
     * key : Cle d'identification du joueur 1
     * callback : Message d'erreur
     */
    this.findByPlayerOneForeignKey = function(key, callback){
        db.query("SELECT * FROM battle WHERE joueur1 =?",key, callback);

    };

    /**
     * key : Cle d'identification du joueur 2
     * callback : Message d'erreur
     */
     this.findByPlayerTwoForeignKey = function(key, callback){
        db.query("SELECT * FROM battle WHERE joueur2 =?",key, callback);
    };
};

var dao = new BattleDao();
module.exports = dao;
