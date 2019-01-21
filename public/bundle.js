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
    costContainer.appendChild(costInput);

    let reviewContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let reviewInputLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Review: ",
      attributes: {
        for: "review"
      }
    });

    let reviewInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "text",
        name: "reviewInput",
        id: "reviewInput"
      }
    }); //console.log(reviewInputLabel, reviewInput);


    reviewContainer.appendChild(reviewInputLabel);
    reviewContainer.appendChild(reviewInput); //sve bttn

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
    inputFields.appendChild(costContainer);
    inputFields.appendChild(reviewContainer);
    inputFields.appendChild(saveButton);
    mainContainer.appendChild(inputFields);
    saveButton.addEventListener("click", _listener.default.saveEntry);
    return inputFields;
  }

};
var _default = ternary;
exports.default = _default;

},{"./Data":1,"./Travler.png":2,"./domComponents":3,"./listener":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGEuanMiLCIuLi9zY3JpcHRzL1RyYXZsZXIucG5nIiwiLi4vc2NyaXB0cy9kb21Db21wb25lbnRzLmpzIiwiLi4vc2NyaXB0cy9saXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGVybmFyeUJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNFQSxNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsYUFBYSxDQUFDLFdBQUQsRUFBYztBQUV2QixRQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBMUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBakM7QUFDQSxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBeEI7QUFDQSxRQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBM0I7O0FBRUEsUUFBSSxTQUFTLElBQUksS0FBakIsRUFBd0I7QUFDeEIsYUFBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsR0FBRSxTQUFVLEVBQTlDLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUCxDQUR3QixDQUVlO0FBRXRDLEtBSkQsTUFJTyxJQUFJLFNBQVMsS0FBSyxNQUFsQixFQUF5QjtBQUVoQztBQUNBLGFBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLEVBQWxDLEVBQXFDO0FBQzdDLFFBQUEsTUFBTSxFQUFHLEdBQUUsU0FBVSxFQUR3QjtBQUNyQjtBQUN4QixRQUFBLE9BQU8sRUFBRTtBQUNMLDBCQUFnQixpQ0FEWCxDQUVMOztBQUZLLFNBRm9DO0FBTTdDO0FBQ0EsUUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUws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QUFBMUQsS0FBL0IsQ0FBbEIsQ0FwQ2lCLENBcUNqQjs7O0FBQ0EsSUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsZ0JBQTVCO0FBQ0EsSUFBQSxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsV0FBNUIsRUF2Q2lCLENBMEN6Qjs7QUFDSSxVQUFNLFVBQVUsR0FBRyx1QkFBYyxnQkFBZCxDQUErQjtBQUFDLE1BQUEsV0FBVyxFQUFFLFFBQWQ7QUFBd0IsTUFBQSxPQUFPLEVBQUUsTUFBakM7QUFBeUMsTUFBQSxVQUFVLEVBQUU7QUFBQyxRQUFBLElBQUksRUFBRSxRQUFQO0FBQWlCLFFBQUEsRUFBRSxFQUFFO0FBQXJCO0FBQXJELEtBQS9CLENBQW5COztBQUVBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLG9CQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGVBQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixVQUF4QjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsV0FBMUI7QUFFQSxJQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxrQkFBaUIsU0FBdEQ7QUFFQSxXQUFPLFdBQVA7QUFFUDs7QUF4TFcsQ0FBaEI7ZUE4TGUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jb25zdCBkYXRhQ2FsbHMgPSB7XG5cbiAgICBjb25uZWN0VG9EYXRhKGZldGNoT2JqZWN0KSB7XG5cbiAgICAgICAgbGV0IGRhdGFTZXQgPSBmZXRjaE9iamVjdC5kYXRhU2V0O1xuICAgICAgICBsZXQgZW1iZWRJdGVtID0gZmV0Y2hPYmplY3QuZW1iZWRJdGVtO1xuICAgICAgICBsZXQgZmV0Y2hUeXBlID0gZmV0Y2hPYmplY3QuZmV0Y2hUeXBlO1xuICAgICAgICBsZXQgZGF0YUJhc2VPYmplY3QgPSBmZXRjaE9iamVjdC5kYXRhQmFzZU9iamVjdDtcbiAgICAgICAgbGV0IHB1dElkID0gZmV0Y2hPYmplY3QucHV0SWQ7XG4gICAgICAgIGxldCBkZWxldGVJZCA9IGZldGNoT2JqZWN0LmRlbGV0ZUlkO1xuXG4gICAgICAgIGlmIChmZXRjaFR5cGUgPT0gXCJHRVRcIikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9JHtlbWJlZEl0ZW19YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cblxuICAgICAgICB9IGVsc2UgaWYgKGZldGNoVHlwZSA9PT0gXCJQT1NUXCIpe1xuXG4gICAgICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2UgaWYoZmV0Y2hUeXBlID09PSBcIlBVVFwiKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fS8ke3B1dElkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogYCR7ZmV0Y2hUeXBlfWAsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFCYXNlT2JqZWN0KSwvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZmV0Y2hUeXBlID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGF0YVNldH0vJHtkZWxldGVJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gbm8tcmVmZXJyZXIsICpjbGllbnRcbiAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIChcIllPVSBTQ1JFV0VEIElUIFVQXCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFDYWxscyIsIiIsIlxuXG5cblxuY29uc3QgZG9tQ29tcG9uZW50cyA9IHtcbiAgICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcywgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsImltcG9ydCBkYXRhQ2FsbHMgZnJvbSBcIi4vRGF0YVwiXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCJcbmltcG9ydCB0ZXJuYXJ5IGZyb20gXCIuL3Rlcm5hcnlCdWlsZGVyXCI7XG5cblxuY29uc3QgdGVybmFyeUxpc3RuZXJzID0ge1xuXG4gICAgZm9ybWNoZWNrKCkge1xuICAgICAgICBsZXQgZmllbGRzID0gJChcIi5pbnB1dEZpZWxkc1wiKVxuICAgICAgICAgICAgICBmaWVsZHMuZmluZChcImlucHV0XCIpLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgICAgICAgJC5lYWNoKGZpZWxkcywgZnVuY3Rpb24oaSwgZmllbGQpIHtcbiAgICAgICAgICBpZiAoIWZpZWxkLnZhbHVlKXtcbiAgICAgICAgICAgIGFsZXJ0KGZpZWxkLm5hbWUgKyAnIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coZmllbGRzKTtcblxuICAgICAgfSxcblxuICAgIHNhdmVFbnRyeSgpe1xuXG4gICAgICAgICAgICB0ZXJuYXJ5TGlzdG5lcnMuZm9ybWNoZWNrKCk7XG4gICAgICAgICAgICBjb25zdCBzYXZlSUQgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2F2ZUlEKVxuICAgICAgICAgICAgLy8hISFUaGlzIGxpbmUgaXMgYnJpbGxhbnQgaXQgZ3JhYnMgdGhlIGNob3NlbiBjaXR5IGZyb20gdGhlIHdlbGNvbWUgcGFnZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb24uIFByZXR0eSBCQSEhXG4gICAgICAgICAgICB2YXIgY2l0eVNlbGVjdCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaXR5VGl0bGVcIilbMF0uZ2V0QXR0cmlidXRlKFwiaWRcIikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lSW5wdXRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBsb2NEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvbklucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbG9jQ29zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29zdElucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbG9jUmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXZpZXdJbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY05hbWUpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnRPYmplY3RQb3N0ID0ge1xuICAgICAgICAgICAgICAgIFwiZGF0YVNldFwiOiBcImludGVyZXN0c1wiLFxuICAgICAgICAgICAgICAgIFwiZmV0Y2hUeXBlXCI6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIFwiZGF0YUJhc2VPYmplY3RcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInBsYWNlSWRcIjogY2l0eVNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IGxvY05hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogbG9jRGVzYyxcbiAgICAgICAgICAgICAgICAgICAgXCJjb3N0XCI6IGxvY0Nvc3QsXG4gICAgICAgICAgICAgICAgICAgIFwicmV2aWV3XCI6IGxvY1JldlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW50T2JqZWN0UG9zdClcbiAgICAgICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKGludE9iamVjdFBvc3QpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vISEhY2xlYXJzIHRoZSB3aG9sZSBwYWdlIGFuZCByZXdyaXRlcyB0aGUgd2hvbGUgcGFnZSB3aXRoIGNoYW5nZXMuXG4gICAgICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGVybmFyeS5kaXNwbGF5VGVybmFyeShjaXR5U2VsZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgdGVybmFyeS5jcmVhdGVJbnB1dEZpZWxkcyhjaXR5U2VsZWN0KTtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICBkZWxldGVFbnRyeSgpIHtcbiAgICAgICAgICAgIC8vVG8gZGVsZXRlIGZyb20gc2F2ZWQgbmV3cyBhcnRpY2xlcy5cblxuICAgICAgICBjb25zdCBkZWxldGVJRCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xuICAgICAgICB2YXIgY2l0eVNlbGVjdCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaXR5VGl0bGVcIilbMF0uZ2V0QXR0cmlidXRlKFwiaWRcIikpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjaXR5U2VsZWN0KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGVsZXRlSUQpO1xuICAgICAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVJZDogZGVsZXRlSUQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJERUxFVEVcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KGNpdHlTZWxlY3QpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgIGVkaXRFbnRyeUNyZWF0b3IoKXtcblxuXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSk7XG4gICAgICAgIGNvbnN0IGNpdHllZGl0Q2hvaWNlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMl0pO1xuICAgICAgICBjb25zb2xlLmxvZyhjaXR5ZWRpdENob2ljZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRCdXR0b24pO1xuXG4gICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG5cblxuICAgICAgICBsZXQgZWRpdE1haW5Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIiwgY3NzQ2xhc3M6XCJtYWluRWRpdENvbnRhaW5lclwifSlcblxuICAgICAgICBsZXQgZWRpdE5hbWVDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJlZGl0Q29udGFpbmVyc1wifSlcbiAgICAgICAgbGV0IGVkaXROYW1lSW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiTmFtZTogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJuYW1lXCJ9fSk7XG4gICAgICAgIGxldCBlZGl0TmFtZUlucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwibmFtZUlucHV0XCIsIGlkOiBgZWRpdE5hbWVJbnB1dC0tJHtlZGl0QnV0dG9ufWAgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXROYW1lSW5wdXRMYWJlbCwgZWRpdE5hbWVJbnB1dCk7XG5cbiAgICAgICAgbGV0IGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImVkaXRDb250YWluZXJzXCJ9KVxuICAgICAgICBsZXQgZWRpdERlc2NyaXB0aW9uSW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiRGVzY3JpcHRpb246IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwiZGVzY3JpcHRpb25cIn19KTtcbiAgICAgICAgbGV0IGVkaXREZXNjcmlwdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZWRpdERlc2NyaXB0aW9uSW5wdXRcIiwgaWQ6IGBlZGl0RGVzY3JpcHRpb25JbnB1dC0tJHtlZGl0QnV0dG9ufWAgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXREZXNjcmlwdGlvbklucHV0TGFiZWwsIGVkaXREZXNjcmlwdGlvbklucHV0KTtcblxuICAgICAgICBsZXQgZWRpdENvc3RDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJlZGl0Q29udGFpbmVyc1wifSlcbiAgICAgICAgbGV0IGVkaXRDb3N0SW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiQ29zdDogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJjb3N0XCJ9fSk7XG4gICAgICAgIGxldCBlZGl0Q29zdElucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwibnVtYmVyXCIsIG5hbWU6XCJlZGl0Q29zdElucHV0XCIsIGlkOiBgZWRpdENvc3RJbnB1dC0tJHtlZGl0QnV0dG9ufWAgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRDb3N0SW5wdXRMYWJlbCwgZWRpdENvc3RJbnB1dCk7XG5cbiAgICAgICAgbGV0IGVkaXRSZXZpZXdDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJlZGl0Q29udGFpbmVyc1wifSlcbiAgICAgICAgbGV0IGVkaXRSZXZpZXdJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJSZXZpZXc6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwicmV2aWV3XCJ9fSk7XG4gICAgICAgIGxldCBlZGl0UmV2aWV3SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJ0ZXh0XCIsIG5hbWU6XCJlZGl0UmV2aWV3SW5wdXRcIiwgaWQ6IGBlZGl0UmV2aWV3SW5wdXQtLSR7ZWRpdEJ1dHRvbn1gfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRSZXZpZXdJbnB1dExhYmVsLCBlZGl0UmV2aWV3SW5wdXQpO1xuXG4gICAgICAgIGxldCB1cGRhdGVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImJ1dHRvblwiLCBjc3NDbGFzczpcImJ1dHRvblwiLCBjb250ZW50OlwiVXBkYXRlXCIsIGF0dHJpYnV0ZXM6e2lkOmAke2VkaXRCdXR0b259LS0ke2NpdHllZGl0Q2hvaWNlfWB9IH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHVwZGF0ZUJ1dHRvbik7XG5cbiAgICAgICAgLy8hISEgY2FsbCBmb3IgZGlzcGxheSBvZiBkYXRhIGJlaW5nIG1vZGlmaWVkIGdldCBjZXJ0YWluIGludGVyZXN0cyBiYXNlZCBvbiBlZGl0QnV0dG9uLlxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cz9pZD0ke2VkaXRCdXR0b259Jl9leHBhbmQ9cGxhY2VgKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKHJJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgckludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJJbnRlcmVzdHMpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIiwgY3NzQ2xhc3M6XCJlZGl0ZWRMb2NhdGlvbkFydGljbGVcIiwgYXR0cmlidXRlOnsgaWQ6YCR7aW50RGV0YWlscy5pZH1gfX0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY05hbWVMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIE5hbWUgOiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY05hbWVTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMubmFtZX1gfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdGVkTG9jTmFtZUxhYmVsLCBlZGl0ZWRMb2NOYW1lU2VjdGlvbilcblxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NEZXNjTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBEZXNjcmlwdGlvbiA6IFwifSlcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jRGVzY1NlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5kZXNjcmlwdGlvbn1gfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdGVkTG9jRGVzY0xhYmVsLCBlZGl0ZWRMb2NEZXNjU2VjdGlvbilcblxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NDb3N0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBDb3N0IDogXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NDb3N0U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLmNvc3R9YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZExvY0Nvc3RMYWJlbCwgZWRpdGVkTG9jQ29zdFNlY3Rpb24pXG5cbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jUmV2TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBSZXZpZXcgOiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY1JldlNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5yZXZpZXd9YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZExvY1JldkxhYmVsLCBlZGl0ZWRMb2NSZXZTZWN0aW9uKVxuXG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NOYW1lTGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jTmFtZVNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jRGVzY0xhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY0Rlc2NTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY0Nvc3RMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NDb3N0U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NSZXZMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NSZXZTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBlZGl0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGVkaXROYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXROYW1lSW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdE5hbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdE5hbWVJbnB1dCk7XG4gICAgICAgICAgICAgICAgZWRpdERlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXREZXNjcmlwdGlvbklucHV0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0RGVzY3JpcHRpb25JbnB1dCk7XG4gICAgICAgICAgICAgICAgZWRpdENvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdENvc3RJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0Q29zdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0Q29zdElucHV0KTtcbiAgICAgICAgICAgICAgICBlZGl0UmV2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRSZXZpZXdJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0UmV2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRSZXZpZXdJbnB1dCk7XG4gICAgICAgICAgICAgICAgZWRpdE1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdE5hbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgZWRpdE1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdENvc3RDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRSZXZpZXdDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKGVkaXRNYWluQ29udGFpbmVyKVxuXG5cbiAgICAgICAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdG5lcnMuZXhlY3V0ZUVkaXRzKTtcblxuICAgICAgICByZXR1cm4gZWRpdEJ1dHRvbjtcbiAgICB9LFxuXG4gICAgZXhlY3V0ZUVkaXRzKHVwZGF0ZUNob2ljZSl7XG5cbiAgICAgICAgLy9jb25zdCBlZGl0ZWRJZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXRlZElkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMF0pO1xuICAgICAgICBjb25zdCBjaXR5Q2hvaWNlVXBkYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlZGl0ZWRJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHlDaG9pY2VVcGRhdGUpO1xuXG5cbiAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0TmFtZUlucHV0LS0ke2VkaXRlZElkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCBlZGl0ZWREZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXREZXNjcmlwdGlvbklucHV0LS0ke2VkaXRlZElkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCBlZGl0ZWRDb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRDb3N0SW5wdXQtLSR7ZWRpdGVkSWR9YCkudmFsdWU7XG4gICAgICAgIGNvbnN0IGVkaXRlZFJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0UmV2aWV3SW5wdXQtLSR7ZWRpdGVkSWR9YCkudmFsdWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVkaXRlZE5hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlZGl0ZWREZXNjKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZWRpdGVkQ29zdCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVkaXRlZFJldik7XG5cbi8vISEgVEhJUyBXSUxMIFVQREFURSBUSEUgREIgRVZFUllUSElORyBXT1JLSU5HLlxuICAgIGlmIChlZGl0ZWROYW1lID09PSBcIlwiIHx8IGVkaXRlZERlc2MgPT09IFwiXCIgfHwgZWRpdGVkQ29zdCA9PT0gXCJcIiB8fCBlZGl0ZWRSZXY9PT0gXCJcIikge1xuICAgICAgICAgICAgYWxlcnQoXCJObyBibGFuayBzcGFjZXMgYWxsb3dlZCEhXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YSh7XG4gICAgICAgICAgICAgICAgcHV0SWQ6IGVkaXRlZElkLFxuICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgZmV0Y2hUeXBlOiBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlSWQ6IGNpdHlDaG9pY2VVcGRhdGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGVkaXRlZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBlZGl0ZWREZXNjLFxuICAgICAgICAgICAgICAgICAgICBjb3N0OiBlZGl0ZWRDb3N0LFxuICAgICAgICAgICAgICAgICAgICByZXZpZXc6IGVkaXRlZFJldlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KGNpdHlDaG9pY2VVcGRhdGUpO1xuICAgICAgICB0ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKGNpdHlDaG9pY2VVcGRhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuLy9UT0RPIFNUSUxMIE5FRUQgVE8gV0lQRSBUSEUgU0NSRUVOIEFORCBESVNQTEFZLlxuXG5cbiAgICB9LFxuXG4gICAgZGlzcGxheUNob2ljZSgpe1xuICAgICAgICAvLyB0aGUgaXRlbSB0aGV5IGNob3NlIHdpbGwgYnJpbmcgZG93biBhbmQgYWRkIGRlbGV0ZSBidXR0b25zLlxuICAgICAgICBjb25zdCBjaG9pY2VCdXR0b24gPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUuc3BsaXQoXCItLVwiKVsxXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNob2ljZUJ1dHRvbik7XG4gICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKHtcbiAgICAgICAgICAgIGRhdGFTZXQ6IFwicGxhY2VzXCIsXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdDogXCJcIixcbiAgICAgICAgICAgIGVtYmVkSXRlbTogXCI/X2VtYmVkPWludGVyZXN0c1wiXG4gICAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2VJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZUludGVyZXN0cyk7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGNpdHlzID0+IHtcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2l0eXMuaWQsIGNob2ljZUJ1dHRvbilcblxuICAgICAgICAgICAgaWYgKGNob2ljZUJ1dHRvbiA9PT0gY2l0eXMuaWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0ZXJuYXJ5TGlzdG5lcnMuY3JlYXRlVGl0bGUoY2hvaWNlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KGNob2ljZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgdGVybmFyeS5jcmVhdGVJbnB1dEZpZWxkcyhjaG9pY2VCdXR0b24pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZVRpdGxlKGNob2ljZUJ1dHRvbil7XG5cbiAgICAgICAgICAvLyEhQ3JlYXRpb24gb2YgdGhlIHJldHVybiB0byBsYW5kaW5nIHBhZ2UgYnV0dG9uLlxuICAgICAgICAgIGNvbnN0IGNob3Nlbk9uZSA9IGNob2ljZUJ1dHRvbjtcbiAgICAgICAgICBjb25zb2xlLmxvZyhjaG9zZW5PbmUpO1xuICAgICAgICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFcIixjc3NDbGFzczpcImhvbWVCdXR0b25cIiwgY29udGVudDpcIkhPTUVcIiwgYXR0cmlidXRlczp7aWQ6XCJob21lQnV0dG9uXCJ9fSk7XG4gICAgICAgICAgdGl0bGUuYXBwZW5kQ2hpbGQoaG9tZUJ1dHRvbik7XG4gICAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeS53ZWxjb21lKTtcblxuICAgICAgICAgIC8vISEgUXVpY2sgZmV0Y2ggY2FsbCBmb3IgdGhlIGNpdHkgbmFtZS4gRm9yIHNvbWUgcmVhc29uIGl0IHdvdWxkIG5vdCB3b3JrIGluIHRoZSBvdGhlciBmZXRjaCBsb29wLiBJdCBuZWVkZWQgdG8gYmUgcGFydGljdWxhciB0byB0aGlzIGZldGNoLlxuICAgICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzP2lkPSR7Y2hvc2VuT25lfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgIC50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICAgICAgICByLmZvckVhY2gockRldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgICBjb25zdCBjaXR5TmFtZSA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaDJcIixjc3NDbGFzczpcImNpdHlUaXRsZVwiLCBjb250ZW50OmAke3JEZXRhaWxzLm5hbWV9YCwgYXR0cmlidXRlczp7aWQ6YCR7Y2hvc2VuT25lfWB9fSk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgICBob21lQnV0dG9uLmFwcGVuZENoaWxkKGNpdHlOYW1lKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm5hcnlMaXN0bmVycyIsImltcG9ydCB0ZXJuYXJ5IGZyb20gXCIuL3Rlcm5hcnlCdWlsZGVyXCI7XG5cbnRlcm5hcnkud2VsY29tZSgpO1xuLy90ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KCk7XG4vL3Rlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoKTsiLCJpbXBvcnQgZGF0YUNhbGxzIGZyb20gXCIuL0RhdGFcIlxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiXG5pbXBvcnQgdGVybmFyeUxpc3RlbmVycyBmcm9tIFwiLi9saXN0ZW5lclwiXG5pbXBvcnQgdHJhdmVsZXIgZnJvbSBcIi4vVHJhdmxlci5wbmdcIlxuXG5cbi8vISEhICBpZCA9IGNpdHlDb25zdGFudCAgICAtLS0+IGNsYXNzID0gY2l0eVRpdGxlXG5cbi8vdG9kbyByZXdyYXAgZXZlcnl0aGluZywgY2hhbmdlIGNsZWFycyB0byBpc29sYXRlIGNvbnRhaW5lcnMsIHBvaW50IGF0IGNpdHlUaXRsZSBwZXIgcGFnZS5cblxuY29uc3QgdGVybmFyeSA9IHtcblxuXG4gICAgd2VsY29tZSgpe1xuICAgICAgICAvLyBMYW5kaW5nIHBhZ2UuIENob29zZSB0aGUgY2l0eSBhbmQgeW91IGNhbiBtYWtlIHlvdXIgYWRqdXN0bWVudHMgb25jZSB5b3UgYXJlIG9uIHRoYXQgc2NyZWVuLlxuXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3V0cHV0XCIpO1xuICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAkKFwiI3RpdGxlXCIpLmVtcHR5KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2cob3V0cHV0KVxuICAgICAgICBsZXQgd2VsY29tZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwid2VsY29tZUNvbnRhaW5lclwifSk7XG4gICAgICAgIC8vY29uc29sZS5sb2cod2VsY29tZUNvbnRhaW5lcik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZCh3ZWxjb21lQ29udGFpbmVyKTtcblxuICAgICAgICBsZXQgd2VsY29tZUhlYWRlciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiaDFcIiwgY3NzQ2xhc3M6IFwiaDFIZWFkZXJcIixjb250ZW50OlwiV2VsY29tZSBhbmQgcGxlYXNlIGNob29zZSBmcm9tIHRoZSBmb2xsb3dpbmcgb3B0aW9ucy5cIiB9KVxuICAgICAgICBsZXQgZHJvcERvd25Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImZvcm1cIiwgY3NzQ2xhc3M6XCJkcm9wRG93bk1haW5Db250YWluZXJcIn0pO1xuICAgICAgICBsZXQgZHJvcERvd25Db250ZW50Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJzZWxlY3RcIiwgY3NzQ2xhc3M6XCJkcm9wRG93bkNvbnRlbnRDb250YWluZXJcIiwgYXR0cmlidXRlczp7aWQ6XCJkcm9wRG93blwifX0pO1xuXG4gICAgICAgIHdlbGNvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQod2VsY29tZUhlYWRlcik7XG4gICAgICAgIGRyb3BEb3duQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudENvbnRhaW5lcik7XG5cbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGVudEJsYW5rID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcIm9wdGlvblwiLCBjc3NDbGFzczogXCJkcm9wRG93bkNvbnRlbnRcIiwgY29udGVudDpcIkNob29zZSBhIFNoaXR0eVwifSlcbiAgICAgICAgZHJvcERvd25Db250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudEJsYW5rKTtcblxuXG4gICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKHtcbiAgICAgICAgICAgIGRhdGFTZXQ6IFwicGxhY2VzXCIsXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdDogXCJcIixcbiAgICAgICAgICAgIGVtYmVkSXRlbTogXCI/X2VtYmVkPWludGVyZXN0c1wiXG4gICAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2VJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmVzdHMuZm9yRWFjaChpbnREZXRhaWxzID0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGludERldGFpbHMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGludERldGFpbHMubmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW50RGV0YWlscy5pZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZHJvcERvd25Db250ZW50ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcIm9wdGlvblwiLCBjc3NDbGFzczogXCJkcm9wRG93bkNvbnRlbnRcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9LS0ke2ludERldGFpbHMuaWR9YCwgYXR0cmlidXRlczoge2lkOmBjaXR5LS0ke2ludERldGFpbHMuaWR9YCB9fSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkcm9wRG93bkNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgZHJvcERvd25Db250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBkcm9wRG93bkNvbnRlbnRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0ZXJuYXJ5TGlzdGVuZXJzLmRpc3BsYXlDaG9pY2UpO1xuICAgICAgICAgICAgd2VsY29tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRhaW5lcik7XG4gICAgICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBkaXNwbGF5VGVybmFyeShjaG9zZW5PbmUpXG4gICAge1xuICAgICAgIC8vIGNvbnNvbGUubG9nKGNob3Nlbk9uZSk7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3V0cHV0XCIpO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKG91dHB1dClcblxuICAgICAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwibWFpbkNvbnRhaW5lclwifSk7XG4gICAgICAgLy8gY29uc29sZS5sb2cobWFpbkNvbnRhaW5lcik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IGludGVyZXN0Q2FyZCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwiaW50ZXJlc3RDYXJkXCIsIGNvbnRlbnQ6YGAsIGF0dHJpYnV0ZTp7IGlkOiBcImNhcmRcIiB9fSk7XG4gICAgICAgLy8gY29uc29sZS5sb2coaW50ZXJlc3RDYXJkKTtcblxuXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzP3BsYWNlSWQ9JHtjaG9zZW5PbmV9Jl9leHBhbmQ9cGxhY2VgKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKHJJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cockludGVyZXN0cyk7XG4gICAgICAgICAgICAgLy8hIUZvciBsb29wIHRvIGFzc2lnbiBpbmZvcm1hdGlvbiBmcm9tIERCIHRvIGRpc3BsYXkuXG4gICAgICAgICAgICBySW50ZXJlc3RzLmZvckVhY2goaW50RGV0YWlscyA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnREZXRhaWxzLnBsYWNlLmlkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnREZXRhaWxzKTtcblxuICAgICAgICAgICAgICAgIC8vISEgQ2l0eSBjb250YWluZXIgbGFiZWxzIGFuZCBzZWN0aW9uIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgIGxldCBjaXR5Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wiLCBhdHRyaWJ1dGVzOnsgaWQ6YGNpdHktLSR7aW50RGV0YWlscy5wbGFjZS5pZH1gfSwgdGFiSW5kZXg6YCR7aW50RGV0YWlscy5wbGFjZS5pZH1gIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjaXR5TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJsYWJlbHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGNpdHlTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJjaXR5c1wiLCBjb250ZW50OmAke2ludERldGFpbHMubmFtZX0tLSR7aW50RGV0YWlscy5pZH1gfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eUNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlzYUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwibGFiZWxzXCIsIGNvbnRlbnQ6XCJEbyB5b3UgbmVlZCBhIFZpc2FcIn0pXG4gICAgICAgICAgICAgICAgbGV0IHZpc2FTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJjaXR5c1wiLCBjb250ZW50OmAke2ludERldGFpbHMudmlzYV9yZXF1aXJlZH1gfSk7XG5cbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHlMYWJlbCk7XG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aXNhTGFiZWwpO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodmlzYVNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGludGVyZXN0Q2FyZC5hcHBlbmRDaGlsZChjaXR5Q29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgICAvLyEhISBSZW1haW5pbmcgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGxvY2F0aW9uIGRldGFpbHMuXG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIiwgY3NzQ2xhc3M6XCJsb2NhdGlvbkFydGljbGVcIiwgYXR0cmlidXRlOnsgaWQ6YCR7aW50RGV0YWlscy5pZH1gfX0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvY05hbWVMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIE5hbWUgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NOYW1lU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9YH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Rlc2NMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIERlc2NyaXB0aW9uIFwifSlcbiAgICAgICAgICAgICAgICBsZXQgbG9jRGVzY1NlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5kZXNjcmlwdGlvbn1gfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG9jQ29zdExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gQ29zdCBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Nvc3RTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMuY29zdH1gfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG9jUmV2TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBSZXZpZXcgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NSZXZTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMucmV2aWV3fWB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWxMb2NhdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJidXR0b25cIiwgY3NzQ2xhc3M6XCJidXR0b25cIiwgY29udGVudDogXCJEZWxldGUgRW50cnlcIiwgYXR0cmlidXRlczp7IGlkOmBkZWxCdXR0b24tLSR7aW50RGV0YWlscy5pZH1gfX0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGVsTG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIGxldCBlZGl0TG9jYXRpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwiYnV0dG9uXCIsIGNzc0NsYXNzOlwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiRWRpdCBFbnRyeVwiLCBhdHRyaWJ1dGVzOnsgaWQ6YGVkaXRCdXR0b24tLSR7aW50RGV0YWlscy5pZH0tLSR7aW50RGV0YWlscy5wbGFjZS5pZH1gfX0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZWRpdExvY2F0aW9uLmlkKTtcblxuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jTmFtZUxhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY05hbWVTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY0Rlc2NMYWJlbCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NEZXNjU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NDb3N0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jQ29zdFNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jUmV2TGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jUmV2U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0TG9jYXRpb24pO1xuXG5cbiAgICAgICAgICAgICAgICBkZWxMb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RlbmVycy5kZWxldGVFbnRyeSk7XG4gICAgICAgICAgICAgICAgZWRpdExvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdGVuZXJzLmVkaXRFbnRyeUNyZWF0b3IpO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJlc3RDYXJkLmFwcGVuZENoaWxkKGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDYXJkKTtcblxuICAgIH0sXG5cbiAgICBjcmVhdGVJbnB1dEZpZWxkcyhjaXR5U2VsZWN0KXtcblxuICAgICAgICAgICAgLy8gdmFyIGNpdHlJbnB1dFNlbGVjdCA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmaWVsZHNldHNcIilbMF0uZ2V0QXR0cmlidXRlKFwiaWRcIikpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2l0eUlucHV0U2VsZWN0KTtcbiAgICAgICAgLy9zdHJ1Y3R1cmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNpdHlTZWxlY3QpO1xuICAgICAgICAgICAgbGV0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250YWluZXJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYWluQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBpbnB1dEZpZWxkcyA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwiaW5wdXRDb250YWluZXJcIn0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEZpZWxkcyk7XG4gICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoaW5wdXRGaWVsZHMpO1xuXG4gICAgICAgIC8vISEhIENvbnRhaW5lciwgbGFiZWxzIGFuZCBpbnB1dHMgZm9yIGFsbCB0aGUgbG9jYXRpb24gaW5wdXRzLlxuICAgICAgICAgICAgICAgIGxldCBuYW1lQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUlucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIk5hbWU6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwibmFtZVwifX0pO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lSW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJ0ZXh0XCIsIG5hbWU6XCJuYW1lSW5wdXRcIiwgaWQ6IFwibmFtZUlucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhuYW1lSW5wdXRMYWJlbCwgbmFtZUlucHV0KTtcbiAgICAgICAgICAgICAgICBuYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBuYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImZpZWxkc2V0XCIsIGNzc0NsYXNzOlwiZmllbGRzZXRzXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbklucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIkRlc2NyaXB0aW9uOiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImRlc2NyaXB0aW9uXCJ9fSk7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJ0ZXh0XCIsIG5hbWU6XCJkZXNjcmlwdGlvbklucHV0XCIsIGlkOiBcImRlc2NyaXB0aW9uSW5wdXRcIiB9fSlcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlc2NyaXB0aW9uSW5wdXRMYWJlbCwgZGVzY3JpcHRpb25JbnB1dCk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcblxuICAgICAgICAgICAgICAgIGxldCBjb3N0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgICAgICAgICBsZXQgY29zdElucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIkNvc3Q6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwiY29zdFwifX0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3N0SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJudW1iZXJcIiwgbmFtZTpcImNvc3RJbnB1dFwiLCBpZDogXCJjb3N0SW5wdXRcIiB9fSlcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvc3RJbnB1dExhYmVsLCBjb3N0SW5wdXQpO1xuICAgICAgICAgICAgICAgIGNvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY29zdElucHV0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGNvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY29zdElucHV0KTtcblxuICAgICAgICAgICAgICAgIGxldCByZXZpZXdDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImZpZWxkc2V0XCIsIGNzc0NsYXNzOlwiZmllbGRzZXRzXCJ9KVxuICAgICAgICAgICAgICAgIGxldCByZXZpZXdJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJSZXZpZXc6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwicmV2aWV3XCJ9fSk7XG4gICAgICAgICAgICAgICAgbGV0IHJldmlld0lucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwicmV2aWV3SW5wdXRcIiwgaWQ6IFwicmV2aWV3SW5wdXRcIiB9fSlcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJldmlld0lucHV0TGFiZWwsIHJldmlld0lucHV0KTtcbiAgICAgICAgICAgICAgICByZXZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQocmV2aWV3SW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgcmV2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKHJldmlld0lucHV0KTtcblxuXG4gICAgICAgIC8vc3ZlIGJ0dG5cbiAgICAgICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImJ1dHRvblwiLCBjb250ZW50OiBcIlNhdmVcIiwgYXR0cmlidXRlczoge3R5cGU6IFwiYnV0dG9uXCIsIGlkOiBcInNhdmVFdmVudFwifX0pO1xuXG4gICAgICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChuYW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGNvc3RDb250YWluZXIpO1xuICAgICAgICAgICAgaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQocmV2aWV3Q29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgICAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEZpZWxkcyk7XG5cbiAgICAgICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnlMaXN0ZW5lcnMuc2F2ZUVudHJ5KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlucHV0RmllbGRzO1xuXG4gICAgfSxcblxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeSJdfQ==
