import React from 'react'
import { Progress } from "@nextui-org/react";

const ProgressBar = ({step,dataLength}) => {
    const [value, setValue] = React.useState(0);
    const step1 = step-1;
    React.useEffect(() => {
        setValue(step1 / dataLength * 100);
    }, [step1,dataLength]);
  
    return (
        <Progress
            aria-label="Downloading..."
            size="md"
            value={value}
            color="success"
            // showValueLabel={true}
            className="max-w-md"
        />
    );
};

export default ProgressBar;
