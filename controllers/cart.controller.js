import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

// Controller to get all items from the cart based on userId
export async function getAllCartItems(req, res, next) {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);

    try {
        const cartItems = await Cart.find({ userId: userId });

        if (!cartItems) {
            return res.status(400).json({ message: "Error occured while retrieving cart items." });
        }

        const cartUpdatedItems = [];
        for (const item of cartItems) {
            const product = await Cart.findOne({ productId: item.productId }).populate('productId');
            const updatedItem = {
                id: item._id,
                productId: item.productId,
                productTitle: product.name,
                productPrice: product.price,
                productQuantity: item.quantity
            }

            cartUpdatedItems.push(updatedItem);
        }

        res.status(200).send({ status: "success", message: `${cartUpdatedItems.length ? "Cart Items received successfully." : "No Cart items found !"}`, data: { length: cartUpdatedItems.length, cartItems: cartUpdatedItems } });

    } catch (error) {
        next(error);
    }
}

// Controller to get a specific cart item based on id
export async function getCartItemById(req, res, next) {
    const { id } = req.params;

    try {
        const cartId = new mongoose.Types.ObjectId(id);
        const cartItem = await Cart.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart Item with the given id not found !" });
        }

        res.status(200).send({ status: "success", "message": "Cart Item recieved successfully.", data: cartItem });
    } catch (error) {
        next(error);
    }
}

// Controller to add an item to the cart
export async function addItemToCart(req, res, next) {
    const { userId, productId, quantity } = req.body;

    try {
        const items = await Cart.find({
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(productId)
        });

        if (items.length > 0) {
            return res.status(400).json({ message: "Product already added to the cart for this user !" });
        }

        const cartItem = await Cart.create({
            userId,
            productId,
            quantity
        });

        if (!cartItem) {
            return res.status(400).json({ message: "An error occured while creating the cart item." });
        }

        res.status(201).send({ status: "Success", message: "Cart Item created.", data: cartItem });
    } catch (error) {
        next(error);
    }
}

// Controller to update an item based on cart item id
export async function updateCartItemById(req, res, next) {
    const { id } = req.params;
    const cartId = new mongoose.Types.ObjectId(id);
    const { quantity } = req.body || {};

    try {
        const cartItem = await Cart.findByIdAndUpdate(
            cartId,
            { quantity: quantity },
            { new: true, runValidators: true }
        );

        if (!cartItem) {
            return res.status(400).json({ message: "Ann error occured while updating the cart item !" });
        }

        res.status(200).send({ status: "success", "message": "Cart Item updated successfully !", data: cartItem });
    } catch (error) {
        next(error);
    }
}

// Controller to delete cart item using cart id
export async function deleteCartItemById(req, res, next) {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findOne({ _id: id });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart Item does not exist !" });
        }

        const itemDeleted = await Cart.findByIdAndDelete(id);

        if (!itemDeleted) {
            return res.status(400).json({ message: "An error occurred while deleting the cart item with the given id !" });
        }

        res.status(200).send({ status: "success", message: "Cart Item deleted successfully !", data: itemDeleted });
    } catch (error) {
        next(error);
    }
}

// Controller to delete all the cart items from the collection
export async function deleteAllCartItems(req, res, next) {
    const { id } = req.params;

    try {
        const result = await Cart.deleteMany({ userId: id });

        if (!result) {
            return res.status(400).json({ message: "An error occured while deleting all the cart items !" });
        }

        res.status(200).send({ status: "success", message: "All cart items deleted successfully.", data: result });
    } catch (error) {
        next(error);
    }
}