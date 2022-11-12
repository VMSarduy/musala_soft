-- CreateTable
CREATE TABLE "Gateway" (
    "id" SERIAL NOT NULL,
    "serial_mumber" TEXT NOT NULL,
    "human_readable_name" TEXT NOT NULL,
    "ipv4_address" TEXT NOT NULL,

    CONSTRAINT "Gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peripheral_device" (
    "id" SERIAL NOT NULL,
    "vendor" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "gatewayId" INTEGER NOT NULL,

    CONSTRAINT "Peripheral_device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gateway_serial_mumber_key" ON "Gateway"("serial_mumber");

-- AddForeignKey
ALTER TABLE "Peripheral_device" ADD CONSTRAINT "Peripheral_device_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "Gateway"("id") ON DELETE CASCADE ON UPDATE CASCADE;
