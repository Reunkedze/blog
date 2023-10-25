import './App.module.scss'
import Header from '../Header';
import Main from '../Main';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

function App({ userInfo, login }) {

  useEffect(() => {
    if (localStorage.token) {
      login({ user: { ...localStorage } })
    }
  }, [login])

  return (
    <div className="App">
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => ({ userInfo: state.userInfo })

export default connect(mapStateToProps, actions)(App);
