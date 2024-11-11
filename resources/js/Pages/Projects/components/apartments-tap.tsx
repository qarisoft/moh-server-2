import React, {FC, useCallback} from 'react';
import {Add} from "@/Pages/Projects/components/add";
import {Customer, F} from "@/types";
import {FloorCard} from "@/Pages/Projects/components/floor-card";
import {ApartmentCard} from "@/Pages/Projects/components/apartment-card";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle} from "@/Components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/ui/taps";
import {Input} from "@/Components/ui/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Button} from "@/Components/ui/button";
import {useForm} from "@inertiajs/react";
import {toast} from "sonner";

interface Props{cl:string,floors:F[],projectId:number,customers:Customer[]}
const ApartmentsTap:FC<Props> = ({floors,cl,projectId,customers}) => {
    const {data, setData, post, processing, errors, reset, clearErrors} =
        useForm("sell-book", {
            project_id: projectId,
            customer_id: "",
            type: "book",
            apartment_id: 0,
            create_customer: "1",
            name: "",
            address: "",
            phone: "",
        });

    const closeDialog = useCallback(() => {
        reset("customer_id", "create_customer", "apartment_id");
        clearErrors();
    }, []);
    const handelClick = (e: any) => {
        const path = `projects.${data.type}`;
        post(route(path, data.apartment_id), {
            onSuccess: () => {
                closeDialog();
                toast.success("Event has been created.");
            },
            onError: (e) => {
                console.log(e);
                toast.error(`${Object.values(e)}`);
            },
        });
    };

    return (
        <>
            <div className="w-full  flex-1 flex justify-between items-center  p-[4px]  h-[40px]   -top-0">
                <Add id={projectId}/>

                <div className="flex gap-2 text-xs justify-self-end items-center ">
                    <div className="">متاح</div>
                    <span className="size-4 rounded-full bg-sky-500"></span>
                    <div className="">محجوز</div>
                    <span className="size-4 rounded-full bg-violet-500"></span>
                    <div className="">مبيوع</div>
                    <span className="size-4 rounded-full bg-orange-500"></span>
                </div>
            </div>

            <div className={cl}>
                <div className="flex flex-col bg-blue-00 ">
                    {floors.map((fl: F) => (
                        <FloorCard fl={fl} key={fl.id}>
                            {fl.apartments.map((ap) => (
                                <ApartmentCard
                                    open={data.apartment_id}
                                    onClick={()=> {
                                        setData((c) => ({
                                            ...c,
                                            apartment_id: ap.id,
                                            type:
                                                ap.is_booked ||
                                                ap.is_soled
                                                    ? "cancel"
                                                    : "book",
                                            customer_id:
                                            c.customer_id,
                                        }))
                                    }}
                                    ap={ap}
                                    key={ap.id}
                                />
                            ))}
                        </FloorCard>
                    ))}
                </div>
                <Dialog
                    open={data.apartment_id != 0}
                    onOpenChange={(e) => {
                        if (!e) {
                            closeDialog();
                        }
                    }}
                >
                    <DialogContent
                        dir={"rtl"}
                        className={"max-w-fit  rounded-3xl"}
                    >
                        <DialogDescription></DialogDescription>

                        {data.type != "cancel" ? (
                            <>
                                <DialogTitle
                                    className={
                                        "min-w-[20rem] text-center"
                                    }
                                >
                                    <label className="  text-center ">
                                        {"العملية"}
                                    </label>
                                </DialogTitle>
                                <Tabs
                                    defaultValue={data.type}
                                    onValueChange={(e) =>
                                        setData("type", e)
                                    }
                                    className="text-center"
                                    dir={"rtl"}
                                >
                                    <TabsList>
                                        <TabsTrigger value="sell">
                                            {"بيع"}
                                        </TabsTrigger>
                                        <TabsTrigger value="book">
                                            {"حجز"}
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">
                                        Make changes to your account
                                        here.
                                    </TabsContent>
                                    <TabsContent value="password">
                                        Change your password here.
                                    </TabsContent>
                                </Tabs>

                                <label className="  ">
                                    {"العميل"}
                                </label>
                                <Tabs
                                    defaultValue={
                                        data.create_customer
                                    }
                                    className="pt-1"
                                    dir={"rtl"}
                                    onValueChange={(e) =>
                                        setData(
                                            "create_customer",
                                            e
                                        )
                                    }
                                >
                                    <TabsList>
                                        <TabsTrigger value="1">
                                            {"جديد"}
                                        </TabsTrigger>
                                        <TabsTrigger value="0">
                                            {"سابق"}
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="1">
                                        <Input
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.name}
                                            label={"الاسم"}
                                        />
                                        <Input
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.address}
                                            label={"العنوان"}
                                        />
                                        <Input
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.phone}
                                            label={"الهاتف"}
                                        />
                                    </TabsContent>
                                    <TabsContent value="0">
                                        <Select
                                            dir={"rtl"}
                                            onValueChange={(e) =>
                                                setData(
                                                    "customer_id",
                                                    e
                                                )
                                            }
                                            defaultValue={
                                                data.customer_id
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="اختار العميل"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customers.map(
                                                    (c) => (
                                                        <SelectItem
                                                            value={c.id.toString()}
                                                            key={
                                                                c.id
                                                            }
                                                        >
                                                            {c.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </TabsContent>
                                </Tabs>

                                <div className="h-2"></div>
                                <Button
                                    loading={processing}
                                    onClick={handelClick}
                                >
                                    {"تاكيد"}
                                </Button>
                            </>
                        ) : (
                            <>
                                <DialogTitle
                                    className={
                                        "text-center min-w-[10rem]"
                                    }
                                >
                                    تعيين كـ متاح !!
                                </DialogTitle>
                                <DialogFooter className={""}>
                                    <Button
                                        loading={processing}
                                        onClick={handelClick}
                                    >
                                        {"تاكيد"}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default ApartmentsTap;
