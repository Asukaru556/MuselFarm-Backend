-- CreateTable
CREATE TABLE "sensors" (
    "id" SERIAL NOT NULL,
    "line_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sensor_type" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensors_serial_number_key" ON "sensors"("serial_number");

-- AddForeignKey
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
