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
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../src/routes");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost/by', { retryWrites: true, w: 'majority' });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error initializing application:', error);
    }
}))();
app.use("/api", routes_1.AllRouters);
app.listen(port, () => console.log("welcome to portal"));
//# sourceMappingURL=index.js.map