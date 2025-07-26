☔ Smart Rain Detection System
🚀 Project Overview
This project develops a Smart Rain Detection System that leverages an ESP32 microcontroller to detect rainfall and communicate its status to a visually appealing web interface. This system provides real-time rain alerts and can be easily adapted for various applications, from smart irrigation to automated window closures.

Our capstone project aims to provide a reliable and accessible solution for monitoring precipitation, demonstrating an end-to-end IoT application from hardware sensing to web-based visualization.
✨ Features
Real-time Rain Detection: Utilizes a rain sensor connected to ESP32 for immediate rainfall detection.

Web-based User Interface: A responsive and intuitive website built with Tailwind CSS to display rain status.

ESP32 Integration: Efficiently reads sensor data and communicates with the web server.

Scalable Design: Modular architecture allows for easy expansion with additional sensors or actuators.

Clear Status Indicators: Visual cues on the website clearly show if it's raining or not.

User-Friendly Setup: Designed for relatively straightforward deployment.

🛠️ Technologies Used
Hardware:
ESP32 Dev Module: The core microcontroller for processing sensor data and managing Wi-Fi communication.

Rain Sensor Module : Detects the presence of water/rain.

Jumper Wires & Breadboard: For connections and prototyping.

USB to Micro USB Cable: For programming and powering the ESP32.

Software:
Arduino IDE / PlatformIO: For programming the ESP32.

C++ (Arduino Sketch): Firmware for the ESP32.

HTML5: Structure of the web pages.

Tailwind CSS: For rapid and responsive UI development.

JavaScript: For dynamic updates and fetching data from the ESP32.

Node.js / Vite: (Based on your ls output, this is likely your web development environment setup) For managing web assets and running the local development server.

Git & GitHub: For version control and project hosting

⚙️ Setup and Installation
Follow these steps to get a local copy of the project up and running on your machine.

1. Clone the Repository
Bash

git clone https://github.com/CoderGuru74/sameer-portfolio.git
cd sameer-portfolio/project # Navigate into the main project directory
2. Hardware Setup
Connect the Rain Sensor to ESP32:

VCC on Rain Sensor -> 3.3V on ESP32

GND on Rain Sensor -> GND on ESP32

DO (Digital Out) or AO (Analog Out) on Rain Sensor -> An appropriate GPIO pin on ESP32 (e.g., GPIO 4 or GPIO 2). Refer to your ESP32 code for the exact pin used.

Power the ESP32: Connect the ESP32 to your computer via USB.

3. ESP32 Firmware Upload
Open your ESP32 firmware code (e.g., main.ino or esp32_rain_sensor.cpp) in Arduino IDE or PlatformIO.

Configure Wi-Fi Credentials: In the code, locate the sections for SSID and PASSWORD and replace them with your local Wi-Fi network credentials.

Specify Sensor Pin: Ensure the GPIO pin defined in the code matches how you've connected your rain sensor.

Upload the Sketch: Compile and upload the code to your ESP32 board.

4. Web Interface Setup
Install Node.js & npm: If you don't have them, download and install Node.js (which includes npm) from nodejs.org.

Install Dependencies:

Bash

npm install
Run the Development Server:

Bash

npm run dev
This will start a local server (usually at http://localhost:5173/ or similar). Open this URL in your web browser.

💡 How it Works
The system operates in a straightforward manner:

The Rain Sensor detects the presence of water.

The ESP32 continuously reads the sensor's output (digital or analog).

Based on the sensor reading, the ESP32 determines if it's currently raining.

The ESP32 acts as a simple web server or sends data to a central server (if implemented) which the front-end web interface queries.

The Web Interface (built with HTML, Tailwind CSS, and JavaScript) makes periodic requests to the ESP32 (or server) to fetch the rain status.

The UI updates dynamically to show "Raining ☔" or "No Rain ☀️" based on the received data.

🔮 Future Enhancements
Data Logging: Store historical rain data in a database.

Alert Notifications: Implement email or push notifications for rain alerts.

Integration with Smart Home Systems: Connect to Home Assistant, IFTTT, etc.

Multiple Sensors: Support for multiple rain sensors in different locations.

Weather API Integration: Fetch local weather forecasts for enhanced information.

Solar Power: Make the device self-sustaining using solar panels.

Mobile Application: Develop a dedicated mobile app for monitoring.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
Shubham 
CoderGuru74
shubham748856@gmail.com

