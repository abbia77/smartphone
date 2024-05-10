function endpoint(app, connpool) {

    app.post("/api/sistemi_operativi", (req, res) => {
        var errors = []
        /* controllo dati inseriti
        if (!req.body.description) {
            errors.push("No description specified");
        }
        if (req.body.status === "") {
            errors.push("No status specified");
        }
        */
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            id: req.body.id,
            nome: req.body.nome,
            versione:req.body.versione,
            data_rilascio:req.body.data_rilascio,
            sviluppatore:req.body_sviluppatore,
            tipo:req.body_tipo,
            note:req.body_note,
        }

        var sql = 'INSERT INTO sistemi_operativi (id,nome,versione,data_rilascio,sviluppatore,tipo,note) VALUES (?,?)'
        var params = [data.description, data.status]
        connpool.query(sql, params, (error, results) => {
            if (error) {
                res.status(400).json({ "error": error.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.insertID
            })
            console.log(results)
        });

    })



    app.get("/api/sistemi_operativi", (req, res, next) => {
        var sql = "select * from sistemi_operativi"
        var params = []
        connpool.query(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    });


    app.get("/api/sistemi_operativi/:id", (req, res) => {
        var sql = "select * from sistemi_operativi where sistemi_operativi_id = ?"
        var params = [req.params.id]
        connpool.query(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows[0]
            })
          });
    });


    app.put("/api/sistemi_operativi/:id", (req, res) => {
        var data = {
            id: req.body.id,
            nome: req.body.nome,
            versione:req.body.versione,
            data_rilascio:req.body.data_rilascio,
            sviluppatore:req.body_sviluppatore,
            tipo:req.body_tipo,
            note:req.body_note,
        }
        connpool.execute(
            `UPDATE sistemi_operativi set 
               description = COALESCE(?,description), 
               status = COALESCE(?,status) 
               WHERE sistemi_operativi_id = ?`,
            [data.description, data.status, req.params.id],
            function (err, result) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                console.log(result )
                res.json({
                    message: "success",
                    data: data,
                    changes: result.affectedRows
                })
        });
    })



    app.delete("/api/sistemi_operativi/:id", (req, res) => {
        connpool.execute(
            'DELETE FROM task WHERE sistemi_operativi_id = ?',
            [req.params.id],
            function (err, result) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({"message":"deleted", changes: result.affectedRows})
        });
    })


}





module.exports = endpoint;