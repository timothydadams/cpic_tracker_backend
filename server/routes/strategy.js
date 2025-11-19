import { Router } from 'express';
import { 
    viewAllStrategies,
    viewStrategy,
    updateStrategy,
    viewStrategyStatuses,
    viewTimelineOptions,
    viewFocusAreas,
    viewPolicies,
    viewStrategyComments,
} from "../controllers/strategies.js";

import {
    createComment,
} from '../controllers/comments.js';
import { verifyToken } from '../middleware/requireAuth.js';
import { prisma } from '../configs/db.js';


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const StrategyRouter = Router();

StrategyRouter.get("/", viewAllStrategies);

StrategyRouter.get("/my-strategies", [verifyToken], async(req, res) => {
    try {
        let strategies = [];
        const userId = res.locals.user.id;
        const isImplementer = res.locals.user.isImplementer;

        //console.log('details going into lookup:', {userId, isImplementer});
        
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await prisma.user.findFirst({
            where:{
                id:userId
            },
            include: {
                implementer_org:true,
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        //console.log('details going into lookup:', {user});

        if (isImplementer && user?.implementer_org_id) {
            const leadStrategies = await prisma.strategy.findMany({
                where: {
                    implementers: {
                        some: {
                            implementer_id: user.implementer_org_id,
                            is_primary:true
                        }
                    }
                },
                include: {
                    status:true,
                    focus_area:true,
                    policy:true,
                    timeline:true,
                    implementers: {
                        include: {
                            implementer:true
                        }
                    }

                }
            });

            const supportingStrategies = await prisma.strategy.findMany({
                where: {
                    implementers: {
                        some: {
                            implementer_id: user.implementer_org_id,
                            is_primary:false
                        }
                    }
                },
                include: {
                    status:true,
                    focus_area:true,
                    policy:true,
                    timeline:true,
                    implementers: {
                        include: {
                            implementer:true
                        }
                    }

                }
            }); 
            //console.log('retrieved data:', data);
            handleResponse(res, 200, "strategies retrieved", {
                primary: leadStrategies,
                support: supportingStrategies,
                org_data: user.implementer_org
            });
        }
    
        
    } catch (error) {
            console.error('Get invite codes error:', error);
            handleResponse(res, 500, "failed to fetch invite codes");
    }
});

StrategyRouter.get('/statuses', viewStrategyStatuses);
StrategyRouter.get('/timeline_options', viewTimelineOptions);
StrategyRouter.get('/policies', viewPolicies);
StrategyRouter.get('/focusareas', viewFocusAreas);
StrategyRouter.get('/:id', viewStrategy);
StrategyRouter.put('/:id', [verifyToken], updateStrategy);

StrategyRouter.post('/:id/comments', [verifyToken], createComment)
StrategyRouter.get('/:id/comments', viewStrategyComments);

export default StrategyRouter;

//app.use('/api', [protect], apiRouter)