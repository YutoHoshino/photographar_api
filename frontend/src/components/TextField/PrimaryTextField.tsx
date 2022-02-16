import { TextField } from "@material-ui/core"
import { Dispatch, memo, SetStateAction } from "react"

// interface
type Props = {
  label:         string,
  type?:         string,
  placeholder?:  string,
  value?:        string, 
  setState:      Dispatch<SetStateAction<string>>,
}

export const PrimaryTextField = memo((props: Props) => {
  return(
    <TextField 
      variant="outlined"
      margin="dense"
      required
      fullWidth
      label={props.label}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={e => props.setState(e.target.value)}
    />
  )
})