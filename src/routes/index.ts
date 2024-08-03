import express from "express";
import user from './user.route'


const router = express.Router();

router.get("/",
  (req, res) => {
    res.json({
      message: "API - 👋🌎🌍🌏",
    });
  });
router.use('/user', user);

// router.use('/todos', todos)

export default router;
