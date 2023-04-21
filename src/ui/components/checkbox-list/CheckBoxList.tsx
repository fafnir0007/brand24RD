import CheckboxBase from '@/ui/base/checkbox/Checkbox'

type List = {
    id: string,
    label: string,
    checked: boolean
}

type CheckboxListProps = {
    list: Array<List>,
    onChangeCheckBox:  any //#TODO change to correct type
}

const CheckboxList = ({list, onChangeCheckBox}: CheckboxListProps) => {
    return (
    <>
        {list.map(({id,label,checked})=>
            <CheckboxBase
                key={id}
                id={id} 
                // isChecked={checked}
                label={label} 
                disabled={false} 
                onChangeCheckBox={onChangeCheckBox}
            />
        )}
    </>
  );
}

export default CheckboxList

