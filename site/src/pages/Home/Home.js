import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import styles from './Home.module.css'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() { }

  render() {

    return (
      <div classname={styles.container}>
        <div className={styles.containerInner}>
           <h1> Amy's Serverless Spending.</h1>

          { /* Hero Description */}

          <div className={`${styles.heroDescription}`}>
            Track your expenditures in a way that makes sense. 
          </div>

          { /* Call To Action */}

          <div className={`${styles.containerCta}`}>

            <Link to='/register'>
              <button className={`buttonPrimaryLarge`}>
                Register
              </button>
            </Link>

            <Link to='/login' className={`${styles.linkSignIn}`}>sign-in</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)