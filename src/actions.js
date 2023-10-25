const addArticles = (articles) => ({ type: 'ADD_ARTICLES', articles })

export const asyncAddArticles = (page) => {
    return (dispatch) => fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page * 5 - 5}`).then(r => r.json()).then(d => dispatch(addArticles(d)))
}

export const asyncAddArticlesWithAuth = (page, token) => {
    return (dispatch) => fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page * 5 - 5}`, { headers: { "Authorization": 'Bearer ' + token } }).then(r => r.json()).then(d => dispatch(addArticles(d)))
}

const getArticle = (article) => ({ type: 'ADD_ARTICLE', article })

export const asyncGetArticle = (slug) => {
    return (dispatch) => fetch(`https://blog.kata.academy/api/articles/${slug}`).then(r => r.json()).then(d => dispatch(getArticle(d.article)))
}

export const asyncGetArticleWithAuth = (slug, token) => {
    return (dispatch) => fetch(`https://blog.kata.academy/api/articles/${slug}`, { headers: { "Authorization": 'Bearer ' + token } }).then(r => r.json()).then(d => dispatch(getArticle(d.article)))
}

export const onPageChange = (page) => ({ type: 'ON_PAGE_CHANGE', page })

const signUp = (userInfo) => ({ type: 'SIGN_UP', userInfo })

export const signUpError = (errorInfo) => ({ type: 'SIGN_UP_ERROR', errorInfo })

export const asyncSignUp = (userInfo) => {
    return (dispatch) => {
        fetch('https://blog.kata.academy/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: userInfo.username,
                    email: userInfo.email,
                    password: userInfo.password
                }
            })
        }).then(r => r.json()).then(d => {
            if (d.user) {
                dispatch(signUp(d))
            } else {
                dispatch(signUpError(d.errors))
            }
        })
    }
}

const updateProfile = (updates) => ({ type: 'UPDATE_PROFILE', updates })

export const asyncUpdateProfile = (updates, token) => {
    return (dispatch) => {
        fetch(`https://blog.kata.academy/api/user`, {
            method: 'PUT',
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": {
                    "email": updates.email,
                    "username": updates.username,
                    "password": updates.password,
                    "bio": null,
                    "image": updates.image
                }
            })
        }).then(r => r.json()).then(d => dispatch(updateProfile(d)))
    }
}

export const login = (userInfo) => ({ type: 'LOGIN', userInfo })

export const loginError = (userInfo) => ({ type: 'LOGIN_ERROR' })

export const asyncLogin = (userInfo) => {
    return (dispatch) => {
        fetch('https://blog.kata.academy/api/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: {
                    email: userInfo.email,
                    password: userInfo.password
                }
            })
        }).then(r => r.json()).then(d => {
            if (d.user) {
                dispatch(login(d))
                localStorage.username = d.user.username
                localStorage.email = d.user.email
                localStorage.token = d.user.token
                localStorage.bio = d.user.bio
                localStorage.image = d.user.image
            } else {
                dispatch(loginError())
            }
        })
    }
}

export const logOut = () => {
    console.log('logOut')
    localStorage.clear()
    return { type: 'LOG_OUT' }
}

export const onTitleFieldChange = (titleField) => ({ type: 'ON_TITLE_FIELD_CHANGE', titleField })

export const onDescriptionFieldChange = (descriptionField) => ({ type: 'ON_DESCRIPTION_FIELD_CHANGE', descriptionField })

export const onTextFieldChange = (textField) => ({ type: 'ON_TEXT_FIELD_CHANGE', textField })

export const onTagFieldChange = (tagField) => ({ type: 'ON_TAG_FIELD_CHANGE', tagField })

export const onTagAddChange = (tag) => ({ type: 'ON_TAG_ADD_CHANGE', tag })

export const onNewArticleDeleteTag = (tagNumber) => ({ type: 'ON_NEW_ARTICLE_DELETE_TAG', tagNumber })

const likePost = (articleInfo) => ({ type: 'LIKE_POST', articleInfo })

export const asyncLikePost = (slug, token) => {
    return (dispatch) => {
        fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + token
            }
        }).then(r => r.json()).then(d => dispatch(likePost(d)))
    }
}

const unlikePost = (articleInfo) => ({ type: 'LIKE_POST', articleInfo })

export const asyncUnlikePost = (slug, token) => {
    return (dispatch) => {
        fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + token
            }
        }).then(r => r.json()).then(d => dispatch(unlikePost(d)))
    }
}
