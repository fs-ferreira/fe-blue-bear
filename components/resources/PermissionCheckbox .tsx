import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PermissionCheckboxProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

const PermissionCheckbox = ({ value, onChange }: PermissionCheckboxProps) => {
    const [isChecked, setIsChecked] = useState(value);

    const handleChange = (checked: boolean) => {
        setIsChecked(checked);
        onChange(checked);
    };

    return (
        <Checkbox
            className="size-5"
            checked={isChecked}
            onCheckedChange={handleChange}
        />
    );
};

export default PermissionCheckbox;
