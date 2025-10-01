import React, { useState, useEffect } from 'react'
import { FileCard } from './components/ImageCard'
import { AddFilesDialog } from './dialoges/AddImageDialog.tsx';
//@ts-ignore
import { FileContext } from '../models/fileContext.ts';
import { PreviewFile } from './components/ImagePreview.tsx';
import { FloatingButtons } from './components/FloatingButtons.tsx';
import { useParams } from 'react-router-dom';
import { Gallery } from '../models/gallery.ts';
import { getFiles, getGallery } from '../api/backend.ts';


/* 
Page where images of a gallery are displayed
*/
//http://localhost:5173/gallery/b692b01c-8f3f-4c8d-94d6-557d6b75031e
export const GalleryPage: React.FC<{ username: string, setGallery: (gallery: Gallery) => void }> = ({ username, setGallery }) => {

    const {galleryId} = useParams()
    let [filePreview, setFilePreview] = useState<FileContext | null>(null)
    let [imageUploadDialog, setImageUploadDialog] = useState(false)
    let [files, setFiles] = useState<FileContext[]>()

    function ImageUploadDialogTrigger() { setImageUploadDialog(!imageUploadDialog) }
    function filePreviewTrigger(file: FileContext | null) { setFilePreview(file) }

    //Fetch image and thumbnail URLs from the backend & convert to object
    useEffect(() => {
        getGallery(galleryId!, setGallery)
        //Add error handeling if the galleryId is not found
        getFiles(galleryId!)
    }, []);


    return (
        <>
            {
                imageUploadDialog &&
                (
                    <AddFilesDialog ImageUploadDialogTrigger={ImageUploadDialogTrigger} username={username} gallery_id={galleryId!} />
                )
            }
            {
                filePreview != null &&
                (
                    <PreviewFile file={filePreview!} filePreviewTrigger={filePreviewTrigger} />
                )
            }
            <div className=' py-12 flex justify-center w-fill'>
                <div className=" w-fit h-fit grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                    {
                        files?.map(image =>                            
                            <FileCard key={image.file_url} fileContext={image} previewFile={filePreviewTrigger} />
                        )                        
                    }
                    <FloatingButtons ImageUploadDialogTrigger={ImageUploadDialogTrigger} galleryId={galleryId!} />
                </div>
            </div>
        </>
    )
}
