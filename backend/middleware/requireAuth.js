const requireAuth = () => {
    // this is where we write the logic to require the client to be a logged in user to access the endpoint
    // then we can do router.use(requireAuth) to run this function after a request is sent & before we give our response.
}

module.exports = requireAuth