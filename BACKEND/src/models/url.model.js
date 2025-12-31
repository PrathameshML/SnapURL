import mongoose from "mongoose";

// URL schema stores the original (full) URL, a short identifier, click count and optional owner
const urlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

// Model name kept generic for clarity
const Url = mongoose.model("Url", urlSchema);

export default Url;
