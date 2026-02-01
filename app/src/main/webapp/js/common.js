
class HttpError extends Error {
    constructor(response) {
        super();
        this.response = response;
    }
}

class UnhandledProblemTypeError extends Error {}

export { HttpError, UnhandledProblemTypeError };