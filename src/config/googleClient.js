import { google } from "googleapis";
import config from "./index.js";

const oauth2Client = new google.auth.OAuth2(
    config.googleClientId,
    config.googleClientSecret,
    config.googleRedirectUri
)

const scoopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scoopes,
    include_granted_scopes: true
})

export default {
    authorizationUrl,
    oauth2Client
}