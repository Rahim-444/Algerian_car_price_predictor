import React from 'react'
import { Progress } from "@nextui-org/react";

const ProgressBar = ({step,dataLength}) => {
    const [value, setValue] = React.useState(0);
    
    React.useEffect(() => {
        setValue(step / dataLength * 100);
    }, [step,dataLength]);
  
    return (
        <Progress
            aria-label="Downloading..."
            size="md"
            value={value}
            color="success"
            // showValueLabel={true}
            className="max-w-md "
        />
    );
};

export default ProgressBar;
