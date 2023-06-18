
import { sequelize } from "../models/init-models";

const createOrder = async (req, res) => {
    const { cartId, userId } = req.body;

    const itemProducts = await req.context.models.itemProduct.findOne({ where: { cartId } });
    if (!itemProducts) {
        return res.status(404).json({ error: "Data not found" });
    }
    const sumTotalPrice = await req.context.models.itemProduct.sum('subTotal', { where: { cartId } });
    if (userId != itemProducts.userId) {
        return res.status(401).json({
            error: 'Unavailable'
        });
    }

    const [result] = await sequelize.query("select no_ord_seq()");
    const seqNum = result[0].no_ord_seq;

    const order = await req.context.models.orders.create({
        orderNo: seqNum,
        userId,
        totalPrice: sumTotalPrice,
        status: "OPEN"
    });


    return res.json({order});
}

const closeOrder = async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.body;

    const order = await req.context.models.orders.findOne({ where: { orderId } });
    if (!order) {
        return res.status(404).json({ error: "Data not found" });
    }

    if (order.status != "OPEN") {
        return res.status(401).json({ error: "Order has not OPEN" });
    }

    if (userId != order.userId) {
        return res.status(401).json({
            error: 'Unavailable'
        });
    }

    const update = await req.context.models.orders.update({ status: "CLOSE" }, { where: { orderId } });
    if (update) {
        return res.json({ message: `Order with ${orderId} ID, status changed to CLOSE` });
    }
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    const { userId, cartId } = req.body;

    const order = await req.context.models.orders.findOne({
        where: { orderId },
        include: [
          {
            model: req.context.models.users,
            as: 'user',
            where: { userId },
            include: [
              {
                model: req.context.models.itemProduct,
                    as: 'itemProducts',
                    where: { cartId }
              },
            ],
          },
        ],
      });

    // return res.json({ order });
    if (order.status != "OPEN") {
        return res.status(401).json({ error: "Order has not OPEN" });
    }

    for (const itemProduct of order.user.itemProducts) {
        const {prodId, qty} = itemProduct
        const product = await req.context.models.product.findOne({ where: { prodId } });

        const newStock = product.stock + qty;
        await req.context.models.product.update({stock: newStock}, {
            where:{prodId: product.prodId}
        })
    }

    const updateOrder = await req.context.models.orders.update({ status: "Cancelled" }, { where: { orderId } });
    if (updateOrder) {
        return res.json({ message: `Order with ${orderId} ID, status changed to Cancelled` });
    }
}

export default {
    createOrder,
    closeOrder,
    cancelOrder
}
