export const uploadImageToCloudinary = async (
  imageFile: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "food_delivery");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dbuycqez6/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();
  return result.secure_url;
};
