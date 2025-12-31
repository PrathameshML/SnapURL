import Url from "../models/url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

// Persist a new shortened URL
export const saveUrl = async (shortId, longUrl, userId) => {
  try {
    const newUrl = new Url({
      full_url: longUrl,
      short_url: shortId,
    });

    if (userId) {
      newUrl.user = userId;
    }

    await newUrl.save();
  } catch (err) {
    if (err.code == 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(err);
  }
};

// Find a short id and increment its click counter atomically
export const findByShortIdAndIncrement = async (shortId) => {
  return await Url.findOneAndUpdate({ short_url: shortId }, { $inc: { clicks: 1 } });
};

// Check if a custom short id already exists
export const findByShortId = async (shortId) => {
  return await Url.findOne({ short_url: shortId });
};
