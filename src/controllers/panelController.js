const PanelService = require("../services/panelServices");

class PanelController {
  repository;
  constructor() {
    this.service = new PanelService();
  }

  getPanelsData() {
    this.service.panelsData();
  }
}
new PanelController().getPanelsData();

module.exports = PanelController;
