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
      } //console.log(intObjectPost)

    };

    _Data.default.connectToData(intObjectPost).then(response => response.json).then(() => {
      //!!!clears the whole page and rewrites the whole page with changes. 
      $("#output").empty();

      _ternaryBuilder.default.displayTernary(citySelect);

      _ternaryBuilder.default.createInputFields();
    });
  },

  deleteEntry() {
    //To delete from saved news articles.
    const deleteID = event.target.id.split("--")[1];
    var citySelect = parseInt(document.getElementsByClassName("fieldsets")[0].getAttribute("id")); //console.log(citySelect);
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
    //TODO Add the edit button and logic.
    const editButton = parseInt(event.target.id.split("--")[1]);
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
        id: `${editButton}`
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

    if (editedName === "" || editedDesc === "" || editedCost === "" || editedRev === "") {
      alert("No blank spaces allowed!!");
    } else {
      _Data.default.connectToData({
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
      });
    }
  },

  displayChoice() {
    // the item they chose will bring down and add delete buttons.
    const choiceButton = parseInt(event.target.value.split("--")[1]); //console.log(choiceButton);

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

          _ternaryBuilder.default.displayTernary(choiceButton);

          _ternaryBuilder.default.createInputFields(choiceButton);
        }
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

const ternary = {
  welcome() {
    // Landing page. Choose the city and you can make your adjustments once you are on that screen.
    const output = document.querySelector("#output");
    $("#output").empty(); //console.log(output)

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

        dropDownContentContainer.appendChild(dropDownContent);
      });
      dropDownContentContainer.addEventListener("change", _listener.default.displayChoice);
      welcomeContainer.appendChild(dropDownContainer);
    });
  },

  displayTernary(chosenOne) {
    //console.log(chosenOne);
    const output = document.querySelector("#output"); // console.log(output)
    //!!Creation of the return to landing page button.

    const homeButton = _domComponents.default.createDomElement({
      elementType: "a",
      cssClass: "homeButton",
      content: "HOME",
      attributes: {
        src: `${_Travler.default}`,
        id: "homeButton"
      }
    });

    output.appendChild(homeButton);
    homeButton.addEventListener("click", this.welcome); //!! Quick fetch call for the city name. For some reason it would not work in the other fetch loop. It needed to be particular to this fetch. 

    fetch(`http://localhost:8088/places?id=${chosenOne}`).then(response => response.json()).then(r => {
      console.log(r);
      r.forEach(rDetails => {
        const cityName = _domComponents.default.createDomElement({
          elementType: "h2",
          cssClass: "cityTitle",
          content: `${rDetails.name}`,
          attributes: {
            id: "cityTitle"
          }
        });

        homeButton.appendChild(cityName);
      });
    });

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
            id: `${intDetails.place.id}`
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
            id: `editButton--${intDetails.id}`
          }
        }); //console.log(editLocation);         


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
    saveButton.addEventListener("click", _listener.default.saveEntry);
    return inputFields;
  }

};
var _default = ternary;
exports.default = _default;

},{"./Data":1,"./Travler.png":2,"./domComponents":3,"./listener":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGEuanMiLCIuLi9zY3JpcHRzL1RyYXZsZXIucG5nIiwiLi4vc2NyaXB0cy9kb21Db21wb25lbnRzLmpzIiwiLi4vc2NyaXB0cy9saXN0ZW5lci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGVybmFyeUJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNFQSxNQUFNLFNBQVMsR0FBRztBQUVkLEVBQUEsYUFBYSxDQUFDLFdBQUQsRUFBYztBQUV2QixRQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBMUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBNUI7QUFDQSxRQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBakM7QUFDQSxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBeEI7QUFDQSxRQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBM0I7O0FBRUEsUUFBSSxTQUFTLElBQUksS0FBakIsRUFBd0I7QUFDeEIsYUFBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsR0FBRSxTQUFVLEVBQTlDLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUCxDQUR3QixDQUVlO0FBRXRDLEtBSkQsTUFJTyxJQUFJLFNBQVMsS0FBSyxNQUFsQixFQUF5QjtBQUVoQztBQUNBLGFBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLEVBQWxDLEVBQXFDO0FBQzdDLFFBQUEsTUFBTSxFQUFHLEdBQUUsU0FBVSxFQUR3QjtBQUNyQjtBQUN4QixRQUFBLE9BQU8sRUFBRTtBQUNMLDBCQUFnQixpQ0FEWCxDQUVMOztBQUZLLFNBRm9DO0FBTTdDO0FBQ0EsUUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUws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QUEsUUFBUSxFQUFDLGFBQWhDO0FBQStDLE1BQUEsVUFBVSxFQUFDO0FBQUUsUUFBQSxJQUFJLEVBQUMsTUFBUDtBQUFlLFFBQUEsSUFBSSxFQUFDLGFBQXBCO0FBQW1DLFFBQUEsRUFBRSxFQUFFO0FBQXZDO0FBQTFELEtBQS9CLENBQWxCLENBbENpQixDQW1DakI7OztBQUNBLElBQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLGdCQUE1QjtBQUNBLElBQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLFdBQTVCLEVBckNpQixDQXdDekI7O0FBQ0ksVUFBTSxVQUFVLEdBQUcsdUJBQWMsZ0JBQWQsQ0FBK0I7QUFBQyxNQUFBLFdBQVcsRUFBRSxRQUFkO0FBQXdCLE1BQUEsT0FBTyxFQUFFLE1BQWpDO0FBQXlDLE1BQUEsVUFBVSxFQUFFO0FBQUMsUUFBQSxJQUFJLEVBQUUsUUFBUDtBQUFpQixRQUFBLEVBQUUsRUFBRTtBQUFyQjtBQUFyRCxLQUEvQixDQUFuQjs7QUFFQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGFBQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixvQkFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGFBQXhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixlQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsVUFBeEI7QUFFQSxJQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxrQkFBaUIsU0FBdEQ7QUFFQSxXQUFPLFdBQVA7QUFFUDs7QUF6TVcsQ0FBaEI7ZUErTWUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jb25zdCBkYXRhQ2FsbHMgPSB7XG5cbiAgICBjb25uZWN0VG9EYXRhKGZldGNoT2JqZWN0KSB7XG5cbiAgICAgICAgbGV0IGRhdGFTZXQgPSBmZXRjaE9iamVjdC5kYXRhU2V0O1xuICAgICAgICBsZXQgZW1iZWRJdGVtID0gZmV0Y2hPYmplY3QuZW1iZWRJdGVtO1xuICAgICAgICBsZXQgZmV0Y2hUeXBlID0gZmV0Y2hPYmplY3QuZmV0Y2hUeXBlO1xuICAgICAgICBsZXQgZGF0YUJhc2VPYmplY3QgPSBmZXRjaE9iamVjdC5kYXRhQmFzZU9iamVjdDtcbiAgICAgICAgbGV0IHB1dElkID0gZmV0Y2hPYmplY3QucHV0SWQ7XG4gICAgICAgIGxldCBkZWxldGVJZCA9IGZldGNoT2JqZWN0LmRlbGV0ZUlkO1xuXG4gICAgICAgIGlmIChmZXRjaFR5cGUgPT0gXCJHRVRcIikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9JHtlbWJlZEl0ZW19YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cblxuICAgICAgICB9IGVsc2UgaWYgKGZldGNoVHlwZSA9PT0gXCJQT1NUXCIpe1xuXG4gICAgICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2UgaWYoZmV0Y2hUeXBlID09PSBcIlBVVFwiKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fS8ke3B1dElkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogYCR7ZmV0Y2hUeXBlfWAsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFCYXNlT2JqZWN0KSwvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZmV0Y2hUeXBlID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGF0YVNldH0vJHtkZWxldGVJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gbm8tcmVmZXJyZXIsICpjbGllbnRcbiAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIChcIllPVSBTQ1JFV0VEIElUIFVQXCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFDYWxscyIsIiIsIlxuXG5cblxuY29uc3QgZG9tQ29tcG9uZW50cyA9IHtcbiAgICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcywgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsImltcG9ydCBkYXRhQ2FsbHMgZnJvbSBcIi4vRGF0YVwiXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCJcbmltcG9ydCB0ZXJuYXJ5IGZyb20gXCIuL3Rlcm5hcnlCdWlsZGVyXCI7XG5cblxuY29uc3QgdGVybmFyeUxpc3RuZXJzID0ge1xuXG4gICAgZm9ybWNoZWNrKCkge1xuICAgICAgICBsZXQgZmllbGRzID0gJChcIi5pbnB1dEZpZWxkc1wiKVxuICAgICAgICAgICAgICBmaWVsZHMuZmluZChcImlucHV0XCIpLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2goZmllbGRzLCBmdW5jdGlvbihpLCBmaWVsZCkge1xuICAgICAgICAgIGlmICghZmllbGQudmFsdWUpe1xuICAgICAgICAgICAgYWxlcnQoZmllbGQubmFtZSArICcgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgIH0pOyBcbiAgICAgICAgY29uc29sZS5sb2coZmllbGRzKTtcblxuICAgICAgfSxcbiAgICBcbiAgICBzYXZlRW50cnkoKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGVybmFyeUxpc3RuZXJzLmZvcm1jaGVjaygpO1xuICAgICAgICAgICAgY29uc3Qgc2F2ZUlEID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNhdmVJRClcbiAgICAgICAgICAgIC8vISEhVGhpcyBsaW5lIGlzIGJyaWxsYW50IGl0IGdyYWJzIHRoZSBjaG9zZW4gY2l0eSBmcm9tIHRoZSB3ZWxjb21lIHBhZ2UgYW55d2hlcmUgaW4gdGhlIGFwcGxpY2F0aW9uLiBQcmV0dHkgQkEhIVxuICAgICAgICAgICAgdmFyIGNpdHlTZWxlY3QgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmllbGRzZXRzXCIpWzBdLmdldEF0dHJpYnV0ZShcImlkXCIpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNpdHlTZWxlY3QpO1xuICAgICAgICAgICAgY29uc3QgbG9jTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZUlucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbG9jRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25JbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxvY0Nvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nvc3RJbnB1dFwiKS52YWx1ZTsgICAgXG4gICAgICAgICAgICBjb25zdCBsb2NSZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jldmlld0lucHV0XCIpLnZhbHVlOyAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY05hbWUpOyAgICAgICAgXG5cbiAgICAgICAgICAgIGNvbnN0IGludE9iamVjdFBvc3QgPSB7XG4gICAgICAgICAgICAgICAgXCJkYXRhU2V0XCI6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgXCJmZXRjaFR5cGVcIjogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicGxhY2VJZFwiOiBjaXR5U2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogbG9jTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBsb2NEZXNjLFxuICAgICAgICAgICAgICAgICAgICBcImNvc3RcIjogbG9jQ29zdCxcbiAgICAgICAgICAgICAgICAgICAgXCJyZXZpZXdcIjogbG9jUmV2IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW50T2JqZWN0UG9zdClcbiAgICAgICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKGludE9iamVjdFBvc3QpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbilcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vISEhY2xlYXJzIHRoZSB3aG9sZSBwYWdlIGFuZCByZXdyaXRlcyB0aGUgd2hvbGUgcGFnZSB3aXRoIGNoYW5nZXMuIFxuICAgICAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KGNpdHlTZWxlY3QpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgIGRlbGV0ZUVudHJ5KCkge1xuICAgICAgICAgICAgLy9UbyBkZWxldGUgZnJvbSBzYXZlZCBuZXdzIGFydGljbGVzLlxuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUlEID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XG4gICAgICAgIHZhciBjaXR5U2VsZWN0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZpZWxkc2V0c1wiKVswXS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNpdHlTZWxlY3QpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZWxldGVJRCk7XG4gICAgICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUlkOiBkZWxldGVJRCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNldDogXCJpbnRlcmVzdHNcIixcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hUeXBlOiBcIkRFTEVURVwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuZGlzcGxheVRlcm5hcnkoY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgZWRpdEVudHJ5Q3JlYXRvcigpe1xuICAgICAgICAvL1RPRE8gQWRkIHRoZSBlZGl0IGJ1dHRvbiBhbmQgbG9naWMuXG4gICAgICAgIFxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhlZGl0QnV0dG9uKTtcbiAgICAgICAgXG4gICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG5cbiAgICAgICAgbGV0IGVkaXRNYWluQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsIGNzc0NsYXNzOlwibWFpbkVkaXRDb250YWluZXJcIn0pXG5cbiAgICAgICAgbGV0IGVkaXROYW1lQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiZWRpdENvbnRhaW5lcnNcIn0pXG4gICAgICAgIGxldCBlZGl0TmFtZUlucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIk5hbWU6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwibmFtZVwifX0pO1xuICAgICAgICBsZXQgZWRpdE5hbWVJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcInRleHRcIiwgbmFtZTpcIm5hbWVJbnB1dFwiLCBpZDogYGVkaXROYW1lSW5wdXQtLSR7ZWRpdEJ1dHRvbn1gIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0TmFtZUlucHV0TGFiZWwsIGVkaXROYW1lSW5wdXQpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImVkaXRDb250YWluZXJzXCJ9KVxuICAgICAgICBsZXQgZWRpdERlc2NyaXB0aW9uSW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiRGVzY3JpcHRpb246IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwiZGVzY3JpcHRpb25cIn19KTtcbiAgICAgICAgbGV0IGVkaXREZXNjcmlwdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZWRpdERlc2NyaXB0aW9uSW5wdXRcIiwgaWQ6IGBlZGl0RGVzY3JpcHRpb25JbnB1dC0tJHtlZGl0QnV0dG9ufWAgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXREZXNjcmlwdGlvbklucHV0TGFiZWwsIGVkaXREZXNjcmlwdGlvbklucHV0KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBlZGl0Q29zdENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImVkaXRDb250YWluZXJzXCJ9KVxuICAgICAgICBsZXQgZWRpdENvc3RJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJDb3N0OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImNvc3RcIn19KTtcbiAgICAgICAgbGV0IGVkaXRDb3N0SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJudW1iZXJcIiwgbmFtZTpcImVkaXRDb3N0SW5wdXRcIiwgaWQ6IGBlZGl0Q29zdElucHV0LS0ke2VkaXRCdXR0b259YCB9fSlcbiAgICAgICAgY29uc29sZS5sb2coZWRpdENvc3RJbnB1dExhYmVsLCBlZGl0Q29zdElucHV0KTtcbiAgICAgICAgXG4gICAgICAgIGxldCBlZGl0UmV2aWV3Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiZWRpdENvbnRhaW5lcnNcIn0pXG4gICAgICAgIGxldCBlZGl0UmV2aWV3SW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiUmV2aWV3OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcInJldmlld1wifX0pO1xuICAgICAgICBsZXQgZWRpdFJldmlld0lucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZWRpdFJldmlld0lucHV0XCIsIGlkOiBgZWRpdFJldmlld0lucHV0LS0ke2VkaXRCdXR0b259YH19KVxuICAgICAgICBjb25zb2xlLmxvZyhlZGl0UmV2aWV3SW5wdXRMYWJlbCwgZWRpdFJldmlld0lucHV0KTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1cGRhdGVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImJ1dHRvblwiLCBjc3NDbGFzczpcImJ1dHRvblwiLCBjb250ZW50OlwiVXBkYXRlXCIsIGF0dHJpYnV0ZXM6e2lkOmAke2VkaXRCdXR0b259YH0gfSlcbiAgICAgICAgY29uc29sZS5sb2codXBkYXRlQnV0dG9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vISEhIGNhbGwgZm9yIGRpc3BsYXkgb2YgZGF0YSBiZWluZyBtb2RpZmllZCBnZXQgY2VydGFpbiBpbnRlcmVzdHMgYmFzZWQgb24gZWRpdEJ1dHRvbi5cbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHM/aWQ9JHtlZGl0QnV0dG9ufSZfZXhwYW5kPXBsYWNlYClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihySW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIHJJbnRlcmVzdHMuZm9yRWFjaChpbnREZXRhaWxzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhySW50ZXJlc3RzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLCBjc3NDbGFzczpcImVkaXRlZExvY2F0aW9uQXJ0aWNsZVwiLCBhdHRyaWJ1dGU6eyBpZDpgJHtpbnREZXRhaWxzLmlkfWB9fSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY05hbWVMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIE5hbWUgOiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY05hbWVTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMubmFtZX1gfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdGVkTG9jTmFtZUxhYmVsLCBlZGl0ZWRMb2NOYW1lU2VjdGlvbikgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY0Rlc2NMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIERlc2NyaXB0aW9uIDogXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRMb2NEZXNjU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLmRlc2NyaXB0aW9ufWB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0ZWRMb2NEZXNjTGFiZWwsIGVkaXRlZExvY0Rlc2NTZWN0aW9uKSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jQ29zdExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gQ29zdCA6IFwifSlcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jQ29zdFNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5jb3N0fWB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZGl0ZWRMb2NDb3N0TGFiZWwsIGVkaXRlZExvY0Nvc3RTZWN0aW9uKSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGVkTG9jUmV2TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBSZXZpZXcgOiBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZExvY1JldlNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5yZXZpZXd9YH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZExvY1JldkxhYmVsLCBlZGl0ZWRMb2NSZXZTZWN0aW9uKSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY05hbWVMYWJlbCk7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NOYW1lU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgZWRpdGVkTG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0ZWRMb2NEZXNjTGFiZWwpO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jRGVzY1NlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdGVkTG9jQ29zdExhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY0Nvc3RTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY1JldkxhYmVsKTtcbiAgICAgICAgICAgICAgICBlZGl0ZWRMb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY1JldlNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRlZExvY2F0aW9uSW50ZXJlc3RDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGVkaXROYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXROYW1lSW5wdXRMYWJlbCk7XG4gICAgICAgIGVkaXROYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXROYW1lSW5wdXQpO1xuICAgICAgICBlZGl0RGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdERlc2NyaXB0aW9uSW5wdXRMYWJlbCk7XG4gICAgICAgIGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0RGVzY3JpcHRpb25JbnB1dCk7XG4gICAgICAgIGVkaXRDb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb3N0SW5wdXRMYWJlbCk7XG4gICAgICAgIGVkaXRDb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb3N0SW5wdXQpO1xuICAgICAgICBlZGl0UmV2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRSZXZpZXdJbnB1dExhYmVsKTtcbiAgICAgICAgZWRpdFJldmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UmV2aWV3SW5wdXQpO1xuICAgICAgICBlZGl0TWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0TmFtZUNvbnRhaW5lcik7XG4gICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXREZXNjcmlwdGlvbkNvbnRhaW5lcik7XG4gICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb3N0Q29udGFpbmVyKTtcbiAgICAgICAgZWRpdE1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdFJldmlld0NvbnRhaW5lcik7XG4gICAgICAgIGVkaXRNYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChlZGl0TWFpbkNvbnRhaW5lcilcblxuICAgICAgICBcbiAgICAgICAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdG5lcnMuZXhlY3V0ZUVkaXRzKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlZGl0QnV0dG9uO1xuICAgIH0sXG5cbiAgICBleGVjdXRlRWRpdHModXBkYXRlQ2hvaWNlKXtcblxuICAgICAgICBjb25zdCBlZGl0ZWRJZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZElkKTtcblxuICAgICAgICBjb25zdCBlZGl0ZWROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXROYW1lSW5wdXQtLSR7ZWRpdGVkSWR9YCkudmFsdWU7XG4gICAgICAgIGNvbnN0IGVkaXRlZERlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdERlc2NyaXB0aW9uSW5wdXQtLSR7ZWRpdGVkSWR9YCkudmFsdWU7XG4gICAgICAgIGNvbnN0IGVkaXRlZENvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdENvc3RJbnB1dC0tJHtlZGl0ZWRJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc3QgZWRpdGVkUmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRSZXZpZXdJbnB1dC0tJHtlZGl0ZWRJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coZWRpdGVkTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRlZERlc2MpO1xuICAgICAgICBjb25zb2xlLmxvZyhlZGl0ZWRDb3N0KTtcbiAgICAgICAgY29uc29sZS5sb2coZWRpdGVkUmV2KTtcblxuICAgICAgICBpZiAoZWRpdGVkTmFtZSA9PT0gXCJcIiB8fCBlZGl0ZWREZXNjID09PSBcIlwiIHx8IGVkaXRlZENvc3QgPT09IFwiXCIgfHwgZWRpdGVkUmV2PT09IFwiXCIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiTm8gYmxhbmsgc3BhY2VzIGFsbG93ZWQhIVwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgICAgIHB1dElkOiBlZGl0ZWRJZCxcbiAgICAgICAgICAgICAgICBkYXRhU2V0OiBcImludGVyZXN0c1wiLFxuICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJQVVRcIixcbiAgICAgICAgICAgICAgICBkYXRhQmFzZU9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWlkOiAxLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBlZGl0ZWROYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZWRpdGVkRGVzYyxcbiAgICAgICAgICAgICAgICAgICAgY29zdDogZWRpdGVkQ29zdCxcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3OiBlZGl0ZWRSZXZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0sXG5cbiAgICBkaXNwbGF5Q2hvaWNlKCl7XG4gICAgICAgIC8vIHRoZSBpdGVtIHRoZXkgY2hvc2Ugd2lsbCBicmluZyBkb3duIGFuZCBhZGQgZGVsZXRlIGJ1dHRvbnMuXG4gICAgICAgIGNvbnN0IGNob2ljZUJ1dHRvbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZS5zcGxpdChcIi0tXCIpWzFdKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaG9pY2VCdXR0b24pO1xuXG4gICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKHtcbiAgICAgICAgICAgIGRhdGFTZXQ6IFwicGxhY2VzXCIsXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdDogXCJcIixcbiAgICAgICAgICAgIGVtYmVkSXRlbTogXCI/X2VtYmVkPWludGVyZXN0c1wiXG4gICAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2VJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZUludGVyZXN0cyk7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGNpdHlzID0+IHtcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2l0eXMuaWQsIGNob2ljZUJ1dHRvbikgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjaG9pY2VCdXR0b24gPT09IGNpdHlzLmlkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoXCIjb3V0cHV0XCIpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGVybmFyeS5kaXNwbGF5VGVybmFyeShjaG9pY2VCdXR0b24pO1xuICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoY2hvaWNlQnV0dG9uKTtcblxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeUxpc3RuZXJzIiwiaW1wb3J0IHRlcm5hcnkgZnJvbSBcIi4vdGVybmFyeUJ1aWxkZXJcIjtcblxudGVybmFyeS53ZWxjb21lKCk7XG4vL3Rlcm5hcnkuZGlzcGxheVRlcm5hcnkoKTtcbi8vdGVybmFyeS5jcmVhdGVJbnB1dEZpZWxkcygpOyIsImltcG9ydCBkYXRhQ2FsbHMgZnJvbSBcIi4vRGF0YVwiXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCJcbmltcG9ydCB0ZXJuYXJ5TGlzdGVuZXJzIGZyb20gXCIuL2xpc3RlbmVyXCJcbmltcG9ydCB0cmF2ZWxlciBmcm9tIFwiLi9UcmF2bGVyLnBuZ1wiXG5cblxuXG5cbmNvbnN0IHRlcm5hcnkgPSB7XG5cblxuICAgIHdlbGNvbWUoKXtcbiAgICAgICAgLy8gTGFuZGluZyBwYWdlLiBDaG9vc2UgdGhlIGNpdHkgYW5kIHlvdSBjYW4gbWFrZSB5b3VyIGFkanVzdG1lbnRzIG9uY2UgeW91IGFyZSBvbiB0aGF0IHNjcmVlbi5cblxuICAgICAgICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI291dHB1dFwiKTtcbiAgICAgICAgJChcIiNvdXRwdXRcIikuZW1wdHkoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhvdXRwdXQpXG4gICAgICAgIGxldCB3ZWxjb21lQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsY3NzQ2xhc3M6XCJ3ZWxjb21lQ29udGFpbmVyXCJ9KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh3ZWxjb21lQ29udGFpbmVyKTtcbiAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHdlbGNvbWVDb250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHdlbGNvbWVIZWFkZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImgxXCIsIGNzc0NsYXNzOiBcImgxSGVhZGVyXCIsY29udGVudDpcIldlbGNvbWUgYW5kIHBsZWFzZSBjaG9vc2UgZnJvbSB0aGUgZm9sbG93aW5nIG9wdGlvbnMuXCIgfSlcbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJmb3JtXCIsIGNzc0NsYXNzOlwiZHJvcERvd25NYWluQ29udGFpbmVyXCJ9KTtcbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGVudENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwic2VsZWN0XCIsIGNzc0NsYXNzOlwiZHJvcERvd25Db250ZW50Q29udGFpbmVyXCIsIGF0dHJpYnV0ZXM6e2lkOlwiZHJvcERvd25cIn19KTtcbiAgICAgICAgXG4gICAgICAgIHdlbGNvbWVDb250YWluZXIuYXBwZW5kQ2hpbGQod2VsY29tZUhlYWRlcik7XG4gICAgICAgIGRyb3BEb3duQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudENvbnRhaW5lcik7XG5cbiAgICAgICAgbGV0IGRyb3BEb3duQ29udGVudEJsYW5rID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcIm9wdGlvblwiLCBjc3NDbGFzczogXCJkcm9wRG93bkNvbnRlbnRcIiwgY29udGVudDpcIkNob29zZSBhIFNoaXR0eVwifSlcbiAgICAgICAgZHJvcERvd25Db250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudEJsYW5rKTtcblxuXG4gICAgICAgIGRhdGFDYWxscy5jb25uZWN0VG9EYXRhKHtcbiAgICAgICAgICAgIGRhdGFTZXQ6IFwicGxhY2VzXCIsXG4gICAgICAgICAgICBmZXRjaFR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhQmFzZU9iamVjdDogXCJcIixcbiAgICAgICAgICAgIGVtYmVkSXRlbTogXCI/X2VtYmVkPWludGVyZXN0c1wiXG4gICAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2VJbnRlcmVzdHMgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmVzdHMuZm9yRWFjaChpbnREZXRhaWxzID0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGludERldGFpbHMpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGludERldGFpbHMubmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW50RGV0YWlscy5pZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZHJvcERvd25Db250ZW50ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcIm9wdGlvblwiLCBjc3NDbGFzczogXCJkcm9wRG93bkNvbnRlbnRcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9LS0ke2ludERldGFpbHMuaWR9YCwgYXR0cmlidXRlczoge2lkOmBjaXR5LS0ke2ludERldGFpbHMuaWR9YCB9fSlcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRyb3BEb3duQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnQpO1xuICAgICAgICAgICAgfSkgXG5cbiAgICAgICAgICAgIGRyb3BEb3duQ29udGVudENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRlcm5hcnlMaXN0ZW5lcnMuZGlzcGxheUNob2ljZSk7ICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB3ZWxjb21lQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICB9LFxuIFxuICAgIGRpc3BsYXlUZXJuYXJ5KGNob3Nlbk9uZSlcbiAgICB7XG4gICAgICAgIC8vY29uc29sZS5sb2coY2hvc2VuT25lKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIik7XG4gICAgICAgLy8gY29uc29sZS5sb2cob3V0cHV0KVxuXG4gICAgICAgLy8hIUNyZWF0aW9uIG9mIHRoZSByZXR1cm4gdG8gbGFuZGluZyBwYWdlIGJ1dHRvbi5cbiAgICAgICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYVwiLGNzc0NsYXNzOlwiaG9tZUJ1dHRvblwiLCBjb250ZW50OlwiSE9NRVwiLCBhdHRyaWJ1dGVzOntzcmM6YCR7dHJhdmVsZXJ9YCwgaWQ6XCJob21lQnV0dG9uXCJ9fSk7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy53ZWxjb21lKTtcblxuICAgICAgICAvLyEhIFF1aWNrIGZldGNoIGNhbGwgZm9yIHRoZSBjaXR5IG5hbWUuIEZvciBzb21lIHJlYXNvbiBpdCB3b3VsZCBub3Qgd29yayBpbiB0aGUgb3RoZXIgZmV0Y2ggbG9vcC4gSXQgbmVlZGVkIHRvIGJlIHBhcnRpY3VsYXIgdG8gdGhpcyBmZXRjaC4gXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzP2lkPSR7Y2hvc2VuT25lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4ociA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICAgICAgci5mb3JFYWNoKHJEZXRhaWxzID0+e1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImgyXCIsY3NzQ2xhc3M6XCJjaXR5VGl0bGVcIiwgY29udGVudDpgJHtyRGV0YWlscy5uYW1lfWAsIGF0dHJpYnV0ZXM6e2lkOlwiY2l0eVRpdGxlXCJ9fSk7XG4gICAgICAgICAgICAgICAgaG9tZUJ1dHRvbi5hcHBlbmRDaGlsZChjaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwibWFpbkNvbnRhaW5lclwifSk7XG4gICAgICAgLy8gY29uc29sZS5sb2cobWFpbkNvbnRhaW5lcik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IGludGVyZXN0Q2FyZCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwiaW50ZXJlc3RDYXJkXCIsIGNvbnRlbnQ6YGAsIGF0dHJpYnV0ZTp7IGlkOiBcImNhcmRcIiB9fSk7XG4gICAgICAgLy8gY29uc29sZS5sb2coaW50ZXJlc3RDYXJkKTtcbiAgICBcblxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cz9wbGFjZUlkPSR7Y2hvc2VuT25lfSZfZXhwYW5kPXBsYWNlYClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihySW50ZXJlc3RzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJJbnRlcmVzdHMpO1xuICAgICAgICAgICAgIC8vISFGb3IgbG9vcCB0byBhc3NpZ24gaW5mb3JtYXRpb24gZnJvbSBEQiB0byBkaXNwbGF5LlxuICAgICAgICAgICAgckludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscy5wbGFjZS5pZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8hISBDaXR5IGNvbnRhaW5lciBsYWJlbHMgYW5kIHNlY3Rpb24gaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgbGV0IGNpdHlDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImZpZWxkc2V0XCIsIGNzc0NsYXNzOlwiZmllbGRzZXRzXCIsIGF0dHJpYnV0ZXM6eyBpZDpgJHtpbnREZXRhaWxzLnBsYWNlLmlkfWB9LCB0YWJJbmRleDpgJHtpbnREZXRhaWxzLnBsYWNlLmlkfWAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGNpdHlMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImxhYmVsc1wifSlcbiAgICAgICAgICAgICAgICBsZXQgY2l0eVNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImNpdHlzXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5uYW1lfS0tJHtpbnREZXRhaWxzLmlkfWB9KTtcblxuICAgICAgICAgICAgICAgIGxldCB2aXNhTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJsYWJlbHNcIiwgY29udGVudDpcIkRvIHlvdSBuZWVkIGEgVmlzYVwifSlcbiAgICAgICAgICAgICAgICBsZXQgdmlzYVNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImNpdHlzXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy52aXNhX3JlcXVpcmVkfWB9KTtcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eUxhYmVsKTtcbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHlTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHZpc2FMYWJlbCk7XG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aXNhU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgaW50ZXJlc3RDYXJkLmFwcGVuZENoaWxkKGNpdHlDb250YWluZXIpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgLy8hISEgUmVtYWluaW5nIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBsb2NhdGlvbiBkZXRhaWxzLiAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIiwgY3NzQ2xhc3M6XCJsb2NhdGlvbkFydGljbGVcIiwgYXR0cmlidXRlOnsgaWQ6YCR7aW50RGV0YWlscy5pZH1gfX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGxvY05hbWVMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIE5hbWUgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NOYW1lU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9YH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Rlc2NMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIERlc2NyaXB0aW9uIFwifSlcbiAgICAgICAgICAgICAgICBsZXQgbG9jRGVzY1NlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7aW50RGV0YWlscy5kZXNjcmlwdGlvbn1gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgbG9jQ29zdExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gQ29zdCBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Nvc3RTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMuY29zdH1gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgbG9jUmV2TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBSZXZpZXcgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NSZXZTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJpbnRTZWN0aW9uc1wiLCBjb250ZW50OmAke2ludERldGFpbHMucmV2aWV3fWB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBkZWxMb2NhdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJidXR0b25cIiwgY3NzQ2xhc3M6XCJidXR0b25cIiwgY29udGVudDogXCJEZWxldGUgRW50cnlcIiwgYXR0cmlidXRlczp7IGlkOmBkZWxCdXR0b24tLSR7aW50RGV0YWlscy5pZH1gfX0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGVsTG9jYXRpb24pOyAgIFxuICAgICAgICAgICAgICAgIGxldCBlZGl0TG9jYXRpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwiYnV0dG9uXCIsIGNzc0NsYXNzOlwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiRWRpdCBFbnRyeVwiLCBhdHRyaWJ1dGVzOnsgaWQ6YGVkaXRCdXR0b24tLSR7aW50RGV0YWlscy5pZH1gfX0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZWRpdExvY2F0aW9uKTsgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY05hbWVMYWJlbCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NOYW1lU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NEZXNjTGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jRGVzY1NlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jQ29zdExhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY0Nvc3RTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY1JldkxhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY1JldlNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsTG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVsTG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnlMaXN0ZW5lcnMuZGVsZXRlRW50cnkpO1xuICAgICAgICAgICAgICAgIGVkaXRMb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RlbmVycy5lZGl0RW50cnlDcmVhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGludGVyZXN0Q2FyZC5hcHBlbmRDaGlsZChsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pICAgICBcbiAgICAgICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDYXJkKTtcbiAgICBcbiAgICB9LFxuXG4gICAgY3JlYXRlSW5wdXRGaWVsZHMoY2l0eVNlbGVjdCl7XG5cbiAgICAgICAgICAgIC8vIHZhciBjaXR5SW5wdXRTZWxlY3QgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmllbGRzZXRzXCIpWzBdLmdldEF0dHJpYnV0ZShcImlkXCIpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNpdHlJbnB1dFNlbGVjdCk7XG4gICAgICAgIC8vc3RydWN0dXJlIFxuICAgICAgICAgICAgY29uc29sZS5sb2coY2l0eVNlbGVjdCk7XG4gICAgICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcImlucHV0Q29udGFpbmVyXCJ9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXRGaWVsZHMpO1xuICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKGlucHV0RmllbGRzKTtcblxuICAgICAgICAvLyEhISBDb250YWluZXIsIGxhYmVscyBhbmQgaW5wdXRzIGZvciBhbGwgdGhlIGxvY2F0aW9uIGlucHV0cy5cbiAgICAgICAgICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJOYW1lOiBcIiwgYXR0cmlidXRlczp7IGZvcjpcIm5hbWVcIn19KTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUlucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwibmFtZUlucHV0XCIsIGlkOiBcIm5hbWVJbnB1dFwiIH19KVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobmFtZUlucHV0TGFiZWwsIG5hbWVJbnB1dCk7XG4gICAgICAgICAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb25JbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJEZXNjcmlwdGlvbjogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJkZXNjcmlwdGlvblwifX0pO1xuICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZGVzY3JpcHRpb25JbnB1dFwiLCBpZDogXCJkZXNjcmlwdGlvbklucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZXNjcmlwdGlvbklucHV0TGFiZWwsIGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29zdENvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGNvc3RJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJDb3N0OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImNvc3RcIn19KTtcbiAgICAgICAgICAgICAgICBsZXQgY29zdElucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwibnVtYmVyXCIsIG5hbWU6XCJjb3N0SW5wdXRcIiwgaWQ6IFwiY29zdElucHV0XCIgfX0pXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb3N0SW5wdXRMYWJlbCwgY29zdElucHV0KTtcbiAgICAgICAgICAgICAgICBjb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvc3RJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICBjb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvc3RJbnB1dCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJldmlld0NvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IHJldmlld0lucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIlJldmlldzogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJyZXZpZXdcIn19KTtcbiAgICAgICAgICAgICAgICBsZXQgcmV2aWV3SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJ0ZXh0XCIsIG5hbWU6XCJyZXZpZXdJbnB1dFwiLCBpZDogXCJyZXZpZXdJbnB1dFwiIH19KVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmV2aWV3SW5wdXRMYWJlbCwgcmV2aWV3SW5wdXQpO1xuICAgICAgICAgICAgICAgIHJldmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChyZXZpZXdJbnB1dExhYmVsKTtcbiAgICAgICAgICAgICAgICByZXZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQocmV2aWV3SW5wdXQpO1xuXG4gICAgICAgXG4gICAgICAgIC8vc3ZlIGJ0dG5cbiAgICAgICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImJ1dHRvblwiLCBjb250ZW50OiBcIlNhdmVcIiwgYXR0cmlidXRlczoge3R5cGU6IFwiYnV0dG9uXCIsIGlkOiBcInNhdmVFdmVudFwifX0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChuYW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGNvc3RDb250YWluZXIpO1xuICAgICAgICAgICAgaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQocmV2aWV3Q29udGFpbmVyKTtcbiAgICAgICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdGVuZXJzLnNhdmVFbnRyeSk7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnB1dEZpZWxkcztcblxuICAgIH0sXG5cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm5hcnkiXX0=
