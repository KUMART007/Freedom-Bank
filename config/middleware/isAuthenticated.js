module.exports = (req, res, next) => {
    console.log(`The user is ${req.user}`);
    if (req.user)
    {
        return next();
    }
    return res.redirect("/");
}