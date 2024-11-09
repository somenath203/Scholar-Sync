import { Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const SelectInput = ({ label, placeholder, name, control }) => {
  return (
    <div className="flex flex-col gap-2">

      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field}) => (
          <Select onValueChange={field.onChange} {...field}>

            <SelectTrigger className="flex-1">

              <SelectValue placeholder={placeholder} />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="Class 10 or below">Class 10 or below</SelectItem>

              <SelectItem value="Class 10 + 2">Class 10 + 2</SelectItem>

              <SelectItem value="Undergraduate Degree">Undergraduate Degree</SelectItem>
              
              <SelectItem value="Postgraduate Degree">Postgraduate Degree</SelectItem>

            </SelectContent>

          </Select>
        )}
      />

    </div>
  )
}

export default SelectInput;