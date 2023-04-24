import { db } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" //npm install jsonwebtoken
// import { FormCheck } from "react-bootstrap";

export const registerUser = (req, res) => {
  const q = "SELECT * FROM user WHERE email = ? OR username = ?"
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json
    if (data.length) return res.status(409).json("user already exists")


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pw, salt);
    //adding `role`
    const q = "INSERT INTO user (`fname`,`lname`,`username`, `pw`,`email`, `address`, `phone`, `role`) VALUES (?)"
    const values = [
      req.body.fname,
      req.body.lname,
      req.body.username,
      hash,
      req.body.email,
      req.body.address,
      req.body.phone,
      req.body.role //adding `role`
    ]

    db.query(q, [values], (err, data) => {
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
    }).status(200).json("Sahara: User has been logged out.")
    
  };


export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;



  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {

    if (err) return res.status(403).json("Token is not valid!");

    const userId = req.body.username;
    const paramUser = req.params.id;
    const q = "DELETE FROM user WHERE `username` = ?";

    db.query(q, [paramUser], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};


export const testget = (req, res) => {
  console.log("blerp")
    };

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE user SET `fname`=?,`lname`=?,`email`=?,`address`=?,`phone`=? WHERE `username` = ?";

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
      return res.json("User has been updated.");
    });
  });
};

export const updateProfile = (req, res) => {
  const id = req.body.id
  const lname = req.body.lname
  const fname=  req.body.fname
  const email =  req.body.email
  const address =  req.body.address
  const phone =  req.body.phone

  const q = `UPDATE user SET fname = "${fname}", lname = "${lname}", email = "${email}",  address = "${address}", phone = "${phone}" WHERE id = ${id}`

  db.query(q, (error, result)=>{
    if(error) throw error;
    return res.status(200).json({message: " User successfull updated"})
    // res.json({message: " User successfull updated"})
  })  
}

export const getAdmin = ((req, res) =>{
  const q = `SELECT * FROM user WHERE user.role = "admin"`

  db.query(q, [req.query], (error, result) =>{
    if (error) return res.send("hello, i am an error")
    return res.status(200).json(result)
  })
})