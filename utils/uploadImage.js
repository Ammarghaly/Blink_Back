import AppError from "./AppError.js";

export const uploadToImgBB = async (fileBuffer) => {
  const base64Image = fileBuffer.toString("base64");

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    }
  );

  if (!response.ok) {
    throw new AppError("Image upload failed, please try again", 502);
  }

  const data = await response.json();

  if (!data?.data?.url) {
    throw new AppError("Image upload failed: invalid response from ImgBB", 502);
  }

  return data.data.url;
};
