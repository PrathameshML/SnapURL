import express from 'express';
import { createShortLink } from '../controller/url.controller.js';
const router = express.Router();

// POST / - create a new short link
router.post('/', createShortLink);

export default router;
