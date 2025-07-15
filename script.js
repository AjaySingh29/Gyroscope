const ball = document.getElementById("ball");
const output = document.getElementById("output");
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

function startGyro() {
  if ("Gyroscope" in window && "permissions" in navigator) {
    navigator.permissions.query({ name: "gyroscope" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        const gyro = new Gyroscope({ frequency: 60 });
        gyro.addEventListener("reading", () => {
          output.innerHTML = `
                X: ${gyro.x.toFixed(2)}<br>
                Y: ${gyro.y.toFixed(2)}<br>
                Z: ${gyro.z.toFixed(2)}
              `;

          x += gyro.y * 2;
          y += gyro.x * 2;

          // Clamp ball within viewport
          x = Math.max(0, Math.min(window.innerWidth - 50, x));
          y = Math.max(0, Math.min(window.innerHeight - 50, y));

          ball.style.transform = `translate(${x}px, ${y}px)`;
        });
        gyro.start();
      } else {
        output.innerHTML = "Permission denied.";
      }
    });
  } else {
    output.innerHTML = "Gyroscope API not supported.";
  }
}
