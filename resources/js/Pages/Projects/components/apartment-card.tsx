import React, { FC } from "react";
import { toast } from "sonner";
import { Ap } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import useLongPress from "@/lib/use-longpres";
import { useForm } from "@inertiajs/react";

const ApartmentCard: FC<{
    ap: Ap;
    onClick: (t: string) => void;
    open: number;
}> = ({ ap, onClick, open }) => {
    const a = `${
        ap.is_booked
            ? "bg-violet-500"
            : ap.is_soled
            ? "bg-orange-500"
            : "bg-sky-500"
    }`;
    const {
        data,
        setData,
        post,
        processing,
        delete: deletE,
    } = useForm({
        open: false,
        apartment_id: ap.id,
    });
    const longPress = useLongPress({
        onLongPress: () => {
            setData("open", true);
        },
        onClick: () => {
            if (ap.is_booked || ap.is_soled) {
                onClick("cancel");
            } else {
                onClick("book");
            }
        },
    });
    const handelSubmit = () => {
        deletE(route("apartments.destroy", ap.id), {
            onSuccess: () => {
                toast.success("تم حذف الشقة بنجاح");
            },
        });
    };
    return (
        <>
            <div
                style={{ zIndex: 0 }}
                className={`rounded-lg p-1 flex items-center justify-center px-2  cursor-pointer w-[calc(95vw/7)] z-0 ${a}  hover:bg-${a}-200`}
            >
                <div
                    {...longPress}
                    className="text-gray-100   w-full flex items-center justify-center "
                >
                    <span>{ap.number}</span>
                </div>
            </div>
            <Dialog
                open={data.open}
                onOpenChange={(e) => {
                    if (!e) {
                        setData("open", false);
                    }
                }}
            >
                <DialogContent
                    className={"max-w-[15rem] rounded-xl"}
                    dir={"rtl"}
                >
                    <DialogTitle>{"حذف الشقة !!"}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <DialogFooter>
                        <Button loading={processing} onClick={handelSubmit}>
                            {"حذف"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export { ApartmentCard };
