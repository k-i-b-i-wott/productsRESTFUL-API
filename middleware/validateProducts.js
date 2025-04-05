function validateProducts(req, res, next) {
    const { productTitle, productDescription, unitsLeft, pricePerUnit } =
        req.body;
    if (
        !productTitle ||
        !productDescription ||
        !unitsLeft ||
        !pricePerUnit
    ) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
        });
    }
    next();
}
export default validateProducts;