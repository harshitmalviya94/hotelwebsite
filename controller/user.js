const User = require("../models/user");


module.exports.renderSignup=(req,res)=>{
    res.render("user/signup");
};

module.exports.signup =async (req,res,next)=>{
    try{
        let {username,email,password}= req.body;
    const newUser=new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
        return next(err);
    }
     req.flash("success","Welcome to Wonderlust");
    return res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

module.exports.renderLogin=(req,res)=>{
    res.render("user/login");
};

module.exports.login=async (req,res)=>{
        req.flash("success","welcome back to wonderlust");
        
        return res.redirect(res.locals.redirectUrl);

};

module.exports.logout=(req,res,next)=>{
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.flash("success","you have logged out successfully");
        res.redirect("/listings");
      });
};