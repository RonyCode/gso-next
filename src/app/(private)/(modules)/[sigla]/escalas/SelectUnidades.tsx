import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/components/ui/select'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'

const SelectUnidades = ({ unidades }: { unidades?: IUnidadeSchema[] }) => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione uma unidade" />
        </SelectTrigger>
        <SelectContent>
          {unidades?.map((item, index) => (
            <SelectItem key={index} value={item?.id?.toString() ?? ''}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>{' '}
    </>
  )
}
export default SelectUnidades
