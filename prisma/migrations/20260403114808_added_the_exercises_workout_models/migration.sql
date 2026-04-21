-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exrecise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "times" INTEGER NOT NULL,
    "icon_path" TEXT NOT NULL,

    CONSTRAINT "Exrecise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExreciseToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExreciseToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExreciseToWorkout_B_index" ON "_ExreciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ExreciseToWorkout" ADD CONSTRAINT "_ExreciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exrecise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExreciseToWorkout" ADD CONSTRAINT "_ExreciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
