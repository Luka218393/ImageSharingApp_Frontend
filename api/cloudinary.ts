
//Uploads image to cloudinary returns image URL and thumbnailURL
export async function uploadImageToCloudinary(image: File): Promise<string[]> {
  let formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "image_sharing_app");

  let response = await fetch(
    "https://api.cloudinary.com/v1_1/duichcv8n/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  let data = await response.json();

  //Creates new url with thumbnail dimnsions in it
  let parts = data.url.split("/");
  parts.splice(6, 0, "w_640,h_480,c_fill");
  let thumbnail_url = parts.join("/");

  return [data.url, thumbnail_url];
}
