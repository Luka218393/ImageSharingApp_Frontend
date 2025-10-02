import { FiPlus } from "react-icons/fi";
import { useEffect } from "react";

/*

*/
export const FloatingButtons: React.FC<{ ImageUploadDialogTrigger: () => void, galleryId: string,  }> = ({ ImageUploadDialogTrigger, galleryId }) => {

    // let [downloadDialog, setDownloadDialog] = useState<Boolean>(false)
    // function ToggleDownloadDialog() { setDownloadDialog(!downloadDialog) }
    // function download(){}
    // function downloadAll(){
    //     downloadFile(`/`, galleryId)
    // }
    useEffect(()=>{galleryId},[])

    return (
        <div className="fixed w-fit h-fit flex flex-col gap-4 right-4 bottom-4 justify-center items-center">
            {/* <div>
                {
                    downloadDialog &&
                    (
                        <div className="bg-black/60 flex flex-col w-full gap-1 text-xl font-medium text-white rounded-2xl p-2 my-2">
                            <button className = "hover:underline cursor-pointer" onClick={downloadAll}>All</button>
                            <button className = "hover:underline cursor-pointer" onClick={download}>New</button>
                            <button className = "hover:underline cursor-pointer" onClick={download}>Select</button>
                        </div>
                    )
                }
                <button
                    onClick={ToggleDownloadDialog}
                    type="button"
                    className={
                        `w-fit h-fit p-6 cursor-pointer z-50 flex items-center justify-center rounded-full shadow-2xl transition-transform transform hover:scale-105 bg-amber-600`
                    }
                >
                    <IoMdDownload className=" text-[13vw] sm:text-[9vw] md:text-[6vw] lg:text-[5vw] text-white" />
                </button>
            </div> */}

            <button
                type="button"
                onClick={ImageUploadDialogTrigger}
                className={
                    `w-fit h-fit p-6 cursor-pointer z-50 right-40 flex items-center justify-center rounded-full shadow-2xl transition-transform transform hover:scale-105 bg-purple-800 text-white `
                }>
                <FiPlus className=" text-[13vw] sm:text-[9vw] md:text-[6vw] lg:text-[5vw] text-white" />
            </button>
        </div>
    )
}

