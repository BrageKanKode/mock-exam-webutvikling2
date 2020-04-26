import React from "react";
import {Link} from 'react-router-dom';
import HeaderBar from "./headerbar";


export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: null,
            error: null
        };
    }


    componentDidMount() {
        this.fetchBooks();
    }

    async fetchBooks() {

        const url = "/api/menu";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving menu: " + err,
                menu: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                menu: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                menu: null
            });
        }
    }

    deleteBook = async (id) => {

        const url = "/api/menu/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err);
            return false;
        }

        if (response.status !== 204) {
            alert("Delete operation failed: status code " + response.status);
            return false;
        }

        this.fetchBooks();

        return true;
    };

    render() {

        let table;

        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>
        } else if (this.state.menu === null || this.state.menu.length === 0) {
            table = <p>There is no menu registered in the database</p>
        } else {
            table = <div>
                <table className="menu">
                    <thead>
                    <tr>
                        <th>Meal</th>
                        <th>Price</th>
                        <th>Allergies</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.menu.map(b =>
                        <tr key={"key_" + b.id} className="meal" >
                            <td>{b.name}</td>
                            <td>{b.price}</td>
                            <td>{b.allergies}</td>
                            <td>
                                <Link to={"/edit?mealId=" + b.id}>
                                    <button className="btn">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </Link>
                                <button className="btn" onClick={_ => this.deleteBook(b.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        }

        return (
            <div>
                <HeaderBar
                    userId={this.props.userId}
                    updateLoggedInUserId={this.props.updateLoggedInUserId}
                />
                <div>
                    <p className="appHeaderName">Mock Exam</p>
                </div>
                <h2>Menu</h2>
                <Link to={"/create"}>
                    <button className="btn">New meal</button>
                </Link>
                {table}
            </div>
        );
    }
}