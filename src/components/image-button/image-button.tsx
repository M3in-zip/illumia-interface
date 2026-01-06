interface ImageButtonProps {
    onClick: () => void;
    background?: string;
    onHoverImgSrc?: string;
    className?: string;
    heightClass?: string; // we keep height fixed if you want
    text?: string;
    icon?: string;
    iconPosition?: "left" | "right";
}

export const ImageButton = ({
    background,
    onHoverImgSrc,
    onClick,
    className,
    heightClass = "h-12",
    text,
    icon,
    iconPosition = "left",
}: ImageButtonProps) => {
    const cssClass = [
        "relative",
        "cursor-pointer",
        "flex items-center justify-center",
        "rounded-xl",
        "overflow-hidden",
        "border-2",
        "border-[#fde2ab]",
        "px-4",
        heightClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button onClick={onClick} className={cssClass}>
            {background && (
                <img
                    className="absolute top-0 left-1/2 h-full w-auto -translate-x-1/2 object-cover pixel-art"
                    src={background}
                />
            )}
            {(icon || text) && (
                <span className="relative z-10 flex items-center">
                    {icon && iconPosition === "left" && <span>{icon}</span>}
                    {text && <span className="text-[#fde2ab] font-bold">{text}</span>}
                    {icon && iconPosition === "right" && <span>{icon}</span>}
                </span>
            )}
        </button>
    );
};
