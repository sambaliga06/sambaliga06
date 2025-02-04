import tkinter as tk
import random

class FindFox(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Do Not Find Fox")
        self.geometry("400x450")  # Increased window size
        self.attempts = 0  # Track failed attempts
        self.grid_data = [["" for _ in range(4)] for _ in range(4)]
        self._cells = {}

        self._create_display()
        self._create_board_grid()
        self._create_restart_button()
        self._create_attempts_label()

        self._fill_diagonal()  # Fill main diagonal with 'O'

    def _create_display(self):
        """Creates the status display at the top."""
        display_frame = tk.Frame(master=self)
        display_frame.pack(fill=tk.X)
        self.display = tk.Label(
            master=display_frame,
            text="Ready",
            font=("Arial", 14, "bold"),
        )
        self.display.pack()

    def _create_board_grid(self):
        """Creates the 4x4 button grid."""
        grid_frame = tk.Frame(master=self)
        grid_frame.pack()
        for row in range(4):
            for col in range(4):
                button = tk.Button(
                    master=grid_frame,
                    text="",
                    fg='black',
                    width=3,
                    height=2,
                    highlightbackground='lightblue',
                    command=lambda r=row, c=col: self._place_letter(r, c)
                )
                self._cells[(row, col)] = button
                button.grid(row=row, column=col, padx=5, pady=5, sticky="nsew")

    def _create_restart_button(self):
        """Creates the restart button."""
        restart_frame = tk.Frame(master=self)
        restart_frame.pack(pady=10)
        restart_button = tk.Button(
            master=restart_frame,
            text="Restart",
            command=self._restart_game,
            font=("Arial", 12),
            bg="red",
            fg="white"
        )
        restart_button.pack()

    def _create_attempts_label(self):
        """Displays the number of failed attempts."""
        self.attempts_label = tk.Label(
            self, text=f"Attempts: {self.attempts}", font=("Arial", 12, "bold")
        )
        self.attempts_label.pack(pady=5)

    def _fill_diagonal(self):
        """Fills the main diagonal with 'O'."""
        for i in range(4):
            self.grid_data[i][i] = "O"
            self._cells[(i, i)].config(text="O", state="disabled")

    def _place_letter(self, row, col):
        """Places a letter only if the game is still active."""
        if self.display.cget("text").startswith("Game Over!"):  
            return  # Stop further clicks if the game is over

        if self.grid_data[row][col] == "":  
            if not hasattr(self, "letter_pool") or not self.letter_pool:
                self.letter_pool = ['F'] * 5 + ['X'] * 5 + ['O'] * 2
                random.shuffle(self.letter_pool)

        letter = self.letter_pool.pop()
        self.grid_data[row][col] = letter
        self._cells[(row, col)].config(text=letter, state="disabled")

        # Check if the game is over
        result = self._check_game_over()
        if result:
            self.display.config(text=result)
            self._update_attempts(result == "You Win! No FOX found.")
            self._disable_grid()  # Disable further clicks

    def _disable_grid(self):
        """Disables all buttons after the game ends."""
        for button in self._cells.values():  # button is the button object, _ is the coordinate tuple
            button.config(state="disabled")




    def _check_game_over(self):
        """Checks if 'FOX' or 'XOF' appears in rows, columns, or any diagonal."""

        def check_sequence(sequence):
            """Checks all possible 3-letter sequences in a given list."""
            for i in range(len(sequence) - 2):  # Check all triplets
                if sequence[i:i+3] == ["F", "O", "X"] or sequence[i:i+3] == ["X", "O", "F"]:
                    return True
            return False

        # Check rows
        for row in self.grid_data:
            if check_sequence(row):
                return "Game Over! You found FOX."

        # Check columns
        for col in range(4):
            column = [self.grid_data[row][col] for row in range(4)]
            if check_sequence(column):
                return "Game Over! You found FOX."

        # Check all possible diagonals
        diagonals = []

        # Collect diagonals (bottom-left to top-right)
        for r in range(2, 4):  # Start from row index 2 to ensure at least 3 elements
            diagonals.append([self.grid_data[r-i][i] for i in range(r+1)])  # Lower-left diagonals
        for c in range(1, 2):  # Start from col index 1 to ensure at least 3 elements
            diagonals.append([self.grid_data[3-i][c+i] for i in range(4-c)])  # Upper-right diagonals

        # Collect diagonals (top-left to bottom-right)
        for r in range(2, 4):
            diagonals.append([self.grid_data[i][r-i] for i in range(r+1)])  # Upper-left diagonals
        for c in range(1, 2):
            diagonals.append([self.grid_data[i][c+i] for i in range(4-c)])  # Lower-right diagonals

        # Check all diagonals for "FOX" or "XOF"
        for diag in diagonals:
            if check_sequence(diag):
                return "Game Over! You found FOX."

        # Check if the board is full
        if all(cell != '' for row in self.grid_data for cell in row):
            return "You Win! No FOX found."

        return None  # Continue playing

    def _update_attempts(self, success):
        """Updates the attempt counter and UI."""
        if success:
            self.attempts = 0  # Reset on success
        else:
            self.attempts += 1  # Increase on failure
        self.attempts_label.config(text=f"Attempts: {self.attempts}")

    def _restart_game(self):
        """Resets the game state but keeps the attempts counter."""
        self.grid_data = [["" for _ in range(4)] for _ in range(4)]
        for (row, col), button in self._cells.items():
            button.config(text="", state="normal")
        self._fill_diagonal()  # Refill diagonal with 'O'
        self.display.config(text="Ready")

def main():
    board = FindFox()
    board.mainloop()

main()