import { TextField } from "@material-ui/core"
import { Dispatch, memo, SetStateAction } from "react"

// interface
type Props = {
  label:         string,
  type?:         string,
  value?:        string, 
  placeholder?:  string,
  setState:      Dispatch<SetStateAction<string>>,
}

export const AuthTextField = memo((props: Props) => {

  const { 
    label, 
    type, 
    value,
    placeholder, 
    setState,
  } = props

  return(
    <TextField 
      variant="outlined"
      margin="dense"
      required
      fullWidth
      label={label}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => setState(e.target.value)}
    />
  )
})