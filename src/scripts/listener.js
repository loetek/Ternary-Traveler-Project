import dataCalls from "./Data"
import domComponents from "./domComponents"
import ternary from "./ternaryBuilder";


const ternaryListners = {

    saveEntry(){
            
        //!!!!!!!!!!! Bring in the name of the city id it will go in placeid: saveID.id!!!!!

            const saveID = event.target.name;
            const locName = document.querySelector("#nameInput").value;
            const locDesc = document.querySelector("#descriptionInput").value;
            const locCost = document.querySelector("#costInput").value;            

            const intObjectPost = {
                "dataSet": "interests",
                "fetchType": "POST",
                "dataBaseObject": {
                    "placeId": saveID,
                    "name": locName,
                    "description": locDesc,
                    "cost": locCost,
                    "review": "" 
                }
            }
            console.log(intObjectPost)
            dataCalls.connectToData(intObjectPost)
                .then(response => response.json)
                .then(() => {
                    $("#output").empty();
                    ternary.displayTernary();
                    ternary.createInputFields();
                })
        },

    deleteEntry() {
            //To delete from saved news articles.

        const deleteID = event.target.id.split("--")[1];
        console.log(deleteID);
            dataCalls.connectToData({
                    deleteId: deleteID,
                    dataSet: "interests",
                    fetchType: "DELETE"
                })
                .then(() => {
                    $("#output").empty();
                    ternary.displayTernary();
                    ternary.createInputFields();
                })
        },

    editEntry(){

        const editID = event.target.id;
        console.log(editID);


    },

    displayChoice(){
        // the item they chose will bring down and add delete buttons.
        const choiceButton = parseInt(event.target.value.split("--")[1]);
        console.log(choiceButton);

        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
        .then(responseInterests => {
            console.log(responseInterests);
            responseInterests.forEach(citys => {
               console.log(citys.id, choiceButton) 
            
            if (choiceButton === citys.id)
            {
                $("#output").empty();
                ternary.displayTernary(choiceButton);
                ternary.createInputFields();

            } 
                
        });
        });

    }
    

}

export default ternaryListners