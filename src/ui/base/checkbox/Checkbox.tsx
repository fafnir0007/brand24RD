import {useState} from 'react'
import { Checkbox } from '@mantine/core';
import useStyles from './CheckboxCss'

type CheckboxProps = {
    id: number,
    label: string,
    disabled: boolean,
    isChecked: boolean,
    onChangeCheckBox:  any //#TODO change to correct type
}


const CheckboxBase = ({id, label, disabled, isChecked, onChangeCheckBox, ...props}: CheckboxProps) => {

    const checkBoxColor = 'indigo'
    const [checked, setChecked] = useState(isChecked);

    const { classes } = useStyles();

    const handleChecked = (label:string) => () : void => {
        setChecked(!checked)
        onChangeCheckBox(id)
    }
    
    return (
    <Checkbox
      className={classes.checkbox}
      label={label}
      color={checkBoxColor}
      checked={checked}
      disabled={disabled}
      onChange={handleChecked(label)}
      {...props}
    />
  );
}

export default CheckboxBase

