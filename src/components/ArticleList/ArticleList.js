import ArticleInList from '../ArticleInList'
import classes from './ArticleList.module.scss'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Spin } from 'antd'
import ErrorMessage from '../ErrorMessage'

function ArticleList({ articles, page, userInfo, errorsData, asyncAddArticles, asyncAddArticlesWithAuth }) {
    useEffect(() => {
        userInfo ? asyncAddArticlesWithAuth(page, userInfo.user.token) : asyncAddArticles(page)
    }, [asyncAddArticles, asyncAddArticlesWithAuth, page, userInfo])
    return !errorsData.fetchError ?
        (<div>
            <div className={classes['article-list']}>
                {articles ? articles.articles.map((a, i) => <ArticleInList key={i} info={a} />) : <div className={classes['article-list_spin-container']}><Spin /></div>}
            </div>
        </div>)
        : (<ErrorMessage />)
}

const mapStateToProps = (state) => ({ articles: state.articles, page: state.page, userInfo: state.userInfo, errorsData: state.errorsData })

export default connect(mapStateToProps, actions)(ArticleList)
