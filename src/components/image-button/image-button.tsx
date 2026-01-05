interface ImageButtonProps {
    onClick: () => void;
    buttonImgSrc?: string;
    onHoverImgSrc?: string;
    className?: string;
}

export const ImageButton = ({ buttonImgSrc, onHoverImgSrc, onClick, className }: ImageButtonProps) => {
  const cssClass = className ? className + " cursor-pointer" : "cursor-pointer";
  return (
    <button onClick={onClick} className={cssClass}>
        {buttonImgSrc && <img className="h-12 pixel-art" src={buttonImgSrc} />} {/* modify height it will be a fixed value */}
    </button>
  );
};
