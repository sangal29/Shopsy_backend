import { Router } from "express"
import { addItemToCart, deleteAllCartItems, deleteCartItemById, getAllCartItems, getCartItemById, updateCartItemById } from "../controllers/cart.controller.js";
import fieldsMissingValidation from "../middlewares/fieldsMissingValidation.middleware.js";
import verifyJwtToken from "../middlewares/verifyJwtToken.middleware.js";

const cartRouter = Router();

// Added middleware to check where user is logged in or not
cartRouter.use(verifyJwtToken);

// Get all items from Cart
cartRouter.get("/:id", getAllCartItems);

// Get one item from Cart
cartRouter.get("/items/:id", getCartItemById);

// Add item to Cart
cartRouter.post("/", fieldsMissingValidation, addItemToCart);

// Update item in the Cart
cartRouter.put("/items/:id", fieldsMissingValidation, updateCartItemById);

// Delete item in the Cart
cartRouter.delete("/:id", deleteCartItemById);

// Delete all items in the Cart
cartRouter.delete("/all/:id", deleteAllCartItems);


export default cartRouter;