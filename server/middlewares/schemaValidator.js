function validateRequest(schema) {
    return function(req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            res.status(400).send(msg);
        } else {
            next();
        }
    }
}
module.exports.validateRequest = validateRequest;