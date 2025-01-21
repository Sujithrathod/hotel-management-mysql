const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const {faker} = require("@faker-js/faker");
const methodOverride = require("method-override");
app.use(express.json());

let id = ()=>{
    return {
        id:faker.string.uuid()
    };
};

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"project1",
    password:"sujith_18@"
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// let sqlschema = "create table info(title varchar(50) primary key,description varchar(500),image varchar(5000), price int,location varchar(50), country varchar(50))";
// try{
//     connection.query(sqlschema,(err,res)=>{
//         if(err) throw err;
//         console.log("success");
//     })
// }catch(err){
//     console.log("error in sqlschema");
// };

// let loginschema = "create table loginfo(username varchar(100), password varchar(100))";
// try{
//     connection.query(loginschema,(err,res)=>{
//         if (err) throw err;
//         console.log("loginfo schema created");
//     })
// }catch(err){
//     console.log("loginfo error");
// };

    // let clinetschema = "create table client(id varchar(100) primary key,name varchar(50),date DATE, age int,title varchar(50),FOREIGN KEY (title) REFERENCES info(title))";
    // try{
    //     connection.query(clinetschema,(err,result)=>{
    //         if (err) throw err;
    //         console.log("schema created");
    //     })
    // }catch(err){
    //     console.log("error in creating schema");
    // };

// let reviewschmea = "create table review(review_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(50),title VARCHAR(50),rating INT CHECK (rating BETWEEN 1 AND 5),comment VARCHAR(500),FOREIGN KEY (title) REFERENCES info(title))";
// try{
//     connection.query(reviewschmea,(err,result)=>{
//         if (err) throw err;
//         console.log("schema created");
//     })
// }catch(err){
//     console.log("error in creating schema");
// };

const port = process.env.PORT || 3000;;

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});

app.get("/",async(req,res)=>{
    res.render("./listings/home.ejs");
});

app.get("/listings",async(req,res)=>{
    try{
        connection.query("select * from info",(err,results)=>{
            if (err) throw err;
            res.render("./listings/index.ejs",{allListings : results});
        })
    }catch(err){
        console.log("some error in index.ejs check")
    }
});

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

app.get("/listings/:title",async(req,res)=>{
    const {title} = req.params;
    console.log(title);
    try{
        connection.query(`select * from info where title = "${title}"`,(err,results)=>{
            if (err) throw err;
            res.render("./listings/show.ejs",{result : results[0]});
        })
    }catch(err){
        console.log("error in getting data");
    }
});

app.put("/listings/:title",async(req,res)=>{
    let {title} = req.params;
    let {title:ntitle,description:ndescription,image:nimage,price:nprice,location:nlocation,country:ncountry} = req.body;
    const params = [ntitle, ndescription, nimage, nprice, nlocation, ncountry, title];
    try{
        connection.query(`UPDATE info SET title = ?,description = ?,image = ?,price = ? ,location = ? ,country = ? WHERE title = ?`,params,(err,result)=>{
            if (err) throw err;
            console.log("got updated");
            res.redirect("/listings");
        })
    }catch(err){
        console.log("error in update")
    }
});


app.delete("/listings/:title",async(req,res)=>{
    let {title} = req.params;
    try{
        connection.query("delete from info where title = ?",title,(err,result)=>{
            if (err) throw err;
            console.log("delete is completed");
            res.redirect("/listings");
        })
    }catch(err){
        console.log("error in delete");
    }
});

app.post("/listings",async(req,res)=>{
    let{title:ntitle,description:ndescription,price:nprice,location:nlocation,country:ncountry,image:nimage} = req.body; //changed here
    const data = [ntitle,ndescription,nimage,nprice,nlocation,ncountry];
    try{
        connection.query("insert into info (title,description,image, price,location,country) values (?,?,?,?,?,?)",data,(err,result)=>{
            if (err) throw err;
            console.log("insert is done");
            res.redirect("/listings");
        })
    }catch(err){
        console.log("error in insert");
    }
});

app.get("/listings/:title/edit",async(req,res)=>{
    const {title} = req.params;
    try{
        connection.query(`select * from info where title = "${title}"`,(err,result)=>{
            if (err) throw err;
            console.log("edit is updated");
            res.render("./listings/edit.ejs",{result : result[0]});
        })
    }catch(err){
        console.log("update error");
    }
});

app.post("/",async(req,res)=>{
    let{username,password} = req.body;
    let data = [username,password];
    try{
        connection.query("insert into loginfo (username,password) values (?,?)",data,(err,result)=>{
            if (err) throw err;
            console.log("loginfo is updated");
            res.redirect("/second");
        })
    }catch(err){
        console.log("error in loginfo");
    }
});

app.get("/second",(req,res)=>{
    res.render("./listings/secondpage.ejs");
})

app.get("/client",(req,res)=>{
    try{
        connection.query("select * from info",(err,results)=>{
            if (err) throw err;
            res.render("./listings/client1.ejs",{allListings : results});
        })
    }catch(err){
        console.log("some error in index.ejs check")
    }
});

app.get("/client/:title",async(req,res)=>{
    const {title} = req.params;
    try{
        connection.query(`select * from info where title = "${title}"`,(err,results)=>{
            if (err) throw err;
            res.render("./listings/clientshow.ejs",{result : results[0]});
        })
    }catch(err){
        console.log("error in getting data");
    }
});

app.get("/book/:title",async(req,res)=>{
    const {title} = req.params;
    try{
        connection.query(`select * from info where title = "${title}"`,(err,results)=>{
            if (err) throw err;
            res.render("./listings/book.ejs",{result : results[0]});
        })
    }catch(err){
        console.log("error in getting data");
    }
});


app.post("/book",async(req,res)=>{
    let {name:nname,age:nage,title:ntitle,date:ndate} = req.body;
    let data = [id().id,nname,ndate,nage,ntitle];
    let q = "insert into client(id,name,date,age,title) values (?,?,?,?,?)";
    try{
        connection.query(q,data,(err,result)=>{
            if (err) throw err;
            console.log("inserted");
            res.send("booking successful");
        })
    }catch(err){
        console.log("error in post book");
    }
});

app.get("/bookings",(req,res)=>{
    let q = "select * from client";
    try{
        connection.query(q,(err,results)=>{
            if (err) throw err;
            res.render("./listings/bookings.ejs",{result : results});
        })
    }catch(err){
        console.log("error in bookings");
    }
});

app.delete("/book/:id",(req,res)=>{
    let {id} = req.params;
    try{
        connection.query("DELETE FROM client WHERE id = ?", id,(err,result)=>{
            if (err) throw err;
            console.log("deletion is completed");
            try{
                connection.query("select * from client",(err,resul)=>{
                    res.render("./listings/bookings.ejs",{result : resul})
                })
            }catch(err){
                console.log("error in delete");
            }
        });
    }catch(err){
        console.log("error in deleting");
    }
});

app.get("/bookings/:id",(req,res)=>{
    let {id} = req.params;
    try{
        connection.query("select * from client where id = ?",id,(err,results)=>{
            if (err) throw err;
            res.render("./listings/clientupdate.ejs", {result : results[0]})
            console.log(results);
        })
    }catch(err){
        console.log("error in update");
    }
})

app.put("/book/:id",async(req,res)=>{
    let {id} = req.params;
    let {title:ntitle,name:nname,age:nage,date:ndate} = req.body;
    const params = [nname,nage,ndate,ntitle,id];
    console.log(params);
    try{
        connection.query(`UPDATE client SET name= ?, age= ?,date= ?, title = ? WHERE id = ?`,params,(err,result)=>{
            if (err) throw err;
            console.log("got updated");
            res.redirect("/client");
        })
    }catch(err){
        console.log("error in update")
    }
});

app.get("/review/:title",(req,res)=>{
    let {title} = req.params;
    console.log(title);
    try{
        connection.query("select * from info where title = ?",title,(err,results)=>{
            if (err) throw err;
            res.render("./listings/review.ejs",{res : results[0]})
        })
    }catch(err){
        console.log("error in review");
    }
});

app.post("/review",(req,res)=>{
    let {rating:nrating,name:nname,comment:ncomment,title:ntitle} = req.body;
    let data = [ntitle,nname,nrating,ncomment];
    try{
        connection.query("insert into review(title,name,rating,comment) values (?,?,?,?)",data,(err,result)=>{
            if (err) throw err;
            res.send("Thanks for your valuable time");
        })
    }catch(err){
        console.log("error in review update");
    }
});

app.get("/reviews",(req,res)=>{
    try{
        connection.query("select * from review",(err,results)=>{
            if (err) throw err;
            res.render("./listings/allreview.ejs",{result : results});
        })
    }catch(err){
        console.log("error in getting review");
    }
})