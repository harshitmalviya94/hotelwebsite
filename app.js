if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express= require('express')
const app =express()
const mongoose = require('mongoose');
const methodoverride =require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");   
const listingsRouter = require('./router/listing');
const reviewsRouter= require('./router/review');
const userRouter =require('./router/user');
app.use(methodoverride("_method"));
const session = require('express-session');
const flash= require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const{isLoggedIn}= require("./middleware");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })





const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);

main()
.then(()=>{
    console.log("connected to DB")

})
.catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

      const sessionoptions={
        secret: "mysupersecretcode",
        resave: false,
        saveUninitialized: true, 
        cookie:{
            expires: Date.now() + 1000*60*60*24*7,
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        } ,
      };
      //home route
    // app.get("/",(req,res)=>{
    //  res.send("it is working");
    //  });

      app.use(session(sessionoptions));
      app.use(flash());

      app.use(passport.initialize());
      app.use(passport.session());
      passport.use(new LocalStrategy(User.authenticate()));

      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());
     
        app.use((req,res,next)=>{
            res.locals.success=req.flash("success");
            res.locals.error=req.flash("error");
            res.locals.currUser=req.user;
            next();
        });

        // app.get("/demouser",async (req,res)=>{
        //   let fakeUser=new User({
        //     email:"Student@gmail.com",
        //     username:"Delta student"
        //   });
        //   let registeredUser= await User.register(fakeUser,"mypassword");
        //   res.send(registeredUser);
        // });

 

       app.use("/",userRouter);
       app.use("/listings",listingsRouter);
       app.use("/listings/:id/reviews",reviewsRouter);
    
    
   


 app.all(/.*/,(req,res,next)=>{
        next(new ExpressError(404,"page not found!"));
    });

  // error handling middleware
    app.use((err,req,res,next)=>{
       let{statusCode=500,message="something went wrong"}=err;
         res.status(statusCode).render("listings/error.ejs",{message});
       //res.status(statusCode).send(message);
    });






    




// app.get("/testlisting",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"Cozy Beachfront Cottage",
//         description:"Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//         image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         price:1500,
//         location:"Malibu",
//         country:"United States"

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucessful testing");
// });

 //all other routes
   



app.listen(8080,()=>{
    console.log("server is listing to port 8080")
});