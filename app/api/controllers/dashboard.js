
exports.index = function index(req, res) {
    res.json(req.user)
}