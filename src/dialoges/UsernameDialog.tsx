import type { Gallery } from "../../models/gallery";
import { GrLinkNext } from "react-icons/gr";


export const UsernameDialog: React.FC<{ setUsername: (username: string) => void, close: () => void, gallery: Gallery }> = ({ setUsername, close, gallery }) => {

    return (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center py-10">
            <div className="flex flex-col sm:w-[80vw] lg:w-[50vw] h-fit max-h-[80vh] bg-white rounded-[32px] p-6 gap-4 z-[10000] ">
                <h2 className="text-purple-800 font-bold text-5xl ">
                    {gallery.title}
                </h2>
                <h5 className="text-gray-700 text-sm">
                    {gallery.id}
                </h5>
                <input
                    className="bg-gray-200 rounded-md border-1 p-1"
                    placeholder="Enter your username"
                    type="text"
                    id="username"
                />
                <button onClick={() => {
                    const input = document.getElementById("username") as HTMLInputElement | null;
                    setUsername(input?.value ?? "Anon");
                    localStorage.setItem("username", input?.value ?? "Anon")
                    console.log(localStorage.getItem("username"))
                    close();
                }}>
                    <GrLinkNext className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px" />
                </button>
            </div>
        </div>
    )
}