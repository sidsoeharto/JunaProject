var express = require('express');
var router = express.Router();

const {foods} = require('../data/foods.js');
const {orders} = require('../data/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/foods/:query?', (req, res) => {
  const foods_r = foods();

  console.log(req.query);

  if (req.query.query != undefined) {
    const query = req.query.query.toLowerCase();
    return res.send({
      foods: foods_r.filter(
        itm =>
          itm.name.toLowerCase().includes(query)
      ),
    });
  }

  return res.send({
    foods: foods_r,
  });
});

router.post('/order', function (req,res,next) {
  const orders_r = orders();

  const data = req.body;
  // console.log(req.body);

  orders_r.push({
    order_id: data.room_id,
    table_number: data.table_number,
    items: data.items
  })

  // console.log(orders_r)

  return res.status(201).send({
    orders: orders_r
  })
})

router.get('/order/:orderId', function(req,res,next) {
  const orders_r = orders();
  
  let orderId = req.params.orderId;

  // console.log(orders_r, orderId);

  let found = orders_r.find(el => el.order_id === orderId);

  if (found) {
    return res.status(200).send({
      order: found
    })
  } else {
    return res.status(404).send({
      message: 'Not Found'
    })
  }
})

module.exports = router;
