import React from "react";
import Menu from "./menu";

export class Edit extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            meal: null,
            error: null
        };

        this.mealId = new URLSearchParams(window.location.search).get("mealId");

        if(this.mealId === null){
            this.state.error = "Unspecified meal id";
        }
    }

    componentDidMount(){
        if(this.state.error === null) {
            this.fetchBook();
        }
    }

    async fetchBook(){

        const url = "/api/menu/" + this.mealId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving meal: " + err,
                meal: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                meal: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                meal: null
            });
        }
    }


    onOk = async (name, price, allergies, id) => {

        const url = "/api/menu/"+id;

        const payload = {id, name, price, allergies};

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 204;
    };


    render(){

        if(this.state.error !== null){
            return(
                <div>
                    <p>Cannot edit meal. {this.state.error}</p>
                </div>
            );
        }

        if(this.state.meal === null){
            return(<p>Loading...</p>);
        }

        return(
            <div>
                <h3>Edit Meal</h3>
                <Menu
                    name={this.state.meal.name}
                    price={this.state.meal.price}
                    allergies={this.state.meal.allergies}
                    mealId={this.mealId}
                    ok={"Update"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}