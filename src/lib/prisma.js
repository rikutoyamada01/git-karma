"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var pg_1 = require("pg");
var adapter_pg_1 = require("@prisma/adapter-pg");
var connectionString = process.env.DATABASE_URL;
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma || (function () {
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }
    var pool = new pg_1.Pool({ connectionString: connectionString });
    var adapter = new adapter_pg_1.PrismaPg(pool);
    return new client_1.PrismaClient({ adapter: adapter });
})();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
exports.default = prisma;
