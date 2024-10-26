"use client"

import {useTheme} from "next-themes"
import {Toaster as Sonner} from "sonner"
import {cn} from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({...props}: ToasterProps) => {
    const {theme = "light"} = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}

  
            className={cn("toaster group", props.className)}
            toastOptions={{

                classNames: {
                    icon: '',
                    toast:
                        "group  toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg ar",
                    description: "group-[.toast]:text-muted-foreground px-2",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
            {...props}
        />
    )
}

export {Toaster}
