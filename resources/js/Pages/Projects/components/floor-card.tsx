import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { F } from "@/types";
import { useForm } from "@inertiajs/react";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

const FloorCard = ({ children, fl }: PropsWithChildren<{ fl: F }>) => {
    const [visible, setVisible] = useState<boolean>(true);
    const { data, post, processing, setData, reset } = useForm(
        "create_apartment",
        {
            floor_id: fl.id,
            open: false,
        }
    );
    const m = "تم اضافة شقة جديدة في الطابق ";
    const handelSubmit = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        post(route("floors.store"), {
            onSuccess: () => {
                toast.success(`${fl.number} ${m}`);
                reset("open");
            },
        });
    }, []);
    return (
        <>
            <div key={fl.id} className={"flex-1 cursor-pointe   z-50  "}>
                <div
                    // onClick={() => setVisible(c => !c)}
                    className=" sticky w-[98%]  flex top-0 ring-0 bg-blue-00 justify-between  shadow bg-gray-50 p-2 m-1"
                >
                    <div className="flex gap-4 items-center h-7">
                        <div className="">
                            {"الطابق "}: {fl.number}
                        </div>
                        <Dialog
                            open={data.open}
                            onOpenChange={(e) => setData("open", e)}
                        >
                            <DialogTrigger onClick={(e) => e.stopPropagation()}>
                                <div className="rounded-full bg-gray-200 p-1 ">
                                    <Plus size={20} />
                                </div>
                            </DialogTrigger>
                            <DialogContent
                                dir={"rtl"}
                                className={"w-fit  rounded-xl"}
                            >
                                <div className="min-w-[10rem]"></div>
                                <DialogDescription>{"اضافة"}</DialogDescription>
                                <DialogTitle>{"أضافة شقة جديدة"}</DialogTitle>
                                <div className="h-2"></div>
                                <DialogFooter>
                                    <Button
                                        loading={processing}
                                        onClick={handelSubmit}
                                    >
                                        {"تاكيد"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className={"ms-auto items-center flex"}>
                        {visible ? (
                            <ChevronDown size={20} />
                        ) : (
                            <ChevronLeft size={20} />
                        )}
                    </div>
                </div>
                <div
                    className={`w-full justify-start gap-2   flex flex-wrap p-1 ${
                        visible ? "" : "hidden"
                    }`}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export { FloorCard };
