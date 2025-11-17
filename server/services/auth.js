import { prisma } from "../configs/db.js";
import { hashPassword } from "../utils/auth.js";
import { getAuthedGoogleClient } from '../utils/auth.js';
import { google } from 'googleapis';
import { AppError } from "../errors/AppError.js";

export const AuthService = {
    async getSocialLoginOptions(email){
        const options = [];
        try {
            const user = await prisma.user.findUnique({
                where: {email}
            });
            const {federated_idps } = user;
            if (Array.isArray(federated_idps)) {
                for (const item of federated_idps) {
                    options.push(item.name);
                }
            }
            return options;
        } catch(e) {
            console.log(e)
            return options;
        }
    },

    async getUserPasskey(userId, credId) {
        try {
            return await prisma.passkey.findFirst({
                where: {
                    userId,
                    id:credId,
                }
            })
        } catch(e) {
            console.log(e)
            throw e
        }

    },

    async savePasskeyCounter(id, counter) {
        try{
            return await prisma.passkey.update({
                where: {id},
                data: {
                    counter
                }
            })
        }catch(e) {
            console.log(e)
            throw e
        }
    },

    async register(userData, options = {}) {
        const {
            assigned_implementers,
            ...userProperties
        } = userData;

        const { family_name, given_name } = userProperties;

        const { roleId, inviteCode } = options;

        try {

            const newUser = await prisma.$transaction(async (tx) => {
                //create the user
                const user = await tx.user.create({
                    data: {
                        ...userProperties,
                        display_name: `${given_name} ${family_name}`,
                        assigned_implementers: {
                            connect: assigned_implementers.map(num => ({id: num}))
                        }
                    }
                });

                // Assign the role (explicit m-n join table)
                await tx.userRole.create({
                    data: {
                        user:{connect: {id: user.id}},
                        role: {connect: {id: roleId}}
                    }
                });

                return user;
            });

            return await this.findUserForSignIn(newUser.id);

        } catch (error) {
            //provide invite code on error obj so server can redirect to proper
            //register page from google oauth callback
            error.data = {inviteCode}
            throw error
        }
    },

    async findExistingUserPasskeys(userId) {
        try {
            return await prisma.passkey.findMany({
                where: {
                    userId
                }
            })
        } catch(e) {
            console.log(e)
            return []
        }
    },

    async addPasskey(data){
        try {
            return await prisma.passkey.create({
                data
            });
        } catch(e){
            console.log(e)
            throw e
        }
    },

    //Get user with friendly roles array
    async findUserForSignIn(val, key = "id") {
        const whereClause = {}
        whereClause.disabled = false;
        whereClause[key] = val;

        const includeItems = {
            userRoles: {
                include: {
                    role: {
                        select:{
                            name:true,
                        }
                    },
                }
            },
        }

        try {
            const validUser = await prisma.user.findUnique({
                where: whereClause,
                include: includeItems,
            });

            if (!validUser) return null;
        
            const {userRoles, ...userObject} = validUser;

            const newUserObj = {
                ...userObject,
                roles: userRoles.map(({role}) => role.name),
            }

            return newUserObj;

        } catch(error) {
            throw error;
        }
    },

    async getGoogleUserData(googleCode, appInviteCode) {
        try {
            const goog_oauth_client = getAuthedGoogleClient();
            const {tokens} = await goog_oauth_client.getToken(googleCode);

            // Verify the ID token with Google's API
            const ticket = await goog_oauth_client.verifyIdToken({
                idToken: tokens.id_token,
            });

            if (!ticket) throw new AppError("google tokens could not be verified", 400, {inviteCode:appInviteCode});

            await goog_oauth_client.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: goog_oauth_client,
                version: 'v2',
            });

            return await oauth2.userinfo.get();

        } catch(error) {
            throw error
        }
    },

    async findAndUpdateUserWithFederatedId(email, idpProvider, idp_id, data) {
        
        /*
        const userLookupResults = await prisma.$queryRaw`
                SELECT * FROM "User" u
                WHERE EXISTS (
                    SELECT 1
                    FROM jsonb_array_elements(u.federated_idps) AS item
                    WHERE item->>'name' = ${idpProvider}
                    AND item->'data'->>'id' = ${idp_id}
        )`;

        if (!userLookupResults || userLookupResults.length > 1) {
            throw new AppError("could not find google user")
        }
            const existingUser = userLookupResults[0];
        */

        const existingUser = await prisma.user.findUnique({where:{email}});

        const previousIDPArray = Array.isArray(existingUser?.federated_idps) 
                ? existingUser.federated_idps.filter(idp => idp.name != idpProvider)
                : [];

        return await prisma.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    federated_idps: [...previousIDPArray, {"name":idpProvider, data}],
                }
        });

    },
    
};