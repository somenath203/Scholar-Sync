import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const NormalInput = ({ label, type, placeholder, registerInput }) => {
  return (
    <div className="flex flex-col gap-2">

        <Label>{label}</Label>

        <Input 
            type={type}
            placeholder={placeholder} 
            className='flex-1'
            {...registerInput}
        />

    </div>
  )
}

export default NormalInput;