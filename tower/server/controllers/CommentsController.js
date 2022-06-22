import { Auth0Provider } from "@bcwdev/auth0provider";
import {commentsService} from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";


export class CommentsController extends BaseController {
    constructor() {
        super("api/comments");
    }