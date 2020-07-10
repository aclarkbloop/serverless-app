import React, { Component } from 'react'
import { 
  withRouter,
  Link
} from 'react-router-dom'
import styles from './Dashboard.module.css'
import {
  getSession,
  deleteSession 
} from '../../utils'
import Button from 'react-bootstrap/Button'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    // Bindings
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {

    const userSession = getSession()

    this.setState({
      session: userSession,
    })
  }

  /**
   * Log user out by clearing cookie and redirecting
   */
  logout() {
    deleteSession()
    this.props.history.push(`/`)
  }

  personalClicked() {
    console.log("personal");
  }

  rentClicked() {
    console.log("rent");
  }

  foodClicked() {
    console.log("food");
  }

  render() {

    return (
        <div className={styles.containerInner}>

          { /* Navigation */ }

          <div className={styles.navigationContainer}>
            <div 
              className={`link`}>
                { this.state.session ? this.state.session.userEmail : '' }
              </div>
            <div 
              className={`link`}
              onClick={this.logout}>
                logout
              </div>
          </div>

          { /* Content */ }
          <div className={styles.App}>
            <header className={styles.appHeader}>My Spending
             <div className={styles.buttonHolder}>
             <Link to='/spend'>
              <Button  className={styles.button}>Food</Button>{' '}
            </Link>
              <Button onClick={this.rentClicked} className={styles.button}>Rent</Button>{' '}
              <Button onClick={this.personalClicked} className={styles.button}>Personal</Button>{' '}
            </div>
          </header>
        </div>
          
          
        </div>
     
    )
  }
}

export default withRouter(Dashboard)