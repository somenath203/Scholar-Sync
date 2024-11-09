import { AiOutlineInfo } from "react-icons/ai"; 


const NoItemsFound = ({ text, textSize }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-1 p-2 bg-violet-950 rounded-xl">

      <AiOutlineInfo className="text-4xl font-bold text-red-300" />

      <p className={`text-white ${textSize} font-semibold`}>{text}</p>

    </div>
  );
};

export default NoItemsFound;
