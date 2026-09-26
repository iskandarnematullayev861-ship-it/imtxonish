const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const dns = require('dns');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routerni chaqirib olish
const adminRouter = require('./routes/adminRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const cartRouter = require('./routes/cartRoutes');
const cartItemRouter = require('./routes/cart_itemRoutes');
const countryRouter = require('./routes/countryRoutes');
const customerRouter = require('./routes/customerRoutes');
const customerAddressRouter = require('./routes/customer_addressRoutes');
const customerCardRouter = require('./routes/customer_cardRoutes');
const deliveryMethodRouter = require('./routes/delivery_methodRoutes');
const discountRouter = require('./routes/discountRoutes');
const districtRouter = require('./routes/districtRoutes');
const eventRouter = require('./routes/eventRoutes');
const eventTypeRouter = require('./routes/event_typeRoutes');
const flatRouter = require('./routes/flatRoutes');
const genderRouter = require('./routes/genderRoutes');
const humanCategoryRouter = require('./routes/human_categoryRoutes');
const langRouter = require('./routes/langRoutes');
const paymentMethodRouter = require('./routes/payment_methodRoutes');
const regionRouter = require('./routes/regionRoutes');
const seatRouter = require('./routes/seatRoutes');
const seatTypeRouter = require('./routes/seat_typeRoutes');
const sectorRouter = require('./routes/sectorRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const ticketStatusRouter = require('./routes/ticket_statusRoutes');
const ticketTypeRouter = require('./routes/ticket_typeRoutes');
const typesRouter = require('./routes/typesRoutes');
const venueRouter = require('./routes/venueRoutes');
const venuePhotoRouter = require('./routes/venue_photoRoutes');
const venueTypesRouter = require('./routes/venue_typesRoutes');

// Route'larni Express ilovasiga ulash
app.use('/admin', adminRouter);
app.use('/booking', bookingRouter);
app.use('/cart', cartRouter);
app.use('/cart_item', cartItemRouter);
app.use('/country', countryRouter);
app.use('/customer', customerRouter);
app.use('/customer_address', customerAddressRouter);
app.use('/customer_card', customerCardRouter);
app.use('/delivery_method', deliveryMethodRouter);
app.use('/discount', discountRouter);
app.use('/district', districtRouter);
app.use('/event', eventRouter);
app.use('/event_type', eventTypeRouter);
app.use('/flat', flatRouter);
app.use('/gender', genderRouter);
app.use('/human_category', humanCategoryRouter);
app.use('/lang', langRouter);
app.use('/payment_method', paymentMethodRouter);
app.use('/region', regionRouter);
app.use('/seat', seatRouter);
app.use('/seat_type', seatTypeRouter);
app.use('/sector', sectorRouter);
app.use('/ticket', ticketRouter);
app.use('/ticket_status', ticketStatusRouter);
app.use('/ticket_type', ticketTypeRouter);
app.use('/types', typesRouter);
app.use('/venue', venueRouter);
app.use('/venue_photo', venuePhotoRouter);
app.use('/venue_types', venueTypesRouter);

const PORT = process.env.PORT || 3000;

// Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bacc API",
            version: "1.0.0",
            description: "Bacc API documentation for all routes.",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

// Database connection
async function connectDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection:', error.message);
    }
}

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
