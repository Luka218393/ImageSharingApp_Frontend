import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import ReactPlayer from 'react-player'


export const VideoCard2: React.FC<{ video: File, removeVideo: (name: string) => void }> = ({ video, removeVideo }) => {
    return (
        <div className="w-[320px] h-fit relative flex flex-col">
            <button className="text-white cursor-pointer absolute z-200 top-24 self-center">
                <FaPlay size="60px" />
            </button>

            <ReactPlayer
                muted={true}
                width="320px"
                height="240px"
                controls={false}
                autoPlay={false}
                className=" cursor-pointer object-cover drop-shadow-xl/20 rounded-lg z-0 "
                src={URL.createObjectURL(video)} />

            <button onClick={() => removeVideo(video.name)} className=" text-white cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full  hover:bg-black/70 transition">
                <IoClose size="32px" />
            </button>
        </div>)
}