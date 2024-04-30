import React from "react";
import { Progress } from "@nextui-org/react";
import PropTypes from "prop-types";

const ProgressBar = ({ step, dataLength }) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        setValue((step / dataLength) * 120);
    }, [step, dataLength]);

    return (
        <Progress
            aria-label="progress"
            size="md"
            value={value}
            classNames={{
                base: "max-w-md",
                track: "drop-shadow-md",
                indicator: "bg-gradient-to-r from-[#902BAD] to-[#3F78E1]",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
            }}
            className="max-w-md"
        />
    );
};

ProgressBar.propTypes = {
    step: PropTypes.number,
    dataLength: PropTypes.number,
};
export default ProgressBar;
