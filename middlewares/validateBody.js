const { httpError } = require("../helpers/");

const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(httpError(400, error.message));
        }
        next();
    };
};

module.exports = validateBody;