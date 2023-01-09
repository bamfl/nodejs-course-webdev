import Router from "express";
import userController from "../controllers/user-controller.js";

const router = new Router();

router.get("/api/users", userController.getUsers);
router.get("/api/user/:id", userController.getUser);
router.put("/api/user/update/:id", userController.updateUser);
router.post("/api/user/add", userController.addUser);
router.delete("/api/user/delete/:id", userController.deleteUser);

export default router;
