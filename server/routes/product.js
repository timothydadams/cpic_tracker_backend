import { Router } from 'express';
import { body, validationResult } from "express-validator";

const ProductRouter = Router();

/* PRODUCT */
ProductRouter.get('/', (req,res)=>{
    res.json({'message':'it works'})
});

ProductRouter.get('/:id', ()=>{})

ProductRouter.put('/:id', body('name').isString(), (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({errors:errors.array()})
    }
    res.status(200)
    res.json({data:req.params.id})
})

ProductRouter.post('/', () =>{})

ProductRouter.delete('/:id', () =>{})


export default ProductRouter;

/* USER 
router.get('/user', ()=>{})
router.get('/user/:id', ()=>{})
router.put('/user/:id', ()=>{})
router.post('/users', ()=>{})
router.delete('/user/:id', ()=>{})
*/

/* UPDATES 
router.get('/updates', ()=>{})
router.get('/update/:id', ()=>{})
router.put('/update/:id', ()=>{})
router.post('/updates', ()=>{})
router.delete('/update/:id', ()=>{})
*/

