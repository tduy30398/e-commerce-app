const mongoose = require("mongoose");
const Product = require("./Product");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent duplicate review from same user on same product
// reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to recalc avg rating + numReviews
reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    rating: stats.length > 0 ? stats[0].avgRating : 0,
    numReviews: stats.length > 0 ? stats[0].numReviews : 0,
  });
};

// Middleware: after save
reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.product);
});

// Middleware: after remove
reviewSchema.post("deleteOne", { document: true, query: false }, async function () {
  await this.constructor.calcAverageRating(this.product);
});

// Middleware: after update
reviewSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.product);
  }
});

module.exports = mongoose.model("Review", reviewSchema);
