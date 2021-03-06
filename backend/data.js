const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      username: "elie",
      email: "elie.azzi.email@gmail.com",
      password: bcrypt.hashSync("qweqwe", 10),
      isAdmin: true,
    },
    {
      username: "qweqwe",
      email: "qwewqe@gmail.com",
      password: bcrypt.hashSync("qweqwe", 10),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      brand: "Nike",
      rating: 4.5,
      reviews: 10,
      description: "high quality",
      count: 10,
    },
    {
      name: "Adiddas Fit Shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 100,
      brand: "Adiddas",
      rating: 4,
      reviews: 10,
      description: "high quality",
      count: 12,
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image: "/images/p3.jpg",
      price: 140,
      brand: "nike",
      rating: 5,
      reviews: 10,
      description: "high quality",
      count: 20,
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 122,
      brand: "Nike",
      rating: 3,
      reviews: 10,
      description: "high quality",
      count: 0,
    },
    {
      name: "Puma Slim Pant",
      category: "Pants",
      image: "/images/p5.jpg",
      price: 44,
      brand: "Puma",
      rating: 4.5,
      reviews: 10,
      description: "high quality",
      count: 15,
    },
    {
      name: "Adiddas Fit Pant",
      category: "Pants",
      image: "/images/p6.jpg",
      price: 133,
      brand: "Adiddas",
      rating: 5,
      reviews: 10,
      description: "high quality",
      count: 16,
    },
  ],
};

module.exports = data;
