import { connect } from 'react-redux'
import classes from './NewArticle.module.scss'
import { useForm } from "react-hook-form"
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useState } from 'react'

function NewArticle({ userInfo, newArticle, onTitleFieldChange, onDescriptionFieldChange, onTextFieldChange, onTagFieldChange, onTagAddChange, onNewArticleDeleteTag, slug }) {
    const [creationInProcess, setCreationInProcess] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    if (!userInfo) return <Redirect to='/sign-in' />

    const asyncCreateArticle = (articleData, tags, token) => {
        fetch('https://blog.kata.academy/api/articles', {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "article": {
                    "title": articleData.title,
                    "description": articleData.description,
                    "body": articleData.body,
                    "tagList": tags
                }
            })
        })
    }

    const asyncEditArticle = (articleData, tags, token) => {
        fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'PUT',
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "article": {
                    "title": articleData.title,
                    "description": articleData.description,
                    "body": articleData.body,
                    "tagList": tags
                }
            })
        })
    }

    const onSubmit = (data) => {
        if (slug) {
            asyncEditArticle(data, newArticle.tags, userInfo.user.token)
        } else {
            asyncCreateArticle(data, newArticle.tags, userInfo.user.token)
        }
        setCreationInProcess(false)
    }

    if (creationInProcess) {

        return (
            <section className={classes['new-article']}>
                <h1>{slug ? 'Edit article' : 'Create new article'}</h1>
                <form className={classes['new-article_form']} onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes['new-article_field']}>
                        <label>
                            <div className={classes['new-article_label']}>Title</div>
                            {/* register your input into the hook by invoking the "register" function */}
                            <input {...register("title", { required: true })} onChange={event => onTitleFieldChange(event.target.value)} defaultValue={!slug ? (newArticle ? newArticle.titleField : '') : null} />
                        </label>
                    </div>

                    {errors.title && <span>This field is required</span>}

                    <div className={classes['new-article_field']}>
                        <label>
                            <div className={classes['new-article_label']}>Short description</div>
                            {/* include validation with required or other standard HTML validation rules */}
                            <input {...register("description", { required: true })} onChange={event => onDescriptionFieldChange(event.target.value)} defaultValue={!slug ? (newArticle ? newArticle.descriptionField : '') : null} />
                        </label>
                    </div>

                    {errors.description && <span>This field is required</span>}

                    <div className={classes['new-article_field']}>
                        <label>
                            <div className={classes['new-article_label']}>Text</div>
                            {/* include validation with required or other standard HTML validation rules */}
                            <textarea {...register("body", { required: true })} onChange={event => onTextFieldChange(event.target.value)} defaultValue={!slug ? (newArticle ? newArticle.textField : '') : null} />
                        </label>
                    </div>

                    {errors.body && <span>This field is required</span>}

                    <div className={classes['new-article_tags']}>
                        <label>
                            <div className={classes['new-article_label']}>Tags</div>
                            {/* include validation with required or other standard HTML validation rules */}
                            {newArticle.tags ? newArticle.tags.map((t, i) => (
                                <div key={i} className={classes['new-article_tag']}>
                                    <div className={classes['new-article_tag-value']}>{t}</div>
                                    <div className={classes['new-article_delete-tag']} onClick={() => onNewArticleDeleteTag(i)} >Delete</div>
                                </div>)) : null}
                            <div className={classes['new-article_new-tag']}>
                                <input id='new-tag' {...register("tag")} onChange={event => onTagFieldChange(event.target.value)} defaultValue={!slug ? (newArticle ? newArticle.tagField : '') : null} />
                                <div className={classes['new-article_delete-tag']} >Delete</div>
                                <div className={classes['new-article_add-tag']} onClick={() => {
                                    onTagAddChange(document.querySelector('#new-tag').value)
                                    onTagFieldChange('')
                                    document.querySelector('#new-tag').value = ''
                                }
                                } >Add tag</div>
                            </div>
                        </label>
                    </div>


                    <input className={classes['new-article_submit']} type="submit" />

                </form>
            </section>
        )
    } else {
        return <Redirect to='/articles' />
    }
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo, newArticle: state.newArticle })

export default connect(mapStateToProps, actions)(NewArticle)
