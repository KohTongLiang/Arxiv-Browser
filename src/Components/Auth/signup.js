import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import zxcvbn from 'zxcvbn'

import {
    Avatar, Container, Button, CssBaseline, TextField, FormControlLabel, Box, Typography, FormGroup, FormControl,
    InputLabel, Input, FormHelperText, FormLabel, RadioGroup, Radio, LinearProgress
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import * as STYLES from '../../Constants/styles'
import { SITE_AUTHOR } from '../../Constants/values'
import { SIGN_IN } from '../../Constants/routes'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" >
                { SITE_AUTHOR }
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorText: {
        color: 'red',
    },
    customLinkStyling: {
        textDecoration: 'none',
        color: 'yellow',
    },
}));

function SignUp(props) {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const passwordStrengthIndicator = ['very weak', 'weak', 'weak', 'medium', 'strong'];
    const { register, watch, handleSubmit, control, formState: { errors} } = useForm();
    const onSubmit = data => {
        props.signUp({ email: data.email, username: data.username, password: data.passwordOne });
        setOpen(true)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Username</InputLabel>
                            <Input {...register('username', { required: true })}/>
                            <FormHelperText>Enter the name you wish to be known by.</FormHelperText>
                            <FormHelperText>{errors.username && <span className={classes.errorText}>Username is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Email</InputLabel>
                            <Input {...register('email', { required: true })} />
                            <FormHelperText>Enter the email you wish to register your account with</FormHelperText>
                            <FormHelperText>{errors.email && <span className={classes.errorText}>Email is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input type="password" {...register('passwordOne', { required: true })} onChange={event => setPasswordStrength(zxcvbn(event.target.value))} />
                            <FormHelperText>{errors.passwordOne && <span className={classes.errorText}>Password is required</span>}</FormHelperText>
                            <div>
                                <LinearProgress variant="determinate" value={(passwordStrength.score / 4) * 100} />
                                <FormHelperText>Password Strength: {passwordStrengthIndicator[(passwordStrength.score)]}</FormHelperText>
                            </div>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input type="password" {...register('passwordTwo', { required: true })} />
                            <FormHelperText>{errors.passwordTwo && <span className={classes.errorText}>Please confirm your password is required</span>}</FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <p>Already have an account? Sign in <Link to={SIGN_IN} className={classes.customLinkStyling}>here</Link></p>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">
                            Sign Up
                        </Button>
                    </FormGroup>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default SignUp