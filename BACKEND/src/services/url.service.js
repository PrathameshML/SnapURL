import { generateNanoId } from "../utils/helper.js";
import UrlModel from "../models/url.model.js"; // kept for clarity
import { findByShortId, saveUrl } from "../dao/url.dao.js";

// Create a short id for a long URL without a user
export const createShortLinkWithoutUser = async (originalUrl) => {
  const shortId = generateNanoId(7);
  if (!shortId) throw new Error("Short ID not generated");
  await saveUrl(shortId, originalUrl);
  return shortId;
};

// Create a short id where user supplies a custom slug
export const createShortLinkWithUser = async (originalUrl, userId, slug = null) => {
  const shortId = slug || generateNanoId(7);
  if (slug) {
    const exists = await findByShortId(slug);
    if (exists) throw new Error("This custom url already exists");
  }

  await saveUrl(shortId, originalUrl, userId);
  return shortId;
};
