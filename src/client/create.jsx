import React from "react";
import Menu from "./menu";

export class Create extends React.Component{

    constructor(props){
        super(props);
    }

    onOk = async (name, price, allergies, mealId) => {

        const url = "/api/menu";

        //note: here mealId is ignored
        const payload = {name, price, allergies};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 201;
    };


    render(){

        return(
            <div>
                <h3>Create a New Meal</h3>
                <Menu
                    name={""}
                    price={""}
                    allergies={""}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}