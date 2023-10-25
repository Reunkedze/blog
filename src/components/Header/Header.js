import { Link } from 'react-router-dom/cjs/react-router-dom'
import classes from './Header.module.scss'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function Header({ userInfo, logOut }) {
    return (
        <header className={classes['header']}>
            <Link className={classes['header_link']} to='/'>
                <h1 className={classes['header_title']}>Realworld Blog</h1>
            </Link>
            {!userInfo ? <div className={classes['header_buttons']}>
                <Link to='/sign-in'>
                    <button className={classes['header_sign-in']}>Sign In</button>
                </Link>
                <Link to='/sign-up'>
                    <button className={classes['header_sign-up']}>Sign Up</button>
                </Link>
            </div> : null}
            {userInfo ? <div className={classes['header_user']}>
                <Link to='/new-article'>
                    <button className={classes['header_create-article']}>Create article</button>
                </Link>
                <Link className={classes['header_profile']} to='/profile'>
                    <span className={classes['header_username']}>{userInfo.user.username}</span>
                    <img className={classes['header_user-pic']} src={userInfo.user.image} alt='User pic' />
                </Link>
                <button className={classes['header_log-out']} onClick={logOut}>Log Out</button>
            </div> : null}
        </header>
    )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo })

export default connect(mapStateToProps, actions)(Header)
