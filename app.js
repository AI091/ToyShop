// import express
const express = require('express');
const cors = require('cors')
const mysql = require('mysql2');
const util = require('util');

// const SwaggerUI = require('swagger-ui')

// import dotenv to read .env file
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "*", 
}))
const dbConfig = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE, 
    // port : process.env.SQL_PORT
};
console.log(dbConfig)
app.use(async (req,res,next)=>{
    let sqlConnection =await  mysql.createConnection(dbConfig);
    const sqlQuery=util.promisify(sqlConnection.execute).bind(sqlConnection)
    res.locals.sqlQuery=sqlQuery
    next()
    // console.log(pool)
    // pool.on('connection', function (_conn) {
    //     console.log(_conn)
    //     if (_conn) {
    //         res.locals.sqlQuery=_conn.query
    //         console.log('Connected the database via threadId %d!!', _conn.threadId);
    //         next()
    //         // _conn.query('SET SESSION auto_increment_increment=1');
    //     }
    // });

})


//const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
//app.use(express.static(pathToSwaggerUi))


app.get('/',(req,res)=>{
    res.redirect('/items')
})
// import routes
const itemsRoutes = require('./routes/itemRoutes');
app.use('/items',itemsRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users',userRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/cart',cartRoutes);

// // define images folder
// app.use('/images', express.static('./images'));

// // define styles folder
// app.use('/styles', express.static('./views/styles'));

// // set view engine
// app.set('view engine', 'ejs');

// // set view directory
// app.set('views', 'views');

app.listen(process.env.PORT || '3000', () => {
    console.log('Listening to port 3000..');
});
