import { useState, useCallback } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  query,
  sum,
  getAggregateFromServer,
  getDocs,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

export default function useDashboard(userId) {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [topExpenseData, setTopExpenseData] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [monthlyOverview, setMonthlyOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (value) => {
    const date = new Date(value?.seconds * 1000);
    const formatter = new Intl.DateTimeFormat("en-PK", {
      month: "short",
      year: "numeric",
    });
    return formatter.format(date);
  };

  const getTopExpenses = useCallback(async () => {
    if (!userId) return;
    const expensesRef = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("type", "==", "expense"),
      orderBy("amount", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(expensesRef);
    let topExpenses = [];
    snapshot.docs.forEach((doc) => {
      topExpenses.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setLoading(false);
    setTopExpenseData(topExpenses);
  }, [userId]);

  const getExpenseAmount = useCallback(async () => {
    if (!userId) return;
    const expensesRef = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("type", "==", "expense")
    );
    const snapshot = await getAggregateFromServer(expensesRef, {
      totalAmount: sum("amount"),
    });
    setExpenseAmount(snapshot.data().totalAmount || 0);
  }, [userId]);

  const getIncomeAmount = useCallback(async () => {
    if (!userId) return;
    const incomeRef = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("type", "==", "income")
    );
    const snapshot = await getAggregateFromServer(incomeRef, {
      totalAmount: sum("amount"),
    });
    setIncomeAmount(snapshot.data().totalAmount || 0);
  }, [userId]);

  const getMonthlyOverview = useCallback(async () => {
    if (!userId) return;
    const now = new Date();

    // Get the first day of the current month
    const months = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const formatter = new Intl.DateTimeFormat("en-PK", {
        month: "short",
        year: "numeric",
      });
      months.push(formatter.format(d));
    }

    const fiveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, 1);
    const q = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("date", ">=", fiveMonthsAgo)
    );
    const snapshot = await getDocs(q);

    const summary = {};
    snapshot.forEach((doc) => {
      const { amount, type, date } = doc.data();
      const convertDate = formatDate(date);
      summary[convertDate] = summary[convertDate] || { income: 0, expense: 0 };
      summary[convertDate][type] += Number(amount);
    });

    // Ensure all months are present in summary
    months.forEach((month) => {
      if (!summary[month]) {
        summary[month] = { income: 0, expense: 0 };
      }
    });

    // Get budget for the last 6 months
    const budgetRef = query(
      collection(db, "budget"),
      where("userId", "==", userId),
      where("date", ">=", fiveMonthsAgo)
    );
    const budgetSnapshot = await getDocs(budgetRef);

    const budgetSummary = {};
    budgetSnapshot.forEach((doc) => {
      const { amount, date } = doc.data();

      const convertDate = formatDate(date);
      budgetSummary[convertDate] =
        (budgetSummary[convertDate] || 0) + Number(amount);
    });

    // Optionally, sort summary by month order
    const minimalOutput = {};
    months.forEach((month) => {
      minimalOutput[month] = {
        i: summary[month].income,
        e: summary[month].expense,
        s: Math.max(summary[month].income - summary[month].expense, 0),
        b: budgetSummary[month] || 0,
      };
    });


    setLoading(false);
    setMonthlyOverview(minimalOutput);
  }, [userId]);

  const getRecentExpenses = useCallback(async () => {
    if (!userId) return;
    const q = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("type", "==", "expense"),
      orderBy("date", "desc"),
      limit(5)
    );
    const response = await getDocs(q);
    let expenses = [];
    response.docs.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setLoading(false);
    setRecentExpenses(expenses);
  }, [userId]);

  return {
    expenseAmount,
    incomeAmount,
    topExpenseData,
    recentExpenses,
    monthlyOverview,
    loading,
    getTopExpenses,
    getExpenseAmount,
    getIncomeAmount,
    getMonthlyOverview,
    getRecentExpenses,
  };
}
