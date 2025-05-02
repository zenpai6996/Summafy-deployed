import {HTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";

export default function Tag(props:HTMLAttributes<HTMLDivElement>){
   const {className,children,...otherProps}= props;
    return (

        <div className={twMerge("inline-flex font-bold border cursor-pointer border-purple-400 gap-2 text-purple-400 px-3 py-1 rounded-full uppercase items-center",className)} {...otherProps}>
            <span className={"text-sm"}>&#10038;</span>
            <span>{children}</span>
            <span className={"text-sm"}>&#10038;</span>
        </div>
    )
}