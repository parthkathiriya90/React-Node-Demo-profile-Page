import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            {props.show && <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>}
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= props.value ? props.value : prevProgress + 10));
        }, 200);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} show={props.show} />
        </Box>
    );
}