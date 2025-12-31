import { findByShortId } from "../dao/url.dao.js";
import { createShortLinkWithUser, createShortLinkWithoutUser } from "../services/url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// Create a short link. If user is authenticated, create under user account.
export const createShortLink = wrapAsync(async (req, res) => {
  const { url: originalUrl, slug } = req.body;
  let shortId;

  if (req.user) {
    shortId = await createShortLinkWithUser(originalUrl, req.user._id, slug);
  } else {
    shortId = await createShortLinkWithoutUser(originalUrl);
  }

  // Keep API response key compatible with existing clients
  res.status(200).json({ shortUrl: process.env.APP_URL + shortId });
});

// Redirect a short id to its stored full URL
export const redirectToOriginal = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await findByShortId(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});
