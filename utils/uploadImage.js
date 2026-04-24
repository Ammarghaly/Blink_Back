import AppError from "./AppError.js";

export const uploadToImgBB = async (fileBuffer) => {
  try {
    const base64Image = fileBuffer.toString("base64");

    const formData = new URLSearchParams();
    formData.append("image", base64Image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("ImgBB Error Details:", data);
      throw new AppError(data.error?.message || "Image upload failed", response.status);
    }

    if (!data?.data?.url) {
      throw new AppError("Invalid response from ImgBB", 500);
    }

    return data.data.url;
  } catch (error) {
    console.error("Upload process error:", error);
    throw error instanceof AppError ? error : new AppError("Internal Image Upload Error", 500);
  }
};
