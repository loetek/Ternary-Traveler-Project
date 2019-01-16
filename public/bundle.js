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
    };
    console.log(intObjectPost);

    _Data.default.connectToData(intObjectPost).then(response => response.json).then(newObj => {
      console.log(newObj);
    });
  },

  deleteEntry() {
    //To delete from saved news articles.
    const deleteID = event.target.id.split("--")[1];

    _Data.default.connectToData({
      deleteId: deleteID,
      dataSet: "newsItems",
      fetchType: "DELETE"
    }).then(() => {//$("").remove();
      //.savedNewsElementsCreator();
    });
  },

  displayChoice() {
    // the item they chose will bring down and add delete buttons.
    const choiceButton = event.target;
    console.log(choiceButton);
  }

};
var _default = ternaryListners;
exports.default = _default;

},{"./Data":1,"./domComponents":2,"./ternaryBuilder":5}],4:[function(require,module,exports){
"use strict";

var _ternaryBuilder = _interopRequireDefault(require("./ternaryBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ternaryBuilder.default.displayTernary();

_ternaryBuilder.default.createInputFields();

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
  displayTernary() {
    const output = document.querySelector("#output");
    console.log(output);

    let mainContainer = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "mainContainer",
      content: "MainBox"
    });

    console.log(mainContainer);
    output.appendChild(mainContainer);

    let interestCard = _domComponents.default.createDomElement({
      elementType: "article",
      cssClass: "interestCard",
      content: ``,
      attribute: {
        id: "card"
      }
    });

    console.log(interestCard);

    _Data.default.connectToData({
      dataSet: "places",
      fetchType: "GET",
      dataBaseObject: "",
      embedItem: "?_embed=interests"
    }).then(responseInterests => {
      responseInterests.forEach(intDetails => {
        console.log(intDetails);

        let cityContainer = _domComponents.default.createDomElement({
          elementType: "fieldset",
          cssClass: "fieldsets"
        });

        let cityLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "cityLabels",
          content: "City"
        });

        let citySection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "citys",
          content: `${intDetails.name}`
        }); //let visaContainer = domComponents.createDomElement({ elementType:"fieldset", cssClass:"fieldsets"})


        let visaLabel = _domComponents.default.createDomElement({
          elementType: "label",
          cssClass: "visaLabels",
          content: "Visa"
        });

        let visaSection = _domComponents.default.createDomElement({
          elementType: "section",
          cssClass: "citys",
          content: `${intDetails.visa_required}`
        });

        let moveDisplayButton = _domComponents.default.createDomElement({
          elementType: "button",
          content: "This One",
          cssClass: "buttons",
          attribute: {
            id: "displayButton"
          }
        });

        cityContainer.appendChild(cityLabel);
        cityContainer.appendChild(citySection);
        cityContainer.appendChild(visaLabel);
        cityContainer.appendChild(visaSection);
        cityContainer.appendChild(moveDisplayButton);
        interestCard.appendChild(cityContainer);
        moveDisplayButton.addEventListener("click", _listener.default.displayChoice); //interestCard.appendChild(visaContainer);

        for (let intGran in intDetails) {
          console.log(intGran.interests);
        }
      });
      mainContainer.appendChild(interestCard);
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

    let nameLabel = _domComponents.default.createDomElement({
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

    console.log(nameLabel, nameInput);
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    let descriptionContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let descriptionLabel = _domComponents.default.createDomElement({
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

    console.log(descriptionLabel, descriptionInput);
    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    let costContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let costLabel = _domComponents.default.createDomElement({
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

    console.log(costLabel, costInput);
    costContainer.appendChild(costLabel);
    costContainer.appendChild(costInput); //toggle should go here.

    let chooseCityContainer = _domComponents.default.createDomElement({
      elementType: "fieldset",
      cssClass: "fieldsets"
    });

    let chooseCityLabel = _domComponents.default.createDomElement({
      elementType: "label",
      cssClass: "inputLabels",
      content: "Cost: ",
      attributes: {
        for: "cost"
      }
    });

    let chooseCityInput = _domComponents.default.createDomElement({
      elementType: "input",
      cssClass: "inputFields",
      attributes: {
        type: "number",
        name: "costInput",
        id: "costInput"
      }
    });

    console.log(costLabel, costInput); //sve bttn

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
  },

  citySelected() {// select which city you want to highlight and edit.
  }

};
var _default = ternary;
exports.default = _default;

},{"./Data":1,"./domComponents":2,"./listener":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2xpc3RlbmVyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy90ZXJuYXJ5QnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0VBLE1BQU0sU0FBUyxHQUFHO0FBRWQsRUFBQSxhQUFhLENBQUMsV0FBRCxFQUFjO0FBRXZCLFFBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUExQjtBQUNBLFFBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUE1QjtBQUNBLFFBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUE1QjtBQUNBLFFBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFqQztBQUNBLFFBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUF4QjtBQUNBLFFBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUEzQjs7QUFFQSxRQUFJLFNBQVMsSUFBSSxLQUFqQixFQUF3QjtBQUN4QixhQUFPLEtBQUssQ0FBRSx5QkFBd0IsT0FBUSxHQUFFLFNBQVUsRUFBOUMsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQLENBRHdCLENBRWU7QUFFdEMsS0FKRCxNQUlPLElBQUksU0FBUyxLQUFLLE1BQWxCLEVBQXlCO0FBRWhDO0FBQ0EsYUFBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsRUFBbEMsRUFBcUM7QUFDN0MsUUFBQSxNQUFNLEVBQUcsR0FBRSxTQUFVLEVBRHdCO0FBQ3JCO0FBQ3hCLFFBQUEsT0FBTyxFQUFFO0FBQ0wsMEJBQWdCLGlDQURYLENBRUw7O0FBRkssU0FGb0M7QUFNN0M7QUFDQSxRQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGNBQWYsQ0FQdUMsQ0FPUDs7QUFQ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LGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLGtCQUFpQixTQUF0RDtBQUVBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLG9CQUF4QjtBQUNBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsYUFBeEI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFVBQXhCO0FBRUEsV0FBTyxXQUFQO0FBRUgsR0FwR1c7O0FBc0daLEVBQUEsWUFBWSxHQUFFLENBQ1Y7QUFHSDs7QUExR1csQ0FBaEI7ZUF1SGUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jb25zdCBkYXRhQ2FsbHMgPSB7XG5cbiAgICBjb25uZWN0VG9EYXRhKGZldGNoT2JqZWN0KSB7XG5cbiAgICAgICAgbGV0IGRhdGFTZXQgPSBmZXRjaE9iamVjdC5kYXRhU2V0O1xuICAgICAgICBsZXQgZW1iZWRJdGVtID0gZmV0Y2hPYmplY3QuZW1iZWRJdGVtO1xuICAgICAgICBsZXQgZmV0Y2hUeXBlID0gZmV0Y2hPYmplY3QuZmV0Y2hUeXBlO1xuICAgICAgICBsZXQgZGF0YUJhc2VPYmplY3QgPSBmZXRjaE9iamVjdC5kYXRhQmFzZU9iamVjdDtcbiAgICAgICAgbGV0IHB1dElkID0gZmV0Y2hPYmplY3QucHV0SWQ7XG4gICAgICAgIGxldCBkZWxldGVJZCA9IGZldGNoT2JqZWN0LmRlbGV0ZUlkO1xuXG4gICAgICAgIGlmIChmZXRjaFR5cGUgPT0gXCJHRVRcIikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9JHtlbWJlZEl0ZW19YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cblxuICAgICAgICB9IGVsc2UgaWYgKGZldGNoVHlwZSA9PT0gXCJQT1NUXCIpe1xuXG4gICAgICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RhdGFTZXR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBgJHtmZXRjaFR5cGV9YCwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhQmFzZU9iamVjdCksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2UgaWYoZmV0Y2hUeXBlID09PSBcIlBVVFwiKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYXRhU2V0fS8ke3B1dElkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogYCR7ZmV0Y2hUeXBlfWAsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGFCYXNlT2JqZWN0KSwvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXG4gICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZmV0Y2hUeXBlID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGF0YVNldH0vJHtkZWxldGVJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGAke2ZldGNoVHlwZX1gLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gbm8tcmVmZXJyZXIsICpjbGllbnRcbiAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIChcIllPVSBTQ1JFV0VEIElUIFVQXCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFDYWxscyIsIlxuXG5cblxuY29uc3QgZG9tQ29tcG9uZW50cyA9IHtcbiAgICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcywgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsImltcG9ydCBkYXRhQ2FsbHMgZnJvbSBcIi4vRGF0YVwiXG5pbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCJcbmltcG9ydCB0ZXJuYXJ5IGZyb20gXCIuL3Rlcm5hcnlCdWlsZGVyXCI7XG5cblxuY29uc3QgdGVybmFyeUxpc3RuZXJzID0ge1xuXG4gICAgc2F2ZUVudHJ5KCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHNhdmVJRCA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICAgICAgY29uc3QgbG9jTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZUlucHV0XCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbG9jRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25JbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxvY0Nvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nvc3RJbnB1dFwiKS52YWx1ZTsgICAgICAgICAgICBcblxuICAgICAgICAgICAgY29uc3QgaW50T2JqZWN0UG9zdCA9IHtcbiAgICAgICAgICAgICAgICBcImRhdGFTZXRcIjogXCJpbnRlcmVzdHNcIixcbiAgICAgICAgICAgICAgICBcImZldGNoVHlwZVwiOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBcImRhdGFCYXNlT2JqZWN0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwbGFjZUlkXCI6IDMsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBsb2NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGxvY0Rlc2MsXG4gICAgICAgICAgICAgICAgICAgIFwiY29zdFwiOiBsb2NDb3N0LFxuICAgICAgICAgICAgICAgICAgICBcInJldmlld1wiOiBcIlwiIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGludE9iamVjdFBvc3QpXG4gICAgICAgICAgICBkYXRhQ2FsbHMuY29ubmVjdFRvRGF0YShpbnRPYmplY3RQb3N0KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24pXG4gICAgICAgICAgICAgICAgLnRoZW4obmV3T2JqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3T2JqKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgZGVsZXRlRW50cnkoKSB7XG4gICAgICAgICAgICAvL1RvIGRlbGV0ZSBmcm9tIHNhdmVkIG5ld3MgYXJ0aWNsZXMuXG4gICAgICAgICAgICBjb25zdCBkZWxldGVJRCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xuICAgICAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVJZDogZGVsZXRlSUQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTZXQ6IFwibmV3c0l0ZW1zXCIsXG4gICAgICAgICAgICAgICAgICAgIGZldGNoVHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vJChcIlwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8uc2F2ZWROZXdzRWxlbWVudHNDcmVhdG9yKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgIGRpc3BsYXlDaG9pY2UoKXtcbiAgICAgICAgLy8gdGhlIGl0ZW0gdGhleSBjaG9zZSB3aWxsIGJyaW5nIGRvd24gYW5kIGFkZCBkZWxldGUgYnV0dG9ucy5cbiAgICAgICAgY29uc3QgY2hvaWNlQnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zb2xlLmxvZyhjaG9pY2VCdXR0b24pOyAgXG5cbiAgICB9XG4gICAgXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeUxpc3RuZXJzIiwiaW1wb3J0IHRlcm5hcnkgZnJvbSBcIi4vdGVybmFyeUJ1aWxkZXJcIjtcblxuXG50ZXJuYXJ5LmRpc3BsYXlUZXJuYXJ5KCk7XG50ZXJuYXJ5LmNyZWF0ZUlucHV0RmllbGRzKCk7IiwiaW1wb3J0IGRhdGFDYWxscyBmcm9tIFwiLi9EYXRhXCJcbmltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIlxuaW1wb3J0IHRlcm5hcnlMaXN0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJcIlxuXG5cbi8vIGRvbWJ1aWxkZXIgcmVmZXJlbmNlIFxuXG4vLyBlbGVtZW50VHlwZTogXCJcIixcbi8vIGNvbnRlbnQ6XCJcIixcbi8vIGNzc0NsYXNzOlwiXCIsXG4vLyBhdHRyaWJ1dGVzOiB7XG4vLyAgICAgaWQ6XCJcIlxuLy8gICAgIGV0Yy4uLi4uXG4vLyB9XG5cbi8vIGxldCBjdXJyZW50QXJ0aWNsZXNEaXYgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICAvLyAgICAgZWxlbWVudFR5cGUgOiBcImRpdlwiLFxuICAgICAgICAvLyAgICAgY3NzQ2xhc3MgOiBcImN1cnJlbnRBcnRpY2xlc0RpdlwiLFxuICAgICAgICAvLyAgICAgYXR0cmlidXRlcyA6IHtcbiAgICAgICAgLy8gICAgICAgICBpZCA6IFwiY3VycmVudEFydGljbGVzRGl2XCJcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcblxuXG5jb25zdCB0ZXJuYXJ5ID0ge1xuXG4gICAgZGlzcGxheVRlcm5hcnkoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKG91dHB1dClcbiAgICAgICAgbGV0IG1haW5Db250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcIm1haW5Db250YWluZXJcIiwgY29udGVudDpcIk1haW5Cb3hcIiB9KTtcbiAgICAgICAgY29uc29sZS5sb2cobWFpbkNvbnRhaW5lcik7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IGludGVyZXN0Q2FyZCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLGNzc0NsYXNzOlwiaW50ZXJlc3RDYXJkXCIsIGNvbnRlbnQ6YGAsIGF0dHJpYnV0ZTp7IGlkOiBcImNhcmRcIiB9fSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGludGVyZXN0Q2FyZCk7XG4gICAgXG5cbiAgICAgICAgZGF0YUNhbGxzLmNvbm5lY3RUb0RhdGEoe1xuICAgICAgICAgICAgZGF0YVNldDogXCJwbGFjZXNcIixcbiAgICAgICAgICAgIGZldGNoVHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFCYXNlT2JqZWN0OiBcIlwiLFxuICAgICAgICAgICAgZW1iZWRJdGVtOiBcIj9fZW1iZWQ9aW50ZXJlc3RzXCJcbiAgICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZUludGVyZXN0cyA9PiB7XG4gICAgICAgICAgICByZXNwb25zZUludGVyZXN0cy5mb3JFYWNoKGludERldGFpbHMgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW50RGV0YWlscyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2l0eUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pO1xuICAgICAgICAgICAgICAgIGxldCBjaXR5TGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe2VsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJjaXR5TGFiZWxzXCIsIGNvbnRlbnQ6XCJDaXR5XCJ9KVxuICAgICAgICAgICAgICAgIGxldCBjaXR5U2VjdGlvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJzZWN0aW9uXCIsIGNzc0NsYXNzOlwiY2l0eXNcIiwgY29udGVudDpgJHtpbnREZXRhaWxzLm5hbWV9YH0pO1xuXG4gICAgICAgICAgICAgICAgLy9sZXQgdmlzYUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgICAgICAgICAgbGV0IHZpc2FMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcInZpc2FMYWJlbHNcIiwgY29udGVudDpcIlZpc2FcIn0pXG4gICAgICAgICAgICAgICAgbGV0IHZpc2FTZWN0aW9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcInNlY3Rpb25cIiwgY3NzQ2xhc3M6XCJjaXR5c1wiLCBjb250ZW50OmAke2ludERldGFpbHMudmlzYV9yZXF1aXJlZH1gfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVEaXNwbGF5QnV0dG9uID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtlbGVtZW50VHlwZTpcImJ1dHRvblwiLGNvbnRlbnQ6XCJUaGlzIE9uZVwiLCBjc3NDbGFzczpcImJ1dHRvbnNcIiwgYXR0cmlidXRlOnsgaWQ6XCJkaXNwbGF5QnV0dG9uXCJ9fSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHlMYWJlbCk7XG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5U2VjdGlvbik7XG4gICAgICAgICAgICAgICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aXNhTGFiZWwpO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodmlzYVNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQobW92ZURpc3BsYXlCdXR0b24pO1xuICAgICAgICAgICAgICAgIGludGVyZXN0Q2FyZC5hcHBlbmRDaGlsZChjaXR5Q29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIG1vdmVEaXNwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdGVuZXJzLmRpc3BsYXlDaG9pY2UpO1xuICAgICAgICAgICAgICAgIC8vaW50ZXJlc3RDYXJkLmFwcGVuZENoaWxkKHZpc2FDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaW50R3JhbiBpbiBpbnREZXRhaWxzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnRHcmFuLmludGVyZXN0cyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnRlcmVzdENhcmQpO1xuICAgICAgICB9KVxuXG4gICAgICBcbiAgICB9LFxuXG4gICAgY3JlYXRlSW5wdXRGaWVsZHMoKXtcblxuICAgICAgICAvL3N0cnVjdHVyZVxuICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImFydGljbGVcIixjc3NDbGFzczpcImlucHV0Q29udGFpbmVyXCJ9KVxuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEZpZWxkcyk7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkcyk7XG5cbiAgICAgICAgLy9sYWJlbHMgYW5kIGlucHV0c1xuICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgIGxldCBuYW1lTGFiZWwgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImxhYmVsXCIsIGNzc0NsYXNzOlwiaW5wdXRMYWJlbHNcIiwgY29udGVudDpcIk5hbWU6IFwiLCBhdHRyaWJ1dGVzOnsgZm9yOlwibmFtZVwifX0pO1xuICAgICAgICBsZXQgbmFtZUlucHV0ID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJpbnB1dFwiLCBjc3NDbGFzczpcImlucHV0RmllbGRzXCIsIGF0dHJpYnV0ZXM6eyB0eXBlOlwidGV4dFwiLCBuYW1lOlwibmFtZUlucHV0XCIsIGlkOiBcIm5hbWVJbnB1dFwiIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lTGFiZWwsIG5hbWVJbnB1dCk7XG4gICAgICAgIG5hbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICAgICAgbmFtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiZmllbGRzZXRcIiwgY3NzQ2xhc3M6XCJmaWVsZHNldHNcIn0pXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJEZXNjcmlwdGlvbjogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJkZXNjcmlwdGlvblwifX0pO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25JbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcInRleHRcIiwgbmFtZTpcImRlc2NyaXB0aW9uSW5wdXRcIiwgaWQ6IFwiZGVzY3JpcHRpb25JbnB1dFwiIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbkxhYmVsLCBkZXNjcmlwdGlvbklucHV0KTtcbiAgICAgICAgZGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XG4gICAgICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuXG4gICAgICAgIGxldCBjb3N0Q29udGFpbmVyID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJmaWVsZHNldFwiLCBjc3NDbGFzczpcImZpZWxkc2V0c1wifSlcbiAgICAgICAgbGV0IGNvc3RMYWJlbCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwibGFiZWxcIiwgY3NzQ2xhc3M6XCJpbnB1dExhYmVsc1wiLCBjb250ZW50OlwiQ29zdDogXCIsIGF0dHJpYnV0ZXM6eyBmb3I6XCJjb3N0XCJ9fSk7XG4gICAgICAgIGxldCBjb3N0SW5wdXQgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImlucHV0XCIsIGNzc0NsYXNzOlwiaW5wdXRGaWVsZHNcIiwgYXR0cmlidXRlczp7IHR5cGU6XCJudW1iZXJcIiwgbmFtZTpcImNvc3RJbnB1dFwiLCBpZDogXCJjb3N0SW5wdXRcIiB9fSlcbiAgICAgICAgY29uc29sZS5sb2coY29zdExhYmVsLCBjb3N0SW5wdXQpO1xuICAgICAgICBjb3N0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvc3RMYWJlbCk7XG4gICAgICAgIGNvc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY29zdElucHV0KTtcblxuICAgICAgICAvL3RvZ2dsZSBzaG91bGQgZ28gaGVyZS5cbiAgICAgICAgbGV0IGNob29zZUNpdHlDb250YWluZXIgPSBkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZTpcImZpZWxkc2V0XCIsIGNzc0NsYXNzOlwiZmllbGRzZXRzXCJ9KVxuICAgICAgICBsZXQgY2hvb3NlQ2l0eUxhYmVsID0gZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGU6XCJsYWJlbFwiLCBjc3NDbGFzczpcImlucHV0TGFiZWxzXCIsIGNvbnRlbnQ6XCJDb3N0OiBcIiwgYXR0cmlidXRlczp7IGZvcjpcImNvc3RcIn19KTtcbiAgICAgICAgbGV0IGNob29zZUNpdHlJbnB1dCA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlOlwiaW5wdXRcIiwgY3NzQ2xhc3M6XCJpbnB1dEZpZWxkc1wiLCBhdHRyaWJ1dGVzOnsgdHlwZTpcIm51bWJlclwiLCBuYW1lOlwiY29zdElucHV0XCIsIGlkOiBcImNvc3RJbnB1dFwiIH19KVxuICAgICAgICBjb25zb2xlLmxvZyhjb3N0TGFiZWwsIGNvc3RJbnB1dCk7XG4gICAgICAgIC8vc3ZlIGJ0dG5cbiAgICAgICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7ZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsIGNvbnRlbnQ6IFwiU2F2ZVwiLCBhdHRyaWJ1dGVzOiB7dHlwZTogXCJidXR0b25cIiwgaWQ6IFwic2F2ZUV2ZW50XCJ9fSk7XG4gICAgICAgIFxuICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0ZXJuYXJ5TGlzdGVuZXJzLnNhdmVFbnRyeSk7XG5cbiAgICAgICAgaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQobmFtZUNvbnRhaW5lcik7XG4gICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKTtcbiAgICAgICAgaW5wdXRGaWVsZHMuYXBwZW5kQ2hpbGQoY29zdENvbnRhaW5lcik7XG4gICAgICAgIGlucHV0RmllbGRzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuXG4gICAgICAgIHJldHVybiBpbnB1dEZpZWxkcztcblxuICAgIH0sXG5cbiAgICBjaXR5U2VsZWN0ZWQoKXtcbiAgICAgICAgLy8gc2VsZWN0IHdoaWNoIGNpdHkgeW91IHdhbnQgdG8gaGlnaGxpZ2h0IGFuZCBlZGl0LlxuXG5cbiAgICB9XG5cblxuXG5cblxuXG5cblxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybmFyeSJdfQ==
