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

app.get("/api/expenses/export", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    let csv = "Date,Category,Amount,Description\n";

    expenses.forEach((expense) => {
      const date = new Date(expense.date).toISOString().split("T")[0];

      const category = `"${String(expense.category).replace(/"/g, '""')}"`;

      const amount = expense.amount;

      const description = `"${String(expense.description || "").replace(/"/g, '""')}"`;

      csv += `${date},${category},${amount},${description}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("expenses.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting expenses:", error);

    res.status(500).json({
      message: "Failed to export expenses"
    });
  }
});

app.post("/api/expenses/import", async (req, res) => {
  try {
    const { csv } = req.body;

    if (!csv) {
      return res.status(400).json({
        message: "CSV data is required"
      });
    }

    const lines = csv.trim().split(/\r?\n/);

    if (lines.length < 2) {
      return res.status(400).json({
        message: "CSV file is empty"
      });
    }

    const categories = await Category.find();

    const categoryMap = new Map(
      categories.map((category) => [
        category.name.toLowerCase(),
        category.name
      ])
    );

    const expenses = [];
    const invalidRows = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        continue;
      }

      const parts = line.split(",");

if (parts.length < 4) {
  invalidRows.push(i + 1);
  continue;
}

      const date = parts[0].replace(/^"|"$/g, "").trim();
      const category = parts[1].replace(/^"|"$/g, "").trim();
      const amount = Number(
        parts[2].replace(/^"|"$/g, "").trim()
      );

      const description = parts
        .slice(3)
        .join(",")
        .replace(/^"|"$/g, "")
        .replace(/""/g, '"')
        .trim();

      const dateParts = date.split("-");

      const validDate =
        dateParts.length === 3 &&
        dateParts[0].length === 2 &&
        dateParts[1].length === 2 &&
        dateParts[2].length === 4;

      const parsedDate = validDate
        ? new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          )
        : null;

      const validCategory = categoryMap.has(
        category.toLowerCase()
      );

      if (
        !validDate ||
        !validCategory ||
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        invalidRows.push(i + 1);
        continue;
      }

      expenses.push({
        date: parsedDate,
        category: categoryMap.get(category.toLowerCase()),
        amount,
        description
      });
    }

    if (expenses.length === 0) {
      return res.status(400).json({
        message: "No valid expenses found in CSV",
        invalidRows
      });
    }

    const importedExpenses = await Expense.insertMany(expenses);

    res.status(201).json({
      message: "Expenses imported successfully",
      count: importedExpenses.length,
      invalidRows
    });
  } catch (error) {
    console.error("Error importing expenses:", error);

    res.status(500).json({
      message: "Failed to import expenses"
    });
  }
});