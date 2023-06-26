/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuario_nome_key" ON "usuario"("nome");
