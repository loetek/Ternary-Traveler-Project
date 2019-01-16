import dataCalls from "./Data"
import domComponents from "./domComponents"
import ternaryListeners from "./listener"


// dombuilder reference 

// elementType: "",
// content:"",
// cssClass:"",
// attributes: {
//     id:""
//     etc.....
// }

// let currentArticlesDiv = domComponents.createDomElement({
        //     elementType : "div",
        //     cssClass : "currentArticlesDiv",
        //     attributes : {
        //         id : "currentArticlesDiv"
        //     }
        // })


const ternary = {

    displayTernary()
    {
        const output = document.querySelector("#output");
        console.log(output)
        let mainContainer = domComponents.createDomElement({ elementType:"article",cssClass:"mainContainer", content:"MainBox" });
        console.log(mainContainer);
        output.appendChild(mainContainer);
        let interestCard = domComponents.createDomElement({elementType: "article",cssClass:"interestCard", content:``, attribute:{ id: "card" }});
        console.log(interestCard);
    

        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
        .then(responseInterests => {
            responseInterests.forEach(intDetails =>{
                console.log(intDetails);

                let cityContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"});
                let cityLabel = domComponents.createDomElement({elementType:"label", cssClass:"cityLabels", content:"City"})
                let citySection = domComponents.createDomElement({elementType:"section", cssClass:"citys", content:`${intDetails.name}`});

                //let visaContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
                let visaLabel = domComponents.createDomElement({elementType:"label", cssClass:"visaLabels", content:"Visa"})
                let visaSection = domComponents.createDomElement({elementType:"section", cssClass:"citys", content:`${intDetails.visa_required}`});
                
                let moveDisplayButton = domComponents.createDomElement({elementType:"button",content:"This One", cssClass:"buttons", attribute:{ id:"displayButton"}})
                
                cityContainer.appendChild(cityLabel);
                cityContainer.appendChild(citySection);
                cityContainer.appendChild(visaLabel);
                cityContainer.appendChild(visaSection);
                cityContainer.appendChild(moveDisplayButton);
                interestCard.appendChild(cityContainer);

                moveDisplayButton.addEventListener("click", ternaryListeners.displayChoice);
                //interestCard.appendChild(visaContainer);
                for(let intGran in intDetails)
                {
                   console.log(intGran.interests);

                }
            })
            mainContainer.appendChild(interestCard);
        })

      
    },

    createInputFields(){

        //structure
        let inputFields = domComponents.createDomElement({ elementType:"article",cssClass:"inputContainer"})
        console.log(inputFields);
        output.appendChild(inputFields);

        //labels and inputs
        let nameContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let nameLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Name: ", attributes:{ for:"name"}});
        let nameInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"nameInput", id: "nameInput" }})
        console.log(nameLabel, nameInput);
        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameInput);

        let descriptionContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let descriptionLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Description: ", attributes:{ for:"description"}});
        let descriptionInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"descriptionInput", id: "descriptionInput" }})
        console.log(descriptionLabel, descriptionInput);
        descriptionContainer.appendChild(descriptionLabel);
        descriptionContainer.appendChild(descriptionInput);

        let costContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let costLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Cost: ", attributes:{ for:"cost"}});
        let costInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"number", name:"costInput", id: "costInput" }})
        console.log(costLabel, costInput);
        costContainer.appendChild(costLabel);
        costContainer.appendChild(costInput);

        //toggle should go here.
        let chooseCityContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let chooseCityLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Cost: ", attributes:{ for:"cost"}});
        let chooseCityInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"number", name:"costInput", id: "costInput" }})
        console.log(costLabel, costInput);
        //sve bttn
        const saveButton = domComponents.createDomElement({elementType: "button", content: "Save", attributes: {type: "button", id: "saveEvent"}});
        
        saveButton.addEventListener("click", ternaryListeners.saveEntry);

        inputFields.appendChild(nameContainer);
        inputFields.appendChild(descriptionContainer);
        inputFields.appendChild(costContainer);
        inputFields.appendChild(saveButton);

        return inputFields;

    },

    citySelected(){
        // select which city you want to highlight and edit.


    }










}

export default ternary