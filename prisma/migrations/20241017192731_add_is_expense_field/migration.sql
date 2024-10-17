/*
  Warnings:

  - Added the required column `isExpense` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isExpense" BOOLEAN NOT NULL;
