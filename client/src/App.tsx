// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { CirclePlay } from "lucide-react";

interface Templates {
    id: string;
    title: string;
    cover_url: string;
    video_url: string;
    template_url: string;
}

function App() {
    const [templates, setTemplates] = useState<Templates[]>();
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);
    const [query, setQuery] = useState("");

    async function getTemplates() {
        setVideoUrl([]);
        setLoading(true);
        const req = await axios.get("/api/capcut" + (query ? "?query=" + query : ""));
        setTemplates(req.data);
        setLoading(false);
    }

    async function uploadIg(id: string, url: string, caption: string, template_url: string) {
        const req = await axios.post("/api/instagram", {
            id: id,
            url: url,
            caption: "INI DI UPLOAD OTOMATIS \n" + caption + "\n\n" + template_url,
        });

        console.log(req.data);
    }

    useEffect(() => {
        getTemplates();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-300 flex flex-col p-4">
            <div className="flex flex-row w-full gap-2 items-center">
                <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    className="outline-none h-8 px-2 max-w-sm w-full rounded-md bg-zinc-800 border border-zinc-700"
                />
                <button
                    onClick={getTemplates}
                    disabled={loading}
                    className="px-2 h-8 rounded-md bg-zinc-800 font-semibold border border-zinc-700 w-fit"
                >
                    GET TEMPLATE
                </button>
                {loading && <div className="h-6 w-6 bg-zinc-400 animate-spin rounded-lg"></div>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4 gap-4 w-full h-full">
                {templates?.map((v, i) => {
                    const set = () =>
                        setVideoUrl((p) => {
                            (document.getElementById("vid_" + current) as HTMLVideoElement)?.pause();
                            delete p[current];
                            setCurrent(i);
                            p[i] = v.video_url;
                            return [...p];
                        });

                    return (
                        <div
                            key={i}
                            className="flex flex-col max-w-max justify-between border w-full h-full border-zinc-700 rounded-md overflow-auto"
                        >
                            <div className="flex items-center h-full relative">
                                {!videoUrl[i] && <img src={v.cover_url} alt="" className="" />}
                                {videoUrl[i] && (
                                    <video
                                        id={"vid_" + i}
                                        src={v.video_url}
                                        loop
                                        controls
                                        autoPlay
                                        className="h-full"
                                    ></video>
                                )}
                                {!videoUrl[i] && (
                                    <div
                                        onClick={set}
                                        className="bg-zinc-900/75 cursor-pointer absolute right-1/2 translate-x-1/2 p-3 rounded-full"
                                    >
                                        <CirclePlay className="h-8 w-8" />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => uploadIg(v.id, v.video_url, v.title, v.template_url)}
                                className="h-8 px-2 bg-sky-700 font-semibold mt-2 rounded-md"
                            >
                                UPLOAD INSTAGRAM
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
