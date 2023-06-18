import express from 'express';
import models, { sequelize } from './models/init-models';
import cartControllers from './controllers/cartControllers';
import seeder from './seeder/indexSeeder';
import orderControllers from './controllers/orderControllers';
// import routes from './routes/indexRoutes';

const port = process.env.PORT || 3000 || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = { models }
    next();
});



app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: "Welcome to GoShoppingApp"
    })
});

app.post('/cart', cartControllers.addToCart);
app.post('/order', orderControllers.createOrder);
app.post('/order/:orderId/close', orderControllers.closeOrder);
app.post('/order/:orderId/cancel', orderControllers.cancelOrder);


const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);

        seeder.seederCategories.seedCategories();
        seeder.seederProducts.seedProducts();
        seeder.seederUsers.seedUsers();
    })
})

export default app;
