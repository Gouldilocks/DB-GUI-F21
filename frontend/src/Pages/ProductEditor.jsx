import React from 'react';
// import { AccountsRepository } from '../api';
import { Link, Redirect } from 'react-router-dom';

export class ProductEditor extends React.Component {
    accountRepository = new AccountsRepository();

    state = {
        name: '',
        email: '',
        isEmployee: false,
        departmentId: 0,
        phoneNumbers: []
    };

    onSave() {
        // if(this.state.id) {
        //     this.accountRepository.updateAccount(this.state.id, this.state)
        //         .then(account => this.setState({ redirect: '/' }));
        // } else {
        //     this.accountRepository.addAccount(this.state)
        //         .then(account => this.setState({ redirect: '/' }));
        // }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return <>
        <form className="container">
                <h1>{ this.state.id ? "Account Editor" : "New Account" }</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={ event => this.setState({ name: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={ event => this.setState({ email: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="isEmployee">
                        <input type="checkbox"
                            id="isEmployee"
                            name="isEmployee"
                            checked={this.state.isEmployee}
                            onChange={ event => this.setState({ isEmployee: event.target.checked }) }
                            />
                        Is Employee
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="departmentId">Department</label>
                    <select id="departmentId"
                        name="departmentId"
                        className="form-control"
                        value={this.state.departmentId}
                        onChange={ event => this.setState({ departmentId: event.target.value }) }>
                            <option></option>
                            {
                                this.departments.map(x => <option key={ x.id } value={ x.id }>{ x.name }</option>)
                            }
                    </select>
                </div>

                <PhoneList phoneNumbers={ this.state.phoneNumbers } />
                <PhoneEditor onPhoneAdded={ phone => this.addPhone(phone) } />

                <div>
                    <button type="button"
                            onClick={ () => this.onSave() }
                            className="btn btn-block btn-primary">
                        Save
                    </button>
                    <Link className="btn btn-block btn-secondary" to="/">Return to List</Link>
                </div>
            </form>
        </>;
    }

    componentDidMount() {
        let id = this.props.match.params.accountId;
        if (id) {
            this.accountRepository.getAccount(id)
                .then(account => this.setState(account));
        }
    }
}

export default ProductEditor;