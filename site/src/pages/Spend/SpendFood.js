import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
    getSession,
    spendData,
    deleteSession
  } from '../../utils'
import styles from './SpendFood.module.css'


class Spend extends Component {

    constructor(props) {
        super(props)
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this)
      }
    
      async componentDidMount() { 
        const userSession = getSession()

        this.setState({
          session: userSession,
        })
      }

      logout() {
        deleteSession()
        this.props.history.push(`/`)
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      async handleSubmit(event) {
        event.preventDefault();
        const amount = Number.parseFloat(this.state.value);
        console.log(this.state.session.userEmail, "food", this.state.value);
        try {
            await spendData(this.state.session.userEmail, "food", amount);
        } catch (error) {
            console.log(error)
        }
        
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
              <form className={styles.foodForm} onSubmit={this.handleSubmit}>
                <label>
                    Amount Spent:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
              </div>
              
              
            </div>
         
        )
      }
}

export default withRouter(Spend)