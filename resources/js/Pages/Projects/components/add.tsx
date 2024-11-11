import React, { FC, useCallback, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

import { Btn } from "@/Components/Btn";
import { toast } from "sonner";

type F = {
    id: number;
    number: number;
    apartments: Ap[];
};
type Ap = {
    id: number;
    floor_id: number;
    is_booked: number;
    is_soled: number;
    info: string;
    number: number;
    rooms: number;
    rent_price: number;
    sell_price: number;
    created_at: string;
    updated_at: string;
    laravel_through_key: number;
};

type Media = {
    id: number;
    preview_url: string;
    original_url: string;
};

type A = {
    id: number;
    floor: number;
    apartments: number;
};

const Add: FC<{ id: number }> = ({ id }) => {
    const { data, processing, setData, reset, post, errors, isDirty } =
        useForm<{ items: A[] }>({
            items: [],
        });
    const onSubmit = () => {
        post(route("projects.add.floor-ap", id), {
            onSuccess: () => {
                toast.success("تم الاضافة بنجاح  ");
                close1(false);
            },
        });
    };
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const close1 = (o: boolean) => {
        reset("items");
        setOpen(o);
    };

    const onOpen = useCallback(
        (o: boolean) => {
            if (!o) {
                if (isDirty) {
                    setOpen2(true);
                } else {
                    close1(o);
                }
            } else {
                close1(o);
            }
        },
        [isDirty, setOpen2, close1]
    );
    const plus = (item: A, { f = false, ap = false, minus = false }) => {
        setData((c) => ({
            ...c,
            items: c.items.map((itm, i) => {
                if (itm.id === item.id) {
                    if (f) {
                        if (minus) {
                            if (itm.floor > 1) itm.floor--;
                        } else {
                            itm.floor++;
                        }
                    } else {
                        if (minus) {
                            if (itm.apartments > 0) itm.apartments--;
                        } else {
                            itm.apartments++;
                        }
                    }
                }
                return itm;
            }),
        }));
    };
    const Box = ({ item, f }: { item: A; f?: boolean }) => (
        <div className="flex-1 flex justify-between border p-1 rounded-md items-center bg-gray-00">
            <Btn
                rounded
                className={"size-5"}
                children={
                    <Plus size={"15"} onClick={() => plus(item, { f })} />
                }
            />

            <div className="flex-1 text-center">
                {f ? item.floor : item.apartments}
            </div>
            <Btn
                rounded
                className={"size-5 "}
                children={
                    <Minus
                        className={"w-4"}
                        onClick={() => plus(item, { f, minus: true })}
                    />
                }
            />

            <div className=" flex-1 text-center">{f ? "ط" : "ش"}</div>
        </div>
    );
    return (
        <>
            <Dialog open={open2}>
                <DialogContent dir={"rtl"} className={"max-w-fit rounded "}>
                    <DialogDescription>
                        <span className={"font-xs"}>هل تريد الغاء الأنشاء</span>
                    </DialogDescription>
                    <DialogTitle>
                        <div className=" text-center">تاكيد الالغاء</div>
                    </DialogTitle>
                    <DialogFooter className={"flex"}>
                        <div className="flex justify-center pt-2 gap-4">
                            <Button
                                onClick={() => {
                                    setOpen2(false);
                                }}
                                variant={"outline"}
                            >
                                الغاء
                            </Button>
                            <Button
                                onClick={() => {
                                    close1(false);
                                    setOpen2(false);
                                }}
                            >
                                تاكيد
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog onOpenChange={onOpen} open={open} modal>
                <DialogTrigger>
                    <Btn
                        onClick={() => setOpen(true)}
                        className={`rounded-full text-gray-700`}
                    >
                        <Plus />
                    </Btn>
                </DialogTrigger>

                <DialogContent className={"p-4 w-[90%]  rounded"} dir={"rtl"}>
                    <DialogDescription>
                        انشاء شقق جديدة للمشروع{" "}
                    </DialogDescription>
                    <DialogHeader>
                        <DialogTitle>اضافة مشروع جديد</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-1 p-4">
                        <div className="flex justify-between pt-2">
                            <div className="flex gap-2 pb-2 items-center">
                                <div className="">الطوابق</div>
                                {errors.items && <span>{errors.items}</span>}
                                <Btn
                                    rounded
                                    onClick={() =>
                                        setData((c) => ({
                                            ...c,
                                            items: [
                                                ...c.items,
                                                {
                                                    floor: 1,
                                                    apartments: 1,
                                                    id: c.items.length,
                                                },
                                            ],
                                        }))
                                    }
                                >
                                    <Plus
                                        size={20}
                                        className={"my-auto -gray-600"}
                                    />
                                </Btn>
                            </div>
                            <div className="flex">
                                <div className="">{data.items.length}</div>
                            </div>
                        </div>

                        <div className=" space-y-1 max-h-[20vh] sm:max-h-[15vh]  min-h-2  overflow-y-auto  rounded-md ">
                            <table className={"w-full "}>
                                <tbody
                                    className={"max-h-[10vh] overflow-y-auto"}
                                >
                                    {data.items.map((item, i) => (
                                        <tr key={i} className={"group"}>
                                            <td className={"bg-gray-00  h-fit"}>
                                                <Btn
                                                    a={""}
                                                    b={""}
                                                    onClick={() =>
                                                        setData((c) => ({
                                                            ...c,
                                                            items: c.items.filter(
                                                                (it) =>
                                                                    it.id !=
                                                                    item.id
                                                            ),
                                                        }))
                                                    }
                                                    children={
                                                        <Trash2
                                                            size={14}
                                                            className={
                                                                "text-red-500 "
                                                            }
                                                        />
                                                    }
                                                />
                                            </td>

                                            <td className={"bg-gray-00"}>
                                                <Box item={item} f />
                                            </td>
                                            <td>
                                                <Box item={item} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <DialogFooter>
                        <div className="flex w-full">
                            <Button
                                loading={processing}
                                onClick={onSubmit}
                                className={"w-full flex-1"}
                            >
                                save
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export { Add };
