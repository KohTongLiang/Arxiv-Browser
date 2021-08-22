import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Grid, Box, Typography,
    FormGroup, FormControl, Snackbar, Input, FormHelperText, InputLabel
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { SITE_AUTHOR } from '../../Constants/values'
import { STYLE } from '../../Constants/styles'
import { SIGN_UP } from '../../Constants/routes'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" >
                {SITE_AUTHOR}
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(http://placekitten.com/800/800)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorText: {
        color: 'red'
    },
    customLinkStyling: {
        textDecoration: 'none',
        color: 'yellow',
    },
}))

function SignIn(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const { register, handleSubmit, formState: { errors} } = useForm();
    const onSubmit = data => {
        props.signIn(data);
        setOpen(true);
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Email</InputLabel>
                                <Input {...register('email', { required: true })} />
                                <FormHelperText>Enter the email you used for registration</FormHelperText>
                                <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>

                        <FormGroup>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" name="password" {...register('password', { required: true })} />
                                <FormHelperText>{errors.password && <span className={classes.errorText}>Password is required</span>}</FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                Don't have an account?
                                <Link to={SIGN_UP} className={classes.customLinkStyling} variant="body2">
                                   {" Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
            {(props.errorMessage && open) && (
                <Snackbar
                    open={open} color='red' autoHideDuration={600} message={props.errorMessage} action={
                        <Button color="inherit" size="small" onClick={() => setOpen(!open)}>
                            X
                        </Button>
                    }
                />
            )}
        </Grid>
    )
}

export default SignIn