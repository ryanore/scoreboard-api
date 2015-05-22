var games = {
    getAll: function(req, res) {
        var allGames = data;
        res.json(allGames);
    },
    getOne: function(req, res) {
        var id = req.params.id;
        var game = data[0];
        res.json(game);
    },
    create: function(req, res) {
        var newGame = req.body;
        data.push(newGame);
        res.json(newGame);
    },
    update: function(req, res) {
        var updateGame = req.body;
        var id = req.params.id;
        data[id] = updateGame;
        res.json(updateGame);
    },
    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1);
        res.json(true);
    }
};
var data = [{
    name: 'game 1',
    id: '1'
}, {
    name: 'game 2',
    id: '2'
}, {
    name: 'game 3',
    id: '3'
}];
module.exports = games;