
import axios from "axios";
import { query } from "express";
import { db } from "../db.js";


//   const insertProductData = (products) =>{

//     if (!Array.isArray(products)) {
//       console.log('Products is not an array.');
//       return;
//     }

//     const values= products.map(product => [product.id, product.title, product.description,
//     product.price, product.images[0], product.brand, product.category])

//     const sql = 'INSERT INTO products (id, title, description, price, images, brand, category) VALUE ?'

//     db.query(sql,[values], (error,results) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(`Inserted ${results.affectedRows} rows into products table.`);
//       }
//     })
//   } 

//   export const allProduct = (req, res) => {
//     axios.get('https://dummyjson.com/products?limit=100&skip=0')
//       .then(response => {
//         const products = response.data.products;
       
//         //res.json(products);
//         insertProductData(products)
//       })
//       .catch(error => { 
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//      });

//  }
  db.connect((error) => {
    if (error) {
      console.log('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database.');
      //allProduct()
    }
  });

export const allProduct= (req, res) =>{
  const q = "SELECT * FROM products"
  db.query(q, [req.query], (error, results) =>{
     if (error) return res.send(error)
    return res.status(200).json(results)
  });
}    


export const productContent = (req, res) =>{
  const q = 'SELECT * FROM products ORDER BY RAND() LIMIT 8'
  db.query(q, [req.query], (error, results) =>{
    if(error) return res.send(error)
    return res.status(200).json(results)
  })
}
  //Fetch detail product

export const productDetail= (req, res) =>{
  const id  = req.params.id;
  const q = `SELECT * FROM products WHERE id = ${id}`
  db.query(q,[req.query], (err,data)=>{
    if(err) return res.send (err)
    return res.status(200).json(data)
  })
}
  //Fetch all the category
  export const category = (req, res) => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        const category = response.data;
        res.json(category);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  export const productCategory = (req, res) =>{
      const category = req.params.category;
      const q = `SELECT * FROM products WHERE category = "${category}"`
      db.query(q,[req.query], (err,data) =>{
        if(err) return res.send(err)
        return res.status(200).json(data)
      })
  }
 
  //Fetch the search product



export const addProduct = (req, res) =>{
   const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.images,
    req.body.brand,
    req.body.category,
    req.body.amount
   ]
    // Insert the new product into the database
   const q = "INSERT INTO products (`title`, `description`, `price`, `images`, `brand`, `category`,`amount`) VALUES (?)"
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

export const updateProduct =(req,res) =>{
  const id = req.body.id
  const title = req.body.title
  const description=  req.body.description
  const price=  req.body.price
  const images =  req.body.images
  const brand =  req.body.brand
  const category=  req.body.category
  const amount= req.body.amount
  const q = `UPDATE products SET title = "${title}", description = "${description}", price = "${price}",  images = "${images}", brand = "${brand}", category = "${category}", amount = ${amount}" WHERE id = ${id}`

  db.query(q, (error, results)=>{
    if(error) throw error;
    res.json({message: " Product successfull updated"})
  })        

}

export const deleteProduct =(req,res) =>{
  const id = req.body.id
 
  const q = `DELETE FROM products WHERE id = ${id}`

  db.query(q, (error, results)=>{
    if(error) throw error;
    res.json({message: " Product successfull deleted"})
  })        

}

export const searchProduct = (req, res) =>{

}



