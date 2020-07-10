import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
    getSession,
    deleteSession 
  } from '../../utils'
import styles from './Spend.module.css'

class Spend extends Component {

    constructor(props) {
        super(props)
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      async componentDidMount() { 
        const userSession = getSession()

        this.setState({
          session: userSession,
        })
      }


      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        console.log(this.state.value);
        event.preventDefault();
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
              <form className={styles.form} onSubmit={this.handleSubmit}>
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