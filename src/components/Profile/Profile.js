import classes from './Profile.module.scss'
import { useForm } from "react-hook-form"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

function Profile({ userInfo, asyncUpdateProfile }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    if (!userInfo) return <Redirect to='/sign-in' />

    const onSubmit = (data) => {
        console.log(data, userInfo.user.token)
        asyncUpdateProfile(data, userInfo.user.token)
    }
    console.log(watch("example")) // watch input value by passing the name of it

    return (
        <section className={classes['profile']}>
            <h1>Edit Profile</h1>
            <form className={classes['profile_form']} onSubmit={handleSubmit(onSubmit)}>

                <div className={classes['profile_field']}>
                    <label>
                        <div className={classes['profile_label']}>Username</div>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input {...register("username")} />
                    </label>
                </div>

                <div className={classes['profile_field']}>
                    <label>
                        <div className={classes['profile_label']}>Email address</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="email" {...register("email", { required: true })} />
                    </label>
                </div>

                <div className={classes['profile_field']}>
                    <label>
                        <div className={classes['profile_label']}>New password</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="password" {...register("password", { required: true })} />
                    </label>
                </div>

                <div className={classes['profile_field']}>
                    <label>
                        <div className={classes['profile_label']}>Avatar image (url)</div>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input {...register("image", { required: true })} />
                    </label>
                </div>

                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input className={classes['profile_submit']} type="submit" />

            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo })

export default connect(mapStateToProps, actions)(Profile)
