const MySql = require("../config/mysql");

class PanelRepository {
  db;

  constructor() {
    this.db = new MySql().getConnection();
  }

  getPanels() {
    const query = `SELECT panels.id as id, panels.script, tns.titulo, tns.ip, tns.status FROM db_gvista.configuracao_painel panels
                  inner join clientes_tns as tns
                    on panels.id_cliente = tns.id`;

    return new Promise((resolve, reject) => {
      this.db.query(query, [], function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve({ data: results, fields });
      });
    });
  }

  getDirectories() {
    const query = `SELECT * FROM db_gvista.configuracao_painel panels
                  inner join clientes_tns as tns
                    on panels.id_cliente = tns.id
                  group by tns.titulo`;

    return new Promise((resolve, reject) => {
      this.db.query(query, [], function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve({ data: results, fields });
      });
    });
  }
}

module.exports = PanelRepository;
