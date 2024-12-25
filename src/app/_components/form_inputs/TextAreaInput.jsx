import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"


const TextAreaInput = ({ label, placeholder, registerInput }) => {
  return (
    <div className="flex flex-col gap-2">

        <Label>{label}</Label>

        <Textarea 
            rows={12}
            placeholder={placeholder} 
            className='flex-1 !resize-none'
            {...registerInput}
        />

    </div>
  )
}

export default TextAreaInput;