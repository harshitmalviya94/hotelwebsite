const express= require('express')
const app =express()
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const methodoverride =require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapasync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require('./schema');    
const Review = require('./models/review');
app.use(methodoverride("_method"));



const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);

const validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map(el=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }}

 const validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map(el=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }}       





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




  //home route
 app.get("/",(req,res)=>{
    res.send("it is working");
 });
  //index route
 app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    // console.log(allListings)
    
});
  //new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
 app.get("/listings/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});   
 }));
    
    //create route
    app.post("/listings",validateListing,wrapAsync(async(req,res)=>{ 
    //     if(!req.body.listing) {
    //         throw new ExpressError(400,"send valid data for listing");
    // }
        //let {title,description,image,price,location,country}=req.body;
        let newlisting=new Listing(req.body.listing);
        await newlisting.save();
        res.redirect("/listings");
    }));

    //edit route
    app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let listing=await Listing.findById(id);
        res.render("listings/edit.ejs",{listing});

    }));
    
    //update route
    app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    //     if(!req.body.listing) {
    //         throw new ExpressError(400,"send valid data for listing");
    // }
        let {id}=req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
        res.redirect(`/listings/${id}`);

    }));
    //delete route
    app.delete("/listings/:id",wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let deletedListing=await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
    }));

    
    //reviews
    //post route for reviews
    app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        res.redirect(`/listings/${listing.id}`);
    }));
    
    //post route for deleting reviews
    app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);
    }));
   


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