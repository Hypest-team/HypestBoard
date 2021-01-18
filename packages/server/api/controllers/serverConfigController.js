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

        res.json(serverData);
        res.end();
    }
}

module.exports = {
    getServerConfig
};
