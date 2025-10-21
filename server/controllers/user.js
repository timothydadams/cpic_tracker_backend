import { prisma } from "../configs/db.js";
import { createJWT, hashPassword } from "../utils/auth.js";
import { authorize } from "../middleware/authorize.js";
import * as userPolicies from "../policies/users.js";
import * as rolePolicies from "../policies/roles.js"

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const findRoleByName = async(name) => {
    try {
        const role = await prisma.role.findUnique({
            where:{
                name
            },
        });
        return role;
    } catch(e){
        console.log(e);
    }
}

const getUserById = async (id, res, includedItems = null) => {
    const user = await prisma.user.findUnique({
        where:{
            id
        },
        ...(includedItems != null && {select:includedItems}),
    });

    if (!user) {
        handleResponse(res, 404, "user not found");
    } else {
        return user
    }
}




export const handleCreateUser = async(req,res) => {
    const { data: { user } } = req.body;
    const { email, password } = user;

    if (!email || !password) return res.status(400).json({error: 'email and password are required'});

    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (existingUser) return res.sendStatus(409);

    try {
        const {id:defaultRoleId} = await findRoleByName("Viewer");
        const user = await prisma.user.create({
            data: {
                email,
                password: await hashPassword(password),
                roles: {
                    connect: {id:defaultRoleId}
                },
            }
        })
        
        if (!user?.id || !user?.email) return res.status(500).json({message:'failed to create user'});

        res.status(200).json({ message:"user created successfully" });
        
    } catch(e) {
        console.log('error:', e);
        res.status(500).json({message:'failed to create user'});
    }
    
}


export const handleGetUser = async(req,res) => {
    const { id } = req.params;
    if (!id) return res.json({message:"must provide an id parameter"})

    const includeItems = {
        email:true,
        id:true,
        family_name:true,
        given_name:true,
        display_name:true,
        profile_pic: true,
    }

    const user = await getUserById(id, res, includeItems);

    const roles = await prisma.userRole.findMany({
        where: {
            user_id:id,
        },
        include: {
            role: {
                select: {
                    name:true
                }
            }
        }
    });

    user.roles = roles.map(({role}) => role.name);

    authorize(userPolicies.canRead, user)(req, res, () => {
        handleResponse(res, 200, "user retrieved successfully", user);
    });

}

export const handleGetAllUsers = async(req,res) => {

    try {
        const users = await prisma.user.findMany({
            include: {
                password_hash:false,
                google_id:false,
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
        });

        //update role array
        const usersWithUpdatedRoles = users.map(({userRoles, ...u}) => {
            return {
                ...u,
                roles: userRoles.map(({role}) => role.name),
            }
        })
        
        res.json(usersWithUpdatedRoles)
    } catch(e) {
        console.log(e);
        res.json({error:"Prisma error"})
    }
}


export const handleUpdateUser = async(req,res) => {
    const { id } = req.params;
    if (!id) return res.json({message:"must provide an id parameter"})
    const { id:requesterId, isAdmin } = res.locals;

    if (!requesterId || (
        isAdmin === false && id !== requesterId
    )) return res.sendStatus(403);
    
    const { 
        email,
        username, 
        profile:{ 
            firstName,
            lastName,
            bio,
        }} = req.body;

    console.log('updating user:',{id, email })

    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            include: {
                password:false,
                profile:true,
            },
            data: {
                email,
                username,
                profile: {
                    upsert: {
                        where: {
                            userId:id
                        },
                        update: {
                            firstName,
                            lastName,
                            bio,
                        },
                        create: {
                            firstName,
                            lastName,
                            bio,
                        }
                        
                    }
                }
            }
        });
        
        if (!user?.id || !user?.username) return res.status(500).json({message:'failed to create user'});

        res.json({ user });
        
    } catch(e) {
        console.log('error:', e);
        res.status(500).json({message:'failed to update user'});
    }
    
}

export const getUserRoles = async(req,res) => {
    const { id:userId } = req.params;
    authorize(userPolicies.canRead)(req, res, async() => {
        const userRoles = await prisma.userRole.findMany({
            where:{
                user_id: userId,
            },
            include:{
                role_id:false,
                user_id:false,
                role:true,
            }
        })
        handleResponse(res, 200, "user roles retrieved", userRoles);

    })
}

export const removeRoleFromUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body
    if (!userId || !roleId) return res.json({message:"must provide an id parameter"})
    
    authorize(userPolicies.canUpdate)(req, res, async () => {
        const result = await prisma.userRole.delete({
            where: {
                user_id_role_id: {
                    user_id:userId,
                    role_id:roleId,
                }
            },
        });
        handleResponse(res, 200, "role removed from user", result);
    });
    
}


export const addRoleToUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body
    if (!userId || !roleId) return res.json({message:"must provide an id parameter"})
    
    authorize(userPolicies.canUpdate)(req, res, async () => {
        const result = await prisma.userRole.create({
            data: {
                user:{
                    connect: { id: userId},
                },
                role: {
                    connect: {id: roleId}
                }
            },
        });
        handleResponse(res, 200, "role added to user", result);
    });
    
}