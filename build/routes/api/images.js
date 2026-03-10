"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resize_1 = __importDefault(require("../../utilities/resize"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query.filename;
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        // check filename
        if (!filename) {
            return res.status(400).send("filename parameter is required");
        }
        // check width & height
        if (!width || !height || width <= 0 || height <= 0) {
            return res
                .status(400)
                .send("width and height must be positive numbers");
        }
        const fullPath = path_1.default.resolve(`images/full/${filename}.jpg`);
        const thumbPath = path_1.default.resolve(`images/thumb/${filename}-${width}-${height}.jpg`);
        // check image exists
        if (!fs_1.default.existsSync(fullPath)) {
            return res.status(404).send("Image not found");
        }
        // create resized image if not cached
        if (!fs_1.default.existsSync(thumbPath)) {
            yield (0, resize_1.default)(fullPath, thumbPath, width, height);
        }
        res.sendFile(thumbPath);
    }
    catch (error) {
        res.status(500).send("Error processing image");
    }
}));
exports.default = router;
