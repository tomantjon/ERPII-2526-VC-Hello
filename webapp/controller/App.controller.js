sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel", "sap/ui/core/Messaging", "sap/m/MessageBox"], (Controller, MessageToast, JSONModel, Messaging, MessageBox) => {
  "use strict";

  return Controller.extend("be.hogent.hellofiorivc.controller.App", {
    onInit() {
      console.log("Controller Loaded");

      var oView = this.getView(),
        oMM = Messaging;
      // attach handlers for validation errors
      oMM.registerObject(oView.byId("txtName"), true);

      let obj = {
        buttonText: "Validate input",
        name: "",
      };

      let customModel = new JSONModel(obj);
      this.getView().setModel(customModel, "custom");
    },

    _validateInput: function (oInput) {
      var sValueState = "None";
      var bValidationError = false;
      var oBinding = oInput.getBinding("value");

      try {
        oBinding.getType().validateValue(oInput.getValue());
      } catch (oException) {
        sValueState = "Error";
        bValidationError = true;
      }

      oInput.setValueState(sValueState);

      return bValidationError;
    },

    onPress: function (evt) {
      //MessageToast.show(evt.getSource().getId() + " Pressed");

      var oView = this.getView(),
        aInputs = [oView.byId("txtName")],
        bValidationError = false;

      // Check that inputs are not empty.
      // Validation does not happen during data binding as this is only triggered by user actions.
      aInputs.forEach(function (oInput) {
        bValidationError = this._validateInput(oInput) || bValidationError;
      }, this);

      if (!bValidationError) {
        //Get the custom data from the input field
        let customData = this.getView().getModel("custom").getData();

        MessageToast.show("The input is validated. Your form has been submitted. The custom data was: " + customData.name);
      } else {
        MessageBox.alert("A validation error has occurred. Complete your input first.");
      }
    },

    onNameChange: function (oEvent) {
      var oInput = oEvent.getSource();
      this._validateInput(oInput);
    },
  });
});
