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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var email, passwordRaw, name, roleName, tenant, role, existingUser, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Starting Enterprise Database Seeding...\n');
                    email = process.env.SUPER_ADMIN_EMAIL;
                    passwordRaw = process.env.SUPER_ADMIN_PASSWORD;
                    name = process.env.SUPER_ADMIN_NAME || 'Super Admin';
                    roleName = process.env.SUPER_ADMIN_ROLE || 'Super Admin';
                    if (!(!email || !passwordRaw)) return [3 /*break*/, 1];
                    console.warn('⚠️ SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD not set in environment. Skipping Super Admin creation.');
                    return [3 /*break*/, 12];
                case 1: return [4 /*yield*/, prisma.tenant.findFirst({ where: { name: 'AESCION HQ' } })];
                case 2:
                    tenant = _a.sent();
                    if (!!tenant) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.tenant.create({
                            data: {
                                name: 'AESCION HQ',
                                domain: 'aescion.com',
                                status: 'ACTIVE',
                            },
                        })];
                case 3:
                    tenant = _a.sent();
                    console.log("\u2705 Created Default Tenant: AESCION HQ");
                    _a.label = 4;
                case 4: return [4 /*yield*/, prisma.role.findFirst({ where: { name: roleName } })];
                case 5:
                    role = _a.sent();
                    if (!!role) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.role.create({
                            data: {
                                name: roleName,
                                description: 'Full system access',
                                isSystem: true,
                                status: 'ACTIVE',
                            },
                        })];
                case 6:
                    role = _a.sent();
                    console.log("\u2705 Created Role: ".concat(roleName));
                    _a.label = 7;
                case 7: return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                case 8:
                    existingUser = _a.sent();
                    if (!existingUser) return [3 /*break*/, 9];
                    console.log("\u2139\uFE0F Super Admin user (".concat(email, ") already exists. Skipping."));
                    return [3 /*break*/, 12];
                case 9: return [4 /*yield*/, bcrypt.hash(passwordRaw, 10)];
                case 10:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: email,
                                password: hashedPassword,
                                firstName: name,
                                lastName: 'Admin',
                                status: 'ACTIVE',
                                roleId: role.id,
                                tenantId: tenant.id,
                            },
                        })];
                case 11:
                    _a.sent();
                    console.log("\u2705 Created Super Admin: ".concat(email));
                    _a.label = 12;
                case 12:
                    console.log('\n✅ Enterprise Seeding Complete.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
