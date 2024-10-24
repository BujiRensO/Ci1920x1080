window.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.getElementById('scan');
    const screenshotButton = document.getElementById('screenshot');
  
    scanButton.addEventListener('click', async () => {
      try {
        const devices = await window.electronAPI.scanNetwork();
  
        const list = document.getElementById('device-list');
        list.innerHTML = '';
  
        devices.forEach(device => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>IP:</strong> ${device.ip} <br>
                          <strong>MAC:</strong> ${device.mac} <br>
                          <strong>Hostname:</strong> ${device.hostname}`;
          list.appendChild(li);
        });
      } catch (error) {
        console.error('Error scanning network:', error);
      }
    });
  
    // Screenshot button functionality
    screenshotButton.addEventListener('click', async () => {
      const filePath = 'D:\cc.png' // Define the file path here
  
      console.log('Screenshot button clicked, file path:', filePath); // Debugging log
      try {
        await window.electronAPI.takeScreenshot(filePath); // Pass the file path to the takeScreenshot function
        alert('Screenshot saved to: ' + filePath);
      } catch (error) {
        console.error('Error taking screenshot:', error); // Debugging error log
      }
    });
  });