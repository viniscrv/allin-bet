/*
  Warnings:

  - You are about to drop the column `result` on the `bets` table. All the data in the column will be lost.
  - Added the required column `isVictory` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" DECIMAL NOT NULL,
    "isVictory" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bets" ("id", "user_id", "value") SELECT "id", "user_id", "value" FROM "bets";
DROP TABLE "bets";
ALTER TABLE "new_bets" RENAME TO "bets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
