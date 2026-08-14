const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");
const Category = require("./models/Category");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/expense_tracker")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running"
  });
});

app.post("/api/expenses", async (req, res) => {
  try {
    const expense = new Expense({
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date
    });

    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error creating expense:", error);

    res.status(500).json({
      message: "Failed to create expense"
    });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(
      req.params.id
    );

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting expense:", error);

    res.status(500).json({
      message: "Failed to delete expense"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);

    res.status(500).json({
      message: "Failed to fetch expenses"
    });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);

    res.status(500).json({
      message: "Failed to update expense"
    });
  }
});

app.get("/api/expenses/summary", async (req, res) => {
  try {
    const { month, year } = req.query;

    const matchStage = {};

    // Year filter
    if (year && year !== "all") {
      const numericYear = Number(year);

      matchStage.date = {
        $gte: new Date(numericYear, 0, 1),
        $lt: new Date(numericYear + 1, 0, 1)
      };
    }

    // Month filter
    if (month && month !== "all") {
      const numericMonth = Number(month);

      // If a year is already selected,
      // use the date range for that specific month.
      if (year && year !== "all") {
        const numericYear = Number(year);

        matchStage.date = {
          $gte: new Date(
            numericYear,
            numericMonth,
            1
          ),
          $lt: new Date(
            numericYear,
            numericMonth + 1,
            1
          )
        };
      } else {
        // Month selected but year = all.
        // Match the month regardless of year.
        matchStage.$expr = {
          $eq: [
            { $month: "$date" },
            numericMonth + 1
          ]
        };
      }
    }

    const summary = await Expense.aggregate([
      {
        $match: matchStage
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount"
          }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error(
      "Error generating expense summary:",
      error
    );

    res.status(500).json({
      message: "Failed to generate expense summary"
    });
  }
});
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);

    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
});
app.post("/api/categories", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name
    });

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create category"
    });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const expenseUsingCategory =
      await Expense.findOne({
        category: category.name
      });

    if (expenseUsingCategory) {
      return res.status(400).json({
        message:
          "Cannot delete category because it is being used by expenses"
      });
    }

    await Category.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error(
      "Error deleting category:",
      error
    );

    res.status(500).json({
      message: "Failed to delete category"
    });
  }
});