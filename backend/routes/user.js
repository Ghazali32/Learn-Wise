const express = require("express");
const { User, Course } = require("../database/DataBase");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../constant/Password");
const userRouter = express.Router();
const middleware = require("../middleware/middleWare");

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const isValidated = signUpSchema.safeParse(req.body);
  if (!isValidated.success) {
    res.status(411).json({
      error: "e-main or password incorrect",
    });
    return;
  }

  const isPresent = await User.findOne({
    username: username,
  });
  if (isPresent) {
    res.status(411).json({
      error: "Email already taken",
    });
    return;
  }

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
  });

  const userId = user._id;
  const name = user.firstName;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    msg: "User Created Successfully",
    token: token,
    name,
  });
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});
userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isValid = signInSchema.safeParse(req.body);
  if (!isValid.success) {
    res.status(411).json({
      error: "Invalid email or password",
    });
    return;
  }

  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (user) {
    const userId = user._id;
    const name = user.firstName;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.status(200).json({
      msg: "User signed in Successfully",
      token: token,
      name,
    });
    return;
  }

  res.status(411).json({
    error: "error while signing in",
  });
});

userRouter.get("/myCourses", middleware, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId)
      .populate("purchasedCourses")
      .exec();

    res.status(200).json({
      purchasedCourses: user.purchasedCourses,
    });
    return;
  } catch (e) {
    res.status(411).json({
      error: e,
    });
    return;
  }
});

userRouter.get("/myCart", middleware, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("cart").exec();

    res.status(200).json({
      myCart: user.cart,
    });
    return;
  } catch (e) {
    res.status(411).json({
      error: e,
    });
    return;
  }
});

userRouter.post("/purchase", middleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(411).json({
      error: "User not found",
    });
    return;
  }

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(411).json({
      error: "Course not found",
    });
    return;
  }
  if (user.purchasedCourses.some((c) => c._id.toString() === courseId)) {
    res.json({
      msgErr: "Course already Purchased",
    });
    return;
  }

  user.purchasedCourses.push(course);
  await user.save();

  res.json({
    msg: "Course purchased successfully",
  });
});

userRouter.post("/addToCart", middleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(411).json({
      error: "User not found",
    });
    return;
  }

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(411).json({
      error: "Course not found",
    });
    return;
  }

  if (user.cart.some((c) => c._id.toString() === courseId)) {
    res.json({
      msg: "Course already in cart",
    });
    return;
  }

  user.cart.push(course);
  await user.save();

  res.json({
    msg: "Added to Cart",
  });
});

userRouter.post("/checkCourse", middleware, async (req, res) => {
  const courseId = req.body.courseId;
  const userId = req.userId;

  const user = await User.findById(userId);

  if (
    user.cart.some((c) => c._id.toString() === courseId) &&
    user.purchasedCourses.some((c) => c._id.toString() === courseId)
  ) {
    res.json({
      msg: "yes",
    });
    return;
  }

  if (user.cart.some((c) => c._id.toString() === courseId)) {
    res.json({
      msg: "cart",
    });
    return;
  }

  if (user.purchasedCourses.some((c) => c._id.toString() === courseId)) {
    res.json({
      msg: "Purchased",
    });
    return;
  }
});

userRouter.delete("/removeCart", middleware, async (req, res) => {
  const courseId = req.body.courseId;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Remove the course from the cart
    user.cart = user.cart.filter((cartItem) => cartItem.toString() !== courseId.toString());
    await user.save();

    res.json({
      msg: "Course removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.delete("/removePurchased", middleware, async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // Remove the purchased courses
      user.purchasedCourses = user.purchasedCourses.filter((purchasedItem) => purchasedItem.toString() !== courseId.toString());
      await user.save();
  
      res.json({
        msg: "Course removed successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = userRouter;
