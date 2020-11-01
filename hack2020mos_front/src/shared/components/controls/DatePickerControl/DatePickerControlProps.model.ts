import { Moment } from 'moment'
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel'

export interface DatePickerControlProps {
    format?: string[]
    showTime?: SharedTimeProps<Moment>
    value?: string
    onChange?: (value?: string) => void
    disabled?: boolean
    widthFull?: boolean
}
