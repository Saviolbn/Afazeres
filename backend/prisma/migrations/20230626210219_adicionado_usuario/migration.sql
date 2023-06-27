/*
  Warnings:

  - Added the required column `usuarioId` to the `tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "finalizado" BOOLEAN NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("finalizado", "id", "texto") SELECT "finalizado", "id", "texto" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
