import { Pagination } from 'antd'
import ArticleList from '../ArticleList'
import classes from './Main.module.scss'
import ArticlePage from '../ArticlePage'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp'
import Profile from '../Profile'
import NewArticle from '../NewArticle'
import ErrorMessage from '../ErrorMessage'


function Main({ articles, page, errorsData, onPageChange }) {
    return (
        <main className={classes['main']}>
            <Route path={['/', '/articles']} render={() => {
                return (
                    <div>
                        <ArticleList />
                        <div className={classes['main_pagination-container']}>
                            <Pagination current={page} total={articles ? articles.articlesCount : null} showSizeChanger={false} pageSize={5} onChange={(value) => onPageChange(value)} />
                        </div>
                    </div>
                )
            }} exact />
            <Route path='/articles/:slug' render={({ match }) => {
                const { slug } = match.params
                if (!errorsData.fetchError) {
                    return <ArticlePage slug={slug} />
                } else {
                    return <main className={classes['main']}><ErrorMessage /></main>
                }
            }} exact />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/profile' component={Profile} />
            <Route path='/new-article' component={NewArticle} exact />
            <Route path='/new-article/:slug' render={({ match }) => {
                const { slug } = match.params
                return <NewArticle slug={slug} />
            }} exact />
        </main>
    )
}

const mapStateToProps = (state) => ({ articles: state.articles, page: state.page, errorsData: state.errorsData })

export default connect(mapStateToProps, actions)(Main)
