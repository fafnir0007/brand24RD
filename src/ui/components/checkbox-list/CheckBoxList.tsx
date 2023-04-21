import CheckboxBase from '@/ui/base/checkbox/Checkbox'

type List = {
    label: string,
    checked: boolean,
    id: number
}

type CheckboxListProps = {
    list: Array<List>,
    onChangeCheckBox:  any //#TODO change to correct type
}

const CheckboxList = ({list, onChangeCheckBox}: CheckboxListProps) => {
    return (
    <>
        {list.map(({label},index)=>
            <CheckboxBase
                key={index}
                id={index} 
                label={label} 
                isChecked={false}
                disabled={false} 
                onChangeCheckBox={onChangeCheckBox}
            />
        )}
    </>
  );
}

export default CheckboxList

