import { useState } from "react";
import { FC } from "react";

const ProjectDetails: FC<{
    processing: boolean;
    data: { name: string; description: string };
    setData: (a: string, b: string) => void;
}> = ({ data, processing, setData }) => {
    // const data = form.data

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData("name", e.target.value);
    };
    const handelChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData("description", e.target.value);
    };
    const [d, setD] = useState(false);
    return (
        <>
            <div className="w-full flex flex-col items-start p-2 gap-2">
                <label className="font-bold my-2 w-full">{"اسم المشروع"}</label>
                <input
                    value={data.name}
                    onChange={handelChange}
                    className="rounded focus:ring-0"
                    type={"text"}
                />

                <label className="font-bold my-2">{"الوصف "}</label>
                <textarea
                    value={data.description}
                    onChange={handelChange2}
                    className="rounded w-full focus:ring-0"
                />

                <div className="mt-auto">
                    <button
                        className={`bg-blue-500 rounded text-gray-50    px-4 py-1 ${
                            d ? "bg-blue-400" : ""
                        }`}
                        onMouseDown={() => setD(true)}
                        onMouseUp={() => setD(false)}
                        disabled={processing}
                    >
                        save
                    </button>
                </div>
            </div>
        </>
    );
};

export { ProjectDetails };
