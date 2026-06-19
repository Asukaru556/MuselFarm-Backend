-- CreateTable
CREATE TABLE "measurements" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "line_id" INTEGER NOT NULL,
    "parameter" TEXT NOT NULL,
    "value" DECIMAL(10,4) NOT NULL,
    "unit" TEXT NOT NULL,
    "measured_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
