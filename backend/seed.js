const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Diamond Necklace',
    description: 'Elegant diamond necklace with 18k gold chain',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
    category: 'Necklaces',
    stock: 5
  },
  {
    name: 'Gold Earrings',
    description: 'Beautiful 18k gold hoop earrings',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    category: 'Earrings',
    stock: 10
  },
  {
    name: 'Silver Bracelet',
    description: 'Sterling silver charm bracelet',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    category: 'Bracelets',
    stock: 15
  },
  {
    name: 'Pearl Ring',
    description: 'Classic pearl engagement ring',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    category: 'Rings',
    stock: 8
  },
  {
    name: 'Crystal Pendant',
    description: 'Swanrkovski crystal pendant necklace',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    category: 'Necklaces',
    stock: 12
  },
  {
    name: 'Rose Gold Watch',
    description: 'Elegant rose gold wristwatch',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    category: 'Watches',
    stock: 6
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Existing products deleted');

    await Product.insertMany(sampleProducts);
    console.log('Sample products added');

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();