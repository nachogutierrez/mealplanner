const getOrElse = orElse => f => x => {
    try {
        return f(x) || orElse
    } catch (e) {
        return orElse
    }
}

module.exports = {
    getOrElse
}