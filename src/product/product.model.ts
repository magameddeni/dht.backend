import { model, Schema, Types } from "mongoose"

const Product = new Schema(
  {
    regularPrice: { type: Number },
    description: { type: String },
    sku: { type: String, required: true },
    barcode: { type: Number, required: false },
    shop: { type: Types.ObjectId, ref: "Shop" },
    productName: { type: String, required: true },
    discountPrice: { type: Number, required: true },
    stock: { type: Number, default: 0, required: true },
    categories: [{ type: Types.ObjectId, ref: "Category", required: true }],
    producingCountry: { type: String, required: true },
    manufacturer: { type: String, required: true },
    brand: { type: String, required: true },
    package: {
      weight: { type: Number, required: true },
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    files: [
      {
        order: { type: Number, required: true },
        link: { type: String, required: true },
        filename: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

const product = model("Product", Product)

export default product
