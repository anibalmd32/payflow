-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "sigin" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "month_price" TEXT NOT NULL,
    "year_price" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_benefits" (
    "id" SERIAL NOT NULL,
    "benefit" TEXT NOT NULL,
    "membership_id" INTEGER NOT NULL,

    CONSTRAINT "membership_benefits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "firts_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT,
    "postal_code" TEXT,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "membership_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "last_payment" TIMESTAMP(3),
    "next_payment" TIMESTAMP(3) NOT NULL,
    "free_trial" INTEGER NOT NULL,
    "interval" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_history" (
    "id" SERIAL NOT NULL,
    "subscription_id" INTEGER NOT NULL,
    "total" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "invoice_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_config" (
    "id" SERIAL NOT NULL,
    "logo_url" TEXT NOT NULL DEFAULT 'payflow_default_logo.jpeg',
    "service_name" TEXT NOT NULL,
    "description" TEXT,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "invoice_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoce_history" (
    "id" SERIAL NOT NULL,
    "purchased" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "invoice_config_id" INTEGER NOT NULL,

    CONSTRAINT "invoce_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_config" (
    "id" SERIAL NOT NULL,
    "invoice_config_id" INTEGER NOT NULL,
    "notification_email" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_name_key" ON "memberships"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_customer_id_key" ON "subscriptions"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_template_name_key" ON "invoice_template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_template_path_key" ON "invoice_template"("path");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_config_service_name_key" ON "invoice_config"("service_name");

-- CreateIndex
CREATE UNIQUE INDEX "invoce_history_purchased_key" ON "invoce_history"("purchased");

-- CreateIndex
CREATE UNIQUE INDEX "user_config_invoice_config_id_key" ON "user_config"("invoice_config_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_config_notification_email_key" ON "user_config"("notification_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_config_user_id_key" ON "user_config"("user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_benefits" ADD CONSTRAINT "membership_benefits_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_history" ADD CONSTRAINT "subscription_history_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_config" ADD CONSTRAINT "invoice_config_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "invoice_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoce_history" ADD CONSTRAINT "invoce_history_purchased_fkey" FOREIGN KEY ("purchased") REFERENCES "subscription_history"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoce_history" ADD CONSTRAINT "invoce_history_invoice_config_id_fkey" FOREIGN KEY ("invoice_config_id") REFERENCES "invoice_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_config" ADD CONSTRAINT "user_config_invoice_config_id_fkey" FOREIGN KEY ("invoice_config_id") REFERENCES "invoice_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_config" ADD CONSTRAINT "user_config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
