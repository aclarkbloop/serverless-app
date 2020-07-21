import React, { Component } from 'react'
import { 
  withRouter,
  Link
} from 'react-router-dom'
import styles from './Dashboard.module.css'
import {
  getSession,
  deleteSession, 
  getCurrSpendData
} from '../../utils'
import Button from 'react-bootstrap/Button'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      session: {},
      currAmount: {"food": 0, "personal": 0, "rent": 0},
    }

    // Bindings
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    const userSession = await getSession()
    
    this.setState({
      session: userSession,
    })

    this.getAmount()
  }

  async getAmount() {
    const currAmountMap = await getCurrSpendData(this.state.session.userEmail);
    this.setState({
      currAmount: currAmountMap,
    })
  }
  


  /**
   * Log user out by clearing cookie and redirecting
   */
  logout() {
    deleteSession()
    this.props.history.push(`/`)
  }

  render() {
    console.log(this.state.currAmount);
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
              <div className={styles.individualButton}>
                <Link to='/spendFood'>
                  <Button className={styles.button}>Food</Button>{' '}
                </Link>
                <div className={styles.currDiv}>${this.state.currAmount.food}</div>
              </div>
              <div className={styles.individualButton}>
                <Link to='/spendRent'>
                  <Button className={styles.button}>Rent</Button>{' '}
                </Link>
                <div className={styles.currDiv}>${this.state.currAmount.rent}</div>
              </div>
              <div className={styles.individualButton}>
                <Link to='/spendPersonal'>
                  <Button className={styles.button}>Personal</Button>{' '}
                </Link>
                <div className={styles.currDiv}>${this.state.currAmount.personal}</div>
              </div>
            </div>
            </header>
          </div>
        </div>
     
    )
  }
}

export default withRouter(Dashboard)