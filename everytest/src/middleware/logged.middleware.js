function loggedMiddleware(req, res, next) {
    console.log("Bhai loggedkam kar rha hai")
    next();
}


export default loggedMiddleware;