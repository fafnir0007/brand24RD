import {useState} from 'react'
import { Checkbox } from '@mantine/core';

type CheckboxProps = {
    id: string,
    label: string,
    disabled: boolean,
    isChecked: boolean,
    onChangeCheckBox:  any //#TODO change to correct type
}

const CheckboxBase = ({id, label, disabled, isChecked, onChangeCheckBox, ...props}: CheckboxProps) => {

    const checkBoxColor = 'indigo'
    const [checked, setChecked] = useState(isChecked);

    const handleChecked = (label:string) => () : void => {
        setChecked(!checked)
        onChangeCheckBox({id, checkBoxName:label, checked: !checked})
    }
    
    return (
    <Checkbox
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

