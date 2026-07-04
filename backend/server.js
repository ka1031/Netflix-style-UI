const app = require("./app");
require("dns").setDefaultResultOrder("ipv4first");
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
