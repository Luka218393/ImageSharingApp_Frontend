import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { ImageCard2 } from './../components/ImageCard'
import { GrLinkNext } from "react-icons/gr";
import { FiPlus } from "react-icons/fi"
import { VideoCard2 } from "../components/VideoCard";
import { postFiles } from "../../api/backend"

/*
A dialog that allows user to select, check and upload images to the server
*/
export const AddFilesDialog: React.FC<{ ImageUploadDialogTrigger: () => void, username: string, gallery_id: string }> = ({ ImageUploadDialogTrigger, username, gallery_id }) => {

    const disableParentOnClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const [images, setImages] = useState<File[]>([])
    const [videos, setVideos] = useState<File[]>([])

    //Adds images to state
    const uploadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            console.log(files)
            setImages((prev) => [...prev, ...files.filter(file => file.type != "video/mp4")])
            setVideos((prev) => [...prev, ...files.filter(file => file.type == "video/mp4")])
        }
    };

    function removeImage(name: string) {
        let temp = images.filter(image => image.name != name)
        setImages(temp)
    }
    function removeVideo(name: string) {
        let temp = videos.filter(video => video.name != name)
        setVideos(temp)
    }


    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center overflow-y-auto py-10"
                style={{ overscrollBehaviorY: "contain" }}
                onClick={ImageUploadDialogTrigger}
            >
                <div
                    className="flex flex-col w-fit max-h-[80vh] bg-white rounded-[32px] p-6 gap-4 z-[10000] overflow-y-auto"
                    onClick={disableParentOnClick}
                >
                    <div className="w-fit h-fit grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                        {
                            images.map(
                                (image) => (<ImageCard2 key={image.name} image={image} removeImage={removeImage} />)
                            )
                        }
                        {
                            videos.map(
                                (video) => (<VideoCard2 key={video.name} video={video} removeVideo={removeVideo} />)
                            )
                        }
                    </div>
                    <div className='w-fill h-fit flex flex-row-reverse text-white justify-between'>
                        <GrLinkNext className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px"
                            onClick={() => { postFiles(images, videos, username, gallery_id); /*ImageUploadDialogTrigger()*/ }} />
                        <input
                            type="file"
                            multiple
                            accept="image/*, video/*"
                            onChange={uploadFiles}
                            className="bg-purple-300"
                            style={{ display: "none" }}
                            id="input"
                        />
                        <label htmlFor="input">
                            <FiPlus className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
