module.exports = {
    engine: (req, res) => {
        let data = { };
        res.render('layouts/filter', data)
    }
}
