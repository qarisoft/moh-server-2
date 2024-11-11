import Spinner from "@/Components/ui/spinner";
import {useForm} from "@inertiajs/react";
import {Delete, Upload} from "lucide-react";
import {FC, useEffect} from "react";
import {toast} from "sonner";
import {CaretRightIcon} from "@radix-ui/react-icons";

const ImageUploader: FC<{ pId: number; image?: string; inpRef: any }> = ({
    pId,
    image,
    inpRef,
}) => {
    const { data, setData, post, processing, progress, reset, errors,cancel } =
        useForm<{
            photo: File | null;
            uploaded: boolean;
            project_id: number;
        }>({
            photo: null,
            project_id: pId,
            uploaded: false,
        });
    const upload = () => {
        // @ts-ignore
        post(route("projects.add.photo", pId), {

            onSuccess: () => {
                setData("uploaded", true);
                reset("photo");
                toast.success("image add successfully");
            },
        });
    };
    useEffect(() => {
        if (data.photo) {
            upload();
        }
    }, [data.photo]);

    return (
        <>
            <div
                className="relative w-full flex  text-center items-start justify-cente justify-between lg:w-[calc(96%/3)] h-fit "
                style={{ display: data.photo ? "flex" : "none" }}
            >
                {data.photo ? (
                    <>
                        <img
                            className="rounded overflow-clip  "
                            src={URL.createObjectURL(data.photo)}
                        />

                        <div
                            className={`absolute  top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2  w-full h-full
                            ${progress ? " opacity-40 " : "opacity-20"}
                            `}
                        ></div>
                        <div
                            className="absolute flex top-1/2 right-1/2  translate-x-1/2
                            -translate-y-1/2 gap-1 items-center  text-slate-100"
                        >
                            {progress ? (
                                <>
                                    <Spinner
                                        loading={processing}
                                        className="text-white"
                                    />

                                    <CaretRightIcon onClick={()=>cancel()}/>
                                </>
                            ) : (
                                <>
                                    <Delete
                                        color="red"
                                        onClick={() => {
                                            reset('photo')
                                            // setData(c=>({...c,photo:null,}))
                                        }}
                                        className="cursor-pointer "
                                    />
                                    {!data.uploaded && (
                                        <Upload
                                            className="cursor-pointer"
                                            onClick={upload}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <input
                        type="file"
                        id="upload"
                        className="w-fit"
                        ref={inpRef}
                        onChange={(e) => {
                            const a = e.target.files;
                            if (a?.length) {
                                const photo = a[0];
                                setData("photo", photo);
                            }
                        }}
                        hidden
                    />
                )}
            </div>
        </>
    );
};

export { ImageUploader };
