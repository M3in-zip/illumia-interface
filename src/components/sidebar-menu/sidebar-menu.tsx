interface SidebarProps {
  visible: boolean;
}

export const SidebarMenu = ({ visible }: SidebarProps) => {
  return (
    /* transition-all se vuoi fare più transizioni per ogni param che cambia, ad esempio colore */
    <div
      className={`
        h-screen
        bg-neutral-900 text-white
        transition-width duration-300 ease-in-out
        overflow-hidden
        ${visible ? "w-[250px]" : "w-0"}
      `}
    >
      <div className="w-[250px] p-4">
        Sidebar
      </div>
    </div>
  );
};
