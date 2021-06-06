function mw(req, res, next) {
    const name = req.body.name
    const count = req.body.count

    req.body.count = validateCount(count)
    const message = validateName(name)

    if (message) {
        return res.status(400).send(message)
    }

    next()
}

function validateName(name) {
    if (!name) {
        return "Name parameter is missing."
    }

    if (typeof name !== "string") {
        return "Name paramter must be a string."
    }

    if (name.length > 15) {
        return "Name must not exceed 15 characters."
    }

    /**
     * allowed characters for a twitter username are:
     * 1. a to z and A to Z
     * 2. numbers 0 to 9
     * 3. underscore 
     */

    if (name.match(/[^a-zA-Z0-9_]/)) {
        return "Name's format is invalid."
    }

    return null
}

function validateCount(count) {
    if (!count) { //count is not available in the request bodyc
        return 10
    }

    if (typeof count === "string" && count.match(/[^0-9]/)) { //count is not an integer number
        return 10
    }

    if (count < 0) { //count is a negative number
        return 10
    }

    if (count > 200) { //count is higher than the allowed number per Twitter API docs
        return 200
    }

    return count
}

module.exports = mw