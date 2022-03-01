import { TextField } from "@material-ui/core"
import { Dispatch, memo, SetStateAction } from "react"

// interface
type Props = {
  label:         string,
  type?:         string,
  placeholder?:  string,
  defaultValue?: string, 
  setState:      Dispatch<SetStateAction<string>>,
}

export const PrimaryTextField = memo((props: Props) => {
  return(
    <TextField 
      variant="outlined"
      margin="dense"
      fullWidth
      label={props.label}
      type={props.type}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      onChange={e => props.setState(e.target.value)}
    />
  )
})