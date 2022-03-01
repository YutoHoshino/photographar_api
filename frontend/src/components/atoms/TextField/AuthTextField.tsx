import { TextField } from "@material-ui/core"
import { Dispatch, memo, SetStateAction } from "react"

// interface
type Props = {
  label:         string,
  type?:         string,
  placeholder?:  string,
  setState:      Dispatch<SetStateAction<string>>,
}

export const AuthTextField = memo((props: Props) => {

  const { 
    label, 
    type, 
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
      placeholder={placeholder}
      onChange={e => setState(e.target.value)}
    />
  )
})