import express from "express";
import passport from "passport";
import { getJoin,
         getLogin,
         logout,
         postJoin,
         postLogin,
         githubLogin,
         postGithubLogIn,
         googleLogin,
         postGoogleLogIn,
         getMe, 
         facebookLogin,
         postFacebookLogIn
        } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate('github', { failureRedirect: "/login" }),
    postGithubLogIn
);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
    routes.googleCallback,
    passport.authenticate('google', { failureRedirect: "/login" }),
    postGoogleLogIn
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate('facebook', { failureRedirect: "/login" }),
    postFacebookLogIn
);

globalRouter.get(routes.me, getMe);

export default globalRouter;