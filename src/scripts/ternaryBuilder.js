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

    welcome(){

        const output = document.querySelector("#output");
        console.log(output)
        let welcomeContainer = domComponents.createDomElement({ elementType:"article",cssClass:"welcomeContainer"});
        console.log(welcomeContainer);
        output.appendChild(welcomeContainer);
        
        let welcomeHeader = domComponents.createDomElement({elementType: "h1", cssClass: "h1Header",content:"Welcome and please choose from the following options." })
        let dropDownContainer = domComponents.createDomElement({elementType: "form", cssClass:"dropDownMainContainer"});
        let dropDownContentContainer = domComponents.createDomElement({elementType: "select", cssClass:"dropDownContentContainer", attributes:{id:"dropDown"}});
        
        welcomeContainer.appendChild(welcomeHeader);
        dropDownContainer.appendChild(dropDownContentContainer);

        let dropDownContentBlank = domComponents.createDomElement({elementType:"option", cssClass: "dropDownContent", content:"Choose a Shitty"})
        dropDownContentContainer.appendChild(dropDownContentBlank);

        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
        .then(responseInterests => {
            responseInterests.forEach(intDetails =>{
                console.log(intDetails);
                console.log(intDetails.name);
                console.log(intDetails.id);

                let dropDownContent = domComponents.createDomElement({elementType:"option", cssClass: "dropDownContent", content:`${intDetails.name}--${intDetails.id}`, attributes: {id:`city--${intDetails.id}` }})

                
                dropDownContentContainer.appendChild(dropDownContent);
            }) 

            
            dropDownContentContainer.addEventListener("change", ternaryListeners.displayChoice);    
            
            welcomeContainer.appendChild(dropDownContainer);
                 
              
            });

    },


    displayTernary(chosenOne)
    {
        console.log(chosenOne);
        const output = document.querySelector("#output");
       // console.log(output)
        let mainContainer = domComponents.createDomElement({ elementType:"article",cssClass:"mainContainer", content:"MainBox" });
       // console.log(mainContainer);
        output.appendChild(mainContainer);
        let interestCard = domComponents.createDomElement({elementType: "article",cssClass:"interestCard", content:``, attribute:{ id: "card" }});
       // console.log(interestCard);
    

        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
        .then(responseInterests => {
            responseInterests.forEach(intDetails =>{
                console.log(intDetails.name);
                    
                let cityContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets", attribute:{ id:`${intDetails.id}`}, tabIndex:`${intDetails.id}` });
                let cityLabel = domComponents.createDomElement({elementType:"label", cssClass:"labels"})
                let citySection = domComponents.createDomElement({elementType:"section", cssClass:"citys", content:`${intDetails.name}--${intDetails.id}`});

                let visaLabel = domComponents.createDomElement({elementType:"label", cssClass:"labels", content:"Do you need a Visa"})
                let visaSection = domComponents.createDomElement({elementType:"section", cssClass:"citys", content:`${intDetails.visa_required}`});

                
                cityContainer.appendChild(cityLabel);
                cityContainer.appendChild(citySection);
                cityContainer.appendChild(visaLabel);
                cityContainer.appendChild(visaSection);
                interestCard.appendChild(cityContainer);

                
            let locInterests = intDetails.interests;
            console.log(locInterests);
            locInterests.forEach(locIDetails =>{

                let locationInterestContainer = domComponents.createDomElement({ elementType:"article", cssClass:"locationArticle", attribute:{ id:`${intDetails.id}`}});

                let locNameLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Name "})
                let locNameSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${locIDetails.name}`});

                let locDescLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Description "})
                let locDescSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${locIDetails.description}`});
                
                let locCostLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Cost "})
                let locCostSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${locIDetails.cost}`});

                let locRevLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Review "})
                let locRevSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${locIDetails.review}`});

                let delLocation = domComponents.createDomElement({elementType:"button", cssClass:"button", content: "Delete Entry", attributes:{ id:`delButton--${locIDetails.id}`}});
                console.log(delLocation);

                let editLocation = domComponents.createDomElement({elementType:"button", cssClass:"button", content: "Edit Entry", attributes:{ id:`editButton--${locIDetails.id}`}});


                locationInterestContainer.appendChild(locNameLabel);
                locationInterestContainer.appendChild(locNameSection);
                locationInterestContainer.appendChild(locDescLabel);
                locationInterestContainer.appendChild(locDescSection);
                locationInterestContainer.appendChild(locCostLabel);
                locationInterestContainer.appendChild(locCostSection);
                locationInterestContainer.appendChild(locRevLabel);
                locationInterestContainer.appendChild(locRevSection);
                locationInterestContainer.appendChild(delLocation);
                locationInterestContainer.appendChild(editLocation);
                
                // console.log(delLocation);
                // console.log(editLocation);

                delLocation.addEventListener("click", ternaryListeners.deleteEntry);
                editLocation.addEventListener("click", ternaryListeners.editEntry);

                cityContainer.appendChild(locationInterestContainer);
                
            })
            
        
            mainContainer.appendChild(interestCard);
        
    

        })
    })
    },

    createInputFields(){

        //structure
        let inputFields = domComponents.createDomElement({ elementType:"article",cssClass:"inputContainer"})
        console.log(inputFields);
        output.appendChild(inputFields);

        //labels and inputs
        let nameContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let nameInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Name: ", attributes:{ for:"name"}});
        let nameInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"nameInput", id: "nameInput" }})
        console.log(nameInputLabel, nameInput);
        nameContainer.appendChild(nameInputLabel);
        nameContainer.appendChild(nameInput);

        let descriptionContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let descriptionInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Description: ", attributes:{ for:"description"}});
        let descriptionInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"descriptionInput", id: "descriptionInput" }})
        console.log(descriptionInputLabel, descriptionInput);
        descriptionContainer.appendChild(descriptionInputLabel);
        descriptionContainer.appendChild(descriptionInput);

        let costContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
        let costInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Cost: ", attributes:{ for:"cost"}});
        let costInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"number", name:"costInput", id: "costInput" }})
        console.log(costInputLabel, costInput);
        costContainer.appendChild(costInputLabel);
        costContainer.appendChild(costInput);

        //toggle should go here.
        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
       
        //sve bttn
        const saveButton = domComponents.createDomElement({elementType: "button", content: "Save", attributes: {type: "button", id: "saveEvent"}});
        
        saveButton.addEventListener("click", ternaryListeners.saveEntry);

        inputFields.appendChild(nameContainer);
        inputFields.appendChild(descriptionContainer);
        inputFields.appendChild(costContainer);
        inputFields.appendChild(saveButton);

        return inputFields;

    },


}

export default ternary