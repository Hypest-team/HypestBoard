function getServerConfig({
    homepage,
    hostname,
    port,
    baseUrl,
}) {
    return (req, res, next) => {
        const serverData = {
            baseUrl,
            homepage,
            hostname,
            port
        };

        //if (req.path.endsWith('!serverconfig')) {
            res.json(serverData);
            res.end();
        //}

        next();
    }
}

module.exports = {
    getServerConfig
};
