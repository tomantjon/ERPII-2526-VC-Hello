sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"], (Controller, MessageToast, JSONModel) => {
  "use strict";

  return Controller.extend("be.hogent.hellofiorivc.controller.App", {
    onInit() {
      console.log("Controller Loaded");

      let obj = {
        buttonText: "I changed this value from BTP",
      };

      let customModel = new JSONModel(obj);
      this.getView().setModel(customModel, "custom");
    },
    onPress: function (evt) {
      MessageToast.show(evt.getSource().getId() + " Pressed");
      let cModel = this.getView().getModel("custom");
      let cObj = cModel.getData();
      console.log(cObj);
    },
  });
});
