function authenticator(req, res, next) {
    console.log("AUTHENTICATION!!!");
    if (req.session.active || req.path==='/login') {
        next();
    } else {
        res.redirect("./login");
    }
}

module.exports = authenticator;