export const containerVariants = {
    hidden: {opacity:0},
    visible: {
        opacity:1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

export const itemVariants = {
    hidden: {opacity:0, y: 20},
    visible: {
        opacity:1,
        transition:{
            type: "spring",
            stiffness: 50,
            damping: 15,
            duration: 0.8,
        }
    },
}
