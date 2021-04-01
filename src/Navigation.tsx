import { BottomNavigation, BottomNavigationAction, Box, makeStyles } from "@material-ui/core";
import { SportsEsports, Restore } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        zIndex: 999,
        bottom: 0,
        width: "100%",
        marginTop: -56,
    }
});

const Navigation = () => {
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Play" value="/" icon={<SportsEsports />} component={Link} to="/" />
                <BottomNavigationAction label="History" value="/history" icon={<Restore />} component={Link} to="/history" />
            </BottomNavigation>
        </Box>
    );
}

export default Navigation;