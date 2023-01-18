/*
  Warnings:

  - You are about to drop the column `title` on the `Activity` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "concluded" BOOLEAN NOT NULL
);
INSERT INTO "new_Activity" ("concluded", "description", "id") SELECT "concluded", "description", "id" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
