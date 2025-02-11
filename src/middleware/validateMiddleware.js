const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.details.map((err) => err.message),
            });
        }

        next(); // ✅ If validation passes, move to next middleware/controller
    };
};

module.exports = validate;
