import subprocess
import os
import sys
import shutil

def main():
    # Detect standard Google Chrome paths on Windows
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
        
    if not os.path.exists(chrome_path):
        print("Error: Google Chrome was not found at standard installation paths.")
        print("Please verify Chrome is installed to generate the PDF customizer output.")
        sys.exit(1)
        
    # Get absolute file paths
    current_dir = os.path.dirname(os.path.abspath(__file__)) if __file__ else os.getcwd()
    html_path = os.path.join(current_dir, "savings_planner.html")
    output_a4 = os.path.join(current_dir, "savings_planner_gamified_A4.pdf")
    output_a5 = os.path.join(current_dir, "savings_planner_gamified_A5.pdf")
    
    print(f"Initializing headless Chrome PDF compilation...")
    print(f"Input:  {html_path}")
    print(f"Output: {output_a4}")
    
    try:
        # Run headless chrome print command
        # Chrome natively renders CSS @page layout size/margins (defined as A4 portrait in CSS)
        subprocess.run([
            chrome_path,
            "--headless",
            "--disable-gpu",
            f"--print-to-pdf={output_a4}",
            html_path
        ], capture_output=True, text=True, check=True)
        
        print("Successfully generated A4 Savings Planner PDF!")
        
        # Duplicate to A5 format file to preserve Etsy file endpoints (A5 scales naturally for printers)
        shutil.copy2(output_a4, output_a5)
        print("Successfully generated A5 Savings Planner PDF!")
        
    except subprocess.CalledProcessError as e:
        print("Error: Headless Chrome failed to render PDF booklet.")
        print(e.stderr)
        sys.exit(1)
    except Exception as ex:
        print(f"Error during PDF compilation: {ex}")
        sys.exit(1)

if __name__ == "__main__":
    main()
