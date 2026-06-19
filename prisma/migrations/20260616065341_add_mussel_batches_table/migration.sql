-- CreateTable
CREATE TABLE "mussel_batches" (
    "id" SERIAL NOT NULL,
    "line_id" INTEGER NOT NULL,
    "batch_number" TEXT NOT NULL,
    "seed_date" TIMESTAMP(3) NOT NULL,
    "initial_count" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'growing',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mussel_batches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mussel_batches_batch_number_key" ON "mussel_batches"("batch_number");

-- AddForeignKey
ALTER TABLE "mussel_batches" ADD CONSTRAINT "mussel_batches_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
