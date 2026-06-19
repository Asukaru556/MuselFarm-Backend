-- CreateTable
CREATE TABLE "operational_events" (
    "id" SERIAL NOT NULL,
    "line_id" INTEGER NOT NULL,
    "event_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "operational_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "operational_events" ADD CONSTRAINT "operational_events_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_events" ADD CONSTRAINT "operational_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
