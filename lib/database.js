const Database = {
  saveWeiboRecord(db, weiboId){
    db.serialize(function() {
      const stmt = db.prepare('INSERT INTO Weibo VALUES (?)');
      stmt.run(weiboId);
    });
  },
  loadLatestRecord(db, weiboId){
    return new Promise((resolve, reject) => {
      db.serialize(function() {
        db.get(`SELECT id FROM Weibo WHERE id = ?`, [weiboId], function(err, row) {
          if(row){
            const weiboId = row.id;
            resolve(weiboId);
            return;
          }
          resolve();
        });
      });
    });
  },
};
module.exports = Database;
