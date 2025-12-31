import axiosInstance from "../utils/axiosInstance"

export const createShortLink = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/create", { url, slug })
  return data.shortUrl
}

// Backwards compatibility alias
export const createShortUrl = createShortLink
