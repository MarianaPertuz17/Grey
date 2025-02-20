import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

const Input = ({ half, handleChange, type, autoFocus, label, handleShowPassword, name }: any) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' || name === 'confirmPassword' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        } : undefined}
      />
    </Grid>
  )
}

export default Input