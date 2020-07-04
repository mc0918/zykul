import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { styles as toolbarStyles } from '../Toolbar/Toolbar';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
        backgroundImage: 'linear-gradient(to right, #626262, #28282A)'
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div>
                        menu
                    </div>
                    <div className={classes.left} />
                    <Link
                        variant="h1"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/"
                    >
                        {'Zykul Game Concept'}
                    </Link>
                    <div className={classes.right}>
                        logo?
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}