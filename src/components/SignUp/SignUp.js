import classes from './SignUp.module.scss'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function SignUp({ errorsData, asyncSignUp }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => asyncSignUp(data)

    const usernameValidator = (errorType) => {
        switch (errorType) {
            case 'validate':
                return <div className={classes['sign-up_error-message']}>Passwords must match</div>
            case 'required':
                return <div className={classes['sign-up_error-message']}>This field is required</div>
            case 'minLength':
                return <div className={classes['sign-up_error-message']}>Username minimum length is 3 characters</div>
            case 'maxLength':
                return <div className={classes['sign-up_error-message']}>Username maximum length is 20 characters</div>
            default:
                return null
        }
    }

    const emailValidator = (errorType) => {
        switch (errorType) {
            case 'pattern':
                return <div className={classes['sign-up_error-message']}>Invalid email form</div>
            case 'required':
                return <div className={classes['sign-up_error-message']}>This field is required</div>
            default:
                return null
        }
    }

    const passwordValidator = (errorType) => {
        switch (errorType) {
            case 'pattern':
                return <div className={classes['sign-up_error-message']}>Invalid password form</div>
            case 'required':
                return <div className={classes['sign-up_error-message']}>This field is required</div>
            case 'minLength':
                return <div className={classes['sign-up_error-message']}>Password minimum length is 6 characters</div>
            case 'maxLength':
                return <div className={classes['sign-up_error-message']}>Password maximum length is 40 characters</div>
            default:
                return null
        }
    }

    const repeatPasswordValidator = (errorType) => {
        switch (errorType) {
            case 'validate':
                return <div className={classes['sign-up_error-message']}>Passwords must match</div>
            case 'required':
                return <div className={classes['sign-up_error-message']}>This field is required</div>
            default:
                return null
        }
    }

    return (
        <section className={classes['sign-up']}>
            <h1>Create new account</h1>
            <form className={classes['sign-up_form']} onSubmit={handleSubmit(onSubmit)}>

                <div className={classes['sign-up_field']}>
                    <label>
                        <div className={classes['sign-up_label']}>Username</div>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input {...register("username", { required: true, minLength: 3, maxLength: 20 })} />
                    </label>
                </div>
                {errors.username && usernameValidator(errors.username.type)}


                <div className={classes['sign-up_field']}>
                    <label>
                        <div className={classes['sign-up_label']}>Email address</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })} />
                    </label>
                </div>
                {errors.email && emailValidator(errors.email.type)}

                <div className={classes['sign-up_field']}>
                    <label>
                        <div className={classes['sign-up_label']}>Password</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input id='sign-up_password-input' type="password" {...register("password", { required: true, minLength: 6, maxLength: 40 })} />
                    </label>
                </div>
                {errors.password && passwordValidator(errors.password.type)}

                <div className={classes['sign-up_field']}>
                    <label>
                        <div className={classes['sign-up_label']}>Repeat Password</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="password" {...register("repeatPassword", { required: true, validate: value => value === watch('password') })} />
                        {errors.repeatPassword && repeatPasswordValidator(errors.repeatPassword.type)}
                    </label>
                </div>

                <div className={classes['sign-up_checkbox']}>
                    <label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type='checkbox' {...register("thermsConfirm", { required: true })} />
                        <span className={[classes['sign-up_terms'], errors.thermsConfirm && classes['sign-up_error-message']].join(' ')}>I agree to the processing of my personal information</span>
                    </label>
                </div>

                <input className={classes['sign-up_submit']} type="submit" />

                <div className={classes['sign-up_post']}>Already have an account? <Link className={classes['sign-up_sign-in-link']} to="/sign-in">Sign In.</Link></div>

                {errorsData.signUpError && <div className={classes['sign-up_server-error-message']}>
                    {Object.keys(errorsData.signUpError)[0].charAt(0).toUpperCase() + Object.keys(errorsData.signUpError)[0].slice(1) + ' ' + Object.values(errorsData.signUpError)[0]}
                </div>}

            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo, errorsData: state.errorsData })

export default connect(mapStateToProps, actions)(SignUp)
