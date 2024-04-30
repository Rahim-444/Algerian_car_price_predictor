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
            color="secondary"
            className="max-w-md "
        />
    );
};

ProgressBar.propTypes = {
    step: PropTypes.number,
    dataLength: PropTypes.number,
};
export default ProgressBar;
