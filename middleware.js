const Listing= require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema} = require('./schema'); 


module.exports.isLoggedIn= (req,res,next)=>{
  console.log(req.user)  
if(!req.isAuthenticated()){
                req.session.redirectUrl= req.originalUrl;
                req.flash("error","you must be signed in first");
                return res.redirect("/login");
            }
            next();
        };

module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl;
    } else {
        res.locals.redirectUrl="/listings";
    }
    next();
};

module.exports.setCurrentUser= (req,res,next)=>{
    if(req.user){
        res.locals.currUser=req.user;
    }
    next();
};

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you do not have owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map(el=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }}

module.exports.validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map(el=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }}   
           
module.exports.isReviewAuthor= async (req,res,next)=>{
    const {reviewId ,id}=req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","you do not have permission to delete this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

    