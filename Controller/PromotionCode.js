
import { db } from "../db.js";



//modify -PUT
export const updatePromo =(req,res) =>{
    const id = req.body.id
    const code = req.body.code
    const category=  req.body.category
    const price_off=  req.body.price_off
    const q = `UPDATE promotions SET code = "${code}", category = "${category}", price_off = "${price_off}"  WHERE id = ${id}`
   
    db.query(q, (error, results)=>{
      if(error) throw error;
      res.json({message: " Product successfull updated"})
    })
   }

//create -POST
export const addPromo = (req, res) =>{
    const values = [
     req.body.code,
     req.body.category,
     req.body.price_off
    ]
     // Insert the new product into the database
    const q = "INSERT INTO promotions (`code`, `category`, `price_off`) VALUES (?)"
    db.query(
      q, [values], (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to add product' });
        } else {
          // Retrieve the ID of the newly inserted product
          const id = result.insertId;
          // Return the ID of the new product to the client
          res.status(201).json({ id });
        }
      }
    );
  };

//delete -DELETE
export const deletePromotion = (req, res) => {
    const id = req.body.id
    const q = `DELETE FROM promotions WHERE id = ${id}`

    db.query(q, (error, results) => {
        if (error) throw error;
        res.json({ message: " Product successfull deleted" })
    })
}

//get all -GET
export const allPromotions = (req, res) => {
  const q = "SELECT * FROM promotions;"
  db.query(q, [req.query], (error, results) => {
      if (error) return res.send("hello, i am an error")
      return res.status(200).json(results)
  })
}

//get single code row - GET
export const getOneCode = (req, res) => {
  const codeName = req.body.code
  const q = `SELECT * FROM promotions WHERE code = "${codeName}"`

  db.query(q, [req.query], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results)
})
}

export const getCodeByCategory = (req, res) => {
  const category = req.body.category
  const q = `SELECT * FROM promotions WHERE category = "${category}"`
  db.query(q, [req.query], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results)
})
}


  







  
