-- CreateEnum
CREATE TYPE "ProxyType" AS ENUM ('HTTP', 'SOCKS');

-- CreateEnum
CREATE TYPE "ProxyStatus" AS ENUM ('work', 'down', 'init');

-- CreateTable
CREATE TABLE "Proxy" (
    "id" TEXT NOT NULL,
    "type" "ProxyType" NOT NULL DEFAULT 'HTTP',
    "host" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "ProxyStatus" NOT NULL DEFAULT 'init',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);
