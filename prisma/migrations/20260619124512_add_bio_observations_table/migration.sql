-- CreateTable
CREATE TABLE "bio_observations" (
    "id" SERIAL NOT NULL,
    "line_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "fouling_percent" DECIMAL(5,2) NOT NULL,
    "mussel_condition" TEXT NOT NULL,
    "mortality_percent" DECIMAL(5,2) NOT NULL,
    "density" INTEGER NOT NULL,
    "avg_size" DECIMAL(5,2) NOT NULL,
    "avg_weight" DECIMAL(5,2) NOT NULL,
    "pathogen_present" BOOLEAN NOT NULL DEFAULT false,
    "pathogen_type" TEXT,
    "comment" TEXT,
    "created_by" INTEGER NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bio_observations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bio_observations" ADD CONSTRAINT "bio_observations_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bio_observations" ADD CONSTRAINT "bio_observations_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "mussel_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bio_observations" ADD CONSTRAINT "bio_observations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
