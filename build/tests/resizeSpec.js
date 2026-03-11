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
const resize_1 = __importDefault(require("../utilities/resize"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe("Image Processing Function", () => {
    const input = path_1.default.join(process.cwd(), "images/full/rose.jpg");
    const output = path_1.default.join(process.cwd(), "images/thumb/test-200-200.jpg");
    afterEach(() => {
        if (fs_1.default.existsSync(output)) {
            fs_1.default.unlinkSync(output);
        }
    });
    it("should resize image successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)(input, output, 200, 200);
        expect(fs_1.default.existsSync(output)).toBeTrue();
    }));
    it("should throw error when input image does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const badInput = path_1.default.join(process.cwd(), "images/full/notfound.jpg");
        yield expectAsync((0, resize_1.default)(badInput, output, 200, 200)).toBeRejected();
    }));
});
