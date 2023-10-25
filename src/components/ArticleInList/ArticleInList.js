import classes from './ArticleInList.module.scss'
import like from '../../img/like.png'
import liked from '../../img/liked.png'
import { format } from 'date-fns'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function ArticleInList({ info, userInfo, asyncLikePost, asyncUnlikePost }) {
    const onLike = () => {
        if (userInfo) {
            return (!info.favorited) ? asyncLikePost(info.slug, userInfo.user.token) : asyncUnlikePost(info.slug, userInfo.user.token)
        }
    }

    return (
        <div className={classes['article']}>
            <div className={classes['article_left-part']}>
                <Link className={classes['article_link']} to={`/articles/${info.slug}`}>
                    <span className={classes['article_title']}>{info.title}</span>
                </Link>
                {userInfo ?
                    <span>
                        <img className={classes['article_like']} src={info.favorited ? liked : like} alt='like' onClick={onLike} />
                        <span className={classes['article_like-counter']}>{info.favoritesCount}</span>
                    </span>
                    : null}
                <div className={classes['article_tags']}>
                    {info.tagList.map((t, i) => <span key={i} className={classes['article_tag']}>{t}</span>)}
                </div>
                <p className={classes['article_text']}>{info.description}</p>
            </div>
            <div className={classes['article_right-part']}>
                <div className={classes['article_info']}>
                    <span className={classes['article_author']}>{info.author.username}</span>
                    <span className={classes['article_date']}>{format(new Date(info.updatedAt), 'MMMM d, yyyy')}</span>
                </div>
                <img className={classes['article_author-photo']} src={info.author.image} alt='author' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo })

export default connect(mapStateToProps, actions)(ArticleInList)
