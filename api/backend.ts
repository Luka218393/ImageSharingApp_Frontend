import { uploadFileToCloudinary } from "./cloudinary";
import { backendURL } from "./urls";

/*
Posting files to internet:
First files are being posted to cloudinary server,
then file info is being stored on django backend
*/
export async function postFiles( //add fail handling, rename link to file
  images: File[],
  videos: File[],
  username: string,
  gallery_id: string
) {
  [...images, ...videos].forEach(async (image) => {
    try {
      let [image_url, thumbnail_url] = await uploadFileToCloudinary(image);

      let formData = new FormData();
      formData.append("thumbnail_url", thumbnail_url);
      formData.append("file_url", image_url);
      formData.append("creator_name", username);
      formData.append("gallery_id", gallery_id);

      let response = await fetch(`${backendURL}/image/`, {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Upload error:", error);
    }
  });
}

//Function that downloads contents of a link
export function downloadFile(fileURL: string, name: string) {
  console.log(fileURL);
  fetch(fileURL, { mode: "cors" })
    .then((res) => res.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    })
    .catch(console.error);
}

//Fix this later
export async function deleteFile(fileId: string) {
  //add deletion of file on cloudinary
  fetch(`${backendURL}/delete/file/${fileId}/`, {
    method: "DELETE",
  }).then((response) => console.log(response));
}
