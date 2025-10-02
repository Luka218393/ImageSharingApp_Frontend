//Uploads files to cloudinary returns file URL and thumbnail URL
export async function uploadFileToCloudinary(file: File): Promise<string[]> {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "image_sharing_app");

  let response = await fetch(
    "https://api.cloudinary.com/v1_1/duichcv8n/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  let data = await response.json();
  let thumbnail_url;

  //Creates new url with thumbnail dimnsions in it, seperate for videos and images
  if (data.url.endsWith(".mp4")) {
    let parts = data.url.split("/");
    parts.splice(6, 0, "w_640,h_480,c_fill,vs_auto,q_auto:best");
    thumbnail_url = parts.join("/");
    parts = thumbnail_url.split(".");
    parts[3] = "jpg";
    thumbnail_url = parts.join(".");
  } else {
    let parts = data.url.split("/");
    parts.splice(6, 0, "w_640,h_480,c_fill");
    thumbnail_url = parts.join("/");
  }

  return [data.url, thumbnail_url];
}
