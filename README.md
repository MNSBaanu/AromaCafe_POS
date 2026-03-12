# Aroma Cafe POS System ☕

A modern, lightweight Point of Sale (POS) system built with **Electron** and **Tailwind CSS**. Designed for simplicity and efficiency in a cafe environment.

## ✨ Features

- **Modern UI**: Clean and intuitive interface using Tailwind CSS.
- **Product Catalog**: Categorized product listing (Coffee, Pastries, Cold Drinks).
- **Dynamic Cart**: Add/remove items, update quantities, and real-time total calculation.
- **Data Persistence**: Transactions are saved locally in JSON format.
- **Receipt Printing**: Generate and print professional receipts for customers.
- **Real-time Clock**: Live date and time display for the operator.

## 🚀 How to Run

Follow these steps to get the application running on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- npm (comes with Node.js)

### Installation

1. **Clone or Download** the repository.
2. Open your terminal/command prompt and navigate to the project directory:
   ```bash
   cd AromaCafe_POS
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

Start the application using the following command:

```bash
npm start
```

## 📂 Project Structure

- `main.js`: The Electron main process (handles window management and data operations).
- `renderer.js`: The renderer process (handles UI logic and cart functionality).
- `index.html`: The main user interface.
- `receipt.html`: The receipt template for printing.
- `data/`: Directory containing `products.json` and saved `transactions.json`.

## 🛠️ Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Storage**: Local JSON files (via Node.js `fs` module)

---
Developed for Aroma Cafe.
