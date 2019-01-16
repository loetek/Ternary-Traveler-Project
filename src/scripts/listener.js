import dataCalls from "./Data"
import domComponents from "./domComponents"
import ternary from "./ternaryBuilder";


const ternaryListners = {

    saveEntry(){
            
            const saveID = event.target.name;
            const locName = document.querySelector("#nameInput").value;
            const locDesc = document.querySelector("#descriptionInput").value;
            const locCost = document.querySelector("#costInput").value;            

            const intObjectPost = {
                "dataSet": "interests",
                "fetchType": "POST",
                "dataBaseObject": {
                    "placeId": 3,
                    "name": locName,
                    "description": locDesc,
                    "cost": locCost,
                    "review": "" 
                }
            }
            console.log(intObjectPost)
            dataCalls.connectToData(intObjectPost)
                .then(response => response.json)
                .then(newObj => {
                    console.log(newObj)
                    
                })
        },

    deleteEntry() {
            //To delete from saved news articles.
            const deleteID = event.target.id.split("--")[1];
            dataCalls.connectToData({
                    deleteId: deleteID,
                    dataSet: "newsItems",
                    fetchType: "DELETE",
                    
                })
                .then(() => {
                    //$("").remove();
                    //.savedNewsElementsCreator();
                })
        },

    displayChoice(){
        // the item they chose will bring down and add delete buttons.
        const choiceButton = event.target;
        console.log(choiceButton);  

    }
    

}

export default ternaryListners