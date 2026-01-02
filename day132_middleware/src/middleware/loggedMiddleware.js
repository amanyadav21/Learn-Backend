function loggedMiddleware(req, res, next) {
    console.log("Middleware is working now!")
    next()
}

export default loggedMiddleware