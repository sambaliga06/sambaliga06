package snake;


import java.awt.*;

import javax.swing.JFrame;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

public class GameFrame extends JFrame {
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					GamePanel frame = new GamePanel();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	    GameFrame(){
	        getContentPane().add(new GamePanel(), BorderLayout.WEST);
	        this.setTitle("Snake");
	        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	        this.setResizable(false);
	        this.pack(); // take our J frame and fit it around all of the component that we add
	        this.setVisible(true);
	        this.setLocationRelativeTo(null); // appear in the middle of the computer screen
	    }
	}

