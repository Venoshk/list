const app = require('./app')

require('dotenv').config({ path: require('find-config')('.env') })

const port = process.env.PORT 
app.listen(port, () => console.log(`online na porta ${port}`));