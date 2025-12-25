const Listing= require("../models/listing");
module.exports.index=async(req,res)=>{
            const allListings=await Listing.find({});
            res.render("listings/index.ejs",{allListings});
            // console.log(allListings)
            
        };
 
 module.exports.renderNewForm=(req,res)=>{
            res.render("listings/new.ejs");
        };
    
module.exports.renderShowPage= (async(req,res)=>{
            const {id}=req.params;
            const listing=await Listing.findById(id)
            .populate({path :"reviews", populate:{path:"author"}})
            .populate("owner");
              if(!listing){
                req.flash("error","listing your requested for does not exist");
                return res.redirect("/listings");  
            }   
            res.render("listings/show.ejs",{listing});   
         });

module.exports.createListing= (async(req,res)=>{
                let url=req.file.path;
                let filename=req.file.filename;
                const newlisting=new Listing(req.body.listing);
                newlisting.owner=req.user._id;
                newlisting.image={url,filename};
                await newlisting.save();
                req.flash("success","successfully created a new listing");
                res.redirect("/listings");
            });
            
module.exports.renderEditForm= (async(req,res)=>{
                let {id}=req.params;
                let listing=await Listing.findById(id);
                if(!listing){
                req.flash("error","listing your requested for does not exist");
               return res.redirect("/listings");  
            }  
               let oringinalImageurl= listing.image.url;
               oringinalImageurl=oringinalImageurl.replace("/upload/","/upload/h_300,w_250/");

                
                res.render("listings/edit.ejs",{listing,oringinalImageurl});

            });

module.exports.updateListing= (async(req,res)=>{
            //     if(!req.body.listing) {
            //         throw new ExpressError(400,"send valid data for listing");
            // }
                let {id}=req.params;
               let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
               
               
                if(typeof req.file !== "undefined"){
               let url=req.file.path;
                let filename=req.file.filename;
                listing.image={url,filename};
                await listing.save();
                }
                


                req.flash("success","successfully updated a listing");
                res.redirect(`/listings/${id}`);
        
            });
            
module.exports.destroyListing=(async(req,res)=>{
                let {id}=req.params;
                let deletedListing=await Listing.findByIdAndDelete(id);
                console.log(deletedListing);
                req.flash("success","successfully deleted a listing");
                res.redirect("/listings");
            });            