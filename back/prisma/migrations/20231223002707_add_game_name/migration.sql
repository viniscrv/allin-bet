/*
  Warnings:

  - Added the required column `game_name` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" DECIMAL NOT NULL,
    "isVictory" BOOLEAN NOT NULL,
    "isJackpot" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "game_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bets" ("created_at", "id", "isJackpot", "isVictory", "user_id", "value") SELECT "created_at", "id", "isJackpot", "isVictory", "user_id", "value" FROM "bets";
DROP TABLE "bets";
ALTER TABLE "new_bets" RENAME TO "bets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
