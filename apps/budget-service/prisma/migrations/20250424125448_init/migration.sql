-- CreateTable
CREATE TABLE "BudgetSuggestion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "income" DECIMAL(10,2) NOT NULL,
    "expense" DECIMAL(10,2) NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BudgetSuggestion_pkey" PRIMARY KEY ("id")
);
