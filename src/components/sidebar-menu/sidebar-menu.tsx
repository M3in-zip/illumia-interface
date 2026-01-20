interface SidebarProps {
  visible: boolean;
}

/* TODO rework sidebar menu */

export const SidebarMenu = ({ visible }: SidebarProps) => {
  return (
    /* transition-all se vuoi fare più transizioni per ogni param che cambia, ad esempio colore */
    <div
      className={`
        h-screen
        bg-neutral-900 text-white
        transition-width duration-300 ease-in-out
        overflow-hidden
        ${visible ? "w-[30%]" : "w-0"}
      `}
    >
      <div className="w-[30%] p-4">
        Sidebar
      </div>
    </div>
  );
};
