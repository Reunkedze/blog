import { Alert } from 'antd'
import classes from './ErrorMessage.module.scss'

export default function ErrorMessage() {
    return (<div className={classes['error-message']}>
        <Alert message="Something went wrong(" type="error" />
    </div>
    )
}