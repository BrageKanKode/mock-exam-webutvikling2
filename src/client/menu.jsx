import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name ? this.props.name : "",
            price: this.props.price ? this.props.price : "",
            allergies: this.props.allergies ? this.props.allergies : ""
        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {
        event.preventDefault();

        const completed = await this.props.okCallback(
            this.state.name,
            this.state.price,
            this.state.allergies,
            this.props.mealId);

        if(completed) {
            this.props.history.push('/');
        } else {
            alert("Failed to update Meal")
        }
    };

    onAuthorChange = (event) => {
        this.setState({name: event.target.value});
    };

    onTitleChange = (event) => {
        this.setState({price: event.target.value});
    };

    onYearChange = (event) => {
        this.setState({allergies: event.target.value});
    };

    render() {

        return (


            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="inputTitle">Name:</div>
                    <input
                        placeholder={"Type the name of the meal"}
                        value={this.state.name}
                        onChange={this.onAuthorChange}
                        className="bookInput"
                    />
                    <div className="inputTitle">Price:</div>
                    <input
                        placeholder={"Type the price"}
                        value={this.state.price}
                        onChange={this.onTitleChange}
                        className="bookInput"
                    />
                    <div className="inputTitle">Allergies:</div>
                    <input
                        placeholder={"Type what allergies might trigger from it"}
                        value={this.state.allergies}
                        onChange={this.onYearChange}
                        className="bookInput"
                    />

                    <button type="submit" className={"btn"}>{this.ok}</button>
                    <Link to={"/"}><button className={"btn"}>Cancel</button></Link>
                </form>
            </div>
        );
    }
}


/*
    Needed, because otherwise this.props.history would be undefined
 */
export default withRouter(Menu);