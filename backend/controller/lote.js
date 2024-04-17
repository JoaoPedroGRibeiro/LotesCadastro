import { db } from "../db.js";

export const getLotes = (_, res) => {
    const q = "SELECT * FROM lotes";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
};

export const addLotes = (req, res) => {
    const q =
      "INSERT INTO lotes(`area`, `quadra`, `numero` ,`endereco`, `disponibilidade`, `proprietario`) VALUES(?)";
  
    const values = [
      req.body.area,
      req.body.quadra,
      req.body.numero,
      req.body.endereco,
      req.body.disponibilidade,
      req.body.proprietario,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Lote cadastrado com sucesso!");
    });
  };
  
  export const updateLotes = (req, res) => {
    const q =
      "UPDATE lotes SET `area` = ?, `quadra` = ?, `numero` = ?, `endereco` = ?, `disponibilidade` = ?, `proprietario` = ? WHERE `id` = ?";
  
    const values = [
      req.body.area,
      req.body.quadra,
      req.body.numero,
      req.body.endereco,
      req.body.disponibilidade,
      req.body.proprietario,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
    
      return res.status(200).json("Lote atualizado com sucesso!");
    });
  };
  
  export const deleteLotes = (req, res) => {
    const q = "DELETE FROM lotes WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Lote deletado com sucesso!");
    });
  };