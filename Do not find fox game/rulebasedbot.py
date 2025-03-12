import cv2
import numpy as np
import pyautogui
import pytesseract
import time
import random

# Set Tesseract Path
pytesseract.pytesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Constants
GRID_SIZE = 4  # 4x4 grid
CELL_WIDTH, CELL_HEIGHT = 96, 96  # Adjust based on your screen
TOP_LEFT_X, TOP_LEFT_Y = 783, 432  # Update with actual grid position

# Get fixed positions for grid cells
def get_grid_positions():
    grid_cells = []
    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            x = TOP_LEFT_X + col * CELL_WIDTH
            y = TOP_LEFT_Y + row * CELL_HEIGHT
            grid_cells.append((x, y, CELL_WIDTH, CELL_HEIGHT))
    return grid_cells

# Take screenshot
def capture_screen():
    screenshot = pyautogui.screenshot()
    return cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)

# Find empty cells while avoiding the **main diagonal**
def find_valid_cells(grid_cells, image):
    empty_cells = []

    for i, (x, y, w, h) in enumerate(grid_cells):
        row, col = divmod(i, GRID_SIZE)

        # **Skip main diagonal only** (row == col)
        if row == col:
            continue  

        cell_gray = cv2.cvtColor(image[y:y+h, x:x+w], cv2.COLOR_BGR2GRAY)
        _, cell_thresh = cv2.threshold(cell_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Try reading text
        letter = pytesseract.image_to_string(cell_thresh, config='--psm 10 -c tessedit_char_whitelist=FOX').strip()

        if letter == "":  # If OCR doesn't detect anything, assume it's empty
            empty_cells.append((row, col))

    return empty_cells

# Click on a random valid cell (avoiding only the main diagonal)
def click_random_cell(grid_cells, valid_cells):
    if valid_cells:
        row, col = random.choice(valid_cells)  # Pick a random **non-main-diagonal** cell
        x, y, w, h = grid_cells[row * GRID_SIZE + col]
        click_x, click_y = x + w // 2, y + h // 2
        pyautogui.click(click_x, click_y)
        print(f"Clicked on: ({row}, {col})")
        time.sleep(0.5)

# Main bot loop
def main():
    print("Starting bot... Open the game on the website.")

    while True:
        screen = capture_screen()
        grid_cells = get_grid_positions()
        valid_cells = find_valid_cells(grid_cells, screen)

        print(f"Available valid cells (avoiding main diagonal): {valid_cells}")

        if not valid_cells:
            print("Game Over! No moves left.")
            break

        click_random_cell(grid_cells, valid_cells)
        time.sleep(1)  # Wait before next move

if __name__ == "__main__":
    main()
