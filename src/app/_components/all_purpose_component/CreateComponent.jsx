import { FaPlus } from "react-icons/fa";


const CreateComponent = ({ text, setOpenDrawer, extraClasses }) => {
  return (
    <div
      className="h-52 w-60 border-2 border-white/30 rounded-xl flex flex-col gap-4 items-center justify-center hover:bg-violet-900/20 hover:cursor-pointer transition-all duration-150"
      onClick={() => setOpenDrawer(true)}
    >

      <FaPlus className="size-16" />

      <p className={extraClasses}>{text}</p>

    </div>
  );
};

export default CreateComponent;
