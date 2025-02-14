import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from 'express-validator';
import { handleInputErrors } from "./middleware";

const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    param('id').isInt().withMessage('Id No Válido'),
    handleInputErrors,
    getProductById);

router.post('/', 
    body('name').notEmpty().withMessage('El nombre del producto no puede estar Vacio'),
    body('price').notEmpty().withMessage('El precio del producto no puede estar Vacio')
    .isNumeric().withMessage('Valor no Válido')
    .custom( (value) => value > 0).withMessage('Precio no Válido'),
    handleInputErrors,
    createProduct);

router.put('/:id', 
    param('id').isInt().withMessage('Id No Válido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede estar Vacio'),
    body('price').notEmpty().withMessage('El precio del producto no puede estar Vacio')
        .isNumeric().withMessage('Valor no Válido')
        .custom( (value) => value > 0).withMessage('Precio no Válido'),
    body('availability').isBoolean().withMessage('Valor para la disponibilidad no Válido'),
    handleInputErrors,
    updateProduct);

router.patch('/:id', 
    param('id').isInt().withMessage('Id No Válido'),
    handleInputErrors,
    updateAvailability);

router.delete('/:id', 
    param('id').isInt().withMessage('Id No Válido'),
    handleInputErrors,
    deleteProduct);

export default router;