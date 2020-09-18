const { reset } = require('nodemon');

var ObjectID = require('mongodb').ObjectID

module.exports = (app, db) => {
    app.post('/notes', (req, res) => {
        const note = { 
            text: req.body.body, 
            title: req.body.title,
            created: new Date().toString()
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ error: err });
            }
            else {
                res.send(result.ops[0]);
            }
        })
    })

    app.get ('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {_id: new ObjectID(id) }
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ error: err })
            } else {
                res.send(item)
            }
        })
    })

    app.delete ('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {_id: new ObjectID(id) }
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ error: err })
            } else {
                res.send(`Note ${id} deleted`)
            }
        })
    })

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { _id : new ObjectID(id) }
        const note = {
            text: req.body.body,
            title: req.body.title,
            updated: new Date().toString()
        }
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ error: err })
            } else {
                res.send(note)
            }
        })
    })
}