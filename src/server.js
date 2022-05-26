const app = require('./app')

app.listen(process.env.PORT || 3000, () => {
    console.log(`This server running in port ${process.env.PORT || 3000}!`)
})