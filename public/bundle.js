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

},{}],3:[function(require,module,exports){
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
  saveEntry() {
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
    };
    console.log(intObjectPost);

    _Data.default.connectToData(intObjectPost).then(response => response.json).then(() => {
      $("#output").empty();

      _ternaryBuilder.default.displayTernary();

      _ternaryBuilder.default.createInputFields();
    });
  },

  deleteEntry() {
    //To delete from saved news articles.
    const deleteID = event.target.id.split("--")[1];
    console.log(deleteID);

    _Data.default.connectToData({
      deleteId: deleteID,
      dataSet: "interests",
      fetchType: "DELETE"
    }).then(() => {
      $("#output").empty();

      _ternaryBuilder.default.displayTernary();

      _ternaryBuilder.default.createInputFields();
    });
  },

  editEntry() {
    const editID = event.target.id;
    console.log(editID);
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
      console.log(responseInterests);
      responseInterests.forEach(citys => {
        console.log(citys.id, choiceButton);

        if (choiceButton === citys.id) {
          $("#output").empty();

          _ternaryBuilder.default.displayTernary(choiceButton);

          _ternaryBuilder.default.createInputFields();
        }
      });
    });
  }

};
var _default = ternaryListners;
exports.default = _default;

},{"./Data":1,"./domComponents":2,"./ternaryBuilder":5}],4:[function(require,module,exports){
"use strict";

var _ternaryBuilder = _interopRequireDefault(require("./ternaryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ternaryBuilder.default.welcome(); //ternary.displayTernary();
//ternary.createInputFields();

},{"./ternaryBuilder":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Data = _interopRequireDefault(require("./Data"));

var _domComponents = _interopRequireDefault(require("./domComponents"));

var _listener = _interopRequireDefault(require("./listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  welcome() {
    const output = document.querySelector("#output");
    console.log(output);

    let welcomeContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "welcomeContainer"
    });

    console.log(welcomeContainer);
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
        console.log(intDetails);
        console.log(intDetails.name);
        console.log(intDetails.id);

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
    console.log(chosenOne);
    const output = document.querySelector("#output"); // console.log(output)

    let mainContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "mainContainer",
      content: "MainBox"
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


    _Data.default.connectToData({
      dataSet: "places",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=interests"
    }).then(responseInterests => {
      responseInterests.forEach(intDetails => {
        console.log(intDetails.name);

        let cityContainer = _domComponents.default.createDomElement({
          elementType: "fieldset",
          cssClass: "fieldsets",
          attribute: {
            id: `${intDetails.id}`
          },
          tabIndex: `${intDetails.id}`
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
        interestCard.appendChild(cityContainer);
        let locInterests = intDetails.interests;
        console.log(locInterests);
        locInterests.forEach(locIDetails => {
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
            content: `${locIDetails.name}`
          });

          let locDescLabel = _domComponents.default.createDomElement({
            elementType: "label",
            cssClass: "intLabels",
            content: " Location Description "
          });

          let locDescSection = _domComponents.default.createDomElement({
            elementType: "section",
            cssClass: "intSections",
            content: `${locIDetails.description}`
          });

          let locCostLabel = _domComponents.default.createDomElement({
            elementType: "label",
            cssClass: "intLabels",
            content: " Location Cost "
          });

          let locCostSection = _domComponents.default.createDomElement({
            elementType: "section",
            cssClass: "intSections",
            content: `${locIDetails.cost}`
          });

          let locRevLabel = _domComponents.default.createDomElement({
            elementType: "label",
            cssClass: "intLabels",
            content: " Location Review "
          });

          let locRevSection = _domComponents.default.createDomElement({
            elementType: "section",
            cssClass: "intSections",
            content: `${locIDetails.review}`
          });

          let delLocation = _domComponents.default.createDomElement({
            elementType: "button",
            cssClass: "button",
            content: "Delete Entry",
            attributes: {
              id: `delButton--${locIDetails.id}`
            }
          });

          console.log(delLocation);

          let editLocation = _domComponents.default.createDomElement({
            elementType: "button",
            cssClass: "button",
            content: "Edit Entry",
            attributes: {
              id: `editButton--${locIDetails.id}`
            }
          });

          locationInterestContainer.appendChild(locNameLabel);
          locationInterestContainer.appendChild(locNameSection);
          locationInterestContainer.appendChild(locDescLabel);
          locationInterestContainer.appendChild(locDescSection);
          locationInterestContainer.appendChild(locCostLabel);
          locationInterestContainer.appendChild(locCostSection);
          locationInterestContainer.appendChild(locRevLabel);
          locationInterestContainer.appendChild(locRevSection);
          locationInterestContainer.appendChild(delLocation);
          locationInterestContainer.appendChild(editLocation); // console.log(delLocation);
          // console.log(editLocation);

          delLocation.addEventListener("click", _listener.default.deleteEntry);
          editLocation.addEventListener("click", _listener.default.editEntry);
          cityContainer.appendChild(locationInterestContainer);
        });
        mainContainer.appendChild(interestCard);
      });
    });
  },

  createInputFields() {
    //structure
    let inputFields = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "inputContainer"
    });

    console.log(inputFields);
    output.appendChild(inputFields); //labels and inputs

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
    });

    console.log(nameInputLabel, nameInput);
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
    });

    console.log(descriptionInputLabel, descriptionInput);
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
    });

    console.log(costInputLabel, costInput);
    costContainer.appendChild(costInputLabel);
    costContainer.appendChild(costInput); //toggle should go here.

    _Data.default.connectToData({
      dataSet: "places",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=interests"
    }); //sve bttn


    const saveButton = _domComponents.default.createDomElement({
      elementType: "button",
      content: "Save",
      attributes: {
        type: "button",
        id: "saveEvent"
      }
    });

    saveButton.addEventListener("click", _listener.default.saveEntry);
    inputFields.appendChild(nameContainer);
    inputFields.appendChild(descriptionContainer);
    inputFields.appendChild(costContainer);
    inputFields.appendChild(saveButton);
    return inputFields;
  }

};
var _default = ternary;
exports.default = _default;

},{"./Data":1,"./domComponents":2,"./listener":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2xpc3RlbmVyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy90ZXJuYXJ5QnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0VBLE1BQU0sU0FBUyxHQUFHO0FBRWQsRUFBQSxhQUFhLENBQUMsV0FBRCxFQUFjO0FBRXZCLFFBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUExQjtBQUNBLFFBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUE1QjtBQUNBLFFBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUE1QjtBQUNBLFFBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFqQztBQUNBLFFBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUF4QjtBQUNBLFFBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUEzQjs7QUFFQSxRQUFJLFNBQVMsSUFBSSxLQUFqQixFQUF3QjtBQUN4QixhQUFPLEtBQUssQ0FBRSx5QkFBd0IsT0FBUSxHQUFFLFNBQVUsRUFBOUMsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQLENBRHdCLENBRWU7QUFFdEMsS0FKRCxNQUlPLElBQUksU0FBUyxLQUFLLE1BQWxCLEVBQXlCO0FBRWhDO0FBQ0EsYUFBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsRUFBbEMsRUFBcUM7QUFDN0MsUUFBQSxNQUFNLEVBQUcsR0FBRSxTQUFVLEVBRHdCO0FBQ3JCO0FBQ3hCLFFBQUEsT0FBTyxFQUFFO0FBQ0wsMEJBQWdCLGlDQURYLENBRUw7O0FBRkssU0FGb0M7QUFNN0M7QUFDQSxRQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGNBQWYsQ0FQdUMsQ0FPUDs7QUFQ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QUFVLEVBQUM7QUFBRSxRQUFBLElBQUksRUFBQyxRQUFQO0FBQWlCLFFBQUEsSUFBSSxFQUFDLFdBQXRCO0FBQW1DLFFBQUEsRUFBRSxFQUFFO0FBQXZDO0FBQTFELEtBQS9CLENBQWhCOztBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLFNBQTVCO0FBQ0EsSUFBQSxhQUFhLENBQUMsV0FBZCxDQUEwQixjQUExQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsU0FBMUIsRUEzQmUsQ0E2QmY7O0FBQ0Esa0JBQVUsYUFBVixDQUF3QjtBQUNwQixNQUFBLE9BQU8sRUFBRSxRQURXO0FBRXBCLE1BQUEsU0FBUyxFQUFFLEtBRlM7QUFHcEIsTUFBQSxjQUFjLEVBQUUsRUFISTtBQUlwQixNQUFBLFNBQVMsRUFBRTtBQUpTLEtBQXhCLEVBOUJlLENBcUNmOzs7QUFDQSxVQUFNLFVBQVUsR0FBRyx1QkFBYyxnQkFBZCxDQUErQjtBQUFDLE1BQUEsV0FBVyxFQUFFLFFBQWQ7QUFBd0IsTUFBQSxPQUFPLEVBQUUsTUFBakM7QUFBeUMsTUFBQSxVQUFVLEVBQUU7QUFBQyxRQUFBLElBQUksRUFBRSxRQUFQO0FBQWlCLFFBQUEsRUFBRSxFQUFFO0FBQXJCO0FBQXJELEtBQS9CLENBQW5COztBQUVBLElBQUEsVUFBVSxDQUFDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLGtCQUFpQixTQUF0RDtBQUVBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLG9CQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFVBQXhCO0FBRUEsV0FBTyxXQUFQO0FBRUg7O0FBN0xXLENBQWhCO2VBa01lLE8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcblxuY29uc3QgZGF0YUNhbGxzID0ge1xuXG4gICAgY29ubmVjdFRvRGF0YShmZXRjaE9iamVjdCkge1xuXG4gICAgICAgIGxldCBkYXRhU2V0ID0gZmV0Y2hPYmplY3QuZGF0YVNldDtcbiAgICAgICAgbGV0IGVtYmVkSXRlbSA9IGZldGNoT2JqZWN0LmVtYmVkSXRlbTtcbiAgICAgICAgbGV0IGZldGNoVHlwZSA9IGZldGNoT2JqZWN0LmZldGNoVHlwZTtcbiAgICAgICAgbGV0IGRhdGFCYXNlT2JqZWN0ID0gZmV0Y2hPYmplY3QuZGF0YUJhc2VPYmplY3Q7XG4gICAgICAgIGxldCBwdXRJZCA9IGZldGNoT2JqZWN0LnB1dElkO1xuICAgICAgICBsZXQgZGVsZXRlSWQgPSBmZXRjaE9iamVjdC5kZWxldGVJZDtcblxuICAgICAgICBpZiAoZmV0Y2hUeXBlID09IFwiR0VUXCIpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fSR7ZW1iZWRJdGVtfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpIC8vIHBhcnNlcyByZXNwb25zZSB0byBKU09OXG5cbiAgICAgICAgfSBlbHNlIGlmIChmZXRjaFR5cGUgPT09IFwiUE9TVFwiKXtcblxuICAgICAgICAvLyBEZWZhdWx0IG9wdGlvbnMgYXJlIG1hcmtlZCB3aXRoICpcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogYCR7ZmV0Y2hUeXBlfWAsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyBuby1yZWZlcnJlciwgKmNsaWVudFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YUJhc2VPYmplY3QpLCAvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICAgIH0pXG5cbiAgICAgICAgfSBlbHNlIGlmKGZldGNoVHlwZSA9PT0gXCJQVVRcIil7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGF0YVNldH0vJHtwdXRJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksLy8gYm9keSBkYXRhIHR5cGUgbXVzdCBtYXRjaCBcIkNvbnRlbnQtVHlwZVwiIGhlYWRlclxuICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGZldGNoVHlwZSA9PT0gXCJERUxFVEVcIikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9LyR7ZGVsZXRlSWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJZT1UgU0NSRVdFRCBJVCBVUFwiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhQ2FsbHMiLCJcblxuXG5cbmNvbnN0IGRvbUNvbXBvbmVudHMgPSB7XG4gICAgY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlLCBjb250ZW50ID0gbnVsbCwgY3NzQ2xhc3MsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgIGlmIChjc3NDbGFzcykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICB9XG4gIGV4cG9ydCBkZWZhdWx0IGRvbUNvbXBvbmVudHMiLCJpbXBvcnQgZGF0YUNhbGxzIGZyb20gXCIuL0RhdGFcIlxuaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50c1wiXG5pbXBvcnQgdGVybmFyeSBmcm9tIFwiLi90ZXJuYXJ5QnVpbGRlclwiO1xuXG5cbmNvbnN0IHRlcm5hcnlMaXN0bmVycyA9IHtcblxuICAgIHNhdmVFbnRyeSgpe1xuICAgICAgICAgICAgXG4gICAgICAgIC8vISEhISEhISEhISEgQnJpbmcgaW4gdGhlIG5hbWUgb2YgdGhlIGNpdHkgaWQgaXQgd2lsbCBnbyBpbiBwbGFjZWlkOiBzYXZlSUQuaWQhISEhIVxuXG4gICAgICAgICAgICBjb25zdCBzYXZlSUQgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGxvY05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVJbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxvY0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uSW5wdXRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBsb2NDb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3N0SW5wdXRcIikudmFsdWU7ICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGNvbnN0IGludE9iamVjdFBvc3QgPSB7XG4gICAgICAgICAgICAgICAgXCJkYXRhU2V0XCI6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgXCJmZXRjaFR5cGVcIjogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhQmFzZU9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicGxhY2VJZFwiOiBzYXZlSUQsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBsb2NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGxvY0Rlc2MsXG4gICAgICAgICAgICAgICAgICAgIFwiY29zdFwiOiBsb2NDb3N0LFxuICAgICAgICAgICAgICAgICAgICBcInJldmlld1wiOiBcIlwiIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGludE9iamVjdFBvc3QpXG4gICAgICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YShpbnRPYmplY3RQb3N0KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgZGVsZXRlRW50cnkoKSB7XG4gICAgICAgICAgICAvL1RvIGRlbGV0ZSBmcm9tIHNhdmVkIG5ld3MgYXJ0aWNsZXMuXG5cbiAgICAgICAgY29uc3QgZGVsZXRlSUQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcbiAgICAgICAgY29uc29sZS5sb2coZGVsZXRlSUQpO1xuICAgICAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVJZDogZGVsZXRlSUQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwiaW50ZXJlc3RzXCIsXG4gICAgICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJERUxFVEVcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRlcm5hcnkuY3JlYXRlSW5wdXRGaWVsZHMoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgZWRpdEVudHJ5KCl7XG5cbiAgICAgICAgY29uc3QgZWRpdElEID0gZXZlbnQudGFyZ2V0LmlkO1xuICAgICAgICBjb25zb2xlLmxvZyhlZGl0SUQpO1xuXG5cbiAgICB9LFxuXG4gICAgZGlzcGxheUNob2ljZSgpe1xuICAgICAgICAvLyB0aGUgaXRlbSB0aGV5IGNob3NlIHdpbGwgYnJpbmcgZG93biBhbmQgYWRkIGRlbGV0ZSBidXR0b25zLlxuICAgICAgICBjb25zdCBjaG9pY2VCdXR0b24gPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUuc3BsaXQoXCItLVwiKVsxXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNob2ljZUJ1dHRvbik7XG5cbiAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgZGF0YVNldDogXCJwbGFjZXNcIixcbiAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxuICAgICAgICAgICAgZW1iZWRJdGVtOiBcIj9fZW1iZWQ9aW50ZXJlc3RzXCJcbiAgICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZUludGVyZXN0cyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZUludGVyZXN0cyk7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGNpdHlzID0+IHtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNpdHlzLmlkLCBjaG9pY2VCdXR0b24pIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY2hvaWNlQnV0dG9uID09PSBjaXR5cy5pZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkKFwiI291dHB1dFwiKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRlcm5hcnkuZGlzcGxheVRlcm5hcnkoY2hvaWNlQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB0ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7XG5cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgICBcblxufVxuXG5leHBvcnQgZGVmYXVsdCB0ZXJuYXJ5TGlzdG5lcnMiLCJpbXBvcnQgdGVybmFyeSBmcm9tIFwiLi90ZXJuYXJ5QnVpbGRlclwiO1xuXG50ZXJuYXJ5LndlbGNvbWUoKTtcbi8vdGVybmFyeS5kaXNwbGF5VGVybmFyeSgpO1xuLy90ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7IiwiaW1wb3J0IGRhdGFDYWxscyBmcm9tIFwiLi9EYXRhXCJcbmltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIlxuaW1wb3J0IHRlcm5hcnlMaXN0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJcIlxuXG5cbi8vIGRvbWJ1aWxkZXIgcmVmZXJlbmNlIFxuXG4vLyBlbGVtZW50VHlwZTogXCJcIixcbi8vIGNvbnRlbnQ6XCJcIixcbi8vIGNzc0NsYXNzOlwiXCIsXG4vLyBhdHRyaWJ1dGVzOiB7XG4vLyAgICAgaWQ6XCJcIlxuLy8gICAgIGV0Yy4uLi4uXG4vLyB9XG5cbi8vIGxldCBjdXJyZW50QXJ0aWNsZXNEaXYgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICAvLyAgICAgZWxlbWVudFR5cGUgOiBcImRpdlwiLFxuICAgICAgICAvLyAgICAgY3NzQ2xhc3MgOiBcImN1cnJlbnRBcnRpY2xlc0RpdlwiLFxuICAgICAgICAvLyAgICAgYXR0cmlidXRlcyA6IHtcbiAgICAgICAgLy8gICAgICAgICBpZCA6IFwiY3VycmVudEFydGljbGVzRGl2XCJcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcblxuXG5jb25zdCB0ZXJuYXJ5ID0ge1xuXG4gICAgd2VsY29tZSgpe1xuXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3V0cHV0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhvdXRwdXQpXG4gICAgICAgIGxldCB3ZWxjb21lQ29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsY3NzQ2xhc3M6XCJ3ZWxjb21lQ29udGFpbmVyXCJ9KTtcbiAgICAgICAgY29uc29sZS5sb2cod2VsY29tZUNvbnRhaW5lcik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZCh3ZWxjb21lQ29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB3ZWxjb21lSGVhZGVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTogXCJoMVwiLCBjc3NDbGFzczogXCJoMUhlYWRlclwiLGNvbnRlbnQ6XCJXZWxjb21lIGFuZCBwbGVhc2UgY2hvb3NlIGZyb20gdGhlIGZvbGxvd2luZyBvcHRpb25zLlwiIH0pXG4gICAgICAgIGxldCBkcm9wRG93bkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiZm9ybVwiLCBjc3NDbGFzczpcImRyb3BEb3duTWFpbkNvbnRhaW5lclwifSk7XG4gICAgICAgIGxldCBkcm9wRG93bkNvbnRlbnRDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcInNlbGVjdFwiLCBjc3NDbGFzczpcImRyb3BEb3duQ29udGVudENvbnRhaW5lclwiLCBhdHRyaWJ1dGVzOntpZDpcImRyb3BEb3duXCJ9fSk7XG4gICAgICAgIFxuICAgICAgICB3ZWxjb21lQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWVIZWFkZXIpO1xuICAgICAgICBkcm9wRG93bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgICAgIGxldCBkcm9wRG93bkNvbnRlbnRCbGFuayA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJvcHRpb25cIiwgY3NzQ2xhc3M6IFwiZHJvcERvd25Db250ZW50XCIsIGNvbnRlbnQ6XCJDaG9vc2UgYSBTaGl0dHlcIn0pXG4gICAgICAgIGRyb3BEb3duQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRlbnRCbGFuayk7XG5cbiAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgZGF0YVNldDogXCJwbGFjZXNcIixcbiAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxuICAgICAgICAgICAgZW1iZWRJdGVtOiBcIj9fZW1iZWQ9aW50ZXJlc3RzXCJcbiAgICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZUludGVyZXN0cyA9PiB7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscy5uYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnREZXRhaWxzLmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBkcm9wRG93bkNvbnRlbnQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwib3B0aW9uXCIsIGNzc0NsYXNzOiBcImRyb3BEb3duQ29udGVudFwiLCBjb250ZW50OmAke2ludERldGFpbHMubmFtZX0tLSR7aW50RGV0YWlscy5pZH1gLCBhdHRyaWJ1dGVzOiB7aWQ6YGNpdHktLSR7aW50RGV0YWlscy5pZH1gIH19KVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZHJvcERvd25Db250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3BEb3duQ29udGVudCk7XG4gICAgICAgICAgICB9KSBcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkcm9wRG93bkNvbnRlbnRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0ZXJuYXJ5TGlzdGVuZXJzLmRpc3BsYXlDaG9pY2UpOyAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgd2VsY29tZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wRG93bkNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfSxcblxuXG4gICAgZGlzcGxheVRlcm5hcnkoY2hvc2VuT25lKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coY2hvc2VuT25lKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIik7XG4gICAgICAgLy8gY29uc29sZS5sb2cob3V0cHV0KVxuICAgICAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwibWFpbkNvbnRhaW5lclwiLCBjb250ZW50OlwiTWFpbkJveFwiIH0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKG1haW5Db250YWluZXIpO1xuICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XG4gICAgICAgIGxldCBpbnRlcmVzdENhcmQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImFydGljbGVcIixjc3NDbGFzczpcImludGVyZXN0Q2FyZFwiLCBjb250ZW50OmBgLCBhdHRyaWJ1dGU6eyBpZDogXCJjYXJkXCIgfX0pO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKGludGVyZXN0Q2FyZCk7XG4gICAgXG5cbiAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgZGF0YVNldDogXCJwbGFjZXNcIixcbiAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxuICAgICAgICAgICAgZW1iZWRJdGVtOiBcIj9fZW1iZWQ9aW50ZXJlc3RzXCJcbiAgICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZUludGVyZXN0cyA9PiB7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGNpdHlDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImZpZWxkc2V0XCIsIGNzc0NsYXNzOlwiZmllbGRzZXRzXCIsIGF0dHJpYnV0ZTp7IGlkOmAke2ludERldGFpbHMuaWR9YH0sIHRhYkluZGV4OmAke2ludERldGFpbHMuaWR9YCB9KTtcbiAgICAgICAgICAgICAgICBsZXQgY2l0eUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwibGFiZWxzXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBjaXR5U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiY2l0eXNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9LS0ke2ludERldGFpbHMuaWR9YH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZpc2FMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImxhYmVsc1wiLCBjb250ZW50OlwiRG8geW91IG5lZWQgYSBWaXNhXCJ9KVxuICAgICAgICAgICAgICAgIGxldCB2aXNhU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiY2l0eXNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLnZpc2FfcmVxdWlyZWR9YH0pO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eVNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodmlzYUxhYmVsKTtcbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHZpc2FTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpbnRlcmVzdENhcmQuYXBwZW5kQ2hpbGQoY2l0eUNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBsb2NJbnRlcmVzdHMgPSBpbnREZXRhaWxzLmludGVyZXN0cztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY0ludGVyZXN0cyk7XG4gICAgICAgICAgICBsb2NJbnRlcmVzdHMuZm9yRWFjaChsb2NJRGV0YWlscyA9PntcblxuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJhcnRpY2xlXCIsIGNzc0NsYXNzOlwibG9jYXRpb25BcnRpY2xlXCIsIGF0dHJpYnV0ZTp7IGlkOmAke2ludERldGFpbHMuaWR9YH19KTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2NOYW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnRMYWJlbHNcIiwgY29udGVudDpcIiBMb2NhdGlvbiBOYW1lIFwifSlcbiAgICAgICAgICAgICAgICBsZXQgbG9jTmFtZVNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7bG9jSURldGFpbHMubmFtZX1gfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG9jRGVzY0xhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW50TGFiZWxzXCIsIGNvbnRlbnQ6XCIgTG9jYXRpb24gRGVzY3JpcHRpb24gXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NEZXNjU2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtsb2NJRGV0YWlscy5kZXNjcmlwdGlvbn1gfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGxvY0Nvc3RMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIENvc3QgXCJ9KVxuICAgICAgICAgICAgICAgIGxldCBsb2NDb3N0U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiaW50U2VjdGlvbnNcIiwgY29udGVudDpgJHtsb2NJRGV0YWlscy5jb3N0fWB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2NSZXZMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImludExhYmVsc1wiLCBjb250ZW50OlwiIExvY2F0aW9uIFJldmlldyBcIn0pXG4gICAgICAgICAgICAgICAgbGV0IGxvY1JldlNlY3Rpb24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwic2VjdGlvblwiLCBjc3NDbGFzczpcImludFNlY3Rpb25zXCIsIGNvbnRlbnQ6YCR7bG9jSURldGFpbHMucmV2aWV3fWB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWxMb2NhdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJidXR0b25cIiwgY3NzQ2xhc3M6XCJidXR0b25cIiwgY29udGVudDogXCJEZWxldGUgRW50cnlcIiwgYXR0cmlidXRlczp7IGlkOmBkZWxCdXR0b24tLSR7bG9jSURldGFpbHMuaWR9YH19KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZWxMb2NhdGlvbik7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWRpdExvY2F0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImJ1dHRvblwiLCBjc3NDbGFzczpcImJ1dHRvblwiLCBjb250ZW50OiBcIkVkaXQgRW50cnlcIiwgYXR0cmlidXRlczp7IGlkOmBlZGl0QnV0dG9uLS0ke2xvY0lEZXRhaWxzLmlkfWB9fSk7XG5cblxuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jTmFtZUxhYmVsKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY05hbWVTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvY0Rlc2NMYWJlbCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NEZXNjU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NDb3N0TGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jQ29zdFNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jUmV2TGFiZWwpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uSW50ZXJlc3RDb250YWluZXIuYXBwZW5kQ2hpbGQobG9jUmV2U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25JbnRlcmVzdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0TG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRlbExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlZGl0TG9jYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgZGVsTG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRlcm5hcnlMaXN0ZW5lcnMuZGVsZXRlRW50cnkpO1xuICAgICAgICAgICAgICAgIGVkaXRMb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RlbmVycy5lZGl0RW50cnkpO1xuXG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbkludGVyZXN0Q29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGludGVyZXN0Q2FyZCk7XG4gICAgICAgIFxuICAgIFxuXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICB9LFxuXG4gICAgY3JlYXRlSW5wdXRGaWVsZHMoKXtcblxuICAgICAgICAvL3N0cnVjdHVyZVxuICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcImlucHV0Q29udGFpbmVyXCJ9KVxuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEZpZWxkcyk7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkcyk7XG5cbiAgICAgICAgLy9sYWJlbHMgYW5kIGlucHV0c1xuICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgIGxldCBuYW1lSW5wdXRMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiTmFtZTogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJuYW1lXCJ9fSk7XG4gICAgICAgIGxldCBuYW1lSW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJ0ZXh0XCIsIG5hbWU6XCJuYW1lSW5wdXRcIiwgaWQ6IFwibmFtZUlucHV0XCIgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWVJbnB1dExhYmVsLCBuYW1lSW5wdXQpO1xuICAgICAgICBuYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dExhYmVsKTtcbiAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbklucHV0TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIkRlc2NyaXB0aW9uOiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImRlc2NyaXB0aW9uXCJ9fSk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbklucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwiZGVzY3JpcHRpb25JbnB1dFwiLCBpZDogXCJkZXNjcmlwdGlvbklucHV0XCIgfX0pXG4gICAgICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uSW5wdXRMYWJlbCwgZGVzY3JpcHRpb25JbnB1dCk7XG4gICAgICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXRMYWJlbCk7XG4gICAgICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuXG4gICAgICAgIGxldCBjb3N0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgbGV0IGNvc3RJbnB1dExhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJDb3N0OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImNvc3RcIn19KTtcbiAgICAgICAgbGV0IGNvc3RJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcIm51bWJlclwiLCBuYW1lOlwiY29zdElucHV0XCIsIGlkOiBcImNvc3RJbnB1dFwiIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhjb3N0SW5wdXRMYWJlbCwgY29zdElucHV0KTtcbiAgICAgICAgY29zdENvbnRhaW5lci5hcHBlbmRDaGlsZChjb3N0SW5wdXRMYWJlbCk7XG4gICAgICAgIGNvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY29zdElucHV0KTtcblxuICAgICAgICAvL3RvZ2dsZSBzaG91bGQgZ28gaGVyZS5cbiAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgZGF0YVNldDogXCJwbGFjZXNcIixcbiAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxuICAgICAgICAgICAgZW1iZWRJdGVtOiBcIj9fZW1iZWQ9aW50ZXJlc3RzXCJcbiAgICAgICAgICB9KVxuICAgICAgIFxuICAgICAgICAvL3N2ZSBidHRuXG4gICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOiBcImJ1dHRvblwiLCBjb250ZW50OiBcIlNhdmVcIiwgYXR0cmlidXRlczoge3R5cGU6IFwiYnV0dG9uXCIsIGlkOiBcInNhdmVFdmVudFwifX0pO1xuICAgICAgICBcbiAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGVybmFyeUxpc3RlbmVycy5zYXZlRW50cnkpO1xuXG4gICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKG5hbWVDb250YWluZXIpO1xuICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcik7XG4gICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGNvc3RDb250YWluZXIpO1xuICAgICAgICBpbnB1dEZpZWxkcy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcblxuICAgICAgICByZXR1cm4gaW5wdXRGaWVsZHM7XG5cbiAgICB9LFxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeSJdfQ==
