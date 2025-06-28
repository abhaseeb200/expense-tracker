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
    const fiveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const q = query(
      collection(db, "transaction"),
      where("userId", "==", userId),
      where("date", ">=", fiveMonthsAgo)
    );
    const snapshot = await getDocs(q);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const summary = {};
    snapshot.forEach((doc) => {
      const { amount, type, date } = doc.data();
      const currentDate = date.toDate();
      const monthYear = `${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()}`;
      summary[monthYear] = summary[monthYear] || { income: 0, expense: 0 };
      summary[monthYear][type] += Number(amount);
    });
    const minimalOutput = {};
    Object.keys(summary).forEach((month) => {
      minimalOutput[month] = {
        i: summary[month].income,
        e: summary[month].expense,
      };
    });
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
    setRecentExpenses(expenses);
  }, [userId]);

  return {
    expenseAmount,
    incomeAmount,
    topExpenseData,
    recentExpenses,
    monthlyOverview,
    getTopExpenses,
    getExpenseAmount,
    getIncomeAmount,
    getMonthlyOverview,
    getRecentExpenses,
  };
}
