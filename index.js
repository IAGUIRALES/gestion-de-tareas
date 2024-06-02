const express = require("express"); 
const app = express();
const mysql = require("mysql");


app.use(express.json());

/// conexion base de datos mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_gestion_tareas',
    
})

//listar tareas

app.get("/tareas", (req, res)=>{
    db.query("select *from tareas", (err, result)=>{
        if (err){
            console.log(err);
        } 
        else{
            res.send(result);
        }
    });
});

//registrar tareas
app.post("/crear", (req, res) =>{
  const id = req.body.id;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const fecha_vencimiento = req.body.fecha_vencimiento;
  const estado = req.body.estado;
  const usuario_id = req.body.usuario_id;

  db.query("INSERT INTO tareas(id, titulo, descripcion, fecha_vencimiento, estado,usuario_id) VALUES(?, ?, ?, ?,?,?)",[id, titulo, descripcion, fecha_vencimiento, estado, usuario_id], (err, result)=>{

    if (err){
      console.log(err);
  } 
  else{
      res.send(result);
  }
  })
})

//actualiza tareas
app.put("/actualizar", (req, res) =>{
  const id = req.body.id;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const fecha_vencimiento = req.body.fecha_vencimiento;
  const estado = req.body.estado;
  const usuario_id = req.body.usuario_id;

  db.query(
    "UPDATE tareas set titulo=?, descripcion=?, fecha_vencimiento=?, estado=?, usuario_id=? WHERE id=?",
  [id, titulo, descripcion, fecha_vencimiento, estado, usuario_id], 
  (err, result)=>{
if (err){
      console.log(err);
  } 
  else{
      res.send(result);
  }
  })
  })

  //eliminar tareas

app.delete("/borrartarea/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tareas WHERE id = ?", [id], (err, result) => {
    if (err){
      console.log(err);
  } 
  else{
      res.send(result);
  }
  })
})
/// coneccion puerto
app.listen(3001, ()=>{
console.log("conexion puerto 3001");
})

