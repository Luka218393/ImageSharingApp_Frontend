import { uploadImageToCloudinary } from "./cloudinary";
import { backendURL } from "./urls";

export async function postFiles(
  images: File[],
  videos: File[],
  username: string,
  gallery_id: string
) {
  images.forEach(async (image) => {
    try {
      let [image_url, thumbnail_url] = await uploadImageToCloudinary(image);

      let formData = new FormData();
      formData.append("thumbnail_url", thumbnail_url);
      formData.append("file_url", image_url);
      formData.append("creator_name", username);
      formData.append("gallery_id", gallery_id);

      let response = await fetch(`${backendURL}/image/`, {
        method: "POST",
        body: formData,
      });

      console.log(await response.json()); //Add confirmation dialog
    } catch (error) {
      console.error("Upload error:", error);
    }

    //Upload videos later
    // videos.forEach(
    //     async video => {
    //         let formData = new FormData()
    //         formData.append("video", video)
    //         formData.append("creator_name", username)
    //         formData.append("gallery_id", gallery_id)
    //         try {
    //             let response = await fetch("http://127.0.0.1:8000/video/",
    //                 {
    //                     method: "POST",
    //                     body: formData
    //                 }
    //             )
    //             console.log(await response.json())//Add confirmation dialog
    //         }
    //         catch (e) { console.error(e) }
    //     }
    // )
  });
}

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

export async function deleteFile(fileId: string) {
  //add deletion of file on cloudinary
  fetch(`${backendURL}/delete/file/${fileId}/`, {
    method: "DELETE",
  }).then((response) => console.log(response));
}
