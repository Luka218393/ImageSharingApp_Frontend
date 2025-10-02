import type { FileContext } from "../../models/fileContext"
import ReactPlayer from 'react-player';

/*
Shows a preview of the image or video
*/
export const PreviewFile: React.FC<{ file: FileContext, filePreviewTrigger: (imageURL: FileContext | null) => void }> = ({ file, filePreviewTrigger }) => {

    if (file.extension != ".mp4") {
        return (
            <div onClick={() => filePreviewTrigger(null)} className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
                <img
                    src={file.file_url}
                    alt={"preview"}
                    className="max-w-full max-h-full object-contain p-10"
                />
            </div>

            //Add magnifying glass
        )
    }
    else {
        return (
            <div onClick={() => filePreviewTrigger(null)} className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
                <div className="max-w-[80%] max-h-[100%] object-contain p-5 z-70">
                    {/* fix changing time, add preattier buttons, add next and previous buttons, fix exiting the preview mode */}
                    <ReactPlayer
                        src={file.file_url}
                        playing={true}
                        loop={true}
                        controls={true}
                        volume={1}
                        style={{
                            maxHeight: "80vh",
                            maxWidth: "80vw",
                            width:"100%",
                            height:"100%"
                        }}
                    /> 
                </div>
            </div>
        )
    }
}