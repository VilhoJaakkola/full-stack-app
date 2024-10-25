const authRole = (allowedRoles) => {
    return (req, res, next) => {
        // Tarkista, onko käyttäjän rooli sallittujen roolien listalla
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Access denied!' });
        }
        next();
    };
};

module.exports = authRole;
