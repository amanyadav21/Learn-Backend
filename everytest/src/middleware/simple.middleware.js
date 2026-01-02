function loggerMiddleware(req, res, next) {
    console.log("Middleware working")
    // console.log("method", req.method);
    // console.log("URL:", req.url)
    next();
}

export default loggerMiddleware;