(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const dataCalls = {
  connectToData(fetchObject) {
    let dataSet = fetchObject.dataSet;
    let embedItem = fetchObject.embedItem;
    let fetchType = fetchObject.fetchType;
    let dataBaseObject = fetchObject.dataBaseObject;
    let putId = fetchObject.putId;
    let deleteId = fetchObject.deleteId;

    if (fetchType == "GET") {
      return fetch(`http://localhost:8088/${dataSet}${embedItem}`).then(response => response.json()); // parses response to JSON
    } else if (fetchType === "POST") {
      // Default options are marked with *
      return fetch(`http://localhost:8088/${dataSet}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        },
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(dataBaseObject) // body data type must match "Content-Type" header

      });
    } else if (fetchType === "PUT") {
      return fetch(`http://localhost:8088/${dataSet}/${putId}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        },
        body: JSON.stringify(dataBaseObject) // body data type must match "Content-Type" header

      });
    } else if (fetchType === "DELETE") {
      return fetch(`http://localhost:8088/${dataSet}/${deleteId}`, {
        method: `${fetchType}`,
        // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8" // "Content-Type": "application/x-www-form-urlencoded",

        } // referrer: "no-referrer", // no-referrer, *client

      });
    } else {
      console.log("YOU SCREWED IT UP");
    }
  }

};
var _default = dataCalls;
exports.default = _default;

},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const domComponents = {
  createDomElement({
    elementType,
    content = null,
    cssClass,
    attributes = {}
  }) {
    const element = document.createElement(elementType);
    element.textContent = content;

    if (cssClass) {
      element.classList.add(cssClass);
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    return element;
  }

};
var _default = domComponents;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Data = _interopRequireDefault(require("./Data"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _ternaryBuilder = _interopRequireDefault(require("./ternaryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ternaryListners = {
  formcheck() {
    let fields = $(".inputFields");
    fields.find("input").serializeArray();
    $.each(fields, function (i, field) {
      if (!field.value) {
        alert(field.name + ' is required');
        return false;
      } else {
        return true;
      }
    });
    console.log(fields);
  },

  saveEntry() {
    ternaryListners.formcheck();
    const saveID = event.target.name; //console.log(saveID)
    //!!!This line is brillant it grabs the chosen city from the welcome page anywhere in the application. Pretty BA!!

    var citySelect = parseInt(document.getElementsByClassName("cityTitle")[0].getAttribute("id"));
    console.log(citySelect);
    const locName = document.querySelector("#nameInput").value;
    const locDesc = document.querySelector("#descriptionInput").value;
    const locCost = document.querySelector("#costInput").value; //const locRev = document.querySelector("#reviewInput").value;

    console.log(locName);
    const intObjectPost = {
      "dataSet": "interests",
      "fetchType": "POST",
      "dataBaseObject": {
        "placeId": citySelect,
        "name": locName,
        "description": locDesc,
        "cost": locCost //"review": locRev

      } //console.log(intObjectPost)

    };

    _Data.default.connectToData(intObjectPost).then(response => response.json).then(() => {
      //!!!clears the whole page and rewrites the whole page with changes.
      $("#output").empty();

      _ternaryBuilder.default.displayTernary(citySelect);

      _ternaryBuilder.default.createInputFields(citySelect);
    });
  },

  deleteEntry() {
    //To delete from saved news articles.
    const deleteID = event.target.id.split("--")[1];
    var citySelect = parseInt(document.getElementsByClassName("cityTitle")[0].getAttribute("id")); //console.log(citySelect);
    //console.log(deleteID);

    _Data.default.connectToData({
      deleteId: deleteID,
      dataSet: "interests",
      fetchType: "DELETE"
    }).then(() => {
      $("#output").empty();

      _ternaryBuilder.default.displayTernary(citySelect);

      _ternaryBuilder.default.createInputFields();
    });
  },

  editEntryCreator() {
    const editButton = parseInt(event.target.id.split("--")[1]);
    const cityeditChoice = parseInt(event.target.id.split("--")[2]);
    console.log(cityeditChoice);
    console.log(editButton);
    $("#output").empty();

    let editMainContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "mainEditContainer"
    });

    let editNameContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "editContainers"
    });

    let editNameInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Name: ",
      attributes: {
        for: "name"
      }
    });

    let editNameInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "nameInput",
        id: `editNameInput--${editButton}`
      }
    });

    console.log(editNameInputLabel, editNameInput);

    let editDescriptionContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "editContainers"
    });

    let editDescriptionInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Description: ",
      attributes: {
        for: "description"
      }
    });

    let editDescriptionInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "editDescriptionInput",
        id: `editDescriptionInput--${editButton}`
      }
    });

    console.log(editDescriptionInputLabel, editDescriptionInput);

    let editCostContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "editContainers"
    });

    let editCostInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Cost: ",
      attributes: {
        for: "cost"
      }
    });

    let editCostInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "number",
        name: "editCostInput",
        id: `editCostInput--${editButton}`
      }
    });

    console.log(editCostInputLabel, editCostInput);

    let editReviewContainer = _domComponents.default.createDomElement({
      elementType: "section",
      cssClass: "editContainers"
    });

    let editReviewInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Review: ",
      attributes: {
        for: "review"
      }
    });

    let editReviewInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "editReviewInput",
        id: `editReviewInput--${editButton}`
      }
    });

    console.log(editReviewInputLabel, editReviewInput);

    let updateButton = _domComponents.default.createDomElement({
      elementType: "button",
      cssClass: "button",
      content: "Update",
      attributes: {
        id: `${editButton}--${cityeditChoice}`
      }
    });

    console.log(updateButton); //!!! call for display of data being modified get certain interests based on editButton.

    fetch(`http://localhost:8088/interests?id=${editButton}&_expand=place`).then(response => response.json()).then(rInterests => {
      rInterests.forEach(intDetails => {
        console.log(rInterests);

        let editedLocationInterestContainer = _domComponents.default.createDomElement({
          elementType: "article",
          cssClass: "editedLocationArticle",
          attribute: {
            id: `${intDetails.id}`
          }
        });

        let editedLocNameLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Name : "
        });

        let editedLocNameSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.name}`
        });

        console.log(editedLocNameLabel, editedLocNameSection);

        let editedLocDescLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Description : "
        });

        let editedLocDescSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.description}`
        });

        console.log(editedLocDescLabel, editedLocDescSection);

        let editedLocCostLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Cost : "
        });

        let editedLocCostSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.cost}`
        });

        console.log(editedLocCostLabel, editedLocCostSection);

        let editedLocRevLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Review : "
        });

        let editedLocRevSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.review}`
        });

        console.log(editedLocRevLabel, editedLocRevSection);
        editedLocationInterestContainer.appendChild(editedLocNameLabel);
        editedLocationInterestContainer.appendChild(editedLocNameSection);
        editedLocationInterestContainer.appendChild(editedLocDescLabel);
        editedLocationInterestContainer.appendChild(editedLocDescSection);
        editedLocationInterestContainer.appendChild(editedLocCostLabel);
        editedLocationInterestContainer.appendChild(editedLocCostSection);
        editedLocationInterestContainer.appendChild(editedLocRevLabel);
        editedLocationInterestContainer.appendChild(editedLocRevSection);
        editMainContainer.appendChild(editedLocationInterestContainer);
      });
    });
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
    output.appendChild(editMainContainer);
    updateButton.addEventListener("click", ternaryListners.executeEdits);
    return editButton;
  },

  executeEdits(updateChoice) {
    //const editedId = parseInt(event.target.id);
    const editedId = parseInt(event.target.id.split("--")[0]);
    const cityChoiceUpdate = parseInt(event.target.id.split("--")[1]); // console.log(editedId);

    console.log(cityChoiceUpdate);
    const editedName = document.querySelector(`#editNameInput--${editedId}`).value;
    const editedDesc = document.querySelector(`#editDescriptionInput--${editedId}`).value;
    const editedCost = document.querySelector(`#editCostInput--${editedId}`).value;
    const editedRev = document.querySelector(`#editReviewInput--${editedId}`).value; // console.log(editedName);
    // console.log(editedDesc);
    // console.log(editedCost);
    // console.log(editedRev);
    //!! THIS WILL UPDATE THE DB EVERYTHING WORKING.

    if (editedName === "" || editedDesc === "" || editedCost === "" || editedRev === "") {
      alert("No blank spaces allowed!!");
    } else {
      _Data.default.connectToData({
        putId: editedId,
        dataSet: "interests",
        fetchType: "PUT",
        dataBaseObject: {
          placeId: cityChoiceUpdate,
          name: editedName,
          description: editedDesc,
          cost: editedCost,
          review: editedRev
        }
      }).then(data => {
        $("#output").empty();

        _ternaryBuilder.default.displayTernary(cityChoiceUpdate);

        _ternaryBuilder.default.createInputFields(cityChoiceUpdate);
      });
    } //TODO STILL NEED TO WIPE THE SCREEN AND DISPLAY.

  },

  displayChoice() {
    // the item they chose will bring down and add delete buttons.
    const choiceButton = parseInt(event.target.value.split("--")[1]);
    console.log(choiceButton);

    _Data.default.connectToData({
      dataSet: "places",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=interests"
    }).then(responseInterests => {
      //console.log(responseInterests);
      responseInterests.forEach(citys => {
        //console.log(citys.id, choiceButton)
        if (choiceButton === citys.id) {
          $("#output").empty();
          ternaryListners.createTitle(choiceButton);

          _ternaryBuilder.default.displayTernary(choiceButton);

          _ternaryBuilder.default.createInputFields(choiceButton);
        }
      });
    });
  },

  createTitle(choiceButton) {
    //!!Creation of the return to landing page button.
    const chosenOne = choiceButton;
    console.log(chosenOne);

    const homeButton = _domComponents.default.createDomElement({
      elementType: "a",
      cssClass: "homeButton",
      content: "HOME",
      attributes: {
        id: "homeButton"
      }
    });

    title.appendChild(homeButton);
    homeButton.addEventListener("click", _ternaryBuilder.default.welcome); //!! Quick fetch call for the city name. For some reason it would not work in the other fetch loop. It needed to be particular to this fetch.

    fetch(`http://localhost:8088/places?id=${chosenOne}`).then(response => response.json()).then(r => {
      console.log(r);
      r.forEach(rDetails => {
        const cityName = _domComponents.default.createDomElement({
          elementType: "h2",
          cssClass: "cityTitle",
          content: `${rDetails.name}`,
          attributes: {
            id: `${chosenOne}`
          }
        });

        console.log(cityName);
        homeButton.appendChild(cityName);
      });
    });
  }

};
var _default = ternaryListners;
exports.default = _default;

},{"./Data":1,"./domComponents":3,"./ternaryBuilder":6}],5:[function(require,module,exports){
"use strict";

var _ternaryBuilder = _interopRequireDefault(require("./ternaryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ternaryBuilder.default.welcome(); //ternary.displayTernary();
//ternary.createInputFields();

},{"./ternaryBuilder":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Data = _interopRequireDefault(require("./Data"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _listener = _interopRequireDefault(require("./listener"));

var _Travler = _interopRequireDefault(require("./Travler.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//!!!  id = cityConstant    ---> class = cityTitle
//todo rewrap everything, change clears to isolate containers, point at cityTitle per page.
const ternary = {
  welcome() {
    // Landing page. Choose the city and you can make your adjustments once you are on that screen.
    const output = document.querySelector("#output");
    $("#output").empty();
    $("#title").empty(); //console.log(output)

    let welcomeContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "welcomeContainer"
    }); //console.log(welcomeContainer);


    output.appendChild(welcomeContainer);

    let welcomeHeader = _domComponents.default.createDomElement({
      elementType: "h1",
      cssClass: "h1Header",
      content: "Welcome and please choose from the following options."
    });

    let dropDownContainer = _domComponents.default.createDomElement({
      elementType: "form",
      cssClass: "dropDownMainContainer"
    });

    let dropDownContentContainer = _domComponents.default.createDomElement({
      elementType: "select",
      cssClass: "dropDownContentContainer",
      attributes: {
        id: "dropDown"
      }
    });

    welcomeContainer.appendChild(welcomeHeader);
    dropDownContainer.appendChild(dropDownContentContainer);

    let dropDownContentBlank = _domComponents.default.createDomElement({
      elementType: "option",
      cssClass: "dropDownContent",
      content: "Choose a Shitty"
    });

    dropDownContentContainer.appendChild(dropDownContentBlank);

    _Data.default.connectToData({
      dataSet: "places",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=interests"
    }).then(responseInterests => {
      responseInterests.forEach(intDetails => {
        // console.log(intDetails);
        // console.log(intDetails.name);
        // console.log(intDetails.id);
        let dropDownContent = _domComponents.default.createDomElement({
          elementType: "option",
          cssClass: "dropDownContent",
          content: `${intDetails.name}--${intDetails.id}`,
          attributes: {
            id: `city--${intDetails.id}`
          }
        });

        console.log(dropDownContent);
        dropDownContentContainer.appendChild(dropDownContent);
      });
      dropDownContentContainer.addEventListener("change", _listener.default.displayChoice);
      welcomeContainer.appendChild(dropDownContainer);
    });
  },

  displayTernary(chosenOne) {
    // console.log(chosenOne);
    const output = document.querySelector("#output"); // console.log(output)

    let mainContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "mainContainer"
    }); // console.log(mainContainer);


    output.appendChild(mainContainer);

    let interestCard = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "interestCard",
      content: ``,
      attribute: {
        id: "card"
      }
    }); // console.log(interestCard);


    fetch(`http://localhost:8088/interests?placeId=${chosenOne}&_expand=place`).then(response => response.json()).then(rInterests => {
      console.log(rInterests); //!!For loop to assign information from DB to display.

      rInterests.forEach(intDetails => {
        console.log(intDetails.place.id);
        console.log(intDetails); //!! City container labels and section information.

        let cityContainer = _domComponents.default.createDomElement({
          elementType: "fieldset",
          cssClass: "fieldsets",
          attributes: {
            id: `city--${intDetails.place.id}`
          },
          tabIndex: `${intDetails.place.id}`
        });

        let cityLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "labels"
        });

        let citySection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "citys",
          content: `${intDetails.name}--${intDetails.id}`
        });

        console.log(cityContainer);

        let visaLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "labels",
          content: "Do you need a Visa"
        });

        let visaSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "citys",
          content: `${intDetails.visa_required}`
        });

        cityContainer.appendChild(cityLabel);
        cityContainer.appendChild(citySection);
        cityContainer.appendChild(visaLabel);
        cityContainer.appendChild(visaSection);
        interestCard.appendChild(cityContainer); //!!! Remaining information regarding location details.

        let locationInterestContainer = _domComponents.default.createDomElement({
          elementType: "article",
          cssClass: "locationArticle",
          attribute: {
            id: `${intDetails.id}`
          }
        });

        let locNameLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Name "
        });

        let locNameSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.name}`
        });

        let locDescLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Description "
        });

        let locDescSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.description}`
        });

        let locCostLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Cost "
        });

        let locCostSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.cost}`
        });

        let locRevLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "intLabels",
          content: " Location Review "
        });

        let locRevSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "intSections",
          content: `${intDetails.review}`
        });

        let delLocation = _domComponents.default.createDomElement({
          elementType: "button",
          cssClass: "button",
          content: "Delete Entry",
          attributes: {
            id: `delButton--${intDetails.id}`
          }
        }); //console.log(delLocation);


        let editLocation = _domComponents.default.createDomElement({
          elementType: "button",
          cssClass: "button",
          content: "Edit Entry",
          attributes: {
            id: `editButton--${intDetails.id}--${intDetails.place.id}`
          }
        }); //console.log(editLocation.id);


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
        delLocation.addEventListener("click", _listener.default.deleteEntry);
        editLocation.addEventListener("click", _listener.default.editEntryCreator);
        interestCard.appendChild(locationInterestContainer);
      });
    });
    mainContainer.appendChild(interestCard);
  },

  createInputFields(citySelect) {
    // var cityInputSelect = parseInt(document.getElementsByClassName("fieldsets")[0].getAttribute("id"));
    // console.log(cityInputSelect);
    //structure
    console.log(citySelect);
    let mainContainer = document.querySelector(".mainContainer");
    console.log(mainContainer);

    let inputFields = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "inputContainer"
    });

    console.log(inputFields);
    output.appendChild(inputFields); //!!! Container, labels and inputs for all the location inputs.

    let nameContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let nameInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Name: ",
      attributes: {
        for: "name"
      }
    });

    let nameInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "nameInput",
        id: "nameInput"
      }
    }); //console.log(nameInputLabel, nameInput);


    nameContainer.appendChild(nameInputLabel);
    nameContainer.appendChild(nameInput);

    let descriptionContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let descriptionInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Description: ",
      attributes: {
        for: "description"
      }
    });

    let descriptionInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "descriptionInput",
        id: "descriptionInput"
      }
    }); //console.log(descriptionInputLabel, descriptionInput);


    descriptionContainer.appendChild(descriptionInputLabel);
    descriptionContainer.appendChild(descriptionInput);

    let costContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let costInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Cost: ",
      attributes: {
        for: "cost"
      }
    });

    let costInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "number",
        name: "costInput",
        id: "costInput"
      }
    }); //console.log(costInputLabel, costInput);


    costContainer.appendChild(costInputLabel);
    costContainer.appendChild(costInput); // let reviewContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})
    // let reviewInputLabel = domComponents.createDomElement({ elementType:"label", cssClass:"inputLabels", content:"Review: ", attributes:{ for:"review"}});
    // let reviewInput = domComponents.createDomElement({ elementType:"input", cssClass:"inputFields", attributes:{ type:"text", name:"reviewInput", id: "reviewInput" }})
    //console.log(reviewInputLabel, reviewInput);
    // reviewContainer.appendChild(reviewInputLabel);
    // reviewContainer.appendChild(reviewInput);
    //sve bttn

    const saveButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Save",
      attributes: {
        type: "button",
        id: "saveEvent"
      }
    });

    inputFields.appendChild(nameContainer);
    inputFields.appendChild(descriptionContainer);
    inputFields.appendChild(costContainer); // inputFields.appendChild(reviewContainer);

    inputFields.appendChild(saveButton);
    mainContainer.appendChild(inputFields);
    saveButton.addEventListener("click", _listener.default.saveEntry);
    return inputFields;
  }

};
var _default = ternary;
exports.default = _default;

},{"./Data":1,"./Travler.png":2,"./domComponents":3,"./listener":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGEuanMiLCIuLi9zY3JpcHRzL1RyYXZsZXIucG5nIiwiLi4vc2NyaXB0cy9kb21Db21wb25lbnRzLmpzIiwiLi4vc2NyaXB0cy9saXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGVybmFyeUJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNFQSxNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsYUFBYSxDQUFDLFdBQUQsRUFBYztBQUV2QixRQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBMUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBakM7QUFDQSxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBeEI7QUFDQSxRQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBM0I7O0FBRUEsUUFBSSxTQUFTLElBQUksS0FBakIsRUFBd0I7QUFDeEIsYUFBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsR0FBRSxTQUFVLEVBQTlDLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUCxDQUR3QixDQUVlO0FBRXRDLEtBSkQsTUFJTyxJQUFJLFNBQVMsS0FBSyxNQUFsQixFQUF5QjtBQUVoQztBQUNBLGFBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLEVBQWxDLEVBQXFDO0FBQzdDLFFBQUEsTUFBTSxFQUFHLEdBQUUsU0FBVSxFQUR3QjtBQUNyQjtBQUN4QixRQUFBLE9BQU8sRUFBRTtBQUNMLDBCQUFnQixpQ0FEWCxDQUVMOztBQUZLLFNBRm9DO0FBTTdDO0FBQ0EsUUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUws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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jb25zdCBkYXRhQ2FsbHMgPSB7XG5cbiAgICBjb25uZWN0VG9EYXRhKGZldGNoT2JqZWN0KSB7XG5cbiAgICAgICAgbGV0IGRhdGFTZXQgPSBmZXRjaE9iamVjdC5kYXRhU2V0O1xuICAgICAgICBsZXQgZW1iZWRJdGVtID0gZmV0Y2hPYmplY3QuZW1iZWRJdGVtO1xuICAgICAgICBsZXQgZmV0Y2hUeXBlID0gZmV0Y2hPYmplY3QuZmV0Y2hUeXBlO1xuICAgICAgICBsZXQgZGF0YUJhc2VPYmplY3QgPSBmZXRjaE9iamVjdC5kYXRhQmFzZU9iamVjdDtcbiAgICAgICAgbGV0IHB1dElkID0gZmV0Y2hPYmplY3QucHV0SWQ7XG4gICAgICAgIGxldCBkZWxldGVJZCA9IGZldGNoT2JqZWN0LmRlbGV0ZUlkO1xuXG4gICAgICAgIGlmIChmZXRjaFR5cGUgPT0gXCJHRVRcIikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9JHtlbWJlZEl0ZW19YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cblxuICAgICAgICB9IGVsc2UgaWYgKGZldGNoVHlwZSA9PT0gXCJQT1NUXCIpe1xuXG4gICAgICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2UgaWYoZmV0Y2hUeXBlID09PSBcIlBVVFwiKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fS8ke3B1dElkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogYCR7ZmV0Y2hUeXBlfWAsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFCYXNlT2JqZWN0KSwvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZmV0Y2hUeXBlID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGF0YVNldH0vJHtkZWxldGVJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gbm8tcmVmZXJyZXIsICpjbGllbnRcbiAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIChcIllPVSBTQ1JFV0VEIElUIFVQXCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFDYWxscyIsIiIsIlxuXG5cblxuY29uc3QgZG9tQ29tcG9uZW50cyA9IHtcbiAgICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcywgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsImltcG9ydCBkYXRhQ2FsbHMgZnJvbSBcIi4vRGF0YVwiXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCJcbmltcG9ydCB0ZXJuYXJ5IGZyb20gXCIuL3Rlcm5hcnlCdWlsZGVyXCI7XG5cblxuY29uc3QgdGVybmFyeUxpc3RuZXJzID0ge1xuXG4gICAgZm9ybWNoZWNrKCkge1xuICAgICAgICBsZXQgZmllbGRzID0gJChcIi5pbnB1dEZpZWxkc1wiKVxuICAgICAgICAgICAgICBmaWVsZHMuZmluZChcImlucHV0XCIpLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgICAgICAgJC5lYWNoKGZpZWxkcywgZnVuY3Rpb24oaSwgZmllbGQpIHtcbiAgICAgICAgICBpZiAoIWZpZWxkLnZhbHVlKXtcbiAgICAgICAgICAgIGFsZXJ0KGZpZWxkLm5hbWUgKyAnIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coZmllbGRzKTtcblxuICAgICAgfSxcblxuICAgIHNhdmVFbnRyeSgpe1xuXG4gICAgICAgICAgICB0ZXJuYXJ5TGlzdG5lcnMuZm9ybWNoZWNrKCk7XG4gICAgICAgICAgICBjb25zdCBzYXZlSUQgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2F2ZUlEKVxuICAgICAgICAgICAgLy8hISFUaGlzIGxpbmUgaXMgYnJpbGxhbnQgaXQgZ3JhYnMgdGhlIGNob3NlbiBjaXR5IGZyb20gdGhlIHdlbGNvbWUgcGFnZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb24uIFByZXR0eSBCQSEhXG4gICAgICAgICAgICB2YXIgY2l0eVNlbGVjdCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaXR5VGl0bGVcIilbMF0uZ2V0QXR0cmlidXRlKFwiaWRcIikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lSW5wdXRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBsb2NEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvbklucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbG9jQ29zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29zdElucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgLy9jb25zdCBsb2NSZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jldmlld0lucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jTmFtZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGludE9iamVjdFBvc3QgPSB7XG4gICAgICAgICAgICAgICAgXCJkYXRhU2V0XCI6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgXCJmZXRjaFR5cGVcIjogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicGxhY2VJZFwiOiBjaXR5U2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogbG9jTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBsb2NEZXNjLFxuICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogbG9jQ29zdCxcbiAgICAgICAgICAgICAgICAgICAgLy9cInJldmlld1wiOiBsb2NSZXZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGludE9iamVjdFBvc3QpXG4gICAgICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YShpbnRPYmplY3RQb3N0KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyEhIWNsZWFycyB0aGUgd2hvbGUgcGFnZSBhbmQgcmV3cml0ZXMgdGhlIHdob2xlIHBhZ2Ugd2l0aCBjaGFuZ2VzLlxuICAgICAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuZGlzcGxheVRlcm5hcnkoY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoY2l0eVNlbGVjdCk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgZGVsZXRlRW50cnkoKSB7XG4gICAgICAgICAgICAvL1RvIGRlbGV0ZSBmcm9tIHNhdmVkIG5ld3MgYXJ0aWNsZXMuXG5cbiAgICAgICAgY29uc3QgZGVsZXRlSUQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcbiAgICAgICAgdmFyIGNpdHlTZWxlY3QgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2l0eVRpdGxlXCIpWzBdLmdldEF0dHJpYnV0ZShcImlkXCIpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlbGV0ZUlEKTtcbiAgICAgICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlSWQ6IGRlbGV0ZUlELFxuICAgICAgICAgICAgICAgICAgICBkYXRhU2V0OiBcImludGVyZXN0c1wiLFxuICAgICAgICAgICAgICAgICAgICBmZXRjaFR5cGU6IFwiREVMRVRFXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGVybmFyeS5kaXNwbGF5VGVybmFyeShjaXR5U2VsZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgdGVybmFyeS5jcmVhdGVJbnB1dEZpZWxkcygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICBlZGl0RW50cnlDcmVhdG9yKCl7XG5cblxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pO1xuICAgICAgICBjb25zdCBjaXR5ZWRpdENob2ljZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzJdKTtcbiAgICAgICAgY29uc29sZS5sb2coY2l0eWVkaXRDaG9pY2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhlZGl0QnV0dG9uKTtcblxuICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuXG5cbiAgICAgICAgbGV0IGVkaXRNYWluQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsIGNzc0NsYXNzOlwibWFpbkVkaXRDb250YWluZXJcIn0pXG5cbiAgICAgICAgbGV0IGVkaXROYW1lQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiZWRpdENvbnRhaW5lcnNcIn0pXG4gICAgICAgIGxldCBlZGl0TmFtZUlucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIk5hbWU6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwibmFtZVwifX0pO1xuICAgICAgICBsZXQgZWRpdE5hbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcInRleHRcIiwgbmFtZTpcIm5hbWVJbnB1dFwiLCBpZDogYGVkaXROYW1lSW5wdXQtLSR7ZWRpdEJ1dHRvbn1gIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0TmFtZUlucHV0TGFiZWwsIGVkaXROYW1lSW5wdXQpO1xuXG4gICAgICAgIGxldCBlZGl0RGVzY3JpcHRpb25Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJlZGl0Q29udGFpbmVyc1wifSlcbiAgICAgICAgbGV0IGVkaXREZXNjcmlwdGlvbklucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIkRlc2NyaXB0aW9uOiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImRlc2NyaXB0aW9uXCJ9fSk7XG4gICAgICAgIGxldCBlZGl0RGVzY3JpcHRpb25JbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcInRleHRcIiwgbmFtZTpcImVkaXREZXNjcmlwdGlvbklucHV0XCIsIGlkOiBgZWRpdERlc2NyaXB0aW9uSW5wdXQtLSR7ZWRpdEJ1dHRvbn1gIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0RGVzY3JpcHRpb25JbnB1dExhYmVsLCBlZGl0RGVzY3JpcHRpb25JbnB1dCk7XG5cbiAgICAgICAgbGV0IGVkaXRDb3N0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiZWRpdENvbnRhaW5lcnNcIn0pXG4gICAgICAgIGxldCBlZGl0Q29zdElucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIkNvc3Q6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwiY29zdFwifX0pO1xuICAgICAgICBsZXQgZWRpdENvc3RJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcIm51bWJlclwiLCBuYW1lOlwiZWRpdENvc3RJbnB1dFwiLCBpZDogYGVkaXRDb3N0SW5wdXQtLSR7ZWRpdEJ1dHRvbn1gIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0Q29zdElucHV0TGFiZWwsIGVkaXRDb3N0SW5wdXQpO1xuXG4gICAgICAgIGxldCBlZGl0UmV2aWV3Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiZWRpdENvbnRhaW5lcnNcIn0pXG4gICAgICAgIGxldCBlZGl0UmV2aWV3SW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiUmV2aWV3OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcInJldmlld1wifX0pO1xuICAgICAgICBsZXQgZWRpdFJldmlld0lucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZWRpdFJldmlld0lucHV0XCIsIGlkOiBgZWRpdFJldmlld0lucHV0LS0ke2VkaXRCdXR0b259YH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0UmV2aWV3SW5wdXRMYWJlbCwgZWRpdFJldmlld0lucHV0KTtcblxuICAgICAgICBsZXQgdXBkYXRlQnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJidXR0b25cIiwgY3NzQ2xhc3M6XCJidXR0b25cIiwgY29udGVudDpcIlVwZGF0ZVwiLCBhdHRyaWJ1dGVzOntpZDpgJHtlZGl0QnV0dG9ufS0tJHtjaXR5ZWRpdENob2ljZX1gfSB9KVxuICAgICAgICBjb25zb2xlLmxvZyh1cGRhdGVCdXR0b24pO1xuXG4gICAgICAgIC8vISEhIGNhbGwgZm9yIGRpc3BsYXkgb2YgZGF0YSBiZWluZyBtb2RpZmllZCBnZXQgY2VydGFpbiBpbnRlcmVzdHMgYmFzZWQgb24gZWRpdEJ1dHRvbi5cbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHM/aWQ9JHtlZGl0QnV0dG9ufSZfZXhwYW5kPXBsYWNlYClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihySW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIHJJbnRlcmVzdHMuZm9yRWFjaChpbnREZXRhaWxzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhySW50ZXJlc3RzKTtcblxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsIGNzc0NsYXNzOlwiZWRpdGVkTG9jYXRpb25BcnRpY2xlXCIsIGF0dHJpYnV0ZTp7IGlkOmAke2ludERldGFpbHMuaWR9YH19KTtcblxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NOYW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBOYW1lIDogXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NOYW1lU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZExvY05hbWVMYWJlbCwgZWRpdGVkTG9jTmFtZVNlY3Rpb24pXG5cbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jRGVzY0xhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gRGVzY3JpcHRpb24gOiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY0Rlc2NTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMuZGVzY3JpcHRpb259YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZExvY0Rlc2NMYWJlbCwgZWRpdGVkTG9jRGVzY1NlY3Rpb24pXG5cbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jQ29zdExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gQ29zdCA6IFwifSlcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jQ29zdFNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5jb3N0fWB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0ZWRMb2NDb3N0TGFiZWwsIGVkaXRlZExvY0Nvc3RTZWN0aW9uKVxuXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY1JldkxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gUmV2aWV3IDogXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NSZXZTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMucmV2aWV3fWB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0ZWRMb2NSZXZMYWJlbCwgZWRpdGVkTG9jUmV2U2VjdGlvbilcblxuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jTmFtZUxhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY05hbWVTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY0Rlc2NMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NEZXNjU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NDb3N0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jQ29zdFNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jUmV2TGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jUmV2U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgZWRpdE1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBlZGl0TmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0TmFtZUlucHV0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXROYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXROYW1lSW5wdXQpO1xuICAgICAgICAgICAgICAgIGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0RGVzY3JpcHRpb25JbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0RGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdERlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIGVkaXRDb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb3N0SW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdENvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdENvc3RJbnB1dCk7XG4gICAgICAgICAgICAgICAgZWRpdFJldmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UmV2aWV3SW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdFJldmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UmV2aWV3SW5wdXQpO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXROYW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBlZGl0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0RGVzY3JpcHRpb25Db250YWluZXIpO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb3N0Q29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBlZGl0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UmV2aWV3Q29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBlZGl0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh1cGRhdGVCdXR0b24pO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChlZGl0TWFpbkNvbnRhaW5lcilcblxuXG4gICAgICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RuZXJzLmV4ZWN1dGVFZGl0cyk7XG5cbiAgICAgICAgcmV0dXJuIGVkaXRCdXR0b247XG4gICAgfSxcblxuICAgIGV4ZWN1dGVFZGl0cyh1cGRhdGVDaG9pY2Upe1xuXG4gICAgICAgIC8vY29uc3QgZWRpdGVkSWQgPSBwYXJzZUludChldmVudC50YXJnZXQuaWQpO1xuICAgICAgICBjb25zdCBlZGl0ZWRJZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzBdKTtcbiAgICAgICAgY29uc3QgY2l0eUNob2ljZVVwZGF0ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZWRpdGVkSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjaXR5Q2hvaWNlVXBkYXRlKTtcblxuXG4gICAgICAgIGNvbnN0IGVkaXRlZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdE5hbWVJbnB1dC0tJHtlZGl0ZWRJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc3QgZWRpdGVkRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0RGVzY3JpcHRpb25JbnB1dC0tJHtlZGl0ZWRJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc3QgZWRpdGVkQ29zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0Q29zdElucHV0LS0ke2VkaXRlZElkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCBlZGl0ZWRSZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFJldmlld0lucHV0LS0ke2VkaXRlZElkfWApLnZhbHVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlZGl0ZWROYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZWRpdGVkRGVzYyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVkaXRlZENvc3QpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlZGl0ZWRSZXYpO1xuXG4vLyEhIFRISVMgV0lMTCBVUERBVEUgVEhFIERCIEVWRVJZVEhJTkcgV09SS0lORy5cbiAgICBpZiAoZWRpdGVkTmFtZSA9PT0gXCJcIiB8fCBlZGl0ZWREZXNjID09PSBcIlwiIHx8IGVkaXRlZENvc3QgPT09IFwiXCIgfHwgZWRpdGVkUmV2PT09IFwiXCIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiTm8gYmxhbmsgc3BhY2VzIGFsbG93ZWQhIVwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgICAgIHB1dElkOiBlZGl0ZWRJZCxcbiAgICAgICAgICAgICAgICBkYXRhU2V0OiBcImludGVyZXN0c1wiLFxuICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJQVVRcIixcbiAgICAgICAgICAgICAgICBkYXRhQmFzZU9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZUlkOiBjaXR5Q2hvaWNlVXBkYXRlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBlZGl0ZWROYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZWRpdGVkRGVzYyxcbiAgICAgICAgICAgICAgICAgICAgY29zdDogZWRpdGVkQ29zdCxcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3OiBlZGl0ZWRSZXZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcbiAgICAgICAgdGVybmFyeS5kaXNwbGF5VGVybmFyeShjaXR5Q2hvaWNlVXBkYXRlKTtcbiAgICAgICAgdGVybmFyeS5jcmVhdGVJbnB1dEZpZWxkcyhjaXR5Q2hvaWNlVXBkYXRlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbi8vVE9ETyBTVElMTCBORUVEIFRPIFdJUEUgVEhFIFNDUkVFTiBBTkQgRElTUExBWS5cblxuXG4gICAgfSxcblxuICAgIGRpc3BsYXlDaG9pY2UoKXtcbiAgICAgICAgLy8gdGhlIGl0ZW0gdGhleSBjaG9zZSB3aWxsIGJyaW5nIGRvd24gYW5kIGFkZCBkZWxldGUgYnV0dG9ucy5cbiAgICAgICAgY29uc3QgY2hvaWNlQnV0dG9uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlLnNwbGl0KFwiLS1cIilbMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhjaG9pY2VCdXR0b24pO1xuICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YSh7XG4gICAgICAgICAgICBkYXRhU2V0OiBcInBsYWNlc1wiLFxuICAgICAgICAgICAgZmV0Y2hUeXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YUJhc2VPYmplY3Q6IFwiXCIsXG4gICAgICAgICAgICBlbWJlZEl0ZW06IFwiP19lbWJlZD1pbnRlcmVzdHNcIlxuICAgICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlSW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2VJbnRlcmVzdHMpO1xuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmVzdHMuZm9yRWFjaChjaXR5cyA9PiB7XG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNpdHlzLmlkLCBjaG9pY2VCdXR0b24pXG5cbiAgICAgICAgICAgIGlmIChjaG9pY2VCdXR0b24gPT09IGNpdHlzLmlkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGVybmFyeUxpc3RuZXJzLmNyZWF0ZVRpdGxlKGNob2ljZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgdGVybmFyeS5kaXNwbGF5VGVybmFyeShjaG9pY2VCdXR0b24pO1xuICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoY2hvaWNlQnV0dG9uKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBjcmVhdGVUaXRsZShjaG9pY2VCdXR0b24pe1xuXG4gICAgICAgICAgLy8hIUNyZWF0aW9uIG9mIHRoZSByZXR1cm4gdG8gbGFuZGluZyBwYWdlIGJ1dHRvbi5cbiAgICAgICAgICBjb25zdCBjaG9zZW5PbmUgPSBjaG9pY2VCdXR0b247XG4gICAgICAgICAgY29uc29sZS5sb2coY2hvc2VuT25lKTtcbiAgICAgICAgICBjb25zdCBob21lQnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhXCIsY3NzQ2xhc3M6XCJob21lQnV0dG9uXCIsIGNvbnRlbnQ6XCJIT01FXCIsIGF0dHJpYnV0ZXM6e2lkOlwiaG9tZUJ1dHRvblwifX0pO1xuICAgICAgICAgIHRpdGxlLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuICAgICAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnkud2VsY29tZSk7XG5cbiAgICAgICAgICAvLyEhIFF1aWNrIGZldGNoIGNhbGwgZm9yIHRoZSBjaXR5IG5hbWUuIEZvciBzb21lIHJlYXNvbiBpdCB3b3VsZCBub3Qgd29yayBpbiB0aGUgb3RoZXIgZmV0Y2ggbG9vcC4gSXQgbmVlZGVkIHRvIGJlIHBhcnRpY3VsYXIgdG8gdGhpcyBmZXRjaC5cbiAgICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3BsYWNlcz9pZD0ke2Nob3Nlbk9uZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocilcbiAgICAgICAgICAgICAgci5mb3JFYWNoKHJEZXRhaWxzID0+e1xuICAgICAgICAgICAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImgyXCIsY3NzQ2xhc3M6XCJjaXR5VGl0bGVcIiwgY29udGVudDpgJHtyRGV0YWlscy5uYW1lfWAsIGF0dHJpYnV0ZXM6e2lkOmAke2Nob3Nlbk9uZX1gfX0pO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eU5hbWUpO1xuICAgICAgICAgICAgICAgICAgaG9tZUJ1dHRvbi5hcHBlbmRDaGlsZChjaXR5TmFtZSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCB0ZXJuYXJ5TGlzdG5lcnMiLCJpbXBvcnQgdGVybmFyeSBmcm9tIFwiLi90ZXJuYXJ5QnVpbGRlclwiO1xuXG50ZXJuYXJ5LndlbGNvbWUoKTtcbi8vdGVybmFyeS5kaXNwbGF5VGVybmFyeSgpO1xuLy90ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7IiwiaW1wb3J0IGRhdGFDYWxscyBmcm9tIFwiLi9EYXRhXCJcbmltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIlxuaW1wb3J0IHRlcm5hcnlMaXN0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJcIlxuaW1wb3J0IHRyYXZlbGVyIGZyb20gXCIuL1RyYXZsZXIucG5nXCJcblxuXG4vLyEhISAgaWQgPSBjaXR5Q29uc3RhbnQgICAgLS0tPiBjbGFzcyA9IGNpdHlUaXRsZVxuXG4vL3RvZG8gcmV3cmFwIGV2ZXJ5dGhpbmcsIGNoYW5nZSBjbGVhcnMgdG8gaXNvbGF0ZSBjb250YWluZXJzLCBwb2ludCBhdCBjaXR5VGl0bGUgcGVyIHBhZ2UuXG5cbmNvbnN0IHRlcm5hcnkgPSB7XG5cblxuICAgIHdlbGNvbWUoKXtcbiAgICAgICAgLy8gTGFuZGluZyBwYWdlLiBDaG9vc2UgdGhlIGNpdHkgYW5kIHlvdSBjYW4gbWFrZSB5b3VyIGFkanVzdG1lbnRzIG9uY2UgeW91IGFyZSBvbiB0aGF0IHNjcmVlbi5cblxuICAgICAgICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI291dHB1dFwiKTtcbiAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcbiAgICAgICAgJChcIiN0aXRsZVwiKS5lbXB0eSgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG91dHB1dClcbiAgICAgICAgbGV0IHdlbGNvbWVDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcIndlbGNvbWVDb250YWluZXJcIn0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHdlbGNvbWVDb250YWluZXIpO1xuICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQod2VsY29tZUNvbnRhaW5lcik7XG5cbiAgICAgICAgbGV0IHdlbGNvbWVIZWFkZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImgxXCIsIGNzc0NsYXNzOiBcImgxSGVhZGVyXCIsY29udGVudDpcIldlbGNvbWUgYW5kIHBsZWFzZSBjaG9vc2UgZnJvbSB0aGUgZm9sbG93aW5nIG9wdGlvbnMuXCIgfSlcbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmb3JtXCIsIGNzc0NsYXNzOlwiZHJvcERvd25NYWluQ29udGFpbmVyXCJ9KTtcbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGVudENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwic2VsZWN0XCIsIGNzc0NsYXNzOlwiZHJvcERvd25Db250ZW50Q29udGFpbmVyXCIsIGF0dHJpYnV0ZXM6e2lkOlwiZHJvcERvd25cIn19KTtcblxuICAgICAgICB3ZWxjb21lQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWVIZWFkZXIpO1xuICAgICAgICBkcm9wRG93bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgICAgIGxldCBkcm9wRG93bkNvbnRlbnRCbGFuayA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJvcHRpb25cIiwgY3NzQ2xhc3M6IFwiZHJvcERvd25Db250ZW50XCIsIGNvbnRlbnQ6XCJDaG9vc2UgYSBTaGl0dHlcIn0pXG4gICAgICAgIGRyb3BEb3duQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnRCbGFuayk7XG5cblxuICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YSh7XG4gICAgICAgICAgICBkYXRhU2V0OiBcInBsYWNlc1wiLFxuICAgICAgICAgICAgZmV0Y2hUeXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YUJhc2VPYmplY3Q6IFwiXCIsXG4gICAgICAgICAgICBlbWJlZEl0ZW06IFwiP19lbWJlZD1pbnRlcmVzdHNcIlxuICAgICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlSW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlSW50ZXJlc3RzLmZvckVhY2goaW50RGV0YWlscyA9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnREZXRhaWxzKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnREZXRhaWxzLm5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGludERldGFpbHMuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRyb3BEb3duQ29udGVudCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJvcHRpb25cIiwgY3NzQ2xhc3M6IFwiZHJvcERvd25Db250ZW50XCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5uYW1lfS0tJHtpbnREZXRhaWxzLmlkfWAsIGF0dHJpYnV0ZXM6IHtpZDpgY2l0eS0tJHtpbnREZXRhaWxzLmlkfWAgfX0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZHJvcERvd25Db250ZW50KTtcblxuICAgICAgICAgICAgICAgIGRyb3BEb3duQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgZHJvcERvd25Db250ZW50Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGVybmFyeUxpc3RlbmVycy5kaXNwbGF5Q2hvaWNlKTtcbiAgICAgICAgICAgIHdlbGNvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcERvd25Db250YWluZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgZGlzcGxheVRlcm5hcnkoY2hvc2VuT25lKVxuICAgIHtcbiAgICAgICAvLyBjb25zb2xlLmxvZyhjaG9zZW5PbmUpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI291dHB1dFwiKTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyhvdXRwdXQpXG5cbiAgICAgICAgbGV0IG1haW5Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcIm1haW5Db250YWluZXJcIn0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKG1haW5Db250YWluZXIpO1xuICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XG4gICAgICAgIGxldCBpbnRlcmVzdENhcmQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImFydGljbGVcIixjc3NDbGFzczpcImludGVyZXN0Q2FyZFwiLCBjb250ZW50OmBgLCBhdHRyaWJ1dGU6eyBpZDogXCJjYXJkXCIgfX0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKGludGVyZXN0Q2FyZCk7XG5cblxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cz9wbGFjZUlkPSR7Y2hvc2VuT25lfSZfZXhwYW5kPXBsYWNlYClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihySW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJJbnRlcmVzdHMpO1xuICAgICAgICAgICAgIC8vISFGb3IgbG9vcCB0byBhc3NpZ24gaW5mb3JtYXRpb24gZnJvbSBEQiB0byBkaXNwbGF5LlxuICAgICAgICAgICAgckludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscy5wbGFjZS5pZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscyk7XG5cbiAgICAgICAgICAgICAgICAvLyEhIENpdHkgY29udGFpbmVyIGxhYmVscyBhbmQgc2VjdGlvbiBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICBsZXQgY2l0eUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIiwgYXR0cmlidXRlczp7IGlkOmBjaXR5LS0ke2ludERldGFpbHMucGxhY2UuaWR9YH0sIHRhYkluZGV4OmAke2ludERldGFpbHMucGxhY2UuaWR9YCB9KTtcbiAgICAgICAgICAgICAgICBsZXQgY2l0eUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwibGFiZWxzXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBjaXR5U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiY2l0eXNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9LS0ke2ludERldGFpbHMuaWR9YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNpdHlDb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZpc2FMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImxhYmVsc1wiLCBjb250ZW50OlwiRG8geW91IG5lZWQgYSBWaXNhXCJ9KVxuICAgICAgICAgICAgICAgIGxldCB2aXNhU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiY2l0eXNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLnZpc2FfcmVxdWlyZWR9YH0pO1xuXG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eVNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodmlzYUxhYmVsKTtcbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHZpc2FTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpbnRlcmVzdENhcmQuYXBwZW5kQ2hpbGQoY2l0eUNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICAgLy8hISEgUmVtYWluaW5nIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBsb2NhdGlvbiBkZXRhaWxzLlxuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsIGNzc0NsYXNzOlwibG9jYXRpb25BcnRpY2xlXCIsIGF0dHJpYnV0ZTp7IGlkOmAke2ludERldGFpbHMuaWR9YH19KTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2NOYW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBOYW1lIFwifSlcbiAgICAgICAgICAgICAgICBsZXQgbG9jTmFtZVNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5uYW1lfWB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2NEZXNjTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBEZXNjcmlwdGlvbiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Rlc2NTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMuZGVzY3JpcHRpb259YH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Nvc3RMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIENvc3QgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NDb3N0U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLmNvc3R9YH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvY1JldkxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gUmV2aWV3IFwifSlcbiAgICAgICAgICAgICAgICBsZXQgbG9jUmV2U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLnJldmlld31gfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVsTG9jYXRpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwiYnV0dG9uXCIsIGNzc0NsYXNzOlwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiRGVsZXRlIEVudHJ5XCIsIGF0dHJpYnV0ZXM6eyBpZDpgZGVsQnV0dG9uLS0ke2ludERldGFpbHMuaWR9YH19KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlbExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICBsZXQgZWRpdExvY2F0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImJ1dHRvblwiLCBjc3NDbGFzczpcImJ1dHRvblwiLCBjb250ZW50OiBcIkVkaXQgRW50cnlcIiwgYXR0cmlidXRlczp7IGlkOmBlZGl0QnV0dG9uLS0ke2ludERldGFpbHMuaWR9LS0ke2ludERldGFpbHMucGxhY2UuaWR9YH19KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVkaXRMb2NhdGlvbi5pZCk7XG5cbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY05hbWVMYWJlbCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NOYW1lU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NEZXNjTGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jRGVzY1NlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jQ29zdExhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY0Nvc3RTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY1JldkxhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY1JldlNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsTG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdExvY2F0aW9uKTtcblxuXG4gICAgICAgICAgICAgICAgZGVsTG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnlMaXN0ZW5lcnMuZGVsZXRlRW50cnkpO1xuICAgICAgICAgICAgICAgIGVkaXRMb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RlbmVycy5lZGl0RW50cnlDcmVhdG9yKTtcblxuICAgICAgICAgICAgICAgIGludGVyZXN0Q2FyZC5hcHBlbmRDaGlsZChsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGludGVyZXN0Q2FyZCk7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlSW5wdXRGaWVsZHMoY2l0eVNlbGVjdCl7XG5cbiAgICAgICAgICAgIC8vIHZhciBjaXR5SW5wdXRTZWxlY3QgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmllbGRzZXRzXCIpWzBdLmdldEF0dHJpYnV0ZShcImlkXCIpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNpdHlJbnB1dFNlbGVjdCk7XG4gICAgICAgIC8vc3RydWN0dXJlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaXR5U2VsZWN0KTtcbiAgICAgICAgICAgIGxldCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGFpbmVyXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWFpbkNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcImlucHV0Q29udGFpbmVyXCJ9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXRGaWVsZHMpO1xuICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKGlucHV0RmllbGRzKTtcblxuICAgICAgICAvLyEhISBDb250YWluZXIsIGxhYmVscyBhbmQgaW5wdXRzIGZvciBhbGwgdGhlIGxvY2F0aW9uIGlucHV0cy5cbiAgICAgICAgICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJOYW1lOiBcIiwgYXR0cmlidXRlczp7IGZvcjpcIm5hbWVcIn19KTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUlucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwibmFtZUlucHV0XCIsIGlkOiBcIm5hbWVJbnB1dFwiIH19KVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmFtZUlucHV0TGFiZWwsIG5hbWVJbnB1dCk7XG4gICAgICAgICAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb25JbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJEZXNjcmlwdGlvbjogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJkZXNjcmlwdGlvblwifX0pO1xuICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZGVzY3JpcHRpb25JbnB1dFwiLCBpZDogXCJkZXNjcmlwdGlvbklucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZXNjcmlwdGlvbklucHV0TGFiZWwsIGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29zdENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGNvc3RJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJDb3N0OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImNvc3RcIn19KTtcbiAgICAgICAgICAgICAgICBsZXQgY29zdElucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwibnVtYmVyXCIsIG5hbWU6XCJjb3N0SW5wdXRcIiwgaWQ6IFwiY29zdElucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb3N0SW5wdXRMYWJlbCwgY29zdElucHV0KTtcbiAgICAgICAgICAgICAgICBjb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvc3RJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBjb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvc3RJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBsZXQgcmV2aWV3Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmV2aWV3SW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiUmV2aWV3OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcInJldmlld1wifX0pO1xuICAgICAgICAgICAgICAgIC8vIGxldCByZXZpZXdJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcInRleHRcIiwgbmFtZTpcInJldmlld0lucHV0XCIsIGlkOiBcInJldmlld0lucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXZpZXdJbnB1dExhYmVsLCByZXZpZXdJbnB1dCk7XG4gICAgICAgICAgICAgICAgLy8gcmV2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKHJldmlld0lucHV0TGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vIHJldmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChyZXZpZXdJbnB1dCk7XG5cblxuICAgICAgICAvL3N2ZSBidHRuXG4gICAgICAgICAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJidXR0b25cIiwgY29udGVudDogXCJTYXZlXCIsIGF0dHJpYnV0ZXM6IHt0eXBlOiBcImJ1dHRvblwiLCBpZDogXCJzYXZlRXZlbnRcIn19KTtcblxuICAgICAgICAgICAgaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQobmFtZUNvbnRhaW5lcik7XG4gICAgICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChjb3N0Q29udGFpbmVyKTtcbiAgICAgICAgICAgLy8gaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQocmV2aWV3Q29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgICAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEZpZWxkcyk7XG5cbiAgICAgICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnlMaXN0ZW5lcnMuc2F2ZUVudHJ5KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlucHV0RmllbGRzO1xuXG4gICAgfSxcblxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeSJdfQ==
