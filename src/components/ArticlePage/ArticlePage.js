import classes from './ArticlePage.module.scss'
import like from '../../img/like.png'
import liked from '../../img/liked.png'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

function ArticlePage({ info, userInfo, asyncGetArticle, asyncGetArticleWithAuth, asyncLikePost, asyncUnlikePost, slug }) {
    const [creationInProcess, setCreationInProcess] = useState('in process')

    useEffect(() => {
        userInfo ? asyncGetArticleWithAuth(slug, userInfo.user.token) : asyncGetArticle(slug)
    }, [userInfo, asyncGetArticle, asyncGetArticleWithAuth, slug])

    // const [isLike, setIsLike] = useState(info.favorited)

    const onLike = async () => {
        if (userInfo) {
            if (!info.favorited) {
                await asyncLikePost(info.slug, userInfo.user.token)
            } else {
                await asyncUnlikePost(info.slug, userInfo.user.token)
            }
            await asyncGetArticleWithAuth(slug, userInfo.user.token)
        }
    }

    const deleteArticle = (slug, token) => {
        fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + token
            }
        })
    }

    if (creationInProcess === 'in process') {
        return info ?
            <div>
                <div className={classes['article']}>
                    <div className={classes['article_left-part']}>
                        <span className={classes['article_title']}>
                            <ReactMarkdown>
                                {info.title}
                            </ReactMarkdown>
                            {userInfo ?
                                <span>
                                    <img className={classes['article_like']} src={info.favorited ? liked : like} alt='like' onClick={onLike} />
                                    <span className={classes['article_like-counter']}>{info.favoritesCount}</span>
                                </span>
                                : null}
                        </span>
                        <div className={classes['article_tags']}>
                            {info.tagList ? info.tagList.map((t, i) => <span key={i} className={classes['article_tag']}>{t}</span>) : null}
                        </div>
                        <ReactMarkdown className={classes['article_text']}>
                            {info.description}
                        </ReactMarkdown>
                        <ReactMarkdown className={classes['article_body']}>
                            {info.body}
                        </ReactMarkdown>
                    </div>
                    <div className={classes['article_right-part']}>
                        <div className={classes['article_info']}>
                            <div className={classes['article_info-text']}>
                                <span className={classes['article_author']}>{info.author ? info.author.username : null}</span>
                                <span className={classes['article_date']}>{info.updatedAt ? format(new Date(info.updatedAt), 'MMMM d, yyyy') : null}</span>
                            </div>
                            <img className={classes['article_author-photo']} src={info.author.image} alt='author' />
                        </div>
                        {userInfo && (userInfo.user.username === info.author.username) ? <div className={classes['article_buttons']}>
                            <button className={classes['article_delete']} onClick={() => {
                                deleteArticle(info.slug, userInfo.user.token)
                                setCreationInProcess('delete')
                            }}>Delete</button>
                            <button className={classes['article_edit']} onClick={() => setCreationInProcess('edit')}>Edit</button>
                        </div> : null}
                    </div>
                </div>
            </div > : null
    } else if (creationInProcess === 'edit') {
        return <Redirect to={`/new-article/${slug}`} />
    } else {
        return <Redirect to={`/articles`} />
    }
}

const mapStateToProps = (state) => ({ info: state.article, userInfo: state.userInfo })

export default connect(mapStateToProps, actions)(ArticlePage)
