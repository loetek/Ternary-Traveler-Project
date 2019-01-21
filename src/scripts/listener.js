import dataCalls from "./Data"
import domComponents from "./domComponents"
import ternary from "./ternaryBuilder";


const ternaryListners = {

    formcheck() {
        let fields = $(".inputFields")
              fields.find("input").serializeArray();
        
        $.each(fields, function(i, field) {
          if (!field.value){
            alert(field.name + ' is required');
            return false;
          } else{
              return true;
          }
         }); 
        console.log(fields);

      },
    
    saveEntry(){
            
            ternaryListners.formcheck();
            const saveID = event.target.name;
            //console.log(saveID)
            //!!!This line is brillant it grabs the chosen city from the welcome page anywhere in the application. Pretty BA!!
            var citySelect = parseInt(document.getElementsByClassName("fieldsets")[0].getAttribute("id"));
            console.log(citySelect);
            const locName = document.querySelector("#nameInput").value;
            const locDesc = document.querySelector("#descriptionInput").value;
            const locCost = document.querySelector("#costInput").value;    
            const locRev = document.querySelector("#reviewInput").value;    
            console.log(locName);        

            const intObjectPost = {
                "dataSet": "interests",
                "fetchType": "POST",
                "dataBaseObject": {
                    "placeId": citySelect,
                    "name": locName,
                    "description": locDesc,
                    "cost": locCost,
                    "review": locRev 
                }
            }
            //console.log(intObjectPost)
            dataCalls.connectToData(intObjectPost)
                .then(response => response.json)
                .then(() => {
                    //!!!clears the whole page and rewrites the whole page with changes. 
                    $("#output").empty();
                    ternary.displayTernary(citySelect);
                    ternary.createInputFields();
                })
        },

    deleteEntry() {
            //To delete from saved news articles.

        const deleteID = event.target.id.split("--")[1];
        var citySelect = parseInt(document.getElementsByClassName("fieldsets")[0].getAttribute("id"));
            //console.log(citySelect);
            //console.log(deleteID);
            dataCalls.connectToData({
                    deleteId: deleteID,
                    dataSet: "interests",
                    fetchType: "DELETE"
                })
                .then(() => {
                    $("#output").empty();
                    ternary.displayTernary(citySelect);
                    ternary.createInputFields();
                })
        },

    editEntryCreator(){
        //TODO Add the edit button and logic.
        
        const editButton = parseInt(event.target.id.split("--")[1]);
        console.log(editButton);
        
        $("#output").empty();

        let editMainContainer = domComponents.createDomElement({ elementType:"article", cssClass:"mainEditContainer"})

        let editNameContainer = domComponents.createDomElement({ elementType:"section", cssClass:"editContainers"})
        let editNameInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Name: ", attributes:{ for:"name"}});
        let editNameInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"nameInput", id: `editNameInput--${editButton}` }})
        console.log(editNameInputLabel, editNameInput);
        
        let editDescriptionContainer = domComponents.createDomElement({ elementType:"section", cssClass:"editContainers"})
        let editDescriptionInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Description: ", attributes:{ for:"description"}});
        let editDescriptionInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"editDescriptionInput", id: `editDescriptionInput--${editButton}` }})
        console.log(editDescriptionInputLabel, editDescriptionInput);
        
        let editCostContainer = domComponents.createDomElement({ elementType:"section", cssClass:"editContainers"})
        let editCostInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Cost: ", attributes:{ for:"cost"}});
        let editCostInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"number", name:"editCostInput", id: `editCostInput--${editButton}` }})
        console.log(editCostInputLabel, editCostInput);
        
        let editReviewContainer = domComponents.createDomElement({ elementType:"section", cssClass:"editContainers"})
        let editReviewInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Review: ", attributes:{ for:"review"}});
        let editReviewInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"editReviewInput", id: `editReviewInput--${editButton}`}})
        console.log(editReviewInputLabel, editReviewInput);
        
        let updateButton = domComponents.createDomElement({ elementType:"button", cssClass:"button", content:"Update", attributes:{id:`${editButton}`} })
        console.log(updateButton);
        
        //!!! call for display of data being modified get certain interests based on editButton.
        fetch(`http://localhost:8088/interests?id=${editButton}&_expand=place`)
        .then(response => response.json())
        .then(rInterests => {
            rInterests.forEach(intDetails => {
                console.log(rInterests);
                
                let editedLocationInterestContainer = domComponents.createDomElement({ elementType:"article", cssClass:"editedLocationArticle", attribute:{ id:`${intDetails.id}`}});
                
                let editedLocNameLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Name : "})
                let editedLocNameSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${intDetails.name}`});
                console.log(editedLocNameLabel, editedLocNameSection) 
                
                let editedLocDescLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Description : "})
                let editedLocDescSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${intDetails.description}`});
                console.log(editedLocDescLabel, editedLocDescSection) 
                
                let editedLocCostLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Cost : "})
                let editedLocCostSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${intDetails.cost}`});
                console.log(editedLocCostLabel, editedLocCostSection) 
                
                let editedLocRevLabel = domComponents.createDomElement({elementType:"label", cssClass:"intLabels", content:" Location Review : "})
                let editedLocRevSection = domComponents.createDomElement({elementType:"section", cssClass:"intSections", content:`${intDetails.review}`});
                console.log(editedLocRevLabel, editedLocRevSection) 
                
                editedLocationInterestContainer.appendChild(editedLocNameLabel);
                editedLocationInterestContainer.appendChild(editedLocNameSection);
                editedLocationInterestContainer.appendChild(editedLocDescLabel);
                editedLocationInterestContainer.appendChild(editedLocDescSection);
                editedLocationInterestContainer.appendChild(editedLocCostLabel);
                editedLocationInterestContainer.appendChild(editedLocCostSection);
                editedLocationInterestContainer.appendChild(editedLocRevLabel);
                editedLocationInterestContainer.appendChild(editedLocRevSection);
                editMainContainer.appendChild(editedLocationInterestContainer);
                
            })
        })
        
        editNameContainer.appendChild(editNameInputLabel);
        editNameContainer.appendChild(editNameInput);
        editDescriptionContainer.appendChild(editDescriptionInputLabel);
        editDescriptionContainer.appendChild(editDescriptionInput);
        editCostContainer.appendChild(editCostInputLabel);
        editCostContainer.appendChild(editCostInput);
        editReviewContainer.appendChild(editReviewInputLabel);
        editReviewContainer.appendChild(editReviewInput);
        editMainContainer.appendChild(editNameContainer);
        editMainContainer.appendChild(editDescriptionContainer);
        editMainContainer.appendChild(editCostContainer);
        editMainContainer.appendChild(editReviewContainer);
        editMainContainer.appendChild(updateButton);
        output.appendChild(editMainContainer)

        
        updateButton.addEventListener("click", ternaryListners.executeEdits);
        
        return editButton;
    },

    executeEdits(updateChoice){

        const editedId = parseInt(event.target.id);
        console.log(editedId);

        const editedName = document.querySelector(`#editNameInput--${editedId}`).value;
        const editedDesc = document.querySelector(`#editDescriptionInput--${editedId}`).value;
        const editedCost = document.querySelector(`#editCostInput--${editedId}`).value;
        const editedRev = document.querySelector(`#editReviewInput--${editedId}`).value;
        console.log(editedName);
        console.log(editedDesc);
        console.log(editedCost);
        console.log(editedRev);

        if (editedName === "" || editedDesc === "" || editedCost === "" || editedRev=== "") {
            alert("No blank spaces allowed!!")
        } else {
            dataCalls.connectToData({
                putId: editedId,
                dataSet: "interests",
                fetchType: "PUT",
                dataBaseObject: {
                    placeid: 1,
                    name: editedName,
                    description: editedDesc,
                    cost: editedCost,
                    review: editedRev
                }
            })


        }



    },

    displayChoice(){
        // the item they chose will bring down and add delete buttons.
        const choiceButton = parseInt(event.target.value.split("--")[1]);
        //console.log(choiceButton);

        dataCalls.connectToData({
            dataSet: "places",
            fetchType: "GET",
            dataBaseObject: "",
            embedItem: "?_embed=interests"
          })
        .then(responseInterests => {
            //console.log(responseInterests);
            responseInterests.forEach(citys => {
               //console.log(citys.id, choiceButton) 
            
            if (choiceButton === citys.id)
            {
                $("#output").empty();
                ternary.displayTernary(choiceButton);
                ternary.createInputFields(choiceButton);

            } 
                
        });
        });

    }


}

export default ternaryListners