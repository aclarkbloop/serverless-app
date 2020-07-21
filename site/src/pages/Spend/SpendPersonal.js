import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
    getSession,
    spendData,
    deleteSession,
  } from '../../utils'
import styles from './SpendPersonal.module.css'
import Button from 'react-bootstrap/Button'


class Spend extends Component {

    constructor(props) {
        super(props)
        this.state = {
          value: '',
          expression: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
      }

      logout() {
        deleteSession()
        this.props.history.push(`/`)
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

      async handleSubmit(event) {
        event.preventDefault();
        const amount = Number.parseFloat(this.state.value);
        const expr = `You just spent $${amount} on personal items!`
        this.setState({
          expression: expr,
        })
        try {
            await spendData(this.state.session.userEmail, "personal", amount);
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
              <Link to='/'>
                 <Button className={styles.dashButton}>Back to dashboard</Button>
              </Link>
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <label>
                    Amount Spent:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
              </div>
                <div className={styles.expr}>
                  {this.state.expression}
                </div>
            </div>
         
        )
      }
}

export default withRouter(Spend)