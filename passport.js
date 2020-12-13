import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GithubStrategy from "passport-github";
import GoogleStratege from "passport-google-oauth20";
import User from "./models/User";
import { githubLoginCallback, googleLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
    {
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: process.env.URL+routes.githubCallback
    },
        githubLoginCallback
    )
);

passport.use(
    new GoogleStratege(
    {
        clientID: process.env.GL_ID,
        clientSecret: process.env.GL_SECRET,
        callbackURL: process.env.URL+routes.googleCallback
    },
    googleLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
    {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: process.env.URL+routes.facebookCallback,
                
        profileFields: ["id", "displayName", "photos", "email"],
        scope: ["public_profile", "email"]
    },
        facebookLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());