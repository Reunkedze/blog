import classes from './SignIn.module.scss'
import { useForm } from "react-hook-form"
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function SignIn({ userInfo, errorsData, asyncLogin }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    if (userInfo) {
        return <Redirect to='/articles' />
    }

    const onSubmit = (data) => {
        asyncLogin(data)
    } // watch input value by passing the name of it

    const emailValidator = (errorType) => {
        switch (errorType) {
            case 'pattern':
                return <div className={classes['sign-in_error-message']}>Invalid email form</div>
            case 'required':
                return <div className={classes['sign-in_error-message']}>This field is required</div>
            default:
                return null
        }
    }

    const passwordValidator = (errorType) => {
        switch (errorType) {
            case 'required':
                return <div className={classes['sign-in_error-message']}>This field is required</div>
            case 'minLength':
                return <div className={classes['sign-in_error-message']}>Password minimum length is 6 characters</div>
            case 'maxLength':
                return <div className={classes['sign-in_error-message']}>Password maximum length is 40 characters</div>
            default: return null
        }
    }

    return (
        <section className={classes['sign-in']}>
            <h1>Sign In</h1>
            <form className={classes['sign-in_form']} onSubmit={handleSubmit(onSubmit)}>

                <div className={classes['sign-in_field']}>
                    <label>
                        <div className={classes['sign-in_label']}>Email address</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input className={(errors.email || errorsData.authorizationError) ? classes['sign-in_error-input'] : null} {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })} />
                    </label>
                </div>
                {errors.email && emailValidator(errors.email.type)}

                <div className={classes['sign-in_field']}>
                    <label>
                        <div className={classes['sign-in_label']}>Password</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input className={(errors.password || errorsData.authorizationError) ? classes['sign-in_error-input'] : null} type="password" {...register("password", { required: true, minLength: 6, maxLength: 40 })} />
                    </label>
                </div>

                {/* errors will return when field validation fails  */}
                {errors.password && passwordValidator(errors.password.type)}

                <input className={classes['sign-in_submit']} type="submit" />

                <div className={classes['sign-in_post']}>
                    Don’t have an account? <Link className={classes['sign-in_sign-up-link']} to="/sign-up"> Sign Up.</Link>
                </div>

                {errorsData.authorizationError && <div className={classes['sign-in_server-error-message']}>Wrong email or password</div>}

            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo, errorsData: state.errorsData })

export default connect(mapStateToProps, actions)(SignIn)
