function updateConnection(){const status=document.getElementById('connection-status');if(status&&navigator.onLine)status.textContent='ارتباط با سایت برقرار نشد. اگر اینترنت وصل است، «تلاش دوباره» را انتخاب کنید؛ اطلاعات ذخیره‌شده همچنان در دسترس‌اند.';}
window.addEventListener('online',updateConnection);updateConnection();
