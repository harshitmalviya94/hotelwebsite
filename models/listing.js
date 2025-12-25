const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          : v,
    },
    filename: String,
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },],
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }

  });

   listingSchema.post('findOneAndDelete', async (listing) => {
      if (listing) {
      await Review.deleteMany({_id:{$in: listing.reviews}});
      }});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
