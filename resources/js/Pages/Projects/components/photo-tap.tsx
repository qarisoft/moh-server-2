import React, {FC, useRef, useState} from 'react';
import {Btn} from "@/Components/Btn";
import {DeleteIcon, Plus, TrashIcon} from "lucide-react";
import {ImageUploader} from "@/Pages/Projects/components/image-uploader";
import {Customer, Media} from "@/types";
import Spinner from "@/Components/ui/spinner";
import {router} from "@inertiajs/react";
import {toast} from "sonner";

interface Props{cl:string,projectId:number,customers:Customer[],media:Media[]}
const PhotoTap:FC<Props> = ({cl,projectId,media}) => {

    const ref = useRef<HTMLInputElement>();
    const [pending, setPending] = useState(false);
    const [imgDel, setImgDel] = useState(0);
    const handelDelete = (id: number) => setImgDel(id);



    // const {data,setData,post}=useForm({
    //     url:''
    // })
    return (
        <>
            <div className="flex ">
                <Btn
                    a={"bg-gray-200"}
                    b={"bg-gray-50"}
                    className="aspect-square bg-gray-100 rounded-full p-1"
                    onClick={(e) => {
                        if (ref.current?.click) {
                            ref.current?.click();
                        }
                    }}
                >
                    <Plus/>
                </Btn>
                <div className="w-2"></div>

            </div>


            <div className="h-2"></div>
            <div className={cl}>
                <div className="flex flex-wrap justify-center gap-1 ">
                    <ImageUploader inpRef={ref} pId={projectId}/>
                    {media.map((img: Media, i: number) => (
                        <div
                            key={i}
                            className="relative lg:w-[calc(96%/2)] "
                        >
                            <ImgLoader mediaItm={img}/>

                            <Btn
                                a={"bg-red-400"}
                                b={"bg-red-500"}
                                disabled={pending}
                                onClick={() => {
                                    handelDelete(img.id)
                                    // console.log(img)
                                }}
                                className=" opacity-55 hover:opacity-100 absolute bg-red-400 top-0 right-0 text-gray-200 py-1 px-2  z-10 rounded"
                            >
                                <DeleteIcon/>
                            </Btn>
                        </div>
                    ))}
                </div>
            </div>

            <>
                <div
                    onClick={() => setImgDel(0)}
                    className={`h ${
                        imgDel != 0 ? "fadein" : "fadeOut"
                    } transition-all fixed z-10 top-0 right-0   justify-center items-center bg-slate-900 opacity-50  h-screen w-screen `}
                ></div>
                <div
                    className={`h ${
                        imgDel != 0 ? "fadein" : "fadeOut"
                    }  absolute bg-white z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg  px-4 py-6 pb-6`}
                >
                    <div
                        className="flex flex-col gap-1 w-56 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="flex justify-center items-center font-bold p-2 mt-2  w-fit mx-auto bg-slate-100 rounded gap-2">
                            <div className="">تاكيد الحذف</div>
                            <TrashIcon
                                color={"red"}
                                className={"text-red"}
                            />
                        </div>

                        <div className="pt-2 text-center flex justify-center items-center">
                            <Spinner loading={pending} size={3}/>
                        </div>
                        <div className="h-2"></div>
                        <div className="flex  gap-2 w-full">
                            <Btn
                                a={"bg-red-400"}
                                b={"bg-red-500"}
                                disabled={pending}
                                className="  flex-1 text-center rounded  text-gray-100  py-1"
                                onClick={() => {
                                    setPending(true);
                                    router.delete(
                                        route(
                                            "projects.delete.image",
                                            imgDel
                                        ),
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "image deleted successfully"
                                                );
                                            },
                                            onError: (e) => {
                                                toast.error(
                                                    `${Object.values(
                                                        e
                                                    )}`
                                                );
                                            },
                                            onFinish: () => {
                                                setPending(false);
                                                setImgDel(0);
                                            },
                                        }
                                    );
                                }}
                            >
                                {"تاكيد"}
                            </Btn>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};


// import React from 'react';

const ImgLoader:FC<{mediaItm:Media}> = ({mediaItm}) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className={'relative'}>
        {/*{loading?(*/}
            <img src={mediaItm.original_url} alt={'ds'} loading={'lazy'}   onLoad={()=>setLoading(false)}  className={ ''} />

        {/*):(*/}
        {/*    <img src={mediaItm.preview_url} alt={'img'}  className={`${loading?'':'opacity-0'} absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2`} />*/}

        {/*)}*/}
        </div>
    );
};

// export default ImgLoader;

export default PhotoTap;
