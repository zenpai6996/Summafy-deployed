import { HTMLAttributes } from "react";
import {cva} from "class-variance-authority";

const classes = cva('border  h-12 rounded-full px-6 font-medium ',{
    variants:{
        variant:{
            primary:'bg-[#8F87F1] text-neutral-950 border-line-400',
            secondary:'border-white text-white bg-transparent hover:bg-white/10',
        }
    }
})
export default function Button2(props:{variant:"primary"|"secondary"}&HTMLAttributes<HTMLButtonElement>){

    const {variant,className,...otherProps} = props;
    return <button
        className={classes({
             variant,
             className,
        })}{...otherProps}/>
}