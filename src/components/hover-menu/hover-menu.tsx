interface HoverMenuProps {
    onClick?: () => void;
}

export const HoverMenu = ({ onClick }: HoverMenuProps) => {
  return (
    /* 
    CONTENITORE PRINCIPALE
      - relative → riferimento per il posizionamento del menu
      - inline-block → prende solo la larghezza dell’immagine
      - group → permette l’uso di group-hover sui figli
    */
    <div className="relative inline-block group">
      {/* Image trigger */}
      <img
        src="/images/about-icon.png"
        alt="About Menu"
        className="h-12 cursor-pointer pixel-art" /* block → rimuove lo spazio inline sotto l’immagine */
        onClick={onClick}
      />

      {/* Dropdown */}

      {/* MENU A TENDINA
        - absolute → fuori dal flusso normale
        - left-0 → allineato a sinistra dell’immagine
        - top-full → subito sotto l’immagine
        - mt-2 → spazio verticale (8px)
        - w-full → stessa larghezza dell’immagine, w-auto si allarga in base al contenuto */}
      <div
        className="
          absolute left-0 top-full mt-2 w-auto
          shadow-lg
          opacity-0 invisible
          translate-y-[-8px]
          transition-all duration-200 ease-out
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
        "
      >
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Profileeeeeeeeeeeeeeeeeeeeeeeeeee
        </div>
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Settings
        </div>
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</div>
      </div>
    </div>
  );
};
