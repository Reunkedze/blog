const initialState = { articles: null, article: null, page: 1, userInfo: null, newArticle: { tags: [] }, isLoading: false, errorsData: { authorizationError: false, signUpData: false } }

function Reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ARTICLES':
            return { ...state, articles: action.articles }
        case 'ADD_ARTICLE':
            return { ...state, article: action.article }
        case 'ON_PAGE_CHANGE':
            return { ...state, page: action.page }
        case 'SIGN_UP':
            return { ...state, userInfo: action.userInfo, errorsData: { signUpError: false } }
        case 'SIGN_UP_ERROR':
            return { ...state, errorsData: { signUpError: action.errorInfo } }
        case 'UPDATE_PROFILE':
            return { ...state, userInfo: { ...state.userInfo, ...action.updates } }
        case 'LOGIN':
            return { ...state, userInfo: action.userInfo, errorsData: { authorizationError: false } }
        case 'LOGIN_ERROR':
            return { ...state, errorsData: { authorizationError: true } }
        case 'LOG_OUT':
            return { ...state, userInfo: null }
        case 'ON_TITLE_FIELD_CHANGE':
            return { ...state, newArticle: { ...state.newArticle, titleField: action.titleField } }
        case 'ON_DESCRIPTION_FIELD_CHANGE':
            return { ...state, newArticle: { ...state.newArticle, descriptionField: action.descriptionField } }
        case 'ON_TEXT_FIELD_CHANGE':
            return { ...state, newArticle: { ...state.newArticle, textField: action.textField } }
        case 'ON_TAG_FIELD_CHANGE':
            return { ...state, newArticle: { ...state.newArticle, tagField: action.tagField } }
        case 'ON_TAG_ADD_CHANGE':
            return { ...state, newArticle: { ...state.newArticle, tags: [...state.newArticle.tags, action.tag] } }
        case 'ON_NEW_ARTICLE_DELETE_TAG':
            return { ...state, newArticle: { ...state.newArticle, tags: [...state.newArticle.tags.slice(0, action.tagNumber), ...state.newArticle.tags.slice(action.tagNumber + 1)] } }
        case 'LIKE_POST':
            let newArticles = { ...state.articles }
            const likedArticleIndex = newArticles.articles.findIndex(a => a.slug === action.articleInfo.article.slug)
            newArticles.articles[likedArticleIndex] = action.articleInfo.article
            return { ...state, articles: { ...newArticles } }
        case 'LOADING':
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}

export default Reducer