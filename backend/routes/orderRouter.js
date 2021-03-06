const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { isAuth } = require("../utils");

const orderRouter = express.Router();
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.cart.shippingAddress,
        paymentMethod: req.body.cart.paymentMethod,
        itemsPrice: req.body.cart.itemsPrice,
        shippingPrice: req.body.cart.shippingPrice,
        taxPrice: req.body.cart.taxPrice,
        totalPrice: req.body.cart.totalPrice,
        user: req.user.id,
      });
      const createdOrder = await order.save();
      console.log(createdOrder);
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save()
      res.send({message:'Order Paid',order:updatedOrder})
    }else{
      res.status(404).send({message:'order not found'})
    }
  })
);

module.exports = orderRouter;
