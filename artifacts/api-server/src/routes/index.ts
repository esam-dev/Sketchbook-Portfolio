import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import notificationsRouter from "./notifications";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(notificationsRouter);
router.use(adminRouter);

export default router;
