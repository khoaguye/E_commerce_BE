import { db } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" //npm install jsonwebtoken
// import { FormCheck } from "react-bootstrap";

export const registerUser = (req, res)=>{
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"
    db.query(q,[req.body.email, req.body.username], (err, data)=>{
        if(err) return res.json
        if(data.length) return res.status(409).json("user already exists")

        //hashy the pass
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pw, salt);
        const role = "user"
        const q = "INSERT INTO user(`fname`,`lname`,`username`, `pw`,`email`, `address`, `phone`,`role`) VALUES (?)"
        const values = [
            req.body.fname,
            req.body.lname,
            req.body.username,
            hash,
            req.body.email,
            req.body.address,
            req.body.phone,
            role
        ]

        db.query(q, [values], (err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json("Sahara : USER CREATED")
        })
    })

}

export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");
  
      const checkPassword = bcrypt.compareSync(
        req.body.pw,
        data[0].pw
      );
  
      if (!checkPassword)
        return res.status(400).json("Incorrect password");
  
      const token = jwt.sign({ id: data[0].id, role: data[0].role}, "secretkey", {expiresIn: "59m"});
  
      const { password, ...others } = data[0];
  
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ data: others, token: token });
    });
  };


  export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none",
    }).status(200).json("Sahara : User has been logged out.")
    
  };



// export const deleteUser = (req, res) => {
//   const token = req.cookies.accessToken;
//   // if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q =
//       "DELETE FROM user WHERE `username`=? AND `email` = ?";

//     db.query(q, [req.body.username, req.body.email], (err, data) => {
//       // db.query(q, [req.params.username, userInfo.email], (err, data) => {
//       if (err) return res.status(500).json(err);
//       if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
//       return res.status(403).json("You can delete only your post")
//     });
//   });
// };


  export const deleteUser = (req, res) => {
    const token = req.cookies.accessToken;
    // const user = req.body.username;
    // console.log(user);
    console.log(token);

      if (!token) return res.status(401).json("Not authenticated!");
    
      jwt.verify(token, "secretkey", (err, userInfo) => {
        console.log("userInfo: " + userInfo); //1:42:28
        console.log(err)
        if (err) return res.status(403).json("Token is not valid!");
    
        const postId = req.body.username;
        const q = "DELETE FROM user WHERE `username` = ? AND `id` = ?";
    
        db.query(q, [postId, userInfo.id], (err, data) => {
          console.log(err)
          if (err) return res.status(403).json("You can delete only your post!");
    
          return res.json("Post has been deleted!");
        });
      });
};


export const testget = (req, res) => {
  console.log("blerp")
    // const q = "SELECT * FROM user;"
    // db.query(q, [req.query], (error, results) => {
    //     if (error) return res.send("error on testget")
    //     return res.status(200).json(results)
    };

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  console.log("access token: " + token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    console.log("userInfo: " + userInfo.id);
    console.log("postId: " + postId);
    const q =
      "UPDATE user SET `fname`=?,`lname`=?,`email`=?,`address`=?,`phone`=? WHERE `username` = ?";
//`username`=?,`pw`=?,
const values = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.address,
    req.body.phone
];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      console.log(data.fname);
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const getAdmin = ((req, res) =>{
  const q = `SELECT * FROM user WHERE user.role = "admin"`

  db.query(q, [req.query], (error, result) =>{
    if (error) return res.send("hello, i am an error")
      return res.status(200).json(result)
  })
})