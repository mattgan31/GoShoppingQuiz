const addToCart = async(req, res) => {
    const { itemProducts, userId } = req.body;

    try {
        const cart = await req.context.models.cart.create();
        const createdItemProducts = [];
        for (const item of itemProducts) {
            const {prodId, qty} = item;
            const product = await req.context.models.product.findOne({ where: { prodId } });
            if (!product) {
                return res.status(404).json({error: 'Data not found'})
            }
            if (product.stock < qty) {
                return res.status(404).json({ error: 'Out of stock' });
            }
            const price = Number(product.price)

            const subTotal = qty * price;

            const itemProduct = await req.context.models.itemProduct.create({
                cartId: cart.cartId, prodId, qty, subTotal, userId
            });

            createdItemProducts.push(itemProduct);

            const newStock = product.stock - qty;
            await req.context.models.product.update({
                stock: newStock
            }, { where: { prodId } });
        }
        return res.json({createdItemProducts});
    } catch (error) {
        console.log(error);
    }

}

export default {
    addToCart
}
