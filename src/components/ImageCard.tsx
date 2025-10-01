import { useEffect, useState } from "react";
import { IoMdMore, IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { downloadFile } from "../../api/Functions"
import type { FileContext } from "../../models/fileContext";
import { FaPlay } from "react-icons/fa6";


/*
Conponents that display image 
*/
export const FileCard: React.FC<{ fileContext: FileContext, previewFile: (fileURL: FileContext) => void }> = ({ fileContext, previewFile }) => {

  let [dropdownVisibility, setDropdownVisibility] = useState<Boolean>(false)
  function dropdownVisibilityTrigger() { setDropdownVisibility(!dropdownVisibility) }


  async function deleteFile() {
    fetch(
      `http://127.0.0.1:8000/delete/file/${fileContext.id}/`,
      {
        method: "DELETE"
      }
    ).then(response => console.log(response))

  }

  return (
    <div className="w-[320px] h-fit relative flex flex-col"  onClick={() => previewFile(fileContext)}>
      {/* Add play traingle to video files */}
      {fileContext.extension == ".mp4" &&
        <button className="text-white cursor-pointer absolute z-5 top-24 self-center">
          <FaPlay size="60px" />
        </button>}

      <img src={fileContext.thumbnail_url} className=" cursor-pointer object-cover w-[320px] h-[240px] drop-shadow-xl/20 rounded-lg z-0 " onClick={() => previewFile(fileContext)}></img>

      {/* More functions with image (dropdown) */}
      <div>
        <button onClick={dropdownVisibilityTrigger} className=" cursor-pointer absolute top-2 left-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
          <IoMdMore size="32px" />
        </button>
        {dropdownVisibility &&
          (
            <div className="bg-black/45 absolute top-15 left-2 text-white p-2 rounded-md font-medium flex flex-col">
              <button onClick={deleteFile} className="text-red-500 cursor-pointer hover:underline">Delete</button>
            </div>
          )
        }
      </div>

      {/* Downolad function button */}
      <button onClick={() => downloadFile(fileContext.file_url, fileContext.creator_name)} className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoMdDownload size="32px" />
      </button>

      {/* Creator name and new badge */}
      <div className="flex flex-row w-fill px-6 py-2 justify-between">
        <h4 className="text-lg font-semibold">
          {fileContext.creator_name}
        </h4>
        {
          (Number(localStorage.getItem("last_accessed"))) < fileContext.created &&
          <div className="text-purple-600 text-lg">
            New
          </div>
        }
      </div>
    </div>
  )
}

export const ImageCard2: React.FC<{ image: File, removeImage: (name: string) => void }> = ({ image, removeImage }) => {

  return (

    <div className="w-[320px] h-fit relative">
      <img src={URL.createObjectURL(image)} loading="lazy" className=" cursor-pointer object-cover w-[320px] h-[240px] drop-shadow-xl/20 rounded-lg z-0 "></img>

      <button onClick={() => removeImage(image.name)} className=" text-white cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full  hover:bg-black/70 transition">
        <IoClose size="32px" />
      </button>
    </div>
  )
}
