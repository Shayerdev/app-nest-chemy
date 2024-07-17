-- CreateTable
CREATE TABLE "Emails" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "mxRecords" TEXT,
    "smtpCheck" BOOLEAN NOT NULL,
    "dnsCheck" BOOLEAN NOT NULL,
    "msgCheck" TEXT,
    "expired" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emails_email_key" ON "Emails"("email");
